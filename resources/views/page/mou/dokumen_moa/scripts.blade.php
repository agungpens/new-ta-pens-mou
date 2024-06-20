<script>
    let DokumenMoa = {

    add: () => {
        window.location.href = `{{ route('dokumen-moa/add') }}`;
    },
    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = `{{ route('dokumen-moa') }}`+"/ubah?id=" + data_id;
    },
    detail: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = `{{ route('dokumen-moa') }}` + "/detail?id=" + data_id;
    },
    back: () => {
        window.location.href = `{{ route('dokumen-moa') }}`;
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
            url: `{{ route('dokumen-moa/delete') }}`,

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
    hilangkanMouDariMoa: (elm) => {
        let data_id = $(elm).attr("data_id");
        let kerja_sama_dengan = $(elm).attr("kerja_sama_dengan");
        let nomor_mou = $(elm).attr("nomor_mou");

        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan menghapus data <b>${kerja_sama_dengan}</b> ini  dari induk MOU sekarang ?</p>
        </div>
        <div class="col-12 text-center">
            <br>
            <button class="btn btn-primary btn-sm" onclick="DokumenMoa.hilangkanMouDariMoaConfirm(this, '${data_id}','${nomor_mou}')">Ya</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Tidak</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html,
        });
    },

    hilangkanMouDariMoaConfirm: (elm, id, nomor_mou) => {
        let params = {};
        params.id = id;
        params.user_id = user.getUserId();
        $.ajax({
            type: "POST",
            dataType: "json",
            data: params,
            url: `{{ route('dokumen-moa/updateData') }}`,

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
                        // close bootbox dialog

                        DokumenMoa.getDataMoa(nomor_mou);
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
    // Mendapatkan semua checkbox yang dipilih untuk relevansi_prodi
    let relevansi_prodi = [];
    $("input[name='relevansi_prodi[]']:checked").each(function() {
        relevansi_prodi.push($(this).val());
    });

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
            relevansi_prodi: relevansi_prodi, // Menggunakan array relevansi_prodi yang telah diisi
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
                url: `{{ route('dokumen-moa/submit') }}`,
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
                url: `{{ route('dokumen-moa/updated') }}`,
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
                searching: false, // Menonaktifkan fitur pencarian
                order: [[0, "desc"]],
                aLengthMenu: [
                    [25, 50, 100],
                    [25, 50, 100],
                ],
                ajax: {
                    url: `{{ route('dokumen-moa/getData') }}`,
                    type: "POST",
                    data: params,

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

                            let role = User.getRole();
                                    if (role == 'Admin' || role == 'kerjasama / sub humas') {
                                        return `
                                            <button class="btn btn-warning mb-2" data_id="${data}" onclick="DokumenMoa.detail(this)">
                                                <i class="fa fa-edit" ></i>
                                            </button>
                                        `;
                                    }
                                    return `
                                        <button class="btn btn-warning mb-2" data_id="${data}" onclick="DokumenMoa.detail(this)">
                                            <i class="fa fa-eye"></i>
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
                        if (!data || data.length === 0) {
                        return "";
                        }

                        let html = "<ul>";
                            data.forEach(prodi => {
                            html += `<li>${prodi}</li>`;
                            });
                            html += "</ul>";

                        return html;
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
                            ${row.kategori_moa} <br>
                            ${row.level_moa} <br>
                            ${row.jenis_doc}
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

        let path = $(elm).attr("path");
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
        let path = $(elm).attr("path");
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
            url: `{{ route('dokumen-moa/execUploadFile') }}`,

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
            url: `{{ route('dokumen-moa/showDataMou') }}`,

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
                    url: `{{ route('dokumen-moa/getDataMou') }}`,
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
        // DokumenMoa.changeDataMou();
        DokumenMoa.getDataMoa(nomor_mou);
        message.closeDialog();
    },

    showDataKategori: (elm, id_text) => {
        let params = {};

        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url: `{{ route('dokumen-moa/showDataKategori') }}`,

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
                    url:`{{ route('kategori-doc/getData') }}`,
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
            url: `{{ route('dokumen-moa/showDataLevel') }}`,

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
                    url: `{{ route('level-doc/getData') }}`,
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
            url: `{{ route('dokumen-moa/showDataProdi') }}`,

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
                    url: `{{ route('prodi/getData') }}`,
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
    let accordion = $("#accordionPanelsStayOpenExample");

    $.ajax({
        type: "POST",
        url: `{{ route('dokumen-moa/getDataProdi') }}`,
        dataType: "json",
        success: function (response) {
            let listDataProdi = '';

            $.each(response.data, function (indexInArray, valueOfElement) {
                listDataProdi += `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="prodi_${valueOfElement.id}"
                        name="relevansi_prodi[]" value="${valueOfElement.id}">
                    <label class="form-check-label" for="prodi_${valueOfElement.id}">
                        ${valueOfElement.nama_prodi}
                    </label>
                </div>
                `;
            });

            let html = `
            <div class="accordion-item" data-id="">
                <h2 class="accordion-header" id="heading${i}">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${i}"
                        aria-expanded="true" aria-controls="collapse${i}">
                        FORM DATA MoA #${i + 1}
                    </button>
                </h2>
                <div id="collapse${i}" class="accordion-collapse collapse show" aria-labelledby="heading${i}">
                    <div class="accordion-body">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Upload File MoA (*)</label>
                                <div class="input-group">
                                    <button class="btn btn-outline-primary" type="button"
                                        onclick="DokumenMoa.addFileOutTable(this)">Pilih</button>
                                    <input id="file" type="text" readonly class="form-control required" error="File"
                                        placeholder="Pilih Data File" value="">
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Jenis Dokumen (*)</label>
                                <input type="text" class="form-control required mb-2" name="jenis_doc" id="jenis_doc"
                                    error="Jenis DOC" placeholder="Jenis DOC" value="6 - Memorandum of Agreement ( MOA)" readonly />
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Nomor Moa</label>
                                <input type="text" id="nomor_moa" class="form-control required" error="Nomor Moa"
                                    placeholder="Nomor Moa">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Kerja Sama Dengan</label>
                                <input type="text" id="kerja_sama_dengan" class="form-control required" error="Kerjasama Dengan"
                                    placeholder="Kerjasama Dengan">
                            </div>
                            <div class="col-md-12 mb-3">
                                <label class="form-label">Judul MOA</label>
                                <textarea class="form-control required" error="Judul MoA" placeholder="Judul MoA" name="judul_moa"
                                    id="judul_moa" cols="10" rows="5"></textarea>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Tanggal Dibuat</label>
                                <input type="date" id="tanggal_dibuat" class="form-control flatpickr tgl_moa${i} required"
                                    error="Tanggal Dibuat" placeholder="YYYY-MM-DD" onchange="DokumenMoa.changeDate(this,'tgl_moa${i}')">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Tanggal Berakhir</label>
                                <input type="date" id="tanggal_berakhir" class="form-control flatpickr tgl_moa${i} required"
                                    error="Tanggal Berakhir" placeholder="YYYY-MM-DD" onchange="DokumenMoa.changeDate(this,'tgl_moa${i}')">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Pilih Kategori DOC / Jenis Mitra DOC</label>
                                <div class="input-group mb-2">
                                    <button class="btn btn-outline-primary" type="button"
                                        onclick="DokumenMoa.showDataKategori(this,'kategori_doc${i}')">Pilih</button>
                                    <input id="kategori_doc" src="" type="text" class="form-control kategori_doc${i} required"
                                        placeholder="Pilih kategori" error="Kategori" value="" readonly>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Pilih Level Dokumen</label>
                                <div class="input-group mb-2">
                                    <button class="btn btn-outline-primary" type="button"
                                        onclick="DokumenMoa.showDataLevel(this,'level_doc${i}')">Pilih</button>
                                    <input id="level_doc" src="" type="text" class="form-control level_doc${i} required"
                                        placeholder="Pilih Level" error="Level" value="" readonly>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Status Dokumen</label>
                                <select id="status_doc" name="status_doc" class="form-select select2 tgl_moa${i} required"
                                    data-allow-clear="true" error="status">
                                    <option value="AKTIF">AKTIF</option>
                                    <option value="TIDAK AKTIF">TIDAK AKTIF</option>
                                </select>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Relevansi Prodi (Opsional)</label>
                                <div class="mb-3">
                                    ${listDataProdi}
                                </div>
                            </div>
                            <div class="col-md-12 mb-3">
                                <button class="btn btn-warning btn-sm" type="button" onclick="DokumenMoa.deleteItem(this, event)">
                                    <i class="bx bx-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

            accordion.append(html);
            DokumenMoa.index++;
        }
    });
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
        $(elm).closest('.accordion-item').remove();
        e.preventDefault();
    },

    getPostdataDocMoa: () => {
    let data = [];
    let accordionItems = $("#accordionPanelsStayOpenExample").find(".accordion-item");
    $.each(accordionItems, function () {
        let accordionItem = $(this);
        let params = {};

        params.id = accordionItem.attr("data-id");

        params.file = accordionItem.find("input#file").attr("src");
        params.tipe = accordionItem.find("input#file").attr("tipe");
        params.file_name = accordionItem.find("input#file").val();

        params.status_doc = accordionItem.find("select#status_doc").val();
        params.nomor_moa = accordionItem.find("input#nomor_moa").val();
        params.judul_moa = accordionItem.find("textarea#judul_moa").val();
        params.kerja_sama_dengan = accordionItem.find("input#kerja_sama_dengan").val();

        // Mengambil data dari checkbox
        let relevansiProdi = [];
        accordionItem.find("input[name='relevansi_prodi[]']:checked").each(function () {
            relevansiProdi.push($(this).val());
        });
        params.relevansi_prodi = relevansiProdi;

        params.tanggal_dibuat = accordionItem.find("input#tanggal_dibuat").val();
        params.tanggal_berakhir = accordionItem.find("input#tanggal_berakhir").val();
        params.kategori_doc = accordionItem.find("input#kategori_doc").val();
        params.level_doc = accordionItem.find("input#level_doc").val();
        params.jenis_doc = accordionItem.find("input#jenis_doc").val();

        data.push(params);
    });

    return data;
},


getDataMoa: (nomor_mou) => {
    $.ajax({
        type: "POST",
        url: `{{ route('dokumen-moa/getDataMoaWithNomorMou') }}`,
        data: {
            nomor_mou: nomor_mou,
        },
        dataType: "json",
        success: function (response) {
            let data = response.data;
            let accordion = $("#accordionPanelsStayOpenExample");

            // Clear existing accordion content
            accordion.empty();

            // Populate the accordion with data
            $.each(data, function (index, rowData) {
                // AJAX call to get the list of all prodi
                $.ajax({
                    type: "POST",
                    url: `{{ route('dokumen-moa/getDataProdi') }}`,
                    dataType: "json",
                    success: function (responseProdi) {
                        let listDataProdi = '';
                        $.each(responseProdi.data, function (indexInArray, prodi) {
                            // Check if the prodi.id is in the rowData.relevansi_prodi array
                            let isChecked = rowData.relevansi_prodi && rowData.relevansi_prodi.includes(prodi.nama_prodi) ? 'checked' : '';
                            listDataProdi += `
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="prodi_${prodi.id}"
                                        name="relevansi_prodi[]" value="${prodi.id}" ${isChecked}>
                                    <label class="form-check-label" for="prodi_${prodi.id}">
                                        ${prodi.nama_prodi}
                                    </label>
                                </div>
                            `;
                        });
                        let html = `
                            <div class="accordion-item" data-id="${rowData.id}">
                                <h2 class="accordion-header" id="heading${index}">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                                        FORM DATA MoA #${index + 1}
                                    </button>
                                </h2>
                                <div id="collapse${index}" class="accordion-collapse collapse show" aria-labelledby="heading${index}">
                                    <div class="accordion-body">
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Upload File MoA (*)</label>
                                                <div class="input-group">
                                                    <button class="btn btn-outline-primary" type="button" onclick="DokumenMoa.addFileOutTable(this)">Pilih</button>
                                                    <input id="file" type="text" readonly class="form-control required" error="File" placeholder="Pilih Data File" value="${rowData.file_moa}">
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Jenis Dokumen (*)</label>
                                                <input type="text" class="form-control required mb-2" name="jenis_doc" id="jenis_doc" error="Jenis DOC" placeholder="Jenis DOC" value="6 - Memorandum of Agreement ( MOA)" readonly />
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Nomor Moa</label>
                                                <input type="text" id="nomor_moa" class="form-control required" error="Nomor Moa" placeholder="Nomor Moa" value="${rowData.nomor_moa}">
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Kerja Sama Dengan</label>
                                                <input type="text" id="kerja_sama_dengan" class="form-control required" error="Kerjasama Dengan" placeholder="Kerjasama Dengan" value="${rowData.kerja_sama_dengan}">
                                            </div>
                                            <div class="col-md-12 mb-3">
                                                <label class="form-label">Judul MOA</label>
                                                <textarea class="form-control required" error="Judul MoA" placeholder="Judul MoA" name="judul_moa" id="judul_moa" cols="10" rows="5">${rowData.judul_moa}</textarea>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Tanggal Dibuat</label>
                                                <input type="date" id="tanggal_dibuat" class="form-control flatpickr required" error="Tanggal Dibuat" placeholder="YYYY-MM-DD" value="${rowData.tanggal_dibuat}" onchange="DokumenMoa.changeDate(this,'tgl_moa${index}')">
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Tanggal Berakhir</label>
                                                <input type="date" id="tanggal_berakhir" class="form-control flatpickr required" error="Tanggal Berakhir" placeholder="YYYY-MM-DD" value="${rowData.tanggal_berakhir}" onchange="DokumenMoa.changeDate(this,'tgl_moa${index}')">
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Pilih Kategori DOC / Jenis Mitra DOC</label>
                                                <div class="input-group mb-2">
                                                    <button class="btn btn-outline-primary" type="button" onclick="DokumenMoa.showDataKategori(this,'kategori_doc${index}')">Pilih</button>
                                                    <input id="kategori_doc" src="" type="text" class="form-control kategori_doc${index} required" placeholder="Pilih kategori" error="Kategori" value="${rowData.kategori_moa_id} - ${rowData.kategori_moa}" readonly>
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Pilih Level Dokumen</label>
                                                <div class="input-group mb-2">
                                                    <button class="btn btn-outline-primary" type="button" onclick="DokumenMoa.showDataLevel(this,'level_doc${index}')">Pilih</button>
                                                    <input id="level_doc" src="" type="text" class="form-control level_doc${index} required" placeholder="Pilih Level" error="Level" value="${rowData.level_moa_id} - ${rowData.level_moa}" readonly>
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Status Dokumen</label>
                                                <select id="status_doc" name="status_doc" class="form-select select2 tgl_moa${index} required" data-allow-clear="true" error="status">
                                                    <option value="AKTIF" ${rowData.status_doc === "AKTIF" ? "selected" : ""}>AKTIF</option>
                                                    <option value="TIDAK AKTIF" ${rowData.status_doc === "TIDAK AKTIF" ? "selected" : ""}>TIDAK AKTIF</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Relevansi Prodi (Opsional)</label>
                                                <div class="mb-3">
                                                    ${listDataProdi}
                                                </div>
                                            </div>
                                            <div class="col-md-12 mb-3">
                                                <button class="btn btn-danger btn-sm" type="button" data_id="${rowData.id}" nomor_mou="${rowData.nomor_mou}" kerja_sama_dengan="${rowData.kerja_sama_dengan}" onclick="DokumenMoa.hilangkanMouDariMoa(this, event)">
                                                    <i class="bx bx-trash"></i> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;

                        accordion.append(html);
                    }
                });
            });
        }
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
                window.location.href = url_path;
            }
        });
    },
    resetDataMou: (elm) => {
        $("#nomor_mou").val("");
        Toast.success("Informasi", "Anda berhasil mengkosongkan Data MoU");
    },
    changeDate:(elm,ClassId)=>{
        let tanggal_dibuat = $(`#tanggal_dibuat.${ClassId}`).val();
        let tanggal_berakhir = $(`#tanggal_berakhir.${ClassId}`).val();

        if(tanggal_dibuat!= "" && tanggal_berakhir!= ""){
            if(tanggal_dibuat > tanggal_berakhir){
                $(`#tanggal_berakhir.${ClassId}`).val(tanggal_dibuat);
            }
            if(tanggal_dibuat < tanggal_berakhir){
                $(`select#status_doc.${ClassId}`).val('AKTIF').change();
            }
        }
    }
};

$(function () {
    DokumenMoa.getData();
    DokumenMoa.setTextEditor();
    DokumenMoa.setDate();
    DokumenMoa.select2All();
});

</script>
