"use client";

import { ChevronsUpDown } from "lucide-react";
import { navigationData } from "@workspace/core/config/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { useTranslations } from "@workspace/i18n";

interface UserNavUser {
  name: string;
  email: string;
  avatar: string;
}

interface UserNavProps {
  user: UserNavUser;
}

export function UserNav({ user }: UserNavProps) {
  const t = useTranslations("Navigation");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-(--comp-h-8) w-(--comp-w-8) rounded-lg">
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
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={"right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left [font-size:var(--comp-text-sm)] [line-height:var(--comp-lh-sm)]">
                <Avatar className="h-(--comp-h-8) w-(--comp-w-8) rounded-lg">
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
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {navigationData.navProfile.map((group, index) => (
              <div key={group.id} className="contents">
                <DropdownMenuGroup>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.translationKey}>
                        <Icon strokeWidth={2} />
                        {t(item.translationKey as Parameters<typeof t>[0])}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
                {index < navigationData.navProfile.length - 1 && (
                  <DropdownMenuSeparator />
                )}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
