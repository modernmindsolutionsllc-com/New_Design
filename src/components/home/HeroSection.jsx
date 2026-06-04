import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  MessageSquareText,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { FADE_UP, STAGGER_CONTAINER } from '@utils/constants'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80'

const HeroSection = () => (
  <section className="hero">
    <div className="hero__blob hero__blob--1" aria-hidden />
    <div className="hero__blob hero__blob--2" aria-hidden />

    <div className="container hero__inner">
      <motion.div className="hero__content" variants={STAGGER_CONTAINER} initial="hidden" animate="visible">
        <motion.span className="section-tag" variants={FADE_UP}>TECHNOLOGY SIMPLIFIED FOR BUSINESSES</motion.span>
        <motion.h1 className="hero__heading" variants={FADE_UP}>
          Your Customers Are Searching.
          <span className="hero__heading--accent">Can They Find You?</span>
        </motion.h1>
        <motion.p className="hero__subline" variants={FADE_UP}>
          Every day without a strong online presence, you're losing customers to competitors who showed up first. We fix that — fast, simple, no tech skills needed.
        </motion.p>
        <motion.div className="hero__actions" variants={FADE_UP}>
          <Link to="/start-project" className="btn btn--primary btn--lg hero__cta-primary">Start My Business Journey<ArrowRight size={18} /></Link>
          <Link to="/start-project" className="btn btn--ghost btn--lg hero__cta-secondary">Find What My Business Needs</Link>
        </motion.div>
        <motion.ul className="hero__highlights" variants={FADE_UP}>
          <li className="hero__highlight-item"><MessageSquareText size={16} /><span>Plain-language guidance</span></li>
          <li className="hero__highlight-item"><CalendarCheck2 size={16} /><span>Bookings, leads, and automation</span></li>
          <li className="hero__highlight-item"><Sparkles size={16} /><span>One partner from idea to growth</span></li>
        </motion.ul>
        <motion.div className="hero__trust" variants={FADE_UP}>
          <div className="hero__avatars" aria-hidden>{['SM', 'CL', 'RE', 'ED'].map((initials) => <div key={initials} className="hero__avatar">{initials}</div>)}</div>
          <p className="hero__trust-text">Trusted by <strong>business owners</strong> who want growth without the tech confusion</p>
        </motion.div>
      </motion.div>

      <motion.div className="hero__visual" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
        <div className="hero__visual-frame">
          <img
            src={HERO_IMAGE}
            alt="Business owners reviewing growth strategy together"
            className="hero__visual-image"
          />
          <div className="hero__visual-overlay" />

          <motion.div
            className="hero__insight hero__insight--top"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
          >
            <div className="hero__insight-icon">
              <TrendingUp size={18} />
            </div>
            <div>
              <div className="hero__insight-title">Growth-focused planning</div>
              <div className="hero__insight-sub">Clear digital priorities without technical overwhelm</div>
            </div>
          </motion.div>

          <motion.div
            className="hero__insight hero__insight--bottom"
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut' }}
          >
            <div className="hero__insight-panel">
              <div className="hero__insight-panel-top">
                <span className="hero__insight-pill">Recommended next steps</span>
              </div>
              <div className="hero__insight-list">
                {['Business Website', 'Online Booking', 'Lead Follow-Up Automation'].map((item) => (
                  <div key={item} className="hero__insight-list-item">
                    <CheckCircle2 size={14} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>

    <div className="hero__logos">
      <div className="container">
        <p className="hero__logos-label">BUSINESS GOALS WE HELP WITH</p>
        <div className="hero__logos-row">{['More Customers', 'Professional Presence', 'Bookings', 'Payments', 'Automation', 'Apps'].map((name) => <div key={name} className="hero__logo-item">{name}</div>)}</div>
      </div>
    </div>
  </section>
)

export default HeroSection

const style = document.createElement('style')
style.textContent = `
.hero { min-height: 100vh; padding-top: calc(var(--navbar-height) + var(--space-16)); padding-bottom: var(--space-8); background: radial-gradient(circle at 16% 18%, rgba(45, 103, 248, 0.09) 0%, transparent 34%), radial-gradient(circle at 82% 12%, rgba(34, 182, 255, 0.2) 0%, transparent 38%), linear-gradient(180deg, var(--color-bg) 0%, color-mix(in srgb, var(--color-bg-subtle) 40%, var(--color-bg) 60%) 100%); position: relative; overflow: hidden; }
.hero__blob { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; z-index: 0; }
.hero__blob--1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(34, 182, 255, 0.12) 0%, transparent 70%); top: -100px; right: -100px; }
.hero__blob--2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(45, 103, 248, 0.11) 0%, transparent 70%); bottom: 100px; left: -80px; }
.hero__inner { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: var(--space-16); align-items: center; position: relative; z-index: 1; }
.hero__content { display: flex; flex-direction: column; gap: var(--space-6); }
.hero__heading { font-size: clamp(2.7rem, 5vw, 4.1rem); line-height: 1.03; color: var(--color-text-primary); max-width: 12ch; }
.hero__heading--accent { background: linear-gradient(90deg, #0f5ed8 0%, #22b6ff 55%, #7dd3fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; color: transparent; display: block; }
.hero__subline { font-size: var(--text-lg); color: var(--color-text-secondary); line-height: 1.75; max-width: 580px; }
.hero__actions { display: flex; flex-wrap: wrap; gap: var(--space-4); align-items: center; }
.hero__cta-primary { display: inline-flex; align-items: center; gap: 0.5rem; background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%); color: var(--color-bg-dark); border-color: var(--color-gold); font-weight: 700; font-size: var(--text-base); padding: 0.9rem 1.8rem; border-radius: var(--radius-full); transition: var(--transition-base); text-decoration: none; border: 1px solid color-mix(in srgb, var(--color-gold-dark) 75%, black 25%); }
.hero__cta-primary:hover { transform: translateY(-1px); box-shadow: var(--shadow-gold); }
.hero__cta-secondary { border-radius: var(--radius-full); }
.hero__highlights { display: flex; align-items: center; flex-wrap: wrap; gap: var(--space-3); }
.hero__highlight-item { display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.48rem 0.82rem; border-radius: var(--radius-full); font-size: var(--text-xs); font-weight: 600; color: var(--color-text-primary); background: color-mix(in srgb, var(--color-bg-white) 78%, transparent 22%); border: 1px solid color-mix(in srgb, var(--color-border) 86%, transparent 14%); }
.hero__highlight-item svg { color: var(--color-gold); }
.hero__trust { display: flex; align-items: center; gap: var(--space-3); }
.hero__avatars { display: flex; }
.hero__avatar { width: 36px; height: 36px; border-radius: 50%; background: var(--color-bg-dark); color: #fff; font-size: var(--text-xs); font-weight: 700; display: flex; align-items: center; justify-content: center; border: 2px solid var(--color-bg-white); margin-right: -8px; }
.hero__trust-text { font-size: var(--text-sm); color: var(--color-text-secondary); margin-left: 16px; }
.hero__trust-text strong { color: var(--color-text-primary); }
.hero__visual { position: relative; }
.hero__visual-frame {
  position: relative;
  min-height: 600px;
  border-radius: 32px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-border) 82%, transparent 18%);
  box-shadow: var(--shadow-lg);
  background: var(--color-bg-white);
}
.hero__visual-image {
  width: 100%;
  height: 100%;
  min-height: 600px;
  object-fit: cover;
}
.hero__visual-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(11, 18, 40, 0.06) 0%, rgba(11, 18, 40, 0.2) 45%, rgba(11, 18, 40, 0.48) 100%);
}
.hero__insight {
  position: absolute;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: var(--shadow-card);
}
.hero__insight--top {
  top: 24px;
  left: 24px;
  right: 24px;
  max-width: 340px;
  padding: var(--space-4);
  border-radius: 22px;
}
.hero__insight--bottom {
  right: 24px;
  bottom: 24px;
  max-width: 360px;
  border-radius: 24px;
}
.hero__insight-icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gold-subtle);
  color: var(--color-gold-dark);
  border: 1px solid var(--color-gold-border);
  flex-shrink: 0;
}
.hero__insight-title {
  font-size: var(--text-sm);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.4;
}
.hero__insight-sub {
  margin-top: 2px;
  font-size: var(--text-xs);
  color: #475569;
  line-height: 1.55;
}
.hero__insight-panel {
  padding: var(--space-4);
}
.hero__insight-panel-top {
  margin-bottom: var(--space-3);
}
.hero__insight-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.38rem 0.72rem;
  border-radius: var(--radius-full);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-gold-dark);
  background: var(--color-gold-subtle);
  border: 1px solid var(--color-gold-border);
}
.hero__insight-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.hero__insight-list-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: 700;
  color: #0f172a;
}
.hero__insight-list-item svg {
  color: var(--color-gold-dark);
  flex-shrink: 0;
}
:root[data-theme='dark'] .hero__insight {
  background: rgba(24, 29, 53, 0.94);
  border-color: rgba(147, 197, 253, 0.24);
}
:root[data-theme='dark'] .hero__insight-title,
:root[data-theme='dark'] .hero__insight-list-item {
  color: #f8fafc;
}
:root[data-theme='dark'] .hero__insight-sub {
  color: #cbd5e1;
}
.hero__logos { margin-top: var(--space-16); padding: var(--space-8) 0; border-top: 1px solid color-mix(in srgb, var(--color-border) 92%, transparent 8%); background: color-mix(in srgb, var(--color-bg-white) 52%, transparent 48%); }
.hero__logos-label { text-align: center; font-size: var(--text-sm); color: var(--color-text-muted); margin-bottom: var(--space-6); font-family: var(--font-body); letter-spacing: 0.05em; text-transform: uppercase; }
.hero__logos-row { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-8); align-items: center; }
.hero__logo-item { font-family: var(--font-display); font-weight: 700; font-size: var(--text-lg); color: color-mix(in srgb, var(--color-border) 82%, var(--color-text-muted) 18%); letter-spacing: -0.02em; transition: var(--transition-base); }
.hero__logo-item:hover { color: var(--color-text-muted); }
@media (max-width: 900px) { .hero__inner { grid-template-columns: 1fr; gap: var(--space-12); } .hero__visual { display: none; } }
@media (max-width: 600px) { .hero { padding-top: calc(var(--navbar-height) + var(--space-8)); } .hero__actions { flex-direction: column; align-items: flex-start; } .hero__heading { max-width: 100%; } }
`
if (!document.head.querySelector('[data-hero-styles]')) {
  style.setAttribute('data-hero-styles', '')
  document.head.appendChild(style)
}
