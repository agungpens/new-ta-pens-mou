<script>
    let DokumenMou = {
        add: () => {
         // Hapus tombol download yang ada
            $("#modal-footer .download-button").remove();

            // Kosongkan nilai input dan elemen lainnya
            $("input#id").val('');
            $("input#nomor_mou").val('');
            $("textarea#judul_mou").val('');
            $("#tanggal_dibuat").val('');
            $("#tanggal_berakhir").val('');
            $("select#kategori_modal").val('').change();
            $("select#level_modal").val('').change();
            $("select#status_modal").val('').change();
            $("select#relevansi_prodi").val('').change();
            $("#kerja_sama_dengan").val('');
            $("input#file").val('');

            // Kosongkan semua checkbox Relevansi Prodi
            $("input[name='relevansi_prodi[]']").prop('checked', false);

            // Tampilkan modal
            $("#exampleModal").modal("show");
            },

    ubah: (elm) => {

        let data_id = $(elm).attr("data_id");
        let url = `{{ route('dokumen-mou/ubah') }}` ;
        $.ajax({
            type: "post",
            url: url,
            data: {
                id: data_id
            },
            dataType: "json",
            success: function(response) {
            if (response.is_valid) {
                let data = response.data;

                // Mengatur nilai input dan elemen lainnya berdasarkan respons dari server
                $("input#id").val(data.id);
                $("input#nomor_mou").val(data.nomor_mou);
                $("textarea#judul_mou").val(data.judul_mou);
                $("#tanggal_dibuat").val(data.tanggal_dibuat);
                $("#tanggal_berakhir").val(data.tanggal_berakhir);
                $("#jenis").val(data.jenis_doc);
                $("select#kategori_modal").val(data.kategori_mou.id).change();
                $("select#level_modal").val(data.level_doc_mou.id).change();
                $("select#status_modal").val(data.status).change();
                $("#kerja_sama_dengan").val(data.kerja_sama_dengan);
                $("input#file").attr("src", data.file);
                $("input#file").attr("tipe", data.tipe);
                $("input#file").val(data.nomor_mou + ' - ' + data.kerja_sama_dengan);
                $("#exampleModal").modal("show");

                // Menghapus semua centangan yang ada terlebih dahulu
                $("input[name='relevansi_prodi[]']").prop('checked', false);

                // Mencentang checkbox relevansi_prodi berdasarkan data yang diterima
                if (data.relevansi_prodi) {
                    let relevansiProdiArray = JSON.parse(data.relevansi_prodi);
                    if (Array.isArray(relevansiProdiArray)) {
                        relevansiProdiArray.forEach(prodiId => {
                            $(`#prodi_${prodiId}`).prop('checked', true);
                        });
                    }
                }

                // Hapus tombol download yang ada
                $("#modal-footer .download-button").remove();

                // Tambahkan tombol download
                const downloadButton = `
                    <button class="btn btn-primary me-2 download-button" onclick="return DokumenMou.confirmDownload('${data.file_mou}', '${data.file_path + data.file_mou}')">
                        <span><i class="bx bx-download me-sm-2"></i>
                            <span class="d-none d-sm-inline-block">Download File</span>
                        </span>
                    </button>`;

                // Tambahkan tombol download setelah tombol submit
                $("#submit-button").after(downloadButton);

            } else {
                Toast.error("Informasi", "Data Tidak Ditemukan");
            }
        }

        });


    },
    back: () => {
        window.location.href = `{{ route('dokumen-mou') }}`;
    },

    delete: (elm) => {
        let data_id = $(elm).attr("data_id");
        let judul_mou = $(elm).attr("judul_mou");
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan menghapus data <b>${judul_mou}</b> ini  ?</p>
        </div>
        <div class="col-12 text-center">
            <br>
            <button class="btn btn-primary btn-sm" onclick="DokumenMou.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: `{{ route('dokumen-mou/delete') }}`,

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
    let relevansiProdi = [];
    $("input[name='relevansi_prodi[]']:checked").each(function() {
        relevansiProdi.push($(this).val());
    });

    let data = {
        data: {
            id: $("input#id").val(),
            nomor_mou: $("#nomor_mou").val(),
            judul_mou: $("textarea#judul_mou").val(),
            tanggal_dibuat: $("input#tanggal_dibuat").val(),
            tanggal_berakhir: $("input#tanggal_berakhir").val(),
            jenis: $("select#jenis").val(),
            kategori: $("#kategori_modal").val(),
            level: $("#level_modal").val(),
            status: $("#status_modal").val(),
            relevansi_prodi: relevansiProdi,
            kerja_sama_dengan: $("#kerja_sama_dengan").val(),
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
        let params = DokumenMou.getPostData();
        let form = $(elm).closest("div.row");
        // return console.log(params);
        if (validation.runWithElement(form)) {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url: `{{ route('dokumen-mou/submit') }}` ,
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

        params.status = $("select#status").val();
        params.prodi = $("select#prodi").val();
        params.level = $("#level").val();
        params.kategori = $("#kategori").val();
        params.tanggal_dibuat = $("#tgl_mulai").val();
        params.tanggal_berakhir = $("#tgl_selesai").val();
        params.kerja_sama = $("#kerja_sama").val();
        params.judul_mou = $("#judul_mou").val();

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
                    url: `{{ route('dokumen-mou/getData') }}`,
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
                            let role = User.getRole();
                            if (role == "Admin") {
                                return `
                            <button class="btn btn-warning btn-sm mb-2" data_id="${data}" onclick="DokumenMou.ubah(this)">
                                <i class="bx bx-edit"></i>
                            </button>
                            <br>
                            <button class="btn btn-danger btn-sm"  judul_mou="${row.judul_mou}"  data_id="${data}" onclick="DokumenMou.delete(this, event)">
                            <i class="bx bx-trash"></i>
                            </button>
                                `;
                            }
                            return `
                            <button class="btn btn-warning btn mb-2" data_id="${data}" onclick="DokumenMou.ubah(this)">
                                <i class="fa fa-eye"></i>
                            </button>
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
                            ${row.kategori_mou} <br>
                            ${row.level_mou} <br>
                            ${row.jenis_doc}
                            `;
                        },
                    },
                ],
            });
        }
    },

    select2All: () => {
        // Default
        const select2 = $(".select2");
        if (select2.length) {
            select2.each(function () {
                var $this = $(this);
                $this.wrap('<div class="position-relative"></div>').select2({
                    placeholder: "Pilih Jenis",
                    dropdownParent: $this.parent(),
                });
            });
        }
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
            url: `{{ route('dokumen-mou/execUploadFile') }}`,

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
    kosongkan: () => {
        let role = User.getRole();
        if (role == "Admin") {
            $("#prodi").val(null);
        }
        $("#status").val(null);
        $("#level").val(null);
        $("#kategori").val(null);
        $("#tgl_mulai").val(null);
        $("#tgl_selesai").val(null);
        $("#kerja_sama").val(null);
        $("#judul_mou").val(null);

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

        DokumenMou.getData();
    },
    confirmDownload: (fileName, filePath) => {
        $("#exampleModal").modal("hide");
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
                window.open(url_path, "_blank");
            }
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
};

$(function () {
    DokumenMou.getData();
    DokumenMou.setDate();
    DokumenMou.select2All();
});

</script>
