"use strict";

window.addEventListener("DOMContentLoaded", init);
const game = document.querySelector("#game");

function init() {
  console.log("init");
  document.querySelector("#test").addEventListener("click", testClick);
  clientInput();
}

function clientInput() {
  // mouse move eventlistner
  game.addEventListener("mousemove", mouseMove, false);
}

function mouseMove(event) {
  console.log("mouseMove");

  // get mouse position
  let x = event.x;
  let y = event.y;
  x -= game.offsetLeft;
  y -= game.offsetTop;

  setMouseCenter(x, y);
}

function setMouseCenter(x, y) {
  console.log("setMouseCenter");

  // get #game container dimentions
  const gameWidth = game.offsetWidth;
  const gameHeight = game.offsetHeight;
  console.log(gameWidth);
  console.log(gameHeight);

  // get positions values from center of box
  // -1 to 1 ratio (x / imageWidth * range - center )
  const mouseXratio = (x / gameWidth) * 2 - 1;
  const mouseYratio = (y / gameHeight) * 2 - 1;
  console.log(mouseXratio);
  console.log(mouseYratio);
}

function testClick() {
  alert("testClick");
}
