"use client";

import { useMemo } from "react";
import { Laptop, Moon, Sun } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Label } from "@workspace/ui/components/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useSidebar } from "@workspace/ui/components/sidebar";
import { useMounted } from "@workspace/core/hooks/use-mounted";
import { useThemeTransition } from "@workspace/core/hooks/use-theme-transition";
import { SettingsCardSkeleton } from "@workspace/core/components/common/settings-card-skeleton";
import { useTranslations } from "@workspace/i18n";

export const ModeCard = () => {
  const { theme, handleThemeChange } = useThemeTransition();
  const { state } = useSidebar();
  const mounted = useMounted();
  const t = useTranslations("ModeCard");

  const gridClasses = useMemo(
    () =>
      state === "collapsed"
        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
    [state],
  );

  if (!mounted) return <SettingsCardSkeleton gridClasses={gridClasses} />;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <div className="space-y-1.5">
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </div>

        <div className="shrink-0 md:hidden">
          <Select
            value={theme}
            onValueChange={(val) =>
              handleThemeChange(val as "light" | "dark" | "system")
            }
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">
                <div className="flex items-center gap-2">
                  <Sun className="size-4" />
                  <span>{t("light")}</span>
                </div>
              </SelectItem>
              <SelectItem value="dark">
                <div className="flex items-center gap-2">
                  <Moon className="size-4" />
                  <span>{t("dark")}</span>
                </div>
              </SelectItem>
              <SelectItem value="system">
                <div className="flex items-center gap-2">
                  <Laptop className="size-4" />
                  <span>{t("system")}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="hidden md:block">
        <RadioGroup
          value={theme}
          onValueChange={(val) =>
            handleThemeChange(val as "light" | "dark" | "system")
          }
          className={gridClasses}
        >
          <div className="flex flex-col gap-3">
            <label
              htmlFor="theme-light"
              className="block w-full cursor-pointer"
            >
              <div className="relative w-full">
                <div className="border-border dark:border-muted-foreground bg-background dark:bg-foreground aspect-video w-full overflow-hidden rounded-lg border-2 transition-colors">
                  <div className="border-border dark:border-muted-foreground bg-muted dark:bg-muted-foreground/30 h-(--comp-h-5) border-b"></div>
                  <div className="mt-2 space-y-1 p-2">
                    <div className="bg-muted-foreground/20 dark:bg-muted/30 h-2 w-3/4 rounded"></div>
                    <div className="bg-muted-foreground/20 dark:bg-muted/30 h-2 w-1/2 rounded"></div>
                    <div className="bg-muted-foreground/20 dark:bg-muted/30 h-2 w-2/3 rounded"></div>
                  </div>
                </div>
                <div className="absolute top-2 left-2 flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
              </div>
            </label>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="light" id="theme-light" />
              <Label
                htmlFor="theme-light"
                className="cursor-pointer font-medium"
              >
                {t("light")}
              </Label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="theme-dark" className="block w-full cursor-pointer">
              <div className="relative w-full">
                <div className="border-muted-foreground dark:border-border bg-foreground dark:bg-background aspect-video w-full overflow-hidden rounded-lg border-2 transition-colors">
                  <div className="dark:border-border border-muted-foreground bg-muted-foreground/30 dark:bg-muted h-(--comp-h-5) border-b"></div>
                  <div className="mt-2 space-y-1 p-2">
                    <div className="bg-muted/30 dark:bg-muted-foreground/20 h-2 w-3/4 rounded"></div>
                    <div className="bg-muted/30 dark:bg-muted-foreground/20 h-2 w-1/2 rounded"></div>
                    <div className="bg-muted/30 dark:bg-muted-foreground/20 h-2 w-2/3 rounded"></div>
                  </div>
                </div>
                <div className="absolute top-2 left-2 flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
              </div>
            </label>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="dark" id="theme-dark" />
              <Label
                htmlFor="theme-dark"
                className="cursor-pointer font-medium"
              >
                {t("dark")}
              </Label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="theme-system"
              className="block w-full cursor-pointer"
            >
              <div className="relative w-full">
                <div className="relative aspect-video w-full overflow-hidden rounded-lg transition-colors">
                  <div className="border-border dark:border-muted-foreground bg-background dark:bg-foreground absolute inset-0 w-1/2 rounded-tl-lg rounded-bl-lg border-2 border-r" />
                  <div className="border-muted-foreground dark:border-border bg-foreground dark:bg-background absolute inset-0 left-1/2 w-1/2 rounded-tr-lg rounded-br-lg border-2 border-l" />

                  <div className="relative">
                    <div className="flex h-(--comp-h-5)">
                      <div className="border-border dark:border-muted-foreground bg-muted dark:bg-muted/30 w-1/2 rounded-tl-lg border-2 border-r"></div>
                      <div className="border-muted-foreground dark:border-border bg-muted/30 dark:bg-muted w-1/2 rounded-tr-lg border-2 border-l"></div>
                    </div>
                    <div className="mt-2 space-y-1 p-2">
                      <div className="flex h-2 rounded-full">
                        <div className="bg-muted-foreground/20 dark:bg-muted/30 w-1/2 rounded-tl-md rounded-bl-md"></div>
                        <div className="bg-muted/30 dark:bg-muted-foreground/20 w-1/4 rounded-tr-md rounded-br-md"></div>
                      </div>
                      <div className="flex h-2 rounded-full">
                        <div className="bg-muted-foreground/20 dark:bg-muted/30 w-1/2 rounded-md"></div>
                      </div>
                      <div className="flex h-2 rounded-full">
                        <div className="bg-muted-foreground/20 dark:bg-muted/30 w-1/2 rounded-tl-md rounded-bl-md"></div>
                        <div className="bg-muted/30 dark:bg-muted-foreground/20 w-1/6 rounded-tr-md rounded-br-md"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-2 left-2 flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                </div>
              </div>
            </label>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="system" id="theme-system" />
              <Label
                htmlFor="theme-system"
                className="cursor-pointer font-medium"
              >
                {t("system")}
              </Label>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
