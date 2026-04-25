"use client";

import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { cn } from "@workspace/ui/lib/utils";
import { localeConfig, routing } from "@workspace/i18n/routing";
import { useLanguageSwitcher } from "@workspace/core/hooks/use-language-switcher";
import { useTranslations } from "@workspace/i18n";

export function LanguageCard() {
  const { locale, currentConfig, isPending, changeLanguage } =
    useLanguageSwitcher();
  const t = useTranslations("LanguageCard");

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold">
              {t("title")}
            </div>
            <div className="text-muted-foreground [font-size:var(--comp-text-sm)] [line-height:var(--comp-lh-sm)]">
              {t("description")}
            </div>
          </div>
          <Select
            value={locale}
            onValueChange={changeLanguage}
            disabled={isPending}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <span className="[font-size:var(--comp-text-base)] [line-height:var(--comp-lh-base)]">
                    {currentConfig.flag}
                  </span>
                  <span>{currentConfig.nativeName}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {routing.locales.map((loc) => {
                const config = localeConfig[loc as keyof typeof localeConfig];
                const isSelected = locale === loc;

                return (
                  <SelectItem
                    key={loc}
                    value={loc}
                    className={cn(isSelected && "bg-accent")}
                  >
                    <div className="flex w-full items-center gap-2">
                      <span className="[font-size:var(--comp-text-base)] [line-height:var(--comp-lh-base)]">
                        {config.flag}
                      </span>
                      <span>{config.nativeName}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
