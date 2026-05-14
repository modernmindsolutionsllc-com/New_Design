import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// ─────────────────────────────────────────────────────────────────────────────
//  TrustStrip
//  Horizontally auto-scrolling strip of client/partner brand names.
//  Sits just below the Hero section as a social proof signal.
//
//  To add real logos: replace the CLIENT_NAMES array with image imports and
//  render <img> tags instead of the text span inside .trust-strip__logo-item
// ─────────────────────────────────────────────────────────────────────────────

const CLIENT_NAMES = [
  'NourishBox',
  'FinTrack',
  'Artisaana',
  'MediCare Plus',
  'EduSpark',
  'LogiPro',
  'GreenHarvest',
  'SwiftPay',
  'BuildRight',
  'TalentFlow',
]

// Duplicate so the CSS scroll loop is perfectly seamless
const LOOPED = [...CLIENT_NAMES, ...CLIENT_NAMES]

const TrustStrip = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      className="trust-strip"
      ref={ref}
      aria-label="Clients we have worked with"
    >
      {/* Label — sits inside the container so it stays centred */}
      <div className="container">
        <motion.p
          className="trust-strip__label"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Trusted by businesses across industries
        </motion.p>
      </div>

      {/* Full-bleed scrolling track — intentionally overflows the container */}
      <div className="trust-strip__track-wrapper" aria-hidden="true">
        <div className="trust-strip__track">
          {LOOPED.map((name, i) => (
            <div key={`${name}-${i}`} className="trust-strip__logo-item">
              {/*
                ── Replace this <span> with an <img> when you have real logos:
                   <img src={logoSrc} alt={name} className="trust-strip__logo-img" />
              */}
              <span className="trust-strip__logo-text">{name}</span>
              <span className="trust-strip__separator">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustStrip

/* ── Scoped styles injected once into <head> ─────────────────────────────── */
const style = document.createElement('style')
style.textContent = `

/* Section wrapper */
.trust-strip {
  background: var(--color-bg-white);
  padding: var(--space-10) 0;
  border-top:    1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  overflow: hidden;
}

/* "Trusted by..." label */
.trust-strip__label {
  text-align: center;
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-6);
}

/* Wrapper that clips overflow and fades the left/right edges */
.trust-strip__track-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;

  /* Soft fade mask — hides the loop seam and looks polished */
  -webkit-mask-image: linear-gradient(
    to right,
    transparent  0%,
    black        12%,
    black        88%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent  0%,
    black        12%,
    black        88%,
    transparent 100%
  );
}

/* The scrolling flex row */
.trust-strip__track {
  display: flex;
  align-items: center;
  width: max-content;
  animation: trust-scroll 30s linear infinite;
}

/* Pause on hover so users can read the names */
.trust-strip__track-wrapper:hover .trust-strip__track {
  animation-play-state: paused;
}

@keyframes trust-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Individual item */
.trust-strip__logo-item {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0 var(--space-8);
  transition: opacity 0.25s ease;
}

/* Dim siblings when any item is hovered */
.trust-strip__track-wrapper:hover .trust-strip__logo-item {
  opacity: 0.4;
}
.trust-strip__track-wrapper:hover .trust-strip__logo-item:hover {
  opacity: 1;
}

/* Logo name text — swap for <img> when you have real assets */
.trust-strip__logo-text {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-border);
  letter-spacing: -0.02em;
  white-space: nowrap;
  user-select: none;
  transition: color 0.25s ease;
}
.trust-strip__logo-item:hover .trust-strip__logo-text {
  color: var(--color-text-muted);
}

/* Real logo image sizing (used if you swap the text for an <img>) */
.trust-strip__logo-img {
  height: 28px;
  width: auto;
  object-fit: contain;
  filter: grayscale(1) opacity(0.4);
  transition: filter 0.25s ease;
}
.trust-strip__logo-item:hover .trust-strip__logo-img {
  filter: grayscale(0) opacity(1);
}

/* Gold diamond separator between items */
.trust-strip__separator {
  font-size: 0.45rem;
  color: var(--color-gold-border);
  margin-left: var(--space-8);
  flex-shrink: 0;
  user-select: none;
}

/* ── Accessibility: respect reduced-motion preference ── */
@media (prefers-reduced-motion: reduce) {
  .trust-strip__track {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 0 var(--space-6);
    gap: var(--space-6);
  }
  .trust-strip__track-wrapper {
    -webkit-mask-image: none;
    mask-image: none;
  }
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .trust-strip__logo-text  { font-size: var(--text-base); }
  .trust-strip__logo-item  { padding: 0 var(--space-5); }
  .trust-strip__separator  { margin-left: var(--space-5); }
}
`

if (!document.head.querySelector('[data-trust-strip-styles]')) {
  style.setAttribute('data-trust-strip-styles', '')
  document.head.appendChild(style)
}