import { useTranslations } from "@workspace/i18n";

export function HistoryPage() {
  const t = useTranslations("HistoryPage");

  return (
    <div className="flex flex-1 justify-center items-center">
      <h1 className="text-2xl font-bold">{t("title")}</h1>
    </div>
  );
}
