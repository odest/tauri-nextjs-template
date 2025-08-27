import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AccentColor } from "@workspace/ui/config/accent-color";

interface AccentColorState {
  selectedColor: AccentColor;
  setSelectedColor: (color: AccentColor) => void;
}

const getInitialAccent = () => {
  if (typeof window === "undefined") return "zinc";
  const stored = localStorage.getItem("accent-color-storage");
  if (!stored) return "zinc";
  try {
    const parsed = JSON.parse(stored);
    return parsed?.state?.selectedColor || "zinc";
  } catch {
    return "zinc";
  }
};

export const applyAccentColor = (color: AccentColor) => {
  const root = document.documentElement;
  root.setAttribute("data-theme", color);
};

export const useAccentColorStore = create<AccentColorState>()(
  persist(
    (set) => ({
      selectedColor: getInitialAccent(),

      setSelectedColor: (color: AccentColor) => {
        set({ selectedColor: color });
        applyAccentColor(color);
      },
    }),
    {
      name: "accent-color-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
