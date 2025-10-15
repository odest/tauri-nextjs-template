"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Input } from "@workspace/ui/components/input";
import { Skeleton } from "@workspace/ui/components/skeleton";
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
  XCircle,
  ArrowUpDown,
  Search,
  ArrowUpAZ,
  ArrowDownAZ,
} from "lucide-react";
import { themes } from "@workspace/ui/config/themes";
import { ThemeCard } from "@workspace/ui/components/common/theme-card";
import { useThemeStore } from "@workspace/ui/stores/theme-store";
import { useMounted } from "@workspace/ui/hooks/use-mounted";
import { useTranslations } from "@workspace/i18n";

export const ThemesList = () => {
  const { theme: activeMode, resolvedTheme } = useTheme();
  const mounted = useMounted();
  const t = useTranslations("ThemesList");

  const [filteredThemes, setFilteredThemes] = useState(themes);
  const [searchTerm, setSearchTerm] = useState("");
  const { sortOption, setSortOption } = useThemeStore();

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

  if (!mounted)
    return (
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <Skeleton className="h-6 w-20 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:items-center">
              <div className="relative flex-1">
                <Skeleton className="h-9 w-full min-w-[140px] max-w-full rounded-md" />
              </div>
              <Skeleton className="h-9 w-full sm:w-[160px] md:w-[180px] rounded-md" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-video rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle>{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 md:items-center">
            <div className="relative flex-1">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
              <Input
                placeholder={t("searchPlaceholder")}
                className="w-full pl-8 pr-8 min-w-[140px] max-w-full text-ellipsis break-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-muted-foreground hover:text-foreground absolute top-2.5 right-2.5 size-4 transition-colors"
                >
                  <XCircle className="size-4" />
                </button>
              )}
            </div>

            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full sm:w-[160px] gap-2 md:w-[180px]">
                <SelectValue placeholder={t("sortBy")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  {t("sortDefault")}
                </SelectItem>
                <SelectItem value="az">
                  <ArrowDownAZ className="mr-2 h-4 w-4" />
                  {t("sortAZ")}
                </SelectItem>
                <SelectItem value="za">
                  <ArrowUpAZ className="mr-2 h-4 w-4" />
                  {t("sortZA")}
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
            <h3 className="mb-1 text-lg font-medium">{t("noThemesTitle")}</h3>
            <p className="text-muted-foreground text-pretty px-4">
              {t("noThemesDescription")}
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
