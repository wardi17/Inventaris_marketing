import { baseUrl } from '../../config.js';
import { goBack } from '../main.js';

class EditMsInventaris {
  constructor(datas) {
    this.datas = datas;
    this.rootElement = this.initializeRootElement();
    this.appendCustomStyles();
    this.showModalEdit();
  }

  initializeRootElement() {
    let rootElement = document.getElementById('root');
    if (!rootElement) {
      rootElement = document.createElement('div');
      rootElement.id = 'root';
      document.body.appendChild(rootElement);
    }
    return rootElement;
  }

  appendCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
      input[type=number]::-webkit-outer-spin-button,
      input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type=number] {
        -moz-appearance: textfield;
      }
      .error {
        color: red;
        font-size: 0.875rem;
      }
    `;
    document.head.appendChild(style);
  }

  renderInput(id, label, type = 'text', value = '', disabled = false, extraClass = '') {
    return `
      <div class="row mb-2">
        <label for="${id}" class="col-sm-2 col-form-label">${label}</label>
        <div class="col-sm-4">
          <input type="${type}" id="${id}" name="${id}" class="form-control ${extraClass}" value="${value}" ${disabled ? 'disabled' : ''}>
          <span id="${id}Error" class="error"></span>
        </div>
      </div>
    `;
  }

  renderFormFields(data) {
    return `
      ${this.renderInput('InventarisID_Edit', 'Inventaris ID', 'text', data.id || '', true)}
      ${this.renderInput('NamaBarang_Edit', 'Nama Barang', 'text', data.namabarang || '')}
      ${this.renderInput('JenisBarang_Edit', 'Jenis Barang', 'text', data.jenisbarang || '')}
      ${this.renderInput('Stok_Edit', 'Stok', 'number', data.stok || '', false, 'text-end')}
      ${this.renderInput('StokMinimum_Edit', 'Stok Minimum', 'number', data.stokminimum || '', false, 'text-end')}
      ${this.renderInput('StokMaksimum_Edit', 'Stok Maksimum', 'number', data.stokmaksimum || '', false, 'text-end')}
      ${this.renderInput('HargaPokok_Edit', 'Harga Pokok', 'number', data.hargapokok || '', false, 'text-end')}
    `;
  }

  showModalEdit() {
    this.removeOldModal();
    const modal = this.createModal();
    this.rootElement.appendChild(modal);
    this.initializeModal(modal);
    this.renderKategori();
  }

  removeOldModal() {
    const oldModal = document.getElementById('modal-trans-inventarisedit');
    if (oldModal) oldModal.remove();
  }

  createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'modal-trans-inventarisedit';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = this.getModalContent();
    return modal;
  }

  getModalContent() {
    return `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit Inventaris</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="edit-form">
              <div class="row mb-12 mb-2">
                <label for="kategoriSelectEdit"  class="col-sm-2 col-form-label">Kategori</label>
               <div class="col-sm-4">
                <select id="kategoriSelectEdit" name ="kategoriSelectEdit" class="form-select">
                  <option value="">Memuat...</option>
                </select>
                 <span id="kategoriSelectEditError" class="error"></span>
                </div>
              </div>
              ${this.renderFormFields(this.datas)}
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            <button type="submit" form="edit-form" class="btn btn-primary">Simpan Perubahan</button>
            <button type="button" id="deletedata" class="btn btn-danger">Hapus</button>
          </div>
        </div>
      </div>
    `;
  }

    renderKategori() {
      
      let datas =this.datas;
      const ktgID = datas.kategoriid;
      $.ajax({
        url: `${baseUrl}/router/seturl`,
        method: "GET",
        dataType: "json",
        headers: { 'url': 'msinv/getkatgori' },
        success: function (result) {
          const data = result.data;
          const $select = $('#kategoriSelectEdit');
          $select.empty();
         
          data.forEach(item => {
            $select.append(`<option value="${item.id}"  ${ktgID == item.id ? "selected" : ""} >${item.name}</option>`);
          });
        },
        error: function () {
          console.error("Gagal mengambil data kategori");
        }
      });
    }



  initializeModal(modal) {
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    const form = document.getElementById('edit-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleEditSubmit(e);
    });

    document.getElementById('deletedata').addEventListener('click', async () => {
      await this.handleDelete();
    });
  }

  async handleEditSubmit(event) {
    const dataInput = await this.validateInput(event);
    if (!dataInput) return;

    try {
      await this.sendDataToApi(dataInput);
      this.showSuccessMessage();
    } catch (error) {
      this.showErrorMessage(error);
    }
  }

  async validateInput(event) {
    let valid = true;
    const getValue = id => $(`#${id}`).val();
    const showError = (id, message) => {
      $(`#${id}Error`).text(message);
      valid = false;
    };

    const fields = [
      { id: 'NamaBarang_Edit', name: 'Nama Barang' },
      { id: 'kategoriSelectEdit', name: 'Kategori' },
      { id: 'Stok_Edit', name: 'Stok', checkZero: true },
      { id: 'StokMinimum_Edit', name: 'Stok Minimum', checkZero: true },
      { id: 'StokMaksimum_Edit', name: 'Stok Maksimum', checkZero: true },
      { id: 'HargaPokok_Edit', name: 'Harga Pokok', checkZero: true },
    ];

    fields.forEach(field => {
      const value = getValue(field.id);
      if (!value || (field.checkZero && value === "0")) {
        showError(field.id, `${field.name} harus diisi`);
      } else {
        $(`#${field.id}Error`).text('');
      }
    });

    if (!valid) {
      event.preventDefault();
      return false;
    }

    return {
      InventarisID: getValue('InventarisID_Edit'),
      NamaBarang: getValue('NamaBarang_Edit'),
      Kategori: getValue('kategoriSelectEdit'),
      Stok: getValue('Stok_Edit'),
      StokMinimum: getValue('StokMinimum_Edit'),
      StokMaksimum: getValue('StokMaksimum_Edit'),
      HargaPokok: getValue('HargaPokok_Edit')
    };
  }

  async sendDataToApi(data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}/router/seturl`,
        method: "POST",
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        headers: { 'url': 'msinv/updatedata' },
        beforeSend: this.showLoading,
        success: (result) => {
          this.hideLoading();
          if (!result.error) {
            resolve(result);
          } else {
            reject(new Error("Data gagal diperbarui."));
          }
        },
        error: () => {
          this.hideLoading();
          reject(new Error("Koneksi ke server gagal."));
        }
      });
    });
  }

  showSuccessMessage() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
      text: "Data berhasil diperbarui."
    }).then(() => {
      const modalElement = document.getElementById('modal-trans-inventarisedit');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
      goBack();
    });
  }

  showErrorMessage(error) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal Menyimpan',
      text: error?.message || 'Terjadi kesalahan saat menyimpan data.',
      showConfirmButton: true
    });
  }

  showLoading() {
    Swal.fire({
      title: 'Menyimpan...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  hideLoading() {
    Swal.close();
  }

  async handleDelete() {
    const confirm = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: "Data akan dihapus secara permanen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (confirm.isConfirmed) {
      const id = $('#InventarisID_Edit').val();
      try {
        await this.deleteDataFromApi(id);
        this.showDeleteSuccessMessage();
      } catch (error) {
        this.showErrorMessage(error);
      }
    }
  }

  async deleteDataFromApi(id) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}/router/seturl`,
        method: "POST",
        dataType: "json",
        data: JSON.stringify({ InventarisID: id }),
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        headers: { 'url': 'msinv/deletedata' },
        beforeSend: this.showLoading,
        success: (result) => {
          this.hideLoading();
          if (!result.error) {
            resolve(result);
          } else {
            reject(new Error("Data gagal dihapus."));
          }
        },
        error: () => {
          this.hideLoading();
          reject(new Error("Koneksi ke server gagal."));
        }
      });
    });
  }

  showDeleteSuccessMessage() {
    Swal.fire({
      icon: 'success',
      title: 'Terhapus!',
      text: 'Data berhasil dihapus.',
      timer: 1500,
      showConfirmButton: false
    }).then(() => {
      const modalElement = document.getElementById('modal-trans-inventarisedit');
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) modalInstance.hide();
      goBack();
    });
  }
}

export default EditMsInventaris;
