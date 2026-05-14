import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { STATS } from '@data/stats'

const StatsRow = () => {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  return (
    <section className="stats-row" ref={ref}>
      <div className="container">
        <div className="stats-row__grid">
          {STATS.map(({ id, value, suffix, label }) => (
            <div key={id} className="stat-item">
              <div className="stat-item__value">
                {inView ? (
                  <CountUp end={value} duration={2.2} suffix={suffix} />
                ) : (
                  <span>0{suffix}</span>
                )}
              </div>
              <div className="stat-item__label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsRow

const style = document.createElement('style')
style.textContent = `
.stats-row {
  background: var(--color-bg-dark);
  padding: var(--space-16) 0;
}
.stats-row__grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: var(--space-8); text-align: center;
}
.stat-item__value {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 700; color: var(--color-gold);
  line-height: 1;
}
.stat-item__label {
  font-family: var(--font-body);
  font-size: var(--text-sm); font-weight: 500;
  color: rgba(245,244,240,0.6);
  margin-top: var(--space-2);
  letter-spacing: 0.04em; text-transform: uppercase;
}
@media (max-width: 640px) {
  .stats-row__grid { grid-template-columns: repeat(2, 1fr); gap: var(--space-10); }
}
`
if (!document.head.querySelector('[data-stats-styles]')) {
  style.setAttribute('data-stats-styles', '')
  document.head.appendChild(style)
}