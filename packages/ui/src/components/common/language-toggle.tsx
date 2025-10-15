"use client";

import { Check, Languages } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { cn } from "@workspace/ui/lib/utils";
import { routing, localeConfig } from "@workspace/i18n/routing";
import { useLanguageSwitcher } from "@workspace/ui/hooks/use-language-switcher";

export function LanguageToggle() {
  const { locale, isPending, changeLanguage } = useLanguageSwitcher();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((loc) => {
          const config = localeConfig[loc as keyof typeof localeConfig];
          const isSelected = locale === loc;
          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => changeLanguage(loc)}
              className={cn(isSelected && "bg-accent")}
              disabled={isPending}
            >
              <span className="mr-2 text-base">{config.flag}</span>
              {config.nativeName}
              {isSelected && <Check className="ml-auto h-3 w-3" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
