"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Loader } from "lucide-react";
import { themes } from "@workspace/ui/config/themes";
import { ThemeCard } from "@workspace/ui/components/common/theme-card";

export const ThemesList = () => {
  const { theme: activeMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="flex items-center justify-center h-32">
        {!mounted ? (
          <Loader className="animate-spin h-4 w-4" />
        ) : (
          <Loader className="h-4 w-4" />
        )}
      </div>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Themes</CardTitle>
        <CardDescription>Use default or custom themes</CardDescription>
      </CardHeader>

      <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.name}
            themeLabel={theme.label}
            themeName={theme.name}
            palette={
              activeMode === "dark" ? theme.darkPalette : theme.lightPalette
            }
          />
        ))}
      </CardContent>
    </Card>
  );
};
