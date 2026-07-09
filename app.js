(function () {
  const config = window.diagnosticConfig;
  const form = document.getElementById("diagnosticForm");
  const groups = document.getElementById("questionGroups");
  const progressTitle = document.getElementById("progressTitle");
  const progressDetail = document.getElementById("progressDetail");
  const progressBar = document.getElementById("progressBar");
  const overallScore = document.getElementById("overallScore");
  const overallLevel = document.getElementById("overallLevel");
  const overallSummary = document.getElementById("overallSummary");
  const strongestArea = document.getElementById("strongestArea");
  const strongestSummary = document.getElementById("strongestSummary");
  const priorityArea = document.getElementById("priorityArea");
  const prioritySummary = document.getElementById("prioritySummary");
  const recommendations = document.getElementById("recommendations");
  const chart = document.getElementById("resultsChart");
  const ctx = chart.getContext("2d");
  const storageKey = "qip-op-ex-diagnostic-v1";

  document.title = `${config.title} | ${config.brand}`;
  document.getElementById("introText").textContent = config.intro;

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([key, value]) => {
      if (key === "className") node.className = value;
      else if (key === "text") node.textContent = value;
      else node.setAttribute(key, value);
    });
    (children || []).forEach((child) => {
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  function buildScale() {
    const scaleList = document.getElementById("scaleList");
    config.scale.forEach((item) => {
      scaleList.appendChild(
        el("li", {}, [
          el("strong", { text: String(item.value) }),
          el("span", { text: item.label })
        ])
      );
    });
  }

  function buildQuestions() {
    config.dimensions.forEach((dimension) => {
      const article = el("article", { className: "dimension" });
      article.appendChild(
        el("div", { className: "dimension-header" }, [
          el("h3", { text: dimension.name }),
          el("p", { text: dimension.description })
        ])
      );

      dimension.questions.forEach((question, questionIndex) => {
        const fieldName = `${dimension.id}-${questionIndex}`;
        const fieldset = el("fieldset", { className: "question" }, [
          el("legend", { text: question })
        ]);
        const row = el("div", { className: "rating-row" });
        config.scale.forEach((item) => {
          const input = el("input", {
            type: "radio",
            name: fieldName,
            value: String(item.value),
            "aria-label": `${item.value}: ${item.label}`
          });
          row.appendChild(
            el("label", {}, [
              input,
              el("span", { className: "rating-number", text: String(item.value) }),
              el("span", { className: "rating-label", text: item.label })
            ])
          );
        });
        fieldset.appendChild(row);
        article.appendChild(fieldset);
      });
      groups.appendChild(article);
    });
  }

  function allQuestions() {
    return config.dimensions.flatMap((dimension) =>
      dimension.questions.map((_, questionIndex) => `${dimension.id}-${questionIndex}`)
    );
  }

  function getAnswers() {
    const answers = {};
    allQuestions().forEach((name) => {
      const checked = form.querySelector(`input[name="${name}"]:checked`);
      if (checked) answers[name] = Number(checked.value);
    });
    return answers;
  }

  function setAnswers(answers) {
    Object.entries(answers).forEach(([name, value]) => {
      const input = form.querySelector(`input[name="${name}"][value="${value}"]`);
      if (input) input.checked = true;
    });
    updateResults();
  }

  function dimensionScores(answers) {
    return config.dimensions.map((dimension) => {
      const values = dimension.questions
        .map((_, questionIndex) => answers[`${dimension.id}-${questionIndex}`])
        .filter(Boolean);
      const score = values.length
        ? values.reduce((sum, value) => sum + value, 0) / values.length
        : 0;
      return {
        ...dimension,
        answered: values.length,
        total: dimension.questions.length,
        score
      };
    });
  }

  function getLevel(score) {
    return config.levels.find((level) => score >= level.min && score <= level.max) || config.levels[0];
  }

  function formatScore(score) {
    return score ? score.toFixed(1) : "--";
  }

  function saveAnswers(answers) {
    localStorage.setItem(storageKey, JSON.stringify(answers));
  }

  function drawChart(scores) {
    const width = chart.width;
    const height = chart.height;
    const padding = { top: 28, right: 28, bottom: 72, left: 44 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = height - padding.top - padding.bottom;
    const barGap = 18;
    const barWidth = (plotWidth - barGap * (scores.length - 1)) / scores.length;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "#d9e0e6";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#5b6773";
    ctx.font = "14px Segoe UI, sans-serif";
    for (let value = 1; value <= 5; value += 1) {
      const y = padding.top + plotHeight - ((value - 1) / 4) * plotHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();
      ctx.fillText(String(value), 14, y + 4);
    }

    scores.forEach((item, index) => {
      const x = padding.left + index * (barWidth + barGap);
      const barHeight = item.score ? ((item.score - 1) / 4) * plotHeight : 0;
      const y = padding.top + plotHeight - barHeight;
      ctx.fillStyle = item.score < 3 ? "#c77b2a" : item.score >= 4 ? "#2f7d62" : "#1d5f8f";
      ctx.fillRect(x, y, barWidth, barHeight);
      ctx.fillStyle = "#123c5b";
      ctx.font = "bold 16px Segoe UI, sans-serif";
      ctx.fillText(formatScore(item.score), x + barWidth / 2 - 12, y - 8);
      ctx.save();
      ctx.translate(x + barWidth / 2, height - 16);
      ctx.rotate(-0.55);
      ctx.fillStyle = "#17212b";
      ctx.font = "13px Segoe UI, sans-serif";
      ctx.fillText(item.shortName, 0, 0);
      ctx.restore();
    });
  }

  function updateResults() {
    const answers = getAnswers();
    saveAnswers(answers);

    const totalQuestions = allQuestions().length;
    const answeredCount = Object.keys(answers).length;
    const completePercent = Math.round((answeredCount / totalQuestions) * 100);
    const scores = dimensionScores(answers);
    const answeredScores = scores.filter((score) => score.answered > 0);
    const completeScores = scores.filter((score) => score.answered === score.total);
    const overall = answeredScores.length
      ? answeredScores.reduce((sum, item) => sum + item.score, 0) / answeredScores.length
      : 0;
    const level = getLevel(overall);

    progressBar.value = completePercent;
    progressTitle.textContent = `${completePercent}% complete`;
    progressDetail.textContent = `${answeredCount} of ${totalQuestions} statements answered.`;
    overallScore.textContent = formatScore(overall);
    overallLevel.textContent = answeredScores.length ? level.name : "Incomplete";
    overallSummary.textContent = answeredScores.length
      ? level.summary
      : "Complete the diagnostic to see your maturity level.";

    const sortedComplete = [...completeScores].sort((a, b) => b.score - a.score);
    const strongest = sortedComplete[0];
    const priority = [...completeScores].sort((a, b) => a.score - b.score)[0];

    strongestArea.textContent = strongest ? strongest.name : "--";
    strongestSummary.textContent = strongest
      ? `${strongest.description} Current score: ${formatScore(strongest.score)}.`
      : "Complete all questions in at least one area to see your strongest area.";

    priorityArea.textContent = priority ? priority.name : "--";
    prioritySummary.textContent = priority
      ? priority.recommendation
      : "Complete all questions in at least one area to see your priority area.";

    renderRecommendations(scores);
    drawChart(scores);
    updateEmailLink(scores, overall, level);
  }

  function renderRecommendations(scores) {
    recommendations.innerHTML = "";
    const completeScores = scores.filter((score) => score.answered === score.total);
    if (!completeScores.length) {
      recommendations.appendChild(
        el("article", { className: "recommendation" }, [
          el("h3", { text: "Recommendations will appear here" }),
          el("p", { text: "Complete a full dimension to see recommended academy paths and next actions." })
        ])
      );
      return;
    }

    [...completeScores]
      .sort((a, b) => a.score - b.score)
      .forEach((item, index) => {
        const level = getLevel(item.score);
        recommendations.appendChild(
          el("article", { className: index === 0 ? "recommendation priority" : "recommendation" }, [
            el("h3", { text: `${item.name}: ${formatScore(item.score)} (${level.name})` }),
            el("p", { text: item.recommendation }),
            el("p", {}, [el("strong", { text: "Suggested path: " }), document.createTextNode(item.academyPath)])
          ])
        );
      });
  }

  function updateEmailLink(scores, overall, level) {
    const completed = scores
      .filter((score) => score.answered === score.total)
      .map((score) => `${score.name}: ${formatScore(score.score)}`)
      .join("%0D%0A");
    const body = [
      "I completed the Operational Excellence Diagnostic.",
      "",
      `Overall score: ${formatScore(overall)} (${overall ? level.name : "Incomplete"})`,
      "",
      "Dimension scores:",
      completed || "Incomplete",
      "",
      "I would like to discuss the best next step."
    ].join("%0D%0A");
    document.getElementById("emailResults").href =
      `mailto:info@qualityinpractice.solutions?subject=Operational%20Excellence%20Diagnostic&body=${body}`;
  }

  function loadSavedAnswers() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
      setAnswers(saved);
    } catch {
      updateResults();
    }
  }

  function loadSample() {
    const sample = {};
    config.dimensions.forEach((dimension, dimensionIndex) => {
      dimension.questions.forEach((_, questionIndex) => {
        sample[`${dimension.id}-${questionIndex}`] =
          [2, 3, 4, 3, 2, 3][dimensionIndex] + (questionIndex === 3 ? 1 : 0);
      });
    });
    setAnswers(sample);
    document.getElementById("results").scrollIntoView({ behavior: "smooth" });
  }

  form.addEventListener("change", updateResults);
  document.getElementById("resetDiagnostic").addEventListener("click", () => {
    form.reset();
    localStorage.removeItem(storageKey);
    updateResults();
  });
  document.getElementById("loadSample").addEventListener("click", loadSample);
  document.getElementById("printResults").addEventListener("click", () => window.print());

  buildScale();
  buildQuestions();
  loadSavedAnswers();
})();
