import { type Board, type CellIndex, type GameState, type GameStatus, type Move, type Player, type WinningLine } from './types'

const BOARD_SIZE = 9
const MAX_ACTIVE_MARKS_PER_PLAYER = 3
const MAX_TURNS = 20

const winningLines: WinningLine[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const createEmptyBoard = (): Board => Array(BOARD_SIZE).fill(null)

const recentMovesFor = (moves: Move[], player: Player): Move[] =>
  moves.filter(move => move.player === player).slice(-MAX_ACTIVE_MARKS_PER_PLAYER)

export const createInitialState = (): GameState => ({
  moves: [],
  status: { type: 'IN_PROGRESS' },
})

export const getCurrentPlayer = (state: GameState): Player =>
  state.moves.length % 2 === 0 ? 'X' : 'O'

export const getTurn = (state: GameState): number =>
  state.moves.length + 1

export const deriveBoard = (moves: Move[]): Board => {
  const board = createEmptyBoard()
  const activeMoves = [
    ...recentMovesFor(moves, 'X'),
    ...recentMovesFor(moves, 'O'),
  ]

  for (const move of activeMoves) {
    board[move.cell] = move.player
  }

  return board
}

export const checkWin = (board: Board): { winner: Player; line: WinningLine } | null => {
  for (const line of winningLines) {
    const [a, b, c] = line
    const mark = board[a]

    if (mark && board[b] === mark && board[c] === mark) {
      return { winner: mark, line }
    }
  }

  return null
}

const evaluateStatus = (moves: Move[], board: Board): GameStatus => {
  const win = checkWin(board)

  if (win) {
    return {
      type: 'WON',
      winner: win.winner,
      line: win.line,
    }
  }

  if (moves.length >= MAX_TURNS) {
    return {
      type: 'DRAW',
    }
  }

  return { type: 'IN_PROGRESS' }
}

export const canPlayCell = (state: GameState, cell: CellIndex): boolean => {
  if (state.status.type !== 'IN_PROGRESS') {
    return false
  }

  const board = deriveBoard(state.moves)
  return board[cell] === null
}

export const applyMove = (state: GameState, cell: CellIndex): GameState => {
  if (!canPlayCell(state, cell)) {
    return state
  }

  const player = getCurrentPlayer(state)

  const moves: Move[] = [
    ...state.moves,
    { id: state.moves.length, player, cell },
  ]

  const board = deriveBoard(moves)
  const status = evaluateStatus(moves, board)

  return { moves, status }
}
