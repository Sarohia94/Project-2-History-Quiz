// scoreboard area
const highScoresList = document.getElementById("scores-list")

// retrieve high scores list or an empty array
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// add to the scoreboard area
// https://www.youtube.com/watch?v=jfOv18lCMmw&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=10
highScoresList.innerHTML = highScores.map(log => { 
    return `<li class="highscoreitem">${log.name}: ${log.score}</li>`;
}).join("");
console.log(highScoresList.innerHTML);