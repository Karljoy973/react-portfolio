import { describe, expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { afterEach, beforeEach } from "node:test";
import AboutPage from "@/about";

beforeEach(() => {
  cleanup();
});
afterEach(() => {
  cleanup();
});

describe("all of the tests related to the AboutPage ", () => {
  test("verifie que le premier element apres le main est une section et qu elle contient le test id about-page ", () => {
    render(<AboutPage />);
    screen.getAllByRole("generic");
    const section = document.getElementsByTagName("section");
    expect(section).not.toBeUndefined();
    expect(section[0].getAttribute("data-testid")).toBe("about-page");
  });
});