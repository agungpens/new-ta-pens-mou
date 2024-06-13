var quill;
let SuratPeringatan = {

    module: () => {
        return "transaksi/suratperingatan";
    },

    moduleApi: () => {
        return `api/${SuratPeringatan.module()}`;
    },

    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleKaryawanApi: () => {
        return `api/${SuratPeringatan.moduleKaryawan()}`;
    },

    add: () => {
        window.location.href = url.base_url(SuratPeringatan.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(SuratPeringatan.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(SuratPeringatan.module()) + "index";
    },

    getData: async () => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();
        let params = {};
        params.area = $('#area').val();
        params.divisi = $('#divisi').val();
        params.departemen = $('#departemen').val();
        params.jabatan = $('#jabatan').val();

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
                    "url": url.base_url(SuratPeringatan.moduleApi()) + `getData`,
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
                    // {
                    //     "targets": 6,
                    //     "orderable": false,
                    //     "createdCell": function (td, cellData, rowData, row, col) {
                    //         $(td).addClass('text-center');
                    //         $(td).addClass('td-padd');
                    //         $(td).addClass('action');
                    //     }
                    // },
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
                "columns": [
                    // {
                    //     "data": "id",
                    //     render: function (data, type, row, meta) {
                    //         return meta.row + meta.settings._iDisplayStart + 1;
                    //     }
                    // },
                    {
                        "data": "doc_trans",
                    },
                    {
                        "data": "nama_sp",
                    },
                    {
                        "data": "nama_departemen",
                    },
                    {
                        "data": "nik",
                    },
                    {
                        "data": "nama_lengkap",
                    },
                    {
                        "data": "nama_jabatan",
                    },
                    {
                        "data": "status_karyawan_name",
                    },
                    {
                        "data": "peringatan",
                    },
                    {
                        "data": "tanggal_mulai",
                    },
                    {
                        "data": "tanggal_selesai",
                    },
                    {
                        "data": "doc_trans",
                        "render": (data, type, row, meta) => {
                            return `
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="SuratPeringatan.ubah(this)"></i>
                            <i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="SuratPeringatan.delete(this, event)"></i>`;
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
            <button class="btn btn-primary btn-sm" onclick="SuratPeringatan.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(SuratPeringatan.moduleApi()) + "delete",

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

    getPostItemDetail: () => {
        let data = [];
        let checkDetail = $('.checkdetail');
        $.each(checkDetail, function () {
            let params = {};
            params.code = $(this).attr('data_id');
            if ($(this).is(':checked')) {
                data.push(params);
            }
        });
        return data;
    },

    // getPostData: () => {
    //     let data = {
    //         'data': {
    //             'id': $('input#id').val(),
    //             'doc_trans': $('input#doc_trans').val(),
    //         },
    //         'data_detail': SuratPeringatan.getPostItemDetail()
    //     };
    //     return data;
    // },

    approve: (elm, e) => {
        e.preventDefault();
        let params = SuratPeringatan.getPostData();
        if ($('#keterangan').length > 0) {
            if ($('#keterangan').val() == '') {
                Toast.error('Informasi', 'Keterangan Belum Diisi');
                return;
            } else {
                params.keterangan = $('#keterangan').val();
            }
        }
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(SuratPeringatan.moduleApi()) + "approve",
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

    setDate: () => {
        let dataDate = $('.data-date');
        $.each(dataDate, function () {
            $(this).flatpickr();
        });

        let dataDateTime = $('.data-datetime');
        $.each(dataDateTime, function () {
            $(this).flatpickr({
                enableTime: true,
                dateFormat: 'Y-m-d H:i'
            });
        });
    },

    select2All: () => {
        // Default
        const select2 = $('.select2');
        if (select2.length) {
            select2.each(function () {
                var $this = $(this);
                $this.wrap('<div class="position-relative"></div>').select2({
                    placeholder: 'Pilih',
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

    showDataKaryawan: (elm) => {
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(SuratPeringatan.moduleApi()) + "showDataKaryawan",

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
                SuratPeringatan.getDataKaryawan();
            }
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
                    [200, 300, 1000],
                    [200, 300, 1000]
                ],
                "ajax": {
                    "url": url.base_url(SuratPeringatan.moduleKaryawanApi()) + `getData`,
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="SuratPeringatan.pilihData(this)"></i>`;
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

    setNik: (elm, e) => {
        let nik = $(elm).is(':checked') ? $(elm).attr('nik') : '';
        $('#nik').val(nik);
    },

    modulePerubahan: () => {
        return "transaksi/perubahandatakaryawan";
    },

    modulePerubahanApi: () => {
        return `api/${SuratPeringatan.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $('input#id').val();
        window.location.href = url.base_url(SuratPeringatan.modulePerubahan()) + "ubah?id=" + data_id + "&state=karyawan-" + from_id;
    },

    showDetailEditProfile: (elm, e) => {
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(SuratPeringatan.modulePerubahanApi()) + "showDetailEditProfile",

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

            }
        });
    },

    checkAll: (elm) => {
        let checkHead = $(elm);
        if (checkHead.is(':checked')) {
            $('.checkdetail').prop('checked', true);
        } else {
            $('.checkdetail').prop('checked', false);
        }
    },

    checkData: (elm) => {
        let checkHead = $('.checkhead');
        let checkDetail = $('.checkdetail');
        let totalTrChecked = 0;
        $.each(checkDetail, function () {
            if ($(this).is(':checked')) {
                totalTrChecked += 1;
            }
        });

        if (totalTrChecked == checkDetail.length) {
            checkHead.prop('checked', true);
        } else {
            checkHead.prop('checked', false);
        }
    },

    reject: (elm) => {
        let html = `<div class="row g-3">
        <div class="col-12">
            <br/>
            <label class="form-label" for="keterangan">Keterangan</label>
            <textarea id="keterangan" name="keterangan" error="Keterangan" class="form-control required" rows="2" placeholder="Keterangan"></textarea>
        </div>
        <div class="col-12 text-end">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="SuratPeringatan.approve(this, event)">Proses</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },

    checkMenu: (elm) => {
        $('input[type=checkbox]').on('change', function () {
            if ($(this).is(':checked')) {
                let parent_id = $(this).attr('parent_id');
                $('div#menu-data').find(`input.checkmenu-${parent_id}`).prop('checked', true);
            } else {
                $('div#menu-data').find(`input.checkmenu-${parent_id}`).prop('checked', false);
            }
        });
    },

    getPostData: () => {
        let data = {
            'data': {
                'doc_trans': $('input#id').val(),
                'date_trans' : $("#date_trans").val(),
                'nik': $.trim($('#nik').val()),
                'jenis_sp' : $.trim($("#jenissp").val()),
                'peringatan': $.trim($('#peringatan').val()),
                'kronologis' : quill.root.innerHTML,
                'tanggal_mulai' : $("#tanggal_mulai").val(),
                'tanggal_selesai' : $("#tanggal_selesai").val(),
                'dokumen' : $('#dokumen').val(),
                'dokumen_path' : $('#dokumen').attr("path"),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = SuratPeringatan.getPostData();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(SuratPeringatan.moduleApi()) + "submit",
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

    setTextEditor:() => {
        quill = new Quill('#kronologis', {
            placeholder: 'Type Something...',
            modules: { toolbar: true },
            theme: 'snow'
        });
    },

    checkUrl:()=>{
        if (window.location.href.indexOf("ubah") > -1) {
            quill.root.innerHTML = $("#hd_content").val()
            // alert("your url contains the name franky");
        }
    },

    takeFile: (elm, e) => {
        e.preventDefault();
        var uploader = $('<input type="file" accept="image/*;capture=camera" />');
        var src_file = $('#dokumen');
        uploader.click();

        uploader.on("change", function () {
            var reader = new FileReader();
            reader.onload = function (event) {
                var files = $(uploader).get(0).files[0];
                filename = files.name;
                var data_from_file = filename.split(".");
                var type_file = $.trim(data_from_file[data_from_file.length - 1]);
                if (type_file == 'pdf') {
                    src_file.val(filename);
                    SuratPeringatan.execUploadFile(files, src_file);

                    var data = event.target.result;
                    src_file.attr("src", data);;
                } else {
                    bootbox.dialog({
                        message: "File Harus Bertipe PDF"
                    });
                }
            };

            reader.readAsDataURL(uploader[0].files[0]);
        });
    },

    execUploadFile: (files, component) => {
        let formData = new FormData();
        formData.append('file', files);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            url: url.base_url(SuratPeringatan.moduleApi()) + "execUploadFile",

            beforeSend: () => {
                message.loadingProses("Proses Upload File...");
            },

            error: function (err) {
                toastr.error(`Gagal, ${JSON.stringify(err)}`);
                message.closeLoading();
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'File Berhasil Diupload');
                    component.attr('path', resp.path);
                } else {
                    Toast.error('Informasi', `Upload Gagal ${resp.message}`);
                }
            }
        });
    },

    viewFile:(elm, e) =>{
        e.preventDefault();
        let params = {};
        let path = window.location.protocol+"//"+window.location.host+'/'+$(elm).attr('path');
        let html = `<br/><iframe src="${path}" style="width:100%; height:600px;"></iframe>`;
        bootbox.dialog({
            message: html,
            size: 'large'
        });
    },

    print: (elm) => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let data_id = urlParams.get('id');

        // window.location.href = url.base_url(SuratPeringatan.module()) + "ubah?id=" + data_id;
        window.open(url.base_url(SuratPeringatan.module()) + "cetak?id=" + data_id,'_blank')
    },

    export: (elm) => {
        let idExportContent = $(elm).attr('idexport');
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent($(`div#${idExportContent}`).html()));
    },

    moduleLaporanAbsen: () => {
        return "laporan/absensi";
    },

    moduleLaporanAbsenApi: () => {
        return `api/${SuratPeringatan.moduleLaporanAbsen()}`;
    },

    showListDepartemen: (elm) => {
        let params = {};
        params.divisi = $(elm).val();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(SuratPeringatan.moduleLaporanAbsenApi()) + "showListDepartemen",

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
};

$(function () {
    SuratPeringatan.getData();
    SuratPeringatan.getDataKaryawan();
    SuratPeringatan.setDate();
    SuratPeringatan.select2All();
    SuratPeringatan.checkData();
    SuratPeringatan.checkMenu();
    SuratPeringatan.setTextEditor();
    SuratPeringatan.checkUrl()
});
