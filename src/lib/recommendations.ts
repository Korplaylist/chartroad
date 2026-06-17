import { articles } from "@/data/articles";
import { resultProfileMap } from "@/data/results";
import type { ResultTypeKey } from "@/types";

export function buildStudyTopFive(mainType: ResultTypeKey, subType: ResultTypeKey) {
  const main = resultProfileMap[mainType].recommendedStudy;
  const sub = resultProfileMap[subType].recommendedStudy;
  const merged = subType === "riskGuardian" ? [sub[0], sub[1], ...main] : [...main, sub[0], sub[1]];
  return [...new Set(merged)].slice(0, 5);
}

export function buildSevenDayRoadmap(mainType: ResultTypeKey, subType: ResultTypeKey) {
  const study = buildStudyTopFive(mainType, subType);
  return [
    `1일차: ${study[0]}의 기본 용어와 차트에서 보이는 위치를 정리합니다.`,
    `2일차: ${study[1]}을 실제 차트에서 5개 이상 찾아봅니다.`,
    `3일차: ${study[2]} 기준이 맞지 않는 상황을 따로 기록합니다.`,
    `4일차: ${study[3]}을 손절 기준 또는 학습 중단 기준과 연결합니다.`,
    `5일차: ${study[4]}을 체크리스트 문장으로 바꿉니다.`,
    `6일차: 메인 유형과 보조 유형의 조심할 점을 비교해 반복 실수를 찾습니다.`,
    `7일차: 한 주 동안 만든 기준을 5줄 로드맵으로 요약합니다.`,
  ];
}

export function rankArticles(learningStyle: string, interestedConcept: string) {
  return [...articles]
    .map((article) => ({
      article,
      score:
        (article.style.includes(learningStyle) ? 4 : 0) +
        (article.concepts.includes(interestedConcept) ? 6 : 0) +
        (article.summary.includes(interestedConcept) ? 2 : 0),
    }))
    .sort((a, b) => b.score - a.score || a.article.title.localeCompare(b.article.title, "ko"))
    .map((item) => item.article);
}
