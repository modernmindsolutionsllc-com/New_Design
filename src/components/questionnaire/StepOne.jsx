import { motion } from 'framer-motion'
import { User, Mail, Phone, Building2, Briefcase } from 'lucide-react'
import { BUSINESS_TYPE_OPTIONS } from '@utils/constants'
import { getFieldError, fieldHasError, validateEmail, validateName, validatePhone } from '@utils/formHelpers'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

const StepOne = ({ formData, errors, updateField, clearFieldError, setFieldError }) => {
  const validateOnBlur = (field, value, validator) => {
    if (!value?.trim()) return
    const result = validator(value)
    setFieldError(field, result.valid ? '' : result.message)
  }

  return (
    <motion.div className="form-step" variants={STAGGER_CONTAINER} initial="hidden" animate="visible">
      <motion.div className="form-step__header" variants={FADE_UP}>
        <h2 className="form-step__title">Let&apos;s start with the business behind the project</h2>
        <p className="form-step__sub">
          A few quick basics first. Once we know what kind of business you&apos;re growing, the next step gets much smarter.
        </p>
      </motion.div>

      <motion.div className="form-step__fields" variants={FADE_UP}>
        <div className={`form-field ${fieldHasError(errors, 'businessType') ? 'form-field--error' : ''}`}>
          <label className="form-field__label" htmlFor="businessType">
            <Briefcase size={14} /> What best describes your business?
            <span className="form-field__required">*</span>
          </label>
          <select
            id="businessType"
            className="form-field__input form-field__select"
            value={formData.businessType}
            onChange={(event) => updateField('businessType', event.target.value)}
            onFocus={() => clearFieldError('businessType')}
          >
            <option value="">Select your business type</option>
            {BUSINESS_TYPE_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {fieldHasError(errors, 'businessType') && (
            <span className="form-field__error">{getFieldError(errors, 'businessType')}</span>
          )}
        </div>

        <div className={`form-field ${fieldHasError(errors, 'name') ? 'form-field--error' : ''}`}>
          <label className="form-field__label" htmlFor="name">
            <User size={14} /> Full Name <span className="form-field__required">*</span>
          </label>
          <input
            id="name"
            type="text"
            className="form-field__input"
            placeholder="e.g. Alex Morgan"
            value={formData.name}
            onChange={(event) => updateField('name', event.target.value)}
            onFocus={() => clearFieldError('name')}
            onBlur={(event) => validateOnBlur('name', event.target.value, validateName)}
            autoComplete="name"
          />
          {fieldHasError(errors, 'name') && (
            <span className="form-field__error">{getFieldError(errors, 'name')}</span>
          )}
        </div>

        <div className="form-step__row">
          <div className={`form-field ${fieldHasError(errors, 'email') ? 'form-field--error' : ''}`}>
            <label className="form-field__label" htmlFor="email">
              <Mail size={14} /> Email Address <span className="form-field__required">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="form-field__input"
              placeholder="alex@company.com"
              value={formData.email}
              onChange={(event) => updateField('email', event.target.value)}
              onFocus={() => clearFieldError('email')}
              onBlur={(event) => validateOnBlur('email', event.target.value, validateEmail)}
              autoComplete="email"
            />
            {fieldHasError(errors, 'email') && (
              <span className="form-field__error">{getFieldError(errors, 'email')}</span>
            )}
          </div>

          <div className={`form-field ${fieldHasError(errors, 'phone') ? 'form-field--error' : ''}`}>
            <label className="form-field__label" htmlFor="phone">
              <Phone size={14} /> Phone <span className="form-field__required">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              className="form-field__input"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(event) => updateField('phone', event.target.value)}
              onFocus={() => clearFieldError('phone')}
              onBlur={(event) => validateOnBlur('phone', event.target.value, validatePhone)}
              autoComplete="tel"
              inputMode="tel"
            />
            {fieldHasError(errors, 'phone') && (
              <span className="form-field__error">{getFieldError(errors, 'phone')}</span>
            )}
          </div>
        </div>

        <div className="form-field">
          <label className="form-field__label" htmlFor="companyName">
            <Building2 size={14} /> Company Name
            <span className="form-field__optional">(optional)</span>
          </label>
          <input
            id="companyName"
            type="text"
            className="form-field__input"
            placeholder="Northstar Studio"
            value={formData.companyName}
            onChange={(event) => updateField('companyName', event.target.value)}
            autoComplete="organization"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default StepOne
