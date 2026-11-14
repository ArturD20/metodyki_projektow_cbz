import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { getTheme, setTheme, subscribeTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { t } = useTranslation();
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => "light");
  const label = theme === "dark" ? t("theme.light") : t("theme.dark");

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={label}
      title={label}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="size-[44px] rounded-2xl"
    >
      {theme === "dark" ? (
        <Sun aria-hidden="true" className="size-5" />
      ) : (
        <Moon aria-hidden="true" className="size-5" />
      )}
    </Button>
  );
}
