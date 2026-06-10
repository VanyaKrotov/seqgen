import { motion } from "framer-motion";
import { ArrowLeftRight, RefreshCw } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import type { UtilityDefinition } from "~/entities/utility/config/utilities";
import { cn } from "~/shared/lib/cn";

type Direction = "encode" | "decode";

function encodeBase64(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  for (let index = 0; index < bytes.length; index += 8192) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 8192));
  }

  return btoa(binary);
}

function decodeBase64(value: string) {
  const binary = atob(value.trim());
  const bytes = Uint8Array.from(binary, (character) =>
    character.charCodeAt(0),
  );
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

function transformValue(
  type: UtilityDefinition["type"],
  direction: Direction,
  value: string,
) {
  if (type === "base64") {
    return direction === "encode"
      ? encodeBase64(value)
      : decodeBase64(value);
  }

  return direction === "encode"
    ? encodeURIComponent(value)
    : decodeURIComponent(value);
}

export function UtilityPage({ utility }: { utility: UtilityDefinition }) {
  const { t } = useTranslation();
  const [direction, setDirection] = useState<Direction>("encode");
  const [source, setSource] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setResult(transformValue(utility.type, direction, source));
      setError(false);
    } catch {
      setResult("");
      setError(true);
    }
  };

  const swap = () => {
    setSource(result);
    setResult(source);
    setDirection((current) => (current === "encode" ? "decode" : "encode"));
    setError(false);
  };

  return (
    <section className="mx-auto w-full max-w-[1120px]">
      <div className="mb-7">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.11em] text-[var(--accent)]">
          <RefreshCw size={14} />
          {t("utilities.label")}
        </div>
        <h1 className="mb-2 mt-[11px] text-[clamp(32px,4.5vw,58px)] leading-[1.02] tracking-[-.055em] max-[540px]:text-[34px]">
          {t(`utilities.${utility.translationKey}.title`)}
        </h1>
        <p className="m-0 max-w-[720px] text-[15px] leading-[1.65] text-[var(--muted)]">
          {t(`utilities.${utility.translationKey}.description`)}
        </p>
      </div>

      <form
        className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-[clamp(18px,3vw,32px)] shadow-[var(--shadow)] backdrop-blur-[22px]"
        onSubmit={submit}
      >
        <div className="mb-5 inline-flex rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-strong)_68%,transparent)] p-1">
          {(["encode", "decode"] as const).map((value) => (
            <button
              className={cn(
                "min-w-[112px] cursor-pointer rounded-lg border-0 bg-transparent px-4 py-2.5 text-sm font-semibold text-[var(--muted)] transition-[background,color,box-shadow]",
                direction === value &&
                  "bg-[var(--accent)] text-white shadow-[0_8px_24px_color-mix(in_srgb,var(--accent)_24%,transparent)]",
              )}
              key={value}
              type="button"
              onClick={() => {
                setDirection(value);
                setError(false);
              }}
            >
              {t(`utilities.actions.${value}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)] items-center gap-4 max-[760px]:grid-cols-1">
          <label className="flex min-w-0 flex-col gap-2 text-xs font-semibold text-[var(--muted)]">
            {t(
              `utilities.${utility.translationKey}.${direction === "encode" ? "plainLabel" : "encodedLabel"}`,
            )}
            <textarea
              className="min-h-[280px] w-full resize-y rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-strong)_74%,transparent)] p-4 font-mono text-sm leading-6 text-[var(--text)] outline-none transition-[border-color,box-shadow] placeholder:text-[var(--muted)]/60 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_15%,transparent)]"
              placeholder={t("utilities.sourcePlaceholder")}
              value={source}
              onChange={(event) => {
                setSource(event.target.value);
                setError(false);
              }}
            />
          </label>

          <motion.button
            className="mt-6 grid size-12 cursor-pointer place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--muted)] shadow-sm transition-[border-color,color] hover:border-[var(--accent)] hover:text-[var(--accent)] max-[760px]:mx-auto max-[760px]:mt-0 max-[760px]:rotate-90"
            type="button"
            aria-label={t("utilities.actions.swap")}
            title={t("utilities.actions.swap")}
            onClick={swap}
            whileTap={{ scale: 0.94 }}
          >
            <ArrowLeftRight size={20} />
          </motion.button>

          <label className="flex min-w-0 flex-col gap-2 text-xs font-semibold text-[var(--muted)]">
            {t(
              `utilities.${utility.translationKey}.${direction === "encode" ? "encodedLabel" : "plainLabel"}`,
            )}
            <textarea
              className={cn(
                "min-h-[280px] w-full resize-y rounded-2xl border bg-[color-mix(in_srgb,var(--surface-strong)_74%,transparent)] p-4 font-mono text-sm leading-6 text-[var(--text)] outline-none transition-[border-color,box-shadow]",
                error
                  ? "border-[#ff6464] shadow-[0_0_0_3px_rgba(255,100,100,.12)]"
                  : "border-[var(--border)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_15%,transparent)]",
              )}
              placeholder={t("utilities.resultPlaceholder")}
              value={result}
              onChange={(event) => {
                setResult(event.target.value);
                setError(false);
              }}
            />
          </label>
        </div>

        {error ? (
          <p className="mb-0 mt-3 text-sm text-[#ff6464]">
            {t(`utilities.${utility.translationKey}.error`)}
          </p>
        ) : null}

        <motion.button
          className="mt-5 flex h-[50px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-0 bg-[var(--accent)] font-bold text-white shadow-[0_10px_35px_color-mix(in_srgb,var(--accent)_28%,transparent)]"
          type="submit"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw size={18} />
          {t(`utilities.actions.${direction}`)}
        </motion.button>
      </form>
    </section>
  );
}
