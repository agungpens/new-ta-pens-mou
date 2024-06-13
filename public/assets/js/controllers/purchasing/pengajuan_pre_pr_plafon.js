let PengajuanPrePRPlafon = {
    module: () => {
        return "perjalanan-dinas/plafon-perjalanan-dinas";
    },

    moduleApi: () => {
        return `api/${PengajuanPrePRPlafon.module()}`;
    },

    add: () => {
        window.location.href =
            url.base_url(PengajuanPrePRPlafon.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href =
            url.base_url(PengajuanPrePRPlafon.module()) + "ubah?id=" + data_id;
    },


    back: () => {
        window.location.href = url.base_url(PengajuanPrePRPlafon.module()) + "index";
    },

    getData: async () => {
        let tableData = $("table#table-data");
        tableData.DataTable().destroy();
        let akses = $("#akses").val();
        let user = $("#nik").val();
        let params = {};

        if (tableData.length > 0) {
            let viewAction = $("#view").val();
            let approveAction = $("#approve").val();
            let updateAction = $("#update").val();
            let deleteAction = $("#delete").val();
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
                    url: url.base_url(PengajuanPrePRPlafon.moduleApi()) + `getData`,
                    type: "POST",
                    data: params,
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {},
                columnDefs: [
                    {
                        targets: [0, 3, 4, 5],
                        orderable: false,
                    },
                    {
                        targets: 1,
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
                ],
                columns: [
                    
                    {
                        data: "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "id",
                        render: (data, type, row, meta) => {
                            let htmlAction = "";
                            if (
                                updateAction == "1"
                            ) {
                                // if (row.position != 'PERJALANAN DINAS') {
                                htmlAction += `<button class="btn btn-warning" data_id="${data}" onclick="PengajuanPrePRPlafon.ubah(this)"><i class="fa fa-edit"></i></button>`;
                                
                            }
                            return htmlAction;
                        },
                    },
                    {
                        data: "nik",
                        render: function (data, type, row, meta) {
                            return `${row.nik} <br> ${row.nama_lengkap}`;
                        },
                    },
                    {
                        data: "nama_departemen",
                        render: function (data, type, row, meta) {
                            return `${row.nama_divisi} <br> ${row.nama_departemen}`;
                        },
                    },
                    {
                        data: "jenis",
                    },
                    {
                        data: "catatan",
                    },
                ],
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
            <button class="btn btn-primary btn-sm" onclick="PengajuanPrePRPlafon.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(PengajuanPrePRPlafon.moduleApi()) + "delete",

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

    getPostData: () => {
        let data = {
            id: $("input#id").val(),
            nik: $("input#nik").val(),
            jenis: $("select#jenis").val(),
            catatan: $("textarea#catatan").val(),
        };

        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = PengajuanPrePRPlafon.getPostData();

        // console.log(params);return;
        let form = $(elm).closest("div.form-plafon");

        if (validation.runWithElement(form)) {
            // return;
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url: url.base_url(PengajuanPrePRPlafon.moduleApi()) + "submit",
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
                            window.location.href =
                                url.base_url(PengajuanPrePRPlafon.module()) +
                                "index";
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

    updateConfirm: (elm, e, draft) => {
        e.preventDefault();
        let html = `<div class="row"><div class="col-12">`;

        html += `<h4 class="text-center">Yakin untuk melanjutkan? </h4>`;

        html += `</div><div class="col-12 text-center">
                    <br />
                    <button class="btn btn-primary" onclick="PengajuanPrePRPlafon.update(this, event, ${draft})">Ya</button>
                    <button class="btn btn-danger" onclick="message.closeDialog()">Batal</button>
                </div></div> `;

        bootbox.dialog({
            message: html,
        });

        $(".bootbox-close-button").addClass("btn-close").text("");
    },

    update: (elm, e, draft = true) => {
        e.preventDefault();
        let params = PengajuanPrePRPlafon.getPostUpdate();
        // console.log(params);return;
        if (draft) {
            params.data.approve_status = "DRAFT";
        } else {
            params.data.approve_status = "WAITING";
        }
        // let form = $(elm).closest("div.form-pre-pr");
        let form = $("div.form-pre-pr");

        // if (params.data_item.length == 0) {
        //     Toast.error("Informasi", "Item Harus Diisi");
        //     return;
        // }

        // if (params.data_lampiran.length == 0) {
        //     Toast.error('Informasi', 'Lampiran Harus Diisi');
        //     return;
        // }

        // console.log(PengajuanPrePRPlafon.nikTemp)

        if (params.data.position == "PERJALANAN DINAS") {
            if (PengajuanPrePRPlafon.hasDuplicates(PengajuanPrePRPlafon.nikTemp)) {
                Toast.error(
                    "Informasi",
                    "Mohon diperiksa Terdapat Duplikasi Item"
                );
                return;
            }
        }

        // STAFF PURCHASE
        if ($("#include_tax:checked").length) {
            let taxElm = $("#include_tax:checked");

            let invalid = 0;
            $.each(taxElm, function () {
                let elm = $(this).closest("#real_biaya");

                let ppnElm = elm.find("#ppn");
                let pphElm = elm.find("#pph");

                if (ppnElm.val() == "" && pphElm.val() == "") {
                    invalid++;
                }
            });
            if (invalid != 0) {
                Toast.error(
                    "Informasi",
                    "Jika termasuk pajak, PPN atau PPH harus dipilih"
                );
                return;
            }
        }

        if (validation.runWithElement(form)) {
            // return;
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url: url.base_url(PengajuanPrePRPlafon.moduleApi()) + "update",
                beforeSend: () => {
                    message.loadingProses("Proses Update Data...");
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
                            if (params.data.approve_status == "WAITING") {
                                window.location.href = url.base_url(
                                    PengajuanPrePRPlafon.module()
                                );
                            } else {
                                window.location.reload();
                            }
                        }, 1000);
                    } else {
                        bootbox.dialog({
                            message: resp.message ?? "Invalid Error",
                        });
                    }
                },
            });
        } else {
            Toast.error("Informasi", "Lengkapi data anda");
            return;
        }
    },

    approval: (elm, e, position, approve_status, reload = true) => {
        e.preventDefault();
        let html = `<div class="row form-pre-pr"><div class="col-12">`;

        if (approve_status == "APPROVED") {
            html += `<h4 class="text-center">Yakin untuk melanjutkan? </h4>`;
        } else {
            html += `<label class="form-label" for="alasan">Keterangan</label>
                    <textarea id="keterangan" name="keterangan" error="Keterangan" class="form-control required" rows="5" placeholder="Keterangan"></textarea>`;
        }
        html += `</div><div class="col-12 text-center">
                    <br />
                    <button class="btn btn-primary" onclick="PengajuanPrePRPlafon.approvalConfirm(this, event, '${position}', '${approve_status}')">Simpan dan Lanjutkan</button>
                    <button class="btn btn-danger" onclick="message.closeDialog()">Batal</button>
                </div></div> `;

        bootbox.dialog({
            message: html,
        });

        $(".bootbox-close-button").addClass("btn-close").text("");
    },

    approvalConfirm: (elm, e, position, approve_status, reload = true) => {
        e.preventDefault();
        let params = PengajuanPrePRPlafon.getPostApproval(position, approve_status);
        let form = $(elm).closest("div.form-pre-pr");

        // console.log(params);return;
        // if (params.data_item.length == 0) {
        //     Toast.error('Informasi', 'Item Harus Diisi');
        //     return;
        // }

        // if (params.data_lampiran.length == 0) {
        //     Toast.error('Informasi', 'Lampiran Harus Diisi');
        //     return;
        // }

        if (PengajuanPrePRPlafon.hasDuplicates(PengajuanPrePRPlafon.nikTemp)) {
            Toast.error("Informasi", "Mohon diperiksa Terdapat Duplikasi Item");
            return;
        }

        if (validation.runWithElement(form)) {
            // return;
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url: url.base_url(PengajuanPrePRPlafon.moduleApi()) + "update",
                beforeSend: () => {
                    message.loadingProses("Proses Update Data...");
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
                            if (reload) {
                                window.location.href = url.base_url(
                                    PengajuanPrePRPlafon.module()
                                );
                            }
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

    updateBooking: (elm, e) => {
        e.preventDefault();
        let params = PengajuanPrePRPlafon.getPostBooking();
        let form = $(elm).closest("div.form-pre-pr");
        if (params.data_item.length == 0) {
            Toast.error("Informasi", "Item Harus Diisi");
            return;
        }

        // if (params.data_lampiran.length == 0) {
        //     Toast.error('Informasi', 'Lampiran Harus Diisi');
        //     return;
        // }

        if (PengajuanPrePRPlafon.hasDuplicates(PengajuanPrePRPlafon.nikTemp)) {
            Toast.error("Informasi", "Mohon diperiksa Terdapat Duplikasi Item");
            return;
        }

        if (validation.runWithElement(form)) {
            // return;
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url: url.base_url(PengajuanPrePRPlafon.moduleApi()) + "update",
                beforeSend: () => {
                    message.loadingProses("Proses Update Data...");
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

    updateRealisasiBooking: (elm, e) => {
        e.preventDefault();
        let params = PengajuanPrePRPlafon.getPostRealisasiBooking();
        let form = $(elm).closest("div.form-pre-pr");
        if (params.data_item.length == 0) {
            Toast.error("Informasi", "Item Harus Diisi");
            return;
        }

        // if (params.data_lampiran.length == 0) {
        //     Toast.error('Informasi', 'Lampiran Harus Diisi');
        //     return;
        // }

        if (PengajuanPrePRPlafon.hasDuplicates(PengajuanPrePRPlafon.nikTemp)) {
            Toast.error("Informasi", "Mohon diperiksa Terdapat Duplikasi Item");
            return;
        }

        if (validation.runWithElement(form)) {
            // return;
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url: url.base_url(PengajuanPrePRPlafon.moduleApi()) + "update",
                beforeSend: () => {
                    message.loadingProses("Proses Update Data...");
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
        var mindate = $("#mindate").val();

        $("#tgl_efektif, #tgl_efektif_sampai").flatpickr({
            minDate: mindate,
        });

        $("#tgl_realbooking").flatpickr();

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
                    placeholder: "Select value",
                    dropdownParent: $this.parent(),
                });
            });
        }
    },

    takePict: (elm, e) => {
        e.preventDefault();
        let idcontent = $(elm).attr("data-id");
        var uploader = $(
            '<input type="file" accept="image/*;capture=camera" />'
        );
        var src_foto = $(`#${idcontent} `);
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
                    $(`#filename - ${idcontent} `).text(filename);
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

    getDataLogKaryawan: async () => {
        let tableData = $("table#table-data-log-karyawan");

        let params = {};
        params.nik = $("#id").val();
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
                    url:
                        url.base_url(PengajuanPrePRPlafon.moduleApi()) +
                        `getDataLogKaryawan`,
                    type: "GET",
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
                        targets: 4,
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
                        data: "doc_trans",
                        render: (data, type, row, meta) => {
                            return `< a class="" style = "cursor: pointer;" onclick = "PengajuanPrePRPlafon.showDetailEditProfile(this, event)" > ${data}</a > `;
                        },
                    },
                    {
                        data: "tgl_pengajuan",
                    },
                    {
                        data: "lpp_id",
                        render: (data, type, row, meta) => {
                            if (
                                row.tgl_verifikasi != "" &&
                                row.status == "approved"
                            ) {
                                return `< label class="text-success" > Terverifikasi</label > `;
                            } else {
                                if (row.status == "reject") {
                                    return `< label class="text-danger" > Ditolak</label > `;
                                } else {
                                    if (row.tgl_approve == "") {
                                        return `< label class="text-primary" > Proses Approval Perubahan</label > `;
                                    } else {
                                        return `< label class="" > Proses Verifikasi</label > `;
                                    }
                                }
                            }
                        },
                    },
                    {
                        data: "lpp_id",
                        render: (data, type, row, meta) => {
                            return `
    < i class="bx bx-edit" style = "cursor: pointer;" data_id = "${data}" onclick = "PengajuanPrePRPlafon.detailPerubahan(this)" ></i > `;
                        },
                    },
                ],
            });
        }
    },

    modulePerubahan: () => {
        return "transaksi/perubahandatakaryawan";
    },

    modulePerubahanApi: () => {
        return `api / ${PengajuanPrePRPlafon.modulePerubahan()} `;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $("input#id").val();
        window.location.href =
            url.base_url(PengajuanPrePRPlafon.modulePerubahan()) +
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
                url.base_url(PengajuanPrePRPlafon.modulePerubahanApi()) +
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

    index: 0,

    addItem: (elm, e) => {
        let isTujuanRequired = "";

        let kodeItem = $("#kodeItem");

        if (kodeItem.length) {
            if (kodeItem.val() == "") {
                Toast.error(
                    "Informasi",
                    "Pilih jenis pengajuan terlebih dahulu"
                );
                return;
            }
        }

        if (kodeItem.val().search("TIKET") > 0) {
            isTujuanRequired = "required";
        }

        $("#button-addon1-jenis").hide();

        let mindate = $("#mindate").val();
        let akses = $("#pre_pr_akses").val();
        let i = PengajuanPrePRPlafon.index;

        e.preventDefault();
        // let tbody = $(elm).closest("tbody");
        let tbody = $("#table-data-item").find("tbody");

        let html = ``;

        html += `<tr class="input" data_id = "">
                    <td></td>
                    <td>
                        <div>
                            <label for="">Karyawan</label>
                            <div class="input-group">
                                <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PengajuanPrePRPlafon.showDataKaryawan(this,'bj_nik${i}')">Pilih</button>
                                <input id="bj_nik" type="text" class="bj_nik${i} bj_nik form-control required" error="Karyawan" placeholder="Pilih Data Karyawan" aria-label="Pilih Data Karyawan" readonly>
                            </div>
                        </div>
                        <div class="mt-2">
                            <label for="">Area Tujuan / Pemakaian</label>
                            <div class="input-group">
                                <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PengajuanPrePRPlafon.showDataArea(this,'area${i}')">Pilih</button>
                                <input id="area" type="text" class="area${i} form-control required" error="Area" placeholder="Pilih Data Area" aria-label="Pilih Data Area" readonly>
                            </div>
                        </div>
                        <div class="mt-2">
                            <label for="">Durasi Pemakaian (Bukan Durasi Perjalanan Dinas)</label>
                            <div class="input-group">
                                <input id="tgl_mulai" type="date" class="form-control required" error="Tanggal Mulai" min="${mindate}">
                                <span class="btn btn-danger">S/D</span>
                                <input id="tgl_selesai" type="date" class="form-control required" error="Tanggal Selesai" min="${mindate}">
                            </div>
                        </div>
                        <div class="mt-2">
                            <label for="">Jam
                                Digunakan / Pemakaian</label>
                            <input type="time"
                                name="tgl_jam_checkin_booking"
                                id="tgl_jam_checkin_booking"
                                class="mt-2 form-control required">
                        </div>
                        <div class="mt-2">
                            <label for="">Jumlah dan Satuan</label>
                            <div class="input-group">
                                <input type="number" id="jumlah" name="jumlah"
                                    class="form-control required" placeholder="Jumlah"
                                    error="Jumlah" value="1" style="width: 50px" readonly />
                                <input type="text" id="satuan" name="satuan"
                                    class="form-control required" placeholder="Satuan"
                                    error="Satuan" />
                            </div>
                        </div>
                        <div class="mt-2">
                            <label for="">Tujuan ${
                                isTujuanRequired == "required"
                                    ? ""
                                    : "(Opsional)"
                            }</label>
                            <div class="input-group">
                                <input id="dari" type="text" class="form-control ${isTujuanRequired}" error="Dari" placeholder="Dari">
                                <span class="btn btn-danger">-</span>
                                <input id="ke" type="text" class="form-control ${isTujuanRequired}" error="Ke" placeholder="Ke">
                            </div>
                        </div>
                    </td>
                    <td>
                        <textarea id="remarks" name="remarks" class="form-control required"
                        placeholder="Keterangan" error="Keterangan" rows="5"></textarea>

                        <div class="input-group mt-2">
                            <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PengajuanPrePRPlafon.addFile(this)">Pilih</button>
                            <input id="file" type="text" readonly class="form-control required" error="File" placeholder="Pilih Data File" aria-label="Pilih Data File" aria-describedby="button-addon1" value="">
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-sm"  onclick="PengajuanPrePRPlafon.deleteItem(this, event)"><i class="bx bx-trash"></i></button>
                    </td>
                </tr>`;
        tbody.append(html);

        PengajuanPrePRPlafon.index++;
    },

    indexCoa: [],

    addItemCoa: (elm, e, index) => {
        e.preventDefault();

        if (PengajuanPrePRPlafon.indexCoa[index] == undefined) {
            PengajuanPrePRPlafon.indexCoa[index] = 0;
        }

        let i = PengajuanPrePRPlafon.indexCoa[index];

        let tbody = $(elm).closest("table").find("tbody");

        let html = ``;

        html += `<tr>
                <td align="center"></td>
                <td>
                    <div class="input-group">
                        <button class="btn btn-outline-primary"
                            type="button" id="button-addon1"
                            onclick="PengajuanPrePRPlafon.showDataCoa(this,'item_coa${index}-${i}')">Pilih</button>
                        <input id="item_coa" type="text"
                            class="item_coa${index}-${i} form-control required"
                            error="Akun Kas"
                            placeholder="Pilih Akun Kas"
                            aria-label="Pilih Akun Kas" readonly>
                    </div>
                </td>
                <td><input onchange="PengajuanPrePRPlafon.inputMoney(this)" id="debet" inputmode="numeric" class="debet${index}-${i} form-control required mask-money"  error="Debet" value="0" min="0"  style="text-align: right;"></td>
                <td><input onchange="PengajuanPrePRPlafon.inputMoney(this)" id="kredit" inputmode="numeric" class="kredit${index}-${i} form-control required mask-money" error="Debet" value="0" min="0"  style="text-align: right;"></td>
                <td><input id="catatan" type="text" class="catatan${index}-${i} form-control" error="Catatan"></td>
                <td align="center"><button type="button" onclick="PengajuanPrePRPlafon.deleteItemCoa(this)" class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button></td>
            </tr>`;
        tbody.append(html);

        PengajuanPrePRPlafon.indexCoa[index]++;
    },

    addLampiran: (elm, e) => {
        e.preventDefault();
        // let tbody = $(elm).closest("tbody");
        let tbody = $("#table-data-file").find("tbody");
        let html = `<tr class="input" data_id = "">
                        <td>
                            <div class="input-group">
                                <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PengajuanPrePRPlafon.addFile(this)">Pilih</button>
                                <input id="file" type="text" readonly class="form-control" error="File" placeholder="Pilih Data File" aria-label="Pilih Data File" aria-describedby="button-addon1" value="">
                            </div>
                        </td>
                        <td>
                <input type="text" id="keterangan" name="keterangan" class="form-control required mt-2"
                placeholder="Keterangan" error="Keterangan" value=""/>
            </td>
            <td>
                <input type="radio" id="is_utama" name="is_utama"/>
            </td>
                        <td>
                            <button class="btn btn-danger btn-sm" onclick="PengajuanPrePRPlafon.deleteItem(this, event)"><i class="bx bx-trash"></i></button>
                        </td>
                    </tr> `;
        tbody.append(html);
    },

    addFile: (elm) => {
        var uploader = $(
            '<input type="file" accept="image/*;capture=camera" />'
        );
        var src_foto = $(elm).closest("tr").find("#file");
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
                    type_file == "png" ||
                    type_file == "JPG" ||
                    type_file == "JPEG" ||
                    type_file == "PNG" ||
                    type_file == "pdf"
                ) {
                    var data = event.target.result;
                    src_foto.attr("src", data);
                    src_foto.attr("tipe", type_file);
                    src_foto.val(filename);
                } else {
                    bootbox.dialog({
                        message:
                            "File Harus Berupa Gambar Bertipe JPG, JPEG, PNG, PDF",
                    });
                }
            };

            reader.readAsDataURL(uploader[0].files[0]);
        });
    },

    deleteItem: (elm, e) => {
        let id = $(elm).closest("tr").attr("data_id");
        if (id == "") {
            $(elm).closest("tr").remove();
        } else {
            $(elm).closest("tr").addClass("hide");
            $(elm).closest("tr").addClass("remove");
            $(elm).closest("tr").attr("is_delete", true);
        }
    },

    deleteItemCoa: (elm) => {
        $(elm).closest("tr").remove();

        PengajuanPrePRPlafon.hitungUlang("#debet", "#total_debet");
        PengajuanPrePRPlafon.hitungUlang("#kredit", "#total_kredit");
    },

    showFile: (elm, e) => {
        e.preventDefault();

        let file = $(elm).attr("src");
        // let file = 'http://localhost/simi/public/assets/img/LOGOMOTASA.png';
        // let html = `< div class="row g-3" >
        //     <div class="col-12">
        //         <br/>
        //         <embed id="frame" src="${file}" width="800" height="800"/>
        //     </div>
        // </div>`;

        try {
            if (file.search(".png") > -1) {
                image = true;
            } else if (file.search(".jpg") > -1) {
                image = true;
            } else if (file.search(".jpeg") > -1) {
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
                            <button onclick="PengajuanPrePRPlafon.imageZoomIn('#image-pembelian')" class="btn btn-primary">Zoom In</button>
                            <button onclick="PengajuanPrePRPlafon.imageZoomOut('#image-pembelian')" class="btn btn-danger">Zoom Out</button>
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
                size: "large",
                onEscape: true,
            });
        } catch (error) {
            alert("Gagal Mengakses File");
        }
    },

    zoomInit: 100,

    imageZoomIn: (elm) => {
        if (PengajuanPrePRPlafon.zoomInit != 300) {
            PengajuanPrePRPlafon.zoomInit = PengajuanPrePRPlafon.zoomInit + 50;
        }

        $(elm).css({
            margin: "auto",
            width: `${PengajuanPrePRPlafon.zoomInit}%`,
        });

        console.log(PengajuanPrePRPlafon.zoomInit);
    },

    imageZoomOut: (elm) => {
        if (PengajuanPrePRPlafon.zoomInit != 50) {
            PengajuanPrePRPlafon.zoomInit = PengajuanPrePRPlafon.zoomInit - 50;
        }

        $(elm).css({
            margin: "auto",
            width: `${PengajuanPrePRPlafon.zoomInit}%`,
        });

        console.log(PengajuanPrePRPlafon.zoomInit);
    },

    ExportData: (elm) => {
        let idExportContent = $(elm).attr("idexport");
        window.open(
            "data:application/vnd.ms-excel," +
                encodeURIComponent($(`div#${idExportContent}`).html())
        );
    },

    setStatusBarang: (elm) => {
        let status = $(elm).val();
        let data_id = $(elm).closest("tr").attr("data_id");
        if (status == "0") {
            PengajuanPrePRPlafon.barangDitolak(elm);
        } else if (status == "1") {
            PengajuanPrePRPlafon.barangReceived(elm);
        }
    },

    barangReceived: (elm) => {
        let data_id = $(elm).closest("tr").attr("data_id");
        let table = $("table#table-data-item")
            .find("tbody")
            .find(`tr#input-${data_id}`);
        let ket = "";
        table.find("#keterangan-barang").text(ket);
        // table.find('#keterangan-barang').closest('div').addClass('hide');
    },

    barangReceivedPop: (elm, data_id) => {
        let table = $("table#table-data-item")
            .find("tbody")
            .find(`tr#input-${data_id}`);
        let ket = "";
        table.find("#keterangan-barang").text(ket);
        if (!table.find("#keterangan-barang").closest("div").hasClass("hide")) {
            table.find("#keterangan-barang").closest("div").addClass("hide");
        }
        table.find("#status_barang").val("1");
        console.log(
            `table.find('#status_barang')`,
            table.find("#status_barang")
        );
        message.closeDialog();
    },

    barangDitolak: (elm) => {
        let data_id = $(elm).closest("tr").attr("data_id");
        let html = `<div class="row g-3">
        <div class="col-12">
            <br/>
            <label class="form-label" for="alasan">Keterangan</label>
            <textarea id="keterangan" name="keterangan" error="Keterangan" class="form-control required" rows="2" placeholder="Keterangan"></textarea>
        </div>
        <div class="col-12 text-end">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="PengajuanPrePRPlafon.rejectBarang(this, '${data_id}')">Proses</button>
            <button class="btn btn-sm" onclick="PengajuanPrePRPlafon.barangReceivedPop(this, '${data_id}')">Batal</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html,
        });

        $(".bootbox-close-button").addClass("btn-close").text("");
    },

    rejectBarang: (elm, data_id) => {
        let table = $("table#table-data-item")
            .find("tbody")
            .find(`tr#input-${data_id}`);
        let ket = $("#keterangan").val();
        table.find("#keterangan-barang").text(ket);
        table.find("#keterangan-barang").closest("div").removeClass("hide");
        message.closeDialog();
    },

    // get requester
    showDataKaryawan: (elm, id_text) => {
        let params = {};
        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url: url.base_url(PengajuanPrePRPlafon.moduleApi()) + "showDataKaryawan",

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
                PengajuanPrePRPlafon.getDataKaryawan(id_text);
            },
        });
    },

    getDataKaryawan: async (bindText) => {
        let tableData = $("table#table-data-karyawan");
        let params = {};

        let prePrNIK = [];

        $.each($(".bj_nik"), function (i) {
            let kry = $(this).val();

            if (kry != "") {
                let nik = kry.split(" - ")[0];

                prePrNIK.push(nik);
            }
        });

        if (prePrNIK.length) {
            params.nik = prePrNIK;
        }

        if ($("#departemen").length) {
            params.departemen = $("#departemen").val();
        }

        if (tableData.length > 0) {
            tableData.DataTable({
                processing: true,
                serverSide: true,
                ordering: true,
                autoWidth: false,
                order: [[0, "desc"]],
                aLengthMenu: [
                    [10, 20, 50],
                    [10, 20, 50],
                ],
                ajax: {
                    url: url.base_url("api/master/karyawan") + `getDataPrePR`,
                    type: "POST",
                    data: params,
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {},
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
                        },
                    },
                    {
                        targets: [1, 2],
                        orderable: false,
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
                        render: (data, type, row, meta) => {
                            return `${row.nama_lengkap} <br> <small>${row.nama_departemen} - ${row.nama_divisi}</small>`;
                        },
                    },
                    {
                        data: "nik",
                        render: (data, type, row, meta) => {
                            return `<button class="btn btn-primary" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="PengajuanPrePRPlafon.pilihData(this,'${bindText}')"><i class="bx bx-check"></i></button>`;
                        },
                    },
                ],
            });
        }
    },

    pilihData: (elm, bindID) => {
        let nama_lengkap = $(elm).attr("nama_lengkap");
        let nik = $(elm).attr("data_id");

        $("." + bindID).val(nik + " - " + nama_lengkap);
        message.closeDialog();
    },

    // get area
    showDataArea: (elm, id_text) => {
        let params = {};
        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url: url.base_url(PengajuanPrePRPlafon.moduleApi()) + "showDataArea",

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
                PengajuanPrePRPlafon.getDataArea(id_text);
            },
        });
    },

    getDataArea: async (bindText) => {
        let tableData = $("table#table-data-area");
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
                    [10, 50, 100],
                    [10, 50, 100],
                ],
                ajax: {
                    url:
                        url.base_url("api/purchasing/pengajuan-pre-pr") +
                        `getDataArea`,
                    type: "POST",
                    data: params,
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {},
                columnDefs: [
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
                            $(td).addClass("text-center");
                            $(td).addClass("td-padd");
                            $(td).addClass("action");
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
                        data: "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "nama",
                    },
                    {
                        data: "id",
                        render: (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama="${row.nama}" data_id="${data}" onclick="PengajuanPrePRPlafon.pilihDataArea(this,'${bindText}')"></i>`;
                        },
                    },
                ],
            });
        }
    },

    pilihDataArea: (elm, bindID) => {
        let nama = $(elm).attr("nama");
        let id = $(elm).attr("data_id");
        $("." + bindID).val(id + " - " + nama);
        message.closeDialog();
    },

    // get jenis
    showDataJenis: (elm, id_text, tipe_jenis) => {
        let params = {};

        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url: url.base_url(PengajuanPrePRPlafon.moduleApi()) + "showDataJenis",

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
                PengajuanPrePRPlafon.getDataJenis(id_text, tipe_jenis);
            },
        });
    },

    getDataJenis: async (bindText, tipe_jenis) => {
        let tableData = $("table#table-data-jenis");
        let params = {};

        if (tipe_jenis != "") {
            params.tipe_jenis = tipe_jenis;
        }

        params.id = $("#id").val();
        if (tableData.length > 0) {
            tableData.DataTable({
                processing: true,
                serverSide: true,
                ordering: true,
                autoWidth: false,
                order: [[0, "desc"]],
                aLengthMenu: [
                    [10, 50, 100],
                    [10, 50, 100],
                ],
                ajax: {
                    url:
                        url.base_url("api/purchasing/pengajuan-pre-pr") +
                        `getDataJenis`,
                    type: "POST",
                    data: params,
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {},
                columnDefs: [
                    {
                        targets: [1, 2],
                        orderable: false,
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
                            $(td).addClass("text-center");
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
                            $(td).addClass("text-center");
                        },
                    },
                ],
                columns: [
                    {
                        data: "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "nama",
                    },
                    {
                        data: "tipe",
                    },
                    {
                        data: "id",
                        render: (data, type, row, meta) => {
                            return `<button class="btn btn-success" kode_item="${row.kode_item}" nama_item="${row.nama_item}" nama="${row.nama}" tipe="${row.tipe}" data_id="${data}" onclick="PengajuanPrePRPlafon.pilihDataJenis(this,'${bindText}')" ><i class="bx bx-check"></i></button>`;
                        },
                    },
                ],
            });
        }
    },

    pilihDataJenis: (elm, bindID) => {
        let nama = $(elm).attr("nama");
        let tipe = $(elm).attr("tipe");
        let kode_item = $(elm).attr("kode_item");
        let nama_item = $(elm).attr("nama_item");
        let id = $(elm).attr("data_id");
        $("#" + bindID).val(id + " - " + nama + " - " + tipe);
        $("#" + bindID + "_nama_item").val(kode_item + " - " + nama_item);
        message.closeDialog();
    },

    // get vendor
    showDataVendor: (elm, id_text) => {
        let params = {};
        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url: url.base_url(PengajuanPrePRPlafon.moduleApi()) + "showDataVendor",

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
                PengajuanPrePRPlafon.getDataVendor(id_text);
            },
        });
    },

    getDataVendor: async (bindText) => {
        let tableData = $("table#table-data-vendor");
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
                    [10, 50, 100],
                    [10, 50, 100],
                ],
                ajax: {
                    url:
                        url.base_url("api/purchasing/pengajuan-pre-pr") +
                        `getDataVendor`,
                    type: "POST",
                    data: params,
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {},
                columnDefs: [
                    {
                        targets: [1, 2],
                        orderable: false,
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
                            $(td).addClass("text-center");
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
                            $(td).addClass("text-center");
                        },
                    },
                ],
                columns: [
                    {
                        data: "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "kode",
                    },
                    {
                        data: "label",
                    },
                    {
                        data: "id",
                        render: (data, type, row, meta) => {
                            return `<button class="btn btn-success" label="${row.label}" data_id="${data}" onclick="PengajuanPrePRPlafon.pilihDataVendor(this,'${bindText}')"><i class="bx bx-check"></i></button>`;
                        },
                    },
                ],
            });
        }
    },

    pilihDataVendor: (elm, bindID) => {
        let label = $(elm).attr("label");
        let id = $(elm).attr("data_id");
        $("." + bindID).val(id + " - " + label);
        message.closeDialog();
    },

    getPostRekomendasiBaru: () => {
        let data = {
            nama: $("#nama_rekomendasi").val(),
        };

        return data;
    },

    submitRekomendasiBaru: (elm, e, id_text) => {
        e.preventDefault();
        let params = PengajuanPrePRPlafon.getPostRekomendasiBaru();

        // console.log(params);return;

        let form = $(elm).closest("div.form-rekomendasi");

        if (validation.runWithElement(form)) {
            // return;
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url:
                    url.base_url(PengajuanPrePRPlafon.moduleApi()) +
                    "submitRekomendasiBaru",
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
                        // message.closeDialog();
                        $("#nama_rekomendasi").val("");
                        PengajuanPrePRPlafon.getDataRekomendasi(id_text);
                    } else {
                        bootbox.dialog({
                            message: resp.message,
                        });
                    }
                },
            });
        }
    },

    // get rekomendasi
    showDataRekomendasi: (elm, id_text) => {
        let params = {};
        params.id_text = id_text;
        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url:
                url.base_url(PengajuanPrePRPlafon.moduleApi()) +
                "showDataRekomendasi",

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
                PengajuanPrePRPlafon.getDataRekomendasi(id_text);
            },
        });
    },

    getDataRekomendasi: async (bindText) => {
        let tableData = $("table#table-data-rekomendasi");
        let params = {};
        if (tableData.length > 0) {
            tableData.DataTable({
                destroy: true,
                processing: true,
                serverSide: true,
                ordering: true,
                autoWidth: false,
                order: [[0, "desc"]],
                aLengthMenu: [
                    [10, 50, 100],
                    [10, 50, 100],
                ],
                ajax: {
                    url:
                        url.base_url("api/purchasing/pengajuan-pre-pr") +
                        `getDataRekomendasi`,
                    type: "POST",
                    data: params,
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {},
                columnDefs: [
                    {
                        targets: [1, 2],
                        orderable: false,
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
                            $(td).addClass("text-center");
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
                            $(td).addClass("text-center");
                        },
                    },
                ],
                columns: [
                    {
                        data: "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "nama",
                    },
                    {
                        data: "nilai",
                        render: (data, type, row, meta) => {
                            return `<b style="font-size: 18px">${Math.floor(
                                row.nilai
                            )}</b>/5<br>${
                                row.review == null
                                    ? "Belum Direview"
                                    : row.review + "Reviewer"
                            }`;
                        },
                    },
                    {
                        data: "id",
                        render: (data, type, row, meta) => {
                            return `<button class="btn btn-primary btn-sm" data-id="${row.id}" data-nama="${row.nama}" onclick="PengajuanPrePRPlafon.pilihDataRekomendasi(this,'${bindText}')"><i class="bx bx-check"></i></button>`;
                        },
                    },
                ],
            });
        }
    },

    pilihDataRekomendasi: (elm, bindID) => {
        let id = $(elm).attr("data-id");
        let nama = $(elm).attr("data-nama");
        $("." + bindID).val(id + " | " + nama);
        message.closeDialog();
    },

    // get coa
    showDataCoa: (elm, id_text) => {
        let params = {};
        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url: url.base_url(PengajuanPrePRPlafon.moduleApi()) + "showDataCoa",

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
                PengajuanPrePRPlafon.getDataCoa(id_text);
            },
        });
    },

    getDataCoa: async (bindText) => {
        let tableData = $("table#table-data-coa");
        let params = {};
        if (tableData.length > 0) {
            tableData.DataTable({
                processing: true,
                serverSide: true,
                ordering: true,
                autoWidth: false,
                order: [[0, "desc"]],
                aLengthMenu: [
                    [10, 50, 100],
                    [10, 50, 100],
                ],
                ajax: {
                    url:
                        url.base_url("api/purchasing/pengajuan-pre-pr") +
                        `getDataCoa`,
                    type: "POST",
                    data: params,
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {},
                columnDefs: [
                    {
                        targets: [1, 2],
                        orderable: false,
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
                            $(td).addClass("text-center");
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
                            $(td).addClass("text-center");
                        },
                    },
                ],
                columns: [
                    {
                        data: "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "cnomor",
                    },
                    {
                        data: "cnama",
                    },
                    {
                        data: "id",
                        render: (data, type, row, meta) => {
                            return `<button class="btn btn-primary btn-sm" data-nomor="${row.cnomor}" data-nama="${row.cnama}" onclick="PengajuanPrePRPlafon.pilihDataCoa(this,'${bindText}')"><i class="bx bx-check"></i></button>`;
                        },
                    },
                ],
            });
        }
    },

    pilihDataCoa: (elm, bindID) => {
        let nomor = $(elm).attr("data-nomor");
        let nama = $(elm).attr("data-nama");
        $("." + bindID).val(nomor + " | " + nama);
        message.closeDialog();
    },

    // get location
    showDataLocation: (elm, id_text) => {
        let params = {};
        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url: url.base_url(PengajuanPrePRPlafon.moduleApi()) + "showDataLocation",

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
                PengajuanPrePRPlafon.getDataLocation(id_text);
            },
        });
    },

    getDataLocation: async (bindText) => {
        let tableData = $("table#table-data-location");
        let params = {};
        if (tableData.length > 0) {
            tableData.DataTable({
                processing: true,
                serverSide: true,
                ordering: true,
                autoWidth: false,
                order: [[0, "desc"]],
                aLengthMenu: [
                    [10, 50, 100],
                    [10, 50, 100],
                ],
                ajax: {
                    url:
                        url.base_url("api/purchasing/pengajuan-pre-pr") +
                        `getDataLocation`,
                    type: "POST",
                    data: params,
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {},
                columnDefs: [
                    {
                        targets: [1, 2],
                        orderable: false,
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
                            $(td).addClass("text-center");
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
                            $(td).addClass("text-center");
                        },
                    },
                ],
                columns: [
                    {
                        data: "lkode",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "lkode",
                    },
                    {
                        data: "lnama",
                    },
                    {
                        data: "lkode",
                        render: (data, type, row, meta) => {
                            return `<button class="btn btn-primary btn-sm" data-kode="${row.lkode}" data-nama="${row.lnama}" onclick="PengajuanPrePRPlafon.pilihDataLocation(this,'${bindText}')"><i class="bx bx-check"></i></button>`;
                        },
                    },
                ],
            });
        }
    },

    pilihDataLocation: (elm, bindID) => {
        let kode = $(elm).attr("data-kode");
        let nama = $(elm).attr("data-nama");
        $("." + bindID).val(kode + " | " + nama);
        message.closeDialog();
    },

    // get kode item
    showDataKodeItem: (elm, id_text) => {
        let params = {};
        $.ajax({
            type: "GET",
            dataType: "html",
            data: params,
            url: url.base_url(PengajuanPrePRPlafon.moduleApi()) + "getViewKodeItem",
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
                PengajuanPrePRPlafon.getDataKodeItem(id_text);
            },
        });
    },

    getDataKodeItem: async (bindText) => {
        let tableData = $("table#table-data-kodeitem");
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
                    [10, 50],
                    [10, 50],
                ],
                ajax: {
                    url:
                        url.base_url(PengajuanPrePRPlafon.moduleApi()) +
                        "getDataKodeItem",
                    type: "POST",
                    data: params,
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {},
                columnDefs: [
                    {
                        targets: [1, 2],
                        orderable: false,
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
                            $(td).addClass("text-center");
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
                            $(td).addClass("text-center");
                        },
                    },
                ],
                columns: [
                    {
                        data: "bid",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "bkode",
                    },
                    {
                        data: "bnama",
                    },
                    {
                        data: "bid",
                        render: (data, type, row, meta) => {
                            return `<button class="btn btn-primary btn-sm" data-kode="${row.bkode}" data-nama="${row.bnama}" onclick="PengajuanPrePRPlafon.pilihDataKodeItem(this,'${bindText}')">Pilih</button>`;
                        },
                    },
                ],
            });
        }
    },

    pilihDataKodeItem: (elm, bindID) => {
        let kode = $(elm).attr("data-kode");
        let nama = $(elm).attr("data-nama");
        $("#" + bindID).val(`${kode}`);
        $(".nama" + bindID).val(`${nama}`);
        message.closeDialog();
    },

    hasDuplicates: (array) => {
        var valuesSoFar = Object.create(null);
        for (var i = 0; i < array.length; ++i) {
            var value = array[i];
            if (value in valuesSoFar) {
                return true;
            }
            valuesSoFar[value] = true;
        }
        return false;
    },

    pantauPerubahan: () => {
        let input = $("input, textarea");

        input.change(function () {
            $(this).addClass("berubah");
        });
    },

    laporanAdaPerubahan: (e) => {
        let berubah = $(".berubah").length;

        if (berubah) {
            Toast.error(
                "Informasi",
                "Ada perubahan yang belum disimpan, gunakan simpan draf untuk menyimpan perubahan"
            );
            e.preventDefault();
            return false;
        }
    },

    copyToClipboard: (elm) => {
        // Get the text field
        var copyText = $(elm).data("copy");

        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText);

        Toast.success("Informasi", `${copyText} Berhasil Di Salin`);
    },

    inputMoney: (elm) => {
        var num = $(elm).val();

        num = num.replaceAll(",", "");

        num = PengajuanPrePRPlafon.maskMoney(num);

        $(elm).val(num);

        PengajuanPrePRPlafon.hitungUlang("#debet", "#total_debet");
        PengajuanPrePRPlafon.hitungUlang("#kredit", "#total_kredit");
    },

    maskMoney: (num) => {
        num = new Intl.NumberFormat("en-EN", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num);
        // "Rp 123,456.79"
        num = num.replaceAll("$", "");

        return num;
    },

    hitungUlang: (elmId, resultElmId) => {
        var elm_data = $("#item-coa").find("tr").find(elmId);

        var total = 0;
        $.each(elm_data, function () {
            let elm = $(this);

            var num = elm.val().replaceAll(",", "");
            console.log(num);

            total += parseFloat(num);
        });

        result = PengajuanPrePRPlafon.maskMoney(total);

        $(resultElmId).val(result);

        var total_debet = $("#total_debet").val().replaceAll(",", "");
        var total_kredit = $("#total_kredit").val().replaceAll(",", "");

        var balance = total_debet - total_kredit;
        balance = PengajuanPrePRPlafon.maskMoney(balance);

        $("#balance").val(balance);
    },

    toggleBtnKirimUntukRealisasiBooking: (elm) => {
        let isChecked = $(elm).is(':checked');

        $('#btnKirimUntukRealisasiBooking').prop('disabled', !isChecked);
    },
};

$(function () {
    PengajuanPrePRPlafon.getData();
    if ($("table#table-data-laporan-pengajuan-perjalanan-dinas").length) {
        PengajuanPrePRPlafon.getDataLaporan();
    }
    PengajuanPrePRPlafon.getDataLogKaryawan();
    PengajuanPrePRPlafon.pantauPerubahan();
    PengajuanPrePRPlafon.setDate();
    PengajuanPrePRPlafon.select2All();
});
