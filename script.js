// ---------- 1. THE QUESTIONS ----------
// answer is either "ai" or "human". "why" is the little explanation shown after.
// 5 are for older people vibes, 5 are for college student vibes.
const questions = [
  {
    text: "Retirement is not an ending, but a new beginning. With newfound freedom, you can rediscover old passions, nurture meaningful relationships, and embrace each day with gratitude and purpose.",
    answer: "ai",
    why: "“Not an ending, but a beginning” is a classic AI line. Zero real details."
  },
  {
    text: "attendance is 71%. the rule is 75%. i have calculated that i can survive exactly 2 more bunks if i get fever on the right day. praying for a viral fever tbh",
    answer: "human",
    why: "Lowercase, specific numbers and a very real panic. AI rarely writes this chaos."
  },
  {
    text: "Forty years I made two cups of tea every morning. Last month I made two again before I remembered. I drank both.",
    answer: "human",
    why: "Short, plain and heartbreaking. AI would explain the feeling. This one just shows it."
  },
  {
    text: "College life is a transformative journey filled with challenges and growth. By embracing every opportunity and building strong connections, students can navigate this pivotal chapter with confidence and resilience.",
    answer: "ai",
    why: "Transformative, journey, navigate and pivotal. A buzzword bingo card."
  },
  {
    text: "My grandson set up WhatsApp for me. Now I get 40 good morning messages before 7am and I feel rude not replying to all. Yesterday I sent a sunrise photo to the plumber.",
    answer: "human",
    why: "Funny, oddly specific, and it ends with a joke nobody planned."
  },
  {
    text: "Feeling homesick is a natural part of moving away. Remember, it’s okay to feel overwhelmed — reaching out to friends and family can help you feel more connected and supported during this time.",
    answer: "ai",
    why: "Kind but generic, with an em dash and “Remember, it’s okay to…” advice."
  },
  {
    text: "mess served the same paneer for 3 days. day 1 paneer butter masala, day 2 paneer curry, day 3 “paneer surprise”. the surprise is that it’s still paneer",
    answer: "human",
    why: "A running joke with a punchline. AI jokes tend to be much safer."
  },
  {
    text: "Staying active is crucial for seniors’ health and well-being. A daily walk not only strengthens the heart but also fosters a sense of community, making it a holistic approach to healthy aging.",
    answer: "ai",
    why: "Crucial, fosters, holistic and the “not only… but also” structure."
  },
  {
    text: "called home today and said placements are going fine. they are not. i have rejection mails open in 6 tabs. appa said he’s proud of me anyway and i had to mute myself so he wouldn’t hear me crying",
    answer: "human",
    why: "Raw, specific and uneven. The muting detail is something AI wouldn’t think of."
  },
  {
    text: "Learning to use a smartphone can feel intimidating at first, but with patience and practice, seniors can stay connected with loved ones and unlock a world of new possibilities.",
    answer: "ai",
    why: "“Unlock a world of new possibilities” and a perfectly balanced sentence."
  }
];

// ---------- 2. GRAB THE THINGS ON THE PAGE ----------
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const startBtn = document.getElementById("start-btn");
const counter = document.getElementById("counter");
const textBox = document.getElementById("text-box");
const btnAI = document.getElementById("btn-ai");
const btnHuman = document.getElementById("btn-human");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

const finalScore = document.getElementById("final-score");
const resultLine = document.getElementById("result-line");
const copyBtn = document.getElementById("copy-btn");
const restartBtn = document.getElementById("restart-btn");

// ---------- 3. KEEP TRACK ----------
let current = 0;      // which question we are on
let score = 0;        // how many right
let answered = false; // did they already answer this one?

// ---------- 4. FUNCTIONS ----------
function startGame() {
  current = 0;
  score = 0;

  // shuffle the questions so the order is different every time
  questions.sort(function () { return Math.random() - 0.5; });

  startScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  answered = false;
  const q = questions[current];

  counter.textContent = "Question " + (current + 1) + " of " + questions.length;
  textBox.textContent = q.text;
  feedback.textContent = "";
  feedback.className = "";
  nextBtn.classList.add("hidden");
  btnAI.disabled = false;
  btnHuman.disabled = false;
}

function checkAnswer(choice) {
  if (answered) return;
  answered = true;

  const q = questions[current];

  if (choice === q.answer) {
    score++;
    feedback.textContent = "🎃 Correct! " + q.why;
    feedback.className = "correct";
  } else {
    const real = q.answer === "ai" ? "AI" : "Human";
    feedback.textContent = "💀 Wrong... it was " + real + ". " + q.why;
    feedback.className = "wrong";
  }

  btnAI.disabled = true;
  btnHuman.disabled = true;

  nextBtn.textContent = current === questions.length - 1 ? "See my score" : "Next";
  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showEnd();
  }
}

function showEnd() {
  gameScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");
  finalScore.textContent = score + "/" + questions.length;

  if (score >= 9) {
    resultLine.textContent = "Nothing hides from you... not even the machines 👁️";
  } else if (score >= 6) {
    resultLine.textContent = "Not bad. You caught most of the ghosts in the machine 👻";
  } else {
    resultLine.textContent = "The robots fooled you... they’re getting stronger 🦇";
  }
}

function copyScore() {
  const msg = "I scored " + score + "/" + questions.length + " on AI or Human! Can you beat me? 🎃";
  navigator.clipboard.writeText(msg);
  copyBtn.textContent = "Copied!";
  setTimeout(function () {
    copyBtn.textContent = "Copy my score";
  }, 1500);
}

// ---------- 5. CONNECT BUTTONS TO FUNCTIONS ----------
startBtn.addEventListener("click", startGame);
btnAI.addEventListener("click", function () { checkAnswer("ai"); });
btnHuman.addEventListener("click", function () { checkAnswer("human"); });
nextBtn.addEventListener("click", nextQuestion);
copyBtn.addEventListener("click", copyScore);
restartBtn.addEventListener("click", startGame);