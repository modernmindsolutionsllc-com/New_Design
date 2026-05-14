// ─────────────────────────────────────────────────────────────────────────────
//  useScrollPosition
//  Tracks the user's current scroll position and percentage.
//  Used by: ScrollToTop button visibility, Navbar shadow on scroll,
//           progress indicators, parallax effects.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react'

/**
 * Returns the current scroll Y position, scroll percentage, and
 * whether the user has scrolled past a given threshold.
 *
 * @param {Object} options
 * @param {number} options.threshold - px value at which `isPastThreshold` becomes true (default: 300)
 * @param {number} options.throttleMs - Throttle scroll handler in ms (default: 100)
 *
 * @returns {{
 *   scrollY: number,          - Current scroll position in pixels
 *   scrollPercent: number,    - 0–100, how far down the page the user has scrolled
 *   isPastThreshold: boolean, - true when scrollY > threshold (for scroll-to-top button)
 *   isAtTop: boolean,         - true when scrollY === 0
 *   direction: 'up'|'down'|null - current scroll direction
 * }}
 */
export const useScrollPosition = ({ threshold = 300, throttleMs = 100 } = {}) => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [direction, setDirection] = useState(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY

    // Calculate percentage
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
    const percent = docHeight > 0 ? Math.round((currentScrollY / docHeight) * 100) : 0

    // Determine direction
    const newDirection = currentScrollY > lastScrollY ? 'down' : 'up'

    setScrollY(currentScrollY)
    setScrollPercent(percent)
    setDirection(newDirection)
    setLastScrollY(currentScrollY)
  }, [lastScrollY])

  useEffect(() => {
    // Throttle the scroll event to avoid performance issues
    let throttleTimer = null

    const throttledScroll = () => {
      if (throttleTimer) return
      throttleTimer = setTimeout(() => {
        handleScroll()
        throttleTimer = null
      }, throttleMs)
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })

    // Run once on mount to get initial position
    handleScroll()

    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (throttleTimer) clearTimeout(throttleTimer)
    }
  }, [handleScroll, throttleMs])

  return {
    scrollY,
    scrollPercent,
    isPastThreshold: scrollY > threshold,
    isAtTop: scrollY === 0,
    direction,
  }
}