import { Tabs } from "expo-router";
import { Groceries, ListChecks, ShoppingBasket } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "react-native";

import { SettingsButton } from "@/components/settings-button";
import { colors } from "@/theme/colors";

export default function TabsLayout() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => <SettingsButton />,
        tabBarActiveTintColor: colors.primary.DEFAULT,
        tabBarInactiveTintColor:
          colorScheme === "dark" ? colors.muted.dark : colors.muted.DEFAULT,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("common.tabs.shopping"),
          tabBarIcon: ({ color, size }) => (
            <ShoppingBasket color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="lists"
        options={{
          title: t("common.tabs.lists"),
          tabBarIcon: ({ color, size }) => (
            <ListChecks color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: t("common.tabs.products"),
          tabBarIcon: ({ color, size }) => (
            <Groceries color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
