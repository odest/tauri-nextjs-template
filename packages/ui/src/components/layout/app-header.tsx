"use client";

import { ComponentType, Fragment } from "react";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { ModeToggle } from "@workspace/ui/components/common/mode-toggle";
import { LanguageToggle } from "@workspace/ui/components/common/language-toggle";
import { useTranslations } from "@workspace/i18n";

function formatSegment(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

interface AppHeaderProps {
  pathname: string;
  LinkComponent?:
    | ComponentType<{
        href: string;
        children: React.ReactNode;
        onClick?: () => void;
        className?: string;
      }>
    | "a";
}

export function AppHeader({ pathname, LinkComponent = "a" }: AppHeaderProps) {
  const segments = pathname.split("/").filter(Boolean);
  const t = useTranslations("Navigation");

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <LinkComponent href="/">{t("home")}</LinkComponent>
            </BreadcrumbItem>

            {segments.map((segment, index) => {
              const href = `/${segments.slice(0, index + 1).join("/")}`;
              const isLast = index === segments.length - 1;
              // Try to get translation, fallback to formatted segment
              const displayText =
                t(segment) !== segment ? t(segment) : formatSegment(segment);

              return (
                <Fragment key={href}>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{displayText}</BreadcrumbPage>
                    ) : (
                      <LinkComponent href={href} className="hidden md:block">
                        {displayText}
                      </LinkComponent>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto flex items-center gap-1">
          <LanguageToggle />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
