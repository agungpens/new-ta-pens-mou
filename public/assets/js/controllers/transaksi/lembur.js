let Lembur = {
    module: () => {
        return "transaksi/lembur";
    },

    moduleApi: () => {
        return `api/${Lembur.module()}`;
    },
    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleKaryawanApi: () => {
        return `api/${Lembur.moduleKaryawan()}`;
    },

    add: () => {
        window.location.href = url.base_url(Lembur.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href =
            url.base_url(Lembur.module()) + "ubah?id=" + data_id;
    },

    ubahData: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href =
            url.base_url(Lembur.module()) +
            "ubah?id=" +
            data_id +
            "&from=phone";
    },

    back: () => {
        window.location.href = url.base_url(Lembur.module()) + "index";
    },

    backHistory: (elm) => {
        let nik = $(elm).attr("nik");
        window.location.href =
            url.base_url(Lembur.module()) + "history?nik=" + nik;
    },

    getData: async () => {
        let tableData = $("table#table-data");

        let approve = $("#approve").val();

        if (tableData.length > 0) {
            let params = {};
            if ($("#nik").length > 0) {
                params.nik = $("#nik").val();
                // $('#layout-navbar').remove();
                // $('#layout-menu').remove();
                // $('.container-fluid').remove();
            }

            if ($("#akses").val() != "karyawan") {
                params.status = $("#status").val();
                params.jenis_ijin = $("#jenis_ijin").val();
                params.tgl_pengajuan = $("#tgl_pengajuan").val();
                params.departemen = $("#cb-departemen").val();
                params.area = $("#cb-area-kerja").val();
                params.nik = $.trim($("#nik").val());
                params.aktif = $("#aktif").val();
                params.tgl_mulai = $("#tgl_mulai").val();
                params.tgl_selesai = $("#tgl_selesai").val();
                params.hari = $("#hari").val();
            }

            tableData.DataTable({
                processing: true,
                serverSide: true,
                ordering: true,
                destroy: true,
                autoWidth: false,
                stateSave: true,
                order: [[1, "desc"]],
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "Semua"],
                ],
                ajax: {
                    url: url.base_url(Lembur.moduleApi()) + `getData`,
                    type: "POST",
                    data: params,
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {},
                columnDefs: [
                    {
                        targets: 1,
                        orderable: true,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("text-center");
                        },
                    },
                    {
                        targets: [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                        orderable: false,
                    },
                ],
                columns: [
                    {
                        data: "id",
                        visible: $("#webview").length ? false : true,
                        render: (data, type, row, meta) => {
                            if (approve == 1) {
                                return `<button data_id="${data}" onclick="Lembur.showDetailLemburAdjustApprover(this)" class="btn btn-warning"><i class="fa fa-check"></i></button>`;
                            }

                            return ``;
                        },
                    },
                    {
                        data: "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "doc_trans",
                        render: function (data, type, row, meta) {
                            let html = ``;

                            let step_status = ``;
                            if (row.approved_status == "APPROVED") {
                                step_status = "Sudah Di ACC Oleh ";
                            } else if (row.approved_status == "REJECTED") {
                                step_status = "Ditolak Oleh ";
                            } else {
                                step_status = "Menunggu ACC Oleh ";
                            }

                            if (row.approved_status == "APPROVED") {
                                html += `<span class="badge bg-label-success">${step_status} ${row.next_acc.toUpperCase()}</span>`;
                            } else if (row.approved_status == "REJECTED") {
                                html += `<span class="badge bg-label-danger">${step_status} ${row.next_acc.toUpperCase()}</span><br>Alasan Tolak : ${
                                    row.alasan_ditolak
                                }`;
                            } else {
                                html += `<span class="badge bg-label-warning">${step_status} ${row.next_acc.toUpperCase()}</span>`;
                            }

                            let jenis = ``;
                            jenis = `<span class="badge bg-${row.non_shift ? 'success' : 'warning'}">${row.non_shift ? 'NON SHIFT' : 'SHIFT'}</span>`;

                            return `${row.doc_trans}<br>${jenis}<br><br>${html}`;
                        }
                    },
                    {
                        data: "periode_gaji_kode",
                    },
                    {
                        data: "nik",
                    },
                    {
                        data: "nama_lengkap",
                        render: function (data, type, row, meta) {
                            return `${row.nama_lengkap}`;
                        }
                    },
                    {
                        data: "nama_departemen",
                        render: function (data, type, row, meta) {
                            return `${row.nama_departemen}<br>${row.area_kerja}`;
                        }
                    },
                    {
                        data: "tanggal",
                    },
                    {
                        data: "hari",
                    },
                    {
                        data: "tanggal_lembur",
                    },
                    {
                        data: "mulai_jam",
                    },
                    {
                        data: "akhir_jam",
                    },
                    {
                        data: "lembur_total",
                        render: function (data, type, row, meta) {
                            // return `${row.lembur_total}<br>(${row.lembur_mulai} + ${row.lembur_akhir})`;
                            return `${row.lembur_total}`;
                        }
                    },
                    {
                        data: "pekerjaan",
                    },
                ],
                dom:
                    '<"row mx-2"' +
                    '<"col-md-2"<"me-3"l>>' +
                    '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
                    ">t" +
                    '<"row mx-2"' +
                    '<"col-sm-12 col-md-6"i>' +
                    '<"col-sm-12 col-md-6"p>' +
                    ">",
                buttons: [
                    {
                        extend: "collection",
                        className:
                            "btn btn-label-secondary dropdown-toggle mx-3",
                        text: '<i class="bx bx-upload me-2"></i>Export',
                        buttons: [
                            {
                                extend: "excel",
                                text: '<i class="bx bx-file me-2" ></i>Excel',
                                className: "dropdown-item",
                                //   exportOptions: { columns: [2, 3, 4, 5] }
                            },
                        ],
                    },
                ],
            });
        }
    },

    showDetailLemburAdjustApprover: (elm) => {
        let params = {};
        params.id = $(elm).attr("data_id");

        $.ajax({
            type: "GET",
            dataType: "html",
            data: params,
            url:
                url.base_url(Lembur.moduleApi()) +
                "showDetailLemburAdjustApprover",

            beforeSend: () => {
                message.loadingProses("Proses Pengambilan Data");
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: "large",
                });
            },
        });
    },

    getPostDataAdjustApprover: (tipe) => {
        let data = {
            id: $("#adjust_id").val(),
            est_mulai: $("#est_mulai").val(),
            est_akhir: $("#est_akhir").val(),
            keterangan: $("#keterangan").length ? $("#keterangan").val() : "",
            tipe: tipe,
        };

        return data;
    },

    saveLemburAdjustApprover: (elm, e) => {
        e.preventDefault();
        let tipe = $(elm).data("tipe");

        let params = Lembur.getPostDataAdjustApprover(tipe);

        if ($("#keterangan").length > 0) {
            if ($("#keterangan").val() == "") {
                Toast.error("Informasi", "Keterangan Belum Diisi");
                return;
            } else {
                params.keterangan = $("#keterangan").val();
            }
        }

        let form = $(elm).closest("div.form-adjust-lembur");
        if (validation.runWithElement(form)) {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url:
                    url.base_url(Lembur.moduleApi()) +
                    "saveLemburAdjustApprover",
                beforeSend: () => {
                    message.loadingProses("Proses Simpan Data...");
                },
                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi", "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success("Informasi", "Data Berhasil Disimpan");
                        bootbox.hideAll();
                        Lembur.getData();
                    } else {
                        bootbox.dialog({
                            message: resp.message,
                        });
                    }
                },
            });
        }
    },

    delete: (elm, e) => {
        e.preventDefault();
        let data_id = $(elm).attr("data_id");
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan menghapus data ini ?</p>
        </div>
        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="Lembur.deleteConfirm(this, '${data_id}')">Ya</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Tidak</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html,
        });
    },

    deleteConfirm: (elm, id) => {
        let params = {};
        params.id = id;
        $.ajax({
            type: "POST",
            dataType: "json",
            data: params,
            url: url.base_url(Lembur.moduleApi()) + "delete",

            beforeSend: () => {
                message.loadingProses("Proses Hapus Data");
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success("Informasi", "Data Berhasil Dihapus");
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    Toast.error(
                        "Informasi",
                        "Data Gagal Dihapus ",
                        resp.message
                    );
                }
            },
        });
    },

    getPostItemDetail: () => {
        let data = [];
        let checkDetail = $(".checkdetail");
        $.each(checkDetail, function () {
            let params = {};
            params.code = $(this).attr("data_id");
            if ($(this).is(":checked")) {
                data.push(params);
            }
        });
        return data;
    },

    getPostJamMulaiDetail: () => {
        let data = [];
        let jamEditable = $(".jam_editable_mulai");
        $.each(jamEditable, function () {
            let params = {};
            params.code = $(this).attr("code");
            params.value = $(this).val();
            data.push(params);
        });
        return data;
    },

    getPostJamAkhirDetail: () => {
        let data = [];
        let jamEditable = $(".jam_editable_akhir");
        $.each(jamEditable, function () {
            let params = {};
            params.code = $(this).attr("code");
            params.value = $(this).val();
            data.push(params);
        });
        return data;
    },

    // UPLOAD FILE
    uploadFile: () => {
        let uploader = $("#uploader");
        let attachment = $("#attachment");
        var reader = new FileReader();
        reader.onload = function (event) {
            var files = $(uploader).get(0).files[0];
            console.log(files);
            filename = files.name;
            var data_from_file = filename.split(".");
            var type_file = $.trim(data_from_file[data_from_file.length - 1]);
            var type_validations = ["png", "jpg", "jpeg", "PNG", "JPG", "JPEG"];
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
                    message: "File harus menggunakan format gambar",
                });
            }
        };

        reader.readAsDataURL(uploader[0].files[0]);
    },

    getPostInputDokumenSubmit: () => {
        let params = {};
        let attachment = $("#attachment");
        params.file = attachment.attr("src");
        params.tipe = attachment.attr("tipe");

        return params;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Lembur.getPostDataSubmit();
        let form = $(elm).closest("div.row");
        if (validation.runWithElement(form)) {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url: url.base_url(Lembur.moduleApi()) + "submit",
                beforeSend: () => {
                    message.loadingProses("Proses Simpan Data...");
                },
                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi", "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success("Informasi", "Data Berhasil Disimpan");
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    } else {
                        bootbox.dialog({
                            message: resp.message,
                        });
                    }
                },
            });
        }
    },

    getPostDataSubmit: () => {
        let data = {
            data: {
                nik: $.trim($("#nik").val().split(" - ")[0]),
                tgl_lembur: $("#tgl_lembur").val(),
                est_mulai: $("#est_mulai").val(),
                est_akhir: $("#est_akhir").val(),
                pekerjaan: $("#pekerjaan").val(),
            },
            attachment: Lembur.getPostInputDokumenSubmit(),
        };

        return data;
    },

    getPostData: () => {
        let data = {
            data: {
                id: $("input#id").val(),
                doc_trans: $("input#doc_trans").val(),
            },
            data_detail: Lembur.getPostItemDetail(),
            data_jam_mulai: Lembur.getPostJamMulaiDetail(),
            data_jam_akhir: Lembur.getPostJamAkhirDetail(),
        };
        return data;
    },

    approve: (elm, e) => {
        e.preventDefault();
        let params = Lembur.getPostData();
        // console.log(params);
        if (params.data_detail.length == 0 && $("#keterangan").length == 0) {
            Toast.error("Informasi", "Belum Ada Data Disetujui");
            return;
        }
        if ($("#keterangan").length > 0) {
            if ($("#keterangan").val() == "") {
                Toast.error("Informasi", "Keterangan Belum Diisi");
                return;
            } else {
                params.keterangan = $("#keterangan").val();
            }
        }
        let form = $(elm).closest("div.row");
        if (validation.runWithElement(form)) {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url: url.base_url(Lembur.moduleApi()) + "approve",
                beforeSend: () => {
                    message.loadingProses("Proses Simpan Data...");
                },
                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi", "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success("Informasi", "Data Berhasil Disimpan");
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    } else {
                        bootbox.dialog({
                            message: resp.message,
                        });
                    }
                },
            });
        }
    },

    setDate: () => {
        const flatpickrRange1 = document.querySelector(".flatpickr1");
        if (flatpickrRange1) {
            flatpickrRange1.flatpickr();
        }
        const flatpickrRange2 = document.querySelector(".flatpickr2");
        if (flatpickrRange2) {
            flatpickrRange2.flatpickr();
        }
    },

    select2All: () => {
        // Default
        const select2 = $(".select2");
        if (select2.length) {
            select2.each(function () {
                var $this = $(this);
                $this.wrap('<div class="position-relative"></div>').select2({
                    placeholder: "Pilih",
                    dropdownParent: $this.parent(),
                });
            });
        }
    },

    nextPersonal: (elm, e) => {
        e.preventDefault();
        let form = $(elm).closest("div.row");
        if (validation.runWithElement(form)) {
            Wizard.nextWizard(elm);
        }
    },

    takePict: (elm, e) => {
        e.preventDefault();
        let idcontent = $(elm).attr("data-id");
        var uploader = $(
            '<input type="file" accept="image/*;capture=camera" />'
        );
        var src_foto = $(`#${idcontent}`);
        uploader.click();

        uploader.on("change", function () {
            var reader = new FileReader();
            reader.onload = function (event) {
                var files = $(uploader).get(0).files[0];
                filename = files.name;
                var data_from_file = filename.split(".");
                var type_file = $.trim(
                    data_from_file[data_from_file.length - 1]
                );
                if (
                    type_file == "jpg" ||
                    type_file == "jpeg" ||
                    type_file == "png"
                ) {
                    $(`#filename-${idcontent}`).text(filename);
                    process_image(files).then(function (response) {
                        src_foto.attr("src", response);
                    });
                    src_foto.closest("div").removeClass("hide");
                } else {
                    bootbox.dialog({
                        message:
                            "File Harus Berupa Gambar Bertipe JPG, JPEG, PNG",
                    });
                }
            };

            reader.readAsDataURL(uploader[0].files[0]);
        });
    },

    getDataKaryawanLembur: async () => {
        let tableData = $("table#table-data-karyawan");
        let params = {};
        params.id = $("#id").val();
        if (tableData.length > 0) {
            tableData.DataTable({
                processing: true,
                serverSide: true,
                ordering: true,
                autoWidth: false,
                order: [[0, "desc"]],
                aLengthMenu: [
                    [25, 50, 100],
                    [25, 50, 100],
                ],
                ajax: {
                    url: url.base_url(Lembur.moduleApi()) + `getDataKaryawan`,
                    type: "POST",
                    data: params,
                    // "headers": {
                    //     'X-CSRF-TOKEN': `'${tokenApi}'`
                    // }
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                columnDefs: [
                    {
                        targets: 8,
                        orderable: false,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("td-padd");
                            $(td).addClass("text-center");
                        },
                    },
                    {
                        targets: 7,
                        orderable: false,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("td-padd");
                            $(td).addClass("text-center");
                        },
                    },
                    {
                        targets: 5,
                        orderable: false,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("text-center");
                            $(td).addClass("td-padd");
                            $(td).addClass("action");
                        },
                    },
                    {
                        targets: 3,
                        orderable: false,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("td-padd");
                            $(td).addClass("text-center");
                        },
                    },
                    {
                        targets: 2,
                        orderable: false,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("td-padd");
                            $(td).addClass("text-center");
                        },
                    },
                    {
                        targets: 1,
                        orderable: false,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("td-padd");
                        },
                    },
                    {
                        targets: 0,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("td-padd");
                            $(td).addClass("text-center");
                        },
                    },
                ],
                columns: [
                    {
                        data: "code",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "tanggal",
                    },
                    {
                        data: "mulai_jam_estimasi",
                    },
                    {
                        data: "akhir_jam_estimasi",
                    },
                    {
                        data: "mulai_jam",
                        render: function (data, type, row, meta) {
                            let checked = row.is_approve == 1 ? "" : "readonly";
                            return `<input type="text" class="jam_editable jam_editable_mulai form-control" code="${row.code}" value="${row.mulai_jam}" ${checked}>`;
                        },
                    },
                    {
                        data: "akhir_jam",
                        render: function (data, type, row, meta) {
                            let checked = row.is_approve == 1 ? "" : "readonly";
                            return `<input type="text" class="jam_editable jam_editable_akhir form-control" code="${row.code}" value="${row.akhir_jam}" ${checked}>`;
                        },
                    },
                    {
                        data: "pekerjaan",
                    },
                    {
                        data: "masuk",
                    },
                    {
                        data: "pulang",
                    },
                    {
                        data: "code",
                        render: (data, type, row, meta) => {
                            let checked = row.is_approve == 1 ? "checked" : "";
                            return `<div class="form-check">
                                        <input data_id="${data}" onchange="Lembur.checkData(this)" class="form-check-input checkdetail" type="checkbox" value="" id="check_current" ${checked}>
                                    </div>`;
                        },
                    },
                ],
            });
        }
    },

    setNik: (elm, e) => {
        let nik = $(elm).is(":checked") ? $(elm).attr("nik") : "";
        $("#nik").val(nik);
    },

    modulePerubahan: () => {
        return "transaksi/perubahandatakaryawan";
    },

    modulePerubahanApi: () => {
        return `api/${Lembur.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $("input#id").val();
        window.location.href =
            url.base_url(Lembur.modulePerubahan()) +
            "ubah?id=" +
            data_id +
            "&state=karyawan-" +
            from_id;
    },

    showDetailEditProfile: (elm, e) => {
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url:
                url.base_url(Lembur.modulePerubahanApi()) +
                "showDetailEditProfile",

            beforeSend: () => {
                message.loadingProses("Proses Pengambilan Data");
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: "large",
                });
            },
        });
    },

    checkAll: (elm) => {
        let checkHead = $(elm);
        if (checkHead.is(":checked")) {
            $(".checkdetail").prop("checked", true);
        } else {
            $(".checkdetail").prop("checked", false);
        }
    },

    checkData: (elm) => {
        let checkHead = $(".checkhead");
        let checkDetail = $(".checkdetail");
        let totalTrChecked = 0;
        $.each(checkDetail, function () {
            var code = $(this).attr("data_id");
            if ($(this).is(":checked")) {
                totalTrChecked += 1;
                $("[code=" + code + "]").prop("readonly", false);
            } else {
                $("[code=" + code + "]").prop("readonly", true);
            }
        });

        if (totalTrChecked == checkDetail.length) {
            checkHead.prop("checked", true);
        } else {
            checkHead.prop("checked", false);
        }

        var editable = $("#editable").val();

        if (editable == 0) {
            $(".jam_editable").prop("readonly", true);
        } else {
            $(".jam_editable").prop("readonly", false);
        }
        // Lembur.cekAksesEditable()
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
            <button data-tipe="reject" class="btn btn-primary btn-sm" onclick="Lembur.saveLemburAdjustApprover(this, event)">Proses</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html,
        });
    },

    checkMenu: (elm) => {
        $("input[type=checkbox]").on("change", function () {
            if ($(this).is(":checked")) {
                let parent_id = $(this).attr("parent_id");
                $("div#menu-data")
                    .find(`input.checkmenu-${parent_id}`)
                    .prop("checked", true);
            } else {
                $("div#menu-data")
                    .find(`input.checkmenu-${parent_id}`)
                    .prop("checked", false);
            }
        });
    },

    // cekAksesEditable: () => {
    //     var editable = $("#editable").val();

    //     if(editable){
    //         $(".jam_editable").prop('readonly', false);
    //     }else{
    //         $(".jam_editable").prop('readonly', true);
    //     }
    // }

    showDataKaryawan: (elm) => {
        let params = {};

        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url: url.base_url(Lembur.moduleApi()) + "showDataKaryawan",

            beforeSend: () => {
                message.loadingProses("Proses Pengambilan Data");
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: "large",
                });
                Lembur.getDataKaryawan();
            },
        });
    },

    getDataKaryawan: async () => {
        let tableData = $("table#table-data-karyawan");
        let params = {};
        params.id = $("#id").val();
        if (tableData.length > 0) {
            tableData.DataTable({
                processing: true,
                serverSide: true,
                ordering: true,
                autoWidth: false,
                order: [[0, "desc"]],
                aLengthMenu: [
                    [200, 300, 1000],
                    [200, 300, 1000],
                ],
                ajax: {
                    url: url.base_url(Lembur.moduleKaryawanApi()) + `getData`,
                    type: "POST",
                    data: params,
                    // "headers": {
                    //     'X-CSRF-TOKEN': `'${tokenApi}'`
                    // }
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                columnDefs: [
                    {
                        targets: 3,
                        orderable: false,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("text-center");
                            $(td).addClass("td-padd");
                            $(td).addClass("action");
                        },
                    },
                    {
                        targets: 2,
                        orderable: false,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("td-padd");
                        },
                    },
                    {
                        targets: 1,
                        orderable: false,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("td-padd");
                        },
                    },
                    {
                        targets: 0,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("td-padd");
                            $(td).addClass("text-center");
                        },
                    },
                ],
                columns: [
                    {
                        data: "nik",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "nik",
                    },
                    {
                        data: "nama_lengkap",
                    },
                    {
                        data: "nik",
                        render: (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="Lembur.pilihData(this)"></i>`;
                        },
                    },
                ],
            });
        }
    },

    pilihData: (elm) => {
        let nama_lengkap = $(elm).attr("nama_lengkap");
        let nik = $(elm).attr("data_id");
        $("#nik").val(nik + " - " + nama_lengkap);
        message.closeDialog();
    },

    checkIsWebVIew: () => {
        const webview = $("#webview").length;

        if (webview) {
            $(".layout-navbar").remove();
        }
    },
};

$(function () {
    Lembur.getData();
    Lembur.getDataKaryawanLembur();
    Lembur.setDate();
    Lembur.select2All();
    Lembur.checkData();
    Lembur.checkMenu();
    Lembur.checkIsWebVIew();
});
