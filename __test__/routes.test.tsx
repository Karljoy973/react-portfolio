import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider} from "react-router-dom";

import Home from "@/routes/home";
import Contact from "@/routes/contact";
import About from "@/routes/about";

describe("verifie que chaque page est bien rendue", () => {
  test("verifie que la page d accueil est rendue a l'url '/'", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <Home /> },
        { path: "/contact", element: <Contact /> },
        { path: "/about", element: <About /> },
      ],
      { initialEntries: ["/"] } // simulate URL "/"
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/home/i)).toBeTruthy();
  });

  test("verifie que la page d accueil est rendue a l'url '/contact'", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <Home /> },
        { path: "/contact", element: <Contact /> },
        { path: "/about", element: <About /> },
      ],
      { initialEntries: ["/contact"] }
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/contact/i)).toBeTruthy();
  });

  test("verifie que la page d accueil est rendue a l'url '/about'", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <Home /> },
        { path: "/contact", element: <Contact /> },
        { path: "/about", element: <About /> },
      ],
      { initialEntries: ["/about"] }
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByText(/about/i)).toBeTruthy();
  });

});
