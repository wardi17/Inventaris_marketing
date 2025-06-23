class MsInventaris {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.currentModal = null; // Untuk menyimpan referensi modal
        this.setAddData();
        this. appendCustomStyles();
    }

      appendCustomStyles() {
    const style = document.createElement("style");
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
        addButton.innerHTML = '<i class="fa-solid fa-file-circle-plus"></i>Tambah Barang';
        addButton.addEventListener('click', () => this.handleAddClick());

        buttonWrapper.appendChild(addButton);
        this.container.prepend(buttonWrapper);
    }

    handleAddClick() {
        // Hapus modal sebelumnya jika ada
        if (this.currentModal) {
            document.body.removeChild(this.currentModal);
        }

        this.currentModal = this.createModal();
        document.body.appendChild(this.currentModal);

        const modalInstance = new bootstrap.Modal(this.currentModal);

        // Event listeners
        this.currentModal.querySelector('.btn-close').addEventListener('click', () => {
            modalInstance.hide();
        });

        this.currentModal.querySelector('.btn-secondary').addEventListener('click', () => {
            modalInstance.hide();
        });

        this.currentModal.querySelector('#add-form').addEventListener('submit', (e) => {
            e.preventDefault();
            SaveDataFrom();
            modalInstance.hide();
        });

        modalInstance.show();
    }

    createModal() {
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
                             <div class="row mb-12 mb-2">
                                        <label for="InventarisID" class="col-sm-2 col-form-label">Inventaris ID</label>
                                        <div class="col-sm-4">
                                          <input disabled type="text" id="InventarisID"  class="form-control">
                                        </div>
                              </div>
                              <div class="row mb-12 mb-2">
                                        <label for="NamaBarang" class="col-sm-2 col-form-label">Nama Barang</label>
                                        <div class="col-sm-4">
                                          <input  type="text" id="NamaBarang"  class="form-control">
                                           <span id="NamaBarangError" class="error"></span>
                                        </div>
                              </div>
                             <div class="row mb-12 mb-2">
                                        <label for="JenisBarang" class="col-sm-2 col-form-label">Jenis Barang</label>
                                        <div class="col-sm-4">
                                          <input  type="text" id="JenisBarang"  class="form-control">
                                           <span id="JenisBarangError" class="error"></span>
                                        </div>
                              </div>

                              <div class="row mb-12 mb-2">
                                        <label for="Stok" class="col-sm-2 col-form-label">Stok</label>
                                        <div class="col-sm-4">
                                          <input  type="number" id="Stok"  class="form-control text-end">
                                           <span id="StokError" class="error"></span>
                                        </div>
                              </div>
                              <div class="row mb-12 mb-2">
                                        <label for="StokMinimum" class="col-sm-2 col-form-label">Stok Minimum</label>
                                        <div class="col-sm-4">
                                          <input  type="number" id="StokMinimum"  class="form-control text-end">
                                           <span id="StokMinimumError" class="error"></span>
                                        </div>
                              </div>
                               <div class="row mb-12 mb-2">
                                        <label for="StokMaksimum" class="col-sm-2 col-form-label">Stok Maksimum</label>
                                        <div class="col-sm-4">
                                          <input  type="number" id="StokMaksimum"  class="form-control text-end">
                                           <span id="StokMaksimumError" class="error"></span>
                                        </div>
                              </div>
                                <div class="row mb-12 mb-2">
                                        <label for="HargaPokok" class="col-sm-2 col-form-label">Stok Maksimum</label>
                                        <div class="col-sm-4">
                                          <input  type="number" id="HargaPokok"  class="form-control text-end">
                                           <span id="HargaPokokError" class="error"></span>
                                        </div>
                              </div>
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


    SaveDataFrom(){
          const form = this.currentModal.querySelector('#inventory-form');
        const inputs = form.elements;
    }

     generateUniqueId() {
        return `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      }
}

export default MsInventaris;
