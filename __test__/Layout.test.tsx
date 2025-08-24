import { describe, expect, test } from "vitest";
import { cleanup, render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
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
  test("affiche les liens d");
  //smaller screens
});
