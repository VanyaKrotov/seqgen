import type { GeneratorDefinition } from "~/entities/generator/model/types";
import { NumberGeneratorPage } from "./pages/number-generator-page";
import { PasswordGeneratorPage } from "./pages/password-generator-page";
import { PhraseGeneratorPage } from "./pages/phrase-generator-page";
import { SeqGeneratorPage } from "./pages/seq-generator-page";
import { ShortIdGeneratorPage } from "./pages/short-id-generator-page";
import { UuidGeneratorPage } from "./pages/uuid-generator-page";
import { VpnGeneratorPage } from "./pages/vpn-generator-page";

export function GeneratorPage({
  generator,
}: {
  generator: GeneratorDefinition;
}) {
  switch (generator.type) {
    case "password":
      return (
        <PasswordGeneratorPage key={generator.type} generator={generator} />
      );
    case "number":
      return <NumberGeneratorPage key={generator.type} generator={generator} />;
    case "vpn":
      return <VpnGeneratorPage key={generator.type} generator={generator} />;
    case "uuid":
      return <UuidGeneratorPage key={generator.type} generator={generator} />;
    case "phrase":
      return <PhraseGeneratorPage key={generator.type} generator={generator} />;
    case "seq":
      return <SeqGeneratorPage key={generator.type} generator={generator} />;
    case "short-id":
      return (
        <ShortIdGeneratorPage key={generator.type} generator={generator} />
      );
  }
}
