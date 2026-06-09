import type { GeneratorDefinition } from "~/entities/generator/model/types";
import type { GeneratorField } from "~/pages/generator/model/types";
import { GeneratorFields } from "../generator-fields";
import { GeneratorWorkspace } from "../generator-workspace";

const fields: GeneratorField[] = [
  {
    key: "encoding",
    label: "fields.encoding",
    type: "select",
    options: [
      { value: "hex", label: "Hex" },
      { value: "base64", label: "Base64" },
      { value: "base64url", label: "Base64URL" },
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
    key: "byteLength",
    label: "fields.byteLength",
    type: "slider",
    min: 2,
    max: 256,
    step: 1,
  },
];

export function SeqGeneratorPage({
  generator,
}: {
  generator: GeneratorDefinition;
}) {
  return (
    <GeneratorWorkspace
      generator={generator}
      initialOptions={{ byteLength: 32, encoding: "hex", quantity: 1 }}
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
