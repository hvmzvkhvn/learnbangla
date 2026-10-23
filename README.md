# Learn Bangla

A free, no-login Bangla learning site with two tracks — **Little Learners (5–7)** and **Explorers (8–12)** — in Bangladeshi Bangla. Built with Vite + React, React Router and Tailwind. Progress is saved in the browser (localStorage).

## Run it

```bash
npm install
npm run dev
```

## How the curriculum is organised

```
src/data/alphabet.js       letters, consonant groups, vowel signs
src/data/words.js          word lists by topic (family, numbers, animals, months, …)
src/data/sentences.js      sentences and present-tense verb patterns
src/curriculum/bank.js     the content bank: every item gets a stable id
src/curriculum/tracks.js   the two tracks → units → lessons (lists of item ids)
src/curriculum/exercises.js  generates each lesson's practice from its items
src/pages/Lesson.jsx       the lesson player (flashcards → exercises → stars)
src/pages/Review.jsx       /review — mark every item ✓ or ⚑ with a correction note
```

To add content, add entries to the `src/data` files and reference them from `tracks.js`; the exercises are generated automatically. Fix a word once and it is fixed in every lesson.

**Reviewing content:** open `/review`, mark each item, then use *Copy corrections* or *Download as JSON*.

## The Family unit

Everyday conversations at home, split into seven themed units (Mornings · School Days · Food & Kitchen · Prayer & Ramadan · Nana, Dada & Nani · Play & Outings · Care & Manners). Each track has its own version of every scene: short picture-led scenes for 5–7 (57 scenes) and fuller conversations for 8–12 (62 scenes). It starts with an *Everyday Phrases* lesson (salam, bismillah, inshaallah…) and an *আপনি or তুমি?* lesson.

**Address rules** (set by the content owner): the child says আপনি to *every* elder — Ammu, Abbu, Nana, Dada, Nani, uncles and aunts; elders say তুমি to the child; the child says তুমি to friends. After editing lines, run:

```bash
npm run lint:family     # flags any line that breaks the rules above
npm run audio           # records any new or changed lines
```

Content lives in `src/data/family.js` (original scenes, characters, unit layout) and `src/data/family2.js` (45 more scenes). Each line is `L(speaker, bangla, romanisation, english, pictureCue)`.

## Audio

Every letter, sign, word and sentence has a recording in `public/audio/` (listed in `public/audio/manifest.json`). 🔊 buttons appear on every flashcard, question, answer option, matching cell, sentence word and reference page; flashcards and questions also play automatically (the 🔊 Auto button in the header turns that off — the 🔊 buttons still work).

**After adding or changing content, regenerate:**

```bash
pip install edge-tts      # one-off
npm run audio             # only records what is new; add -- --force to redo everything
```

This uses a free neural Bangladeshi voice (`bn-BD-NabanitaNeural`; change with `AUDIO_VOICE`, e.g. `bn-BD-PradeepNeural` for a male voice). Those voices come from Microsoft Edge's read-aloud service through an unofficial library, so treat them as **prototype audio**: before a public launch, replace them with licensed text-to-speech or, better, real recordings. To use your own recording, replace the mp3 in `public/audio/` (same filename — the manifest shows which file is which text). Marks that can't be spoken alone (ং ঃ ঁ ৎ) are recorded with a carrier vowel — see `src/audio/norm.js`.

## Accounts (currently switched off)

The earlier login / parent-activation code and the Supabase backend are still in the repo but not routed (see the comment in `src/App.jsx`). The notes below describe that setup.

---

## Phase 1 accounts setup

A children's app for learning Bangla, built with Vite + React, React Router, Tailwind CSS, and Supabase.

Phase 1 covers: authentication (child signup → parent activation → login), role-based routing, the child and parent dashboard shells, the database schema, and the `useUnlock` content-gating hook. No lesson content yet — that's Phase 2+.

## Stack

- Vite + React
- React Router
- Tailwind CSS (colour palette + Nunito font wired up in `tailwind.config.js` / `src/index.css`)
- Supabase (Postgres + Auth + Edge Functions)

## 1. Create the Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy the Project URL and `anon` public key.
3. Copy `.env.example` to `.env` and fill in both values:

   ```bash
   cp .env.example .env
   ```

## 2. Run the database migration

In the Supabase SQL editor, run the contents of [`supabase/migrations/20261016000000_init.sql`](supabase/migrations/20261016000000_init.sql). This creates the `profiles`, `progress`, and `unlocks` tables, enables Row Level Security with the policies each role needs, and adds a trigger that seeds every new child account with the `child_mode` unlock.

## 3. Deploy the Edge Functions

Two Edge Functions handle the parts of the auth flow that need elevated (service-role) database access:

- **`signup-child`** — creates the child's auth user + locked profile, then emails the parent an activation link.
- **`activate-parent`** — validates the activation link, creates the parent's auth user + profile, and flips the child's account to `active`.

```bash
supabase functions deploy signup-child
supabase functions deploy activate-parent
```

Then set the secrets they need (service role key + URL are provided automatically by Supabase; you only need to add the email ones):

```bash
supabase secrets set RESEND_API_KEY=your_resend_api_key
supabase secrets set EMAIL_FROM="Learn Bangla <hello@yourdomain.com>"
```

[Resend](https://resend.com) is used to send the parent activation email — it has a free tier that's enough for development. Without `RESEND_API_KEY` set, child signup still works and the account is created, but no email is sent (a warning is returned so you can still find the activation link in the `profiles.activation_token` column while developing).

## 4. Run the app

```bash
npm install
npm run dev
```

## How the auth flow works

1. **Child signs up** (`/signup/child`) with name, age, email, password, and parent email. This calls the `signup-child` Edge Function, which creates the child's account with `status = "locked"` and emails the parent an activation link. The child is then shown a holding screen at `/waiting`.
2. **Parent opens the email link** (`/activate/:token`) and creates their own account (name, email, password). This calls the `activate-parent` Edge Function, which creates the parent's account and links it to the child, flipping the child's `status` to `"active"`.
3. **Login** (`/login`) is a single form for both roles — after signing in, the app reads the user's `profiles` row and routes child → `/child`, parent/teacher → `/parent`. A child whose account is still locked is sent to `/waiting` regardless of where they land.

## Project structure

```
src/
  context/AuthContext.jsx   # session + profile, available app-wide via useAuth()
  hooks/useUnlock.js        # content-gating hook (checks the `unlocks` table)
  hooks/useStarTotal.js     # sums stars_earned across a user's progress rows
  components/               # ProtectedRoute, ChildLayout, BottomNav, StarCounter, Spinner
  pages/                    # Login, SignupChild, WaitingForParent, ActivateParent,
                             # ChildDashboard, ChildProgress, ChildSettings, ParentDashboard
supabase/
  migrations/20261016000000_init.sql  # tables, RLS policies, default-unlock trigger
  functions/                # signup-child, activate-parent
```

## Using `useUnlock` in later phases

```jsx
import { useUnlock } from '../hooks/useUnlock'

function AlphabetModule() {
  const { unlocked, loading } = useUnlock('child_mode')

  if (loading) return <Spinner />
  if (!unlocked) return <LockedScreen />

  return <AlphabetLessons />
}
```
