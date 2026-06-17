export type ResultTypeKey =
  | "beginnerExplorer"
  | "ruleArchitect"
  | "trendNavigator"
  | "pullbackSpotter"
  | "boxStrategist"
  | "overheatRadar"
  | "riskGuardian"
  | "scalpingSprinter"
  | "swingMaker"
  | "indicatorTranslator"
  | "reversalSeeker"
  | "profitLocker";

export type Answers = Record<`q${number}`, number>;

export type Question = {
  id: `q${number}`;
  text: string;
  options: string[];
  diagnostic: boolean;
};

export type ResultProfile = {
  key: ResultTypeKey;
  name: string;
  meaning: string;
  description: string;
  summary: string;
  strengths: string[];
  cautions: string[];
  recommendedStudy: string[];
  study: Record<"basic" | "intermediate" | "advanced" | "expert", string[]>;
  practicalChecklist: string[];
  avoid: string[];
};

export type LearnCategory =
  | "차트 기초"
  | "가격 구조 분석"
  | "보조지표"
  | "거래량·수급 해석"
  | "매매 스타일"
  | "매매 전략 설계"
  | "리스크 관리"
  | "고급 차트 기술";

export type LearnArticle = {
  slug: string;
  title: string;
  summary: string;
  category: LearnCategory;
  concepts: string[];
  style: string[];
  body: string[];
  faq: { question: string; answer: string }[];
};
