import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Button component — three variants: primary (gold), ghost (outline), text (link)
 * Can render as a <button>, <Link>, or <a> depending on props.
 *
 * Props:
 *  variant   — 'primary' | 'ghost' | 'text'  (default: 'primary')
 *  size      — 'sm' | 'md' | 'lg'            (default: 'md')
 *  to        — React Router internal link path
 *  href      — External URL (renders <a>)
 *  onClick   — Click handler
 *  disabled  — Disabled state
 *  fullWidth — Take full width of container
 *  children  — Button label / content
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  disabled = false,
  fullWidth = false,
  children,
  className = '',
  ...rest
}) => {
  const base = `btn btn--${variant} btn--${size}${fullWidth ? ' btn--full' : ''}${disabled ? ' btn--disabled' : ''} ${className}`

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap:   disabled ? {} : { scale: 0.98 },
    transition: { duration: 0.15 },
  }

  if (to) {
    return (
      <motion.div {...motionProps} style={{ display: fullWidth ? 'block' : 'inline-block' }}>
        <Link to={to} className={base} {...rest}>{children}</Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.div {...motionProps} style={{ display: fullWidth ? 'block' : 'inline-block' }}>
        <a href={href} className={base} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </a>
      </motion.div>
    )
  }

  return (
    <motion.button
      className={base}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.button>
  )
}

export default Button

/* ── Styles injected via a style tag ─────────────────────────────────────── */
const style = document.createElement('style')
style.textContent = `
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-body);
  font-weight: 600;
  border-radius: var(--radius-full);
  cursor: pointer;
  text-decoration: none;
  transition: var(--transition-base);
  white-space: nowrap;
  border: 2px solid transparent;
  letter-spacing: 0.01em;
}

/* Sizes */
.btn--sm  { font-size: var(--text-sm);  padding: 0.5rem 1.25rem; }
.btn--md  { font-size: var(--text-base); padding: 0.75rem 1.75rem; }
.btn--lg  { font-size: var(--text-lg);  padding: 0.875rem 2.25rem; }
.btn--full { width: 100%; }

/* Primary — gold fill */
.btn--primary {
  background: var(--color-gold);
  color: var(--color-bg-dark);
  border-color: var(--color-gold);
}
.btn--primary:hover {
  background: var(--color-gold-dark);
  border-color: var(--color-gold-dark);
  box-shadow: var(--shadow-gold);
}

/* Ghost — charcoal outline */
.btn--ghost {
  background: transparent;
  color: var(--color-text-primary);
  border-color: var(--color-border);
}
.btn--ghost:hover {
  border-color: var(--color-gold);
  color: var(--color-gold);
}

/* Text — no background */
.btn--text {
  background: transparent;
  color: var(--color-gold);
  border-color: transparent;
  padding-left: 0;
  padding-right: 0;
  border-radius: 0;
}
.btn--text:hover { color: var(--color-gold-dark); }

/* Disabled */
.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
`
if (!document.head.querySelector('[data-btn-styles]')) {
  style.setAttribute('data-btn-styles', '')
  document.head.appendChild(style)
}