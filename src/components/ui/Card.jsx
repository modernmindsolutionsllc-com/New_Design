import { motion } from 'framer-motion'

/**
 * Card — white card with soft shadow, gold left-border on hover.
 *
 * Props:
 *  hoverable  — enables lift + gold border hover effect (default: true)
 *  padding    — 'sm' | 'md' | 'lg'  (default: 'md')
 *  className  — additional class names
 *  onClick    — click handler
 *  children
 */
const Card = ({
  hoverable = true,
  padding = 'md',
  className = '',
  onClick,
  children,
  ...rest
}) => {
  return (
    <motion.div
      className={`card card--pad-${padding} ${hoverable ? 'card--hoverable' : ''} ${className}`}
      whileHover={hoverable ? { y: -5, boxShadow: 'var(--shadow-card-hover)' } : {}}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onClick={onClick}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export default Card

const style = document.createElement('style')
style.textContent = `
.card {
  background: var(--color-bg-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  border: 1px solid var(--color-border);
  transition: var(--transition-base);
  position: relative;
  overflow: hidden;
}

.card--hoverable {
  cursor: default;
}

/* Gold left accent bar that appears on hover */
.card--hoverable::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--color-gold);
  border-radius: var(--radius-full) 0 0 var(--radius-full);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.card--hoverable:hover::before {
  transform: scaleY(1);
}

/* Padding variants */
.card--pad-sm { padding: var(--space-5); }
.card--pad-md { padding: var(--space-8); }
.card--pad-lg { padding: var(--space-10); }

@media (max-width: 640px) {
  .card--pad-md { padding: var(--space-6); }
  .card--pad-lg { padding: var(--space-8); }
}
`
if (!document.head.querySelector('[data-card-styles]')) {
  style.setAttribute('data-card-styles', '')
  document.head.appendChild(style)
}