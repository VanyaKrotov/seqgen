import type { Route } from "./+types/api-docs";
import { ApiDocsPage } from "~/pages/api-docs/ui/api-docs-page";
import { getInstance } from "~/shared/lib/i18n-middleware";
import { buildMetadata } from "~/shared/lib/metadata";
import { shouldRevalidateByPathOrLanguage } from "~/shared/lib/should-revalidate";
import { AppShell } from "~/widgets/app-shell/ui/app-shell";

export function loader({ context }: Route.LoaderArgs) {
  const i18n = getInstance(context);
  return {
    metadata: {
      title: `${i18n.t("apiDocs.title")} · Seqgen`,
      description: i18n.t("apiDocs.metaDescription"),
    },
  };
}

export function meta({ data }: Route.MetaArgs) {
  return buildMetadata(data?.metadata);
}

export const shouldRevalidate = shouldRevalidateByPathOrLanguage;

export default function ApiDocsRoute() {
  return (
    <AppShell>
      <ApiDocsPage />
    </AppShell>
  );
}
