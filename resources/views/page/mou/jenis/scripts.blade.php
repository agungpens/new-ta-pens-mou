<script>
    let Jenis = {
    add: () => {
         // Tampilkan modal
        $('input#id').val(''),
        $('input#nama_jenis').val(''),
        //jika id keterangan ini menggunakan quill.root.innerHTML, cara mengkosongkan nya gimana ?
        quill.root.innerHTML = '';
        $("#exampleModal").modal("show");
    },
    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        let url = `{{ route('jenis-doc/ubah') }}` ;
        $.ajax({
            type: "POST",
            url: url,
            data: {
                id: data_id
            },
            dataType: "json",
            success: function (response) {
                if (response.is_valid) {
                    let data = response.data;
                    // Mengatur nilai input dan elemen lainnya berdasarkan respons dari server
                    $('input#id').val(data.id),
                    $('input#nama_jenis').val(data.nama_jenis),
                    quill.root.innerHTML = data.keterangan;
                    $("#exampleModal").modal("show");
                }
            }
        });
    },
    delete: (elm) => {
        let data_id = $(elm).attr("data_id");
        let nama_jenis = $(elm).attr("nama_jenis");


        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan menghapus data <b>${nama_jenis}</b> ini  ?</p>
        </div>
        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="Jenis.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: `{{ route('jenis-doc/delete') }}`,

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
                'nama_jenis': $('input#nama_jenis').val(),
                'keterangan': quill.root.innerHTML,
            },
            'user_id': user.getUserId(),

        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Jenis.getPostData();
        let form = $(elm).closest('div.row');
        // console.log(params);
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: `{{ route('jenis-doc/submit') }}`,
                // url: "/api/jenis-mou/submit",
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
                    "url": `{{ route('jenis-doc/getData') }}`,
                    "type": "GET",
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
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="Jenis.ubah(this)"></i>
                            `;
                        }
                    },
                    {
                        "data": "nama_jenis",
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
    Jenis.getData();
    Jenis.setTextEditor();
    // Jenis.setDate();
    Jenis.select2All();
});

</script>
