// DOM Elements
const mainContainer = document.querySelector(".main-container");
const contentElements = document.querySelectorAll(".content");
const initialContainer = document.querySelector(".initial-container");
const theButton = document.querySelector(".the-button");
const muryokushoTriggers = document.querySelectorAll("#muryokusho-trigger");
const epilepsyContainer = document.querySelector("#epilepsy-container");
const epilepsyInput = document.querySelector("#epilepsy");
const muryokushoElement = document.querySelector(".muryokusho");
const firstName = document.querySelector("#first-name");
const secondName = document.querySelector("#second-name");
const backgroundVideo = document.querySelector(".background-video");
const muryokushoVideo = document.querySelector(".muryokusho-video");

const MURYOKUSHO_VIDEO_DURATION_IN_SECONDS = 16;

// Audio
const muryokushoAudio = new Audio("./assets/audios/muryokusho.mp3");
muryokushoAudio.volume = 0.5;

// Events
function startMuryokusho(element) {
  muryokushoAudio.play();

  const { checked } = epilepsyInput;
  element.classList.add("clicked");

  if (!checked) {
    element.classList.add("tremble");
    document.body.classList.add("thundershock");
  }

  epilepsyContainer.classList.add("fade-out");
}

function displayMuryokusho(element) {
  initialContainer.classList.remove("start");
  element.classList.remove("tremble");

  element.classList.add("hidden");
  epilepsyContainer.classList.add("hidden");

  document.body.classList.remove("thundershock");

  setTimeout(() => {
    muryokushoElement.classList.add("start");
  }, 500);

  setTimeout(() => {
    muryokushoElement.classList.remove("start");
    mainContainer.classList.add("visible");
  }, 2600);
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

  muryokushoTriggers.forEach((element) => {
    element.classList.remove("hidden");
    element.classList.remove("clicked");
  });

  setTimeout(() => {
    displayTitle();
  }, timeout);
}

function displayVideo() {
  document.body.classList.add("no-scroll");
  muryokushoVideo.classList.add("visible");
  muryokushoVideo.classList.add("start");

  muryokushoVideo.currentTime = 0;
  muryokushoVideo.play();

  setTimeout(() => {
    displayContent(0);
    muryokushoVideo.classList.remove("start");
    muryokushoVideo.classList.add("end");

    setTimeout(() => {
      document.body.classList.remove("no-scroll");
      muryokushoVideo.classList.remove("visible");
      muryokushoVideo.classList.remove("end");
    }, 400);
  }, (MURYOKUSHO_VIDEO_DURATION_IN_SECONDS - 2) * 1000);
}

// Event Listeners
muryokushoTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (trigger.classList.contains("clicked")) return;
    startMuryokusho(trigger);

    setTimeout(() => {
      displayMuryokusho(trigger);

      if (trigger.classList.contains("muryokusho-secondary")) {
        setTimeout(() => {
          displayVideo();
        }, 2250);
        return;
      }

      setTimeout(() => {
        displayContent(50);
      }, 2600);
    }, 6510);
  });
});
