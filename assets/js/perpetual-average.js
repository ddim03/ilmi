class DataAverage {
  constructor(tanggal, pembelian, bpp, persediaan) {
    this.tanggal = tanggal;
    this.pembelianKuantitas = pembelian[0];
    this.pembelianHpu = pembelian[1];
    this.pembelianJb = pembelian[2];
    this.bppKuantitas = bpp[0];
    this.bppHpu = bpp[1];
    this.bppJb = bpp[2];
    this.persediaanKuantitas = persediaan[0];
    this.persediaanHpu = persediaan[1];
    this.persediaanJb = persediaan[2];
  }
}

const data1 = fetchData(
  new DataAverage("1", [0, 0, 0], [0, 0, 0], [200, 4000, 800000])
);
const data2 = fetchData(
  new DataAverage("9", [0, 0, 0], [100, 4000, 400000], [100, 4000, 400000])
);
const data3 = fetchData(
  new DataAverage("12", [800, 4400, 3520000], [0, 0, 0], [900, 4355, 3920000])
);
const data4 = fetchData(
  new DataAverage("16", [0, 0, 0], [500, 4355, 2177500], [400, 4356, 1742500])
);
const data5 = fetchData(
  new DataAverage("22", [500, 4800, 2400000], [0, 0, 0], [900, 4602, 4142500])
);
const data6 = fetchData(
  new DataAverage("27", [0, 0, 0], [300, 4602, 1380600], [600, 4603, 2761900])
);

const row1 = Array.from(document.querySelectorAll("tr.row1 td input"));
const row2 = Array.from(document.querySelectorAll("tr.row2 td input"));
const row3 = Array.from(document.querySelectorAll("tr.row3 td input"));
const row4 = Array.from(document.querySelectorAll("tr.row4 td input"));
const row5 = Array.from(document.querySelectorAll("tr.row5 td input"));
const row6 = Array.from(document.querySelectorAll("tr.row6 td input"));
const row7 = Array.from(document.querySelectorAll("tr.row7 td input"));

const check = document.querySelector("#check");
let row = 1;
let soalBenar = false;

function hitung(row, prevData, tr) {
  for (let i = 0; i < row.length; i++) {
    let a, b;
    if (i == 3 || i == 6) {
      row[i].addEventListener("focus", function () {
        a = row[i - 2].value;
        b = row[i - 1].value;
        if (a != "" && b != "") this.value = parseInt(a) * parseInt(b);
      });
    } else if (i == 8) {
      row[i].addEventListener("focus", function () {
        a = row[i + 1].value;
        b = row[i - 1].value;
        if (a != "" && b != "") this.value = Math.floor(parseInt(a) / parseInt(b));
      });
    } else if (i == 9) {
      a = prevData;
      if (tr == 1 && prevData != "") {
        row[i].addEventListener("focus", function () {
          b = row[3].value;
          this.value = b != "" ? parseInt(a) + parseInt(b) : "";
        });
      } else if (tr == 2 && prevData != "") {
        row[i].addEventListener("focus", function () {
          b = row[6].value;
          this.value = b != "" ? parseInt(a) - parseInt(b) : "";
        });
      }
    }
  }
}

autoMultiply(row1);
check.addEventListener("click", () => {
  if (row == 1) {
    let result = cekSoal(row1, 1, 6, data1);
    if (result == 10) {
      soalBenar = true;
      jawabBenar(row1, row + 1);
      hitung(row2, row1[9].value, 2);
    } else {
      soalBenar = false;
      info(result, "salah");
    }
  }
  if (row == 2) {
    let result = cekSoal(row2, 1, 3, data2);
    if (result == 10) {
      soalBenar = true;
      jawabBenar(row2, row + 1);
      hitung(row3,row2[9].value, 1)
    } else {
      soalBenar = false;
      info(result, "salah");
    }
  }
  if (row == 3) {
    let result = cekSoal(row3, 4, 6, data3);
    if (result == 10) {
      soalBenar = true;
      jawabBenar(row3, row + 1);
      hitung(row4,row3[9].value,2)
    } else {
      soalBenar = false;
      info(result, "salah");
    }
  }
  if (row == 4) {
    let result = cekSoal(row4, 1, 3, data4);
    if (result == 10) {
      soalBenar = true;
      jawabBenar(row4, row + 1);
      hitung(row5,row4[9].value,1)
    } else {
      soalBenar = false;
      info(result, "salah");
    }
  }
  if (row == 5) {
    let result = cekSoal(row5, 4, 6, data5);
    if (result == 10) {
      soalBenar = true;
      jawabBenar(row5, row + 1);
      hitung(row6,row5[9].value,2)
    } else {
      soalBenar = false;
      info(result, "salah");
    }
  }
  if (row == 6) {
    let result = cekSoal(row6, 1, 3, data6);
    if (result == 10) {
      soalBenar = true;
      jawabBenar(row6, row + 0);
      soalSelesai();
    } else {
      soalBenar = false;
      info(result, "salah");
    }
  }
  if (soalBenar == true && row <= 6) {
    row++;
  }
});

const hint = document.querySelector("#hint");
const hintInfo = document.querySelector(".hint-info");
let hintCounter = 3;
hint.addEventListener("click", () => {
  let hintResult;
  if (hintCounter <= 3 && hintCounter > 0) {
    switch (row) {
      case 1:
        hintResult = useHint(row1, 1, 6, data1);
        break;
      case 2:
        hintResult = useHint(row2, 1, 3, data2);
        break;
      case 3:
        hintResult = useHint(row3, 4, 6, data3);
        break;
      case 4:
        hintResult = useHint(row4, 1, 3, data4);
        break;
      case 5:
        hintResult = useHint(row5, 4, 6, data6);
        break;
      case 6:
        hintResult = useHint(row6, 1, 3, data6);
        break;
    }
    info(hintResult, "hint");
    if (hintResult != -1) {
      hintCounter--;
    }
  } else {
    massage = "Bantuan anda sudah habis";
    chat.innerText = massage;
    play(massage);
  }
  hintInfo.innerHTML = hintCounter;
});

const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", () => {
  const resetConfirm = confirm("Apakah anda ingin mengulangi dari awal");
  if (resetConfirm) {
    const tableRow = document.querySelectorAll("tbody tr");
    tableRow.forEach((e, i) => {
      if (i == 0) {
        const firstrow = Array.from(document.querySelectorAll("tr td input"));
        firstrow.forEach((e) => {
          e.value = "";
          e.removeAttribute("disabled");
        });
      }
      if (i > 0) {
        if (!e.classList.contains("d-none")) {
          e.classList.add("d-none");
        }
      }
    });
    row = 1;
    chat.innerHTML = "Selamat Mengerjakan";
    hintCounter = 3;
    hintInfo.innerHTML = hintCounter;
  }
});
