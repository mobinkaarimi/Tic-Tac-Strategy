import type React from 'react'
import { memo } from 'react'
import { GlassButton } from '@shared/components/ui'
import { type Player } from '../lib/types'

type GameResultModalProps = {
  open: boolean
  variant: 'win' | 'draw'
  winner?: Player
  totalMoves: number
  xMoves: number
  oMoves: number
  onClose: () => void
  onReset: () => void
}

const BaseGameResultModal: React.FC<GameResultModalProps> = ({
  open,
  variant,
  winner,
  totalMoves,
  xMoves,
  oMoves,
  onClose,
  onReset,
}) => {
  if (!open) return null

  const handlePlayAgain = () => {
    onReset()
    onClose()
  }

  const title = variant === 'win' ? `Player ${winner ?? 'X'} wins!` : "It's a draw"

  const description =
    variant === 'win'
      ? 'A sharp sequence seals the board.'
      : 'Twenty turns played with no winner on the grid.'

  const titleGradient =
    variant === 'win'
      ? winner === 'O'
        ? 'bg-gradient-to-r from-amber-200 via-orange-300 to-amber-500'
        : 'bg-gradient-to-r from-sky-200 via-cyan-300 to-sky-500'
      : 'bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400'

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="backdrop-blur-sm bg-slate-900/70 fixed flex inset-0 items-center justify-center px-4 z-50  dark:bg-slate-950/80"
    >
      <div className="max-w-lg relative w-full">
        <div className="absolute inset-0 pointer-events-none  -z-10">
          <div className="absolute bg-gradient-to-tr blur-3xl from-sky-400/70 h-32 mix-blend-screen opacity-70 rounded-full to-emerald-300/50 top-6 via-cyan-300/60 w-32  -left-10" />
          <div className="absolute bg-gradient-to-br blur-3xl bottom-0 from-amber-300/70 h-28 mix-blend-screen opacity-70 rounded-full right-0 to-pink-400/50 via-orange-400/60 w-28" />
        </div>
        <div className="backdrop-blur-xl bg-neutral-100/85 border border-neutral-300/90 duration-200 overflow-hidden relative rounded-3xl shadow-[0_25px_80px_-50px_rgba(51,65,85,0.45)] transition  dark:border-neutral-800 dark:bg-neutral-900/70 dark:shadow-[0_25px_80px_-50px_rgba(0,0,0,0.8)]">
          <div className="absolute bg-gradient-to-br from-white/20 inset-0 opacity-80 to-transparent via-white/10  dark:from-white/10 dark:via-white/0" />
          <div className="p-6 relative  sm:p-8">
            <div className="space-y-2 text-center">
              <h2 className={`bg-clip-text font-extrabold leading-tight text-3xl text-transparent ${titleGradient}`}>
                {title}
              </h2>
              <p className="text-slate-700/90 text-sm  dark:text-slate-200/80">{description}</p>
            </div>
            <div className="gap-3 grid grid-cols-1 mt-6  sm:grid-cols-3">
              <div className="backdrop-blur-md bg-neutral-100/85 border border-neutral-300/90 font-semibold px-4 py-3 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] text-center text-slate-800 text-sm  dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-slate-100">
                <div className="text-slate-600 text-xs tracking-wide uppercase  dark:text-slate-300">
                  Total moves
                </div>
                <div className="mt-1 text-lg">{totalMoves}</div>
              </div>
              <div className="backdrop-blur-md bg-gradient-to-br border border-sky-200/80 font-semibold from-sky-200/50 px-4 py-3 rounded-2xl shadow-[0_10px_30px_-18px_rgba(56,189,248,0.65)] text-center text-slate-900 text-sm to-cyan-300/40  dark:border-sky-500/40 dark:from-sky-500/25 dark:text-white dark:to-cyan-400/20">
                <div className="text-slate-700/90 text-xs tracking-wide uppercase  dark:text-slate-200/90">
                  Player X
                </div>
                <div className="mt-1 text-lg">{xMoves}</div>
              </div>
              <div className="backdrop-blur-md bg-gradient-to-br border border-amber-200/80 font-semibold from-amber-200/50 px-4 py-3 rounded-2xl shadow-[0_10px_30px_-18px_rgba(251,146,60,0.65)] text-center text-slate-900 text-sm to-orange-300/40  dark:border-amber-500/40 dark:from-amber-500/25 dark:text-white dark:to-orange-400/20">
                <div className="text-slate-700/90 text-xs tracking-wide uppercase  dark:text-slate-200/90">
                  Player O
                </div>
                <div className="mt-1 text-lg">{oMoves}</div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-6  sm:flex-row sm:justify-end">
              <GlassButton type="button" onClick={handlePlayAgain} tone="cyan">
                Play again
              </GlassButton>
              <GlassButton type="button" onClick={onClose} variant="ghost">
                Close
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const GameResultModal = memo(BaseGameResultModal)
GameResultModal.displayName = 'GameResultModal'
