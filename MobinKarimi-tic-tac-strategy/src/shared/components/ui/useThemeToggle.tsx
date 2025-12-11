import { useCallback, useEffect, useState } from "react";

import { useTheme } from "@shared/theme/useTheme";

type UseThemeToggleResult = {
  isDark: boolean;
  label: string;
  moonVisible: boolean;
  sunVisible: boolean;
  transitioning: boolean;
  handleToggle: () => void;
};

export const useThemeToggle = (): UseThemeToggleResult => {
  const { theme, toggleTheme } = useTheme();
  const [transitioning, setTransitioning] = useState(false);

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  const sunVisible = !isDark;
  const moonVisible = isDark;

  useEffect(() => {
    if (!transitioning) return;

    const timer = window.setTimeout(() => {
      setTransitioning(false);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [transitioning]);

  const handleToggle = useCallback(() => {
    setTransitioning(true);
    toggleTheme();
  }, [toggleTheme]);

  return {
    handleToggle,
    isDark,
    label,
    moonVisible,
    sunVisible,
    transitioning,
  };
};
