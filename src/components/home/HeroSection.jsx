import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FADE_UP, STAGGER_CONTAINER } from '@utils/constants'

const HeroSection = () => {
  return (
    <section className="hero">
      {/* Decorative background blobs */}
      <div className="hero__blob hero__blob--1" aria-hidden />
      <div className="hero__blob hero__blob--2" aria-hidden />

      <div className="container hero__inner">
        {/* ── Left: Text Content ── */}
        <motion.div
          className="hero__content"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="section-tag" variants={FADE_UP}>
            Software Development Studio
          </motion.span>

          <motion.h1 className="hero__heading" variants={FADE_UP}>
            We Turn Your Ideas Into{' '}
            <span className="hero__heading--accent">Software That Works</span>
          </motion.h1>

          <motion.p className="hero__subline" variants={FADE_UP}>
            From early-stage startups to growing businesses — we build clean,
            reliable software so you can focus on what matters most. No tech
            jargon, no surprises.
          </motion.p>

          <motion.div className="hero__actions" variants={FADE_UP}>
            <Link to="/start-project" className="btn btn--primary btn--lg hero__cta-primary">
              Tell Us About Your Project
              <ArrowRight size={18} />
            </Link>
            <Link to="/portfolio" className="btn btn--ghost btn--lg">
              See Our Work
            </Link>
          </motion.div>

          {/* Trust micro-signal */}
          <motion.div className="hero__trust" variants={FADE_UP}>
            <div className="hero__avatars" aria-hidden>
              {['PS', 'RM', 'AB', 'AD'].map((initials) => (
                <div key={initials} className="hero__avatar">{initials}</div>
              ))}
            </div>
            <p className="hero__trust-text">
              Trusted by <strong>30+ businesses</strong> across India
            </p>
          </motion.div>
        </motion.div>

        {/* ── Right: Visual Card ── */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__card">
            {/* Simulated browser/app mockup */}
            <div className="hero__mockup-bar">
              <span className="hero__dot" style={{ background: '#FF5F57' }} />
              <span className="hero__dot" style={{ background: '#FFBD2E' }} />
              <span className="hero__dot" style={{ background: '#28C840' }} />
              <div className="hero__url-bar">yourproject.app</div>
            </div>
            <div className="hero__mockup-body">
              {/* Simulated UI lines */}
              {[80, 60, 70, 45, 55].map((w, i) => (
                <div key={i} className="hero__mockup-line" style={{ width: `${w}%`, animationDelay: `${i * 0.15}s` }} />
              ))}
              <div className="hero__mockup-cards">
                {['Web App', 'Mobile App', 'AI Tool'].map((label) => (
                  <div key={label} className="hero__mockup-chip">{label}</div>
                ))}
              </div>
              {[65, 50].map((w, i) => (
                <div key={i} className="hero__mockup-line" style={{ width: `${w}%`, animationDelay: `${(i + 5) * 0.15}s` }} />
              ))}
            </div>
            {/* Floating badge */}
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

      {/* ── Client Logo Strip ── */}
      <div className="hero__logos">
        <div className="container">
          <p className="hero__logos-label">Trusted by businesses across industries</p>
          <div className="hero__logos-row">
            {['NourishBox', 'FinTrack', 'Artisaana', 'MediCare', 'EduSpark', 'LogiPro'].map((name) => (
              <div key={name} className="hero__logo-item">{name}</div>
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
  background: var(--color-bg);
  position: relative;
  overflow: hidden;
}

/* Decorative blobs */
.hero__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
  z-index: 0;
}
.hero__blob--1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%);
  top: -100px; right: -100px;
}
.hero__blob--2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%);
  bottom: 100px; left: -80px;
}

.hero__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero__content { display: flex; flex-direction: column; gap: var(--space-6); }

.hero__heading {
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  line-height: 1.1;
  color: var(--color-text-primary);
}
.hero__heading--accent {
  color: var(--color-gold);
  display: block;
}

.hero__subline {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 520px;
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
  background: var(--color-gold);
  color: var(--color-bg-dark);
  border-color: var(--color-gold);
  font-weight: 600;
  font-size: var(--text-base);
  padding: 0.875rem 1.75rem;
  border-radius: var(--radius-full);
  transition: var(--transition-base);
  text-decoration: none;
  border: 2px solid var(--color-gold);
}
.hero__cta-primary:hover {
  background: var(--color-gold-dark);
  border-color: var(--color-gold-dark);
  box-shadow: var(--shadow-gold);
}

/* Trust row */
.hero__trust { display: flex; align-items: center; gap: var(--space-3); }
.hero__avatars { display: flex; }
.hero__avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--color-bg-dark);
  color: var(--color-gold);
  font-size: var(--text-xs);
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid var(--color-bg-white);
  margin-right: -8px;
}
.hero__trust-text {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-left: 16px;
}
.hero__trust-text strong { color: var(--color-text-primary); }

/* Right side card */
.hero__visual { position: relative; }
.hero__card {
  background: var(--color-bg-white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border);
  overflow: hidden;
  position: relative;
}

.hero__mockup-bar {
  display: flex; align-items: center; gap: var(--space-2);
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-subtle);
}
.hero__dot { width: 12px; height: 12px; border-radius: 50%; }
.hero__url-bar {
  flex: 1; margin-left: var(--space-3);
  background: var(--color-bg);
  border-radius: var(--radius-full);
  padding: 0.25rem 0.75rem;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: var(--font-body);
}

.hero__mockup-body { padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-3); }
.hero__mockup-line {
  height: 12px; border-radius: var(--radius-full);
  background: linear-gradient(90deg, var(--color-border) 0%, var(--color-bg-subtle) 100%);
  animation: shimmer 2s ease-in-out infinite;
}
@keyframes shimmer {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
.hero__mockup-cards { display: flex; gap: var(--space-2); flex-wrap: wrap; margin: var(--space-2) 0; }
.hero__mockup-chip {
  background: var(--color-gold-subtle);
  border: 1px solid var(--color-gold-border);
  color: var(--color-gold-dark);
  font-size: var(--text-xs); font-weight: 600;
  padding: 0.25rem 0.75rem; border-radius: var(--radius-full);
  font-family: var(--font-body);
}

/* Floating badge */
.hero__badge {
  position: absolute; bottom: -1rem; left: -1.5rem;
  background: var(--color-bg-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
  padding: var(--space-3) var(--space-4);
  display: flex; align-items: center; gap: var(--space-3);
}
.hero__badge-icon { font-size: 1.25rem; color: var(--color-gold); }
.hero__badge-title { font-size: var(--text-sm); font-weight: 600; color: var(--color-text-primary); font-family: var(--font-body); }
.hero__badge-sub { font-size: var(--text-xs); color: var(--color-text-muted); font-family: var(--font-body); }

/* Logo strip */
.hero__logos {
  margin-top: var(--space-16);
  padding: var(--space-8) 0;
  border-top: 1px solid var(--color-border);
}
.hero__logos-label {
  text-align: center; font-size: var(--text-sm);
  color: var(--color-text-muted); margin-bottom: var(--space-6);
  font-family: var(--font-body); letter-spacing: 0.05em; text-transform: uppercase;
}
.hero__logos-row {
  display: flex; flex-wrap: wrap; justify-content: center;
  gap: var(--space-8); align-items: center;
}
.hero__logo-item {
  font-family: var(--font-display); font-weight: 700;
  font-size: var(--text-lg); color: var(--color-border);
  letter-spacing: -0.02em; transition: var(--transition-base);
}
.hero__logo-item:hover { color: var(--color-text-muted); }

/* Responsive */
@media (max-width: 900px) {
  .hero__inner { grid-template-columns: 1fr; gap: var(--space-12); }
  .hero__visual { display: none; }
}
@media (max-width: 600px) {
  .hero { padding-top: calc(var(--navbar-height) + var(--space-8)); }
  .hero__actions { flex-direction: column; align-items: flex-start; }
}
`
if (!document.head.querySelector('[data-hero-styles]')) {
  style.setAttribute('data-hero-styles', '')
  document.head.appendChild(style)
}
