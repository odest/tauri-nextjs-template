import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GreetState {
  name: string;
  greetMsg: string;
  setName: (name: string) => void;
  setGreetMsg: (message: string) => void;
}

export const useGreetStore = create<GreetState>()(
  persist(
    (set) => ({
      name: "",
      greetMsg: "",
      setName: (name: string) => set({ name }),
      setGreetMsg: (message: string) => set({ greetMsg: message }),
    }),
    {
      name: "greet-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
