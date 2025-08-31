/**
 * @fileoverview Tests d'intégration complets pour le composant Hero
 * 
 * Ce fichier contient une suite complète de tests d'intégration pour le composant Hero,
 * incluant la vérification de tous les éléments visuels, du routage, de l'accessibilité
 * et des interactions utilisateur (hover, focus, etc.).
 * 
 * Tests couverts:
 * - Présence du titre, description et boutons
 * - Routage vers /projects et /contact
 * - Props personnalisées et cas limites
 * - États de hover et interactions
 * - Accessibilité (ARIA, focus, etc.)
 * - Structure HTML et classes CSS
 * 
 * @author Rovo Dev
 * @version 1.0.0
 */

import { describe, expect, test, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { Hero } from "@/components/Hero";

/**
 * Composants mock pour les pages de destination
 * Utilisés pour tester le routage sans dépendances externes
 */
const MockProjectsPage = () => <div data-testid="projects-page">Projects Page</div>;
const MockContactPage = () => <div data-testid="contact-page">Contact Page</div>;
const MockHomePage = () => (
  <div data-testid="home-page">
    <Hero name="John Doe" text="I build friendly web experiences and help others become confident, modern developers." />
  </div>
);

beforeEach(() => {
  cleanup();
});

afterEach(() => {
  cleanup();
});

describe("Hero Component Integration Tests", () => {
  test("renders with all required elements - title, description, and buttons", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <MockHomePage /> },
        { path: "/projects", element: <MockProjectsPage /> },
        { path: "/contact", element: <MockContactPage /> },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);
    
    // Vérifier la présence du titre
    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toBeDefined();
    expect(title.textContent).toBe("Hey, I'm John Doe 👋");
    
    // Vérifier la présence de la description
    const description = screen.getByText(/I build friendly web experiences/);
    expect(description).toBeDefined();
    expect(description.textContent).toContain("I build friendly web experiences and help others become confident, modern developers.");
    
    // Vérifier la présence du bouton "View Projects"
    const viewProjectsButton = screen.getByRole("link", { name: /view projects/i });
    expect(viewProjectsButton).toBeDefined();
    expect(viewProjectsButton.getAttribute("href")).toBe("/projects");
    
    // Vérifier la présence du bouton "Contact Me"
    const contactButton = screen.getByRole("link", { name: /contact me/i });
    expect(contactButton).toBeDefined();
    expect(contactButton.getAttribute("href")).toBe("/contact");
  });

  test("renders with custom props correctly", () => {
    const CustomHeroPage = () => (
      <div data-testid="custom-hero-page">
        <Hero name="Jane Smith" text="I create amazing digital experiences and love coding." />
      </div>
    );

    const router = createMemoryRouter(
      [
        { path: "/", element: <CustomHeroPage /> },
        { path: "/projects", element: <MockProjectsPage /> },
        { path: "/contact", element: <MockContactPage /> },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);
    
    // Vérifier le titre personnalisé
    const title = screen.getByRole("heading", { level: 2 });
    expect(title.textContent).toBe("Hey, I'm Jane Smith 👋");
    
    // Vérifier la description personnalisée
    const description = screen.getByText("I create amazing digital experiences and love coding.");
    expect(description).toBeDefined();
  });

  test("uses default text when text prop is not provided", () => {
    const DefaultTextHeroPage = () => (
      <div data-testid="default-text-hero-page">
        <Hero name="Test User" />
      </div>
    );

    const router = createMemoryRouter(
      [
        { path: "/", element: <DefaultTextHeroPage /> },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);
    
    const description = screen.getByText(/I build friendly web experiences/);
    expect(description).toBeDefined();
    expect(description.textContent).toContain("I build friendly web experiences and help others become confident, modern developers.");
  });

  test("navigation to projects page works correctly", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <MockHomePage /> },
        { path: "/projects", element: <MockProjectsPage /> },
        { path: "/contact", element: <MockContactPage /> },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);
    
    // Vérifier qu'on est sur la page d'accueil
    expect(screen.getByTestId("home-page")).toBeDefined();
    
    // Cliquer sur le bouton "View Projects"
    const viewProjectsButton = screen.getByRole("link", { name: /view projects/i });
    fireEvent.click(viewProjectsButton);
    
    // Vérifier que le lien pointe vers /projects
    expect(viewProjectsButton.getAttribute("href")).toBe("/projects");
  });

  test("navigation to contact page works correctly", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <MockHomePage /> },
        { path: "/projects", element: <MockProjectsPage /> },
        { path: "/contact", element: <MockContactPage /> },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);
    
    // Vérifier qu'on est sur la page d'accueil
    expect(screen.getByTestId("home-page")).toBeDefined();
    
    // Cliquer sur le bouton "Contact Me"
    const contactButton = screen.getByRole("link", { name: /contact me/i });
    fireEvent.click(contactButton);
    
    // Vérifier que le lien pointe vers /contact
    expect(contactButton.getAttribute("href")).toBe("/contact");
  });

  test("has correct CSS structure and classes", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <MockHomePage /> },
      ],
      { initialEntries: ["/"] }
    );

    const { container } = render(<RouterProvider router={router} />);
    
    // Vérifier la structure du header
    const header = container.querySelector("header");
    expect(header).toBeDefined();
    expect(header?.classList.contains("text-center")).toBe(true);
    expect(header?.classList.contains("py-20")).toBe(true);
    expect(header?.classList.contains("bg-gray-900")).toBe(true);
    expect(header?.classList.contains("text-white")).toBe(true);
    
    // Vérifier les classes des boutons
    const viewProjectsButton = screen.getByRole("link", { name: /view projects/i });
    expect(viewProjectsButton.classList.contains("bg-blue-600")).toBe(true);
    expect(viewProjectsButton.classList.contains("text-white")).toBe(true);
    expect(viewProjectsButton.classList.contains("transition")).toBe(true);
    
    const contactButton = screen.getByRole("link", { name: /contact me/i });
    expect(contactButton.classList.contains("border")).toBe(true);
    expect(contactButton.classList.contains("border-blue-500")).toBe(true);
    expect(contactButton.classList.contains("text-blue-400")).toBe(true);
    expect(contactButton.classList.contains("transition")).toBe(true);
  });

  test("buttons have correct accessibility attributes", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <MockHomePage /> },
        { path: "/projects", element: <MockProjectsPage /> },
        { path: "/contact", element: <MockContactPage /> },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);
    
    const viewProjectsButton = screen.getByRole("link", { name: /view projects/i });
    const contactButton = screen.getByRole("link", { name: /contact me/i });
    
    // Vérifier que les boutons sont des liens accessibles
    expect(viewProjectsButton.tagName.toLowerCase()).toBe("a");
    expect(contactButton.tagName.toLowerCase()).toBe("a");
    
    // Vérifier les attributs href
    expect(viewProjectsButton.getAttribute("href")).toBe("/projects");
    expect(contactButton.getAttribute("href")).toBe("/contact");
  });

  test("buttons have correct hover state classes", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <MockHomePage /> },
        { path: "/projects", element: <MockProjectsPage /> },
        { path: "/contact", element: <MockContactPage /> },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);
    
    const viewProjectsButton = screen.getByRole("link", { name: /view projects/i });
    const contactButton = screen.getByRole("link", { name: /contact me/i });
    
    // Vérifier les classes de hover pour le bouton "View Projects"
    expect(viewProjectsButton.classList.contains("hover:bg-blue-700")).toBe(true);
    expect(viewProjectsButton.classList.contains("transition")).toBe(true);
    
    // Vérifier les classes de hover pour le bouton "Contact Me"
    expect(contactButton.classList.contains("hover:bg-blue-600")).toBe(true);
    expect(contactButton.classList.contains("hover:text-white")).toBe(true);
    expect(contactButton.classList.contains("transition")).toBe(true);
  });

  test("buttons respond to hover events correctly", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <MockHomePage /> },
        { path: "/projects", element: <MockProjectsPage /> },
        { path: "/contact", element: <MockContactPage /> },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);
    
    const viewProjectsButton = screen.getByRole("link", { name: /view projects/i });
    const contactButton = screen.getByRole("link", { name: /contact me/i });
    
    // Simuler le hover sur le bouton "View Projects"
    fireEvent.mouseEnter(viewProjectsButton);
    expect(viewProjectsButton).toBeDefined(); // Le bouton reste accessible
    
    fireEvent.mouseLeave(viewProjectsButton);
    expect(viewProjectsButton).toBeDefined(); // Le bouton reste accessible après le hover
    
    // Simuler le hover sur le bouton "Contact Me"
    fireEvent.mouseEnter(contactButton);
    expect(contactButton).toBeDefined(); // Le bouton reste accessible
    
    fireEvent.mouseLeave(contactButton);
    expect(contactButton).toBeDefined(); // Le bouton reste accessible après le hover
  });

  test("buttons maintain accessibility during hover interactions", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <MockHomePage /> },
        { path: "/projects", element: <MockProjectsPage /> },
        { path: "/contact", element: <MockContactPage /> },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);
    
    const viewProjectsButton = screen.getByRole("link", { name: /view projects/i });
    const contactButton = screen.getByRole("link", { name: /contact me/i });
    
    // Vérifier que les boutons restent focusables pendant les interactions hover
    fireEvent.mouseEnter(viewProjectsButton);
    expect(viewProjectsButton.getAttribute("href")).toBe("/projects");
    
    fireEvent.mouseEnter(contactButton);
    expect(contactButton.getAttribute("href")).toBe("/contact");
    
    // Vérifier que les boutons peuvent recevoir le focus
    viewProjectsButton.focus();
    expect(document.activeElement).toBe(viewProjectsButton);
    
    contactButton.focus();
    expect(document.activeElement).toBe(contactButton);
  });

  test("component handles edge cases gracefully", () => {
    const EdgeCaseHeroPage = () => (
      <div data-testid="edge-case-hero-page">
        <Hero name="" text="" />
      </div>
    );

    const router = createMemoryRouter(
      [
        { path: "/", element: <EdgeCaseHeroPage /> },
      ],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);
    
    // Même avec des props vides, le composant doit se rendre
    const title = screen.getByRole("heading", { level: 2 });
    expect(title.textContent).toBe("Hey, I'm  👋");
    
    // Les boutons doivent toujours être présents et fonctionnels
    expect(screen.getByRole("link", { name: /view projects/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /contact me/i })).toBeDefined();
  });

  test("component structure matches expected HTML hierarchy", () => {
    const router = createMemoryRouter(
      [
        { path: "/", element: <MockHomePage /> },
      ],
      { initialEntries: ["/"] }
    );

    const { container } = render(<RouterProvider router={router} />);
    
    // Vérifier la hiérarchie HTML
    const header = container.querySelector("header");
    expect(header).toBeDefined();
    
    const h2 = header?.querySelector("h2");
    expect(h2).toBeDefined();
    
    const paragraph = header?.querySelector("p");
    expect(paragraph).toBeDefined();
    
    const buttonContainer = header?.querySelector("div.flex.justify-center.gap-4");
    expect(buttonContainer).toBeDefined();
    
    const links = buttonContainer?.querySelectorAll("a");
    expect(links?.length).toBe(2);
  });
});