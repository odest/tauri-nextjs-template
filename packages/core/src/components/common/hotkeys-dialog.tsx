"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@workspace/ui/components/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@workspace/ui/components/dialog";
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd";
import { Separator } from "@workspace/ui/components/separator";
import { useTranslations } from "@workspace/i18n";
import { useHotkeysDialogStore } from "@workspace/core/stores/hotkeys-store";
import { hotkeys, type HotkeyDefinition } from "@workspace/core/config/hotkeys";
import { formatHotkeyDisplay } from "@workspace/core/lib/utils";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";

function HotkeyRow({ hotkey }: { hotkey: HotkeyDefinition }) {
  const t = useTranslations("HotkeysDialog");
  const keys = formatHotkeyDisplay(hotkey.keys);
  const isSequence = hotkey.keys.includes(">");

  return (
    <div className="flex items-center justify-between py-2">
      <span className="[font-size:var(--comp-text-sm)] [line-height:var(--comp-lh-sm)]">
        {t(hotkey.translationKey)}
      </span>
      <KbdGroup className="gap-0.5">
        {keys.map((key, i) => (
          <React.Fragment key={i}>
            <Kbd>{key}</Kbd>
            {isSequence && i < keys.length - 1 && (
              <span className="text-muted-foreground mx-1.5 font-mono text-[10px] opacity-70">
                {t("then")}
              </span>
            )}
          </React.Fragment>
        ))}
      </KbdGroup>
    </div>
  );
}

function HotkeysList() {
  const t = useTranslations("HotkeysDialog");

  const generalHotkeys = hotkeys.filter((h) => h.category === "general");
  const navigationHotkeys = hotkeys.filter((h) => h.category === "navigation");

  return (
    <div className="space-y-4">
      {generalHotkeys.length > 0 && (
        <div>
          <h3 className="text-muted-foreground mb-2 [font-size:var(--comp-text-xs)] [line-height:var(--comp-lh-xs)] font-semibold tracking-wider uppercase">
            {t("general")}
          </h3>
          <div className="space-y-0.5">
            {generalHotkeys.map((hotkey) => (
              <HotkeyRow key={hotkey.id} hotkey={hotkey} />
            ))}
          </div>
        </div>
      )}

      {generalHotkeys.length > 0 && navigationHotkeys.length > 0 && (
        <Separator />
      )}

      {navigationHotkeys.length > 0 && (
        <div>
          <h3 className="text-muted-foreground mb-2 [font-size:var(--comp-text-xs)] [line-height:var(--comp-lh-xs)] font-semibold tracking-wider uppercase">
            {t("navigation")}
          </h3>
          <div className="space-y-0.5">
            {navigationHotkeys.map((hotkey) => (
              <HotkeyRow key={hotkey.id} hotkey={hotkey} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function HotkeysDialog() {
  const { isOpen, close } = useHotkeysDialogStore();
  const t = useTranslations("HotkeysDialog");
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && close()}>
        <DrawerContent className="p-4">
          <DrawerHeader>
            <DrawerTitle>{t("title")}</DrawerTitle>
            <DrawerDescription>{t("description")}</DrawerDescription>
          </DrawerHeader>
          <div className="no-scrollbar mx-auto w-full max-w-sm overflow-y-auto">
            <HotkeysList />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="flex max-h-[85vh] flex-col sm:max-w-md">
        <DialogHeader className="shrink-0">
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <div className="no-scrollbar -mx-6 flex-1 overflow-y-auto px-6">
          <HotkeysList />
        </div>
      </DialogContent>
    </Dialog>
  );
}
