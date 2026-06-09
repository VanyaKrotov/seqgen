import type { Route } from "./+types/generator";
import { getGenerator } from "~/entities/generator/config/generators";
import { GeneratorPage } from "~/pages/generator/ui/generator-page";
import { getInstance } from "~/shared/lib/i18n-middleware";
import { buildMetadata } from "~/shared/lib/metadata";
import { shouldRevalidateByPathOrLanguage } from "~/shared/lib/should-revalidate";
import { AppShell } from "~/widgets/app-shell/ui/app-shell";

export function loader({ context, params }: Route.LoaderArgs) {
  const generator = getGenerator(params.type);
  const i18n = getInstance(context);

  return {
    metadata: {
      title: `${i18n.t(`generators.${generator.translationKey}.title`)} · Seqgen`,
      description: i18n.t(`generators.${generator.translationKey}.description`),
    },
  };
}

export function meta({ data }: Route.MetaArgs) {
  return buildMetadata(data?.metadata);
}

export const shouldRevalidate = shouldRevalidateByPathOrLanguage;

export default function GeneratorRoute({ params }: Route.ComponentProps) {
  return (
    <AppShell>
      <GeneratorPage generator={getGenerator(params.type)} />
    </AppShell>
  );
}
