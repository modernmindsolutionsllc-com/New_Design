import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Globe, MapPin, Send, Loader2, CalendarCheck2, Phone } from 'lucide-react'
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  STAGGER_CONTAINER,
  FADE_UP,
} from '@utils/constants'
import { validateEmail, validateName, validateRequired } from '@utils/formHelpers'
import { submitToFormspree } from '@components/questionnaire/formspreeConfig'

const CONTACT_METHODS = [
  { icon: Mail, label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: Phone, label: 'Phone', value: CONTACT_PHONE, href: CONTACT_PHONE_HREF },
  { icon: Globe, label: 'Company', value: 'Modern Mind Solutions LLC', href: null },
  { icon: MapPin, label: 'Boston', value: 'Boston, Massachusetts, US', href: null },
  { icon: MapPin, label: 'Ahmedabad', value: 'Ahmedabad, Gujarat', href: null },
]

const ContactPage = () => {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitState, setSubmitState] = useState({
    submitting: false,
    succeeded: false,
    error: '',
  })

  const update = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const validate = () => {
    const nextErrors = {}
    const nameResult = validateName(fields.name)
    if (!nameResult.valid) nextErrors.name = nameResult.message
    const emailResult = validateEmail(fields.email)
    if (!emailResult.valid) nextErrors.email = emailResult.message
    const messageResult = validateRequired(fields.message, 'Message')
    if (!messageResult.valid) nextErrors.message = messageResult.message
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }
    setSubmitState({ submitting: true, succeeded: false, error: '' })
    const result = await submitToFormspree({
      ...fields,
      _subject: `Contact request: ${fields.subject || 'General inquiry'} from ${fields.name}`,
      _replyto: fields.email,
    })

    if (result.ok) {
      setFields({ name: '', email: '', subject: '', message: '' })
      setSubmitState({ submitting: false, succeeded: true, error: '' })
      return
    }

    const message = result.errors?.[0]?.message || 'Something went wrong while sending your message.'
    setSubmitState({ submitting: false, succeeded: false, error: message })
  }

  return (
    <>
      <section className="page-hero section--gray">
        <div className="container">
          <motion.div className="page-hero__inner" variants={STAGGER_CONTAINER} initial="hidden" animate="visible">
            <motion.span className="section-tag" variants={FADE_UP}>Get in Touch</motion.span>
            <motion.h1 className="page-hero__heading" variants={FADE_UP}>Let&apos;s Talk About What Your Business Needs</motion.h1>
            <div className="gold-divider" />
            <motion.p className="page-hero__sub" variants={FADE_UP}>
              Whether you need a website, more leads, a smoother booking process, or a clearer
              digital plan, we&apos;re here to help you move forward with confidence.
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
                <CalendarCheck2 size={16} />
                We reply <strong>as soon as possible</strong> and operate <strong>24/7</strong>
              </div>
            </motion.div>

            <motion.div
              className="contact-page__form-wrap"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {submitState.succeeded ? (
                <div className="contact-page__success">
                  <div className="contact-page__success-icon">✓</div>
                  <h3>Message received</h3>
                  <p>Thanks for reaching out. We will contact you shortly with the next best step.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <h2 className="contact-form__heading">Tell us about your goals</h2>

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
                        onChange={(event) => update('name', event.target.value)}
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
                        onChange={(event) => update('email', event.target.value)}
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
                      placeholder="Website, bookings, marketing, or automation"
                      value={fields.subject}
                      onChange={(event) => update('subject', event.target.value)}
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
                      placeholder="Tell us about your business, what you need help with, and what kind of result you want."
                      value={fields.message}
                      onChange={(event) => update('message', event.target.value)}
                    />
                    {errors.message && <span className="form-field__error">{errors.message}</span>}
                  </div>

                  <button type="submit" className="contact-form__submit" disabled={submitState.submitting}>
                    {submitState.submitting ? (
                      <>
                        <Loader2 size={16} className="questionnaire__spinner" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </button>
                  {submitState.error && (
                    <div className="questionnaire__api-error">{submitState.error}</div>
                  )}
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
