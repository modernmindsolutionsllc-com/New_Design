import { motion } from 'framer-motion'
import { User, Mail, Phone, Building2, Briefcase } from 'lucide-react'
import { ROLE_OPTIONS } from '@utils/constants'
import { getFieldError, fieldHasError } from '@utils/formHelpers'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

/**
 * StepOne — "About You"
 * Fields: Full Name, Email, Phone, Company Name (optional), Role
 *
 * Props:
 *  formData       — current form values
 *  errors         — validation error messages
 *  updateField    — (field, value) => void
 *  clearFieldError — (field) => void
 */
const StepOne = ({ formData, errors, updateField, clearFieldError }) => (
  <motion.div
    className="form-step"
    variants={STAGGER_CONTAINER}
    initial="hidden"
    animate="visible"
  >
    <motion.div className="form-step__header" variants={FADE_UP}>
      <h2 className="form-step__title">First, tell us about you</h2>
      <p className="form-step__sub">No clinical language needed, just your basic details.</p>
    </motion.div>

    <motion.div className="form-step__fields" variants={FADE_UP}>

      {/* Name */}
      <div className={`form-field ${fieldHasError(errors, 'name') ? 'form-field--error' : ''}`}>
        <label className="form-field__label" htmlFor="name">
          <User size={14} /> Full Name <span className="form-field__required">*</span>
        </label>
        <input
          id="name" type="text"
          className="form-field__input"
          placeholder="e.g. Priya Sharma"
          value={formData.name}
          onChange={e => updateField('name', e.target.value)}
          onFocus={() => clearFieldError('name')}
          autoComplete="name"
        />
        {fieldHasError(errors, 'name') && (
          <span className="form-field__error">{getFieldError(errors, 'name')}</span>
        )}
      </div>

      {/* Email + Phone row */}
      <div className="form-step__row">
        <div className={`form-field ${fieldHasError(errors, 'email') ? 'form-field--error' : ''}`}>
          <label className="form-field__label" htmlFor="email">
            <Mail size={14} /> Email Address <span className="form-field__required">*</span>
          </label>
          <input
            id="email" type="email"
            className="form-field__input"
            placeholder="you@company.com"
            value={formData.email}
            onChange={e => updateField('email', e.target.value)}
            onFocus={() => clearFieldError('email')}
            autoComplete="email"
          />
          {fieldHasError(errors, 'email') && (
            <span className="form-field__error">{getFieldError(errors, 'email')}</span>
          )}
        </div>

        <div className={`form-field ${fieldHasError(errors, 'phone') ? 'form-field--error' : ''}`}>
          <label className="form-field__label" htmlFor="phone">
            <Phone size={14} /> Phone / WhatsApp <span className="form-field__required">*</span>
          </label>
          <input
            id="phone" type="tel"
            className="form-field__input"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={e => updateField('phone', e.target.value)}
            onFocus={() => clearFieldError('phone')}
            autoComplete="tel"
          />
          {fieldHasError(errors, 'phone') && (
            <span className="form-field__error">{getFieldError(errors, 'phone')}</span>
          )}
        </div>
      </div>

      {/* Company + Role row */}
      <div className="form-step__row">
        <div className="form-field">
          <label className="form-field__label" htmlFor="companyName">
            <Building2 size={14} /> Company Name
            <span className="form-field__optional">(optional)</span>
          </label>
          <input
            id="companyName" type="text"
            className="form-field__input"
            placeholder="Workplace or organization (optional)"
            value={formData.companyName}
            onChange={e => updateField('companyName', e.target.value)}
            autoComplete="organization"
          />
        </div>

        <div className="form-field">
          <label className="form-field__label" htmlFor="role">
            <Briefcase size={14} /> How would you describe yourself?
            <span className="form-field__optional">(optional)</span>
          </label>
          <select
            id="role"
            className="form-field__input form-field__select"
            value={formData.role}
            onChange={e => updateField('role', e.target.value)}
          >
            <option value="">Select your role</option>
            {ROLE_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

    </motion.div>
  </motion.div>
)

export default StepOne

