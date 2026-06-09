import { useMutation } from "@tanstack/react-query";
import { requestGeneration } from "../api/generate";

export function useGenerate() {
  return useMutation({
    mutationFn: ({ type, options }: Parameters<typeof requestGeneration> extends [infer T, infer O] ? { type: T; options: O } : never) =>
      requestGeneration(type, options),
  });
}
