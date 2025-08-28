import { describe, expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach } from "node:test";
import Tooltip from "@/components/Tooltip";

beforeEach(() => {
  cleanup();
});
afterEach(() => {
  cleanup();
});

describe("verifie que le layout est valide pour toutes les plateformes", () => {
  test("Quand je survole une icone, je vois le label associe", () => {
    const tooltipRenderer = render(<Tooltip label="Hello" />);
    expect(
      tooltipRenderer.container.children[0].classList.contains("opacity;;"),
    );
  });
});
