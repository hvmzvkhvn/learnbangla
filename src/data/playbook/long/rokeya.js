// Begum Rokeya (1880–1932): a life in fifty slides. Dates and events follow standard biographical accounts;
// the retelling flags where details are traditional rather than documented (for example Sakhawat’s remark on “Sultana’s Dream”).
import { part1 } from './rokeya/part1.js'
import { part2 } from './rokeya/part2.js'
import { part3 } from './rokeya/part3.js'
import { part4 } from './rokeya/part4.js'
import { part5 } from './rokeya/part5.js'

export const rokeya = {
  id: 'begum-rokeya',
  topic: 'people',
  title: 'Begum Rokeya',
  titleBn: 'বেগম রোকেয়া',
  blurb: 'The girl who learned to read in secret, and became one of the greatest writers and educators in Bengal.',
  cast: 'Rokeya Sakhawat Hossain (1880–1932): from a small girl with a long dark braid and a plain cotton frock (childhood, 1880s), to a young woman in a modest sari with a covered head (marriage, 1896), to a widow in a plain white sari with a calm, intelligent face and round spectacles (Calcutta, 1909–1932). Her brother Ibrahim Saber: a young man in a kurta and cap. Her husband Syed Sakhawat Hossain: a kindly man in his forties in a dark coat and a round cap, a trim moustache. Settings: a landlord’s courtyard house with high walls in Pairaband, a bungalow in Bhagalpur on the Ganges, a modest two-room school house in Calcutta, curtained horse-drawn carriages, Dhaka monuments today. Mood: gentle, dignified, warm lamplight.',
  parts: [
    { title: 'A house of walls', titleBn: 'দেয়ালঘেরা বাড়ি' },
    { title: 'A husband who believed in her', titleBn: 'পাশে দাঁড়ানো মানুষ' },
    { title: 'Five girls and a school', titleBn: 'পাঁচজন ছাত্রী আর একটি স্কুল' },
    { title: 'A pen as strong as a sword', titleBn: 'কলমের শক্তি' },
    { title: 'A light that goes on', titleBn: 'নিভে না যাওয়া আলো' },
  ],
  beats: [...part1, ...part2, ...part3, ...part4, ...part5],
}
