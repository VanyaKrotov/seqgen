import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("generate/:type", "./routes/generator.tsx"),
  route("utility/:type", "./routes/utility.tsx"),
  route("terms", "./routes/terms.tsx"),
  route("privacy", "./routes/privacy.tsx"),
  route("api-docs", "./routes/api-docs.tsx"),
  route("api/generate/:type", "./routes/api.generate.ts"),
  route("api/health", "./routes/api.health.ts"),
  route("sitemap.xml", "./routes/sitemap.ts"),
] satisfies RouteConfig;
