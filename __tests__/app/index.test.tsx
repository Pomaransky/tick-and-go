import { act, render, screen } from "@testing-library/react-native";

import Index from "@/app/index";
import i18n from "@/i18n";

describe("Home screen", () => {
  afterEach(async () => {
    await act(() => i18n.changeLanguage("en"));
  });

  it("shows the app title in English", async () => {
    await act(() => i18n.changeLanguage("en"));
    await render(<Index />);

    expect(screen.getByText("Tick & Go: Fast Shopping")).toBeOnTheScreen();
  });

  it("shows the app title in Polish", async () => {
    await act(() => i18n.changeLanguage("pl"));
    await render(<Index />);

    expect(screen.getByText("Tick & Go: Szybkie zakupy")).toBeOnTheScreen();
  });
});
