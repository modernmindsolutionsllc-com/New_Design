// ─────────────────────────────────────────────────────────────────────────────
//  useScrollAnimation
//  Custom hook that uses IntersectionObserver to trigger a CSS class
//  or return a boolean when an element enters the viewport.
//  Used to animate sections as the user scrolls down.
// ─────────────────────────────────────────────────────────────────────────────

import { createRef, useEffect, useRef, useState } from 'react'

/**
 * Returns a ref and a boolean `isVisible`.
 * Attach `ref` to a DOM element — `isVisible` becomes true when
 * the element enters the viewport.
 *
 * @param {Object} options
 * @param {number} options.threshold - 0–1, how much of element must be visible (default 0.15)
 * @param {string} options.rootMargin - Margin around root (default '0px 0px -60px 0px')
 * @param {boolean} options.triggerOnce - Only trigger once, stay visible (default true)
 *
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 *
 * @example
 * const { ref, isVisible } = useScrollAnimation()
 * return (
 *   <div ref={ref} className={isVisible ? 'animate-in' : 'animate-out'}>
 *     Content
 *   </div>
 * )
 */
export const useScrollAnimation = ({
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  triggerOnce = true,
} = {}) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // If already visible and triggerOnce, no need to observe again
    if (isVisible && triggerOnce) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else {
          if (!triggerOnce) {
            setIsVisible(false)
          }
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, triggerOnce, isVisible])

  return { ref, isVisible }
}

/**
 * Observes multiple elements and returns their visibility states.
 * Useful for staggered animations on a list of items.
 *
 * @param {number} count - Number of elements to observe
 * @param {Object} options - Same options as useScrollAnimation
 * @returns {Array<{ ref: React.RefObject, isVisible: boolean }>}
 *
 * @example
 * const items = useScrollAnimationList(3)
 * return items.map(({ ref, isVisible }, i) => (
 *   <div key={i} ref={ref} style={{ opacity: isVisible ? 1 : 0 }}>
 *     Item {i}
 *   </div>
 * ))
 */
export const useScrollAnimationList = (count, options = {}) => {
  const refsRef = useRef([])
  if (refsRef.current.length !== count) {
    refsRef.current = Array.from(
      { length: count },
      (_, index) => refsRef.current[index] || createRef()
    )
  }
  const refs = refsRef.current
  const [visibleStates, setVisibleStates] = useState(
    Array.from({ length: count }, () => false)
  )

  const { threshold = 0.1, rootMargin = '0px 0px -40px 0px', triggerOnce = true } = options

  useEffect(() => {
    setVisibleStates((prev) =>
      Array.from({ length: count }, (_, index) => prev[index] || false)
    )
  }, [count])

  useEffect(() => {
    const activeRefs = refsRef.current
    const observers = activeRefs.map((ref, index) => {
      const element = ref.current
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleStates((prev) => {
              const next = [...prev]
              next[index] = true
              return next
            })
            if (triggerOnce) observer.unobserve(element)
          } else {
            if (!triggerOnce) {
              setVisibleStates((prev) => {
                const next = [...prev]
                next[index] = false
                return next
              })
            }
          }
        },
        { threshold, rootMargin }
      )

      observer.observe(element)
      return observer
    })

    return () => {
      observers.forEach((observer, index) => {
        if (observer && activeRefs[index].current) {
          observer.unobserve(activeRefs[index].current)
        }
      })
    }
  }, [threshold, rootMargin, triggerOnce, count])

  return refs.map((ref, index) => ({
    ref,
    isVisible: visibleStates[index],
  }))
}
