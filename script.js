// Canvas drawing surface
var gameBoard;
var gameBoardContext;

// Frames Rate
const framesPerSecond = 30;

// Game Ball object
let ballX = 0;
let ballY = 0;

// Game Loop
window.onload = function () {
  console.log("Hello World!");
  gameBoard = document.getElementById("gameBoard");
  gameBoardContext = gameBoard.getContext("2d");
  drawGame();
  setInterval(drawBall, 1000 / framesPerSecond);
  drawPlayer1();
  drawPlayer2();
};

// Draw the game
function drawGame() {
  gameBoardContext.fillStyle = "black";
  gameBoardContext.fillRect(0, 0, gameBoard.width, gameBoard.height);
}

// Draw the ball
function drawBall() {
  ballX += 10;
  ballY += 10;
  gameBoardContext.beginPath();
  gameBoardContext.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
  gameBoardContext.fillStyle = "white";
  gameBoardContext.fill();
  gameBoardContext.closePath();
}

// Draw the player one
function drawPlayer1() {
  gameBoardContext.beginPath();
  gameBoardContext.rect(20, 300, 20, 100);
  gameBoardContext.fillStyle = "white";
  gameBoardContext.fill();
  gameBoardContext.closePath();
}

// Draw the player two
function drawPlayer2() {
  gameBoardContext.beginPath();
  gameBoardContext.rect(760, 300, 20, 100);
  gameBoardContext.fillStyle = "white";
  gameBoardContext.fill();
  gameBoardContext.closePath();
}
