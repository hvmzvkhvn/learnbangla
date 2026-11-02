# Additional reading illustrations

Production mode: built-in `image_gen`, one independently generated image per passage. The prompt manifest is `new-readings-prompts.json`. Final shipped assets are in `public/images/playbook/additions/`, encoded as 1200 × 800 WebP. Original Playbook paintings remain in their original pages.

Coverage: 156 added picture-book readings, 135 division/timeline additions (90 short readings and 45 background passages), and 128 history illustrations (32 chapter leads, 32 background passages and 64 short readings). Total: 419.

These are editorial illustrations, including interpretive historical reconstructions, rather than documentary records. Ancient rulers without authenticated likenesses are not presented as portrait reconstructions. Scenes of famine, war and displacement focus on dignity, relief and remembrance. No source image is copied into the shipped assets.

## Reference checks

- [UNESCO: Somapura Mahavihara at Paharpur](https://whc.unesco.org/en/list/322/) — brick monastery, quadrangle, terraced cruciform shrine and monastic cells; avoid generic East Asian temple architecture.
- [UNESCO: Historic Mosque City of Bagerhat](https://whc.unesco.org/en/list/321/) — regional brick mosque architecture rather than later marble or Ottoman forms.
- [UNESCO: 7 March speech](https://www.unesco.org/en/memory-world/historic-7th-march-speech-bangabandhu-sheikh-mujibur-rahman) — date and setting for the Racecourse speech.
- [V&A: Rabindranath Tagore](https://www.vam.ac.uk/articles/rabindranath-tagore-poet-and-painter) — career context and self-portrait reference.
- [Nazrul Tirtha](https://www.nazrultirtha.co.in/) — museum and archive devoted to Nazrul's life and work.
- [Ben Uri Research Unit: Zainul Abedin](https://www.buru.org.uk/contributor/zainul-abedin) — art training, famine sketches and Dhaka teaching career.
- [Jyotirindranath Tagore's 1889 Lalon portrait](https://commons.wikimedia.org/wiki/File:Fakir_Lalon_Shah.jpg) — surviving lifetime sketch; Lalon illustrations remain interpretations.
- [Begum Rokeya portrait](https://www.observerbd.com/news/288566) — recognisable spectacles, sari and head covering as visual reference.

- [Banglapedia: Mujibnagar Government](https://en.banglapedia.org/index.php?lang=en&title=Mujibnagar_Government) — oath-taking date and the acting leadership while Sheikh Mujibur Rahman was detained in Pakistan.

## Integration and review

The original first reading in every existing picture-book page retains its original painting. Each subsequent reading switches to its own image. Division and timeline chapters retain their original lead paintings and add pictures beside their new background and short-reading passages. History chapters no longer use borrowed artwork or explanatory stand-in notes.

Reader unit counts, spoken text, chapter navigation and bookmark indices remain unchanged. Supplemental story pictures use lazy loading; only the current main picture is eager, and the next main reading image is preloaded. Existing offline image-cache behavior applies without adding the whole collection to the initial precache.
