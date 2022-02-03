// Canvas drawing surface
var gameBoard;
var gameBoardContext;

// Frames Rate
const framesPerSecond = 30;

// Game Ball object
let ballX = 0;
let ballY = 0;
let ballSpeedX = 10;
let ballSpeedY = 10;

// Player 1
let player1Y = 250;
const paddleHeight = 120;

let paddle2Y = 250;

// Game Loop
window.onload = function () {
  gameBoard = document.getElementById("gameBoard");
  gameBoardContext = gameBoard.getContext("2d");
  setInterval(function () {
    drawEverything();
    moveEverything();
  }, 1000 / framesPerSecond);
  gameBoard.addEventListener("mousemove", function (e) {
    let mouse = mousePosition(e);
    player1Y = mouse.y - paddleHeight / 2;
  });
};

function drawEverything() {
  drawGame();
  drawBall();
  drawPlayer1();
  drawPlayer2();
}

function moveEverything() {
  moveBall();
  moveComputer();
}

/* Drawing */
// Draw the game
function drawGame() {
  gameBoardContext.fillStyle = "black";
  gameBoardContext.fillRect(0, 0, gameBoard.width, gameBoard.height);
}

// Draw the ball
function drawBall() {
  gameBoardContext.beginPath();
  gameBoardContext.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
  gameBoardContext.fillStyle = "white";
  gameBoardContext.fill();
  gameBoardContext.closePath();
}

// Draw the player one
function drawPlayer1() {
  gameBoardContext.beginPath();
  gameBoardContext.rect(0, player1Y, 10, paddleHeight);
  gameBoardContext.fillStyle = "white";
  gameBoardContext.fill();
  gameBoardContext.closePath();
}

// Draw the player two
function drawPlayer2() {
  gameBoardContext.beginPath();
  gameBoardContext.rect(gameBoard.width - 10, paddle2Y, 10, 120);
  gameBoardContext.fillStyle = "white";
  gameBoardContext.fill();
  gameBoardContext.closePath();
}

/* Moving */
// Move the ball
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballX > gameBoard.width - 10) {
    if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      ballReset();
    }
  }
  if (ballX < 0) {
    if (ballY > player1Y && ballY < player1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      ballReset();
    }
  }
  if (ballY > gameBoard.height - 10 || ballY < 10) {
    ballSpeedY = -ballSpeedY;
  }
}

function ballReset() {
  ballSpeedX = -ballSpeedX;
  ballSpeedY = -ballSpeedY;
  ballX = gameBoard.width / 2;
  ballY = gameBoard.height / 2;
}

// Mouse position
function mousePosition(e) {
  let rect = gameBoard.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = e.clientX - rect.left - root.scrollLeft;
  let mouseY = e.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY,
  };
}

function moveComputer() {
  if (paddle2Y + paddleHeight / 2 < ballY) {
    paddle2Y += 8;
  } else {
    paddle2Y -= 8;
  }
}
