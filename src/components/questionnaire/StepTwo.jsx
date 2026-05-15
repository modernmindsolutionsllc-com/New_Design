import { motion } from 'framer-motion'
import { SERVICE_TYPES, FEATURE_OPTIONS } from '@utils/constants'
import { getFieldError, fieldHasError } from '@utils/formHelpers'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

const StepTwo = ({ formData, errors, updateField, toggleArrayField, clearFieldError }) => (
  <motion.div className="form-step" variants={STAGGER_CONTAINER} initial="hidden" animate="visible">
    <motion.div className="form-step__header" variants={FADE_UP}>
      <h2 className="form-step__title">Tell us about your project</h2>
      <p className="form-step__sub">No clinical wording needed, plain words are perfect.</p>
    </motion.div>

    <motion.div className="form-step__fields" variants={FADE_UP}>
      <div className={`form-field ${fieldHasError(errors, 'serviceTypes') ? 'form-field--error' : ''}`}>
        <label className="form-field__label">
          What do you need built?
          <span className="form-field__required">*</span>
          <span className="form-field__hint"> - select all that apply</span>
        </label>
        <div className="service-type-grid">
          {SERVICE_TYPES.map(({ id, label, emoji }) => {
            const selected = formData.serviceTypes.includes(id)
            return (
              <button
                key={id}
                type="button"
                className={`service-type-card ${selected ? 'service-type-card--selected' : ''}`}
                onClick={() => {
                  toggleArrayField('serviceTypes', id)
                  clearFieldError('serviceTypes')
                }}
                aria-pressed={selected}
              >
                <span className="service-type-card__emoji" aria-hidden>{emoji}</span>
                <span className="service-type-card__label">{label}</span>
                {selected && <span className="service-type-card__check" aria-hidden>OK</span>}
              </button>
            )
          })}
        </div>
        {fieldHasError(errors, 'serviceTypes') && (
          <span className="form-field__error">{getFieldError(errors, 'serviceTypes')}</span>
        )}
      </div>

      <div className={`form-field ${fieldHasError(errors, 'projectDescription') ? 'form-field--error' : ''}`}>
        <label className="form-field__label" htmlFor="projectDescription">
          Describe your project in plain words
          <span className="form-field__required">*</span>
        </label>
        <textarea
          id="projectDescription"
          className="form-field__input form-field__textarea"
          rows={5}
          placeholder="Example: We need a conversion-focused website and an admin dashboard to manage leads and content."
          value={formData.projectDescription}
          onChange={(e) => updateField('projectDescription', e.target.value)}
          onFocus={() => clearFieldError('projectDescription')}
        />
        <span className="form-field__char-count">
          {formData.projectDescription.length} characters
          {formData.projectDescription.length < 20 && ' (minimum 20)'}
        </span>
        {fieldHasError(errors, 'projectDescription') && (
          <span className="form-field__error">{getFieldError(errors, 'projectDescription')}</span>
        )}
      </div>

      <div className={`form-field ${fieldHasError(errors, 'startingFrom') ? 'form-field--error' : ''}`}>
        <label className="form-field__label">
          Are you starting from scratch or improving an existing product?
          <span className="form-field__required">*</span>
        </label>
        <div className="radio-group">
          {[
            { value: 'scratch', label: 'Starting from scratch', sub: 'No existing product yet' },
            { value: 'existing', label: 'Improving an existing product', sub: 'Already have a website/app/codebase' },
          ].map(({ value, label, sub }) => (
            <label key={value} className={`radio-card ${formData.startingFrom === value ? 'radio-card--selected' : ''}`}>
              <input
                type="radio"
                name="startingFrom"
                value={value}
                checked={formData.startingFrom === value}
                onChange={() => {
                  updateField('startingFrom', value)
                  clearFieldError('startingFrom')
                }}
                className="radio-card__input"
              />
              <div>
                <div className="radio-card__label">{label}</div>
                <div className="radio-card__sub">{sub}</div>
              </div>
            </label>
          ))}
        </div>
        {fieldHasError(errors, 'startingFrom') && (
          <span className="form-field__error">{getFieldError(errors, 'startingFrom')}</span>
        )}
      </div>

      <div className="form-field">
        <label className="form-field__label">
          Features you might need
          <span className="form-field__hint"> - select anything that feels relevant</span>
        </label>
        <div className="checkbox-grid">
          {FEATURE_OPTIONS.map((feature) => {
            const checked = formData.features.includes(feature)
            return (
              <label key={feature} className={`checkbox-item ${checked ? 'checkbox-item--checked' : ''}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleArrayField('features', feature)}
                  className="checkbox-item__input"
                />
                <span className="checkbox-item__box" aria-hidden>{checked ? 'OK' : ''}</span>
                <span className="checkbox-item__label">{feature}</span>
              </label>
            )
          })}
        </div>
      </div>
    </motion.div>
  </motion.div>
)

export default StepTwo

const style = document.createElement('style')
style.textContent = `
.service-type-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
  margin-top: var(--space-2);
}
.service-type-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-3);
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-base);
  position: relative;
  font-family: var(--font-body);
  text-align: center;
}
.service-type-card:hover {
  border-color: var(--color-gold-border);
  background: var(--color-gold-subtle);
}
.service-type-card--selected {
  border-color: var(--color-gold) !important;
  background: var(--color-gold-subtle) !important;
}
.service-type-card__emoji {
  font-size: 1.1rem;
  font-weight: 700;
}
.service-type-card__label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  line-height: 1.3;
}
.service-type-card--selected .service-type-card__label {
  color: var(--color-gold-dark);
}
.service-type-card__check {
  position: absolute;
  top: 6px;
  right: 8px;
  font-size: 0.58rem;
  font-weight: 700;
  color: var(--color-gold);
  background: var(--color-bg-white);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--color-gold);
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-2);
}
.radio-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-base);
}
.radio-card:hover {
  border-color: var(--color-gold-border);
  background: var(--color-gold-subtle);
}
.radio-card--selected {
  border-color: var(--color-gold);
  background: var(--color-gold-subtle);
}
.radio-card__input {
  accent-color: var(--color-gold);
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
.radio-card__label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  font-family: var(--font-body);
}
.radio-card__sub {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: 2px;
  font-family: var(--font-body);
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
  margin-top: var(--space-2);
}
.checkbox-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-base);
}
.checkbox-item:hover {
  border-color: var(--color-gold-border);
}
.checkbox-item--checked {
  border-color: var(--color-gold);
  background: var(--color-gold-subtle);
}
.checkbox-item__input {
  display: none;
}
.checkbox-item__box {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--color-border);
  background: var(--color-bg-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.58rem;
  font-weight: 900;
  color: var(--color-gold);
  flex-shrink: 0;
  transition: var(--transition-base);
}
.checkbox-item--checked .checkbox-item__box {
  border-color: var(--color-gold);
  background: var(--color-gold);
  color: var(--color-bg-dark);
}
.checkbox-item__label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
}
.checkbox-item--checked .checkbox-item__label {
  color: var(--color-gold-dark);
  font-weight: 600;
}

.form-field__char-count {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: var(--font-body);
  text-align: right;
  margin-top: var(--space-1);
}

@media (max-width: 640px) {
  .service-type-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .checkbox-grid {
    grid-template-columns: 1fr;
  }
}
`
if (!document.head.querySelector('[data-step2-styles]')) {
  style.setAttribute('data-step2-styles', '')
  document.head.appendChild(style)
}

