import { useEffect, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import { useTranslation } from "react-i18next";
import type { Route } from "./+types/root";
import { getInstance, getLocale, i18nextMiddleware } from "~/shared/lib/i18n-middleware";
import { buildMetadata } from "~/shared/lib/metadata";
import { makeQueryClient } from "~/shared/lib/query-client";
import { shouldRevalidateByPathOrLanguage } from "~/shared/lib/should-revalidate";
import "~/shared/lib/i18n.client";
import "./styles.css";

export const middleware = [i18nextMiddleware];
export const clientMiddleware = [i18nextMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
  const locale = getLocale(context);
  const i18n = getInstance(context);
  return {
    locale,
    metadata: {
      title: `Seqgen · ${i18n.t("brandTagline")}`,
      description: i18n.t("generators.password.description"),
    },
  };
}

export function meta({ data }: Route.MetaArgs) {
  return buildMetadata(data?.metadata);
}

export const shouldRevalidate = shouldRevalidateByPathOrLanguage;

export const links: Route.LinksFunction = () => [
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  return (
    <html
      lang={data?.locale ?? "en"}
      className="bg-[var(--bg)] font-sans text-[var(--text)] [color-scheme:light_dark] [font-synthesis:none] [--bg:#f4f6fb] [--border:rgba(22,28,45,.11)] [--muted:#687086] [--shadow:0_24px_80px_rgba(32,42,70,.12)] [--surface-strong:#fff] [--surface:rgba(255,255,255,.76)] [--text:#101321] dark:[--bg:#070910] dark:[--border:rgba(255,255,255,.09)] dark:[--muted:#9299ad] dark:[--shadow:0_28px_100px_rgba(0,0,0,.38)] dark:[--surface-strong:#11141f] dark:[--surface:rgba(17,20,31,.74)] dark:[--text:#f5f7ff]"
    >
      <head><meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><Meta /><Links /></head>
      <body className="m-0 min-w-80 bg-[var(--bg)] text-[var(--text)] antialiased [font:inherit] [&_a]:text-inherit [&_a]:no-underline [&_button]:[-webkit-tap-highlight-color:transparent] [&_button]:font-inherit [&_input]:font-inherit [&_select]:font-inherit">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();
  const [queryClient] = useState(makeQueryClient);
  useEffect(() => { if (i18n.language !== locale) void i18n.changeLanguage(locale); }, [i18n, locale]);
  return <QueryClientProvider client={queryClient}><Outlet /></QueryClientProvider>;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : error instanceof Error ? error.message : "Unknown error";
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--bg)] p-6 text-[var(--text)]">
      <div className="max-w-[520px] rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-[30px]">
        <strong>Seqgen</strong>
        <h1>Application error</h1>
        <p>{message}</p>
      </div>
    </main>
  );
}
