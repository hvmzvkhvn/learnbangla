// The Language Movement, 1947–2000: from the first booklet to International Mother Language Day.
// Facts are drawn from well-documented accounts; where sources differ (for example the number of dead on 21 February 1952) the text says so.
import { part1 } from './bhasha/part1.js'
import { part2 } from './bhasha/part2.js'
import { part3 } from './bhasha/part3.js'
import { part4 } from './bhasha/part4.js'
import { part5 } from './bhasha/part5.js'

export const bhasha = {
  id: 'bhasha-andolon',
  topic: 'history',
  title: 'The Language Movement',
  titleBn: 'ভাষা আন্দোলন',
  blurb: 'How people in East Bengal fought for the right to use Bangla, from 1947 to International Mother Language Day.',
  cast: 'Historical scenes of Dhaka and East Bengal, 1947–1971, painted with dignity and without graphic violence (never show wounds or blood). Students: young Bengali men in plain white or checked shirts and trousers or lungis, young women in simple cotton saris with braids. Older leaders: white kurtas, waistcoats, sherwanis and caps. Police in khaki with long sticks. Settings: Dhaka University lawns and the old mango tree, Curzon Hall, Dhaka Medical College, narrow streets of Old Dhaka, the Shaheed Minar (tall central white column flanked by shorter ones before a red sun). Mood: earnest, solemn, with warm light.',
  parts: [
    { title: 'A new country, an old language', titleBn: 'নতুন দেশ, পুরোনো ভাষা' },
    { title: 'The years of waiting', titleBn: 'অপেক্ষার বছরগুলো' },
    { title: 'February 1952', titleBn: 'বায়ান্নর ফেব্রুয়ারি' },
    { title: 'Out of the grief', titleBn: 'শোক থেকে শক্তি' },
    { title: 'A day for the world', titleBn: 'বিশ্বের একুশ' },
  ],
  beats: [...part1, ...part2, ...part3, ...part4, ...part5],
}
