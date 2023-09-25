const QandA = [
	{
		question: 'What is the largest ocean on Earth?',
		answers: [
			{ text: 'Atlantic Ocean', correct: false },
			{ text: 'Indian Ocean', correct: false },
			{ text: 'Pacific Ocean', correct: true },
			{ text: 'Arctic Ocean', correct: false }
		]
	},
	{
		question: 'What is the deepest point in the ocean?',
		answers: [
			{ text: 'Mariana Trench', correct: true },
			{ text: 'Tonga Trench', correct: false },
			{ text: 'Philippine Trench', correct: false },
			{ text: 'Kermadec Trench', correct: false }
		]
	},
	{
		question: 'Which of the following is the largest living creature on Earth?',
		answers: [
			{ text: 'Fin whale', correct: false },
			{ text: 'Sperm whale', correct: false },
			{ text: 'Blue whale', correct: true },
			{ text: 'Humpback whale', correct: false }
		]
	},
	{
		question: 'What is the name of the fear of water?',
		answers: [
			{ text: 'Hydrophobia', correct: false },
			{ text: 'Aquaphobia', correct: true },
			{ text: 'Thalassophobia', correct: false },
			{ text: 'Phobia', correct: false }
		]
	},
	{
		question: 'What is the name of the scientific study of the ocean?',
		answers: [
			{ text: 'Marine biology', correct: false },
			{ text: 'Limnology', correct: false },
			{ text: 'Oceanography', correct: true },
			{ text: 'Meteorology', correct: false }
		]
	},
]; // length 5

const questionElement = document.getElementById('questions');
const answerList = document.getElementById('answerlist');
const nextButton = document.getElementById('nextBtn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
	currentQuestionIndex = 0; // for resetting
	score = 0; // for resetting
	nextButton.innerText = 'Next';
	showQuestion();
}

function showQuestion() {
	resetState();
	let currentQuestion = QandA[currentQuestionIndex]; // 0-4i
	let questionNumber = currentQuestionIndex + 1;
	questionElement.innerText = questionNumber + '. ' + currentQuestion.question;

	currentQuestion.answers.forEach((answer) => {
		const button = document.createElement('button');
		button.innerText = answer.text;
		button.classList.add('btnstyle');
		answerList.appendChild(button);
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click', selectAnswer);
	});
}

function resetState() {
	nextButton.style.display = 'none';
	while(answerList.firstChild) {
		answerList.removeChild(answerList.firstChild);
	}
}

function selectAnswer(e) {
	const selectedBtn = e.target;
	const isCorrect =  selectedBtn.dataset.correct === 'true';
	if(isCorrect) {
		selectedBtn.classList.add('correct');
		score++;
	} else {
		selectedBtn.classList.add('incorrect');
	}

	Array.from(answerList.children).forEach(button => {
		if(button.dataset.correct === 'true') {
			button.classList.add('correct');
		}
		button.disabled = true;
	});
	nextButton.style.display = 'block';
}

function showScore() {
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${QandA.length}!`;
	nextButton.innerHTML = 'Play again';
	nextButton.style.display = 'block';

}

function handleNextButton() {
	currentQuestionIndex++;
	if (currentQuestionIndex < QandA.length) {
		showQuestion();
	} else {
		showScore();
	}
}

nextButton.addEventListener('click', () => {
	if (currentQuestionIndex < QandA.length) {
		handleNextButton();
	} else {
		startQuiz();
	}
});
	

startQuiz();


