//import { goBack } from '../main.js'; // opsional kalau kamu punya tombol kembali

class TransaksiForm {
  constructor() {
    this.form = document.createElement('form');
  }

render() {
  const form = this.form;

  if (!form) {
    console.error("Form belum diinisialisasi.");
    return;
  }

  // Set isi form
  form.innerHTML = `
    <h6>Form Tambah Transaksi Inventaris</h6>

    <div class="row mb-2">
      <label for="inventaris" class="col-sm-2 col-form-label">Inventaris</label>
      <div class="col-sm-4">
        <select id="inventaris" name="inventaris" class="form-select">
          <option value="">Memuat...</option>
        </select>
        <span id="inventarisError" class="error"></span>
      </div>
    </div>

    <div id="detailBarang" style="margin-bottom: 15px; display: none;">
      <p><strong>Stok:</strong> <span id="stokBarang">-</span></p>
      <p><strong>Harga:</strong> <span id="hargaBarang">-</span></p>
    </div>

    <div style="margin-bottom: 10px;">
      <label for="jumlah">Jumlah:</label><br />
      <input type="number" id="jumlah" name="jumlah" required style="width: 100%; padding: 6px;" />
    </div>

    <div style="margin-bottom: 10px;">
      <label for="keterangan">Keterangan:</label><br />
      <textarea id="keterangan" name="keterangan" rows="3" style="width: 100%; padding: 6px;"></textarea>
    </div>

    <button type="submit" style="padding: 8px 12px;">Simpan</button>
    <button type="button" id="btnKembali" style="padding: 8px 12px; margin-left: 8px;">Kembali</button>
  `;

  // Data inventaris statis (bisa diganti dari API)
  const masterInventaris = [
    { id: 1, nama: "Printer Epson", stok: 10, harga: 1500000 },
    { id: 2, nama: "Laptop Asus", stok: 5, harga: 8500000 },
    { id: 3, nama: "Proyektor", stok: 2, harga: 4500000 },
  ];

  // Tampilkan inventaris ke dropdown
  const selectInventaris = form.querySelector("#inventaris");
  selectInventaris.innerHTML = '<option value="">-- Pilih Barang --</option>';
  masterInventaris.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.nama;
    selectInventaris.appendChild(opt);
  });

  // Tampilkan detail barang saat dipilih
  selectInventaris.addEventListener('change', () => {
    const selectedId = parseInt(selectInventaris.value);
    const selectedItem = masterInventaris.find(b => b.id === selectedId);

    const detailDiv = form.querySelector('#detailBarang');
    if (selectedItem) {
      form.querySelector('#stokBarang').textContent = selectedItem.stok;
      form.querySelector('#hargaBarang').textContent = `Rp ${selectedItem.harga.toLocaleString("id-ID")}`;
      detailDiv.style.display = 'block';
    } else {
      detailDiv.style.display = 'none';
    }
  });

  // Submit form
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedId = parseInt(selectInventaris.value);
    const selectedItem = masterInventaris.find(b => b.id === selectedId);

    if (!selectedItem) {
      alert("Silakan pilih barang terlebih dahulu.");
      return;
    }

    const data = {
      barang: selectedItem.nama,
      jumlah: form.jumlah.value,
      harga: selectedItem.harga,
      keterangan: form.keterangan.value,
    };

    console.log('Data Tersimpan:', data);
    alert('Transaksi berhasil disimpan!');
  });

  // Tombol kembali
  const btnKembali = form.querySelector('#btnKembali');
  if (btnKembali) {
    btnKembali.addEventListener('click', () => {
      import('./TransaksiList.js').then((module) => {
        const TransaksiList = module.default;
        const list = new TransaksiList();
        list.render();
      });
    });
  }

  return form;
}

}

export default TransaksiForm;
