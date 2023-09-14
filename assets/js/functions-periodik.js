const speech = new SpeechSynthesisUtterance();
function play(message) {
  speech.lang = "id";
  speech.text = message;
  window.speechSynthesis.speak(speech);
}

let massage;
let chat;

if (window.innerWidth < 768) {
  chat = document.querySelector("span.interac-text-mobile");
} else {
  chat = document.querySelector("span.interac-text");
}
function fetchData(datas) {
  let dataBaru = [];
  for (const data in datas) {
    dataBaru.push(datas[data]);
  }
  return dataBaru;
}

function cekJawaban(data1, data2) {
  for (let i = 0; i < data1.length; i++) {
    if (data1[i].value != data2[i]) {
      return i;
    }
  }
  return -1;
}


function soalSelesai() {
  massage = "Selamat!, anda telah menyelesaikan latihan, apakah anda ingin mengulangi latihan ini?"
  chat.innerText = massage
  play(massage)
  Swal.fire({
    title: "Selamat",
    text: "Anda telah menyelesaikan latihan, apakah anda ingin mengulang latihan ini?",
    imageUrl: "../../assets/img/medal.png",
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: "medal",
    confirmButtonText: "Ya",
    showCancelButton: true,
    cancelButtonText: "Tidak",
    allowOutsideClick: false,
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.reload();
    } else {
      window.location.href = "../../latihan.html";
    }
  });
}

const back = document.querySelector("#back");
back.addEventListener("click", () => {
  const kembali = confirm(
    "Apakah anda ingi keluar dari latihan ? \nprogress tidak akan disimpan"
  );
  if (kembali) {
    window.location.href = "../../latihan.html";
  }
});