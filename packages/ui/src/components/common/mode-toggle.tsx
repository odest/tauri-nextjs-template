"use client";

import { Laptop, Moon, Sun, Check } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { cn } from "@workspace/ui/lib/utils";
import { useThemeTransition } from "@workspace/ui/hooks/use-theme-transition";
import { useTranslations } from "@workspace/i18n";

export function ModeToggle() {
  const { theme, handleThemeChange } = useThemeTransition();
  const t = useTranslations("ModeCard");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={(e) => handleThemeChange("light", e)}
          className={cn(theme === "light" && "bg-accent")}
        >
          <Sun className="mr-2 h-3 w-3" />
          {t("light")}
          {theme === "light" && <Check className="ml-auto h-3 w-3" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => handleThemeChange("dark", e)}
          className={cn(theme === "dark" && "bg-accent")}
        >
          <Moon className="mr-2 h-3 w-3" />
          {t("dark")}
          {theme === "dark" && <Check className="ml-auto h-3 w-3" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => handleThemeChange("system", e)}
          className={cn(theme === "system" && "bg-accent")}
        >
          <Laptop className="mr-2 h-3 w-3" />
          {t("system")}
          {theme === "system" && <Check className="ml-auto h-3 w-3" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
