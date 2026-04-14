"use client";

import { ReactNode, ComponentType } from "react";
import { AppSidebar } from "@workspace/core/components/layout/app-sidebar";
import { AppHeader } from "@workspace/core/components/layout/app-header";
import { HotkeysDialog } from "@workspace/core/components/common/hotkeys-dialog";
import { CommandPalette } from "@workspace/core/components/common/command-palette";
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
      <SidebarProvider className="h-screen">
        <HotkeysRegistrar navigate={navigate} />
        <AppSidebar pathname={pathname} LinkComponent={LinkComponent} />
        <SidebarInset>
          <AppHeader pathname={pathname} LinkComponent={LinkComponent} />
          {children}
        </SidebarInset>
        <HotkeysDialog />
        <CommandPalette navigate={navigate} />
      </SidebarProvider>
    </ThemeProvider>
  );
}
