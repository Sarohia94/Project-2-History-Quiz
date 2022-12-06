// Used tutorial from https://www.youtube.com/watch?v=jfOv18lCMmw&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=10
// Obtain id scores-list from scoreboard.html
const highScoresList = document.getElementById("scores-list");

// Retrieve high scores array or an empty array from local storage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Add the high scores array to the scoreboard.html page as a list item using the object log from script.js
highScoresList.innerHTML = highScores.map(log => { 
    return `<li class="highscoreitem">${log.name}: ${log.score}</li>`;
}).join("");