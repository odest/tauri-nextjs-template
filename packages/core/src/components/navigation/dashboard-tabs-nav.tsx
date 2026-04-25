"use client";

import { useTranslations } from "@workspace/i18n";
import { navigationData } from "@workspace/core/config/navigation";
import { usePathname, useRouter } from "@workspace/i18n/navigation";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";

const DASHBOARD_ITEMS =
  navigationData.navMain.find((item) => item.url === "/dashboard")?.items ?? [];

export function DashboardTabsNav() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Navigation");

  const activeTab = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  return (
    <div className="flex justify-center md:hidden">
      <Tabs
        value={activeTab}
        onValueChange={(nextValue) => {
          if (nextValue !== pathname) {
            router.push(nextValue);
          }
        }}
      >
        <TabsList variant="line">
          {DASHBOARD_ITEMS.map((item) => (
            <TabsTrigger
              key={item.url}
              value={item.url}
              className="after:bg-primary"
            >
              {t(item.translationKey)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
