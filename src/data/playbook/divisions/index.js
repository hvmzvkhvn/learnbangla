// The eight divisions in depth (16–18 and 18+): twelve chapters each, opened from the Explore map and the Playbook.
import { divisionPages } from './helpers.js'
import { dhaka } from './dhaka.js'
import { chattogram } from './chattogram.js'
import { sylhet } from './sylhet.js'
import { barishal } from './barishal.js'
import { khulna } from './khulna.js'
import { rajshahi } from './rajshahi.js'
import { mymensingh } from './mymensingh.js'
import { rangpur } from './rangpur.js'

const meta = {
  dhaka: ['Dhaka Division in depth', 'ঢাকা বিভাগ', dhaka],
  chattogram: ['Chattogram Division in depth', 'চট্টগ্রাম বিভাগ', chattogram],
  sylhet: ['Sylhet Division in depth', 'সিলেট বিভাগ', sylhet],
  barishal: ['Barishal Division in depth', 'বরিশাল বিভাগ', barishal],
  khulna: ['Khulna Division in depth', 'খুলনা বিভাগ', khulna],
  rajshahi: ['Rajshahi Division in depth', 'রাজশাহী বিভাগ', rajshahi],
  mymensingh: ['Mymensingh Division in depth', 'ময়মনসিংহ বিভাগ', mymensingh],
  rangpur: ['Rangpur Division in depth', 'রংপুর বিভাগ', rangpur],
}

export const divisionStories = Object.fromEntries(Object.entries(meta).map(([id, [title, titleBn, chapters]]) => [id, { id, title, titleBn, chapters, panels: divisionPages(id, chapters) }]))
