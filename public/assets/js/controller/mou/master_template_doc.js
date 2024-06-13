let MasterTemplateDoc = {
    module: () => {
        return "master-template-doc";
    },
    moduleApi: () => {
        return `api/${MasterTemplateDoc.module()}`;
    },
    add: () => {
        window.location.href = url.base_url(MasterTemplateDoc.module()) + "add";
    },
    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(MasterTemplateDoc.module()) + "ubah?id=" + data_id;
    },
    back: () => {
        window.location.href = url.base_url(MasterTemplateDoc.module()) + "/";
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
            <button class="btn btn-primary btn-sm" onclick="MasterTemplateDoc.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(MasterTemplateDoc.moduleApi()) + "delete",

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
                'nama_jenis': $('#jenis').val(),
                'nama_template': $('input#nama_template').val(),
                'keterangan': quill.root.innerHTML,
                'file': $('input#file').attr('src'),
                'tipe': $('input#file').attr('tipe'),
                'file_name': $('input#file').val(),
            },
            'user_id': user.getUserId(),

        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = MasterTemplateDoc.getPostData();
        let form = $(elm).closest('div.row');
        // console.log(params);
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(MasterTemplateDoc.moduleApi()) + "submit",
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
                    "url": url.base_url(MasterTemplateDoc.moduleApi()) + `getData`,
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
                        "targets": 5,
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
                            let role = User.getRole();
                            if (role == 'Admin') {
                                return `
                                    <button class="btn btn-warning btn-sm mb-2" data_id="${data}" onclick="MasterTemplateDoc.ubah(this)">
                                        <i class="bx bx-edit"></i>
                                    </button>
                                    <br>
                                    <button class="btn btn-danger btn-sm" data_id="${data}"  nama_jenis="${row.nama_template}" onclick="MasterTemplateDoc.delete(this, event)">
                                        <i class="bx bx-trash"></i>
                                    </button>
                                    `
                                    ;
                            }
                            return `
                            <button class="btn btn-warning btn mb-2" data_id="${data}" onclick="MasterTemplateDoc.ubah(this)">
                                <i class="fa fa-eye"></i>
                            </button>
                            `;

                        }
                    },
                    {
                        "data": "nama_template",
                        "render": (data, type, row, meta) => {
                            return `

                            ${row.nama_template}
                            <br>
                            <button class="btn btn-primary btn-sm me-2"
                                onclick="return MasterTemplateDoc.confirmDownload('${row.nama_template}','${row.dokumen_path}${row.file}')">
                                <span><i class="bx bx-download me-sm-2"></i>
                                    <span class="d-none d-sm-inline-block">Download File</span>
                                </span>
                            </button>
                            `
                        }
                    },
                    {
                        "data": "nama_jenis",
                    },
                    {
                        "data": "file",
                    },
                    {
                        "data": "keterangan",
                    }
                ]
            });
        }
    },


    confirmDownload: (fileName, filePath) => {
        Swal.fire({
            title: 'Apakah Anda Yakin?',
            text: `Anda akan mengunuduh data file ${fileName}.docx ?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Download!'
        }).then((result) => {
            if (result.value) {
                let url_path = `${filePath}`;
                window.location.href = url.base_url(url_path);
            }
        })
    },



    setTextEditor: () => {
        quill = new Quill('#keterangan', {
            placeholder: 'Type Something...',
            modules: { toolbar: true },
            theme: 'snow'
        });
    },

    select2All: () => {
        // Default
        const select2 = $('.select2');
        if (select2.length) {
            select2.each(function () {
                var $this = $(this);
                $this.wrap('<div class="position-relative"></div>').select2({
                    placeholder: 'Pilih Jenis',
                    dropdownParent: $this.parent()
                });
            });
        }
    },
    viewFile: (elm, e) => {
        e.preventDefault();
        let params = {};
        let path = url.base_url($(elm).attr('path'))

        // url.base_url(MasterTemplateDoc.module()) + "/";
        // let path = window.location.protocol + "//" + window.location.host + '/' + $(elm).attr('path');
        let html = `<br/><iframe src="${path}" style="width:100%; height:600px;"></iframe>`;
        bootbox.dialog({
            message: html,
            size: 'large'
        });
    },
    addFileOutTable: (elm) => {
        var uploader = $('<input type="file" accept="image/*;capture=camera" />');
        var src_foto = $(elm).closest('div').find('#file');
        uploader.click();

        uploader.on("change", function () {

            var reader = new FileReader();
            reader.onload = function (event) {
                var files = $(uploader).get(0).files[0];
                filename = files.name;
                var data_from_file = filename.split(".");
                var type_file = $.trim(data_from_file[data_from_file.length - 1]);
                if (type_file == 'docx') {
                    var data = event.target.result;
                    src_foto.attr("src", data);
                    src_foto.attr("tipe", type_file);
                    src_foto.val(filename);
                } else {
                    bootbox.dialog({
                        message: "File Harus Berupa Gambar Bertipe DOCX"
                    });
                }
            };

            reader.readAsDataURL(uploader[0].files[0]);
        });
    },

    showFile: (elm, e) => {
        e.preventDefault();

        let file = $(elm).attr('src');
        // console.log(file); return;
        try {


            if (file.search('.png') > -1) {
                image = true;
            } else if (file.search('.jpg') > -1) {
                image = true;
            } else if (file.search('.jpeg') > -1) {
                image = true;
            } else {
                image = false;
            }

            let html = ``;

            if (image) {
                html = `<div class="row g-3">
                    <div class="col-12">
                        <div style="overflow: auto">
                            <img id="image-pembelian" src="${file}" width="100%"/>
                        </div>
                        <div class="text-center">
                            <button onclick="MasterTemplateDoc.imageZoomIn('#image-pembelian')" class="btn btn-primary">Zoom In</button>
                            <button onclick="MasterTemplateDoc.imageZoomOut('#image-pembelian')" class="btn btn-danger">Zoom Out</button>
                        </div>
                    </div>
                </div>`;
            } else {
                html = `<div class="row g-3">
                    <div class="col-12">
                        <br/>
                        <iframe id="frame" src="${file}" width="100%" height="800"/>
                    </div>
                </div>`;
            }

            bootbox.dialog({
                message: html,
                size: 'large',
                onEscape: true,
            });


        } catch (error) {
            alert('Gagal Mengakses File')
        }

    },
    zoomInit: 100,

    imageZoomIn: (elm) => {

        if (MasterTemplateDoc.zoomInit != 300) {
            MasterTemplateDoc.zoomInit = MasterTemplateDoc.zoomInit + 50
        }

        $(elm).css({
            "margin": "auto",
            "width": `${MasterTemplateDoc.zoomInit}%`,
        })

        console.log(MasterTemplateDoc.zoomInit)
    },

    imageZoomOut: (elm) => {

        if (MasterTemplateDoc.zoomInit != 50) {
            MasterTemplateDoc.zoomInit = MasterTemplateDoc.zoomInit - 50
        }

        $(elm).css({
            "margin": "auto",
            "width": `${MasterTemplateDoc.zoomInit}%`,
        })

        console.log(MasterTemplateDoc.zoomInit)
    },
}


$(function () {
    MasterTemplateDoc.getData();
    MasterTemplateDoc.setTextEditor();
    // MasterTemplateDoc.setDate();
    MasterTemplateDoc.select2All();
});
