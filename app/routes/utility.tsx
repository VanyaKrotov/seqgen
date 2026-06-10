import type { Route } from "./+types/utility";
import { getUtility } from "~/entities/utility/config/utilities";
import { UtilityPage } from "~/pages/utility/ui/utility-page";
import { getInstance } from "~/shared/lib/i18n-middleware";
import { buildMetadata } from "~/shared/lib/metadata";
import { shouldRevalidateByPathOrLanguage } from "~/shared/lib/should-revalidate";
import { AppShell } from "~/widgets/app-shell/ui/app-shell";

function requireUtility(type?: string) {
  const utility = getUtility(type);

  if (!utility) {
    throw new Response("Not found", { status: 404 });
  }

  return utility;
}

export function loader({ context, params }: Route.LoaderArgs) {
  const utility = requireUtility(params.type);
  const i18n = getInstance(context);

  return {
    metadata: {
      title: `${i18n.t(`utilities.${utility.translationKey}.title`)} · Seqgen`,
      description: i18n.t(
        `utilities.${utility.translationKey}.metaDescription`,
      ),
    },
  };
}

export function meta({ data }: Route.MetaArgs) {
  return buildMetadata(data?.metadata);
}

export const shouldRevalidate = shouldRevalidateByPathOrLanguage;

export default function UtilityRoute({ params }: Route.ComponentProps) {
  const utility = requireUtility(params.type);

  return (
    <AppShell>
      <UtilityPage utility={utility} />
    </AppShell>
  );
}
