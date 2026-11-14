import { useTranslation } from "react-i18next";

import { DOCUMENT_EXTENSIONS, MAX_DOCUMENT_SIZE_MB } from "@/lib/documents";

export function DocumentUploadInfo({
  errors,
  showRequirements = true,
}: {
  errors: string[];
  showRequirements?: boolean;
}) {
  const { t } = useTranslation();
  const formats = DOCUMENT_EXTENSIONS.join(", ").toUpperCase();

  if (!showRequirements && errors.length === 0) return null;

  return (
    <div className="min-w-0 text-[14px] leading-relaxed text-muted-foreground">
      {showRequirements && (
        <p aria-hidden="true">
          {t("upload.formats", { formats })}
          <br />
          {t("upload.maxSize", { maxSize: MAX_DOCUMENT_SIZE_MB })}
        </p>
      )}
      {errors.length > 0 && (
        <ul
          role="alert"
          aria-label={t("upload.someRejected")}
          className="upload-errors mt-2 max-h-[120px] overflow-y-auto rounded-xl px-3 py-2 text-left text-destructive"
        >
          {errors.map((error, index) => (
            <li key={index} className="wrap-anywhere">
              {error}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
