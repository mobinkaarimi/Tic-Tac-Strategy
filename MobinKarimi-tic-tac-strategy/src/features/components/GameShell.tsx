import type React from "react";

import { useGameShell } from "@features/hooks";
import { GlassCard } from "@shared/components";

import { Board } from "./Board";
import { GameFooter } from "./GameFooter";
import { GameHeader } from "./GameHeader";
import { GameResultModal } from "./GameResultModal";

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
    modalOpen,
    modalVariant,
    winner,
    handleCellClick,
    handleResetGame,
    handleCloseModal,
  } = useGameShell();

  return (
    <div className="flex flex-col gap-5 items-center max-w-xl mx-auto text-center w-full  sm:gap-6">
      <div className="space-y-2">
        <h1 className="bg-clip-text bg-gradient-to-r font-extrabold from-sky-300 text-3xl text-transparent to-amber-300 tracking-tight via-cyan-400  sm:text-4xl">
          <span className="block">Tic-Tac Strategy</span>
        </h1>
        <p className="text-sm text-slate-700/90  dark:text-slate-200/80">
          Keep only your last three marks on a 3×3 grid and race to win before
          turn 20.
        </p>
      </div>
      <GlassCard className="flex flex-col gap-6 rounded-3xl px-4 py-5 shadow-xl w-full  sm:px-6 sm:py-6">
        <GameHeader
          currentPlayer={currentPlayer}
          status={status}
          turn={turn}
          maxTurns={20}
        />
        <Board
          board={board}
          disabled={disabled}
          winningLine={winningLine}
          onCellClick={handleCellClick}
        />
        <GameFooter status={status} onReset={handleResetGame} />
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
  );
};
