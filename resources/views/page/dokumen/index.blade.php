<div class="row my-4">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <h3>Filter Data</h3>
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-sm-4 mb-3">
                                <label class="form-label" for="status">Status</label>
                                <select id="status" name="status" class="form-select select2" error="Status"
                                    data-allow-clear="true">
                                    <option value="">Semua</option>
                                    <option value="AKTIF">AKTIF</option>
                                    <option value="TIDAK AKTIF">TIDAK AKTIF</option>
                                </select>
                            </div>
                            <div class="col-sm-4 mb-3">
                                <label class="form-label" for="area">Prodi</label>
                                <select id="prodi" name="prodi" class="select2 form-select required" error="Area"
                                    data-allow-clear="true" {{ session('role') !='Admin' ? '' : '' }}>
                                    <option value="">prodi</option>
                                    @foreach ($list_prodi as $item)
                                    <option value="{{ $item->id }}" {{ session('prodi')==$item->nama_prodi ? 'selected'
                                        : '' }}>
                                        {{ $item->nama_prodi }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-sm-4 mb-3">
                                <label class="form-label" for="level">Level</label>
                                <select id="level" name="level" class="select2 form-select required" error="Area"
                                    data-allow-clear="true">
                                    <option value="">Level</option>
                                    @foreach ($list_level as $item)
                                    <option value="{{ $item->id }}">{{ $item->nama_level }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-sm-4 mb-3">
                                <label class="form-label" for="kategori">kategori</label>
                                <select id="kategori" name="kategori" class="select2 form-select required" error="Area"
                                    data-allow-clear="true">
                                    <option value="">kategori</option>
                                    @foreach ($list_kategori as $item)
                                    <option value="{{ $item->id }}">{{ $item->nama_kategori }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="col-sm-4 mb-3">
                                <label class="form-label">Mulai Tanggal</label>
                                <input type='text' id="tgl_mulai" class="form-control flatpickr" value=""
                                    placeholder="YYYY-MM-D">
                            </div>
                            <div class="col-sm-4 mb-3">
                                <label class="form-label">Sampai Tanggal</label>
                                <input type='text' id="tgl_selesai" class="form-control flatpickr" value=""
                                    placeholder="YYYY-MM-D">
                            </div>
                            <div class="col-sm-4 mb-3">
                                <label class="form-label">Kerja sama dengan</label>
                                <input type='text' id="kerja_sama" class="form-control" value=""
                                    placeholder="Masukan Kerjasama...">
                            </div>
                            <div class="col-sm-4 mb-3">
                                <label class="form-label">Judul MOU</label>
                                <input type='text' id="judul_mou" class="form-control" value=""
                                    placeholder="Judul MOU...">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mt-3">
                        <button onclick="DokumenMou.kosongkan()" class="dt-button create-new btn btn-danger"
                            tabindex="0" type="button">
                            <span><i class="bx bx-refresh me-sm-2"></i>
                                <span class="d-none d-sm-inline-block">Kosongkan</span></span>
                        </button>
                        <button onclick="DokumenMou.getData()" class="dt-button create-new btn btn-info" tabindex="0"
                            type="button">
                            <span><i class="bx bx-search me-sm-2"></i>
                                <span class="d-none d-sm-inline-block">Filter</span></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header text-end">
                @if (session('role') == 'Admin' || session('role') == 'kerjasama / sub humas')
                <button onclick="DokumenMou.add()" class="dt-button create-new btn btn-primary" tabindex="0"
                    aria-controls="DataTables_Table_0" type="button">
                    <span><i class="bx bx-plus me-sm-2"></i>
                        <span class="d-none d-sm-inline-block">Tambah
                            Baru</span></span>
                </button>
                @endif
            </div>
            <div class="card-body">
                <div class="table-responsive text-nowrap">
                    <table class="datatables-basic table table-bordered" id="table-data">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th class="text-center">Action</th>
                                <th>
                                    File
                                    <br>
                                    Status
                                </th>
                                <th>Nomor MOU</th>
                                <th>Judul MOU</th>
                                <th>Kerja Sama Dengan</th>
                                <th>Relevansi Prodi</th>
                                <th>
                                    Masa Berlaku Tanggal
                                </th>
                                <th>
                                    Kategori
                                    <br>
                                    Level
                                    <br>
                                    Jenis
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>




@section('scripts')
<script>
    let DokumenMou = {
    add: () => {
        window.location.href = {{ route('dokumen-mou/add') }};
    },
    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = {{ route('dokumen-mou/ubah') }} ;
        // "ubah?id=" + data_id;
    },
    back: () => {
        window.location.href = {{ route('dokumen-mou') }};
    },

    delete: (elm) => {
        let data_id = $(elm).attr("data_id");
        let nama_template = $(elm).attr("nama_template");

        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan menghapus data <b>${nama_template}</b> ini  ?</p>
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
            url: {{ route('dokumen-mou/delete') }},

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
            data: {
                id: $("input#id").val(),
                nomor_mou: $("#nomor_mou").val(),
                judul_mou: $("#judul_mou").val(),
                tanggal_dibuat: $("input#tanggal_dibuat").val(),
                tanggal_berakhir: $("input#tanggal_berakhir").val(),
                jenis: $("#jenis").val(),
                kategori: $("#kategori").val(),
                level: $("#level").val(),
                status: $("#status").val(),
                relevansi_prodi: $("#relevansi_prodi").val(),
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
                url: {{ route('dokumen-mou/submit') }} ,
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
                    url: {{ route('dokumen-mou/getData') }},
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
                            <button class="btn btn-danger btn-sm"  data_id="${data}" onclick="DokumenMou.delete(this, event)">
                            <i class="bx bx-trash" nama_template="${row.nama_template}"></i>
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
                            return `
                            ${
                                // jika prodinya kosong
                                row.relevansi_prodi == null
                                    ? ""
                                    : row.relevansi_prodi_mou.nama_prodi
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

    setTextEditor: () => {
        quill = new Quill("#keterangan", {
            placeholder: "Type Something...",
            modules: { toolbar: true },
            theme: "snow",
        });
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
                    DokumenMou.execUploadFile(files, src_file);

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
            url: {{ route('dokumen-mou/execUploadFile') }},

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

    showDataTemplate: (elm) => {
        let params = {};

        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url: {{ route('dokumen-mou/showDataTemplate') }},

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
                DokumenMou.getDataTemplate();
            },
        });
    },

    getDataTemplate: async () => {
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
                    url:{{ route('dokumen-mou/getData') }},
                    type: "GET",
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
                        data: "id",
                        render: (data, type, row, meta) => {
                            return `
    <i class="bx bx-edit" style = "cursor: pointer;" id_template = "${data}" nama_template = "${row.nama_template}" onclick = "DokumenMou.pilihDataTemplate(this)" ></ >
        `;
                        },
                    },
                    {
                        data: "nama_jenis",
                    },
                    {
                        data: "nama_template",
                    },
                    {
                        data: "file",
                    },
                    {
                        data: "keterangan",
                    },
                ],
            });
        }
    },

    pilihDataTemplate: (elm) => {
        let nama_template = $(elm).attr("nama_template");
        let id_template = $(elm).attr("id_template");
        $("#template_id").val(id_template);
        $("#template").val(nama_template);
        message.closeDialog();
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
                            <button onclick="DokumenMou.imageZoomIn('#image-pembelian')" class="btn btn-primary">Zoom In</button>
                            <button onclick="DokumenMou.imageZoomOut('#image-pembelian')" class="btn btn-danger">Zoom Out</button>
                        </div>
                    </div>
                </div>`;
            } else {
                html = `<div class="row g-3">
                    <div class="col-12">
                        <br/>
                        <iframe id="frame" src="${file}" width="100%" height="800"/>
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
        if (DokumenMou.zoomInit != 300) {
            DokumenMou.zoomInit = DokumenMou.zoomInit + 50;
        }

        $(elm).css({
            margin: "auto",
            width: `${DokumenMou.zoomInit}%`,
        });

        console.log(DokumenMou.zoomInit);
    },

    imageZoomOut: (elm) => {
        if (DokumenMou.zoomInit != 50) {
            DokumenMou.zoomInit = DokumenMou.zoomInit - 50;
        }

        $(elm).css({
            margin: "auto",
            width: `${DokumenMou.zoomInit}%`,
        });

        console.log(DokumenMou.zoomInit);
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
};

$(function () {
    DokumenMou.getData();
    DokumenMou.setTextEditor();
    DokumenMou.setDate();
    DokumenMou.select2All();
});

</script>
@endsection
