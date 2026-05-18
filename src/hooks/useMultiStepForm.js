// ─────────────────────────────────────────────────────────────────────────────
//  useMultiStepForm
//  Custom hook that manages the entire 4-step questionnaire form state.
//  Handles: current step, form data across all steps, navigation, validation.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from 'react'
import {
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
  hasErrors,
} from '@utils/formHelpers'

const TOTAL_STEPS = 4

// Default empty state for the entire form
const INITIAL_FORM_DATA = {
  // Step 1 — About You
  name: '',
  email: '',
  phone: '',
  companyName: '',
  role: '',

  // Step 2 — Your Project
  serviceTypes: [],      // Array of selected service IDs
  onlinePresenceStatus: '',
  existingPresenceAnswers: {
    currentPresence: [],
    mainLink: '',
    currentTraffic: '',
    wantsTrafficIncrease: '',
    desiredTraffic: [],
    trafficSources: [],
    biggestProblem: [],
    improveFirst: [],
    trackingTools: [],
    successMetric: '',
  },
  newPresenceAnswers: {
    launchType: '',
    mainGoal: '',
    primaryAudience: '',
    dayOneActions: '',
    essentialFeatures: [],
    brandReadiness: '',
    inspirationLinks: '',
    integrations: [],
    helpNeeded: [],
    successMetric: '',
  },

  // Step 3 — Timeline & Budget
  timeline: '',
  budget: '',
  workedBefore: '',      // 'yes' | 'no' | 'yes-bad-experience'
  referralSource: '',

  // Step 4 — Contact Preference
  contactMethod: '',
  bestTime: '',
  file: null,
  additionalNotes: '',
}

/**
 * @returns {{
 *   currentStep: number,
 *   formData: Object,
 *   errors: Object,
 *   isFirstStep: boolean,
 *   isLastStep: boolean,
 *   progressPercent: number,
 *   updateField: (field: string, value: any) => void,
 *   updateFields: (fields: Object) => void,
 *   toggleArrayField: (field: string, value: string) => void,
 *   next: () => boolean,
 *   back: () => void,
 *   goToStep: (step: number) => void,
 *   resetForm: () => void,
 *   clearFieldError: (field: string) => void,
 * }}
 */
export const useMultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState({})

  // ── Computed values ─────────────────────────────────────────────────────────
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === TOTAL_STEPS
  const progressPercent = Math.round((currentStep / TOTAL_STEPS) * 100)

  // ── Field Updaters ──────────────────────────────────────────────────────────

  /**
   * Updates a single field in formData.
   * Also clears the error for that field on change.
   */
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

  /**
   * Updates multiple fields at once. Useful for clearing or prefilling a step.
   */
  const updateFields = useCallback((fields) => {
    setFormData((prev) => ({ ...prev, ...fields }))
  }, [])

  /**
   * Toggles a value inside an array field (e.g. serviceTypes, features).
   * If the value is already in the array, it removes it. Otherwise adds it.
   */
  const toggleArrayField = useCallback((field, value) => {
    setFormData((prev) => {
      const current = prev[field] || []
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
      return { ...prev, [field]: updated }
    })
    // Clear error for this field when user interacts
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev }
        delete next[field]
        return next
      }
      return prev
    })
  }, [])

  /**
   * Clears the error for a specific field.
   * Used by input components on focus.
   */
  const clearFieldError = useCallback((field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  // ── Step Validators ─────────────────────────────────────────────────────────

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

  // ── Navigation ──────────────────────────────────────────────────────────────

  /**
   * Validates the current step and advances to the next one if valid.
   * @returns {boolean} - true if advanced, false if validation failed
   */
  const next = useCallback(() => {
    const isValid = validateCurrentStep()
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1)
      // Scroll form back to top on step change
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return true
    }
    return isValid
  }, [currentStep, validateCurrentStep])

  /**
   * Goes back to the previous step without validation.
   */
  const back = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      setErrors({})
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep])

  /**
   * Jumps directly to a specific step (only allowed for already-visited steps).
   */
  const goToStep = useCallback((step) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step)
      setErrors({})
    }
  }, [])

  /**
   * Resets the entire form back to its initial state.
   */
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
  }
}
