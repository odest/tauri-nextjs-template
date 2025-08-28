"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Label } from "@workspace/ui/components/label";
import { Loader } from "lucide-react";
import { useThemeTransition } from "@workspace/ui/hooks/use-theme-transition";

export const ModeCard = () => {
  const { theme, handleThemeChange } = useThemeTransition();
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
        <CardTitle>Modes</CardTitle>
        <CardDescription>
          Choose your mode or customize your style
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          className="flex flex-col gap-3 cursor-pointer"
          onClick={(e) => handleThemeChange("light", e)}
        >
          <div className="relative">
            <div className="aspect-video rounded-lg border-2 border-gray-300 bg-white overflow-hidden transition-colors">
              <div className="h-5 bg-gray-100"></div>
              <div className="p-2 space-y-1 mt-2">
                <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                <div className="h-2 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            <div className="absolute top-2 left-2 flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors">
              {theme === "light" && (
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              )}
            </div>
            <Label className="font-medium">Light</Label>
          </div>
        </div>

        <div
          className="flex flex-col gap-3 cursor-pointer"
          onClick={(e) => handleThemeChange("dark", e)}
        >
          <div className="relative">
            <div className="aspect-video rounded-lg border-2 border-gray-300 bg-gray-900 overflow-hidden transition-colors">
              <div className="h-5 bg-gray-800"></div>
              <div className="p-2 space-y-1 mt-2">
                <div className="h-2 bg-gray-700 rounded w-3/4"></div>
                <div className="h-2 bg-gray-700 rounded w-1/2"></div>
                <div className="h-2 bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
            <div className="absolute top-2 left-2 flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors">
              {theme === "dark" && (
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              )}
            </div>
            <Label className="font-medium">Dark</Label>
          </div>
        </div>

        <div
          className="flex flex-col gap-3 cursor-pointer"
          onClick={(e) => handleThemeChange("system", e)}
        >
          <div className="relative">
            <div className="aspect-video rounded-lg border-2 border-gray-300 overflow-hidden relative transition-colors">
              <div className="absolute inset-0 w-1/2 bg-white" />
              <div className="absolute inset-0 left-1/2 w-1/2 bg-gray-900" />

              <div className="relative">
                <div className="h-5 flex">
                  <div className="w-1/2 bg-gray-100"></div>
                  <div className="w-1/2 bg-gray-800"></div>
                </div>
                <div className="p-2 space-y-1 mt-2">
                  <div className="h-2 flex rounded-full">
                    <div className="w-1/2 rounded-full bg-gray-200"></div>
                    <div className="w-1/4 rounded-full bg-gray-700"></div>
                  </div>
                  <div className="h-2 flex rounded-full">
                    <div className="w-1/2 rounded-full bg-gray-200"></div>
                  </div>
                  <div className="h-2 flex rounded-full">
                    <div className="w-1/2 rounded-full bg-gray-200"></div>
                    <div className="w-1/6 rounded-full bg-gray-700"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-2 left-2 flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors">
              {theme === "system" && (
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              )}
            </div>
            <Label className="font-medium">System</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
