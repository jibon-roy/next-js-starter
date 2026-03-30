"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyHtmlClass(theme: Theme) {
  const isDark =
    theme === "dark" || (theme === "system" && getSystemTheme() === "dark");
  const root = document.documentElement;
  if (isDark) root.classList.add("dark");
  else root.classList.remove("dark");
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const stored =
        typeof window !== "undefined" ? localStorage.getItem("theme") : null;
      return (stored as Theme) || "system";
    } catch (e) {
      return "system";
    }
  });

  useEffect(() => {
    applyHtmlClass(theme);

    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;

    const handle = () => {
      // re-apply when system preference changes and theme is system
      if (theme === "system") applyHtmlClass("system");
    };

    if (mq.addEventListener) mq.addEventListener("change", handle);
    else mq.addListener(handle as any);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handle);
      else mq.removeListener(handle as any);
    };
  }, [theme]);

  const setTheme = (t: Theme) => {
    try {
      localStorage.setItem("theme", t);
    } catch (e) {
      /* ignore */
    }
    setThemeState(t);
  };

  const resolvedTheme = useMemo(
    () => (theme === "system" ? getSystemTheme() : (theme as "light" | "dark")),
    [theme],
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
