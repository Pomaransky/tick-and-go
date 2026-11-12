import { router } from "expo-router";
import { X } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Icon } from "@/components/icon";

interface FormSheetProps {
  title: string;
  submitLabel: string;
  onSubmit: () => void;
  children: React.ReactNode;
}

export function FormSheet({
  title,
  submitLabel,
  onSubmit,
  children,
}: FormSheetProps) {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="gap-5 bg-background p-6 dark:bg-background-dark"
      style={{ paddingBottom: insets.bottom + 24 }}
    >
      <View className="flex-row items-center justify-between gap-3">
        <Text className="flex-1 text-xl font-bold text-foreground dark:text-foreground-dark">
          {title}
        </Text>
        <Pressable
          accessibilityLabel={t("common.close")}
          accessibilityRole="button"
          className="-mr-2 p-2"
          hitSlop={8}
          onPress={() => router.back()}
        >
          <Icon
            as={X}
            className="size-6 text-foreground dark:text-foreground-dark"
          />
        </Pressable>
      </View>

      {children}

      <Pressable
        accessibilityRole="button"
        className="items-center rounded-lg bg-primary py-3 active:opacity-80"
        onPress={onSubmit}
      >
        <Text className="text-base font-semibold text-primary-foreground">
          {submitLabel}
        </Text>
      </Pressable>
    </View>
  );
}
