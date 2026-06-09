import { initReactI18next } from "react-i18next";
import { createI18nextMiddleware } from "remix-i18next/middleware";
import { resources } from "~/shared/config/translations";
import { supportedLanguages } from "~/shared/config/i18n";

export const [i18nextMiddleware, getLocale, getInstance] = createI18nextMiddleware({
  detection: {
    supportedLanguages: [...supportedLanguages],
    fallbackLanguage: "en",
    order: ["searchParams", "header"],
    searchParamKey: "lng",
  },
  i18next: { resources },
  plugins: [initReactI18next],
});
