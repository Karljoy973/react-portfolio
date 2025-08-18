import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta(meta?: Partial<Route.MetaArgs>) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
		meta ? meta : null,
	];
}

export default function Home() {
  return <Welcome />;
}
