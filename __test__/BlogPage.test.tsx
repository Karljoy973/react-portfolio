import { describe, expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import { afterEach, beforeEach } from "node:test";
import BlogPage from "@/blog";

beforeEach(() => {
  cleanup();
});
afterEach(() => {
  cleanup();
});

describe("all of the tests related to the BlogPage ", () => {
  test("verifie que le premier element apres le main est une section et qu elle contient le test id blog-page ", () => {
    render(<BlogPage />);
    screen.getAllByRole("generic");
    const section = document.getElementsByTagName("section");
    expect(section).not.toBeUndefined();
    expect(section[0].getAttribute("data-testid")).toBe("blog-page");
  });
});
