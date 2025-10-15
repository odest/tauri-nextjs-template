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
import { useLanguageSwitcher } from "@workspace/ui/hooks/use-language-switcher";
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
            <div className="leading-none font-semibold flex items-center gap-2">
              {t("title")}
            </div>
            <div className="text-muted-foreground text-sm">
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
                  <span className="text-base">{currentConfig.flag}</span>
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
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-base">{config.flag}</span>
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
