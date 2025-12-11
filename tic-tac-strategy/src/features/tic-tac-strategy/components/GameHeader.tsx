import type React from 'react'
import { memo } from 'react'
import { cn } from '@shared/lib/cn'
import { type GameStatus, type Player } from '../lib/types'

type GameHeaderProps = {
  currentPlayer: Player
  turn: number
  maxTurns: number
  status: GameStatus
}

const playerPalette: Record<
  Player,
  { active: string; inactive: string; dot: string; text: string }
> = {
  X: {
    active:
      'bg-gradient-to-r border-sky-200/80 from-sky-200/70 shadow-[0_0_35px_-12px_rgba(56,189,248,0.95)] text-slate-900 to-sky-300/70 via-cyan-200/70  dark:bg-gradient-to-r dark:border-sky-500/40 dark:from-sky-500/25 dark:text-white dark:to-sky-400/25 dark:via-cyan-400/20',
    inactive:
      'bg-neutral-100/70 border-neutral-300/80 text-slate-800  dark:border-white/10 dark:bg-white/5 dark:text-slate-200/80',
    dot: 'bg-cyan-400 shadow-[0_0_14px_rgba(56,189,248,0.8)]',
    text:
      'bg-clip-text bg-gradient-to-br drop-shadow-[0_0_12px_rgba(56,189,248,0.75)] from-sky-300 text-transparent to-sky-500 via-cyan-400',
  },
  O: {
    active:
      'bg-gradient-to-r border-amber-200/80 from-amber-200/70 shadow-[0_0_35px_-12px_rgba(251,146,60,0.9)] text-slate-900 to-amber-300/70 via-orange-200/70  dark:bg-gradient-to-r dark:border-amber-500/40 dark:from-amber-500/25 dark:text-white dark:to-amber-400/25 dark:via-orange-400/20',
    inactive:
      'bg-neutral-100/70 border-neutral-300/80 text-slate-800  dark:border-white/10 dark:bg-white/5 dark:text-slate-200/80',
    dot: 'bg-orange-400 shadow-[0_0_14px_rgba(251,146,60,0.8)]',
    text:
      'bg-clip-text bg-gradient-to-br drop-shadow-[0_0_12px_rgba(251,191,36,0.75)] from-amber-300 text-transparent to-orange-600 via-orange-400',
  },
}

const BaseGameHeader: React.FC<GameHeaderProps> = ({
  currentPlayer,
  turn,
  maxTurns,
  status,
}) => {
  const isOver = status.type !== 'IN_PROGRESS'

  const pillClasses = (player: Player) => {
    const palette = playerPalette[player]
    const active = currentPlayer === player && !isOver

    return cn(
      'backdrop-blur-md duration-200 ease-out flex font-semibold gap-2 items-center px-3 py-2 relative rounded-full text-sm transition-all',
      active
        ? 'scale-[1.02] ring-2 ring-neutral-200/80  dark:ring-white/20'
        : 'opacity-85',
      active ? palette.active : palette.inactive,
    )
  }

  const containerClasses = cn(
    'flex flex-wrap gap-3 items-center justify-between',
    isOver && 'opacity-90',
  )

  return (
    <div className="flex flex-col gap-4">
      <div className={containerClasses}>
        <div className="flex flex-wrap gap-3 items-center">
          <div className={pillClasses('X')}>
            <span className={`leading-none text-lg ${playerPalette.X.text}`}>
              X
            </span>
            <span>Player X</span>
            {currentPlayer === 'X' && !isOver && (
              <span className="flex h-2.5 items-center justify-center relative w-2.5">
                <span className={`absolute animate-ping h-3 inline-flex opacity-70 rounded-full w-3 ${playerPalette.X.dot}`} />
                <span className={`relative h-2.5 inline-flex rounded-full w-2.5 ${playerPalette.X.dot}`} />
              </span>
            )}
          </div>
          <div className={pillClasses('O')}>
            <span className={`leading-none text-lg ${playerPalette.O.text}`}>
              O
            </span>
            <span>Player O</span>
            {currentPlayer === 'O' && !isOver && (
              <span className="flex h-2.5 items-center justify-center relative w-2.5">
                <span className={`absolute animate-ping h-3 inline-flex opacity-70 rounded-full w-3 ${playerPalette.O.dot}`} />
                <span className={`relative h-2.5 inline-flex rounded-full w-2.5 ${playerPalette.O.dot}`} />
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end text-right">
          <div className="backdrop-blur-md border border-neutral-300/80 inline-flex items-center rounded-full bg-neutral-100/80 px-4 py-2 shadow-sm text-xs font-semibold text-slate-800 transition-colors duration-200  dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-slate-100">
            Turn {turn} / {maxTurns}
          </div>
          {isOver && (
            <div className="backdrop-blur-md border border-neutral-300/80 inline-flex items-center gap-1 rounded-full bg-neutral-100/80 px-3 py-1 text-[11px] font-semibold text-slate-700 transition-colors duration-200  dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-slate-200">
              Game finished
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const GameHeader = memo(BaseGameHeader)
GameHeader.displayName = 'GameHeader'
