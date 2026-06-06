import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  Smartphone,
  CalendarDays,
  Megaphone,
  Palette,
  Workflow,
  CreditCard,
  Search,
  Bot,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'
import { getFieldError, fieldHasError } from '@utils/formHelpers'

/* ------------------------------------------------------------------ */
/*  Growth suggestion data mapped per business type                   */
/* ------------------------------------------------------------------ */

const GROWTH_SUGGESTIONS = {
  Restaurant: [
    { id: 'website', icon: Globe, title: 'Professional Website', growth: 35, desc: `Most diners check your site before visiting. A fast, mobile-friendly website with your menu and location builds instant trust.` },
    { id: 'online-booking', icon: CalendarDays, title: 'Online Table Reservations', growth: 28, desc: `Let customers book a table anytime without calling. Fewer missed reservations, more walk-ins converted.` },
    { id: 'social-media', icon: Megaphone, title: 'Social Media & Local Reach', growth: 22, desc: `Regular posts with food photos and local hashtags keep your restaurant top-of-mind in the neighborhood.` },
    { id: 'seo', icon: Search, title: 'Google & Maps Visibility', growth: 30, desc: `When someone searches "restaurants near me," you want to show up first. We make that happen.` },
    { id: 'online-payments', icon: CreditCard, title: 'Online Ordering & Payments', growth: 25, desc: `Accept orders directly from your site. No third-party commissions eating into your margins.` },
    { id: 'automation', icon: Workflow, title: 'Review & Follow-Up Automation', growth: 15, desc: `Automatically ask happy customers for reviews and send return-visit offers. Growth on autopilot.` },
  ],
  Clinic: [
    { id: 'website', icon: Globe, title: 'Professional Clinic Website', growth: 40, desc: `Patients research before they book. A clean, trustworthy website with services and credentials converts visitors into appointments.` },
    { id: 'online-booking', icon: CalendarDays, title: 'Online Appointment Booking', growth: 35, desc: `Let patients book 24/7 without phone tag. Reduces no-shows and fills your calendar faster.` },
    { id: 'seo', icon: Search, title: 'Local Search Optimization', growth: 30, desc: `When someone searches for clinics in your area, your name should appear at the top. We make sure it does.` },
    { id: 'automation', icon: Workflow, title: 'Patient Reminders & Follow-Ups', growth: 20, desc: `Automated appointment reminders cut no-shows by up to 40%. Follow-up messages build long-term patient loyalty.` },
    { id: 'social-media', icon: Megaphone, title: 'Health Content & Social Trust', growth: 18, desc: `Share health tips and clinic updates that position you as the go-to expert in your community.` },
    { id: 'branding', icon: Palette, title: 'Professional Brand Identity', growth: 15, desc: `A polished logo, consistent colors, and professional materials make your clinic feel established and trustworthy.` },
  ],
  Salon: [
    { id: 'online-booking', icon: CalendarDays, title: 'Online Booking System', growth: 40, desc: `Clients want to book at midnight, not during business hours. An always-open booking page fills your chair gaps.` },
    { id: 'website', icon: Globe, title: 'Stunning Portfolio Website', growth: 30, desc: `Show off your best work with a gorgeous gallery. New clients often choose a salon based on the portfolio alone.` },
    { id: 'social-media', icon: Megaphone, title: 'Instagram & Social Growth', growth: 35, desc: `Before-and-after posts, reels, and stories turn followers into paying clients. Your work speaks louder than any ad.` },
    { id: 'seo', icon: Search, title: 'Google Maps & Reviews', growth: 25, desc: `"Salon near me" is one of the most searched phrases. Ranking higher means more walk-ins without spending on ads.` },
    { id: 'automation', icon: Workflow, title: 'Rebooking & Loyalty Automation', growth: 20, desc: `Automatic reminders when clients are due for a touchup. Loyalty rewards that keep them coming back to you, not competitors.` },
    { id: 'branding', icon: Palette, title: 'Brand & Visual Identity', growth: 12, desc: `From your signage to your appointment cards, a cohesive look says "premium" before a client even sits down.` },
  ],
  'Retail Store': [
    { id: 'website', icon: Globe, title: 'E-Commerce Ready Website', growth: 45, desc: `Sell online 24/7 even when your store is closed. Reach customers beyond your neighborhood without opening a second location.` },
    { id: 'online-payments', icon: CreditCard, title: 'Seamless Online Payments', growth: 30, desc: `Easy checkout with multiple payment options means fewer abandoned carts and more completed orders.` },
    { id: 'social-media', icon: Megaphone, title: 'Social Media Storefront', growth: 28, desc: `Turn your Instagram and Facebook into shoppable storefronts. Customers buy what they see in your feed.` },
    { id: 'seo', icon: Search, title: 'Search & Local Visibility', growth: 25, desc: `Get found when people search for products you sell. Local SEO brings nearby shoppers through your door.` },
    { id: 'automation', icon: Workflow, title: 'Inventory & Order Automation', growth: 18, desc: `Automated stock alerts, order confirmations, and shipping updates save hours of manual work every week.` },
    { id: 'branding', icon: Palette, title: 'Brand Packaging & Identity', growth: 15, desc: `Memorable packaging and a consistent brand feel turn one-time buyers into loyal fans who recommend you.` },
  ],
  'Real Estate': [
    { id: 'website', icon: Globe, title: 'Property Listing Website', growth: 45, desc: `A professional site with searchable listings, virtual tours, and instant inquiry forms generates leads around the clock.` },
    { id: 'seo', icon: Search, title: 'Local Market SEO', growth: 35, desc: `When buyers search "homes for sale in [your city]," your listings should appear first. That is where deals start.` },
    { id: 'automation', icon: Workflow, title: 'Lead Follow-Up Automation', growth: 30, desc: `Speed wins in real estate. Automated responses and drip campaigns ensure no lead goes cold while you are showing properties.` },
    { id: 'social-media', icon: Megaphone, title: 'Social Media & Video Tours', growth: 25, desc: `Virtual walkthroughs and market update videos on social media attract serious buyers before they even call an agent.` },
    { id: 'mobile-app', icon: Smartphone, title: 'Client Portal App', growth: 20, desc: `Give buyers and sellers a personal dashboard to track listings, documents, and closing progress in one place.` },
    { id: 'branding', icon: Palette, title: 'Premium Agent Branding', growth: 15, desc: `In a trust-based industry, a polished personal brand sets you apart from hundreds of other agents in the market.` },
  ],
  Education: [
    { id: 'website', icon: Globe, title: 'Course & Enrollment Website', growth: 40, desc: `Parents and students decide based on your website. A clear, modern site with easy enrollment forms fills classrooms.` },
    { id: 'mobile-app', icon: Smartphone, title: 'Student & Parent App', growth: 30, desc: `Attendance, grades, schedules, and announcements in one app. Parents feel connected, students stay engaged.` },
    { id: 'social-media', icon: Megaphone, title: 'Community & Social Presence', growth: 22, desc: `Share student achievements, events, and educational content that builds trust and attracts new enrollments.` },
    { id: 'online-payments', icon: CreditCard, title: 'Online Fee Collection', growth: 25, desc: `No more chasing payments. Parents pay fees online with reminders and receipts handled automatically.` },
    { id: 'automation', icon: Workflow, title: 'Communication Automation', growth: 20, desc: `Automated newsletters, event reminders, and progress updates keep parents informed without adding to staff workload.` },
    { id: 'seo', icon: Search, title: 'Local Search Visibility', growth: 18, desc: `When parents search for schools or courses nearby, your institution should be the first name they see.` },
  ],
  'E-Commerce': [
    { id: 'website', icon: Globe, title: 'High-Converting Online Store', growth: 50, desc: `A fast, beautiful store with smooth navigation and trust signals turns browsers into buyers and buyers into repeat customers.` },
    { id: 'seo', icon: Search, title: 'Product & Category SEO', growth: 35, desc: `Rank your products on Google so customers find you when they search for exactly what you sell.` },
    { id: 'social-media', icon: Megaphone, title: 'Social Commerce & Ads', growth: 30, desc: `Shoppable posts, targeted ads, and influencer partnerships drive traffic that is ready to buy.` },
    { id: 'automation', icon: Workflow, title: 'Cart Recovery & Email Flows', growth: 28, desc: `Recover abandoned carts, send post-purchase follow-ups, and automate review requests. Each email is a revenue opportunity.` },
    { id: 'online-payments', icon: CreditCard, title: 'Multi-Payment Gateway', growth: 20, desc: `Offer every payment method your customers expect. More options at checkout means fewer drop-offs.` },
    { id: 'ai', icon: Bot, title: 'AI Shopping Assistant', growth: 15, desc: `A smart chatbot that helps customers find products, answers questions, and upsells relevant items 24/7.` },
  ],
  Fitness: [
    { id: 'online-booking', icon: CalendarDays, title: 'Class & Session Booking', growth: 38, desc: `Let members book classes, personal training, and slots from their phone. Full classes mean a healthier bottom line.` },
    { id: 'website', icon: Globe, title: 'Membership & Plans Website', growth: 32, desc: `Show your facility, trainers, and pricing clearly. A compelling site turns visitors into paying members.` },
    { id: 'mobile-app', icon: Smartphone, title: 'Member Experience App', growth: 28, desc: `Workout tracking, class schedules, and membership management in one app keeps members engaged and retained.` },
    { id: 'social-media', icon: Megaphone, title: 'Transformation Content', growth: 25, desc: `Before-and-after stories, workout tips, and trainer spotlights on social media inspire new sign-ups every week.` },
    { id: 'automation', icon: Workflow, title: 'Retention & Reminder System', growth: 20, desc: `Automated check-in reminders and milestone celebrations reduce cancellations and keep members motivated.` },
    { id: 'online-payments', icon: CreditCard, title: 'Subscription Payments', growth: 15, desc: `Smooth recurring billing with easy upgrade and freeze options means fewer payment headaches for everyone.` },
  ],
  Startup: [
    { id: 'website', icon: Globe, title: 'Launch-Ready Website', growth: 45, desc: `Your website is your first investor pitch, your first sales page, and your first impression. Make it count from day one.` },
    { id: 'branding', icon: Palette, title: 'Brand Identity & Positioning', growth: 30, desc: `A strong brand from the start means every dollar you spend on marketing works harder. Stand out before you scale.` },
    { id: 'mobile-app', icon: Smartphone, title: 'MVP App Development', growth: 35, desc: `Get your core idea into users hands fast. A lean MVP validates your concept and attracts early adopters and investors.` },
    { id: 'social-media', icon: Megaphone, title: 'Launch & Growth Marketing', growth: 25, desc: `Build buzz before you launch. Strategic social presence creates a waitlist of eager customers on day one.` },
    { id: 'seo', icon: Search, title: 'Organic Growth Foundation', growth: 20, desc: `Start ranking early so you are not 100% dependent on ads. SEO is the gift that keeps giving as you scale.` },
    { id: 'automation', icon: Workflow, title: 'Lean Operations Setup', growth: 18, desc: `Automate onboarding, support, and follow-ups from the start. Scale your operations without scaling your headcount.` },
  ],
  Construction: [
    { id: 'website', icon: Globe, title: 'Project Portfolio Website', growth: 40, desc: `Showcase completed projects with photos and testimonials. Potential clients trust what they can see.` },
    { id: 'seo', icon: Search, title: 'Local Contractor SEO', growth: 35, desc: `When homeowners search for contractors in your area, being on page one is the difference between a quote and silence.` },
    { id: 'social-media', icon: Megaphone, title: 'Project Updates & Social Proof', growth: 20, desc: `Time-lapse videos, before-and-after shots, and client testimonials on social media build credibility fast.` },
    { id: 'automation', icon: Workflow, title: 'Quote & Follow-Up Automation', growth: 25, desc: `Send professional quotes instantly and automate follow-ups so no lead slips through the cracks during busy season.` },
    { id: 'branding', icon: Palette, title: 'Professional Brand Materials', growth: 15, desc: `Branded trucks, uniforms, and proposals make you look established and trustworthy before the first handshake.` },
    { id: 'mobile-app', icon: Smartphone, title: 'Client Project Tracker', growth: 18, desc: `Let clients check project progress, approve changes, and communicate with your team through one simple app.` },
  ],
}

/* Fallback for "Other" or unrecognized business types */
const DEFAULT_SUGGESTIONS = [
  { id: 'website', icon: Globe, title: 'Professional Business Website', growth: 40, desc: `Your website works for you 24/7. A polished, fast site builds trust and captures leads while you sleep.` },
  { id: 'seo', icon: Search, title: 'Google Search Visibility', growth: 30, desc: `Being found on Google is not optional anymore. We help your business show up when customers are ready to buy.` },
  { id: 'social-media', icon: Megaphone, title: 'Social Media Presence', growth: 25, desc: `Consistent, engaging social content builds awareness and trust. Your next customer is already scrolling.` },
  { id: 'automation', icon: Workflow, title: 'Business Automation', growth: 22, desc: `Stop doing repetitive tasks manually. Automated follow-ups, reminders, and workflows save hours every week.` },
  { id: 'online-payments', icon: CreditCard, title: 'Online Payments', growth: 20, desc: `Make it easy for customers to pay you. The simpler the checkout, the more transactions you complete.` },
  { id: 'branding', icon: Palette, title: 'Brand Identity', growth: 15, desc: `A consistent, professional look across all touchpoints makes your business feel bigger and more trustworthy.` },
]

/* ------------------------------------------------------------------ */
/*  Follow-up question options                                         */
/* ------------------------------------------------------------------ */

const EXISTING_PROBLEMS = [
  'Website looks outdated',
  'Not showing up on Google',
  'Follow-up is too manual',
  'Social media isn\'t generating results',
  'Can\'t accept bookings or payments online',
  'Not sure what to fix first',
]

const CUSTOMER_GOALS = [
  'Get more enquiries',
  'Book appointments more easily',
  'Trust the business faster',
  'Contact us without friction',
  'Pay online or complete a purchase',
]

const IMPROVE_FIRST_OPTIONS = [
  'Website', 'Social media', 'Branding', 'SEO',
  'Online booking', 'Online payments', 'Automation', 'Customer experience',
]

const LAUNCH_TYPE_OPTIONS = [
  'A professional website',
  'A mobile app',
  'An online store',
  'A social media presence',
  'A booking or scheduling system',
]

const FIRST_PRIORITY_OPTIONS = [
  'A professional website',
  'More inquiries and leads',
  'Simple booking or payments',
  'A stronger brand image',
  'Guidance on what to build first',
]

const HELP_NEEDED_OPTIONS = [
  'Marketing', 'Design', 'Development', 'Automation', 'Strategy',
]

const ESSENTIAL_FEATURES_OPTIONS = [
  'Contact form or inquiry system',
  'Online booking or scheduling',
  'Product catalog or menu',
  'Payment processing',
  'Photo gallery or portfolio',
  'Customer reviews section',
  'Live chat or chatbot',
  'Blog or content section',
]

/* ------------------------------------------------------------------ */
/*  Animated growth ring component                                     */
/* ------------------------------------------------------------------ */

const GrowthRing = ({ percent, size = 56, strokeWidth = 5, active }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="growth-ring">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        opacity={0.12}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={active ? 'url(#ring-gradient-active)' : 'url(#ring-gradient)'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <defs>
        <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22b6ff" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
        <linearGradient id="ring-gradient-active" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  StepTwo: Growth suggestions (no questions)                         */
/* ------------------------------------------------------------------ */

const StepTwo = ({ formData, errors, updateField, clearFieldError }) => {
  const businessType = formData.businessType || ''
  const suggestions = GROWTH_SUGGESTIONS[businessType] || DEFAULT_SUGGESTIONS
  const [selectedIds, setSelectedIds] = useState(() => formData.growthSelections || [])

  const toggleSuggestion = (id) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((s) => s !== id)
      : [...selectedIds, id]
    setSelectedIds(next)
    updateField('growthSelections', next)
    clearFieldError('growthSelections')
  }

  const totalGrowth = useMemo(
    () => suggestions.filter((s) => selectedIds.includes(s.id)).reduce((sum, s) => sum + s.growth, 0),
    [selectedIds, suggestions],
  )

  const selectedCount = selectedIds.length

  /* Online presence state & handlers */
  const onlinePresenceStatus = formData.onlinePresenceStatus || ''
  const existingAnswers = formData.existingPresenceAnswers || {}
  const newAnswers = formData.newPresenceAnswers || {}

  const setOnlinePresence = (value) => {
    updateField('onlinePresenceStatus', value)
    if (value === 'yes') {
      updateField('newPresenceAnswers', {})
    } else {
      updateField('existingPresenceAnswers', {})
    }
    clearFieldError('onlinePresenceStatus')
  }

  const updateExistingAnswer = (field, value) => {
    updateField('existingPresenceAnswers', { ...existingAnswers, [field]: value })
    clearFieldError(`existing.${field}`)
  }

  const updateNewAnswer = (field, value) => {
    updateField('newPresenceAnswers', { ...newAnswers, [field]: value })
    clearFieldError(`new.${field}`)
  }

  const toggleExistingArray = (field, value) => {
    const current = existingAnswers[field] || []
    const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value]
    updateExistingAnswer(field, next)
  }

  const toggleNewArray = (field, value) => {
    const current = newAnswers[field] || []
    const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value]
    updateNewAnswer(field, next)
  }

  return (
    <motion.div className="form-step" variants={STAGGER_CONTAINER} initial="hidden" animate="visible">
      <motion.div className="form-step__header" variants={FADE_UP}>
        <span className="growth-step__eyebrow">
          <Sparkles size={14} />
          {businessType ? `Personalized for ${businessType} businesses` : `Your growth blueprint`}
        </span>
        <h2 className="form-step__title">
          {`Here\u2019s what could change everything for your business`}
        </h2>
        <p className="form-step__sub">
          {`We\u2019ve analyzed what works best for businesses like yours. Select the growth areas that excite you \u2014 we\u2019ll build a custom roadmap around them.`}
        </p>
        {fieldHasError(errors, 'growthSelections') && (
          <div className="form-field__error" style={{ marginTop: 'var(--space-2)' }}>
            {getFieldError(errors, 'growthSelections')}
          </div>
        )}
      </motion.div>

      {/* Total growth banner */}
      <AnimatePresence>
        {selectedCount > 0 && (
          <motion.div
            className="growth-total-banner"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="growth-total-banner__left">
              <TrendingUp size={20} />
              <div>
                <span className="growth-total-banner__label">Projected combined growth</span>
                <span className="growth-total-banner__sub">
                  {selectedCount === 1
                    ? `1 growth area selected`
                    : `${selectedCount} growth areas selected`}
                </span>
              </div>
            </div>
            <motion.span
              className="growth-total-banner__value"
              key={totalGrowth}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              +{totalGrowth}%
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestion cards */}
      <motion.div className="growth-grid" variants={FADE_UP}>
        {suggestions.map((item, index) => {
          const active = selectedIds.includes(item.id)
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              type="button"
              className={`growth-card ${active ? 'growth-card--active' : ''}`}
              onClick={() => toggleSuggestion(item.id)}
              aria-pressed={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.985 }}
            >
              <div className="growth-card__top">
                <div className="growth-card__icon-wrap">
                  <Icon size={20} />
                </div>
                <div className="growth-card__ring-wrap">
                  <GrowthRing percent={item.growth} active={active} />
                  <span className="growth-card__percent">+{item.growth}%</span>
                </div>
              </div>
              <div className="growth-card__body">
                <h3 className="growth-card__title">{item.title}</h3>
                <p className="growth-card__desc">{item.desc}</p>
              </div>
              <div className="growth-card__footer">
                <span className="growth-card__tag">
                  {active ? (
                    <>
                      <CheckCircle2 size={13} /> Added to your plan
                    </>
                  ) : (
                    <>
                      <ArrowUpRight size={13} /> Tap to add
                    </>
                  )}
                </span>
                <ChevronRight size={14} className="growth-card__arrow" />
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      {/* Bottom encouragement */}
      <motion.div className="growth-footer" variants={FADE_UP}>
        <p className="growth-footer__text">
          <Sparkles size={14} />
          {selectedCount === 0
            ? `Select the areas above to see your potential growth \u2014 every selection shapes your custom plan.`
            : `Great choices! We\u2019ll design a step-by-step plan to achieve this +${totalGrowth}% growth for your ${businessType || 'business'}.`}
        </p>
      </motion.div>

      {/* ---- Online Presence Question ---- */}
      <motion.div className="presence-section" variants={FADE_UP}>
        <div className="presence-divider" />
        <div className={`form-field ${fieldHasError(errors, 'onlinePresenceStatus') ? 'form-field--error' : ''}`}>
          <label className="form-field__label">
            Do you already have an online presence for your business?
            <span className="form-field__required">*</span>
          </label>
          <div className="presence-options">
            <button
              type="button"
              className={`presence-option ${onlinePresenceStatus === 'yes' ? 'presence-option--selected' : ''}`}
              onClick={() => setOnlinePresence('yes')}
              aria-pressed={onlinePresenceStatus === 'yes'}
            >
              <div className="presence-option__radio" />
              <div className="presence-option__content">
                <h4 className="presence-option__title">Yes, we already have an online presence</h4>
                <p className="presence-option__desc">Website, app, social pages, store, or listings already exist.</p>
              </div>
            </button>
            <button
              type="button"
              className={`presence-option ${onlinePresenceStatus === 'no' ? 'presence-option--selected' : ''}`}
              onClick={() => setOnlinePresence('no')}
              aria-pressed={onlinePresenceStatus === 'no'}
            >
              <div className="presence-option__radio" />
              <div className="presence-option__content">
                <h4 className="presence-option__title">No, we do not have an online presence yet</h4>
                <p className="presence-option__desc">We are starting from scratch and need the right setup for growth.</p>
              </div>
            </button>
          </div>
          {fieldHasError(errors, 'onlinePresenceStatus') && (
            <span className="form-field__error">{getFieldError(errors, 'onlinePresenceStatus')}</span>
          )}
        </div>
      </motion.div>

      {/* ---- Follow-up: Existing Presence ---- */}
      <AnimatePresence>
        {onlinePresenceStatus === 'yes' && (
          <motion.div
            key="existing-followup"
            className="followup-section"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`form-field ${fieldHasError(errors, 'existing.biggestProblem') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                What are the biggest problems with your current online presence?
                <span className="form-field__required">*</span>
              </label>
              <div className="followup-chips">
                {EXISTING_PROBLEMS.map((opt) => {
                  const active = (existingAnswers.biggestProblem || []).includes(opt)
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={`followup-chip ${active ? 'followup-chip--selected' : ''}`}
                      onClick={() => toggleExistingArray('biggestProblem', opt)}
                      aria-pressed={active}
                    >
                      {active && <CheckCircle2 size={13} />}
                      {opt}
                    </button>
                  )
                })}
              </div>
              {fieldHasError(errors, 'existing.biggestProblem') && (
                <span className="form-field__error">{getFieldError(errors, 'existing.biggestProblem')}</span>
              )}
            </div>

            <div className={`form-field ${fieldHasError(errors, 'existing.customerGoal') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                What should your customers be able to do more easily?
                <span className="form-field__required">*</span>
              </label>
              <div className="followup-chips">
                {CUSTOMER_GOALS.map((opt) => {
                  const active = existingAnswers.customerGoal === opt
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={`followup-chip ${active ? 'followup-chip--selected' : ''}`}
                      onClick={() => updateExistingAnswer('customerGoal', opt)}
                      aria-pressed={active}
                    >
                      {active && <CheckCircle2 size={13} />}
                      {opt}
                    </button>
                  )
                })}
              </div>
              {fieldHasError(errors, 'existing.customerGoal') && (
                <span className="form-field__error">{getFieldError(errors, 'existing.customerGoal')}</span>
              )}
            </div>

            <div className={`form-field ${fieldHasError(errors, 'existing.improveFirst') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                What do you want to improve first?
                <span className="form-field__required">*</span>
              </label>
              <div className="followup-chips">
                {IMPROVE_FIRST_OPTIONS.map((opt) => {
                  const active = (existingAnswers.improveFirst || []).includes(opt)
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={`followup-chip ${active ? 'followup-chip--selected' : ''}`}
                      onClick={() => toggleExistingArray('improveFirst', opt)}
                      aria-pressed={active}
                    >
                      {active && <CheckCircle2 size={13} />}
                      {opt}
                    </button>
                  )
                })}
              </div>
              {fieldHasError(errors, 'existing.improveFirst') && (
                <span className="form-field__error">{getFieldError(errors, 'existing.improveFirst')}</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Follow-up: New Presence ---- */}
      <AnimatePresence>
        {onlinePresenceStatus === 'no' && (
          <motion.div
            key="new-followup"
            className="followup-section"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`form-field ${fieldHasError(errors, 'new.launchType') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                What do you want to launch first?
                <span className="form-field__required">*</span>
              </label>
              <div className="followup-chips">
                {LAUNCH_TYPE_OPTIONS.map((opt) => {
                  const active = newAnswers.launchType === opt
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={`followup-chip ${active ? 'followup-chip--selected' : ''}`}
                      onClick={() => updateNewAnswer('launchType', opt)}
                      aria-pressed={active}
                    >
                      {active && <CheckCircle2 size={13} />}
                      {opt}
                    </button>
                  )
                })}
              </div>
              {fieldHasError(errors, 'new.launchType') && (
                <span className="form-field__error">{getFieldError(errors, 'new.launchType')}</span>
              )}
            </div>

            <div className={`form-field ${fieldHasError(errors, 'new.firstPriority') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                What is your most important priority right now?
                <span className="form-field__required">*</span>
              </label>
              <div className="followup-chips">
                {FIRST_PRIORITY_OPTIONS.map((opt) => {
                  const active = newAnswers.firstPriority === opt
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={`followup-chip ${active ? 'followup-chip--selected' : ''}`}
                      onClick={() => updateNewAnswer('firstPriority', opt)}
                      aria-pressed={active}
                    >
                      {active && <CheckCircle2 size={13} />}
                      {opt}
                    </button>
                  )
                })}
              </div>
              {fieldHasError(errors, 'new.firstPriority') && (
                <span className="form-field__error">{getFieldError(errors, 'new.firstPriority')}</span>
              )}
            </div>

            <div className={`form-field ${fieldHasError(errors, 'new.helpNeeded') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                What kind of help do you need from us?
                <span className="form-field__required">*</span>
              </label>
              <div className="followup-chips">
                {HELP_NEEDED_OPTIONS.map((opt) => {
                  const active = (newAnswers.helpNeeded || []).includes(opt)
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={`followup-chip ${active ? 'followup-chip--selected' : ''}`}
                      onClick={() => toggleNewArray('helpNeeded', opt)}
                      aria-pressed={active}
                    >
                      {active && <CheckCircle2 size={13} />}
                      {opt}
                    </button>
                  )
                })}
              </div>
              {fieldHasError(errors, 'new.helpNeeded') && (
                <span className="form-field__error">{getFieldError(errors, 'new.helpNeeded')}</span>
              )}
            </div>

            <div className={`form-field ${fieldHasError(errors, 'new.essentialFeatures') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                What features are essential for your first version?
                <span className="form-field__required">*</span>
              </label>
              <div className="followup-chips">
                {ESSENTIAL_FEATURES_OPTIONS.map((opt) => {
                  const active = (newAnswers.essentialFeatures || []).includes(opt)
                  return (
                    <button
                      key={opt}
                      type="button"
                      className={`followup-chip ${active ? 'followup-chip--selected' : ''}`}
                      onClick={() => toggleNewArray('essentialFeatures', opt)}
                      aria-pressed={active}
                    >
                      {active && <CheckCircle2 size={13} />}
                      {opt}
                    </button>
                  )
                })}
              </div>
              {fieldHasError(errors, 'new.essentialFeatures') && (
                <span className="form-field__error">{getFieldError(errors, 'new.essentialFeatures')}</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default StepTwo

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const style = document.createElement('style')
style.textContent = `
.growth-step__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-gold);
  margin-bottom: var(--space-1);
}

/* Total growth banner */
.growth-total-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background: linear-gradient(135deg, rgba(34, 182, 255, 0.10) 0%, rgba(245, 158, 11, 0.08) 100%);
  border: 1.5px solid rgba(34, 182, 255, 0.25);
  border-radius: var(--radius-xl);
  margin-bottom: var(--space-4);
}
.growth-total-banner__left {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--color-gold);
}
.growth-total-banner__left > div {
  display: flex;
  flex-direction: column;
}
.growth-total-banner__label {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}
.growth-total-banner__sub {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: 2px;
}
.growth-total-banner__value {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 900;
  font-family: var(--font-display);
  background: linear-gradient(135deg, #22b6ff 0%, #f59e0b 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Growth suggestion grid */
.growth-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
}

/* Growth card */
.growth-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
  background: color-mix(in srgb, var(--color-bg-white) 92%, var(--color-bg-subtle) 8%);
  border: 1.5px solid var(--color-border);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  text-align: left;
  position: relative;
  overflow: hidden;
}
.growth-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(34, 182, 255, 0.06) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.growth-card:hover {
  border-color: rgba(34, 182, 255, 0.4);
  box-shadow: 0 8px 32px rgba(34, 182, 255, 0.08), 0 2px 8px rgba(0,0,0,0.04);
}
.growth-card:hover::before {
  opacity: 1;
}
.growth-card--active {
  border-color: var(--color-gold) !important;
  background: linear-gradient(180deg, rgba(245, 158, 11, 0.06) 0%, rgba(34, 182, 255, 0.04) 100%) !important;
  box-shadow: 0 12px 40px rgba(245, 158, 11, 0.10), 0 4px 12px rgba(0,0,0,0.03) !important;
}
.growth-card--active::before {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.06) 0%, transparent 60%);
  opacity: 1;
}
.growth-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}
.growth-card__icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gold-subtle);
  border: 1px solid var(--color-gold-border);
  color: var(--color-gold);
  flex-shrink: 0;
}
.growth-card--active .growth-card__icon-wrap {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.08));
  border-color: rgba(245, 158, 11, 0.3);
  color: #f59e0b;
}
.growth-card__ring-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.growth-card__percent {
  position: absolute;
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--color-text-primary);
  font-family: var(--font-display);
}
.growth-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  position: relative;
  z-index: 1;
  flex: 1;
}
.growth-card__title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  font-family: var(--font-display);
  line-height: 1.35;
  margin: 0;
}
.growth-card__desc {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  line-height: 1.65;
  margin: 0;
}
.growth-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  padding-top: var(--space-2);
  border-top: 1px solid color-mix(in srgb, var(--color-border) 60%, transparent 40%);
}
.growth-card__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
  transition: color 0.2s ease;
}
.growth-card--active .growth-card__tag {
  color: #f59e0b;
}
.growth-card__arrow {
  color: var(--color-text-muted);
  opacity: 0.5;
  transition: all 0.2s ease;
}
.growth-card:hover .growth-card__arrow {
  opacity: 1;
  transform: translateX(2px);
}
.growth-card--active .growth-card__arrow {
  color: #f59e0b;
  opacity: 1;
}
.growth-ring {
  color: var(--color-border);
}

/* Bottom encouragement */
.growth-footer {
  margin-top: var(--space-4);
}
.growth-footer__text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  padding: var(--space-4);
  background: color-mix(in srgb, var(--color-bg-subtle) 50%, transparent 50%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  margin: 0;
}
.growth-footer__text svg {
  color: var(--color-gold);
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .growth-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .growth-total-banner {
    flex-direction: column;
    text-align: center;
  }
  .growth-total-banner__left {
    flex-direction: column;
  }
}

/* ---- Online Presence Section ---- */
.presence-section {
  margin-top: var(--space-6);
}
.presence-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-border), transparent);
  margin-bottom: var(--space-6);
}
.presence-options {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-2);
}
.presence-option {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-5);
  background: color-mix(in srgb, var(--color-bg-white) 92%, var(--color-bg-subtle) 8%);
  border: 1.5px solid var(--color-border);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  text-align: left;
}
.presence-option:hover {
  border-color: rgba(34, 182, 255, 0.4);
  box-shadow: 0 4px 20px rgba(34, 182, 255, 0.08);
}
.presence-option--selected {
  border-color: var(--color-gold) !important;
  background: linear-gradient(180deg, rgba(245, 158, 11, 0.06) 0%, rgba(34, 182, 255, 0.03) 100%) !important;
  box-shadow: 0 4px 24px rgba(245, 158, 11, 0.10) !important;
}
.presence-option__radio {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid var(--color-border);
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.25s ease;
  position: relative;
}
.presence-option--selected .presence-option__radio {
  border-color: var(--color-gold);
}
.presence-option--selected .presence-option__radio::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  background: var(--color-gold);
}
.presence-option__content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.presence-option__title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.4;
}
.presence-option__desc {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.5;
}

/* ---- Follow-up Section ---- */
.followup-section {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  margin-top: var(--space-5);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border);
}
.followup-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-2);
}
.followup-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  background: color-mix(in srgb, var(--color-bg-white) 92%, var(--color-bg-subtle) 8%);
  border: 1.5px solid var(--color-border);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  white-space: nowrap;
}
.followup-chip:hover {
  border-color: rgba(34, 182, 255, 0.4);
  color: var(--color-text-primary);
  box-shadow: 0 2px 12px rgba(34, 182, 255, 0.08);
}
.followup-chip--selected {
  border-color: var(--color-gold) !important;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.10) 0%, rgba(245, 158, 11, 0.04) 100%) !important;
  color: #f59e0b !important;
  box-shadow: 0 2px 12px rgba(245, 158, 11, 0.10) !important;
}
.followup-chip--selected svg {
  color: #f59e0b;
}
@media (max-width: 640px) {
  .presence-option {
    padding: var(--space-4);
    gap: var(--space-3);
  }
  .followup-chip {
    padding: 8px 14px;
    font-size: 0.72rem;
  }
}
`
if (!document.head.querySelector('[data-step2-styles]')) {
  style.setAttribute('data-step2-styles', '')
  document.head.appendChild(style)
}
