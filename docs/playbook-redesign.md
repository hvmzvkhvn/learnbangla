# Playbook visual redesign

Implemented November 2026. No database migration is required for these visual changes.

1. Shared warm illustrated art direction: 17 original generated WebP assets, with a prompt manifest in playbook-art.json.
2. Distinct covers for all 12 books, including the younger learner collection.
3. Cox's Bazar cover now depicts the beach, waves and fishing boats.
4. Boishakh cover depicts festival masks, stalls and bunting.
5. Dhaka cover features a decorated rickshaw, driver and child.
6. Dada's Village cover shows a grandfather welcoming his granddaughter.
7. Hilsa cover foregrounds the fisherman, net and silvery fish.
8. A recurring girl with braids and a mustard dress appears across the village, school, beach and younger-reader covers; the reusable interior character wears the same colour.
9. Five new illustrated Look & Learn scenes ground objects in rooms, stalls and streets.
10. Measured image hotspots, keyboard activation, visible markers and large alternative word buttons improve object selection.
11. Build thumbnails show partly finished scenes and outlined missing pieces. The exercise itself shows placement guides.
12. Illustrated welcome banner with a direct story link.
13. Category shortcuts with custom SVG icons, respecting track visibility.
14. Distinct restrained accents for reading, discovery, building and history.
15. Stronger Bengali title hierarchy and separated English/metadata.
16. Consistent framed cover proportions, borders, hover elevation and focus outlines.
17. Completed labels, progress strips and per-learner/track/reset-epoch device bookmarks. Bookmarks are explicitly device-local.
18. Smaller reader art area keeps text and controls closer; wide screens use a split layout.
19. Darker Bengali text, labelled playback, slow playback and actual word-by-word audio highlighting; cancellation on page change/unmount and visible audio errors.
20. Archival history palette, dated timeline navigation and direct illustrated region links.

The new raster assets are covers/opening illustrations and the five Look & Learn scenes. Interior pages retain the editable vector scene system, with contextual furniture and a recurring character treatment. Build activities retain editable vector pieces, so the learning interaction stays intact. This is not a claim that every interior page has a new generated painting.

Validation: production build; lint; existing 25 regression tests and three content checks. Browser checks include bookmark reload/resume, card progress, image loading, keyboard activation of a market hotspot, and layout inspection. Existing large-JavaScript-chunk warning remains.
