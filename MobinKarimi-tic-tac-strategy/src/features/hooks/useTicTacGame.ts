import { useCallback, useMemo, useReducer } from "react";
import {
  applyMove,
  createInitialState,
  deriveBoard,
  getCurrentPlayer,
  getTurn,
} from "../lib";
import { type CellIndex, type GameState, type Move } from "../lib/types";

type GameAction = { type: "PLAY_CELL"; cell: CellIndex } | { type: "RESET" };

const reducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "PLAY_CELL":
      return applyMove(state, action.cell);
    case "RESET":
      return createInitialState();
    default:
      return state;
  }
};

const countMovesByPlayer = (moves: Move[]) => {
  let xMoves = 0;
  let oMoves = 0;

  for (const move of moves) {
    if (move.player === "X") xMoves += 1;
    else oMoves += 1;
  }

  return { xMoves, oMoves };
};

export const useTicTacGame = () => {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);

  const { board, xMoves, oMoves } = useMemo(() => {
    const board = deriveBoard(state.moves);
    const { xMoves, oMoves } = countMovesByPlayer(state.moves);
    return { board, xMoves, oMoves };
  }, [state.moves]);

  const currentPlayer = getCurrentPlayer(state);
  const turn = getTurn(state);
  const totalMoves = state.moves.length;
  const winningLine = state.status.type === "WON" ? state.status.line : null;

  const handleCellClick = useCallback(
    (cell: CellIndex) => {
      dispatch({ type: "PLAY_CELL", cell });
    },
    [dispatch]
  );

  const handleReset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, [dispatch]);

  return {
    board,
    currentPlayer,
    handleCellClick,
    handleReset,
    oMoves,
    state,
    totalMoves,
    turn,
    winningLine,
    xMoves,
  };
};
