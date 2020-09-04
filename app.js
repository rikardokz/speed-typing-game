const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// list of words for game - Hardcoded for now
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

// init word
let randomWord;

// init score
let score = 0;

// init time
let time = 10;

// difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
// set difficulty select value
difficultySelect.value = difficulty;

// focus on text on start
text.focus();

// start counting down;
const timeInterval = setInterval(updateTime, 1000);

// generate a random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// function add word to DOM
function addWordtoDOM() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerText = score;
}

function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    // end the game
    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onClick="location.reload()">Play Again?</button>
  `;
  endgameEl.style.display = "flex";
}

addWordtoDOM();

// event listeners

// typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordtoDOM();
    updateScore();

    text.value = "";
    if (difficulty === "easy") {
      time += 5;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 2;
    }

    updateTime();
  }
});

// settings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// settings select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
