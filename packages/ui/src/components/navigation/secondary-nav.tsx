import * as React from "react";
import { ComponentType } from "react";
import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";

interface SecondaryNavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface SecondaryNavProps
  extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: SecondaryNavItem[];
  pathname: string;
  LinkComponent?: ComponentType<any> | string;
}

export function SecondaryNav({
  items,
  pathname,
  LinkComponent = "a",
  ...props
}: SecondaryNavProps) {
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
                    data-tooltip={item.title}
                    data-active={active}
                  >
                    <item.icon />
                    <span>{item.title}</span>
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
