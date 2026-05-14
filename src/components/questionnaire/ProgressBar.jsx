import { motion } from 'framer-motion'
import { FORM_STEPS } from '@utils/constants'

/**
 * ProgressBar
 * Shows current step number, step label, and a gold fill bar.
 *
 * Props:
 *  currentStep     — 1-4
 *  totalSteps      — 4
 *  progressPercent — 0-100
 */
const ProgressBar = ({ currentStep, totalSteps, progressPercent }) => (
  <div className="progress-bar">
    {/* Step labels row */}
    <div className="progress-bar__steps">
      {FORM_STEPS.map(({ step, label }) => (
        <div
          key={step}
          className={`progress-bar__step
            ${step === currentStep ? 'progress-bar__step--active' : ''}
            ${step < currentStep  ? 'progress-bar__step--done'   : ''}
          `}
        >
          <div className="progress-bar__dot">
            {step < currentStep ? '✓' : step}
          </div>
          <span className="progress-bar__label">{label}</span>
        </div>
      ))}
    </div>

    {/* Gold fill track */}
    <div className="progress-bar__track" role="progressbar"
      aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}
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
.progress-bar { display: flex; flex-direction: column; gap: var(--space-4); }

/* Step dots + labels */
.progress-bar__steps {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: var(--space-2);
}
.progress-bar__step {
  display: flex; flex-direction: column; align-items: center;
  gap: var(--space-2); flex: 1;
}
.progress-bar__dot {
  width: 32px; height: 32px; border-radius: 50%;
  font-family: var(--font-body); font-size: var(--text-sm); font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid var(--color-border);
  background: var(--color-bg-white);
  color: var(--color-text-muted);
  transition: all 0.3s ease;
}
.progress-bar__step--active .progress-bar__dot {
  border-color: var(--color-gold);
  background: var(--color-gold-subtle);
  color: var(--color-gold-dark);
}
.progress-bar__step--done .progress-bar__dot {
  border-color: var(--color-gold);
  background: var(--color-gold);
  color: var(--color-bg-dark);
}
.progress-bar__label {
  font-family: var(--font-body); font-size: var(--text-xs); font-weight: 500;
  color: var(--color-text-muted); text-align: center;
  transition: color 0.3s ease;
}
.progress-bar__step--active .progress-bar__label { color: var(--color-gold-dark); font-weight: 700; }
.progress-bar__step--done  .progress-bar__label  { color: var(--color-text-secondary); }

/* Track */
.progress-bar__track {
  height: 4px; background: var(--color-border);
  border-radius: var(--radius-full); overflow: hidden;
}
.progress-bar__fill {
  height: 100%; background: var(--color-gold);
  border-radius: var(--radius-full);
}

/* Counter */
.progress-bar__counter {
  font-family: var(--font-body); font-size: var(--text-xs);
  color: var(--color-text-muted); text-align: right;
}
.progress-bar__counter strong { color: var(--color-gold-dark); }

@media (max-width: 480px) {
  .progress-bar__label { display: none; }
  .progress-bar__dot   { width: 28px; height: 28px; font-size: 0.7rem; }
}
`
if (!document.head.querySelector('[data-pb-styles]')) {
  style.setAttribute('data-pb-styles', '')
  document.head.appendChild(style)
}
