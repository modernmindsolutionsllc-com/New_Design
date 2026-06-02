import LegalDocument from '@components/legal/LegalDocument'
import { COMPANY_NAME, CONTACT_EMAIL } from '@utils/constants'

const LAST_UPDATED = 'June 3, 2026'

const sections = [
  {
    title: 'Information We Collect',
    paragraphs: [
      `When you contact ${COMPANY_NAME}, submit a form, request a consultation, or communicate with us by email, we may collect the information you choose to provide.`,
      'This can include your name, email address, company details, project information, and any message content you send through the website or related communication channels.',
    ],
    bullets: [
      'Contact information such as name and email address',
      'Business and project details you share voluntarily',
      'Messages, inquiry history, and follow-up correspondence',
      'Basic technical information such as browser, device, or page activity when available through hosting or analytics tools',
    ],
  },
  {
    title: 'How We Use Your Information',
    paragraphs: [
      'We use the information we collect to respond to inquiries, evaluate project fit, provide proposals, deliver services, improve the website experience, and maintain business records.',
      'We may also use your information to follow up about your request, schedule consultations, and send service-related updates that are relevant to your conversation with us.',
    ],
  },
  {
    title: 'How Forms and Communications Are Processed',
    paragraphs: [
      'Website forms and messages may be handled using trusted third-party providers that support contact forms, email delivery, scheduling, hosting, or related business operations.',
      'Those providers only receive the information needed to perform their function for us and are expected to process it in a secure and appropriate manner.',
    ],
  },
  {
    title: 'Sharing of Information',
    paragraphs: [
      'We do not sell your personal information. We may share information only when necessary to operate the website, communicate with you, process requests, comply with law, or protect our rights and business operations.',
    ],
    bullets: [
      'Service providers that support website hosting, communication, or workflow processing',
      'Professional advisers when needed for business, compliance, or contractual matters',
      'Authorities or legal parties when disclosure is required by law or necessary to protect rights and safety',
    ],
  },
  {
    title: 'Data Retention and Security',
    paragraphs: [
      'We keep inquiry and project information for as long as reasonably necessary to respond to requests, manage client relationships, maintain records, and meet legal or operational obligations.',
      'We take reasonable administrative and technical steps to protect information, but no website or online transmission can be guaranteed completely secure.',
    ],
  },
  {
    title: 'Your Choices',
    paragraphs: [
      `You may contact us at ${CONTACT_EMAIL} to ask about the information you have shared with us, request corrections, or ask us to delete it where appropriate and legally permitted.`,
      'You can also stop communicating with us at any time by declining further contact or by contacting us with your preference.',
    ],
  },
  {
    title: 'Third-Party Links',
    paragraphs: [
      'Our website may include links to social media platforms and other third-party websites. We are not responsible for the privacy practices or content of those external services.',
      'We encourage you to review the privacy policies of any third-party site you visit from our website.',
    ],
  },
  {
    title: 'Policy Updates',
    paragraphs: [
      'We may update this Privacy Policy from time to time to reflect operational, legal, or website changes. When we do, the updated date at the top of this page will be revised.',
    ],
  },
]

const PrivacyPage = () => (
  <LegalDocument
    eyebrow="Privacy Policy"
    title="How We Handle the Information You Share With Us"
    intro="This Privacy Policy explains what information we may collect through this website, how we use it, when we may share it, and how you can contact us with questions about your information."
    lastUpdated={LAST_UPDATED}
    sections={sections}
  />
)

export default PrivacyPage
