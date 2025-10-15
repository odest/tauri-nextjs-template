"use client";

import { useCallback } from "react";
import { ComponentType } from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { useTranslations } from "@workspace/i18n";

interface MainNavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  translationKey: string;
  items?: {
    title: string;
    url: string;
    translationKey: string;
  }[];
}

interface MainNavProps {
  items: MainNavItem[];
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

export function MainNav({
  items,
  pathname,
  LinkComponent = "a",
}: MainNavProps) {
  const { isMobile, setOpenMobile } = useSidebar();
  const t = useTranslations("Navigation");

  const handleLinkClick = useCallback(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [isMobile, setOpenMobile]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("platform")}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const active =
            pathname === item.url ||
            (item.url !== "/" && pathname.startsWith(item.url));
          return (
            <Collapsible key={item.title} asChild defaultOpen={active}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={t(item.translationKey)}
                  isActive={active}
                >
                  <LinkComponent
                    href={item.url}
                    data-active={active}
                    onClick={handleLinkClick}
                  >
                    <item.icon />
                    <span>{t(item.translationKey)}</span>
                  </LinkComponent>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => {
                          const subActive =
                            pathname === subItem.url ||
                            (subItem.url !== "/" &&
                              pathname.startsWith(subItem.url));
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={subActive}
                              >
                                <LinkComponent
                                  href={subItem.url}
                                  onClick={handleLinkClick}
                                >
                                  <span>{t(subItem.translationKey)}</span>
                                </LinkComponent>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
