// ─────────────────────────────────────────────────────────────────────────────
//  SCROLL HELPERS
//  Smooth scrolling utilities used for anchor navigation and scroll effects.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Smoothly scrolls to a DOM element by its ID.
 * Accounts for the fixed navbar height so content isn't hidden behind it.
 *
 * @param {string} elementId - The ID of the target element (without #)
 * @param {number} offset - Additional px offset (default: 80 for navbar height)
 */
export const smoothScrollTo = (elementId, offset = 80) => {
  const element = document.getElementById(elementId)
  if (!element) {
    console.warn(`smoothScrollTo: element with id "${elementId}" not found.`)
    return
  }

  const elementTop = element.getBoundingClientRect().top + window.scrollY
  const targetPosition = elementTop - offset

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  })
}

/**
 * Scrolls to the very top of the page smoothly.
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Scrolls to the bottom of the page smoothly.
 */
export const scrollToBottom = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

/**
 * Returns the current scroll percentage of the page (0–100).
 * Useful for showing/hiding the scroll-to-top button.
 * @returns {number}
 */
export const getScrollPercent = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight

  if (docHeight === 0) return 0
  return Math.round((scrollTop / docHeight) * 100)
}

/**
 * Handles a navigation link click that may be an anchor on the same page
 * or a route change. If the path contains a hash (#), scrolls to that section.
 * If it's a normal route, React Router's navigate() handles it.
 *
 * @param {string} path - e.g. "/services#web-apps" or "/about"
 * @param {Function} navigate - React Router's navigate function
 * @param {Function} [onComplete] - Optional callback after navigation
 */
export const handleNavClick = (path, navigate, onComplete) => {
  if (path.includes('#')) {
    const [route, hash] = path.split('#')
    const currentPath = window.location.pathname

    if (currentPath === route || route === '') {
      // Already on the right page — just scroll to the section
      smoothScrollTo(hash)
    } else {
      // Navigate to the page first, then scroll after a brief delay
      navigate(route)
      setTimeout(() => smoothScrollTo(hash), 400)
    }
  } else {
    navigate(path)
    scrollToTop()
  }

  if (onComplete) onComplete()
}

/**
 * Locks the body scroll — used when mobile menu is open.
 */
export const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden'
}

/**
 * Unlocks the body scroll — used when mobile menu is closed.
 */
export const unlockBodyScroll = () => {
  document.body.style.overflow = ''
}