import { describe, expect, test, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Tooltip from "@/components/Tooltip";

beforeEach(() => {
  cleanup();
});

afterEach(() => {
  cleanup();
});

describe("Layout Component Tests", () => {
  test("Tooltip renders with correct label and styling", () => {
    const testLabel = "Hello World";
    const { container } = render(<Tooltip label={testLabel} />);

    // Strategy 1: Use container to scope the search
    const tooltip = container.querySelector(".tooltip");
    expect(tooltip).toBeDefined();
    expect(tooltip?.textContent).toBe(testLabel);

    // Test valid CSS classes
    expect(tooltip?.classList.contains("tooltip")).toBe(true);
    expect(tooltip?.classList.contains("opacity-0")).toBe(true);
    expect(tooltip?.classList.contains("group-hover:opacity-100")).toBe(true);
  });

  test("Tooltip has correct styling classes", () => {
    render(<Tooltip label="Test Unique Label" />);

    // Strategy 2: Use unique text content
    const tooltip = screen.getByText("Test Unique Label");

    // Test positioning classes
    expect(tooltip.classList.contains("absolute")).toBe(true);
    expect(tooltip.classList.contains("bottom-[-2.2rem]")).toBe(true);
    expect(tooltip.classList.contains("left-1/2")).toBe(true);

    // Test styling classes
    expect(tooltip.classList.contains("bg-gray-900")).toBe(true);
    expect(tooltip.classList.contains("text-white")).toBe(true);
    expect(tooltip.classList.contains("rounded-md")).toBe(true);
  });

  test("Tooltip handles empty label gracefully", () => {
    const { container } = render(<Tooltip label="" />);

    // Strategy 3: Use container.querySelector for empty content
    const tooltip = container.querySelector(".tooltip");
    expect(tooltip).toBeDefined();
    expect(tooltip?.textContent).toBe("");

    // Verify it's a span element
    expect(tooltip?.tagName.toLowerCase()).toBe("span");
  });

  test("Tooltip handles filled label gracefully", () => {
    const uniqueLabel = "unique-test-label-12345";
    render(<Tooltip label={uniqueLabel} />);

    // Strategy 4: Use very unique text to avoid conflicts
    const tooltip = screen.getByText(uniqueLabel);
    expect(tooltip).toBeDefined();
    expect(tooltip.textContent).toBe(uniqueLabel);
  });
});
