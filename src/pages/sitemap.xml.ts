import { publishedArticles } from "@/data/articles";

const site = "https://chartroad.co.kr";
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
const staticLastmod = "2026-06-25";

export async function GET() {
  const urls = [
    ...staticPages.map((path) => ({ url: path ? `${site}/${path}/` : `${site}/`, lastmod: staticLastmod })),
    ...publishedArticles.map((article) => ({ url: `${site}/learn/${article.slug}/`, lastmod: (article.updatedAt ?? article.publishedAt ?? staticLastmod).slice(0, 10) })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ url, lastmod }) => `  <url>
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
