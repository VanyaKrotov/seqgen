import axios from "axios";
import type { GenerateResponse, GeneratorType } from "~/entities/generator/model/types";
import type { SupportedLanguage } from "~/shared/config/i18n";

function encodeOptions(options: Record<string, unknown>) {
  const bytes = new TextEncoder().encode(JSON.stringify(options));
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

export async function requestGeneration(
  type: GeneratorType,
  options: Record<string, unknown>,
  language: SupportedLanguage,
) {
  const { data } = await axios.get<GenerateResponse>(`/api/generate/${type}`, {
    headers: {
      "X-Data": encodeOptions(options),
      "X-Language": language,
    },
  });

  return data;
}
