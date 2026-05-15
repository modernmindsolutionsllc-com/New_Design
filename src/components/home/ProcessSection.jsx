import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Search, PenTool, Palette, Code2, TestTube2, Rocket, Headphones } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import { FADE_UP, STAGGER_CONTAINER } from '@utils/constants'

const STEPS = [
  { number: '1', icon: Search, title: 'Discovery', desc: 'Requirements analysis, stakeholder interviews, and technical feasibility assessment.', eta: '1-2 weeks' },
  { number: '2', icon: PenTool, title: 'Architecture', desc: 'System design, technology selection, and infrastructure planning.', eta: '1-2 weeks' },
  { number: '3', icon: Palette, title: 'Design', desc: 'UI/UX design, prototyping, design system creation, and user testing.', eta: '2-4 weeks' },
  { number: '4', icon: Code2, title: 'Development', desc: 'Agile sprints with continuous integration, code reviews, and demos.', eta: '6-12 weeks' },
  { number: '5', icon: TestTube2, title: 'Testing', desc: 'Automated tests, manual QA, performance testing, and security audits.', eta: '2-3 weeks' },
  { number: '6', icon: Rocket, title: 'Deployment', desc: 'CI/CD setup, staging validation, production release, and monitoring.', eta: '1 week' },
  { number: '7', icon: Headphones, title: 'Support', desc: 'Post-launch monitoring, bug fixes, optimization, and feature iterations.', eta: 'Ongoing' },
]

const ProcessSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="process section section--gray" id="process">
      <div className="container">
        <SectionHeading
          tag="OUR PROCESS"
          heading="From Idea to Impact"
          subline="A proven 7-step methodology refined across 120+ successful engagements."
          align="center"
        />

        <motion.div ref={ref} className="process__grid" variants={STAGGER_CONTAINER} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
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
@media (max-width: 1100px) { .process__grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 820px) { .process__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .process__grid { grid-template-columns: 1fr; } }
`
if (!document.head.querySelector('[data-proc-styles]')) {
  style.setAttribute('data-proc-styles', '')
  document.head.appendChild(style)
}
