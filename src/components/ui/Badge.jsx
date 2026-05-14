const Badge = ({ children, variant = 'default', className = '' }) => {
  const variantClass =
    variant === 'gold' ? 'badge--gold' : 'badge--default'

  return (
    <span className={`badge ${variantClass} ${className}`.trim()}>
      {children}
    </span>
  )
}

export default Badge

const style = document.createElement('style')
style.textContent = `
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-full);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.02em;
}
.badge--default {
  background: var(--color-bg-subtle);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}
.badge--gold {
  background: var(--color-gold-subtle);
  color: var(--color-gold-dark);
  border: 1px solid var(--color-gold-border);
}
`
if (!document.head.querySelector('[data-badge-styles]')) {
  style.setAttribute('data-badge-styles', '')
  document.head.appendChild(style)
}
