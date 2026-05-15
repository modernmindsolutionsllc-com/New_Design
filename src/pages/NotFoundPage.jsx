import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowRight } from 'lucide-react'
import { STAGGER_CONTAINER, FADE_UP, NAV_LINKS } from '@utils/constants'

const NotFoundPage = () => (
  <section className="not-found">
    <div className="container">
      <motion.div
        className="not-found__inner"
        variants={STAGGER_CONTAINER}
        initial="hidden"
        animate="visible"
      >
        {/* Big 404 */}
        <motion.div className="not-found__number" aria-hidden variants={FADE_UP}>
          404
        </motion.div>

        <motion.div className="not-found__content" variants={FADE_UP}>
          <span className="section-tag">Page Not Found</span>
          <h1 className="not-found__heading">
            Oops — that page wandered off.
          </h1>
          <div className="gold-divider" />
          <p className="not-found__text">
            The page you're looking for doesn't exist or may have moved.
            Don't worry — let's get you back to somewhere useful.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div className="not-found__actions" variants={FADE_UP}>
          <Link to="/" className="btn btn--primary btn--lg not-found__home-btn">
            <Home size={18} /> Back to Home
          </Link>
          <Link to="/start-project" className="btn btn--ghost btn--lg">
            Schedule Today <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Quick nav */}
        <motion.div className="not-found__nav" variants={FADE_UP}>
          <p className="not-found__nav-label">Or jump to:</p>
          <div className="not-found__nav-links">
            {NAV_LINKS.filter(l => l.path !== '/').map(({ label, path }) => (
              <Link key={label} to={path} className="not-found__nav-link">
                {label} →
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
)

export default NotFoundPage

const style = document.createElement('style')
style.textContent = `
.not-found {
  min-height: calc(100vh - var(--navbar-height));
  display: flex; align-items: center;
  background: var(--color-bg-subtle);
  padding: var(--space-24) 0;
}
.not-found__inner {
  max-width: 600px; margin: 0 auto;
  display: flex; flex-direction: column; align-items: center;
  gap: var(--space-8); text-align: center;
}
.not-found__number {
  font-family: var(--font-display);
  font-size: clamp(6rem, 15vw, 10rem);
  font-weight: 700; line-height: 1;
  color: var(--color-border);
  user-select: none;
}
.not-found__content { display: flex; flex-direction: column; align-items: center; gap: var(--space-4); }
.not-found__heading {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 700; color: var(--color-text-primary); line-height: 1.2;
}
.not-found__text {
  font-size: var(--text-lg); color: var(--color-text-secondary);
  line-height: 1.7; max-width: 480px;
}
.not-found__actions {
  display: flex; flex-wrap: wrap; gap: var(--space-4); justify-content: center;
}
.not-found__home-btn {
  display: inline-flex; align-items: center; gap: var(--space-2);
}
.not-found__nav { display: flex; flex-direction: column; align-items: center; gap: var(--space-3); }
.not-found__nav-label {
  font-family: var(--font-body); font-size: var(--text-sm);
  color: var(--color-text-muted);
}
.not-found__nav-links { display: flex; flex-wrap: wrap; gap: var(--space-3); justify-content: center; }
.not-found__nav-link {
  font-family: var(--font-body); font-size: var(--text-sm); font-weight: 600;
  color: var(--color-gold); text-decoration: none; transition: var(--transition-base);
}
.not-found__nav-link:hover { color: var(--color-gold-dark); }
`
if (!document.head.querySelector('[data-404-styles]')) {
  style.setAttribute('data-404-styles', '')
  document.head.appendChild(style)
}
