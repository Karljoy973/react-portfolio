import  ContactPage  from "@/contact";
import type { Route } from "./+types/home";

export function meta(meta: Route.MetaArgs) {
    return [
        { title: "Page contact" },
        { name: "description", content: "Ne soyez pas timides, je ne mords pas" },
    ];
}
export default function Contact() {
	return <ContactPage />;
}
