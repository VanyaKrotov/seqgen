import { data } from "react-router";
import { ZodError } from "zod";
import type { Route } from "./+types/api.generate";
import { isGeneratorType } from "~/entities/generator/config/generators";
import { generate } from "~/entities/generator/server/generate.server";
import { parseOptions } from "~/entities/generator/server/schema.server";

export async function action({ request, params }: Route.ActionArgs) {
  if (!params.type || !isGeneratorType(params.type)) {
    return data({ error: "Unknown generator type" }, { status: 404 });
  }
  try {
    const options = parseOptions(params.type, await request.json());
    return data({
      type: params.type,
      values: generate(params.type, options),
      generatedAt: new Date().toISOString(),
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof ZodError ? error.issues.map((issue) => issue.message).join("; ") : error instanceof Error ? error.message : "Invalid request";
    return data({ error: message }, { status: 400 });
  }
}

export function loader() {
  return data({ error: "Use POST" }, { status: 405, headers: { Allow: "POST" } });
}
