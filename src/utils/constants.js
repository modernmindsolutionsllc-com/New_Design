export const COMPANY_NAME = 'ModernMind Solutions LLC'
export const COMPANY_TAGLINE = 'Innovative technology solutions for modern businesses.'
export const COMPANY_DESCRIPTION =
  'Modern, performant web solutions that help businesses stand out and grow faster.'

export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || 'info@modernmindsolutionsllc.com'

export const CONTACT_PHONE =
  import.meta.env.VITE_CONTACT_PHONE || '+1 (000) 000-0000'

export const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || '10000000000'

export const COMPANY_ADDRESS = 'Boston, US / Ahmedabad, Gujarat'

export const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mqenrkpq'

export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  github: 'https://github.com/',
  dribbble: 'https://dribbble.com/',
}

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi! I'm interested in discussing a web or app project with ModernMind Solutions LLC."
)}`

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Services',
    path: '/services',
    dropdown: [
      { label: 'Web Development', path: '/services#web-development' },
      { label: 'Mobile Apps', path: '/services#mobile-apps' },
      { label: 'AI & Automation', path: '/services#ai-automation' },
      { label: 'UI/UX Design', path: '/services#ui-ux-design' },
      { label: 'Oracle Fusion HCM Implementation', path: '/services#oracle-hcm-implementation' },
      { label: 'Oracle Fusion HCM - Managed Services', path: '/services#oracle-hcm-managed-services' },
    ],
  },
  { label: 'Work', path: '/portfolio' },
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
  NOT_FOUND: '*',
}

export const FORM_STEPS = [
  { step: 1, label: 'About You' },
  { step: 2, label: 'Project Scope' },
  { step: 3, label: 'Timeline + Budget' },
  { step: 4, label: 'Contact Preference' },
]

export const SERVICE_TYPES = [
  { id: 'web-development', label: 'Web Development', emoji: 'WD' },
  { id: 'mobile-apps', label: 'Mobile Apps', emoji: 'MA' },
  { id: 'ai-automation', label: 'AI & Automation', emoji: 'AI' },
  { id: 'ui-ux-design', label: 'UI/UX Design', emoji: 'UX' },
  { id: 'oracle-hcm', label: 'Oracle Fusion HCM', emoji: 'OR' },
  { id: 'not-sure', label: 'Not Sure Yet', emoji: '?' },
]

export const FEATURE_OPTIONS = [
  'User Login & Access Control',
  'Payment Integration',
  'Admin Dashboard',
  'Third-party Integrations',
  'Analytics & Reporting',
  'Responsive Mobile UX',
  'Multi-language Support',
  'Push Notifications',
  'AI-powered Features',
  'Cloud Deployment Setup',
]

export const TIMELINE_OPTIONS = [
  'As soon as possible',
  'Within 1-2 months',
  'Within 3-6 months',
  'Flexible timeline',
]

export const BUDGET_OPTIONS = [
  'Under $5,000',
  '$5,000 - $20,000',
  '$20,000 - $50,000',
  '$50,000+',
  'Need help deciding',
]

export const ROLE_OPTIONS = [
  'Founder / Co-founder',
  'Business Owner',
  'Product Manager',
  'CTO / Tech Lead',
  'Operations Manager',
  'Other',
]

export const CONTACT_METHOD_OPTIONS = [
  { id: 'email', label: 'Email', emoji: 'EMAIL' },
  { id: 'phone', label: 'Phone Call', emoji: 'CALL' },
  { id: 'whatsapp', label: 'WhatsApp', emoji: 'CHAT' },
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
