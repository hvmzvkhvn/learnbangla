-- Learn Bangla — accounts
-- A parent (or any adult) signs in with email + password and adds learners. Each learner's progress is saved
-- here so it follows them across devices, and the parent can see how they are doing.
-- The app works fine without an account; this only adds saving and the parent view.

-- ============================================================
-- learners: the people who learn, owned by one signed-in account
-- ============================================================
create table if not exists public.learners (
  id uuid primary key default gen_random_uuid(),
  owner uuid not null references auth.users (id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 40),
  track text check (track in ('young', 'older', 'teen', 'senior')),
  created_at timestamptz not null default now()
);

create index if not exists learners_owner_idx on public.learners (owner);

-- ============================================================
-- learner_state: that learner's progress (the same data the app keeps on the device)
--   { "track": ..., "progress": {...}, "game": {...}, "srs": {...} }
-- ============================================================
create table if not exists public.learner_state (
  learner_id uuid primary key references public.learners (id) on delete cascade,
  state jsonb not null default '{}'::jsonb check (pg_column_size(state) < 400000),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security: you only ever see and change your own learners
-- ============================================================
alter table public.learners enable row level security;
alter table public.learner_state enable row level security;

create policy "learners_owner_all" on public.learners
  for all to authenticated
  using (owner = (select auth.uid()))
  with check (owner = (select auth.uid()));

create policy "learner_state_owner_all" on public.learner_state
  for all to authenticated
  using (exists (select 1 from public.learners l where l.id = learner_id and l.owner = (select auth.uid())))
  with check (exists (select 1 from public.learners l where l.id = learner_id and l.owner = (select auth.uid())));

-- ============================================================
-- At most 8 learners per account
-- ============================================================
create or replace function public.limit_learners()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if (select count(*) from public.learners where owner = new.owner) >= 8 then
    raise exception 'An account can have at most 8 learners';
  end if;
  return new;
end;
$$;

drop trigger if exists learners_limit on public.learners;
create trigger learners_limit
  before insert on public.learners
  for each row execute function public.limit_learners();

-- ============================================================
-- Delete my account: removes the sign-in and (by cascade) every learner and their progress
-- ============================================================
create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Not signed in';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
