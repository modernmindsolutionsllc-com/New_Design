import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { NAV_LINKS, COMPANY_NAME } from '@utils/constants'
import { lockBodyScroll, unlockBodyScroll } from '@utils/scrollHelpers'
import { useScrollPosition } from '@hooks/useScrollPosition'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { scrollY } = useScrollPosition()
  const location = useLocation()

  const isScrolled = scrollY > 20

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
    unlockBodyScroll()
  }, [location.pathname])

  const toggleMobile = () => {
    if (mobileOpen) {
      setMobileOpen(false)
      unlockBodyScroll()
    } else {
      setMobileOpen(true)
      lockBodyScroll()
    }
  }

  const isActive = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path)

  return (
    <>
      <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">

          {/* ── Logo ── */}
          <Link to="/" className="navbar__logo" aria-label={`${COMPANY_NAME} home`}>
            <div className="navbar__logo-mark" aria-hidden>
              <span>Y</span>
            </div>
            <span className="navbar__logo-text">{COMPANY_NAME}</span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="navbar__links" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, path, dropdown }) =>
              dropdown ? (
                <div
                  key={label}
                  className="navbar__item navbar__item--dropdown"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={`navbar__link navbar__link--btn ${isActive(path) ? 'navbar__link--active' : ''}`}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    {label}
                    <ChevronDown
                      size={14}
                      className={`navbar__chevron ${servicesOpen ? 'navbar__chevron--open' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        className="navbar__dropdown"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        role="menu"
                      >
                        {dropdown.map(({ label: dlabel, path: dpath }) => (
                          <Link
                            key={dlabel}
                            to={dpath}
                            className="navbar__dropdown-item"
                            role="menuitem"
                          >
                            {dlabel}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={label}
                  to={path}
                  className={`navbar__link ${isActive(path) ? 'navbar__link--active' : ''}`}
                >
                  {label}
                </Link>
              )
            )}
          </nav>

          {/* ── CTA + Hamburger ── */}
          <div className="navbar__right">
            <Link to="/start-project" className="navbar__cta">
              Start a Project
            </Link>
            <button
              className="navbar__hamburger"
              onClick={toggleMobile}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Mobile navigation"
          >
            <nav className="mobile-menu__nav">
              {NAV_LINKS.map(({ label, path, dropdown }) => (
                <div key={label}>
                  <Link
                    to={path}
                    className={`mobile-menu__link ${isActive(path) ? 'mobile-menu__link--active' : ''}`}
                    onClick={() => { setMobileOpen(false); unlockBodyScroll() }}
                  >
                    {label}
                  </Link>
                  {dropdown && (
                    <div className="mobile-menu__sub">
                      {dropdown.map(({ label: dl, path: dp }) => (
                        <Link
                          key={dl}
                          to={dp}
                          className="mobile-menu__sublink"
                          onClick={() => { setMobileOpen(false); unlockBodyScroll() }}
                        >
                          {dl}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="mobile-menu__footer">
              <Link
                to="/start-project"
                className="mobile-menu__cta"
                onClick={() => { setMobileOpen(false); unlockBodyScroll() }}
              >
                Start a Project →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop behind mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobile}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

const style = document.createElement('style')
style.textContent = `
/* ── Navbar base ─────────────────────────────────────────────────────────── */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  height: var(--navbar-height);
  background: var(--color-bg);
  border-bottom: 1px solid transparent;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.navbar--scrolled {
  background: rgba(245, 244, 240, 0.95);
  border-bottom-color: var(--color-border);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.navbar__inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
}

/* ── Logo ────────────────────────────────────────────────────────────────── */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  flex-shrink: 0;
}
.navbar__logo-mark {
  width: 36px; height: 36px;
  border-radius: var(--radius-md);
  background: var(--color-bg-dark);
  color: var(--color-gold);
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
.navbar__logo-text {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  letter-spacing: -0.02em;
}

/* ── Desktop links ───────────────────────────────────────────────────────── */
.navbar__links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  flex: 1;
  justify-content: center;
}
.navbar__link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  transition: var(--transition-base);
  position: relative;
}
.navbar__link:hover { color: var(--color-text-primary); }
.navbar__link--active { color: var(--color-gold) !important; font-weight: 600; }
.navbar__link--active::after {
  content: '';
  position: absolute; bottom: -2px; left: var(--space-3); right: var(--space-3);
  height: 2px;
  background: var(--color-gold);
  border-radius: var(--radius-full);
}

/* Dropdown trigger button */
.navbar__link--btn {
  display: flex; align-items: center; gap: var(--space-1);
  background: none; border: none; cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--text-sm); font-weight: 500;
  color: var(--color-text-secondary);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  transition: var(--transition-base);
}
.navbar__link--btn:hover { color: var(--color-text-primary); }
.navbar__chevron { transition: transform 0.2s ease; }
.navbar__chevron--open { transform: rotate(180deg); }

/* Dropdown */
.navbar__item--dropdown { position: relative; }
.navbar__dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%; transform: translateX(-50%);
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--space-3);
  min-width: 200px;
  z-index: 200;
}
.navbar__dropdown-item {
  display: block;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-sm); font-weight: 500;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: var(--transition-base);
}
.navbar__dropdown-item:hover {
  background: var(--color-gold-subtle);
  color: var(--color-gold-dark);
}

/* ── Right side ──────────────────────────────────────────────────────────── */
.navbar__right { display: flex; align-items: center; gap: var(--space-4); flex-shrink: 0; }
.navbar__cta {
  font-family: var(--font-body);
  font-size: var(--text-sm); font-weight: 700;
  background: var(--color-gold);
  color: var(--color-bg-dark);
  padding: 0.6rem 1.4rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  border: 2px solid var(--color-gold);
  transition: var(--transition-base);
  white-space: nowrap;
}
.navbar__cta:hover {
  background: var(--color-gold-dark);
  border-color: var(--color-gold-dark);
  box-shadow: var(--shadow-gold);
}
.navbar__hamburger {
  display: none;
  background: none; border: none; cursor: pointer;
  color: var(--color-text-primary);
  padding: var(--space-2);
  border-radius: var(--radius-sm);
  transition: var(--transition-base);
}
.navbar__hamburger:hover { background: var(--color-bg-subtle); }

/* ── Mobile menu ─────────────────────────────────────────────────────────── */
.mobile-menu {
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: min(320px, 85vw);
  background: var(--color-bg-white);
  z-index: 200;
  padding: calc(var(--navbar-height) + var(--space-6)) var(--space-6) var(--space-8);
  display: flex; flex-direction: column; justify-content: space-between;
  overflow-y: auto;
  border-left: 1px solid var(--color-border);
}
.mobile-menu__backdrop {
  position: fixed; inset: 0;
  background: rgba(30, 30, 46, 0.4);
  z-index: 150;
  backdrop-filter: blur(2px);
}
.mobile-menu__nav { display: flex; flex-direction: column; gap: var(--space-1); }
.mobile-menu__link {
  display: block;
  font-family: var(--font-body); font-size: var(--text-lg); font-weight: 600;
  color: var(--color-text-primary); text-decoration: none;
  padding: var(--space-3) var(--space-2);
  border-bottom: 1px solid var(--color-border);
  transition: var(--transition-base);
}
.mobile-menu__link:hover, .mobile-menu__link--active { color: var(--color-gold); }
.mobile-menu__sub {
  display: flex; flex-direction: column; gap: var(--space-1);
  padding: var(--space-2) 0 var(--space-3) var(--space-4);
}
.mobile-menu__sublink {
  font-family: var(--font-body); font-size: var(--text-sm); font-weight: 500;
  color: var(--color-text-secondary); text-decoration: none;
  padding: var(--space-2) var(--space-2);
  border-radius: var(--radius-sm);
  transition: var(--transition-base);
}
.mobile-menu__sublink:hover { color: var(--color-gold); background: var(--color-gold-subtle); }
.mobile-menu__footer { padding-top: var(--space-8); }
.mobile-menu__cta {
  display: block; text-align: center;
  background: var(--color-gold); color: var(--color-bg-dark);
  font-family: var(--font-body); font-size: var(--text-base); font-weight: 700;
  padding: var(--space-4); border-radius: var(--radius-full);
  text-decoration: none; border: 2px solid var(--color-gold);
  transition: var(--transition-base);
}
.mobile-menu__cta:hover { background: var(--color-gold-dark); border-color: var(--color-gold-dark); }

/* ── Responsive ──────────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .navbar__links { display: none; }
  .navbar__hamburger { display: flex; align-items: center; }
}
@media (max-width: 480px) {
  .navbar__cta { display: none; }
}
`
if (!document.head.querySelector('[data-navbar-styles]')) {
  style.setAttribute('data-navbar-styles', '')
  document.head.appendChild(style)
}
