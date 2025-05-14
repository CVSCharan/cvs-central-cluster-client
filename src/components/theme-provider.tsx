"use client";

import * as React from "react";
import { useThemeStore } from "@/store/ThemeStore";

type ThemeProviderProps = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useThemeStore();
  
  // Listen for system preference changes
  React.useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
      // Update theme when system preference changes
      const handleChange = () => {
        const root = window.document.documentElement;
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        
        root.classList.remove("light", "dark");
        root.classList.add(systemTheme);
      };
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  return <>{children}</>;
}

export const useTheme = () => {
  const { theme, setTheme } = useThemeStore();
  return { theme, setTheme };
};
