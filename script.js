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
var player1Score = 0;

let paddle2Y = 250;
var player2Score = 0;

let winScreen = false;
const winningScore = 1;

function handleClick() {
  if (winScreen) {
    player1Score = 0;
    player2Score = 0;
    winScreen = false;
  }
}

// Game Loop
window.onload = function () {
  gameBoard = document.getElementById("gameBoard");
  gameBoardContext = gameBoard.getContext("2d");
  setInterval(function () {
    drawEverything();
    moveEverything();
  }, 1000 / framesPerSecond);
  gameBoard.addEventListener("click", handleClick);
  gameBoard.addEventListener("mousemove", function (e) {
    let mouse = mousePosition(e);
    player1Y = mouse.y - paddleHeight / 2;
  });
};

function drawNet() {
  for (let i = 0; i < gameBoard.height; i += 40) {
    gameBoardContext.beginPath();
    gameBoardContext.moveTo(gameBoard.width / 2, i);
    gameBoardContext.lineTo(gameBoard.width / 2, i + 20);
    gameBoardContext.strokeStyle = "#314a2d";
    gameBoardContext.stroke();
  }
}

function drawEverything() {
  drawGame();
  drawNet();
  drawBall();
  drawPlayer1();
  drawPlayer2();
  gameBoardContext.fillText(
    "Player: " + player1Score,
    gameBoard.width / 2 - 200,
    50
  );
  gameBoardContext.fillText(
    "Computer: " + player2Score,
    gameBoard.width / 2 + 200,
    50
  );
}

function moveEverything() {
  if (winScreen) {
    return;
  } else {
    moveBall();
    moveComputer();
  }
}

/* Drawing */
// Draw the game
function drawGame() {
  gameBoardContext.fillStyle = "#a2ca34";
  gameBoardContext.fillRect(0, 0, gameBoard.width, gameBoard.height);
  if (winScreen) {
    gameBoardContext.fillStyle = "#314a2d";
    if (player1Score >= winningScore) {
      gameBoardContext.fillText(
        "Player wins!  Click to play again.",
        gameBoard.width / 2 - 200,
        gameBoard.height / 2
      );
    } else {
      gameBoardContext.fillText(
        "Computer wins! Click to play again.",
        gameBoard.width / 2 - 200,
        gameBoard.height / 2
      );
    }
  }
}

// Draw the ball
function drawBall() {
  gameBoardContext.beginPath();
  gameBoardContext.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
  gameBoardContext.fillStyle = "#314a2d";
  gameBoardContext.fill();
  gameBoardContext.closePath();
}

// Draw the player one
function drawPlayer1() {
  gameBoardContext.beginPath();
  gameBoardContext.rect(0, player1Y, 10, paddleHeight);
  gameBoardContext.fillStyle = "#314a2d";
  gameBoardContext.fill();
  gameBoardContext.closePath();
}

// Draw the player two
function drawPlayer2() {
  gameBoardContext.beginPath();
  gameBoardContext.rect(gameBoard.width - 10, paddle2Y, 10, 120);
  gameBoardContext.fillStyle = "#314a2d";
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
      let deltaY = ballY - (paddle2Y + paddleHeight / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player1Score++;
      ballReset();
    }
  }
  if (ballX < 0) {
    if (ballY > player1Y && ballY < player1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
      let deltaY = ballY - (player1Y + paddleHeight / 2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player2Score++;
      ballReset();
    }
  }
  if (ballY > gameBoard.height - 10 || ballY < 10) {
    ballSpeedY = -ballSpeedY;
  }
}

function ballReset() {
  if (player1Score >= winningScore || player2Score >= winningScore) {
    winScreen = true;
  }
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
  if (paddle2Y + paddleHeight / 2 < ballY + 35) {
    paddle2Y += 8;
  } else {
    paddle2Y -= 8;
  }
}
