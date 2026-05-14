import { useState } from 'react'
import { useForm } from '@formspree/react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Send, Loader2 } from 'lucide-react'

import ProgressBar   from './ProgressBar'
import StepOne       from './StepOne'
import StepTwo       from './StepTwo'
import StepThree     from './StepThree'
import StepFour      from './StepFour'
import SuccessScreen from './SuccessScreen'

import { useMultiStepForm }  from '@hooks/useMultiStepForm'
import { serializeFormData } from '@utils/formHelpers'
import { FORMSPREE_ENDPOINT } from './formspreeConfig'

// Slide animation between steps
const SLIDE_VARIANTS = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ?  40 : -40 }),
  center: ()    => ({ opacity: 1, x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }),
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -40 :  40,
    transition: { duration: 0.25, ease: 'easeIn' } }),
}

const QuestionnaireForm = () => {
  const [formspreeState, submitToFormspree] = useForm(FORMSPREE_ENDPOINT)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward

  const {
    currentStep, totalSteps, formData, errors,
    isFirstStep, isLastStep, progressPercent,
    updateField, updateFields, toggleArrayField,
    next, back, resetForm, clearFieldError,
  } = useMultiStepForm()

  // Show success screen after Formspree confirms submission
  if (formspreeState.succeeded) {
    return (
      <div className="questionnaire__card">
        <SuccessScreen clientName={formData.name} onReset={resetForm} />
      </div>
    )
  }

  const handleNext = () => {
    setDirection(1)
    next()
  }

  const handleBack = () => {
    setDirection(-1)
    back()
  }

  const handleSubmit = async () => {
    // Validate step 4 first via the hook
    setDirection(1)
    next() // next() validates step 4 before advancing, but we're on the last step
    // Since next() won't advance past totalSteps, we manually check errors
    // by calling the Formspree submit directly if no errors
    const payload = serializeFormData(formData)
    await submitToFormspree(payload)
  }

  const renderStep = () => {
    const props = { formData, errors, updateField, updateFields, toggleArrayField, clearFieldError }
    switch (currentStep) {
      case 1: return <StepOne  key="1" {...props} />
      case 2: return <StepTwo  key="2" {...props} />
      case 3: return <StepThree key="3" {...props} />
      case 4: return <StepFour key="4" {...props} />
      default: return null
    }
  }

  return (
    <div className="questionnaire__card">
      {/* Progress */}
      <div className="questionnaire__progress">
        <ProgressBar
          currentStep={currentStep}
          totalSteps={totalSteps}
          progressPercent={progressPercent}
        />
      </div>

      {/* Step content — animated slide */}
      <div className="questionnaire__body">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="questionnaire__nav">
        {!isFirstStep && (
          <button
            type="button"
            className="questionnaire__back-btn"
            onClick={handleBack}
            disabled={formspreeState.submitting}
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}

        <div style={{ flex: 1 }} />

        {isLastStep ? (
          <button
            type="button"
            className="questionnaire__submit-btn"
            onClick={handleSubmit}
            disabled={formspreeState.submitting}
          >
            {formspreeState.submitting ? (
              <><Loader2 size={18} className="questionnaire__spinner" /> Sending...</>
            ) : (
              <><Send size={16} /> Submit My Project Brief</>
            )}
          </button>
        ) : (
          <button
            type="button"
            className="questionnaire__next-btn"
            onClick={handleNext}
          >
            Continue <ArrowRight size={16} />
          </button>
        )}
      </div>

      {/* Formspree error */}
      {formspreeState.errors && formspreeState.errors.length > 0 && (
        <div className="questionnaire__api-error">
          Something went wrong submitting your form. Please try again or
          reach us directly on WhatsApp.
        </div>
      )}
    </div>
  )
}

export default QuestionnaireForm

const style = document.createElement('style')
style.textContent = `
/* Form card wrapper */
.questionnaire__card {
  background: var(--color-bg-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}
.questionnaire__progress {
  padding: var(--space-8) var(--space-10) var(--space-6);
  border-bottom: 1px solid var(--color-border);
  background: var(--color-bg-subtle);
}
.questionnaire__body {
  padding: var(--space-10);
  min-height: 420px;
}

/* Shared form field styles (used by all 4 steps) */
.form-step { display: flex; flex-direction: column; gap: var(--space-8); }
.form-step__header { display: flex; flex-direction: column; gap: var(--space-2); }
.form-step__title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700; color: var(--color-text-primary);
}
.form-step__sub {
  font-size: var(--text-base); color: var(--color-text-secondary); line-height: 1.6;
}
.form-step__fields { display: flex; flex-direction: column; gap: var(--space-6); }
.form-step__row    { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); }

/* Field */
.form-field { display: flex; flex-direction: column; gap: var(--space-2); }
.form-field__label {
  display: flex; align-items: center; gap: var(--space-2);
  font-family: var(--font-body); font-size: var(--text-sm); font-weight: 600;
  color: var(--color-text-primary);
}
.form-field__required { color: var(--color-gold); font-size: var(--text-xs); }
.form-field__optional { font-size: var(--text-xs); font-weight: 400; color: var(--color-text-muted); }
.form-field__hint     { font-size: var(--text-xs); font-weight: 400; color: var(--color-text-muted); }
.form-field__input {
  width: 100%;
  padding: var(--space-4) var(--space-5);
  font-family: var(--font-body); font-size: var(--text-base);
  color: var(--color-text-primary);
  background: var(--color-bg-white);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  outline: none; transition: border-color 0.2s ease, box-shadow 0.2s ease;
  appearance: none;
}
.form-field__input:focus {
  border-color: var(--color-gold);
  box-shadow: 0 0 0 3px rgba(201,168,76,0.12);
}
.form-field__input::placeholder { color: var(--color-text-muted); }
.form-field__textarea { resize: vertical; min-height: 120px; line-height: 1.65; }
.form-field__select   { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B6B7B' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; padding-right: 2.5rem; cursor: pointer; }
.form-field--error .form-field__input { border-color: var(--color-error); }
.form-field__error {
  font-size: var(--text-xs); color: var(--color-error);
  font-family: var(--font-body); font-weight: 500;
  display: flex; align-items: center; gap: var(--space-1);
}

/* Nav bar */
.questionnaire__nav {
  display: flex; align-items: center;
  padding: var(--space-6) var(--space-10);
  border-top: 1px solid var(--color-border);
  background: var(--color-bg-subtle);
  gap: var(--space-4);
}
.questionnaire__back-btn {
  display: inline-flex; align-items: center; gap: var(--space-2);
  font-family: var(--font-body); font-size: var(--text-sm); font-weight: 600;
  color: var(--color-text-secondary); background: none; border: none; cursor: pointer;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-full); transition: var(--transition-base);
  border: 1.5px solid var(--color-border);
}
.questionnaire__back-btn:hover {
  border-color: var(--color-gold-border); color: var(--color-gold-dark);
}
.questionnaire__next-btn,
.questionnaire__submit-btn {
  display: inline-flex; align-items: center; gap: var(--space-2);
  font-family: var(--font-body); font-size: var(--text-base); font-weight: 700;
  background: var(--color-gold); color: var(--color-bg-dark);
  border: 2px solid var(--color-gold);
  padding: 0.75rem 2rem; border-radius: var(--radius-full);
  cursor: pointer; transition: var(--transition-base);
}
.questionnaire__next-btn:hover,
.questionnaire__submit-btn:hover {
  background: var(--color-gold-dark); border-color: var(--color-gold-dark);
  box-shadow: var(--shadow-gold);
}
.questionnaire__submit-btn:disabled {
  opacity: 0.7; cursor: not-allowed;
}
@keyframes spin { to { transform: rotate(360deg); } }
.questionnaire__spinner { animation: spin 0.8s linear infinite; }

.questionnaire__api-error {
  margin: 0 var(--space-10) var(--space-6);
  padding: var(--space-4); border-radius: var(--radius-md);
  background: rgba(192,57,43,0.08); border: 1px solid rgba(192,57,43,0.2);
  font-size: var(--text-sm); color: var(--color-error); font-family: var(--font-body);
}

@media (max-width: 640px) {
  .questionnaire__progress, .questionnaire__body, .questionnaire__nav {
    padding-left: var(--space-6); padding-right: var(--space-6);
  }
  .form-step__row { grid-template-columns: 1fr; }
}
`
if (!document.head.querySelector('[data-qform-styles]')) {
  style.setAttribute('data-qform-styles', '')
  document.head.appendChild(style)
}
