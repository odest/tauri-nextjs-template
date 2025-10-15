"use client";

import { useTransition, useEffect } from "react";
import { Languages, Check } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { cn } from "@workspace/ui/lib/utils";
import { useLocale } from "@workspace/i18n";
import { routing, localeConfig } from "@workspace/i18n/routing";
import { usePathname, useRouter } from "@workspace/i18n/navigation";
import { useThemeStore, applyTheme } from "@workspace/ui/stores/theme-store";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { selectedTheme } = useThemeStore();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isPending) {
      applyTheme(selectedTheme);
    }
  }, [isPending, selectedTheme]);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) {
      return;
    }
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

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
          return (
            <DropdownMenuItem
              key={loc}
              onClick={() => handleLanguageChange(loc)}
              className={cn(locale === loc && "bg-accent")}
              disabled={isPending}
            >
              <span className="mr-2 text-base">{config.flag}</span>
              {config.label}
              {locale === loc && <Check className="ml-auto h-3 w-3" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
