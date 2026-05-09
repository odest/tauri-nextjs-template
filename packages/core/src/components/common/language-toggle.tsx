"use client"

import { Languages } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { routing, localeConfig } from "@workspace/i18n/routing"
import { useLanguageSwitcher } from "@workspace/core/hooks/use-language-switcher"

export function LanguageToggle() {
  const { locale, isPending, changeLanguage } = useLanguageSwitcher()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="hidden min-w-40 md:block">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={locale} onValueChange={changeLanguage}>
            {routing.locales.map((loc) => {
              const config = localeConfig[loc as keyof typeof localeConfig]
              return (
                <DropdownMenuRadioItem
                  key={loc}
                  value={loc}
                  disabled={isPending}
                >
                  <span className="mr-2 text-base">{config.flag}</span>
                  {config.nativeName}
                </DropdownMenuRadioItem>
              )
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
