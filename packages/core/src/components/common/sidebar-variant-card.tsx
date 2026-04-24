"use client";

import { useMemo } from "react";
import { PanelLeft, Layout, LayoutTemplate } from "lucide-react";
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
import { useSidebarStore } from "@workspace/core/stores/sidebar-store";
import { SettingsCardSkeleton } from "@workspace/core/components/common/settings-card-skeleton";
import { useTranslations } from "@workspace/i18n";

export const SidebarVariantCard = () => {
  const mounted = useMounted();
  const { variant: sidebarVariant, setVariant: setSidebarVariant } =
    useSidebarStore();
  const { state } = useSidebar();
  const t = useTranslations("SidebarVariantCard");

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
            value={sidebarVariant}
            onValueChange={(val) =>
              setSidebarVariant(val as "sidebar" | "floating" | "inset")
            }
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sidebar">
                <div className="flex items-center gap-2">
                  <PanelLeft className="size-4" />
                  <span>{t("sidebar")}</span>
                </div>
              </SelectItem>
              <SelectItem value="floating">
                <div className="flex items-center gap-2">
                  <Layout className="size-4" />
                  <span>{t("floating")}</span>
                </div>
              </SelectItem>
              <SelectItem value="inset">
                <div className="flex items-center gap-2">
                  <LayoutTemplate className="size-4" />
                  <span>{t("inset")}</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className="hidden md:block">
        <RadioGroup
          value={sidebarVariant}
          onValueChange={(val) =>
            setSidebarVariant(val as "sidebar" | "floating" | "inset")
          }
          className={gridClasses}
        >
          <div className="flex flex-col gap-3">
            <label
              htmlFor="variant-sidebar"
              className="cursor-pointer block w-full"
            >
              <div className="relative w-full">
                <div className="aspect-video rounded-lg border-2 border-border bg-background overflow-hidden transition-colors">
                  <div className="h-(--comp-h-5) bg-muted border-b"></div>
                  <div className="absolute top-2 left-2 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>

                  <div className="flex h-full">
                    <div className="w-12 h-[calc(100%-1.2rem)] bg-muted border-r">
                      <div className="p-1 h-full flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                          <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                          <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                        </div>

                        <div className="space-y-1">
                          <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                          <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 p-2">
                      <div className="space-y-1">
                        <div className="h-2 bg-muted-foreground/20 rounded w-3/4"></div>
                        <div className="h-2 bg-muted-foreground/20 rounded w-1/2"></div>
                        <div className="h-2 bg-muted-foreground/20 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </label>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="sidebar" id="variant-sidebar" />
              <Label
                htmlFor="variant-sidebar"
                className="font-medium cursor-pointer"
              >
                {t("sidebar")}
              </Label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="variant-floating"
              className="cursor-pointer block w-full"
            >
              <div className="relative w-full">
                <div className="aspect-video rounded-lg border-2 border-border bg-background overflow-hidden transition-colors">
                  <div className="h-(--comp-h-5) bg-muted border-b"></div>
                  <div className="absolute top-2 left-2 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>

                  <div className="flex h-full p-1">
                    <div className="w-12 h-[calc(100%-1.3rem)] bg-muted rounded-md border mr-1">
                      <div className="p-1 h-full flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                          <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                          <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                        </div>

                        <div className="space-y-1">
                          <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                          <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 bg-background rounded-md p-1">
                      <div className="space-y-1">
                        <div className="h-2 bg-muted-foreground/20 rounded w-3/4"></div>
                        <div className="h-2 bg-muted-foreground/20 rounded w-1/2"></div>
                        <div className="h-2 bg-muted-foreground/20 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </label>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="floating" id="variant-floating" />
              <Label
                htmlFor="variant-floating"
                className="font-medium cursor-pointer"
              >
                {t("floating")}
              </Label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label
              htmlFor="variant-inset"
              className="cursor-pointer block w-full"
            >
              <div className="relative w-full">
                <div className="aspect-video rounded-lg border-2 border-border bg-muted overflow-hidden transition-colors">
                  <div className="h-(--comp-h-5) bg-muted border-b"></div>
                  <div className="absolute top-2 left-2 flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>

                  <div className="flex h-full">
                    <div className="w-12 h-[calc(100%-1.3rem)] bg-muted">
                      <div className="p-1 h-full pb-2 mt-1 flex flex-col justify-between">
                        <div className="space-y-1">
                          <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                          <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                          <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                        </div>

                        <div className="space-y-1">
                          <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                          <div className="h-1.5 bg-muted-foreground/30 rounded"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 h-[calc(100%-1.7rem)] bg-background rounded-md border border-border p-2 mr-1 mt-1">
                      <div className="space-y-1">
                        <div className="h-2 bg-muted-foreground/20 rounded w-3/4"></div>
                        <div className="h-2 bg-muted-foreground/20 rounded w-1/2"></div>
                        <div className="h-2 bg-muted-foreground/20 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </label>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="inset" id="variant-inset" />
              <Label
                htmlFor="variant-inset"
                className="font-medium cursor-pointer"
              >
                {t("inset")}
              </Label>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};
