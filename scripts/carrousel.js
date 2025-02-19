const SLIDE_IMAGE_IN_MS = 2500;

const carrousels = document.querySelectorAll("#carrousel");

function changeImage(carrouselItems, imageIndex) {
  carrouselItems.forEach((carrouselItem, index) => {
    if (index === imageIndex) {
      carrouselItem.classList.add("active");
      return;
    }
    carrouselItem.classList.remove("active");
  });
}

carrousels.forEach((carrousel) => {
  const carrouselItems = carrousel.querySelectorAll("#carrousel-item");
  let imageIndex = 0;
  changeImage(carrouselItems, imageIndex);

  setInterval(() => {
    changeImage(carrouselItems, imageIndex);

    if (imageIndex === carrouselItems.length - 1) {
      imageIndex = 0;
      return;
    }
    imageIndex++;
  }, SLIDE_IMAGE_IN_MS);
});
