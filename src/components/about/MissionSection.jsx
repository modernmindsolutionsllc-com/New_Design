import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Rocket, ShieldCheck, Lightbulb } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

const VALUES = [
  {
    icon: Rocket,
    title: 'Outcome-Driven Execution',
    desc: 'We focus on measurable product and business outcomes from day one.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable Delivery',
    desc: 'Clear milestones, transparent communication, and dependable implementation.',
  },
  {
    icon: Lightbulb,
    title: 'Product Thinking',
    desc: 'We combine UX, engineering, and strategy to build products users actually love.',
  },
]

const MissionSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="mission section section--white">
      <div className="container">
        <div className="mission__layout">
          <motion.div
            className="mission__story"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            ref={ref}
          >
            <SectionHeading tag="Our Story" heading="A Modern Approach to Digital Growth" />
            <div className="mission__story-body">
              <p>
                ModernMind Solutions was built to help growing businesses launch, modernize,
                and scale their digital products with confidence.
              </p>
              <p>
                From websites and mobile apps to AI automation and enterprise implementations,
                we deliver end-to-end solutions tailored to your goals.
              </p>
              <p>
                Our team works as an extension of yours: collaborative, fast-moving, and deeply
                invested in quality at every stage.
              </p>
              <p>
                Our mission is simple: turn ambitious ideas into high-performing digital experiences.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mission__values"
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <p className="mission__values-label section-tag">Our Values</p>
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} className="mission-value" variants={FADE_UP}>
                <div className="mission-value__icon-wrap">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="mission-value__title">{title}</h3>
                  <p className="mission-value__desc">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default MissionSection

const style = document.createElement('style')
style.textContent = `
.mission__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: start;
}
.mission__story-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  margin-top: var(--space-4);
}
.mission__story-body p {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.8;
}
.mission__values {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}
.mission__values-label {
  margin-bottom: var(--space-2);
}
.mission-value {
  display: flex;
  gap: var(--space-4);
  align-items: flex-start;
  padding: var(--space-5);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: var(--transition-base);
}
.mission-value:hover {
  border-color: var(--color-gold-border);
  background: var(--color-gold-subtle);
}
.mission-value__icon-wrap {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--color-gold-subtle);
  border: 1px solid var(--color-gold-border);
  color: var(--color-gold);
  display: flex;
  align-items: center;
  justify-content: center;
}
.mission-value__title {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}
.mission-value__desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}
@media (max-width: 860px) {
  .mission__layout {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }
}
`
if (!document.head.querySelector('[data-mission-styles]')) {
  style.setAttribute('data-mission-styles', '')
  document.head.appendChild(style)
}
