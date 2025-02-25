const flash = document.querySelector(".flash");

const red = document.querySelector("#red");
const blue = document.querySelector("#blue");

const japaneseText = document.querySelector("#japanese-text");
const texts = document.querySelectorAll("#text");

const startButton = document.querySelector("#startButton");
const releaseButton = document.querySelector("#releaseButton");

let animationTimeout;
let isRunning = false;

const murasakiAudio1 = new Audio("./assets/audios/murasaki-1.mp3");

function toggleFlash() {
  flash.classList.add("active");
  setTimeout(() => flash.classList.remove("active"), 20);
}

function toggleExplosion() {
  flash.classList.add("explosion");
  setTimeout(() => flash.classList.remove("explosion"), 1800);
}

function reset() {
  red.classList.remove("visible");
  blue.classList.remove("visible");
  red.classList.remove("intersection");
  blue.classList.remove("intersection");
  red.classList.remove("super-grow");
  blue.classList.remove("super-grow");
  red.classList.remove("grow");
  blue.classList.remove("grow");
  red.classList.remove("popaway");
  blue.classList.remove("popaway");
  red.classList.remove("floating");
  blue.classList.remove("floating");
  releaseButton.classList.remove("visible");
  japaneseText.classList.remove("visible");
  startButton.disabled = false;
  isRunning = false;
  clearTimeout(animationTimeout);
}

// Function to move the red and blue circles closer
function startAnimation() {
  if (isRunning) return;
  isRunning = true;

  murasakiAudio1.play();

  // Enable/Disable appropriate buttons
  startButton.disabled = true;

  setTimeout(() => {
    blue.classList.add("visible");
    japaneseText.textContent = "蒼 (Azul)";

    setTimeout(() => {
      red.classList.add("visible");
      japaneseText.textContent = "赫 (Vermelho)";

      setTimeout(() => {
        japaneseText.textContent = "";
        red.classList.add("floating");
        blue.classList.add("floating");
        texts.forEach((text) => text.classList.remove("visible"));

        setTimeout(() => {
          red.classList.add("intersection");
          blue.classList.add("intersection");

          setTimeout(() => {
            toggleFlash();
          }, 3000);

          // Set a timeout for when the purple should appear
          animationTimeout = setTimeout(() => {
            toggleFlash();
            red.classList.add("grow");
            blue.classList.add("grow");

            setTimeout(() => {
              red.classList.add("super-grow");
              blue.classList.add("super-grow");

              setTimeout(() => {
                releaseButton.classList.add("visible");
              }, 5000);
            }, 500);

            setTimeout(() => {
              japaneseText.classList.add("visible");
              japaneseText.textContent = "虚式「茈」 (Vazio Roxo)";
            }, 1000);
          }, 5000);
        }, 1200);
      }, 1500);
    }, 2500);
  }, 2000);
}

function throwAnimation() {
  const murasakiAudio2 = new Audio("./assets/audios/murasaki-2.mp3");
  murasakiAudio2.play();

  red.classList.add("popaway");
  blue.classList.add("popaway");

  releaseButton.classList.remove("visible");

  japaneseText.classList.remove("visible");
  japaneseText.textContent = "";

  setTimeout(() => {
    toggleExplosion();
  }, 4000);
  setTimeout(() => {
    reset();
    startButton.disabled = false;
    texts.forEach((text) => text.classList.add("visible"));
    isRunning = false;
  }, 5000);
}

// Event Listeners for buttons
startButton.addEventListener("click", startAnimation);
releaseButton.addEventListener("click", throwAnimation);
