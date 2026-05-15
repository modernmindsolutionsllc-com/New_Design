import { Link } from 'react-router-dom'
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react'
import {
  COMPANY_NAME,
  COMPANY_TAGLINE,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  COMPANY_ADDRESS,
  SOCIAL_LINKS,
  WHATSAPP_URL,
} from '@utils/constants'
import logoWhite from '@assets/images/logo-white.svg'

const SERVICES_LINKS = [
  { label: 'Web Development', path: '/services#web-development' },
  { label: 'Mobile Apps', path: '/services#mobile-apps' },
  { label: 'AI & Automation', path: '/services#ai-automation' },
  { label: 'UI/UX Design', path: '/services#ui-ux-design' },
  { label: 'Oracle Fusion HCM Implementation', path: '/services#oracle-hcm-implementation' },
  { label: 'Oracle Fusion HCM - Managed Services', path: '/services#oracle-hcm-managed-services' },
]

const COMPANY_LINKS = [
  { label: 'About', path: '/about' },
  { label: 'Work', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
  { label: 'Careers', path: '/start-project' },
]

const SOCIAL_ICONS = [
  { key: 'instagram', Icon: Instagram, label: 'Instagram' },
  { key: 'facebook', Icon: Facebook, label: 'Facebook' },
]

const Footer = () => (
  <footer className="footer">
    <div className="container footer__inner">
      <div className="footer__brand">
        <div className="footer__logo">
          <img src={logoWhite} alt={COMPANY_NAME} className="footer__logo-image" />
        </div>
        <p className="footer__tagline">{COMPANY_TAGLINE}</p>
        <div className="footer__socials">
          {SOCIAL_ICONS.map(({ key, Icon, label }) => (
            <a
              key={key}
              href={SOCIAL_LINKS[key]}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      <div className="footer__col">
        <h3 className="footer__col-heading">Services</h3>
        <ul className="footer__links">
          {SERVICES_LINKS.map(({ label, path }) => (
            <li key={label}>
              <Link to={path} className="footer__link">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__col">
        <h3 className="footer__col-heading">Company</h3>
        <ul className="footer__links">
          {COMPANY_LINKS.map(({ label, path }) => (
            <li key={label}>
              <Link to={path} className="footer__link">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__col">
        <h3 className="footer__col-heading">Contact</h3>
        <ul className="footer__contact-list">
          <li className="footer__contact-item">
            <Mail size={14} className="footer__contact-icon" />
            <a href={`mailto:${CONTACT_EMAIL}`} className="footer__link">
              {CONTACT_EMAIL}
            </a>
          </li>
          <li className="footer__contact-item">
            <Phone size={14} className="footer__contact-icon" />
            <a href={`tel:${CONTACT_PHONE}`} className="footer__link">
              {CONTACT_PHONE}
            </a>
          </li>
          <li className="footer__contact-item">
            <MapPin size={14} className="footer__contact-icon" />
            <span className="footer__contact-text">{COMPANY_ADDRESS}</span>
          </li>
        </ul>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="footer__whatsapp">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.856L.057 23.882l6.197-1.448A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.877 9.877 0 01-5.031-1.374l-.361-.214-3.741.981.998-3.648-.235-.374A9.867 9.867 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z" />
          </svg>
          Message Us
        </a>
      </div>
    </div>

    <div className="footer__bottom">
      <div className="container footer__bottom-inner">
        <p className="footer__copy">© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
        <div className="footer__legal">
          <Link to="/privacy" className="footer__legal-link">
            Privacy Policy
          </Link>
          <span className="footer__legal-sep">·</span>
          <Link to="/terms" className="footer__legal-link">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer

const style = document.createElement('style')
style.textContent = `
.footer {
  background:
    radial-gradient(circle at 12% 10%, rgba(201, 168, 76, 0.15) 0%, transparent 34%),
    radial-gradient(circle at 90% 84%, rgba(45, 103, 248, 0.12) 0%, transparent 31%),
    var(--color-bg-dark);
  color: var(--color-text-inverse);
}

.footer__inner {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
  gap: var(--space-12);
  padding-top: var(--space-16);
  padding-bottom: var(--space-16);
}

.footer__brand {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.footer__logo {
  display: flex;
  align-items: center;
}

.footer__logo-image {
  width: min(220px, 82%);
  height: auto;
}

.footer__tagline {
  font-size: var(--text-sm);
  color: rgba(245, 244, 240, 0.62);
  line-height: 1.65;
  max-width: 280px;
}

.footer__socials {
  display: flex;
  gap: var(--space-3);
}

.footer__social-link {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(245, 244, 240, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: var(--transition-base);
}

.footer__social-link:hover {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--color-bg-dark);
}

.footer__col {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.footer__col-heading {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-gold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.footer__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer__link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 400;
  color: rgba(245, 244, 240, 0.68);
  text-decoration: none;
  transition: var(--transition-base);
}

.footer__link:hover {
  color: var(--color-gold);
}

.footer__contact-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.footer__contact-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.footer__contact-icon {
  color: var(--color-gold);
  flex-shrink: 0;
  margin-top: 2px;
}

.footer__contact-text {
  font-size: var(--text-sm);
  color: rgba(245, 244, 240, 0.68);
  font-family: var(--font-body);
}

.footer__whatsapp {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  background: rgba(37, 211, 102, 0.15);
  border: 1px solid rgba(37, 211, 102, 0.3);
  color: #4ade80;
  font-size: var(--text-sm);
  font-weight: 600;
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-full);
  text-decoration: none;
  transition: var(--transition-base);
  margin-top: var(--space-2);
  font-family: var(--font-body);
}

.footer__whatsapp:hover {
  background: rgba(37, 211, 102, 0.25);
  border-color: rgba(37, 211, 102, 0.5);
}

.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: var(--space-6) 0;
}

.footer__bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.footer__copy {
  font-size: var(--text-xs);
  color: rgba(245, 244, 240, 0.4);
  font-family: var(--font-body);
}

.footer__legal {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.footer__legal-link {
  font-size: var(--text-xs);
  color: rgba(245, 244, 240, 0.42);
  text-decoration: none;
  transition: var(--transition-base);
  font-family: var(--font-body);
}

.footer__legal-link:hover {
  color: var(--color-gold);
}

.footer__legal-sep {
  color: rgba(245, 244, 240, 0.2);
  font-size: var(--text-xs);
}

@media (max-width: 1024px) {
  .footer__inner {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-10);
  }
}

@media (max-width: 560px) {
  .footer__inner {
    grid-template-columns: 1fr;
  }

  .footer__logo-image {
    width: min(220px, 100%);
  }
}
`

if (!document.head.querySelector('[data-footer-styles]')) {
  style.setAttribute('data-footer-styles', '')
  document.head.appendChild(style)
}

