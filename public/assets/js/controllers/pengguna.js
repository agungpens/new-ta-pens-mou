let Pengguna = {
    module: () => {
        return "pengguna";
    },

    moduleApi: () => {
        return `api/${Pengguna.module()}`;
    },

    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleKaryawanApi: () => {
        return `api/${Pengguna.moduleKaryawan()}`;
    },

    add: () => {
        window.location.href = url.base_url(Pengguna.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href =
            url.base_url(Pengguna.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(Pengguna.module()) + "index";
    },

    getData: async () => {
        let tableData = $("table#table-data");

        if (tableData.length > 0) {
            let params = {};

            params.user_group = $("#user_group").val();
            params.departemen = $("#departemen").val();
            params.area_kerja = $("#area_kerja").val();
            params.nik = $("#nik").val();

            tableData.DataTable({
                processing: true,
                serverSide: true,
                ordering: true,
                autoWidth: false,
                destroy: true,
                stateSave: true,
                order: [[0, "desc"]],
                aLengthMenu: [
                    [25, 50, 100],
                    [25, 50, 100],
                ],
                ajax: {
                    url: url.base_url(Pengguna.moduleApi()) + `getData`,
                    type: "GET",
                    data: params,
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {},
                columnDefs: [
                    {
                        targets: [1, 2, 3, 4, 5, 6],
                        orderable: false,
                    },
                    {
                        targets: 6,
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
                        data: "nik",
                    },
                    {
                        data: "name",
                    },
                    {
                        data: "email",
                    },
                    {
                        data: "nama_departemen",
                        render: (data, type, row, meta) => {
                            return `${row.nama_departemen}<br>${row.area_kerja}<br>${row.nama_jabatan}`;
                        },
                    },
                    {
                        data: "nama_group",
                    },
                    {
                        data: "id",
                        render: (data, type, row, meta) => {
                            return `
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="Pengguna.ubah(this)"></i>
                            <i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="Pengguna.delete(this, event)"></i>`;
                        },
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
            <button class="btn btn-primary btn-sm" onclick="Pengguna.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(Pengguna.moduleApi()) + "delete",

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

    getPostInputDokumen: () => {
        let params = {};
        let data_file = $("div.content-file-upload");
        $.each(data_file, function () {
            let $this = $(this);
            let attr_obj_img = $this.find("img").attr("id");
            let attr_obj_filename = $this.find("label").attr("id");
            params[`${attr_obj_img.replaceAll("-", "_")}`] = $this
                .find("img")
                .attr("src");
            params[`${attr_obj_filename.replaceAll("-", "_")}`] = $this
                .find("label")
                .text()
                .trim();
        });

        return params;
    },

    getPostData: () => {
        let data = {
            data: {
                id: $("input#id").val(),
                user_group: $.trim($("#user_group").val()),
                nama_pengguna: $.trim($("#nama_pengguna").val()),
                email: $.trim($("#email").val()),
                password: $.trim($("#password").val()),
                nik: $("#nik").val(),
                area_kerja: $("#area_kerja").val(),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Pengguna.getPostData();
        let form = $(elm).closest("div.row");
        if ($("#nik").val() == "") {
            Toast.error("Informasi", "Data Karyawan Belum Dipilih");
            return false;
        }
        if (validation.runWithElement(form)) {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url: url.base_url(Pengguna.moduleApi()) + "submit",
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
        const flatpickrRange = document.querySelector(".flatpickr");
        if (flatpickrRange) {
            flatpickrRange.flatpickr();
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

    getDataKaryawan: async () => {
        let tableData = $("table#table-data-karyawan");
        let params = {};
        params.nik = $("#id").val();
        if (tableData.length > 0) {
            let nik = $("#nik").val();
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
                    url: url.base_url(Pengguna.moduleApi()) + `getDataKaryawan`,
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
                    // {
                    //     "targets": 3,
                    //     "orderable": false,
                    //     "createdCell": function (td, cellData, rowData, row, col) {
                    //         $(td).addClass('text-center');
                    //         $(td).addClass('td-padd');
                    //         $(td).addClass('action');
                    //     }
                    // },
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
                        data: "nik",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "nama_lengkap",
                    },
                    {
                        data: "nik",
                    },
                    {
                        data: "nik",
                        render: (data, type, row, meta) => {
                            let checked = nik == data ? "checked" : "";
                            return `<div class="form-check">
                            <input nik="${data}" name="pilih" class="form-check-input" type="radio" onchange="Pengguna.setNik(this, event)" value="${checked}" id="pilih" ${checked}>
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
        return `api/${Pengguna.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $("input#id").val();
        window.location.href =
            url.base_url(Pengguna.modulePerubahan()) +
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
                url.base_url(Pengguna.modulePerubahanApi()) +
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
    setRandomPassowrd: (elm, length, id_element) => {
        if ($(elm).prop("checked") == true) {
            var result = "";
            var characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }
            $("#" + id_element).val(result);
        } else {
            $("#" + id_element).val("");
        }
        // return result;
    },

    // MODAL KARYAWAN
    showDataKaryawanFilter: (elm) => {
        let params = {};

        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url: url.base_url(Pengguna.moduleApi()) + "showDataKaryawan",

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
                Pengguna.getDataKaryawanFilter();
            },
        });
    },

    getDataKaryawanFilter: async () => {
        let tableData = $("table#table-data-karyawan-filter");
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
                    url: url.base_url(Pengguna.moduleKaryawanApi()) + `getData`,
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="Pengguna.pilihDataFilter(this)"></i>`;
                        },
                    },
                ],
            });
        }
    },

    pilihDataFilter: (elm) => {
        let nama_lengkap = $(elm).attr("nama_lengkap");
        let nik = $(elm).attr("data_id");
        $("#nik").val(nik + " - " + nama_lengkap);
        message.closeDialog();
    },
};

$(function () {
    Pengguna.getData();
    Pengguna.getDataKaryawan();
    Pengguna.setDate();
    Pengguna.select2All();
});
