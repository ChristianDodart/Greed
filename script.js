"use strict";
// Copyright (c) 7521, Christian Dodart All rights reserved. This source code is licensed under the BSD-style license found in the LICENSE file in the root directory of this source tree.

// DRY Code
const die = document.getElementById("dieIMG");
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const panel1 = document.getElementById("panel1");
const panel2 = document.getElementById("panel2");
const currentScore1 = document.getElementById("currentScore1");
const currentScore2 = document.getElementById("currentScore2");

// Button Functionality
let gameState = true;

// Current Score Functionality
let tempScore = 0;

// Score
let player1Score = 0;
let player2Score = 0;

// Assign Player Names Logic
const playerName1 = prompt(
  `Player One:
  Enter your name`,
  "Harry Potter"
);
const playerName2 = prompt(
  `                                                               Player Two:
                                                                 Enter your name`,
  "Ron Weasley"
);
document.getElementById("name1").textContent = playerName1;
document.getElementById("name2").textContent = playerName2;

// New Game Logic
const init = function () {
  score1.textContent = 0;
  score2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  tempScore = 0;
  player1Score = 0;
  player2Score = 0;
  gameState = true;

  die.classList.add("hidden");
  panel1.classList.remove("panelWinner");
  panel1.classList.remove("panelLoser");
  panel2.classList.remove("panelWinner");
  panel2.classList.remove("panelLoser");
  name1.classList.remove("fontLoser");
  score1.classList.remove("fontLoser");
  name2.classList.remove("fontLoser");
  score2.classList.remove("fontLoser");
  panel1.classList.add("active");
  panel2.classList.remove("active");
  name1.classList.add("activeText");
  name2.classList.remove("activeText");
  document.getElementById("btnRoll").classList.remove("btnText");
  document.getElementById("btnHold").classList.remove("btnText");
  document.getElementById("btnRoll").textContent = "🎲 Roll Dice";
  document.getElementById("btnHold").textContent = "🛑 Hold";
};
// Game Over Logic
const gameOver = function () {
  if (player1Score >= 75) {
    panel1.classList.toggle("panelWinner");
    panel2.classList.toggle("panelLoser");
    name2.classList.toggle("fontLoser");
    score2.classList.toggle("fontLoser");
    panel1.classList.remove("active");
    panel2.classList.remove("active");
    name1.classList.add("activeText");
    name2.classList.remove("activeText");
    die.classList.add("hidden");
    document.getElementById("btnRoll").textContent = playerName1 + " Wins!";
    document.getElementById("btnHold").textContent = playerName2 + " Loses!";
    document.getElementById("btnRoll").classList.add("btnText");
    document.getElementById("btnHold").classList.add("btnText");
    gameState = false;

    currentScore1.textContent = 0;
    currentScore2.textContent = 0;

    gameState = false;
  } else if (player2Score >= 75) {
    panel2.classList.toggle("panelWinner");
    panel1.classList.toggle("panelLoser");
    name1.classList.toggle("fontLoser");
    score1.classList.toggle("fontLoser");
    panel1.classList.remove("active");
    panel2.classList.remove("active");
    name1.classList.remove("activeText");
    name2.classList.add("activeText");
    die.classList.add("hidden");
    document.getElementById("btnRoll").textContent = playerName2 + " Wins!";
    document.getElementById("btnHold").textContent = playerName1 + " Loses!";
    document.getElementById("btnRoll").classList.add("btnText");
    document.getElementById("btnHold").classList.add("btnText");
    gameState = false;
    currentScore1.textContent = 0;
    currentScore2.textContent = 0;
  }
};
// Roll Dice Logic
const roll = function () {
  if (gameState) {
    let diceRoll = Math.trunc(Math.random() * 6) + 1;
    die.src = `images/dice-${diceRoll}.png`;
    die.classList.remove("hidden");
    if (diceRoll !== 1) {
      tempScore += diceRoll;
      if (panel1.classList.contains("active")) {
        currentScore1.textContent = tempScore;
      } else {
        currentScore2.textContent = tempScore;
      }
    } else {
      tempScore = 0;
      if (panel1.classList.contains("active")) {
        currentScore1.textContent = tempScore;
      } else {
        currentScore2.textContent = tempScore;
      }
      switchPlayers();
    }
  }
};
// Hold Dice Logic
const hold = function () {
  if (gameState) {
    if (panel1.classList.contains("active")) {
      player1Score += tempScore;
      score1.textContent = player1Score;
      if (player1Score < 75 && player2Score < 75) {
        tempScore = 0;
        switchPlayers();
        currentScore1.textContent = tempScore;
      } else {
        gameOver();
      }
    } else {
      player2Score += tempScore;
      score2.textContent = player2Score;
      if (player1Score < 75 && player2Score < 75) {
        tempScore = 0;
        switchPlayers();
        currentScore2.textContent = tempScore;
      } else {
        gameOver();
      }
    }
  }
};
// Switch Players Logic
const switchPlayers = function () {
  panel1.classList.toggle("active");
  panel2.classList.toggle("active");
  name1.classList.toggle("activeText");
  name2.classList.toggle("activeText");
};

// Roll Dice Button
document.getElementById("btnRoll").addEventListener("click", roll);
// Hold Button
document.getElementById("btnHold").addEventListener("click", hold);
// New Game Button
document.getElementById("btnNew").addEventListener("click", init);
