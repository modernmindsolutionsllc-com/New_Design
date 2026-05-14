// ─────────────────────────────────────────────────────────────────────────────
//  SITE-WIDE CONSTANTS
//  All global values live here. Change once — updates everywhere.
// ─────────────────────────────────────────────────────────────────────────────

// ── Company Info ─────────────────────────────────────────────────────────────
export const COMPANY_NAME = 'YourAgency'
export const COMPANY_TAGLINE = 'We Turn Your Ideas Into Software That Works'
export const COMPANY_DESCRIPTION =
  'From early-stage startups to growing businesses — we build clean, reliable software so you can focus on what matters most.'

// ── Contact Details (pulled from .env, with fallbacks) ────────────────────────
export const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || 'hello@youragency.com'

export const CONTACT_PHONE =
  import.meta.env.VITE_CONTACT_PHONE || '+91 98765 43210'

export const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'

export const COMPANY_ADDRESS = 'Kolkata, West Bengal, India'

// ── Formspree ─────────────────────────────────────────────────────────────────
export const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID'

// ── Social Links ──────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/youragency',
  github: 'https://github.com/youragency',
  twitter: 'https://twitter.com/youragency',
  instagram: 'https://instagram.com/youragency',
}

// ── WhatsApp Deep Link ────────────────────────────────────────────────────────
// Opens WhatsApp chat with a pre-filled message
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi! I'm interested in discussing a software project with your team."
)}`

// ── Navigation Links ─────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  {
    label: 'Services',
    path: '/services',
    dropdown: [
      { label: 'Web Apps', path: '/services#web-apps' },
      { label: 'Mobile Apps', path: '/services#mobile-apps' },
      { label: 'AI & Automation', path: '/services#ai-automation' },
      { label: 'UI/UX Design', path: '/services#ui-ux' },
      { label: 'Cloud & DevOps', path: '/services#cloud-devops' },
      { label: 'Custom Software', path: '/services#custom-software' },
    ],
  },
  { label: 'Work', path: '/portfolio' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
]

// ── Route Paths ───────────────────────────────────────────────────────────────
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

// ── Multi-step Form Steps ─────────────────────────────────────────────────────
export const FORM_STEPS = [
  { step: 1, label: 'About You' },
  { step: 2, label: 'Your Project' },
  { step: 3, label: 'Timeline & Budget' },
  { step: 4, label: 'Contact Preference' },
]

// ── Service Types (used in Step 2 checkbox cards) ────────────────────────────
export const SERVICE_TYPES = [
  { id: 'web-app', label: 'Web Application', emoji: '🌐' },
  { id: 'mobile-app', label: 'Mobile App', emoji: '📱' },
  { id: 'ai-automation', label: 'AI & Automation', emoji: '🤖' },
  { id: 'ui-ux', label: 'UI/UX Design', emoji: '🎨' },
  { id: 'cloud-devops', label: 'Cloud & DevOps', emoji: '☁️' },
  { id: 'custom-software', label: 'Custom Software', emoji: '🛠️' },
  { id: 'not-sure', label: "Not Sure Yet", emoji: '🤷' },
]

// ── Feature Checklist (Step 2) ────────────────────────────────────────────────
export const FEATURE_OPTIONS = [
  'User Login & Accounts',
  'Payment Gateway',
  'Admin Dashboard',
  'Third-party Integrations',
  'Analytics & Reporting',
  'Mobile-friendly / Responsive',
  'Multi-language Support',
  'Push Notifications',
  'Real-time Chat',
  'File Upload & Storage',
]

// ── Timeline Options (Step 3) ─────────────────────────────────────────────────
export const TIMELINE_OPTIONS = [
  'As soon as possible',
  'Within 1–3 months',
  'Within 3–6 months',
  'Flexible, no rush',
]

// ── Budget Options (Step 3) ───────────────────────────────────────────────────
export const BUDGET_OPTIONS = [
  'Under ₹2 Lakhs',
  '₹2L – ₹10L',
  '₹10L – ₹30L',
  '₹30L and above',
  "I need help figuring this out",
]

// ── Role Options (Step 1) ─────────────────────────────────────────────────────
export const ROLE_OPTIONS = [
  'Founder / Co-founder',
  'Business Owner',
  'Product Manager',
  'Marketing Manager',
  'Developer / Tech Lead',
  'Other',
]

// ── Contact Method Options (Step 4) ──────────────────────────────────────────
export const CONTACT_METHOD_OPTIONS = [
  { id: 'email', label: 'Email', emoji: '📧' },
  { id: 'phone', label: 'Phone Call', emoji: '📞' },
  { id: 'whatsapp', label: 'WhatsApp', emoji: '💬' },
]

// ── Best Time Options (Step 4) ────────────────────────────────────────────────
export const BEST_TIME_OPTIONS = [
  'Morning (9am – 12pm)',
  'Afternoon (12pm – 4pm)',
  'Evening (4pm – 8pm)',
]

// ── Referral Sources (Step 3) ─────────────────────────────────────────────────
export const REFERRAL_SOURCES = [
  'Google Search',
  'Friend / Colleague Referral',
  'LinkedIn',
  'Instagram / Facebook',
  'Twitter / X',
  'Other',
]

// ── Animation Defaults ────────────────────────────────────────────────────────
// Reusable framer-motion variants imported across components
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
    boxShadow: '0 16px 40px rgba(201,168,76,0.15)',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

// ── Breakpoints (mirrors CSS, useful for JS logic) ────────────────────────────
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}