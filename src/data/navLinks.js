export const navLinks = [
  { label: 'Home', path: '/', dropdown: null },
  { label: 'About', path: '/about', dropdown: null },
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
  { label: 'Portfolio', path: '/portfolio', dropdown: null },
  { label: 'Contact', path: '/contact', dropdown: null },
]

export const footerServiceLinks = [
  { label: 'Website Development', path: '/services#website-development' },
  { label: 'Mobile App Development', path: '/services#mobile-app-development' },
  { label: 'Social Media Marketing', path: '/services#social-media-marketing' },
  { label: 'Branding & Design', path: '/services#branding-design' },
  { label: 'Business Automation', path: '/services#business-automation' },
  { label: 'AI Solutions', path: '/services#ai-solutions' },
]

export const footerCompanyLinks = [
  { label: 'About', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
  { label: 'Business Needs Finder', path: '/start-project' },
]

export const navCTA = {
  label: 'Book Consultation',
  path: '/start-project',
}

export default navLinks
