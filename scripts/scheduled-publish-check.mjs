import fs from "node:fs";

const articlesSource = fs.readFileSync("src/data/articles.ts", "utf8");
const julySource = fs.readFileSync("src/data/julyArticles.ts", "utf8");
const notificationPath = ".github/publish-notification.json";
if (fs.existsSync(notificationPath)) fs.unlinkSync(notificationPath);
const setActionOutput = (published) => {
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `published=${published ? "true" : "false"}\n`);
  }
};
const sliceBetween = (startMarker, endMarker) => {
  const start = articlesSource.indexOf(startMarker);
  if (start === -1) throw new Error(`Missing marker: ${startMarker}`);
  const end = articlesSource.indexOf(endMarker, start);
  if (end === -1) throw new Error(`Missing marker: ${endMarker}`);
  return articlesSource.slice(start, end);
};
const countMatches = (source, pattern) => [...source.matchAll(pattern)].length;
const scheduledDefinitionsSource = sliceBetween("const scheduledTechniqueDefinitions", "const techniqueLinkList");
const scheduledDefinitions = [...scheduledDefinitionsSource.matchAll(/\{\s*slug: "([^"]+)",\s*title: "([^"]+)"/g)].map(
  ([, slug, title]) => ({ slug, title })
);
const julyModules = [...julySource.matchAll(/\{ slug:"([^"]+)", keyword:"([^"]+)", headline:"([^"]+)"/g)].map(
  ([, slug, keyword, headline]) => ({ slug, keyword, headline })
);
const julyDefinitions = julyModules.flatMap((module) => [
  { slug: `${module.slug}-guide`, title: `${module.keyword} 뜻과 구조: ${module.headline}` },
  { slug: `${module.slug}-chart-check`, title: `${module.keyword} 차트 찾는 법: 확인 순서와 체크포인트` },
  { slug: `${module.slug}-failure`, title: `${module.keyword} 실패 신호: 무효화 조건과 흔한 실수` },
  { slug: `${module.slug}-practice`, title: `${module.keyword} 연습법: 사례 수집부터 복기까지` },
]).slice(0, 105);
const articleCount =
  countMatches(sliceBetween("const coreArticles", "].map(([slug"), /^\s*\["/gm) +
  countMatches(sliceBetween("const basicStudyDefinitions", "const basicStudyLinkByCategory"), /^\s*\{ item:/gm) +
  countMatches(sliceBetween("const intermediateStudyDefinitions", "const buildIntermediateStudyBodyHtml"), /^\s*\{ item:/gm) +
  countMatches(sliceBetween("const advancedStudyDefinitions", "const buildAdvancedStudyBodyHtml"), /^\s*\{ item:/gm) +
  countMatches(sliceBetween("const expertStudyDefinitions", "const buildExpertStudyBodyHtml"), /^\s*\{ item:/gm) +
  countMatches(sliceBetween("const scheduledTechniqueDefinitions", "const techniqueLinkList"), /^\s*\{\s*$/gm);
const statePath = ".github/publish-state.json";
const state = fs.existsSync(statePath)
  ? JSON.parse(fs.readFileSync(statePath, "utf8"))
  : { publishedCount: 0 };

const dayMs = 24 * 60 * 60 * 1000;
const publishStart = { year: 2026, month: 4, day: 14 };
const futurePublishStart = { year: 2026, month: 6, day: 27 };
const julyPublishStart = { year: 2026, month: 7, day: 6 };
const publishedArticleBaseline = 279;
const publishPeriods = [
  { start: 7 * 60, end: 10 * 60 },
  { start: 12 * 60, end: 15 * 60 },
  { start: 18 * 60, end: 21 * 60 },
];
const futurePublishPeriods = [{ start: 7 * 60, end: 10 * 60 }];

const seededRandom = (seed) => {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
};

const randInt = (random, min, max) => min + Math.floor(random() * (max - min + 1));
const startDaySerial = Math.floor(Date.UTC(publishStart.year, publishStart.month - 1, publishStart.day) / dayMs);
const futureStartDaySerial = Math.floor(Date.UTC(futurePublishStart.year, futurePublishStart.month - 1, futurePublishStart.day) / dayMs);
const julyStartDaySerial = Math.floor(Date.UTC(julyPublishStart.year, julyPublishStart.month - 1, julyPublishStart.day) / dayMs);

const buildPublishSlots = (count, startSerial, periods, seed) => {
  const random = seededRandom(seed);
  const slots = [];
  let serial = startSerial;

  while (slots.length < count) {
    const dayMinutes = new Set();
    const postsForDay = randInt(random, 3, 5);

    periods.forEach((period) => {
      if (dayMinutes.size >= postsForDay) return;
      dayMinutes.add(randInt(random, period.start, period.end));
    });

    while (dayMinutes.size < postsForDay) {
      const period = periods[randInt(random, 0, periods.length - 1)];
      let minute = randInt(random, period.start, period.end);
      while (dayMinutes.has(minute)) {
        minute = Math.min(period.end, minute + 1);
        if (dayMinutes.has(minute) && minute === period.end) minute = period.start;
      }
      dayMinutes.add(minute);
    }

    [...dayMinutes]
      .sort((a, b) => a - b)
      .forEach((minute) => slots.push({ serial, minute }));
    serial += 1;
  }

  return slots.slice(0, count).sort((a, b) => a.serial - b.serial || a.minute - b.minute);
};

const buildFuturePublishSlots = (count) => {
  const random = seededRandom(20260627);
  const slots = [];
  let serial = futureStartDaySerial;

  while (slots.length < count) {
    const dayMinutes = new Set();
    const postsForDay = randInt(random, 3, 5);

    while (dayMinutes.size < postsForDay) {
      const period = futurePublishPeriods[randInt(random, 0, futurePublishPeriods.length - 1)];
      let minute = randInt(random, period.start, period.end);
      while (dayMinutes.has(minute)) {
        minute = Math.min(period.end, minute + 1);
        if (dayMinutes.has(minute) && minute === period.end) minute = period.start;
      }
      dayMinutes.add(minute);
    }

    [...dayMinutes]
      .sort((a, b) => a - b)
      .forEach((minute) => slots.push({ serial, minute }));
    serial += 1;
  }

  return slots.slice(0, count).sort((a, b) => a.serial - b.serial || a.minute - b.minute);
};

const buildJulyPublishSlots = (count) => {
  const random = seededRandom(20260706);
  const slots = [];
  let serial = julyStartDaySerial;
  while (slots.length < count) {
    const dayMinutes = new Set();
    const postsForDay = randInt(random, 3, 5);
    while (dayMinutes.size < postsForDay) dayMinutes.add(randInt(random, 7 * 60, 10 * 60));
    [...dayMinutes].sort((a, b) => a - b).forEach((minute) => slots.push({ serial, minute }));
    serial += 1;
  }
  return slots.slice(0, count).sort((a, b) => a.serial - b.serial || a.minute - b.minute);
};

const legacySlots = buildPublishSlots(Math.min(articleCount, publishedArticleBaseline), startDaySerial, publishPeriods, 20260625);
const futureSlots = buildFuturePublishSlots(Math.max(0, articleCount - publishedArticleBaseline));
const julySlots = buildJulyPublishSlots(julyDefinitions.length);
const publishSlots = [...legacySlots, ...futureSlots, ...julySlots];

const now = process.env.PUBLISH_NOW ? new Date(process.env.PUBLISH_NOW) : new Date();
const nowKst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
const nowSerial = Math.floor(Date.UTC(nowKst.getFullYear(), nowKst.getMonth(), nowKst.getDate()) / dayMs);
const nowMinute = nowKst.getHours() * 60 + nowKst.getMinutes();

const dueCount = publishSlots.filter(
  (slot) => slot.serial < nowSerial || (slot.serial === nowSerial && slot.minute <= nowMinute)
).length;

if (dueCount === (state.publishedCount ?? 0)) {
  setActionOutput(false);
  console.log(`No scheduled post is newly due. due=${dueCount}, state=${state.publishedCount ?? 0}`);
  process.exit(0);
}

const previousCount = state.publishedCount ?? 0;
const newlyPublished = dueCount > previousCount
  ? publishSlots.slice(Math.max(previousCount, publishedArticleBaseline), dueCount).map((slot, offset) => {
      const articleIndex = Math.max(previousCount, publishedArticleBaseline) + offset;
      const article = articleIndex < articleCount
        ? scheduledDefinitions[articleIndex - publishedArticleBaseline]
        : julyDefinitions[articleIndex - articleCount];
      const date = new Date(slot.serial * dayMs);
      const dateKey = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(date.getUTCDate()).padStart(2, "0")}`;
      const time = `${String(Math.floor(slot.minute / 60)).padStart(2, "0")}:${String(slot.minute % 60).padStart(2, "0")}`;
      return article
        ? { ...article, publishedAt: `${dateKey} ${time}`, url: `https://chartroad.co.kr/learn/${article.slug}/` }
        : null;
    }).filter(Boolean)
  : [];

const nextState = {
  publishedCount: dueCount,
  checkedAt: now.toISOString(),
};

fs.writeFileSync(statePath, `${JSON.stringify(nextState, null, 2)}\n`);
if (newlyPublished.length > 0) {
  fs.writeFileSync(notificationPath, `${JSON.stringify({ checkedAt: now.toISOString(), posts: newlyPublished }, null, 2)}\n`);
  setActionOutput(true);
} else {
  setActionOutput(false);
}
console.log(`Scheduled posts became due. due=${dueCount}, previous=${state.publishedCount ?? 0}`);
