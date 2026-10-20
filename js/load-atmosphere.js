(() => {
  const root = document.documentElement;

  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
  } catch (e) {
    return;
  }

  // No-JS path: never set pending → CSS stays on final visible frame.
  root.classList.add("motion-pending");

  const play = () => {
    root.classList.add("motion-play");
    root.classList.remove("motion-pending");
  };

  // Double rAF so the pending (hidden) frame can paint, then run entrance.
  requestAnimationFrame(() => {
    requestAnimationFrame(play);
  });
})();
