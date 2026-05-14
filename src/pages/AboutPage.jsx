import { motion } from 'framer-motion'
import MissionSection from '@components/about/MissionSection'
import TeamSection    from '@components/about/TeamSection'
import StatsRow       from '@components/home/StatsRow'
import CTABanner      from '@components/home/CTABanner'
import { FADE_UP }    from '@utils/constants'

/**
 * AboutPage
 * Sections:
 *  1. Page Hero  — simple heading banner
 *  2. Mission    — company story + core values
 *  3. Team       — team member cards
 *  4. Stats      — dark band with numbers
 *  5. CTA Banner — push to questionnaire
 */
const AboutPage = () => (
  <>
    {/* ── Page Hero ── */}
    <section className="page-hero section--gray">
      <div className="container">
        <motion.div
          className="page-hero__inner"
          variants={FADE_UP}
          initial="hidden"
          animate="visible"
        >
          <span className="section-tag">Who We Are</span>
          <h1 className="page-hero__heading">
            The Studio Behind Your Software
          </h1>
          <div className="gold-divider" />
          <p className="page-hero__sub">
            A small, focused team based in Kolkata — building honest, high-quality
            software for businesses that deserve better than average.
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
/* Shared page hero — reused across non-home pages */
.page-hero {
  padding: var(--space-20) 0 var(--space-16);
  background: var(--color-bg-subtle);
  border-bottom: 1px solid var(--color-border);
}
.page-hero__inner { max-width: 680px; }
.page-hero__heading {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 4vw, 3.5rem);
  font-weight: 700; color: var(--color-text-primary);
  line-height: 1.15; margin-bottom: var(--space-4);
}
.page-hero__sub {
  font-size: var(--text-lg); color: var(--color-text-secondary);
  line-height: 1.7; max-width: 560px;
}
`
if (!document.head.querySelector('[data-page-hero-styles]')) {
  style.setAttribute('data-page-hero-styles', '')
  document.head.appendChild(style)
}
