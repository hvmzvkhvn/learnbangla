-- Retire the Phase 1 child/parent sign-up model (profiles, progress, unlocks). It was never used by the app
-- and held no rows when this ran; accounts now work on learners + learner_state (see the previous migration).
drop trigger if exists on_child_profile_created on public.profiles;
drop function if exists public.handle_new_child_profile();
drop table if exists public.unlocks;
drop table if exists public.progress;
drop table if exists public.profiles;
