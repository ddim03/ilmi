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

class DataTransaksi {
  constructor(tanggal, pembelian, bpp, persediaan) {
    this.tanggal = tanggal;
    this.pembelianKuantitas = pembelian[0];
    this.pembelianHpu = pembelian[1];
    this.pembelianJb = this.pembelianKuantitas * this.pembelianHpu;
    this.bppKuantitas = bpp[0];
    this.bppHpu = bpp[1];
    this.bppJb = this.bppKuantitas * this.bppHpu;
    this.persediaanKuantitas = persediaan[0];
    this.persediaanHpu = persediaan[1];
    this.persediaanJb = this.persediaanKuantitas * this.persediaanHpu;
  }
}

function fetchData(datas) {
  let dataBaru = [];
  for (const data in datas) {
    dataBaru.push(datas[data]);
  }
  return dataBaru;
}

function autoMultiply(currRow) {
  for (let i = 0; i < currRow.length; i++) {
    if (i % 3 == 0 && i > 0) {
      currRow[i].addEventListener("focus", () => {
        let a = currRow[i - 2].value;
        let b = currRow[i - 1].value;
        let res;
        if (a != "" && b != "") {
          res = a * b;
        } else {
          res = "";
        }
        currRow[i].value = res;
      });
    }
  }
}

const total = (datas) => {
  let dataTotal = datas.reduce((a, i) => a + i);
  return dataTotal;
};

function cekSoal(inputUser, st, end, data) {
  let n = 0;
  for (let i = 0; i < inputUser.length; i++) {
    if (i >= st && i <= end) {
      if (inputUser[i].value == "") {
        n++;
      } else {
        return i;
      }
    } else if (i < st || i > end) {
      if (inputUser[i].value == data[i]) {
        n++;
      } else {
        return i;
      }
    }
  }
  return n;
}

function useHint(row, st, end, data) {
  for (let i = 0; i < data.length; i++) {
    if (i >= st && i <= end) {
      if (row[i].value != "") {
        row[i].value = "";
        return i;
      }
    } else {
      if (row[i].value != data[i] || row[i].value == "") {
        row[i].value = data[i];
        return i;
      }
    }
  }
  return -1;
}

function jawabBenar(row, newRow) {
  row.forEach((e) => {
    e.setAttribute("disabled", true);
  });
  massage = `Jawaban anda benar, silahkan dilanjutkan`;
  chat.innerText = massage;
  play(massage);
  document.querySelector(`tr.row${newRow}`).classList.remove("d-none");
}

function info(col, action) {
  let text, noHint;
  switch (col) {
    case 0:
      text = "tanggal";
      break;
    case 1:
      text = `kuantitas di pembelian`;
      break;
    case 2:
      text = `harga per unit di pembelian`;
      break;
    case 3:
      text = `jumlah biaya di pembelian`;
      break;
    case 4:
      text = `kuantitas di beban pokok penjualan`;
      break;
    case 5:
      text = `harga per unit di beban pokok penjualan`;
      break;
    case 6:
      text = `jumlah biaya di beban pokok penjualan`;
      break;
    case 7:
      text = `kuantitas di persediaan`;
      break;
    case 8:
      text = `harga per unit di persediaan`;
      break;
    case 9:
      text = `jumlah biaya di persediaan`;
      break;
    case -1:
      noHint = true;
      break;
  }
  if (action == "salah") {
    massage = `Jawaban anda salah pada bagian ${text}`;
  } else if (action == "hint" && !noHint) {
    massage = `Anda mengunakan bantuan pada bagian ${text}`;
  } else if (noHint) {
    massage = "jawaban anda sudah benar";
  }
  chat.innerText = massage;
  play(massage);
}

function infoTotal(col) {
  let text =
    col == 0
      ? "total jumlah biaya di beban pokok penjualan"
      : "total jumlah biaya di persediaan";
  massage = `Anda menggunakan bantuan pada bagian ${text}`;
  if (col == -1) {
    massage = "Jawaban anda sudah benar";
  }
  chat.innerText = massage;
  play(massage);
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
