type GameResultModalProps = {
  totalMoves: number;
  xMoves: number;
  oMoves: number;
};

export const GameResultModalMovesCount: React.FC<GameResultModalProps> = ({
  totalMoves,
  xMoves,
  oMoves,
}) => {
  return (
    <div className="gap-3 grid grid-cols-1 mt-6  sm:grid-cols-3">
      <div className="backdrop-blur-md bg-neutral-100/85 border border-neutral-300/90 font-semibold px-4 py-3 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] text-center text-slate-800 text-sm  dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-slate-100">
        <div className="text-slate-600 text-xs tracking-wide uppercase  dark:text-slate-300">
          Total moves
        </div>
        <div className="mt-1 text-lg">{totalMoves}</div>
      </div>
      <div className="backdrop-blur-md bg-gradient-to-br border border-sky-200/80 font-semibold from-sky-200/50 px-4 py-3 rounded-2xl shadow-[0_10px_30px_-18px_rgba(56,189,248,0.65)] text-center text-slate-900 text-sm to-cyan-300/40  dark:border-sky-500/40 dark:from-sky-500/25 dark:text-white dark:to-cyan-400/20">
        <div className="text-slate-700/90 text-xs tracking-wide uppercase  dark:text-slate-200/90">
          Player X
        </div>
        <div className="mt-1 text-lg">{xMoves}</div>
      </div>
      <div className="backdrop-blur-md bg-gradient-to-br border border-amber-200/80 font-semibold from-amber-200/50 px-4 py-3 rounded-2xl shadow-[0_10px_30px_-18px_rgba(251,146,60,0.65)] text-center text-slate-900 text-sm to-orange-300/40  dark:border-amber-500/40 dark:from-amber-500/25 dark:text-white dark:to-orange-400/20">
        <div className="text-slate-700/90 text-xs tracking-wide uppercase  dark:text-slate-200/90">
          Player O
        </div>
        <div className="mt-1 text-lg">{oMoves}</div>
      </div>
    </div>
  );
};
