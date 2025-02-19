// DOM Elements
const mainContainer = document.querySelector(".main-container");
const contentElements = document.querySelectorAll(".content");
const initialContainer = document.querySelector(".initial-container");
const theButton = document.querySelector(".the-button");
const epilepsyContainer = document.querySelector("#epilepsy-container");
const epilepsyInput = document.querySelector("#epilepsy");
const muryokushoElement = document.querySelector(".muryokusho");
const firstName = document.querySelector("#first-name");
const secondName = document.querySelector("#second-name");
const backgroundVideo = document.querySelector(".background-video");

// Audio
const muryokushoAudio = new Audio("./assets/audios/muryokusho.mp3");
muryokushoAudio.volume = 0.5;

// Events
function startMuryokusho() {
  muryokushoAudio.play();

  const { checked } = epilepsyInput;
  theButton.classList.add("clicked");

  if (!checked) {
    theButton.classList.add("tremble");
    document.body.classList.add("thundershock");
  }

  epilepsyContainer.classList.add("fade-out");
}

function displayMuryokusho() {
  initialContainer.classList.remove("start");
  theButton.classList.remove("tremble");

  theButton.classList.add("hidden");
  epilepsyContainer.classList.add("hidden");

  document.body.classList.remove("thundershock");

  setTimeout(() => {
    muryokushoElement.classList.add("start");
  }, 500);
}

function displayTitle() {
  document.body.classList.add("dark");
  // Make sure the initialContainer is not visible, just to not break the webpage
  if (initialContainer.classList.contains("start")) {
    initialContainer.classList.remove("start");
  }

  firstName.classList.add("start");

  setTimeout(() => {
    secondName.classList.add("start");

    setTimeout(() => {
      backgroundVideo.classList.add("start");
      contentElements.forEach((element) => element.classList.add("visible"));
    }, 800);
  }, 800);
}

function displayContent(timeout) {
  muryokushoElement.classList.remove("start");
  mainContainer.classList.add("visible");

  setTimeout(() => {
    displayTitle();
  }, timeout);
}

theButton.addEventListener("click", () => {
  if (theButton.classList.contains("clicked")) return;
  startMuryokusho();

  setTimeout(() => {
    displayMuryokusho();
    setTimeout(() => displayContent(500), 2200);
  }, 6510);
});

displayContent(0);
