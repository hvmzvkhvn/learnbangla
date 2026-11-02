// Kabuliwala — a retelling of Rabindranath Tagore’s 1892 short story (the original is in the public domain).
// Retold, not translated: scenes are compressed and some detail is the retelling’s own.
import { part1 } from './kabuliwala/part1.js'
import { part2 } from './kabuliwala/part2.js'
import { part3 } from './kabuliwala/part3.js'
import { part4 } from './kabuliwala/part4.js'
import { part5 } from './kabuliwala/part5.js'

export const kabuliwala = {
  id: 'kabuliwala',
  topic: 'classic',
  title: 'Kabuliwala',
  titleBn: 'কাবুলিওয়ালা',
  blurb: 'Tagore’s story of a little girl, a fruit seller from Kabul, and two fathers.',
  cast: 'The narrator: a Bengali writer in his forties, white dhoti and shawl, round spectacles, gentle face. Mini: a five-year-old girl with a short bob and a red-bordered frock (later a quiet young woman, then a bride in red Benarasi silk with sandal-paste marks). Mini’s mother: slim, in a plain cotton sari with a red border, anxious eyes. Rahmat: a tall, broad Afghan fruit seller in a loose pale tunic and baggy trousers, a brown waistcoat, a wound turban, a short dark beard, a heavy cloth bag on his shoulder (thinner and greyer after prison).',
  parts: [
    { title: 'Mini and the stranger', titleBn: 'মিনি আর অচেনা মানুষ' },
    { title: 'A friendship grows', titleBn: 'বন্ধুত্ব' },
    { title: 'The quarrel', titleBn: 'ঝগড়া আর জেল' },
    { title: 'The years go by', titleBn: 'বছরগুলো পেরিয়ে' },
    { title: 'The handprint', titleBn: 'ছোট্ট হাতের ছাপ' },
  ],
  beats: [...part1, ...part2, ...part3, ...part4, ...part5],
}
