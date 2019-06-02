"use strict";

window.addEventListener("DOMContentLoaded", init);
const game = document.querySelector("#game");
const stage = document.querySelector("#stage");
const crosshair = document.querySelector("#crosshair_rect");
let target;
let latestTarget = null;
let pointCounter = 0;
let seconds = document.getElementById("countdown").textContent;

function init() {
  // disable leftclick?
  document.querySelector("body").addEventListener("click", checkShot);
  setTimeout(newTarget, 1000);
  setTimeout(countdown, 1000);
  clientInput();
}

function clientInput() {
  // mouse move eventlistner
  game.addEventListener("mousemove", mouseMove, false);
}

function mouseMove(event) {
  // get mouse position
  let x = event.x;
  let y = event.y;
  x -= game.offsetLeft;
  y -= game.offsetTop;

  setMouseCenter(x, y);
}

function setMouseCenter(x, y) {
  // get #game container dimentions
  const gameWidth = game.offsetWidth;
  const gameHeight = game.offsetHeight;

  // get positions values from center of box
  // -1 to 1 ratio (x / imageWidth * range - center )
  const mouseXratio = (x / gameWidth) * 2 - 1;
  const mouseYratio = (y / gameHeight) * 2 - 1;
  moveStage(mouseXratio, mouseYratio);
}

function moveStage(mouseXratio, mouseYratio) {
  // move #stage based on mouse position
  const moveX = -mouseXratio * 25;
  const moveY = -mouseYratio * 25;
  stage.style.transform = `translate(${moveX}%,${moveY}%)`;
}

function newTarget() {
  let targetNumber = Math.floor(Math.random() * 5);

  if (latestTarget === targetNumber) {
    newTarget();
    return;
  }
  latestTarget = targetNumber;

  target = document.querySelector("#target-" + targetNumber);

  target.classList.add("active");
  // target = document.querySelector(".target.active");

  setTimeout(() => {
    document.querySelector("#flip-out").play();
  }, 300);
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
    target.classList.add("hide");
    target.addEventListener("animationend", () => {
      target.classList.remove("hide");
    });
    pointCounter++;
    document.querySelector(
      "#pointSystem"
    ).textContent = `Mål ramt: ${pointCounter}`;
    newTarget();
  } else {
    console.log("You missed");
    document.querySelector("#shot-miss").play();
  }
}

function countdown() {
  let countdown = setInterval(function() {
    seconds--;
    document.getElementById("countdown").textContent = seconds;
    if (seconds <= 0) clearInterval(countdown);
  }, 1000);
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
