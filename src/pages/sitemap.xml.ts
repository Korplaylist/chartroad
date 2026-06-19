import { articles } from "@/data/articles";

const site = "https://chartroad.pages.dev";
const staticPages = [
  "",
  "test",
  "result",
  "learn",
  "results",
  "about",
  "privacy",
  "disclaimer",
  "contact",
];
const lastmod = new Date().toISOString().slice(0, 10);

export async function GET() {
  const urls = [
    ...staticPages.map((path) => (path ? `${site}/${path}/` : `${site}/`)),
    ...articles.map((article) => `${site}/learn/${article.slug}/`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === `${site}/` ? "1.0" : "0.7"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
