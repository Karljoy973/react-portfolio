import { describe, expect, test, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ContactPage from "@/contact";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

beforeEach(() => {
  cleanup();
});

afterEach(() => {
  cleanup();
});

describe("ContactPage Component Tests", () => {
  test("renders with correct section structure and test-id", () => {
    renderWithRouter(<ContactPage />);
    
    const section = screen.getByTestId("contact-page");
    expect(section).toBeDefined();
    expect(section.tagName.toLowerCase()).toBe("section");
    
    // Test CSS classes
    expect(section.classList.contains("w-[100%]")).toBe(true);
    expect(section.classList.contains("flex")).toBe(true);
    
    // Test actual content
    expect(screen.getByText("Contact Page")).toBeDefined();
    expect(screen.getByText(/Mon numero de telephone/)).toBeDefined();
  });

  test("displays phone number information with icon", () => {
    renderWithRouter(<ContactPage />);
    
    const phoneText = screen.getByText(/Mon numero de telephone/);
    expect(phoneText).toBeDefined();
    expect(phoneText.textContent).toContain("+33");
  });
});
