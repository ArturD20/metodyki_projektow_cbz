import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en/common.json" with { type: "json" };
import pl from "./pl/common.json" with { type: "json" };
import uk from "./uk/common.json" with { type: "json" };

export const languages = ["pl", "en", "uk"] as const;
export type Language = (typeof languages)[number];

const storageKey = "prostefakty-language";

function isLanguage(value: string | null): value is Language {
  return value === "pl" || value === "en" || value === "uk";
}

export function readLanguage(): Language {
  if (typeof localStorage === "undefined") return "pl";
  try {
    const saved = localStorage.getItem(storageKey);
    return isLanguage(saved) ? saved : "pl";
  } catch {
    return "pl";
  }
}

export function setLanguage(language: Language) {
  try {
    localStorage.setItem(storageKey, language);
  } catch {
    // The selected language still applies for this session when storage is blocked.
  }
  void i18n.changeLanguage(language);
}

if (typeof document !== "undefined") {
  i18n.on("languageChanged", (language) => {
    document.documentElement.lang = language;
  });
}

void i18n.use(initReactI18next).init({
  lng: readLanguage(),
  fallbackLng: "pl",
  supportedLngs: languages,
  defaultNS: "common",
  ns: ["common"],
  resources: {
    pl: { common: pl },
    en: { common: en },
    uk: { common: uk },
  },
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
