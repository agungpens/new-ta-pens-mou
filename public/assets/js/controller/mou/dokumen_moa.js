let DokumenMoa = {
    module: () => {
        return "dokumen-moa";
    },
    moduleApi: () => {
        return `api/${DokumenMoa.module()}`;
    },
    moduleDokumenMou: () => {
        return "dokumen-mou";
    },

    moduleApiDokumenMou: () => {
        return `api/${DokumenMoa.moduleDokumenMou()}`;
    },
    moduleKategori: () => {
        return "kategori-doc";
    },

    moduleApiKategori: () => {
        return `api/${DokumenMoa.moduleKategori()}`;
    },
    moduleLevel: () => {
        return "level-doc";
    },

    moduleApiLevel: () => {
        return `api/${DokumenMoa.moduleLevel()}`;
    },
    moduleProdi: () => {
        return "prodi";
    },

    moduleApiProdi: () => {
        return `api/${DokumenMoa.moduleProdi()}`;
    },

    add: () => {
        window.location.href = url.base_url(DokumenMoa.module()) + "add";
    },
    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href =
            url.base_url(DokumenMoa.module()) + "ubah?id=" + data_id;
    },
    detail: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href =
            url.base_url(DokumenMoa.module()) + "detail?id=" + data_id;
    },
    back: () => {
        window.location.href = url.base_url(DokumenMoa.module()) + "/";
    },

    delete: (elm) => {
        let data_id = $(elm).attr("data_id");
        let kerja_sama_dengan = $(elm).attr("kerja_sama_dengan");

        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan menghapus data <b>${kerja_sama_dengan}</b> ini  ?</p>
        </div>
        <div class="col-12 text-center">
            <br>
            <button class="btn btn-primary btn-sm" onclick="DokumenMoa.deleteConfirm(this, '${data_id}')">Ya</button>
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
        params.user_id = user.getUserId();
        $.ajax({
            type: "POST",
            dataType: "json",
            data: params,
            url: url.base_url(DokumenMoa.moduleApi()) + "delete",

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
                        DokumenMoa.back();
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
            data: {
                id: $("input#id").val(),
                nomor_mou: $("#nomor_mou").val(),
            },
            data_moa: DokumenMoa.getPostdataDocMoa(),
            user_id: user.getUserId(),
        };
        return data;
    },
    getPostDataUpdated: () => {
        let data = {
            data: {
                id: $("input#id").val(),
                nomor_mou: $("#nomor_mou").val(),
                nomor_moa: $("#nomor_moa").val(),
                judul_moa: $("#judul_moa").val(),
                tanggal_dibuat: $("#tanggal_dibuat").val(),
                tanggal_berakhir: $("#tanggal_berakhir").val(),
                jenis: $("#jenis").val(),
                level: $("#level").val(),
                kategori: $("#kategori").val(),
                status: $("#status").val(),
                kerja_sama_dengan: $("#kerja_sama_dengan").val(),
                relevansi_prodi: $("#relevansi_prodi").val(),
                file: $("input#file").attr("src"),
                tipe: $("input#file").attr("tipe"),
                file_name: $("input#file").val(),
            },
            user_id: user.getUserId(),
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = DokumenMoa.getPostData();
        let form = $(elm).closest("div.form");

        if (validation.runWithElement(form)) {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url: url.base_url(DokumenMoa.moduleApi()) + "submit",
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

    updated: (elm, e) => {
        e.preventDefault();
        let params = DokumenMoa.getPostDataUpdated();
        let form = $(elm).closest("div.row");

        if (validation.runWithElement(form)) {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url: url.base_url(DokumenMoa.moduleApi()) + "updated",
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

    getData: async () => {
        let tableData = $("table#table-data");
        tableData.DataTable().destroy();
        let params = {};

        params.status = $("#status").val();
        params.prodi = $("#prodi").val();
        params.level = $("#level").val();
        params.kategori = $("#kategori").val();
        params.tanggal_dibuat = $("#tgl_mulai").val();
        params.tanggal_berakhir = $("#tgl_selesai").val();
        params.kerja_sama = $("#kerja_sama").val();
        params.judul_moa = $("#judul_moa").val();
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
                    url: url.base_url(DokumenMoa.moduleApi()) + `getData`,
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
                        targets: 5,
                        orderable: false,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            // $(td).addClass("td-padd");
                        },
                    },
                    {
                        targets: 2,
                        orderable: true,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            // $(td).addClass('td-padd');
                        },
                    },
                    {
                        targets: [0, 1],
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
                        targets: 0,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            // $(td).addClass('td-padd');
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
                            return `
                            <button class="btn btn-warning mb-2" data_id="${data}" onclick="DokumenMoa.detail(this)">
                                <i class="fa fa-edit" ></i>
                            </button>
                                `;
                        },
                    },
                    {
                        data: "file_moa",
                        render: (data, type, row, meta) => {
                            let badgeColorClass =
                                row.status === "AKTIF"
                                    ? "bg-success"
                                    : "bg-danger";
                            return `
                            ${row.file_moa}
                            <br>
                            <span class="badge ${badgeColorClass} badge-sm"> ${row.status}</span>
                                `;
                        },
                    },

                    {
                        data: "nomor_mou",
                    },

                    {
                        data: "nomor_moa",
                    },
                    {
                        data: "judul_moa",
                    },
                    {
                        data: "kerja_sama_dengan",
                        render: (data, type, row, meta) => {
                            return `
                            ${row.kerja_sama_dengan}
                            `;
                        },
                    },
                    {
                        data: "relevansi_prodi",
                        render: (data, type, row, meta) => {
                            return `
                            ${
                                row.relevansi_prodi == null
                                    ? ""
                                    : row.relevansi_prodi_moa.nama_prodi
                            }
                            `;
                        },
                    },
                    {
                        data: "tanggal_dibuat",
                        render: (data, type, row, meta) => {
                            return `
                            ${row.tanggal_dibuat} <br>
                            s/d <br>
                            ${row.tanggal_berakhir}
                            `;
                        },
                    },
                    {
                        data: "id",
                        render: (data, type, row, meta) => {
                            return `
                            ${row.kategori_moa.nama_kategori} <br>
                            ${row.level_doc_moa.nama_level} <br>
                            ${row.jenis_moa.nama_jenis}
                            `;
                        },
                    },
                ],
            });
        }
    },

    setTextEditor: () => {
        quill = new Quill("#keterangan", {
            placeholder: "Type Something...",
            modules: { toolbar: true },
            theme: "snow",
        });
    },

    select2All: () => {
        const select2 = $(".select2");
        if (select2.length) {
            select2.each(function () {
                var $this = $(this);
                $this.wrap('<div class="position-relative"></div>').select2({
                    placeholder: "Pilih Data",
                    dropdownParent: $this.parent(),
                });
            });
        }
    },
    viewFile: (elm, e) => {
        e.preventDefault();

        let path = url.base_url($(elm).attr("path"));
        let nama_file = $(elm).attr("nama_file");
        // set time out window.open(path, '_blank')

        Swal.fire({
            title: "Unduh File ?",
            text: `Apakah Anda ingin mengunduh file ${nama_file} ?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Unduh!",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Berhasil!",
                    text: "File berhasil diunduh.",
                    icon: "success",
                });
                window.open(path, "_blank");
            }
        });
    },
    viewFileWithModal: (elm, e) => {
        e.preventDefault();
        let params = {};
        let path = url.base_url($(elm).attr("path"));
        let html = `<br> <iframe src="${path}" style="width:100%; height:600px;"></iframe>`;
        bootbox.dialog({
            message: html,
            size: "large",
        });
    },
    takeFile: (elm, e) => {
        e.preventDefault();
        var uploader = $(
            '<input type="file" accept="image/*;capture=camera" />'
        );
        var src_file = $("#file_doc");
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
                if (type_file == "pdf") {
                    src_file.val(filename);
                    DokumenMoa.execUploadFile(files, src_file);

                    var data = event.target.result;
                    src_file.attr("src", data);
                } else {
                    bootbox.dialog({
                        message: "File Harus Bertipe pdf",
                    });
                }
            };

            reader.readAsDataURL(uploader[0].files[0]);
        });
    },
    execUploadFile: (files, component) => {
        let formData = new FormData();
        formData.append("file", files);
        $.ajax({
            type: "POST",
            dataType: "json",
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            url: url.base_url(DokumenMoa.moduleApi()) + "execUploadFile",

            beforeSend: () => {
                message.loadingProses("Proses Upload File...");
            },

            error: function (err) {
                toastr.error(`Gagal, ${JSON.stringify(err)} `);
                message.closeLoading();
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success("Informasi", "File Berhasil Diupload");
                    component.attr("path", resp.path);
                } else {
                    Toast.error("Informasi", `Upload Gagal ${resp.message} `);
                }
            },
        });
    },
    setDate: () => {
        const flatpickrRange = document.querySelectorAll(".flatpickr");

        if (flatpickrRange) {
            flatpickrRange.forEach((flatpickrRange) => {
                flatpickrRange.flatpickr();
            });
        }
    },

    showDataMou: (elm) => {
        let params = {};

        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url: url.base_url(DokumenMoa.moduleApi()) + "showDataMou",

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
                DokumenMoa.getDataMou();
            },
        });
    },

    getDataMou: async () => {
        let tableData = $("table#table-data");
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
                        url.base_url(DokumenMoa.moduleApiDokumenMou()) +
                        `getData`,
                    type: "POST",
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
                        targets: 5,
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
                        targets: 2,
                        orderable: true,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            // $(td).addClass('td-padd');
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
                            // $(td).addClass('td-padd');
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
                        data: "nomor_mou",
                        render: (data, type, row, meta) => {
                            return `
                                    <i class="bx bx-edit" style = "cursor: pointer;" nomor_mou = "${data}" kerja_sama_dengan = "${row.kerja_sama_dengan}" onclick = "DokumenMoa.pilihDataMou(this)" ></i>
                                    `;
                        },
                    },
                    {
                        data: "file_mou",
                        render: (data, type, row, meta) => {
                            let badgeColorClass =
                                row.status === "AKTIF"
                                    ? "bg-success"
                                    : "bg-danger";
                            return `
                            ${row.file_mou}
                            <br>
                            <span class="badge ${badgeColorClass} badge-sm"> ${row.status}</span>
                                `;
                        },
                    },

                    {
                        data: "nomor_mou",
                    },
                    {
                        data: "judul_mou",
                    },
                    {
                        data: "kerja_sama_dengan",
                    },
                    {
                        data: "tanggal_dibuat",
                        render: (data, type, row, meta) => {
                            return `
                            ${row.tanggal_dibuat} <br>
                            s/d <br>
                            ${row.tanggal_berakhir}
                            `;
                        },
                    },
                    {
                        data: "id",
                        render: (data, type, row, meta) => {
                            return `
                            ${row.kategori_mou.nama_kategori} <br>
                            ${row.level_doc_mou.nama_level} <br>
                            ${row.jenis_mou.nama_jenis}
                            `;
                        },
                    },
                ],
            });
        }
    },

    pilihDataMou: (elm) => {
        let kerja_sama_dengan = $(elm).attr("kerja_sama_dengan");
        let nomor_mou = $(elm).attr("nomor_mou");
        $(`#nomor_mou`).val(`${nomor_mou} - ${kerja_sama_dengan}`);
        DokumenMoa.changeDataMou();
        message.closeDialog();
    },

    showDataKategori: (elm, id_text) => {
        let params = {};

        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url: url.base_url(DokumenMoa.moduleApi()) + "showDataKategori",

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
                DokumenMoa.getDataKategori(id_text);
            },
        });
    },

    getDataKategori: async (bindText) => {
        let tableData = $("table#table-data");
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
                        url.base_url(DokumenMoa.moduleApiKategori()) +
                        `getData`,
                    type: "POST",
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
                            $(td).addClass("td-padd");
                        },
                    },
                    {
                        targets: 2,
                        orderable: true,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            // $(td).addClass('td-padd');
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
                            // $(td).addClass('td-padd');
                            // $(td).addClass('text-center');
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
                            return `
                            <i class="bx bx-edit" style = "cursor: pointer;" data_id = "${data}" kategori = "${row.nama_kategori}" onclick = "DokumenMoa.pilihDataKategori(this,'${bindText}')" ></i>
                            `;
                        },
                    },
                    {
                        data: "nama_kategori",
                    },
                    {
                        data: "keterangan",
                    },
                ],
            });
        }
    },

    pilihDataKategori: (elm, bindID) => {
        let data_id = $(elm).attr("data_id");
        let nama_kategori = $(elm).attr("kategori");

        $("." + bindID).val(data_id + " - " + nama_kategori);
        message.closeDialog();
    },

    showDataLevel: (elm, id_text) => {
        let params = {};

        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url: url.base_url(DokumenMoa.moduleApi()) + "showDataLevel",

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
                DokumenMoa.getDataLevel(id_text);
            },
        });
    },

    getDataLevel: async (bindText) => {
        let tableData = $("table#table-data");
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
                    url: url.base_url(DokumenMoa.moduleApiLevel()) + `getData`,
                    type: "POST",
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
                            $(td).addClass("td-padd");
                        },
                    },
                    {
                        targets: 2,
                        orderable: true,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            // $(td).addClass('td-padd');
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
                            // $(td).addClass('td-padd');
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
                            return `
                            <i class="bx bx-edit" style = "cursor: pointer;" data_id = "${data}" level = "${row.nama_level}" onclick = "DokumenMoa.pilihDataLevel(this,'${bindText}')" ></i>`;
                        },
                    },
                    {
                        data: "nama_level",
                    },
                    {
                        data: "keterangan",
                    },
                ],
            });
        }
    },

    pilihDataLevel: (elm, bindID) => {
        let data_id = $(elm).attr("data_id");
        let nama_level = $(elm).attr("level");

        $("." + bindID).val(data_id + " - " + nama_level);
        message.closeDialog();
    },

    showDataProdi: (elm, id_text) => {
        let params = {};

        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url: url.base_url(DokumenMoa.moduleApi()) + "showDataProdi",

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
                DokumenMoa.getDataProdi(id_text);
            },
        });
    },

    getDataProdi: async (bindText) => {
        let tableData = $("table#table-data");
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
                    url: url.base_url(DokumenMoa.moduleApiProdi()) + `getData`,
                    type: "POST",
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
                            $(td).addClass("td-padd");
                        },
                    },
                    {
                        targets: 2,
                        orderable: true,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            // $(td).addClass('td-padd');
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
                            // $(td).addClass('td-padd');
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
                            return `
                            <i class="bx bx-edit" style = "cursor: pointer;" data_id = "${data}" prodi = "${row.nama_prodi}" onclick = "DokumenMoa.pilihDataProdi(this,'${bindText}')" ></i>
                            `;
                        },
                    },
                    {
                        data: "nama_prodi",
                    },
                    {
                        data: "keterangan",
                    },
                ],
            });
        }
    },

    pilihDataProdi: (elm, bindID) => {
        let data_id = $(elm).attr("data_id");
        let nama_prodi = $(elm).attr("prodi");

        $("." + bindID).val(data_id + " - " + nama_prodi);
        message.closeDialog();
    },

    index: 0,
    addItem: (elm, e) => {
        let i = DokumenMoa.index;
        e.preventDefault();
        let table = $(elm).closest("table");
        let tbody = table.find("tbody");

        let html = `
            <tr class="input" data_id="">
                <td>
                    <div class="input-group mb-2">
                        <button class="btn btn-outline-primary" type="button"
                            id="button-addon1"
                            onclick="DokumenMoa.addFile(this)">Pilih</button>
                        <input id="file" type="text" readonly class="form-control required"
                            error="File" placeholder="Pilih Data File"
                            aria-label="Pilih Data File" aria-describedby="button-addon1"
                            value="">
                    </div>
                    <input type="text" class="form-control required" name="status_doc"
                        id="status_doc" error="Status DOC" id="basic-icon-default-fullname"
                        placeholder="Status DOC" aria-label="Status DOC"
                        aria-describedby="basic-icon-default-fullname2" value="AKTIF"
                        readonly />
                </td>
                <td>
                    <input type="text" class="form-control required" name="nomor_moa"
                        id="nomor_moa" error="Nomor moa" id="basic-icon-default-fullname"
                        placeholder="Nomor moa" aria-label="Nomor moa"
                        aria-describedby="basic-icon-default-fullname2"
                        value="" />
                        <br/>
                        <input type="text" class="form-control required" name="judul_moa"
                        id="judul_moa" error="Judul moa" id="basic-icon-default-fullname"
                        placeholder="Judul moa" aria-label="Judul moa"
                        aria-describedby="basic-icon-default-fullname2"
                        value="" />
                </td>
                <td>
                    <input type="text" class="form-control required mb-2"
                        name="kerja_sama_dengan" id="kerja_sama_dengan"
                        error="Kerja Sama Dengan" id="basic-icon-default-fullname"
                        placeholder="Kerja Sama Dengan" aria-label="Kerja Sama Dengan"
                        aria-describedby="basic-icon-default-fullname2"
                        value="" />
                    <div class="input-group mb-2">
                        <button class="btn btn-outline-primary" type="button"
                            id="button-addon1"
                            onclick="DokumenMoa.showDataProdi(this,'relevansi_prodi${i}')">Pilih</button>
                                <input id="relevansi_prodi" src="" type="text"
                                    class="form-control relevansi_prodi${i}" placeholder="Pilih Prodi"
                                    error="Relevansi Prodi" aria-label="Pilih Prodi" aria-describedby="button-addon1"
                                    value=""
                                    readonly>
                    </div>
                </td>
                <td>
                    <div class="input-group">
                        <input id="tanggal_dibuat" name="tanggal_dibuat" type="date"
                            class="form-control required" error="Tanggal Dibuat"
                            value="">
                            <span class="btn btn-danger">S/D</span>
                            <input id="tanggal_berakhir" name="tanggal_berakhir" type="date"
                                class="form-control required" error="Tanggal Selesai"
                                value="">
                            </div>
                        </td>
                        <td>
                            <div class="input-group mb-2">
                                <button class="btn btn-outline-primary" type="button"
                                    id="button-addon1"
                                    onclick="DokumenMoa.showDataKategori(this,'kategori_doc${i}')">Pilih</button>
                                <input id="kategori_doc" src="" type="text"
                                    class="form-control kategori_doc${i} required" placeholder="Pilih kategori"
                                    aria-label="Pilih kategori" aria-describedby="button-addon1"
                                    error="Kategori"
                                    value=""
                                    readonly>
                            </div>
                            <div class="input-group mb-2">
                                <button class="btn btn-outline-primary" type="button"
                                    id="button-addon1"
                                    onclick="DokumenMoa.showDataLevel(this,'level_doc${i}')">Pilih</button>
                                <input id="level_doc" src="" type="text"
                                    class="form-control level_doc${i} required" placeholder="Pilih Level"
                                    aria-label="Pilih Level" aria-describedby="button-addon1"
                                    error="Level"
                                    value=""
                                    readonly>
                            </div>
                            <input type="text" class="form-control required" name="jenis_doc"
                                id="jenis_doc" error="Jenis DOC" id="basic-icon-default-fullname"
                                placeholder="Jenis DOC" aria-label="Jenis DOC"
                                aria-describedby="basic-icon-default-fullname2"
                                value="6 - Memorandum of Agreement ( MOA)" readonly />
                        </td>
                        <td>
                            <button class="btn btn-danger btn-sm" type="button"
                                onclick="DokumenMoa.deleteItem(this, event)">
                                <i class="bx bx-trash"></i>
                            </button>
                        </td>
                    </tr>
        `;
        tbody.append(html);

        DokumenMoa.index++;
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
    addFileOutTable: (elm) => {
        var uploader = $(
            '<input type="file" accept="image/*;capture=camera" />'
        );
        var src_foto = $(elm).closest("div").find("#file");
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
        }
    },

    getPostdataDocMoa: () => {
        let data = [];
        let tableData = $("table#doc_moa").find("tbody").find("tr.input");
        $.each(tableData, function () {
            let tr = $(this);
            let params = {};

            params.id = tr.attr("data_id");

            params.file = tr.find("input#file").attr("src");
            params.tipe = tr.find("input#file").attr("tipe");
            params.file_name = tr.find("input#file").val();

            params.status_doc = tr.find("input#status_doc").val();
            params.nomor_moa = tr.find("input#nomor_moa").val();
            params.judul_moa = tr.find("input#judul_moa").val();
            params.kerja_sama_dengan = tr.find("input#kerja_sama_dengan").val();
            params.relevansi_prodi = tr.find("input#relevansi_prodi").val();
            params.tanggal_dibuat = tr.find("input#tanggal_dibuat").val();
            params.tanggal_berakhir = tr.find("input#tanggal_berakhir").val();
            params.kategori_doc = tr.find("input#kategori_doc").val();
            params.level_doc = tr.find("input#level_doc").val();
            params.jenis_doc = tr.find("input#jenis_doc").val();
            // params.file = tr.find('input#file').attr('src');
            // params.tipe = tr.find('input#file').attr('tipe');

            data.push(params);
        });

        return data;
    },

    showFile: (elm, e) => {
        e.preventDefault();

        let file = $(elm).attr("src");
        // console.log(file); return;
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
                            <button onclick="DokumenMoa.imageZoomIn('#image-pembelian')" class="btn btn-primary">Zoom In</button>
                            <button onclick="DokumenMoa.imageZoomOut('#image-pembelian')" class="btn btn-danger">Zoom Out</button>
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
        if (DokumenMoa.zoomInit != 300) {
            DokumenMoa.zoomInit = DokumenMoa.zoomInit + 50;
        }

        $(elm).css({
            margin: "auto",
            width: `${DokumenMoa.zoomInit}%`,
        });

        console.log(DokumenMoa.zoomInit);
    },

    imageZoomOut: (elm) => {
        if (DokumenMoa.zoomInit != 50) {
            DokumenMoa.zoomInit = DokumenMoa.zoomInit - 50;
        }

        $(elm).css({
            margin: "auto",
            width: `${DokumenMoa.zoomInit}%`,
        });

        console.log(DokumenMoa.zoomInit);
    },

    changeDataMou: () => {
        let input_nomor_mou = $("#nomor_mou");
        let changeEventTriggered = false;
        let numericPart;
        // Attach a handler to the 'change' event
        $(input_nomor_mou).on("change", function () {
            nomor_mou = input_nomor_mou.val();
            numericPart = nomor_mou.replace(/\D/g, "");
            changeEventTriggered = true;
        });

        // Trigger the 'change' event
        $(input_nomor_mou).trigger("change");

        // Check if the 'change' event has been triggered
        if (changeEventTriggered) {
            DokumenMoa.getDataMoa(numericPart);
        } else {
            bootbox.dialog({
                message: "Data Gagal Di Trigger",
            });
        }
    },

    getDataMoa: (nomor_mou) => {
        $.ajax({
            type: "POST",
            url: url.base_url(DokumenMoa.moduleApi()) + "getDataMoa",
            data: {
                nomor_mou: nomor_mou,
            },
            dataType: "json",
            success: function (response) {
                let data = response.data;
                let tableBody = $("#doc_moa tbody");

                // Clear existing tbody content
                tableBody.empty();

                // Populate the tbody with data
                $.each(data, function (index, rowData) {
                    let row = `<tr class="input" data_id="${rowData.id}">`;
                    row += `
                            <td>
                                <div class="input-group mb-2">
                                    <button class="btn btn-outline-primary" type="button"
                                        id="button-addon1"
                                        onclick="DokumenMoa.addFile(this)">Pilih</button>
                                    <input id="file" type="text" readonly class="form-control required"
                                        error="File" placeholder="Pilih Data File"
                                        aria-label="Pilih Data File" aria-describedby="button-addon1"
                                        value="${rowData.file_moa}">
                                </div>
                                <input type="text" class="form-control required" name="status_doc"
                                    id="status_doc" error="Status DOC" id="basic-icon-default-fullname"
                                    placeholder="Status DOC" aria-label="Status DOC"
                                    aria-describedby="basic-icon-default-fullname2" value="${rowData.status}"
                                    readonly />
                            </td>
                    `;
                    row += `
                        <td>
                            <input type="text" class="form-control required" name="nomor_moa"
                                id="nomor_moa" error="Nomor moa" id="basic-icon-default-fullname"
                                placeholder="Nomor moa" aria-label="Nomor moa"
                                aria-describedby="basic-icon-default-fullname2"
                                value="${rowData.nomor_moa}" />
                                <br/>
                            <input type="text" class="form-control required" name="judul_moa"
                                id="judul_moa" error="Judul MoA" id="basic-icon-default-fullname"
                                placeholder="Judul MoA" aria-label="Judul MoA"
                                aria-describedby="basic-icon-default-fullname2"
                                value="${rowData.judul_moa}" />
                        </td>
                    `;
                    row += `
                            <td>
                                <input type="text" class="form-control required mb-2"
                                    name="kerja_sama_dengan" id="kerja_sama_dengan"
                                    error="Kerja Sama Dengan" id="basic-icon-default-fullname"
                                    placeholder="Kerja Sama Dengan" aria-label="Kerja Sama Dengan"
                                    aria-describedby="basic-icon-default-fullname2"
                                    value="${rowData.kerja_sama_dengan}" />
                                <div class="input-group mb-2">
                                    <button class="btn btn-outline-primary" type="button"
                                        id="button-addon1"
                                        onclick="DokumenMoa.showDataProdi(this,'relevansi_prodi${rowData.id}')">Pilih</button>
                                    <input id="relevansi_prodi" src="" type="text"
                                        class="form-control relevansi_prodi${rowData.id} required" placeholder="Pilih Prodi"
                                        error="Relevansi Prodi" aria-label="Pilih Prodi" aria-describedby="button-addon1"
                                        value="${rowData.relevansi_prodi_moa.id} - ${rowData.relevansi_prodi_moa.nama_prodi}"
                                        readonly>
                                </div>
                            </td>
                    `;
                    row += `
                        <td>
                            <div class="input-group">
                                <input id="tanggal_dibuat" name="tanggal_dibuat" type="date"
                                    class="form-control required" error="Tanggal Dibuat"
                                    value="${rowData.tanggal_dibuat}">
                                    <span class="btn btn-danger">S/D</span>
                                    <input id="tanggal_berakhir" name="tanggal_berakhir" type="date"
                                        class="form-control required" error="Tanggal Selesai"
                                        value="${rowData.tanggal_berakhir}">
                            </div>
                        </td>
                    `;
                    row += `
                    <td>
                        <div class="input-group mb-2">
                            <button class="btn btn-outline-primary" type="button"
                                id="button-addon1"
                                onclick="DokumenMoa.showDataKategori(this,'kategori_doc${rowData.id}')">Pilih</button>
                            <input id="kategori_doc" src="" type="text"
                                class="form-control kategori_doc${rowData.id} required" placeholder="Pilih kategori"
                                aria-label="Pilih kategori" aria-describedby="button-addon1"
                                error="Kategori"
                                value="${rowData.kategori_moa.id} - ${rowData.kategori_moa.nama_kategori}"
                                readonly>
                        </div>
                        <div class="input-group mb-2">
                            <button class="btn btn-outline-primary" type="button"
                                id="button-addon1"
                                onclick="DokumenMoa.showDataLevel(this,'level_doc${rowData.id}')">Pilih</button>
                            <input id="level_doc" src="" type="text"
                                class="form-control level_doc${rowData.id} required" placeholder="Pilih Level"
                                aria-label="Pilih Level" aria-describedby="button-addon1"
                                error="Level"
                                value="${rowData.level_doc_moa.id} - ${rowData.level_doc_moa.nama_level}"
                                readonly>
                        </div>
                        <input type="text" class="form-control required" name="jenis_doc"
                            id="jenis_doc" error="Jenis DOC" id="basic-icon-default-fullname"
                            placeholder="Jenis DOC" aria-label="Jenis DOC"
                            aria-describedby="basic-icon-default-fullname2"
                            value="6 - Memorandum of Agreement ( MOA)" readonly />
                    </td>
                    `;
                    row += `
                        <td>
                            <button class="btn btn-danger mb-2 btn-sm" type="button"
                                onclick="DokumenMoa.deleteItem(this, event)">
                                <i class="bx bx-trash"></i>
                            </button>
                            <button class="btn btn-warning mb-2" data_id="${rowData.id}" onclick="DokumenMoa.detail(this)">
                                <i class="fa fa-eye" ></i>
                            </button>
                        </td>
                    `;
                    row += "</tr>";

                    tableBody.append(row);
                });
            },
        });
    },
    kosongkan: () => {
        let role = User.getRole();
        $("#status").val(null);
        if (role == "Admin") {
            $("#prodi").val(null);
        }
        $("#level").val(null);
        $("#kategori").val(null);
        $("#tgl_mulai").val(null);
        $("#tgl_selesai").val(null);
        $("#kerja_sama").val(null);
        $("#judul_moa").val(null);

        const select2 = $(".select2");
        if (select2.length) {
            select2.each(function () {
                var $this = $(this);
                $this.wrap('<div class="position-relative"></div>').select2({
                    placeholder: "Pilih Data",
                    dropdownParent: $this.parent(),
                    value: "",
                });
            });
        }

        DokumenMoa.getData();
    },
    confirmDownload: (fileName, filePath) => {
        Swal.fire({
            title: "Apakah Anda Yakin?",
            text: `Anda akan mengunuduh data file ${fileName}.docx ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya, Download!",
        }).then((result) => {
            if (result.value) {
                let url_path = `${filePath}`;
                window.location.href = url.base_url(url_path);
            }
        });
    },
    resetDataMou: (elm) => {
        $("#nomor_mou").val("");
        Toast.success("Informasi", "Anda berhasil mengkosongkan Data MoU");
    },
};

$(function () {
    DokumenMoa.getData();
    DokumenMoa.setTextEditor();
    DokumenMoa.setDate();
    DokumenMoa.select2All();
});
