let GaleriPicture = {
    module: () => {
        return "master/galeri_picture";
    },

    moduleGaleriBatch: () => {
        return "master/galeri_batch";
    },

    moduleApi: () => {
        return `api/${GaleriPicture.module()}`;
    },

    add: () => {
        // let html = `<div class="row g-3"> 
        // <div class="col-12">
        //     <label class="form-label mt-3" for="uploader">Gambar</label>
        //     <div class="input-group">
        //         <input type="file" class="form-control" id="uploader" name="uploader" accept="image/*"
        //             onchange="GaleriPicture.uploadFile(this)" placeholder="Format File Gambar" multiple>
        //         <input type="hidden" id="attachment">
        //     </div>
        // </div>
        // <div class="col-12" id="image-preview"></div>
        // <div class="col-12">
        //     <button class="btn btn-primary" onclick="GaleriPicture.submit(this, event)">Unggah</button>
        //     <button class="btn btn-warning" onclick="message.closeDialog()">Tidak</button>
        // </div>
        // </div>`;

        let html = ``;

        bootbox.dialog({
            size: 'large',
            message: html
        });

    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(GaleriPicture.module()) + "ubah?id=" + data_id;
    },

    backToBatch: () => {
        var galeri_id = $("#galeri_id").val();
        window.location.href = url.base_url(GaleriPicture.moduleGaleriBatch()) + "index?galeri_id="+ galeri_id;
    },

    back: () => {
        var galeri_batch_id = $("#galeri_batch_id").val();

        window.location.href = url.base_url(GaleriPicture.module()) + "index?galeri_batch_id=" + galeri_batch_id;
    },

    // UPLOAD FILE
    uploadFile: (elm) => {
        let uploader = $('#uploader');
        let attachment = $('#attachment');
        var reader = new FileReader();
        reader.onload = function (event) {
            var filedata = $(uploader).get(0).files;
            var src = [];
            var type_file = [];
            var filename = [];
            var html = '';
            
            for (let index = 0; index < filedata.length; index++) {
                var files = filedata[index];
                
                filename = files.name;
                var data_from_file = filename.split(".");
                var type_file = $.trim(data_from_file[data_from_file.length - 1]);
                console.log(type_file)
                var type_validations = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'];
                if (type_validations.includes(type_file)) {
                    src.push(event.target.result)
                    html += `<img src="${event.target.result}" style="width: 300px">`;
                    
                } else {
                    attachment.attr("src", "");
                    attachment.attr("tipe", "");
                    attachment.val("");
                    uploader.val("");
                    bootbox.dialog({
                        message: "File harus menggunakan format gambar"
                    });
                }

            }

            attachment.attr("src", src.join('@@@'));

            $("#image-preview").html(html)

        };

        reader.readAsDataURL(uploader[0].files[0]);

    },

    getPostInputDokumen: () => {
        let params = {};
        let attachment = $('#attachment');
        params.file = attachment.attr('src');
        params.tipe = attachment.attr('tipe');
        
        return params;
    },

    getData: async () => {
        let tableData = $('table#table-data');

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
                    [25, 50, 100],
                    [25, 50, 100]
                ],
                "ajax": {
                    "url": url.base_url(GaleriPicture.moduleApi()) + `getData`,
                    "type": "GET",
                    "data" : {
                        "id" : $("#galeri_batch_id").val()
                    }
                    // "headers": {
                    //     'X-CSRF-TOKEN': `'${tokenApi}'`
                    // }
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                "columnDefs": [{
                        "targets": 2,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                            $(td).addClass('td-padd');
                            $(td).addClass('action');
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
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "image",
                        "render": (data, type, row, meta) => {
                            return `<img src="${row.image}" class="img-fluid" style="width: 200px" />`;
                        }
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';                  
                            
                            if(deleteAction == '1'){
                                htmlAction += `<button class="btn btn-danger" style="cursor: pointer;" data_id="${data}" onclick="GaleriPicture.delete(this, event)">Hapus</button>`;
                            }                            
                            return htmlAction;
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
            <button class="btn btn-primary btn-sm" onclick="GaleriPicture.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(GaleriPicture.moduleApi()) + "delete",

            beforeSend: () => {
                message.loadingProses('Proses Hapus Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi',"Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi','Data Berhasil Dihapus');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    Toast.error('Informasi','Data Gagal Dihapus ', resp.message);
                }
            }
        });
    },

    getPostData: () => {
        let data = {
            'data': {
                'id': $('input#id').val(),
                'galeri_batch_id': $.trim($('#galeri_batch_id').val()),
            },
            'attachment' : GaleriPicture.getPostInputDokumen()
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = GaleriPicture.getPostData();
        let form = $(elm).closest('div.row');
        if(validation.runWithElement(form)){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(GaleriPicture.moduleApi()) + "submit",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function () {
                    message.closeLoading();
                    Toast.error('Informasi',"Gagal");
                },
    
                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi','Data Berhasil Disimpan');
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

    setDate: () => {
        const flatpickrRange = document.querySelector('.flatpickr');
        if(flatpickrRange){
            flatpickrRange.flatpickr();
        }
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

    nextPersonal: (elm, e) => {
        e.preventDefault();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            Wizard.nextWizard(elm)
        }
    },

    takePict: (elm, e) => {
        e.preventDefault();
        let idcontent = $(elm).attr('data-id');
        var uploader = $('<input type="file" accept="image/*;capture=camera" />');
        var src_foto = $(`#${idcontent}`);
        uploader.click();

        uploader.on("change", function () {
            var reader = new FileReader();
            reader.onload = function (event) {
                var files = $(uploader).get(0).files[0];
                filename = files.name;
                var data_from_file = filename.split(".");
                var type_file = $.trim(data_from_file[data_from_file.length - 1]);
                if (type_file == 'jpg' || type_file == 'jpeg' || type_file == 'png') {
                    $(`#filename-${idcontent}`).text(filename);
                    process_image(files).then(function (response) {
                        src_foto.attr("src", response);
                    });
                    src_foto.closest('div').removeClass("hide");
                } else {
                    bootbox.dialog({
                        message: "File Harus Berupa Gambar Bertipe JPG, JPEG, PNG"
                    });
                    
                }
            };

            reader.readAsDataURL(uploader[0].files[0]);
        });
    },

    getDataLogKaryawan: async () => {
        let tableData = $('table#table-data-log-karyawan');

        let params = {};
        params.nik = $('#id').val();
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
                    "url": url.base_url(GaleriPicture.moduleApi()) + `getDataLogKaryawan`,
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
                        "targets": 4,
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
                        "targets": 3,
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
                        "data": "doc_trans",
                        "render": (data, type, row, meta) => {
                            return `<a class="" style="cursor: pointer;" onclick="GaleriPicture.showDetailEditProfile(this, event)">${data}</a>`;
                        }
                    },
                    {
                        "data": "tgl_pengajuan",
                    },
                    {
                        "data": "lpp_id",
                        "render": (data, type, row, meta) => {
                            if (row.tgl_verifikasi != '' && row.status == 'approved') {
                                return `<label class="text-success">Terverifikasi</label>`;
                            } else {
                                if (row.status == 'reject') {
                                    return `<label class="text-danger">Ditolak</label>`;
                                } else {
                                    if (row.tgl_approve == '') {
                                        return `<label class="text-primary">Proses Approval Perubahan</label>`;
                                    } else {
                                        return `<label class="">Proses Verifikasi</label>`;
                                    }
                                }
                            }
                        }
                    },
                    {
                        "data": "lpp_id",
                        "render": (data, type, row, meta) => {
                            return `
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="GaleriPicture.detailPerubahan(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    modulePerubahan: () => {
        return "transaksi/perubahandatakaryawan";
    },
    
    modulePerubahanApi: () => {
        return `api/${GaleriPicture.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $('input#id').val();
        window.location.href = url.base_url(GaleriPicture.modulePerubahan()) + "ubah?id=" + data_id + "&state=karyawan-" + from_id;
    },

    showDetailEditProfile:(elm, e)=>{
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(GaleriPicture.modulePerubahanApi()) + "showDetailEditProfile",

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
                
            }
        });
    }
};

$(function () {
    GaleriPicture.getData();
    GaleriPicture.getDataLogKaryawan();
    GaleriPicture.setDate();
    GaleriPicture.select2All();

    
    Dropzone.options.dropzone = {
        maxFilesize: 12,
        renameFile: function(file) {
            var dt = new Date();
            var time = dt.getTime();
            return time+file.name;
        },
        acceptedFiles: ".jpeg,.jpg,.png,.gif",
        addRemoveLinks: true,
        timeout: 5000,
        removedfile: function(file) 
        {
            var name = file.upload.filename;
            $.ajax({
            type: 'POST',
            url: url.base_url(GaleriPicture.moduleApi()) + `removeImage`,
            data: {filename: name},
            success: function (data){
                console.log("File has been successfully removed!!");
            },
            error: function(e) {
                console.log(e);
            }});
            var fileRef;
            return (fileRef = file.previewElement) != null ? 
            fileRef.parentNode.removeChild(file.previewElement) : void 0;
        },
        success: function(file, response) 
        {
            console.log(response);
        },
        error: function(file, response)
        {
            return false;
        }
    }
});
