"use strict";

window.addEventListener("DOMContentLoaded", init);
const game = document.querySelector("#game");
const stage = document.querySelector("#stage");
const crosshair = document.querySelector("#crosshair_rect");
const crosshair_touch = document.querySelector("#crosshair");
const gun = document.querySelector("#gun");
let target;
let latestTarget = null;
let pointCounter = 0;
let seconds = document.querySelector("#countdown span").textContent;

function init() {
  setTimeout(newTarget, 1000);
  setTimeout(countdown, 1000);
  // check for mouse
  game.addEventListener("mousemove", mouseInput, false);
  // check for touch device
  game.addEventListener("touchstart", touchInput);
  game.addEventListener("touchstart", touchShot, false);
}

function mouseInput() {
  // mouse is moved - set mouse event listners
  game.addEventListener("mousemove", mouseMove, false);
  game.addEventListener("mousedown", checkShot);
}

function touchInput() {
  // the user is touching the screen for interaction - remove scene-displacement
  game.removeEventListener("mousemove", mouseInput, false);

  // Free curser from center
  crosshair_touch.classList.add("crosshair_absolute");
  touchShot();

  //hide gun
  document.querySelector("#gun").classList.add("hidden");
}

function touchShot(event) {
  // get touch x & y coordinates
  let x = event.touches[0].clientX;
  let y = event.touches[0].clientY;
  checkTouchShot(x, y);

  // set center of crosshair
  x -= game.offsetLeft + 16;
  y -= game.offsetTop + 16;
  // move crosshair to touched spot
  crosshair_touch.style.left = 0 + "px";
  crosshair_touch.style.top = 0 + "px";
  crosshair_touch.style.transform = `translate(${x}px,${y}px)`;
}

function checkTouchShot(x, y) {
  // check if touch hits target (godt og vel kopi af checkShot-function  DRY?)
  console.log("checkTouchShot");
  let touchX = x;
  let touchY = y;

  hitSound();

  // get positions of target with boundingClientRect
  let element_2 = target.getBoundingClientRect();

  // check for overlap of boxes
  if (
    touchX > element_2.x &&
    touchY > element_2.y &&
    touchX < element_2.x + element_2.width &&
    touchY < element_2.y + element_2.height
  ) {
    // START TARGET ANIMATION DOWN

    if (target.id === "target-4") {
      const localTarget = target;
      localTarget.classList.remove("activeAlt");
      localTarget.classList.add("hideAlt");
      localTarget.addEventListener("animationend", removeHideAlt);

      function removeHideAlt() {
        localTarget.removeEventListener("animationend", removeHideAlt);
        console.log("hideAlt");
        console.log("from: ", localTarget);
        localTarget.classList.remove("hideAlt");
      }
    } else {
      target.classList.remove("active");
      target.classList.add("hide");
    }
    pointCounter++;
    document.querySelector(
      "#pointSystem"
    ).textContent = `Mål ramt: ${pointCounter}`;
    newTarget();
  } else {
    console.log("You missed");
  }
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
  if (target.id === "target-4") {
    target.classList.add("activeAlt");
  } else {
    target.classList.add("active");
  }

  // target = document.querySelector(".target.active");

  setTimeout(flipSound, 100);
}

function checkShot() {
  console.log("checkShot");

  // get positions of elements with boundingClientRect
  const element_1 = crosshair.getBoundingClientRect();
  let element_2 = target.getBoundingClientRect();

  gun.classList.add("gun-animation");
  gun.addEventListener("animationend", removeGunClass);

  function removeGunClass() {
    gun.classList.remove("gun-animation");
    gun.removeEventListener("animationend", removeGunClass);
  }

  hitSound();

  // check for overlap of boxes
  if (
    element_1.x > element_2.x &&
    element_1.y > element_2.y &&
    element_1.x < element_2.x + element_2.width &&
    element_1.y < element_2.y + element_2.height
  ) {
    // START TARGET ANIMATION DOWN

    if (target.id === "target-4") {
      const localTarget = target;
      localTarget.classList.remove("activeAlt");
      localTarget.classList.add("hideAlt");
      localTarget.addEventListener("animationend", removeHideAlt);

      function removeHideAlt() {
        localTarget.removeEventListener("animationend", removeHideAlt);
        localTarget.classList.remove("hideAlt");
      }
    } else {
      const localTarget = target;
      localTarget.classList.remove("active");
      localTarget.classList.add("hide");
      localTarget.addEventListener("animationend", removeHide);

      function removeHide() {
        localTarget.removeEventListener("animationend", removeHide);
        localTarget.classList.remove("hide");
      }
    }
    pointCounter++;
    document.querySelector("#pointSystem span").textContent = pointCounter;
    newTarget();
  } else {
    console.log("You missed");
  }
}

function hitSound() {
  console.log("hitSound");
  let hitShot = document.createElement("audio");
  hitShot.src = "sounds/deagle-shot.mp3";
  hitShot.play();
  hitShot.volume = 0.03;
}

function flipSound() {
  console.log("flipSound");
  let flipBoard = document.createElement("audio");
  flipBoard.src = "sounds/flip2.mp3";
  flipBoard.play();
}

function countdown() {
  let countdown = setInterval(function() {
    seconds--;
    document.querySelector("#countdown span").textContent = seconds;
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

window.addEventListener("DOMContentLoaded", requestFullscreenOpen);
function requestFullscreenOpen() {
  let elem = document.documentElement;
  console.log("requestFullscreen");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
}
