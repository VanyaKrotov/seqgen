import type { GeneratorDefinition } from "~/entities/generator/model/types";
import type { GeneratorField } from "~/pages/generator/model/types";
import { GeneratorFields } from "../generator-fields";
import { GeneratorWorkspace } from "../generator-workspace";

const fields: GeneratorField[] = [
  {
    key: "protocol",
    label: "fields.type",
    type: "select",
    options: [
      { value: "shadowsocks", label: "Shadowsocks / URL-safe" },
      { value: "wireguard", label: "WireGuard key" },
      { value: "hex", label: "Hex secret" },
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

export function VpnGeneratorPage({
  generator,
}: {
  generator: GeneratorDefinition;
}) {
  return (
    <GeneratorWorkspace
      generator={generator}
      initialOptions={{ protocol: "shadowsocks", length: 32, quantity: 1 }}
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
