import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from '@components/ui/ScrollToTop'
import WhatsAppButton from '@components/ui/WhatsAppButton'

/**
 * Layout — wraps every page.
 * Renders: Navbar → page content (via <Outlet />) → Footer
 * Also mounts the floating ScrollToTop and WhatsApp buttons.
 * Scrolls to top on every route change.
 */
const Layout = () => {
  const { pathname } = useLocation()

  // Scroll to top on every page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="site-wrapper">
      <Navbar />
      <main className="site-main" id="main-content">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  )
}

export default Layout

const style = document.createElement('style')
style.textContent = `
.site-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.site-main {
  flex: 1;
  /* Pushes content below the fixed navbar */
  padding-top: var(--navbar-height);
}
/* Exception: Hero section manages its own top padding internally */
.site-main > *:first-child {
  padding-top: 0;
}
`
if (!document.head.querySelector('[data-layout-styles]')) {
  style.setAttribute('data-layout-styles', '')
  document.head.appendChild(style)
}
