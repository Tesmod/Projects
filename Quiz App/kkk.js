const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 1,
  },
  // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  const questionElement = document.getElementById("question");
  const optionElements = document.querySelectorAll(".option");

  questionElement.textContent = questions[currentQuestionIndex].question;
  optionElements.forEach((element, index) => {
    element.textContent = questions[currentQuestionIndex].options[index];
  });
}

function selectOption(index) {
  if (index === questions[currentQuestionIndex].answer) {
    score++;
  }
  document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    document.getElementById("next-btn").style.display = "none";
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz").classList.add("hide");
  document.getElementById("result").classList.remove("hide");
  document.getElementById("score").textContent = score;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("quiz").classList.remove("hide");
  document.getElementById("result").classList.add("hide");
  showQuestion();
}

document.getElementById("next-btn").style.display = "none";
showQuestion();
