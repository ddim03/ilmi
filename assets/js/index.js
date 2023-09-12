const speech = new SpeechSynthesisUtterance();
function play(message) {
  speech.lang = "id";
  speech.text = message;
  window.speechSynthesis.speak(speech);
}
let massage =
  "Halo, Selamat datang diaplikasi ilmi, silahkan pilih materi yang ingin dipelajari";
document.onload = play(massage);

const navButton = document.querySelector(".nav-button");
navButton.addEventListener("click", () => {
  const sidebar = document.querySelector(".sidebar");
  if (document.body.clientWidth >= 1024) {
    sidebar.classList.toggle("sidebar-mini");
  } else {
    sidebar.classList.toggle("sidebar-mobile");
  }
});

const showMenu = document.querySelector(".menu-link.perpetual");
showMenu.addEventListener("click", () => {
  const menuDetails = document.querySelector(".menu-details.perpetual");
  menuDetails.classList.toggle("show");
});
