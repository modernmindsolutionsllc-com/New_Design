import { useState, useCallback } from 'react'
import {
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
  hasErrors,
} from '@utils/formHelpers'

const TOTAL_STEPS = 4

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  phone: '',
  companyName: '',
  businessType: '',
  growthSelections: [],
  businessStage: '',
  timeline: '',
  budget: '',
  workedBefore: '',
  referralSource: '',
  contactMethod: '',
  bestTime: '',
  file: null,
  additionalNotes: '',
}

export const useMultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState({})

  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === TOTAL_STEPS
  const progressPercent = Math.round((currentStep / TOTAL_STEPS) * 100)

  const updateField = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev }
        delete next[field]
        return next
      }
      return prev
    })
  }, [])

  const updateFields = useCallback((fields) => {
    setFormData((prev) => ({ ...prev, ...fields }))
  }, [])

  const toggleArrayField = useCallback((field, value) => {
    setFormData((prev) => {
      const current = prev[field] || []
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
      return { ...prev, [field]: updated }
    })
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev }
        delete next[field]
        return next
      }
      return prev
    })
  }, [])

  const clearFieldError = useCallback((field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  const setFieldError = useCallback((field, message) => {
    setErrors((prev) => {
      if (!message) {
        if (!prev[field]) return prev
        const next = { ...prev }
        delete next[field]
        return next
      }
      return { ...prev, [field]: message }
    })
  }, [])

  const validateCurrentStep = useCallback(() => {
    let stepErrors = {}

    switch (currentStep) {
      case 1:
        stepErrors = validateStep1(formData)
        break
      case 2:
        stepErrors = validateStep2(formData)
        break
      case 3:
        stepErrors = validateStep3(formData)
        break
      case 4:
        stepErrors = validateStep4(formData)
        break
      default:
        break
    }

    setErrors(stepErrors)
    return !hasErrors(stepErrors)
  }, [currentStep, formData])

  const next = useCallback(() => {
    const isValid = validateCurrentStep()
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return true
    }
    return isValid
  }, [currentStep, validateCurrentStep])

  const back = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      setErrors({})
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep])

  const goToStep = useCallback((step) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step)
      setErrors({})
    }
  }, [])

  const resetForm = useCallback(() => {
    setCurrentStep(1)
    setFormData(INITIAL_FORM_DATA)
    setErrors({})
  }, [])

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    formData,
    errors,
    isFirstStep,
    isLastStep,
    progressPercent,
    updateField,
    updateFields,
    toggleArrayField,
    next,
    back,
    goToStep,
    resetForm,
    clearFieldError,
    setFieldError,
  }
}
