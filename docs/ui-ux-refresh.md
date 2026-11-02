# UI / UX refresh

The approved November 2 review is implemented as a shared system across age tracks. Existing progress, lesson IDs, illustrations, and account behaviour remain intact.

## Approval boundaries

- **3:** Noto Sans Bengali is retained.
- **4:** A new default Bangla type scale is deferred pending explicit approval. Suggested next step: compare word, sentence and reading sizes in a preview.
- **5:** Existing default Bengali line spacing is retained.
- **10:** A separate, explicitly requested reading preference enlarges Bangla to 115% or 130%. Standard is the default.

## Review item coverage

| Items | Implementation |
| --- | --- |
| 1–2, 6–9 | Readable translations, lighter Latin weights, shared Nunito headings, consistent word/pronunciation/meaning hierarchy, responsive wrapping instead of character-count shrinking. |
| 10 | Persistent Bangla reading size in Settings and My learning; enlarged layouts reflow. |
| 11–17 | Warm ivory retained; semantic primary/text/surface/reward/feedback tokens; solid muted text; dark text on gold; coordinated evening palette. |
| 18–19 | Checkmarks and borders identify selected categories; matching distinguishes selection from correctness; correct/incorrect answer labels accompany colour. |
| 20 | Warm daylight, quiet evening and device-matched themes. Artwork is not inverted. |
| 21–24 | Wider browsing layouts, narrower reading views, minimum-width card grids, one-column fallback for narrow/enlarged layouts. |
| 25–27 | Discoverable topic arrows, all-topics chooser, automatic selected-topic positioning. |
| 28–30 | Desktop side navigation; wrapping mobile headers; safe-area spacing and keyboard-aware lesson actions. |
| 31–37 | Audio buttons have 48px targets; controls have 44px minimum height; spacing, primary/secondary/quiet styles and modest press feedback. |
| 38–40 | Strong active-navigation indicator; Settings closes on Escape, focus departure and route change; vocabulary topic and scroll restoration. |
| 41–50 | Central opt-in haptics with success/completion patterns and rate limiting; no mistake vibration; calm mode and reduced-motion suppression; unsupported devices fall back silently. |
| 51–56 | Shared interaction timing; immediate state changes; no typing shake; persistent corrections; fewer celebration particles; reserved feedback space and answers remain visible after solving. |
| 57–60 | Audio loading/playing/stop/error/retry states; interrupted playback settles cleanly; loading skeleton; reduced motion and calm mode preserve text feedback. |
| 61–63 | Shared optical image scale metadata, bounded to avoid clipping; small topic graphics use clear code-native icons. |
| 64–68 | Softer shadows, surface/border grouping, limited radius sizes, aligned audio controls and distinct static-card versus action affordances. |
| 69–70 | Larger young-learner browsing cards; denser teen/senior/adult cards; shared brand and navigation vocabulary. |
| 71–72 | Automated contrast assertions for semantic text pairs in both themes; manual narrow-screen, enlarged Bangla and 200% text reflow checks. |
| 73–78 | Pressed states, Bangla language metadata, decorative redundant icons, focus/scroll spacing, lesson-step focus, inline feedback and separate answer/audio buttons. |
| 79–80 | Visible pronunciation toggle and dismissible, reopenable word-card walkthrough. |

## Validation

- `npm run check`: lint, tests and all curriculum checks.
- `npm run build`: production bundle.
- Tests cover preference validation, haptic opt-in/calm/reduced motion/rate limits, semantic palette contrast and audio cancellation/retry.
- Development-only `tests/ui-fixture.html?screen=typing` exercises persistent error recovery; `?text=200` exercises browser text enlargement. These are not production entry points.
- Browser checks cover Settings keyboard dismissal, topic focus return, mobile word and lesson layouts, Playbook reader and theme persistence. Hardware vibration and a physical mobile keyboard require real-device testing; desktop viewport checks do not simulate their hardware.

## Maintenance

Colours and responsive rules are in `src/index.css`; Playbook consumes the same tokens. `src/ui/preferences.js` stores device preferences independently of progress. Haptics are off by default. Calm mode suppresses automatic speech but explicit Listen buttons continue to work. No external analytics or new runtime dependencies are added.
