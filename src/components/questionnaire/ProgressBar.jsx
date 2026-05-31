import { motion } from 'framer-motion'
import { FORM_STEPS } from '@utils/constants'

const ProgressBar = ({ currentStep, totalSteps, progressPercent }) => (
  <div className="progress-bar">
    <div className="progress-bar__steps">
      {FORM_STEPS.map(({ step, label }) => (
        <div
          key={step}
          className={`progress-bar__step
            ${step === currentStep ? 'progress-bar__step--active' : ''}
            ${step < currentStep ? 'progress-bar__step--done' : ''}
          `}
        >
          <div className="progress-bar__dot">
            {step < currentStep ? '✓' : step}
          </div>
          <span className="progress-bar__label">{label}</span>
        </div>
      ))}
    </div>

    <div
      className="progress-bar__track"
      role="progressbar"
      aria-valuenow={progressPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      <motion.div
        className="progress-bar__fill"
        initial={{ width: 0 }}
        animate={{ width: `${progressPercent}%` }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>

    <p className="progress-bar__counter">
      Step <strong>{currentStep}</strong> of {totalSteps}
    </p>
  </div>
)

export default ProgressBar

const style = document.createElement('style')
style.textContent = `
.progress-bar {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.progress-bar__steps {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-2);
}
.progress-bar__step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  flex: 1;
}
.progress-bar__dot {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-border);
  background: linear-gradient(180deg, var(--color-bg-white), color-mix(in srgb, var(--color-bg-subtle) 70%, white 30%));
  color: var(--color-text-muted);
  transition: all 0.3s ease;
}
.progress-bar__step--active .progress-bar__dot {
  border-color: var(--color-gold);
  background: linear-gradient(180deg, rgba(34, 182, 255, 0.2), rgba(34, 182, 255, 0.08));
  color: var(--color-gold-dark);
  box-shadow: 0 10px 24px rgba(34, 182, 255, 0.16);
}
.progress-bar__step--done .progress-bar__dot {
  border-color: var(--color-gold);
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
  color: white;
}
.progress-bar__label {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-text-muted);
  text-align: center;
  transition: color 0.3s ease;
}
.progress-bar__step--active .progress-bar__label {
  color: var(--color-gold-dark);
  font-weight: 700;
}
.progress-bar__step--done .progress-bar__label {
  color: var(--color-text-secondary);
}
.progress-bar__track {
  height: 6px;
  background: color-mix(in srgb, var(--color-border) 80%, transparent 20%);
  border-radius: var(--radius-full);
  overflow: hidden;
}
.progress-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
  border-radius: var(--radius-full);
}
.progress-bar__counter {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-align: right;
}
.progress-bar__counter strong {
  color: var(--color-gold-dark);
}
@media (max-width: 480px) {
  .progress-bar__label {
    display: none;
  }
  .progress-bar__dot {
    width: 30px;
    height: 30px;
    font-size: 0.7rem;
  }
}
`
if (!document.head.querySelector('[data-pb-styles]')) {
  style.setAttribute('data-pb-styles', '')
  document.head.appendChild(style)
}
