// Canvas drawing surface
var gameBoard;
var gameBoardContext;

window.onload = function () {
  console.log("Hello World!");
  gameBoard = document.getElementById("gameBoard");
  gameBoardContext = gameBoard.getContext("2d");
};
