"use client"

import { Laptop, Moon, Sun } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { useThemeTransition } from "@workspace/core/hooks/use-theme-transition"
import { useTranslations } from "@workspace/i18n"

export function ModeToggle() {
  const { theme, handleThemeChange } = useThemeTransition()
  const t = useTranslations("ModeCard")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="hidden min-w-40 md:block">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={theme}>
            <DropdownMenuRadioItem
              value="light"
              onClick={(e) => handleThemeChange("light", e)}
            >
              <Sun className="mr-2 size-4" />
              {t("light")}
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem
              value="dark"
              onClick={(e) => handleThemeChange("dark", e)}
            >
              <Moon className="mr-2 size-4" />
              {t("dark")}
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem
              value="system"
              onClick={(e) => handleThemeChange("system", e)}
            >
              <Laptop className="mr-2 size-4" />
              {t("system")}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
