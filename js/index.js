document.addEventListener("DOMContentLoaded", () => {
  setupPreloader();
  setupScrollAnimations();
  setupHoverTilt();
});

function setupPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  const hidePreloader = () => {
    if (preloader.classList.contains("hide")) return;
    preloader.classList.add("hide");
    window.setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  };

  if (document.readyState === "complete") {
    window.setTimeout(hidePreloader, 650);
  } else {
    window.addEventListener("load", () => {
      window.setTimeout(hidePreloader, 650);
    });
  }

  window.setTimeout(hidePreloader, 2200);
}

function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("show");
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
}

function setupHoverTilt() {
  const cards = document.querySelectorAll(".hover-card");
  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}