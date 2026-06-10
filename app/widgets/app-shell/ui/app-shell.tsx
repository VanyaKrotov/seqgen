import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Binary,
  Braces,
  FileCode2,
  Fingerprint,
  KeyRound,
  Link as LinkIcon,
  ScanLine,
  ShieldCheck,
  Sparkles,
  WholeWord,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import {
  generators,
  getGenerator,
} from "~/entities/generator/config/generators";
import {
  getUtility,
  utilities,
} from "~/entities/utility/config/utilities";
import { LanguageSelect } from "~/features/change-language/ui/language-select";

const icons = {
  Binary,
  Braces,
  Fingerprint,
  KeyRound,
  ScanLine,
  ShieldCheck,
  WholeWord,
  FileCode2,
  Link: LinkIcon,
};

function getActiveGeneratorType(pathname: string) {
  if (pathname === "/") return "password";
  if (pathname.startsWith("/generate/")) return pathname.split("/")[2];
  return null;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const location = useLocation();
  const activeType = getActiveGeneratorType(location.pathname);
  const activeUtilityType = location.pathname.startsWith("/utility/")
    ? location.pathname.split("/")[2]
    : null;
  const activeUtility = getUtility(activeUtilityType ?? undefined);
  const active = activeUtility ?? getGenerator(activeType ?? undefined);
  const otherGenerators = generators.filter(
    (generator) => generator.type !== activeType,
  );
  const otherUtilities = utilities.filter(
    (utility) => utility.type !== activeUtilityType,
  );
  const showToolNavigation = Boolean(activeType || activeUtility);

  return (
    <div
      className="relative isolate min-h-screen overflow-x-clip bg-[linear-gradient(rgba(127,127,127,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(127,127,127,.045)_1px,transparent_1px)] bg-[size:40px_40px] [--accent:#9b5cff]"
      style={{ "--accent": active.color } as React.CSSProperties}
    >
      <motion.div
        className="pointer-events-none fixed -right-[16vw] -top-[18vw] -z-10 size-[46vw] rounded-full opacity-[.13] blur-[100px]"
        animate={{ backgroundColor: active.color }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="pointer-events-none fixed -bottom-[26vw] left-[10vw] -z-10 size-[34vw] rounded-full border-[80px] opacity-[.08] blur-[100px]"
        animate={{ borderColor: active.color }}
        transition={{ duration: 0.8 }}
      />

      <header className="fixed inset-x-0 top-0 z-40 px-5 pt-4 max-[640px]:px-3 max-[640px]:pt-3">
        <div className="relative mx-auto w-full max-w-[1380px] overflow-hidden rounded-[26px] border border-[color-mix(in_srgb,var(--surface-strong)_65%,transparent)] bg-[color-mix(in_srgb,var(--surface-strong)_54%,transparent)] shadow-[0_1px_0_rgba(255,255,255,.35)_inset,0_-1px_0_rgba(0,0,0,.06)_inset,0_16px_45px_rgba(0,0,0,.12),0_3px_12px_rgba(0,0,0,.06)] backdrop-blur-[30px] backdrop-saturate-[185%] dark:border-[rgba(255,255,255,.13)] dark:bg-[rgba(20,23,34,.58)] dark:shadow-[0_1px_0_rgba(255,255,255,.12)_inset,0_-1px_0_rgba(0,0,0,.2)_inset,0_20px_55px_rgba(0,0,0,.35),0_4px_16px_rgba(0,0,0,.18)]">
          <div className="pointer-events-none absolute inset-px rounded-[25px] bg-[linear-gradient(115deg,rgba(255,255,255,.32),transparent_28%,transparent_72%,rgba(255,255,255,.11))] opacity-70 dark:opacity-30" />
          <motion.div
            className="pointer-events-none absolute -bottom-16 right-[8%] h-24 w-56 rounded-full bg-[var(--accent)] opacity-[.12] blur-[32px]"
            animate={{ backgroundColor: active.color }}
            transition={{ duration: 0.8 }}
          />
          <div className="pointer-events-none absolute left-8 right-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.8),transparent)] opacity-80 dark:opacity-30" />
          <div className="relative z-10 flex min-h-[66px] items-center gap-6 px-5 max-[640px]:min-h-[60px] max-[640px]:gap-3 max-[640px]:px-3">
            <Link
              to="/"
              className="group flex items-center gap-[11px] text-xl font-extrabold tracking-[-.04em]"
            >
              <span className="relative grid size-[38px] place-items-center overflow-hidden rounded-[13px] border border-white/25 bg-[linear-gradient(145deg,color-mix(in_srgb,var(--accent)_82%,white),var(--accent))] text-white shadow-[0_8px_22px_color-mix(in_srgb,var(--accent)_32%,transparent),0_1px_0_rgba(255,255,255,.45)_inset] transition-[background,box-shadow,transform] duration-700 group-hover:scale-[1.04]">
                <span className="absolute inset-x-1 top-0 h-1/2 rounded-full bg-white/20 blur-[5px]" />
                <Sparkles className="relative" size={18} />
              </span>
              <span>seqgen</span>
            </Link>
            <span className="h-5 w-px bg-[var(--border)] max-[720px]:hidden" />
            <p className="m-0 text-[13px] text-[var(--muted)] max-[720px]:hidden">
              {t("brandTagline")}
            </p>
            <div className="ml-auto">
              <LanguageSelect />
            </div>
          </div>
        </div>
      </header>
      <div
        className="h-[98px] max-[640px]:h-[84px]"
        aria-hidden="true"
      />

      <main className="mx-auto flex w-full max-w-[1440px] flex-col px-8 pb-0 pt-[clamp(40px,7vh,80px)] max-[800px]:px-4 max-[800px]:pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>

        {showToolNavigation ? (
          <section className="pb-[clamp(64px,9vw,112px)] pt-[clamp(64px,8vw,104px)]">
            <div className="mb-6 flex items-end justify-between gap-6 max-[620px]:block">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[.13em] text-[var(--accent)]">
                  seqgen
                </span>
                <h2 className="mb-0 mt-2 text-[clamp(25px,3vw,38px)] tracking-[-.04em]">
                  {t("navigation.title")}
                </h2>
              </div>
              <p className="m-0 max-w-[520px] text-sm leading-6 text-[var(--muted)] max-[620px]:mt-3">
                {t("navigation.description")}
              </p>
            </div>
            <nav className="grid grid-cols-3 gap-4 max-[980px]:grid-cols-2 max-[620px]:grid-cols-1">
              {otherGenerators.map((item) => {
                const Icon = icons[item.icon as keyof typeof icons];

                return (
                  <motion.div
                    key={item.type}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={item.path}
                      className="group flex h-full min-h-[168px] flex-col rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_14px_45px_rgba(0,0,0,.06)] backdrop-blur-[18px] transition-[border-color,box-shadow] hover:border-[var(--item-color)] hover:shadow-[0_18px_55px_color-mix(in_srgb,var(--item-color)_12%,transparent)]"
                      style={
                        { "--item-color": item.color } as React.CSSProperties
                      }
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid size-10 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--item-color)_13%,transparent)] text-[var(--item-color)]">
                          <Icon size={20} />
                        </span>
                        <ArrowUpRight
                          className="text-[var(--muted)] transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--item-color)]"
                          size={18}
                        />
                      </div>
                      <h3 className="mb-1.5 mt-5 text-base tracking-[-.02em]">
                        {t(`generators.${item.translationKey}.name`)}
                      </h3>
                      <p className="m-0 text-[13px] leading-[1.55] text-[var(--muted)]">
                        {t(`generators.${item.translationKey}.description`)}
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <div className="mb-6 mt-[clamp(48px,6vw,72px)] flex items-end justify-between gap-6 max-[620px]:block">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[.13em] text-[var(--accent)]">
                  seqgen
                </span>
                <h2 className="mb-0 mt-2 text-[clamp(25px,3vw,38px)] tracking-[-.04em]">
                  {t("navigation.utilitiesTitle")}
                </h2>
              </div>
              <p className="m-0 max-w-[520px] text-sm leading-6 text-[var(--muted)] max-[620px]:mt-3">
                {t("navigation.utilitiesDescription")}
              </p>
            </div>
            <nav className="grid grid-cols-2 gap-4 max-[620px]:grid-cols-1">
              {otherUtilities.map((item) => {
                const Icon = icons[item.icon];

                return (
                  <motion.div
                    key={item.type}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={item.path}
                      className="group flex h-full min-h-[156px] flex-col rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_14px_45px_rgba(0,0,0,.06)] backdrop-blur-[18px] transition-[border-color,box-shadow] hover:border-[var(--item-color)] hover:shadow-[0_18px_55px_color-mix(in_srgb,var(--item-color)_12%,transparent)]"
                      style={
                        { "--item-color": item.color } as React.CSSProperties
                      }
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid size-10 place-items-center rounded-xl bg-[color-mix(in_srgb,var(--item-color)_13%,transparent)] text-[var(--item-color)]">
                          <Icon size={20} />
                        </span>
                        <ArrowUpRight
                          className="text-[var(--muted)] transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--item-color)]"
                          size={18}
                        />
                      </div>
                      <h3 className="mb-1.5 mt-5 text-base tracking-[-.02em]">
                        {t(`utilities.${item.translationKey}.name`)}
                      </h3>
                      <p className="m-0 text-[13px] leading-[1.55] text-[var(--muted)]">
                        {t(`utilities.${item.translationKey}.description`)}
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </section>
        ) : (
          <div className="h-[clamp(64px,8vw,104px)]" />
        )}
      </main>

      <footer className="relative overflow-hidden border-t border-[color-mix(in_srgb,var(--surface-strong)_55%,transparent)] bg-[color-mix(in_srgb,var(--surface-strong)_42%,transparent)] shadow-[0_1px_0_rgba(255,255,255,.28)_inset,0_-24px_70px_rgba(0,0,0,.04)] backdrop-blur-[30px] backdrop-saturate-[180%] dark:border-white/10 dark:bg-[rgba(17,20,31,.48)] dark:shadow-[0_1px_0_rgba(255,255,255,.08)_inset,0_-24px_70px_rgba(0,0,0,.18)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.2),transparent_24%,transparent_72%,rgba(255,255,255,.08))] opacity-70 dark:opacity-20" />
        <motion.div
          className="pointer-events-none absolute -bottom-28 left-[7%] h-48 w-[420px] rounded-full bg-[var(--accent)] opacity-[.1] blur-[70px]"
          animate={{ backgroundColor: active.color }}
          transition={{ duration: 0.8 }}
        />
        <div className="pointer-events-none absolute left-[8%] right-[8%] top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.7),transparent)] opacity-70 dark:opacity-25" />
        <div className="relative mx-auto w-full max-w-[1440px] px-8 py-10 max-[800px]:px-4">
          <div className="grid grid-cols-[minmax(260px,1.4fr)_1fr_1fr] gap-12 pb-10 max-[800px]:grid-cols-2 max-[560px]:grid-cols-1">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2.5 text-lg font-extrabold tracking-[-.04em]"
              >
                <Sparkles size={18} className="text-[var(--accent)]" />
                seqgen
              </Link>
              <p className="mb-0 mt-3 max-w-[390px] text-[13px] leading-6 text-[var(--muted)]">
                {t("footer.description")}
              </p>
            </div>
            <div>
              <h2 className="mb-4 mt-0 text-xs font-bold uppercase tracking-[.12em]">
                {t("footer.product")}
              </h2>
              <div className="flex flex-col items-start gap-3 text-[13px] text-[var(--muted)]">
                <Link className="hover:text-[var(--text)]" to="/api-docs">
                  {t("nav.apiDocs")}
                </Link>
                <Link className="hover:text-[var(--text)]" to="/">
                  {t("generators.password.name")}
                </Link>
                {utilities.map((item) => (
                  <Link
                    className="hover:text-[var(--text)]"
                    key={item.type}
                    to={item.path}
                  >
                    {t(`utilities.${item.translationKey}.name`)}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-4 mt-0 text-xs font-bold uppercase tracking-[.12em]">
                {t("nav.generators")}
              </h2>
              <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-[13px] text-[var(--muted)]">
                {generators.slice(1).map((item) => (
                  <Link
                    className="hover:text-[var(--text)]"
                    key={item.type}
                    to={item.path}
                  >
                    {t(`generators.${item.translationKey}.name`)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-6 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)] max-[620px]:flex-col max-[620px]:items-start">
            <span>
              © {new Date().getFullYear()} Seqgen. {t("footer.rights")}
            </span>
            <div className="flex gap-5">
              <Link className="hover:text-[var(--text)]" to="/terms">
                {t("nav.terms")}
              </Link>
              <Link className="hover:text-[var(--text)]" to="/privacy">
                {t("nav.privacy")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
