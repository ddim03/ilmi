class SisaPersediaan {
  constructor(sisa, biayaBeliAkhir, biayaBeliAkhir2, biayaBeliAkhir3) {
    this.sisa = sisa;
    this.biayaBeliakhirUnit = biayaBeliAkhir[0];
    this.biayaBeliakhirHarga = biayaBeliAkhir[1];
    this.biayaBeliakhirTotal =
      this.biayaBeliakhirHarga * this.biayaBeliakhirUnit;
    this.biayaBeliakhir2Unit = biayaBeliAkhir2[0];
    this.biayaBeliakhir2Harga = biayaBeliAkhir2[1];
    this.biayaBeliakhir2Total =
      this.biayaBeliakhir2Harga * this.biayaBeliakhir2Unit;
    this.biayaBeliakhir3Unit = biayaBeliAkhir3[0];
    this.biayaBeliakhir3Harga = biayaBeliAkhir3[1];
    this.biayaBeliakhir3Total =
      this.biayaBeliakhir3Harga * this.biayaBeliakhir3Unit;
    this.persediaanUnit =
      this.biayaBeliakhirUnit +
      this.biayaBeliakhir2Unit +
      this.biayaBeliakhir3Unit;
    this.persediaanTotal =
      this.biayaBeliakhirTotal +
      this.biayaBeliakhir2Total +
      this.biayaBeliakhir3Total;
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
  new SisaPersediaan(600, [200, 4800], [300, 4400], [100, 4000])
);
const bebanPokokPenjualan = fetchData(
  new BebanPokokPenjualan(800000, [3520000, 2400000], 2680000)
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
    case res < 10:
      text = "biaya pembelian paling akhir ketiga";
      break;
    case res < 12:
      text = "persediaan 28 Februari 2021";
      break;
    case res == 12:
      text = "persediaan awal";
      break;
    case res < 16:
      text = "pembelian";
      break;
    case res == 16:
      text = "biaya barang tersedia untuk dijual";
      break;
    case res == 17:
      text = "persediaan akhir";
      break;
    case res == 18:
      text = "beban pokok penjualan";
      break;
  }
  if (res < 12) {
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
const hintInfo = document.querySelector(".hint-info");
let hintCounter = 3;
hint.addEventListener("click", () => {
  if (hintCounter <= 3 && hintCounter > 0) {
    let hintResult = useHint(input, dataTransaksi);
    console.log(hintResult);
    if (hintResult == -1) {
      infoHintFailed();
    } else {
      infoHintSuccess(hintResult);
      hintCounter--;
      console.log(hintCounter);
      hintInfo.innerHTML = hintCounter;
    }
  } else {
    massage = "Bantuan anda sudah habis";
    chat.innerText = massage;
    play(massage);
  }
});

function hitung(col) {
  for (let i = 0; i < col.length; i++) {
    if (i == 3 || i == 6 || i == 9) {
      col[i].addEventListener("focus", function () {
        this.value = parseInt(col[i - 2].value) * parseInt(col[i - 1].value);
      });
    } else if (i == 10) {
      col[i].addEventListener("focus", function () {
        this.value =
          parseInt(col[i - 6].value) +
          parseInt(col[i - 3].value) +
          parseInt(col[i - 9].value);
      });
    } else if (i == 11) {
      col[i].addEventListener("focus", function () {
        this.value =
          parseInt(col[i - 5].value) +
          parseInt(col[i - 2].value) +
          parseInt(col[i - 8].value);
      });
    } else if (i == 15) {
      col[i].addEventListener("focus", function () {
        this.value = parseInt(col[i - 2].value) + parseInt(col[i - 1].value);
      });
    } else if (i == 16) {
      col[i].addEventListener("focus", function () {
        this.value = parseInt(col[i - 4].value) + parseInt(col[i - 1].value);
      });
    } else if (i == 18) {
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
      text = "sisa unit";
      break;
    case res < 4:
      text = "biaya pembelian paling akhir";
      break;
    case res < 7:
      text = "biaya pembelian paling akhir kedua";
      break;
    case res < 10:
      text = "biaya pembelian paling akhir ketiga";
      break;
    case res < 12:
      text = "persediaan 28 Februari 2021";
      break;
    case res == 12:
      text = "persediaan awal";
      break;
    case res < 16:
      text = "pembelian";
      break;
    case res == 16:
      text = "biaya barang tersedia untuk dijual";
      break;
    case res == 17:
      text = "persediaan akhir";
      break;
    case res == 18:
      text = "beban pokok penjualan";
      break;
  }
  if (res < 12) {
    massage = `Anda menggunakan bantuan pada bagian sisa persediaan di ${text}`;
  } else {
    massage = `Anda menggunakan bantuan pada bagian beban pokok penjualan di ${text}`;
  }
  chat.innerText = massage;
  play(massage);
}
