// Questions array which is imported from questions.js 
import {myQuestions} from "./questions.js";

// Set variable for score number
let scoreNo = 0;

// Quiz area constants
const question = document.getElementById("question");
const answersClass = document.getElementsByClassName("answers");

// End score area constants
const endScore = document.getElementById("end-score");
const yourName = document.getElementById("name");
const submitScore = document.getElementById("submit-score");

// Set variable for current question index
let currentQuestionIndex = 0;

// Shuffle question variables - used tutorial as quidance from https://www.youtube.com/watch?v=riDzcEQbX6k
let shuffleQuestions;
let currentQuestion;

/**
 * Sets up the quiz, with shuffled questions from the questions array,
 * the next question function is called
 */
function startQuiz() {
    document.getElementById("quiz-area").classList.remove("hide");
    shuffleQuestions = myQuestions.sort(() => Math.random() - 0.5);
    currentQuestion = 0;
    setNextQuestion();
}

/**
 * Calls the display question function if 
 * the current question index is not the final question in the array,
 * if it is then the end score area is displayed with the final score,
 * question no. is incremented in the first instance
 */
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
}

/**
 * Displays question from the current question index in the array,
 * loops through the answers choices, displaying the related index answers in the array
 * where an answer is clicked the check answer function is called
 */
function displayQuestion() {
    // Tutor support from Oisin on how to target the question property of the array using the currentQuestionIndex
    question.innerText = myQuestions[currentQuestionIndex].question; 
    for (let i = 0; i < answersClass.length; i++) {
        answersClass[i].innerText = (myQuestions[currentQuestionIndex].answers["answer" + (i + 1)]); // Tutor support from Jason on how to target answer choices
        answersClass[i].addEventListener("click", checkAnswer);
    }
}

/**
 * Checks the answer against the correct answer in the array
 * if correct, a class is added to change the color and the score is incremented,
 * if incorrect, a class is added to change the color,
 * setTimeout() method is used to allow delay before the class changing color is removed,
 * current question index is incremented
 */
function checkAnswer() {
    // Tutor support from Sean to use this.id
    if (this.id == myQuestions[currentQuestionIndex].correctAnswer) {
        this.classList.add("correct");
        incrementScore();
    } else {
        this.classList.add("incorrect");
    }
    setTimeout(() => {
        this.classList.remove("correct");
        this.classList.remove("incorrect");
        setNextQuestion();
    }, 1000);
    currentQuestionIndex++;
}

/**
 * Increments score number and
 * displays the incremeneted score number
 */
function incrementScore() {
    scoreNo++;
    let previousScore = parseInt(document.getElementById("s-number").innerText);
    document.getElementById("s-number").innerText = ++previousScore;
}

startQuiz();

/**
 * Final score and name is contained in a log object,
 * this is pushed and sorted as highScores where only the top 5 scores will be displayed,
 * this is stored in local storage for load and display on scoreboard.html
 */
// Save scores - used tutorial from https://www.youtube.com/watch?v=DFhmNLKwwGw&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=10
function saveScore(e) {
    // Prevent form posting on a new page
    e.preventDefault();
    // Log object to hold name & high score
    const log = {
        name: yourName.value,
        score: scoreNo
    };
    // Push log object into high scores list
    highScores.push(log);
    // Sort score by value
    highScores.sort((a, b) => b.score - a.score);
    // Set high score list up to 5
    highScores.splice(5);
    // Update high score to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // Display to scoreboard.html
    window.location.assign("scoreboard.html");
}

// Retrieve high scores list or an empty array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Event listener for where there is no name entered on the form, the submit score button is disabled.
yourName.addEventListener("keyup", () => {
    submitScore.disabled = !yourName.value;
});

// Event listener on submit score button to call the save score function
submitScore.addEventListener("click", saveScore);