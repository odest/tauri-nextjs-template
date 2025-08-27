"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import { themes } from "@workspace/ui/config/themes";
import { useTheme } from "next-themes";
import { useThemeStore } from "@workspace/ui/stores/theme-store";
import { Loader } from "lucide-react";

export const ThemeCard = () => {
  const { selectedTheme, setSelectedTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

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
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {themes.map(({ name, label, lightPalette, darkPalette }) => {
            const palette = theme === "dark" ? darkPalette : lightPalette;
            return (
              <button
                key={name}
                onClick={() => setSelectedTheme(name)}
                className={cn(
                  "w-full border rounded-lg p-3 md:p-4 flex flex-col items-center shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-md",
                  selectedTheme === name && "ring-2 ring-primary"
                )}
              >
                <h4 className="font-semibold text-sm sm:text-base mb-2 text-center">
                  {label}
                </h4>
                <div className="grid grid-cols-4 md:grid-cols-2 gap-2 sm:gap-3">
                  {palette.map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
