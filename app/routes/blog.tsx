import type { Route } from "./+types/home";
import BlogPage from "@/blog/index";

export function meta(meta: Route.MetaArgs) {
  return [
    { title: "Blog" },
    { name: "description", content: "Je parle de tout et de rien" },
  ];
}
export default function Blog() {
  return <BlogPage />;
}
