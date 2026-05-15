import { motion } from 'framer-motion'
import {
  TIMELINE_OPTIONS, BUDGET_OPTIONS, REFERRAL_SOURCES
} from '@utils/constants'
import { getFieldError, fieldHasError } from '@utils/formHelpers'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

/**
 * StepThree — "Timeline & Budget"
 * Fields: timeline, budget, worked before, referral source
 */
const StepThree = ({ formData, errors, updateField, clearFieldError }) => (
  <motion.div
    className="form-step"
    variants={STAGGER_CONTAINER}
    initial="hidden"
    animate="visible"
  >
    <motion.div className="form-step__header" variants={FADE_UP}>
      <h2 className="form-step__title">Timeline & budget</h2>
      <p className="form-step__sub">
        Honest answers help us recommend the right scope and delivery plan.
      </p>
    </motion.div>

    <motion.div className="form-step__fields" variants={FADE_UP}>

      {/* Timeline */}
      <div className={`form-field ${fieldHasError(errors, 'timeline') ? 'form-field--error' : ''}`}>
        <label className="form-field__label">
          When do you need this completed?
          <span className="form-field__required">*</span>
        </label>
        <div className="option-cards">
          {TIMELINE_OPTIONS.map(opt => (
            <button
              key={opt} type="button"
              className={`option-card ${formData.timeline === opt ? 'option-card--selected' : ''}`}
              onClick={() => { updateField('timeline', opt); clearFieldError('timeline') }}
              aria-pressed={formData.timeline === opt}
            >
              {opt}
            </button>
          ))}
        </div>
        {fieldHasError(errors, 'timeline') && (
          <span className="form-field__error">{getFieldError(errors, 'timeline')}</span>
        )}
      </div>

      {/* Budget */}
      <div className={`form-field ${fieldHasError(errors, 'budget') ? 'form-field--error' : ''}`}>
        <label className="form-field__label">
          Approximate budget range
          <span className="form-field__required">*</span>
        </label>
        <div className="option-cards">
          {BUDGET_OPTIONS.map(opt => (
            <button
              key={opt} type="button"
              className={`option-card ${formData.budget === opt ? 'option-card--selected' : ''}`}
              onClick={() => { updateField('budget', opt); clearFieldError('budget') }}
              aria-pressed={formData.budget === opt}
            >
              {opt}
            </button>
          ))}
        </div>
        {fieldHasError(errors, 'budget') && (
          <span className="form-field__error">{getFieldError(errors, 'budget')}</span>
        )}
      </div>

      {/* Worked with agency before */}
      <div className="form-field">
        <label className="form-field__label">
          Have you worked with a software agency before?
        </label>
        <div className="radio-group">
          {[
            { value: 'no',               label: '🙅 No, this is my first time' },
            { value: 'yes',              label: '✅ Yes, it went well' },
            { value: 'yes-bad',          label: '😓 Yes, but had a bad experience' },
          ].map(({ value, label }) => (
            <label
              key={value}
              className={`radio-card ${formData.workedBefore === value ? 'radio-card--selected' : ''}`}
            >
              <input
                type="radio" name="workedBefore" value={value}
                checked={formData.workedBefore === value}
                onChange={() => updateField('workedBefore', value)}
                className="radio-card__input"
              />
              <span className="radio-card__label">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* How did you find us */}
      <div className="form-field">
        <label className="form-field__label" htmlFor="referralSource">
          How did you find us?
          <span className="form-field__hint"> — optional</span>
        </label>
        <select
          id="referralSource"
          className="form-field__input form-field__select"
          value={formData.referralSource}
          onChange={e => updateField('referralSource', e.target.value)}
        >
          <option value="">Select an option</option>
          {REFERRAL_SOURCES.map(src => (
            <option key={src} value={src}>{src}</option>
          ))}
        </select>
      </div>

    </motion.div>
  </motion.div>
)

export default StepThree

const style = document.createElement('style')
style.textContent = `
/* Option cards — single-select pill buttons */
.option-cards {
  display: flex; flex-wrap: wrap; gap: var(--space-3);
  margin-top: var(--space-2);
}
.option-card {
  padding: var(--space-3) var(--space-5);
  background: var(--color-bg); border: 2px solid var(--color-border);
  border-radius: var(--radius-full); cursor: pointer;
  font-family: var(--font-body); font-size: var(--text-sm); font-weight: 500;
  color: var(--color-text-secondary); transition: var(--transition-base);
  white-space: nowrap;
}
.option-card:hover { border-color: var(--color-gold-border); color: var(--color-gold-dark); }
.option-card--selected {
  border-color: var(--color-gold) !important;
  background: var(--color-gold-subtle) !important;
  color: var(--color-gold-dark) !important;
  font-weight: 700;
}
@media (max-width: 480px) {
  .option-cards { flex-direction: column; }
  .option-card  { width: 100%; text-align: left; border-radius: var(--radius-md); }
}
`
if (!document.head.querySelector('[data-step3-styles]')) {
  style.setAttribute('data-step3-styles', '')
  document.head.appendChild(style)
}


