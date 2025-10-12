import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getStorageItem } from "@workspace/ui/lib/storage-utils";

export type SidebarVariant = "sidebar" | "floating" | "inset";

interface SidebarState {
  variant: SidebarVariant;
  setVariant: (variant: SidebarVariant) => void;
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      variant: getStorageItem<SidebarVariant>("sidebar-storage", "inset"),

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
