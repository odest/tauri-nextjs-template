import { defineRouting } from "next-intl/routing";

export const localeConfig = {
  en: { flag: "🇬🇧", label: "English", nativeName: "English" },
  tr: { flag: "🇹🇷", label: "Turkish", nativeName: "Türkçe" },
  es: { flag: "🇪🇸", label: "Spanish", nativeName: "Español" },
  fr: { flag: "🇫🇷", label: "French", nativeName: "Français" },
  de: { flag: "🇩🇪", label: "German", nativeName: "Deutsch" },
  pt: { flag: "🇵🇹", label: "Portuguese", nativeName: "Português" },
  it: { flag: "🇮🇹", label: "Italian", nativeName: "Italiano" },
  ru: { flag: "🇷🇺", label: "Russian", nativeName: "Русский" },
  ja: { flag: "🇯🇵", label: "Japanese", nativeName: "日本語" },
  zh: { flag: "🇨🇳", label: "Chinese", nativeName: "中文" },
} as const;

export const locales = Object.keys(localeConfig) as Array<
  keyof typeof localeConfig
>;

export const routing = defineRouting({
  locales: locales,
  defaultLocale: "en",
});
