import { Link } from 'react-router-dom'

// Set this to a real address once there is one; the contact line only appears when it is filled in.
const CONTACT_EMAIL = null

export default function Privacy() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-6">
      <Link to="/" className="text-sm font-bold text-primary">← Back to the app</Link>
      <h1 className="mt-2 text-3xl font-extrabold text-primary">Privacy notice</h1>
      <p className="mb-6 text-ink/60">Learn Bangla is built for children, so it keeps as little as possible.</p>

      <Section title="Without an account">
        <p>Nothing is sent anywhere. Your progress, XP, streak and answers are saved only in this browser on this device. Recordings you make with “Say it” stay in memory and are gone when you leave the card. Recordings made in the Voice studio are kept in this browser only.</p>
      </Section>

      <Section title="With a parent account">
        <p>A parent or guardian (18 or over) can sign in so progress follows a child across devices and they can see how the child is doing. We then store:</p>
        <ul className="ml-5 mt-2 list-disc space-y-1">
          <li>the parent's email address and a password (stored securely by our sign-in provider, never readable by us);</li>
          <li>for each learner: a first name or nickname (please don't use a full name), their age group, and their learning progress — lessons finished, XP, streak, badges and which words they find tricky.</li>
        </ul>
        <p className="mt-2">Children do not have their own accounts, email addresses or passwords.</p>
      </Section>

      <Section title="What we do not do">
        <ul className="ml-5 list-disc space-y-1">
          <li>No advertising, no tracking cookies, no analytics, no selling or sharing of data.</li>
          <li>No voice recordings, photos or locations are ever uploaded.</li>
          <li>Only the signed-in parent account can see its learners' information.</li>
        </ul>
      </Section>

      <Section title="Where it lives">
        <p>Account data is held by Supabase (database and sign-in), in the EU (Ireland). The site itself is served by GitHub Pages.</p>
      </Section>

      <Section title="Your control">
        <p>From the Account page a parent can download everything stored (a JSON file), remove a learner, or delete the whole account. Deleting removes the email, every learner and all their progress straight away.</p>
        {CONTACT_EMAIL && <p className="mt-2">Questions: <a className="font-bold text-primary" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>}
      </Section>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section className="mb-5">
      <h2 className="mb-1 text-xl font-extrabold text-ink">{title}</h2>
      <div className="text-ink/80">{children}</div>
    </section>
  )
}
