import { defineRouting } from "next-intl/routing";

export const localeConfig = {
  en: { flag: "🇬🇧", label: "English", nativeName: "English" },
  tr: { flag: "🇹🇷", label: "Türkçe", nativeName: "Türkçe" },
} as const;

export const locales = Object.keys(localeConfig) as Array<
  keyof typeof localeConfig
>;

export const routing = defineRouting({
  locales: locales,
  defaultLocale: "en",
});
