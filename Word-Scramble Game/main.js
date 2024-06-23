// Getting accessed the element of the HTML
const wordElement = document.querySelector(".word");
const hintElement = document.querySelector(".hint span");
const refreshButton = document.querySelector(".refresh-word");
const checkButton = document.querySelector(".check-word");
const input = document.querySelector("input");
const timeElement = document.querySelector(".time span b");
const scoreElement = document.querySelector(".score span");
const playerElement = document.querySelector(".num span");

// Initial variables
let word = "";
let timer;
let score = 0;
let num = 3; // Each player has three replays
let time = 10; // Each game has an 10 second

// Initial Game
function initGame() {
  // Random Word
  let randomIndex = Math.floor(Math.random() * words.length);
  let randomObj = words[randomIndex];
  word = randomObj.word.toLowerCase();
  console.log(randomObj);

  // Shuffle Character in a string
  let wordArr = word.split("").sort(() => Math.random() - 0.5);
  let scrambledWord = wordArr.join("");

  /*
  If the characters are not shuffled successfully, call the initGame() function again
  */
  if (scrambledWord === word) {
    return initGame();
  }

  // Render HTML
  playerElement.innerText = num;
  scoreElement.innerText = score;
  wordElement.innerText = scrambledWord;
  hintElement.innerText = randomObj.hint;
  timeElement.innerText = time;
  input.value = "";
  checkButton.setAttribute("disabled", true);

  // Initial Timer
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      return (timeElement.innerText = time);
    }
    loseGame(`Time Out! ${word.toUpperCase()} is a correct word`);
  }, 1000);
}
initGame();

// Refresh Game -> Reset all values except 'score' and 'number of plays'
refreshButton.addEventListener("click", () => loseGame());

function refreshGame(msg) {
  if (msg) {
    alert(msg);
  }
  word = "";
  time = 10;
  clearInterval(timer);
  initGame();
}

// GameOver Function
function gameOver() {
  let msg = `Game Over! You get ${score} points, play again!`;
  num = 3;
  score = 0;
  refreshGame(msg);
}

// Lose game function
function loseGame(msg) {
  num--;
  if (num < 0) {
    return gameOver();
  }
  refreshGame(msg);
}

// Check Input is disabled
input.addEventListener("input", (e) => {
  if (!e.target.value.trim()) {
    checkButton.setAttribute("disabled", true);
  } else {
    checkButton.removeAttribute("disabled");
  }
});

// Winning Game Function
function winGame(msg) {
  score++;
  refreshGame(msg);
}

// Check the word given in the input
checkButton.addEventListener("click", () => {
  let ansText = input.value.toLowerCase().trim();
  if (ansText !== word) {
    return loseGame(`Oops! ${ansText.toUpperCase()} is not a correct word`);
  }
  return winGame();
});
