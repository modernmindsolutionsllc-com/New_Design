import { useEffect, useState } from 'react'

const THEME_KEY = 'youragency-theme'

const getPreferredTheme = () => {
  if (typeof window === 'undefined') return 'light'

  const storedTheme = window.localStorage.getItem(THEME_KEY)
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof document !== 'undefined' && document.documentElement.dataset.theme) {
      return document.documentElement.dataset.theme
    }

    return getPreferredTheme()
  })

  useEffect(() => {
    const root = document.documentElement
    const metaTheme = document.querySelector('meta[name="theme-color"]')
    const themeColor = theme === 'dark' ? '#111827' : '#F5F4F0'

    root.dataset.theme = theme
    root.style.colorScheme = theme
    window.localStorage.setItem(THEME_KEY, theme)

    if (metaTheme) {
      metaTheme.setAttribute('content', themeColor)
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
  }

  return { theme, toggleTheme }
}
