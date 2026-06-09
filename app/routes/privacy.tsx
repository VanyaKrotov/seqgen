import type { Route } from "./+types/privacy";
import { LegalPage } from "~/pages/legal/ui/legal-page";
import { getInstance } from "~/shared/lib/i18n-middleware";
import { buildMetadata } from "~/shared/lib/metadata";
import { shouldRevalidateByPathOrLanguage } from "~/shared/lib/should-revalidate";
import { AppShell } from "~/widgets/app-shell/ui/app-shell";

export function loader({ context }: Route.LoaderArgs) {
  const i18n = getInstance(context);
  return {
    metadata: {
      title: `${i18n.t("legal.privacyTitle")} · Seqgen`,
      description: i18n.t("legal.privacyMetaDescription"),
    },
  };
}

export function meta({ data }: Route.MetaArgs) {
  return buildMetadata(data?.metadata);
}

export const shouldRevalidate = shouldRevalidateByPathOrLanguage;

export default function PrivacyRoute() { return <AppShell><LegalPage type="privacy" /></AppShell>; }
