import { motion } from 'framer-motion'
import { Paperclip, Sparkles, X } from 'lucide-react'
import { CONTACT_METHOD_OPTIONS, BEST_TIME_OPTIONS } from '@utils/constants'
import {
  getFieldError,
  fieldHasError,
  getRecommendedSolutions,
  validateFileUpload,
} from '@utils/formHelpers'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

const StepFour = ({ formData, errors, updateField, clearFieldError }) => {
  const recommendations = getRecommendedSolutions(formData)

  const handleFileChange = (e) => {
    const file = e.target.files[0] || null
    if (file) {
      const result = validateFileUpload(file)
      if (!result.valid) {
        updateField('fileError', result.message)
        updateField('file', null)
      } else {
        updateField('fileError', '')
        updateField('file', file)
      }
    }
  }

  const removeFile = () => {
    updateField('file', null)
    updateField('fileError', '')
  }

  return (
    <motion.div
      className="form-step"
      variants={STAGGER_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="form-step__header" variants={FADE_UP}>
        <h2 className="form-step__title">Your recommended next steps</h2>
        <p className="form-step__sub">
          Based on what you shared, these are the areas we&apos;d likely guide you toward first.
        </p>
      </motion.div>

      <motion.div className="form-step__fields" variants={FADE_UP}>
        <div className="recommendation-card">
          <div className="recommendation-card__top">
            <span className="recommendation-card__badge">
              <Sparkles size={14} />
              Suggested for your business
            </span>
            <p className="recommendation-card__copy">
              We&apos;ll refine this after review, but here is the strongest starting direction based on your answers.
            </p>
          </div>

          <div className="recommendation-card__chips">
            {recommendations.map((item) => (
              <span key={item} className="recommendation-card__chip">{item}</span>
            ))}
          </div>
        </div>

        <div className={`form-field ${fieldHasError(errors, 'contactMethod') ? 'form-field--error' : ''}`}>
          <label className="form-field__label">
            Preferred contact method
            <span className="form-field__required">*</span>
          </label>
          <div className="contact-method-cards">
            {CONTACT_METHOD_OPTIONS.map(({ id, label, emoji }) => {
              const selected = formData.contactMethod === id
              return (
                <button
                  key={id}
                  type="button"
                  className={`contact-method-card ${selected ? 'contact-method-card--selected' : ''}`}
                  onClick={() => {
                    updateField('contactMethod', id)
                    clearFieldError('contactMethod')
                  }}
                  aria-pressed={selected}
                >
                  <span className="contact-method-card__emoji" aria-hidden>{emoji}</span>
                  <span className="contact-method-card__label">{label}</span>
                </button>
              )
            })}
          </div>
          {fieldHasError(errors, 'contactMethod') && (
            <span className="form-field__error">{getFieldError(errors, 'contactMethod')}</span>
          )}
        </div>

        <div className={`form-field ${fieldHasError(errors, 'bestTime') ? 'form-field--error' : ''}`}>
          <label className="form-field__label">
            Best time to reach you
            <span className="form-field__required">*</span>
          </label>
          <div className="option-cards">
            {BEST_TIME_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`option-card ${formData.bestTime === opt ? 'option-card--selected' : ''}`}
                onClick={() => {
                  updateField('bestTime', opt)
                  clearFieldError('bestTime')
                }}
                aria-pressed={formData.bestTime === opt}
              >
                {opt}
              </button>
            ))}
          </div>
          {fieldHasError(errors, 'bestTime') && (
            <span className="form-field__error">{getFieldError(errors, 'bestTime')}</span>
          )}
        </div>

        <div className="form-field">
          <label className="form-field__label">
            <Paperclip size={14} /> Upload a brief or reference
            <span className="form-field__hint">Optional — PDF, Word, JPG, or PNG up to 10MB</span>
          </label>

          {!formData.file ? (
            <label className="file-upload">
              <input
                type="file"
                className="file-upload__input"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />
              <div className="file-upload__area">
                <Paperclip size={20} className="file-upload__icon" />
                <span className="file-upload__text">Click to upload or drag a file here</span>
                <span className="file-upload__hint">PDF, Word, JPG, or PNG — maximum 10MB</span>
              </div>
            </label>
          ) : (
            <div className="file-upload__preview">
              <Paperclip size={16} className="file-upload__preview-icon" />
              <span className="file-upload__preview-name">{formData.file.name}</span>
              <span className="file-upload__preview-size">
                ({(formData.file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
              <button type="button" className="file-upload__remove" onClick={removeFile} aria-label="Remove file">
                <X size={14} />
              </button>
            </div>
          )}

          {formData.fileError && (
            <span className="form-field__error">{formData.fileError}</span>
          )}
        </div>

        <div className="form-field">
          <label className="form-field__label" htmlFor="additionalNotes">
            Anything else you&apos;d like us to know?
            <span className="form-field__hint">Optional</span>
          </label>
          <textarea
            id="additionalNotes"
            className="form-field__input form-field__textarea"
            rows={4}
            placeholder="Share anything useful: target location, current systems, budget context, goals, or examples you like."
            value={formData.additionalNotes}
            onChange={(e) => updateField('additionalNotes', e.target.value)}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default StepFour

const style = document.createElement('style')
style.textContent = `
.recommendation-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-6);
  border-radius: 24px;
  border: 1px solid var(--color-gold-border);
  background: linear-gradient(180deg, rgba(34, 182, 255, 0.12), rgba(34, 182, 255, 0.04));
  box-shadow: var(--shadow-sm);
}
.recommendation-card__top {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.recommendation-card__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  align-self: flex-start;
  padding: 0.45rem 0.8rem;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--color-gold-border);
  font-size: var(--text-xs);
  font-weight: 700;
  color: var(--color-gold-dark);
}
.recommendation-card__copy {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.65;
}
.recommendation-card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
.recommendation-card__chip {
  padding: 0.68rem 0.95rem;
  border-radius: var(--radius-full);
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}
.contact-method-cards {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-2);
}
.contact-method-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-5) var(--space-4);
  background: var(--color-bg-white);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: var(--transition-base);
  font-family: var(--font-body);
}
.contact-method-card:hover {
  border-color: var(--color-gold-border);
}
.contact-method-card--selected {
  border-color: var(--color-gold);
  background: linear-gradient(180deg, rgba(34, 182, 255, 0.12), rgba(34, 182, 255, 0.05));
}
.contact-method-card__emoji {
  font-size: 1.5rem;
}
.contact-method-card__label {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-secondary);
}
.contact-method-card--selected .contact-method-card__label {
  color: var(--color-text-primary);
}
.file-upload {
  display: block;
  cursor: pointer;
}
.file-upload__input {
  display: none;
}
.file-upload__area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-8);
  background: var(--color-bg-white);
  border: 1.5px dashed var(--color-border);
  border-radius: 24px;
  text-align: center;
  transition: var(--transition-base);
}
.file-upload:hover .file-upload__area {
  border-color: var(--color-gold);
  background: color-mix(in srgb, var(--color-gold-subtle) 65%, white 35%);
}
.file-upload__icon {
  color: var(--color-gold);
}
.file-upload__text {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
}
.file-upload__hint {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: var(--font-body);
}
.file-upload__preview {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background: var(--color-gold-subtle);
  border: 1.5px solid var(--color-gold-border);
  border-radius: var(--radius-lg);
}
.file-upload__preview-icon {
  color: var(--color-gold);
  flex-shrink: 0;
}
.file-upload__preview-name {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  font-family: var(--font-body);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.file-upload__preview-size {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: var(--font-body);
  flex-shrink: 0;
}
.file-upload__remove {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  padding: var(--space-1);
  border-radius: var(--radius-sm);
  transition: var(--transition-base);
  display: flex;
  align-items: center;
}
.file-upload__remove:hover {
  color: var(--color-error);
  background: rgba(192, 57, 43, 0.08);
}
@media (max-width: 640px) {
  .contact-method-cards {
    flex-direction: column;
  }
}
`
if (!document.head.querySelector('[data-step4-styles]')) {
  style.setAttribute('data-step4-styles', '')
  document.head.appendChild(style)
}
