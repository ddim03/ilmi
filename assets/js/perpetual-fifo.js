// window.addEventListener('beforeunload', function(e){
//   e.preventDefault()
//   e.returnValue = ''
// })

const data1 = fetchData(new DataTransaksi("1", [0, 0], [0, 0], [200, 4000]));
const data2 = fetchData(
  new DataTransaksi("9", [0, 0], [100, 4000], [100, 4000])
);
const data3 = fetchData(
  new DataTransaksi("12", [800, 4400], [0, 0], [100, 4000])
);
const data4 = fetchData(new DataTransaksi("", [0, 0], [0, 0], [800, 4400]));
const data5 = fetchData(new DataTransaksi("16", [0, 0], [100, 4000], 0));
const data6 = fetchData(
  new DataTransaksi("", [0, 0], [400, 4400], [400, 4400])
);
const data7 = fetchData(
  new DataTransaksi("22", [500, 4800], [0, 0], [400, 4400])
);
const data8 = fetchData(new DataTransaksi("", [0, 0], [0, 0], [500, 4800]));
const data9 = fetchData(
  new DataTransaksi("27", [0, 0], [300, 4400], [100, 4400])
);
const data10 = fetchData(new DataTransaksi("", [0, 0], [0, 0], [500, 4800]));

const totalBPP = total([
  data1[6],
  data2[6],
  data3[6],
  data4[6],
  data5[6],
  data6[6],
  data7[6],
  data8[6],
  data9[6],
  data10[6],
]);

const totalPersediaan = total([data9[9], data10[9]]);

const row1 = Array.from(document.querySelectorAll("tr.row1 td input"));
const row2 = Array.from(document.querySelectorAll("tr.row2 td input"));
const row3 = Array.from(document.querySelectorAll("tr.row3 td input"));
const row4 = Array.from(document.querySelectorAll("tr.row4 td input"));
const row5 = Array.from(document.querySelectorAll("tr.row5 td input"));
const row6 = Array.from(document.querySelectorAll("tr.row6 td input"));
const row7 = Array.from(document.querySelectorAll("tr.row7 td input"));
const row8 = Array.from(document.querySelectorAll("tr.row8 td input"));
const row9 = Array.from(document.querySelectorAll("tr.row9 td input"));
const row10 = Array.from(document.querySelectorAll("tr.row10 td input"));
const row11 = Array.from(document.querySelectorAll("tr.row11 td input"));

const total1 = document.querySelector(".total-bpp");
total1.addEventListener("focus", function () {
  this.value = totalBPP;
});

const total2 = document.querySelector(".total-persediaan");
total2.addEventListener("focus", function () {
  this.value = totalPersediaan;
});

const check = document.querySelector("#check");
let row = 1;
let soalBenar = false;
autoMultiply(row1);
check.addEventListener("click", () => {
  if (row == 1) {
    let result = cekSoal(row1, 1, 6, data1);
    if (result == 10) {
      soalBenar = true;
      jawabBenar(row1, row + 1);
      autoMultiply(row2);
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
      autoMultiply(row3);
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
      autoMultiply(row4);
    } else {
      soalBenar = false;
      info(result, "salah");
    }
  }
  if (row == 4) {
    let result = cekSoal(row4, 0, 6, data4);
    if (result == 10) {
      soalBenar = true;
      jawabBenar(row4, row + 1);
      autoMultiply(row5);
    } else {
      soalBenar = false;
      info(result, "salah");
    }
  }
  if (row == 5) {
    let n = 0;
    for (let i = 0; i < row5.length; i++) {
      if (i >= 1 && i <= 3) {
        if (row5[i].value == "") {
          n++;
        } else {
          soalBenar = false;
          info(i, "salah");
          break;
        }
      } else if (i >= 7 && i <= 9) {
        if (row5[i].value == "") {
          n++;
        } else {
          soalBenar = false;
          info(i, "salah");
          break;
        }
      } else if (i < 7 || i > 3) {
        if (row5[i].value == data5[i]) {
          n++;
        } else {
          soalBenar = false;
          info(i, "salah");
          break;
        }
      }
    }
    if (n == 10) {
      soalBenar = true;
      jawabBenar(row5, row + 1);
      autoMultiply(row6);
    }
  }
  if (row == 6) {
    let result = cekSoal(row6, 0, 3, data6);
    if (result == 10) {
      soalBenar = true;
      jawabBenar(row6, row + 1);
      autoMultiply(row7);
    } else {
      soalBenar = false;
      info(result, "salah");
    }
  }
  if (row == 7) {
    let result = cekSoal(row7, 4, 6, data7);
    if (result == 10) {
      soalBenar = true;
      jawabBenar(row7, row + 1);
      autoMultiply(row8);
    } else {
      soalBenar = false;
      info(result, "salah");
    }
  }
  if (row == 8) {
    let result = cekSoal(row8, 0, 6, data8);
    if (result == 10) {
      soalBenar = true;
      jawabBenar(row8, row + 1);
      autoMultiply(row9);
    } else {
      soalBenar = false;
      info(result, "salah");
    }
  }
  if (row == 9) {
    let result = cekSoal(row9, 1, 3, data9);
    if (result == 10) {
      soalBenar = true;
      jawabBenar(row9, row + 1);
      autoMultiply(row10);
    } else {
      soalBenar = false;
      info(result, "salah");
    }
  }
  if (row == 10) {
    let result = cekSoal(row10, 0, 6, data10);
    if (result == 10) {
      soalBenar = true;
      jawabBenar(row10, row + 1);
    } else {
      soalBenar = false;
      info(result, "salah");
    }
  }
  if (row == 11) {
    if (total1.value != totalBPP) {
      soalBenar = false;
      massage = `Jawaban anda salah pada bagian total jumlah biaya di beban pokok penjualan`;
    } else if (total2.value != totalPersediaan) {
      soalBenar = false;
      massage = `Jawaban anda salah pada bagian total jumlah biaya di persediaan`;
    } else {
      soalSelesai();
      total1.setAttribute("disabled", true);
      total2.setAttribute("disabled", true);
    }
    if (row != 11) {
      chat.innerText = massage;
      play(massage);
    }
  }
  if (soalBenar == true && row <= 11) {
    row++;
  }
});

const hint = document.querySelector("#hint");
const hintInfo = document.querySelector(".hint-info");

function useHintRow5() {
  for (let i = 0; i <= data5.length; i++) {
    if (i >= 1 && i <= 4) {
      if (row5[i].value != "") {
        row5[i].value = "";
        return i;
      }
    } else if (i >= 7 && i <= 9) {
      if (row5[i].value != "") {
        row5[i].value = "";
        return i;
      }
    } else {
      if (row5[i].value != data5[i] || row5[i].value == "") {
        row5[i].value = data5[i];
        return i;
      }
    }
    return -1;
  }
}

function useHintRow11() {
  if (row11[0].value == "" || row11[0].value != totalBPP) {
    row11[0].value = totalBPP;
    return 0;
  } else if (row11[1].value == "" || row11[1].value != totalPersediaan) {
    row11[1].value = totalPersediaan;
    return 1;
  }
  return -1;
}

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
        hintResult = useHint(row4, 0, 6, data4);
        break;
      case 5:
        hintResult = useHintRow5();
        break;
      case 6:
        hintResult = useHint(row6, 0, 4, data6);
        break;
      case 7:
        hintResult = useHint(row7, 4, 6, data7);
        break;
      case 8:
        hintResult = useHint(row8, 0, 6, data8);
        break;
      case 9:
        hintResult = useHint(row9, 1, 3, data9);
        break;
      case 10:
        hintResult = useHint(row10, 0, 6, data10);
        break;
      case 11:
        hintResult = useHintRow11();
        break;
    }
    if (row != 11) {
      info(hintResult, "hint");
    } else {
      infoTotal(hintResult);
    }
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
