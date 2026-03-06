function applyFilter(filter) {
  const img = document.getElementById("main-render");
  if (!img) return;

  img.style.filter = filter;
  img.parentElement.classList.add("animate-pulse");

  setTimeout(() => {
    img.parentElement.classList.remove("animate-pulse");
  }, 500);
}