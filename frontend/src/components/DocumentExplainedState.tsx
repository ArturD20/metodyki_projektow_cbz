import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { DocumentExplanation } from "@/api/explain";
import { DocumentAttachmentPreview } from "@/components/DocumentAttachmentPreview";
import { DocumentCard } from "@/components/DocumentCard";
import { Button } from "@/components/ui/button";

export function DocumentExplainedState({
  documents,
  explanations,
}: {
  documents: File[];
  explanations: DocumentExplanation[];
}) {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="document-explanations-title"
      className="@container isolate grid min-h-0 min-w-0 flex-1 grid-cols-1 grid-rows-[minmax(0,1fr)] overflow-hidden [--chat-inset:0px] [--reading-background:var(--background)] lg:reading-surface lg:rounded-[24px] lg:[--chat-inset:32px] lg:[--reading-background:var(--card)]"
    >
      <h2 id="document-explanations-title" className="sr-only">
        {t("explain.explanationsTitle")}
      </h2>
      <div className="styled-scrollbar col-start-1 row-start-1 min-h-0 min-w-0 scroll-pb-[144px] overflow-y-auto px-[var(--chat-inset)] pt-4 pb-[calc(144px+var(--chat-inset))] lg:pt-[var(--chat-inset)]">
        <div className="mx-auto w-full max-w-[680px]">
          <p className="mb-[20px] hidden text-[12px] text-muted-foreground lg:block">
            {t("explain.explanations")}
          </p>
          <div className="space-y-8 lg:space-y-[52px]">
            {documents.map((file, index) => {
              const explanation = explanations[index];
              if (!explanation) return null;

              return (
                <article
                  key={index}
                  className="grid grid-cols-[64px_minmax(0,1fr)] items-start gap-x-3 gap-y-4 sm:grid-cols-[100px_minmax(0,1fr)] lg:grid-cols-1 lg:gap-x-[24px] lg:gap-y-[20px] lg:@[360px]:grid-cols-[100px_minmax(0,1fr)] lg:@[500px]:grid-cols-[122px_minmax(0,1fr)]"
                >
                  <div className="lg:hidden">
                    <DocumentCard
                      file={file}
                      number={index + 1}
                      variant="sheet"
                      compact
                    />
                  </div>
                  <div className="hidden w-[100px] lg:block lg:@[500px]:w-[122px]">
                    <DocumentAttachmentPreview file={file} number={index + 1} />
                  </div>
                  <div className="contents lg:block lg:min-w-0">
                    <h3 className="min-w-0 text-[18px] leading-snug wrap-anywhere @[500px]:text-[20px]">
                      {file.name}
                    </h3>
                    <p className="col-span-2 text-[16px] leading-[26px] whitespace-pre-wrap @[500px]:text-[18px] lg:mt-[12px]">
                      {explanation.explanation}
                    </p>
                  </div>
                  <ExplanationDetails explanation={explanation} />
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <div className="chat-composer-overlay pointer-events-none relative z-10 col-start-1 row-start-1 w-full self-end px-[var(--chat-inset)] pt-[64px] pb-3 lg:pb-[var(--chat-inset)]">
        <div className="chat-composer pointer-events-auto relative mx-auto flex w-full max-w-[680px] min-w-0 items-center gap-[8px] rounded-full py-[4px] pr-[4px] pl-[16px] focus-within:outline-2 focus-within:outline-offset-3 focus-within:outline-ring">
          <input
            type="text"
            aria-label={t("explain.ask")}
            placeholder={t("explain.askPlaceholder")}
            className="min-h-9 min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-muted-foreground"
          />
          <Button
            type="button"
            aria-label={t("explain.send")}
            size="icon"
            className="size-[36px] rounded-full mr-1"
          >
            <ArrowUp aria-hidden="true" className="size-[24px]" />
          </Button>
        </div>
      </div>
    </section>
  );
}

function ExplanationDetails({
  explanation,
}: {
  explanation: DocumentExplanation;
}) {
  const { t } = useTranslation();
  const sections = [
    [t("explain.actions"), explanation.action_checklist],
    [t("explain.deadlines"), explanation.deadlines],
    [t("explain.passages"), explanation.source_passages],
  ] as const;
  const visibleSections = sections.filter(([, items]) => items.length > 0);
  if (visibleSections.length === 0) return null;

  return (
    <div className="col-span-2 space-y-4 text-[16px] leading-[26px] lg:col-span-1 lg:@[360px]:col-span-2 lg:@[500px]:text-[18px]">
      {visibleSections.map(([title, items]) => (
        <div key={title}>
          <h4 className="text-[15px] leading-6 text-muted-foreground">
            {title}
          </h4>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            {items.map((item, index) => (
              <li key={index} className="wrap-anywhere">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
