import type React from 'react'

import { Board } from './Board'
import { GameFooter } from './GameFooter'
import { GameHeader } from './GameHeader'
import { GameResultModal } from './GameResultModal'
import { useGameShell } from './useGameShell'
import { GlassCard } from '../../../shared/components/ui'

export const GameShell: React.FC = () => {
  const {
    board,
    currentPlayer,
    turn,
    totalMoves,
    xMoves,
    oMoves,
    winningLine,
    status,
    disabled,
    boardKey,
    modalOpen,
    modalVariant,
    winner,
    handleCellClick,
    handleResetGame,
    handleCloseModal,
  } = useGameShell()

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-5 text-center w-full sm:gap-6">
      <div className="space-y-2">
        <h1 className="bg-gradient-to-r bg-clip-text from-sky-300 via-cyan-400 to-amber-300 text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
          <span className="block">Tic-Tac Strategy</span>
        </h1>
        <p className="text-sm text-slate-700/90  dark:text-slate-200/80">
          Keep only your last three marks on a 3×3 grid and race to win before
          turn 20.
        </p>
      </div>
      <GlassCard className="gap-6 px-4 py-5 rounded-3xl shadow-xl w-full sm:px-6 sm:py-6">
        <GameHeader
          currentPlayer={currentPlayer}
          status={status}
          turn={turn}
          maxTurns={20}
        />
        <Board
          key={boardKey}
          board={board}
          disabled={disabled}
          winningLine={winningLine}
          onCellClick={handleCellClick}
        />
        <GameFooter
          status={status}
          onReset={handleResetGame}
        />
      </GlassCard>
      {modalOpen && modalVariant && (
        <GameResultModal
          open={modalOpen}
          variant={modalVariant}
          winner={winner}
          totalMoves={totalMoves}
          xMoves={xMoves}
          oMoves={oMoves}
          onClose={handleCloseModal}
          onReset={handleResetGame}
        />
      )}
    </div>
  )
}
