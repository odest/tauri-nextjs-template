import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getStorageItem } from "@workspace/ui/lib/storage-utils";
import { Themes } from "@workspace/ui/config/themes";

interface ThemeState {
  selectedTheme: Themes;
  sortOption: string;
  setSelectedTheme: (theme: Themes) => void;
  setSortOption: (sortOption: string) => void;
}

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
      selectedTheme: getStorageItem<Themes>("theme-storage", "default"),
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
