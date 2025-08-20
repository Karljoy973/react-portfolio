import { HomePage } from "@/home";
import type { Route } from "./+types/home";

export function meta(meta: Route.MetaArgs) {
	return [
		{ title: "Page principale" },
		{ name: "description", content: "Bienvenue sur mon portefolio" },
	];
}
export default function Home() {
	return <HomePage />;
}
