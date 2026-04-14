"use client";

import { Link, usePathname, useRouter } from "@workspace/i18n/navigation";
import { AppLayout } from "@workspace/core/components/layout/app-layout";

interface AppGroupLayoutProps {
  children: React.ReactNode;
}

export default function AppGroupLayout({ children }: AppGroupLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <AppLayout
      pathname={pathname}
      navigate={(path) => router.push(path)}
      LinkComponent={Link}
    >
      {children}
    </AppLayout>
  );
}
