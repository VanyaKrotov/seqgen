import { data } from "react-router";
import { ZodError } from "zod";
import type { Route } from "./+types/api.generate";
import { isGeneratorType } from "~/entities/generator/config/generators";
import {
  getApiErrorMessages,
  getApiLanguage,
} from "~/entities/generator/server/api-errors.server";
import { generate } from "~/entities/generator/server/generate.server";
import { parseOptions } from "~/entities/generator/server/schema.server";

class RequestInputError extends Error {
  constructor(message: string) {
    super(message);
  }
}

function parseBase64Options(header: string | null, invalidMessage: string) {
  if (!header) {
    throw new RequestInputError(invalidMessage);
  }

  if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(header)) {
    throw new RequestInputError(invalidMessage);
  }

  try {
    return JSON.parse(
      new TextDecoder("utf-8", { fatal: true }).decode(
        Buffer.from(header, "base64"),
      ),
    );
  } catch {
    throw new RequestInputError(invalidMessage);
  }
}

async function getRequestOptions(
  request: Request,
  language: ReturnType<typeof getApiLanguage>,
) {
  const messages = getApiErrorMessages(language);

  if (request.method === "GET") {
    const header = request.headers.get("X-Data");
    if (!header) {
      throw new RequestInputError(messages.missingOptions);
    }

    return parseBase64Options(header, messages.invalidOptions);
  }

  try {
    return await request.json();
  } catch {
    throw new RequestInputError(messages.invalidJson);
  }
}

type GenerateRequestArgs = {
  request: Request;
  params: { type?: string };
};

async function handleGenerateRequest({ request, params }: GenerateRequestArgs) {
  const language = getApiLanguage(request.headers.get("X-Language"));
  const messages = getApiErrorMessages(language);

  if (!params.type || !isGeneratorType(params.type)) {
    return data({ error: messages.unknownGenerator }, { status: 404 });
  }

  try {
    const options = parseOptions(
      params.type,
      await getRequestOptions(request, language),
      language,
    );
    return data({
      type: params.type,
      values: generate(params.type, options),
      generatedAt: new Date().toISOString(),
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const message = error instanceof ZodError
      ? error.issues.map((issue) => issue.message).join("; ")
      : error instanceof RequestInputError
        ? error.message
        : messages.invalidParameters;
    return data({ error: message }, { status: 400 });
  }
}

export async function action(args: Route.ActionArgs) {
  if (args.request.method !== "POST") {
    const language = getApiLanguage(args.request.headers.get("X-Language"));
    return data(
      { error: getApiErrorMessages(language).methodNotAllowed },
      { status: 405, headers: { Allow: "GET, POST" } },
    );
  }

  return handleGenerateRequest(args);
}

export async function loader(args: Route.LoaderArgs) {
  if (args.request.method !== "GET") {
    const language = getApiLanguage(args.request.headers.get("X-Language"));
    return data(
      { error: getApiErrorMessages(language).methodNotAllowed },
      { status: 405, headers: { Allow: "GET, POST" } },
    );
  }

  return handleGenerateRequest(args);
}
