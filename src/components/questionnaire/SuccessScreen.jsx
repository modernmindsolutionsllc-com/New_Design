import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL, COMPANY_NAME, STAGGER_CONTAINER, FADE_UP } from '@utils/constants'

/**
 * SuccessScreen — shown after successful form submission.
 * Props:
 *  clientName — pulled from formData.name to personalise the message
 *  onReset    — resets the form if user wants to submit another
 */
const SuccessScreen = ({ clientName, onReset }) => (
  <motion.div
    className="success-screen"
    variants={STAGGER_CONTAINER}
    initial="hidden"
    animate="visible"
  >
    {/* Animated checkmark */}
    <motion.div
      className="success-screen__icon-wrap"
      variants={FADE_UP}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
    >
      <CheckCircle2 size={56} className="success-screen__icon" />
    </motion.div>

    <motion.div className="success-screen__content" variants={FADE_UP}>
      <h2 className="success-screen__heading">
        We've got it{clientName ? `, ${clientName.split(' ')[0]}` : ''}! 🎉
      </h2>
      <p className="success-screen__message">
        Your project brief is with us. Our team will review it and get back to
        you within <strong>24 hours</strong> — usually much sooner.
      </p>
    </motion.div>

    {/* What happens next */}
    <motion.div className="success-screen__next" variants={FADE_UP}>
      <h3 className="success-screen__next-heading">What happens next?</h3>
      <ol className="success-screen__steps">
        {[
          'We review your brief and understand your goals.',
          'We put together a clear proposal with scope, timeline, and cost.',
          'We send it to you — no jargon, no surprises.',
        ].map((step, i) => (
          <li key={i} className="success-screen__step">
            <span className="success-screen__step-num">{i + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </motion.div>

    {/* Actions */}
    <motion.div className="success-screen__actions" variants={FADE_UP}>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--primary btn--lg success-screen__whatsapp"
      >
        <MessageCircle size={18} />
        Chat on WhatsApp Instead
      </a>
      <Link to="/" className="btn btn--ghost btn--lg">
        Back to Home <ArrowRight size={16} />
      </Link>
    </motion.div>

    {/* Submit another */}
    <motion.p className="success-screen__reset" variants={FADE_UP}>
      Need to submit a different project?{' '}
      <button type="button" onClick={onReset} className="success-screen__reset-btn">
        Start over
      </button>
    </motion.p>
  </motion.div>
)

export default SuccessScreen

const style = document.createElement('style')
style.textContent = `
.success-screen {
  display: flex; flex-direction: column; align-items: center;
  gap: var(--space-8); text-align: center;
  padding: var(--space-12) var(--space-8);
}
.success-screen__icon-wrap {
  width: 96px; height: 96px; border-radius: 50%;
  background: var(--color-gold-subtle);
  border: 2px solid var(--color-gold-border);
  display: flex; align-items: center; justify-content: center;
}
.success-screen__icon { color: var(--color-gold); }
.success-screen__content { max-width: 500px; }
.success-screen__heading {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700; color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}
.success-screen__message {
  font-size: var(--text-lg); color: var(--color-text-secondary); line-height: 1.7;
}
.success-screen__message strong { color: var(--color-text-primary); }

/* What's next steps */
.success-screen__next {
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6) var(--space-8);
  max-width: 480px; width: 100%; text-align: left;
}
.success-screen__next-heading {
  font-family: var(--font-body); font-size: var(--text-base); font-weight: 700;
  color: var(--color-text-primary); margin-bottom: var(--space-5);
}
.success-screen__steps { display: flex; flex-direction: column; gap: var(--space-4); }
.success-screen__step {
  display: flex; align-items: flex-start; gap: var(--space-4);
  font-size: var(--text-sm); color: var(--color-text-secondary); font-family: var(--font-body);
  line-height: 1.6;
}
.success-screen__step-num {
  flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%;
  background: var(--color-gold); color: var(--color-bg-dark);
  font-size: var(--text-xs); font-weight: 700; font-family: var(--font-body);
  display: flex; align-items: center; justify-content: center;
}

/* Actions */
.success-screen__actions { display: flex; flex-wrap: wrap; gap: var(--space-4); justify-content: center; }
.success-screen__whatsapp {
  display: inline-flex; align-items: center; gap: var(--space-2);
}

/* Reset */
.success-screen__reset {
  font-size: var(--text-sm); color: var(--color-text-muted); font-family: var(--font-body);
}
.success-screen__reset-btn {
  background: none; border: none; cursor: pointer;
  color: var(--color-gold); font-weight: 600; font-family: var(--font-body);
  font-size: var(--text-sm); text-decoration: underline;
  transition: var(--transition-base); padding: 0;
}
.success-screen__reset-btn:hover { color: var(--color-gold-dark); }
`
if (!document.head.querySelector('[data-success-styles]')) {
  style.setAttribute('data-success-styles', '')
  document.head.appendChild(style)
}
