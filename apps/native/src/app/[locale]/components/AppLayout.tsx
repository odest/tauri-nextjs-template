"use client";

import React from "react";
import { Link, usePathname } from "@workspace/i18n/navigation";
import { AppLayout as MainLayout } from "@workspace/core/components/layout/app-layout";

interface AppLayoutProps {
  children: React.ReactNode;
}

// Disable prefetching to prevent race conditions and silent navigation
// failures on Tauri Windows (WebView2) when fetching RSC payloads.
const NativeLink = ({
  href,
  children,
  ...props
}: React.ComponentProps<typeof Link>) => {
  return (
    <Link href={href} prefetch={false} {...props}>
      {children}
    </Link>
  );
};

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  return (
    <MainLayout pathname={pathname} LinkComponent={NativeLink}>
      {children}
    </MainLayout>
  );
}
