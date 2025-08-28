"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Loader,
  ArrowUpDown,
  Search,
  ArrowUpAZ,
  ArrowDownAZ,
} from "lucide-react";
import { themes } from "@workspace/ui/config/themes";
import { ThemeCard } from "@workspace/ui/components/common/theme-card";

export const ThemesList = () => {
  const { theme: activeMode, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [filteredThemes, setFilteredThemes] = useState(themes);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const filtered = themes.filter((theme) =>
      theme.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "az":
          return (a.name || "").localeCompare(b.name || "");
        case "za":
          return (b.name || "").localeCompare(a.name || "");
        default:
          return 0;
      }
    });

    setFilteredThemes(sorted);
  }, [themes, searchTerm, sortOption]);

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
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle>Themes</CardTitle>
            <CardDescription>Use default or custom themes</CardDescription>
          </div>

          <div className="flex flex-row gap-2 md:items-center">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
              <Input
                placeholder="Search themes..."
                className="w-full pl-8 min-w-[140px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[140px] gap-2 md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Default
                </SelectItem>
                <SelectItem value="az">
                  <ArrowDownAZ className="mr-2 h-4 w-4" />
                  Name (A-Z)
                </SelectItem>
                <SelectItem value="za">
                  <ArrowUpAZ className="mr-2 h-4 w-4" />
                  Name (Z-A)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {filteredThemes.length === 0 && searchTerm ? (
          <div className="py-12 text-center">
            <Search className="text-muted-foreground mx-auto mb-4 size-12" />
            <h3 className="mb-1 text-lg font-medium">No themes found</h3>
            <p className="text-muted-foreground text-pretty px-4">
              No themes match your search term &quot;{searchTerm}&quot;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {filteredThemes.map((theme) => (
              <ThemeCard
                key={theme.name}
                themeLabel={theme.label}
                themeName={theme.name}
                palette={
                  (activeMode === "system" ? resolvedTheme : activeMode) ===
                  "dark"
                    ? theme.darkPalette
                    : theme.lightPalette
                }
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
