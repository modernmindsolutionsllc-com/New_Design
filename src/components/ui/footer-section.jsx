import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
} from 'lucide-react'
import {
  COMPANY_NAME,
  COMPANY_TAGLINE,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
  WHATSAPP_URL,
} from '@utils/constants'
import logoWhite from '@assets/images/logo-white.png'
import '@styles/footer-section.css'

const footerLinks = [
  {
    label: 'Services',
    links: [
      { title: 'Web Development', href: '/services#web-development' },
      { title: 'Mobile Apps', href: '/services#mobile-apps' },
      { title: 'AI & Automation', href: '/services#ai-automation' },
      { title: 'UI/UX Design', href: '/services#ui-ux-design' },
    ],
  },
  {
    label: 'Company',
    links: [
      { title: 'About Us', href: '/about' },
      { title: 'Our Work', href: '/portfolio' },
      { title: 'Start a Project', href: '/start-project' },
      { title: 'Contact', href: '/contact' },
    ],
  },
  {
    label: 'Resources',
    links: [
      { title: 'Blog', href: '/blog' },
      { title: 'All Services', href: '/services' },
      { title: 'Privacy Policy', href: '/privacy' },
      { title: 'Terms of Service', href: '/terms' },
    ],
  },
  {
    label: 'Connect',
    links: [
      { title: 'Facebook', href: SOCIAL_LINKS.facebook, icon: Facebook, external: true },
      { title: 'Instagram', href: SOCIAL_LINKS.instagram, icon: Instagram, external: true },
      { title: 'LinkedIn', href: SOCIAL_LINKS.linkedin, icon: Linkedin, external: true },
      { title: 'Email Us', href: `mailto:${CONTACT_EMAIL}`, icon: Mail, external: true },
    ],
  },
]

function FooterLink({ link }) {
  const { title, href, icon: Icon, external } = link
  const className = 'footer-section__link'

  const content = (
    <>
      {Icon && <Icon className="footer-section__link-icon" size={16} aria-hidden />}
      {title}
    </>
  )

  if (external || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      >
        {content}
      </a>
    )
  }

  return (
    <Link to={href} className={className}>
      {content}
    </Link>
  )
}

function AnimatedContainer({ className, delay = 0.1, children }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <motion.div className={className}>{children}</motion.div>
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', y: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FooterSection() {
  return (
    <motion.footer className="footer-section-wrap" role="contentinfo">
      <div className="footer-section">
        <motion.div
          className="footer-section__glow-line"
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />

        <div className="footer-section__grid">
          <AnimatedContainer className="footer-section__brand">
            <Link to="/" aria-label={`${COMPANY_NAME} home`}>
              <img
                src={logoWhite}
                alt={COMPANY_NAME}
                className="footer-section__logo"
              />
            </Link>
            <p className="footer-section__tagline">{COMPANY_TAGLINE}</p>
            <p className="footer-section__contact-meta">
              Boston, US · Ahmedabad, Gujarat
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-section__whatsapp"
            >
              <MessageCircle size={16} aria-hidden />
              Message Us on WhatsApp
            </a>
            <p className="footer-section__copy">
              © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
            </p>
          </AnimatedContainer>

          <motion.div className="footer-section__columns">
            {footerLinks.map((section, index) => (
              <AnimatedContainer
                key={section.label}
                className="footer-section__col"
                delay={0.1 + index * 0.1}
              >
                <h3 className="footer-section__heading">{section.label}</h3>
                <ul className="footer-section__links">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>
            ))}
          </motion.div>
        </div>
      </div>
      </motion.footer>
  )
}
