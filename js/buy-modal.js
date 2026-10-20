(() => {
  const modal = document.querySelector("[data-buy-modal]");
  if (!modal) return;

  const dialog = modal.querySelector(".modal__dialog");
  const form = modal.querySelector("[data-buy-form]");
  const openers = document.querySelectorAll("[data-open-buy-modal]");
  const closers = modal.querySelectorAll("[data-close-buy-modal]");
  let lastFocus = null;

  const focusables = () =>
    [
      ...dialog.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ),
    ].filter((el) => !el.hasAttribute("disabled") && el.type !== "hidden");

  const open = () => {
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    const email = modal.querySelector("#buy-email");
    (email || dialog).focus();
  };

  const close = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocus && typeof lastFocus.focus === "function") {
      lastFocus.focus();
    }
  };

  openers.forEach((btn) => {
    btn.addEventListener("click", open);
  });

  closers.forEach((el) => {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", (event) => {
    if (modal.hidden) return;

    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== "Tab") return;
    const items = focusables();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      close();
    });
  }
})();
