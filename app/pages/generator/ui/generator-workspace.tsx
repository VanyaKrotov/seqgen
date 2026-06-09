import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, Clipboard, LockKeyhole, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import type {
  GenerateResponse,
  GeneratorDefinition,
} from "~/entities/generator/model/types";
import { useGenerate } from "~/features/generate-data/model/use-generate";
import type {
  GeneratorHistoryEntry,
  GeneratorOptions,
} from "~/pages/generator/model/types";
import {
  addGeneratorHistoryEntry,
  clearGeneratorHistory,
  deleteGeneratorHistoryEntry,
  getGeneratorStoredState,
} from "~/shared/lib/generator-storage";
import { GeneratorHistory } from "./generator-history";

type GeneratorWorkspaceProps = {
  generator: GeneratorDefinition;
  initialOptions: GeneratorOptions;
  resultPosition?: "top" | "bottom";
  resultVariant?: "default" | "prominent";
  children: (props: {
    options: GeneratorOptions;
    setOptions: (options: GeneratorOptions) => void;
  }) => ReactNode;
};

function parseBoolean(value: string, fallback: boolean) {
  if (value === "true" || value === "1") return true;
  if (value === "false" || value === "0") return false;
  return fallback;
}

function readOptions(
  defaults: GeneratorOptions,
  searchParams: URLSearchParams,
) {
  return Object.fromEntries(
    Object.entries(defaults).map(([key, fallback]) => {
      const value = searchParams.get(key);

      if (value === null) return [key, fallback];
      if (Array.isArray(fallback)) {
        return [
          key,
          value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        ];
      }
      if (typeof fallback === "number") {
        const number = Number(value);
        return [key, Number.isFinite(number) ? number : fallback];
      }
      if (typeof fallback === "boolean") {
        return [key, parseBoolean(value, fallback)];
      }

      return [key, value];
    }),
  ) as GeneratorOptions;
}

function optionValueToString(value: GeneratorOptions[string]) {
  return Array.isArray(value) ? value.join(",") : String(value);
}

function areOptionsEqual(first: GeneratorOptions, second: GeneratorOptions) {
  const firstEntries = Object.entries(first);
  const secondEntries = Object.entries(second);

  return (
    firstEntries.length === secondEntries.length &&
    firstEntries.every(
      ([key, value]) =>
        optionValueToString(value) === optionValueToString(second[key]),
    )
  );
}

export function GeneratorWorkspace({
  generator,
  initialOptions,
  resultPosition = "top",
  resultVariant = "default",
  children,
}: GeneratorWorkspaceProps) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const optionKeys = useMemo(
    () => Object.keys(initialOptions),
    [initialOptions],
  );
  const [options, setOptionsState] = useState<GeneratorOptions>(() =>
    readOptions(initialOptions, searchParams),
  );
  const [resultData, setResultData] = useState<GenerateResponse | null>(null);
  const [history, setHistory] = useState<GeneratorHistoryEntry[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const mutation = useGenerate();
  const queryUpdateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ownSearchUpdate = useRef<string | null>(null);

  const generate = (addToHistory = false) => {
    mutation.mutate(
      { type: generator.type, options },
      {
        onSuccess: (data) => {
          setResultData(data);
          if (addToHistory) {
            const entry: GeneratorHistoryEntry = {
              id: `${data.generatedAt}-${crypto.randomUUID()}`,
              values: data.values,
              generatedAt: data.generatedAt,
            };
            void addGeneratorHistoryEntry(generator.type, entry).then(
              setHistory,
            );
          }
        },
      },
    );
  };

  const writeOptions = (nextOptions: GeneratorOptions) => {
    setOptionsState(nextOptions);

    if (queryUpdateTimeout.current) {
      clearTimeout(queryUpdateTimeout.current);
    }

    queryUpdateTimeout.current = setTimeout(() => {
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);

          optionKeys.forEach((key) => {
            next.set(key, optionValueToString(nextOptions[key]));
          });

          ownSearchUpdate.current = next.toString();
          return next;
        },
        { replace: true, preventScrollReset: true },
      );
    }, 250);
  };

  useEffect(() => {
    if (searchParams.toString() === ownSearchUpdate.current) {
      ownSearchUpdate.current = null;
      return;
    }

    const nextOptions = readOptions(initialOptions, searchParams);

    if (!areOptionsEqual(options, nextOptions)) {
      setOptionsState(nextOptions);
      mutation.reset();
    }
  }, [searchParams]);

  useEffect(
    () => () => {
      if (queryUpdateTimeout.current) {
        clearTimeout(queryUpdateTimeout.current);
      }
    },
    [],
  );

  useEffect(() => {
    let active = true;

    void getGeneratorStoredState(generator.type).then((stored) => {
      if (!active) return;

      setHistory(stored.history);
      const latestEntry = stored.history[0];
      if (latestEntry) {
        setResultData({
          type: generator.type,
          values: latestEntry.values,
          generatedAt: latestEntry.generatedAt,
        });
        return;
      }

      generate();
    });

    return () => {
      active = false;
    };
  }, []);

  const copy = async (value: string, index: number) => {
    await navigator.clipboard.writeText(value);
    setCopied(index);
    window.setTimeout(() => setCopied(null), 1400);
  };

  const deleteHistoryEntry = (id: string) => {
    void deleteGeneratorHistoryEntry(generator.type, id).then(
      (nextHistory) => {
        setHistory(nextHistory);
        const latestEntry = nextHistory[0];
        setResultData(
          latestEntry
            ? {
                type: generator.type,
                values: latestEntry.values,
                generatedAt: latestEntry.generatedAt,
              }
            : null,
        );
      },
    );
  };

  const clearHistory = () => {
    setHistory([]);
    setResultData(null);
    void clearGeneratorHistory(generator.type);
  };

  const result = (
    <div
      className={
        resultVariant === "prominent"
          ? "mb-7"
          : resultPosition === "top"
            ? "mb-6"
            : "mt-6 border-t border-[var(--border)] pt-[22px]"
      }
    >
      {resultVariant === "default" ? (
        <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.1em] text-[var(--muted)]">
          <span>{t("common.result")}</span>
          <span className="size-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_var(--accent)]" />
        </div>
      ) : null}
      {mutation.isError ? (
        <p className="text-center text-[13px] text-[#ff6464]">
          {t("errors.invalid")}
        </p>
      ) : null}
      {!resultData ? (
        <div
          className={
            resultVariant === "prominent"
              ? "grid min-h-[118px] place-items-center rounded-2xl border border-dashed border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-strong)_36%,transparent)] p-6 text-center text-sm text-[var(--muted)]"
              : "grid min-h-[86px] place-items-center rounded-xl border border-dashed border-[var(--border)] p-5 text-center text-[13px] text-[var(--muted)]"
          }
        >
          {t("common.noResult")}
        </div>
      ) : (
        <div className="flex max-h-[330px] flex-col gap-2">
          {resultData.values.map((value, index) => (
            <motion.div
              className={
                resultVariant === "prominent"
                  ? "relative flex min-h-[118px] items-center justify-center rounded-2xl border border-[color-mix(in_srgb,var(--accent)_34%,var(--border))] bg-[color-mix(in_srgb,var(--accent)_7%,var(--surface-strong))] px-16 py-7 shadow-[0_18px_50px_color-mix(in_srgb,var(--accent)_10%,transparent)] max-[540px]:min-h-[104px] max-[540px]:px-12"
                  : "flex items-center gap-3 rounded-[11px] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-strong)_68%,transparent)] py-[11px] pl-[14px] pr-[11px]"
              }
              key={`${value}-${index}`}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.035 }}
            >
              <code
                className={
                  resultVariant === "prominent"
                    ? "min-w-0 text-center font-mono text-[clamp(20px,3vw,34px)] font-semibold leading-[1.35] tracking-[.025em] [overflow-wrap:anywhere]"
                    : "min-w-0 flex-1 font-mono text-[13px] font-medium leading-[1.55] [overflow-wrap:anywhere]"
                }
              >
                {value}
              </code>
              <button
                className={
                  resultVariant === "prominent"
                    ? "absolute right-4 top-1/2 grid size-10 -translate-y-1/2 cursor-pointer place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] shadow-sm hover:border-[var(--accent)] hover:text-[var(--accent)] max-[540px]:right-2"
                    : "grid size-[34px] shrink-0 cursor-pointer place-items-center rounded-[9px] border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                }
                type="button"
                onClick={() => void copy(value, index)}
                aria-label={t("actions.copy")}
              >
                {copied === index ? (
                  <Check size={17} />
                ) : (
                  <Clipboard size={17} />
                )}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="mx-auto w-full max-w-[940px]">
      <div className="mb-7">
        <div className="flex items-center gap-[7px] text-[11px] font-bold uppercase tracking-[.11em] text-[var(--accent)] transition-colors duration-700">
          <LockKeyhole size={14} /> {t("common.secure")}
        </div>
        <h1 className="mb-2 mt-[11px] text-[clamp(32px,4.5vw,58px)] leading-[1.02] tracking-[-.055em] max-[540px]:text-[34px]">
          {t(`generators.${generator.translationKey}.title`)}
        </h1>
        <p className="m-0 max-w-[650px] text-[15px] leading-[1.65] text-[var(--muted)]">
          {t(`generators.${generator.translationKey}.description`)}
        </p>
      </div>
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-[clamp(18px,3vw,32px)] shadow-[var(--shadow)] backdrop-blur-[22px] max-[540px]:rounded-[18px]">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            generate(true);
          }}
        >
          {resultPosition === "top" ? result : null}
          {children({ options, setOptions: writeOptions })}
          <motion.button
            className="mt-5 flex h-[50px] w-full cursor-pointer items-center justify-center gap-[9px] rounded-xl border-0 bg-[var(--accent)] font-bold text-white shadow-[0_10px_35px_color-mix(in_srgb,var(--accent)_28%,transparent)] transition-[background,box-shadow,opacity] duration-700 disabled:cursor-wait disabled:opacity-[.65]"
            type="submit"
            disabled={mutation.isPending}
            whileTap={{ scale: 0.98 }}
            whileHover={{ y: -1 }}
          >
            <RefreshCw
              size={18}
              className={mutation.isPending ? "animate-spin" : ""}
            />
            {mutation.isPending
              ? t("actions.generating")
              : t("actions.generate")}
          </motion.button>
        </form>
        {resultPosition === "bottom" ? result : null}
      </div>
      <GeneratorHistory
        entries={history}
        concealed={generator.type === "password"}
        onClear={clearHistory}
        onDelete={deleteHistoryEntry}
      />
    </section>
  );
}
