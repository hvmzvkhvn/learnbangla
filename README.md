# Learn Bangla

A free Bangla learning site (no login needed) with four tracks — **Little Learners (5–7)**, **Explorers (8–12)**, **Voyagers (13–15)** and **Pathfinders (16–18)** — in Bangladeshi Bangla. Built with Vite + React, React Router and Tailwind. Progress is saved in the browser (localStorage); a parent account is optional.

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

## Ages 13–15 and 16–18

Two more tracks, both starting from the alphabet:

- **Voyagers (13–15):** smaller steps and more scaffolding — 110 lessons in 10 units.
- **Pathfinders (16–18):** the fast track, with denser lessons and more reading — 99 lessons in 10 units.

What's different from the younger tracks:

- **Story chats** (`/stories`): branching text-message conversations where your replies move a meter and change the ending. 5 per track, 3 endings each. Content: `src/data/stories.js`.
- **Games & XP** (`/play`, `/me`): Word Blitz, Memory Match, Type It, a Daily Challenge, plus XP, levels, a daily streak and 16 badges (`src/state/game.js`). Saved in the browser.
- **Listen & type:** hear a word and type it with the on-screen Bangla keyboard; listening questions in every lesson.
- **Boss levels:** a timed sprint closes every unit.
- **Poems & readings:** Tagore, Dwijendralal Ray, Lalon and a traditional rhyme (all public domain / traditional), reading passages with comprehension questions, and cinema conversations. Content: `src/data/teenText.js`.
- **Vocabulary & sentences:** `src/data/teenWords.js`, `src/data/teenSentences.js`; conjunct letters in `src/data/conjuncts.js`.

Kazi Nazrul Islam (d. 1976) appears only in facts — his words are still in copyright and are not quoted.

Checkers:

```bash
npm run lint:stories    # every story graph: links, dead ends, reachable endings, address rules
npm run lint:family     # the Family unit's apni / tumi rules
```

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

## What each age group gets

All behaviour that differs by age lives in one file, `src/curriculum/features.js`.

| | 5–7 | 8–12 | 13–15 / 16–18 |
|---|---|---|---|
| XP, levels, daily streak, badges | ✓ (garden stages, stickers) | ✓ | ✓ |
| A missed day | pauses the streak | pauses the streak | resets it |
| Games (`/play`) | Memory (pictures), Tap the Picture, Daily Treat — no timers | Daily, Word Blitz (90 s), Memory, Type It | Daily, Word Blitz (60 s), Memory, Type It |
| Story chats | – | 4 stories | 5 stories each |
| Unit finale | Treasure hunt (untimed) | – | Boss level (timed) |
| Tracing | every letter, one word per lesson | 2 letters, signs, a word | every letter, signs, syllables, 2 words, digits |

**Tracing** (`src/components/lesson/TraceQ.jsx`, `src/curriculum/trace.js`): the learner draws over the glyph and the drawing is scored 1–3 stars for how much of the letter it covers and how little it strays (more forgiving for the younger tracks). A *Watch how* animation of the stroke order is drafted automatically from the font; it stays hidden until a Bangla speaker has checked it on **`/review/strokes`** and the approved list is pasted into `src/data/strokesApproved.js`.

**Review today** (`/practice`, `src/state/srs.js`): every answer is recorded; things answered wrong come back straight away, right ones after 1, 2, 4, 8, 16, 32 days.

**Say it** (`src/components/SayIt.jsx`): record yourself on any flashcard and hear it next to the native clip. The recording never leaves the device.

**Save code** (Me page): copy a code to move progress to another device without an account.

## Explore Bangladesh (13+) and the 18+ track

**Explore** (`/explore`, 13–15, 16–18 and 18+): a tappable map of the eight divisions (`src/data/bdMap.js`, boundaries from geoBoundaries, CC0). Each division follows one card — *Famous for · Then & Now · Made here · 4 cities* — with an English hook first and Bangla lines you can tap to hear. Depth grows with age: 13–15 gets the facts and short Bangla; 16–18 adds a timeline and the economy; 18+ adds fuller essays (`src/data/exploreDeep.js`). Visiting a division or city earns a passport stamp and XP (stamps live in the game stats, so they sync and travel in the save code). Dhaka, Chattogram and Sylhet are open from the start; the other five unlock with progress. Content: `src/data/explore.js`. Extras: a **Map Quiz** in Play, a daily **postcard**, a road-trip story chat, and a words-and-reading lesson pair for every division. The English facts are listed on `/review` under *Explore facts*.

**Wayfarers (18+)**: adults starting from zero. The script and basics match the 16–18 track; new units cover work, banks and forms, health, news and the economy, **history from 1905 to 1971** (the first partition of Bengal, 1947, the language movement, the road to independence, how the political parties developed), faith, clothing, music and poets, and *Bengal Beyond Borders* (West Bengal, the diaspora, and a lesson on the words that differ between Bangladesh and West Bengal). Content: `src/data/adultText.js`. The history readings lead with an English paragraph and state contested things neutrally — check them on `/review`.

## Super challenges

The last lesson of a unit (the dark 🦸 tile) is a **Super challenge**: about six new, longer sentences written with only vocabulary that unit's track has already taught, and **no transliteration** (the Aa switch is removed inside it). Each has 18 questions: read and say what it means, build the sentence from tiles with decoy tiles, fill the gap, listen and build, and (13+) listen and type in Bangla. Script units use unseen words made only from letters learned so far. Passing with 2+ stars earns bonus XP and the Super badges; there is no gate, and it can be retried any time.

Content lives in `src/data/super/` (one set per unit id; units that teach identical words share a set). `npm run lint:super` checks every word against what has been taught by that unit (a short list of function words such as আর, কিন্তু, তাই is always allowed; add `--strict` to make unknown words errors). Status: 13–15, 16–18 and 18+ done; 8–12 and 5–7 are next.

## Your own voice (Voice studio)

`/studio` (linked from `/review`) walks through every spoken clip — letters first — and records it in your own voice. Clips are trimmed, levelled and encoded to small mp3s, kept in the browser, and played instead of the prototype voice on that device. **Download my recordings** produces a zip whose file names are exactly the existing ones: unzip it into `public/audio/`, commit and push, and the recordings replace the prototype voice for everyone. No manifest change is needed.

## Installable and offline

The site is a PWA: a web manifest, icons and a service worker (generated at build time by `build/sw-plugin.js`) that caches the app so it opens without internet. Audio is cached as it is played, and the Me page has **Save audio for offline** (about 50 MB) to fetch all of it.

## Accounts and the parent view

A parent signs in with email + password (`/account`) and adds **learners** (a first name and an age group — children have no logins). Each learner's progress is stored in Supabase and merged with what is on the device, so it follows them between devices (`src/sync/`). The **parent view** (`/parent`) shows each learner's level, XP, streak, lessons done, XP over the last week and the words they keep getting wrong. `/privacy` explains what is stored. Parent screens sit behind a small "grown-ups only" number check.

The app works fully without an account. Accounts are **off in production unless the site is built with `VITE_ACCOUNTS=on`** (they are on in `npm run dev`).

Setup, once per Supabase project:

```bash
cp .env.example .env     # VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (Project Settings → API)
supabase link --project-ref <ref>
supabase db push         # creates learners + learner_state with row-level security, and delete_my_account()
```

For the deployed site, set the repository variables `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (public by design) and `VITE_ACCOUNTS=on` (Settings → Secrets and variables → Actions → Variables); the workflow passes them to the build.

Before switching accounts on for the public, decide how sign-up emails are sent: with *Confirm email* on, Supabase's built-in sender only reaches members of the Supabase team, so connect your own SMTP service (Authentication → Emails → SMTP settings, e.g. Resend with `learnbangla.app` verified). Without a sender there is also no "forgot password" email. A free Supabase project pauses after a week without activity; the Pro plan avoids that.

Database: `supabase/migrations/20261024000000_accounts.sql` (tables, policies, an 8-learner limit, `delete_my_account()`); the earlier Phase 1 tables were retired in `…000100_drop_phase1.sql`.
