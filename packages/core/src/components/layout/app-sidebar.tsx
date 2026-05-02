"use client";

import * as React from "react";
import { useCallback } from "react";
import { ComponentType } from "react";
import { MainNav } from "@workspace/core/components/navigation/main-nav";
import { ProjectsNav } from "@workspace/core/components/navigation/projects-nav";
import { SecondaryNav } from "@workspace/core/components/navigation/secondary-nav";
import { UserNav } from "@workspace/core/components/navigation/user-nav";
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
import { navigationData } from "@workspace/core/config/navigation";
import { useSidebarStore } from "@workspace/core/stores/sidebar-store";
import { useMounted } from "@workspace/core/hooks/use-mounted";
import { Logo } from "@workspace/ui/components/landing/logo";
import { siteConfig } from "@workspace/core/config/site";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
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

export function AppSidebar({
  pathname,
  LinkComponent = "a",
  ...props
}: AppSidebarProps) {
  const { isMobile, setOpenMobile } = useSidebar();
  const { variant } = useSidebarStore();
  const mounted = useMounted();

  const handleLinkClick = useCallback(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [isMobile, setOpenMobile]);

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
                <Logo className="!size-5" />
                <span className="[font-size:var(--comp-text-base)] [line-height:var(--comp-lh-base)] font-semibold">
                  {siteConfig.name}
                </span>
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
