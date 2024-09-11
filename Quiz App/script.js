//Function to hold the questions
const questionBank = [
  {
    question: "Who killed The Queen of the Andals?",
    options: [
      { text: "Arya Stark", correct: false },
      { text: "Lord Baelish", correct: false },
      { text: "Jeoffery", correct: false },
      { text: "Jon Snow", correct: true },
    ],
  },
  {
    question: "Valar Morghulis...",
    options: [
      { text: "Valar Dohaeris", correct: true },
      { text: "Valar Valverde", correct: false },
      { text: "Umpri Venim", correct: false },
      { text: "Sui Lovutt", correct: false },
    ],
  },
  {
    question: "Who killed the king of the Night Walkers?",
    options: [
      { text: "John Snow", correct: false },
      { text: "Samwell Tarly", correct: false },
      { text: "Arya Stark", correct: true },
      { text: "Rheanys Targeryan", correct: false },
    ],
  },
  {
    question: '"Winter is Coming" is a popular saying of what family?"',
    options: [
      { text: "Stark", correct: true },
      { text: "Tarly", correct: false },
      { text: "Baratheon", correct: false },
      { text: "Targeryan", correct: false },
    ],
  },
  {
    question: "How many children does the Queen of Andals have?",
    options: [
      { text: "2", correct: false },
      { text: "4", correct: false },
      { text: "1", correct: false },
      { text: "3", correct: true },
    ],
  },
  {
    question: '"What do we say to death?"',
    options: [
      { text: "Nothing", correct: false },
      { text: "Not Today", correct: true },
      { text: "Who will take care of my family?", correct: false },
      { text: "The North Remembers", correct: false },
    ],
  },
  {
    question: "What is the punishment for deserting he night's watch?",
    options: [
      { text: "Banishment", correct: false },
      { text: "Death", correct: true },
      { text: "Reward with women", correct: false },
      { text: "Nothing", correct: false },
    ],
  },
  {
    question: "What does 'Dracaris!' mean",
    options: [
      { text: "Burn", correct: true },
      { text: "Fly", correct: false },
      { text: "Speak", correct: false },
      { text: "Jump", correct: false },
    ],
  },
  {
    question: "Who killed the first Night Walker?",
    options: [
      { text: "John Snow", correct: false },
      { text: "Samwell Tarly", correct: true },
      { text: "Arya Stark", correct: false },
      { text: "Rheanys Targeryan", correct: false },
    ],
  },
  {
    question: "'The Imp' was best known for his",
    options: [
      { text: "Wisdom and good sense of judgement", correct: true },
      { text: "His swordmanship skills", correct: false },
      { text: "Achievement in war", correct: false },
      { text: "Always paying his debts", correct: false },
    ],
  },
];

//Target  the needed ids
const realQuestion = document.getElementById("question");
const toChooseFrom = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const timerDisplay = document.getElementById("time-left");

//Initial initializations and declarations
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

//Function to keep the show the quiz on click on Start
function startQuiz() {
  const data = document.getElementById("data");
  data.classList.add("hidden");
  const collect = document.getElementById("quiz-box");
  collect.classList.remove("hidden");
  begin();
}

//Function to begin and trigger the next question
function begin() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

//Function to load the questions and show the options
function showQuestion() {
  resetState();
  startTimer();
  let currentQuestion = questionBank[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  realQuestion.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerHTML = option.text;
    button.classList.add("option");
    toChooseFrom.appendChild(button);
    if (option.correct) {
      button.dataset.correct = option.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

//Function to reset the timer on the start of a new question.
function resetState() {
  nextButton.style.display = "none";
  while (toChooseFrom.firstChild) {
    toChooseFrom.removeChild(toChooseFrom.firstChild);
  }
  clearInterval(timer);
  timeLeft = 10;
}

//Function to check whether the selected answer is correct or not nd then disable the ability to click
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(toChooseFrom.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
  clearInterval(timer);
}

//Function to show the score at the end of the quiz
function showScore() {
  resetState();
  realQuestion.innerHTML = `You scored ${score} out of ${questionBank.length}`;
  nextButton.innerHTML = "Take Quiz Again";
  nextButton.style.display = "block";
}

//function to show the next question on the click of the next button
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questionBank.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questionBank.length) {
    handleNextButton();
  } else {
    begin();
  }
});

//Function to start the 10 seconds timer
function startTimer() {
  timeLeft = 10;
  timerDisplay.textContent = timeLeft;
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      markIncorrect();
      nextButton.style.display = "block";
    } else {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
    }
  }, 1000);
}

//Function to indicate a wrongly selected option
function markIncorrect() {
  Array.from(toChooseFrom.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  handleNextButton();
}

//Function to start the entire quiz
begin();
