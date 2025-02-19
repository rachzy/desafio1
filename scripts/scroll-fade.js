const contents = document.querySelectorAll(".content");

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach(
      (entry) => entry.isIntersecting && entry.target.classList.add("show")
    ),
  { threshold: 0.5 }
);

contents.forEach((content) => observer.observe(content));
