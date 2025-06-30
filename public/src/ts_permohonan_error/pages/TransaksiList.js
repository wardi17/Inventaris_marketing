import { navigateTo } from '../routes.js';

export default function TransaksiList() {
  const root = document.getElementById('root');
  root.innerHTML = `
    <h2>Daftar Transaksi</h2>
    <button class="btn btn-primary mb-3" id="btnTambah">+ Tambah Transaksi</button>
    <ul id="transaksiList">
      <li>Transaksi #1 <button class="btn btn-sm btn-warning btnEdit">Edit</button> <button class="btn btn-sm btn-danger btnHapus">Hapus</button></li>
      <li>Transaksi #2 <button class="btn btn-sm btn-warning btnEdit">Edit</button> <button class="btn btn-sm btn-danger btnHapus">Hapus</button></li>
    </ul>
  `;

  document.getElementById('btnTambah').addEventListener('click', () => {
    navigateTo('/transaksi/tambah');
  });

  // Event tambahan bisa disiapkan nanti untuk edit/hapus
}
