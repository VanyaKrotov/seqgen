import type { GeneratorDefinition } from "~/entities/generator/model/types";
import type { GeneratorField } from "~/pages/generator/model/types";
import { GeneratorFields } from "../generator-fields";
import { GeneratorWorkspace } from "../generator-workspace";

const fields: GeneratorField[] = [
  {
    key: "quantity",
    label: "common.quantity",
    type: "input-group",
    min: 1,
    max: 50,
    step: 1,
  },
  {
    key: "length",
    label: "common.length",
    type: "slider",
    min: 2,
    max: 256,
    step: 1,
  },
];

export function ShortIdGeneratorPage({
  generator,
}: {
  generator: GeneratorDefinition;
}) {
  return (
    <GeneratorWorkspace
      generator={generator}
      initialOptions={{ length: 8, quantity: 1 }}
    >
      {({ options, setOptions }) => (
        <GeneratorFields
          generator={generator}
          fields={fields}
          options={options}
          onChange={setOptions}
        />
      )}
    </GeneratorWorkspace>
  );
}
