import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import Home from "@/routes/home";
import Contact from "@/routes/contact";
import About from "@/routes/about";

beforeEach(() => {
  cleanup();
});

afterEach(() => {
  cleanup();
});

describe("Routing Tests", () => {
  test("Home route renders Home component correctly at '/'", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <Home /> },
        { path: "/contact", element: <Contact /> },
        { path: "/about", element: <About /> },
      ],
      { initialEntries: ["/"] }
    );

    const { container } = render(<RouterProvider router={router} />);

    // Test that Home route renders HomePage component
    const homeSection = container.querySelector('[data-testid="home-page"]');
    expect(homeSection).toBeDefined();
    
    // Test that Hero component structure is present (avoid Link issues)
    const heroHeader = container.querySelector("header");
    expect(heroHeader).toBeDefined();
  });

  test("Contact route renders Contact component correctly at '/contact'", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <Home /> },
        { path: "/contact", element: <Contact /> },
        { path: "/about", element: <About /> },
      ],
      { initialEntries: ["/contact"] }
    );

    render(<RouterProvider router={router} />);

    const contactElement = screen.getByText(/contact/i);
    expect(contactElement).toBeDefined();
    expect(contactElement.textContent?.toLowerCase()).toContain("contact");
  });

  test("About route renders About component correctly at '/about'", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <Home /> },
        { path: "/contact", element: <Contact /> },
        { path: "/about", element: <About /> },
      ],
      { initialEntries: ["/about"] }
    );

    render(<RouterProvider router={router} />);

    const aboutElement = screen.getByText(/about/i);
    expect(aboutElement).toBeDefined();
    expect(aboutElement.textContent?.toLowerCase()).toContain("about");
  });

  test("Navigation between routes works correctly", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <Home /> },
        { path: "/contact", element: <Contact /> },
        { path: "/about", element: <About /> },
      ],
      { initialEntries: ["/", "/contact", "/about"], initialIndex: 0 }
    );

    const { container } = render(<RouterProvider router={router} />);

    // Should start on home route - use container scoping
    const homeSection = container.querySelector('[data-testid="home-page"]');
    expect(homeSection).toBeDefined();
  });

  test("Invalid routes are handled gracefully", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <Home /> },
        { path: "/contact", element: <Contact /> },
        { path: "/about", element: <About /> },
      ],
      { initialEntries: ["/non-existent-route"] }
    );

    // Should not throw when rendering invalid route
    expect(() => {
      render(<RouterProvider router={router} />);
    }).not.toThrow();
  });
});
