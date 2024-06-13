let Kategori = {
    module: () => {
        return "kategori-doc";
    },
    moduleApi: () => {
        return `api/${Kategori.module()}`;
    },
    add: () => {
        window.location.href = Kategori.module() + "/add";
    },
    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = Kategori.module() + "/ubah?id=" + data_id;
    },
    delete: (elm) => {
        let data_id = $(elm).attr("data_id");
        let nama_kategori = $(elm).attr("nama_kategori");


        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan menghapus data <b>${nama_kategori}</b> ini  ?</p>
        </div>
        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="Kategori.deleteConfirm(this, '${data_id}')">Ya</button>
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
        params.user_id = user.getUserId();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Kategori.moduleApi()) + "delete",

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

    getPostData: () => {
        let data = {
            'data': {
                'id': $('input#id').val(),
                'nama_kategori': $('input#nama_kategori').val(),
                'keterangan': quill.root.innerHTML,
            },
            'user_id': user.getUserId()


        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Kategori.getPostData();
        let form = $(elm).closest('div.row');
        // console.log(params);
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Kategori.moduleApi()) + "submit",
                // url: "/api/kategori-mou/submit",
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
                    "url": url.base_url(Kategori.moduleApi()) + `getData`,
                    "type": "POST",
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
                            $(td).addClass('td-padd');
                        }
                    },
                    {
                        "targets": 2,
                        "orderable": true,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            // $(td).addClass('td-padd');
                        }
                    },
                    {
                        "targets": 1,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
                            $(td).addClass('text-center');
                        }
                    },
                    {
                        "targets": 0,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            // $(td).addClass('td-padd');
                            // $(td).addClass('text-center');
                        }
                    },
                ],
                "columns": [
                    {
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="Kategori.ubah(this)"></i>
                            <i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" nama_kategori="${row.nama_kategori}" onclick="Kategori.delete(this, event)"></i>`;
                        }
                    },
                    {
                        "data": "nama_kategori",
                    },
                    {
                        "data": "keterangan",
                    }
                ]
            });
        }
    },

    setTextEditor: () => {
        quill = new Quill('#keterangan', {
            placeholder: 'Type Something...',
            modules: { toolbar: true },
            theme: 'snow'
        });
    },

}


$(function () {
    Kategori.getData();
    Kategori.setTextEditor();
    // Kategori.setDate();
    Kategori.select2All();
});
