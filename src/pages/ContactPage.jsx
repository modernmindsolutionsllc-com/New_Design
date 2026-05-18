import { useState } from 'react'
import { useForm } from '@formspree/react'
import { motion } from 'framer-motion'
import { Mail, Globe, MapPin, Send, Loader2 } from 'lucide-react'
import {
  CONTACT_EMAIL,
  STAGGER_CONTAINER,
  FADE_UP,
} from '@utils/constants'
import { validateEmail, validateName, validateRequired } from '@utils/formHelpers'
import { FORMSPREE_ENDPOINT } from '@components/questionnaire/formspreeConfig'

const CONTACT_METHODS = [
  { icon: Mail, label: 'Email Us', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: Globe, label: 'Company', value: 'Modern Mind Solutions LLC', href: null },
  { icon: MapPin, label: 'Boston', value: 'Modern Mind Solutions LLC, Boston, US', href: null },
  { icon: MapPin, label: 'Ahmedabad', value: 'Modern Mind Solutions, Ahmedabad, Gujarat', href: null },
]

const ContactPage = () => {
  const [formState, submitToFormspree] = useForm(FORMSPREE_ENDPOINT)
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})

  const update = (key, val) => {
    setFields((prev) => ({ ...prev, [key]: val }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const validate = () => {
    const e = {}
    const n = validateName(fields.name)
    if (!n.valid) e.name = n.message
    const em = validateEmail(fields.email)
    if (!em.valid) e.email = em.message
    const m = validateRequired(fields.message, 'Message')
    if (!m.valid) e.message = m.message
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    if (Object.keys(e).length) {
      setErrors(e)
      return
    }
    await submitToFormspree({
      ...fields,
      _subject: `Contact request: ${fields.subject || 'General inquiry'} from ${fields.name}`,
      _replyto: fields.email,
    })
  }

  return (
    <>
      <section className="page-hero section--gray">
        <div className="container">
          <motion.div className="page-hero__inner" variants={STAGGER_CONTAINER} initial="hidden" animate="visible">
            <motion.span className="section-tag" variants={FADE_UP}>Get in Touch</motion.span>
            <motion.h1 className="page-hero__heading" variants={FADE_UP}>Contact Us</motion.h1>
            <div className="gold-divider" />
            <motion.p className="page-hero__sub" variants={FADE_UP}>
              Questions before starting? Email or call us today. A team member typically follows up
              within 2-4 hours on weekdays.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="section section--white">
        <div className="container">
          <div className="contact-page__layout">
            <motion.div
              className="contact-page__methods"
              variants={STAGGER_CONTAINER}
              initial="hidden"
              animate="visible"
            >
              {CONTACT_METHODS.map(({ icon: Icon, label, value, href }) => (
                <motion.div key={label} className="contact-method-card-v2" variants={FADE_UP}>
                  <div className="contact-method-card-v2__icon">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="contact-method-card-v2__label">{label}</div>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="contact-method-card-v2__value contact-method-card-v2__value--link"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="contact-method-card-v2__value">{value}</span>
                    )}
                  </div>
                </motion.div>
              ))}

              <div className="contact-page__response-badge">
                <span className="contact-page__response-dot" />
                We typically respond within <strong>2-4 hours</strong> on weekdays
              </div>
            </motion.div>

            <motion.div
              className="contact-page__form-wrap"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {formState.succeeded ? (
                <div className="contact-page__success">
                  <div className="contact-page__success-icon">OK</div>
                  <h3>Message received</h3>
                  <p>Thanks for reaching out. We will contact you shortly.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <h2 className="contact-form__heading">Send a message</h2>

                  <div className="contact-form__row">
                    <div className={`form-field ${errors.name ? 'form-field--error' : ''}`}>
                      <label className="form-field__label" htmlFor="c-name">
                        Your Name <span className="form-field__required">*</span>
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        className="form-field__input"
                        placeholder="Alex Johnson"
                        value={fields.name}
                        onChange={(e) => update('name', e.target.value)}
                      />
                      {errors.name && <span className="form-field__error">{errors.name}</span>}
                    </div>

                    <div className={`form-field ${errors.email ? 'form-field--error' : ''}`}>
                      <label className="form-field__label" htmlFor="c-email">
                        Email <span className="form-field__required">*</span>
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        className="form-field__input"
                        placeholder="you@email.com"
                        value={fields.email}
                        onChange={(e) => update('email', e.target.value)}
                      />
                      {errors.email && <span className="form-field__error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-field">
                    <label className="form-field__label" htmlFor="c-subject">
                      Subject <span className="form-field__optional">(optional)</span>
                    </label>
                    <input
                      id="c-subject"
                      type="text"
                      className="form-field__input"
                      placeholder="Question about services"
                      value={fields.subject}
                      onChange={(e) => update('subject', e.target.value)}
                    />
                  </div>

                  <div className={`form-field ${errors.message ? 'form-field--error' : ''}`}>
                    <label className="form-field__label" htmlFor="c-message">
                      Message <span className="form-field__required">*</span>
                    </label>
                    <textarea
                      id="c-message"
                      className="form-field__input form-field__textarea"
                      rows={5}
                      placeholder="Tell us about your project goals..."
                      value={fields.message}
                      onChange={(e) => update('message', e.target.value)}
                    />
                    {errors.message && <span className="form-field__error">{errors.message}</span>}
                  </div>

                  <button type="submit" className="contact-form__submit" disabled={formState.submitting}>
                    {formState.submitting ? (
                      <>
                        <Loader2 size={16} className="questionnaire__spinner" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Send Request
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactPage

const style = document.createElement('style')
style.textContent = `
.contact-page__layout {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: var(--space-12);
  align-items: start;
}
.contact-page__methods {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.contact-method-card-v2 {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5) var(--space-6);
  transition: var(--transition-base);
}
.contact-method-card-v2:hover {
  border-color: var(--color-gold-border);
  box-shadow: var(--shadow-sm);
}
.contact-method-card-v2__icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  flex-shrink: 0;
  background: var(--color-gold-subtle);
  border: 1px solid var(--color-gold-border);
  color: var(--color-gold);
  display: flex;
  align-items: center;
  justify-content: center;
}
.contact-method-card-v2__label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: var(--space-1);
}
.contact-method-card-v2__value {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}
.contact-method-card-v2__value--link {
  color: var(--color-gold-dark);
  text-decoration: none;
  transition: var(--transition-base);
}
.contact-method-card-v2__value--link:hover {
  color: var(--color-gold);
}

.contact-page__response-badge {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg-subtle);
  border-radius: var(--radius-md);
}
.contact-page__response-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-success);
  flex-shrink: 0;
  box-shadow: 0 0 0 3px rgba(46, 125, 82, 0.15);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.contact-page__form-wrap {
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-10);
  box-shadow: var(--shadow-md);
}
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}
.contact-form__heading {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--color-text-primary);
}
.contact-form__row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-5);
}
.contact-form__submit {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  align-self: flex-start;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 700;
  background: var(--color-gold);
  color: var(--color-bg-dark);
  border: 2px solid var(--color-gold);
  padding: 0.75rem 2rem;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: var(--transition-base);
}
.contact-form__submit:hover {
  background: var(--color-gold-dark);
  border-color: var(--color-gold-dark);
  box-shadow: var(--shadow-gold);
}
.contact-form__submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.contact-page__success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
  padding: var(--space-16);
}
.contact-page__success-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: var(--color-gold-subtle);
  border: 2px solid var(--color-gold-border);
  color: var(--color-gold);
  font-size: 1.2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contact-page__success h3 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--color-text-primary);
}
.contact-page__success p {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}

@media (max-width: 900px) {
  .contact-page__layout {
    grid-template-columns: 1fr;
  }
  .contact-form__row {
    grid-template-columns: 1fr;
  }
}
`
if (!document.head.querySelector('[data-contact-styles]')) {
  style.setAttribute('data-contact-styles', '')
  document.head.appendChild(style)
}
