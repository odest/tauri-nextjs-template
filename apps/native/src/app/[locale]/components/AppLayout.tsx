"use client";

import { Link, usePathname } from "@workspace/i18n/navigation";
import { AppLayout as MainLayout } from "@workspace/ui/components/layout/app-layout";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  return (
    <MainLayout pathname={pathname} LinkComponent={Link}>
      {children}
    </MainLayout>
  );
}
