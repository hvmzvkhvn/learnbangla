// The honey season in the Sundarbans, told through a fictional boy, Habib, and his crew. The setting, the plants and animals,
// the honey-gathering methods and the Bonbibi tradition are drawn from documented accounts; the characters are invented.
import { part1 } from './sundarbans/part1.js'
import { part2 } from './sundarbans/part2.js'
import { part3 } from './sundarbans/part3.js'
import { part4 } from './sundarbans/part4.js'
import { part5 } from './sundarbans/part5.js'

export const sundarbans = {
  id: 'sundarbans-honey',
  topic: 'nature',
  title: 'The Honey Season',
  titleBn: 'সুন্দরবনে মধুর মৌসুম',
  blurb: 'A boy’s first journey into the Sundarbans with the honey-gatherers, and the forest that feeds and protects a coast.',
  cast: 'Habib: a slim, wiry Bengali boy of thirteen with short black hair, a faded checked shirt and a lungi (grown up and sturdier in the last slide). His father Kader: a lean, weathered mouwal in his forties in a faded lungi and a gamchha around his neck. His mother Rahima: a slim woman in a faded printed cotton sari. Aziz Chacha: an old white-bearded crew leader in a skullcap. Rashid: a wiry, long-armed climber of thirty. The crew: eight village men, Muslim and Hindu. Settings: the Sundarbans mangrove forest, brown tidal rivers and creeks, a long wooden country boat with a low thatched cabin, pneumatophore roots in black mud, spotted deer, crocodile, river dolphins, a Royal Bengal tiger, giant honeybee combs, the small Bonbibi shrine, a village behind a high earthen embankment in Shyamnagar, Satkhira. Mood: golden, humid, quietly awed.',
  parts: [
    { title: 'The edge of the forest', titleBn: 'বনের কিনারায়' },
    { title: 'Into the forest', titleBn: 'বনের ভেতরে' },
    { title: 'The lady of the forest', titleBn: 'বনের মা বনবিবি' },
    { title: 'The honey hunt', titleBn: 'মধু সংগ্রহ' },
    { title: 'Home again', titleBn: 'ঘরে ফেরা' },
  ],
  beats: [...part1, ...part2, ...part3, ...part4, ...part5],
}
