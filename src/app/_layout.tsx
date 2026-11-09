import "@/i18n";
import "../../global.css";

import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "react-native";

const formSheetOptions = {
  presentation: "formSheet",
  sheetAllowedDetents: "fitToContents",
  sheetGrabberVisible: true,
} as const;

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
        <Stack.Screen name="products/[id]" options={formSheetOptions} />
        <Stack.Screen name="products/new" options={formSheetOptions} />
      </Stack>
    </ThemeProvider>
  );
}
