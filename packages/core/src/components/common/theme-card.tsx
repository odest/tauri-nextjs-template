"use client";

import { Card } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { useThemeStore } from "@workspace/core/stores/theme-store";
import { Themes } from "@workspace/core/config/themes";

interface ThemeCardProps {
  themeLabel: string;
  themeName: Themes;
  palette: string[];
}

const swatchDefinitions = [
  { name: "Primary", index: 0 },
  { name: "Secondary", index: 1 },
  { name: "Accent", index: 2 },
  { name: "Muted", index: 3 },
  { name: "Background", index: 4 },
];

export function ThemeCard({ themeLabel, themeName, palette }: ThemeCardProps) {
  const colorSwatches = swatchDefinitions.map((definition) => ({
    name: definition.name,
    bg: palette[definition.index],
  }));
  const { selectedTheme, setSelectedTheme } = useThemeStore();

  return (
    <Card
      className={cn(
        "p-1 gap-0 rounded-lg",
        "[content-visibility:auto] [contain-intrinsic-size:200px]",
      )}
    >
      <div className="relative flex h-36">
        {colorSwatches.map((swatch) => (
          <div
            key={swatch.name + swatch.bg}
            className={cn(
              "group/swatch relative h-full flex-1 ml-1 border first:ml-0 rounded-lg transition-all duration-300 ease-in-out",
              "hover:grow-[1.5]",
            )}
            style={{ backgroundColor: swatch.bg }}
          >
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "opacity-0 group-hover/swatch:opacity-100",
                "transition-opacity duration-300 ease-in-out",
                "pointer-events-none -rotate-90 whitespace-nowrap tracking-wider",
              )}
            >
              <span className="bg-black/50 text-white backdrop-blur-sm px-2 py-0.5 rounded-md shadow-xs [font-size:var(--comp-text-xs)] [line-height:var(--comp-lh-xs)] font-medium">
                {swatch.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={() => setSelectedTheme(themeName)}
        className={cn(
          "w-full h-(--comp-h-12) mt-1 border [font-size:var(--comp-text-sm)] [line-height:var(--comp-lh-sm)] font-medium",
          selectedTheme === themeName
            ? "bg-primary text-primary-foreground"
            : "bg-background text-foreground",
        )}
      >
        {themeLabel}
      </Button>
    </Card>
  );
}
