import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { resources } from "~/shared/config/translations";
import { supportedLanguages } from "~/shared/config/i18n";

if (typeof window !== "undefined" && !i18n.isInitialized) {
  void i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      supportedLngs: [...supportedLanguages],
      interpolation: { escapeValue: false },
      detection: { order: ["querystring", "localStorage", "navigator"], caches: ["localStorage"] },
    });
}

export default i18n;
