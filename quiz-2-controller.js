(function () {
  const QUESTIONS = Array.isArray(window.QUIZ_2_QUESTIONS)
    ? window.QUIZ_2_QUESTIONS
    : [];
  if (!QUESTIONS.length) return;
  const STORAGE_KEY = "aws-clf-c02-quiz-2-markdown-v1";
  const EXAM_SECONDS = 140 * 60;

  const state = {
    started: false,
    submitted: false,
    mode: "study",
    selectedDomain: "all",
    timerEnabled: true,
    shuffleEnabled: false,
    order: QUESTIONS.map(q => q.id),
    currentPosition: 0,
    answers: {},
    review: [],
    checked: [],
    secondsRemaining: EXAM_SECONDS,
    startedAt: null
  };

  let timerHandle = null;

  const byId = id => document.getElementById(id);
  const startPanel = byId("practice5StartPanel");
  const examPanel = byId("practice5ExamPanel");
  const resultsPanel = byId("practice5ResultsPanel");
  const questionCard = byId("practice5QuestionCard");
  const questionGrid = byId("practice5QuestionGrid");

  function questionsForDomain(domain) {
    return domain === "all"
      ? QUESTIONS
      : QUESTIONS.filter(question => question.domain === domain);
  }

  function attemptQuestions() {
    const attemptIds = new Set(state.order);
    return QUESTIONS.filter(question => attemptIds.has(question.id));
  }

  function getQuestion(id) {
    return QUESTIONS.find(q => q.id === id);
  }

  function currentQuestion() {
    return getQuestion(state.order[state.currentPosition]);
  }

  function arraysEqual(a, b) {
    const aa = [...a].sort((x, y) => x - y);
    const bb = [...b].sort((x, y) => x - y);
    return aa.length === bb.length && aa.every((v, i) => v === bb[i]);
  }

  function shuffled(values) {
    const copy = [...values];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    updateResumeButton();
  }

  function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return false;

    try {
      const parsedState = JSON.parse(saved);
      Object.assign(state, parsedState);
      state.selectedDomain = state.selectedDomain || "all";
      const expectedIds = questionsForDomain(state.selectedDomain).map(q => q.id);
      const expectedIdSet = new Set(expectedIds);
      state.order = Array.isArray(state.order) &&
        state.order.length === expectedIds.length &&
        state.order.every(id => expectedIdSet.has(id))
        ? state.order
        : expectedIds;
      state.answers = state.answers || {};
      state.review = state.review || [];
      state.checked = state.checked || [];
      return true;
    } catch (error) {
      console.warn("Could not load practice exam state", error);
      return false;
    }
  }

  function clearState() {
    localStorage.removeItem(STORAGE_KEY);
    Object.assign(state, {
      started: false,
      submitted: false,
      mode: "study",
      selectedDomain: "all",
      timerEnabled: true,
      shuffleEnabled: false,
      order: QUESTIONS.map(q => q.id),
      currentPosition: 0,
      answers: {},
      review: [],
      checked: [],
      secondsRemaining: EXAM_SECONDS,
      startedAt: null
    });
    stopTimer();
    updateResumeButton();
  }

  function updateResumeButton() {
    const button = byId("resumeQuiz2");
    if (!button) return;
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      button.hidden = !(saved && saved.started && !saved.submitted);
    } catch {
      button.hidden = true;
    }
  }

  function formatTime(seconds) {
    const safe = Math.max(0, seconds);
    const minutes = Math.floor(safe / 60);
    const remainder = safe % 60;
    return String(minutes).padStart(2, "0") + ":" + String(remainder).padStart(2, "0");
  }

  function updateTimer() {
    const timer = byId("practice5Timer");
    if (!timer) return;
    timer.hidden = !state.timerEnabled;
    timer.textContent = formatTime(state.secondsRemaining);
    timer.classList.toggle("is-low", state.secondsRemaining <= 300);
  }

  function startTimer() {
    stopTimer();
    if (!state.timerEnabled || state.submitted) {
      updateTimer();
      return;
    }

    timerHandle = window.setInterval(function () {
      state.secondsRemaining -= 1;
      updateTimer();

      if (state.secondsRemaining % 10 === 0) saveState();

      if (state.secondsRemaining <= 0) {
        stopTimer();
        submitExam(true);
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerHandle) {
      window.clearInterval(timerHandle);
      timerHandle = null;
    }
  }

  function domainColor(domain) {
    return {
      "Domain 1": "#7c3aed",
      "Domain 2": "#e11d48",
      "Domain 3": "#2563eb",
      "Domain 4": "#16a34a"
    }[domain] || "#2563eb";
  }

  function renderNavigator() {
    questionGrid.innerHTML = "";

    state.order.forEach(function (questionId, position) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "practice-question-number";
      button.textContent = String(position + 1);
      button.title = "Question " + questionId;

      const answer = state.answers[String(questionId)] || [];
      if (answer.length) button.classList.add("answered");
      if (state.review.includes(questionId)) button.classList.add("review");
      if (position === state.currentPosition) button.classList.add("current");

      if (state.submitted) {
        const question = getQuestion(questionId);
        button.classList.add(
          arraysEqual(answer, question.correct)
            ? "correct-after-submit"
            : "incorrect-after-submit"
        );
      }

      button.addEventListener("click", function () {
        state.currentPosition = position;
        saveState();
        renderQuestion();
      });

      questionGrid.appendChild(button);
    });
  }

  function renderAnswerPanel(question) {
    const selected = state.answers[String(question.id)] || [];
    const correct = arraysEqual(selected, question.correct);
    const answerText = question.correct
      .map(index => String.fromCharCode(65 + index) + ". " + question.options[index])
      .join("<br>");

    return `
      <div class="practice-answer-panel ${correct ? "" : "is-incorrect"}">
        <h4>${correct ? "Correct" : "Review this answer"}</h4>
        <p><strong>Correct answer${question.correct.length > 1 ? "s" : ""}:</strong><br>${answerText}</p>
        <p>${question.explanation}</p>
        <div class="practice-trigger-line">
          <strong>Exam trigger:</strong>
          <span>${question.trigger}</span>
        </div>
        ${question.review ? `
          <div class="practice-review-detail">
            <strong>Reviewed-content note:</strong>
            ${question.review}
          </div>
        ` : ""}
      </div>
    `;
  }

  function shouldReveal(question) {
    return state.submitted ||
      (state.mode === "study" && state.checked.includes(question.id));
  }

  function renderQuestion() {
    const question = currentQuestion();
    if (!question) return;

    const selected = state.answers[String(question.id)] || [];
    const reveal = shouldReveal(question);

    byId("practice5QuestionCounter").textContent =
      "Question " + (state.currentPosition + 1) + " of " + state.order.length;

    const domainLabel = byId("practice5DomainLabel");
    domainLabel.textContent = question.domain;
    domainLabel.dataset.domain = question.domain;

    const answeredCount = Object.values(state.answers)
      .filter(answer => Array.isArray(answer) && answer.length).length;
    byId("practice5AnsweredCounter").textContent =
      answeredCount + " answered";

    const reviewButton = byId("practice5MarkReview");
    const isReview = state.review.includes(question.id);
    reviewButton.classList.toggle("active", isReview);
    reviewButton.textContent = isReview
      ? "★ Marked for review"
      : "☆ Mark for review";

    byId("practice5Previous").disabled = state.currentPosition === 0;
    byId("practice5Next").textContent =
      state.currentPosition === state.order.length - 1
        ? "Return to first →"
        : "Next →";

    const checkButton = byId("practice5CheckAnswer");
    checkButton.hidden = state.mode !== "study" || state.submitted;
    checkButton.disabled = selected.length === 0;
    checkButton.textContent = reveal ? "Answer checked" : "Check answer";

    const optionType = question.multiple ? "checkbox" : "radio";
    const instruction = question.multiple
      ? "Select " + question.correct.length + " answers."
      : "Select the best answer.";

    const optionsHtml = question.options.map(function (option, index) {
      const isSelected = selected.includes(index);
      const isCorrect = question.correct.includes(index);
      const classes = ["practice-option"];
      if (isSelected) classes.push("selected");
      if (reveal && isCorrect) classes.push("correct-answer");
      if (reveal && isSelected && !isCorrect) classes.push("incorrect-answer");

      return `
        <label class="${classes.join(" ")}">
          <input
            type="${optionType}"
            name="practice-question-${question.id}"
            value="${index}"
            ${isSelected ? "checked" : ""}
            ${state.submitted || reveal ? "disabled" : ""}
          >
          <span class="practice-option-main">
            <span class="practice-option-letter">${String.fromCharCode(65 + index)}</span>
            <span>${option}</span>
          </span>
        </label>
      `;
    }).join("");

    questionCard.style.borderTopColor = domainColor(question.domain);
    questionCard.innerHTML = `
      <div class="practice-question-meta">
        <span class="practice-domain-pill" data-domain="${question.domain}">${question.domain}</span>
        <span class="practice-task-pill">Task ${question.task}</span>
        <span class="practice-topic-pill">${question.topic}</span>
        ${question.review ? `<span class="practice-review-note-badge">Reviewed wording</span>` : ""}
      </div>
      <h3>${question.question}</h3>
      <p class="practice-question-instruction">${instruction}</p>
      <div class="practice-options">${optionsHtml}</div>
      ${reveal ? renderAnswerPanel(question) : ""}
    `;

    questionCard.querySelectorAll("input").forEach(function (input) {
      input.addEventListener("change", function () {
        const index = Number(input.value);
        let answer = state.answers[String(question.id)] || [];

        if (question.multiple) {
          answer = input.checked
            ? [...new Set([...answer, index])]
            : answer.filter(value => value !== index);

          // Keep the source instruction strict: select exactly the keyed count.
          if (answer.length > question.correct.length) {
            answer = answer.slice(answer.length - question.correct.length);
          }
        } else {
          answer = [index];
        }

        state.answers[String(question.id)] = answer;
        state.checked = state.checked.filter(id => id !== question.id);
        saveState();
        renderQuestion();
      });
    });

    renderNavigator();
    updateTimer();
  }

  function startExam(resume) {
    if (!resume) {
      state.started = true;
      state.submitted = false;
      state.mode = byId("practice5Mode").value;
      state.selectedDomain = byId("practice5DomainFilter").value;
      state.timerEnabled = byId("practice5TimerEnabled").checked;
      state.shuffleEnabled = byId("practice5ShuffleEnabled").checked;
      const selectedQuestions = questionsForDomain(state.selectedDomain);
      state.order = state.shuffleEnabled
        ? shuffled(selectedQuestions.map(q => q.id))
        : selectedQuestions.map(q => q.id);
      state.currentPosition = 0;
      state.answers = {};
      state.review = [];
      state.checked = [];
      state.secondsRemaining = Math.max(
        60,
        Math.ceil((EXAM_SECONDS * selectedQuestions.length / QUESTIONS.length) / 60) * 60
      );
      state.startedAt = Date.now();
    }

    startPanel.hidden = true;
    resultsPanel.hidden = true;
    examPanel.hidden = false;
    saveState();
    renderQuestion();
    startTimer();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function checkCurrentAnswer() {
    const question = currentQuestion();
    const selected = state.answers[String(question.id)] || [];
    if (!selected.length) return;

    if (!state.checked.includes(question.id)) {
      state.checked.push(question.id);
    }
    saveState();
    renderQuestion();
  }

  function calculateResults() {
    let correctCount = 0;
    const byDomain = {};
    const selectedQuestions = attemptQuestions();

    selectedQuestions.forEach(function (question) {
      const selected = state.answers[String(question.id)] || [];
      const correct = arraysEqual(selected, question.correct);
      if (correct) correctCount += 1;

      if (!byDomain[question.domain]) {
        byDomain[question.domain] = { correct: 0, total: 0 };
      }
      byDomain[question.domain].total += 1;
      if (correct) byDomain[question.domain].correct += 1;
    });

    return {
      correctCount,
      total: selectedQuestions.length,
      percent: Math.round((correctCount / selectedQuestions.length) * 100),
      byDomain
    };
  }

  function submitExam(autoSubmitted) {
    if (state.submitted) return;

    const unanswered = state.order.filter(function (questionId) {
      return !(state.answers[String(questionId)] || []).length;
    }).length;

    if (!autoSubmitted && unanswered > 0) {
      const proceed = window.confirm(
        "You still have " + unanswered +
        " unanswered question" + (unanswered === 1 ? "" : "s") +
        ". Submit anyway?"
      );
      if (!proceed) return;
    }

    state.submitted = true;
    state.checked = [...state.order];
    stopTimer();
    saveState();
    showResults(autoSubmitted);
  }

  function showResults(autoSubmitted) {
    const results = calculateResults();
    const selectedQuestions = attemptQuestions();
    examPanel.hidden = true;
    startPanel.hidden = true;
    resultsPanel.hidden = false;

    const status = results.percent >= 70
      ? "Practice target reached"
      : "More review recommended";

    const domainRows = Object.entries(results.byDomain).map(function ([domain, value]) {
      const percent = Math.round((value.correct / value.total) * 100);
      return `
        <div class="practice-domain-result">
          <strong>${domain}</strong>
          <div class="practice-domain-bar">
            <i style="width:${percent}%;background:${domainColor(domain)}"></i>
          </div>
          <span>${value.correct}/${value.total}</span>
        </div>
      `;
    }).join("");

    const reviewRows = selectedQuestions.map(function (question) {
      const selected = state.answers[String(question.id)] || [];
      const correct = arraysEqual(selected, question.correct);
      const selectedText = selected.length
        ? selected.map(index => question.options[index]).join("; ")
        : "No answer";
      const correctText = question.correct
        .map(index => question.options[index]).join("; ");

      return `
        <article class="practice-review-item ${correct ? "correct" : ""}">
          <h4>Question ${question.id} · ${question.domain} · Task ${question.task}</h4>
          <p>${question.question}</p>
          <p class="practice-review-user"><strong>Your answer:</strong> ${selectedText}</p>
          <p class="practice-review-answer"><strong>Correct answer:</strong> ${correctText}</p>
          <p>${question.explanation}</p>
          <div class="practice-trigger-line">
            <strong>Exam trigger:</strong> ${question.trigger}
          </div>
          ${question.review ? `
            <div class="practice-review-detail">
              <strong>Reviewed-content note:</strong> ${question.review}
            </div>
          ` : ""}
        </article>
      `;
    }).join("");

    resultsPanel.innerHTML = `
      <div class="practice-results-head">
        <div class="practice-score-ring" style="--score-angle:${results.percent * 3.6}deg">
          <div>
            <strong>${results.percent}%</strong>
            <span>${results.correctCount} of ${results.total}</span>
          </div>
        </div>
        <div class="practice-result-message">
          <span class="practice-kicker">${autoSubmitted ? "TIME EXPIRED" : "EXAM SUBMITTED"}</span>
          <h2>${status}</h2>
          <p>
            A 70% score is used here only as a study target. The real AWS exam uses
            scaled scoring rather than a simple percentage.
          </p>
          <p>
            Questions and correct-answer letters come directly from quiz-2.md.
          </p>
        </div>
      </div>

      <h3>Performance by domain</h3>
      <div class="practice-domain-results">${domainRows}</div>

      <div class="practice-result-actions">
        <button id="practiceReviewAll" type="button" class="practice-primary-button">
          Review all answers
        </button>
        <button id="practiceRestart" type="button" class="practice-secondary-button">
          Restart exam
        </button>
        <button type="button" class="practice-secondary-button" data-show-page="main">
          Return to cheat sheet
        </button>
      </div>

      <div id="practiceFullReview" class="practice-review-list" hidden>
        ${reviewRows}
      </div>
    `;

    resultsPanel.querySelector("#practiceReviewAll").addEventListener("click", function () {
      const review = resultsPanel.querySelector("#practiceFullReview");
      review.hidden = !review.hidden;
      this.textContent = review.hidden ? "Review all answers" : "Hide answer review";
    });

    resultsPanel.querySelector("#practiceRestart").addEventListener("click", function () {
      clearState();
      resultsPanel.hidden = true;
      startPanel.hidden = false;
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // New dynamic page controls need the same navigation behavior.
    resultsPanel.querySelectorAll('[data-show-page="main"]').forEach(function (button) {
      button.addEventListener("click", function () {
        const mainControl = document.querySelector('[data-show-page="main"]');
        if (mainControl) mainControl.click();
      });
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  byId("startQuiz2").addEventListener("click", function () {
    startExam(false);
  });

  byId("resumeQuiz2").addEventListener("click", function () {
    if (loadState()) {
      if (state.submitted) showResults(false);
      else startExam(true);
    }
  });

  byId("clearQuiz2Progress").addEventListener("click", function () {
    if (window.confirm("Clear the saved Quiz 2.0 attempt?")) {
      clearState();
    }
  });

  byId("practice5Previous").addEventListener("click", function () {
    state.currentPosition = Math.max(0, state.currentPosition - 1);
    saveState();
    renderQuestion();
  });

  byId("practice5Next").addEventListener("click", function () {
    state.currentPosition =
      state.currentPosition === state.order.length - 1
        ? 0
        : state.currentPosition + 1;
    saveState();
    renderQuestion();
  });

  byId("practice5MarkReview").addEventListener("click", function () {
    const id = currentQuestion().id;
    state.review = state.review.includes(id)
      ? state.review.filter(value => value !== id)
      : [...state.review, id];
    saveState();
    renderQuestion();
  });

  byId("practice5CheckAnswer").addEventListener("click", checkCurrentAnswer);
  byId("practice5Submit").addEventListener("click", function () {
    submitExam(false);
  });

  byId("practice5ExitButton").addEventListener("click", function () {
    saveState();
    stopTimer();
    examPanel.hidden = true;
    startPanel.hidden = false;
    updateResumeButton();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.addEventListener("documentpagechange", function (event) {
    if (event.detail.page !== "practice5") {
      stopTimer();
    } else if (state.started && !state.submitted && !examPanel.hidden) {
      startTimer();
    }
  });

  window.addEventListener("beforeunload", saveState);

  updateResumeButton();
  updateTimer();
})();
