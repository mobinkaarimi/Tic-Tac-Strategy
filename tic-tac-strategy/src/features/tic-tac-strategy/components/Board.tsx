import type React from 'react'
import { memo } from 'react'
import { Cell } from './Cell'
import { type CellIndex, type Player, type WinningLine } from '../lib/types'
import { cn } from '@shared/lib/cn'

type BoardProps = {
  board: (Player | null)[]
  winningLine: WinningLine | null
  disabled: boolean
  onCellClick: (cell: CellIndex) => void
}

const cells: CellIndex[] = [0, 1, 2, 3, 4, 5, 6, 7, 8]

const BoardComponent: React.FC<BoardProps> = ({
  board,
  winningLine,
  disabled,
  onCellClick,
}) => {
  const boardClassName = cn(
    'backdrop-blur-lg bg-neutral-100/85 border border-neutral-300/90 gap-3 grid grid-cols-3 p-3 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_12px_36px_-28px_rgba(51,65,85,0.4)] transition',
    disabled && 'opacity-75',
    ' dark:border-neutral-800 dark:bg-neutral-900/70',
  )

  return (
    <div className={boardClassName}>
      {cells.map(index => {
        const value = board[index]
        const isWinning = winningLine ? winningLine.includes(index) : false
        const cellDisabled = disabled || value !== null

        return (
          <Cell
            key={index}
            index={index}
            value={value}
            isWinning={isWinning}
            disabled={cellDisabled}
            onClick={onCellClick}
          />
        )
      })}
    </div>
  )
}

export const Board = memo(BoardComponent)
Board.displayName = 'Board'
