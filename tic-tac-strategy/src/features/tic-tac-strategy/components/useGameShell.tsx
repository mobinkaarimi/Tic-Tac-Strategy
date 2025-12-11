// src/features/tic-tac-strategy/hooks/useGameShell.ts
import { useCallback, useMemo, useState } from 'react'
import type { Player, GameStatus } from '../lib/types'
import { useTicTacGame } from '../hooks'

type ModalVariant = 'win' | 'draw'

export function useGameShell() {
  const {
    state,
    board,
    currentPlayer,
    turn,
    totalMoves,
    xMoves,
    oMoves,
    winningLine,
    handleCellClick,
    handleReset,
  } = useTicTacGame()

  const [gameKey, setGameKey] = useState(0)
  const [dismissedToken, setDismissedToken] = useState<string | null>(null)

  const status: GameStatus = state.status
  const disabled = status.type !== 'IN_PROGRESS'

  const resultToken = useMemo(() => {
    if (status.type === 'IN_PROGRESS') {
      return null
    }

    return `${gameKey}-${status.type}-${state.moves.length}`
  }, [gameKey, status, state.moves.length])

  const modalOpen = resultToken !== null && dismissedToken !== resultToken

  const modalVariant: ModalVariant | null =
    status.type === 'WON' ? 'win' : status.type === 'DRAW' ? 'draw' : null

  const winner: Player | undefined =
    status.type === 'WON' ? status.winner : undefined

  const handleCloseModal = useCallback(() => {
    if (!resultToken) {
      return
    }
    setDismissedToken(resultToken)
  }, [resultToken])

  const handleResetGame = useCallback(() => {
    handleReset()
    setDismissedToken(null)
    setGameKey(value => value + 1)
  }, [handleReset])

  return {
    // از هوک بازی
    state,
    board,
    currentPlayer,
    turn,
    totalMoves,
    xMoves,
    oMoves,
    winningLine,
    handleCellClick,

    // مخصوص UI شل
    status,
    disabled,
    boardKey: gameKey,
    modalOpen,
    modalVariant,
    winner,
    handleCloseModal,
    handleResetGame,
  }
}
