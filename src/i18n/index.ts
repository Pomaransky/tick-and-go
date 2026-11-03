import { getLocales } from "expo-localization";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import {
  defaultNS,
  fallbackLanguage,
  resources,
  supportedLanguages,
  type Language,
} from "./resources";

function isSupported(code: string | null | undefined): code is Language {
  return supportedLanguages.includes(code as Language);
}

export function getDeviceLanguage(): Language {
  const deviceCode = getLocales().find((locale) =>
    isSupported(locale.languageCode),
  )?.languageCode;
  return isSupported(deviceCode) ? deviceCode : fallbackLanguage;
}

const i18n = createInstance();

i18n.use(initReactI18next).init({
  resources,
  initAsync: false,
  lng: getDeviceLanguage(),
  fallbackLng: fallbackLanguage,
  supportedLngs: supportedLanguages,
  defaultNS,
  ns: [defaultNS],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
