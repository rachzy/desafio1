const mugenContainer = document.querySelector(".mugen-container");
const mugenGojo = document.querySelector(".mugen-gojo");
const fakeCursor = document.querySelector("#fake-cursor");

let isInside = false;
let speed = 1;

let speedInterval;

function setSpeedInterval() {
  speedInterval = setInterval(() => {
    if (speed <= 0) {
      clearInterval(speedInterval);
      speed = 0;
      return;
    }
    speed -= 0.2;
  }, 10);
}

mugenContainer.addEventListener("mousemove", (event) => {
  const { clientX, clientY } = event;
  if (!isInside) {
    fakeCursor.style.left = `${clientX}px`;
    fakeCursor.style.top = `${clientY}px`;
    return;
  }

  const currentX = parseInt(fakeCursor.style.left);
  const currentY = parseInt(fakeCursor.style.top);

  const mustAddX = (clientX - currentX) * speed;
  const mustAddY = (clientY - currentY) * speed;

  fakeCursor.style.left = `${currentX + mustAddX}px`;
  fakeCursor.style.top = `${currentY + mustAddY}px`;
});

mugenGojo.addEventListener("mousemove", () => {
  isInside = true;
});

mugenGojo.addEventListener("mouseenter", () => {
  setSpeedInterval();
  isInside = true;
});

mugenGojo.addEventListener("mouseleave", () => {
  clearInterval(speedInterval);
  speed = 1;
  isInside = false;
});
