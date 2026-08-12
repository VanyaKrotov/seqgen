import { Braces, CheckCircle2, Server, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

type Endpoint = {
  id: string;
  path: string;
  fields: string[];
  noteKey: string;
  example: string;
};

const endpoints: Endpoint[] = [
  {
    id: "password",
    path: "/api/generate/password",
    fields: [
      "length: integer, 6..128",
      "uppercase: boolean",
      "lowercase: boolean",
      "numbers: boolean",
      "symbols: boolean",
    ],
    noteKey: "password",
    example: '{"length":32,"symbols":true}',
  },
  {
    id: "number",
    path: "/api/generate/number",
    fields: [
      "min: integer",
      "max: integer",
      "exclusions: string[]",
      "quantity: integer, 1..50",
    ],
    noteKey: "number",
    example: '{"min":1,"max":10,"exclusions":["3","7"],"quantity":4}',
  },
  {
    id: "vpn",
    path: "/api/generate/vpn",
    fields: [
      "protocol: shadowsocks | wireguard | hex",
      "length: integer, 2..256",
      "quantity: integer, 1..50",
    ],
    noteKey: "vpn",
    example: '{"protocol":"shadowsocks","length":32}',
  },
  {
    id: "uuid",
    path: "/api/generate/uuid",
    fields: [
      "format: standard | numeric | alpha | alphanumeric",
      "length: integer, 2..256",
      "quantity: integer, 1..50",
    ],
    noteKey: "uuid",
    example: '{"format":"alphanumeric","length":24}',
  },
  {
    id: "phrase",
    path: "/api/generate/phrase",
    fields: [
      "words: 12 | 15 | 18 | 21 | 24",
      "separator: string, 1..4 characters",
      "quantity: integer, 1..50",
    ],
    noteKey: "phrase",
    example: '{"words":12,"separator":" "}',
  },
  {
    id: "seq",
    path: "/api/generate/seq",
    fields: [
      "byteLength: integer, 2..256",
      "encoding: hex | base64 | base64url",
      "quantity: integer, 1..50",
    ],
    noteKey: "seq",
    example: '{"byteLength":32,"encoding":"hex"}',
  },
  {
    id: "shortId",
    path: "/api/generate/short-id",
    fields: ["length: integer, 2..256", "quantity: integer, 1..50"],
    noteKey: "shortId",
    example: '{"length":8}',
  },
];

export function ApiDocsPage() {
  const { t } = useTranslation();

  return (
    <article className="mx-auto w-full max-w-[1080px]">
      <div className="flex items-center gap-[7px] text-[11px] font-bold uppercase tracking-[.11em] text-[var(--accent)]">
        <Braces size={14} /> SEQGEN / API
      </div>
      <h1 className="mb-3 mt-[11px] text-[clamp(36px,5vw,64px)] leading-[1.02] tracking-[-.055em]">
        {t("apiDocs.title")}
      </h1>
      <p className="m-0 max-w-[760px] text-base leading-7 text-[var(--muted)]">
        {t("apiDocs.description")}
      </p>

      <div className="mt-9 grid grid-cols-3 gap-4 max-[760px]:grid-cols-1">
        {[
          [Server, "apiDocs.server"],
          [ShieldCheck, "apiDocs.secure"],
          [CheckCircle2, "apiDocs.json"],
        ].map(([Icon, label]) => {
          const CardIcon = Icon as typeof Server;
          return (
            <div
              className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm"
              key={label as string}
            >
              <CardIcon size={19} className="text-[var(--accent)]" />
              {t(label as string)}
            </div>
          );
        })}
      </div>

      <section className="mt-6 rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-[clamp(20px,4vw,36px)] shadow-[var(--shadow)]">
        <h2 className="mt-0 text-xl tracking-[-.03em]">
          {t("apiDocs.quickStart")}
        </h2>
        <p className="text-sm leading-6 text-[var(--muted)]">
          {t("apiDocs.requestHint")}
        </p>
        <h3 className="mb-2 mt-7 text-sm">{t("apiDocs.postRequest")}</h3>
        <pre className="m-0 overflow-x-auto rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] p-4 font-mono text-xs leading-6">
          <code>{`curl -X POST /api/generate/password \\
  -H "Content-Type: application/json" \\
  -H "X-Language: en" \\
  -d '{"length":32,"symbols":true}'`}</code>
        </pre>
        <h3 className="mb-2 mt-7 text-sm">{t("apiDocs.getRequest")}</h3>
        <pre className="m-0 overflow-x-auto rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] p-4 font-mono text-xs leading-6">
          <code>{`curl /api/generate/password \\
  -H "X-Data: eyJsZW5ndGgiOjMyLCJzeW1ib2xzIjp0cnVlfQ==" \\
  -H "X-Language: en"`}</code>
        </pre>
        <h3 className="mb-2 mt-7 text-sm">{t("apiDocs.response")}</h3>
        <pre className="m-0 overflow-x-auto rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] p-4 font-mono text-xs leading-6">
          <code>{`{
  "type": "password",
  "values": ["generated-value"],
  "generatedAt": "2026-06-10T12:00:00.000Z"
}`}</code>
        </pre>
      </section>

      <div className="mt-6 grid gap-4">
        {endpoints.map((endpoint) => (
          <section
            className="rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-[clamp(20px,4vw,32px)]"
            key={endpoint.id}
          >
            <div className="flex items-center justify-between gap-4 max-[640px]:block">
              <h2 className="m-0 text-xl tracking-[-.03em]">
                {t(`generators.${endpoint.id}.name`)}
              </h2>
              <code className="rounded-lg bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-3 py-2 text-xs text-[var(--accent)] max-[640px]:mt-3 max-[640px]:inline-block">
                GET · POST {endpoint.path}
              </code>
            </div>
            <div className="mt-5 grid grid-cols-[1fr_1.15fr] gap-6 max-[760px]:grid-cols-1">
              <div>
                <h3 className="mb-3 mt-0 text-xs uppercase tracking-[.1em] text-[var(--muted)]">
                  {t("apiDocs.parameters")}
                </h3>
                <ul className="m-0 grid gap-2 pl-5 font-mono text-xs leading-5">
                  {endpoint.fields.map((field) => (
                    <li key={field}>{field}</li>
                  ))}
                </ul>
                <p className="mb-0 mt-4 text-xs leading-5 text-[var(--muted)]">
                  {t(`apiDocs.notes.${endpoint.noteKey}`)}
                </p>
              </div>
              <pre className="m-0 overflow-x-auto rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_86%,transparent)] p-4 font-mono text-xs leading-6">
                <code>{endpoint.example}</code>
              </pre>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-6 rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-[clamp(20px,4vw,32px)]">
        <h2 className="mt-0 text-xl tracking-[-.03em]">
          {t("apiDocs.health")}
        </h2>
        <code className="text-sm text-[var(--accent)]">GET /api/health</code>
        <h2 className="mb-3 mt-8 text-xl tracking-[-.03em]">
          {t("apiDocs.security")}
        </h2>
        <ul className="m-0 grid gap-2 pl-5 text-sm leading-6 text-[var(--muted)]">
          <li>{t("apiDocs.securityCrypto")}</li>
          <li>{t("apiDocs.securityCache")}</li>
          <li>{t("apiDocs.securityHttps")}</li>
        </ul>
      </section>
    </article>
  );
}
