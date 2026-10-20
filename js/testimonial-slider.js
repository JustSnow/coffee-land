(() => {
  const root = document.querySelector(".testimonial-slider");
  if (!root) return;

  const track = root.querySelector(".testimonial-slider__track");
  if (!track) return;

  const step = () => {
    const slide = track.querySelector(".testimonial");
    if (!slide) return track.clientWidth * 0.8;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    return slide.getBoundingClientRect().width + gap;
  };

  root.querySelectorAll("[data-dir]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dir = btn.getAttribute("data-dir") === "prev" ? -1 : 1;
      track.scrollBy({ left: dir * step(), behavior: "smooth" });
    });
  });

  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      track.scrollBy({ left: step(), behavior: "smooth" });
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      track.scrollBy({ left: -step(), behavior: "smooth" });
    }
  });
})();
