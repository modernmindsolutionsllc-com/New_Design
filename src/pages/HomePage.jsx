import HeroSection        from '@components/home/HeroSection'
import TrustStrip         from '@components/home/TrustStrip'
import ValueProps         from '@components/home/ValueProps'
import ServicesPreview    from '@components/home/ServicesPreview'
import ProcessSection     from '@components/home/ProcessSection'
import PortfolioPreview   from '@components/home/PortfolioPreview'
import StatsRow           from '@components/home/StatsRow'
import TestimonialsSection from '@components/home/TestimonialsSection'
import BlogPreview        from '@components/home/BlogPreview'
import CTABanner          from '@components/home/CTABanner'

/**
 * HomePage — assembles all homepage sections in order.
 * No logic here — each section is self-contained with its own data and animations.
 *
 * Section order:
 *  1. Hero          — hook, value prop, CTAs
 *  2. TrustStrip    — scrolling client logo strip
 *  3. ValueProps    — 3 plain-language promises
 *  4. Services      — 6-card grid + "Not sure?" callout
 *  5. Process       — 6-step how-we-work cards
 *  6. Portfolio     — 3 featured case studies
 *  7. Stats         — dark band with animated numbers
 *  8. Testimonials  — 3 client quote cards
 *  9. Blog          — 3 latest article previews
 * 10. CTA Banner    — final push to the questionnaire
 */
const HomePage = () => (
  <>
    <HeroSection />
    <TrustStrip />
    <ValueProps />
    <ServicesPreview />
    <ProcessSection />
    <PortfolioPreview />
    <StatsRow />
    <TestimonialsSection />
    <BlogPreview />
    <CTABanner />
  </>
)

export default HomePage
