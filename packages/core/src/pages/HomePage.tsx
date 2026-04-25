"use client";

import { Greet } from "@workspace/core/components/common/greet";
import { useTranslations } from "@workspace/i18n";

export function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div className="flex flex-1 flex-col justify-center items-center p-4 gap-4">
      <h1 className="text-xl font-bold text-center text-balance">
        {t("title")}
      </h1>
      <Greet />
    </div>
  );
}
