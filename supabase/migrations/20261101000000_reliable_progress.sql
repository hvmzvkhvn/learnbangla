-- Versioned saves. Apply before deploying the new client.
alter table public.learners drop constraint if exists learners_track_check;
alter table public.learners add constraint learners_track_check check (track in ('young','older','teen','senior','adult'));
alter table public.learner_state add column if not exists revision bigint not null default 1;

-- Writes must pass the revision check; reads remain owner-only through RLS.
drop policy if exists learner_state_owner_all on public.learner_state;
drop policy if exists learner_state_owner_read on public.learner_state;
create policy learner_state_owner_read on public.learner_state for select to authenticated
using (exists(select 1 from public.learners l where l.id = learner_id and l.owner = (select auth.uid())));
revoke insert, update, delete on public.learner_state from authenticated, anon;

create or replace function public.save_learner_state(p_learner uuid, p_state jsonb, p_revision bigint, p_reset boolean default false)
returns bigint language plpgsql security definer set search_path = '' as $$
declare current_revision bigint; current_epoch bigint; requested_epoch bigint; result_revision bigint;
begin
  -- Lock the parent even for the first insert, serializing concurrent creation.
  perform 1 from public.learners where id = p_learner and owner = auth.uid() for update;
  if not found then raise exception 'Learner not found' using errcode='42501'; end if;
  if jsonb_typeof(p_state) <> 'object' or octet_length(p_state::text) > 350000
    or jsonb_typeof(p_state->'progress') is distinct from 'object'
    or jsonb_typeof(p_state->'game') is distinct from 'object'
    or jsonb_typeof(p_state->'srs') is distinct from 'object'
    or (p_state->>'track' is not null and p_state->>'track' not in ('young','older','teen','senior','adult'))
    then raise exception 'Invalid progress'; end if;
  if exists(select 1 from jsonb_each(p_state->'progress') as item where
    jsonb_typeof(item.value) <> 'object' or jsonb_typeof(item.value->'stars') is distinct from 'number'
    or (item.value->>'stars')::numeric not in (1,2,3)) then raise exception 'Invalid lesson stars'; end if;
  if p_state->'game' ? 'xp' and (jsonb_typeof(p_state->'game'->'xp') <> 'number'
    or (p_state->'game'->>'xp')::numeric < 0 or (p_state->'game'->>'xp')::numeric > 1000000000) then raise exception 'Invalid XP'; end if;
  requested_epoch := coalesce((p_state->>'epoch')::bigint,0);
  select revision,coalesce((state->>'epoch')::bigint,0) into current_revision,current_epoch from public.learner_state where learner_id=p_learner;
  current_revision := coalesce(current_revision,0); current_epoch := coalesce(current_epoch,0);
  if current_revision <> p_revision then raise exception 'Progress changed on another device' using errcode='40001'; end if;
  if requested_epoch <> current_epoch + (case when p_reset then 1 else 0 end) then raise exception 'Invalid reset version' using errcode='40001'; end if;
  if p_reset and not public.recent_password_login() then raise exception 'Please sign in again before resetting account progress' using errcode='42501'; end if;
  insert into public.learner_state(learner_id,state,revision,updated_at) values(p_learner,p_state,current_revision+1,now())
    on conflict(learner_id) do update set state=excluded.state,revision=excluded.revision,updated_at=now()
    returning revision into result_revision;
  update public.learners set track=p_state->>'track' where id=p_learner;
  return result_revision;
end; $$;

-- Require a password authentication within five minutes for destructive actions.
create or replace function public.recent_password_login() returns boolean language sql stable set search_path='' as $$
  select exists(select 1 from jsonb_array_elements(coalesce(auth.jwt()->'amr','[]'::jsonb)) a
    where a->>'method'='password' and (a->>'timestamp')::double precision > extract(epoch from now())-300);
$$;
create or replace function public.delete_my_learner(p_learner uuid) returns void language plpgsql security definer set search_path='' as $$
begin
  if not public.recent_password_login() then raise exception 'Please sign in again' using errcode='42501'; end if;
  delete from public.learners where id=p_learner and owner=auth.uid();
  if not found then raise exception 'Learner not found' using errcode='42501'; end if;
end; $$;
create or replace function public.delete_my_account() returns void language plpgsql security definer set search_path='' as $$
begin
  if auth.uid() is null or not public.recent_password_login() then raise exception 'Please sign in again' using errcode='42501'; end if;
  delete from auth.users where id=auth.uid();
end; $$;
-- Keep RLS on non-destructive operations, disallow bypassing the delete RPC.
drop policy if exists learners_owner_all on public.learners;
drop policy if exists learners_read on public.learners;
create policy learners_read on public.learners for select to authenticated using(owner=(select auth.uid()));
drop policy if exists learners_insert on public.learners;
create policy learners_insert on public.learners for insert to authenticated with check(owner=(select auth.uid()));
drop policy if exists learners_update on public.learners;
create policy learners_update on public.learners for update to authenticated using(owner=(select auth.uid())) with check(owner=(select auth.uid()));
revoke delete on public.learners from authenticated,anon;
revoke all on function public.save_learner_state(uuid,jsonb,bigint,boolean),public.delete_my_learner(uuid),public.recent_password_login() from public,anon;
grant execute on function public.save_learner_state(uuid,jsonb,bigint,boolean),public.delete_my_learner(uuid),public.recent_password_login() to authenticated;
