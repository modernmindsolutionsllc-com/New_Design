import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  MessageCircle,
  Code2,
  Smartphone,
  BrainCircuit,
  Palette,
  Cloud,
  Settings2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import CTABanner from '@components/home/CTABanner'
import { SERVICES } from '@data/services'
import { FADE_UP, STAGGER_CONTAINER } from '@utils/constants'

const ICON_MAP = {
  MessageCircle, Code2, Smartphone, BrainCircuit, Palette, Cloud, Settings2,
}

const CARE_FOCUS = {
  'web-development': ['React', 'Next.js', 'Performance', 'Scalability'],
  'mobile-apps': ['React Native', 'Flutter', 'iOS', 'Android'],
  'ai-automation': ['AI workflows', 'Automation', 'Integrations', 'Data insights'],
  'ui-ux-design': ['Research', 'Design systems', 'Prototyping', 'Conversion UX'],
  'oracle-hcm-implementation': ['Discovery', 'Configuration', 'Migration', 'Go-live'],
  'oracle-hcm-managed-services': ['Monitoring', 'Support', 'Enhancements', 'Optimization'],
}

const ServiceBlock = ({ service, index }) => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  const Icon = ICON_MAP[service.icon] || MessageCircle
  const isEven = index % 2 === 0

  return (
    <section
      id={service.id}
      ref={ref}
      className={`service-block ${isEven ? 'service-block--light' : 'service-block--gray'}`}
    >
      <div className="container">
        <motion.div
          className={`service-block__inner ${isEven ? '' : 'service-block__inner--reverse'}`}
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="service-block__text" variants={FADE_UP}>
            <div className="service-block__icon-wrap">
              <Icon size={24} strokeWidth={1.8} />
            </div>
            <span className="section-tag">{service.title}</span>
            <h2 className="service-block__heading">{service.title}</h2>
            <div className="gold-divider" />
            <p className="service-block__desc">{service.shortDescription}</p>

            <ul className="service-block__list">
              {service.subServices.map((item) => (
                <li key={item} className="service-block__list-item">
                  <CheckCircle2 size={16} className="service-block__check" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="service-block__tech">
              <span className="service-block__tech-label">Focus areas:</span>
              <div className="service-block__tech-tags">
                {(CARE_FOCUS[service.id] || []).map((tag) => (
                  <span key={tag} className="service-block__tech-tag">{tag}</span>
                ))}
              </div>
            </div>

            <Link to="/start-project" className="btn btn--primary service-block__cta">
              Start This Service <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div className="service-block__visual" variants={FADE_UP}>
            <div className="service-block__card">
              <div className="service-block__card-icon">
                <Icon size={48} strokeWidth={1.2} />
              </div>
              <div className="service-block__card-lines">
                {[75, 55, 65, 45, 60].map((w, i) => (
                  <div
                    key={i}
                    className="service-block__card-line"
                    style={{ width: `${w}%`, animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

const ServicesPage = () => (
  <>
    <section className="page-hero section--gray">
      <div className="container">
        <motion.div
          className="page-hero__inner"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="section-tag" variants={FADE_UP}>What We Do</motion.span>
          <motion.h1 className="page-hero__heading" variants={FADE_UP}>
            Services
          </motion.h1>
          <div className="gold-divider" />
          <motion.p className="page-hero__sub" variants={FADE_UP}>
            End-to-end digital solutions tailored to your business, from strategy and design
            to delivery and long-term support.
          </motion.p>

          <motion.div className="services-page__jumps" variants={FADE_UP}>
            {SERVICES.map(({ id, title }) => (
              <a key={id} href={`#${id}`} className="services-page__jump">
                {title}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>

    {SERVICES.map((service, i) => (
      <ServiceBlock key={service.id} service={service} index={i} />
    ))}

    <CTABanner />
  </>
)

export default ServicesPage

const style = document.createElement('style')
style.textContent = `
.services-page__jumps {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.services-page__jump {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  background: var(--color-bg-white);
  border: 1.5px solid var(--color-border);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: var(--transition-base);
}

.services-page__jump:hover {
  border-color: var(--color-gold);
  color: var(--color-gold-dark);
}

.service-block--light {
  background: var(--color-bg-white);
  padding: var(--space-24) 0;
}

.service-block--gray {
  background: var(--color-bg-subtle);
  padding: var(--space-24) 0;
}

.service-block__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.service-block__inner--reverse {
  direction: rtl;
}

.service-block__inner--reverse > * {
  direction: ltr;
}

.service-block__text {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.service-block__icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  background: var(--color-gold-subtle);
  border: 1px solid var(--color-gold-border);
  color: var(--color-gold);
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-block__heading {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text-primary);
}

.service-block__desc {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.service-block__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.service-block__list-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  font-family: var(--font-body);
}

.service-block__check {
  color: var(--color-gold);
  flex-shrink: 0;
}

.service-block__tech {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.service-block__tech-label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.service-block__tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.service-block__tech-tag {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 600;
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-full);
}

.service-block__cta {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  align-self: flex-start;
}

.service-block__visual {
  display: flex;
  justify-content: center;
}

.service-block__card {
  width: 100%;
  max-width: 400px;
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  padding: var(--space-12);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-8);
}

.service-block__card-icon {
  color: var(--color-gold);
  opacity: 0.7;
}

.service-block__card-lines {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  width: 100%;
}

.service-block__card-line {
  height: 10px;
  border-radius: var(--radius-full);
  background: linear-gradient(90deg, var(--color-border) 0%, var(--color-bg-subtle) 100%);
  animation: shimmer 2.2s ease-in-out infinite;
}

@media (max-width: 900px) {
  .service-block__inner {
    grid-template-columns: 1fr;
  }

  .service-block__inner--reverse {
    direction: ltr;
  }

  .service-block__visual {
    display: none;
  }
}
`

if (!document.head.querySelector('[data-services-page-styles]')) {
  style.setAttribute('data-services-page-styles', '')
  document.head.appendChild(style)
}
