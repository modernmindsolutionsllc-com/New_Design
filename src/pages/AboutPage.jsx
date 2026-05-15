import { motion } from 'framer-motion'
import MissionSection from '@components/about/MissionSection'
import TeamSection from '@components/about/TeamSection'
import StatsRow from '@components/home/StatsRow'
import CTABanner from '@components/home/CTABanner'
import { FADE_UP } from '@utils/constants'

const AboutPage = () => (
  <>
    <section className="page-hero section--gray">
      <div className="container">
        <motion.div className="page-hero__inner" variants={FADE_UP} initial="hidden" animate="visible">
          <span className="section-tag">Who We Are</span>
          <h1 className="page-hero__heading">Modern Problems Deserve Modern Minds</h1>
          <div className="gold-divider" />
          <p className="page-hero__sub">
            We bridge great design and powerful engineering, partnering with startups and
            enterprises to turn ambitious ideas into reality.
          </p>
        </motion.div>
      </div>
    </section>

    <MissionSection />
    <TeamSection />
    <StatsRow />
    <CTABanner />
  </>
)

export default AboutPage

const style = document.createElement('style')
style.textContent = `
.page-hero {
  padding: var(--space-20) 0 var(--space-16);
  background: var(--color-bg-subtle);
  border-bottom: 1px solid var(--color-border);
}
.page-hero__inner {
  max-width: 680px;
}
.page-hero__heading {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 4vw, 3.5rem);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.15;
  margin-bottom: var(--space-4);
}
.page-hero__sub {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 560px;
}
`
if (!document.head.querySelector('[data-page-hero-styles]')) {
  style.setAttribute('data-page-hero-styles', '')
  document.head.appendChild(style)
}
