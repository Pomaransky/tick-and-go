import { ShoppingCart } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { Icon } from "@/components/icon";

export default function Index() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-white dark:bg-neutral-900">
      <Icon
        as={ShoppingCart}
        className="size-12 text-green-600 dark:text-amber-600"
      />
      <Text className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
        {t("common.appTitle")}
      </Text>
    </View>
  );
}
