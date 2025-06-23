import { baseUrl } from '../config.js';

class MsInventarisList {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.loadData();
    this.appendCustomStyles();
  }

 appendCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
     #thead{
        background-color:#E7CEA6 !important;
        /* font-size: 8px;
        font-weight: 100 !important; */
        /*color :#000000 !important;*/
      }
      .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
		  background-color: #F3FEB8;
		}

    /* .table-striped{
      background-color:#E9F391FF !important;
    } */
    .dataTables_filter{
		 padding-bottom: 20px !important;
	}
    `;
    document.head.appendChild(style);
  }
  async loadData() {
    try {
      const data = await this.fetchData();
      let responsdata =data.data;
      this.renderTable(responsdata);
    } catch (error) {
      console.error('Gagal memuat data:', error);
      this.container.innerHTML = '<p>Gagal memuat data.</p>';
    }
  }

  async fetchData() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${baseUrl}/router/seturl`,
        method: "GET",
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        headers: { 'url': 'msinv/listdata' },
        beforeSend: () => this.showLoading(), // Ensure this.showLoading is a method
        success: (result) => {
          if (!result.error) {
            resolve(result);
          } else {
            reject(new Error(result.error || "Unexpected response format"));
          }
        },
        error: (jqXHR, textStatus, errorThrown) => {
          const errorMessage = jqXHR.responseJSON?.error || "Failed to fetch data";
          reject(new Error(errorMessage));
        }
      });
    });
  }

  renderTable(data) {
    const table = document.createElement('table');
    table.className = 'table table-striped';
    table.id='table1';
    const thead = `
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama Barang</th>
          <th>Jenis</th>
          <th class="text-end">Stok</th>
          <th class="text-end">Minium</th>
          <th class="text-end">Harga Pokok</th>
          <th class="text-end">Maksimum</th>
          <th>Action</th>
          
        </tr>
      </thead>
    `;

    const tbodyRows = data.map(item => `
      <tr>
        <td>${item.InventarisID}</td>
        <td>${item.NamaBarang}</td>
        <td>${item.JenisBarang}</td>
        <td class="text-end">${item.Stok}</td>
        <td class="text-end">${item.StokMinimum}</td>
        <td class="text-end">${item.StokMaksimum}</td>
        <td class="text-end">${item.HargaPokok}</td>
        <td><button type="button" class="btn- btn-info" id="EditData" data-id='${item.InventarisID}'>Edit</button></td>
      </tr>
    `).join('');

    table.innerHTML = thead + `<tbody>${tbodyRows}</tbody>`;
    this.container.innerHTML = ''; // Clear the container
    this.container.appendChild(table);
    this.Tampildatatabel();
  }

  showLoading() {
    // Implement your loading logic here, e.g., show a spinner or loading message
    this.container.innerHTML = '<p>Loading...</p>';
  }

     Tampildatatabel(){

          const id = "#tabel1";
          $(id).DataTable({
              order: [[0, 'asc']],
                responsive: true,
                "ordering": true,
                "destroy":true,
                pageLength: 5,
                lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'All']],
                fixedColumns:   {
                     // left: 1,
                      right: 1
                  },
                  
              })
        }
}

export default MsInventarisList;
