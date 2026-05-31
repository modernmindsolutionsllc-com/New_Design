export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || value.toString().trim() === '') {
    return { valid: false, message: `${fieldName} is required.` }
  }
  return { valid: true, message: '' }
}

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

export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return { valid: false, message: 'Phone number is required.' }
  }
  const cleaned = phone.replace(/[\s\-().+]/g, '')
  if (cleaned.length < 7 || cleaned.length > 15) {
    return { valid: false, message: 'Please enter a valid phone number.' }
  }
  if (!/^\d+$/.test(cleaned)) {
    return { valid: false, message: 'Phone number should contain only digits.' }
  }
  return { valid: true, message: '' }
}

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

export const validateCheckboxGroup = (selectedItems, fieldName = 'Please select at least one option') => {
  if (!selectedItems || selectedItems.length === 0) {
    return { valid: false, message: fieldName }
  }
  return { valid: true, message: '' }
}

export const validateFileUpload = (file, maxSizeMB = 10) => {
  if (!file) return { valid: true, message: '' }
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
    return { valid: false, message: 'Only PDF, Word documents, and images (JPG/PNG) are accepted.' }
  }
  if (file.size > maxSizeBytes) {
    return { valid: false, message: `File size must be under ${maxSizeMB}MB.` }
  }
  return { valid: true, message: '' }
}

export const validateStep1 = (data) => {
  const errors = {}
  const nameResult = validateName(data.name)
  if (!nameResult.valid) errors.name = nameResult.message
  const emailResult = validateEmail(data.email)
  if (!emailResult.valid) errors.email = emailResult.message
  const phoneResult = validatePhone(data.phone)
  if (!phoneResult.valid) errors.phone = phoneResult.message
  const businessTypeResult = validateRequired(data.businessType, 'Please select your business type')
  if (!businessTypeResult.valid) errors.businessType = businessTypeResult.message
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

export const validateStep2 = (data) => {
  const errors = {}
  const serviceResult = validateCheckboxGroup(data.serviceTypes, 'Please select at least one service or goal.')
  if (!serviceResult.valid) errors.serviceTypes = serviceResult.message
  const presenceResult = validateRequired(data.onlinePresenceStatus, 'Please tell us whether you already have an online presence')
  if (!presenceResult.valid) errors.onlinePresenceStatus = presenceResult.message

  if (data.onlinePresenceStatus === 'yes') {
    const answers = data.existingPresenceAnswers || {}
    validateBranchArray(errors, 'existingPresenceAnswers', answers, 'biggestProblem', 'Please select at least one current problem.')
    validateBranchRequired(errors, 'existingPresenceAnswers', answers, 'customerGoal', 'Please choose what you want customers to do more easily')
  }

  if (data.onlinePresenceStatus === 'no') {
    const answers = data.newPresenceAnswers || {}
    validateBranchRequired(errors, 'newPresenceAnswers', answers, 'launchType', 'Please select what you want to launch')
    validateBranchRequired(errors, 'newPresenceAnswers', answers, 'firstPriority', 'Please choose the most important first priority')
  }
  return errors
}

export const validateStep3 = (data) => {
  const errors = {}
  const stageResult = validateRequired(data.businessStage, 'Please select your business stage')
  if (!stageResult.valid) errors.businessStage = stageResult.message
  const successVisionResult = validateRequired(data.successVision, 'Please describe what success would look like')
  if (!successVisionResult.valid) errors.successVision = successVisionResult.message
  const timelineResult = validateRequired(data.timeline, 'Please select a timeline')
  if (!timelineResult.valid) errors.timeline = timelineResult.message
  const budgetResult = validateRequired(data.budget, 'Please select a budget range')
  if (!budgetResult.valid) errors.budget = budgetResult.message
  return errors
}

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

export const serializeFormData = (formData) => {
  const existingAnswers = formData.existingPresenceAnswers || {}
  const newAnswers = formData.newPresenceAnswers || {}
  const hasExistingPresence = formData.onlinePresenceStatus === 'yes'
  const recommendations = getRecommendedSolutions(formData)

  const payload = {
    'Full Name': formData.name || '',
    'Email Address': formData.email || '',
    Phone: formData.phone || '',
    'Company Name': formData.companyName || 'Not provided',
    'Business Type': formData.businessType || 'Not specified',
    'Services Needed': Array.isArray(formData.serviceTypes) ? formData.serviceTypes.join(', ') : formData.serviceTypes || '',
    'Has Online Presence': formData.onlinePresenceStatus === 'yes'
      ? 'Yes, already has an online presence'
      : formData.onlinePresenceStatus === 'no'
        ? 'No, does not have an online presence yet'
        : 'Not answered',
    'Business Stage': formData.businessStage || '',
    'Success Vision (Next 3-6 Months)': formData.successVision || 'Not provided',
    Timeline: formData.timeline || '',
    'Budget Range': formData.budget || '',
    'Worked With Similar Agency Before': formData.workedBefore || 'Not answered',
    'How They Found Us': formData.referralSource || 'Not specified',
    'Preferred Contact Method': formData.contactMethod || '',
    'Best Time to Contact': formData.bestTime || '',
    'Additional Notes': formData.additionalNotes || 'None',
    'Recommended Solutions': recommendations.length ? recommendations.join(', ') : 'No recommendations generated',
    Attachment: formData.file || null,
    _subject: `New Project Request from ${formData.name || 'Website Visitor'}`,
    _replyto: formData.email || '',
  }

  if (hasExistingPresence) {
    return {
      ...payload,
      'Biggest Current Problems': formatAnswer(existingAnswers.biggestProblem),
      'What Customers Should Do More Easily': formatAnswer(existingAnswers.customerGoal),
      'Improve First': formatAnswer(existingAnswers.improveFirst),
    }
  }

  return {
    ...payload,
    'Launch Type': formatAnswer(newAnswers.launchType),
    'Most Important First Priority': formatAnswer(newAnswers.firstPriority),
    'Help Needed From ModernMind': formatAnswer(newAnswers.helpNeeded),
    'Helpful First Version Features': formatAnswer(newAnswers.essentialFeatures),
  }
}

const recommendationMap = {
  'more-customers': 'Lead generation strategy',
  website: 'Business website',
  'mobile-app': 'Mobile app development',
  'online-booking': 'Online booking system',
  'social-media-marketing': 'Social media marketing',
  branding: 'Brand identity refresh',
  automation: 'Business automation workflow',
  'online-payments': 'Payment gateway setup',
  'appointment-system': 'Appointment management system',
  'ai-solutions': 'AI assistant or chatbot',
  'seo-google-ranking': 'SEO optimization',
}

export const getRecommendedSolutions = (formData) => {
  const recommendations = new Set()
  ;(formData.serviceTypes || []).forEach((item) => {
    if (recommendationMap[item]) recommendations.add(recommendationMap[item])
  })
  if (formData.newPresenceAnswers?.launchType) {
    recommendations.add(formData.newPresenceAnswers.launchType)
  }
  if (formData.newPresenceAnswers?.firstPriority === 'A professional website') recommendations.add('Business website')
  if (formData.newPresenceAnswers?.firstPriority === 'More inquiries and leads') recommendations.add('Lead generation strategy')
  if (formData.newPresenceAnswers?.firstPriority === 'Simple booking or payments') recommendations.add('Online booking system')
  if (formData.newPresenceAnswers?.firstPriority === 'A stronger brand image') recommendations.add('Brand identity refresh')
  if (formData.newPresenceAnswers?.firstPriority === 'Guidance on what to build first') recommendations.add('Digital growth roadmap')
  ;(formData.newPresenceAnswers?.helpNeeded || []).forEach((item) => {
    if (item === 'Marketing') recommendations.add('Social media marketing')
    if (item === 'Design') recommendations.add('Brand identity refresh')
    if (item === 'Development') recommendations.add('Business website')
    if (item === 'Automation') recommendations.add('Business automation workflow')
    if (item === 'Strategy') recommendations.add('Digital growth roadmap')
  })
  ;(formData.existingPresenceAnswers?.improveFirst || []).forEach((item) => {
    if (item === 'Website') recommendations.add('Website redesign')
    if (item === 'Social media') recommendations.add('Social media marketing')
    if (item === 'Branding') recommendations.add('Brand identity refresh')
    if (item === 'SEO') recommendations.add('SEO optimization')
    if (item === 'Online booking') recommendations.add('Online booking system')
    if (item === 'Online payments') recommendations.add('Payment gateway setup')
    if (item === 'Automation') recommendations.add('Business automation workflow')
    if (item === 'Customer experience') recommendations.add('Customer experience improvements')
  })
  if (formData.existingPresenceAnswers?.customerGoal === 'Get more enquiries') recommendations.add('Lead generation strategy')
  if (formData.existingPresenceAnswers?.customerGoal === 'Book appointments more easily') recommendations.add('Online booking system')
  if (formData.existingPresenceAnswers?.customerGoal === 'Trust the business faster') recommendations.add('Website redesign')
  if (formData.existingPresenceAnswers?.customerGoal === 'Contact us without friction') recommendations.add('Conversion-focused website improvements')
  if (formData.existingPresenceAnswers?.customerGoal === 'Pay online or complete a purchase') recommendations.add('Payment gateway setup')
  if (formData.onlinePresenceStatus === 'no') {
    recommendations.add('Business website')
    recommendations.add('Google Business Profile setup')
  }
  if (['Salon', 'Clinic', 'Restaurant', 'Fitness'].includes(formData.businessType)) {
    recommendations.add('Online booking system')
  }
  if (formData.businessStage === 'Need modernization') {
    recommendations.add('Website redesign')
    recommendations.add('Business automation workflow')
  }
  if (formData.businessStage === 'Just starting') {
    recommendations.add('Brand identity refresh')
  }
  return Array.from(recommendations).slice(0, 5)
}

export const hasErrors = (errors) => Object.keys(errors).length > 0
export const fieldHasError = (errors, field) => Boolean(errors[field])
export const getFieldError = (errors, field) => errors[field] || ''
