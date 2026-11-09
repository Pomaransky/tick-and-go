import "../../global.css";
import "@/i18n";

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="settings"
          options={{ title: t("common.settings") }}
        />
      </Stack>
    </ThemeProvider>
  );
}
