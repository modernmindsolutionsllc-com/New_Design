import { motion } from 'framer-motion'
import { SERVICE_TYPES, FEATURE_OPTIONS } from '@utils/constants'
import { getFieldError, fieldHasError } from '@utils/formHelpers'
import { STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

const PRESENCE_OPTIONS = [
  { value: 'yes', label: 'Yes, we already have an online presence', sub: 'Website, app, social pages, store, or listings already exist' },
  { value: 'no', label: 'No, we do not have an online presence yet', sub: 'We need to plan and launch from the ground up' },
]

const EXISTING_PRESENCE_TYPES = [
  'Website',
  'Mobile app',
  'E-commerce store',
  'Social media pages',
  'Google Business Profile',
  'Marketplace listing',
  'Oracle / internal portal',
  'Other',
]

const TRAFFIC_RANGES = [
  'Not sure',
  'Under 500 visits/month',
  '500 - 2,000 visits/month',
  '2,000 - 10,000 visits/month',
  '10,000+ visits/month',
]

const TRAFFIC_GOALS = [
  'Local customers',
  'National / international visitors',
  'B2B leads',
  'E-commerce buyers',
  'App users',
  'HR / internal users',
  'Social media audience',
]

const TRAFFIC_SOURCES = [
  'Google search',
  'Social media',
  'Paid ads',
  'Referrals',
  'Email',
  'Direct visits',
  'Marketplaces',
  'Not sure',
]

const EXISTING_PROBLEMS = [
  'Low traffic',
  'Poor design',
  'Slow website',
  'Bad mobile experience',
  'Low leads / sales',
  'Weak SEO',
  'Outdated content',
  'Hard to manage',
  'Missing features',
]

const IMPROVEMENT_AREAS = [
  'Design',
  'Traffic / SEO',
  'Conversion rate',
  'Speed',
  'Mobile experience',
  'Content',
  'Features',
  'Automation',
  'Integrations',
  'Maintenance',
]

const TRACKING_TOOLS = [
  'Google Analytics',
  'Google Search Console',
  'Meta Pixel',
  'CRM',
  'Sales dashboard',
  'No tracking yet',
  'Not sure',
]

const LAUNCH_TYPES = [
  'Business website',
  'Web app',
  'Mobile app',
  'E-commerce store',
  'AI automation workflow',
  'UI/UX prototype',
  'Oracle HCM setup',
  'Not sure yet',
]

const NEW_PROJECT_GOALS = [
  'Generate leads',
  'Sell products / services',
  'Automate operations',
  'Build an MVP',
  'Improve internal workflows',
  'Support HR operations',
  'Validate an idea',
  'Modernize brand presence',
]

const BRAND_READINESS = [
  'Yes, everything is ready',
  'We have some pieces',
  'No, we need help',
  'Not sure yet',
]

const INTEGRATION_OPTIONS = [
  'CRM',
  'Email marketing',
  'Payments',
  'Calendar',
  'WhatsApp',
  'ERP / HR system',
  'Oracle Fusion HCM',
  'Google Sheets',
  'Slack / Teams',
  'None yet',
]

const HELP_OPTIONS = [
  'Strategy',
  'UX/UI design',
  'Development',
  'AI automation',
  'Oracle consulting',
  'Launch support',
  'Maintenance',
  'Hosting / deployment',
]

const hasBranchError = (errors, branch, field) => fieldHasError(errors, `${branch}.${field}`)
const branchError = (errors, branch, field) => getFieldError(errors, `${branch}.${field}`)

const toggleValue = (values = [], value) =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value]

const CheckboxGroup = ({ options, values = [], onToggle, columns = false }) => (
  <div className={columns ? 'checkbox-grid' : 'scope-chip-grid'}>
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
          <span className="checkbox-item__box" aria-hidden>{checked ? 'OK' : ''}</span>
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

const StepTwo = ({ formData, errors, updateField, toggleArrayField, clearFieldError }) => {
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

  const toggleExisting = (field, value) => {
    updateExisting(field, toggleValue(existingAnswers[field], value))
  }

  const toggleNew = (field, value) => {
    updateNew(field, toggleValue(newAnswers[field], value))
  }

  return (
    <motion.div className="form-step" variants={STAGGER_CONTAINER} initial="hidden" animate="visible">
      <motion.div className="form-step__header" variants={FADE_UP}>
        <h2 className="form-step__title">Define your project scope</h2>
        <p className="form-step__sub">
          Tell us what you need built, then we will ask the right follow-up questions.
        </p>
      </motion.div>

      <motion.div className="form-step__fields" variants={FADE_UP}>
        <div className={`form-field ${fieldHasError(errors, 'serviceTypes') ? 'form-field--error' : ''}`}>
          <label className="form-field__label">
            What do you need built?
            <span className="form-field__required">*</span>
            <span className="form-field__hint"> - select all that apply</span>
          </label>
          <div className="service-type-grid">
            {SERVICE_TYPES.map(({ id, label, emoji }) => {
              const selected = formData.serviceTypes.includes(id)
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
                  <span className="service-type-card__emoji" aria-hidden>{emoji}</span>
                  <span className="service-type-card__label">{label}</span>
                  {selected && <span className="service-type-card__check" aria-hidden>OK</span>}
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
              <label
                key={value}
                className={`radio-card ${formData.onlinePresenceStatus === value ? 'radio-card--selected' : ''}`}
              >
                <input
                  type="radio"
                  name="onlinePresenceStatus"
                  value={value}
                  checked={formData.onlinePresenceStatus === value}
                  onChange={() => {
                    updateField('onlinePresenceStatus', value)
                    clearFieldError('onlinePresenceStatus')
                  }}
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
              <h3 className="scope-section__title">Existing online presence</h3>
              <p className="scope-section__sub">Help us understand what is live today and where growth is stuck.</p>
            </div>

            <div className={`form-field ${hasBranchError(errors, 'existingPresenceAnswers', 'currentPresence') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                1. What is your current online presence?
                <span className="form-field__required">*</span>
              </label>
              <CheckboxGroup
                options={EXISTING_PRESENCE_TYPES}
                values={existingAnswers.currentPresence}
                onToggle={(value) => toggleExisting('currentPresence', value)}
                columns
              />
              {hasBranchError(errors, 'existingPresenceAnswers', 'currentPresence') && (
                <span className="form-field__error">{branchError(errors, 'existingPresenceAnswers', 'currentPresence')}</span>
              )}
            </div>

            <div className="form-field">
              <label className="form-field__label" htmlFor="mainLink">
                2. What is the link to your current website or main online page?
                <span className="form-field__optional">(optional)</span>
              </label>
              <input
                id="mainLink"
                type="url"
                className="form-field__input"
                placeholder="https://yourwebsite.com or social profile link"
                value={existingAnswers.mainLink || ''}
                onChange={(e) => updateExisting('mainLink', e.target.value)}
              />
            </div>

            <div className={`form-field ${hasBranchError(errors, 'existingPresenceAnswers', 'currentTraffic') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                3. How much traffic do you currently get?
                <span className="form-field__required">*</span>
              </label>
              <OptionButtons
                options={TRAFFIC_RANGES}
                value={existingAnswers.currentTraffic}
                onChange={(value) => updateExisting('currentTraffic', value)}
              />
              {hasBranchError(errors, 'existingPresenceAnswers', 'currentTraffic') && (
                <span className="form-field__error">{branchError(errors, 'existingPresenceAnswers', 'currentTraffic')}</span>
              )}
            </div>

            <div className={`form-field ${hasBranchError(errors, 'existingPresenceAnswers', 'wantsTrafficIncrease') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                4. Do you want to increase your traffic?
                <span className="form-field__required">*</span>
              </label>
              <OptionButtons
                options={['Yes', 'No', 'Not sure yet']}
                value={existingAnswers.wantsTrafficIncrease}
                onChange={(value) => updateExisting('wantsTrafficIncrease', value)}
              />
              {hasBranchError(errors, 'existingPresenceAnswers', 'wantsTrafficIncrease') && (
                <span className="form-field__error">{branchError(errors, 'existingPresenceAnswers', 'wantsTrafficIncrease')}</span>
              )}
            </div>

            <div className="form-field">
              <label className="form-field__label">5. What kind of traffic do you want more of?</label>
              <CheckboxGroup
                options={TRAFFIC_GOALS}
                values={existingAnswers.desiredTraffic}
                onToggle={(value) => toggleExisting('desiredTraffic', value)}
              />
            </div>

            <div className="form-field">
              <label className="form-field__label">6. Where does most of your traffic come from today?</label>
              <CheckboxGroup
                options={TRAFFIC_SOURCES}
                values={existingAnswers.trafficSources}
                onToggle={(value) => toggleExisting('trafficSources', value)}
              />
            </div>

            <div className={`form-field ${hasBranchError(errors, 'existingPresenceAnswers', 'biggestProblem') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                7. What is the biggest problem with your current online presence?
                <span className="form-field__required">*</span>
              </label>
              <CheckboxGroup
                options={EXISTING_PROBLEMS}
                values={existingAnswers.biggestProblem}
                onToggle={(value) => toggleExisting('biggestProblem', value)}
                columns
              />
              {hasBranchError(errors, 'existingPresenceAnswers', 'biggestProblem') && (
                <span className="form-field__error">{branchError(errors, 'existingPresenceAnswers', 'biggestProblem')}</span>
              )}
            </div>

            <div className={`form-field ${hasBranchError(errors, 'existingPresenceAnswers', 'improveFirst') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                8. What do you want us to improve first?
                <span className="form-field__required">*</span>
              </label>
              <CheckboxGroup
                options={IMPROVEMENT_AREAS}
                values={existingAnswers.improveFirst}
                onToggle={(value) => toggleExisting('improveFirst', value)}
                columns
              />
              {hasBranchError(errors, 'existingPresenceAnswers', 'improveFirst') && (
                <span className="form-field__error">{branchError(errors, 'existingPresenceAnswers', 'improveFirst')}</span>
              )}
            </div>

            <div className="form-field">
              <label className="form-field__label">9. Are you tracking traffic or conversions right now?</label>
              <CheckboxGroup
                options={TRACKING_TOOLS}
                values={existingAnswers.trackingTools}
                onToggle={(value) => toggleExisting('trackingTools', value)}
              />
            </div>

            <div className={`form-field ${hasBranchError(errors, 'existingPresenceAnswers', 'successMetric') ? 'form-field--error' : ''}`}>
              <label className="form-field__label" htmlFor="existingSuccessMetric">
                10. What would success look like after we improve your online presence?
                <span className="form-field__required">*</span>
              </label>
              <textarea
                id="existingSuccessMetric"
                className="form-field__input form-field__textarea"
                rows={4}
                placeholder="Example: More qualified leads, more calls, higher sales, faster website, or stronger brand trust."
                value={existingAnswers.successMetric || ''}
                onChange={(e) => updateExisting('successMetric', e.target.value)}
                onFocus={() => clearFieldError('existingPresenceAnswers.successMetric')}
              />
              {hasBranchError(errors, 'existingPresenceAnswers', 'successMetric') && (
                <span className="form-field__error">{branchError(errors, 'existingPresenceAnswers', 'successMetric')}</span>
              )}
            </div>
          </div>
        )}

        {hasNoOnlinePresence && (
          <div className="scope-section">
            <div className="scope-section__header">
              <h3 className="scope-section__title">New online presence</h3>
              <p className="scope-section__sub">Help us shape the first version around the right audience and outcome.</p>
            </div>

            <div className={`form-field ${hasBranchError(errors, 'newPresenceAnswers', 'launchType') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                1. What do you want to launch online?
                <span className="form-field__required">*</span>
              </label>
              <OptionButtons
                options={LAUNCH_TYPES}
                value={newAnswers.launchType}
                onChange={(value) => updateNew('launchType', value)}
              />
              {hasBranchError(errors, 'newPresenceAnswers', 'launchType') && (
                <span className="form-field__error">{branchError(errors, 'newPresenceAnswers', 'launchType')}</span>
              )}
            </div>

            <div className={`form-field ${hasBranchError(errors, 'newPresenceAnswers', 'mainGoal') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                2. What is the main goal of this new online presence?
                <span className="form-field__required">*</span>
              </label>
              <OptionButtons
                options={NEW_PROJECT_GOALS}
                value={newAnswers.mainGoal}
                onChange={(value) => updateNew('mainGoal', value)}
              />
              {hasBranchError(errors, 'newPresenceAnswers', 'mainGoal') && (
                <span className="form-field__error">{branchError(errors, 'newPresenceAnswers', 'mainGoal')}</span>
              )}
            </div>

            <div className={`form-field ${hasBranchError(errors, 'newPresenceAnswers', 'primaryAudience') ? 'form-field--error' : ''}`}>
              <label className="form-field__label" htmlFor="primaryAudience">
                3. Who is your primary audience?
                <span className="form-field__required">*</span>
              </label>
              <textarea
                id="primaryAudience"
                className="form-field__input form-field__textarea"
                rows={3}
                placeholder="Example: Local homeowners, startup founders, HR managers, patients, students, or internal staff."
                value={newAnswers.primaryAudience || ''}
                onChange={(e) => updateNew('primaryAudience', e.target.value)}
                onFocus={() => clearFieldError('newPresenceAnswers.primaryAudience')}
              />
              {hasBranchError(errors, 'newPresenceAnswers', 'primaryAudience') && (
                <span className="form-field__error">{branchError(errors, 'newPresenceAnswers', 'primaryAudience')}</span>
              )}
            </div>

            <div className={`form-field ${hasBranchError(errors, 'newPresenceAnswers', 'dayOneActions') ? 'form-field--error' : ''}`}>
              <label className="form-field__label" htmlFor="dayOneActions">
                4. What should visitors or users be able to do on day one?
                <span className="form-field__required">*</span>
              </label>
              <textarea
                id="dayOneActions"
                className="form-field__input form-field__textarea"
                rows={3}
                placeholder="Example: Book a call, buy a product, create an account, submit a form, or view HR information."
                value={newAnswers.dayOneActions || ''}
                onChange={(e) => updateNew('dayOneActions', e.target.value)}
                onFocus={() => clearFieldError('newPresenceAnswers.dayOneActions')}
              />
              {hasBranchError(errors, 'newPresenceAnswers', 'dayOneActions') && (
                <span className="form-field__error">{branchError(errors, 'newPresenceAnswers', 'dayOneActions')}</span>
              )}
            </div>

            <div className={`form-field ${hasBranchError(errors, 'newPresenceAnswers', 'essentialFeatures') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                5. Which features feel essential for the first version?
                <span className="form-field__required">*</span>
              </label>
              <CheckboxGroup
                options={FEATURE_OPTIONS}
                values={newAnswers.essentialFeatures}
                onToggle={(value) => toggleNew('essentialFeatures', value)}
                columns
              />
              {hasBranchError(errors, 'newPresenceAnswers', 'essentialFeatures') && (
                <span className="form-field__error">{branchError(errors, 'newPresenceAnswers', 'essentialFeatures')}</span>
              )}
            </div>

            <div className="form-field">
              <label className="form-field__label">6. Do you already have branding, content, or designs?</label>
              <OptionButtons
                options={BRAND_READINESS}
                value={newAnswers.brandReadiness}
                onChange={(value) => updateNew('brandReadiness', value)}
              />
            </div>

            <div className="form-field">
              <label className="form-field__label" htmlFor="inspirationLinks">
                7. Do you have example websites, apps, or competitors you like?
                <span className="form-field__optional">(optional)</span>
              </label>
              <textarea
                id="inspirationLinks"
                className="form-field__input form-field__textarea"
                rows={3}
                placeholder="Paste links or describe examples that feel close to what you want."
                value={newAnswers.inspirationLinks || ''}
                onChange={(e) => updateNew('inspirationLinks', e.target.value)}
              />
            </div>

            <div className="form-field">
              <label className="form-field__label">8. What business tools should this connect with?</label>
              <CheckboxGroup
                options={INTEGRATION_OPTIONS}
                values={newAnswers.integrations}
                onToggle={(value) => toggleNew('integrations', value)}
                columns
              />
            </div>

            <div className={`form-field ${hasBranchError(errors, 'newPresenceAnswers', 'helpNeeded') ? 'form-field--error' : ''}`}>
              <label className="form-field__label">
                9. What level of help do you need from ModernMind?
                <span className="form-field__required">*</span>
              </label>
              <CheckboxGroup
                options={HELP_OPTIONS}
                values={newAnswers.helpNeeded}
                onToggle={(value) => toggleNew('helpNeeded', value)}
                columns
              />
              {hasBranchError(errors, 'newPresenceAnswers', 'helpNeeded') && (
                <span className="form-field__error">{branchError(errors, 'newPresenceAnswers', 'helpNeeded')}</span>
              )}
            </div>

            <div className={`form-field ${hasBranchError(errors, 'newPresenceAnswers', 'successMetric') ? 'form-field--error' : ''}`}>
              <label className="form-field__label" htmlFor="newSuccessMetric">
                10. What would make this project successful 3 months after launch?
                <span className="form-field__required">*</span>
              </label>
              <textarea
                id="newSuccessMetric"
                className="form-field__input form-field__textarea"
                rows={4}
                placeholder="Example: More leads, online sales, a launched MVP, smoother operations, or clearer HR workflows."
                value={newAnswers.successMetric || ''}
                onChange={(e) => updateNew('successMetric', e.target.value)}
                onFocus={() => clearFieldError('newPresenceAnswers.successMetric')}
              />
              {hasBranchError(errors, 'newPresenceAnswers', 'successMetric') && (
                <span className="form-field__error">{branchError(errors, 'newPresenceAnswers', 'successMetric')}</span>
              )}
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
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
  margin-top: var(--space-2);
}
.service-type-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-3);
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-base);
  position: relative;
  font-family: var(--font-body);
  text-align: center;
}
.service-type-card:hover {
  border-color: var(--color-gold-border);
  background: var(--color-gold-subtle);
}
.service-type-card--selected {
  border-color: var(--color-gold) !important;
  background: var(--color-gold-subtle) !important;
}
.service-type-card__emoji {
  font-size: 1.1rem;
  font-weight: 700;
}
.service-type-card__label {
  font-size: var(--text-xs);
  font-weight: 600;
  color: var(--color-text-secondary);
  line-height: 1.3;
}
.service-type-card--selected .service-type-card__label {
  color: var(--color-gold-dark);
}
.service-type-card__check {
  position: absolute;
  top: 6px;
  right: 8px;
  font-size: 0.58rem;
  font-weight: 700;
  color: var(--color-gold);
  background: var(--color-bg-white);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--color-gold);
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-2);
}
.radio-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-base);
}
.radio-card:hover {
  border-color: var(--color-gold-border);
  background: var(--color-gold-subtle);
}
.radio-card--selected {
  border-color: var(--color-gold);
  background: var(--color-gold-subtle);
}
.radio-card__input {
  accent-color: var(--color-gold);
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
.radio-card__label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  font-family: var(--font-body);
}
.radio-card__sub {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: 2px;
  font-family: var(--font-body);
}

.scope-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
  padding: var(--space-6);
  background: color-mix(in srgb, var(--color-bg-subtle) 70%, transparent 30%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}
.scope-section__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.scope-section__title {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-text-primary);
}
.scope-section__sub {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.option-cards {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-2);
}
.option-card {
  padding: var(--space-3) var(--space-5);
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-full);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 500;
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

.scope-chip-grid,
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
  margin-top: var(--space-2);
}
.scope-chip-grid {
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
}
.checkbox-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--color-bg);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-base);
}
.checkbox-item:hover {
  border-color: var(--color-gold-border);
}
.checkbox-item--checked {
  border-color: var(--color-gold);
  background: var(--color-gold-subtle);
}
.checkbox-item__input {
  display: none;
}
.checkbox-item__box {
  width: 20px;
  height: 20px;
  border-radius: var(--radius-sm);
  border: 2px solid var(--color-border);
  background: var(--color-bg-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.58rem;
  font-weight: 900;
  color: var(--color-gold);
  flex-shrink: 0;
  transition: var(--transition-base);
}
.checkbox-item--checked .checkbox-item__box {
  border-color: var(--color-gold);
  background: var(--color-gold);
  color: var(--color-bg-dark);
}
.checkbox-item__label {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-secondary);
  font-family: var(--font-body);
}
.checkbox-item--checked .checkbox-item__label {
  color: var(--color-gold-dark);
  font-weight: 600;
}

@media (max-width: 640px) {
  .service-type-grid,
  .checkbox-grid,
  .scope-chip-grid {
    grid-template-columns: 1fr;
  }
  .scope-section {
    padding: var(--space-5);
  }
}
`
if (!document.head.querySelector('[data-step2-styles]')) {
  style.setAttribute('data-step2-styles', '')
  document.head.appendChild(style)
}
