"use client";

import { useTranslations } from "@workspace/i18n";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@workspace/ui/components/drawer";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Separator } from "@workspace/ui/components/separator";
import { Button } from "@workspace/ui/components/button";
import { useDrawerHistory } from "@workspace/core/hooks/use-drawer-history";
import { useProfileDrawerStore } from "@workspace/core/stores/profile-drawer-store";
import { UserNavItem, navigationData } from "@workspace/core/config/navigation";

interface ProfileDrawerProps {
  user: UserNavItem;
}

export function ProfileDrawer({ user }: ProfileDrawerProps) {
  const { isOpen, setOpen } = useProfileDrawerStore();
  useDrawerHistory(isOpen, setOpen);
  const t = useTranslations("Navigation");

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent className="p-2">
        <DrawerHeader className="sr-only">
          <DrawerTitle>{t("account")}</DrawerTitle>
          <DrawerDescription>{user.name}</DrawerDescription>
        </DrawerHeader>
        <div className="flex items-center gap-2 px-2 py-1.5 text-left">
          <Avatar className="h-(--comp-h-8) w-(--comp-h-8) rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left [font-size:var(--comp-text-sm)] [line-height:var(--comp-lh-sm)]">
            <span className="truncate font-medium">{user.name}</span>
            <span className="truncate [font-size:var(--comp-text-xs)] [line-height:var(--comp-lh-xs)]">
              {user.email}
            </span>
          </div>
        </div>
        <Separator className="my-1 h-px bg-border" />
        <div className="flex flex-col">
          {navigationData.navProfile.map((group, index) => (
            <div key={group.id} className="contents">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.translationKey}
                    onClick={() => setOpen(false)}
                    variant="ghost"
                    className="justify-start"
                  >
                    <Icon strokeWidth={2} />
                    {t(item.translationKey as Parameters<typeof t>[0])}
                  </Button>
                );
              })}
              {index < navigationData.navProfile.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
