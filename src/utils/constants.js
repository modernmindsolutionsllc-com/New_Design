export const COMPANY_NAME = 'ModernMind Solutions LLC'
export const COMPANY_TAGLINE = 'Complete IT & digital solutions for growing businesses.'
export const COMPANY_DESCRIPTION =
  'We help businesses identify what they need, build it, and grow with it.'

export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || 'info@modernmindsolutionsllc.com'

export const CONTACT_PHONE =
  import.meta.env.VITE_CONTACT_PHONE || '+1 (000) 000-0000'

export const COMPANY_ADDRESS = 'Boston, Massachusetts, US \u00b7 Ahmedabad, Gujarat, India'

export const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mqenrkpq'

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/company/modern-mind-solutions-llc/posts/?feedView=all',
  instagram: 'https://www.instagram.com/hr_services2026/',
  facebook: 'https://www.facebook.com/people/Modern-Mind-Solutions-LLC/61590709372615/',
  x: 'https://x.com/ModernMindSols',
  tiktok: 'https://www.tiktok.com/@modernminditsolutions',
  threads: 'https://www.threads.com/@modernmindsolutionsllc?hl=en',
  youtube: 'https://www.youtube.com/@ModernMindSolutionsllc',
}

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Services',
    path: '/services',
    dropdown: [
      { label: 'Website Development', path: '/services#website-development' },
      { label: 'Mobile App Development', path: '/services#mobile-app-development' },
      { label: 'Social Media Marketing', path: '/services#social-media-marketing' },
      { label: 'Branding & Design', path: '/services#branding-design' },
      { label: 'Business Automation', path: '/services#business-automation' },
      { label: 'AI Solutions', path: '/services#ai-solutions' },
    ],
  },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  PORTFOLIO: '/portfolio',
  ABOUT: '/about',
  BLOG: '/blog',
  BLOG_POST: '/blog/:slug',
  START_PROJECT: '/start-project',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  NOT_FOUND: '*',
}

export const FORM_STEPS = [
  { step: 1, label: 'Your Business' },
  { step: 2, label: 'What You Need' },
  { step: 3, label: 'Your Stage' },
  { step: 4, label: 'Recommendations' },
]

export const SERVICE_TYPES = [
  { id: 'more-customers', label: 'More customers', emoji: 'MC' },
  { id: 'website', label: 'Website', emoji: 'WS' },
  { id: 'mobile-app', label: 'Mobile app', emoji: 'APP' },
  { id: 'online-booking', label: 'Online booking', emoji: 'BK' },
  { id: 'social-media-marketing', label: 'Social media marketing', emoji: 'SM' },
  { id: 'branding', label: 'Branding', emoji: 'BR' },
  { id: 'automation', label: 'Automation', emoji: 'AU' },
  { id: 'online-payments', label: 'Online payments', emoji: 'PAY' },
  { id: 'appointment-system', label: 'Appointment system', emoji: 'APT' },
  { id: 'ai-solutions', label: 'AI solutions', emoji: 'AI' },
  { id: 'seo-google-ranking', label: 'SEO / Google ranking', emoji: 'SEO' },
]

export const FEATURE_OPTIONS = [
  'Contact form or lead capture',
  'Online booking calendar',
  'Online payments',
  'Customer dashboard',
  'Google Maps or local listings',
  'WhatsApp or live chat',
  'Social media integration',
  'Reviews and testimonials',
  'AI assistant or chatbot',
  'Reporting and analytics',
]

export const BUSINESS_TYPE_OPTIONS = [
  'Startup',
  'Restaurant',
  'Clinic',
  'Salon',
  'Retail Store',
  'Real Estate',
  'Education',
  'E-Commerce',
  'Fitness',
  'Construction',
  'Other',
]

export const BUSINESS_STAGE_OPTIONS = [
  'Just starting',
  'Growing',
  'Already established',
  'Need modernization',
]

export const TIMELINE_OPTIONS = [
  'As soon as possible',
  'Within 30 days',
  'Within 2-3 months',
  'Flexible timeline',
]

export const BUDGET_OPTIONS = [
  'Under $1,000',
  '$1,000 - $3,000',
  '$3,000 - $7,500',
  '$7,500 - $15,000',
  '$15,000+',
]

export const CONTACT_METHOD_OPTIONS = [
  { id: 'email', label: 'Email', emoji: '✉️' },
  { id: 'phone', label: 'Strategy call', emoji: '📞' },
]

export const BEST_TIME_OPTIONS = [
  'Morning (9am - 12pm)',
  'Afternoon (12pm - 4pm)',
  'Evening (4pm - 8pm)',
]

export const REFERRAL_SOURCES = [
  'Google Search',
  'LinkedIn',
  'Instagram',
  'Referral',
  'Other',
]

export const FADE_UP = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const STAGGER_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

export const CARD_HOVER = {
  rest: { y: 0, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' },
  hover: {
    y: -6,
    boxShadow: '0 16px 40px rgba(56, 189, 248, 0.2)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}
