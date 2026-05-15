import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MessageCircle, Clock, ShieldCheck } from 'lucide-react'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

const VALUE_PROPS = [
  {
    icon: MessageCircle,
    title: 'Beginner-Friendly Process',
    desc: 'Clear language, guided steps, and no technical confusion for first-time clients.',
  },
  {
    icon: Clock,
    title: 'Fast Delivery Cycles',
    desc: 'Agile execution with quick iterations, demos, and milestone-based progress.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable Partnership',
    desc: 'Transparent communication, practical recommendations, and long-term support.',
  },
]

const ValueProps = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section className="value-props" ref={ref}>
      <div className="container">
        <motion.div
          className="value-props__grid"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {VALUE_PROPS.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} className="value-prop" variants={FADE_UP}>
              <div className="value-prop__icon-wrap">
                <Icon size={22} strokeWidth={1.8} />
              </div>
              <div>
                <h3 className="value-prop__title">{title}</h3>
                <p className="value-prop__desc">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ValueProps

const style = document.createElement('style')
style.textContent = `
.value-props {
  background: var(--color-bg-subtle);
  padding: var(--space-16) 0;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}
.value-props__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-10);
}
.value-prop {
  display: flex;
  gap: var(--space-5);
  align-items: flex-start;
}
.value-prop__icon-wrap {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--color-gold-subtle);
  border: 1px solid var(--color-gold-border);
  color: var(--color-gold);
  display: flex;
  align-items: center;
  justify-content: center;
}
.value-prop__title {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}
.value-prop__desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.65;
}
@media (max-width: 768px) {
  .value-props__grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
}
`
if (!document.head.querySelector('[data-vp-styles]')) {
  style.setAttribute('data-vp-styles', '')
  document.head.appendChild(style)
}
