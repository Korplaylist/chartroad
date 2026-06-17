const avg = (...nums) => nums.reduce((a, b) => a + b, 0) / nums.length;
const clamp = (num, min = 0, max = 100) => Math.min(Math.max(num, min), max);
const pick = (values, answer) => values[(answer || 1) - 1] ?? values[0];
const tierOrder = ["basic", "intermediate", "advanced", "expert"];
const riskStudies = ["손절선 정하기", "손익비 계산", "ATR 기반 손절", "포지션 크기 조절", "분할매수와 물타기 구분", "R-Multiple 관리"];
const insertRiskStudies = (studies) => [...new Set([riskStudies[0], riskStudies[1], ...studies, riskStudies[2], riskStudies[3]])];
const nextTier = (tier) => tierOrder[Math.min(tierOrder.indexOf(tier) + 1, tierOrder.length - 1)];

export function calculateResult(answers) {
  const q = (num) => answers[`q${num}`] ?? 1;
  const currentLevel = avg(pick([20, 45, 70, 90], q(1)), pick([20, 45, 70, 90], q(3)));
  const ruleClarity = avg(pick([15, 40, 70, 90], q(2)), pick([15, 35, 65, 90], q(4)), pick([10, 30, 55, 80, 95], q(17)), pick([10, 30, 55, 80, 95], q(21)));
  const timeAvailability = avg(pick([10, 35, 70, 95], q(5)), pick([10, 35, 70, 95], q(6)));
  const riskControl = avg(pick([10, 30, 55, 80, 95], q(17)), pick([35, 25, 10, 85, 75], q(18)), pick([10, 15, 5, 45, 85], q(19)), pick([10, 30, 55, 80, 95], q(21)), pick([10, 15, 30, 75, 90], q(22)));
  const riskNeed = 100 - riskControl;
  const chaseRisk = clamp((q(10) === 2 ? 25 : 0) + (q(11) === 2 ? 15 : 0) + (q(11) === 3 ? 25 : 0) + (q(12) === 1 ? 25 : 0) + (q(12) === 2 ? 15 : 0) + (q(14) === 2 ? 15 : 0) + (q(15) === 2 ? 15 : 0) + (q(23) === 1 ? 20 : 0) + (q(24) === 1 ? 25 : 0) + (q(24) === 6 ? 15 : 0));
  const averagingDownRisk = clamp((q(11) === 4 ? 20 : 0) + (q(15) === 1 ? 20 : 0) + (q(18) === 3 ? 25 : 0) + (q(19) === 2 ? 20 : 0) + (q(19) === 3 ? 30 : 0) + (q(22) === 1 ? 30 : 0) + (q(22) === 2 ? 25 : 0) + (q(22) === 3 ? 15 : 0) + (q(24) === 2 ? 20 : 0) + (q(24) === 3 ? 25 : 0));
  let scalpingFit = avg(timeAvailability, pick([90, 60, 20, 5], q(7)), pick([10, 30, 55, 90], q(8)), pick([95, 70, 25, 10], q(9)));
  if (timeAvailability < 45) scalpingFit = Math.min(scalpingFit, 45);
  if (riskControl < 45) scalpingFit = Math.min(scalpingFit, 50);
  const swingFit = avg(pick([40, 75, 95, 55], q(7)), pick([25, 70, 85, 30], q(8)), pick([20, 70, 95, 65], q(9)), timeAvailability < 70 ? 80 : 60);
  const trendFit = avg(pick([10, 40, 85, 95], q(7)), pick([70, 60, 45, 20], q(8)), pick([10, 45, 85, 95], q(9)), currentLevel);
  const pullbackFit = avg(q(10) === 3 ? 90 : 40, q(13) === 4 ? 85 : q(13) === 3 ? 70 : 35, q(16) === 3 ? 90 : 40, q(15) === 4 ? 75 : q(15) === 5 ? 85 : 35, pick([20, 55, 90, 60], q(7)));
  const boxFit = avg(q(8) === 3 ? 95 : 40, q(16) === 4 ? 95 : 40, q(15) === 4 ? 75 : 40, pick([40, 75, 80, 45], q(9)));
  let indicatorReadiness = avg(currentLevel, q(10) === 4 ? 90 : 40, q(16) === 5 ? 95 : 40, pick([20, 35, 65, 85, 90], q(14)));
  if (currentLevel < 50) indicatorReadiness = Math.min(indicatorReadiness, 55);
  let reversalFit = avg(q(11) === 4 ? 85 : 40, q(15) === 1 ? 80 : 40, q(16) === 1 ? 45 : 55, q(22) === 2 ? 70 : 40, currentLevel);
  if (riskControl < 45) reversalFit = Math.min(reversalFit, 55);
  const profitTakingIssue = clamp((q(20) === 1 ? 35 : 0) + (q(20) === 2 ? 20 : 0) + (q(20) === 3 ? 30 : 0) + (q(23) === 3 ? 25 : 0) + (q(24) === 3 ? 30 : 0));
  const typeScores = {
    beginnerExplorer: 0.55 * (100 - currentLevel) + 0.25 * (100 - ruleClarity) + (q(16) === 1 ? 15 : 0) + (q(13) === 1 ? 10 : 0),
    ruleArchitect: 0.4 * (100 - ruleClarity) + 0.2 * (100 - currentLevel) + 0.2 * riskNeed + (q(4) <= 2 ? 10 : 0) + (q(2) <= 2 ? 10 : 0),
    trendNavigator: 0.4 * trendFit + 0.2 * currentLevel + 0.15 * ruleClarity + 0.15 * riskControl + 0.1 * (100 - chaseRisk),
    pullbackSpotter: 0.45 * pullbackFit + 0.15 * currentLevel + 0.15 * ruleClarity + 0.15 * riskControl + 0.1 * swingFit,
    boxStrategist: 0.5 * boxFit + 0.15 * currentLevel + 0.15 * ruleClarity + 0.1 * riskControl + 0.1 * (100 - chaseRisk),
    overheatRadar: 0.6 * chaseRisk + 0.2 * (100 - ruleClarity) + 0.15 * (100 - riskControl) + 0.05 * currentLevel,
    riskGuardian: 0.6 * riskNeed + 0.25 * averagingDownRisk + 0.15 * profitTakingIssue,
    scalpingSprinter: 0.45 * scalpingFit + 0.2 * timeAvailability + 0.15 * riskControl + 0.1 * ruleClarity + 0.1 * currentLevel,
    swingMaker: 0.45 * swingFit + 0.2 * trendFit + 0.15 * pullbackFit + 0.1 * riskControl + 0.1 * ruleClarity,
    indicatorTranslator: 0.55 * indicatorReadiness + 0.2 * currentLevel + 0.15 * ruleClarity + 0.1 * riskControl,
    reversalSeeker: 0.5 * reversalFit + 0.2 * currentLevel + 0.15 * ruleClarity + 0.15 * riskControl,
    profitLocker: 0.65 * profitTakingIssue + 0.15 * ruleClarity + 0.1 * swingFit + 0.1 * trendFit,
  };
  if (currentLevel < 45) {
    typeScores.indicatorTranslator = Math.min(typeScores.indicatorTranslator, 55);
    typeScores.scalpingSprinter = Math.min(typeScores.scalpingSprinter, 50);
    typeScores.reversalSeeker = Math.min(typeScores.reversalSeeker, 55);
    typeScores.trendNavigator = Math.min(typeScores.trendNavigator, 65);
  }
  if (timeAvailability < 45) typeScores.scalpingSprinter = Math.min(typeScores.scalpingSprinter, 45);
  if (riskNeed >= 65 || averagingDownRisk >= 65) typeScores.riskGuardian = Math.max(typeScores.riskGuardian, 78);
  if (chaseRisk >= 65) typeScores.overheatRadar = Math.max(typeScores.overheatRadar, 76);
  if (currentLevel < 60) typeScores.indicatorTranslator = Math.min(typeScores.indicatorTranslator, 65);
  if (riskControl < 50) typeScores.reversalSeeker = Math.min(typeScores.reversalSeeker, 60);
  if (riskControl < 55) typeScores.scalpingSprinter = Math.min(typeScores.scalpingSprinter, 60);
  if (profitTakingIssue >= 60) typeScores.profitLocker = Math.max(typeScores.profitLocker, 68);
  const scoreValues = Object.values(typeScores);
  if (Math.max(...scoreValues) - Math.min(...scoreValues) < 25) typeScores.ruleArchitect += 10;
  const sortedTypes = Object.entries(typeScores).sort((a, b) => b[1] - a[1]);
  const mainType = sortedTypes[0][0];
  let subType = sortedTypes[1][0];
  if ((riskNeed >= 70 || averagingDownRisk >= 70) && mainType !== "riskGuardian" && subType !== "riskGuardian") subType = "riskGuardian";
  if (chaseRisk >= 75 && mainType !== "overheatRadar" && subType !== "overheatRadar") subType = "overheatRadar";
  if (profitTakingIssue >= 75 && mainType !== "profitLocker" && subType !== "profitLocker") subType = "profitLocker";
  const riskFlags = [];
  if (riskControl < 45) riskFlags.push("손절 기준 부족");
  if (chaseRisk >= 65) riskFlags.push("추격매수 가능성");
  if (averagingDownRisk >= 60) riskFlags.push("물타기 위험");
  if (timeAvailability < 40 && q(7) === 1) riskFlags.push("단타 환경 부적합");
  if (currentLevel < 50 && q(27) === 4) riskFlags.push("보조지표 선행 학습 위험");
  if (profitTakingIssue >= 60) riskFlags.push("익절 기준 부족");
  if (q(11) === 2 || q(24) === 6) riskFlags.push("뉴스·분위기 매매 위험");
  const levelLabel = currentLevel < 35 ? "입문" : currentLevel < 60 ? "초급" : currentLevel < 78 ? "초중급" : "실전형";
  const recommendedTimeframe = mainType === "scalpingSprinter" && timeAvailability >= 65 && riskControl >= 60 ? "5분봉 + 15분봉" : mainType === "swingMaker" || swingFit >= 70 ? "일봉 + 4시간봉" : mainType === "trendNavigator" || trendFit >= 70 ? "일봉 + 주봉" : mainType === "boxStrategist" ? "1시간봉 + 4시간봉" : timeAvailability < 45 ? "일봉 + 4시간봉" : "4시간봉 + 일봉";
  const scoreGap = sortedTypes[0][1] - sortedTypes[1][1];
  const confidence = scoreGap >= 12 ? "높음" : scoreGap >= 6 ? "보통" : "혼합형";
  const reviewHabit = pick([10, 35, 65, 90], q(4));
  const studyLevelScore = 0.35 * currentLevel + 0.25 * ruleClarity + 0.25 * riskControl + 0.15 * reviewHabit;
  const studyLevel = studyLevelScore < 35 ? "입문" : studyLevelScore < 50 ? "초보" : studyLevelScore < 65 ? "초중급" : studyLevelScore < 80 ? "중급" : "고급";
  const canShowExpertTechniques = studyLevelScore >= 80 && currentLevel >= 75 && ruleClarity >= 65 && riskControl >= 60;
  const studyTier = studyLevelScore < 45 ? "basic" : studyLevelScore < 65 ? "intermediate" : studyLevelScore < 80 ? "advanced" : canShowExpertTechniques ? "expert" : "advanced";
  const personalization = {
    interestedMarket: ["국내주식", "미국주식", "코인", "아직 정하지 않음"][q(25) - 1] ?? "아직 정하지 않음",
    learningStyle: ["개념부터 차근차근", "실제 차트 예시 위주", "체크리스트 형태", "퀴즈/문제풀이 형태", "짧은 요약 위주"][q(26) - 1] ?? "개념부터 차근차근",
    interestedConcept: ["이동평균선", "지지선/저항선", "거래량", "RSI/MACD", "볼린저밴드", "캔들 패턴", "손익비/손절"][q(27) - 1] ?? "이동평균선",
    finalGoal: ["손실을 줄이고 싶다", "매수 타이밍을 잡고 싶다", "매도 기준을 만들고 싶다", "단기매매를 잘하고 싶다", "꾸준한 매매 기준을 만들고 싶다"][q(28) - 1] ?? "꾸준한 매매 기준을 만들고 싶다",
  };
  const avoidTechniques = [];
  if (currentLevel < 45) avoidTechniques.push("엘리엇파동부터 공부하기", "하모닉패턴부터 공부하기", "SMC/ICT 개념부터 공부하기", "보조지표를 여러 개 동시에 조합하기");
  if (riskControl < 50) avoidTechniques.push("손절 기준 없이 단타하기", "레버리지나 고변동성 종목 위주로 매매하기", "물타기 전제 매매하기");
  if (chaseRisk >= 65) avoidTechniques.push("급등주 상단 추격매수", "뉴스 확인 후 바로 매수", "돌파 직후 확인 없이 매수");
  if (averagingDownRisk >= 60) avoidTechniques.push("하락 추세에서 싸 보인다고 매수", "손절 기준 없는 반등 매매");
  if (indicatorReadiness < 55) avoidTechniques.push("RSI 하나만 보고 매수·매도 결정", "MACD 골든크로스만 보고 진입");
  if (timeAvailability < 45) avoidTechniques.push("1분봉·5분봉 중심 단타");
  return { mainType, subType, typeScores, metrics: { currentLevel, ruleClarity, timeAvailability, riskControl, riskNeed, chaseRisk, averagingDownRisk, scalpingFit, swingFit, trendFit, pullbackFit, boxFit, indicatorReadiness, reversalFit, profitTakingIssue }, levelLabel, studyLevel, studyLevelScore, studyTier, canShowExpertTechniques, recommendedTimeframe, confidence, riskFlags, avoidTechniques, personalization };
}

export function buildStudySections(result, profiles) {
  const mainProfile = profiles[result.mainType];
  const needsRiskStudy = result.subType === "riskGuardian" || result.riskFlags.includes("손절 기준 부족") || result.riskFlags.includes("물타기 위험") || result.metrics.riskControl < 50;
  const recommendedStudies = (needsRiskStudy ? insertRiskStudies(mainProfile.study[result.studyTier]) : mainProfile.study[result.studyTier]).slice(0, 5);
  return {
    recommendedStudies,
    nextStudies: mainProfile.study[nextTier(result.studyTier)].slice(0, 3),
    futureExpertStudies: mainProfile.study.expert.slice(0, 3),
    practicalChecklist: mainProfile.practicalChecklist,
  };
}
