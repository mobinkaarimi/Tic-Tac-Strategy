import { useCallback, useMemo, useState } from 'react'

import { useTicTacGame } from './useTicTacGame'
import type { GameStatus, Player } from '../lib/types'

type ModalVariant = 'win' | 'draw'

export const useGameShell = () => {
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

  const [dismissedToken, setDismissedToken] = useState<string | null>(null)

  const status: GameStatus = state.status
  const disabled = status.type !== 'IN_PROGRESS'

  const resultToken = useMemo(() => {
    if (status.type === 'IN_PROGRESS') return null
    return `${status.type}-${state.moves.length}`
  }, [status])

  const modalOpen = resultToken !== null && dismissedToken !== resultToken
  const modalVariant: ModalVariant | null =
    status.type === 'WON' ? 'win' : status.type === 'DRAW' ? 'draw' : null
  const winner: Player | undefined = status.type === 'WON' ? status.winner : undefined

  const handleCloseModal = useCallback(() => {
    if (!resultToken) return
    setDismissedToken(resultToken)
  }, [resultToken])

  const handleResetGame = useCallback(() => {
    handleReset()
    setDismissedToken(null)
  }, [handleReset])

  return {
    state,
    board,
    currentPlayer,
    turn,
    totalMoves,
    xMoves,
    oMoves,
    winningLine,
    status,
    disabled,
    modalOpen,
    modalVariant,
    winner,
    handleCellClick,
    handleResetGame,
    handleCloseModal,
  }
}
