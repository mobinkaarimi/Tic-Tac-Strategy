import type React from 'react'
import { ThemeToggle } from '@shared/components/ui'

type PageProps = {
  children: React.ReactNode
}

export const Page: React.FC<PageProps> = ({ children }) => {
  const rootClassName =
    'relative min-h-screen overflow-hidden bg-gradient-to-b from-neutral-100 via-neutral-200 to-neutral-100 text-slate-900 transition-colors duration-300  dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 dark:text-slate-50'

  const containerClassName =
    'mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 relative  sm:px-6  lg:px-8'

  const toggleWrapperClassName =
    'border border-neutral-300/80 bg-neutral-100/80 p-2 rounded-2xl shadow-[0_12px_40px_-28px_rgba(51,65,85,0.45)] backdrop-blur-xl transition-colors duration-300  dark:border-neutral-800 dark:bg-neutral-900/70 dark:shadow-[0_12px_40px_-28px_rgba(0,0,0,0.8)]'

  return (
    <div className={rootClassName}>
      <BackgroundBlobs />
      <div className="bg-noise-overlay fixed inset-0 mix-blend-overlay opacity-[0.12] pointer-events-none  -z-10" />
      <div className={containerClassName}>
        <div className="flex items-center justify-end">
          <div className={toggleWrapperClassName}>
            <ThemeToggle />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

const BackgroundBlobs: React.FC = () => {
  return (
    <div className="pointer-events-none  -z-[1]">
      <div className="absolute bg-gradient-to-tr blur-3xl from-cyan-400 h-72 mix-blend-screen opacity-60 rounded-full via-sky-500 w-72 to-emerald-300  -left-32 -top-24  dark:opacity-70" />
      <div className="absolute bg-gradient-to-tr blur-3xl from-amber-400 h-80 mix-blend-screen opacity-60 rounded-full top-20 via-orange-500 w-80 to-pink-400  -right-16  dark:opacity-70" />
      <div className="absolute bg-gradient-to-br blur-3xl bottom-10 from-lime-300 h-64 left-20 mix-blend-screen opacity-50 rounded-full via-teal-300 w-64 to-cyan-400   dark:opacity-60" />
    </div>
  )
}
