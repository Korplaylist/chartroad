import type { ResultProfile, ResultTypeKey } from "@/types";

const makeStudy = (basic: string[], intermediate: string[], advanced: string[], expert: string[]) => ({
  basic,
  intermediate,
  advanced,
  expert,
});

export const resultProfiles: ResultProfile[] = [
  {
    key: "beginnerExplorer",
    name: "차트 지도 펼친 입문 탐험가",
    meaning: "차트의 기본 언어부터 익혀야 하는 입문 유형",
    description: "캔들, 거래량, 이동평균선, 지지선과 저항선처럼 차트의 가장 기본적인 언어를 차근차근 익히면 학습 속도가 빨라지는 유형입니다.",
    summary: "차트의 기본 언어를 익히면 다음 공부 순서가 훨씬 선명해집니다.",
    strengths: ["새로운 개념을 편견 없이 받아들이기 쉽습니다.", "기초부터 쌓으면 잘못된 습관을 줄일 수 있습니다.", "학습 순서를 정하면 성장 체감이 빠릅니다."],
    cautions: ["보조지표나 고급 기법부터 시작하면 기준이 흔들릴 수 있습니다.", "캔들 색만 보고 좋고 나쁨을 판단하기 쉽습니다.", "손절 기준 없이 차트를 보면 위험합니다."],
    recommendedStudy: ["캔들 보는 법", "거래량 보는 법", "지지선과 저항선", "이동평균선 보는 법", "손절 기준"],
    study: makeStudy(
      ["캔들 구조: 시가·고가·저가·종가 이해", "양봉과 음봉의 의미", "거래량 기본"],
      ["장대양봉과 장대음봉 해석", "거래량 증가·감소에 따른 가격 흐름", "이동평균선 정배열과 역배열"],
      ["다우이론으로 고점과 저점 읽기", "지지선 이탈과 저항선 돌파 판단", "거래량으로 매수세·매도세 구분"],
      ["상위 시간봉과 하위 시간봉 연결", "엘리엇파동 기본 구조", "피보나치 되돌림 구간"]
    ),
    practicalChecklist: ["캔들 몸통과 꼬리를 구분한다.", "거래량이 늘어난 위치를 적는다.", "진입보다 손절 기준을 먼저 정한다."],
    avoid: ["RSI/MACD부터 시작하기", "1분봉 중심 단타", "손절 없는 진입", "고급 기법 암기"],
  },
  {
    key: "ruleArchitect",
    name: "매매 기준을 세우는 전략 건축가",
    meaning: "감매매에서 벗어나 기준을 만들어야 하는 유형",
    description: "차트 용어는 어느 정도 알지만 실제 판단에서 진입 이유, 무효화 조건, 목표가가 명확하지 않을 때가 많은 유형입니다.",
    summary: "더 많은 신호보다 반복 가능한 기준을 만드는 것이 핵심입니다.",
    strengths: ["체크리스트형 학습과 잘 맞습니다.", "복기를 붙이면 개선 속도가 빠릅니다.", "셋업을 만들면 감정적 판단을 줄일 수 있습니다."],
    cautions: ["결과가 좋았던 매매를 기준 없이 반복할 수 있습니다.", "뉴스나 분위기에 흔들릴 수 있습니다.", "목표가 없이 오래 보유하기 쉽습니다."],
    recommendedStudy: ["매매 셋업", "손절 기준", "손익비", "차트 복기 노트", "지지선과 저항선"],
    study: makeStudy(
      ["매수 전 체크리스트 만들기", "진입 이유를 한 문장으로 정리하는 법", "목표가와 손절가 먼저 정하기"],
      ["셋업 기반 매매", "R-Multiple 개념", "진입 전 무효화 조건 설정"],
      ["기대값 기반 전략 평가", "셋업별 성과 추적", "연속 손실 관리"],
      ["Risk of Ruin", "Max Drawdown 관리", "포지션 사이징 전략"]
    ),
    practicalChecklist: ["진입 이유를 한 문장으로 쓴다.", "무효화 조건을 가격으로 정한다.", "목표가와 손절가를 함께 계산한다."],
    avoid: ["기준 없는 감매매", "목표가 없는 보유", "손절가 없는 진입", "결과만 보고 복기하기"],
  },
  {
    key: "trendNavigator",
    name: "큰 흐름을 읽는 추세 항해자",
    meaning: "작은 흔들림보다 큰 방향성을 먼저 보는 유형",
    description: "작은 변동보다 구조와 방향성을 먼저 읽는 연습이 잘 맞습니다. 추세 유지와 이탈 기준을 함께 배우면 좋습니다.",
    summary: "짧은 흔들림보다 구조와 방향성을 먼저 읽는 연습이 잘 맞습니다.",
    strengths: ["상위 시간축을 보는 인내심이 있습니다.", "추세 유지와 이탈을 공부하기 좋습니다.", "중기 관점의 로드맵을 세우기 쉽습니다."],
    cautions: ["추세 이탈 뒤에도 오래 버틸 수 있습니다.", "급등주에 늦게 따라갈 수 있습니다.", "손절선을 너무 멀게 둘 수 있습니다."],
    recommendedStudy: ["다우이론", "이동평균선", "추세선", "MACD", "스윙 매매"],
    study: makeStudy(
      ["상승 추세와 하락 추세 구분", "고점과 저점이 높아지는 구조", "이동평균선 배열"],
      ["Market Structure: HH·HL·LH·LL", "멀티 타임프레임 분석", "20일선·60일선 기반 추세 판단"],
      ["ADX로 추세 강도 필터링", "Stage Analysis", "추세 지속형 돌파와 실패 돌파"],
      ["엘리엇파동 기본 구조", "ABC 조정파 해석", "상위 시간봉과 하위 시간봉 연결"]
    ),
    practicalChecklist: ["상위 시간축의 방향을 먼저 본다.", "고점과 저점 구조를 표시한다.", "추세 이탈 기준을 정한다."],
    avoid: ["1분봉 중심 판단", "급등주 상단 추격", "추세 이탈 후 버티기", "손절 기준 없는 보유"],
  },
  {
    key: "pullbackSpotter",
    name: "기회를 기다리는 눌림 포착가",
    meaning: "좋은 진입 자리를 기다리는 능력이 필요한 유형",
    description: "상승 흐름 안에서 쉬어가는 구간과 하락 전환을 구분하는 공부가 잘 맞습니다.",
    summary: "기회를 기다리되 눌림과 하락 전환을 구분하는 기준이 중요합니다.",
    strengths: ["무리한 추격을 줄일 가능성이 큽니다.", "지지선과 거래량 공부와 잘 맞습니다.", "스윙 학습과 자연스럽게 연결됩니다."],
    cautions: ["하락 전환을 눌림으로 착각할 수 있습니다.", "좋은 자리를 놓쳤다고 추격할 수 있습니다.", "손절 기준 없는 눌림 접근은 위험합니다."],
    recommendedStudy: ["눌림목", "지지선과 저항선", "거래량 감소 눌림", "이동평균선 눌림", "손절 기준"],
    study: makeStudy(
      ["상승 추세와 눌림의 차이", "지지선 근처 눌림 확인", "이동평균선 눌림"],
      ["전고점 돌파 후 되돌림 진입", "거래량 수축 후 재상승", "눌림목 진입 체크리스트"],
      ["BOS 이후 눌림 진입", "Confluence Zone", "Anchored VWAP 눌림"],
      ["피보나치 PRZ", "와이코프 스프링", "멀티 타임프레임 눌림"]
    ),
    practicalChecklist: ["상승 구조가 먼저 있는지 확인한다.", "눌림 거래량이 줄어드는지 본다.", "직전 저점 이탈 기준을 정한다."],
    avoid: ["하락 추세를 눌림으로 보기", "장대양봉 뒤늦은 추격", "손절 없는 저가매수", "지지선만 믿고 버티기"],
  },
  {
    key: "boxStrategist",
    name: "선을 읽는 박스권 전략가",
    meaning: "지지와 저항 사이의 움직임을 읽는 유형",
    description: "추세보다 가격이 머무는 구간, 상단과 하단, 중앙선, 가짜 돌파를 배우면 좋은 유형입니다.",
    summary: "가격이 머무는 구간의 상단과 하단을 구분하는 공부가 잘 맞습니다.",
    strengths: ["지지와 저항 개념을 익히기 좋습니다.", "기준 가격을 정리하는 능력이 생기기 쉽습니다.", "가짜 돌파를 공부하기 좋은 유형입니다."],
    cautions: ["박스 이탈 뒤에도 이전 기준을 고집할 수 있습니다.", "중앙에서 무리하게 판단할 수 있습니다.", "거래량 없는 돌파를 과신할 수 있습니다."],
    recommendedStudy: ["지지선과 저항선", "박스권 구조", "가짜 돌파", "볼린저밴드", "거래량 확인"],
    study: makeStudy(
      ["박스권 구조 이해", "지지선과 저항선 찾기", "박스권 안에서 매수·매도 위치"],
      ["저항 돌파와 가짜 돌파 구분", "박스권 중앙선 활용", "거래량으로 박스 이탈 확인"],
      ["Range Expansion", "Failed Breakout 전략", "Volume Profile HVN/LVN"],
      ["와이코프 축적과 분산", "스프링과 업스러스트", "Market Profile 기초"]
    ),
    practicalChecklist: ["박스 상단과 하단을 먼저 표시한다.", "중앙에서는 손익비를 조심한다.", "돌파 후 유지 여부를 확인한다."],
    avoid: ["박스 이탈 후 버티기", "거래량 없는 돌파 과신", "중앙에서 방향 맞히기", "가짜 돌파 무시"],
  },
  {
    key: "overheatRadar",
    name: "고점을 감지하는 과열 레이더",
    meaning: "늦은 진입과 추격매수를 조심해야 하는 유형",
    description: "시장의 관심을 빠르게 감지하지만 너무 늦은 자리에서 들어갈 위험이 있어 과열 판단을 배워야 합니다.",
    summary: "빠른 관심 포착 능력을 매수 금지 구간 구분 공부로 연결해야 합니다.",
    strengths: ["시장 관심을 빠르게 감지합니다.", "거래량 공부와 연결하기 좋습니다.", "금지 조건을 만들면 실수가 줄어듭니다."],
    cautions: ["장대양봉 이후 늦게 따라갈 수 있습니다.", "뉴스 확인 직후 바로 판단할 수 있습니다.", "손절선이 먼 자리에서 무리할 수 있습니다."],
    recommendedStudy: ["클라이맥스 거래량", "이격도", "RSI 과열", "장대양봉 이후 패턴", "매수 금지 구간"],
    study: makeStudy(
      ["장대양봉 이후 주의점", "거래량 폭증의 의미", "RSI 과열 구간"],
      ["Climax Volume", "윗꼬리 캔들과 매도 압력", "갭상승 후 밀림"],
      ["Parabolic Move Risk", "Distribution Candle", "RSI Bearish Divergence"],
      ["Blow-off Top", "Upthrust after Distribution", "Late Entry Filter"]
    ),
    practicalChecklist: ["급등 위치가 저항 근처인지 확인한다.", "거래량 폭증 후 가격 진행 여부를 본다.", "손절선이 너무 멀면 진입하지 않는다."],
    avoid: ["급등주 상단 추격", "뉴스 직후 즉시 진입", "RSI만 보고 판단", "손익비 무시"],
  },
  {
    key: "riskGuardian",
    name: "계좌를 지키는 리스크 수호자",
    meaning: "손절과 손익비를 먼저 세워야 하는 유형",
    description: "차트 기법보다 먼저 손절선, 손익비, 포지션 크기를 정리해야 안정적인 학습이 가능합니다.",
    summary: "어떤 기법보다 먼저 손실 한도와 손익비 기준을 세우는 것이 중요합니다.",
    strengths: ["기준이 잡히면 실수 감소 폭이 큽니다.", "모든 차트 공부의 기반을 만들 수 있습니다.", "복기와 체크리스트 학습이 잘 맞습니다."],
    cautions: ["손실 중 차트를 회피할 수 있습니다.", "물타기와 분할매수를 혼동할 수 있습니다.", "기법만 늘리고 리스크 기준을 미룰 수 있습니다."],
    recommendedStudy: ["손절 기준", "손익비", "포지션 사이징", "복기 노트", "R-Multiple"],
    study: makeStudy(
      ["손절선 정하기", "손익비 1:1·1:2 의미", "매매 복기 노트"],
      ["R-Multiple 개념", "ATR 기반 손절폭", "포지션 크기 계산"],
      ["Risk of Ruin", "Expected Value", "Max Drawdown"],
      ["Fixed Fractional Position Sizing", "Kelly Criterion 기초", "Portfolio Risk Management"]
    ),
    practicalChecklist: ["매매 전 손절선을 적는다.", "손실 1R 기준으로 결과를 기록한다.", "연속 손실 때 비중을 줄인다."],
    avoid: ["손절 없는 판단", "물타기 전제 진입", "급등주 몰빵", "손실 중 차트 안 보기"],
  },
  {
    key: "scalpingSprinter",
    name: "빠른 판단의 단타 스프린터",
    meaning: "짧은 시간축의 위험을 먼저 배워야 하는 유형",
    description: "빠른 판단에 관심이 많지만 분봉은 손절과 무효화 기준이 없으면 위험해질 수 있습니다.",
    summary: "분봉보다 리스크 기준과 시간축 충돌을 먼저 배워야 합니다.",
    strengths: ["빠른 관찰과 실행력이 있습니다.", "캔들·거래량 반응 학습과 잘 맞습니다.", "체크리스트가 있으면 집중도가 높습니다."],
    cautions: ["작은 흔들림에 과하게 반응할 수 있습니다.", "수수료와 슬리피지를 무시할 수 있습니다.", "상위 시간축 저항을 놓칠 수 있습니다."],
    recommendedStudy: ["분봉 리스크", "VWAP", "시초가 변동성", "짧은 손절", "거래량 반응"],
    study: makeStudy(
      ["5분봉·15분봉 이해", "분봉 거래량", "단타 손절 기준"],
      ["VWAP 위아래 판단", "Opening Range Breakout", "장중 지지·저항"],
      ["ORB Failure", "VWAP Reclaim", "Volume Spike Pullback"],
      ["Order Flow 기초", "Liquidity Grab", "Intraday Mean Reversion"]
    ),
    practicalChecklist: ["상위 시간축 저항을 먼저 본다.", "진입 전 손절폭을 숫자로 정한다.", "한 번 틀리면 즉시 복기한다."],
    avoid: ["1분봉만 보기", "손절선 없는 진입", "뉴스 직후 추격", "연속 손실 후 무리한 재진입"],
  },
  {
    key: "swingMaker",
    name: "큰 그림을 만드는 스윙 설계자",
    meaning: "일봉과 4시간봉을 연결하면 좋은 유형",
    description: "며칠에서 몇 주 흐름을 보며 상위 시간축의 지지와 저항, 일봉 추세, 4시간봉 반응을 연결하는 공부가 잘 맞습니다.",
    summary: "큰 시간축의 위치와 세부 진입 기준을 연결하는 학습이 중요합니다.",
    strengths: ["기다리는 매매와 잘 맞습니다.", "주봉·일봉 구조를 공부하기 좋습니다.", "손익비를 크게 설계할 가능성이 있습니다."],
    cautions: ["너무 오래 버티면 손절이 늦어질 수 있습니다.", "일봉만 보고 세부 진입을 놓칠 수 있습니다.", "시장 전체 흐름을 무시할 수 있습니다."],
    recommendedStudy: ["스윙 매매", "멀티 타임프레임", "일봉 추세", "4시간봉 반응", "분할 청산"],
    study: makeStudy(
      ["스윙 시간축 이해", "일봉·4시간봉 연결", "눌림 반등 확인"],
      ["Weekly/Daily Alignment", "Relative Strength", "Base Pattern"],
      ["ATR Swing Stop", "Partial Exit", "Market/Sector Filter"],
      ["CANSLIM Chart Pattern", "VCP", "Cup and Handle"]
    ),
    practicalChecklist: ["주봉 위치를 먼저 확인한다.", "일봉 추세와 4시간봉 반응을 연결한다.", "분할 청산 기준을 미리 정한다."],
    avoid: ["일봉만 보고 무작정 진입", "손절 기준 없는 장기 보유", "시장 흐름 무시", "수익 후 익절 계획 없음"],
  },
  {
    key: "indicatorTranslator",
    name: "지표를 번역하는 보조지표 해석가",
    meaning: "지표보다 가격 구조를 먼저 연결해야 하는 유형",
    description: "RSI, MACD, 볼린저밴드 같은 지표에 관심이 많지만 지표를 가격 위치와 함께 읽어야 하는 유형입니다.",
    summary: "지표 신호를 가격 구조와 연결하는 연습이 가장 중요합니다.",
    strengths: ["숫자와 신호를 정리하는 데 강합니다.", "조건을 체계화하기 좋습니다.", "다양한 지표를 비교 학습하기 쉽습니다."],
    cautions: ["지표가 많아질수록 판단이 느려질 수 있습니다.", "가격 위치를 놓치면 신호를 오해할 수 있습니다.", "과최적화에 빠질 수 있습니다."],
    recommendedStudy: ["RSI", "MACD", "볼린저밴드", "다이버전스", "지표 조합"],
    study: makeStudy(
      ["RSI 30·70 이해", "MACD 교차", "볼린저밴드 상중하단"],
      ["RSI Regime", "MACD 0선", "볼린저밴드 수축과 확장"],
      ["Indicator Confluence", "ADX Trend/Range", "Divergence Failure"],
      ["Stochastic RSI", "Ichimoku Cloud", "Adaptive Moving Average"]
    ),
    practicalChecklist: ["지표보다 가격 위치를 먼저 본다.", "지표는 2~3개 이하로 제한한다.", "신호가 틀릴 조건을 정한다."],
    avoid: ["지표 여러 개 동시 조합", "RSI 하나만 보고 매매", "MACD 교차만 보고 진입", "가격 구조 무시"],
  },
  {
    key: "reversalSeeker",
    name: "반전을 기다리는 구조 관찰자",
    meaning: "바닥과 천장을 맞히기보다 확인 기준이 필요한 유형",
    description: "많이 빠진 종목의 반등을 찾고 싶어 하지만 하락 추세와 반전 확인을 구분하는 기준이 필요합니다.",
    summary: "반전은 예측보다 구조 회복과 무효화 기준을 확인하는 공부가 핵심입니다.",
    strengths: ["저평가·과매도 구간에 관심이 많습니다.", "다이버전스와 거래량 공부와 연결됩니다.", "기다리는 능력을 키우기 좋습니다."],
    cautions: ["떨어졌다는 이유만으로 들어갈 수 있습니다.", "하락 추세의 반등을 바닥으로 착각할 수 있습니다.", "손절을 미루면 손실이 커질 수 있습니다."],
    recommendedStudy: ["반전 확인", "다이버전스", "이중바닥", "거래량 회복", "무효화 기준"],
    study: makeStudy(
      ["과매도와 하락 추세 구분", "아랫꼬리 의미", "이전 저점 손절"],
      ["Bullish Divergence", "Double Bottom", "Reclaim Previous Support"],
      ["Wyckoff Spring", "Failed Breakdown", "Moving Average Reclaim"],
      ["Fibonacci PRZ", "Mean Reversion Setup", "Divergence Cluster"]
    ),
    practicalChecklist: ["하락 추세가 실제로 멈췄는지 본다.", "저점 회복과 거래량 회복을 확인한다.", "이전 저점 이탈 시 멈출 기준을 정한다."],
    avoid: ["많이 빠졌다는 이유로 매수", "물타기 전제 진입", "손절 없는 바닥 예측", "다이버전스 하나만 보기"],
  },
  {
    key: "profitLocker",
    name: "수익을 지키는 청산 설계자",
    meaning: "익절과 보유 기준을 미리 정해야 하는 유형",
    description: "진입보다 수익을 어떻게 지키고 청산할지에 대한 기준이 필요한 유형입니다.",
    summary: "좋은 진입만큼 목표가와 분할 청산, 추적 손절 기준이 중요합니다.",
    strengths: ["수익 관리에 관심이 큽니다.", "목표가와 저항 구간 공부와 잘 맞습니다.", "복기하면 실전 개선이 빠릅니다."],
    cautions: ["수익이 나면 너무 빨리 팔거나 너무 오래 버틸 수 있습니다.", "목표가 없이 감정적으로 청산할 수 있습니다.", "되돌림에 수익을 크게 반납할 수 있습니다."],
    recommendedStudy: ["목표가", "분할 청산", "트레일링 스탑", "저항 근처 익절", "R-Multiple"],
    study: makeStudy(
      ["목표가 설정", "저항 근처 익절", "수익 반납 방지"],
      ["First/Second Target", "Partial Exit", "R-Multiple Profit Taking"],
      ["ATR Trailing Stop", "Swing Low Trailing Stop", "Time Based Exit"],
      ["Chandelier Exit", "Fibonacci Extension Target", "Trend Following Exit System"]
    ),
    practicalChecklist: ["진입 전 1차 목표와 2차 목표를 정한다.", "일부 청산 기준을 미리 만든다.", "추세 유지 시 따라갈 손절 기준을 둔다."],
    avoid: ["목표가 없는 보유", "수익 중 계획 변경", "저항 앞 무리한 욕심", "수익 반납 후 손절 미루기"],
  },
];

export const resultProfileMap = Object.fromEntries(resultProfiles.map((profile) => [profile.key, profile])) as Record<ResultTypeKey, ResultProfile>;
export const resultMap = resultProfileMap;
