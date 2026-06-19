import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const source = fs.readFileSync(path.join("src", "data", "articles.ts"), "utf8");
const outDir = path.join("public", "assets", "study");

const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const normalizeTitle = (value) =>
  value
    .replaceAll("Market Structure", "가격 구조")
    .replaceAll("HH·HL·LH·LL", "고점·저점 배열")
    .replaceAll("HH", "높은 고점")
    .replaceAll("HL", "높은 저점")
    .replaceAll("LH", "낮은 고점")
    .replaceAll("LL", "낮은 저점")
    .replaceAll("Double Bottom / Triple Bottom", "이중바닥·삼중바닥")
    .replaceAll("R-Multiple", "R 배수")
    .replaceAll("Expected Value", "기대값")
    .replaceAll("Risk of Ruin", "계좌 파산 위험")
    .replaceAll("Max Drawdown", "최대 낙폭")
    .replaceAll("Stage Analysis", "단계 분석")
    .replaceAll("CANSLIM", "캔슬림")
    .replaceAll("VCP", "변동성 축소 패턴")
    .replaceAll("VWAP", "당일 평균 매매가");

const splitTitle = (title) => {
  const clean = normalizeTitle(title);
  const parts = clean.split(":");
  if (parts.length > 1) return [parts[0].trim(), parts.slice(1).join(":").trim()];
  if (clean.length <= 24) return [clean, ""];
  const pivot = clean.lastIndexOf(" ", 24);
  return pivot > 8 ? [clean.slice(0, pivot), clean.slice(pivot + 1)] : [clean.slice(0, 24), clean.slice(24)];
};

const hashNumber = (slug) => Number.parseInt(crypto.createHash("sha1").update(slug).digest("hex").slice(0, 8), 16);
const v = (slug, min, max) => min + (hashNumber(slug) % (max - min + 1));

const css = `<style>
.bg{fill:#f6f4ed}.panel{fill:#fff;stroke:#d8ded6;stroke-width:2}.title{font:800 31px system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;fill:#10201f}.sub{font:800 18px system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;fill:#0f766e}.label{font:800 18px system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;fill:#10201f}.note{font:700 15px system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;fill:#647067}.line{fill:none;stroke:#0f766e;stroke-width:7;stroke-linecap:round;stroke-linejoin:round}.down{fill:none;stroke:#b45309;stroke-width:7;stroke-linecap:round;stroke-linejoin:round}.thin{fill:none;stroke:#94a3b8;stroke-width:4;stroke-linecap:round}.dash{stroke:#94a3b8;stroke-width:3;stroke-dasharray:10 10}.zone{fill:#e8f4ef;stroke:#0f766e;stroke-width:2;opacity:.92}.risk{fill:#fff3df;stroke:#b45309;stroke-width:2}.bar{fill:#0f766e;opacity:.92}.warn{fill:#b45309;opacity:.92}
</style>`;

const grid = `<g opacity=".52"><path d="M120 190H850M120 285H850M120 380H850M210 130V430M370 130V430M530 130V430M690 130V430" stroke="#e7e3d8" stroke-width="1.4"/></g>`;

const header = (article) => {
  const [a, b] = splitTitle(article.title);
  return `<text x="72" y="78" class="sub">${escapeXml(article.category)}</text><text x="72" y="116" class="title">${escapeXml(a)}</text>${b ? `<text x="72" y="154" class="title">${escapeXml(b)}</text>` : ""}`;
};

const frame = (article, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" role="img" aria-labelledby="title desc">
<title id="title">${escapeXml(normalizeTitle(article.title))} 교육 이미지</title>
<desc id="desc">${escapeXml(article.category)} 주제를 한국어 차트 도식으로 설명하는 교육 이미지</desc>
${css}<rect class="bg" width="960" height="540" rx="30"/><rect class="panel" x="42" y="42" width="876" height="456" rx="24"/>${header(article)}${body}</svg>
`;

const volumeBars = (xs = [155, 250, 455, 715], hs = [45, 70, 112, 86]) =>
  `<g>${xs.map((x, i) => `<rect class="bar" x="${x}" y="${448 - hs[i]}" width="30" height="${hs[i]}" rx="5"/>`).join("")}</g>`;

const previousHighLow = () =>
  `${grid}<path class="dash" d="M125 218H835M125 370H835"/><path class="line" d="M130 360L250 275L365 335L490 215L615 295L760 185L845 230"/>${volumeBars()}<text class="label" x="135" y="205">이전 고점</text><text class="label" x="135" y="400">이전 저점</text><text class="label" x="615" y="178">돌파 기준</text><text class="note" x="130" y="474">이전 고점 돌파와 이전 저점 이탈을 기준선으로 표시</text>`;

const reclaimSupport = () =>
  `${grid}<path class="dash" d="M130 280H825"/><path class="down" d="M130 250L250 220L365 282L475 335"/><path class="line" d="M475 335L585 292L690 276L820 210"/>${volumeBars([170, 360, 540, 735], [52, 96, 65, 110])}<text class="label" x="140" y="267">깨진 지지선</text><text class="label" x="610" y="260">회복 후 기준 재확인</text><text class="note" x="130" y="474">이탈했던 지지선 위로 다시 올라오는지 확인</text>`;

const doubleBottom = () =>
  `${grid}<path class="dash" d="M135 230H815"/><path class="line" d="M135 320L245 235L360 365L480 245L595 360L715 230L835 180"/><text class="label" x="145" y="218">목선</text><text class="label" x="325" y="392">첫 저점</text><text class="label" x="565" y="388">두 번째 저점</text><text class="label" x="710" y="218">목선 회복</text><text class="note" x="130" y="474">두 번의 저점과 목선 회복을 함께 확인</text>`;

const resistanceFlip = () =>
  `${grid}<path class="dash" d="M140 260H830"/><path class="line" d="M135 330L260 255L375 310L500 250L610 175L735 260L845 195"/>${volumeBars([170, 300, 605, 760], [40, 55, 120, 70])}<text class="label" x="150" y="246">기존 저항</text><text class="label" x="610" y="292">되돌림 지지 확인</text><text class="note" x="130" y="474">저항을 돌파한 뒤 같은 구간이 지지로 바뀌는지 관찰</text>`;

const breakoutRetest = () =>
  `${grid}<rect class="zone" x="145" y="230" width="455" height="140" rx="14"/><path class="dash" d="M145 230H835"/><path class="line" d="M155 330L255 245L360 335L470 250L590 230L700 170L830 118"/>${volumeBars([170, 275, 595, 735], [44, 60, 125, 95])}<text class="label" x="155" y="218">박스 상단</text><text class="label" x="610" y="220">돌파 후 재시험</text><text class="note" x="130" y="474">돌파 순간보다 돌파 후 유지와 재시험을 함께 확인</text>`;

const supportResistance = () =>
  `${grid}<rect class="zone" x="145" y="205" width="650" height="175" rx="14"/><path class="dash" d="M145 205H795M145 380H795"/><path class="line" d="M155 340L260 232L365 352L475 240L590 345L705 210L835 260"/><text class="label" x="160" y="193">반복 저항대</text><text class="label" x="160" y="410">반복 지지대</text><text class="note" x="130" y="474">정확한 한 줄보다 반복 반응한 가격대를 구간으로 표시</text>`;

const trendStructure = (slug) => {
  const y1 = v(slug, 315, 350);
  return `${grid}<path class="line" d="M120 ${y1}L235 ${y1 - 82}L350 ${y1 - 30}L470 ${y1 - 115}L590 ${y1 - 65}"/><path class="down" d="M590 ${y1 - 65}L700 ${y1 - 20}L805 ${y1 - 48}L850 ${y1 + 28}"/><text class="label" x="215" y="${y1 - 95}">높은 고점</text><text class="label" x="320" y="${y1 + 4}">높은 저점</text><text class="label" x="675" y="${y1 + 15}">낮은 고점</text><text class="label" x="790" y="${y1 + 60}">낮은 저점</text><text class="note" x="130" y="474">고점과 저점의 순서가 바뀌면 추세 변화 후보</text>`;
};

const candle = () =>
  `${grid}<g><line x1="180" y1="230" x2="180" y2="360" stroke="#0f766e" stroke-width="5"/><rect x="157" y="265" width="46" height="62" rx="6" fill="#0f766e"/><line x1="310" y1="210" x2="310" y2="390" stroke="#b45309" stroke-width="5"/><rect x="287" y="245" width="46" height="105" rx="6" fill="#b45309"/><line x1="440" y1="180" x2="440" y2="345" stroke="#0f766e" stroke-width="5"/><rect x="417" y="218" width="46" height="92" rx="6" fill="#0f766e"/><line x1="570" y1="210" x2="570" y2="405" stroke="#b45309" stroke-width="5"/><rect x="547" y="245" width="46" height="80" rx="6" fill="#b45309"/></g><text class="label" x="145" y="205">고가</text><text class="label" x="145" y="392">저가</text><text class="label" x="620" y="280">몸통과 꼬리 위치</text><text class="note" x="130" y="474">시가·고가·저가·종가와 꼬리의 의미를 함께 읽기</text>`;

const volume = () =>
  `${grid}<path class="line" d="M120 340L245 285L370 310L500 210L625 255L760 165L850 220"/>${volumeBars([160, 255, 455, 625, 760], [48, 76, 118, 62, 104])}<path class="dash" d="M500 210H850"/><text class="label" x="520" y="198">가격은 정체</text><text class="label" x="442" y="326">거래량 급증</text><text class="note" x="130" y="474">거래량은 많고 적음보다 가격 위치와 함께 해석</text>`;

const movingAverage = () =>
  `${grid}<path class="line" d="M115 335L230 275L345 300L470 220L590 250L735 165L850 190"/><path class="thin" d="M115 370L250 330L390 300L535 265L690 230L850 205"/><path class="down" d="M115 415L260 382L430 350L600 318L755 285L850 270"/><text class="label" x="600" y="226">20일선</text><text class="label" x="610" y="315">60일선</text><text class="note" x="130" y="474">정배열·역배열과 가격의 이격을 함께 확인</text>`;

const riskReward = () =>
  `${grid}<path class="line" d="M125 360L260 320L390 340L520 270L650 220L825 150"/><path class="dash" d="M150 180H830M150 315H830M150 385H830"/><rect class="zone" x="520" y="180" width="170" height="135" rx="14"/><rect class="risk" x="520" y="315" width="170" height="70" rx="14"/><text class="label" x="160" y="170">목표가</text><text class="label" x="160" y="307">진입가</text><text class="label" x="160" y="415">손절가</text><text class="note" x="130" y="474">진입 전에 손절폭과 기대 수익을 먼저 계산</text>`;

const indicator = () =>
  `${grid}<path class="line" d="M120 320L250 240L390 285L540 175L700 245L840 155"/><rect class="panel" x="125" y="360" width="720" height="82" rx="12"/><path class="thin" d="M145 410L260 382L390 405L540 392L700 420L825 407"/><path class="dash" d="M540 175L840 155M540 392L825 407"/><text class="label" x="135" y="348">가격 흐름</text><text class="label" x="140" y="468">지표 확인</text><text class="note" x="520" y="455">지표는 가격 위치를 보조하는 도구</text>`;

const timeframe = () =>
  `<rect class="zone" x="105" y="190" width="220" height="210" rx="18"/><rect class="panel" x="370" y="190" width="220" height="210" rx="18"/><rect class="risk" x="635" y="190" width="220" height="210" rx="18"/><path class="line" d="M130 340L190 275L250 298L300 235"/><path class="line" d="M395 330L455 265L515 285L565 230"/><path class="down" d="M660 260L720 290L785 255L835 315"/><text class="label" x="145" y="435">큰 시간축</text><text class="label" x="412" y="435">판단 기준</text><text class="label" x="670" y="435">진입 위치</text>`;

const elliott = () =>
  `${grid}<path class="line" d="M110 375L220 270L300 320L440 165L520 235L645 105"/><path class="down" d="M645 105L720 280L785 210L850 365"/><text class="label" x="213" y="252">1파</text><text class="label" x="292" y="350">2파</text><text class="label" x="432" y="148">3파</text><text class="label" x="512" y="264">4파</text><text class="label" x="637" y="92">5파</text><text class="label" x="712" y="309">A</text><text class="label" x="782" y="197">B</text><text class="label" x="842" y="395">C</text><text class="note" x="130" y="474">추세 5파와 조정 3파를 분리해 보기</text>`;

const fibonacci = () =>
  `${grid}<path class="line" d="M120 360L330 145L500 285L720 110"/><rect class="zone" x="330" y="175" width="320" height="105" rx="12"/><path class="dash" d="M330 180H650M330 230H650M330 280H650"/><text class="label" x="665" y="185">38.2%</text><text class="label" x="665" y="235">50%</text><text class="label" x="665" y="285">61.8%</text><text class="note" x="130" y="474">되돌림 비율은 지지·저항과 겹칠 때 의미가 커짐</text>`;

const journal = () =>
  `<rect class="panel" x="120" y="180" width="720" height="260" rx="16"/><path class="thin" d="M155 235H805M155 295H805M155 355H805M360 195V420"/><text class="label" x="175" y="220">진입 이유</text><text class="label" x="175" y="280">무효화 조건</text><text class="label" x="175" y="340">손절·목표</text><text class="label" x="175" y="400">복기 질문</text><text class="note" x="400" y="220">한 문장으로 확인</text><text class="note" x="400" y="280">틀렸다고 볼 가격</text><text class="note" x="400" y="340">1R과 2R 계산</text><text class="note" x="400" y="400">기준을 지켰는가?</text>`;

const chooseVisual = (article) => {
  const t = `${article.slug} ${article.title} ${article.item} ${article.image}`.toLowerCase();
  if (t.includes("previous-high-low") || t.includes("이전 고점")) return previousHighLow();
  if (t.includes("reclaim-previous-support") || t.includes("지지선 회복")) return reclaimSupport();
  if (t.includes("double-bottom") || t.includes("triple-bottom") || t.includes("이중바닥")) return doubleBottom();
  if (t.includes("resistance-support-flip") || t.includes("역할 전환")) return resistanceFlip();
  if (t.includes("breakout") || t.includes("fakeout") || t.includes("돌파") || t.includes("이탈")) return breakoutRetest();
  if (t.includes("elliott") || t.includes("엘리엇") || t.includes("abc")) return elliott();
  if (t.includes("fibonacci") || t.includes("피보나치")) return fibonacci();
  if (t.includes("candle") || t.includes("캔들") || t.includes("꼬리") || t.includes("양봉") || t.includes("음봉")) return candle();
  if (t.includes("volume") || t.includes("거래량") || t.includes("수급")) return volume();
  if (t.includes("moving-average") || t.includes("ma-") || t.includes("이동평균") || t.includes("20일선") || t.includes("60일선")) return movingAverage();
  if (t.includes("risk") || t.includes("reward") || t.includes("profit") || t.includes("stop") || t.includes("손절") || t.includes("익절") || t.includes("목표가")) return riskReward();
  if (t.includes("support") || t.includes("resistance") || t.includes("box") || t.includes("지지") || t.includes("저항") || t.includes("박스")) return supportResistance();
  if (t.includes("rsi") || t.includes("macd") || t.includes("bollinger") || t.includes("indicator") || t.includes("divergence") || t.includes("보조지표") || t.includes("다이버전스")) return indicator();
  if (t.includes("timeframe") || t.includes("scalping") || t.includes("swing") || t.includes("분봉") || t.includes("주봉") || t.includes("시간축")) return timeframe();
  if (t.includes("journal") || t.includes("checklist") || t.includes("setup") || t.includes("복기") || t.includes("체크리스트")) return journal();
  return trendStructure(article.slug);
};

const articles = [];
const objectPattern = /\{[^{}]*?\bitem:\s*"([^"]+)"[^{}]*?\bslug:\s*"([^"]+)"[^{}]*?\btitle:\s*"([^"]+)"[^{}]*?\bsummary:\s*"([^"]*)"[^{}]*?\bcategory:\s*"([^"]+)"[^{}]*?\bconcepts:\s*\[[^\]]*?\][^{}]*?\bimage:\s*"([^"]+)"/gs;
for (const match of source.matchAll(objectPattern)) {
  const [, item, slug, title, summary, category, image] = match;
  articles.push({ item, slug, title, summary, category, image });
}

const seen = new Set();
let count = 0;
for (const article of articles) {
  if (seen.has(article.slug)) continue;
  seen.add(article.slug);
  fs.writeFileSync(path.join(outDir, `${article.slug}.svg`), frame(article, chooseVisual(article)), "utf8");
  count += 1;
}

console.log(`generated ${count} contextual study SVGs`);
