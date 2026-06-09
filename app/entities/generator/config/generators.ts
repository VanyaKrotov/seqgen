import type { GeneratorDefinition, GeneratorType } from "../model/types";

export const generators: GeneratorDefinition[] = [
  { type: "password", path: "/", color: "#9b5cff", icon: "KeyRound", translationKey: "password" },
  { type: "number", path: "/generate/number", color: "#21d4fd", icon: "Binary", translationKey: "number" },
  { type: "vpn", path: "/generate/vpn", color: "#19e6a2", icon: "ShieldCheck", translationKey: "vpn" },
  { type: "uuid", path: "/generate/uuid", color: "#ff4fa3", icon: "Fingerprint", translationKey: "uuid" },
  { type: "phrase", path: "/generate/phrase", color: "#ffb84d", icon: "WholeWord", translationKey: "phrase" },
  { type: "seq", path: "/generate/seq", color: "#7c8cff", icon: "Braces", translationKey: "seq" },
  { type: "short-id", path: "/generate/short-id", color: "#ff6464", icon: "ScanLine", translationKey: "shortId" },
];

export function getGenerator(type?: string): GeneratorDefinition {
  return generators.find((item) => item.type === type) ?? generators[0];
}

export function isGeneratorType(value: string): value is GeneratorType {
  return generators.some((item) => item.type === value);
}
