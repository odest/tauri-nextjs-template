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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 gap-4">
        <div className="space-y-1.5">
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription>{t("description")}</CardDescription>
        </div>

        <div className="md:hidden shrink-0">
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
              className="cursor-pointer block w-full"
            >
              <div className="relative w-full">
                <div className="aspect-video w-full rounded-lg border-2 border-border dark:border-muted-foreground bg-background dark:bg-foreground overflow-hidden transition-colors">
                  <div className="h-(--comp-h-5) border-b border-border dark:border-muted-foreground bg-muted dark:bg-muted-foreground/30"></div>
                  <div className="p-2 space-y-1 mt-2">
                    <div className="h-2 bg-muted-foreground/20 rounded dark:bg-muted/30 w-3/4"></div>
                    <div className="h-2 bg-muted-foreground/20 rounded dark:bg-muted/30 w-1/2"></div>
                    <div className="h-2 bg-muted-foreground/20 rounded dark:bg-muted/30 w-2/3"></div>
                  </div>
                </div>
                <div className="absolute top-2 left-2 flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
            </label>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="light" id="theme-light" />
              <Label
                htmlFor="theme-light"
                className="font-medium cursor-pointer"
              >
                {t("light")}
              </Label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="theme-dark" className="cursor-pointer block w-full">
              <div className="relative w-full">
                <div className="aspect-video w-full rounded-lg border-2 border-muted-foreground dark:border-border bg-foreground dark:bg-background overflow-hidden transition-colors">
                  <div className="h-(--comp-h-5) border-b dark:border-border border-muted-foreground bg-muted-foreground/30 dark:bg-muted"></div>
                  <div className="p-2 space-y-1 mt-2">
                    <div className="h-2 bg-muted/30 dark:bg-muted-foreground/20 rounded w-3/4"></div>
                    <div className="h-2 bg-muted/30 dark:bg-muted-foreground/20 rounded w-1/2"></div>
                    <div className="h-2 bg-muted/30 dark:bg-muted-foreground/20 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="absolute top-2 left-2 flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
            </label>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="dark" id="theme-dark" />
              <Label
                htmlFor="theme-dark"
                className="font-medium cursor-pointer"
              >
                {t("dark")}
              </Label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="theme-system"
              className="cursor-pointer block w-full"
            >
              <div className="relative w-full">
                <div className="aspect-video w-full rounded-lg overflow-hidden relative transition-colors">
                  <div className="absolute inset-0 w-1/2 rounded-tl-lg rounded-bl-lg border-2 border-r border-border dark:border-muted-foreground bg-background dark:bg-foreground" />
                  <div className="absolute inset-0 left-1/2 w-1/2 rounded-tr-lg rounded-br-lg border-2 border-l border-muted-foreground dark:border-border bg-foreground dark:bg-background" />

                  <div className="relative">
                    <div className="h-(--comp-h-5) flex">
                      <div className="w-1/2 rounded-tl-lg border-2 border-r border-border dark:border-muted-foreground bg-muted dark:bg-muted/30"></div>
                      <div className="w-1/2 rounded-tr-lg border-2 border-l border-muted-foreground dark:border-border bg-muted/30 dark:bg-muted"></div>
                    </div>
                    <div className="p-2 space-y-1 mt-2">
                      <div className="h-2 flex rounded-full">
                        <div className="w-1/2 rounded-tl-md rounded-bl-md bg-muted-foreground/20 dark:bg-muted/30"></div>
                        <div className="w-1/4 rounded-tr-md rounded-br-md bg-muted/30 dark:bg-muted-foreground/20"></div>
                      </div>
                      <div className="h-2 flex rounded-full">
                        <div className="w-1/2 rounded-md bg-muted-foreground/20 dark:bg-muted/30"></div>
                      </div>
                      <div className="h-2 flex rounded-full">
                        <div className="w-1/2 rounded-tl-md rounded-bl-md bg-muted-foreground/20 dark:bg-muted/30"></div>
                        <div className="w-1/6 rounded-tr-md rounded-br-md bg-muted/30 dark:bg-muted-foreground/20"></div>
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
            </label>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="system" id="theme-system" />
              <Label
                htmlFor="theme-system"
                className="font-medium cursor-pointer"
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
