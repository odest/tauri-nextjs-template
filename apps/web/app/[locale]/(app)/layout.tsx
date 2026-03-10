"use client";

import { Link, usePathname } from "@workspace/i18n/navigation";
import { AppLayout } from "@workspace/ui/components/layout/app-layout";

interface AppGroupLayoutProps {
  children: React.ReactNode;
}

export default function AppGroupLayout({ children }: AppGroupLayoutProps) {
  const pathname = usePathname();

  return (
    <AppLayout pathname={pathname} LinkComponent={Link}>
      {children}
    </AppLayout>
  );
}
