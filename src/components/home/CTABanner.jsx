import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FADE_UP, STAGGER_CONTAINER } from '@utils/constants'

const CTABanner = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <section className="cta-banner" ref={ref}>
      <div className="cta-banner__bg" aria-hidden />
      <div className="container">
        <motion.div
          className="cta-banner__inner"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className="section-tag cta-banner__tag" variants={FADE_UP}>
            Ready When You Are
          </motion.span>
          <motion.h2 className="cta-banner__heading" variants={FADE_UP}>
            Get Started With ModernMind Today
          </motion.h2>
          <motion.p className="cta-banner__subline" variants={FADE_UP}>
            Reach out for support and we will help you schedule the right service.
          </motion.p>
          <motion.div className="cta-banner__actions" variants={FADE_UP}>
            <Link to="/start-project" className="btn btn--primary btn--lg cta-banner__primary">
              Schedule Today <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn--ghost btn--lg cta-banner__secondary">
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTABanner

const style = document.createElement('style')
style.textContent = `
.cta-banner {
  padding: var(--space-24) 0;
  background: var(--color-bg-subtle);
  position: relative;
  overflow: hidden;
  border-top: 1px solid var(--color-border);
}
.cta-banner__bg {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 50%, rgba(245, 180, 0, 0.1) 0%, transparent 65%);
  pointer-events: none;
}
.cta-banner__inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  position: relative;
  z-index: 1;
}
.cta-banner__tag {
  color: var(--color-gold);
}
.cta-banner__heading {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 700;
  color: var(--color-text-primary);
  max-width: 640px;
  line-height: 1.15;
}
.cta-banner__subline {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  max-width: 560px;
  line-height: 1.65;
}
.cta-banner__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  justify-content: center;
  margin-top: var(--space-4);
}
.cta-banner__primary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: var(--color-gold);
  color: var(--color-bg-dark);
  border-color: var(--color-gold);
  border: 2px solid var(--color-gold);
  padding: 0.875rem 2rem;
  border-radius: var(--radius-full);
  font-weight: 700;
  text-decoration: none;
  transition: var(--transition-base);
}
.cta-banner__primary:hover {
  background: var(--color-gold-dark);
  border-color: var(--color-gold-dark);
  box-shadow: var(--shadow-gold);
}
.cta-banner__secondary {
  border: 2px solid var(--color-border);
  color: var(--color-text-primary);
  background: transparent;
  padding: 0.875rem 2rem;
  border-radius: var(--radius-full);
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition-base);
}
.cta-banner__secondary:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
}
`
if (!document.head.querySelector('[data-cta-styles]')) {
  style.setAttribute('data-cta-styles', '')
  document.head.appendChild(style)
}
