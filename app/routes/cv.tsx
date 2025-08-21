import type { Route } from "./+types/home";
import CVPage from "@/cv/index"

export function meta(meta: Route.MetaArgs) {
    return [
        { title: "mes expériences" },
        { name: "description", content: "Voici un aperçu de mes compétences" },
    ];
}
export default function CV() {
	return <CVPage />;
}
