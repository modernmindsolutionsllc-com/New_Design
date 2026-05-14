import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  Code2, Smartphone, BrainCircuit, Palette,
  Cloud, Settings2, ArrowRight, CheckCircle2, Calendar
} from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import { SERVICES } from '@data/services'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

const ICON_MAP = { Code2, Smartphone, BrainCircuit, Palette, Cloud, Settings2 }

const ServicesPreview = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="services-preview section section--white" id="services">
      <div className="container">
        {/* Header row */}
        <div className="services-preview__header">
          <SectionHeading
            tag="Our Services"
            heading="Everything You Need, Under One Roof"
            subline="Pick a focus area — or let us recommend the right solution for your goals."
          />

          {/* "Not sure?" callout card */}
          <div className="services-preview__consult-card">
            <p className="services-preview__consult-label">Not sure where to start?</p>
            <p className="services-preview__consult-sub">
              Book a free 30-minute consult with our team — no strings attached.
            </p>
            <Link to="/start-project" className="btn btn--primary">
              Book Free Consult <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Service Cards Grid */}
        <motion.div
          ref={ref}
          className="services-preview__grid"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {SERVICES.map(({ id, title, icon, shortDescription, subServices }) => {
            const Icon = ICON_MAP[icon] || Code2
            return (
              <motion.div key={id} className="service-card" variants={FADE_UP}>
                <div className="service-card__top">
                  <div className="service-card__icon-wrap">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <h3 className="service-card__title">{title}</h3>
                  <div className="service-card__underline" />
                </div>
                <p className="service-card__desc">{shortDescription}</p>
                <ul className="service-card__list">
                  {subServices.map((item) => (
                    <li key={item} className="service-card__item">
                      <CheckCircle2 size={14} className="service-card__check" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/services#${id}`}
                  className="service-card__link"
                >
                  Learn more <ArrowRight size={14} />
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default ServicesPreview

const style = document.createElement('style')
style.textContent = `
.services-preview__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-8);
  margin-bottom: var(--space-12);
  flex-wrap: wrap;
}

/* Consult card */
.services-preview__consult-card {
  flex-shrink: 0;
  background: var(--color-gold-subtle);
  border: 1.5px solid var(--color-gold-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6) var(--space-8);
  max-width: 300px;
  display: flex; flex-direction: column; gap: var(--space-3);
}
.services-preview__consult-label {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
}
.services-preview__consult-sub {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Grid */
.services-preview__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

/* Service card */
.service-card {
  background: var(--color-bg-white);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  display: flex; flex-direction: column; gap: var(--space-4);
  transition: var(--transition-slow);
  position: relative;
  overflow: hidden;
}
.service-card::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: var(--color-gold);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.service-card:hover {
  border-color: var(--color-gold-border);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-4px);
}
.service-card:hover::before { transform: scaleY(1); }

.service-card__top { display: flex; flex-direction: column; gap: var(--space-3); }
.service-card__icon-wrap {
  width: 44px; height: 44px;
  background: var(--color-gold-subtle);
  border: 1px solid var(--color-gold-border);
  border-radius: var(--radius-md);
  color: var(--color-gold);
  display: flex; align-items: center; justify-content: center;
}
.service-card__title {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-text-primary);
}
.service-card__underline {
  width: 32px; height: 2px;
  background: var(--color-gold);
  border-radius: var(--radius-full);
  transition: width 0.3s ease;
}
.service-card:hover .service-card__underline { width: 56px; }

.service-card__desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.service-card__list {
  display: flex; flex-direction: column; gap: var(--space-2);
  flex: 1;
}
.service-card__item {
  display: flex; align-items: center; gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
.service-card__check { color: var(--color-gold); flex-shrink: 0; }

.service-card__link {
  display: inline-flex; align-items: center; gap: var(--space-2);
  font-size: var(--text-sm); font-weight: 600;
  color: var(--color-gold);
  text-decoration: none;
  margin-top: auto;
  transition: var(--transition-base);
}
.service-card__link:hover { color: var(--color-gold-dark); gap: var(--space-3); }

@media (max-width: 1024px) {
  .services-preview__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .services-preview__grid { grid-template-columns: 1fr; }
  .services-preview__header { flex-direction: column; }
  .services-preview__consult-card { max-width: 100%; }
}
`
if (!document.head.querySelector('[data-sp-styles]')) {
  style.setAttribute('data-sp-styles', '')
  document.head.appendChild(style)
}