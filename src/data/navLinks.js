export const navLinks = [
  { label: 'Home', path: '/', dropdown: null },
  { label: 'About', path: '/about', dropdown: null },
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
  { label: 'Work', path: '/portfolio', dropdown: null },
  { label: 'Contact', path: '/contact', dropdown: null },
]

export const footerServiceLinks = [
  { label: 'Web Development', path: '/services#web-development' },
  { label: 'Mobile Apps', path: '/services#mobile-apps' },
  { label: 'AI & Automation', path: '/services#ai-automation' },
  { label: 'UI/UX Design', path: '/services#ui-ux-design' },
  { label: 'Oracle Fusion HCM Implementation', path: '/services#oracle-hcm-implementation' },
  { label: 'Oracle Fusion HCM - Managed Services', path: '/services#oracle-hcm-managed-services' },
]

export const footerCompanyLinks = [
  { label: 'About', path: '/about' },
  { label: 'Work', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
  { label: 'Start Project', path: '/start-project' },
]

export const navCTA = {
  label: 'Start Project',
  path: '/start-project',
}

export default navLinks
