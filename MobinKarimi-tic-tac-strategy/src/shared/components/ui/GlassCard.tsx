import type React from 'react'
import type { ReactNode } from 'react'

import { cn } from '@shared/lib/cn'

type GlassCardProps = {
  children: ReactNode
  className?: string
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
  const cardClassName = cn(
    'backdrop-blur-xl border border-neutral-300/80 bg-neutral-100/80 p-6 rounded-3xl shadow-[0_18px_70px_-45px_rgba(51,65,85,0.5)] text-slate-900 transition-colors duration-300  dark:border-neutral-700 dark:bg-neutral-900/50 dark:shadow-[0_18px_70px_-45px_rgba(0,0,0,0.8)] dark:text-slate-50  sm:p-8',
    className,
  )

  return <div className={cardClassName}>{children}</div>
}
