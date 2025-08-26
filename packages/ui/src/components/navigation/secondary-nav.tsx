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

export function SecondaryNav({
  items,
  LinkComponent = "a",
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
  LinkComponent?: ComponentType<any> | string;
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <LinkComponent href={item.url} data-tooltip={item.title}>
                  <item.icon />
                  <span>{item.title}</span>
                </LinkComponent>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
