import { ReactNode } from "react";
import { AppSidebar } from "@workspace/ui/components/layout/app-sidebar";
import { AppHeader } from "@workspace/ui/components/layout/app-header";
import { ThemeProvider } from "@workspace/ui/providers/theme-provider";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <SidebarProvider>
        <AppSidebar variant="inset" collapsible="icon" />
        <SidebarInset>
          <AppHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
