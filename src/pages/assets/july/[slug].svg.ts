import type { APIRoute, GetStaticPaths } from "astro";
import { julyArticles, julyModules } from "@/data/julyArticles";

export const getStaticPaths = (() => julyArticles.map((article) => ({ params: { slug: article.slug } }))) satisfies GetStaticPaths;

const escapeXml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&apos;" }[char] ?? char));
const splitTitle = (title: string) => {
  const lines: string[] = [];
  title.split(" ").forEach((word) => {
    const current = lines[lines.length - 1];
    if (!current || (current.length + word.length + 1 > 24 && lines.length < 3)) lines.push(word);
    else lines[lines.length - 1] = `${current} ${word}`;
  });
  return lines.slice(0, 3);
};
const hashSlug = (slug: string) => [...slug].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 0);
const paths = [
  "M110 355L205 270L300 320L395 205L490 260L585 165L680 220L785 125L860 150",
  "M110 170L205 255L300 210L395 335L490 280L585 380L680 310L785 405L860 365",
  "M110 330L205 180L300 335L395 205L490 320L585 235L680 300L785 245L860 205",
  "M110 255L205 345L300 220L395 315L490 180L585 265L680 150L785 230L860 115",
  "M110 190L205 360L300 235L395 345L490 270L585 325L680 290L785 305L860 245",
  "M110 350L205 230L300 300L395 180L490 245L585 145L680 215L785 175L860 105",
];

export const GET: APIRoute = ({ params }) => {
  const slug = params.slug ?? "";
  const article = julyArticles.find((item) => item.slug === slug);
  if (!article) return new Response("Not found", { status: 404 });
  const module = julyModules.find((item) => slug.startsWith(`${item.slug}-`));
  const titleLines = splitTitle(article.title);
  const path = paths[hashSlug(slug) % paths.length];
  const keyword = module?.keyword ?? article.studyItems?.[0] ?? article.category;
  const observe = module?.observe ?? "가격 위치와 선행 추세 확인";
  const confirm = module?.confirm ?? "종가와 거래량으로 확인";
  const invalidate = module?.invalidate ?? "기준 이탈 시 가설 중단";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(article.title)}</title><desc id="desc">${escapeXml(keyword)}의 관찰, 확인, 무효화 기준을 보여주는 한국어 교육 차트</desc>
  <style>.bg{fill:#f6f4ed}.panel{fill:#fff;stroke:#d8ded6;stroke-width:2}.grid{stroke:#ece9e1;stroke-width:1.5}.title{font:800 28px system-ui,sans-serif;fill:#10201f}.sub{font:800 16px system-ui,sans-serif;fill:#0f766e}.label{font:800 15px system-ui,sans-serif;fill:#10201f}.note{font:700 13px system-ui,sans-serif;fill:#647067}.price{fill:none;stroke:#0f766e;stroke-width:7;stroke-linecap:round;stroke-linejoin:round}.guide{stroke:#94a3b8;stroke-width:3;stroke-dasharray:10 9}.accent{fill:#b45309}.bar{fill:#0f766e}</style>
  <rect class="bg" width="960" height="540" rx="28"/><rect class="panel" x="38" y="38" width="884" height="464" rx="22"/>
  <text x="72" y="72" class="sub">${escapeXml(article.category)} · ${escapeXml(keyword)}</text>${titleLines.map((line, index) => `<text x="72" y="${106 + index * 30}" class="title">${escapeXml(line)}</text>`).join("")}
  <path class="grid" d="M95 205H875M95 285H875M95 365H875M230 175V425M420 175V425M610 175V425M800 175V425"/><path class="guide" d="M105 330H865"/><path class="price" d="${path}"/>
  <circle class="accent" cx="395" cy="205" r="8"/><circle class="accent" cx="680" cy="220" r="8"/><text x="112" y="192" class="label">관찰: ${escapeXml(observe.slice(0, 28))}</text><text x="455" y="408" class="label">확인: ${escapeXml(confirm.slice(0, 28))}</text>
  <g><rect class="bar" x="150" y="438" width="26" height="30" rx="3"/><rect class="bar" x="300" y="425" width="26" height="43" rx="3"/><rect class="bar" x="490" y="442" width="26" height="26" rx="3"/><rect class="bar" x="680" y="410" width="26" height="58" rx="3"/><rect class="accent" x="805" y="398" width="26" height="70" rx="3"/></g>
  <text x="95" y="492" class="note">무효화: ${escapeXml(invalidate.slice(0, 68))}</text></svg>`;
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml; charset=utf-8", "Cache-Control": "public, max-age=31536000, immutable" } });
};
