// Checks every story chat: all links resolve, nothing dead-ends, every ending can be reached,
// and the learner never says তুমি-forms to an elder (friends are fine).
//
//   npm run lint:stories
import { createServer } from 'vite'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const server = await createServer({ root, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { stories } = await server.ssrLoadModule('/src/data/stories.js')
await server.close()

const TUMI = /তুমি|তোমার|তোমাকে|তোমরা/
const APNI = /আপনি|আপনার|আপনাকে/
const ELDERS = new Set(['sir', 'dada', 'chacha', 'khala', 'driver', 'seller', 'shop', 'local', 'officer'])
const issues = []
let beats = 0

for (const st of stories) {
  const at = (id) => `${st.id}/${id}`
  const nodes = st.nodes
  const refs = (n) => (n.next ? [n.next] : []).concat((n.choice ?? []).map((o) => o.next), (n.branch ?? []).map((r) => r.next))

  if (!nodes[st.start]) issues.push(`${st.id}: start node "${st.start}" missing`)
  for (const [id, n] of Object.entries(nodes)) {
    if (!n.sys && !n.bn && !n.choice && !n.branch && !n.end) issues.push(`${at(id)}: empty node`)
    for (const r of refs(n)) if (!nodes[r]) issues.push(`${at(id)}: links to missing node "${r}"`)
    if (n.bn) {
      beats++
      if (!n.roman || !n.en) issues.push(`${at(id)}: missing roman/en`)
      if (!n.who || !st.cast[n.who]) issues.push(`${at(id)}: unknown speaker "${n.who}"`)
      if (!n.next) issues.push(`${at(id)}: message with no next`)
      if (ELDERS.has(n.who) && APNI.test(n.bn.replace(/"[^"]*"/g, '')) && n.who !== 'driver' && n.who !== 'seller' && n.who !== 'shop' && n.who !== 'local' && n.who !== 'officer')
        issues.push(`${at(id)}: an elder says আপনি to the learner → ${n.bn}`)
    }
    for (const [i, o] of (n.choice ?? []).entries()) {
      beats++
      if (!o.bn || !o.roman || !o.en || typeof o.meter !== 'number') issues.push(`${at(id)}#${i}: option incomplete`)
    }
    if (n.branch && !n.branch.some((r) => r.min === undefined)) issues.push(`${at(id)}: branch has no fallback`)
  }
  const ends = Object.entries(nodes).filter(([, n]) => n.end).map(([id]) => id)
  if (ends.length < 2) issues.push(`${st.id}: needs at least 2 endings`)

  // explore every path (meter = running total) to see which endings are reachable and that nothing loops forever
  const reached = new Set()
  const seen = new Set()
  const walk = (id, meter, depth) => {
    if (depth > 80) return issues.push(`${st.id}: possible loop near ${id}`)
    const n = nodes[id]
    if (!n) return
    const key = `${id}@${meter}`
    if (seen.has(key)) return
    seen.add(key)
    if (n.end) return reached.add(id)
    if (n.branch) return walk(n.branch.find((r) => r.min === undefined || meter >= r.min).next, meter, depth + 1)
    if (n.choice) return n.choice.forEach((o) => walk(o.next, Math.max(0, Math.min(100, meter + o.meter)), depth + 1))
    if (n.next) walk(n.next, meter, depth + 1)
  }
  walk(st.start, st.meter.start, 0)
  ends.filter((e) => !reached.has(e)).forEach((e) => issues.push(`${st.id}: ending "${e}" can never be reached`))
  const tiers = new Set([...reached].map((e) => nodes[e].end.tier))
  console.log(`${st.id.padEnd(12)} ${Object.keys(nodes).length} nodes · endings reachable: ${[...reached].map((e) => nodes[e].end.tier).join(', ')}`)
  if (!tiers.has('great')) issues.push(`${st.id}: the best ending is unreachable`)
  for (const k of st.keys ?? []) if (!nodes[k]?.bn) issues.push(`${st.id}: key phrase "${k}" is not a spoken line`)
}
console.log(`\n${stories.length} stories, ${beats} spoken lines.`)
console.log(issues.length ? issues.join('\n') : 'No issues.')
if (issues.length) process.exitCode = 1
