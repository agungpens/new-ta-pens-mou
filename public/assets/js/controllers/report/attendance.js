
let Attedance = {
    module: () => {
        return "laporan/attedance";
    },

    moduleProfile: () => {
        return "account/profile";
    },

    moduleApi: () => {
        return `api/${Attedance.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(Attedance.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Attedance.module()) + "ubah?id=" + data_id;
    },

    back: (elm) => {
        let type = $(elm).attr("from");
        if(type == ''){
            window.location.href = url.base_url(Attedance.module()) + "index";
        }else{
            window.location.href = url.base_url(Attedance.moduleProfile()) + "index";
        }
    },

    getData: () => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();
        let params = {};
        params.start_date = $("#start-date").val()
        params.end_date= $("#end-date").val()
        params.nik = $("#nik").val()
        params.area = $('#area').val();
        params.divisi = $('#divisi').val();
        params.departemen = $('#departemen').val();
        params.jabatan = $('#jabatan').val();
        params.status = $('#status').val();

        if (tableData.length > 0) {
            let updateAction = $('#update').val();
            let deleteAction = $('#delete').val();

            tableData.DataTable({
                "processing": true,
                "serverSide": true,
                "ordering": true,
                "autoWidth": false,
                "order": [
                    [0, 'desc']
                ],
                "aLengthMenu": [
                    [100, 500, "-1"],
                    [100, 500, "All"]
                ],
                "ajax": {
                    "url": url.base_url(Attedance.moduleApi()) + `getData`,
                    "type": "POST",
                    "data": params,
                    "dataType" : "json"
                    // "headers": {
                    //     'X-CSRF-TOKEN': `'${tokenApi}'`
                    // }
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                // "columnDefs": [{
                //         "targets": 3,
                //         "orderable": false,
                //         "createdCell": function (td, cellData, rowData, row, col) {
                //             $(td).addClass('text-center');
                //             $(td).addClass('td-padd');
                //             $(td).addClass('action');
                //         }
                //     },
                //     {
                //         "targets": 2,
                //         "orderable": false,
                //         "createdCell": function (td, cellData, rowData, row, col) {
                //             $(td).addClass('td-padd');
                //         }
                //     },
                //     {
                //         "targets": 1,
                //         "orderable": false,
                //         "createdCell": function (td, cellData, rowData, row, col) {
                //             $(td).addClass('td-padd');
                //         }
                //     },
                //     {
                //         "targets": 0,
                //         "createdCell": function (td, cellData, rowData, row, col) {
                //             $(td).addClass('td-padd');
                //             $(td).addClass('text-center');
                //         }
                //     },
                // ],
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
                        "data": "nama",
                    },
                    {
                        "data": "nama_departemen",
                    },
                    {
                        "data": "tanggal_absen",
                    },
                    {
                        "data": "jam_masuk",
                    },
                    {
                        "data": "jam_keluar",
                    },
                    {
                        "data": "cuti",
                    },
                    {
                        "data": "izin",
                    },
                    {
                        "data": "absen",
                    },
                    {
                        "data": "terlambat",
                    },
                    {
                        "data": "pulang_cepat",
                    },
                    {
                        "data": "out_time",
                    },
                ],
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
    },

    setDate: () => {
        let dataDate = $('.flatpickr');
        $.each(dataDate, function () {
            $(this).flatpickr();
        });
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

    showDataKaryawan:(elm)=>{
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Attedance.moduleApi()) + "showDataKaryawan",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Attedance.getDataKaryawanPopUp();
            }
        });
    },

    getDataKaryawanPopUp: async () => {
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
                    "url": url.base_url(Attedance.moduleApi()) + `getDataKaryawan`,
                    "type": "POST",
                    "data": params
                    // "headers": {
                    //     'X-CSRF-TOKEN': `'${tokenApi}'`
                    // }
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                "columnDefs": [
                    {
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="Attedance.pilihData(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihData:(elm)=>{
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');
        $('#nik').val(nik+' - '+nama_lengkap);
        message.closeDialog();
    },

    moduleLaporanAbsen: () => {
        return "laporan/absensi";
    },

    moduleLaporanAbsenApi: () => {
        return `api/${Attedance.moduleLaporanAbsen()}`;
    },

    showListDepartemen: (elm) => {
        let params = {};
        params.divisi = $(elm).val();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Attedance.moduleLaporanAbsenApi()) + "showListDepartemen",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                let optionHtml = ``;
                for (let i = 0; i < resp.data.length; i++) {
                    let data = resp.data[i];
                    optionHtml += `<option value="${data.id}">${data.nama_departemen}</option>`;
                }
                $('#departemen').html(optionHtml);
            }
        });
    },

    export: (elm) => {
        let idExportContent = $(elm).attr('idexport');
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent($(`div#${idExportContent}`).html()));
    },
};

$(function () {
    Attedance.getData();
    Attedance.setDate();
    Attedance.select2All();
});
