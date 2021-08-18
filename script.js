'use strict';

// Select DOM elements
const rollBtn = document.querySelector(".btn-roll");
const holdBtn = document.querySelector(".btn-hold");
const newBtn = document.querySelector(".btn-new");
const dice = document.querySelector(".dice");
const player1 = document.querySelector(".player-1");
const player2 = document.querySelector(".player-2");
const playerOneTitle = document.querySelector(".player-1-title");
const playerTwoTitle = document.querySelector(".player-2-title");
const playerOneScore = document.querySelector(".player-1-score");
const playerTwoScore = document.querySelector(".player-2-score");
const playerOneCurrentScore = document.querySelector(".current-score-1");
const playerTwoCurrentScore = document.querySelector(".current-score-2");

const gameRulesTitle = document.querySelector(".game-rules-title");
const wrapper = document.querySelector(".wrapper");

let activePlayer, totalCurrentScore, playerScore, playing;

// Initialize
const init = () => {
  activePlayer = 1;
  totalCurrentScore = 0;
  playerScore = [0, 0];
  playing = true;
  player1.classList.remove("active");
  player2.classList.remove("active");
  player1.classList.add("active");
  playerOneTitle.style.color = "#333";
  playerTwoTitle.style.color = "#333";
  playerOneTitle.textContent = "PLAYER 1";
  playerTwoTitle.textContent = "PLAYER 2";
  playerOneScore.textContent = 0;
  playerTwoScore.textContent = 0;
  playerOneCurrentScore.textContent = 0;
  playerTwoCurrentScore.textContent = 0;
  dice.classList.add("hidden");
};

init();

// Switch player
const switchPlayer = () => {
  document.querySelector(`.current-score-${activePlayer}`).textContent = 0;
  totalCurrentScore = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  // dice.classList.add("hidden");
  player1.classList.toggle("active");
  player1.style.transition = "all 0.8s ease-out";
  player2.classList.toggle("active");
  player2.style.transition = "all 0.8s ease-out";
};

// Roll dice
rollBtn.addEventListener("click", () => {
  if (playing) {
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    dice.setAttribute("src", `/images/dice-${randomNumber}.png`);
    dice.classList.remove("hidden");

    // Current score
    if (randomNumber !== 1) {
      totalCurrentScore += randomNumber;
      document.querySelector(
        `.current-score-${activePlayer}`
      ).textContent = totalCurrentScore;
    } else {
      switchPlayer();
    }

    if (playerScore[activePlayer - 1] >= 160) {
      playing = false;
      dice.classList.add("hidden");
    }
  }
});

// Hold
holdBtn.addEventListener("click", () => {
  if (playing) {
    playerScore[activePlayer - 1] += totalCurrentScore;
    document.querySelector(`.player-${activePlayer}-score`).textContent =
      playerScore[activePlayer - 1];
    if (playerScore[activePlayer - 1] >= 100) {
      document.querySelector(`.current-score-${activePlayer}`).textContent = 0;
      playing = false;
      dice.classList.add("hidden");
      document.querySelector(`.player-${activePlayer}-title`).textContent =
        "WINNER!";
      document.querySelector(`.player-${activePlayer}-title`).style.color =
        "#20a7a0";
    } else {
      switchPlayer();
    }
  }
});

// New game
newBtn.addEventListener("click", init);

// Game rules
gameRulesTitle.addEventListener("click", () => {
  wrapper.classList.remove("hidden");
});

wrapper.addEventListener("click", () => {
  wrapper.classList.add("hidden");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    wrapper.classList.add("hidden");
  }
});