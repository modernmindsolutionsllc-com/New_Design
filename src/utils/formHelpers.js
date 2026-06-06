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
  const growthResult = validateCheckboxGroup(data.growthSelections, 'Please select at least one growth area to continue.')
  if (!growthResult.valid) errors.growthSelections = growthResult.message

  const presenceResult = validateRequired(data.onlinePresenceStatus, 'Please select whether you have an online presence')
  if (!presenceResult.valid) {
    errors.onlinePresenceStatus = presenceResult.message
  } else if (data.onlinePresenceStatus === 'yes') {
    validateBranchArray(errors, 'existing', data.existingPresenceAnswers, 'biggestProblem', 'Please select at least one problem')
    validateBranchRequired(errors, 'existing', data.existingPresenceAnswers, 'customerGoal', 'Please select what customers should do more easily')
    validateBranchArray(errors, 'existing', data.existingPresenceAnswers, 'improveFirst', 'Please select at least one area to improve')
  } else if (data.onlinePresenceStatus === 'no') {
    validateBranchRequired(errors, 'new', data.newPresenceAnswers, 'launchType', 'Please select what you want to launch first')
    validateBranchRequired(errors, 'new', data.newPresenceAnswers, 'firstPriority', 'Please select your most important priority')
    validateBranchArray(errors, 'new', data.newPresenceAnswers, 'helpNeeded', 'Please select at least one type of help')
    validateBranchArray(errors, 'new', data.newPresenceAnswers, 'essentialFeatures', 'Please select at least one essential feature')
  }

  return errors
}

export const validateStep3 = (data) => {
  const errors = {}
  const stageResult = validateRequired(data.businessStage, 'Please select your business stage')
  if (!stageResult.valid) errors.businessStage = stageResult.message
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

const SERVICE_LABEL_MAP = {
  'more-customers': 'more customer demand',
  website: 'a stronger website',
  'mobile-app': 'a useful mobile app',
  'online-booking': 'easier online booking',
  'social-media-marketing': 'better social media traction',
  branding: 'sharper branding',
  automation: 'smarter automation',
  'online-payments': 'simpler online payments',
  'appointment-system': 'a smoother appointment system',
  'ai-solutions': 'practical AI support',
  'seo-google-ranking': 'better Google visibility',
}

const SERVICE_BUSINESS_TYPES = ['Salon', 'Clinic', 'Restaurant', 'Fitness']
const PRODUCT_BUSINESS_TYPES = ['Retail Store', 'E-Commerce']

const listToSentence = (items) => {
  if (!items?.length) return ''
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}

export const getQuestionnaireInsight = (formData, currentStep) => {
  const selectedServices = (formData.serviceTypes || [])
    .map((item) => SERVICE_LABEL_MAP[item])
    .filter(Boolean)
    .slice(0, 3)
  const recommendations = getRecommendedSolutions(formData).slice(0, 3)

  if (currentStep === 1) {
    const suggestions = []

    if (SERVICE_BUSINESS_TYPES.includes(formData.businessType)) {
      suggestions.push('Service-based businesses usually grow fastest when booking, reviews, and follow-up are easy for customers.')
    }
    if (PRODUCT_BUSINESS_TYPES.includes(formData.businessType)) {
      suggestions.push('Product-led businesses often benefit early from better trust signals, simpler payments, and repeat-purchase flows.')
    }
    if (formData.businessType === 'Startup') {
      suggestions.push('Startups usually win with a lean first launch, one strong conversion goal, and a clear offer.')
    }
    if (formData.companyName) {
      suggestions.push(`We can keep the final recommendation aligned with ${formData.companyName}'s brand and growth stage.`)
    }
    if (!suggestions.length) {
      suggestions.push('A clear business type helps us avoid generic advice and recommend a more realistic first move.')
    }

    return {
      badge: 'Live read on your setup',
      title: formData.businessType
        ? `${formData.businessType} businesses usually have a few fast-win patterns`
        : 'A few basics here will make the next step feel more tailored',
      copy: formData.name
        ? `${formData.name}, once we know what outcome you want next, we can start narrowing the best path instead of showing you everything.`
        : 'We are using these basics to narrow the kind of digital plan that is most likely to help first.',
      suggestions: suggestions.slice(0, 3),
      nextTeaser: 'Next, we will narrow whether you need more customers, a better website, smoother bookings, or a different growth move entirely.',
    }
  }

  if (currentStep === 2) {
    const suggestions = []

    if (selectedServices.length) {
      suggestions.push(`Right now your answers are leaning toward ${listToSentence(selectedServices)}.`)
    }
    if (formData.onlinePresenceStatus === 'yes' && formData.existingPresenceAnswers?.biggestProblem?.includes('Follow-up is too manual')) {
      suggestions.push('Manual follow-up is often a sign that automation or CRM cleanup could create quick operational relief.')
    }
    if (formData.onlinePresenceStatus === 'yes' && formData.existingPresenceAnswers?.biggestProblem?.includes('Website looks outdated')) {
      suggestions.push('An outdated website usually hurts trust first, so redesign and conversion fixes often move together.')
    }
    if (formData.onlinePresenceStatus === 'no' && formData.newPresenceAnswers?.launchType) {
      suggestions.push(`If we start with a ${formData.newPresenceAnswers.launchType.toLowerCase()}, we would usually keep version one focused and easy to launch.`)
    }
    if (formData.onlinePresenceStatus === 'no' && formData.newPresenceAnswers?.essentialFeatures?.length) {
      suggestions.push(`Your first version is already taking shape around ${listToSentence(formData.newPresenceAnswers.essentialFeatures.slice(0, 2)).toLowerCase()}.`)
    }
    if (!suggestions.length) {
      suggestions.push('The more clearly you pick outcomes here, the more practical the recommendation will feel in the next step.')
    }

    return {
      badge: 'Plan taking shape',
      title: recommendations.length
        ? `Your current direction looks closest to ${listToSentence(recommendations).toLowerCase()}`
        : 'Your choices here are shaping the recommendation in real time',
      copy: formData.onlinePresenceStatus
        ? 'This is the point where we stop thinking in generic services and start thinking in the order that would make the most business sense.'
        : 'Tell us enough here and we can start suggesting the smartest first build before you even submit.',
      suggestions: suggestions.slice(0, 3),
      nextTeaser: 'One more step and we will pressure-test this against your stage, budget, and timing so the recommendation feels realistic, not idealized.',
    }
  }

  if (currentStep === 3) {
    const suggestions = []

    if (formData.businessStage === 'Just starting') {
      suggestions.push('Early-stage projects usually work best when we prioritize speed, clarity, and one core outcome over a long feature list.')
    }
    if (formData.businessStage === 'Need modernization') {
      suggestions.push('Modernization projects often get better results when we phase improvements instead of rebuilding everything at once.')
    }
    if (formData.timeline === 'As soon as possible') {
      suggestions.push('A fast timeline usually points to a strong phase-one launch with the highest-impact essentials first.')
    }
    if (formData.budget === 'Under $1,000') {
      suggestions.push('A smaller budget does not block progress, but it usually means we should recommend a tighter scope and phased roadmap.')
    }
    if (formData.workedBefore === 'yes-bad') {
      suggestions.push('Since your last partnership felt frustrating, we should keep scope, deliverables, and milestones especially clear.')
    }
    if (!suggestions.length) {
      suggestions.push('These answers help us turn good ideas into a starting plan that matches your real constraints.')
    }

    return {
      badge: 'Reality check in progress',
      title: 'We are now sizing the right first version, not just the ideal end state',
      copy: 'This step helps us shape the recommendation around what your business can actually move on next.',
      suggestions: suggestions.slice(0, 3),
      nextTeaser: 'In the final step, you will see the starting direction we would explore first, plus the easiest way for us to follow up.',
    }
  }

  return {
    badge: 'Almost there',
    title: recommendations.length
      ? `Your strongest starting direction is ${listToSentence(recommendations).toLowerCase()}`
      : 'We have enough to recommend a strong first move',
    copy: 'Take a quick look at the recommendation below, then choose how you want us to follow up so we can keep the next step simple.',
    suggestions: [
      'If you have examples, screenshots, or a rough brief, attach them here so we can respond with sharper next steps.',
      formData.contactMethod === 'phone'
        ? 'A strategy call works best when you want us to talk through priorities together.'
        : 'Email works best when you prefer a written summary and clear next-step options.',
      'Use the notes box for context like service area, current tools, or anything you definitely want included.',
    ].slice(0, 3),
    nextTeaser: 'Once you send this, we can respond with a clearer first-phase recommendation instead of a one-size-fits-all pitch.',
  }
}

export const hasErrors = (errors) => Object.keys(errors).length > 0
export const fieldHasError = (errors, field) => Boolean(errors[field])
export const getFieldError = (errors, field) => errors[field] || ''
