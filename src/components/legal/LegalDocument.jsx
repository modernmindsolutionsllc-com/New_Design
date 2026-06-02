import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { COMPANY_NAME, CONTACT_EMAIL, FADE_UP, STAGGER_CONTAINER } from '@utils/constants'

function LegalSection({ section }) {
  return (
    <motion.section className="legal-document__card" variants={FADE_UP}>
      <h2 className="legal-document__section-title">{section.title}</h2>

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="legal-document__paragraph">
          {paragraph}
        </p>
      ))}

      {section.bullets?.length ? (
        <ul className="legal-document__list">
          {section.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </motion.section>
  )
}

const LegalDocument = ({ eyebrow, title, intro, lastUpdated, sections }) => (
  <>
    <section className="legal-document__hero section--gray">
      <div className="container">
        <motion.div
          className="legal-document__hero-inner"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="section-tag" variants={FADE_UP}>{eyebrow}</motion.span>
          <motion.h1 className="legal-document__heading" variants={FADE_UP}>{title}</motion.h1>
          <div className="gold-divider" />
          <motion.p className="legal-document__intro" variants={FADE_UP}>{intro}</motion.p>
          <motion.p className="legal-document__updated" variants={FADE_UP}>
            Last updated: {lastUpdated}
          </motion.p>
        </motion.div>
      </div>
    </section>

    <section className="section section--white">
      <div className="container">
        <div className="legal-document__layout">
          <motion.article
            className="legal-document__article"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
          >
            {sections.map((section) => (
              <LegalSection key={section.title} section={section} />
            ))}
          </motion.article>

          <motion.aside
            className="legal-document__aside"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="legal-document__aside-card">
              <span className="legal-document__aside-label">Need help?</span>
              <h2 className="legal-document__aside-title">Questions about these policies?</h2>
              <p className="legal-document__aside-text">
                If anything on this page is unclear, contact {COMPANY_NAME} and we&apos;ll help
                you understand how it applies to your project or inquiry.
              </p>

              <a className="legal-document__contact-link" href={`mailto:${CONTACT_EMAIL}`}>
                <Mail size={16} aria-hidden />
                {CONTACT_EMAIL}
              </a>

              <Link to="/contact" className="legal-document__contact-button">
                Contact us <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  </>
)

export default LegalDocument

const style = document.createElement('style')
style.textContent = `
.legal-document__hero {
  padding: var(--space-20) 0 var(--space-16);
  background: var(--color-bg-subtle);
  border-bottom: 1px solid var(--color-border);
}
.legal-document__hero-inner {
  max-width: 760px;
}
.legal-document__heading {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 4vw, 3.5rem);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.12;
  margin-bottom: var(--space-4);
}
.legal-document__intro {
  font-size: var(--text-lg);
  line-height: 1.75;
  color: var(--color-text-secondary);
  max-width: 640px;
}
.legal-document__updated {
  margin-top: var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-muted);
}
.legal-document__layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: var(--space-10);
  align-items: start;
}
.legal-document__article {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}
.legal-document__card,
.legal-document__aside-card {
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
}
.legal-document__card {
  padding: var(--space-8);
}
.legal-document__section-title {
  margin-bottom: var(--space-4);
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
}
.legal-document__paragraph {
  margin: 0 0 var(--space-4);
  font-size: var(--text-base);
  line-height: 1.85;
  color: var(--color-text-secondary);
}
.legal-document__paragraph:last-of-type {
  margin-bottom: 0;
}
.legal-document__list {
  margin: 0;
  padding-left: 1.25rem;
  display: grid;
  gap: var(--space-3);
  color: var(--color-text-secondary);
}
.legal-document__list li {
  line-height: 1.75;
}
.legal-document__aside {
  position: sticky;
  top: calc(var(--navbar-height) + var(--space-6));
}
.legal-document__aside-card {
  padding: var(--space-10) var(--space-12) var(--space-10) var(--space-10);
}
.legal-document__aside-label {
  display: inline-block;
  margin-bottom: var(--space-3);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-gold-dark);
}
.legal-document__aside-title {
  margin-bottom: var(--space-3);
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
}
.legal-document__aside-text {
  margin-bottom: var(--space-5);
  font-size: var(--text-sm);
  line-height: 1.75;
  color: var(--color-text-secondary);
}
.legal-document__contact-link,
.legal-document__contact-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  transition: var(--transition-base);
}
.legal-document__contact-link {
  max-width: 100%;
  margin-bottom: var(--space-4);
  font-weight: 600;
  color: var(--color-gold-dark);
  overflow-wrap: anywhere;
}
.legal-document__contact-link:hover {
  color: var(--color-gold);
}
.legal-document__contact-button {
  font-weight: 700;
  color: var(--color-text-primary);
}
.legal-document__contact-button:hover {
  color: var(--color-gold-dark);
}
@media (max-width: 980px) {
  .legal-document__layout {
    grid-template-columns: 1fr;
  }
  .legal-document__aside {
    position: static;
  }
}
@media (max-width: 640px) {
  .legal-document__card,
  .legal-document__aside-card {
    padding: var(--space-8);
  }
}
`
if (!document.head.querySelector('[data-legal-document-styles]')) {
  style.setAttribute('data-legal-document-styles', '')
  document.head.appendChild(style)
}
