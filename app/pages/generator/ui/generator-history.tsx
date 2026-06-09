import { useState } from "react";
import { format } from "date-fns";
import {
  Check,
  Clipboard,
  Eye,
  EyeOff,
  History,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { GeneratorHistoryEntry } from "~/pages/generator/model/types";

type GeneratorHistoryProps = {
  entries: GeneratorHistoryEntry[];
  concealed: boolean;
  onClear: () => void;
  onDelete: (id: string) => void;
};

export function GeneratorHistory({
  entries,
  concealed,
  onClear,
  onDelete,
}: GeneratorHistoryProps) {
  const { t } = useTranslation();
  const [revealed, setRevealed] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const toggleRevealed = (id: string) => {
    setRevealed((current) =>
      current.includes(id)
        ? current.filter((entryId) => entryId !== id)
        : [...current, id],
    );
  };

  const copy = async (value: string, id: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1400);
  };

  return (
    <section className="mt-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-[clamp(18px,3vw,28px)] shadow-[var(--shadow)] backdrop-blur-[22px] max-[540px]:rounded-[18px]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)]">
            <History size={18} />
          </span>
          <div>
            <h2 className="m-0 text-base tracking-[-.02em]">
              {t("history.title")}
            </h2>
            <p className="mb-0 mt-0.5 text-xs text-[var(--muted)]">
              {t("history.description")}
            </p>
          </div>
        </div>
        {entries.length > 0 ? (
          <button
            className="flex h-9 cursor-pointer items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-xs font-semibold text-[var(--muted)] hover:border-[#ff6464] hover:text-[#ff6464] max-[540px]:size-9 max-[540px]:justify-center max-[540px]:px-0 max-[540px]:[&_span]:hidden"
            type="button"
            onClick={onClear}
            aria-label={t("actions.clearHistory")}
          >
            <Trash2 size={15} />
            <span>{t("actions.clearHistory")}</span>
          </button>
        ) : null}
      </div>

      {entries.length === 0 ? (
        <div className="grid min-h-20 place-items-center rounded-xl border border-dashed border-[var(--border)] px-5 text-center text-[13px] text-[var(--muted)]">
          {t("history.empty")}
        </div>
      ) : (
        <div className="grid gap-3">
          {entries.map((entry, entryIndex) => {
            const isRevealed = revealed.includes(entry.id);

            return (
              <motion.article
                className="rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface-strong)_56%,transparent)] p-3.5"
                key={entry.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: entryIndex * 0.025 }}
              >
                <div className="mb-2.5 flex items-center justify-between gap-3">
                  <time
                    className="font-mono text-[10px] text-[var(--muted)]"
                    dateTime={entry.generatedAt}
                  >
                    {format(new Date(entry.generatedAt), "yyyy-MM-dd HH:mm:ss")}
                  </time>
                  <div className="flex gap-1.5">
                    {concealed ? (
                      <button
                        className="grid size-8 cursor-pointer place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
                        type="button"
                        onClick={() => toggleRevealed(entry.id)}
                        aria-label={
                          isRevealed ? t("actions.hide") : t("actions.show")
                        }
                      >
                        {isRevealed ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    ) : null}
                    <button
                      className="grid size-8 cursor-pointer place-items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[#ff6464] hover:text-[#ff6464]"
                      type="button"
                      onClick={() => onDelete(entry.id)}
                      aria-label={t("actions.delete")}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
                <div className="grid gap-2">
                  {entry.values.map((value, valueIndex) => {
                    const copyId = `${entry.id}-${valueIndex}`;

                    return (
                      <div
                        className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_48%,transparent)] py-2 pl-3 pr-2"
                        key={copyId}
                      >
                        <code
                          className={`min-w-0 flex-1 font-mono text-xs leading-5 [overflow-wrap:anywhere] transition-[filter,opacity] ${
                            concealed && !isRevealed
                              ? "select-none blur-[6px] opacity-60"
                              : ""
                          }`}
                        >
                          {value}
                        </code>
                        <button
                          className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-lg text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--accent)]"
                          type="button"
                          onClick={() => void copy(value, copyId)}
                          aria-label={t("actions.copy")}
                        >
                          {copied === copyId ? (
                            <Check size={15} />
                          ) : (
                            <Clipboard size={15} />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </section>
  );
}
