const onScrollTop = document.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.pageYOffset < 50) {
    header.classList.add("active-header");
  } else {
    header.classList.remove("active-header");
  }
});
