import { ReactNode, ComponentType } from "react";
import { AppSidebar } from "@workspace/ui/components/layout/app-sidebar";
import { AppHeader } from "@workspace/ui/components/layout/app-header";
import { ThemeProvider } from "@workspace/ui/providers/theme-provider";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";

interface AppLayoutProps {
  children: ReactNode;
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

export function AppLayout({
  children,
  pathname,
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
        <AppSidebar pathname={pathname} LinkComponent={LinkComponent} />
        <SidebarInset>
          <AppHeader pathname={pathname} LinkComponent={LinkComponent} />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
