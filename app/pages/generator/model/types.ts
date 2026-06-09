export type GeneratorOptions = Record<
  string,
  string | number | boolean | string[]
>;

export type GeneratorHistoryEntry = {
  id: string;
  values: string[];
  generatedAt: string;
};

export type GeneratorField = {
  key: string;
  label: string;
  type: "number" | "text" | "checkbox" | "select" | "slider" | "input-group";
  min?: number;
  max?: number;
  step?: number;
  fullWidth?: boolean;
  hint?: string;
  options?: { value: string; label: string }[];
};
