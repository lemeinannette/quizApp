// Selectors
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const backButton = document.getElementById('back-button');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
const restartButton = document.getElementById('restart-button');

// Quiz data
const quizData = [
  {
    question: 'What is the output of the following C program?\n`int x = 5; printf("%d", x);`',
    answers: ['5', '10', 'Error', 'None of the above'],
    correctAnswer: 0
  },
  {
    question: 'What is the purpose of the `#include` directive in C?',
    answers: ['To define a function', 'To include a header file', 'To declare a variable', 'To start a program'],
    correctAnswer: 1
  },
  {
    question: 'What is the difference between `=` and `==` in C?',
    answers: ['Assignment and equality', 'Equality and assignment', 'Greater than and less than', 'None of the above'],
    correctAnswer: 0
  },
  {
    question: 'What is the purpose of the `main()` function in C?',
    answers: ['To define a variable', 'To start a program', 'To end a program', 'To declare a function'],
    correctAnswer: 1
  },
  {
    question: 'What is the output of the following C program?\n`int x = 5; int y = x++; printf("%d", y);`',
    answers: ['5', '6', 'Error', 'None of the above'],
    correctAnswer: 0
  }
];

// Current question index
let currentQuestionIndex = 0;

// User's answers
let userAnswers = [];

// Render question and answers
function renderQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  document.getElementById('question').textContent = currentQuestion.question;
  answerButtons.innerHTML = '';
  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.className = 'btn';
    button.dataset.answerIndex = index;
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
  backButton.disabled = currentQuestionIndex === 0;
  nextButton.disabled = currentQuestionIndex === quizData.length - 1;
}

// Select answer
function selectAnswer(event) {
  const userAnswerIndex = Number(event.target.dataset.answerIndex);
  userAnswers[currentQuestionIndex] = userAnswerIndex;
  nextButton.disabled = false;
}

// Go to the next question
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    renderQuestion();
    nextButton.disabled = true;
  } else {
    showResult();
  }
}

// Show result
function showResult() {
  questionContainer.classList.add('hide');
  resultContainer.classList.remove('hide');
  let score = 0;
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === quizData[i].correctAnswer) {
      score++;
    }
  }
  resultText.textContent = `You scored ${score} out of ${quizData.length}`;
}

// Go back to the previous question
function goBack() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
    nextButton.disabled = false;
  }
}

// Restart quiz
function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers = [];
  questionContainer.classList.remove('hide');
  resultContainer.classList.add('hide');
  nextButton.disabled = true;
  renderQuestion();
}

// Event listeners
nextButton.addEventListener('click', nextQuestion);
backButton.addEventListener('click', goBack);
restartButton.addEventListener('click', restartQuiz);

// Initialize quiz
renderQuestion();
