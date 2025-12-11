import type React from "react";
import { memo } from "react";

import { classNames } from "@/shared/lib/classNames";

import { type CellIndex, type Player } from "../lib/types";

type CellProps = {
  index: CellIndex;
  value: Player | null;
  isWinning: boolean;
  disabled: boolean;
  onClick: (cell: CellIndex) => void;
};

const markClasses = {
  X: "bg-clip-text bg-gradient-to-b drop-shadow-[0_0_22px_rgba(56,189,248,0.6)] from-cyan-500 text-transparent to-cyan-700 via-sky-600  dark:bg-gradient-to-b dark:drop-shadow-[0_0_28px_rgba(56,189,248,0.85)] dark:from-cyan-300 dark:text-transparent dark:to-cyan-500 dark:via-sky-400",
  O: "bg-clip-text bg-gradient-to-b drop-shadow-[0_0_22px_rgba(251,146,60,0.6)] from-amber-500 text-transparent to-amber-700 via-orange-600  dark:bg-gradient-to-b dark:drop-shadow-[0_0_28px_rgba(251,191,36,0.85)] dark:from-amber-300 dark:text-transparent dark:to-amber-500 dark:via-orange-400",
} as const satisfies Record<Player, string>;

const BaseCell: React.FC<CellProps> = ({
  index,
  value,
  isWinning,
  disabled,
  onClick,
}) => {
  const occupied = value !== null;
  const interactable = !disabled && !occupied;

  const markClass =
    value != null ? markClasses[value] : "text-slate-600  dark:text-slate-500";

  const hoverGlow = interactable
    ? "hover:brightness-110 hover:scale-[1.03] hover:shadow-[0_0_26px_rgba(100,116,139,0.45)]  dark:hover:shadow-[0_0_28px_rgba(255,255,255,0.35)]"
    : "";

  const baseCellClass =
    "aspect-square border duration-200 ease-out flex font-extrabold items-center justify-center leading-none relative rounded-2xl text-5xl transition-all  focus:outline-none focus:ring-2 focus:ring-offset-2";
  const lightCellClass =
    "backdrop-blur-md bg-neutral-100/85 border-neutral-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_8px_28px_-24px_rgba(51,65,85,0.45)] text-slate-800  focus:ring-neutral-300/70 focus:ring-offset-neutral-100/80";
  const darkCellClass =
    "  dark:bg-neutral-900/80 dark:border-neutral-800 dark:focus:ring-neutral-700 dark:focus:ring-offset-neutral-950 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_30px_-24px_rgba(0,0,0,0.7)] dark:text-slate-100";
  const disabledCellClass =
    "  disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none disabled:opacity-55";
  const winningCellClass =
    "ring-2 ring-emerald-400/80 ring-offset-2 ring-offset-white  dark:ring-offset-neutral-950";

  const className = classNames(
    baseCellClass,
    lightCellClass,
    darkCellClass,
    disabledCellClass,
    interactable && "cursor-pointer",
    isWinning && winningCellClass,
    hoverGlow
  );

  return (
    <button
      type="button"
      aria-label={`Cell ${index}`}
      className={className}
      disabled={disabled || occupied}
      onClick={() => onClick(index)}
    >
      <span className={markClass}>{value}</span>
    </button>
  );
};

export const Cell = memo(BaseCell);
Cell.displayName = "Cell";
