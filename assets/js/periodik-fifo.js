class SisaPersediaan {
  constructor(sisa, biayaBeliAkhir, biayaBeliAkhir2) {
    this.sisa = sisa;
    this.biayaBeliakhirUnit = biayaBeliAkhir[0];
    this.biayaBeliakhirHarga = biayaBeliAkhir[1];
    this.biayaBeliakhirTotal =
      this.biayaBeliakhirHarga * this.biayaBeliakhirUnit;
    this.biayaBeliakhir2Unit = biayaBeliAkhir2[0];
    this.biayaBeliakhir2Harga = biayaBeliAkhir2[1];
    this.biayaBeliakhir2Total =
      this.biayaBeliakhir2Harga * this.biayaBeliakhir2Unit;
    this.persediaanUnit = this.biayaBeliakhirUnit + this.biayaBeliakhir2Unit;
    this.persediaanTotal = this.biayaBeliakhirTotal + this.biayaBeliakhir2Total;
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

const sisaPersediaan = fetchData(
  new SisaPersediaan(600, [500, 4800], [100, 4400])
);
const bebanPokokPenjualan = fetchData(
  new BebanPokokPenjualan(800000, [3520000, 2400000], 2840000)
);
const dataTransaksi = [...sisaPersediaan, ...bebanPokokPenjualan];

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
      text = "sisa unit";
      break;
    case res < 4:
      text = "biaya pembelian paling akhir";
      break;
    case res < 7:
      text = "biaya pembelian paling akhir kedua";
      break;
    case res < 9:
      text = "persediaan 28 Februari 2021";
      break;
    case 9:
      text = "persediaan awal";
      break;
    case res < 13:
      text = "pembelian";
      break;
    case res == 13:
      text = "biaya barang tersedia untuk dijual";
      break;
    case res == 14:
      text = "persediaan akhir";
      break;
    case res == 15:
      text = "beban pokok penjualan";
      break;
  }
  if (res < 9) {
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
    img.setAttribute("src", "../../assets/img/soal-periodik-fifo.PNG");
    isChanged = !isChanged;
  } else {
    title.textContent = "Metode Perpetual";
    img.setAttribute("src", "../../assets/img/jawab-perpetual-fifo.png");
    isChanged = !isChanged;
  }
});

function hitung(col) {
  for (let i = 0; i < col.length; i++) {
    if (i == 3 || i == 6) {
      col[i].addEventListener("focus", function () {
        this.value = parseInt(col[i - 2].value) * parseInt(col[i - 1].value);
      });
    } else if (i == 7) {
      col[i].addEventListener("focus", function () {
        this.value = parseInt(col[i - 6].value) + parseInt(col[i - 3].value);
      });
    } else if (i == 8) {
      col[i].addEventListener("focus", function () {
        this.value = parseInt(col[i - 5].value) + parseInt(col[i - 2].value);
      });
    } else if (i == 12) {
      col[i].addEventListener("focus", function () {
        this.value = parseInt(col[i - 2].value) + parseInt(col[i - 1].value);
      });
    } else if (i == 13) {
      col[i].addEventListener("focus", function () {
        this.value = parseInt(col[i - 4].value) + parseInt(col[i - 1].value);
      });
    } else if (i == 15) {
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
      text = "unit";
      break;
    case res < 4:
      text = "biaya pembelian paling akhir";
      break;
    case res < 7:
      text = "biaya pembelian paling akhir kedua";
      break;
    case res < 9:
      text = "persediaan 28 Februari 2021";
      break;
    case res == 9:
      text = "persediaan awal";
      break;
    case res < 13:
      text = "pembelian";
      break;
    case res == 13:
      text = "biaya barang tersedia untuk dijual";
      break;
    case res == 14:
      text = "persediaan akhir";
      break;
    case res == 15:
      text = "beban pokok penjualan";
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
