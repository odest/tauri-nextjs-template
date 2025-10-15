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

export function LanguageCard() {
  const { locale, currentConfig, isPending, changeLanguage } =
    useLanguageSwitcher();

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="leading-none font-semibold flex items-center gap-2">
              Language
            </div>
            <div className="text-muted-foreground text-sm">
              Choose your preferred language for the application
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
                  <span>{currentConfig.label}</span>
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
                      <span>{config.label}</span>
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
