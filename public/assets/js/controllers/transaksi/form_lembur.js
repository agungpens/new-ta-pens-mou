let FormLembur = {
    module: () => {
        return "transaksi/form_lembur";
    },

    moduleApi: () => {
        return `api/${FormLembur.module()}`;
    },

    form: (kode) => {
        window.location.href = url.base_url(FormLembur.module()) + "form?kode="+kode;
    },

    print: (kode, nik) => {
        window.open(url.base_url(FormLembur.module()) + "print?kode="+kode+"&nik="+nik+"");
    },

    export: (kode, nik) => {
        window.location.href = url.base_url(FormLembur.module()) + "export?kode="+kode+"&nik="+nik;
    },

    back: () => {
        window.location.href = url.base_url(FormLembur.module()) + "index";
    },

    getData: async () => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();

        let params = {}
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
                    [25, 50, 100, -1],
                    [25, 50, 100, "Semua"]
                ],
                "ajax": {
                    "url": url.base_url(FormLembur.moduleApi()) + `getData`,
                    "type": "POST",
                    "data" : params,
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [
                    {
                        "targets": [1,2,3,4],
                        "orderable": false,
                    },
                    {
                        "targets": [4],
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                        }
                    },
                    {
                        "targets": 0,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                        }
                    },
                ],
                "columns": [{
                        "data": "kode_periode_gaji",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "kode_periode_gaji",
                    },
                    {
                        "data": "periode_awal",
                    },
                    {
                        "data": "periode_akhir",
                    },
                    {
                        "data": "kode_periode_gaji",
                        "render": (data, type, row, meta) => {
                            let btn = ``;
                            if(data != ""){
                                btn += `<button class="btn btn-sm btn-warning" onclick="FormLembur.form('${data}')">Form</button>`;
                            }

                            return btn;
                        }
                    }
                ],
                "dom":
                '<"row mx-2"' +
                '<"col-md-2"<"me-3"l>>' +
                '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
                '>t' +
                '<"row mx-2"' +
                '<"col-sm-12 col-md-6"i>' +
                '<"col-sm-12 col-md-6"p>' +
                '>',
                "buttons": [
                    {
                      extend: 'collection',
                      className: 'btn btn-label-secondary dropdown-toggle mx-3',
                      text: '<i class="bx bx-upload me-2"></i>Export',
                      buttons: [
                        {
                          extend: 'excel',
                          text: '<i class="bx bx-file me-2" ></i>Excel',
                          className: 'dropdown-item',
                        //   exportOptions: { columns: [2, 3, 4, 5] }
                        },
                      ]
                    },
                ],
            });
        }
    },

    
    submitAdd: (elm) => {
        var kode = $('input#periode_gaji_kode').val()
        var periode_lembur = $('input#periode_lembur').val()
        var nik  = $('input#nik_karyawan').val().split(' - ')[0]

        let params = {
            'periode_gaji_kode' : kode,
            'periode_lembur' : periode_lembur,
            'nik' : nik
        };
        // console.log(params);return;
        let form = $(elm).closest('div.form');
        if (validation.runWithElement(form)) {
            // return;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(FormLembur.moduleApi()) + "submitAdd",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function () {
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        setTimeout(function () {
                            window.location.href = url.base_url(FormLembur.module()) + "form?kode="+kode+"&nik="+nik+"&periode="+periode_lembur;
                        }, 1000);
                    } else {
                        bootbox.dialog({
                            message: resp.message
                        });
                    }
                }
            });
        }
    },

    getPostdataItem: () => {
        let data    = [];
        let tableData = $('table#item').find('tbody').find('tr');
        $.each(tableData, function () {
            let tr = $(this);
            let params = {};
            
            params.status               = tr.find('.status').val();
            params.doc_trans            = tr.find('.doc_trans').val();
            params.tanggal              = tr.find('.tanggal').val();
            params.jam_masuk            = tr.find('.jam_masuk').val();
            params.jam_keluar           = tr.find('.jam_keluar').val();
            params.istirahat            = tr.find('.istirahat').val();
            params.absensi_masuk        = tr.find('.absensi_masuk').val();
            params.absensi_pulang       = tr.find('.absensi_pulang').val();
            params.jam_lembur_mulai     = tr.find('.jam_lembur_mulai').val();
            params.jam_lembur_selesai   = tr.find('.jam_lembur_selesai').val();

            data.push(params);
        });

        return data;
    },

    getPostData: () => {
        let data = {
            'periode_gaji_kode': $('input#periode_gaji_kode').val(),
            'nik': $('input#nik_karyawan').val().split(' - ')[0],
            'item': FormLembur.getPostdataItem(),
        };

        return data;
    },

    submit: (elm) => {
        let params = FormLembur.getPostData();
        // console.log(params);return;
        let form = $(elm).closest('div.form');
        if (params.item.length == 0) {
            Toast.error('Informasi', 'Item Harus Diisi');
            return;
        }

        if (validation.runWithElement(form)) {
            // return;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(FormLembur.moduleApi()) + "submit",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function () {
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Data Berhasil Disimpan');
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    } else {
                        bootbox.dialog({
                            message: resp.message
                        });
                    }
                }
            });
        }
    },

    showDataKaryawan: (id_text) => {

        let params = {};
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(FormLembur.moduleApi()) + "showDataKaryawan",

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
                FormLembur.getDataKaryawan(id_text);
            }
        });

    },

    getDataKaryawan: async (bindText) => {
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
                    [25, 50, 100, -1],
                    [25, 50, 100, "Semua"]
                ],
                "ajax": {
                    "url": url.base_url(FormLembur.moduleApi()) + `getDataKaryawan`,
                    "type": "POST",
                    "data": params
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [{
                        "targets": [1,2,3,4],
                        "orderable": false,
                    },
                    {
                        "targets": 4,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                        }
                    },
                    {
                        "targets": 0,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                        }
                    },
                ],
                "columns": [{
                        "data": "NIK",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "NIK",
                    },
                    {
                        "data": "nama_lengkap",
                    },
                    {
                        "data": "area_kerja",
                    },
                    {
                        "data": "NIK",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="FormLembur.pilihData(this,'${bindText}')"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihData: (elm,bindID) => {
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');
        $('#'+bindID).val(nik + " - " + nama_lengkap);
        message.closeDialog();
    },

};

$(function(){
    FormLembur.getData();
});
