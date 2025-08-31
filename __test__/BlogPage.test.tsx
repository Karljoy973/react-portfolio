import React from "react";
import { describe, expect, test, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BlogPage from "@/blog";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

beforeEach(() => {
  cleanup();
});

afterEach(() => {
  cleanup();
});

describe("BlogPage Component Tests", () => {
  test("renders with correct section structure and test-id", () => {
    renderWithRouter(<BlogPage />);
    
    const section = screen.getByTestId("blog-page");
    expect(section).toBeDefined();
    expect(section.tagName.toLowerCase()).toBe("section");
    
    // Test CSS classes
    expect(section.classList.contains("w-[100%]")).toBe(true);
    expect(section.classList.contains("flex")).toBe(true);
    
    // Test actual content
    expect(screen.getByText("Blog Page")).toBeDefined();
  });

  test("has proper semantic structure", () => {
    renderWithRouter(<BlogPage />);
    
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toBe("Blog Page");
  });
});
