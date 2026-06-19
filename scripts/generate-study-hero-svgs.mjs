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

const normalizeTitle = (title) =>
  title
    .replaceAll("Market Structure", "가격 구조")
    .replaceAll("HH·HL·LH·LL", "고점·저점 배열")
    .replaceAll("HH", "높은 고점")
    .replaceAll("HL", "높은 저점")
    .replaceAll("LH", "낮은 고점")
    .replaceAll("LL", "낮은 저점")
    .replaceAll("R-Multiple", "R 배수")
    .replaceAll("Expected Value", "기대값")
    .replaceAll("Risk of Ruin", "파산 위험")
    .replaceAll("Max Drawdown", "최대 낙폭")
    .replaceAll("Stage Analysis", "단계 분석")
    .replaceAll("ABC", "A-B-C")
    .replaceAll("CANSLIM", "캔슬림")
    .replaceAll("VCP", "변동성 축소 패턴")
    .replaceAll("VWAP", "당일 평균 매매가");

const splitTitle = (title) => {
  const clean = normalizeTitle(title);
  const parts = clean.split(":");
  if (parts.length > 1) return [parts[0].trim(), parts.slice(1).join(":").trim()];
  if (clean.length > 24) {
    const pivot = clean.lastIndexOf(" ", 24);
    return pivot > 8 ? [clean.slice(0, pivot), clean.slice(pivot + 1)] : [clean.slice(0, 24), clean.slice(24)];
  }
  return [clean, ""];
};

const css = `<style>
.bg{fill:#f6f4ed}.panel{fill:#fff;stroke:#d8ded6;stroke-width:2}.title{font:800 34px system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;fill:#10201f}.sub{font:800 22px system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;fill:#0f766e}.label{font:800 20px system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;fill:#10201f}.note{font:700 17px system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;fill:#647067}.line{fill:none;stroke:#0f766e;stroke-width:7;stroke-linecap:round;stroke-linejoin:round}.down{fill:none;stroke:#b45309;stroke-width:7;stroke-linecap:round;stroke-linejoin:round}.thin{fill:none;stroke:#94a3b8;stroke-width:4;stroke-linecap:round}.dash{stroke:#94a3b8;stroke-width:3;stroke-dasharray:10 10}.zone{fill:#e8f4ef;stroke:#0f766e;stroke-width:2;opacity:.9}.risk{fill:#fff3df;stroke:#b45309;stroke-width:2}.bar{fill:#0f766e;opacity:.92}.warn{fill:#b45309;opacity:.92}
</style>`;

const grid = `<g opacity=".55"><path d="M120 190H850M120 285H850M120 380H850M210 130V430M370 130V430M530 130V430M690 130V430" stroke="#e7e3d8" stroke-width="1.4"/></g>`;

const header = ({ title, category }) => {
  const [line1, line2] = splitTitle(title);
  return `<text x="72" y="82" class="sub">${escapeXml(category)}</text><text x="72" y="124" class="title">${escapeXml(line1)}</text>${line2 ? `<text x="72" y="166" class="title">${escapeXml(line2)}</text>` : ""}`;
};

const frame = (article, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540" role="img" aria-labelledby="title desc">
<title id="title">${escapeXml(normalizeTitle(article.title))} 차트 학습 이미지</title>
<desc id="desc">${escapeXml(article.category)} 주제를 실제 차트 흐름과 핵심 기준으로 설명하는 한국어 교육 이미지</desc>
${css}<rect class="bg" width="960" height="540" rx="30"/><rect class="panel" x="42" y="42" width="876" height="456" rx="24"/>${header(article)}${body}</svg>
`;

const candles = (startX = 160, y = 325) =>
  `<g><line x1="${startX}" y1="${y - 50}" x2="${startX}" y2="${y + 20}" stroke="#0f766e" stroke-width="4"/><rect x="${startX - 16}" y="${y - 32}" width="32" height="40" rx="5" fill="#0f766e"/>
  <line x1="${startX + 95}" y1="${y - 85}" x2="${startX + 95}" y2="${y + 12}" stroke="#0f766e" stroke-width="4"/><rect x="${startX + 79}" y="${y - 65}" width="32" height="55" rx="5" fill="#0f766e"/>
  <line x1="${startX + 190}" y1="${y - 65}" x2="${startX + 190}" y2="${y + 28}" stroke="#b45309" stroke-width="4"/><rect x="${startX + 174}" y="${y - 35}" width="32" height="45" rx="5" fill="#b45309"/>
  <line x1="${startX + 285}" y1="${y - 120}" x2="${startX + 285}" y2="${y - 8}" stroke="#0f766e" stroke-width="4"/><rect x="${startX + 269}" y="${y - 92}" width="32" height="62" rx="5" fill="#0f766e"/></g>`;

const volumeBars = () =>
  `<g><rect class="bar" x="160" y="405" width="30" height="45" rx="5"/><rect class="bar" x="250" y="382" width="30" height="68" rx="5"/><rect class="bar" x="455" y="340" width="30" height="110" rx="5"/><rect class="bar" x="710" y="360" width="30" height="90" rx="5"/></g>`;

const visualByKind = (article) => {
  const kind = article.image;
  const title = normalizeTitle(article.title);
  const text = `${title} ${article.category}`.toLowerCase();

  if (text.includes("엘리엇") || text.includes("abc") || text.includes("파동")) {
    return `${grid}<path class="line" d="M110 375L220 270L300 320L440 165L520 235L645 105"/><path class="down" d="M645 105L720 280L785 210L850 365"/><g class="label"><text x="213" y="252">1파</text><text x="292" y="350">2파</text><text x="432" y="148">3파</text><text x="512" y="264">4파</text><text x="637" y="92">5파</text><text x="712" y="309">A</text><text x="782" y="197">B</text><text x="842" y="395">C</text></g><text class="note" x="118" y="462">추세 5파 이후 조정 A-B-C를 구분</text>`;
  }

  if (text.includes("피보나치")) {
    return `${grid}<path class="line" d="M120 360L330 145L500 285L720 110"/><rect class="zone" x="330" y="175" width="320" height="105" rx="12"/><path class="dash" d="M330 180H650M330 230H650M330 280H650"/><g class="label"><text x="665" y="185">38.2%</text><text x="665" y="235">50%</text><text x="665" y="285">61.8%</text></g><text class="note" x="130" y="455">되돌림 후보는 지지·저항과 함께 확인</text>`;
  }

  if (kind === "candle" || text.includes("캔들") || text.includes("꼬리")) {
    return `${grid}${candles(180, 320)}<path class="dash" d="M125 250H835M125 370H835"/><text class="label" x="130" y="238">저항 가격대</text><text class="label" x="130" y="400">지지 가격대</text><text class="note" x="130" y="458">몸통·꼬리·종가 위치를 함께 읽기</text>`;
  }

  if (kind === "volume" || text.includes("거래량")) {
    return `${grid}<path class="line" d="M120 340L250 285L370 310L500 210L620 255L760 165L850 220"/>${volumeBars()}<path class="dash" d="M495 210H850"/><text class="label" x="525" y="200">돌파 후 유지 확인</text><text class="note" x="128" y="472">거래량은 위치와 종가 반응까지 함께 확인</text>`;
  }

  if (kind === "ma" || text.includes("이동평균") || text.includes("20일선") || text.includes("60일선")) {
    return `${grid}<path class="line" d="M115 335L230 275L345 300L470 220L590 250L735 165L850 190"/><path class="thin" d="M115 370L250 330L390 300L535 265L690 230L850 205"/><path class="down" d="M115 415L260 382L430 350L600 318L755 285L850 270"/><text class="label" x="600" y="226">20일선 눌림</text><text class="label" x="610" y="315">60일선 방향</text><text class="note" x="130" y="462">배열은 방향, 눌림은 유지 여부를 확인</text>`;
  }

  if (kind === "box" || kind === "support" || text.includes("박스") || text.includes("돌파") || text.includes("지지") || text.includes("저항")) {
    return `${grid}<rect class="zone" x="145" y="190" width="650" height="180" rx="14"/><path class="dash" d="M145 190H795M145 370H795"/><path class="line" d="M155 330L260 220L365 340L475 230L590 335L705 190L840 125"/>${volumeBars()}<text class="label" x="160" y="178">상단 저항</text><text class="label" x="160" y="402">하단 지지</text><text class="label" x="650" y="150">돌파 후 유지</text>`;
  }

  if (kind === "risk" || kind === "reward" || kind === "profit" || text.includes("손절") || text.includes("목표") || text.includes("익절") || text.includes("리스크")) {
    return `${grid}<path class="line" d="M125 360L260 320L390 340L520 270L650 220L825 150"/><path class="dash" d="M150 180H830M150 315H830M150 385H830"/><rect class="zone" x="520" y="180" width="170" height="135" rx="14"/><rect class="risk" x="520" y="315" width="170" height="70" rx="14"/><g class="label"><text x="160" y="170">목표가</text><text x="160" y="307">진입가</text><text x="160" y="415">손절가</text></g><text class="note" x="130" y="462">진입 전 손절폭과 보상 구간을 먼저 계산</text>`;
  }

  if (kind === "rsi" || kind === "macd" || kind === "bollinger" || text.includes("rsi") || text.includes("macd") || text.includes("볼린저") || text.includes("다이버전스")) {
    return `${grid}<path class="line" d="M120 320L250 240L390 285L540 175L700 245L840 155"/><rect class="panel" x="125" y="360" width="720" height="82" rx="12"/><path class="thin" d="M145 410L260 382L390 405L540 392L700 420L825 407"/><path class="dash" d="M540 175L840 155M540 392L825 407"/><text class="label" x="135" y="348">가격 위치 먼저</text><text class="label" x="140" y="468">지표는 확인 도구</text>`;
  }

  if (kind === "timeframe" || kind === "swing" || kind === "scalping" || text.includes("시간") || text.includes("분봉") || text.includes("주봉") || text.includes("단타")) {
    return `<rect class="zone" x="105" y="190" width="220" height="210" rx="18"/><rect class="panel" x="370" y="190" width="220" height="210" rx="18"/><rect class="risk" x="635" y="190" width="220" height="210" rx="18"/><path class="line" d="M130 340L190 275L250 298L300 235"/><path class="line" d="M395 330L455 265L515 285L565 230"/><path class="down" d="M660 260L720 290L785 255L835 315"/><g class="label"><text x="145" y="435">큰 시간축</text><text x="412" y="435">판단 기준</text><text x="670" y="435">진입 위치</text></g>`;
  }

  if (kind === "journal" || text.includes("체크리스트") || text.includes("복기") || text.includes("노트") || text.includes("셋업")) {
    return `<rect class="panel" x="120" y="180" width="720" height="260" rx="16"/><path class="thin" d="M155 235H805M155 295H805M155 355H805M360 195V420"/><g class="label"><text x="175" y="220">진입 이유</text><text x="175" y="280">무효화 조건</text><text x="175" y="340">손절·목표</text><text x="175" y="400">복기 질문</text></g><g class="note"><text x="400" y="220">한 문장으로 확인</text><text x="400" y="280">틀렸다고 볼 가격</text><text x="400" y="340">1R과 2R 계산</text><text x="400" y="400">기준을 지켰는가?</text></g>`;
  }

  return `${grid}<path class="line" d="M110 340L230 250L340 295L465 190L585 240"/><path class="down" d="M585 240L690 300L775 270L850 350"/><g class="label"><text x="205" y="235">높은 고점</text><text x="290" y="325">높은 저점</text><text x="440" y="175">높은 고점</text><text x="655" y="330">낮은 고점</text><text x="768" y="385">낮은 저점</text></g><text class="note" x="125" y="455">고점·저점 순서가 바뀌면 추세 변화 후보</text>`;
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
  fs.writeFileSync(path.join(outDir, `${article.slug}.svg`), frame(article, visualByKind(article)), "utf8");
  count += 1;
}

console.log(`generated ${count} study hero SVGs`);
