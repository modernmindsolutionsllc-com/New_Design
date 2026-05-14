// ─────────────────────────────────────────────────────────────────────────────
//  FORMSPREE CONFIG
//  Single source of truth for the Formspree endpoint.
//  The actual URL is stored in .env — never hardcoded here.
//
//  Setup steps:
//  1. Go to https://formspree.io and create a free account
//  2. Create a new form — you'll get a URL like: https://formspree.io/f/xyzabcde
//  3. Copy your form ID (the part after /f/)
//  4. In your .env file: VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_ID
//  5. Done — submissions will arrive in your email automatically
// ─────────────────────────────────────────────────────────────────────────────

export const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID'

/**
 * Formspree special fields config.
 * These hidden fields control Formspree's email behaviour.
 * Include these in the form submission object.
 *
 * @param {string} clientName - Used to personalise the email subject line
 * @param {string} clientEmail - Set as the reply-to address
 * @returns {Object}
 */
export const getFormspreeMetaFields = (clientName, clientEmail) => ({
  _subject: `New Project Inquiry from ${clientName || 'Website Visitor'}`,
  _replyto: clientEmail || '',
  // Redirect after submission is handled in React (SuccessScreen),
  // so we disable Formspree's default redirect
  _next: 'false',
})