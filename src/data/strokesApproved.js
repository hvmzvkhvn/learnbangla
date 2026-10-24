// Guided stroke-order demos are generated from each glyph (see curriculum/trace.js) and are only shown to
// learners once a Bangla speaker has checked them on the review page (/review/strokes).
//
// To approve: list individual glyphs in APPROVED (the review page copies the list for you), or set APPROVE_ALL.
// Words are never listed one by one: set APPROVE_WORDS once the sample on the review page looks right.
// Leave everything as it is and learners only get the (always-on) accuracy-scored tracing.
export const APPROVE_ALL = false
export const APPROVE_WORDS = false
export const APPROVED = new Set([])

// A reviewer can switch every demo on for their own device from the review page.
const preview = () => {
  try {
    return localStorage.getItem('lb.previewGuides') === 'true'
  } catch {
    return false
  }
}

export const isGuideApproved = (glyph, gKind) => APPROVE_ALL || APPROVED.has(glyph) || (gKind === 'word' && APPROVE_WORDS) || preview()
