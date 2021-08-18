const dino = document.querySelector(".dino");
const gameBg = document.querySelector(".game-bg");
let position = 0;
let isJumping = false;
const keyHandler = (event) => {
  if (event.code === "Space") {
    if (!isJumping) dinoJump();
  }
};

const dinoJump = () => {
  isJumping = true;
  upInterval = window.setInterval(() => {
    position += 20;
    dino.style.bottom = `${position}px`;
    if (position >= 150) {
      window.clearInterval(upInterval);
      downInterval = window.setInterval(() => {
        position -= 20;
        dino.style.bottom = `${position}px`;
        if (position <= 0) {
          window.clearInterval(downInterval);
          isJumping = false;
        }
      }, 20);
    }
  }, 20);
};

const createCactus = () => {
  let randomTime = Math.random() * 2000 + 500;
  const cactus = document.createElement("div");
  cactus.classList.add("cactus");
  let cactusDistance = 1000;
  cactus.style.left = `${cactusDistance}px`;
  gameBg.appendChild(cactus);

  let cactusRun = setInterval(() => {
    if (cactusDistance > 0 && cactusDistance < 60 && position < 60) {
      clearInterval(cactusRun);
      document.body.innerHTML = "<h1 class='game-over'>Game Over!</h1>";
    }
    cactusDistance -= 10;
    cactus.style.left = `${cactusDistance}px`;
    if (cactusDistance < -60) {
      clearInterval(cactusRun);
      gameBg.removeChild(cactus);
    }
  }, 20);

  setTimeout(createCactus, randomTime);
};

document.addEventListener("keyup", keyHandler);
createCactus();
