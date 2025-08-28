"use client";

import { Card } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { useThemeStore } from "@workspace/ui/stores/theme-store";
import { Themes } from "@workspace/ui/config/themes";

interface ThemeCardProps {
  themeLabel: string;
  themeName: Themes;
  palette: string[];
}

const swatchDefinitions = [
  { name: "Primary", foreground: "text-primary-foreground", index: 0 },
  { name: "Secondary", foreground: "text-secondary-foreground", index: 1 },
  { name: "Accent", foreground: "text-accent-foreground", index: 2 },
  { name: "Muted", foreground: "text-muted-foreground", index: 3 },
  { name: "Background", foreground: "text-foreground", index: 4 },
];

export function ThemeCard({ themeLabel, themeName, palette }: ThemeCardProps) {
  const colorSwatches = swatchDefinitions.map((definition) => ({
    name: definition.name,
    bg: palette[definition.index],
    fg: definition.foreground,
  }));
  const { selectedTheme, setSelectedTheme } = useThemeStore();

  return (
    <Card className="p-1 gap-0 rounded-lg">
      <div className="relative flex h-36">
        {colorSwatches.map((swatch) => (
          <div
            key={swatch.name + swatch.bg}
            className={cn(
              "group/swatch relative h-full flex-1 ml-1 border first:ml-0 rounded-lg transition-all duration-300 ease-in-out",
              "hover:flex-grow-[1.5]"
            )}
            style={{ backgroundColor: swatch.bg }}
          >
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center",
                "opacity-0 group-hover/swatch:opacity-100",
                "transition-opacity duration-300 ease-in-out",
                "pointer-events-none text-xs font-medium",
                swatch.fg
              )}
            >
              {swatch.name}
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={() => setSelectedTheme(themeName)}
        className={cn(
          "w-full h-12 mt-1 border text-sm font-medium",
          selectedTheme === themeName
            ? "bg-primary text-primary-foreground"
            : "bg-background text-foreground"
        )}
      >
        {themeLabel}
      </Button>
    </Card>
  );
}
