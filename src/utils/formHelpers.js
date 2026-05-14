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
    return { valid: false, message: 'Please describe your project.' }
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

/**
 * Validates all fields in Step 2 (Your Project).
 * @param {Object} data - { serviceTypes, projectDescription, startingFrom, features }
 * @returns {Object} errors
 */
export const validateStep2 = (data) => {
  const errors = {}

  const serviceResult = validateCheckboxGroup(
    data.serviceTypes,
    'Please select at least one service type.'
  )
  if (!serviceResult.valid) errors.serviceTypes = serviceResult.message

  const descResult = validateMinLength(data.projectDescription, 20)
  if (!descResult.valid) errors.projectDescription = descResult.message

  const startResult = validateRequired(data.startingFrom, 'Please select one option')
  if (!startResult.valid) errors.startingFrom = startResult.message

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
  return {
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
    'Project Description': formData.projectDescription || '',
    'Starting From': formData.startingFrom || '',
    'Features Required': Array.isArray(formData.features)
      ? formData.features.join(', ')
      : 'None specified',

    // Step 3
    'Timeline': formData.timeline || '',
    'Budget Range': formData.budget || '',
    'Worked With Agency Before': formData.workedBefore || 'Not answered',
    'How They Found Us': formData.referralSource || 'Not specified',

    // Step 4
    'Preferred Contact Method': formData.contactMethod || '',
    'Best Time to Contact': formData.bestTime || '',
    'Additional Notes': formData.additionalNotes || 'None',

    // Meta
    '_subject': `New Project Inquiry from ${formData.name || 'Website Visitor'}`,
    '_replyto': formData.email || '',
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