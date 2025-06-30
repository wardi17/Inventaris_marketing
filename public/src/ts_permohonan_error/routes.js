// routes.js
import TransaksiList from './pages/TransaksiList.js';
import TransaksiForm from './pages/TransaksiForm.js';

export function navigateTo(path) {
  window.history.pushState({}, '', path);
  router();
}

export function router() {
  const path = window.location.pathname;

  if (path === '/transaksi') {
    TransaksiList();
  } else if (path === '/transaksi/tambah') {
    TransaksiForm();
  } else {
    document.getElementById('root').innerHTML = '<h2>404 - Halaman tidak ditemukan</h2>';
  }
}

window.addEventListener('popstate', router);
