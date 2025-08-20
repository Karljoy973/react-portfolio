import { describe, expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { afterEach, beforeEach } from "node:test";
import ContactPage from "@/contact";

/**!SECTION
 * // Lazy load de composants internes
const Header = React.lazy(() => import("./Header"));
const Content = React.lazy(() => import("./Content"));
 */
beforeEach(() => {
  cleanup();
});
afterEach(() => {
  cleanup();
});

describe("all of the tests related to the ContactPage ", () => {
  test("verifie que le premier element apres le main est une section et qu elle contient le test id contact-page ", () => {
    render(<ContactPage />);
    screen.getAllByRole("generic");
    const section = document.getElementsByTagName("section");
    expect(section).not.toBeUndefined();
    expect(section[0].getAttribute("data-testid")).toBe("contact-page");
  });
});