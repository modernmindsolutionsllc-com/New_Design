import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  ClipboardList, FileText, PenTool,
  Code2, TestTube2, Rocket, HeartHandshake
} from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import { FADE_UP, STAGGER_CONTAINER } from '@utils/constants'

const STEPS = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Tell Us About Your Project',
    desc: 'Fill our simple questionnaire. No jargon needed — just tell us your idea in plain words. We\'ll take it from there.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'We Send You a Clear Proposal',
    desc: 'Scope, timeline, and cost — all in writing within 48 hours. No hidden fees, no surprises.',
  },
  {
    number: '03',
    icon: PenTool,
    title: 'Design & Prototyping',
    desc: 'You see and approve exactly how everything will look before a single line of code is written.',
  },
  {
    number: '04',
    icon: Code2,
    title: 'We Build, You Stay Updated',
    desc: 'Weekly progress updates keep you in the loop. You\'re never left wondering what\'s happening.',
  },
  {
    number: '05',
    icon: TestTube2,
    title: 'Testing & Quality Check',
    desc: 'We test everything thoroughly on real devices before handover. If it\'s not right, we fix it.',
  },
  {
    number: '06',
    icon: Rocket,
    title: 'Launch & Beyond',
    desc: 'We handle the go-live and stay available for support and future growth. You\'re not on your own after launch.',
  },
]

const ProcessSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="process section section--gray" id="process">
      <div className="container">
        <SectionHeading
          tag="How We Work"
          heading="Working With Us Is Simple"
          subline="We've designed our process so you always know what's happening next — no confusion, no guessing."
          align="center"
        />

        <motion.div
          ref={ref}
          className="process__grid"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {STEPS.map(({ number, icon: Icon, title, desc }) => (
            <motion.div key={number} className="process-step" variants={FADE_UP}>
              <div className="process-step__number" aria-hidden>{number}</div>
              <div className="process-step__icon-wrap">
                <Icon size={20} strokeWidth={1.8} />
              </div>
              <h3 className="process-step__title">{title}</h3>
              <p className="process-step__desc">{desc}</p>
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
.process__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-8);
  margin-top: var(--space-12);
}
.process-step {
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  position: relative;
  transition: var(--transition-base);
}
.process-step:hover {
  border-color: var(--color-gold-border);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-3px);
}
.process-step__number {
  position: absolute; top: var(--space-6); right: var(--space-6);
  font-family: var(--font-display);
  font-size: 3.5rem; font-weight: 700;
  color: var(--color-border);
  line-height: 1;
  user-select: none;
  transition: color 0.3s;
}
.process-step:hover .process-step__number { color: var(--color-gold-subtle); }

.process-step__icon-wrap {
  width: 48px; height: 48px;
  border-radius: var(--radius-md);
  background: var(--color-gold-subtle);
  border: 1px solid var(--color-gold-border);
  color: var(--color-gold);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: var(--space-4);
}
.process-step__title {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
  line-height: 1.3;
}
.process-step__desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.65;
}
@media (max-width: 900px) { .process__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .process__grid { grid-template-columns: 1fr; } }
`
if (!document.head.querySelector('[data-proc-styles]')) {
  style.setAttribute('data-proc-styles', '')
  document.head.appendChild(style)
}