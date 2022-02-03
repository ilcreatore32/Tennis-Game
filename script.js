// Canvas drawing surface
var gameBoard;
var gameBoardContext;


// Game Loop
window.onload = function () {
  console.log("Hello World!");
  gameBoard = document.getElementById("gameBoard");
  gameBoardContext = gameBoard.getContext("2d");
  setInterval(drawGame, 1000);
};

// Draw the game
function drawGame() {
  gameBoardContext.fillStyle = "black";
  gameBoardContext.fillRect(0, 0, gameBoard.width, gameBoard.height);
}
