import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Search, ClipboardList, PenTool, TrendingUp } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import { FADE_UP, STAGGER_CONTAINER } from '@utils/constants'

const STEPS = [
  {
    number: '1',
    icon: Search,
    title: 'Understand',
    desc: 'We learn about your business, goals, customers, and the problems you want to solve.',
    eta: 'Discovery call',
  },
  {
    number: '2',
    icon: ClipboardList,
    title: 'Plan',
    desc: 'We recommend the right mix of website, marketing, automation, or app solutions for your current stage.',
    eta: 'Clear roadmap',
  },
  {
    number: '3',
    icon: PenTool,
    title: 'Build',
    desc: 'We design and deliver your solution with regular updates, feedback loops, and simple communication.',
    eta: 'Milestone-based delivery',
  },
  {
    number: '4',
    icon: TrendingUp,
    title: 'Grow',
    desc: 'After launch, we help you improve visibility, streamline operations, and scale what is already working.',
    eta: 'Ongoing support',
  },
]

const ProcessSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="process section section--gray" id="process">
      <div className="container">
        <SectionHeading
          tag="HOW WE WORK"
          heading="Simple Support From First Conversation to Growth"
          subline="A clear four-step process designed for busy business owners who want guidance, execution, and momentum."
          align="center"
        />

        <motion.div
          ref={ref}
          className="process__grid"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {STEPS.map(({ number, icon: Icon, title, desc, eta }) => (
            <motion.div key={number} className="process-step" variants={FADE_UP}>
              <div className="process-step__number" aria-hidden>{number}</div>
              <div className="process-step__icon-wrap"><Icon size={20} strokeWidth={1.8} /></div>
              <h3 className="process-step__title">{title}</h3>
              <p className="process-step__desc">{desc}</p>
              <p className="process-step__eta">{eta}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ProcessSection

const style = document.createElement('style')
style.textContent = `
.process__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-6); margin-top: var(--space-12); }
.process-step { background: var(--color-bg-white); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-6); position: relative; transition: var(--transition-base); }
.process-step:hover { border-color: var(--color-gold-border); box-shadow: var(--shadow-card-hover); transform: translateY(-3px); }
.process-step__number { position: absolute; top: 10px; right: 12px; font-family: var(--font-body); font-size: var(--text-xs); color: var(--color-text-muted); font-weight: 700; }
.process-step__icon-wrap { width: 48px; height: 48px; border-radius: var(--radius-md); background: var(--color-gold-subtle); border: 1px solid var(--color-gold-border); color: var(--color-gold); display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-4); }
.process-step__title { font-family: var(--font-body); font-size: var(--text-lg); font-weight: 700; color: var(--color-text-primary); margin-bottom: var(--space-2); }
.process-step__desc { font-size: var(--text-sm); color: var(--color-text-secondary); line-height: 1.6; min-height: 92px; }
.process-step__eta { font-size: var(--text-sm); color: var(--color-gold); font-weight: 700; margin-top: var(--space-2); }
@media (max-width: 1100px) { .process__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .process__grid { grid-template-columns: 1fr; } }
`
if (!document.head.querySelector('[data-proc-styles]')) {
  style.setAttribute('data-proc-styles', '')
  document.head.appendChild(style)
}
