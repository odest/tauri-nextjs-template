"use client";

import { ReactNode, ComponentType } from "react";
import { Toaster } from "@workspace/ui/components/sonner";
import { AppSidebar } from "@workspace/core/components/layout/app-sidebar";
import { AppHeader } from "@workspace/core/components/layout/app-header";
import { HotkeysDialog } from "@workspace/core/components/common/hotkeys-dialog";
import { CommandPalette } from "@workspace/core/components/common/command-palette";
import { ProfileDrawer } from "@workspace/core/components/common/profile-drawer";
import { MobileBottomNav } from "@workspace/core/components/navigation/mobile-bottom-nav";
import { navigationData } from "@workspace/core/config/navigation";
import { ThemeProvider } from "@workspace/core/providers/theme-provider";
import { useAppHotkeys } from "@workspace/core/hooks/use-app-hotkeys";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";

interface AppLayoutProps {
  children: ReactNode;
  pathname: string;
  navigate: (path: string) => void;
  LinkComponent?:
    | ComponentType<{
        href: string;
        children: React.ReactNode;
        onClick?: () => void;
        className?: string;
      }>
    | "a";
}

function HotkeysRegistrar({ navigate }: { navigate: (path: string) => void }) {
  useAppHotkeys({ navigate });
  return null;
}

export function AppLayout({
  children,
  pathname,
  navigate,
  LinkComponent,
}: AppLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <SidebarProvider className="h-screen pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <HotkeysRegistrar navigate={navigate} />
        <AppSidebar pathname={pathname} LinkComponent={LinkComponent} />
        <SidebarInset>
          <AppHeader pathname={pathname} LinkComponent={LinkComponent} />
          {children}
          <Toaster />
          <MobileBottomNav
            items={navigationData.navMobile}
            pathname={pathname}
            LinkComponent={LinkComponent}
          />
        </SidebarInset>
        <HotkeysDialog />
        <CommandPalette navigate={navigate} />
        <ProfileDrawer user={navigationData.user} />
      </SidebarProvider>
    </ThemeProvider>
  );
}
