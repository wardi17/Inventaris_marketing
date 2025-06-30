// TransaksiList.js
import ButtonTambah from './ButtonTambah.js'; // asumsikan kamu punya ini
import TransaksiForm from './TransaksiForm.js';

class TransaksiList {
  constructor() {
    this.root = document.getElementById('root');
    this.render();
  }

  render() {
    this.root.innerHTML = ''; // bersihkan konten

    // Buat container utama
    const container = document.createElement('div');
    container.style.padding = '20px';

    // Baris header: title + tombol tambah di kanan
    const headerBar = document.createElement('div');
    headerBar.style.display = 'flex';
    headerBar.style.justifyContent = 'space-between';
    headerBar.style.alignItems = 'center';
    headerBar.style.marginBottom = '20px';

    const title = document.createElement('h6');
    title.textContent = 'Daftar Transaksi';

    const buttonTambah = ButtonTambah({
      text: '+ Tambah Transaksi',
      onClick: () => {
        this.root.innerHTML = '';
        const form = new TransaksiForm();
        this.root.appendChild(form.render());
      }
    });

    headerBar.appendChild(title);
  
    headerBar.appendChild(buttonTambah);

    container.appendChild(headerBar);

    // List transaksi (dummy contoh)
    const list = document.createElement('div');
    list.innerHTML = '<p>Daftar isi transaksi akan muncul di sini...</p>';
    container.appendChild(list);

    this.root.appendChild(container);
  }
}

export default TransaksiList;
