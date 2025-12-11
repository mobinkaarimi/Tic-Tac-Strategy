import type React from 'react'

import { useTheme } from '@shared/theme/context'
import { cn } from '@shared/lib/cn'

const iconClassName = 'h-5 w-5'

const SunIcon: React.FC = () => (
  <svg
    aria-hidden="true"
    className={iconClassName}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.5-7.5L17 5m-10 14-1.5 1.5M19 17l-1.5-1.5M5 7 3.5 5.5" />
  </svg>
)

const MoonIcon: React.FC = () => (
  <svg
    aria-hidden="true"
    className={iconClassName}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    viewBox="0 0 24 24"
  >
    <path d="M21 13.5A8.5 8.5 0 0 1 10.5 3 8.5 8.5 0 1 0 21 13.5Z" />
  </svg>
)

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const icon = isDark ? <MoonIcon /> : <SunIcon />

  const buttonClassName = cn(
    'backdrop-blur-lg border duration-300 ease-out font-semibold gap-3 inline-flex items-center justify-between px-3 py-2 rounded-2xl shadow-lg text-sm transition-all  focus:outline-none focus:ring-2 focus:ring-white/50',
    isDark
      ? 'bg-gradient-to-br border-slate-700 from-slate-900/70 text-slate-100 to-slate-800/70 via-indigo-900/60  hover:shadow-[0_10px_30px_-18px_rgba(56,189,248,0.8)]'
      : 'bg-gradient-to-br border-slate-200 from-amber-100/80 text-slate-800 to-sky-100/80 via-orange-100/80  hover:shadow-[0_10px_30px_-18px_rgba(251,146,60,0.5)]',
  )

  const iconWrapperClassName = cn(
    'border duration-300 ease-out flex h-10 items-center justify-center rounded-xl w-10  ',
    isDark
      ? 'bg-gradient-to-br border-slate-700 from-slate-800/90 rotate-3 shadow-[0_0_18px_rgba(56,189,248,0.35)] text-sky-200 to-slate-800/90 via-slate-900/70'
      : 'bg-gradient-to-br border-slate-200 from-amber-200/90 -rotate-3 shadow-[0_0_18px_rgba(250,204,21,0.4)] text-amber-700 to-yellow-200/90 via-orange-200/90',
  )

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className={buttonClassName}
      onClick={toggleTheme}
    >
      <span className={iconWrapperClassName}>{icon}</span>
      <span className="text-xs uppercase tracking-wide">{isDark ? 'Night' : 'Day'}</span>
    </button>
  )
}
