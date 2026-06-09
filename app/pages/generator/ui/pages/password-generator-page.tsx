import type { GeneratorDefinition } from "~/entities/generator/model/types";
import type { GeneratorField } from "~/pages/generator/model/types";
import { GeneratorFields } from "../generator-fields";
import { GeneratorWorkspace } from "../generator-workspace";

const fields: GeneratorField[] = [
  {
    key: "lowercase",
    label: "fields.lowercase",
    hint: "a-z",
    type: "checkbox",
  },
  {
    key: "uppercase",
    label: "fields.uppercase",
    hint: "A-Z",
    type: "checkbox",
  },
  {
    key: "numbers",
    label: "fields.numbers",
    hint: "0-9",
    type: "checkbox",
  },
  {
    key: "symbols",
    label: "fields.symbols",
    hint: "!@#$%",
    type: "checkbox",
  },
  {
    key: "length",
    label: "common.length",
    type: "slider",
    min: 6,
    max: 128,
    step: 1,
  },
];

export function PasswordGeneratorPage({
  generator,
}: {
  generator: GeneratorDefinition;
}) {
  return (
    <GeneratorWorkspace
      generator={generator}
      resultPosition="top"
      resultVariant="prominent"
      initialOptions={{
        length: 20,
        quantity: 1,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
      }}
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
