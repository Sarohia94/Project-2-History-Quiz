// Counter area for question and score number
let scoreNo = 0;

// Quiz area
const question = document.getElementById("question")
const answersClass = document.getElementsByClassName("answers")

// End area
const endScore = document.getElementById("end-score")
const yourName = document.getElementById("name")
const submitScore = document.getElementById("submit-score")
const MAX_HIGH_SCORES = 5;

// Questions array
const myQuestions = [{
    question: "What year did WW1 start?",
    answers: {
        answer1: "1912",
        answer2: "1914",
        answer3: "1918",
        answer4: "1939"
    },
    correctAnswer: "answer2"
},
{
    question: "Who was the British Prime Minister during the Falklands War?",
    answers: {
        answer1: "John Major",
        answer2: "Tony Blair",
        answer3: "Margaret Thatcher",
        answer4: "Harold Wilson"
    },
    correctAnswer: "answer3"
},
{
    question: "What year was the Cuban Missile Crisis?",
    answers: {
        answer1: "1952",
        answer2: "1962",
        answer3: "1964",
        answer4: "1948"
    },
    correctAnswer: "answer2"
},
{
    question: "Who was the Prime Minister at the outbreak of the Boer War?",
    answers: {
        answer1: "Lord Churchill",
        answer2: "Lord Salisbury",
        answer3: "Lord Aberdeen",
        answer4: "Lord Gladstone"
    },
    correctAnswer: "answer2"
},
{
    question: "What year did the Battle of the Somme take place?",
    answers: {
        answer1: "1942",
        answer2: "1916",
        answer3: "1917",
        answer4: "1940"
    },
    correctAnswer: "answer2"
},
{
    question: "Which of the below was not part of the Russian Civil War 1917-1923?",
    answers: {
        answer1: "Red Army",
        answer2: "Blue Army",
        answer3: "Green Army",
        answer4: "White Army"
    },
    correctAnswer: "answer2"
},
{
    question: "What is the name of the peacekeeping organisation formed after WWII?",
    answers: {
        answer1: "United Nations",
        answer2: "NATO",
        answer3: "Warsaw Pact",
        answer4: "Partnership for Peace"
    },
    correctAnswer: "answer1"
},
{
    question: "The Tuskegee Airmen constituted a U.S. Army unit drawn from which group?",
    answers: {
        answer1: "African Americans",
        answer2: "Women",
        answer3: "WW1 Veterans",
        answer4: "Youths under age 18"
    },
    correctAnswer: "answer1"
},
{
    question: "When was the Korean Armistice Agreement signed?",
    answers: {
        answer1: "1951",
        answer2: "1950",
        answer3: "1952",
        answer4: "1953"
    },
    correctAnswer: "answer4"
},
{
    question: "How long did the Bosnian War last?",
    answers: {
        answer1: "3 years",
        answer2: "4 years",
        answer3: "5 years",
        answer4: "2 years"
    },
    correctAnswer: "answer1"
}
];

let currentQuestionIndex = 0;

// Shuffle variables - https://www.youtube.com/watch?v=riDzcEQbX6k
let shuffleQuestions;
let currentQuestion;

function startQuiz() {
    document.getElementById("quiz-area").classList.remove("hide");
    shuffleQuestions = myQuestions.sort(() => Math.random() - 0.5); // tutor support from Gemma to sort the error messages showing in dev tools
    // console.log("shuffleQuestions", shuffleQuestions); // check if the printout shuffles the array
    currentQuestion = 0;
    setNextQuestion();
}

function setNextQuestion() {
    if (currentQuestionIndex <= myQuestions.length - 1) {
        displayQuestion(shuffleQuestions[currentQuestion]);   
    } else {
        document.getElementById("quiz-area").classList.add("hide");
        document.getElementById("end-area").classList.remove("hide");
        endScore.innerText = `${scoreNo}/10`;
    }
    let previousQuestionNo = parseInt(document.getElementById("q-number").innerText);
    document.getElementById("q-number").innerText = ++previousQuestionNo;
    // console.log(previousQuestion); // check
}

function displayQuestion() {
    question.innerText = myQuestions[currentQuestionIndex].question; // tutor support from Oisin on how to target the question property of MyQuestions array using the currentQuestionIndex
    // console.log(myQuestions[currentQuestionIndex].question); // check printout of questions
    for (let i = 0; i < answersClass.length; i++) {
        answersClass[i].innerText = (myQuestions[currentQuestionIndex].answers["answer" + (i + 1)]); // tutor support from Jason on how to target answer choices
        // console.log((myQuestions[currentQuestionIndex].answers["answer" + (i + 1)])); // check printout of answers
        answersClass[i].addEventListener("click", checkAnswer)
    };
}

function checkAnswer() {
    // tutor support from Sean to use this.id
    // console.log(this.id);
    // console.log(myQuestions[currentQuestionIndex].correctAnswer);
    if (this.id == myQuestions[currentQuestionIndex].correctAnswer) {
        this.classList.add("correct");
        incrementScore();
    } else {
        this.classList.add("incorrect");
    };
    currentQuestionIndex++ // tutor support from Joshua to move currentQuestionIndex++ as checkanswer not working
    setTimeout(() => {
        this.classList.remove("correct")
        this.classList.remove("incorrect")
        setNextQuestion()
    }, 1000);
}

function incrementScore() {
    scoreNo++;
    let previousScore = parseInt(document.getElementById("s-number").innerText);
    document.getElementById("s-number").innerText = ++previousScore;
}

startQuiz();
// console.log("start funct called");

// Save scores - https://www.youtube.com/watch?v=DFhmNLKwwGw&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=10
function saveScore(e) {
    // prevent form posting on a new page
    e.preventDefault();
    // log object to hold name & high score
    const log = {
        name: yourName.value,
        score: scoreNo
    };
    console.log(log);
    // push log object into high scores list
    highScores.push(log);
    // sorts score by value
    highScores.sort((a, b) => b.score - a.score);
    // sets high score list as 5
    highScores.splice(5);
    // update high score in local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // opens the scoreboard.html
    window.location.assign("scoreboard.html");
}

// retrieve high scores list or an empty array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// add event listener when adding name to submit score. Where there is no name the submit button is disabled.
yourName.addEventListener("keyup", () => {
    submitScore.disabled = !yourName.value;
});

// add event listener on submit score to call the save score function
submitScore.addEventListener("click", saveScore);