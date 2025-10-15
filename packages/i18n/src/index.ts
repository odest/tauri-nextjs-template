import { routing } from "@workspace/i18n/routing";

export type Locale = (typeof routing.locales)[number];

export * from "next-intl";

// Export messages statically
import enMessages from "./messages/en.json" with { type: "json" };
import trMessages from "./messages/tr.json" with { type: "json" };

export const messages = {
  en: enMessages,
  tr: trMessages,
} as const;
