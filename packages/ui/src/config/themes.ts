export type Themes =
  | "default"
  | "amber-minimal"
  | "amethyst-haze"
  | "bold-tech"
  | "bubblegum"
  | "caffeine"
  | "candyland"
  | "catppuccin"
  | "claude"
  | "claymorphism"
  | "clean-slate"
  | "cosmic-night"
  | "cyberpunk"
  | "darkmatter"
  | "doom-64"
  | "elegant-luxury"
  | "graphite"
  | "kodama-grove"
  | "midnight-bloom"
  | "mocha-mousse"
  | "modern-minimal"
  | "mono"
  | "nature"
  | "neo-brutalism"
  | "northern-lights"
  | "notebook"
  | "ocean-breeze"
  | "pastel-dreams"
  | "perpetuity"
  | "quantum-rose"
  | "retro-arcade"
  | "soft-pop"
  | "solar-dusk"
  | "starry-night"
  | "sunset-horizon"
  | "supabase"
  | "t3-chat"
  | "tangerine"
  | "twitter"
  | "vercel"
  | "vintage-paper"
  | "violet-bloom";

export const themes: {
  name: Themes;
  label: string;
  lightPalette: [string, string, string, string];
  darkPalette: [string, string, string, string];
}[] = [
  {
    name: "default",
    label: "Default",
    lightPalette: [
      "oklch(0.205 0 0)",
      "oklch(0.97 0 0)",
      "oklch(0.97 0 0)",
      "oklch(0.922 0 0)",
    ],
    darkPalette: [
      "oklch(0.922 0 0)",
      "oklch(0.371 0 0)",
      "oklch(0.269 0 0)",
      "oklch(0.275 0 0)",
    ],
  },
  {
    name: "amber-minimal",
    label: "Amber Minimal",
    lightPalette: ["#f59e0b", "#fffbeb", "#f3f4f6", "#e5e7eb"],
    darkPalette: ["#f59e0b", "#92400e", "#262626", "#404040"],
  },
  {
    name: "amethyst-haze",
    label: "Amethyst Haze",
    lightPalette: ["#8a79ab", "#e6a5b8", "#dfd9ec", "#cec9d9"],
    darkPalette: ["#a995c9", "#372e3f", "#5a5370", "#302c40"],
  },
  {
    name: "bold-tech",
    label: "Bold Tech",
    lightPalette: ["#8b5cf6", "#dbeafe", "#f3f0ff", "#e0e7ff"],
    darkPalette: ["#8b5cf6", "#4338ca", "#1e1b4b", "#2e1065"],
  },
  {
    name: "bubblegum",
    label: "Bubblegum",
    lightPalette: ["#d04f99", "#fbe2a7", "#8acfd1", "#d04f99"],
    darkPalette: ["#fbe2a7", "#c67b96", "#e4a2b1", "#324859"],
  },
  {
    name: "caffeine",
    label: "Caffeine",
    lightPalette: ["#644a40", "#e8e8e8", "#ffdfb5", "#d8d8d8"],
    darkPalette: ["#ffe0c2", "#2a2a2a", "#393028", "#201e18"],
  },
  {
    name: "candyland",
    label: "Candyland",
    lightPalette: ["#ffc0cb", "#ffff00", "#87ceeb", "#d4d4d4"],
    darkPalette: ["#ff99cc", "#87ceeb", "#33cc33", "#444444"],
  },
  {
    name: "catppuccin",
    label: "Catppuccin",
    lightPalette: ["#8839ef", "#04a5e5", "#ccd0da", "#bcc0cc"],
    darkPalette: ["#cba6f7", "#89dceb", "#585b70", "#313244"],
  },
  {
    name: "claude",
    label: "Claude",
    lightPalette: ["#c96442", "#e9e6dc", "#e9e6dc", "#dad9d4"],
    darkPalette: ["#d97757", "#1a1915", "#faf9f5", "#3e3e38"],
  },
  {
    name: "claymorphism",
    label: "Claymorphism",
    lightPalette: ["#6366f1", "#f3e5f5", "#d6d3d1", "#d6d3d1"],
    darkPalette: ["#818cf8", "#484441", "#3a3633", "#3a3633"],
  },
  {
    name: "clean-slate",
    label: "Clean Slate",
    lightPalette: ["#6366f1", "#e0e7ff", "#e5e7eb", "#d1d5db"],
    darkPalette: ["#818cf8", "#374151", "#2d3748", "#4b5563"],
  },
  {
    name: "cosmic-night",
    label: "Cosmic Night",
    lightPalette: ["#6e56cf", "#d8e6ff", "#e4dfff", "#e0e0f0"],
    darkPalette: ["#a48fff", "#303060", "#2d2b55", "#303052"],
  },
  {
    name: "cyberpunk",
    label: "Cyberpunk",
    lightPalette: ["#ff00c8", "#00ffcc", "#f0f0ff", "#dfe6e9"],
    darkPalette: ["#ff00c8", "#00ffcc", "#1e1e3f", "#2e2e5e"],
  },
  {
    name: "darkmatter",
    label: "Darkmatter",
    lightPalette: ["#d87943", "#eeeeee", "#527575", "#e5e7eb"],
    darkPalette: ["#e78a53", "#333333", "#5f8787", "#222222"],
  },
  {
    name: "doom-64",
    label: "Doom 64",
    lightPalette: ["#b71c1c", "#4682b4", "#556b2f", "#505050"],
    darkPalette: ["#e53935", "#64b5f6", "#689f38", "#4a4a4a"],
  },
  {
    name: "elegant-luxury",
    label: "Elegant Luxury",
    lightPalette: ["#9b2c2c", "#fef3c7", "#fdf2d6", "#f5e8d2"],
    darkPalette: ["#b91c1c", "#b45309", "#92400e", "#44403c"],
  },
  {
    name: "graphite",
    label: "Graphite",
    lightPalette: ["#606060", "#c0c0c0", "#e0e0e0", "#d0d0d0"],
    darkPalette: ["#a0a0a0", "#404040", "#303030", "#353535"],
  },
  {
    name: "kodama-grove",
    label: "Kodama Grove",
    lightPalette: ["#8d9d4f", "#dbc894", "#decea0", "#b19681"],
    darkPalette: ["#8a9f7b", "#a18f5c", "#5a5345", "#5a5345"],
  },
  {
    name: "midnight-bloom",
    label: "Midnight Bloom",
    lightPalette: ["#6c5ce7", "#8b9467", "#a1c9f2", "#d4d4d4"],
    darkPalette: ["#6c5ce7", "#6495ed", "#4b0082", "#444444"],
  },
  {
    name: "mocha-mousse",
    label: "Mocha Mousse",
    lightPalette: ["#A37764", "#E4C7B8", "#BAAB92", "#BAAB92"],
    darkPalette: ["#C39E88", "#BAAB92", "#8A655A", "#56453F"],
  },
  {
    name: "modern-minimal",
    label: "Modern Minimal",
    lightPalette: ["#3b82f6", "#e0f2fe", "#f3f4f6", "#e5e7eb"],
    darkPalette: ["#3b82f6", "#1e3a8a", "#262626", "#404040"],
  },
  {
    name: "mono",
    label: "Mono",
    lightPalette: ["#737373", "#f5f5f5", "#f5f5f5", "#e5e5e5"],
    darkPalette: ["#737373", "#404040", "#262626", "#383838"],
  },
  {
    name: "nature",
    label: "Nature",
    lightPalette: ["#2e7d32", "#c8e6c9", "#e8f5e9", "#e0d6c9"],
    darkPalette: ["#4caf50", "#388e3c", "#3e4a3d", "#3e4a3d"],
  },
  {
    name: "neo-brutalism",
    label: "Neo Brutalism",
    lightPalette: ["#ff3333", "#0066ff", "#ffff00", "#000000"],
    darkPalette: ["#ff6666", "#3399ff", "#ffff33", "#ffffff"],
  },
  {
    name: "northern-lights",
    label: "Northern Lights",
    lightPalette: ["#34a85a", "#66d9ef", "#6495ed", "#d4d4d4"],
    darkPalette: ["#34a85a", "#6495ed", "#4682b4", "#444444"],
  },
  {
    name: "notebook",
    label: "Notebook",
    lightPalette: ["#606060", "#f3eac8", "#dedede", "#747272"],
    darkPalette: ["#b0b0b0", "#e0e0e0", "#5a5a5a", "#4f4f4f"],
  },
  {
    name: "ocean-breeze",
    label: "Ocean Breeze",
    lightPalette: ["#22c55e", "#d1fae5", "#e0f2fe", "#e5e7eb"],
    darkPalette: ["#34d399", "#374151", "#2d3748", "#4b5563"],
  },
  {
    name: "pastel-dreams",
    label: "Pastel Dreams",
    lightPalette: ["#a78bfa", "#f3e5f5", "#e9d8fd", "#e9d8fd"],
    darkPalette: ["#c0aafd", "#4a3d5a", "#3f324a", "#3f324a"],
  },
  {
    name: "perpetuity",
    label: "Perpetuity",
    lightPalette: ["#06858e", "#c9e5e7", "#d9eaea", "#cde0e2"],
    darkPalette: ["#4de8e8", "#164955", "#164955", "#164955"],
  },
  {
    name: "quantum-rose",
    label: "Quantum Rose",
    lightPalette: ["#e6067a", "#ffc1e3", "#ffd6ff", "#ffc7e6"],
    darkPalette: ["#ff6bef", "#5a1f5d", "#46204f", "#4a1b5f"],
  },
  {
    name: "retro-arcade",
    label: "Retro Arcade",
    lightPalette: ["#d33682", "#cb4b16", "#2aa198", "#839496"],
    darkPalette: ["#d33682", "#cb4b16", "#2aa198", "#586e75"],
  },
  {
    name: "soft-pop",
    label: "Soft Pop",
    lightPalette: ["#4f46e5", "#f59e0b", "#14b8a6", "#000000"],
    darkPalette: ["#818cf8", "#fcd34d", "#2dd4bf", "#545454"],
  },
  {
    name: "solar-dusk",
    label: "Solar Dusk",
    lightPalette: ["#B45309", "#f2daba", "#E4C090", "#E4D9BC"],
    darkPalette: ["#F97316", "#1e4252", "#57534E", "#44403C"],
  },
  {
    name: "starry-night",
    label: "Starry Night",
    lightPalette: ["#3a5ba0", "#6ea3c1", "#f7c873", "#b0b8c1"],
    darkPalette: ["#3a5ba0", "#bccdf0", "#ffe066", "#2d2e3e"],
  },
  {
    name: "sunset-horizon",
    label: "Sunset Horizon",
    lightPalette: ["#ff7e5f", "#feb47b", "#ffedea", "#ffe0d6"],
    darkPalette: ["#ff7e5f", "#feb47b", "#463a41", "#463a41"],
  },
  {
    name: "supabase",
    label: "Supabase",
    lightPalette: ["#72e3ad", "#ededed", "#fdfdfd", "#dfdfdf"],
    darkPalette: ["#006239", "#313131", "#242424", "#292929"],
  },
  {
    name: "t3-chat",
    label: "T3 Chat",
    lightPalette: ["#a84370", "#f1c4e6", "#f1c4e6", "#efbdeb"],
    darkPalette: ["#a3004c", "#463753", "#362d3d", "#3b3237"],
  },
  {
    name: "tangerine",
    label: "Tangerine",
    lightPalette: ["#e05d38", "#d6e4f0", "#f3f4f6", "#dcdfe2"],
    darkPalette: ["#e05d38", "#2a3656", "#2a303e", "#3d4354"],
  },
  {
    name: "twitter",
    label: "Twitter",
    lightPalette: ["#1e9df1", "#E3ECF6", "#0f1419", "#e1eaef"],
    darkPalette: ["#1c9cf0", "#061622", "#f0f3f4", "#242628"],
  },
  {
    name: "vercel",
    label: "Vercel",
    lightPalette: [
      "oklch(0 0 0)",
      "oklch(0.94 0 0)",
      "oklch(0.94 0 0)",
      "oklch(0.92 0 0)",
    ],
    darkPalette: [
      "oklch(1.00 0 0)",
      "oklch(0.32 0 0)",
      "oklch(0.25 0 0)",
      "oklch(0.26 0 0)",
    ],
  },
  {
    name: "vintage-paper",
    label: "Vintage Paper",
    lightPalette: ["#a67c52", "#d4c8aa", "#e2d8c3", "#dbd0ba"],
    darkPalette: ["#c0a080", "#59493e", "#4a4039", "#4a4039"],
  },
  {
    name: "violet-bloom",
    label: "Violet Bloom",
    lightPalette: ["#7033ff", "#e2ebff", "#edf0f4", "#e7e7ee"],
    darkPalette: ["#8c5cff", "#1e293b", "#2a2c33", "#33353a"],
  },
];
