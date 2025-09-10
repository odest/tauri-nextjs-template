"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { ComponentType } from "react";
import { Biohazard } from "lucide-react";

import { MainNav } from "@workspace/ui/components/navigation/main-nav";
import { ProjectsNav } from "@workspace/ui/components/navigation/projects-nav";
import { SecondaryNav } from "@workspace/ui/components/navigation/secondary-nav";
import { UserNav } from "@workspace/ui/components/navigation/user-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { navigationData } from "@workspace/ui/config/navigation";
import { useSidebarStore } from "@workspace/ui/stores/sidebar-store";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  pathname: string;
  LinkComponent?: ComponentType<any> | string;
}

export function AppSidebar({
  pathname,
  LinkComponent = "a",
  ...props
}: AppSidebarProps) {
  const { isMobile, setOpenMobile } = useSidebar();
  const { variant } = useSidebarStore();
  const [mounted, setMounted] = useState(false);

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return <></>;

  return (
    <Sidebar variant={variant} collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <LinkComponent href="/" onClick={handleLinkClick}>
                <Biohazard className="!size-5" />
                <span className="text-base font-semibold">TNT</span>
              </LinkComponent>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <MainNav
          items={navigationData.navMain}
          pathname={pathname}
          LinkComponent={LinkComponent}
        />
        <ProjectsNav
          projects={navigationData.projects}
          pathname={pathname}
          LinkComponent={LinkComponent}
        />
        <SecondaryNav
          items={navigationData.navSecondary}
          pathname={pathname}
          LinkComponent={LinkComponent}
          className="mt-auto"
        />
      </SidebarContent>
      <SidebarFooter>
        <UserNav user={navigationData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
