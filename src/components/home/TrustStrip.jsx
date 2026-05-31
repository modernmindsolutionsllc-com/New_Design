import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const CLIENT_NAMES = ['Restaurants', 'Medical Clinics', 'Salons', 'Startups', 'Real Estate', 'Education', 'E-Commerce', 'Fitness', 'Construction', 'Local Businesses']
const LOOPED = [...CLIENT_NAMES, ...CLIENT_NAMES]

const TrustStrip = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  return (
    <section className="trust-strip" ref={ref} aria-label="Businesses we help">
      <div className="container">
        <motion.p className="trust-strip__label" initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }}>
          Trusted support for businesses at every stage of growth
        </motion.p>
      </div>
      <div className="trust-strip__track-wrapper" aria-hidden="true">
        <div className="trust-strip__track">
          {LOOPED.map((name, index) => <div key={`${name}-${index}`} className="trust-strip__logo-item"><span className="trust-strip__logo-text">{name}</span><span className="trust-strip__separator">•</span></div>)}
        </div>
      </div>
    </section>
  )
}

export default TrustStrip

const style = document.createElement('style')
style.textContent = `
.trust-strip { background: var(--color-bg-white); padding: var(--space-10) 0; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); overflow: hidden; }
.trust-strip__label { text-align: center; font-family: var(--font-body); font-size: var(--text-xs); font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-text-muted); margin-bottom: var(--space-6); }
.trust-strip__track-wrapper { position: relative; width: 100%; overflow: hidden; -webkit-mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%); mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%); }
.trust-strip__track { display: flex; align-items: center; width: max-content; animation: trust-scroll 30s linear infinite; }
.trust-strip__track-wrapper:hover .trust-strip__track { animation-play-state: paused; }
@keyframes trust-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.trust-strip__logo-item { display: flex; align-items: center; flex-shrink: 0; padding: 0 var(--space-8); transition: opacity 0.25s ease; }
.trust-strip__track-wrapper:hover .trust-strip__logo-item { opacity: 0.4; }
.trust-strip__track-wrapper:hover .trust-strip__logo-item:hover { opacity: 1; }
.trust-strip__logo-text { font-family: var(--font-display); font-size: var(--text-lg); font-weight: 700; color: var(--color-border); letter-spacing: -0.02em; white-space: nowrap; user-select: none; transition: color 0.25s ease; }
.trust-strip__logo-item:hover .trust-strip__logo-text { color: var(--color-text-muted); }
.trust-strip__separator { font-size: 0.45rem; color: var(--color-gold-border); margin-left: var(--space-8); flex-shrink: 0; user-select: none; }
@media (prefers-reduced-motion: reduce) { .trust-strip__track { animation: none; flex-wrap: wrap; justify-content: center; width: 100%; padding: 0 var(--space-6); gap: var(--space-6); } .trust-strip__track-wrapper { -webkit-mask-image: none; mask-image: none; } }
@media (max-width: 640px) { .trust-strip__logo-text { font-size: var(--text-base); } .trust-strip__logo-item { padding: 0 var(--space-5); } .trust-strip__separator { margin-left: var(--space-5); } }
`
if (!document.head.querySelector('[data-trust-strip-styles]')) {
  style.setAttribute('data-trust-strip-styles', '')
  document.head.appendChild(style)
}
