import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Building2,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  Home,
  ShoppingBag,
  Store,
  UtensilsCrossed,
  Scissors,
  Hammer,
} from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import { FADE_UP, STAGGER_CONTAINER } from '@utils/constants'

const INDUSTRIES = [
  { title: 'Restaurants', icon: UtensilsCrossed, desc: 'Online menus, bookings, reviews, and local visibility.' },
  { title: 'Medical Clinics', icon: HeartPulse, desc: 'Appointment systems, patient enquiries, and trust-focused design.' },
  { title: 'Salons', icon: Scissors, desc: 'Booking, Instagram integration, and polished customer experiences.' },
  { title: 'Startups', icon: Building2, desc: 'Launch-ready websites, apps, and investor-friendly digital presence.' },
  { title: 'Real Estate', icon: Home, desc: 'Lead generation, listings, and high-conversion inquiry flows.' },
  { title: 'Education', icon: GraduationCap, desc: 'Course visibility, admissions funnels, and branded learning platforms.' },
  { title: 'Fitness Businesses', icon: Dumbbell, desc: 'Class bookings, membership support, and local marketing.' },
  { title: 'E-Commerce', icon: ShoppingBag, desc: 'Online stores, payments, retention, and repeat purchase systems.' },
  { title: 'Construction', icon: Hammer, desc: 'Credibility-building websites, project showcases, and lead capture.' },
  { title: 'Local Businesses', icon: Store, desc: 'Professional online presence and customer acquisition systems.' },
]

const IndustriesSection = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section className="industries section section--gray" id="industries">
      <div className="container">
        <SectionHeading
          tag="Businesses We Help"
          heading="Built for the Kinds of Businesses That Need Practical Growth Support"
          subline="We work with non-technical business owners who want clarity, execution, and better results online."
          align="center"
        />

        <motion.div
          ref={ref}
          className="industries__grid"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {INDUSTRIES.map(({ title, icon: Icon, desc }) => (
            <motion.div key={title} className="industry-card" variants={FADE_UP}>
              <div className="industry-card__icon">
                <Icon size={20} strokeWidth={1.9} />
              </div>
              <h3 className="industry-card__title">{title}</h3>
              <p className="industry-card__desc">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default IndustriesSection

const style = document.createElement('style')
style.textContent = `
.industries__grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--space-5);
  margin-top: var(--space-12);
}
.industry-card {
  background: linear-gradient(180deg, var(--color-bg-white), color-mix(in srgb, var(--color-bg-white) 85%, var(--color-bg-subtle) 15%));
  border: 1px solid var(--color-border);
  border-radius: 22px;
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  transition: var(--transition-slow);
}
.industry-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-gold-border);
  box-shadow: var(--shadow-card-hover);
}
.industry-card__icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gold-subtle);
  color: var(--color-gold);
  border: 1px solid var(--color-gold-border);
}
.industry-card__title {
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-primary);
}
.industry-card__desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.65;
}
@media (max-width: 1100px) {
  .industries__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 700px) {
  .industries__grid {
    grid-template-columns: 1fr;
  }
}
`
if (!document.head.querySelector('[data-industries-styles]')) {
  style.setAttribute('data-industries-styles', '')
  document.head.appendChild(style)
}
