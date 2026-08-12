import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { requestGeneration } from "../api/generate";
import {
  supportedLanguages,
  type SupportedLanguage,
} from "~/shared/config/i18n";

function getLanguage(language: string): SupportedLanguage {
  const normalized = language.toLowerCase().split("-", 1)[0];

  return supportedLanguages.includes(normalized as SupportedLanguage)
    ? (normalized as SupportedLanguage)
    : "en";
}

export function useGenerate() {
  const { i18n } = useTranslation();
  const language = getLanguage(i18n.resolvedLanguage ?? i18n.language);

  return useMutation({
    mutationFn: ({ type, options }: {
      type: Parameters<typeof requestGeneration>[0];
      options: Parameters<typeof requestGeneration>[1];
    }) => requestGeneration(type, options, language),
  });
}
