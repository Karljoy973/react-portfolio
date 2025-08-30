import { describe, expect, test, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CVPage from "@/cv";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

beforeEach(() => {
  cleanup();
});

afterEach(() => {
  cleanup();
});

describe("CVPage Component Tests", () => {
  test("renders with correct section structure and test-id", () => {
    renderWithRouter(<CVPage />);
    
    const section = screen.getByTestId("cv-page");
    expect(section).toBeDefined();
    expect(section.tagName.toLowerCase()).toBe("section");
    
    // Test CSS classes
    expect(section.classList.contains("w-[100%]")).toBe(true);
    expect(section.classList.contains("flex")).toBe(true);
  });
});
