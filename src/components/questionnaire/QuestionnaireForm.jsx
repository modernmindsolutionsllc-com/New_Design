import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Send, Loader2 } from 'lucide-react'
import ProgressBar from './ProgressBar'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
import SuccessScreen from './SuccessScreen'
import { useMultiStepForm } from '@hooks/useMultiStepForm'
import { serializeFormData } from '@utils/formHelpers'
import { submitToFormspree } from './formspreeConfig'

const SLIDE_VARIANTS = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 40 : -40 }),
  center: () => ({ opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }),
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -40 : 40, transition: { duration: 0.25, ease: 'easeIn' } }),
}

const QuestionnaireForm = () => {
  const [direction, setDirection] = useState(1)
  const [submitState, setSubmitState] = useState({
    submitting: false,
    succeeded: false,
    error: '',
  })
  const [submittedName, setSubmittedName] = useState('')
  const { currentStep, totalSteps, formData, errors, isFirstStep, isLastStep, progressPercent, updateField, updateFields, toggleArrayField, next, back, resetForm, clearFieldError } = useMultiStepForm()

  if (submitState.succeeded) {
    return (
      <div className="questionnaire__card">
        <SuccessScreen
          clientName={submittedName}
          onReset={() => {
            resetForm()
            setSubmittedName('')
            setSubmitState({ submitting: false, succeeded: false, error: '' })
          }}
        />
      </div>
    )
  }

  const handleSubmit = async () => {
    setDirection(1)
    const isValid = next()
    if (!isValid) return

    const payload = serializeFormData(formData)
    setSubmitState({ submitting: true, succeeded: false, error: '' })

    const result = await submitToFormspree(payload)

    if (result.ok) {
      setSubmittedName(formData.name)
      resetForm()
      setSubmitState({ submitting: false, succeeded: true, error: '' })
      return
    }

    const message = result.errors?.[0]?.message || 'Something went wrong while sending your request.'
    setSubmitState({ submitting: false, succeeded: false, error: message })
  }

  const props = { formData, errors, updateField, updateFields, toggleArrayField, clearFieldError }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepOne key="1" {...props} />
      case 2: return <StepTwo key="2" {...props} />
      case 3: return <StepThree key="3" {...props} />
      case 4: return <StepFour key="4" {...props} />
      default: return null
    }
  }

  return (
    <div className="questionnaire__card">
      <div className="questionnaire__progress">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} progressPercent={progressPercent} />
      </div>
      <div className="questionnaire__body">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={currentStep} custom={direction} variants={SLIDE_VARIANTS} initial="enter" animate="center" exit="exit">
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="questionnaire__nav">
        {!isFirstStep && <button type="button" className="questionnaire__back-btn" onClick={() => { setDirection(-1); back() }} disabled={submitState.submitting}><ArrowLeft size={16} /> Back</button>}
        <div style={{ flex: 1 }} />
        {isLastStep ? (
          <button type="button" className="questionnaire__submit-btn" onClick={handleSubmit} disabled={submitState.submitting}>
            {submitState.submitting ? <><Loader2 size={18} className="questionnaire__spinner" /> Sending...</> : <><Send size={16} /> Get My Recommended Plan</>}
          </button>
        ) : (
          <button type="button" className="questionnaire__next-btn" onClick={() => { setDirection(1); next() }}>
            Continue <ArrowRight size={16} />
          </button>
        )}
      </div>
      {submitState.error && (
        <div className="questionnaire__api-error">
          {submitState.error}
        </div>
      )}
    </div>
  )
}

export default QuestionnaireForm
