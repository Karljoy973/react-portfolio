import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("contact", "./routes/contact.tsx"),
  route("a-propos", "./routes/about.tsx"),
  route("cv", "./routes/cv.tsx"),
  route("blog", "./routes/blog.tsx"),
] satisfies RouteConfig;
