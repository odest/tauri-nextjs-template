export type AccentColor =
  | "zinc"
  | "red"
  | "rose"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "violet";

export const accentColors: {
  name: AccentColor;
  label: string;
  color: string;
}[] = [
  {
    name: "zinc",
    label: "Zinc",
    color: "bg-zinc-900",
  },
  { name: "red", label: "Red", color: "bg-red-500" },
  {
    name: "rose",
    label: "Rose",
    color: "bg-rose-500",
  },
  {
    name: "orange",
    label: "Orange",
    color: "bg-orange-500",
  },
  {
    name: "green",
    label: "Green",
    color: "bg-green-500",
  },
  {
    name: "blue",
    label: "Blue",
    color: "bg-blue-500",
  },
  {
    name: "yellow",
    label: "Yellow",
    color: "bg-yellow-500",
  },
  {
    name: "violet",
    label: "Violet",
    color: "bg-violet-500",
  },
];
