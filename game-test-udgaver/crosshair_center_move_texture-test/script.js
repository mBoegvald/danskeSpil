"use strict";

window.addEventListener("DOMContentLoaded", init);
const game = document.querySelector("#game");
const stage = document.querySelector("#stage");
const crosshair = document.querySelector("#crosshair_rect");
let target;

function init() {
  console.log("init");
  // disable leftclick?
  document.querySelector("body").addEventListener("click", checkShot);
  setTimeout(newTarget, 1000);
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
  moveStage(mouseXratio, mouseYratio);
}

function moveStage(mouseXratio, mouseYratio) {
  // move #stage based on mouse position
  console.log("moveStage");
  const moveX = -mouseXratio * 50;
  const moveY = -mouseYratio * 50;
  stage.style.transform = `translate(${moveX}vw,${moveY}vh)`;
}

function newTarget() {
  let targetNumber = Math.floor(Math.random() * 2);

  console.log(targetNumber);

  document.querySelector("#target-" + targetNumber).classList.add("active");
  target = document.querySelector(".target.active");
}

function checkShot() {
  console.log("checkShot");

  // get positions of elements with boundingClientRect
  const element_1 = crosshair.getBoundingClientRect();
  let element_2 = target.getBoundingClientRect();

  // check for overlap of boxes
  if (
    element_1.x > element_2.x &&
    element_1.y > element_2.y &&
    element_1.x < element_2.x + element_2.width &&
    element_1.y < element_2.y + element_2.height
  ) {
    // START TARGET ANIMATION DOWN
    target.classList.remove("active");
    newTarget();
  } else {
    console.log("You missed");
  }
}

document.onkeydown = function(evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ("key" in evt) {
    isEscape = evt.key === "Escape" || evt.key === "Esc";
  } else {
    isEscape = evt.keyCode === 27;
  }
  if (isEscape) {
    alert("Escape");
  }
};
