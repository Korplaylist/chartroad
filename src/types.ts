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
  | "보조지표"
  | "매매 스타일"
  | "리스크 관리";

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
