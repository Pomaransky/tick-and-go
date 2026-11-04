import { Link } from "expo-router";
import { Settings } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";

import { Icon } from "@/components/icon";

export function SettingsButton() {
  const { t } = useTranslation();

  return (
    <Link href="/settings" asChild>
      <Pressable
        accessibilityLabel={t("common.settings")}
        accessibilityRole="button"
        className="px-4 py-2"
        hitSlop={8}
      >
        <Icon
          as={Settings}
          className="size-6 text-foreground dark:text-foreground-dark"
        />
      </Pressable>
    </Link>
  );
}
