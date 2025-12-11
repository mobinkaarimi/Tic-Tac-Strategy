import { useEffect, useState } from 'react'

import { cn } from '@shared/lib/cn'
import { useTheme } from '@shared/theme/useTheme'

const iconClassName = 'h-5 w-5'

const SunIcon = () => (
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

const MoonIcon = () => (
  <svg
    aria-hidden="true"
    className={iconClassName}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    viewBox="0 0 24 24"
  >
    <path d="M20 14.5A8.5 8.5 0 0 1 11.5 6 8.5 8.5 0 1 0 20 14.5Z" />
  </svg>
)

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    if (!transitioning) return
    const timer = setTimeout(() => setTransitioning(false), 300)
    return () => clearTimeout(timer)
  }, [transitioning])

  const handleToggle = () => {
    setTransitioning(true)
    toggleTheme()
  }

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'
  const bgClass = transitioning
    ? 'border-orange-300/70 bg-orange-200/80 text-slate-800'
    : isDark
      ? 'border-neutral-700 bg-neutral-900/70 text-slate-100'
      : 'border-neutral-300 bg-white/70 text-slate-800'

  const sunVisible = !isDark
  const moonVisible = isDark

  return (
    <button
      type="button"
      aria-label={label}
      onClick={handleToggle}
      className={cn(
        'border focus:outline-none focus:ring-2 focus:ring-white/50 font-semibold group inline-flex items-center overflow-hidden px-2 py-1 relative rounded-full shadow-[0_10px_30px_-18px_rgba(51,65,85,0.35)] text-xs w-12 h-12 backdrop-blur-lg transition-all duration-300 ease-out',
        '  group-hover:w-28',
        bgClass,
      )}
    >
      <div className="backdrop-blur-md border border-current/30 bg-white/30 duration-300 ease-out h-10 overflow-hidden relative rounded-full transition-colors w-10  dark:bg-neutral-800/60">
        <div className="relative h-full w-full">
          <div
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out',
              sunVisible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-5 scale-90 opacity-0',
              transitioning && !sunVisible ? 'opacity-60' : '',
            )}
          >
            <SunIcon />
          </div>
          <div
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out',
              moonVisible ? '-rotate-[2deg] translate-y-0 scale-100 opacity-100' : '-translate-y-5 rotate-0 scale-90 opacity-0',
            )}
          >
            <MoonIcon />
          </div>
        </div>
      </div>
      <span
        className={cn(
          'ml-2 whitespace-nowrap text-xs uppercase tracking-wide opacity-0 transition-all duration-300 ease-out',
          '  translate-x-2 group-hover:translate-x-0 group-hover:opacity-100',
        )}
      >
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}
