import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import VisualText from '../art/VisualText'
import UiIcon from '../art/UiIcon'
import { wordCategories } from '../data/words'
import Speaker from '../components/Speaker'
import RomanToggle from '../components/RomanToggle'
import WordGuide from '../components/WordGuide'
import { useRoman } from '../state/roman'
import { usePersistent } from '../state/persist'
const ICONS = {
  greetings: 'wave',
  family: 'people',
  pronouns: 'person',
  numbers: '🔢',
  'bigger-numbers': '🔢',
  biggerNumbers: '🔢',
  tens: '🔢',
  colours: 'palette',
  animals: 'paw',
  food: 'food',
  body: 'person',
  'around-us': 'home',
  bangladesh: 'pin',
  days: 'calendar',
  months: 'calendar',
  seasons: 'sun',
  adjectives: 'star',
  verbs: 'bolt',
  questions: 'question',
}
export default function Words() {
  const [romanOn] = useRoman(),
    [params, setParams] = useSearchParams()
  const [savedTopic, setSavedTopic] = usePersistent('lb.wordsTopic', wordCategories[0].key)
  const activeKey = params.get('topic') || savedTopic
  const active = wordCategories.find((c) => c.key === activeKey) || wordCategories[0]
  const [allTopics, setAllTopics] = useState(false)
  const strip = useRef(null),
    chooser = useRef(null),
    chooserButton = useRef(null),
    categoryFocus = useRef(false)
  useEffect(() => {
    const el = strip.current?.querySelector('[aria-pressed="true"]')
    if (el && strip.current) strip.current.scrollLeft = Math.max(0, el.offsetLeft - strip.current.clientWidth / 2 + el.clientWidth / 2)
  }, [active.key])
  useEffect(() => {
    let y = 0
    try {
      y = Number(sessionStorage.getItem('lb.wordsScroll') || 0)
    } catch {
      /* optional */
    }
    const frame = requestAnimationFrame(() => window.scrollTo(0, y))
    const remember = () => {
      try {
        sessionStorage.setItem('lb.wordsScroll', String(window.scrollY))
      } catch {
        /* optional */
      }
    }
    window.addEventListener('scroll', remember, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', remember)
    }
  }, [])
  useEffect(() => {
    if (allTopics) chooser.current?.querySelector('button')?.focus()
  }, [allTopics])
  function choose(key) {
    setSavedTopic(key)
    setParams({ topic: key }, { replace: true })
    setAllTopics(false)
    if (categoryFocus.current) {
      chooserButton.current?.focus()
      categoryFocus.current = false
    }
  }
  return (
    <div className="words-page py-2">
      <div className="page-title-row">
        <div>
          <h1 className="text-3xl font-bold text-primary">Bangla Words</h1>
          <p className="text-muted">
            <span lang="bn">শব্দ</span> — pick a topic.
          </p>
        </div>
        <RomanToggle />
      </div>
      <WordGuide />
      <div className="topic-toolbar">
        <button
          ref={chooserButton}
          type="button"
          className="btn-quiet"
          aria-expanded={allTopics}
          aria-controls="all-topics"
          onClick={() => {
            categoryFocus.current = true
            setAllTopics((v) => !v)
          }}
        >
          All topics <UiIcon name="down" />
        </button>
        <span className="text-sm text-muted">{wordCategories.length} topics · swipe or use the arrows</span>
      </div>
      {allTopics && (
        <div
          id="all-topics"
          ref={chooser}
          className="topic-picker"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setAllTopics(false)
              chooserButton.current?.focus()
            }
          }}
        >
          {wordCategories.map((c) => (
            <button key={c.key} type="button" aria-pressed={active.key === c.key} onClick={() => choose(c.key)}>
              <span>{c.title}</span>
              {active.key === c.key && <UiIcon name="check" />}
            </button>
          ))}
        </div>
      )}
      <div className="topic-scroll-controls">
        <button className="btn-icon" aria-label="Earlier topics" onClick={() => strip.current?.scrollBy({ left: -240, behavior: 'auto' })}>
          <UiIcon name="left" />
        </button>
        <div className="topic-strip" ref={strip} role="group" aria-label="Word topics">
          {wordCategories.map((c) => (
            <button key={c.key} type="button" aria-pressed={active.key === c.key} onClick={() => choose(c.key)} className="topic-chip">
              <UiIcon name={ICONS[c.key] || 'compass'} />
              <span>{c.title}</span>
              {active.key === c.key && <UiIcon name="check" />}
            </button>
          ))}
        </div>
        <button className="btn-icon" aria-label="More topics" onClick={() => strip.current?.scrollBy({ left: 240, behavior: 'auto' })}>
          <UiIcon name="right" />
        </button>
      </div>
      <div className="topic-title">
        <h2 className="text-xl font-bold">{active.title}</h2>
        <span className="text-sm text-muted" role="status">
          {active.words.length} words
        </span>
      </div>
      {active.note && <p className="learning-note">{active.note}</p>}
      <div className="browse-grid word-grid">
        {active.words.map((w) => (
          <article key={w.bn + w.en} className="card word-card">
            <div className="word-picture">
              <VisualText decorative>{w.digit ?? w.emoji}</VisualText>
            </div>
            <p lang="bn" className="word-bangla font-bangla text-2xl font-bold leading-snug text-primary">
              {w.bn}
            </p>
            {romanOn && <p className="word-roman">{w.roman}</p>}
            <p className="word-meaning">{w.en}</p>
            <div className="word-audio">
              <Speaker text={w.bn} size="sm" label={`Hear ${w.en} in Bangla`} />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
