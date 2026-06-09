import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import {
  languageNames,
  supportedLanguages,
  type SupportedLanguage,
} from "~/shared/config/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/ui/select";

export function LanguageSelect() {
  const { i18n } = useTranslation();
  const [, setSearch] = useSearchParams();
  const current = (i18n.resolvedLanguage?.split("-")[0] ??
    "en") as SupportedLanguage;

  return (
    <div className="flex items-center gap-2 rounded-[13px] border border-[color-mix(in_srgb,var(--surface-strong)_70%,transparent)] bg-[color-mix(in_srgb,var(--surface-strong)_42%,transparent)] px-[11px] py-2 text-[var(--muted)] shadow-[0_1px_0_rgba(255,255,255,.28)_inset,0_5px_14px_rgba(0,0,0,.06)] backdrop-blur-xl transition-[border-color,background-color,box-shadow] hover:border-[color-mix(in_srgb,var(--accent)_34%,var(--border))] hover:bg-[color-mix(in_srgb,var(--surface-strong)_62%,transparent)] dark:border-white/10 dark:bg-white/[.045] dark:shadow-[0_1px_0_rgba(255,255,255,.08)_inset,0_6px_18px_rgba(0,0,0,.16)] max-[540px]:px-2 max-[540px]:py-[7px] max-[540px]:[&_svg]:hidden">
      <Languages className="size-4" />
      <Select
        value={current}
        onValueChange={(value) => {
          setSearch(
            (prev) => {
              prev.set("lng", value);

              return new URLSearchParams(prev);
            },
            { replace: true, preventScrollReset: true },
          );
        }}
      >
        <SelectTrigger
          aria-label="Language"
          className="h-auto w-auto min-w-[98px] rounded-none border-0 bg-transparent p-0 text-[13px] shadow-none focus:border-transparent focus:shadow-none"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {supportedLanguages.map((language) => (
            <SelectItem value={language} key={language}>
              {languageNames[language]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
