import type { GeneratorDefinition } from "~/entities/generator/model/types";
import type { GeneratorField } from "~/pages/generator/model/types";
import { GeneratorFields } from "../generator-fields";
import { GeneratorWorkspace } from "../generator-workspace";

const fields: GeneratorField[] = [
  {
    key: "format",
    label: "common.format",
    type: "select",
    options: [
      { value: "standard", label: "UUID v4" },
      { value: "numeric", label: "0-9" },
      { value: "alpha", label: "A-Z, a-z" },
      { value: "alphanumeric", label: "A-Z, a-z, 0-9" },
    ],
  },
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

export function UuidGeneratorPage({
  generator,
}: {
  generator: GeneratorDefinition;
}) {
  return (
    <GeneratorWorkspace
      generator={generator}
      initialOptions={{ format: "standard", length: 32, quantity: 1 }}
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
