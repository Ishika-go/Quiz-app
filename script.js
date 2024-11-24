const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0                      
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    console.log(button.dataset.correct)
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is the term for a function that calls itself?',
    answers: [
      { text: 'Recursion', correct: true },
      { text: 'Overloading', correct: false }
    ]
  },
  {
    question: 'What data structure uses LIFO (Last In, First Out)?',
    answers: [
      { text: 'tree', correct: false },
      { text: 'linkedlist', correct: false },
      { text: 'Stack', correct: true },
      { text: 'Queue', correct: false }
    ]
  },
  {
    question: 'What is the term for a function that calls itself?',
    answers: [
      { text: 'Compilation error', correct: false },
      { text: 'Logical error', correct: false },
      { text: 'Runtime error', correct: true },
      { text: 'None', correct: false }
    ]
  },
  {
    question: 'What is the time complexity of accessing an element in an array by index?',
    answers: [
      { text: 'O(1)', correct: true },
      { text: 'O(n)', correct: false },
      { text: 'O(log n)', correct: false },
      { text: 'O(n^2)', correct: false },
    ]
  }
]