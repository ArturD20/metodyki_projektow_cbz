import { PanelLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

import { LanguageSwitch } from "@/components/LanguageSwitch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

type HeaderProps = {
  documentsOpen?: boolean;
  onOpenDocuments?: () => void;
};

export function Header({
  documentsOpen = false,
  onOpenDocuments,
}: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="shrink-0 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-4 sm:px-5 lg:pt-0 lg:pr-8 lg:pb-6 lg:pl-0">
      <div className="flex min-h-16 items-center justify-between gap-2 py-2.5 lg:min-h-[80px]">
        <div className="flex min-w-0 items-center gap-2">
          {onOpenDocuments && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label={t("header.showDocuments")}
              aria-expanded={documentsOpen}
              aria-controls="document-drawer"
              onClick={onOpenDocuments}
              className="size-[44px] rounded-2xl lg:hidden"
            >
              <PanelLeft aria-hidden="true" className="size-5" />
            </Button>
          )}
          <h1 className="flex min-w-0 items-center gap-2 font-logo text-[28px] leading-none font-normal tracking-tight text-foreground select-none sm:text-[34px] lg:sr-only">
            <img
              src="/favicon.svg"
              alt=""
              draggable={false}
              className="size-10 shrink-0"
            />
            <span className="truncate">{t("appName")}</span>
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
