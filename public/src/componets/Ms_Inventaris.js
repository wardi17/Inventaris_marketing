import { baseUrl } from '../config.js';
import { goBack } from '../main.js';
class MsInventaris {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.currentModal = null;
    this.setAddData();
    this.appendCustomStyles();
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

  setAddData() {
    const buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'w-100 d-flex justify-content-end mb-3';

    const addButton = document.createElement('button');
    addButton.className = 'btn btn-primary btn-sm';
    addButton.id = 'tambahdata';
    addButton.innerHTML = '<i class="fa-solid fa-file-circle-plus"></i> Tambah Barang';
    addButton.addEventListener('click', () => this.handleAddClick());

    buttonWrapper.appendChild(addButton);
    this.container.prepend(buttonWrapper);
  }

  handleAddClick() {
    if (this.currentModal) document.body.removeChild(this.currentModal);

    this.currentModal = this.createModal();
    document.body.appendChild(this.currentModal);

    const modalInstance = new bootstrap.Modal(this.currentModal);

    // Close buttons
    this.currentModal.querySelectorAll('.btn-close, .btn-secondary').forEach(button =>
      button.addEventListener('click', () => modalInstance.hide())
    );

    // Submit form
    this.currentModal.querySelector('#add-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.saveDataFrom(e);
     
    });

    modalInstance.show();
  }

  createModal() {
    const idinventaris = this.generateUniqueId();

    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'modal-trans-inventaris';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Tambah Inventaris</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="add-form">
              ${this.renderFormFields(idinventaris)}
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
            <button type="submit" form="add-form" class="btn btn-primary">Tambah</button>
          </div>
        </div>
      </div>
    `;
    return modal;
  }

  renderFormFields(idinventaris) {
    return `
      ${this.renderInput('InventarisID', 'Inventaris ID', 'text', idinventaris, true)}
      ${this.renderInput('NamaBarang', 'Nama Barang')}
      ${this.renderInput('JenisBarang', 'Jenis Barang')}
      ${this.renderInput('Stok', 'Stok', 'number', '', false, 'text-end')}
      ${this.renderInput('StokMinimum', 'Stok Minimum', 'number', '', false, 'text-end')}
      ${this.renderInput('StokMaksimum', 'Stok Maksimum', 'number', '', false, 'text-end')}
      ${this.renderInput('HargaPokok', 'Harga Pokok', 'number', '', false, 'text-end')}
    `;
  }

  renderInput(id, label, type = 'text', value = '', disabled = false, extraClass = '') {
    return `
      <div class="row mb-12 mb-2">
        <label for="${id}" class="col-sm-2 col-form-label">${label}</label>
        <div class="col-sm-4">
          <input type="${type}" id="${id}" value="${value}" class="form-control ${extraClass}" ${disabled ? 'disabled' : ''}>
          <span id="${id}Error" class="error"></span>
        </div>
      </div>
    `;
  }

  async saveDataFrom(event) {
    const dataInput = await this.validateInput(event);
    if (!dataInput) return;

    try {
      await this.sendDataToApi(dataInput);
      this.showSuccessMessage();
    } catch (error) {
      this.showErrorMessage();
    }
  }

  async sendDataToApi(data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}/router/seturl`,
        method: "POST",
        dataType: "json",
        data: JSON.stringify(data),
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        headers: { 'url': 'msinv/savedata' },
        beforeSend: this.showLoading,
        success: function (result) {
          if (!result.error) {
            resolve(result);
          } else {
            reject(new Error("Unexpected response format"));
          }
        },
        error: function () {
          reject(new Error("Failed to save data"));
        }
      });
    });
  }

  showLoading() {
    Swal.fire({
      title: 'Loading',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });
  }

  showSuccessMessage() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      timer: 1000,
      text: "Data saved successfully."
    }).then(() => {
       const modalElement = document.getElementById('modal-trans-inventaris');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide(); //tutup modal dengan benar
        }
      goBack();
    });
  }

  showErrorMessage() {
    Swal.fire({
      icon: "error",
      title: "Error!",
      text: "Terjadi kesalahan saat Simpan data."
    });
  }

  async validateInput(event) {
    let valid = true;

    const getValue = id => $(`#${id}`).val();
    const showError = (id, message) => {
      $(`#${id}Error`).text(message);
      valid = false;
    };

    const fields = [
      { id: 'NamaBarang', name: 'NamaBarang' },
      { id: 'JenisBarang', name: 'JenisBarang' },
      { id: 'Stok', name: 'Stok', checkZero: true },
      { id: 'StokMinimum', name: 'StokMinimum', checkZero: true },
      { id: 'StokMaksimum', name: 'StokMaksimum', checkZero: true },
      { id: 'HargaPokok', name: 'HargaPokok', checkZero: true },
    ];

    fields.forEach(field => {
      const value = getValue(field.id);
      if (!value || (field.checkZero && value === "0")) {
        showError(field.id, `${field.name} harus di isi`);
      } else {
        $(`#${field.id}Error`).text('');
      }
    });

    if (!valid) {
      event.preventDefault();
      return false;
    }

    return {
      InventarisID: getValue('InventarisID'),
      NamaBarang: getValue('NamaBarang'),
      JenisBarang: getValue('JenisBarang'),
      Stok: getValue('Stok'),
      StokMinimum: getValue('StokMinimum'),
      StokMaksimum: getValue('StokMaksimum'),
      HargaPokok: getValue('HargaPokok')
    };
  }

  generateUniqueId() {
    return `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
}

export default MsInventaris;
