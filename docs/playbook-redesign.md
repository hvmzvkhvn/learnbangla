# Playbook visual redesign

Implemented November 2026. No database migration is required for these visual changes.

1. Shared warm illustrated art direction: 156 original generated WebP assets: 12 covers, five Look & Learn scenes, 123 page paintings, three building backgrounds and 13 transparent pieces. Prompt manifests: playbook-art.json and playbook-full-art-plan.json.
2. Distinct covers for all 12 books, including the younger learner collection.
3. Cox's Bazar cover now depicts the beach, waves and fishing boats.
4. Boishakh cover depicts festival masks, stalls and bunting.
5. Dhaka cover features a decorated rickshaw, driver and child.
6. Dada's Village cover shows a grandfather welcoming his granddaughter.
7. Hilsa cover foregrounds the fisherman, net and silvery fish.
8. A recurring girl with braids and a mustard dress appears across the village, school, beach and younger-reader covers; each book’s page paintings preserve its recurring characters and setting.
9. Five new illustrated Look & Learn scenes ground objects in rooms, stalls and streets.
10. Measured image hotspots, keyboard activation, visible markers and large alternative word buttons improve object selection.
11. Build thumbnails preview the completed painted scenes. The exercises combine painted backgrounds, transparent illustrated pieces and numbered placement guides. Picture choices exclude equivalent answers.
12. Illustrated welcome banner with a direct story link.
13. Category shortcuts with custom SVG icons, respecting track visibility.
14. Distinct restrained accents for reading, discovery, building and history.
15. Stronger Bengali title hierarchy and separated English/metadata.
16. Consistent framed cover proportions, borders, hover elevation and focus outlines.
17. Completed labels, progress strips and per-learner/track/reset-epoch device bookmarks. Bookmarks are explicitly device-local.
18. Full-proportion reader artwork preserves each scene without cropping; wide screens use a split layout. The next page is loaded ahead.
19. Darker Bengali text, labelled playback, slow playback and actual word-by-word audio highlighting; cancellation on page change/unmount and visible audio errors.
20. All 38 regional chapters and seven timeline chapters have individual paintings, combining grounded historical scenes with symbolic treatments. Dated navigation and direct region links remain.

Every page of both book collections now uses its own caption-specific painting. All three building activities use matching painted pieces while preserving their listening, selection, scoring and restart behaviour. Existing vector assets remain available for other lessons and the sprite reference gallery. The `/art?all` review gallery shows all 123 page paintings and the three assembled scenes.

Images use compressed WebP files, lazy loading on library cards, and on-demand caching after viewing. The application does not precache the entire illustration library at installation. Generated images contain no embedded captions; Bangla, romanisation and English remain selectable, accessible interface text. Original generation files remain in the image tool output folder; the shipped files live in `public/images/playbook/pages` and `public/images/playbook/build`.

Validation: 28 tests pass, including distinct-file coverage for all 123 pages, complete painted game-piece coverage, unambiguous choices and offline image caching. Lint, all three content checks and production build pass. All story sequences and assembled building scenes were visually reviewed. Browser checks covered the reader, incorrect-choice feedback and completed scene state. Existing large-JavaScript-chunk warning remains.
