import type { GeneratorDefinition } from "~/entities/generator/model/types";
import type { GeneratorField } from "~/pages/generator/model/types";
import { GeneratorFields } from "../generator-fields";
import { GeneratorWorkspace } from "../generator-workspace";

const fields: GeneratorField[] = [
  {
    key: "words",
    label: "fields.words",
    type: "select",
    options: ["12", "15", "18", "21", "24"].map((value) => ({
      value,
      label: value,
    })),
  },
  { key: "separator", label: "fields.separator", type: "text" },
  {
    key: "quantity",
    label: "common.quantity",
    type: "input-group",
    min: 1,
    max: 50,
    step: 1,
  },
];

export function PhraseGeneratorPage({
  generator,
}: {
  generator: GeneratorDefinition;
}) {
  return (
    <GeneratorWorkspace
      generator={generator}
      initialOptions={{ words: 12, separator: " ", quantity: 1 }}
    >
      {({ options, setOptions }) => (
        <GeneratorFields
          className="grid-cols-3 max-[760px]:grid-cols-1"
          generator={generator}
          fields={fields}
          options={options}
          onChange={setOptions}
        />
      )}
    </GeneratorWorkspace>
  );
}
