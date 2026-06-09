export const generatorTypes = ["password", "number", "vpn", "uuid", "phrase", "seq", "short-id"] as const;
export type GeneratorType = (typeof generatorTypes)[number];

export interface GenerateResponse {
  type: GeneratorType;
  values: string[];
  generatedAt: string;
}

export interface GeneratorDefinition {
  type: GeneratorType;
  path: string;
  color: string;
  icon: string;
  translationKey: "password" | "number" | "vpn" | "uuid" | "phrase" | "seq" | "shortId";
}
