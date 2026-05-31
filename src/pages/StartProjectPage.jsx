import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clock, Shield, Sparkles } from 'lucide-react'
import QuestionnaireForm from '@components/questionnaire/QuestionnaireForm'
import { FADE_UP, STAGGER_CONTAINER, CONTACT_EMAIL } from '@utils/constants'

const REASSURANCES = [
  { icon: Clock, text: 'We follow up within 24 hours, often sooner.' },
  { icon: Shield, text: 'Your information stays private and secure.' },
  { icon: Sparkles, text: 'Beginner-friendly process, no technical pressure.' },
]

const PREVIEW_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80'

const StartProjectPage = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div className="start-project-page">
      <section className="start-project-page__hero">
        <div className="container">
          <motion.div
            className="start-project-page__hero-inner"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="section-tag" variants={FADE_UP}>
              Business Needs Finder
            </motion.span>
            <motion.h1 className="start-project-page__heading" variants={FADE_UP}>
              Let&apos;s Find What Your Business
              <span className="start-project-page__heading--accent"> Needs Next</span>
            </motion.h1>
            <motion.p className="start-project-page__sub" variants={FADE_UP}>
              Tell us about your business, goals, and stage. We&apos;ll turn that into practical recommendations for the right website, marketing, app, or automation solution.
            </motion.p>

            <motion.div className="start-project-page__pills" variants={FADE_UP}>
              {REASSURANCES.map(({ icon: Icon, text }) => (
                <div key={text} className="start-project-page__pill">
                  <Icon size={14} className="start-project-page__pill-icon" />
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="start-project-page__body section section--white">
        <div className="container">
          <div className="start-project-page__layout" ref={ref}>
            <motion.div
              className="start-project-page__form-col"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <QuestionnaireForm />
            </motion.div>

            <motion.aside
              className="start-project-page__sidebar"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="sidebar-visual">
                <img
                  src={PREVIEW_IMAGE}
                  alt="Business consultation planning session"
                  className="sidebar-visual__image"
                />
                <div className="sidebar-visual__overlay" />
                <div className="sidebar-visual__content">
                  <span className="sidebar-visual__eyebrow">Clarity first</span>
                  <h3 className="sidebar-visual__title">We help business owners decide what to build before they spend.</h3>
                </div>
              </div>

              <div className="sidebar-card">
                <h3 className="sidebar-card__heading">What happens next?</h3>
                <ol className="sidebar-card__steps">
                  {[
                    { num: '01', title: 'We review your brief', sub: 'Usually within a few hours.' },
                    { num: '02', title: 'We map out your best-fit solution', sub: 'Clear recommendations based on your business goals.' },
                    { num: '03', title: 'We share the next steps', sub: 'Scope, timeline, and consultation options in plain language.' },
                    { num: '04', title: 'We start building momentum', sub: 'Delivery begins once you feel confident about the plan.' },
                  ].map(({ num, title, sub }) => (
                    <li key={num} className="sidebar-card__step">
                      <span className="sidebar-card__step-num">{num}</span>
                      <div>
                        <div className="sidebar-card__step-title">{title}</div>
                        <div className="sidebar-card__step-sub">{sub}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="sidebar-card sidebar-card--gold">
                <div className="sidebar-card__quote-mark" aria-hidden>"</div>
                <p className="sidebar-card__quote">
                  The process was clear and easy to follow. Their team helped us understand what we actually needed before we spent money in the wrong places.
                </p>
                <div className="sidebar-card__author">
                  <div className="sidebar-card__avatar">CA</div>
                  <div>
                    <div className="sidebar-card__author-name">Client Feedback</div>
                    <div className="sidebar-card__author-role">Business owner</div>
                  </div>
                </div>
              </div>

              <div className="sidebar-card">
                <h3 className="sidebar-card__heading">Prefer direct contact?</h3>
                <p className="sidebar-card__text">
                  You can skip the form and contact us directly if you already know you want to talk.
                </p>
                <div className="sidebar-card__contacts">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="sidebar-card__contact-btn sidebar-card__contact-btn--email">
                    Send an Email
                  </a>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default StartProjectPage

const style = document.createElement('style')
style.textContent = `
.start-project-page__hero {
  background: var(--color-bg-subtle);
  padding: var(--space-16) 0 var(--space-12);
  border-bottom: 1px solid var(--color-border);
}
.start-project-page__hero-inner {
  max-width: 760px;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}
.start-project-page__heading {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.15;
}
.start-project-page__heading--accent {
  color: var(--color-gold);
}
.start-project-page__sub {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 680px;
}
.start-project-page__pills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
.start-project-page__pill {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
}
.start-project-page__pill-icon {
  color: var(--color-gold);
  flex-shrink: 0;
}

.start-project-page__layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: var(--space-10);
  align-items: flex-start;
}
.start-project-page__form-col {
  min-width: 0;
}

.start-project-page__sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  position: sticky;
  top: calc(var(--navbar-height) + var(--space-6));
}

.sidebar-visual {
  position: relative;
  min-height: 240px;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-lg);
}
.sidebar-visual__image {
  width: 100%;
  height: 100%;
  min-height: 240px;
  object-fit: cover;
}
.sidebar-visual__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(11, 18, 40, 0.08) 8%, rgba(11, 18, 40, 0.68) 100%);
}
.sidebar-visual__content {
  position: absolute;
  inset: auto 0 0 0;
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.sidebar-visual__eyebrow {
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.8);
}
.sidebar-visual__title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  line-height: 1.35;
  color: white;
}

.sidebar-card {
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  position: relative;
  overflow: hidden;
}
.sidebar-card--gold {
  background: var(--color-gold-subtle);
  border-color: var(--color-gold-border);
}
.sidebar-card__heading {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
}
.sidebar-card__text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.65;
}

.sidebar-card__steps {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.sidebar-card__step {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}
.sidebar-card__step-num {
  font-family: var(--font-display);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-gold);
  flex-shrink: 0;
  margin-top: 2px;
  min-width: 24px;
}
.sidebar-card__step-title {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}
.sidebar-card__step-sub {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: var(--font-body);
  margin-top: 2px;
}

.sidebar-card__quote-mark {
  font-family: var(--font-display);
  font-size: 4rem;
  color: var(--color-gold-border);
  line-height: 1;
  position: absolute;
  top: 8px;
  right: 16px;
  user-select: none;
}
.sidebar-card__quote {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-style: italic;
}
.sidebar-card__author {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.sidebar-card__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-bg-dark);
  color: var(--color-gold);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.sidebar-card__author-name {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}
.sidebar-card__author-role {
  font-size: var(--text-xs);
  color: var(--color-gold-dark);
  font-family: var(--font-body);
}

.sidebar-card__contacts {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.sidebar-card__contact-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition-base);
}
.sidebar-card__contact-btn--email {
  background: var(--color-bg-subtle);
  border: 1.5px solid var(--color-border);
  color: var(--color-text-secondary);
}
.sidebar-card__contact-btn--email:hover {
  border-color: var(--color-gold-border);
  color: var(--color-gold-dark);
}

@media (max-width: 1024px) {
  .start-project-page__layout {
    grid-template-columns: 1fr;
  }
  .start-project-page__sidebar {
    position: static;
  }
}
`
if (!document.head.querySelector('[data-sp-page-styles]')) {
  style.setAttribute('data-sp-page-styles', '')
  document.head.appendChild(style)
}
