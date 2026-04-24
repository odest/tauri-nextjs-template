"use client";

import { useState, useEffect } from "react";
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
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@workspace/ui/components/input-group";
import {
  XCircle,
  ArrowUpDown,
  Search,
  ArrowUpAZ,
  ArrowDownAZ,
} from "lucide-react";
import { themes } from "@workspace/core/config/themes";
import { ThemeCard } from "@workspace/core/components/common/theme-card";
import { useThemeStore } from "@workspace/core/stores/theme-store";
import { useMounted } from "@workspace/core/hooks/use-mounted";
import { useTranslations } from "@workspace/i18n";
import { useThemeTransition } from "@workspace/core/hooks/use-theme-transition";

export const ThemesList = () => {
  const { theme: activeMode, resolvedTheme } = useThemeTransition();
  const mounted = useMounted();
  const t = useTranslations("ThemesList");

  const [filteredThemes, setFilteredThemes] = useState(themes);
  const [searchTerm, setSearchTerm] = useState("");
  const { sortOption, setSortOption } = useThemeStore();

  useEffect(() => {
    const filtered = themes.filter((theme) =>
      theme.name?.toLowerCase().includes(searchTerm.toLowerCase()),
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
  }, [searchTerm, sortOption]);

  if (!mounted)
    return (
      <Card>
        <CardHeader className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <Skeleton className="h-(--comp-h-6) w-20 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:items-center">
              <div className="relative flex-1">
                <Skeleton className="h-(--comp-h-9) w-full min-w-[140px] max-w-full rounded-md" />
              </div>
              <Skeleton className="h-(--comp-h-9) w-full sm:w-40 md:w-[180px] rounded-md" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
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
              <InputGroup>
                <InputGroupInput
                  id="inline-start-input"
                  className="w-full min-w-[140px] max-w-full text-ellipsis break-all"
                  placeholder={t("searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <InputGroupAddon align="inline-start">
                  <Search className="text-muted-foreground" />
                </InputGroupAddon>
                {searchTerm && (
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label="Copy"
                      title="Copy"
                      size="icon-xs"
                      onClick={() => setSearchTerm("")}
                    >
                      <XCircle />
                    </InputGroupButton>
                  </InputGroupAddon>
                )}
              </InputGroup>
            </div>

            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-full sm:w-40 gap-2 md:w-[180px]">
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
            <Search className="text-muted-foreground mx-auto mb-4 size-(--comp-h-12)" />
            <h3 className="mb-1 [font-size:var(--comp-text-lg)] [line-height:var(--comp-lh-lg)] font-medium">
              {t("noThemesTitle")}
            </h3>
            <p className="text-muted-foreground text-pretty px-4">
              {t("noThemesDescription")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
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
