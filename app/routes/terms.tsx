import type { Route } from "./+types/terms";
import { LegalPage } from "~/pages/legal/ui/legal-page";
import { getInstance } from "~/shared/lib/i18n-middleware";
import { buildMetadata } from "~/shared/lib/metadata";
import { shouldRevalidateByPathOrLanguage } from "~/shared/lib/should-revalidate";
import { AppShell } from "~/widgets/app-shell/ui/app-shell";

export function loader({ context }: Route.LoaderArgs) {
  const i18n = getInstance(context);
  return {
    metadata: {
      title: `${i18n.t("legal.termsTitle")} · Seqgen`,
      description: i18n.t("legal.termsMetaDescription"),
    },
  };
}

export function meta({ data }: Route.MetaArgs) {
  return buildMetadata(data?.metadata);
}

export const shouldRevalidate = shouldRevalidateByPathOrLanguage;

export default function TermsRoute() { return <AppShell><LegalPage type="terms" /></AppShell>; }
