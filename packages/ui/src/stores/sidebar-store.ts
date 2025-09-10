import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type SidebarVariant = "sidebar" | "floating" | "inset";

interface SidebarState {
  variant: SidebarVariant;
  setVariant: (variant: SidebarVariant) => void;
}

const getInitialVariant = (): SidebarVariant => {
  if (typeof window === "undefined") return "inset";
  const stored = localStorage.getItem("sidebar-storage");
  if (!stored) return "inset";
  try {
    const parsed = JSON.parse(stored);
    return parsed?.state?.variant || "inset";
  } catch {
    return "inset";
  }
};

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      variant: getInitialVariant(),

      setVariant: (variant: SidebarVariant) => {
        set({ variant });
      },
    }),
    {
      name: "sidebar-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
