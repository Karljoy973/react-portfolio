import { describe, expect, test, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AboutPage from "@/about";

// Helper for components that need routing
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

beforeEach(() => {
  cleanup();
});

afterEach(() => {
  cleanup();
});

describe("AboutPage Component Tests", () => {
  test("renders with correct section structure and test-id", () => {
    renderWithRouter(<AboutPage />);
    
    // Better: Use Testing Library query instead of DOM queries
    const section = screen.getByTestId("about-page");
    expect(section).toBeDefined();
    expect(section.tagName.toLowerCase()).toBe("section");
    
    // Test CSS classes
    expect(section.classList.contains("w-[100%]")).toBe(true);
    expect(section.classList.contains("flex")).toBe(true);
    
    // Test actual content
    expect(screen.getByText("About Page")).toBeDefined();
  });

  test("has proper semantic structure", () => {
    renderWithRouter(<AboutPage />);
    
    // Test heading presence and level
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toBe("About Page");
  });
});
