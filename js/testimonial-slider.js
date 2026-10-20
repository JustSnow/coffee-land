(() => {
  const root = document.querySelector(".testimonial-slider");
  if (!root) return;

  const track = root.querySelector(".testimonial-slider__track");
  if (!track) return;

  const step = () => {
    const slide = track.querySelector(".testimonial");
    if (!slide) return Math.max(track.clientWidth * 0.85, 1);
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    return slide.getBoundingClientRect().width + gap;
  };

  const scrollByDir = (dir) => {
    track.scrollBy({ left: dir * step(), behavior: "smooth" });
  };

  root.querySelectorAll("[data-dir]").forEach((btn) => {
    btn.addEventListener("click", () => {
      scrollByDir(btn.getAttribute("data-dir") === "prev" ? -1 : 1);
    });
  });

  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByDir(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByDir(-1);
    }
  });
})();
