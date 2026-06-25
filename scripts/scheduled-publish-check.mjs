import fs from "node:fs";

const articlesSource = fs.readFileSync("src/data/articles.ts", "utf8");
const sliceBetween = (startMarker, endMarker) => {
  const start = articlesSource.indexOf(startMarker);
  if (start === -1) throw new Error(`Missing marker: ${startMarker}`);
  const end = articlesSource.indexOf(endMarker, start);
  if (end === -1) throw new Error(`Missing marker: ${endMarker}`);
  return articlesSource.slice(start, end);
};
const countMatches = (source, pattern) => [...source.matchAll(pattern)].length;
const articleCount =
  countMatches(sliceBetween("const coreArticles", "].map(([slug"), /^\s*\["/gm) +
  countMatches(sliceBetween("const basicStudyDefinitions", "const basicStudyLinkByCategory"), /^\s*\{ item:/gm) +
  countMatches(sliceBetween("const intermediateStudyDefinitions", "const buildIntermediateStudyBodyHtml"), /^\s*\{ item:/gm) +
  countMatches(sliceBetween("const advancedStudyDefinitions", "const buildAdvancedStudyBodyHtml"), /^\s*\{ item:/gm) +
  countMatches(sliceBetween("const expertStudyDefinitions", "const buildExpertStudyBodyHtml"), /^\s*\{ item:/gm);
const statePath = ".github/publish-state.json";
const state = fs.existsSync(statePath)
  ? JSON.parse(fs.readFileSync(statePath, "utf8"))
  : { publishedCount: 0 };

const dayMs = 24 * 60 * 60 * 1000;
const publishStart = { year: 2026, month: 4, day: 14 };
const publishPeriods = [
  { start: 7 * 60, end: 10 * 60 },
  { start: 12 * 60, end: 15 * 60 },
  { start: 18 * 60, end: 21 * 60 },
];

const seededRandom = (seed) => {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
};

const randInt = (random, min, max) => min + Math.floor(random() * (max - min + 1));
const startDaySerial = Math.floor(Date.UTC(publishStart.year, publishStart.month - 1, publishStart.day) / dayMs);

const buildPublishSlots = (count) => {
  const random = seededRandom(20260625);
  const slots = [];
  let serial = startDaySerial;

  while (slots.length < count) {
    const dayMinutes = new Set();
    const postsForDay = randInt(random, 3, 5);

    publishPeriods.forEach((period) => {
      if (dayMinutes.size >= postsForDay) return;
      dayMinutes.add(randInt(random, period.start, period.end));
    });

    while (dayMinutes.size < postsForDay) {
      const period = publishPeriods[randInt(random, 0, publishPeriods.length - 1)];
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

const now = process.env.PUBLISH_NOW ? new Date(process.env.PUBLISH_NOW) : new Date();
const nowKst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
const nowSerial = Math.floor(Date.UTC(nowKst.getFullYear(), nowKst.getMonth(), nowKst.getDate()) / dayMs);
const nowMinute = nowKst.getHours() * 60 + nowKst.getMinutes();

const dueCount = buildPublishSlots(articleCount).filter(
  (slot) => slot.serial < nowSerial || (slot.serial === nowSerial && slot.minute <= nowMinute)
).length;

if (dueCount <= (state.publishedCount ?? 0)) {
  console.log(`No scheduled post is newly due. due=${dueCount}, state=${state.publishedCount ?? 0}`);
  process.exit(0);
}

const nextState = {
  publishedCount: dueCount,
  checkedAt: now.toISOString(),
};

fs.writeFileSync(statePath, `${JSON.stringify(nextState, null, 2)}\n`);
console.log(`Scheduled posts became due. due=${dueCount}, previous=${state.publishedCount ?? 0}`);
