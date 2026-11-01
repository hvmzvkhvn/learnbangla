import { Link } from 'react-router-dom'

// Set this to a real address once there is one; the contact line only appears when it is filled in.
const CONTACT_EMAIL = 'info@learnbangla.app'

export default function Privacy() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-6">
      <Link to="/" className="text-sm font-bold text-primary">
        ← Back to the app
      </Link>
      <h1 className="mt-2 text-3xl font-extrabold text-primary">Privacy notice</h1>
      <p className="mb-6 text-ink/75">Learn Bangla supports children and adults. We keep learning data to a minimum.</p>

      <Section title="Without an account">
        <p>
          Your progress, XP, streak and answers are saved in this browser on this device. They are not uploaded as learning records unless
          you choose an account. The browser still requests app files, audio and fonts from hosting providers; those requests include
          technical information such as an IP address. Recordings you make with “Say it” stay in memory and are gone when you leave the
          card. Recordings made in the Voice studio are kept in this browser only.
        </p>
      </Section>

      <Section title="With a parent account">
        <p>
          A parent or guardian (18 or over) can sign in so progress follows a child across devices and they can see how the child is doing.
          We then store:
        </p>
        <ul className="ml-5 mt-2 list-disc space-y-1">
          <li>the parent's email address and a password (stored securely by our sign-in provider, never readable by us);</li>
          <li>
            for each learner: a first name or nickname (please don't use a full name), their age group, and their learning progress —
            lessons finished, XP, streak, badges and which words they find tricky.
          </li>
        </ul>
        <p className="mt-2">Children do not have their own accounts, email addresses or passwords.</p>
      </Section>

      <Section title="What we do not do">
        <ul className="ml-5 list-disc space-y-1">
          <li>
            No advertising or behavioural analytics. We do not sell learning data. Hosting, font delivery and optional accounts involve
            service providers described below.
          </li>
          <li>No voice recordings, photos or locations are ever uploaded.</li>
          <li>Only the signed-in parent account can see its learners' information.</li>
        </ul>
      </Section>

      <Section title="Where it lives">
        <p>
          Optional account data is processed by Supabase for sign-in and storage. The site is served by GitHub Pages, and fonts are
          requested from Google Fonts. Hosting and infrastructure providers may retain technical request logs. Contact us for current
          hosting and retention details.
        </p>
      </Section>

      <Section title="Content corrections">
        <p>
          Flags on learning cards stay on your device. “Email a correction” opens a draft addressed to info@learnbangla.app. Review it
          before sending; do not include a child’s full name or other private details.
        </p>
      </Section>
      <Section title="Your control">
        <p>
          From the Account page a parent can download everything stored (a JSON file), remove a learner, or delete the whole account.
          Deletion removes active account and learner records. Provider backups and technical logs follow the providers’ retention policies.
          Sign-out clears the active screen but keeps a recovery copy of progress on this device; clear site data to remove all local copies
          and Voice Studio recordings. Account deletion also removes this device’s cached copies of its learners.
        </p>
        {CONTACT_EMAIL && (
          <p className="mt-2">
            Questions:{' '}
            <a className="font-bold text-primary" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </p>
        )}
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
