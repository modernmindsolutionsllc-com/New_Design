export const FORMSPREE_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/mqenrkpq'

export const getFormspreeSubmitUrl = () => (
  FORMSPREE_ENDPOINT.startsWith('http')
    ? FORMSPREE_ENDPOINT
    : `https://formspree.io/f/${FORMSPREE_ENDPOINT}`
)

export const getFormspreeMetaFields = (clientName, clientEmail) => ({
  _subject: `New Project Request from ${clientName || 'Website Visitor'}`,
  _replyto: clientEmail || '',
  _next: 'false',
})

export const submitToFormspree = async (payload) => {
  const formData = new FormData()

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    formData.append(key, value)
  })

  const response = await fetch(getFormspreeSubmitUrl(), {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  })

  let data = {}
  try {
    data = await response.json()
  } catch {
    data = {}
  }

  if (!response.ok) {
    return {
      ok: false,
      errors: data.errors || [{ message: 'Submission failed. Please try again.' }],
    }
  }

  return { ok: true, data }
}
