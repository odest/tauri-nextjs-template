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
      <span className="text-sm">{t(hotkey.translationKey)}</span>
      <KbdGroup className="gap-0.5">
        {keys.map((key, i) => (
          <React.Fragment key={i}>
            <Kbd>{key}</Kbd>
            {isSequence && i < keys.length - 1 && (
              <span className="text-[10px] text-muted-foreground mx-1.5">
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
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
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
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
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
        <DrawerContent className="px-4 pb-8">
          <DrawerHeader>
            <DrawerTitle>{t("title")}</DrawerTitle>
            <DrawerDescription>{t("description")}</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto w-full max-w-sm mx-auto no-scrollbar">
            <HotkeysList />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-md max-h-[85vh] flex flex-col">
        <DialogHeader className="shrink-0">
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto flex-1 no-scrollbar -mx-6 px-6">
          <HotkeysList />
        </div>
      </DialogContent>
    </Dialog>
  );
}
