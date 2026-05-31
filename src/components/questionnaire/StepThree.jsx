import { motion } from 'framer-motion'
import { TIMELINE_OPTIONS, BUDGET_OPTIONS, REFERRAL_SOURCES, BUSINESS_STAGE_OPTIONS } from '@utils/constants'
import { getFieldError, fieldHasError } from '@utils/formHelpers'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

const StepThree = ({ formData, errors, updateField, clearFieldError }) => (
  <motion.div className="form-step" variants={STAGGER_CONTAINER} initial="hidden" animate="visible">
    <motion.div className="form-step__header" variants={FADE_UP}>
      <h2 className="form-step__title">What stage is your business in?</h2>
      <p className="form-step__sub">
        This helps us recommend the right timeline, scope, and level of support for where your business is today.
      </p>
    </motion.div>

    <motion.div className="form-step__fields" variants={FADE_UP}>
      <div className={`form-field ${fieldHasError(errors, 'businessStage') ? 'form-field--error' : ''}`}>
        <label className="form-field__label">
          Choose your current stage
          <span className="form-field__required">*</span>
        </label>
        <div className="option-cards">
          {BUSINESS_STAGE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              className={`option-card ${formData.businessStage === option ? 'option-card--selected' : ''}`}
              onClick={() => {
                updateField('businessStage', option)
                clearFieldError('businessStage')
              }}
              aria-pressed={formData.businessStage === option}
            >
              {option}
            </button>
          ))}
        </div>
        {fieldHasError(errors, 'businessStage') && (
          <span className="form-field__error">{getFieldError(errors, 'businessStage')}</span>
        )}
      </div>

      <div className={`form-field ${fieldHasError(errors, 'successVision') ? 'form-field--error' : ''}`}>
        <label className="form-field__label" htmlFor="successVision">
          If this project goes well, what would improve most in the next 3-6 months?
          <span className="form-field__required">*</span>
        </label>
        <textarea
          id="successVision"
          className="form-field__input form-field__textarea"
          rows={4}
          placeholder="Example: More qualified leads, better first impressions, easier bookings, smoother daily operations, or more repeat customers."
          value={formData.successVision}
          onChange={(event) => updateField('successVision', event.target.value)}
          onFocus={() => clearFieldError('successVision')}
        />
        {fieldHasError(errors, 'successVision') && (
          <span className="form-field__error">{getFieldError(errors, 'successVision')}</span>
        )}
      </div>

      <div className={`form-field ${fieldHasError(errors, 'timeline') ? 'form-field--error' : ''}`}>
        <label className="form-field__label">
          When do you want to get started?
          <span className="form-field__required">*</span>
        </label>
        <div className="option-cards">
          {TIMELINE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              className={`option-card ${formData.timeline === option ? 'option-card--selected' : ''}`}
              onClick={() => {
                updateField('timeline', option)
                clearFieldError('timeline')
              }}
              aria-pressed={formData.timeline === option}
            >
              {option}
            </button>
          ))}
        </div>
        {fieldHasError(errors, 'timeline') && (
          <span className="form-field__error">{getFieldError(errors, 'timeline')}</span>
        )}
      </div>

      <div className={`form-field ${fieldHasError(errors, 'budget') ? 'form-field--error' : ''}`}>
        <label className="form-field__label">
          Approximate budget range
          <span className="form-field__required">*</span>
        </label>
        <div className="option-cards">
          {BUDGET_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              className={`option-card ${formData.budget === option ? 'option-card--selected' : ''}`}
              onClick={() => {
                updateField('budget', option)
                clearFieldError('budget')
              }}
              aria-pressed={formData.budget === option}
            >
              {option}
            </button>
          ))}
        </div>
        {fieldHasError(errors, 'budget') && (
          <span className="form-field__error">{getFieldError(errors, 'budget')}</span>
        )}
      </div>

      <div className="form-field">
        <label className="form-field__label">Have you worked with a digital partner before?</label>
        <div className="radio-group">
          {[
            { value: 'no', label: 'No, this is my first time' },
            { value: 'yes', label: 'Yes, and it went well' },
            { value: 'yes-bad', label: 'Yes, but the experience was frustrating' },
          ].map(({ value, label }) => (
            <label key={value} className={`radio-card ${formData.workedBefore === value ? 'radio-card--selected' : ''}`}>
              <input
                type="radio"
                name="workedBefore"
                value={value}
                checked={formData.workedBefore === value}
                onChange={() => updateField('workedBefore', value)}
                className="radio-card__input"
              />
              <span className="radio-card__label">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="form-field__label" htmlFor="referralSource">
          How did you find us?
          <span className="form-field__hint">Optional</span>
        </label>
        <select
          id="referralSource"
          className="form-field__input form-field__select"
          value={formData.referralSource}
          onChange={(event) => updateField('referralSource', event.target.value)}
        >
          <option value="">Select an option</option>
          {REFERRAL_SOURCES.map((source) => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
      </div>
    </motion.div>
  </motion.div>
)

export default StepThree
