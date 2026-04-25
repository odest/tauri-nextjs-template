"use client";

import { useTranslations } from "@workspace/i18n";

export function ReportsPage() {
  const t = useTranslations("ReportsPage");

  return (
    <div className="flex flex-1 justify-center items-center p-4">
      <h1 className="text-xl font-bold text-center text-balance">
        {t("title")}
      </h1>
    </div>
  );
}
