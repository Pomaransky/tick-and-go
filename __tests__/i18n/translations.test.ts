import {
  fallbackLanguage,
  resources,
  supportedLanguages,
} from "@/i18n/resources";

function collectKeys(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object") {
    return [prefix];
  }
  return Object.entries(value).flatMap(([key, child]) =>
    collectKeys(child, prefix ? `${prefix}.${key}` : key),
  );
}

function collectValues(value: unknown): unknown[] {
  if (value === null || typeof value !== "object") {
    return [value];
  }
  return Object.values(value).flatMap(collectValues);
}

const referenceKeys = collectKeys(
  resources[fallbackLanguage].translation,
).sort();

describe.each(supportedLanguages)("translations: %s", (language) => {
  const translation = resources[language].translation;

  it("has the same keys as the fallback language", () => {
    expect(collectKeys(translation).sort()).toEqual(referenceKeys);
  });

  it("has only non-empty string values", () => {
    for (const value of collectValues(translation)) {
      expect(typeof value).toBe("string");
      expect((value as string).trim()).not.toBe("");
    }
  });
});
