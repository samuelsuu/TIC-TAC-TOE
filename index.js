const cells = document.querySelectorAll(".cell");
const scoreX = document.querySelector("#player-x-score");
const scoreO = document.querySelector("#player-o-score");
const resetButton = document.querySelector("#reset-score-button");
let currentPlayer = "X";
let playerXScore = 0;
let playerOScore = 0;
const gameState = ["", "", "", "", "", "", "", "", ""];

function handleClick(e) {
  const cell = e.target;
  const cellIndex = Array.from(cells).indexOf(cell);
  if (gameState[cellIndex] !== "" || checkForWin()) {
    return;
  }
  cell.classList.add(currentPlayer.toLowerCase());
  gameState[cellIndex] = currentPlayer;
  if (checkForWin()) {
    announceWinner();
  } else if (checkForTie()) {
    announceTie();
  } else {
    switchPlayer();
  }
}

function checkForWin() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

function checkForTie() {
  return gameState.every(cell => {
    return cell !== "";
  });
}

function announceWinner() {
  if (currentPlayer === "X") {
    playerXScore++;
    scoreX.textContent = playerXScore;
  } else {
    playerOScore++;
    scoreO.textContent = playerOScore;
  }
  alert(`Player ${currentPlayer} wins!`);
  resetGame();
}

function announceTie() {
  alert("Tie game!");
  resetGame();
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function resetGame() {
  gameState.fill("");
  cells.forEach(cell => {
    cell.classList.remove("x", "o");
  });
  currentPlayer = "X";
}

function resetScores() {
  playerXScore = 0;
  playerOScore = 0;
  scoreX.textContent = playerXScore;
  scoreO.textContent = playerOScore;
  resetGame();
}

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});

resetButton.addEventListener("click", resetScores);
