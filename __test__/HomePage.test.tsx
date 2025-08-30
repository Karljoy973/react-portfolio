import { describe, expect, test, beforeEach, afterEach, vi } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HomePage } from "@/home/index";

// Mock the Hero component to avoid Link issues
vi.mock("@/components/Hero", () => ({
  Hero: () => (
    <header data-testid="mocked-hero">
      <h2>Coucou cest Karl !</h2>
      <p>Jaime developper des projets personnels</p>
    </header>
  ),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

beforeEach(() => {
  cleanup();
});

afterEach(() => {
  cleanup();
});

describe("HomePage Component Tests", () => {
  test("renders with correct section structure and test-id", () => {
    const { container } = renderWithRouter(<HomePage />);
    
    // Test HomePage section structure
    const section = container.querySelector('[data-testid="home-page"]');
    expect(section).toBeDefined();
    expect(section?.tagName.toLowerCase()).toBe("section");
    
    // Test CSS classes
    expect(section?.classList.contains("w-[100%]")).toBe(true);
    expect(section?.classList.contains("flex")).toBe(true);
  });

  test("contains Hero component structure", () => {
    const { container } = renderWithRouter(<HomePage />);
    
    // Test that mocked Hero component is rendered
    const mockedHero = container.querySelector('[data-testid="mocked-hero"]');
    expect(mockedHero).toBeDefined();
    
    // Test Hero content
    const heading = container.querySelector("h2");
    expect(heading?.textContent).toBe("Coucou cest Karl !");
    
    const text = container.querySelector("p");
    expect(text?.textContent).toContain("Jaime developper");
  });
});
