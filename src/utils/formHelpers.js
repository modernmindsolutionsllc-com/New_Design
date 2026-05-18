// ─────────────────────────────────────────────────────────────────────────────
//  FORM HELPERS
//  Validation functions for the multi-step questionnaire form.
//  Each function returns { valid: boolean, message: string }
// ─────────────────────────────────────────────────────────────────────────────

// ── Individual Field Validators ───────────────────────────────────────────────

/**
 * Validates that a required field is not empty.
 * @param {string} value
 * @param {string} fieldName - Human-readable label for the error message
 * @returns {{ valid: boolean, message: string }}
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || value.toString().trim() === '') {
    return { valid: false, message: `${fieldName} is required.` }
  }
  return { valid: true, message: '' }
}

/**
 * Validates an email address format.
 * @param {string} email
 * @returns {{ valid: boolean, message: string }}
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return { valid: false, message: 'Email address is required.' }
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return { valid: false, message: 'Please enter a valid email address.' }
  }
  return { valid: true, message: '' }
}

/**
 * Validates a phone number.
 * Accepts formats: +91 98765 43210, 9876543210, +1-800-555-0199, etc.
 * @param {string} phone
 * @returns {{ valid: boolean, message: string }}
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return { valid: false, message: 'Phone number is required.' }
  }
  // Strips spaces, dashes, parentheses before checking
  const cleaned = phone.replace(/[\s\-().+]/g, '')
  if (cleaned.length < 7 || cleaned.length > 15) {
    return { valid: false, message: 'Please enter a valid phone number.' }
  }
  if (!/^\d+$/.test(cleaned)) {
    return { valid: false, message: 'Phone number should contain only digits.' }
  }
  return { valid: true, message: '' }
}

/**
 * Validates that a name is at least 2 characters and contains only valid characters.
 * @param {string} name
 * @returns {{ valid: boolean, message: string }}
 */
export const validateName = (name) => {
  if (!name || name.trim() === '') {
    return { valid: false, message: 'Your name is required.' }
  }
  if (name.trim().length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters.' }
  }
  if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
    return { valid: false, message: 'Name contains invalid characters.' }
  }
  return { valid: true, message: '' }
}

/**
 * Validates that at least one checkbox option is selected.
 * @param {string[]} selectedItems - Array of selected values
 * @param {string} fieldName
 * @returns {{ valid: boolean, message: string }}
 */
export const validateCheckboxGroup = (selectedItems, fieldName = 'Please select at least one option') => {
  if (!selectedItems || selectedItems.length === 0) {
    return { valid: false, message: fieldName }
  }
  return { valid: true, message: '' }
}

/**
 * Validates a textarea has a minimum character count.
 * @param {string} text
 * @param {number} minLength
 * @returns {{ valid: boolean, message: string }}
 */
export const validateMinLength = (text, minLength = 20) => {
  if (!text || text.trim() === '') {
    return { valid: false, message: 'Please describe your project goals.' }
  }
  if (text.trim().length < minLength) {
    return {
      valid: false,
      message: `Please provide at least ${minLength} characters (${text.trim().length}/${minLength}).`,
    }
  }
  return { valid: true, message: '' }
}

/**
 * Validates a file upload.
 * @param {File|null} file
 * @param {number} maxSizeMB - Maximum file size in megabytes
 * @returns {{ valid: boolean, message: string }}
 */
export const validateFileUpload = (file, maxSizeMB = 10) => {
  if (!file) return { valid: true, message: '' } // File is optional

  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ]
  const maxSizeBytes = maxSizeMB * 1024 * 1024

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: 'Only PDF, Word documents, and images (JPG/PNG) are accepted.',
    }
  }
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      message: `File size must be under ${maxSizeMB}MB. Your file is ${(file.size / 1024 / 1024).toFixed(1)}MB.`,
    }
  }
  return { valid: true, message: '' }
}

// ── Step-level Validators ─────────────────────────────────────────────────────
// Each returns an errors object: { fieldName: 'error message' }
// Empty object means all valid.

/**
 * Validates all fields in Step 1 (About You).
 * @param {Object} data - { name, email, phone, companyName, role }
 * @returns {Object} errors
 */
export const validateStep1 = (data) => {
  const errors = {}

  const nameResult = validateName(data.name)
  if (!nameResult.valid) errors.name = nameResult.message

  const emailResult = validateEmail(data.email)
  if (!emailResult.valid) errors.email = emailResult.message

  const phoneResult = validatePhone(data.phone)
  if (!phoneResult.valid) errors.phone = phoneResult.message

  // companyName and role are optional — no validation needed
  return errors
}

const validateBranchArray = (errors, branch, data, field, message) => {
  const result = validateCheckboxGroup(data?.[field], message)
  if (!result.valid) errors[`${branch}.${field}`] = result.message
}

const validateBranchRequired = (errors, branch, data, field, label) => {
  const result = validateRequired(data?.[field], label)
  if (!result.valid) errors[`${branch}.${field}`] = result.message
}

const formatAnswer = (value, fallback = 'Not provided') => {
  if (Array.isArray(value)) return value.length ? value.join(', ') : fallback
  return value || fallback
}

/**
 * Validates all fields in Step 2 (Project Scope).
 * @param {Object} data - { serviceTypes, onlinePresenceStatus, existingPresenceAnswers, newPresenceAnswers }
 * @returns {Object} errors
 */
export const validateStep2 = (data) => {
  const errors = {}

  const serviceResult = validateCheckboxGroup(
    data.serviceTypes,
    'Please select at least one service type.'
  )
  if (!serviceResult.valid) errors.serviceTypes = serviceResult.message

  const presenceResult = validateRequired(
    data.onlinePresenceStatus,
    'Please tell us whether you already have an online presence'
  )
  if (!presenceResult.valid) errors.onlinePresenceStatus = presenceResult.message

  if (data.onlinePresenceStatus === 'yes') {
    const answers = data.existingPresenceAnswers || {}
    validateBranchArray(errors, 'existingPresenceAnswers', answers, 'currentPresence', 'Please select your current online presence.')
    validateBranchRequired(errors, 'existingPresenceAnswers', answers, 'currentTraffic', 'Please select your current traffic range')
    validateBranchRequired(errors, 'existingPresenceAnswers', answers, 'wantsTrafficIncrease', 'Please tell us if you want to increase traffic')
    validateBranchArray(errors, 'existingPresenceAnswers', answers, 'biggestProblem', 'Please select at least one current problem.')
    validateBranchArray(errors, 'existingPresenceAnswers', answers, 'improveFirst', 'Please select what you want us to improve first.')
    validateBranchRequired(errors, 'existingPresenceAnswers', answers, 'successMetric', 'Please describe what success would look like')
  }

  if (data.onlinePresenceStatus === 'no') {
    const answers = data.newPresenceAnswers || {}
    validateBranchRequired(errors, 'newPresenceAnswers', answers, 'launchType', 'Please select what you want to launch')
    validateBranchRequired(errors, 'newPresenceAnswers', answers, 'mainGoal', 'Please select the main goal')
    validateBranchRequired(errors, 'newPresenceAnswers', answers, 'primaryAudience', 'Please describe your primary audience')
    validateBranchRequired(errors, 'newPresenceAnswers', answers, 'dayOneActions', 'Please describe what users should do on day one')
    validateBranchArray(errors, 'newPresenceAnswers', answers, 'essentialFeatures', 'Please select at least one essential feature.')
    validateBranchArray(errors, 'newPresenceAnswers', answers, 'helpNeeded', 'Please select at least one way we can help.')
    validateBranchRequired(errors, 'newPresenceAnswers', answers, 'successMetric', 'Please describe what success would look like')
  }

  return errors
}

/**
 * Validates all fields in Step 3 (Timeline & Budget).
 * @param {Object} data - { timeline, budget, workedBefore, referralSource }
 * @returns {Object} errors
 */
export const validateStep3 = (data) => {
  const errors = {}

  const timelineResult = validateRequired(data.timeline, 'Please select a timeline')
  if (!timelineResult.valid) errors.timeline = timelineResult.message

  const budgetResult = validateRequired(data.budget, 'Please select a budget range')
  if (!budgetResult.valid) errors.budget = budgetResult.message

  return errors
}

/**
 * Validates all fields in Step 4 (Contact Preference).
 * @param {Object} data - { contactMethod, bestTime, file, additionalNotes }
 * @returns {Object} errors
 */
export const validateStep4 = (data) => {
  const errors = {}

  const methodResult = validateRequired(data.contactMethod, 'Please select a contact method')
  if (!methodResult.valid) errors.contactMethod = methodResult.message

  const timeResult = validateRequired(data.bestTime, 'Please select the best time to reach you')
  if (!timeResult.valid) errors.bestTime = timeResult.message

  if (data.file) {
    const fileResult = validateFileUpload(data.file)
    if (!fileResult.valid) errors.file = fileResult.message
  }

  return errors
}

// ── Form Data Serializer ──────────────────────────────────────────────────────

/**
 * Flattens all 4 steps of form data into a single object ready for Formspree.
 * Arrays are joined as comma-separated strings for email readability.
 * @param {Object} formData - Combined data from all 4 steps
 * @returns {Object} - Flat object for Formspree submission
 */
export const serializeFormData = (formData) => {
  const existingAnswers = formData.existingPresenceAnswers || {}
  const newAnswers = formData.newPresenceAnswers || {}
  const hasExistingPresence = formData.onlinePresenceStatus === 'yes'

  const payload = {
    // Step 1
    'Full Name': formData.name || '',
    'Email Address': formData.email || '',
    'Phone / WhatsApp': formData.phone || '',
    'Company Name': formData.companyName || 'Not provided',
    'Role': formData.role || 'Not specified',

    // Step 2
    'Services Needed': Array.isArray(formData.serviceTypes)
      ? formData.serviceTypes.join(', ')
      : formData.serviceTypes || '',
    'Has Online Presence': formData.onlinePresenceStatus === 'yes'
      ? 'Yes, already has an online presence'
      : formData.onlinePresenceStatus === 'no'
        ? 'No, does not have an online presence yet'
        : 'Not answered',

    // Step 3
    'Timeline': formData.timeline || '',
    'Budget Range': formData.budget || '',
    'Worked With Similar Agency Before': formData.workedBefore || 'Not answered',
    'How They Found Us': formData.referralSource || 'Not specified',

    // Step 4
    'Preferred Contact Method': formData.contactMethod || '',
    'Best Time to Contact': formData.bestTime || '',
    'Additional Notes': formData.additionalNotes || 'None',

    // Meta
    '_subject': `New Project Request from ${formData.name || 'Website Visitor'}`,
    '_replyto': formData.email || '',
  }

  if (hasExistingPresence) {
    return {
      ...payload,
      'Current Online Presence': formatAnswer(existingAnswers.currentPresence),
      'Current Website / Main Page': formatAnswer(existingAnswers.mainLink),
      'Current Traffic': formatAnswer(existingAnswers.currentTraffic),
      'Wants To Increase Traffic': formatAnswer(existingAnswers.wantsTrafficIncrease),
      'Desired Traffic': formatAnswer(existingAnswers.desiredTraffic),
      'Current Traffic Sources': formatAnswer(existingAnswers.trafficSources),
      'Biggest Current Problems': formatAnswer(existingAnswers.biggestProblem),
      'Improve First': formatAnswer(existingAnswers.improveFirst),
      'Tracking Tools': formatAnswer(existingAnswers.trackingTools),
      'Existing Presence Success Goal': formatAnswer(existingAnswers.successMetric),
    }
  }

  return {
    ...payload,
    'Launch Type': formatAnswer(newAnswers.launchType),
    'New Presence Main Goal': formatAnswer(newAnswers.mainGoal),
    'Primary Audience': formatAnswer(newAnswers.primaryAudience),
    'Day One User Actions': formatAnswer(newAnswers.dayOneActions),
    'Essential First Version Features': formatAnswer(newAnswers.essentialFeatures),
    'Branding / Content Readiness': formatAnswer(newAnswers.brandReadiness),
    'Example Sites / Competitors': formatAnswer(newAnswers.inspirationLinks),
    'Business Tool Integrations': formatAnswer(newAnswers.integrations),
    'Help Needed From ModernMind': formatAnswer(newAnswers.helpNeeded),
    'New Presence 3 Month Success Goal': formatAnswer(newAnswers.successMetric),
  }
}

// ── Helper Utilities ──────────────────────────────────────────────────────────

/**
 * Checks if an errors object has any errors.
 * @param {Object} errors
 * @returns {boolean}
 */
export const hasErrors = (errors) => Object.keys(errors).length > 0

/**
 * Returns true if a specific field has an error.
 * @param {Object} errors
 * @param {string} field
 * @returns {boolean}
 */
export const fieldHasError = (errors, field) => Boolean(errors[field])

/**
 * Returns the error message for a field, or empty string if no error.
 * @param {Object} errors
 * @param {string} field
 * @returns {string}
 */
export const getFieldError = (errors, field) => errors[field] || ''
