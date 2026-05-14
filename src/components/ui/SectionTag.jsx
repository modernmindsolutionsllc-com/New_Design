/**
 * SectionTag
 * The small gold uppercase label that sits above every section heading.
 * Renders a ✦ diamond prefix automatically via CSS.
 *
 * Props:
 *  children   — the label text e.g. "Our Services"
 *  color      — 'gold' | 'white' | 'muted'   (default: 'gold')
 *              use 'white' on dark backgrounds (footer, dark sections)
 *  className  — additional class names
 *
 * Usage:
 *  <SectionTag>Our Services</SectionTag>
 *  <SectionTag color="white">What We Do</SectionTag>
 *
 * Note: The CSS for .section-tag lives in src/styles/components.css
 * This component is a convenience wrapper so you don't
 * have to remember the class name or the color variants.
 */

const COLOR_MAP = {
    gold:  'var(--color-gold)',
    white: 'rgba(245, 244, 240, 0.75)',
    muted: 'var(--color-text-muted)',
  }
  
  const SectionTag = ({ children, color = 'gold', className = '' }) => (
    <span
      className={`section-tag ${className}`}
      style={color !== 'gold' ? { color: COLOR_MAP[color] } : undefined}
    >
      {children}
    </span>
  )
  
  export default SectionTag