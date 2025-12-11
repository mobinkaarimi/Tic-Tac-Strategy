import { memo } from 'react'

import { GlassButton } from '@shared/components/ui'
import { cn } from '@shared/lib/cn'
import { type GameStatus } from '../lib/types'

type GameFooterProps = {
  status: GameStatus
  onReset: () => void
}

const statusMessage = (status: GameStatus) => {
  if (status.type === 'IN_PROGRESS') {
    return 'Game in progress'
  }
  if (status.type === 'WON') {
    return `Player ${status.winner} wins!`
  }
  return 'Draw after 20 turns.'
}

const BaseGameFooter: React.FC<GameFooterProps> = ({ status, onReset }) => {
  const message = statusMessage(status)

  const messageClassName = cn(
    'font-medium text-sm',
    status.type === 'WON'
      ? 'text-emerald-600  dark:text-emerald-300'
      : 'text-slate-700  dark:text-slate-200',
  )

  return (
    <div className="flex flex-col gap-3  sm:flex-row sm:items-center sm:justify-between">
      <div className={messageClassName}>{message}</div>
      <GlassButton type="button" onClick={onReset} tone="cyan">
        Reset game
      </GlassButton>
    </div>
  )
}

export const GameFooter = memo(BaseGameFooter)
GameFooter.displayName = 'GameFooter'
