document.querySelectorAll(".chapter-nav a[data-nav]").forEach((link) => {
  const current = document.body.dataset.page;
  link.classList.toggle("is-active", link.dataset.nav === current);
});
