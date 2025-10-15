"use client";

import { useCallback } from "react";
import { ComponentType } from "react";
import {
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { useTranslations } from "@workspace/i18n";

interface ProjectNavItem {
  name: string;
  url: string;
  icon: LucideIcon;
  translationKey: string;
}

interface ProjectsNavProps {
  projects: ProjectNavItem[];
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

export function ProjectsNav({
  projects,
  pathname,
  LinkComponent = "a",
}: ProjectsNavProps) {
  const { isMobile, setOpenMobile } = useSidebar();
  const t = useTranslations("Navigation");

  const handleLinkClick = useCallback(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [isMobile, setOpenMobile]);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{t("projects")}</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          const active =
            pathname === item.url ||
            (item.url !== "/" && pathname.startsWith(item.url));
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild isActive={active}>
                <LinkComponent
                  href={item.url}
                  data-tooltip={t(item.translationKey)}
                  onClick={handleLinkClick}
                >
                  <item.icon />
                  <span>{t(item.translationKey)}</span>
                </LinkComponent>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal />
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <Folder className="text-muted-foreground" />
                    <span>{t("viewProject")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share className="text-muted-foreground" />
                    <span>{t("shareProject")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className="text-muted-foreground" />
                    <span>{t("deleteProject")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          );
        })}
        <SidebarMenuItem>
          <SidebarMenuButton>
            <MoreHorizontal />
            <span>{t("more")}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
