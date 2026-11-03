import en from "./locales/en.json";
import pl from "./locales/pl.json";

export const defaultNS = "translation";

export const resources = {
  pl: { translation: pl },
  en: { translation: en },
} as const;

export type Language = keyof typeof resources;

export const supportedLanguages = Object.keys(resources) as Language[];

export const fallbackLanguage: Language = "en";
