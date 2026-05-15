import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles, Timer } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FADE_UP, STAGGER_CONTAINER } from '@utils/constants'

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero__blob hero__blob--1" aria-hidden />
      <div className="hero__blob hero__blob--2" aria-hidden />

      <div className="container hero__inner">
        <motion.div
          className="hero__content"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="section-tag" variants={FADE_UP}>
            WEB SOLUTIONS THAT MATTER
          </motion.span>

          <motion.h1 className="hero__heading" variants={FADE_UP}>
            We Build Digital
            <span className="hero__heading--accent">Experiences That Move People.</span>
          </motion.h1>

          <motion.p className="hero__subline" variants={FADE_UP}>
            Modern, performant web solutions that help businesses stand out, scale faster,
            and deliver measurable results.
          </motion.p>

          <motion.div className="hero__actions" variants={FADE_UP}>
            <Link to="/start-project" className="btn btn--primary btn--lg hero__cta-primary">
              Start a Project
              <ArrowRight size={18} />
            </Link>
            <Link to="/services" className="btn btn--ghost btn--lg hero__cta-secondary">
              See Our Work
            </Link>
          </motion.div>

          <motion.ul className="hero__highlights" variants={FADE_UP}>
            <li className="hero__highlight-item">
              <ShieldCheck size={16} />
              <span>Enterprise-grade architecture</span>
            </li>
            <li className="hero__highlight-item">
              <Timer size={16} />
              <span>Fast iteration cycles</span>
            </li>
            <li className="hero__highlight-item">
              <Sparkles size={16} />
              <span>Performance-first engineering</span>
            </li>
          </motion.ul>

          <motion.div className="hero__trust" variants={FADE_UP}>
            <div className="hero__avatars" aria-hidden>
              {['PS', 'RM', 'AB', 'AD'].map((initials) => (
                <div key={initials} className="hero__avatar">
                  {initials}
                </div>
              ))}
            </div>
            <p className="hero__trust-text">
              Trusted by <strong>30+ clients</strong> across startups and enterprises
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__card">
            <div className="hero__mockup-bar">
              <span className="hero__dot" style={{ background: '#FF5F57' }} />
              <span className="hero__dot" style={{ background: '#FFBD2E' }} />
              <span className="hero__dot" style={{ background: '#28C840' }} />
              <div className="hero__url-bar">modernmind.app</div>
            </div>
            <div className="hero__mockup-body">
              {[80, 60, 70, 45, 55].map((w, i) => (
                <div
                  key={i}
                  className="hero__mockup-line"
                  style={{ width: `${w}%`, animationDelay: `${i * 0.15}s` }}
                />
              ))}
              <div className="hero__mockup-cards">
                {['Web Apps', 'Mobile Apps', 'AI Automation'].map((label) => (
                  <div key={label} className="hero__mockup-chip">
                    {label}
                  </div>
                ))}
              </div>
              {[65, 50].map((w, i) => (
                <div
                  key={i}
                  className="hero__mockup-line"
                  style={{ width: `${w}%`, animationDelay: `${(i + 5) * 0.15}s` }}
                />
              ))}
            </div>
            <motion.div
              className="hero__badge"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <span className="hero__badge-icon">✦</span>
              <div>
                <div className="hero__badge-title">Project Delivered</div>
                <div className="hero__badge-sub">2 weeks ahead of schedule</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="hero__logos">
        <div className="container">
          <p className="hero__logos-label">OUR TOOLKIT</p>
          <div className="hero__logos-row">
            {['React', 'Next.js', 'Vue.js', 'Node.js', 'Python', 'TypeScript'].map((name) => (
              <div key={name} className="hero__logo-item">
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

const style = document.createElement('style')
style.textContent = `
.hero {
  min-height: 100vh;
  padding-top: calc(var(--navbar-height) + var(--space-16));
  padding-bottom: var(--space-8);
  background:
    radial-gradient(circle at 16% 18%, rgba(45, 103, 248, 0.09) 0%, transparent 34%),
    radial-gradient(circle at 82% 12%, rgba(201, 168, 76, 0.16) 0%, transparent 38%),
    linear-gradient(180deg, var(--color-bg) 0%, color-mix(in srgb, var(--color-bg-subtle) 40%, var(--color-bg) 60%) 100%);
  position: relative;
  overflow: hidden;
}

.hero__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}

.hero__blob--1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(201, 168, 76, 0.1) 0%, transparent 70%);
  top: -100px;
  right: -100px;
}

.hero__blob--2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(45, 103, 248, 0.11) 0%, transparent 70%);
  bottom: 100px;
  left: -80px;
}

.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.hero__heading {
  font-size: clamp(2.5rem, 5vw, 3.85rem);
  line-height: 1.05;
  color: var(--color-text-primary);
  max-width: 14ch;
}

.hero__heading--accent {
  background: linear-gradient(90deg, #18b6c9 0%, #28a7ff 45%, #4f63ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  display: block;
}

.hero__subline {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.75;
  max-width: 540px;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  align-items: center;
}

.hero__cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
  color: var(--color-bg-dark);
  border-color: var(--color-gold);
  font-weight: 700;
  font-size: var(--text-base);
  padding: 0.9rem 1.8rem;
  border-radius: var(--radius-full);
  transition: var(--transition-base);
  text-decoration: none;
  border: 1px solid color-mix(in srgb, var(--color-gold-dark) 75%, black 25%);
}

.hero__cta-primary:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-gold);
}

.hero__cta-secondary {
  border-radius: var(--radius-full);
}

.hero__highlights {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.hero__highlight-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.42rem 0.78rem;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-primary);
  background: color-mix(in srgb, var(--color-bg-white) 78%, transparent 22%);
  border: 1px solid color-mix(in srgb, var(--color-border) 86%, transparent 14%);
}

.hero__highlight-item svg {
  color: var(--color-gold);
}

.hero__trust {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.hero__avatars {
  display: flex;
}

.hero__avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-bg-dark);
  color: var(--color-gold);
  font-size: var(--text-xs);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-bg-white);
  margin-right: -8px;
}

.hero__trust-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-left: 16px;
}

.hero__trust-text strong {
  color: var(--color-text-primary);
}

.hero__visual {
  position: relative;
}

.hero__card {
  background: color-mix(in srgb, var(--color-bg-white) 86%, transparent 14%);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  position: relative;
  backdrop-filter: blur(8px);
}

.hero__mockup-bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-subtle);
}

.hero__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.hero__url-bar {
  flex: 1;
  margin-left: var(--space-3);
  background: var(--color-bg);
  border-radius: var(--radius-full);
  padding: 0.25rem 0.75rem;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: var(--font-body);
}

.hero__mockup-body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.hero__mockup-line {
  height: 12px;
  border-radius: var(--radius-full);
  background: linear-gradient(90deg, var(--color-border) 0%, var(--color-bg-subtle) 100%);
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.hero__mockup-cards {
  display: flex;
  gap: var(--space-2);
  flex-wrap: wrap;
  margin: var(--space-2) 0;
}

.hero__mockup-chip {
  background: var(--color-gold-subtle);
  border: 1px solid var(--color-gold-border);
  color: var(--color-gold-dark);
  font-size: var(--text-xs);
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
}

.hero__badge {
  position: absolute;
  bottom: -1rem;
  left: -1.5rem;
  background: var(--color-bg-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  padding: var(--space-3) var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.hero__badge-icon {
  font-size: 1.25rem;
  color: var(--color-gold);
}

.hero__badge-title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  font-family: var(--font-body);
}

.hero__badge-sub {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: var(--font-body);
}

.hero__logos {
  margin-top: var(--space-16);
  padding: var(--space-8) 0;
  border-top: 1px solid color-mix(in srgb, var(--color-border) 92%, transparent 8%);
  background: color-mix(in srgb, var(--color-bg-white) 52%, transparent 48%);
}

.hero__logos-label {
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin-bottom: var(--space-6);
  font-family: var(--font-body);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.hero__logos-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-8);
  align-items: center;
}

.hero__logo-item {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-lg);
  color: color-mix(in srgb, var(--color-border) 82%, var(--color-text-muted) 18%);
  letter-spacing: -0.02em;
  transition: var(--transition-base);
}

.hero__logo-item:hover {
  color: var(--color-text-muted);
}

@media (max-width: 900px) {
  .hero__inner {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }

  .hero__visual {
    display: none;
  }
}

@media (max-width: 600px) {
  .hero {
    padding-top: calc(var(--navbar-height) + var(--space-8));
  }

  .hero__actions {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero__heading {
    max-width: 100%;
  }
}
`

if (!document.head.querySelector('[data-hero-styles]')) {
  style.setAttribute('data-hero-styles', '')
  document.head.appendChild(style)
}


