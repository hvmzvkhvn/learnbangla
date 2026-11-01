# LearnBangla: 40 improvements

All 40 review recommendations are represented in this branch. Production database rollout and real email delivery remain external verification steps; source changes do not apply migrations or configure SMTP automatically.

| # | Change | Implementation |
|---|---|---|
| 1 | Adult learners | Migration expands the track constraint. |
| 2 | Production account flag | Pages workflow passes VITE_ACCOUNTS. |
| 3 | Conflicting device saves | Owner-checked, revision-checked save RPC with retry and merge. |
| 4 | Independent XP | Per-writer counters plus a once-counted legacy baseline. |
| 5 | Learner isolation | Replace is the default; guest import is an explicit opt-in. |
| 6 | Safe switching | Persist outgoing work, load before switching, retain per-learner copies and drafts. |
| 7 | Safe offline sign-out | Save failures stop sign-out and preserve pending work. |
| 8 | Accurate save status | Database reads/writes propagate errors; state and track update atomically. |
| 9 | Review ordering | Millisecond timestamps resolve same-day answers. |
| 10 | Storage fallback | Latest memory write takes precedence; temporary storage is disclosed. |
| 11 | Backup validation | Versioned schemas, size limits, preview and recovery copy; legacy codes supported. |
| 12 | Reset scope | Device reset detaches; account reset advances an epoch so old devices cannot resurrect progress. |
| 13 | Age-change navigation | Opens onboarding immediately. |
| 14 | Ability onboarding | Beginner, speaker and reader starting points. |
| 15 | Smaller first goal | A first-step goal precedes the collapsible full curriculum. |
| 16 | Duration and outcome | Estimates shown explicitly; subsequent estimates use locally measured completion times. |
| 17 | Resume lessons | Saves generated exercises, step, answer results and earned session XP; reload offers Resume. |
| 18 | Previous card | Learners can return to earlier teaching cards. |
| 19 | Useful feedback | Typing identifies the mismatched written part; choices and tiles supply scaffolding. |
| 20 | Learning summary | Completion displays practised Bangla, missed-question count and a review link. |
| 21 | Beginner games | Harder games recommend an introductory lesson; experienced learners can opt in. |
| 22 | Device keyboard | Optional native keyboard alongside the built-in one. |
| 23 | Audio controls | Normal/slow playback and play-twice controls on primary audio buttons. |
| 24 | Mobile header | Compact level display and a Settings disclosure. |
| 25 | Navigation | Four destinations with a Discover hub and games accessible from Practice. |
| 26 | Contrast | Darker supporting text, readable orange cards and stronger success/error colours. |
| 27 | Accessibility | Bangla language tags on core learning text, input labels, live feedback, progress semantics, focus styles and reduced motion. |
| 28 | Practical settings | Backups first; offline settings and unearned badges are collapsible. |
| 29 | Storage disclosure | Visible device/cloud save status on home, profile and lesson completion. |
| 30 | Content reports | Local flag status is explicit; learner opens a correction email draft addressed to info@learnbangla.app. |
| 31 | Loading performance | Lazy routes; offline precache covers core learning rather than every tool. |
| 32 | Smaller downloads | Next unit, selected unit, current track or all audio. |
| 33 | Fresh audio | Build adds content hashes to clip URLs; changed recordings get new cache identities. |
| 34 | Audio recovery | Failed manifest loads can retry; online recovery and visible playback errors. |
| 35 | Account recovery | Password reset, confirmation resend and PKCE recovery callback UI. |
| 36 | Destructive actions | Password reauthentication in UI and recent-password enforcement in SQL. |
| 37 | Accurate privacy | Hosting/font requests disclosed, retention wording corrected and support contact added. |
| 38 | Metadata | Adult coverage, route-specific titles and a PNG sharing card. |
| 39 | CI and regression tests | Hook-like getter renamed; PR/main checks plus storage/sync/schema/Postgres RLS tests. |
| 40 | Dependency health | Updated Vite/plugin and patched transitive dependencies; Dependabot and audit in CI. |

## Validation

- `npm run check`: lint (existing warnings remain), regression tests and all three content checkers.
- Database tests execute the migrations in PGlite/PostgreSQL with simulated Supabase JWT claims, authenticated roles and row-level security. They do not replace testing against the hosted Supabase Auth service.
- `npm run build`: production build and versioned audio manifest.
- `npm audit`: zero reported vulnerabilities at implementation time.
- Browser checks: age/ability onboarding, mobile home and lesson at 390 px, lesson refresh/resume, previous card, backup ordering and age-change navigation.

## Rollout order

1. Authenticate to the intended Supabase project. Back up the database and apply `20261101000000_reliable_progress.sql` after the existing migrations. It adds revision handling and makes progress writes RPC-only; old clients cannot continue direct upserts.
2. Configure Supabase email sending and permit `https://learnbangla.app/account` as an auth redirect. Test confirmation and recovery emails with a test account. PKCE reset links should be opened in the browser that requested the reset.
3. Deploy this branch through GitHub Pages. Set VITE_ACCOUNTS=on only once the database migration and email setup are verified; retain existing public URL and key variables.
4. Smoke-test adult learner creation, two-account isolation, two-device saves, offline sign-out, password recovery and recent-auth deletion in the hosted project.

Until database/email access is available, keep the PR unmerged. No production learner records should be used for destructive smoke tests.

## Data compatibility

Existing guest progress and LB1 codes remain readable. XP accrued by new clients uses independent writer counters; the legacy total is retained as a baseline. Already-lost historical increments cannot be reconstructed. Local unfinished lessons are limited to three most recent sessions and do not travel in a save code. Account reset is intentionally authoritative over older offline snapshots. Device-only reset preserves the cloud learner and disconnects the local session from it.
