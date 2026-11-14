import { motion, useReducedMotion } from "motion/react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { languages, setLanguage, type Language } from "@/translations";

const languageNames: Record<Language, { short: string; full: string }> = {
  pl: { short: "PL", full: "Polski" },
  en: { short: "EN", full: "English" },
  uk: { short: "UA", full: "Українська" },
};

function currentLanguage(language: string | undefined): Language {
  return languages.find((item) => item === language) ?? "pl";
}

export function LanguageSwitch() {
  const { i18n, t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const language = currentLanguage(i18n.resolvedLanguage);

  return (
    <div
      role="group"
      aria-label={t("language.label")}
      className="button-raised flex h-11 items-center gap-0.5 rounded-2xl border p-1 select-none"
    >
      {languages.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-label={languageNames[code].full}
          aria-pressed={language === code}
          title={languageNames[code].full}
          onClick={() => setLanguage(code)}
          className={cn(
            "relative h-full min-w-10 rounded-xl px-2 text-sm font-bold outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            language === code
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {language === code && (
            <motion.span
              layoutId="language-switch-active"
              aria-hidden="true"
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { type: "spring", bounce: 0.2, duration: 0.35 }
              }
              className="button-primary absolute inset-0 rounded-xl border"
            />
          )}
          <span className="relative">{languageNames[code].short}</span>
        </button>
      ))}
    </div>
  );
}
