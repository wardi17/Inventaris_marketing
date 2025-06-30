// pages/TransaksiForm.js
import { navigateTo } from '../routes.js';

export default function TransaksiForm() {
  const root = document.getElementById('root');
  root.innerHTML = `
    <button class="btn btn-outline-secondary" id="btnKembali">← Kembali</button>
    <h2>Form Tambah Transaksi</h2>
    <form id="formTransaksi">
      <input type="text" placeholder="Nama Transaksi" required />
      <button type="submit" class="btn btn-success">Simpan</button>
    </form>
  `;

  document.getElementById('btnKembali').addEventListener('click', () => {
    navigateTo('/transaksi');
  });

  document.getElementById('formTransaksi').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Transaksi disimpan!');
    navigateTo('/transaksi');
  });
}
