import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clock, Shield, MessageCircle } from 'lucide-react'
import QuestionnaireForm from '@components/questionnaire/QuestionnaireForm'
import { FADE_UP, STAGGER_CONTAINER } from '@utils/constants'

const REASSURANCES = [
  { icon: Clock,         text: 'We respond within 24 hours — usually much sooner.' },
  { icon: Shield,        text: 'Your information is private and never shared.' },
  { icon: MessageCircle, text: 'No commitment required — just a conversation.' },
]

const StartProjectPage = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <div className="start-project-page">
      {/* ── Page Header ── */}
      <section className="start-project-page__hero">
        <div className="container">
          <motion.div
            className="start-project-page__hero-inner"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="section-tag" variants={FADE_UP}>
              Let's Build Something
            </motion.span>
            <motion.h1 className="start-project-page__heading" variants={FADE_UP}>
              Ready to Build Something{' '}
              <span className="start-project-page__heading--accent">Extraordinary?</span>
            </motion.h1>
            <motion.p className="start-project-page__sub" variants={FADE_UP}>
              Tell us about your project — it only takes 3 minutes, and we'll
              get back to you with a clear proposal within 24 hours.
              No jargon, no pressure.
            </motion.p>

            {/* Reassurance pills */}
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

      {/* ── Form + Sidebar ── */}
      <section className="start-project-page__body section section--white">
        <div className="container">
          <div className="start-project-page__layout" ref={ref}>

            {/* Multi-step form */}
            <motion.div
              className="start-project-page__form-col"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <QuestionnaireForm />
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              className="start-project-page__sidebar"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* What to expect */}
              <div className="sidebar-card">
                <h3 className="sidebar-card__heading">What happens next?</h3>
                <ol className="sidebar-card__steps">
                  {[
                    { num: '01', title: 'We review your brief',       sub: 'Usually within a few hours of receiving it.' },
                    { num: '02', title: 'You get a clear proposal',   sub: 'Scope, timeline, cost — all in writing.' },
                    { num: '03', title: 'We hop on a quick call',     sub: 'Optional — to answer any questions you have.' },
                    { num: '04', title: 'We start building',          sub: 'With weekly updates all the way through.' },
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

              {/* Testimonial snippet */}
              <div className="sidebar-card sidebar-card--gold">
                <div className="sidebar-card__quote-mark" aria-hidden>"</div>
                <p className="sidebar-card__quote">
                  They replied within 2 hours with a detailed breakdown. I'd
                  spent months talking to other agencies and getting nowhere.
                </p>
                <div className="sidebar-card__author">
                  <div className="sidebar-card__avatar">RM</div>
                  <div>
                    <div className="sidebar-card__author-name">Rahul Mehta</div>
                    <div className="sidebar-card__author-role">Head of Product, FinTrack</div>
                  </div>
                </div>
              </div>

              {/* Direct contact nudge */}
              <div className="sidebar-card">
                <h3 className="sidebar-card__heading">Prefer to just talk?</h3>
                <p className="sidebar-card__text">
                  Skip the form and reach us directly — we're real people and
                  we actually reply.
                </p>
                <div className="sidebar-card__contacts">
                  <a href="https://wa.me/" className="sidebar-card__contact-btn sidebar-card__contact-btn--wa">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.856L.057 23.882l6.197-1.448A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.877 9.877 0 01-5.031-1.374l-.361-.214-3.741.981.998-3.648-.235-.374A9.867 9.867 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z"/>
                    </svg>
                    WhatsApp Us
                  </a>
                  <a href="mailto:hello@youragency.com" className="sidebar-card__contact-btn sidebar-card__contact-btn--email">
                    📧 Send an Email
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
/* Hero */
.start-project-page__hero {
  background: var(--color-bg-subtle);
  padding: var(--space-16) 0 var(--space-12);
  border-bottom: 1px solid var(--color-border);
}
.start-project-page__hero-inner {
  max-width: 700px;
  display: flex; flex-direction: column; gap: var(--space-5);
}
.start-project-page__heading {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 700; color: var(--color-text-primary); line-height: 1.15;
}
.start-project-page__heading--accent { color: var(--color-gold); }
.start-project-page__sub {
  font-size: var(--text-lg); color: var(--color-text-secondary);
  line-height: 1.7; max-width: 580px;
}
.start-project-page__pills {
  display: flex; flex-wrap: wrap; gap: var(--space-3);
}
.start-project-page__pill {
  display: inline-flex; align-items: center; gap: var(--space-2);
  font-family: var(--font-body); font-size: var(--text-xs); font-weight: 600;
  color: var(--color-text-secondary);
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  padding: var(--space-2) var(--space-4); border-radius: var(--radius-full);
}
.start-project-page__pill-icon { color: var(--color-gold); flex-shrink: 0; }

/* Body layout */
.start-project-page__layout {
  display: grid; grid-template-columns: 1fr 360px; gap: var(--space-10);
  align-items: flex-start;
}
.start-project-page__form-col { min-width: 0; }

/* Sidebar */
.start-project-page__sidebar {
  display: flex; flex-direction: column; gap: var(--space-5);
  position: sticky; top: calc(var(--navbar-height) + var(--space-6));
}

/* Sidebar card */
.sidebar-card {
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  display: flex; flex-direction: column; gap: var(--space-4);
  position: relative; overflow: hidden;
}
.sidebar-card--gold {
  background: var(--color-gold-subtle);
  border-color: var(--color-gold-border);
}
.sidebar-card__heading {
  font-family: var(--font-body); font-size: var(--text-base);
  font-weight: 700; color: var(--color-text-primary);
}
.sidebar-card__text {
  font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.65;
}

/* Steps in sidebar */
.sidebar-card__steps { display: flex; flex-direction: column; gap: var(--space-4); }
.sidebar-card__step  { display: flex; align-items: flex-start; gap: var(--space-3); }
.sidebar-card__step-num {
  font-family: var(--font-display); font-size: var(--text-xs); font-weight: 700;
  color: var(--color-gold); flex-shrink: 0; margin-top: 2px; min-width: 24px;
}
.sidebar-card__step-title {
  font-family: var(--font-body); font-size: var(--text-sm); font-weight: 700;
  color: var(--color-text-primary);
}
.sidebar-card__step-sub {
  font-size: var(--text-xs); color: var(--color-text-muted);
  font-family: var(--font-body); margin-top: 2px;
}

/* Testimonial in sidebar */
.sidebar-card__quote-mark {
  font-family: var(--font-display); font-size: 4rem;
  color: var(--color-gold-border); line-height: 1;
  position: absolute; top: 8px; right: 16px; user-select: none;
}
.sidebar-card__quote {
  font-size: var(--text-sm); color: var(--color-text-secondary);
  line-height: 1.7; font-style: italic;
}
.sidebar-card__author { display: flex; align-items: center; gap: var(--space-3); }
.sidebar-card__avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--color-bg-dark); color: var(--color-gold);
  font-family: var(--font-body); font-size: var(--text-xs); font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.sidebar-card__author-name {
  font-family: var(--font-body); font-size: var(--text-sm); font-weight: 700;
  color: var(--color-text-primary);
}
.sidebar-card__author-role {
  font-size: var(--text-xs); color: var(--color-gold-dark); font-family: var(--font-body);
}

/* Contact buttons in sidebar */
.sidebar-card__contacts { display: flex; flex-direction: column; gap: var(--space-3); }
.sidebar-card__contact-btn {
  display: flex; align-items: center; justify-content: center; gap: var(--space-2);
  padding: var(--space-3) var(--space-5); border-radius: var(--radius-full);
  font-family: var(--font-body); font-size: var(--text-sm); font-weight: 600;
  text-decoration: none; transition: var(--transition-base);
}
.sidebar-card__contact-btn--wa {
  background: rgba(37,211,102,0.12); border: 1.5px solid rgba(37,211,102,0.3);
  color: #16a34a;
}
.sidebar-card__contact-btn--wa:hover {
  background: rgba(37,211,102,0.2); border-color: rgba(37,211,102,0.5);
}
.sidebar-card__contact-btn--email {
  background: var(--color-bg-subtle); border: 1.5px solid var(--color-border);
  color: var(--color-text-secondary);
}
.sidebar-card__contact-btn--email:hover {
  border-color: var(--color-gold-border); color: var(--color-gold-dark);
}

@media (max-width: 1024px) {
  .start-project-page__layout { grid-template-columns: 1fr; }
  .start-project-page__sidebar { position: static; }
}
`
if (!document.head.querySelector('[data-sp-page-styles]')) {
  style.setAttribute('data-sp-page-styles', '')
  document.head.appendChild(style)
}
