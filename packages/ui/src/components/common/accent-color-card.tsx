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
import { accentColors } from "@workspace/ui/config/accent-color";
import { useAccentColorStore } from "@workspace/ui/stores/accent-color-store";
import { Loader } from "lucide-react";

export const AccentColorCard = () => {
  const { selectedColor, setSelectedColor } = useAccentColorStore();
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
        <CardTitle>Accent Colors</CardTitle>
        <CardDescription>Use system or custom accent colors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-6 md:flex md:justify-between md:items-center">
          {accentColors.map(({ name, label, color }) => (
            <div key={name} className="flex flex-col items-center">
              <button
                className={cn(
                  "relative group w-8 h-8 rounded-full transition-all duration-200 hover:scale-110",
                  color,
                  selectedColor === name &&
                    "ring-2 ring-primary ring-offset-2 ring-offset-background"
                )}
                onClick={() => setSelectedColor(name)}
                title={label}
              ></button>
              <span className="text-xs mt-1">{label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
