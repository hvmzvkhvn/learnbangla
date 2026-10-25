// Guided stroke-order demos are generated from each glyph (see curriculum/trace.js) and are only shown to
// learners once a Bangla speaker has checked them on the review page (/review/strokes).
//
// Approved by the content reviewer on 2026-10-25 (glyphs they marked wrong are deliberately left out and have no guide yet).
// To approve: list individual glyphs in APPROVED (the review page copies the list for you), or set APPROVE_ALL.
// Words are never listed one by one: set APPROVE_WORDS once the sample on the review page looks right.
// Leave everything as it is and learners only get the (always-on) accuracy-scored tracing.
export const APPROVE_ALL = false
export const APPROVE_WORDS = false
export const APPROVED = new Set(["অ","এ","ঐ","ও","ছ","চ","ঘ","ঙ","খ","গ","আ","ই","ঈ","উ","ঊ","ঋ","ঔ","ক","জ","ঝ","ঞ","ট","ঠ","ড","ঢ","ণ","ত","থ","দ","ধ","ন","প","ফ","ব","ভ","ম","য","র","ল","শ","ষ","হ","ড়","ঢ়","য়","ৎ","ং","ঁ","ক্ষ","ক্ত","ন্ত","ন্ধ","স্ত","স্ক","ত্র","দ্র","ম্ব","প্র","ব্দ","ঙ্গ","দ্ধ","ত্য","০","১","২","৩","৪","৫","৬","৭","৮","৯","কা","কি","কী","কু","কৃ","চা","গা","জা","তা","তি","দি","নি","পি","রু","লু","হু","গূ","দৃ","মৈ","রৈ","লৈ","শো","হো","গৌ","খরগোশ","চুল","বৃষ্টি","শ্রাবণ","ঝাল","গ্রাম","ছাত্র","কবি","ভিডিও","আজ","অফিস","সুস্থ","গামছা","ভাসা","জাহাজ","মন্দির"])

// A reviewer can switch every demo on for their own device from the review page.
const preview = () => {
  try {
    return localStorage.getItem('lb.previewGuides') === 'true'
  } catch {
    return false
  }
}

export const isGuideApproved = (glyph, gKind) => APPROVE_ALL || APPROVED.has(glyph) || (gKind === 'word' && APPROVE_WORDS) || preview()

/** Corrections made on this device's review page (only used while previewing guides). */
export const localEdits = () => {
  try {
    return preview() ? JSON.parse(localStorage.getItem('lb.strokeEdits') ?? '{}') : undefined
  } catch {
    return undefined
  }
}
