"use client";

import { ComponentType } from "react";
import { type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@workspace/ui/lib/utils";
import { useTranslations } from "@workspace/i18n";
import { useProfileDrawerStore } from "@workspace/core/stores/profile-drawer-store";
import { useCommandPaletteStore } from "@workspace/core/stores/command-palette-store";
import { BorderBeam } from "@workspace/ui/components/landing/border-beam";

export interface MobileBottomNavItem {
  title: string;
  url: string;
  href?: string;
  icon: LucideIcon;
  isActive?: boolean;
  translationKey: string;
}

export interface MobileBottomNavProps {
  items: MobileBottomNavItem[];
  pathname: string;
  className?: string;
  LinkComponent?:
    | ComponentType<{
        href: string;
        children: React.ReactNode;
        onClick?: () => void;
        className?: string;
      }>
    | "a";
}

const buttonVariants = {
  initial: { gap: 0 },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = {
  delay: 0.1,
  type: "spring" as const,
  bounce: 0,
  duration: 0.6,
};

export function MobileBottomNav({
  items,
  pathname,
  className,
  LinkComponent = "a",
}: MobileBottomNavProps) {
  const t = useTranslations("Navigation");
  const { open: openCommandPalette } = useCommandPaletteStore();
  const { open: openProfileDrawer } = useProfileDrawerStore();

  return (
    <nav
      className={cn(
        "fixed z-50 flex h-16 items-center justify-between md:hidden",
        "bottom-[calc(env(safe-area-inset-bottom)+1.5rem)]",
        "left-4 right-4 mx-auto max-w-[400px]",
        "p-2",
        "rounded-full border border-border",
        "bg-background/80 backdrop-blur-2xl",
        "shadow-[inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(0,0,0,0.05),0_12px_24px_-4px_rgba(0,0,0,0.15)]",
        "dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),inset_0_-1px_1px_rgba(0,0,0,0.5),0_8px_32px_rgba(0,0,0,0.4)]",
        "[-webkit-tap-highlight-color:transparent]",
        "transform-gpu",
        className,
      )}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.url ||
          (item.url !== "/" && pathname.startsWith(item.url));
        const href = item.href ?? item.url;

        const handleClick = (e?: { preventDefault?: () => void }) => {
          if (item.url === "#search") {
            e?.preventDefault?.();
            openCommandPalette();
          }
          if (item.url === "#profile") {
            e?.preventDefault?.();
            openProfileDrawer();
          }
        };

        return (
          <LinkComponent
            key={item.url}
            href={href}
            onClick={handleClick}
            className={cn(
              "flex h-full items-center justify-center outline-none",
              isActive ? "min-w-0 shrink" : "shrink-0",
            )}
          >
            <motion.div
              whileTap={{ scale: 0.85 }}
              variants={buttonVariants}
              initial={false}
              animate="animate"
              custom={isActive}
              transition={transition}
              className={cn(
                "relative flex h-full px-3.5 items-center justify-center [font-size:var(--comp-text-sm)] [line-height:var(--comp-lh-sm)] font-medium rounded-full transition-colors duration-300",
                isActive
                  ? "text-foreground min-w-0"
                  : "text-muted-foreground hover:text-foreground shrink-0",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active-pill"
                  className={cn(
                    "absolute inset-0 rounded-full z-0",
                    "bg-linear-to-b from-foreground/5 to-foreground/10",
                    "border border-border/50",
                    "shadow-[inset_0_-1px_0_var(--color-border)]",
                  )}
                  transition={transition}
                >
                  <BorderBeam
                    duration={5}
                    size={50}
                    className="from-transparent via-primary to-transparent"
                  />
                </motion.div>
              )}

              <Icon
                className={cn(
                  "relative z-10 h-5 w-5 shrink-0 transition-colors duration-300",
                  isActive ? "stroke-[2.5px]" : "stroke-2",
                )}
              />
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    variants={spanVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    className="relative z-10 block truncate min-w-0 [font-size:var(--comp-text-sm)] [line-height:var(--comp-lh-sm)] font-semibold"
                  >
                    {t(item.translationKey as Parameters<typeof t>[0])}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </LinkComponent>
        );
      })}
    </nav>
  );
}
