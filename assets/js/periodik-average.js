class BiayaTersediaUntukDijual {
  constructor(totalUntukDijual, totalUnit, sisaPersediaan) {
    this.totalUntukDijual = totalUntukDijual;
    this.totalUnit = totalUnit;
    this.biayatotal = this.totalUntukDijual / this.totalUnit;
    this.sisaPersediaan = sisaPersediaan;
    this.hargaPerUnit = this.biayatotal;
    this.totalBiayaUntukDijual = this.sisaPersediaan * this.hargaPerUnit;
  }
}

class BebanPokokPenjualan {
  constructor(persediaanAwal, pembelian, persediaanAkhir) {
    this.persediaanAwal = persediaanAwal;
    this.pembelian1 = pembelian[0];
    this.pembelian2 = pembelian[1];
    this.pembelianTotal = this.pembelian1 + this.pembelian2;
    this.barangSediaJual = this.persediaanAwal + this.pembelianTotal;
    this.persediaanAkhir = persediaanAkhir;
    this.bebanPokokPenjualan = this.barangSediaJual - this.persediaanAkhir;
  }
}

const biayaUntukDijual = fetchData(
  new BiayaTersediaUntukDijual(6720000, 1500, 600)
);
const bebanPokokPenjualan = fetchData(
  new BebanPokokPenjualan(800000, [3520000, 2400000], 2688000)
);
const dataTransaksi = [...biayaUntukDijual, ...bebanPokokPenjualan];

const input = Array.from(document.querySelectorAll("input"));

const cek = document.querySelector("#check");
cek.addEventListener("click", () => {
  let result = cekJawaban(input, dataTransaksi);
  console.log(result);
  if (result == -1) {
    infoSuccess(result);
    soalSelesai();
  } else {
    infoFailed(result);
  }
});

function infoFailed(res) {
  let text;
  switch (true) {
    case res == 0:
      text = "total tersedia yang untuk dijual";
      break;
    case res == 1:
      text = "total unit";
      break;
    case res == 2:
      text = "biaya tersedia untuk dijual";
      break;
    case res == 3:
      text = "sisa unit";
      break;
    case res == 4:
      text = "harga per unit";
      break;
    case res == 5:
      text = "total biaya tersedia untuk dijual";
      break;
    case res == 6:
      text = "persediaan awal";
      break;
    case res < 10:
      text = "pembelian";
      break;
    case res == 10:
      text = "biaya barang tersedia untuk dijual";
      break;
    case res == 11:
      text = "persediaan akhir";
      break;
    case (res = 12):
      text = "beban pokok penjualan";
      break;
  }
  if (res < 5) {
    massage = `Jawaban anda salah pada bagian sisa persediaan di ${text}`;
  } else {
    massage = `Jawaban anda salah pada bagian beban pokok penjualan di ${text}`;
  }
  chat.innerText = massage;
  play(massage);
}

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  let ulang = confirm("Apakah anda yakin ingin mengulang?");
  if (ulang) {
    input.forEach((el) => {
      el.value = "";
    });
    chat.innerText = "Selamat Mengerjakan";
    hintCounter = 3;
    hintInfo.innerText = hintCounter;
  }
});

const hint = document.querySelector("#hint");
const title = document.querySelector(".title-soal");
const img = document.querySelector(".img-soal");
let isChanged = false;
hint.addEventListener("click", () => {
  if (isChanged) {
    title.textContent = "Soal";
    img.setAttribute("src", "../../assets/img/soal-periodik-average.PNG");
    isChanged = !isChanged;
  } else {
    title.textContent = "Metode Perpetual";
    img.setAttribute("src", "../../assets/img/jawab-perpetual-average.png");
    isChanged = !isChanged;
  }
});

function hitung(col) {
  for (let i = 0; i < col.length; i++) {
    if (i == 2) {
      col[i].addEventListener("focus", function () {
        this.value = parseInt(col[i - 2].value) / parseInt(col[i - 1].value);
      });
    } else if (i == 5) {
      col[i].addEventListener("focus", function () {
        this.value = parseInt(col[i - 2].value) * parseInt(col[i - 1].value);
      });
    } else if (i == 9) {
      col[i].addEventListener("focus", function () {
        this.value = parseInt(col[i - 2].value) + parseInt(col[i - 1].value);
      });
    } else if (i == 10) {
      col[i].addEventListener("focus", function () {
        this.value = parseInt(col[i - 4].value) + parseInt(col[i - 1].value);
      });
    } else if (i == 12) {
      col[i].addEventListener("focus", function () {
        this.value = parseInt(col[i - 2].value) - parseInt(col[i - 1].value);
      });
    }
  }
}
hitung(input);

function infoHintSuccess(res) {
  let text;
  switch (true) {
    case res == 0:
      text = "total tersedia yang untuk dijual";
      break;
    case res == 1:
      text = "total unit";
      break;
    case res == 2:
      text = "biaya tersedia untuk dijual";
      break;
    case res == 3:
      text = "sisa unit";
      break;
    case res == 4:
      text = "harga per unit";
      break;
    case res == 5:
      text = "total biaya tersedia untuk dijual";
      break;
    case res == 6:
      text = "persediaan awal";
      break;
    case res < 10:
      text = "pembelian";
      break;
    case res == 10:
      text = "biaya barang tersedia untuk dijual";
      break;
    case res == 11:
      text = "persediaan akhir";
      break;
    case (res = 12):
      text = "total beban pokok penjualan";
      break;
  }
  if (res < 9) {
    massage = `Anda menggunakan bantuan pada bagian sisa persediaan di ${text}`;
  } else {
    massage = `Anda menggunakan bantuan pada bagian beban pokok penjualan di ${text}`;
  }
  chat.innerText = massage;
  play(massage);
}
