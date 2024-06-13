let FormNwnp = {
    module: () => {
        return "transaksi/form_nwnp";
    },

    moduleApi: () => {
        return `api/${FormNwnp.module()}`;
    },

    form: (kode) => {
        window.location.href = url.base_url(FormNwnp.module()) + "form?kode="+kode;
    },

    print: (kode) => {
        window.open(url.base_url(FormNwnp.module()) + "print?kode="+kode);
    },

    export: (kode, nik) => {
        window.location.href = url.base_url(FormNwnp.module()) + "export?kode="+kode;
    },

    back: () => {
        window.location.href = url.base_url(FormNwnp.module()) + "index";
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
                    "url": url.base_url(FormNwnp.moduleApi()) + `getData`,
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
                                btn += `<button class="btn btn-sm btn-warning" onclick="FormNwnp.form('${data}')">Form</button>`;
                                btn += `<button class="btn btn-sm btn-light" onclick="FormNwnp.print('${data}')">Cetak</button>`;
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

    getPostdataItem: () => {
        let data    = [];
        let tableData = $('table#item').find('tbody').find('tr');
        $.each(tableData, function () {
            let tr = $(this);
            let params = {};
            
            params.nik            = tr.find('.nik').val();
            params.prorate        = tr.find('.prorate').val();
            params.hari_kerja     = tr.find('.hari_kerja').val();
            params.alfa           = tr.find('.alfa').val();
            params.cuti           = tr.find('.cuti').val();
            params.sakit          = tr.find('.sakit').val();
            params.terlambat      = tr.find('.terlambat').val();
            params.pulang_cepat   = tr.find('.pulang_cepat').val();

            data.push(params);
        });

        return data;
    },

    getPostData: () => {
        let data = {
            'periode_gaji_kode': $('input#periode_gaji_kode').val(),
            'item': FormNwnp.getPostdataItem(),
        };

        return data;
    },

    submit: (elm) => {
        let params = FormNwnp.getPostData();
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
                url: url.base_url(FormNwnp.moduleApi()) + "submit",
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

};

$(function(){
    FormNwnp.getData();
});
