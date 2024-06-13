

let DokumentasiDriver = {
    module: () => {
        return "jadwal-driver/dokumentasi-driver";
    },

    moduleApi: () => {
        return `api/${DokumentasiDriver.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(DokumentasiDriver.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(DokumentasiDriver.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(DokumentasiDriver.module()) + "index";
    },

    getData: async () => {
        let tableData = $('table#table-data');

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
                    [25, 50, 100],
                    [25, 50, 100]
                ],
                "ajax": {
                    "url": url.base_url(DokumentasiDriver.moduleApi()) + `getData`,
                    "type": "POST",
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [
                    {
                        "targets": 2,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            // $(td).addClass('text-center');
                        }
                    },
                    {
                        "targets": 5,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                        }
                    },

                ],
                "columns": [{
                    "data": "id",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    "data": "nama_dokumentasi",
                },
                {
                    "data": "type_input",
                },
                {
                    "data": "input_rel",
                },
                {
                    "data": "select_option",
                },
                {
                    "data": "id",
                    "render": (data, type, row, meta) => {
                        return `
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="DokumentasiDriver.ubah(this)"></i>
                            <i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="DokumentasiDriver.delete(this, event)"></i>`;
                    }
                }
                ]
            });
        }
    },

    delete: (elm, e) => {
        e.preventDefault();
        let data_id = $(elm).attr('data_id');
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan menghapus data ini ?</p>
        </div>
        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="DokumentasiDriver.deleteConfirm(this, '${data_id}')">Ya</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Tidak</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });


    },

    deleteConfirm: (elm, id) => {
        let params = {};
        params.id = id;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(DokumentasiDriver.moduleApi()) + "delete",

            beforeSend: () => {
                message.loadingProses('Proses Hapus Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Data Berhasil Dihapus');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    Toast.error('Informasi', 'Data Gagal Dihapus ', resp.message);
                }
            }
        });
    },

    getPostInputDokumen: () => {
        let params = {};
        let data_file = $('div.content-file-upload');
        $.each(data_file, function () {
            let $this = $(this);
            let attr_obj_img = $this.find('img').attr('id');
            let attr_obj_filename = $this.find('label').attr('id');
            params[`${attr_obj_img.replaceAll('-', '_')}`] = $this.find('img').attr('src');
            params[`${attr_obj_filename.replaceAll('-', '_')}`] = $this.find('label').text().trim();
        });

        return params;
    },

    getPostData: () => {
        let data = {
            'data': {
                'id': $('input#id').val(),
                'nama_dokumentasi': $.trim($('#nama').val()),
                'type_input': $.trim($('#type_input').val()),
                'input_rel': $.trim($('#input_rel').val()),
                'select_option': $.trim($('#select_option').val()),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = DokumentasiDriver.getPostData();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(DokumentasiDriver.moduleApi()) + "submit",
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

$(function () {
    DokumentasiDriver.getData();
});
