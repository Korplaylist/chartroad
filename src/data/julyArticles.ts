import type { LearnArticle } from "@/types";

type ImageKind = "candle" | "volume" | "structure" | "trend" | "indicator" | "volatility" | "profile" | "risk";

type JulyModule = {
  slug: string;
  keyword: string;
  headline: string;
  summary: string;
  category: LearnArticle["category"];
  concepts: string[];
  structure: string;
  observe: string;
  confirm: string;
  invalidate: string;
  mistake: string;
  practice: string;
  imageKind: ImageKind;
  links: { text: string; href: string }[];
};

export const julyModules: JulyModule[] = [
  { slug:"candle-context", keyword:"캔들 위치 해석", headline:"같은 캔들도 위치에 따라 의미가 달라지는 이유", summary:"캔들 모양을 지지·저항과 추세 위치에 연결해 읽는 방법을 설명합니다.", category:"차트 기초", concepts:["캔들 패턴","지지선/저항선"], structure:"캔들은 몸통과 꼬리만 보는 것이 아니라 선행 추세, 핵심 가격대, 종가 위치를 함께 읽어야 합니다.", observe:"같은 장대양봉이 바닥 지지와 고점 저항에서 각각 어떤 후속 흐름을 만드는지 비교합니다.", confirm:"다음 2~3개 봉의 종가가 기준 가격대를 유지하고 거래량이 움직임을 뒷받침하는지 확인합니다.", invalidate:"신호 봉의 저가나 고가를 바로 반대로 이탈하면 처음 세운 해석을 중단합니다.", mistake:"캔들 이름만 외우고 가격 위치와 다음 봉 확인을 생략하는 것입니다.", practice:"서로 다른 위치의 같은 캔들 20개를 모아 다음 3개 봉 결과를 기록합니다.", imageKind:"candle", links:[{text:"캔들 보는 법",href:"/learn/candle-basics/"},{text:"지지선 저항선",href:"/learn/support-resistance/"}]},
  { slug:"volume-spread", keyword:"거래량과 캔들 폭", headline:"거래량은 큰데 가격이 움직이지 않을 때 읽는 법", summary:"거래량과 캔들 변동폭을 함께 비교해 매수·매도 충돌을 해석합니다.", category:"거래량·수급 해석", concepts:["거래량","캔들 패턴"], structure:"거래량이 늘었는데 몸통이 좁다면 강한 참여에도 가격이 막힌 상태일 수 있습니다.", observe:"거래량 확대와 캔들 폭 확대·축소 조합을 고점, 저점, 박스권에서 나누어 봅니다.", confirm:"다음 봉의 방향과 핵심 가격대 유지 여부로 흡수인지 분출인지 확인합니다.", invalidate:"거래량 한 개만 튄 뒤 가격이 원래 범위로 돌아오면 지속 신호로 보지 않습니다.", mistake:"거래량 증가를 방향과 무관하게 무조건 긍정적으로 해석하는 것입니다.", practice:"거래량 상위 20개 봉의 몸통 폭과 다음날 종가를 표로 정리합니다.", imageKind:"volume", links:[{text:"거래량 보는 법",href:"/learn/volume-basics/"},{text:"거래량과 가격 위치",href:"/learn/volume-price-location/"}]},
  { slug:"support-zone-quality", keyword:"지지·저항 구간 강도", headline:"반응 횟수와 돌파 이력으로 가격대 평가하기", summary:"아무 선이나 긋지 않고 실제 의미 있는 지지·저항 구간을 고르는 기준입니다.", category:"가격 구조 분석", concepts:["지지선/저항선","거래량"], structure:"가격대 강도는 반응 횟수, 머문 시간, 돌파 때 거래량, 최근성으로 평가합니다.", observe:"한 번 급반응한 선과 여러 번 종가가 멈춘 구간을 비교합니다.", confirm:"구간 재시험에서 꼬리보다 종가가 유지되고 반대 방향 거래량이 줄어드는지 봅니다.", invalidate:"구간을 큰 거래량과 긴 몸통으로 통과하고 되돌림에서도 회복하지 못하면 역할이 바뀐 것으로 봅니다.", mistake:"오래된 모든 고점과 저점을 같은 중요도로 표시하는 것입니다.", practice:"차트마다 현재 가격과 가장 가까운 지지·저항 한 구간씩만 선정합니다.", imageKind:"structure", links:[{text:"지지선 저항선 그리는 법",href:"/learn/support-resistance/"},{text:"역할 전환",href:"/learn/support-resistance-flip/"}]},
  { slug:"trendline-slope", keyword:"추세선 기울기", headline:"너무 가파른 추세선이 오래 유지되기 어려운 이유", summary:"추세선의 접점과 기울기 변화로 추세 가속·둔화를 구분합니다.", category:"가격 구조 분석", concepts:["지지선/저항선","이동평균선"], structure:"추세선은 최소 두 접점으로 후보를 만들고 세 번째 반응으로 유효성을 점검합니다.", observe:"완만한 기울기에서 급한 기울기로 바뀌는 구간과 거래량 변화를 봅니다.", confirm:"이탈 후 되돌림에서 기존 추세선이 반대 역할을 하는지 확인합니다.", invalidate:"꼬리 한 번의 침범 뒤 즉시 회복하면 종가 이탈로 확정하지 않습니다.", mistake:"가격에 맞추려고 추세선을 계속 다시 그어 분석 기준을 바꾸는 것입니다.", practice:"같은 차트에 장기·중기 추세선 두 개만 그리고 이탈 시점을 비교합니다.", imageKind:"trend", links:[{text:"추세선 그리는 법",href:"/learn/trendline-basic/"},{text:"추세 이탈 의미",href:"/learn/basic-trend-break-meaning/"}]},
  { slug:"structure-transition", keyword:"시장 구조 전환", headline:"HH·HL에서 LH·LL로 바뀌는 순서", summary:"고점과 저점 배열이 바뀌며 상승 구조가 하락 구조로 전환되는 과정을 설명합니다.", category:"가격 구조 분석", concepts:["지지선/저항선","이동평균선"], structure:"상승 구조는 높은 고점과 높은 저점, 하락 구조는 낮은 고점과 낮은 저점의 반복입니다.", observe:"첫 저점 이탈 뒤 반등이 이전 고점을 회복하는지 낮은 고점에서 멈추는지 봅니다.", confirm:"낮은 고점 형성 후 직전 저점을 종가로 이탈하면 구조 전환 근거가 강해집니다.", invalidate:"직전 고점을 회복해 높은 고점을 만들면 하락 전환 가설을 폐기합니다.", mistake:"저점 한 번 이탈한 것만으로 장기 추세 전체가 바뀌었다고 단정하는 것입니다.", practice:"상승·하락 전환 차트 각각 10개에 HH, HL, LH, LL을 직접 표시합니다.", imageKind:"structure", links:[{text:"다우이론 구조",href:"/learn/dow-theory-structure/"},{text:"시장 구조 HH HL",href:"/learn/intermediate-market-structure-hh-hl-lh-ll/"}]},
  { slug:"breakout-retest", keyword:"돌파 후 재시험", headline:"저항이 지지로 바뀌는 진짜 돌파 확인법", summary:"돌파 순간을 추격하지 않고 되돌림과 역할 전환을 확인하는 방법입니다.", category:"가격 구조 분석", concepts:["지지선/저항선","거래량"], structure:"돌파, 기준 위 종가 유지, 거래량 변화, 되돌림, 지지 확인의 순서로 봅니다.", observe:"돌파 봉의 몸통과 거래량, 되돌림 깊이, 재상승 종가를 함께 기록합니다.", confirm:"되돌림 저점이 돌파 가격대 위에서 유지되고 거래량이 줄면 역할 전환 근거가 생깁니다.", invalidate:"돌파 가격 아래로 빠르게 복귀하고 거래량이 증가하면 실패 돌파로 봅니다.", mistake:"장중 꼬리 돌파만 보고 바로 진입하거나 재시험을 무조건 기다리는 것입니다.", practice:"성공 돌파와 실패 돌파 각 15개를 돌파·재시험·무효화 세 칸으로 정리합니다.", imageKind:"structure", links:[{text:"구조 돌파",href:"/learn/break-of-structure/"},{text:"가짜 돌파",href:"/learn/fake-breakout/"}]},
  { slug:"gap-analysis", keyword:"갭 상승·하락", headline:"갭의 위치와 거래량으로 지속 가능성 판단하기", summary:"갭을 공백 자체가 아니라 선행 추세와 가격대 맥락에서 해석합니다.", category:"가격 구조 분석", concepts:["거래량","지지선/저항선"], structure:"갭은 돌파 갭, 진행 갭, 소진 갭처럼 나온 위치와 이후 유지 여부로 구분합니다.", observe:"갭 당일 종가 위치, 거래량, 다음날 갭 하단 지지 여부를 봅니다.", confirm:"핵심 저항을 넘긴 갭이 하단을 지키고 거래량이 유지되면 지속 근거가 커집니다.", invalidate:"갭을 당일 또는 며칠 안에 큰 음봉으로 메우면 지속 가설이 약해집니다.", mistake:"모든 갭이 반드시 메워진다는 말만 믿고 방향을 단정하는 것입니다.", practice:"갭 30개를 발생 위치와 5일 뒤 갭 유지율로 분류합니다.", imageKind:"structure", links:[{text:"거래량과 가격 위치",href:"/learn/volume-price-location/"},{text:"저항 돌파",href:"/learn/intermediate-breakout-vs-fakeout/"}]},
  { slug:"ma-compression", keyword:"이동평균선 수렴", headline:"이평선이 모일 때 변동성 확대를 준비하는 법", summary:"단기·중기 이동평균선 수렴과 가격 압축을 함께 읽는 기준입니다.", category:"보조지표", concepts:["이동평균선","거래량"], structure:"여러 이동평균선 간격이 좁아지고 가격 변동폭도 줄면 방향 선택 전 압축 구간일 수 있습니다.", observe:"5·20·60일선 간격, 거래량 감소, 박스 상하단을 함께 봅니다.", confirm:"수렴 뒤 박스 경계를 거래량과 긴 몸통으로 돌파하는지 확인합니다.", invalidate:"돌파 직후 평균선 묶음 안으로 돌아오면 방향 신호를 무효화합니다.", mistake:"이평선 수렴만 보고 방향을 미리 예측하는 것입니다.", practice:"수렴 차트 20개에서 돌파 방향과 10일 후 결과를 기록합니다.", imageKind:"trend", links:[{text:"이동평균선 시작",href:"/learn/moving-average-start/"},{text:"정배열과 역배열",href:"/learn/intermediate-ma-bullish-bearish-order/"}]},
  { slug:"vwap-context", keyword:"VWAP 기준선", headline:"평균 체결 가격으로 당일 강약 읽기", summary:"VWAP 위·아래 가격 위치와 재돌파를 당일 차트에서 해석하는 방법입니다.", category:"보조지표", concepts:["이동평균선","거래량"], structure:"VWAP은 거래량을 반영한 평균 가격으로 당일 참여자의 평균 단가 맥락을 보여줍니다.", observe:"가격이 VWAP 위에서 눌림을 지키는지 아래에서 반등이 막히는지 봅니다.", confirm:"VWAP 재돌파 뒤 거래량이 붙고 이전 고점을 회복하는지 확인합니다.", invalidate:"재돌파 직후 VWAP 아래로 종가가 복귀하면 강세 가설을 중단합니다.", mistake:"VWAP 접촉 자체를 자동 매수·매도 신호로 사용하는 것입니다.", practice:"장중 차트 20개에서 VWAP 위 체류 시간과 종가 방향을 기록합니다.", imageKind:"trend", links:[{text:"분봉 일봉 주봉",href:"/learn/timeframe-reading/"},{text:"거래량 기본",href:"/learn/volume-basics/"}]},
  { slug:"rsi-regime", keyword:"RSI 레짐", headline:"상승장과 하락장에서 RSI 범위가 달라지는 이유", summary:"RSI 30·70 숫자보다 추세별 반복 범위를 읽는 방법입니다.", category:"보조지표", concepts:["RSI/MACD","이동평균선"], structure:"상승 추세에서는 RSI 저점이 높게 유지되고 하락 추세에서는 반등 고점이 낮게 제한될 수 있습니다.", observe:"RSI가 반복해서 지지·저항받는 범위와 가격 구조를 비교합니다.", confirm:"가격의 고점·저점 배열과 RSI 범위가 같은 방향을 가리키는지 확인합니다.", invalidate:"가격 구조가 바뀌었는데 과거 RSI 범위를 그대로 적용하지 않습니다.", mistake:"RSI 30과 70을 모든 장세에서 동일한 역추세 신호로 쓰는 것입니다.", practice:"상승·하락·횡보 차트별 RSI 저점과 고점 범위를 표로 만듭니다.", imageKind:"indicator", links:[{text:"RSI 보는 법",href:"/learn/rsi-guide/"},{text:"상승 하락 추세",href:"/learn/basic-uptrend-downtrend/"}]},
  { slug:"macd-histogram", keyword:"MACD 히스토그램", headline:"막대 감소로 추세 힘의 변화를 관찰하는 법", summary:"MACD 교차 이전에 히스토그램 확장·축소를 가격 구조와 함께 읽습니다.", category:"보조지표", concepts:["RSI/MACD","이동평균선"], structure:"히스토그램은 두 선의 간격 변화를 보여주며 확대는 모멘텀 강화, 축소는 둔화 가능성을 나타냅니다.", observe:"가격은 고점을 높이는데 양의 막대가 줄어드는지 비교합니다.", confirm:"히스토그램 둔화 뒤 가격 지지선 이탈이나 구조 전환이 실제로 나타나는지 확인합니다.", invalidate:"가격이 강한 거래량으로 새 고점을 돌파하면 단순 막대 축소만으로 반전을 단정하지 않습니다.", mistake:"히스토그램 색이 바뀌는 순간을 독립적인 매매 신호로 보는 것입니다.", practice:"교차 전 5개 막대 변화와 이후 가격 방향을 30사례 기록합니다.", imageKind:"indicator", links:[{text:"MACD 보는 법",href:"/learn/macd-guide/"},{text:"다이버전스",href:"/learn/divergence-basic/"}]},
  { slug:"bollinger-squeeze", keyword:"볼린저밴드 스퀴즈", headline:"밴드 수축 뒤 방향을 확인하는 순서", summary:"변동성 수축을 방향 예측이 아닌 돌파 준비 상태로 이해합니다.", category:"보조지표", concepts:["볼린저밴드","거래량"], structure:"상단과 하단 밴드 간격이 좁아지면 최근 변동성이 줄었다는 뜻이지 상승을 보장하지 않습니다.", observe:"밴드 폭, 중심선 기울기, 거래량, 박스 경계를 함께 표시합니다.", confirm:"밴드 확장과 동시에 가격이 박스 밖에서 종가를 유지하는지 확인합니다.", invalidate:"밴드 밖으로 나간 뒤 즉시 중심선 안쪽으로 복귀하면 실패 가능성을 봅니다.", mistake:"수축 자체를 매수 신호로 생각하거나 밴드 접촉만으로 역추세 진입하는 것입니다.", practice:"스퀴즈 20개에서 최초 이탈 방향과 실패 여부를 분류합니다.", imageKind:"volatility", links:[{text:"볼린저밴드",href:"/learn/bollinger-band/"},{text:"박스권",href:"/learn/box-range/"}]},
  { slug:"atr-volatility", keyword:"ATR 변동성", headline:"종목마다 다른 손절 폭을 숫자로 비교하는 법", summary:"ATR을 방향 지표가 아니라 평균 변동폭과 손절 거리 측정 도구로 사용합니다.", category:"리스크 관리", concepts:["손익비/손절","이동평균선"], structure:"ATR은 일정 기간의 실제 변동폭 평균으로 가격 단위가 다른 종목의 흔들림을 이해하게 돕습니다.", observe:"현재 ATR과 최근 변동성 확대·축소, 지지선까지 거리를 비교합니다.", confirm:"구조상 무효화 위치가 평소 변동폭보다 충분히 떨어져 있는지 확인합니다.", invalidate:"ATR 배수만 기계적으로 쓰고 실제 지지·저항을 무시하지 않습니다.", mistake:"ATR 상승을 가격 상승 신호로 오해하거나 모든 종목에 같은 원화 손절폭을 쓰는 것입니다.", practice:"10개 종목의 ATR 비율과 하루 평균 고저폭을 비교합니다.", imageKind:"volatility", links:[{text:"손절선 잡는 법",href:"/learn/stop-loss-basic/"},{text:"ATR 포지션 크기",href:"/learn/expert-atr-position-sizing/"}]},
  { slug:"adx-strength", keyword:"ADX 추세 강도", headline:"방향과 강도를 분리해서 보는 방법", summary:"ADX와 DI를 이용해 추세 방향이 아닌 추세 강도를 먼저 구분합니다.", category:"보조지표", concepts:["이동평균선","RSI/MACD"], structure:"ADX는 방향이 아니라 추세 강도를 나타내며 +DI와 -DI가 방향 맥락을 보조합니다.", observe:"ADX 상승·하락과 가격의 고점·저점 배열이 일치하는지 봅니다.", confirm:"구조 돌파 뒤 ADX가 상승하고 방향 DI가 우세해지는지 확인합니다.", invalidate:"박스권에서 DI 교차만 반복되면 추세 신호의 신뢰도를 낮춥니다.", mistake:"ADX가 높다는 이유로 무조건 상승장이라고 해석하는 것입니다.", practice:"추세장과 박스권 각각 15개에서 ADX 범위와 손익 결과를 비교합니다.", imageKind:"indicator", links:[{text:"ADX 추세 강도",href:"/learn/advanced-adx-trend-strength/"},{text:"추세 구조",href:"/learn/expert-dow-trend-structure/"}]},
  { slug:"stochastic-context", keyword:"스토캐스틱 위치", headline:"과매수·과매도를 추세와 함께 읽는 법", summary:"스토캐스틱의 빠른 움직임을 가격 위치와 추세 필터로 보완합니다.", category:"보조지표", concepts:["RSI/MACD","지지선/저항선"], structure:"스토캐스틱은 최근 범위에서 종가 위치를 보여주므로 박스권에서 빠르게 반응합니다.", observe:"지표 교차가 핵심 지지·저항과 같은 위치에서 발생하는지 봅니다.", confirm:"지표 반전 뒤 가격도 기준선을 종가로 회복하거나 이탈하는지 확인합니다.", invalidate:"강한 추세에서 과열 구간에 오래 머물면 역추세 신호로 사용하지 않습니다.", mistake:"과매수면 매도, 과매도면 매수라는 한 줄 규칙으로 쓰는 것입니다.", practice:"박스권과 추세장에서 같은 설정의 성과 차이를 기록합니다.", imageKind:"indicator", links:[{text:"스토캐스틱 RSI",href:"/learn/expert-stochastic-rsi/"},{text:"RSI 기본",href:"/learn/rsi-guide/"}]},
  { slug:"ichimoku-context", keyword:"일목균형표 구름대", headline:"구름의 두께와 기준선으로 추세 맥락 읽기", summary:"일목균형표를 선 여러 개가 아닌 지지·저항과 균형 구조로 이해합니다.", category:"보조지표", concepts:["이동평균선","지지선/저항선"], structure:"가격과 기준선, 전환선, 구름대 위치를 위·안·아래 세 상태로 단순화합니다.", observe:"얇은 구름과 두꺼운 구름에서 돌파 후 유지 차이를 봅니다.", confirm:"가격이 구름 밖에서 종가를 유지하고 기준선 기울기가 방향을 지지하는지 확인합니다.", invalidate:"구름 돌파 직후 다시 구름 안으로 들어가면 추세 신호를 보류합니다.", mistake:"모든 선의 교차를 각각 매매 신호로 해석해 차트를 복잡하게 만드는 것입니다.", practice:"가격이 구름 위·안·아래인 차트를 각각 10개 수집합니다.", imageKind:"indicator", links:[{text:"일목균형표",href:"/learn/expert-ichimoku-cloud/"},{text:"일목 기준선",href:"/learn/expert-ichimoku-cloud-kijun/"}]},
  { slug:"volume-profile", keyword:"거래량 프로파일", headline:"POC·고거래량·저거래량 구간 읽기", summary:"가격대별 거래량으로 시장이 오래 머문 곳과 빠르게 통과한 곳을 구분합니다.", category:"거래량·수급 해석", concepts:["거래량","지지선/저항선"], structure:"POC는 가장 많은 거래가 쌓인 가격대, HVN은 수용 구간, LVN은 빠른 이동 구간으로 봅니다.", observe:"현재 가격이 POC 위인지 아래인지와 이전 HVN 재시험 반응을 확인합니다.", confirm:"가격대별 거래량 구간과 실제 캔들 지지·저항이 겹치는지 봅니다.", invalidate:"프로파일만 보고 시간 순서와 최근 구조 변화를 무시하지 않습니다.", mistake:"POC를 반드시 돌아오는 자석 가격처럼 고정적으로 해석하는 것입니다.", practice:"고정 구간 프로파일 10개에서 POC와 종가 위치를 기록합니다.", imageKind:"profile", links:[{text:"볼륨 프로파일 POC",href:"/learn/expert-volume-profile-poc/"},{text:"HVN LVN",href:"/learn/advanced-volume-profile-hvn-lvn/"}]},
  { slug:"fibonacci-confluence", keyword:"피보나치 중첩", headline:"비율 하나보다 겹치는 가격대를 찾는 법", summary:"되돌림 비율을 지지·저항, 이동평균선, 구조와 중첩해 해석합니다.", category:"고급 차트 기술", concepts:["지지선/저항선","이동평균선"], structure:"피보나치는 명확한 스윙 고점과 저점을 기준으로 되돌림 후보 가격대를 계산합니다.", observe:"0.382·0.5·0.618 부근에 이전 고점, 지지, 평균선이 겹치는지 봅니다.", confirm:"중첩 구간에서 캔들 반응과 거래량 회복이 실제로 나타나는지 확인합니다.", invalidate:"기준 스윙 저점을 이탈하면 해당 되돌림 가설을 다시 계산합니다.", mistake:"원하는 가격에 맞도록 시작점과 끝점을 계속 바꾸는 것입니다.", practice:"같은 추세에서 스윙 기준을 고정하고 반응률을 20사례 기록합니다.", imageKind:"structure", links:[{text:"피보나치 PRZ",href:"/learn/fibonacci-prz/"},{text:"피보나치 확장",href:"/learn/expert-fibonacci-extension-target/"}]},
  { slug:"elliott-alternation", keyword:"엘리엇파동 교대 법칙", headline:"2파와 4파 조정이 다르게 나타나는 이유", summary:"엘리엇파동의 교대 원칙을 깊이·기간·패턴 차이로 이해합니다.", category:"고급 차트 기술", concepts:["지지선/저항선","손익비/손절"], structure:"2파가 급하고 깊었다면 4파는 복잡하고 옆으로 길어지는 식의 차이를 관찰합니다.", observe:"지그재그, 플랫, 삼각형 조정이 어느 파동 위치에 나타났는지 봅니다.", confirm:"파동 규칙과 구조 무효화 기준을 먼저 확인한 뒤 교대 원칙을 보조로 사용합니다.", invalidate:"3파가 가장 짧거나 4파가 1파 영역을 침범하면 기본 카운팅을 재검토합니다.", mistake:"교대 법칙을 반드시 지켜지는 고정 규칙으로 사용하는 것입니다.", practice:"완성된 5파 구조 15개에서 2파와 4파의 깊이·기간을 비교합니다.", imageKind:"structure", links:[{text:"엘리엇 기본 구조",href:"/learn/expert-elliott-wave-basic-structure/"},{text:"ABC 조정",href:"/learn/expert-abc-correction/"}]},
  { slug:"wyckoff-phase", keyword:"와이코프 단계", headline:"축적과 분산을 사건이 아닌 과정으로 읽는 법", summary:"PS·SC·AR·ST와 스프링·업스러스트를 범위 전체 맥락에서 설명합니다.", category:"고급 차트 기술", concepts:["거래량","지지선/저항선"], structure:"와이코프는 한 캔들 이름보다 박스 형성, 시험, 이탈, 재진입의 순서를 봅니다.", observe:"범위 상하단 반응과 거래량, 스프레드 변화를 단계별로 기록합니다.", confirm:"스프링 후 범위 안 회복이나 업스러스트 후 범위 안 복귀를 종가로 확인합니다.", invalidate:"범위 밖에서 가격과 거래량이 지속되면 반대 가설로 전환합니다.", mistake:"아래꼬리 하나를 모두 스프링으로, 윗꼬리 하나를 모두 업스러스트로 부르는 것입니다.", practice:"축적·분산 사례 각 10개를 사건 순서표로 정리합니다.", imageKind:"volume", links:[{text:"와이코프 기본",href:"/learn/wyckoff-basic/"},{text:"스프링 업스러스트",href:"/learn/expert-spring-upthrust/"}]},
  { slug:"continuation-pattern", keyword:"추세 지속 패턴", headline:"플래그·페넌트·삼각형을 구분하는 기준", summary:"지속형 패턴을 선행 추세, 조정 깊이, 거래량, 돌파로 비교합니다.", category:"가격 구조 분석", concepts:["거래량","지지선/저항선"], structure:"지속 패턴은 강한 선행 움직임 뒤 비교적 얕은 조정과 변동성 수축이 핵심입니다.", observe:"조정 기간이 선행 추세보다 지나치게 길거나 깊지 않은지 봅니다.", confirm:"추세 방향 돌파와 거래량 회복, 돌파 후 유지가 함께 나타나는지 확인합니다.", invalidate:"조정이 선행 움직임의 시작점을 훼손하면 지속 패턴 가설을 중단합니다.", mistake:"모양만 비슷하면 선행 추세 없이도 지속형으로 분류하는 것입니다.", practice:"플래그·페넌트·삼각형 각 10개를 같은 체크리스트로 비교합니다.", imageKind:"structure", links:[{text:"불 플래그",href:"/learn/bull-flag-pattern/"},{text:"대칭 삼각형",href:"/learn/symmetrical-triangle-pattern/"}]},
  { slug:"reversal-confirmation", keyword:"반전 패턴 확인", headline:"예측보다 목선과 구조 전환을 기다리는 이유", summary:"이중바닥·헤드앤숄더 등 반전형의 공통 확인 절차를 정리합니다.", category:"가격 구조 분석", concepts:["지지선/저항선","거래량"], structure:"반전 패턴은 선행 추세, 반복 실패, 목선 돌파·이탈, 되돌림 순서로 봅니다.", observe:"두 번째 고점·저점의 힘과 목선 부근 거래량을 비교합니다.", confirm:"목선 종가 돌파와 고점·저점 배열 변화가 동시에 확인되는지 봅니다.", invalidate:"목선을 넘지 못하거나 마지막 극값을 다시 갱신하면 반전 가설을 폐기합니다.", mistake:"바닥이나 천장 모양이 보이자마자 확인 전에 진입하는 것입니다.", practice:"성공·실패 반전 패턴 각 15개에서 확인 시점을 표시합니다.", imageKind:"structure", links:[{text:"헤드앤숄더",href:"/learn/head-and-shoulders-pattern/"},{text:"이중바닥",href:"/learn/intermediate-double-bottom/"}]},
  { slug:"multi-timeframe-alignment", keyword:"멀티 타임프레임 정렬", headline:"주봉·일봉·4시간봉 역할을 나누는 법", summary:"상위 시간축은 방향, 중간 시간축은 구조, 하위 시간축은 실행에 사용하는 방법입니다.", category:"매매 전략 설계", concepts:["이동평균선","지지선/저항선"], structure:"시간축마다 같은 질문을 반복하지 않고 역할을 분리해야 충돌을 줄일 수 있습니다.", observe:"주봉 저항, 일봉 추세, 4시간봉 진입 구조가 같은 방향인지 봅니다.", confirm:"상위 시간축 핵심 가격대를 훼손하지 않는 범위에서 하위 시간축 신호를 사용합니다.", invalidate:"하위 시간축 신호가 상위 시간축 강한 저항과 정면 충돌하면 보류합니다.", mistake:"손실이 나면 더 낮거나 높은 시간축으로 이동해 근거를 바꾸는 것입니다.", practice:"한 종목을 세 시간축으로 캡처해 방향·구조·실행을 한 줄씩 적습니다.", imageKind:"trend", links:[{text:"시간축 보는 법",href:"/learn/timeframe-reading/"},{text:"멀티 타임프레임",href:"/learn/expert-multi-timeframe-connection/"}]},
  { slug:"position-risk", keyword:"포지션 위험 계산", headline:"손절폭에 따라 수량을 먼저 줄이는 공식", summary:"계좌 위험 한도와 손절 거리를 이용해 진입 수량을 계산합니다.", category:"리스크 관리", concepts:["손익비/손절"], structure:"허용 손실금액을 진입가와 손절가 차이로 나누면 기본 수량을 계산할 수 있습니다.", observe:"변동성이 큰 종목일수록 같은 위험 한도에서 수량이 줄어드는지 확인합니다.", confirm:"수수료와 슬리피지를 포함해 최악의 손실이 계좌 한도 안인지 봅니다.", invalidate:"손절가를 멀리 옮겨 수량 계산의 전제를 바꾸지 않습니다.", mistake:"사고 싶은 수량을 먼저 정한 뒤 손절선을 억지로 맞추는 것입니다.", practice:"가상 계좌로 손절폭 2·5·10% 상황의 수량을 각각 계산합니다.", imageKind:"risk", links:[{text:"포지션 사이징",href:"/learn/position-sizing/"},{text:"고정 비율 사이징",href:"/learn/expert-fixed-fractional-position-sizing/"}]},
  { slug:"backtest-sample", keyword:"백테스트 표본", headline:"승률보다 먼저 표본 수와 조건을 통제하는 법", summary:"전략 검증에서 표본 편향과 조건 변경을 줄이는 기본 절차입니다.", category:"매매 전략 설계", concepts:["손익비/손절"], structure:"셋업 정의, 진입·청산 규칙 고정, 표본 수집, 비용 반영, 결과 분리 순서로 진행합니다.", observe:"강세장·약세장·횡보장에서 결과가 얼마나 달라지는지 봅니다.", confirm:"훈련 표본과 검증 표본을 나누고 동일 규칙으로 재현되는지 확인합니다.", invalidate:"결과를 본 뒤 조건을 계속 추가하면 과최적화로 판단합니다.", mistake:"몇 개 성공 사례만 모아 전략이 검증됐다고 생각하는 것입니다.", practice:"최소 50개 표본을 동일한 열로 기록하고 장세별로 분리합니다.", imageKind:"risk", links:[{text:"셋업 성과 추적",href:"/learn/advanced-setup-performance-tracking/"},{text:"기대값",href:"/learn/expected-value-basic/"}]},
  { slug:"execution-psychology", keyword:"매매 실행 심리", headline:"계획을 알고도 지키지 못하는 순간 기록하기", summary:"추격·물타기·손절 지연을 감정이 아니라 실행 오류로 분석합니다.", category:"매매 전략 설계", concepts:["손익비/손절"], structure:"행동 전 신호, 실제 행동, 즉시 감정, 규칙 위반, 다음 예방 장치를 기록합니다.", observe:"손실 뒤 수량 증가나 급등 추격처럼 반복되는 상황을 찾습니다.", confirm:"예방 장치를 적용한 뒤 같은 오류 빈도가 실제로 줄어드는지 봅니다.", invalidate:"의지만 강조하고 수량 제한·주문 방식 같은 환경을 바꾸지 않으면 개선으로 보지 않습니다.", mistake:"결과가 좋으면 규칙 위반도 좋은 판단이었다고 합리화하는 것입니다.", practice:"최근 20회 거래에서 규칙 위반만 별도 태그로 분류합니다.", imageKind:"risk", links:[{text:"매매일지 태그",href:"/learn/trading-journal-tags/"},{text:"매수 전 체크리스트",href:"/learn/basic-buy-checklist/"}]},
  { slug:"liquidity-sweep", keyword:"유동성 스윕", headline:"전고점·전저점 돌파 후 빠른 복귀 읽기", summary:"유동성 스윕을 단순 꼬리가 아니라 기준선 돌파와 종가 복귀 구조로 설명합니다.", category:"고급 차트 기술", concepts:["지지선/저항선","거래량"], structure:"많은 주문이 모인 이전 고점·저점을 잠시 넘은 뒤 범위 안으로 빠르게 돌아오는 움직임을 봅니다.", observe:"돌파 폭, 거래량, 종가 복귀, 반대 방향 후속 구조를 확인합니다.", confirm:"기준 안 종가 복귀와 하위 구조 전환이 함께 나타나는지 봅니다.", invalidate:"돌파 뒤 기준 밖에서 가격이 유지되면 스윕이 아니라 정상 돌파 가능성을 우선합니다.", mistake:"모든 긴 꼬리를 기관의 유동성 사냥으로 설명하는 것입니다.", practice:"전고점·전저점 돌파 30개를 유지와 복귀 두 그룹으로 나눕니다.", imageKind:"structure", links:[{text:"유동성 그랩",href:"/learn/expert-liquidity-grab/"},{text:"가짜 돌파",href:"/learn/fake-breakout/"}]},
];

const lessonVariants = [
  { suffix:"guide", title:(m:JulyModule)=>`${m.keyword} 뜻과 구조: ${m.headline}`, angle:"핵심 개념과 구조", focus:(m:JulyModule)=>m.structure },
  { suffix:"chart-check", title:(m:JulyModule)=>`${m.keyword} 차트 찾는 법: 확인 순서와 체크포인트`, angle:"실제 차트 판별", focus:(m:JulyModule)=>m.observe },
  { suffix:"failure", title:(m:JulyModule)=>`${m.keyword} 실패 신호: 무효화 조건과 흔한 실수`, angle:"실패와 무효화", focus:(m:JulyModule)=>m.invalidate },
  { suffix:"practice", title:(m:JulyModule)=>`${m.keyword} 연습법: 사례 수집부터 복기까지`, angle:"반복 학습과 복기", focus:(m:JulyModule)=>m.practice },
];

const moduleLinks = (module: JulyModule) => module.links.map((link) => `<a href="${link.href}">${link.text}</a>`).join(", ");

const makeBody = (module: JulyModule, title: string, angle: string, focus: string, previous?: {slug:string;title:string}, next?: {slug:string;title:string}) => [
  `<p><strong>${title}</strong>은 ${module.summary} 이 글의 학습 초점은 ${angle}이며, 특정 종목의 매수·매도를 추천하지 않는 교육 자료입니다.</p><p>${focus} 차트 기법은 이름을 맞히는 문제가 아니라 관찰 조건, 확인 조건, 무효화 조건을 같은 순서로 반복하는 훈련입니다.</p>`,
  `<h2>${module.keyword}을 공부하기 전에 알아둘 것</h2><p>${module.structure}</p><p>선행 개념으로 ${moduleLinks(module)}을 먼저 확인하면 현재 글의 기준을 더 쉽게 연결할 수 있습니다. 한 가지 신호보다 가격 위치, 시간축, 거래량, 리스크를 함께 보는 습관이 중요합니다.</p>`,
  `<h2>실제 차트에서 찾는 순서</h2><ol><li>선행 추세와 현재 가격 위치를 확인합니다.</li><li>${module.observe}</li><li>${module.confirm}</li><li>판단이 틀렸다고 볼 가격을 먼저 표시합니다.</li><li>다음 3~10개 봉의 결과를 기록해 가설을 검증합니다.</li></ol>`,
  `<h2>확인 기준과 무효화 기준</h2><p><strong>확인 기준:</strong> ${module.confirm}</p><p><strong>무효화 기준:</strong> ${module.invalidate}</p><p>확인과 무효화를 진입 전에 함께 적어야 결과가 불리할 때 기준을 바꾸는 실수를 줄일 수 있습니다.</p>`,
  `<h2>초보자가 자주 하는 실수</h2><p>${module.mistake}</p><p>좋은 사례만 모으면 모든 차트가 기법에 맞아 보입니다. 성공 사례와 실패 사례를 같은 수로 비교하고, 결과를 가린 상태에서 먼저 판단해보세요.</p>`,
  `<h2>${module.keyword} 학습 연습</h2><p>${module.practice}</p><ul><li>차트 캡처 날짜와 시간축을 적습니다.</li><li>기준 가격대와 확인 봉을 표시합니다.</li><li>무효화 가격과 예상 손실폭을 기록합니다.</li><li>결과보다 규칙을 지켰는지 평가합니다.</li></ul>`,
  `<h2>학습 체크리스트</h2><ul><li>선행 추세와 가격 위치를 확인했나요?</li><li>종가와 거래량으로 확인했나요?</li><li>무효화 기준을 숫자로 적었나요?</li><li>다른 시간축과 충돌하지 않나요?</li><li>성공·실패 사례를 함께 복기했나요?</li></ul>${previous ? `<p>이전 단계: <a href="/learn/${previous.slug}/">${previous.title}</a></p>` : ""}${next ? `<p>다음 단계: <a href="/learn/${next.slug}/">${next.title}</a></p>` : ""}`,
];

const rawTopics = julyModules.flatMap((module) => lessonVariants.map((variant) => ({
  module,
  slug: `${module.slug}-${variant.suffix}`,
  title: variant.title(module),
  angle: variant.angle,
  focus: variant.focus(module),
}))).slice(0, 105);

const seededRandom = (seed: number) => {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
};
const randInt = (random: () => number, min: number, max: number) => min + Math.floor(random() * (max - min + 1));
const julySlots = (() => {
  const random = seededRandom(20260706);
  const slots: string[] = [];
  const start = Date.UTC(2026, 6, 6);
  let day = 0;
  while (slots.length < rawTopics.length) {
    const minutes = new Set<number>();
    const count = randInt(random, 3, 5);
    while (minutes.size < count) minutes.add(randInt(random, 7 * 60, 10 * 60));
    const date = new Date(start + day * 86400000);
    const dateKey = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2,"0")}-${String(date.getUTCDate()).padStart(2,"0")}`;
    [...minutes].sort((a,b)=>a-b).forEach((minute) => slots.push(`${dateKey}T${String(Math.floor(minute/60)).padStart(2,"0")}:${String(minute%60).padStart(2,"0")}:00+09:00`));
    day += 1;
  }
  return slots.slice(0, rawTopics.length);
})();

export const julyArticles: LearnArticle[] = rawTopics.map((topic, index) => {
  const previous = rawTopics[index - 1];
  const next = rawTopics[index + 1];
  const publishedAt = julySlots[index];
  return {
    slug: topic.slug,
    title: topic.title,
    summary: `${topic.module.summary} ${topic.angle}을 중심으로 확인 기준과 실패 조건, 연습 방법까지 설명합니다.`,
    category: topic.module.category,
    concepts: topic.module.concepts,
    style: ["실제 차트 예시 위주", "체크리스트 형태", "개념부터 차근차근"],
    seoKeywords: [topic.module.keyword, topic.title, `${topic.module.keyword} 보는 법`, `${topic.module.keyword} 실패`, `${topic.module.keyword} 연습`],
    searchIntent: `${topic.module.keyword}의 ${topic.angle}을 정확히 배우려는 검색 의도`,
    publishedAt,
    updatedAt: publishedAt,
    body: [],
    bodyHtml: makeBody(topic.module, topic.title, topic.angle, topic.focus, previous, next),
    images: [{
      src: `/assets/july/${topic.slug}.svg?v=1`,
      alt: `${topic.title}을 실제 차트 구조로 설명하는 한국어 교육 이미지`,
      caption: `${topic.module.keyword}은 모양보다 관찰·확인·무효화 순서로 학습해야 합니다.`,
    }],
    studyItems: [topic.module.keyword, topic.angle],
    faq: [
      { question: `${topic.module.keyword}만으로 매매 방향을 결정해도 되나요?`, answer: "아니요. 단일 기법은 교육용 관찰 도구이며 가격 위치, 거래량, 시간축, 무효화 기준을 함께 확인해야 합니다." },
      { question: `${topic.module.keyword}을 가장 효과적으로 연습하는 방법은 무엇인가요?`, answer: `${topic.module.practice} 성공 사례와 실패 사례를 같은 기준으로 비교해야 합니다.` },
    ],
  };
});

export const julyArticleCount = julyArticles.length;
