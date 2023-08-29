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

const speech = new SpeechSynthesisUtterance();
function play(message) {
  speech.lang = "id";
  speech.text = message;
  window.speechSynthesis.speak(speech);
}

let massage;
const chat = document.querySelector("span.interac-text");

function fetchData(datas) {
  let dataBaru = [];
  for (const data in datas) {
    dataBaru.push(datas[data]);
  }
  return dataBaru;
}

const sisaPersediaan = fetchData(
  new SisaPersediaan(600, [500, 4800], [100, 4400])
);
const bebanPokokPenjualan = fetchData(
  new BebanPokokPenjualan(800000, [3520000, 2400000], 2840000)
);
const dataTransaksi = [...sisaPersediaan, ...bebanPokokPenjualan];

const input = Array.from(document.querySelectorAll("input"));

function cekJawaban(data1, data2) {
  for (let i = 0; i < data1.length; i++) {
    if (data1[i].value != data2[i]) {
      return i;
    }
  }
  return -1;
}

const cek = document.querySelector("#check");
cek.addEventListener("click", () => {
  let result = cekJawaban(input, dataTransaksi);
  console.log(result);
  if (result == -1) {
    infoSuccess(result);
  } else {
    infoFailed(result);
  }
});

function infoSuccess() {
  massage = "Jawaban anda sudah benar";
  chat.innerText = massage;
  play(massage);
  return;
}

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

function infoSuccess() {
  const popupBox = `<div class="swal2-html-container" id="swal2-html-container" style="display: block;">
  <img src="../../../assets/img/medal.png" width="200px" height="200px"/>
  <p class="fs-6">anda telah menyelesaikan latihan, Apakah anda ingin mengulangi latihan ini?</p>
  </div>`;
  Swal.fire({
    title: "Selamat!",
    html: popupBox,
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

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
  let ulang = confirm("Apakah anda yakin ingin mengulang?");
  if (ulang) {
    input.forEach((el) => {
      el.value = "";
    });
    chat.innerText = "Selamat Mengerjakan";
    hintCounter = 3
    hintInfo.innerText = hintCounter
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

function useHint(data1, data2) {
  for (let i = 0; i < data1.length; i++) {
    if (data1[i].value != data2[i]) {
      data1[i].value = data2[i];
      return i;
    }
  }
  return -1;
}

function infoHintFailed() {
  massage = "bantuan tidak dapat digunakan";
  chat.innerText = massage;
  play(massage);
}

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
    massage = `Anda menggunakan bantuan pada bagian sisa persediaan di ${text}`;
  } else {
    massage = `Anda menggunakan bantuan pada bagian beban pokok penjualan di ${text}`;
  }
  chat.innerText = massage;
  play(massage);
}
