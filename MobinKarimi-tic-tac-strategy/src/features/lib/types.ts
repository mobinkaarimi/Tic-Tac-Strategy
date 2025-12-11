export type Player = "X" | "O";

export type CellIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Move = {
  id: number;
  player: Player;
  cell: CellIndex;
};

export type WinningLine = [CellIndex, CellIndex, CellIndex];

export type GameStatus =
  | { type: "IN_PROGRESS" }
  | { type: "WON"; winner: Player; line: WinningLine }
  | { type: "DRAW" };

export type GameState = {
  moves: Move[];
  status: GameStatus;
};

export type Board = (Player | null)[];
