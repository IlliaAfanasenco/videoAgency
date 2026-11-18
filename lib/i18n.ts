import { de } from "@/messages/de";
import { en } from "@/messages/en";
import { uk } from "@/messages/uk";
import { el } from "@/messages/el";
export const locales = ["de", "en", "uk", "el"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";
export const isLocale = (value: string): value is Locale =>
  locales.some((locale) => locale === value);
const dictionaries = { de, en, uk, el } as const;
export const getMessages = (locale: Locale) => dictionaries[locale];
/** BCP 47 / Open Graph locale per language. */
export const ogLocales: Record<Locale, string> = {
  de: "de_DE",
  en: "en_GB",
  uk: "uk_UA",
  el: "el_GR",
};
/** Intl formatting locale per language. */
export const intlLocales: Record<Locale, string> = {
  de: "de-DE",
  en: "en-GB",
  uk: "uk-UA",
  el: "el-GR",
};
