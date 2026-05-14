const SectionHeading = ({
  tag,
  heading,
  subline,
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center'

  return (
    <div className={`section-heading ${isCenter ? 'section-heading--center' : ''} ${className}`.trim()}>
      {tag ? <p className="section-tag">{tag}</p> : null}
      {heading ? <h2 className="section-heading__title">{heading}</h2> : null}
      {subline ? <p className="section-heading__subline">{subline}</p> : null}
    </div>
  )
}

export default SectionHeading

const style = document.createElement('style')
style.textContent = `
.section-heading {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  max-width: 700px;
}
.section-heading--center {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.section-heading__title {
  font-family: var(--font-display);
  color: var(--color-text-primary);
  line-height: 1.2;
}
.section-heading__subline {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.7;
}
`
if (!document.head.querySelector('[data-section-heading-styles]')) {
  style.setAttribute('data-section-heading-styles', '')
  document.head.appendChild(style)
}
