import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import {
  getLegalDocument,
  type LegalDocumentType,
} from "../model/legal-documents";

export function LegalPage({ type }: { type: LegalDocumentType }) {
  const { t, i18n } = useTranslation();
  const document = getLegalDocument(i18n.resolvedLanguage ?? i18n.language, type);

  return (
    <article className="mx-auto w-full max-w-[920px]">
      <div className="flex items-center gap-[7px] text-[11px] font-bold uppercase tracking-[.11em] text-[var(--accent)] transition-colors duration-700">
        SEQGEN / LEGAL
      </div>
      <h1 className="mb-2 mt-[11px] text-[clamp(32px,4.5vw,58px)] leading-[1.02] tracking-[-.055em]">
        {t(`legal.${type}Title`)}
      </h1>
      <p className="text-[13px] text-[var(--muted)]">
        {t("legal.updated", {
          date: format(new Date(2026, 5, 10), "yyyy-MM-dd"),
        })}
      </p>
      <div className="mt-[34px] rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-[clamp(24px,5vw,56px)] shadow-[var(--shadow)]">
        <p className="m-0 text-[17px] leading-8 text-[var(--text)]">
          {document.intro}
        </p>
        <div className="mt-10 space-y-10">
          {document.sections.map((section) => (
            <section
              className="border-t border-[var(--border)] pt-8 first:border-t-0 first:pt-0"
              key={section.title}
            >
              <h2 className="m-0 text-xl font-semibold tracking-[-.02em] text-[var(--text)] sm:text-2xl">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    className="m-0 text-[15px] leading-7 text-[var(--muted)] sm:text-base sm:leading-8"
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets ? (
                <ul className="mt-5 list-disc space-y-3 pl-7 text-[15px] leading-7 text-[var(--muted)] marker:text-[var(--accent)] sm:text-base">
                  {section.bullets.map((bullet) => (
                    <li className="pl-2" key={bullet}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
