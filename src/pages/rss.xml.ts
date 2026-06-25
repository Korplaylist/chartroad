import { articles } from "@/data/articles";

const site = "https://chartroad.co.kr";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const toRssDate = (value?: string) => new Date(value ?? "2026-06-25T00:00:00+09:00").toUTCString();

export async function GET() {
  const items = [...articles].sort((a, b) => {
    const left = a.publishedAt ?? "";
    const right = b.publishedAt ?? "";
    return right.localeCompare(left);
  });

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>차트로드</title>
    <link>${site}/</link>
    <description>차트 공부 순서, 차트 기초, 가격 구조 분석, 보조지표, 리스크 관리, 고급 차트 기술을 단계별로 정리한 교육용 RSS입니다.</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml" />
${items
  .map((article) => {
    const url = `${site}/learn/${article.slug}/`;
    return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(article.summary)}</description>
      <category>${escapeXml(article.category)}</category>
      <pubDate>${toRssDate(article.publishedAt)}</pubDate>
    </item>`;
  })
  .join("\n")}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
