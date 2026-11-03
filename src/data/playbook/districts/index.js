// District stories (16–18 and 18+): sixteen districts so far, eight chapters each (batch 1: one per division; batch 2: richer-history districts).
// Chapters use the same shape as the division deep dives (see ../divisions/helpers.js).
import { narayanganj } from './narayanganj.js'
import { bandarban } from './bandarban.js'
import { sunamganj } from './sunamganj.js'
import { patuakhali } from './patuakhali.js'
import { kushtia } from './kushtia.js'
import { bogura } from './bogura.js'
import { netrokona } from './netrokona.js'
import { dinajpur } from './dinajpur.js'
import { cumilla } from './cumilla.js'
import { rajshahi } from './rajshahi.js'
import { jashore } from './jashore.js'
import { tangail } from './tangail.js'
import { sylhet } from './sylhet.js'
import { chattogram } from './chattogram.js'
import { coxsbazar } from './coxsbazar.js'
import { khulna } from './khulna.js'

export const districtArtPath = (id, index) => `images/playbook/districts/${id}-${String(index + 1).padStart(2, '0')}.webp`

const meta = [
  ['narayanganj', 'Narayanganj', 'নারায়ণগঞ্জ', 'dhaka', narayanganj],
  ['bandarban', 'Bandarban', 'বান্দরবান', 'chattogram', bandarban],
  ['sunamganj', 'Sunamganj', 'সুনামগঞ্জ', 'sylhet', sunamganj],
  ['patuakhali', 'Patuakhali', 'পটুয়াখালী', 'barishal', patuakhali],
  ['kushtia', 'Kushtia', 'কুষ্টিয়া', 'khulna', kushtia],
  ['bogura', 'Bogura', 'বগুড়া', 'rajshahi', bogura],
  ['netrokona', 'Netrokona', 'নেত্রকোনা', 'mymensingh', netrokona],
  ['dinajpur', 'Dinajpur', 'দিনাজপুর', 'rangpur', dinajpur],
  ['cumilla', 'Cumilla', 'কুমিল্লা', 'chattogram', cumilla],
  ['rajshahi', 'Rajshahi', 'রাজশাহী', 'rajshahi', rajshahi],
  ['jashore', 'Jashore', 'যশোর', 'khulna', jashore],
  ['tangail', 'Tangail', 'টাঙ্গাইল', 'dhaka', tangail],
  ['sylhet', 'Sylhet', 'সিলেট', 'sylhet', sylhet],
  ['chattogram', 'Chattogram', 'চট্টগ্রাম', 'chattogram', chattogram],
  ['coxsbazar', 'Cox’s Bazar', 'কক্সবাজার', 'chattogram', coxsbazar],
  ['khulna', 'Khulna', 'খুলনা', 'khulna', khulna],
]

export const districtStories = Object.fromEntries(meta.map(([id, name, nameBn, division, chapters]) => [id, {
  id, name, nameBn, division, title: `${name} District`, chapters,
  panels: chapters.map((ch, i) => ({
    label: ch.heading, heading: ch.heading, art: districtArtPath(id, i), en: ch.en, deep: [ch.deep],
    bn: ch.main.bn, roman: ch.main.roman, lineEn: ch.main.en, more: ch.more,
  })),
}]))

export const districtsOf = (divisionId) => Object.values(districtStories).filter((d) => d.division === divisionId)
