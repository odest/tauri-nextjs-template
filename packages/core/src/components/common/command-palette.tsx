"use client";

import React, { useCallback } from "react";
import { useTranslations } from "@workspace/i18n";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@workspace/ui/components/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@workspace/ui/components/drawer";
import { Kbd } from "@workspace/ui/components/kbd";
import { useCommandPaletteStore } from "@workspace/core/stores/command-palette-store";
import { useHotkeysDialogStore } from "@workspace/core/stores/hotkeys-store";
import { useSidebarStore } from "@workspace/core/stores/sidebar-store";
import { useThemeStore } from "@workspace/core/stores/theme-store";
import { useThemeTransition } from "@workspace/core/hooks/use-theme-transition";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { useDrawerHistory } from "@workspace/core/hooks/use-drawer-history";
import { useSidebar } from "@workspace/ui/components/sidebar";
import { useLanguageSwitcher } from "@workspace/core/hooks/use-language-switcher";
import { routing, localeConfig } from "@workspace/i18n/routing";
import { themes } from "@workspace/core/config/themes";
import { hotkeys } from "@workspace/core/config/hotkeys";
import { formatHotkeyDisplay } from "@workspace/core/lib/utils";
import { cn } from "@workspace/ui/lib/utils";
import {
  Sun,
  Moon,
  Home,
  View,
  Check,
  MoveUp,
  Palette,
  Keyboard,
  Settings,
  MoveDown,
  LineChart,
  PanelLeft,
  LayoutTemplate,
  LayoutDashboard,
  CornerDownLeftIcon,
} from "lucide-react";

function CommandMenuItem({
  children,
  className,
  ...props
}: React.ComponentProps<typeof CommandItem> & {
  "data-selected"?: string;
  "aria-selected"?: string;
}) {
  return (
    <CommandItem
      className={cn(
        "h-(--comp-h-9) rounded-md border border-transparent px-3! font-medium data-[selected=true]:border-input data-[selected=true]:bg-input/50",
        className,
      )}
      {...props}
    >
      {children}
    </CommandItem>
  );
}

export function CommandPalette({
  navigate,
}: {
  navigate: (path: string) => void;
}) {
  const t = useTranslations("CommandPalette");
  const { isOpen, close } = useCommandPaletteStore();
  useDrawerHistory(isOpen, close);
  const isMobile = useIsMobile();
  const {
    theme: activeMode,
    resolvedTheme,
    handleThemeChange,
  } = useThemeTransition();
  const { toggleSidebar } = useSidebar();
  const { variant, setVariant } = useSidebarStore();
  const { selectedTheme, setSelectedTheme } = useThemeStore();
  const toggleHotkeysDialog = useHotkeysDialogStore((s) => s.toggle);
  const { locale, isPending, changeLanguage } = useLanguageSwitcher();

  const runCommand = useCallback(
    (command: () => unknown) => {
      close();
      setTimeout(() => {
        command();
      }, 300);
    },
    [close],
  );

  const getKeysDisplay = (id: string) => {
    const hk = hotkeys.find((h) => h.id === id);
    if (!hk) return null;
    const keys = formatHotkeyDisplay(hk.keys);
    const isSequence = hk.keys.includes(">");
    return (
      <span className="ml-auto hidden md:flex items-center gap-1">
        {keys.map((key, i) => (
          <React.Fragment key={i}>
            <Kbd>{key}</Kbd>
            {isSequence && i < keys.length - 1 && (
              <span className="text-[10px] text-muted-foreground opacity-70 font-mono mx-1.5">
                {t("then")}
              </span>
            )}
          </React.Fragment>
        ))}
      </span>
    );
  };

  const groupClasses =
    "p-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!";

  const paletteContent = (
    <>
      <Command
        className={cn(
          "rounded-none bg-transparent p-2 **:data-[slot=command-input]:h-(--comp-h-9)! **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:h-(--comp-h-9)! **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border **:data-[slot=command-input-wrapper]:border-input **:data-[slot=command-input-wrapper]:bg-input/50",
          isMobile && "h-full",
        )}
      >
        <CommandInput placeholder={t("search")} autoFocus />
        <CommandList
          className={cn(
            "no-scrollbar scroll-pt-2 scroll-pb-1.5",
            isMobile ? "min-h-0 max-h-none flex-1" : "min-h-80",
          )}
        >
          <CommandEmpty className="py-12 text-center [font-size:var(--comp-text-sm)] [line-height:var(--comp-lh-sm)] text-muted-foreground">
            {t("noResults")}
          </CommandEmpty>

          <CommandGroup heading={t("general")} className={groupClasses}>
            <CommandMenuItem
              value="system dark light theme mode"
              onSelect={() =>
                runCommand(() =>
                  handleThemeChange(
                    (activeMode === "dark" ? "light" : "dark") as
                      | "light"
                      | "dark",
                  ),
                )
              }
            >
              {activeMode === "dark" ? <Moon /> : <Sun />}
              <span>{t("toggleMode")}</span>
              {getKeysDisplay("toggle-mode")}
            </CommandMenuItem>

            {!isMobile && (
              <CommandMenuItem
                onSelect={() => runCommand(() => toggleSidebar())}
              >
                <PanelLeft />
                <span>{t("toggleSidebar")}</span>
                {getKeysDisplay("toggle-sidebar")}
              </CommandMenuItem>
            )}

            {!isMobile && (
              <CommandMenuItem
                onSelect={() => runCommand(() => toggleHotkeysDialog())}
              >
                <Keyboard />
                <span>{t("showHotkeys")}</span>
                {getKeysDisplay("show-hotkeys")}
              </CommandMenuItem>
            )}
          </CommandGroup>

          <CommandSeparator className="my-2" />

          <CommandGroup heading={t("navigation")} className={groupClasses}>
            <CommandMenuItem
              onSelect={() => runCommand(() => navigate("/home"))}
            >
              <Home />
              <span>{t("goHome")}</span>
              {getKeysDisplay("go-home")}
            </CommandMenuItem>
            <CommandMenuItem
              onSelect={() => runCommand(() => navigate("/dashboard"))}
            >
              <LayoutDashboard />
              <span>{t("goDashboard")}</span>
              {getKeysDisplay("go-dashboard")}
            </CommandMenuItem>
            <CommandMenuItem
              onSelect={() =>
                runCommand(() => navigate("/dashboard/analytics"))
              }
            >
              <LineChart />
              <span>{t("goAnalytics")}</span>
              {getKeysDisplay("go-analytics")}
            </CommandMenuItem>
            <CommandMenuItem
              onSelect={() => runCommand(() => navigate("/dashboard/overview"))}
            >
              <View />
              <span>{t("goOverview")}</span>
              {getKeysDisplay("go-overview")}
            </CommandMenuItem>
            <CommandMenuItem
              onSelect={() => runCommand(() => navigate("/settings"))}
            >
              <Settings />
              <span>{t("goSettings")}</span>
              {getKeysDisplay("go-settings")}
            </CommandMenuItem>
          </CommandGroup>

          <CommandSeparator className="my-2" />

          <CommandGroup heading={t("language")} className={groupClasses}>
            {routing.locales.map((loc) => {
              const config = localeConfig[loc as keyof typeof localeConfig];
              return (
                <CommandMenuItem
                  key={loc}
                  value={config.nativeName + " " + config.label}
                  onSelect={() => runCommand(() => changeLanguage(loc))}
                  disabled={isPending}
                >
                  <span className="[font-size:var(--comp-text-base)] [line-height:var(--comp-lh-base)] mr-2">
                    {config.flag}
                  </span>
                  <span>{config.nativeName}</span>
                  {locale === loc && <Check className="ml-auto h-4 w-4" />}
                </CommandMenuItem>
              );
            })}
          </CommandGroup>

          {!isMobile && (
            <>
              <CommandSeparator className="my-2" />
              <CommandGroup
                heading={t("sidebarVariants")}
                className={groupClasses}
              >
                {(["sidebar", "floating", "inset"] as const).map(
                  (sidebarVariant) => (
                    <CommandMenuItem
                      key={sidebarVariant}
                      onSelect={() =>
                        runCommand(() => setVariant(sidebarVariant))
                      }
                    >
                      <LayoutTemplate />
                      <span className="capitalize">{t(sidebarVariant)}</span>
                      {variant === sidebarVariant && (
                        <Check className="ml-auto h-4 w-4" />
                      )}
                    </CommandMenuItem>
                  ),
                )}
              </CommandGroup>
            </>
          )}

          <CommandSeparator className="my-2" />

          <CommandGroup heading={t("themes")} className={groupClasses}>
            {themes.map((themeItem) => {
              const palette =
                (activeMode === "system" ? resolvedTheme : activeMode) ===
                "dark"
                  ? themeItem.darkPalette
                  : themeItem.lightPalette;
              return (
                <CommandMenuItem
                  key={themeItem.name}
                  onSelect={() =>
                    runCommand(() => setSelectedTheme(themeItem.name))
                  }
                >
                  {selectedTheme === themeItem.name ? <Check /> : <Palette />}
                  <span>{themeItem.label}</span>
                  <div className="ml-auto flex items-center gap-1">
                    {palette.slice(0, 5).map((color, i) => (
                      <div
                        key={i}
                        className="h-3 w-3 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </CommandMenuItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </Command>

      <div className="absolute inset-x-0 bottom-0 z-20 hidden md:flex h-(--comp-h-10) items-center justify-between rounded-b-xl border-t border-border bg-muted/50 px-4 [font-size:var(--comp-text-xs)] [line-height:var(--comp-lh-xs)] font-medium text-muted-foreground">
        <div className="flex items-center gap-2">
          <Kbd>
            <MoveUp />
          </Kbd>
          <Kbd>
            <MoveDown />
          </Kbd>
          <span>{t("navigate")}</span>
          <Kbd>
            <CornerDownLeftIcon />
          </Kbd>
          <span>{t("openOrSelect")}</span>
        </div>
        <div className="flex items-center gap-2">
          <Kbd>Esc</Kbd>
          <span>{t("close")}</span>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && close()}>
        <DrawerContent
          className="overflow-hidden h-[96dvh]"
          onOpenAutoFocus={(e: Event) => e.preventDefault()}
        >
          <DrawerHeader className="sr-only">
            <DrawerTitle>{t("commandPalette")}</DrawerTitle>
            <DrawerDescription>{t("search")}</DrawerDescription>
          </DrawerHeader>
          {paletteContent}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="overflow-hidden p-0 rounded-xl border-none bg-background bg-clip-padding pb-10 shadow-2xl ring-4 ring-border/80 sm:max-w-lg top-[15%] translate-y-0">
        <DialogHeader className="sr-only">
          <DialogTitle>{t("commandPalette")}</DialogTitle>
          <DialogDescription>{t("search")}</DialogDescription>
        </DialogHeader>
        {paletteContent}
      </DialogContent>
    </Dialog>
  );
}
