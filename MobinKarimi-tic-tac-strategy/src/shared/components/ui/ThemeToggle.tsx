import { classNames } from "@/shared/lib";
import { useThemeToggle } from "./useThemeToggle";

const iconClassName = "h-5 w-5";

const SunIcon = () => (
  <svg
    aria-hidden="true"
    className={iconClassName}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.5-7.5L17 5m-10 14-1.5 1.5M19 17l-1.5-1.5M5 7 3.5 5.5" />
  </svg>
);

const MoonIcon = () => (
  <svg
    aria-hidden="true"
    className={iconClassName}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    viewBox="0 0 24 24"
  >
    <path d="M20 14.5A8.5 8.5 0 0 1 11.5 6 8.5 8.5 0 1 0 20 14.5Z" />
  </svg>
);

export const ThemeToggle = () => {
  const {
    handleToggle,
    isDark,
    label,
    moonVisible,
    sunVisible,
    transitioning,
  } = useThemeToggle();

  const toneClass = transitioning
    ? "bg-orange-200/80 border-orange-300/70 text-slate-800"
    : isDark
    ? "bg-neutral-900/70 border-neutral-700 text-slate-100"
    : "bg-white/70 border-neutral-300 text-slate-800";

  const iconBase =
    "absolute duration-300 ease-out left-1/2 top-1/2 transition-all -translate-x-1/2";

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={isDark}
      onClick={handleToggle}
      className={classNames(
        "backdrop-blur-lg border duration-300 ease-out font-semibold h-12 inline-flex items-center justify-center overflow-hidden relative rounded-full shadow-[0_10px_30px_-18px_rgba(51,65,85,0.35)] text-xs transition-all w-12",
        "  focus:outline-none focus:ring-2 focus:ring-white/50",
        toneClass
      )}
    >
      <div className="backdrop-blur-md bg-white/30 border border-current/30 flex h-9 items-center justify-center overflow-hidden relative rounded-full w-9  dark:bg-neutral-800/60">
        <div className="relative h-full w-full">
          <div
            className={classNames(
              iconBase,
              sunVisible
                ? "  opacity-100 scale-100 -translate-y-1/2"
                : "opacity-0 scale-90 translate-y-full",
              transitioning && !sunVisible && "opacity-60"
            )}
          >
            <SunIcon />
          </div>
          <div
            className={classNames(
              iconBase,
              moonVisible
                ? "  opacity-100 -rotate-[2deg] scale-100 -translate-y-1/2"
                : "  opacity-0 scale-90 -translate-y-full"
            )}
          >
            <MoonIcon />
          </div>
        </div>
      </div>
    </button>
  );
};
