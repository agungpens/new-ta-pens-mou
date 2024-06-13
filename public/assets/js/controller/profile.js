let Profile = {
    module: () => {
        return "profile";
    },
    moduleApi: () => {
        return `api/${Profile.module()}`;
    },
    add: () => {
        window.location.href = Profile.module() + "/add";
    },
    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = Profile.module() + "/ubah?id=" + data_id;
    },
    detail: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = Profile.module() + "/detail?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url('home') + "/";
    },

    delete: (elm) => {
        let data_id = $(elm).attr("data_id");
        let nama_Profile = $(elm).attr("nama_Profile");


        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan menghapus data <b>${nama_Profile}</b> ini  ?</p>
        </div>
        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="Profile.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(Profile.moduleApi()) + "delete",

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
                'nama': $('input#nama').val(),
                'username': $('input#username').val(),
                'password': $('input#password').val(),
                'prodi': $('#prodi').val(),
                'role': $('#role').val(),
                'nama_lengkap': $('#nama_lengkap').val(),
                'jenis_kelamin': $('#jenis_kelamin').val(),
                'no_hp': $('#no_hp').val(),
                'alamat': $('#alamat').val(),
            },

        };
        return data;
    },

    updated: (elm, e) => {
        e.preventDefault();
        let params = Profile.getPostData();
        let form = $(elm).closest('div.row');
        // console.log(params); return;
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Profile.moduleApi()) + "submit",
                // url: "/api/Profile-mou/submit",
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
                        Toast.success('Informasi', 'Data Berhasil Diupdate');
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
                    "url": url.base_url(Profile.moduleApi()) + `getData`,
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
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="Profile.ubah(this)"></i>
                            <i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" nama_Profile="${row.nama_Profile}" onclick="Profile.delete(this, event)"></i>`;
                        }
                    },
                    {
                        "data": "nama_Profile",
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
    showPassword: () => {
        var passwordInput = $('#password');

        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            $('#showPasswordBtn i').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
        } else {
            passwordInput.attr('type', 'password');
            $('#showPasswordBtn i').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
        }
    }


}


$(function () {
    Profile.setTextEditor();
    // Profile.setDate();
    Profile.select2All();

    $(document).ready(function () {
        $('#togglePasswordBtn').on('click', function () {
            var passwordField = $('#password');
            var passwordFieldType = passwordField.attr('type');

            if (passwordFieldType === 'password') {
                passwordField.attr('type', 'text');
                $('#eye-icon').removeClass('bi bi-eye-slash').addClass('bi bi-eye');
            } else {
                passwordField.attr('type', 'password');
                $('#eye-icon').removeClass('bi bi-eye').addClass('bi bi-eye-slash');
            }
        });
    });
});
