import * as React from "react";
import { ComponentType, useCallback } from "react";
import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { useTranslations } from "@workspace/i18n";

interface SecondaryNavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  translationKey: string;
}

interface SecondaryNavProps
  extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: SecondaryNavItem[];
  pathname: string;
  LinkComponent?:
    | ComponentType<{
        href: string;
        children: React.ReactNode;
        onClick?: () => void;
        className?: string;
      }>
    | "a";
}

export function SecondaryNav({
  items,
  pathname,
  LinkComponent = "a",
  ...props
}: SecondaryNavProps) {
  const { isMobile, setOpenMobile } = useSidebar();
  const t = useTranslations("Navigation");

  const handleLinkClick = useCallback(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [isMobile, setOpenMobile]);

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const active =
              pathname === item.url ||
              (item.url !== "/" && pathname.startsWith(item.url));
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild size="sm" isActive={active}>
                  <LinkComponent
                    href={item.url}
                    data-tooltip={t(item.translationKey)}
                    data-active={active}
                    onClick={handleLinkClick}
                  >
                    <item.icon />
                    <span>{t(item.translationKey)}</span>
                  </LinkComponent>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
