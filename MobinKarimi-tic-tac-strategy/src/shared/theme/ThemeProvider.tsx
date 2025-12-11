import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
  type JSX,
} from 'react'

import { ThemeContext, type Theme } from './context'

const storageKey = 'tic-tac-strategy:theme'
const isBrowser =
  typeof window !== 'undefined' && typeof document !== 'undefined'

function getPreferredTheme(): Theme {
  if (!isBrowser) {
    return 'light'
  }

  const stored = window.localStorage.getItem(storageKey)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  return 'light'
}

function syncDocumentTheme(theme: Theme): void {
  if (!isBrowser) {
    return
  }

  document.documentElement.classList.toggle('dark', theme === 'dark')
}

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = useState<Theme>(() => {
    const preferred = getPreferredTheme()
    syncDocumentTheme(preferred)
    return preferred
  })

  useEffect(() => {
    syncDocumentTheme(theme)
    if (!isBrowser) {
      return
    }
    window.localStorage.setItem(storageKey, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(current => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}
