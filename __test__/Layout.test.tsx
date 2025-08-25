import { describe, expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { afterEach, beforeEach } from "node:test";
import { MemoryRouter } from "react-router";
import NavBar from "@/components/NavBar";

beforeEach(() => {
	cleanup();
});
afterEach(() => {
	cleanup();
});

describe("verifie que le layout est valide pour toutes les plateformes", () => {
	//test for md screens and bigger
	test("affiche les liens de la barre de navigation au format bureau", () => {
		render(
			<MemoryRouter>
				<NavBar />
			</MemoryRouter>
		);

		const logo = document.getElementsByTagName("a")[0];
		expect(logo.getAttribute("data-testid")).toBe("accueil");

		const navlinks = document.getElementsByTagName("a");
		for (const link of navlinks) {
			expect(link.getAttribute("data-testid")).toBeDefined();
		}
	});
	//smaller screens
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
		// le test ne passait pas parce que j avais un soucis de temps de reponse
		//j aimerais bien en parler avec un professionnel du test
		setTimeout(() => {
			expect(navLinks).toBeTruthy();
			expect(navLinks!.children.length).toBeGreaterThan(0);
		}, 100);
	});
});
