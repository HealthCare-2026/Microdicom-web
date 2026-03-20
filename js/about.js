document.addEventListener("DOMContentLoaded", () => {
  initCounters();
  initShowcaseTabs();
  initSupportCards();
});

function initCounters() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    let value = 0;
    const step = Math.max(1, Math.ceil(target / 20));

    const update = () => {
      value += step;

      if (value >= target) {
        counter.textContent = String(target);
        return;
      }

      counter.textContent = String(value);
      requestAnimationFrame(update);
    };

    update();
  });
}

function initShowcaseTabs() {
  const tabs = document.querySelectorAll(".showcase-tab");
  const panels = document.querySelectorAll(".showcase-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.target;

      tabs.forEach((item) => item.classList.remove("active"));
      panels.forEach((panel) => panel.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(targetId)?.classList.add("active");
    });
  });
}

function initSupportCards() {
  const cards = document.querySelectorAll(".support-card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      cards.forEach((item) => item.classList.remove("support-card-active"));
      card.classList.add("support-card-active");
    });
  });
}