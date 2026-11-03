import { getLocales, type Locale } from "expo-localization";

import { getDeviceLanguage } from "@/i18n";

jest.mock("expo-localization", () => ({
  getLocales: jest.fn(() => [{ languageCode: "en" }]),
}));

const mockedGetLocales = jest.mocked(getLocales);

function mockDeviceLanguages(...languageCodes: (string | null)[]) {
  mockedGetLocales.mockReturnValue(
    languageCodes.map((languageCode) => ({ languageCode }) as Locale) as [
      Locale,
      ...Locale[],
    ],
  );
}

describe("getDeviceLanguage", () => {
  it("uses Polish when the device is in Polish", () => {
    mockDeviceLanguages("pl");
    expect(getDeviceLanguage()).toBe("pl");
  });

  it("uses English when the device is in English", () => {
    mockDeviceLanguages("en");
    expect(getDeviceLanguage()).toBe("en");
  });

  it("picks the first supported language from the device list", () => {
    mockDeviceLanguages("de", "pl", "en");
    expect(getDeviceLanguage()).toBe("pl");
  });

  it("falls back to English for unsupported languages", () => {
    mockDeviceLanguages("de", null);
    expect(getDeviceLanguage()).toBe("en");
  });
});
