import { memo, useEffect, useRef } from "react";

import { GlassButton } from "@shared/components";
import { type Player } from "../../lib/types";
import { GameResultModalMovesCount } from "./GameResultModalMovesCount";

type GameResultModalProps = {
  open: boolean;
  variant: "win" | "draw";
  winner?: Player;
  totalMoves: number;
  xMoves: number;
  oMoves: number;
  onClose: () => void;
  onReset: () => void;
};

const BaseGameResultModal: React.FC<GameResultModalProps> = ({
  open,
  variant,
  winner,
  totalMoves,
  xMoves,
  oMoves,
  onClose,
  onReset,
}) => {
  const playAgainButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    playAgainButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  const handlePlayAgain = () => {
    onReset();
    onClose();
  };

  const title =
    variant === "win" ? `Player ${winner ?? "X"} wins!` : "It's a draw";

  const description =
    variant === "win"
      ? "A sharp sequence seals the board."
      : "Twenty turns played with no winner on the grid.";

  const titleGradient =
    variant === "win"
      ? winner === "O"
        ? "bg-gradient-to-r from-amber-200 via-orange-300 to-amber-500"
        : "bg-gradient-to-r from-sky-200 via-cyan-300 to-sky-500"
      : "bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400";

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="backdrop-blur-sm bg-slate-900/70 fixed flex inset-0 items-center justify-center px-4 z-50  dark:bg-slate-950/80"
    >
      <div className="max-w-lg relative w-full">
        <div className="absolute inset-0 pointer-events-none  -z-10">
          <div className="absolute bg-gradient-to-tr blur-3xl from-sky-400/70 h-32 mix-blend-screen opacity-70 rounded-full to-emerald-300/50 top-6 via-cyan-300/60 w-32  -left-10" />
          <div className="absolute bg-gradient-to-br blur-3xl bottom-0 from-amber-300/70 h-28 mix-blend-screen opacity-70 rounded-full right-0 to-pink-400/50 via-orange-400/60 w-28" />
        </div>
        <div className="backdrop-blur-xl bg-neutral-100/85 border border-neutral-300/90 duration-200 overflow-hidden relative rounded-3xl shadow-[0_25px_80px_-50px_rgba(51,65,85,0.45)] transition  dark:border-neutral-800 dark:bg-neutral-900/70 dark:shadow-[0_25px_80px_-50px_rgba(0,0,0,0.8)]">
          <div className="absolute bg-gradient-to-br from-white/20 inset-0 opacity-80 to-transparent via-white/10  dark:from-white/10 dark:via-white/0" />
          <div className="p-6 relative  sm:p-8">
            <div className="space-y-2 text-center">
              <h2
                className={`bg-clip-text font-extrabold leading-tight text-3xl text-transparent ${titleGradient}`}
              >
                {title}
              </h2>
              <p className="text-slate-700/90 text-sm  dark:text-slate-200/80">
                {description}
              </p>
            </div>
            <GameResultModalMovesCount
              oMoves={oMoves}
              totalMoves={totalMoves}
              xMoves={xMoves}
            />
            <div className="flex flex-col gap-3 mt-6  sm:flex-row sm:justify-end">
              <GlassButton
                ref={playAgainButtonRef}
                type="button"
                onClick={handlePlayAgain}
                tone="cyan"
              >
                Play again
              </GlassButton>
              <GlassButton type="button" onClick={onClose} variant="ghost">
                Close
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GameResultModal = memo(BaseGameResultModal);
GameResultModal.displayName = "GameResultModal";
