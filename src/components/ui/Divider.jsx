/**
 * Divider — a thin gold decorative horizontal rule.
 * Used between sections or inside cards to visually separate content.
 *
 * Props:
 *  align   — 'left' | 'center' | 'right'  (default: 'left')
 *  width   — px or % string e.g. '48px' | '100%'  (default: '48px')
 *  spacing — 'sm' | 'md' | 'lg'  vertical margin above and below  (default: 'md')
 *  color   — 'gold' | 'border' | 'white'  (default: 'gold')
 */
const Divider = ({
    align = 'left',
    width = '48px',
  spacing = 'md',
  color = 'gold',
  className = '',
  }) => {
    const spacingMap = {
      sm: 'var(--space-3) 0',
      md: 'var(--space-5) 0',
      lg: 'var(--space-8) 0',
    }
  
    const colorMap = {
      gold:   'var(--color-gold)',
      border: 'var(--color-border)',
      white:  'rgba(255,255,255,0.3)',
    }
  
    return (
      <div
        className={`divider ${className}`}
        aria-hidden="true"
        style={{
          width,
          height: '3px',
          background: colorMap[color] || colorMap.gold,
          borderRadius: 'var(--radius-full)',
          margin: spacingMap[spacing],
          marginLeft:
            align === 'left' ? '0' : align === 'right' ? 'auto' : 'auto',
          marginRight:
            align === 'right' ? '0' : align === 'left' ? 'auto' : 'auto',
          flexShrink: 0,
        }}
      />
    )
  }
  
  export default Divider
