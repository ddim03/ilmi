const speech = new SpeechSynthesisUtterance();
function play(message) {
  speech.lang = "id";
  speech.text = message;
  window.speechSynthesis.speak(speech);
}
let massage = "silahkan pilih soal yang ingin dikerjakan";

const navButton = document.querySelector(".nav-button");
navButton.addEventListener("click", () => {
  const sidebar = document.querySelector(".sidebar");
  if (document.body.clientWidth >= 1024) {
    sidebar.classList.toggle("sidebar-mini");
  } else {
    sidebar.classList.toggle("sidebar-mobile");
  }
});

const showMenu2 = document.querySelector(".menu-link.perpetual");
showMenu2.addEventListener("click", () => {
  const menuDetails = document.querySelector(".menu-details.perpetual");
  menuDetails.classList.toggle("show");
});

const showMenu1 = document.querySelector(".menu-link.periodik");
showMenu1.addEventListener("click", () => {
  const menuDetails = document.querySelector(".menu-details.periodik");
  menuDetails.classList.toggle("show");
});

document.onload = play(massage);