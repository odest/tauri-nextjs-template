import { LanguageCard } from "@workspace/ui/components/common/language-card";
import { ModeCard } from "@workspace/ui/components/common/mode-card";
import { SidebarVariantCard } from "@workspace/ui/components/common/sidebar-variant-card";
import { ThemesList } from "@workspace/ui/components/common/themes-list";
import { useTranslations } from "@workspace/i18n";

export function SettingsPage() {
  const t = useTranslations("SettingsPage");

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 overflow-y-auto w-full custom-scrollbar">
      <div className="max-w-3xl mx-auto w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>

        <div className="grid gap-6">
          <LanguageCard />
          <ModeCard />
          <SidebarVariantCard />
          <ThemesList />
        </div>
      </div>
    </div>
  );
}
