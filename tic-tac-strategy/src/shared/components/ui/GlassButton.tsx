import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@shared/lib/cn'

type GlassButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  tone?: 'cyan' | 'amber' | 'neutral'
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const toneClasses: Record<NonNullable<GlassButtonProps['tone']>, string> = {
  amber:
    'bg-gradient-to-r border-amber-300/80 from-amber-200/85 shadow-[0_12px_35px_-18px_rgba(251,146,60,0.65)] text-slate-900 to-amber-400/85 via-orange-300/85  dark:border-amber-500/40 dark:from-amber-400/60 dark:text-white dark:to-amber-500/50 dark:via-orange-400/60',
  cyan:
    'bg-gradient-to-r border-sky-300/80 from-sky-200/85 shadow-[0_12px_35px_-18px_rgba(56,189,248,0.7)] text-slate-900 to-sky-400/85 via-cyan-300/85  dark:border-sky-500/40 dark:from-sky-500/50 dark:text-white dark:to-sky-500/50 dark:via-cyan-400/60',
  neutral:
    'bg-gradient-to-r border-neutral-300/80 from-neutral-100/85 shadow-[0_10px_30px_-20px_rgba(51,65,85,0.35)] text-neutral-900 to-neutral-100/85 via-neutral-200/85  dark:border-neutral-700 dark:from-neutral-800/70 dark:text-white dark:to-neutral-900/70 dark:via-neutral-800/70',
}

export const GlassButton = ({
  children,
  variant = 'primary',
  tone = 'cyan',
  className,
  ...props
}: GlassButtonProps) => {
  const base =
    'duration-200 ease-out font-semibold inline-flex items-center justify-center px-4 py-2 rounded-full text-sm transition-all focus:outline-none focus:ring-2 focus:ring-white/60'

  const primary = cn(
    'backdrop-blur-md border hover:brightness-110 hover:scale-[1.03] focus:ring-offset-0',
    toneClasses[tone],
  )

  const ghost =
    'backdrop-blur-md border bg-white/30 text-slate-800 hover:scale-[1.02] focus:ring-offset-0  dark:border-white/15 dark:bg-white/10 dark:text-white'

  return (
    <button
      className={cn(base, variant === 'primary' ? primary : ghost, className)}
      {...props}
    >
      {children}
    </button>
  )
}
