
let jobPuposeEditor;
let JobStruktur = {
    module: () => {
        return "master/jobstruktur";
    },

    moduleApi: () => {
        return `api/${JobStruktur.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(JobStruktur.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(JobStruktur.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(JobStruktur.module()) + "index";
    },


    approve:(elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(JobStruktur.module()) + "approve?id=" + data_id;
    },

    getData: async () => {
        let tableData = $('table#table-data');

        if (tableData.length > 0) {
            let updateAction = $('#update').val();
            let deleteAction = $('#delete').val();
            let approveAction = $('#approve').val();
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
                    "url": url.base_url(JobStruktur.moduleApi()) + `getData`,
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
                        "targets": 2,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
                        },
                        "defaultContent": "-",
                    },
                    {
                        "targets": 4,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
                        },
                        "defaultContent": "-",
                    },
                    {
                        "targets": 3,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
                        }
                    },

                    {
                        "targets": 5,
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
                        "data": "nama_job",
                    },
                    {
                        "data": "nama_departemen",
                    },
                    {
                        "data": "status",
                        render : function(data,type,row,meta){
                            let html = '';
                            if(data == "APPROVED"){
                                html = `<span class="badge bg-label-success" align="left">${data} by ${row.nama_lengkap}</span>`;
                            }else if(data == "REJECTED"){
                                html = `<span class="badge bg-label-danger" align="left">${data} by ${row.nama_lengkap}</span>`;
                            }else if(data == "CREATED"){
                                html = `<span class="badge bg-label-warning">${data}</span>`;
                            }else{
                                if(data == null){
                                    html = `<span class="badge bg-label-info">NOT APPROVED</span>`;
                                }

                                html = `<span class="badge bg-label-info">${data}</span>`;
                            }
                            if(row.next_approval){
                                html += `<br>Next Approval : ${row.next_approval_name}`
                            }
                            return html;
                        }

                    },
                    {
                        "data": "alasan_ditolak",
                    },
                    {
                        "data": "updated_at",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            console.log(row.status);
                            if(approveAction == '1'){
                                htmlAction += `<a class="bx bx-check-circle" style="cursor: pointer;" data_id="${data}" onclick="JobStruktur.approve(this)"></a>`;
                            }
                            if (updateAction == '1') {
                                if (row.status == 'SUBMITTED') {
                                    htmlAction += `<i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="JobStruktur.ubah(this)"></i>`;
                                }
                            }

                            if (deleteAction == '1') {
                                htmlAction += `<i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="JobStruktur.delete(this, event)"></i>`;
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
            <button class="btn btn-primary btn-sm" onclick="JobStruktur.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(JobStruktur.moduleApi()) + "delete",

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
                'nama': $.trim($('#nama').val()),
                'departemen': $.trim($('#departemen').val()),
                'jabatan': $.trim($('#jabatan').val()),
                'lokasi': $.trim($('#lokasi').val()),
                'job_purpose': $('#job-purpose').find('.ql-editor').html(),
                'job_requirement': $('#job-requirement').find('.ql-editor').html(),
                // 'job_evaluation': $('#job-evaluation').find('.ql-editor').html(),
                'main_responsible': $('#main-responsible').find('.ql-editor').html(),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = JobStruktur.getPostData();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(JobStruktur.moduleApi()) + "submit",
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

    reject:(elm,e) => {
        let params = {}
        params.id = e;
        let rejectHtml = `
            <input type="hidden" id="no_pengajuan" value="${e}">

            <div class="row g-3">
                <div class="col-12">
                    <h5 class="py-3 breadcrumb-wrapper mb-4">
                        <span class="text-muted fw-light">Reject Pengajuan /</span><span class="text-muted fw-light">${e}</span>
                    </h5>
                </div>
            </div>

            <div class="row g-3">
                <div class="col-sm-12">
                    <label class="form-label" for="nik">Keterangan</label>
                    <textarea class='form-control required' id='alasan-ditolak' name='alasan-ditolak' error='Keterangan' ></textarea>
                </div>
                <div class="col-12 text-end">
                    <button status='REJECTED' onclick="JobStruktur.saveReject(this,'${e}')" class="btn btn-danger btn-next"> <span
                            class="d-sm-inline-block d-none me-sm-1">Reject</span> <i
                            class="bx bx-x bx-sm me-sm-n2"></i></button>
            </div>
        `;
        bootbox.dialog({
            message: rejectHtml,
            size: 'small'
        });
        $('.bootbox-close-button').addClass('btn-close').text("");
    },

    saveReject:(elm,e) => {
        const kodeTransaksi = e;
        const alasanDitolak = $('#alasan-ditolak').val();
        if(validation.run()){
            let params = {}
            params.id = kodeTransaksi;
            params.alasan_ditolak = alasanDitolak
            params.status = $(elm).attr('status');

            console.log(params);

            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(JobStruktur.moduleApi()) + "saveapproval",

                beforeSend: () => {
                    message.loadingProses('Proses Rejected Data');
                },

                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi","Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if(resp.is_valid == 1){
                        Toast.success('Informasi','Data Berhasil Di Reject');
                        setTimeout(function () {
                            window.location.href = url.base_url(JobStruktur.module()) + "index";
                        }, 1000);
                    }else{
                        Toast.error('Informasi', resp.message);
                    }
                }
            });
        }
    },

    saveApproval: (elm, id) => {
        let params = {};
        params.id = id;
        params.status = $(elm).data('status');
        params.sifat = $('#sifat').val();
        // console.log(params);
        // return params;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(JobStruktur.moduleApi()) + "saveapproval",

            beforeSend: () => {
                message.loadingProses('Proses Approval Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi',"Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi','Data Berhasil Diapprove');
                    setTimeout(function () {
                        window.location.href = url.base_url(JobStruktur.module()) + "index";
                    }, 1000);
                } else {
                    Toast.error('Informasi','Data Gagal Diapprove ', resp.message);
                }
            }
        });
    },

    setDate: () => {
        const flatpickrRange = document.querySelector('.flatpickr');
        if (flatpickrRange) {
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
                    "url": url.base_url(JobStruktur.moduleApi()) + `getDataLogKaryawan`,
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
                            return `<a class="" style="cursor: pointer;" onclick="JobStruktur.showDetailEditProfile(this, event)">${data}</a>`;
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
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="JobStruktur.detailPerubahan(this)"></i>`;
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
        return `api/${JobStruktur.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $('input#id').val();
        window.location.href = url.base_url(JobStruktur.modulePerubahan()) + "ubah?id=" + data_id + "&state=karyawan-" + from_id;
    },

    showDetailEditProfile: (elm, e) => {
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(JobStruktur.modulePerubahanApi()) + "showDetailEditProfile",

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

    editor: () => {
        const fullToolbar = [
            [{
                    font: []
                },
                {
                    size: []
                }
            ],
            ['bold', 'italic', 'underline', 'strike'],
            [{
                    color: []
                },
                {
                    background: []
                }
            ],
            [{
                    script: 'super'
                },
                {
                    script: 'sub'
                }
            ],
            [{
                    header: '1'
                },
                {
                    header: '2'
                },
                'blockquote',
                'code-block'
            ],
            [{
                    list: 'ordered'
                },
                {
                    list: 'bullet'
                },
                {
                    indent: '-1'
                },
                {
                    indent: '+1'
                }
            ],
            [
                'direction',
                {
                    align: []
                }
            ],
            // ['link', 'image', 'video', 'formula'],
            ['clean']
        ];

        if ($('#job-purpose').length > 0) {
            jobPuposeEditor = new Quill('#job-purpose', {
                bounds: '#full-editor',
                placeholder: 'Type Something...',
                modules: {
                    formula: true,
                    toolbar: fullToolbar
                },
                theme: 'snow'
            });
        }

        if ($('#job-requirement').length > 0) {
            jobPuposeEditor = new Quill('#job-requirement', {
                bounds: '#full-editor',
                placeholder: 'Type Something...',
                modules: {
                    formula: true,
                    toolbar: fullToolbar
                },
                theme: 'snow'
            });
        }

        if ($('#job-evaluation').length > 0) {
            jobPuposeEditor = new Quill('#job-evaluation', {
                bounds: '#full-editor',
                placeholder: 'Type Something...',
                modules: {
                    formula: true,
                    toolbar: fullToolbar
                },
                theme: 'snow'
            });
        }

        if ($('#main-responsible').length > 0) {
            jobPuposeEditor = new Quill('#main-responsible', {
                bounds: '#full-editor',
                placeholder: 'Type Something...',
                modules: {
                    formula: true,
                    toolbar: fullToolbar
                },
                theme: 'snow'
            });
        }
    },
};

$(function () {
    JobStruktur.getData();
    JobStruktur.getDataLogKaryawan();
    JobStruktur.setDate();
    JobStruktur.select2All();
    JobStruktur.editor();
});
