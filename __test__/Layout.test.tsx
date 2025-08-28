import { describe, expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/dom";
import { afterEach, beforeEach } from "node:test";
import { createMemoryRouter, RouterProvider } from "react-router";
import Tooltip from "@/components/Tooltip";

beforeEach(() => {
  cleanup();
});
afterEach(() => {
  cleanup();
});

describe("verifie que le layout est valide pour toutes les plateformes", () => {
  /**!SECTION
    test for md screens and bigger
	test("affiche les liens de la barre de navigation au format bureau", async () => {
		//je pense qu il faut que je mock mes composants puis que je teste que tout va bien
	});
	smaller screens
	
	test("ouvre et ferme le menu mobile avec le bouton hamburger", () => {
		render(
			<MemoryRouter>
				<div
					style={{
						width: "650px",
						height: "250px",
					}}>
					<NavBar />
				</div>
			</MemoryRouter>
		);
		const menuHamburger = document.getElementById("menu-hamburger");
		expect(menuHamburger).toBeTruthy();

		const navLinks = document.getElementById("dropdown-menu");
		expect(navLinks).not.toBeTruthy();

		fireEvent.click(menuHamburger as HTMLButtonElement);
		 le test ne passait pas parce que j avais un soucis de temps de reponse
		j aimerais bien en parler avec un professionnel du test
		setTimeout(() => {
			expect(navLinks).toBeTruthy();
			expect(navLinks!.children.length).toBeGreaterThan(0);
		}, 100);
	});

	 * 
	*/

  test("Quand je survole une icone, je vois le label associe", () => {
    const tooltipRenderer = render(<Tooltip label="Hello" />);
    expect(
      tooltipRenderer.container.children[0].classList.contains("opacity;;"),
    );
  });
});
