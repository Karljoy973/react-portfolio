import type { Route } from "./+types/home";
import AboutPage from "@/about/index"

export function meta(meta: Route.MetaArgs) {
    return [
        { title: "Page about" },
        { name: "description", content: "Venez en apprendre plus sur moi" },
    ];
}
export default function About() {
	return <AboutPage />;
}
