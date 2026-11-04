import { ShoppingCart } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { Icon } from "@/components/icon";

export default function Index() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background dark:bg-background-dark">
      <Icon
        as={ShoppingCart}
        className="size-12 text-primary"
      />
      <Text className="text-xl font-bold text-foreground dark:text-foreground-dark">
        {t("common.appTitle")}
      </Text>
    </View>
  );
}
