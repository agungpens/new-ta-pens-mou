let RekapAbsen = {
    module: () => {
        return "laporan/rekap_absensi";
    },

    moduleApi: () => {
        return `api/${RekapAbsen.module()}`;
    },

    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleLaporan: () => {
        return "laporan/absensi";
    },

    moduleVerifikasi: () => {
        return "laporan/verifikasiabsen";
    },

    moduleLaporanApi: () => {
        return `api/${RekapAbsen.moduleLaporan()}`;
    },

    moduleVerifikasiApi: () => {
        return `api/${RekapAbsen.moduleVerifikasi()}`;
    },

    moduleKaryawanApi: () => {
        return `api/${RekapAbsen.moduleKaryawan()}`;
    },

    add: () => {
        window.location.href = url.base_url(RekapAbsen.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(RekapAbsen.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(RekapAbsen.module()) + "index";
    },

    select2All: () => {
        // Default
        const select2 = $('.select2');
        if (select2.length) {
            select2.each(function () {
                var $this = $(this);
                $this.wrap('<div class="position-relative"></div>').select2({
                    placeholder: 'Select value',
                    dropdownParent: $this.parent()
                });
            });
        }
    },

    setDate: () => {
        let dataDate = $('.flatpickr');
        $.each(dataDate, function () {
            $(this).flatpickr();
        });
    },

    getDataKaryawan: async () => {
        let tableData = $('table#table-data-karyawan');
        let params = {};
        params.id = $('#id').val();
        if (tableData.length > 0) {
            tableData.DataTable({
                "processing": true,
                "serverSide": true,
                "ordering": true,
                "autoWidth": false,
                "order": [
                    [0, 'desc']
                ],
                "aLengthMenu": [
                    [10, 50, 100],
                    [10, 50, 100]
                ],
                "ajax": {
                    "url": url.base_url(RekapAbsen.moduleKaryawanApi()) + `getData`,
                    "type": "GET",
                    "data": params
                    // "headers": {
                    //     'X-CSRF-TOKEN': `'${tokenApi}'`
                    // }
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                "columnDefs": [{
                        "targets": 3,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                            $(td).addClass('td-padd');
                            $(td).addClass('action');
                        }
                    },
                    {
                        "targets": 2,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
                        }
                    },
                    {
                        "targets": 1,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
                        }
                    },
                    {
                        "targets": 0,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
                            $(td).addClass('text-center');
                        }
                    },
                ],
                "columns": [{
                        "data": "nik",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "nik",
                    },
                    {
                        "data": "nama_lengkap",
                    },
                    {
                        "data": "nik",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="RekapAbsen.pilihData(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihData: (elm) => {
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');
        $('#nik').val(nik + " - " + nama_lengkap);
        message.closeDialog();
    },

    showDataKaryawan: (elm) => {
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(RekapAbsen.moduleApi()) + "showDataKaryawan",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                RekapAbsen.getDataKaryawan();
            }
        });
    },
    
    getData: (elm) => {
        let params = {};
        params.tgl_awal = $('#start-date-filter').val();
        params.tgl_akhir = $('#end-date-filter').val();
        params.nik = $('#nik-filter').val();
        params.divisi = $('#divisi').val();
        params.departemen = $('#departemen').val();
        params.area_kerja_karyawan = $("#area-kerja").val()
        let table = $('table#table-data').find('tbody');
        // table.html('');

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(RekapAbsen.moduleApi()) + "getData",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if(($.fn.dataTable.isDataTable("table#table-data"))){
                    // $('table#table-data').dataTable().fnClearTable();
                    $('table#table-data').dataTable().fnDestroy();
                }
                table.empty()
                table.html(resp);
                
                // $('table#table-data').DataTable().destroy(); 
                $('table#table-data').DataTable({
                    dom:
                    '<"row mx-2"' +
                    '<"col-md-2"<"me-3"l>>' +
                    '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
                    '>t' +
                    '<"row mx-2"' +
                    '<"col-sm-12 col-md-6"i>' +
                    '<"col-sm-12 col-md-6"p>' +
                    '>',
                    'buttons': [
                        {
                          extend: 'collection',
                          className: 'btn btn-label-secondary dropdown-toggle mx-3',
                          text: '<i class="bx bx-upload me-2"></i>Export',
                          buttons: [
                            {
                              extend: 'print',
                              text: '<i class="bx bx-printer me-2" ></i>Print',
                              className: 'dropdown-item',
                            //   exportOptions: { columns: [2, 3, 4, 5] }
                            },
                            {
                              extend: 'csv',
                              text: '<i class="bx bx-file me-2" ></i>Csv',
                              className: 'dropdown-item',
                            //   exportOptions: { columns: [2, 3, 4, 5] }
                            },
                            {
                              extend: 'excel',
                              text: '<i class="bx bx-file me-2" ></i>Excel',
                              className: 'dropdown-item',
                            //   exportOptions: { columns: [2, 3, 4, 5] }
                            },
                            {
                              extend: 'pdf',
                              text: '<i class="bx bxs-file-pdf me-2"></i>Pdf',
                              className: 'dropdown-item',
                            //   exportOptions: { columns: [2, 3, 4, 5] }
                            },
                            {
                              extend: 'copy',
                              text: '<i class="bx bx-copy me-2" ></i>Copy',
                              className: 'dropdown-item',
                            //   exportOptions: { columns: [2, 3, 4, 5] }
                            }
                          ]
                        },
                    ],
                });
            }
        });
    },

    export: (elm) => {
        let idExportContent = $(elm).attr('idexport');
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent($(`div#${idExportContent}`).html()));
    },

    getUrlParams: () => {
        let url = window.location.href;
        var params = {};
        (url + '?').split('?')[1].split('&').forEach(function (pair) {
            pair = (pair + '=').split('=').map(decodeURIComponent);
            if (pair[0].length) {
                params[pair[0]] = pair[1];
            }
        });

        return params;
    },

    setInitSocket:()=>{
        let urlSocket = url.base_url_socket(1001, '');
        const socket = io(urlSocket);

        socket.on('userconnected', function () {
            Toast.success('Informasi', 'User Connected');
        });

        socket.on('reload', function () {
            Toast.success('Informasi', 'Reload');
            RekapAbsen.getData();
        });
    }
}

$(function () {
    RekapAbsen.setInitSocket();
    RekapAbsen.select2All();
    RekapAbsen.setDate();
})
