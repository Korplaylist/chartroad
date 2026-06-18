import { buildStudySections, calculateResult } from "/scripts/calculateResult.browser.js";

const app = document.querySelector("#result-app");
const questions = JSON.parse(app.dataset.questions);
const profiles = JSON.parse(app.dataset.profiles);
const articles = JSON.parse(app.dataset.articles);
const answers = JSON.parse(localStorage.getItem("chartroad.answers") || "{}");
const studyItemSlugMap = Object.fromEntries(
  articles.flatMap((article) => (article.studyItems || []).map((item) => [item, article.slug]))
);

const complete = questions.every((question) => answers[question.id]);

function topFive(mainType, subType) {
  const main = profiles[mainType].recommendedStudy;
  const sub = profiles[subType].recommendedStudy;
  const merged = subType === "riskGuardian" ? [sub[0], sub[1], ...main] : [...main, sub[0], sub[1]];
  return [...new Set(merged)].slice(0, 5);
}

function roadmap(study) {
  return [
    `1일차: ${study[0]}의 기본 용어와 차트에서 보이는 위치를 정리합니다.`,
    `2일차: ${study[1]}을 실제 차트에서 5개 이상 찾아봅니다.`,
    `3일차: ${study[2]} 기준이 맞지 않는 상황을 따로 기록합니다.`,
    `4일차: ${study[3]}을 손절 기준 또는 학습 중단 기준과 연결합니다.`,
    `5일차: ${study[4]}을 체크리스트 문장으로 바꿉니다.`,
    "6일차: 메인 유형과 보조 유형의 조심할 점을 비교해 반복 실수를 찾습니다.",
    "7일차: 한 주 동안 만든 기준을 5줄 로드맵으로 요약합니다.",
  ];
}

function studyLink(item) {
  const slug = studyItemSlugMap[item];
  return slug ? `<a href="/learn/${slug}">${item}</a>` : item;
}

function rankArticles(learningStyle, interestedConcept) {
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

function metric(label, value) {
  const rounded = Math.round(value);
  return `<div class="metric"><div class="metric-head"><span>${label}</span><span>${rounded}</span></div><div class="bar"><span style="--value:${rounded}%"></span></div></div>`;
}

function detailCard(label, title, body, options = {}) {
  const tag = options.tag ? ` ${options.tag}` : "";
  const note = options.note ? `<p class="result-detail-note">${options.note}</p>` : "";
  return `
    <article class="card result-detail-card${tag}">
      <small>${label}</small>
      <h3>${title}</h3>
      ${body}
      ${note}
    </article>
  `;
}

if (complete) {
  const result = calculateResult(answers);
  const main = profiles[result.mainType];
  const sub = profiles[result.subType];
  const studySections = buildStudySections(result, profiles);
  const study = studySections.recommendedStudies;
  const recommended = rankArticles(result.personalization.learningStyle, result.personalization.interestedConcept).slice(0, 6);
  const flags = result.riskFlags.length ? result.riskFlags : ["현재 답변에서는 큰 위험 플래그가 강하게 나타나지 않았습니다."];
  const avoid = result.avoidTechniques.length ? result.avoidTechniques : main.avoid.slice(0, 5);

  app.innerHTML = `
    <div class="grid" style="gap:24px">
      <section class="card">
        <div class="result-summary-hero">
          <img class="result-summary-character" src="/assets/results/${result.mainType}.webp" alt="${main.name} 캐릭터 이미지" width="640" height="640" decoding="async" />
          <div>
            <small>진단 신뢰도 ${result.confidence}</small>
            <h1 style="font-size:clamp(32px,5vw,56px); margin-top:8px">당신은 “${main.name}”입니다.</h1>
            <p class="sublead">보조 성향은 “${sub.name}”입니다.</p>
            <p style="margin-top:18px"><strong>한 줄 진단:</strong> ${main.summary}</p>
          </div>
        </div>
        <div class="tag-row">
          <span class="tag">현재 레벨: ${result.levelLabel}</span>
          <span class="tag">학습 레벨: ${result.studyLevel}</span>
          <span class="tag">추천 난이도: ${result.studyTier}</span>
          <span class="tag">추천 시간축: ${result.recommendedTimeframe}</span>
          <span class="tag">관심 시장: ${result.personalization.interestedMarket}</span>
        </div>
      </section>
      <section class="grid cols-3">
        <article class="card"><h3>현재 특징</h3><p class="meta" style="margin-top:10px">${main.description} ${result.personalization.finalGoal}는 목표에 맞춰 기준 중심으로 공부해보세요.</p></article>
        <article class="card"><h3>강점</h3><ul class="list">${main.strengths.map((item) => `<li>${item}</li>`).join("")}</ul></article>
        <article class="card"><h3>조심할 점</h3><ul class="list">${main.cautions.map((item) => `<li>${item}</li>`).join("")}</ul></article>
      </section>
      <section class="card">
        <h2>진단 지표</h2>
        <div class="grid cols-3" style="margin-top:18px">
          ${metric("차트 이해도", result.metrics.currentLevel)}
          ${metric("매매 기준", result.metrics.ruleClarity)}
          ${metric("리스크 관리", result.metrics.riskControl)}
          ${metric("차트 확인 시간", result.metrics.timeAvailability)}
          ${metric("추격매수 위험", result.metrics.chaseRisk)}
          ${metric("익절 기준 이슈", result.metrics.profitTakingIssue)}
        </div>
      </section>
      <section class="split result-detail-grid">
        ${detailCard("리스크 점검", "위험 플래그", `<ul class="list">${flags.map((item) => `<li>${item}</li>`).join("")}</ul>`)}
        ${detailCard("우선순위", "먼저 공부할 것 TOP 5", `<ol class="list">${study.map((item) => `<li>${studyLink(item)}</li>`).join("")}</ol>`)}
      </section>
      <section class="grid cols-3 result-detail-grid">
        ${detailCard("다음 단계", "그다음 공부하면 좋은 심화 기법", `<ol class="list">${studySections.nextStudies.map((item) => `<li>${studyLink(item)}</li>`).join("")}</ol>`)}
        ${detailCard("확장 학습", result.canShowExpertTechniques ? "전문 기법으로 확장하기" : "나중에 도전하면 좋은 고급 기법", `<ol class="list">${studySections.futureExpertStudies.map((item) => `<li>${studyLink(item)}</li>`).join("")}</ol>`, {
          note: result.canShowExpertTechniques ? "현재 답변 기준으로 전문 기법을 학습 후보에 포함할 수 있습니다." : "기초와 실전 기준이 잡힌 뒤 도전하는 편이 좋습니다.",
        })}
        ${detailCard("학습 순서 주의", "지금은 피해야 할 기법", `<ul class="list">${avoid.map((item) => `<li>${item}</li>`).join("")}</ul>`, { tag: "wide-on-mobile" })}
      </section>
      <section class="split result-detail-grid">
        ${detailCard("매매 전 확인", "실전 체크리스트", `<ol class="list">${studySections.practicalChecklist.map((item) => `<li>${item}</li>`).join("")}</ol>`)}
        ${detailCard("일주일 루틴", "7일 공부 로드맵", `<ol class="list">${roadmap(study).map((item) => `<li>${item.replace(/^\\d일차: /, "")}</li>`).join("")}</ol>`)}
      </section>
      <section class="card">
        <h2>추천 콘텐츠</h2>
        <p class="sublead">${result.personalization.learningStyle}, ${result.personalization.interestedConcept} 관심을 반영해 정렬했습니다.</p>
        <div class="grid cols-3" style="margin-top:18px">${recommended.map((article) => `<a class="card" href="/learn/${article.slug}"><small>${article.category}</small><h3 style="margin-top:8px">${article.title}</h3><p class="meta" style="margin-top:10px">${article.summary}</p></a>`).join("")}</div>
      </section>
      <section class="card">
        <h3>면책 문구</h3>
        <p class="meta" style="margin-top:8px">이 사이트의 내용은 투자 판단을 위한 교육용 정보이며, 특정 종목의 매수·매도 추천이 아닙니다. 모든 투자 판단과 책임은 본인에게 있습니다.</p>
        <div class="actions">
          <a class="btn dark" href="/test">다시 테스트하기</a>
          <button class="btn light" id="edit-answers" type="button">답변 수정하기</button>
          <button class="btn light" id="share-result" type="button">결과 공유하기</button>
        </div>
      </section>
    </div>
  `;

  document.querySelector("#edit-answers")?.addEventListener("click", () => (window.location.href = "/test"));
  document.querySelector("#share-result")?.addEventListener("click", async () => {
    const url = `${window.location.origin}/results#${result.mainType}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("결과 유형 링크를 복사했습니다.");
    } catch {
      prompt("결과 유형 링크", url);
    }
  });
}
