import axios from "axios";
import type { GenerateResponse, GeneratorType } from "~/entities/generator/model/types";

export async function requestGeneration(type: GeneratorType, options: Record<string, unknown>) {
  const { data } = await axios.post<GenerateResponse>(`/api/generate/${type}`, options);
  return data;
}
