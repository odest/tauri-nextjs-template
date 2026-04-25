"use client";

import { useTranslations } from "@workspace/i18n";

export function ReportsPage() {
  const t = useTranslations("ReportsPage");

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <h1 className="text-center text-xl font-bold text-balance">
        {t("title")}
      </h1>
    </div>
  );
}
