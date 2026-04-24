"use client";

import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area";
import { LanguageCard } from "@workspace/core/components/common/language-card";
import { ModeCard } from "@workspace/core/components/common/mode-card";
import { SidebarVariantCard } from "@workspace/core/components/common/sidebar-variant-card";
import { ThemesList } from "@workspace/core/components/common/themes-list";

export function SettingsPage() {
  return (
    <ScrollArea className="overflow-y-auto w-full">
      <div className="flex flex-1 flex-col gap-6 p-4 pb-28 md:pb-4">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
          <div className="grid gap-6">
            <LanguageCard />
            <ModeCard />
            <div className="hidden md:block">
              <SidebarVariantCard />
            </div>
            <ThemesList />
          </div>
        </div>
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
