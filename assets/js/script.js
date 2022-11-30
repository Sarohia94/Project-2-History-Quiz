//Counter area for question and score number
let questionNo = 1;
let questionCounter = document.getElementById("q-number");
let scoreNo = 0;
let scoreCounter = document.getElementById("s-number");

//Quiz area
const question = document.getElementById("question")
const answers = document.getElementsByClassName("answers")
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");
const nextQuestion = document.getElementById("nextQuestion")
let currentQuestionIndex = 0;
let correctAnswer;

// Questions array
const myQuestions = [
    {
        question: "What year did WW1 start?",
        answers: {
            answer1: "1912",
            answer2: "1914",
            answer3: "1918",
            answer4: "1939"
        },
        correctAnswer: "answer1" 
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

//Shuffle variables - https://www.youtube.com/watch?v=riDzcEQbX6k
let shuffleQuestions; 
let currentQuestion; 

function startQuiz() {
    questionNo = 1;
    scoreNo = 0;
    shuffleQuestions = myQuestions.sort(() => Math.random() - 0.5); // Tutor support from Gemma to sort the error messages showing in dev tools
    console.log("shuffleQuestions", shuffleQuestions); // check the printout shuffles the array
    currentQuestion = 0;
    setNextQuestion();
}

function displayQuestion() {
    question.innerText = myQuestions[currentQuestionIndex].question; // Tutor support from Oisin to target the question property of MyQuestions array
    currentQuestionIndex++;
    ﻿console.log(myQuestions[currentQuestionIndex].question) //check printout of questions 
}

function setNextQuestion() {
    displayQuestion(shuffleQuestions[currentQuestion]);
}

function checkAnswer() {

}

function incrementScore() {

}

startQuiz();