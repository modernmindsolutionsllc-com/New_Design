import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <button
      type="button"
      className="scroll-to-top"
      onClick={handleClick}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  )
}

export default ScrollToTop

const style = document.createElement('style')
style.textContent = `
.scroll-to-top {
  position: fixed;
  right: 1rem;
  bottom: 4.5rem;
  z-index: 99;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-white);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}
.scroll-to-top:hover {
  transform: translateY(-2px);
  color: var(--color-gold-dark);
  border-color: var(--color-gold-border);
}
`
if (!document.head.querySelector('[data-scroll-top-styles]')) {
  style.setAttribute('data-scroll-top-styles', '')
  document.head.appendChild(style)
}
