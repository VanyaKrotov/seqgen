const paths = [
  "",
  "/generate/number",
  "/generate/vpn",
  "/generate/uuid",
  "/generate/phrase",
  "/generate/seq",
  "/generate/short-id",
  "/terms",
  "/privacy",
  "/api-docs",
];

export function loader({ request }: { request: Request }) {
  const origin = new URL(request.url).origin;
  const urls = paths.map((path) => `<url><loc>${origin}${path}</loc><changefreq>monthly</changefreq></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
