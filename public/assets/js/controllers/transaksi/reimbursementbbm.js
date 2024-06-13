let ReimbursementBbm = {
    module: () => {
        return "reimbursement/_bbm";

    },

    moduleApi: () => {
        return `api/${ReimbursementBbm.module()}`;
    },

    add: (doc_trans = '') => {
        window.location.href = url.base_url(ReimbursementBbm.module()) + "add" + doc_trans;
    },

    back: () => {
        window.location.href = url.base_url(ReimbursementBbm.module()) + "index";
    },

    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleKaryawanApi: () => {
        return `api/${ReimbursementBbm.moduleKaryawan()}`;
    },

    getData: async () => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();

        let params = {}
        params.status = $("#status").val() ?? '';
        params.tgl_pengajuan = $("#tgl_pengajuan").val() ?? '';
        params.departemen = $("#cb-departemen").val() ?? '';
        params.area = $("#cb-area-kerja").val() ?? '';
        params.nik = $.trim($('#nik').val()) ?? '';

        if (tableData.length > 0) {
            let updateAction = $('#update').val();
            let deleteAction = $('#delete').val();
            let approveAction = $('#approve').val();
            let userrole = $('#userrole').val();
            tableData.DataTable({
                "stateSave": true,
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
                    "url": url.base_url(ReimbursementBbm.moduleApi()) + `getData`,
                    "type": "POST",
                    "data": params,
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [
                    {
                        "targets": [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                        "orderable": false,
                    }
                ],
                // "scrollY":        "700px",
                // "scrollX":        true,
                // "scrollCollapse": true,
                // "fixedColumns":   {
                //     leftColumns: 5,
                // },
                "columns": [{
                    "data": "id",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    "data": "id",
                    "render": (data, type, row, meta) => {
                        let label = '';
                        let htmlAction = '';
                        if (updateAction == 1 || approveAction == 1) {
                            htmlAction += `<a class="btn btn-warning text-white" onclick="ReimbursementBbm.add('?id=${row.doc_trans}')">DETAIL</a>`;

                        }
                        return htmlAction
                    }
                },
                {
                    "data": "doc_trans",
                },
                {
                    "data": "nama_approval",
                    "render": (data, type, row, meta) => {

                        if (row.status == 'DRAF') {
                            return row.status;
                        }

                        return row.status + " : <b/>" + row.nama_approval + "</b>";
                    }
                },
                {
                    "data": "nik",
                },
                {
                    "data": "nama_lengkap",
                    "render": (data, type, row, meta) => {
                        var nama_lengkap = row.nama_lengkap;
                        var nama_departemen = row.nama_departemen;
                        var area_kerja = row.area_kerja;

                        return `${nama_lengkap}<br><small>${nama_departemen} - ${area_kerja}</small>`;
                    }
                },
                {
                    "data": "created_at",
                },
                {
                    "data": "km_after",
                },
                {
                    "data": "tanggal_realisasi",
                },
                {
                    "data": "tanggal_terima_nota",
                    "render": (data, type, row, meta) => {
                        if (row.tanggal_terima_nota == null) {
                            return `<span class="badge bg-label-warning">BELUM DITERIMA</span>`
                        } else {
                            return `<span class="badge bg-label-success">SUDAH DITERIMA</span>`
                        }
                    }
                },
                {
                    "data": "tanggal_terima_nota",
                },
                {
                    "data": "status",
                    render: function (data, type, row, meta) {
                        //  console.log(data)
                        if (row.status == "APPROVED") {
                            return `<span class="badge bg-label-success">APPROVED</span>`;
                        } else if (row.status == "REJECTED") {
                            return `<span class="badge bg-label-danger">REJECTED</span> <br>Alasan : ${row.alasan_ditolak}`;
                        } else if (row.status == "DRAF") {
                            return `<span class="badge bg-label-dark">DRAF</span>`;
                        } else {
                            let text = `<span class="badge bg-label-warning">WAITING</span>`;

                            if (userrole == 'Finance Reimbursement' && (row.alasan_ditolak != '' && row.alasan_ditolak != 'null' && row.alasan_ditolak != null && row.alasan_ditolak != undefined)) {
                                text += `<br>Alasan Reject Direksi Finance : ${row.alasan_ditolak}`;
                            }

                            return text;
                        }
                    }
                },
                {
                    "data": "uraian",
                },
                {
                    "data": "total",
                },
                {
                    "data": "keterangan",
                },
                {
                    "data": "tanggal_approval",
                    "render": (data, type, row, meta) => {
                        if (row.tanggal_approval == null) {
                            return "-";
                        }
                        return row.tanggal_approval;
                    }
                },
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

    getDataItem: () => {

        let params = {};

        params.nik = $('#nik').val();
        params.rb_id = $('#rem_id').val();

        // console.log(params);return;

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(ReimbursementBbm.moduleApi()) + "getDataItem",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                // Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                $("#data-detail").html(resp)
            }
        });

    },

    formItem: (elm) => {
        // e.preventDefault();
        let params = {};
        params.id = $(elm).data('id');
        params.rb_id = $(elm).data('rb_id');

        // console.log(params);return;

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(ReimbursementBbm.moduleApi()) + "formItem",

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
                $('.bootbox-close-button').addClass('btn-close').text("");
                ReimbursementBbm.setDate();
            }
        });

    },

    formItemSubmit: (elm) => {
        let params = {};

        params.id = $("#rbi_id").val();
        params.rb_id = $(elm).data('rb_id');
        params.jenis = $("#rbi_jenis").val();
        params.uraian = $("#rbi_uraian").val();
        params.nomor_nota = $('#rbi_nomor_nota').val();
        params.tanggal = $('#rbi_tanggal').val();
        params.nominal = $('#rbi_nominal').val();
        params.jumlah_liter = $('#rbi_jumlah_liter').val();
        params.attachment = ReimbursementBbm.getPostInputDokumen();

        if (params.jenis == 'bbm') {
            $('#rbi_jumlah_liter').addClass('required')
        } else {
            $('#rbi_jumlah_liter').removeClass('required')
        }

        // console.log("🚀 ~ file: reimbursementbbm.js:278 ~ params:", params);return
        let form = $(elm).closest('.bbm-item');
        if (validation.runWithElement(form)) {
            // return;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(ReimbursementBbm.moduleApi()) + "formItemSubmit",

                beforeSend: () => {
                    message.loadingProses('Proses Menyimpan Data');
                },

                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi", "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Berhasil Disimpan');
                        message.closeDialog();
                        ReimbursementBbm.getDataItem();
                    } else {
                        bootbox.dialog({
                            message: resp.message
                        });
                    }
                }
            });
        }

    },

    deleteItem: (elm) => {
        let id = $(elm).data('id');
        let html = `<div class="row">
        <div class="col-md-12">
            <p>Apakah anda yakin akan menghapus data ini ?</p>
        </div>
        <div class="col-md-12 text-center">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="ReimbursementBbm.deleteItemConfirm('${id}')">Ya</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Tidak</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },

    deleteItemConfirm: (id) => {
        let params = {};
        params.id = id;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(ReimbursementBbm.moduleApi()) + "deleteItemConfirm",

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
                    message.closeDialog();
                    ReimbursementBbm.getDataItem();
                    // setTimeout(function(){
                    //     window.location.reload();
                    // }, 1000);
                } else {
                    Toast.error('Data Gagal Dihapus ', resp.message);
                }
            }
        });
    },

    approve: (elm) => {
        let id = $(elm).data('id');
        let status = $(elm).data('status');
        let html = ``;
        if (status == 'APPROVED') {
            html = `<div class="row">
            <div class="col-md-12">
                <p>Apakah anda yakin untuk apporve ?</p>
            </div>
            <div class="col-md-12 text-center">
                <br/>
                <button class="btn btn-primary btn-sm" onclick="ReimbursementBbm.approveConfirm('${id}', '${status}')">Ya</button>
                <button class="btn btn-sm" onclick="message.closeDialog()">Tidak</button>
            </div>
            </div>`;
        }
        if (status == 'REJECTED') {
            html = `<div class="row">
            <div class="col-md-12">
                <p>Apakah anda yakin untuk reject ?</p>
            </div>
            <div class="col-md-12 text-center">
                <textarea class="form-control required" id="remark"></textarea>
                <br/>
                <button class="btn btn-primary btn-sm" onclick="ReimbursementBbm.approveConfirm('${id}', '${status}')">Ya</button>
                <button class="btn btn-sm" onclick="message.closeDialog()">Tidak</button>
            </div>
            </div>`;
        }

        bootbox.dialog({
            message: html
        });
    },

    approveConfirm: (id, status) => {
        let params = {};
        params.id = id;
        params.status = status;
        params.remark = $('#remark').val() ?? '';

        params.akses = $('#akses').val() ?? '';
        params.tanggal_realisasi = $('#tanggal_realisasi').val() ?? '';
        params.tanggal_terima_nota = $('#tanggal_terima_nota').val() ?? '';
        params.keterangan = $('#keterangan').val() ?? '';

        params.tanggal_tf = $('#tanggal_tf').val() ?? '';
        params.attachment_bukti_tf = ReimbursementBbm.getPostInputDokumenBuktiTf();

        if (params.status == 'APPROVED' && (params.tanggal_realisasi == '' || params.keterangan == '') && params.akses == 'admin hc') {
            Toast.error('Informasi', "Catatan Tanggal atau Keterangan wajib diisi"); return;
        }

        if (params.status == 'APPROVED' && params.tanggal_tf == '' && params.akses == 'finance reimbursement') {
            Toast.error('Informasi', "Catatan Tanggal TF wajib diisi"); return;
        }

        if (params.status == 'REJECTED' && params.remark == '') {
            Toast.error('Informasi', "Alasan Reject wajib diisi"); return;
        }

        if (status == 'REJECTED') {
            $('.required').removeClass('required');
            $('#remark').addClass('required');
        }

        let form = $('div.row');

        // console.log(params);return;
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(ReimbursementBbm.moduleApi()) + "approveConfirm",

                beforeSend: () => {
                    message.loadingProses('Loading ...');
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
                        Toast.error('Data Gagal Disimpan ', resp.message);
                    }
                }
            });
        }
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

    setDate: () => {
        let dataDate = $('.data-date');
        $.each(dataDate, function () {
            $(this).flatpickr();
        });
    },

    showDataKaryawan: (elm, id_text) => {

        let params = {};
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(ReimbursementBbm.moduleApi()) + "showDataKaryawan",

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
                ReimbursementBbm.getDataKaryawan(id_text);
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
                    [200, 300, 1000],
                    [200, 300, 1000]
                ],
                "ajax": {
                    "url": url.base_url(ReimbursementBbm.moduleKaryawanApi()) + `getData`,
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
                        return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="ReimbursementBbm.pilihData(this,'${bindText}')"></i>`;
                    }
                }
                ]
            });
        }
    },

    pilihData: (elm, bindID) => {
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');
        $('#' + bindID).val(nik + " - " + nama_lengkap);
        message.closeDialog();
        ReimbursementBbm.checkKaryawanShift();
    },

    setNik: (elm, e) => {
        let nik = $(elm).is(':checked') ? $(elm).attr('nik') : '';
        $('#nik').val(nik);
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = {};

        params.id = $("#rem_id").val();
        params.nik = $.trim($('#nik').val());
        params.uraian = $("#uraian").val();
        params.nopol = $("#nopol").val();
        // params.km_before = $("#km_before").val();
        params.km_after = $("#km_after").val();
        params.ajukan = $(elm).data('ajukan');
        params.attachment_before = ReimbursementBbm.getPostInputDokumenBefore();
        params.attachment_after = ReimbursementBbm.getPostInputDokumenAfter();

        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(ReimbursementBbm.moduleApi()) + "submit",
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
                            window.location.href = url.base_url(ReimbursementBbm.module()) + `add?id=${resp.redirect_id}`;
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



    // UPLOAD FILE
    uploadFileBuktiTf: () => {
        let uploader = $('#uploader_bukti_tf');
        let attachment = $('#attachment_bukti_tf');
        var reader = new FileReader();
        reader.onload = function (event) {
            var files = $(uploader).get(0).files[0];
            console.log(files);
            filename = files.name;
            var data_from_file = filename.split(".");
            var type_file = $.trim(data_from_file[data_from_file.length - 1]);
            var type_validations = ['pdf', 'png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'];
            if (type_validations.includes(type_file)) {
                var data = event.target.result;
                attachment.attr("src", data);
                attachment.attr("tipe", type_file);
                attachment.val(filename);
            } else {
                attachment.attr("src", "");
                attachment.attr("tipe", "");
                attachment.val("");
                uploader.val("");
                bootbox.dialog({
                    message: "File harus menggunakan format PDF atau gambar"
                });
            }
        };

        reader.readAsDataURL(uploader[0].files[0]);

    },

    getPostInputDokumenBuktiTf: () => {
        let params = {};
        let attachment = $('#attachment_bukti_tf');
        params.file = attachment.attr('src');
        params.tipe = attachment.attr('tipe');

        return params;
    },

    uploadFileBefore: () => {
        let uploader = $('#uploader_before');
        let attachment = $('#attachment_before');
        var reader = new FileReader();
        reader.onload = function (event) {
            var files = $(uploader).get(0).files[0];
            console.log(files);
            filename = files.name;
            var data_from_file = filename.split(".");
            var type_file = $.trim(data_from_file[data_from_file.length - 1]);
            var type_validations = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'];
            if (type_validations.includes(type_file)) {
                var data = event.target.result;
                attachment.attr("src", data);
                attachment.attr("tipe", type_file);
                attachment.val(filename);
            } else {
                attachment.attr("src", "");
                attachment.attr("tipe", "");
                attachment.val("");
                uploader.val("");
                bootbox.dialog({
                    message: "File harus menggunakan format gambar"
                });
            }
        };

        reader.readAsDataURL(uploader[0].files[0]);

    },

    getPostInputDokumenBefore: () => {
        let params = {};
        let attachment = $('#attachment_before');
        params.file = attachment.attr('src');
        params.tipe = attachment.attr('tipe');

        return params;
    },

    uploadFileAfter: () => {
        let uploader = $('#uploader_after');
        let attachment = $('#attachment_after');
        var reader = new FileReader();
        reader.onload = function (event) {
            var files = $(uploader).get(0).files[0];
            console.log(files);
            filename = files.name;
            var data_from_file = filename.split(".");
            var type_file = $.trim(data_from_file[data_from_file.length - 1]);
            var type_validations = ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'];
            if (type_validations.includes(type_file)) {
                var data = event.target.result;
                attachment.attr("src", data);
                attachment.attr("tipe", type_file);
                attachment.val(filename);
            } else {
                attachment.attr("src", "");
                attachment.attr("tipe", "");
                attachment.val("");
                uploader.val("");
                bootbox.dialog({
                    message: "File harus menggunakan format gambar"
                });
            }
        };

        reader.readAsDataURL(uploader[0].files[0]);

    },

    getPostInputDokumenAfter: () => {
        let params = {};
        let attachment = $('#attachment_after');
        params.file = attachment.attr('src');
        params.tipe = attachment.attr('tipe');

        return params;
    },

    uploadFile: () => {
        let uploader = $('#uploader');
        let attachment = $('#attachment');
        var reader = new FileReader();
        reader.onload = function (event) {
            var files = $(uploader).get(0).files[0];
            console.log(files);
            filename = files.name;
            var data_from_file = filename.split(".");
            var type_file = $.trim(data_from_file[data_from_file.length - 1]);
            var type_validations = ['pdf', 'png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'];
            if (type_validations.includes(type_file)) {
                var data = event.target.result;
                attachment.attr("src", data);
                attachment.attr("tipe", type_file);
                attachment.val(filename);
            } else {
                attachment.attr("src", "");
                attachment.attr("tipe", "");
                attachment.val("");
                uploader.val("");
                bootbox.dialog({
                    message: "File harus menggunakan format pdf atau gambar"
                });
            }
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

    showFile: (elm, e) => {
        e.preventDefault();

        let file = $(elm).attr('src');
        // let file = 'http://localhost/simi/public/assets/img/LOGOMOTASA.png';
        // let html = `<div class="row g-3">
        //     <div class="col-12">
        //         <br/>
        //         <embed id="frame" src="${file}" width="800" height="800"/>
        //     </div>
        // </div>`;


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
                            <img id="image-nota" src="${file}" width="100%"/>
                        </div>
                        <div class="text-center">
                            <button onclick="ReimbursementBbm.imageZoomIn('#image-nota')" class="btn btn-primary">Zoom In</button>
                            <button onclick="ReimbursementBbm.imageZoomOut('#image-nota')" class="btn btn-danger">Zoom Out</button>
                        </div>
                    </div>
                </div>`;
            } else {
                html = `<div class="row g-3">
                    <div class="col-12">
                        <br/>
                        <iframe id="frame" src="${file}" width="800" height="800"/>
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

    showFileODO: (elm, e) => {
        e.preventDefault();

        let before = $(elm).data('src_before');
        let after = $(elm).data('src_after');

        try {


            if (before.search('.png') > -1) {
                image = true;
            } else if (before.search('.jpg') > -1) {
                image = true;
            } else if (before.search('.jpeg') > -1) {
                image = true;
            } else {
                image = false;
            }

            let html = ``;

            if (image) {
                html = `<div class="row g-3">
                    <div class="col-12">
                        <div style="overflow: auto">
                            <p>Before</p>
                            <img class="image-nota" src="${before}" width="100%"/>
                            <p class="mt-2">After</p>
                            <img class="image-nota" src="${after}" width="100%"/>
                        </div>
                        <div class="text-center">
                            <button onclick="ReimbursementBbm.imageZoomIn('.image-nota')" class="btn btn-primary">Zoom In</button>
                            <button onclick="ReimbursementBbm.imageZoomOut('.image-nota')" class="btn btn-danger">Zoom Out</button>
                        </div>
                    </div>
                </div>`;
            } else {
                html = `<div class="row g-3">
                    <div class="col-6">
                        <br/>
                        <iframe id="frame" src="${before}" width="800" height="800"/>
                    </div>
                    <div class="col-6">
                        <br/>
                        <iframe id="frame" src="${after}" width="800" height="800"/>
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

        if (ReimbursementBbm.zoomInit != 300) {
            ReimbursementBbm.zoomInit = ReimbursementBbm.zoomInit + 50
        }

        $(elm).css({
            "margin": "auto",
            "width": `${ReimbursementBbm.zoomInit}%`,
        })

        console.log(ReimbursementBbm.zoomInit)
    },

    imageZoomOut: (elm) => {

        if (ReimbursementBbm.zoomInit != 50) {
            ReimbursementBbm.zoomInit = ReimbursementBbm.zoomInit - 50
        }

        $(elm).css({
            "margin": "auto",
            "width": `${ReimbursementBbm.zoomInit}%`,
        })

        console.log(ReimbursementBbm.zoomInit)
    },

};

$(function () {
    ReimbursementBbm.getData();
    ReimbursementBbm.getDataItem();
    ReimbursementBbm.select2All();
    ReimbursementBbm.setDate();
});
