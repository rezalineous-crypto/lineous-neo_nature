"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  defaultTheme: Theme;
  setTheme: (theme: Theme) => void;
  setDefaultTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  defaultTheme: "light",
  setTheme: () => {},
  setDefaultTheme: () => {},
  toggleTheme: () => {},
});

const DEFAULT_THEME_KEY = "theme-default";
const SESSION_THEME_KEY = "theme-session";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [defaultTheme, setDefaultThemeState] = useState<Theme>("light");
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    setMounted(true);
    const storedDefault = localStorage.getItem(DEFAULT_THEME_KEY) as Theme | null;
    const storedSession = localStorage.getItem(SESSION_THEME_KEY) as Theme | null;

    const initialDefault = storedDefault || "light";
    const initialTheme = storedSession || initialDefault;

    setDefaultThemeState(initialDefault);
    setThemeState(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem(SESSION_THEME_KEY, newTheme);
    },
    []
  );

  const setDefaultTheme = useCallback(
    (newDefault: Theme) => {
      setDefaultThemeState(newDefault);
      localStorage.setItem(DEFAULT_THEME_KEY, newDefault);
      setTheme(newDefault);
    },
    [setTheme]
  );

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  }, [theme, setTheme]);

  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{ theme: "light", defaultTheme: "light", setTheme, setDefaultTheme, toggleTheme }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider
      value={{ theme, defaultTheme, setTheme, setDefaultTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context;
}
