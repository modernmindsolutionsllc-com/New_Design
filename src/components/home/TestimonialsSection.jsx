import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Star } from 'lucide-react'
import SectionHeading from '@components/ui/SectionHeading'
import { TESTIMONIALS } from '@data/testimonials'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

const TestimonialsSection = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section className="testimonials section section--gray" id="testimonials">
      <div className="container">
        <SectionHeading
          tag="TESTIMONIALS"
          heading="What Clients Say"
          subline="Hear from the teams we've partnered with."
          align="center"
        />

        <motion.div
          ref={ref}
          className="testimonials__grid"
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {TESTIMONIALS.map(({ id, name, role, company, quote, avatar, initials }) => (
            <motion.div key={id} className="testimonial-card" variants={FADE_UP}>
              <div className="testimonial-card__quote-mark" aria-hidden>"</div>
              <div className="testimonial-card__stars" aria-label="5 out of 5 stars">
                {Array(5).fill(null).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" className="testimonial-card__star" />
                ))}
              </div>
              <p className="testimonial-card__text">{quote}</p>
              <div className="testimonial-card__author">
                {avatar ? (
                  <img src={avatar} alt={name} className="testimonial-card__avatar" />
                ) : (
                  <div className="testimonial-card__avatar testimonial-card__avatar--initials">{initials}</div>
                )}
                <div>
                  <div className="testimonial-card__name">{name}</div>
                  <div className="testimonial-card__role">{role}, {company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection

const style = document.createElement('style')
style.textContent = `
.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  margin-top: var(--space-12);
}
.testimonial-card {
  background: #e2e8f0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  position: relative;
  overflow: hidden;
  transition: var(--transition-base);
}

:root[data-theme='dark'] .testimonial-card {
  background: var(--color-bg-white);
}
.testimonial-card:hover {
  border-color: var(--color-gold-border);
  box-shadow: var(--shadow-card-hover);
  transform: translateY(-3px);
}
.testimonial-card__quote-mark {
  position: absolute;
  top: var(--space-4);
  right: var(--space-6);
  font-family: var(--font-display);
  font-size: 6rem;
  color: var(--color-gold-subtle);
  line-height: 1;
  user-select: none;
}
.testimonial-card__stars { display: flex; gap: 2px; }
.testimonial-card__star { color: var(--color-gold); }
.testimonial-card__text {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-style: italic;
  flex: 1;
}
.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}
.testimonial-card__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.testimonial-card__avatar--initials {
  background: var(--color-bg-dark);
  color: var(--color-gold);
  font-weight: 700;
  font-size: var(--text-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-body);
}
.testimonial-card__name {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}
.testimonial-card__role {
  font-size: var(--text-xs);
  color: var(--color-gold-dark);
  font-family: var(--font-body);
}
@media (max-width: 900px) { .testimonials__grid { grid-template-columns: 1fr; } }
`
if (!document.head.querySelector('[data-test-styles]')) {
  style.setAttribute('data-test-styles', '')
  document.head.appendChild(style)
}
