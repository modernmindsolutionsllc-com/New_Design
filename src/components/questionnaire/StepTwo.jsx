import { motion } from 'framer-motion'
import {
  Bot,
  CalendarClock,
  CalendarDays,
  CreditCard,
  Globe,
  Megaphone,
  Palette,
  Search,
  Smartphone,
  Users2,
  Workflow,
} from 'lucide-react'
import { SERVICE_TYPES, FEATURE_OPTIONS } from '@utils/constants'
import { getFieldError, fieldHasError } from '@utils/formHelpers'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

const PRESENCE_OPTIONS = [
  {
    value: 'yes',
    label: 'Yes, we already have an online presence',
    sub: 'Website, app, social pages, store, or listings already exist.',
  },
  {
    value: 'no',
    label: 'No, we do not have an online presence yet',
    sub: 'We are starting from scratch and need the right setup for growth.',
  },
]

const EXISTING_PROBLEMS = [
  'Not getting enough enquiries',
  'Website looks outdated',
  'People cannot book online',
  'Social media is inconsistent',
  'Google ranking is weak',
  'Follow-up is too manual',
  'Brand does not feel professional',
  'Not sure what to fix first',
]

const IMPROVEMENT_AREAS = [
  'Website',
  'Social media',
  'Branding',
  'SEO',
  'Online booking',
  'Online payments',
  'Automation',
  'Customer experience',
]

const EXISTING_CUSTOMER_GOALS = [
  'Get more enquiries',
  'Book appointments more easily',
  'Trust the business faster',
  'Contact us without friction',
  'Pay online or complete a purchase',
]

const LAUNCH_TYPES = [
  'Business website',
  'Online store',
  'Mobile app',
  'Booking system',
  'Brand identity package',
  'Not sure yet',
]

const HELP_OPTIONS = [
  'Strategy',
  'Design',
  'Development',
  'Marketing',
  'Automation',
  'Launch support',
  'Ongoing maintenance',
]

const FIRST_PRIORITY_OPTIONS = [
  'A professional website',
  'More inquiries and leads',
  'Simple booking or payments',
  'A stronger brand image',
  'Guidance on what to build first',
]

const SERVICE_META = {
  'more-customers': {
    icon: Users2,
    description: 'Bring in more leads, enquiries, and paying customers.',
  },
  website: {
    icon: Globe,
    description: 'Create or improve a professional business website.',
  },
  'mobile-app': {
    icon: Smartphone,
    description: 'Launch an app that improves customer experience or operations.',
  },
  'online-booking': {
    icon: CalendarDays,
    description: 'Let customers book appointments or services online.',
  },
  'social-media-marketing': {
    icon: Megaphone,
    description: 'Grow visibility with content, campaigns, and local reach.',
  },
  branding: {
    icon: Palette,
    description: 'Improve how your business looks and feels to customers.',
  },
  automation: {
    icon: Workflow,
    description: 'Save time with smarter systems and follow-up workflows.',
  },
  'online-payments': {
    icon: CreditCard,
    description: 'Accept payments online in a simple, trusted way.',
  },
  'appointment-system': {
    icon: CalendarClock,
    description: 'Manage appointments, reminders, and availability smoothly.',
  },
  'ai-solutions': {
    icon: Bot,
    description: 'Use AI for support, lead capture, and repetitive tasks.',
  },
  'seo-google-ranking': {
    icon: Search,
    description: 'Show up better on Google and attract local searches.',
  },
}

const hasBranchError = (errors, branch, field) => fieldHasError(errors, `${branch}.${field}`)
const branchError = (errors, branch, field) => getFieldError(errors, `${branch}.${field}`)
const toggleValue = (values = [], value) => values.includes(value)
  ? values.filter((item) => item !== value)
  : [...values, value]

const CheckboxGroup = ({ options, values = [], onToggle }) => (
  <div className="scope-chip-grid">
    {options.map((option) => {
      const checked = values.includes(option)
      return (
        <label key={option} className={`checkbox-item ${checked ? 'checkbox-item--checked' : ''}`}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onToggle(option)}
            className="checkbox-item__input"
          />
          <span className="checkbox-item__box" aria-hidden>{checked ? '✓' : ''}</span>
          <span className="checkbox-item__label">{option}</span>
        </label>
      )
    })}
  </div>
)

const OptionButtons = ({ options, value, onChange }) => (
  <div className="option-cards">
    {options.map((option) => (
      <button
        key={option}
        type="button"
        className={`option-card ${value === option ? 'option-card--selected' : ''}`}
        onClick={() => onChange(option)}
        aria-pressed={value === option}
      >
        {option}
      </button>
    ))}
  </div>
)

const StepTwo = ({ formData, errors, updateField, updateFields, toggleArrayField, clearFieldError }) => {
  const existingAnswers = formData.existingPresenceAnswers || {}
  const newAnswers = formData.newPresenceAnswers || {}
  const hasOnlinePresence = formData.onlinePresenceStatus === 'yes'
  const hasNoOnlinePresence = formData.onlinePresenceStatus === 'no'

  const updateExisting = (field, value) => {
    updateField('existingPresenceAnswers', { ...existingAnswers, [field]: value })
    clearFieldError(`existingPresenceAnswers.${field}`)
  }

  const updateNew = (field, value) => {
    updateField('newPresenceAnswers', { ...newAnswers, [field]: value })
    clearFieldError(`newPresenceAnswers.${field}`)
  }

  const handlePresenceChange = (value) => {
    updateFields({
      onlinePresenceStatus: value,
      existingPresenceAnswers: value === 'yes'
        ? existingAnswers
        : { biggestProblem: [], customerGoal: '', improveFirst: [] },
      newPresenceAnswers: value === 'no'
        ? newAnswers
        : { launchType: '', firstPriority: '', helpNeeded: [], essentialFeatures: [] },
    })
    clearFieldError('onlinePresenceStatus')
  }

  return (
    <motion.div className="form-step" variants={STAGGER_CONTAINER} initial="hidden" animate="visible">
      <motion.div className="form-step__header" variants={FADE_UP}>
        <h2 className="form-step__title">What are you looking for right now?</h2>
        <p className="form-step__sub">
          Choose the outcomes you care about most. We&apos;ll turn that into a practical plan for your business.
        </p>
      </motion.div>

      <motion.div className="form-step__fields" variants={FADE_UP}>
        <div className={`form-field ${fieldHasError(errors, 'serviceTypes') ? 'form-field--error' : ''}`}>
          <label className="form-field__label">
            Which goals or services matter most right now?
            <span className="form-field__required">*</span>
            <span className="form-field__hint">Select all that apply</span>
          </label>
          <div className="service-type-grid">
            {SERVICE_TYPES.map(({ id, label }) => {
              const selected = formData.serviceTypes.includes(id)
              const meta = SERVICE_META[id]
              const Icon = meta?.icon || Users2
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
                  <span className="service-type-card__icon" aria-hidden><Icon size={18} /></span>
                  <span className="service-type-card__label">{label}</span>
                  <span className="service-type-card__desc">{meta?.description}</span>
                </button>
              )
            })}
          </div>
          {fieldHasError(errors, 'serviceTypes') && (
            <span className="form-field__error">{getFieldError(errors, 'serviceTypes')}</span>
          )}
        </div>

        <div className={`form-field ${fieldHasError(errors, 'onlinePresenceStatus') ? 'form-field--error' : ''}`}>
          <label className="form-field__label">
            Do you already have an online presence for your business?
            <span className="form-field__required">*</span>
          </label>
          <div className="radio-group">
            {PRESENCE_OPTIONS.map(({ value, label, sub }) => (
              <label key={value} className={`radio-card ${formData.onlinePresenceStatus === value ? 'radio-card--selected' : ''}`}>
                <input
                  type="radio"
                  name="onlinePresenceStatus"
                  value={value}
                  checked={formData.onlinePresenceStatus === value}
                  onChange={() => handlePresenceChange(value)}
                  className="radio-card__input"
                />
                <div>
                  <div className="radio-card__label">{label}</div>
                  <div className="radio-card__sub">{sub}</div>
                </div>
              </label>
            ))}
          </div>
          {fieldHasError(errors, 'onlinePresenceStatus') && (
            <span className="form-field__error">{getFieldError(errors, 'onlinePresenceStatus')}</span>
          )}
        </div>

        {hasOnlinePresence && (
          <div className="scope-section">
            <div className="scope-section__header">
              <h3 className="scope-section__title">What is slowing your growth right now?</h3>
              <p className="scope-section__sub">
                Help us understand the main pain points so we can recommend the right improvements first.
              </p>
            </div>

            <div className={`form-field ${hasBranchError(errors, 'existingPresenceAnswers', 'biggestProblem') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                What feels most frustrating about your current setup?
                <span className="form-field__required">*</span>
              </label>
              <CheckboxGroup
                options={EXISTING_PROBLEMS}
                values={existingAnswers.biggestProblem}
                onToggle={(value) => updateExisting('biggestProblem', toggleValue(existingAnswers.biggestProblem, value))}
              />
              {hasBranchError(errors, 'existingPresenceAnswers', 'biggestProblem') && (
                <span className="form-field__error">{branchError(errors, 'existingPresenceAnswers', 'biggestProblem')}</span>
              )}
            </div>

            <div className={`form-field ${hasBranchError(errors, 'existingPresenceAnswers', 'customerGoal') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                What do you want customers to be able to do more easily?
                <span className="form-field__required">*</span>
              </label>
              <OptionButtons
                options={EXISTING_CUSTOMER_GOALS}
                value={existingAnswers.customerGoal}
                onChange={(value) => updateExisting('customerGoal', value)}
              />
              {hasBranchError(errors, 'existingPresenceAnswers', 'customerGoal') && (
                <span className="form-field__error">{branchError(errors, 'existingPresenceAnswers', 'customerGoal')}</span>
              )}
            </div>

            <div className={`form-field ${hasBranchError(errors, 'existingPresenceAnswers', 'improveFirst') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                Where should we focus first?
                <span className="form-field__hint">Optional</span>
              </label>
              <CheckboxGroup
                options={IMPROVEMENT_AREAS}
                values={existingAnswers.improveFirst}
                onToggle={(value) => updateExisting('improveFirst', toggleValue(existingAnswers.improveFirst, value))}
              />
              {hasBranchError(errors, 'existingPresenceAnswers', 'improveFirst') && (
                <span className="form-field__error">{branchError(errors, 'existingPresenceAnswers', 'improveFirst')}</span>
              )}
            </div>
          </div>
        )}

        {hasNoOnlinePresence && (
          <div className="scope-section">
            <div className="scope-section__header">
              <h3 className="scope-section__title">What do you want to launch first?</h3>
              <p className="scope-section__sub">
                We&apos;ll shape the first version around what matters most for your customers and your business goals.
              </p>
            </div>

            <div className={`form-field ${hasBranchError(errors, 'newPresenceAnswers', 'launchType') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                What do you want to launch first?
                <span className="form-field__required">*</span>
              </label>
              <OptionButtons options={LAUNCH_TYPES} value={newAnswers.launchType} onChange={(value) => updateNew('launchType', value)} />
              {hasBranchError(errors, 'newPresenceAnswers', 'launchType') && (
                <span className="form-field__error">{branchError(errors, 'newPresenceAnswers', 'launchType')}</span>
              )}
            </div>

            <div className={`form-field ${hasBranchError(errors, 'newPresenceAnswers', 'firstPriority') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                What would help your business most at the beginning?
                <span className="form-field__required">*</span>
              </label>
              <OptionButtons
                options={FIRST_PRIORITY_OPTIONS}
                value={newAnswers.firstPriority}
                onChange={(value) => updateNew('firstPriority', value)}
              />
              {hasBranchError(errors, 'newPresenceAnswers', 'firstPriority') && (
                <span className="form-field__error">{branchError(errors, 'newPresenceAnswers', 'firstPriority')}</span>
              )}
            </div>

            <div className={`form-field ${hasBranchError(errors, 'newPresenceAnswers', 'helpNeeded') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                What kind of help do you want from us?
                <span className="form-field__hint">Optional</span>
              </label>
              <CheckboxGroup
                options={HELP_OPTIONS}
                values={newAnswers.helpNeeded}
                onToggle={(value) => updateNew('helpNeeded', toggleValue(newAnswers.helpNeeded, value))}
              />
              {hasBranchError(errors, 'newPresenceAnswers', 'helpNeeded') && (
                <span className="form-field__error">{branchError(errors, 'newPresenceAnswers', 'helpNeeded')}</span>
              )}
            </div>

            <div className="form-field">
              <label className="form-field__label">Which features would be most helpful in your first version?</label>
              <CheckboxGroup
                options={FEATURE_OPTIONS}
                values={newAnswers.essentialFeatures}
                onToggle={(value) => updateNew('essentialFeatures', toggleValue(newAnswers.essentialFeatures, value))}
              />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default StepTwo

const style = document.createElement('style')
style.textContent = `
.service-type-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-2);
}
.service-type-card {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: var(--space-3) var(--space-4);
  align-items: start;
  padding: var(--space-5);
  background: color-mix(in srgb, var(--color-bg-white) 92%, var(--color-bg-subtle) 8%);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: var(--transition-base);
  text-align: left;
}
.service-type-card:hover {
  border-color: var(--color-gold-border);
  box-shadow: var(--shadow-sm);
  transform: translateY(-1px);
}
.service-type-card--selected {
  border-color: var(--color-gold) !important;
  background: linear-gradient(180deg, rgba(34, 182, 255, 0.12), rgba(34, 182, 255, 0.05)) !important;
  box-shadow: 0 12px 30px rgba(34, 182, 255, 0.12);
}
.service-type-card__icon {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gold-subtle);
  border: 1px solid var(--color-gold-border);
  color: var(--color-gold);
  grid-row: span 2;
}
.service-type-card__label {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.35;
}
.service-type-card__desc {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  line-height: 1.55;
}
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-2);
}
.radio-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background: color-mix(in srgb, var(--color-bg-white) 92%, var(--color-bg-subtle) 8%);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: var(--transition-base);
}
.radio-card:hover {
  border-color: var(--color-gold-border);
}
.radio-card--selected {
  border-color: var(--color-gold);
  background: linear-gradient(180deg, rgba(34, 182, 255, 0.12), rgba(34, 182, 255, 0.05));
}
.radio-card__input {
  accent-color: var(--color-gold);
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-top: 2px;
}
.radio-card__label {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  font-family: var(--font-body);
}
.radio-card__sub {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: 4px;
  line-height: 1.6;
  font-family: var(--font-body);
}
.scope-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  margin-top: var(--space-3);
  padding: clamp(1.35rem, 2vw, 2rem);
  background: linear-gradient(180deg, color-mix(in srgb, var(--color-bg-subtle) 82%, white 18%), color-mix(in srgb, var(--color-bg-white) 88%, var(--color-bg-subtle) 12%));
  border: 1px solid var(--color-border);
  border-radius: 28px;
  box-shadow: 0 18px 44px rgba(15, 23, 42, 0.06);
  position: relative;
  overflow: hidden;
}
.scope-section::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  background: linear-gradient(180deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
}
.scope-section > .form-field {
  padding: var(--space-5);
  background: color-mix(in srgb, var(--color-bg-white) 86%, transparent 14%);
  border: 1px solid color-mix(in srgb, var(--color-border) 85%, white 15%);
  border-radius: 22px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.7);
}
.scope-section__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: 0 var(--space-2) 0 calc(var(--space-3) + 4px);
}
.scope-section__title {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  font-weight: 700;
  color: var(--color-text-primary);
}
.scope-section__sub {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.65;
}
.option-cards {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-3);
}
.option-card {
  padding: var(--space-3) var(--space-5);
  background: var(--color-bg-white);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  transition: var(--transition-base);
}
.option-card:hover {
  border-color: var(--color-gold-border);
  color: var(--color-gold-dark);
}
.option-card--selected {
  border-color: var(--color-gold) !important;
  background: var(--color-gold-subtle) !important;
  color: var(--color-gold-dark) !important;
  font-weight: 700;
}
.scope-chip-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
  margin-top: var(--space-3);
}
.checkbox-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--color-bg-white);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: var(--transition-base);
}
.checkbox-item:hover {
  border-color: var(--color-gold-border);
}
.checkbox-item--checked {
  border-color: var(--color-gold);
  background: linear-gradient(180deg, rgba(34, 182, 255, 0.12), rgba(34, 182, 255, 0.05));
}
.checkbox-item__input {
  display: none;
}
.checkbox-item__box {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1.5px solid var(--color-border);
  background: var(--color-bg-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 800;
  color: var(--color-bg-dark);
  flex-shrink: 0;
  transition: var(--transition-base);
}
.checkbox-item--checked .checkbox-item__box {
  border-color: var(--color-gold);
  background: var(--color-gold);
}
.checkbox-item__label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
  line-height: 1.45;
}
.checkbox-item--checked .checkbox-item__label {
  color: var(--color-text-primary);
}
@media (max-width: 900px) {
  .service-type-grid,
  .scope-chip-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 640px) {
  .scope-section {
    padding: var(--space-4);
  }
  .scope-section > .form-field {
    padding: var(--space-4);
  }
  .option-cards {
    gap: var(--space-2);
  }
  .option-card {
    width: 100%;
    text-align: left;
  }
}
`
if (!document.head.querySelector('[data-step2-styles]')) {
  style.setAttribute('data-step2-styles', '')
  document.head.appendChild(style)
}
