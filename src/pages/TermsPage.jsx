import LegalDocument from '@components/legal/LegalDocument'
import { COMPANY_NAME, CONTACT_EMAIL } from '@utils/constants'

const LAST_UPDATED = 'June 3, 2026'

const sections = [
  {
    title: 'Acceptance of These Terms',
    paragraphs: [
      `By accessing or using this website, you agree to these Terms of Service and to use the website only for lawful purposes. If you do not agree, please do not use the site.`,
      `These terms apply to visitors, leads, clients, and anyone interacting with ${COMPANY_NAME} through this website.`,
    ],
  },
  {
    title: 'Website Content and General Information',
    paragraphs: [
      'The content on this website is provided for general informational and marketing purposes. Service descriptions, results, timelines, and examples are meant to help explain our work, but they do not create a binding commitment by themselves.',
      'Any project scope, pricing, deadlines, or deliverables are governed by a separate written agreement, proposal, or statement of work when applicable.',
    ],
  },
  {
    title: 'Permitted Use',
    paragraphs: [
      'You agree not to misuse the website, interfere with its operation, attempt unauthorized access, or submit false, harmful, or unlawful content through forms or communications.',
    ],
    bullets: [
      'Do not copy, scrape, reverse engineer, or exploit the website in a harmful or unauthorized way',
      'Do not use the site to transmit spam, malware, or misleading information',
      'Do not impersonate another person or misrepresent your affiliation or business intent',
    ],
  },
  {
    title: 'Intellectual Property',
    paragraphs: [
      `Unless otherwise stated, the website design, branding, copy, graphics, and other content on this site belong to ${COMPANY_NAME} or are used with permission.`,
      'You may view and use the website for normal business and informational purposes, but you may not reproduce, distribute, or commercially reuse site content without prior written permission.',
    ],
  },
  {
    title: 'Third-Party Services and Links',
    paragraphs: [
      'This website may link to third-party platforms, providers, or social media services. Those services operate independently, and we are not responsible for their content, availability, or policies.',
      'If you engage with third-party services through our website, your use of those services is subject to their own terms and policies.',
    ],
  },
  {
    title: 'No Guarantee of Results',
    paragraphs: [
      'We work to provide thoughtful, high-quality digital services, but website use alone does not guarantee business outcomes, rankings, lead volume, revenue growth, or uninterrupted availability.',
      'Any examples, case studies, or outcome discussions should be understood as illustrative rather than guaranteed results.',
    ],
  },
  {
    title: 'Limitation of Liability',
    paragraphs: [
      'To the fullest extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages arising from your use of this website.',
      'If liability is established in connection with website use, it will be limited to the amount, if any, you paid directly for use of the website itself.',
    ],
  },
  {
    title: 'Changes to the Website or Terms',
    paragraphs: [
      'We may update, suspend, or modify the website and these terms at any time. Continued use of the website after changes are posted means you accept the revised terms.',
      'We encourage you to review this page periodically for updates.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      `Questions about these terms can be sent to ${CONTACT_EMAIL}.`,
    ],
  },
]

const TermsPage = () => (
  <LegalDocument
    eyebrow="Terms of Service"
    title="Ground Rules for Using This Website and Working With Our Content"
    intro="These Terms of Service explain the general rules for using this website, viewing our content, submitting inquiries, and interacting with our business online."
    lastUpdated={LAST_UPDATED}
    sections={sections}
  />
)

export default TermsPage
