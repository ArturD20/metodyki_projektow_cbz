import { ChevronsRight, CircleDashed, FileText } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sections = [
  {
    id: "documents",
    labelKey: "nav.documents",
    marker: <FileText className="size-5 lg:size-6" />,
  },
  {
    id: "section-2",
    labelKey: "nav.section2",
    marker: <CircleDashed className="size-5 lg:size-6" />,
  },
  {
    id: "section-3",
    labelKey: "nav.section3",
    marker: <CircleDashed className="size-5 lg:size-6" />,
  },
] as const;

export type MainSection = (typeof sections)[number]["id"];

const mainNavWidth = {
  collapsed: "4.5rem",
  expanded: "13rem",
} as const;

const navEase = [0.22, 1, 0.36, 1] as const;

type MainNavProps = {
  activeSection: MainSection;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
  onSectionChange: (section: MainSection) => void;
};

export function MainNav({
  activeSection,
  expanded,
  onExpandedChange,
  onSectionChange,
}: MainNavProps) {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const navTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.34, ease: navEase };
  const labelTransition = reducedMotion
    ? { duration: 0 }
    : expanded
      ? { duration: 0.2, delay: 0.12, ease: "easeOut" as const }
      : { duration: 0.12, ease: "easeIn" as const };

  return (
    <motion.nav
      initial={false}
      animate={{
        "--nav-width": expanded
          ? mainNavWidth.expanded
          : mainNavWidth.collapsed,
      }}
      transition={navTransition}
      id="main-nav"
      aria-label={t("nav.label")}
      className="glass-surface order-last mx-3 mb-[max(0.75rem,env(safe-area-inset-bottom))] flex shrink-0 flex-row gap-1 rounded-[28px] p-1.5 sm:mx-5 lg:order-none lg:mx-0 lg:mb-0 lg:w-[calc(var(--nav-width)+4px)] lg:min-w-0 lg:flex-col lg:gap-2 lg:p-2"
    >
      <div
        aria-hidden="true"
        className="mb-2 hidden h-14 shrink-0 items-center overflow-hidden select-none lg:flex"
      >
        <span className="grid size-14 shrink-0 place-items-center">
          <img
            src="/favicon.svg"
            alt=""
            draggable={false}
            className="size-11"
          />
        </span>
        <motion.span
          initial={false}
          animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : -8 }}
          transition={labelTransition}
          className="min-w-0 flex-1 truncate pr-4 font-logo text-[30px] leading-none text-foreground"
        >
          {t("appName")}
        </motion.span>
      </div>
      {sections.map((section) => (
        <Button
          key={section.id}
          type="button"
          variant={activeSection === section.id ? "default" : "ghost"}
          aria-current={activeSection === section.id ? "page" : undefined}
          aria-controls="main-content"
          onClick={() => onSectionChange(section.id)}
          className={cn(
            "h-14 min-w-0 flex-1 flex-col gap-1 rounded-[22px] px-1 py-2 text-[11px] lg:h-14 lg:w-full lg:min-w-0 lg:flex-none lg:flex-row lg:justify-start lg:gap-0 lg:overflow-hidden lg:px-0 lg:py-0",
            activeSection !== section.id && "text-muted-foreground",
          )}
        >
          <span
            aria-hidden="true"
            className="flex h-5 shrink-0 items-center text-base font-bold lg:grid lg:size-14 lg:place-items-center lg:text-lg"
          >
            {section.marker}
          </span>
          <span className="lg:hidden">{t(section.labelKey)}</span>
          <motion.span
            initial={false}
            animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : -8 }}
            transition={labelTransition}
            className="hidden min-w-0 flex-1 truncate pr-4 text-left text-base lg:block"
          >
            {t(section.labelKey)}
          </motion.span>
        </Button>
      ))}
      <div className="ml-px hidden size-14 shrink-0 place-items-center lg:mt-auto lg:grid">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-expanded={expanded}
          aria-controls="main-nav"
          aria-label={expanded ? t("nav.collapse") : t("nav.expand")}
          title={expanded ? t("nav.collapse") : t("nav.expand")}
          onClick={() => onExpandedChange(!expanded)}
          className="size-[44px] rounded-2xl"
        >
          <motion.span
            initial={false}
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={navTransition}
            className="grid place-items-center"
          >
            <ChevronsRight aria-hidden="true" className="size-5" />
          </motion.span>
        </Button>
      </div>
    </motion.nav>
  );
}
