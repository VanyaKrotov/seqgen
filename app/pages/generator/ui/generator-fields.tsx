import { Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { GeneratorDefinition } from "~/entities/generator/model/types";
import type {
  GeneratorField,
  GeneratorOptions,
} from "~/pages/generator/model/types";
import { cn } from "~/shared/lib/cn";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "~/shared/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/ui/select";
import { Slider } from "~/shared/ui/slider";

type GeneratorFieldsProps = {
  generator: GeneratorDefinition;
  fields: GeneratorField[];
  options: GeneratorOptions;
  onChange: (options: GeneratorOptions) => void;
  className?: string;
};

export function GeneratorFields({
  generator,
  fields,
  options,
  onChange,
  className,
}: GeneratorFieldsProps) {
  const { t } = useTranslation();

  const update = (field: GeneratorField, raw: string | boolean) => {
    const value =
      field.key === "exclusions"
        ? String(raw)
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : field.type === "number"
          ? Number(raw)
          : raw;
    onChange({ ...options, [field.key]: value });
  };

  const updateNumber = (field: GeneratorField, value: number) => {
    const min = field.min ?? Number.MIN_SAFE_INTEGER;
    const max = field.max ?? Number.MAX_SAFE_INTEGER;
    onChange({
      ...options,
      [field.key]: Math.min(max, Math.max(min, value)),
    });
  };

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 max-[540px]:grid-cols-1",
        className,
      )}
    >
      {fields.map((field) =>
        field.type === "checkbox" ? (
          <label
            className={cn(
              "group flex min-h-[46px] cursor-pointer items-center gap-3 rounded-[11px] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-strong)_74%,transparent)] px-[13px] text-[13px]",
              field.fullWidth && "col-span-full",
            )}
            key={field.key}
          >
            <span className="flex min-w-0 items-baseline gap-1.5">
              <span>{t(field.label)}</span>
              {field.hint ? (
                <span className="font-mono text-[11px] font-medium text-[var(--muted)]">
                  ({field.hint})
                </span>
              ) : null}
            </span>
            <input
              className="peer sr-only"
              type="checkbox"
              checked={Boolean(options[field.key])}
              onChange={(event) => update(field, event.target.checked)}
            />
            <span className="ml-auto h-5 w-[35px] rounded-full bg-[color-mix(in_srgb,var(--muted)_28%,transparent)] p-[3px] transition-colors duration-200 after:block after:size-[14px] after:rounded-full after:bg-white after:shadow-[0_1px_4px_rgba(0,0,0,.25)] after:transition-transform after:duration-200 peer-checked:bg-[var(--accent)] peer-checked:after:translate-x-[15px]" />
          </label>
        ) : (
          <div
            className={cn(
              "flex flex-col gap-2 text-xs font-semibold text-[var(--muted)]",
              field.type === "slider" && "col-span-full mt-0.5",
              field.fullWidth && "col-span-full",
            )}
            key={field.key}
          >
            <span
              className="flex items-center justify-between gap-3"
              id={`${field.key}-label`}
            >
              {t(field.label)}
              {field.type === "slider" ? (
                <output className="min-w-[34px] rounded-[7px] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-strong)_74%,transparent)] px-2 py-[3px] text-center font-mono text-xs font-semibold leading-[1.4] text-[var(--text)]">
                  {String(options[field.key])}
                </output>
              ) : null}
            </span>
            {field.type === "select" ? (
              <Select
                value={String(options[field.key])}
                onValueChange={(value) => update(field, value)}
              >
                <SelectTrigger aria-labelledby={`${field.key}-label`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent accent={generator.color}>
                  {field.options?.map((option) => (
                    <SelectItem value={option.value} key={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === "slider" ? (
              <div className="flex min-h-[46px] flex-col justify-center gap-[7px] px-[3px]">
                <Slider
                  value={[Number(options[field.key])]}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  aria-labelledby={`${field.key}-label`}
                  onValueChange={([value]) =>
                    onChange({ ...options, [field.key]: value })
                  }
                />
                <div
                  className="flex justify-between font-mono text-[9px] font-medium leading-none text-[var(--muted)] opacity-70"
                  aria-hidden="true"
                >
                  <span>{field.min}</span>
                  <span>{field.max}</span>
                </div>
              </div>
            ) : field.type === "input-group" ? (
              <InputGroup>
                <InputGroupButton
                  aria-label={t("actions.decrease")}
                  disabled={Number(options[field.key]) <= (field.min ?? 1)}
                  onClick={() =>
                    updateNumber(
                      field,
                      Number(options[field.key]) - (field.step ?? 1),
                    )
                  }
                >
                  <Minus />
                </InputGroupButton>
                <InputGroupInput
                  type="number"
                  value={String(options[field.key])}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  aria-labelledby={`${field.key}-label`}
                  onChange={(event) => {
                    const value = event.target.valueAsNumber;
                    if (!Number.isNaN(value)) updateNumber(field, value);
                  }}
                />
                <InputGroupButton
                  aria-label={t("actions.increase")}
                  disabled={Number(options[field.key]) >= (field.max ?? 50)}
                  onClick={() =>
                    updateNumber(
                      field,
                      Number(options[field.key]) + (field.step ?? 1),
                    )
                  }
                >
                  <Plus />
                </InputGroupButton>
              </InputGroup>
            ) : (
              <input
                className="h-[46px] w-full rounded-[11px] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-strong)_74%,transparent)] px-[13px] text-[var(--text)] outline-none transition-[border-color,box-shadow] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_15%,transparent)]"
                type={field.type}
                value={
                  field.key === "exclusions"
                    ? (options[field.key] as string[]).join(", ")
                    : String(options[field.key])
                }
                min={field.min}
                max={field.max}
                step={field.step}
                placeholder={
                  field.key === "exclusions"
                    ? t("common.exclusionsHint")
                    : undefined
                }
                onChange={(event) => update(field, event.target.value)}
              />
            )}
          </div>
        ),
      )}
    </div>
  );
}
