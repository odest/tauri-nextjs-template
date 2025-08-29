import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Themes } from "@workspace/ui/config/themes";

interface ThemeState {
  selectedTheme: Themes;
  sortOption: string;
  setSelectedTheme: (theme: Themes) => void;
  setSortOption: (sortOption: string) => void;
}

const getInitialTheme = () => {
  if (typeof window === "undefined") return "default";
  const stored = localStorage.getItem("theme-storage");
  if (!stored) return "default";
  try {
    const parsed = JSON.parse(stored);
    return parsed?.state?.selectedTheme || "default";
  } catch {
    return "default";
  }
};

export const applyTheme = (theme: Themes) => {
  const root = document.documentElement;
  if (theme === "default" || !theme) {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      selectedTheme: getInitialTheme(),
      sortOption: "default",

      setSelectedTheme: (theme: Themes) => {
        set({ selectedTheme: theme });
        applyTheme(theme);
      },

      setSortOption: (sortOption: string) => set({ sortOption }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
