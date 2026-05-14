// ─────────────────────────────────────────────────────────────────────────────
//  NAV LINKS DATA
//  Standalone data file for navigation structure.
//  The same data also lives inside constants.js as NAV_LINKS —
//  this file exists as a dedicated import for components that
//  only need nav data without importing all other constants.
//
//  Usage:
//    import { navLinks, footerServiceLinks, footerCompanyLinks } from '@data/navLinks'
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Main navigation links — used by Navbar component.
 * Add a `dropdown` array to any item to render a mega-dropdown.
 */
export const navLinks = [
    {
      label: 'Home',
      path: '/',
      dropdown: null,
    },
    {
      label: 'Services',
      path: '/services',
      dropdown: [
        { label: 'Web Apps',        path: '/services#web-apps' },
        { label: 'Mobile Apps',     path: '/services#mobile-apps' },
        { label: 'AI & Automation', path: '/services#ai-automation' },
        { label: 'UI/UX Design',    path: '/services#ui-ux' },
        { label: 'Cloud & DevOps',  path: '/services#cloud-devops' },
        { label: 'Custom Software', path: '/services#custom-software' },
      ],
    },
    {
      label: 'Work',
      path: '/portfolio',
      dropdown: null,
    },
    {
      label: 'About',
      path: '/about',
      dropdown: null,
    },
    {
      label: 'Blog',
      path: '/blog',
      dropdown: null,
    },
    {
      label: 'Contact',
      path: '/contact',
      dropdown: null,
    },
  ]
  
  /**
   * Footer — Services column links.
   */
  export const footerServiceLinks = [
    { label: 'Web Apps',        path: '/services#web-apps' },
    { label: 'Mobile Apps',     path: '/services#mobile-apps' },
    { label: 'AI & Automation', path: '/services#ai-automation' },
    { label: 'UI/UX Design',    path: '/services#ui-ux' },
    { label: 'Cloud & DevOps',  path: '/services#cloud-devops' },
    { label: 'Custom Software', path: '/services#custom-software' },
  ]
  
  /**
   * Footer — Company column links.
   */
  export const footerCompanyLinks = [
    { label: 'About Us',       path: '/about' },
    { label: 'Our Work',       path: '/portfolio' },
    { label: 'Blog',           path: '/blog' },
    { label: 'Contact',        path: '/contact' },
    { label: 'Start a Project', path: '/start-project' },
  ]
  
  /**
   * CTA button shown in the Navbar.
   */
  export const navCTA = {
    label: 'Start a Project',
    path: '/start-project',
  }
  
  export default navLinks