import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  MessageCircle,
  Globe,
  Smartphone,
  Megaphone,
  Palette,
  Workflow,
  Bot,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import CTABanner from '@components/home/CTABanner'
import { SERVICES } from '@data/services'
import { FADE_UP, STAGGER_CONTAINER } from '@utils/constants'

const ICON_MAP = {
  MessageCircle, Globe, Smartphone, Megaphone, Palette, Workflow, Bot,
}

const CARE_FOCUS = {
  'website-development': ['Trust', 'Lead generation', 'Professional presence', 'SEO foundations'],
  'mobile-app-development': ['Customer experience', 'Ease of use', 'Retention', 'Operational efficiency'],
  'social-media-marketing': ['Visibility', 'Local growth', 'Lead generation', 'Campaign clarity'],
  'branding-design': ['Positioning', 'Visual identity', 'Credibility', 'Consistency'],
  'business-automation': ['Bookings', 'Follow-up', 'Invoicing', 'Internal workflows'],
  'ai-solutions': ['Automation', 'Customer support', 'Lead qualification', 'Scalable assistance'],
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
              <span className="service-block__tech-label">Business outcomes</span>
              <div className="service-block__tech-tags">
                {(CARE_FOCUS[service.id] || []).map((tag) => (
                  <span key={tag} className="service-block__tech-tag">{tag}</span>
                ))}
              </div>
            </div>

            <Link to="/start-project" className="btn btn--primary service-block__cta">
              Book Consultation <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div className="service-block__visual" variants={FADE_UP}>
            <div className="service-block__media">
              <div className="service-block__image-frame">
                <img
                  src={service.imageUrl}
                  alt={service.imageAlt}
                  className="service-block__image"
                  loading="lazy"
                />
                <div className="service-block__image-overlay" />
                <div className="service-block__floating-card service-block__floating-card--top">
                  <span className="service-block__floating-label">Best for</span>
                  <span className="service-block__floating-title">{service.imageCaption}</span>
                </div>
                <div className="service-block__floating-card service-block__floating-card--bottom">
                  <div className="service-block__floating-icon">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="service-block__floating-label">Outcome focus</div>
                    <div className="service-block__floating-title">
                      {(CARE_FOCUS[service.id] || []).slice(0, 2).join(' • ')}
                    </div>
                  </div>
                </div>
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
            Digital Services Designed Around Business Growth
          </motion.h1>
          <div className="gold-divider" />
          <motion.p className="page-hero__sub" variants={FADE_UP}>
            We do more than build technology. We help you choose the right digital moves,
            deliver them well, and turn them into practical business results.
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

    {SERVICES.map((service, index) => (
      <ServiceBlock key={service.id} service={service} index={index} />
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
.service-block__media {
  width: 100%;
  max-width: 500px;
}
.service-block__image-frame {
  position: relative;
  min-height: 520px;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--color-border) 80%, transparent 20%);
  box-shadow: var(--shadow-lg);
  background: var(--color-bg-white);
}
.service-block__image {
  width: 100%;
  height: 100%;
  min-height: 520px;
  object-fit: cover;
}
.service-block__image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(11, 18, 40, 0.05) 0%, rgba(11, 18, 40, 0.52) 100%);
}
.service-block__floating-card {
  position: absolute;
  left: 20px;
  right: 20px;
  border-radius: 22px;
  padding: var(--space-4) var(--space-5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(11, 18, 40, 0.56);
  color: white;
  box-shadow: 0 16px 36px rgba(11, 18, 40, 0.18);
}
.service-block__floating-card--top {
  top: 20px;
}
.service-block__floating-card--bottom {
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.service-block__floating-icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  flex-shrink: 0;
}
.service-block__floating-label {
  display: block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.72;
}
.service-block__floating-title {
  display: block;
  margin-top: 4px;
  font-size: var(--text-sm);
  line-height: 1.55;
  font-weight: 700;
}
@media (max-width: 900px) {
  .service-block__inner {
    grid-template-columns: 1fr;
  }
  .service-block__inner--reverse {
    direction: ltr;
  }
  .service-block__image-frame,
  .service-block__image {
    min-height: 360px;
  }
}
`

if (!document.head.querySelector('[data-services-page-styles]')) {
  style.setAttribute('data-services-page-styles', '')
  document.head.appendChild(style)
}
