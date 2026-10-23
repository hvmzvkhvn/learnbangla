-- Learn Bangla — Phase 1 schema
-- Tables: profiles, progress, unlocks
-- Run this in the Supabase SQL editor, or via `supabase db push`.

create extension if not exists "pgcrypto";

-- ============================================================
-- profiles
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null,
  email text not null,
  role text not null check (role in ('child', 'parent', 'teacher')),
  status text not null default 'active' check (status in ('locked', 'active')),
  parent_email text,
  parent_id uuid references public.profiles (id) on delete set null,
  activation_token uuid default gen_random_uuid(),
  created_at timestamptz not null default now()
);

create index if not exists profiles_parent_id_idx on public.profiles (parent_id);
create index if not exists profiles_activation_token_idx on public.profiles (activation_token);

-- ============================================================
-- progress
-- ============================================================
create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  module text not null,
  lesson_key text not null,
  stars_earned int not null default 0,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (user_id, module, lesson_key)
);

create index if not exists progress_user_id_idx on public.progress (user_id);

-- ============================================================
-- unlocks
-- ============================================================
create table if not exists public.unlocks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  content_key text not null,
  unlocked_at timestamptz not null default now(),
  unique (user_id, content_key)
);

create index if not exists unlocks_user_id_idx on public.unlocks (user_id);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.unlocks enable row level security;

-- profiles: a user can see their own profile, or their child's profile
create policy "profiles_select_own_or_child" on public.profiles
  for select using (
    id = auth.uid() or parent_id = auth.uid()
  );

-- profiles: a user can insert only their own row (used during signup)
create policy "profiles_insert_own" on public.profiles
  for insert with check (
    id = auth.uid()
  );

-- profiles: a user can update their own row, or a parent can update their child's row
create policy "profiles_update_own_or_child" on public.profiles
  for update using (
    id = auth.uid() or parent_id = auth.uid()
  );

-- progress: a user can see/manage their own progress, or a parent can view their child's
create policy "progress_select_own_or_child" on public.progress
  for select using (
    user_id = auth.uid()
    or user_id in (select id from public.profiles where parent_id = auth.uid())
  );

create policy "progress_insert_own" on public.progress
  for insert with check (
    user_id = auth.uid()
  );

create policy "progress_update_own" on public.progress
  for update using (
    user_id = auth.uid()
  );

-- unlocks: a user can see their own unlocks, or a parent can view their child's
create policy "unlocks_select_own_or_child" on public.unlocks
  for select using (
    user_id = auth.uid()
    or user_id in (select id from public.profiles where parent_id = auth.uid())
  );

-- ============================================================
-- Seed default unlock for every new child account
-- ============================================================
create or replace function public.handle_new_child_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role = 'child' then
    insert into public.unlocks (user_id, content_key)
    values (new.id, 'child_mode')
    on conflict (user_id, content_key) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists on_child_profile_created on public.profiles;

create trigger on_child_profile_created
  after insert on public.profiles
  for each row
  execute function public.handle_new_child_profile();
