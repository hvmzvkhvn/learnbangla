# Shared learning illustrations

Learning content uses isolated, transparent gouache illustrations instead of platform emoji. Small controls use a consistent SVG stroke system. Colours remain true colour swatches; numbers remain Bangla digits. This applies to the shared curriculum and every age track.

`src/art/VisualText.jsx` renders the legacy symbol fields without changing lesson IDs, saved progress, answer keys, audio or age visibility. It preserves ordinary text and handles joined family symbols as one image. `src/art/learning-art.json` maps symbols and semantic keys to files, labels, swatches and control icons. `src/art/UiIcon.jsx` provides the small control icons.

When an old symbol represents different subjects, use a specific semantic key in the content data. Examples include pink / water lily, sugar / salt, python / snake, breakfast / cooking, rice field / rice plant, and parliament / a generic institution. Bengali food, clothing and transport use their intended subjects, including fuchka, pitha, panjabi, lungi and cycle rickshaws.

New assets live in `public/images/learning/`, with a small number of suitable existing transparent building pieces reused. Images reserve their layout space, load lazily and have accessible labels. The service worker caches viewed images on demand; it does not precache the whole collection.

Review the complete library at `/art?learning`. The existing story gallery remains at `/art?all`.

Generated using the built-in imagegen tool. The final prompt set is in `docs/learning-art-prompts.json`. Source PNGs are retained outside the repository; shipped images are optimized WebPs. Tests cover curriculum mapping, files, ambiguous meanings, joined symbols, Bangla digits and offline image caching.
