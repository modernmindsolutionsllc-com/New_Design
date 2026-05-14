import { MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@utils/constants'

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_URL}
      className="whatsapp-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={20} />
    </a>
  )
}

export default WhatsAppButton

const style = document.createElement('style')
style.textContent = `
.whatsapp-button {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 99;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: #25d366;
  box-shadow: 0 10px 24px rgba(37, 211, 102, 0.35);
  transition: transform 0.2s ease, filter 0.2s ease;
}
.whatsapp-button:hover {
  transform: translateY(-2px);
  filter: brightness(0.95);
}
`
if (!document.head.querySelector('[data-whatsapp-styles]')) {
  style.setAttribute('data-whatsapp-styles', '')
  document.head.appendChild(style)
}
