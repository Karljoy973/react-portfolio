import { describe, expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { HomePage } from "@/home";
import { afterEach, beforeEach } from "node:test";

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

describe("all of the tests related to the HomePage ", () => {
  test("verifie que le premier element apres le main est une section et qu elle contient le test id home-page ", () => {
    render(<HomePage />);
    screen.getAllByRole("generic");
    const section = document.getElementsByTagName("section");
    expect(section).not.toBeUndefined();
    expect(section[0].getAttribute("data-testid")).toBe("home-page");
  });
});
