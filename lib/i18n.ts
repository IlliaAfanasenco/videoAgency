import { de } from "@/messages/de";
import { en } from "@/messages/en";
export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (value: string): value is Locale =>
  locales.some((locale) => locale === value);
export const getMessages = (locale: Locale) => (locale === "de" ? de : en);
