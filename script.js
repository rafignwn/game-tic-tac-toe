var currPlayer = "X";

const boxs = Array.from(document.getElementsByClassName("box"));
const controlButton = document.getElementById("reset");
const playerDisplay = document.getElementById("playerDisplay");
const announcer = document.querySelector(".announcer");

var board = ["", "", "", "", "", "", "", "", ""];
var isActiveGame = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function isValidAction(box) {
  if (
    box.classList.contains("player-o") ||
    box.classList.contains("player-x")
  ) {
    return false;
  }
  return true;
}

function handleResultValidation() {
  for (let i = 0; i < winningConditions.length; i++) {
    const win = winningConditions[i];
    const a = board[win[0]];
    const b = board[win[1]];
    const c = board[win[2]];
    if (a === "" && b === "" && c === "") continue;
    if (a === b && b === c) {
      console.log(currPlayer);
      announcer.classList.remove("hide");
      announcer.children[0].classList.add(`player-${currPlayer.toLowerCase()}`);
      isActiveGame = false;
      controlButton.textContent = "Restart";
      controlButton.classList.replace("btn-reset", "btn-restart");
      break;
    }
  }
}

function switchPlayer(box) {
  if (currPlayer === "X") {
    // box.appendChild(playerX);
    box.classList.add("player-x");
    playerDisplay.classList.replace("player-x", "player-o");
    return "O";
  } else {
    // box.appendChild(playerO);
    box.classList.add("player-o");
    playerDisplay.classList.replace("player-o", "player-x");
    return "X";
  }
}

function updateBoard(index) {
  board[index] = currPlayer;
}

function userAction(box, index) {
  if (isValidAction(box) && isActiveGame) {
    console.log("yey");
    updateBoard(index);
    handleResultValidation();
    currPlayer = switchPlayer(box);
  }
}

function reset() {
  board = ["", "", "", "", "", "", "", "", ""];
  boxs.forEach((item) => {
    item.classList.remove("player-o", "player-x");
  });
  isActiveGame = true;
  announcer.classList.add("hide");
  announcer.children[0].classList.remove("player-o", "player-x");
  controlButton.textContent = "Reset";
  controlButton.classList.replace("btn-restart", "btn-reset");
}

boxs.forEach((box, index) => {
  console.log("ikeh");
  box.addEventListener("click", () => userAction(box, index));
});

controlButton.addEventListener("click", reset);
