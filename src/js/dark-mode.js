const darkModeSwitch = document.querySelector(".dark-mode-switch");
const body = document.querySelector("body");

darkModeSwitch.addEventListener("click", () => {
  const isChecked = darkModeSwitch.getAttribute("aria-checked") === "true";
  darkModeSwitch.setAttribute("aria-checked", !isChecked);
  body.classList.toggle("dark-mode");
});

darkModeSwitch.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "Enter") {
    event.preventDefault();
    const isChecked = darkModeSwitch.getAttribute("aria-checked") === "true";
    darkModeSwitch.setAttribute("aria-checked", !isChecked);
    body.classList.toggle("dark-mode");
  }
});