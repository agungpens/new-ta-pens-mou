let PermintaanPembelian = {
    module: () => {
        return "new_purchasing/permintaan-pembelian";
    },

    moduleApi: () => {
        return `api/${PermintaanPembelian.module()}`;
    },

    add: () => {
        const typeVal = $("#type").val();
        let addUrl =
            url.base_url(PermintaanPembelian.module()) + "add?tipe=DOCT_PR";
        if (typeVal) {
            addUrl += "&type=" + typeVal;
        }
        window.location.href = addUrl;
    },

    addDoc: (elm, e) => {
        e.preventDefault();
        let tipe = $(elm).attr("tipe");
        window.location.href =
            url.base_url(PermintaanPembelian.module()) + "add?tipe=" + tipe;
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href =
            url.base_url(PermintaanPembelian.module()) + "ubah?id=" + data_id;
    },

    detail: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href =
            url.base_url(PermintaanPembelian.module()) + "detail?id=" + data_id;
    },

    detailWebView: (elm) => {
        let id = $(elm).data("id");
        let nik = $(elm).data("nik");
        let akses = $(elm).data("akses");
        let id_departemen = $(elm).data("id_departemen");
        window.location.href = `${url.base_url(
            PermintaanPembelian.module()
        )}detail-webview?id=${id}&nik=${nik}&akses=${akses}&id_departemen=${id_departemen}`;
    },

    back: () => {
        const typeVal = $("#type").val();
        let backUrl = url.base_url(PermintaanPembelian.module()) + "index";
        if (typeVal) {
            backUrl += "?type=" + typeVal;
        }
        window.location.href = backUrl;
    },

    backWebView: (elm) => {
        let nik = $(elm).data("nik");
        let akses = $(elm).data("akses");
        window.location.href = `${url.base_url(
            PermintaanPembelian.module()
        )}index-webview?nik=${nik}&akses=${akses}`;
    },

    getData: async () => {
        let tableData = $("table#table-data");
        tableData.DataTable().destroy();

        let params = {};
        params.type = $("#type").val();
        params.nik = $("#user_nik").val();
        params.akses = $("#user_akses").val();
        params.id_departemen = $("#user_id_departemen").val();
        params.id_divisi = $("#user_id_divisi").val();

        params.tgl_efektif = $("#tgl_efektif").val();
        params.departemen = $("#cb-departemen").val();
        params.area = $("#cb-area-kerja").val();
        params.approval = $("#cb-approval").val();
        params.status = $("#cb-status").val();
        params.requester = $(".cb-requester").val();
        params.verifikator = $("#verifikator").val();
        params.filterTipe = 'ya';


        if (tableData.length > 0) {
            let viewAction = $("#view").val();
            let insertAction = $("#insert").val();
            let updateAction = $("#update").val();
            let approveAction = $("#approve").val();
            let deleteAction = $("#delete").val();
            tableData.DataTable({
                processing: true,
                serverSide: true,
                ordering: true,
                stateSave: true,
                autoWidth: false,
                order: [[1, "desc"]],
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "Semua"],
                ],
                ajax: {
                    url:
                        url.base_url(PermintaanPembelian.moduleApi()) +
                        `getData`,
                    type: "POST",
                    data: params,
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {
                    if (data.status == "REJECT") {
                        // console.log(`${data.status} - ${dataIndex}`);
                        $(row).addClass("bg-danger text-white");
                    }
                    if (data.status == "REVISI") {
                        // console.log(`${data.status} - ${dataIndex}`);
                        $(row).addClass("bg-warning text-white");
                    }
                },
                columnDefs: [
                    {
                        targets: [0, 4, 5, 6, 7, 8, 9],
                        orderable: false,
                    },
                    {
                        targets: [1],
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
                ],
                columns: [
                    {
                        data: "id",
                        render: (data, type, row, meta) => {
                            let htmlAction = "";
                            if (viewAction == "1") {
                                htmlAction += `<button class="btn btn-warning" data_id="${data}" onclick="PermintaanPembelian.detail(this)"><i class="fa fa-eye"></i></button>`;
                            }
                            return htmlAction;
                        },
                    },
                    {
                        data: "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "pr_no",
                        render: (data, type, row, meta) => {
                            let label = ``;

                            // let jabatan_approval_history = ``;
                            // let jabatan_approval_waiting = ``;

                            // if((row.approved_by == '05137800001' || row.nik_approval_history == '05137800001') && [9,22].includes(row.departemen) ) { // PAK RONI SULTONIDDIN
                            //     jabatan_approval_history = 'DIREKSI'
                            //     jabatan_approval_waiting = 'DIREKSI'
                            // }else{
                            //     jabatan_approval_history = row.jabatan_approval_history
                            //     jabatan_approval_waiting = row.jabatan_approval
                            // }

                            if (row.status != "CREATED") {
                                if (row.status == "APPROVED") {
                                    label += `<span class="badge bg-label-success">Disetujui Oleh ${row.approval_history}</span>`;
                                }
                                if (row.status == "REJECT") {
                                    label += `<span class="badge bg-label-danger">Ditolak Oleh ${row.approval_history}</span>`;
                                }
                                if (row.status == "REVISI") {
                                    label += `<span class="badge bg-label-warning">Direvisi Oleh ${row.approval_history}</span>`;
                                }

                                if (row.status_akhir == "COMPLETE") {
                                    label += `<br><span class="badge bg-label-success">COMPLETED</span>`;
                                }
                                if (row.status != "SUBMIT REVISI") {
                                    label += `<br>`;
                                }
                            }

                            if (
                                row.state == "CREATED" ||
                                row.state == "WAITING"
                            ) {
                                label += `<span class="badge bg-label-warning">Menunggu Persetujuan dari ${row.approval} </span>`;
                            }

                            return `${row.pr_no}<br/>PIC: ${row.ditujukan_ke}<br/> ${label}`;
                        },
                    },
                    {
                        data: "tanggal_efektif",
                    },
                    // {
                    //     data: "ditujukan_ke",
                    // },
                    {
                        data: "nama_departemen",
                        render: (data, type, row, meta) => {
                            return `${row.nama_departemen}<br>${row.area}`;
                        },
                    },
                    {
                        data: "purpose",
                    },
                    // {
                    //     data: "status",
                    //     render: (data, type, row, meta) => {
                    //         let label = ``;

                    //         // let jabatan_approval_history = ``;
                    //         // let jabatan_approval_waiting = ``;

                    //         // if((row.approved_by == '05137800001' || row.nik_approval_history == '05137800001') && [9,22].includes(row.departemen) ) { // PAK RONI SULTONIDDIN
                    //         //     jabatan_approval_history = 'DIREKSI'
                    //         //     jabatan_approval_waiting = 'DIREKSI'
                    //         // }else{
                    //         //     jabatan_approval_history = row.jabatan_approval_history
                    //         //     jabatan_approval_waiting = row.jabatan_approval
                    //         // }

                    //         if (row.status != "CREATED") {
                    //             if (row.status == "APPROVED") {
                    //                 label += `<span class="badge bg-label-success">Disetujui Oleh ${row.approval_history}</span>`;
                    //             }
                    //             if (row.status == "REJECT") {
                    //                 label += `<span class="badge bg-label-danger">Ditolak Oleh ${row.approval_history}</span>`;
                    //             }
                    //             if (row.status == "REVISI") {
                    //                 label += `<span class="badge bg-label-warning">Direvisi Oleh ${row.approval_history}</span>`;
                    //             }

                    //             if (row.status_akhir == "COMPLETE") {
                    //                 label += `<br><span class="badge bg-label-success">COMPLETED</span>`;
                    //             }
                    //             if (row.status != "SUBMIT REVISI") {
                    //                 label += `<br>`;
                    //             }
                    //         }

                    //         if (
                    //             row.state == "CREATED" ||
                    //             row.state == "WAITING"
                    //         ) {
                    //             label += `<span class="badge bg-label-warning">Menunggu Persetujuan dari ${row.approval} </span>`;
                    //         }

                    //         return label;
                    //     },
                    // },
                    {
                        data: "remarks",
                    },
                    {
                        data: "requester",
                    },
                    {
                        data: "is_regilar",
                        render: (data, type, row, meta) => {
                            let htmlAction = "-";
                            if (row.is_regular != null) {
                                htmlAction =
                                    row.is_regular == 1
                                        ? `MRP/Regular`
                                        : `Irregular/Insidentil/Project`;
                            }
                            return htmlAction;
                        },
                    },
                    {
                        data: "tanggal_estimasi_pemakaian",
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
                scrollY: "500px",
                scrollX: true,
                scrollCollapse: true,
                fixedColumns: {
                    leftColumns: 5,
                    //rightColums:1
                },
            });
        }
    },

    setFilterStatusWebView: async (elm) => {
        let status = $(elm).data("status");

        $("#btnGroupDropStatus").html(status);

        $("#user_status").val(status);

        await PermintaanPembelian.getDataWebView();
    },

    setFilterApprovalWebView: async (elm) => {
        let approval = $(elm).data("approval");

        $("#btnGroupDropApproval").html(approval);

        $("#user_approval").val(approval);

        await PermintaanPembelian.getDataWebView();
    },

    getDataWebView: async () => {
        let tableData = $("table#table-data-webview");
        tableData.DataTable().destroy();

        var nik = $("#user_nik").val();
        var id_departemen = $("#user_id_departemen").val();
        var akses = $("#user_akses").val();
        var id_divisi = $("#user_id_divisi").val();
        var status = $("#user_status").val();
        var approval = $("#user_approval").val();

        let params = {};
        params.nik = nik;
        params.akses = akses;
        params.id_departemen = id_departemen;
        params.id_divisi = id_divisi;
        params.status = status;
        params.approval = approval;

        if (tableData.length > 0) {
            let updateAction = $("#update").val();
            let approveAction = $("#approve").val();
            let deleteAction = $("#delete").val();
            tableData.DataTable({
                processing: true,
                serverSide: true,
                ordering: true,
                stateSave: true,
                autoWidth: false,
                // "order": [
                //     [1, 'desc']
                // ],
                aLengthMenu: [
                    [25, 50, 100],
                    [25, 50, 100],
                ],
                ajax: {
                    url:
                        url.base_url(PermintaanPembelian.moduleApi()) +
                        `getData`,
                    type: "POST",
                    data: params,
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {
                    if (data.status == "REJECT") {
                        $(row).addClass("bg-danger text-white");
                    }
                    if (data.status == "REVISI") {
                        $(row).addClass("bg-warning text-white");
                    }
                },
                columnDefs: [],
                columns: [
                    {
                        data: "id",
                        render: (data, type, row, meta) => {
                            // let htmlAction = '';
                            // if (updateAction == '1' || approveAction == '1') {
                            //     htmlAction += `<button class="btn btn-warning" data_id="${data}" onclick="PermintaanPembelian.detail(this)"><i class="fa fa-eye"></i></button>`;
                            // }
                            // return htmlAction;

                            let label = ``;
                            if (row.status != "CREATED") {
                                if (row.status == "APPROVED") {
                                    label += `<span class="badge bg-label-success">Disetujui Oleh ${row.approval_history}</span>`;
                                }
                                if (row.status == "REJECT") {
                                    label += `<span class="badge bg-label-danger">Ditolak Oleh ${row.approval_history}</span>`;
                                }
                                if (row.status == "REVISI") {
                                    label += `<span class="badge bg-label-warning">Direvisi Oleh ${row.approval_history}</span>`;
                                }

                                if (row.status_akhir == "COMPLETE") {
                                    label += `<br><span class="badge bg-label-success">COMPLETED</span>`;
                                }
                                if (row.status != "SUBMIT REVISI") {
                                    label += `<br>`;
                                }
                            }

                            if (
                                row.state == "CREATED" ||
                                row.state == "WAITING"
                            ) {
                                label += `<span class="badge bg-label-warning">Menunggu Persetujuan dari ${row.approval} </span>`;
                            }

                            label = `PIC: ${row.ditujukan_ke}<br/> ${label}`;

                            let remarks = "";

                            if (row.remarks) {
                                remarks = `<br>Catatan : ${row.remarks}`;
                            }

                            return `<div data-id="${data}" data-nik="${nik}" data-akses="${akses}" data-id_departemen="${id_departemen}" onclick="PermintaanPembelian.detailWebView(this)">
                                ${row.pr_no}
                                <br>
                                <small>${row.nama_departemen} - ${row.area}</small>
                                <br>
                                ${row.purpose}
                                <br>
                                ${label}
                                ${remarks}
                            </div>`;
                        },
                    },
                ],
                scrollY: "600px",
                scrollX: true,
                scrollCollapse: true,
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
            <button class="btn btn-primary btn-sm" onclick="PermintaanPembelian.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(PermintaanPembelian.moduleApi()) + "delete",

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

    getPostdataItem: () => {
        let data = [];
        let tableData = $("table#table-data-item")
            .find("tbody")
            .find("tr.input");
        $.each(tableData, function () {
            let tr = $(this);
            let params = {};
            params.id = tr.attr("data_id");

            params.kode_item = tr.find("input.erp_kode_item").val();
            params.nama_item = tr.find("input#nama_item").val();
            params.spec_item = tr.find("textarea#spec_item").val();
            params.jumlah = tr.find("input#jumlah").val();
            params.satuan = tr.find("input#satuan").val();
            params.remarks = tr.find("textarea#remarks").val();
            params.file = tr.find("input#file").attr("src");
            params.tipe = tr.find("input#file").attr("tipe");
            params.status_barang = tr.find("#status_barang").val();
            params.ket_barang = tr.find("#keterangan-barang").text().trim();

            // collect multi eta data
            // if(tr.find('#container_eta')){
            //     params.multi_eta = '';
            //     let multiEta = tr.find('#container_eta').find('.tgl_eta');
            //     let etaArr   = []
            //     $.each(multiEta, function () {
            //         let eta = $(this).val();
            //         etaArr.push(eta);
            //     })

            //     if(etaArr.length) {
            //         params.tgl_eta = etaArr.join(',');
            //     }
            // }

            data.push(params);
        });

        return data;
    },

    getPostdataLampiran: () => {
        let data = [];
        let tableData = $("table#table-data-file")
            .find("tbody")
            .find("tr.input");
        $.each(tableData, function () {
            let tr = $(this);
            let params = {};
            params.file = tr.find("input#file").attr("src");
            params.tipe = tr.find("input#file").attr("tipe");
            params.keterangan = tr.find("input#keterangan").val();
            params.is_utama = tr.find("input#is_utama:checked").length;
            data.push(params);
        });

        return data;
    },

    getPostData: () => {
        let data = {
            data: {
                id: $("input#id").val(),
                tipe: $.trim($("#tipe").val()),
                type: $("#type").val(),
                purpose: $("#purpose").val(),
                spec: $("#spec").val(),
                departemen: $.trim($("#departemen").val()),
                area_kerja: $.trim($("#area_kerja").val()),
                tgl_efektif: $.trim($("#tgl_efektif").val()),
                atasan: $.trim($("#atasan").val()),
                manajer: $.trim($("#manajer").val()),
                gm: $.trim($("#gm").val()),
                direksi: $.trim($("#direksi").val()),
                verfikator: $.trim($("#verfikator").val()),
                is_regular: $("#is_regular").val(),
                tanggal_estimasi_pemakaian: $(
                    "#tanggal_estimasi_pemakaian"
                ).length ? $(
                    "#tanggal_estimasi_pemakaian"
                ).val() : '',
            },
            data_item: PermintaanPembelian.getPostdataItem(),
            data_lampiran: PermintaanPembelian.getPostdataLampiran(),
            nik: $("#user_nik").val(),
            akses: $("#user_akses").val(),
            id: $("#id").val() ?? "",
        };
        return data;
    },

    // changeTanggalEta: (elm, e) => {
    //     const tgl_eta = $("#tanggal_estimasi_pemakaian").val()
    //     let tableData = $("table#table-data-item")
    //         .find("tbody")
    //         .find("tr.input");
    //     $.each(tableData, function () {
    //         tr.find("input#tgl_eta").val(tgl_eta);
    //     });
    // },

    submit: (elm, e) => {
        e.preventDefault();
        let params = PermintaanPembelian.getPostData();

        // console.log(params);return;
        let form = $(elm).closest("div.row");

        if (params.data_item.length == 0) {
            Toast.error("Informasi", "Item Harus Diisi");
            return;
        }

        if (params.data_lampiran.length == 0 && params.id == "") {
            // jiika kondisi resivi maka lampiran tidak wajib
            Toast.error("Informasi", "Lampiran Harus Diisi");
            return;
        }
        if (validation.runWithElement(form)) {
            // console.log(params);return;
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url: url.base_url(PermintaanPembelian.moduleApi()) + "submit",
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

    getPostdataItemRevisi: () => {
        let data = [];
        let tableData = $("table#table-data-item")
            .find("tbody")
            .find("tr.input");
        $.each(tableData, function () {
            let tr = $(this);
            let params = {};
            params.id = tr.attr("data_id");

            params.remarks = tr.find("textarea#remarks").val();
            params.tgl_eta = tr.find("input#tgl_eta").val();
            data.push(params);
        });

        return data;
    },

    getPostDataRevisi: () => {
        let data = {
            data: {
                id: $("input#id").val(),
            },
            data_item: PermintaanPembelian.getPostdataItemRevisi(),
        };
        return data;
    },

    submitRevisi: (elm, e) => {
        e.preventDefault();
        let params = PermintaanPembelian.getPostDataRevisi();

        // console.log(params);return;

        let form = $(elm).closest("div.row");

        if (validation.runWithElement(form)) {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url:
                    url.base_url(PermintaanPembelian.moduleApi()) +
                    "submitRevisi",
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

    getPostdataItemPrePR: () => {
        let data = [];
        let tableData = $("table#table-data-item")
            .find("tbody")
            .find("tr.input");
        $.each(tableData, function () {
            let tr = $(this);
            let params = {};

            let est_biaya = tr.find("input.est_biaya").val();
            let est_biaya_max = tr.find("input.est_biaya_max").val();

            // est_biaya = parseInt(est_biaya);
            // est_biaya_max = parseInt(est_biaya_max);

            if (
                est_biaya != "" &&
                est_biaya_max != null &&
                est_biaya_max != ""
            ) {
                if (est_biaya <= est_biaya_max) {
                    params.id = tr.find("input.pre_pr").val();
                    params.est_biaya = est_biaya;
                    params.est_biaya_max = est_biaya_max;
                    data.push(params);
                }
            }
        });

        return data;
    },

    getPostDataPrePR: () => {
        let data = {
            data: {
                id: $("input#id").val(),
                tipe: $.trim($("#tipe").val()),
                purpose: $.trim($("#purpose").val()),
                spec: $.trim($("#spec").val()),
                departemen: $.trim($("#departemen").val()),
                area_kerja: $.trim($("#area_kerja").val()),
                tgl_efektif: $.trim($("#tgl_efektif").val()),
            },
            data_item: PermintaanPembelian.getPostdataItemPrePR(),
            data_lampiran: PermintaanPembelian.getPostdataLampiran(),
        };
        return data;
    },

    submitPrePR: (elm, e) => {
        e.preventDefault();
        let params = PermintaanPembelian.getPostDataPrePR();

        let jumlah_item = (tableData = $("table#table-data-item")
            .find("tbody")
            .find("tr.input").length);

        // if (params.data_item.length != jumlah_item) {
        //     Toast.error(
        //         "Informasi",
        //         "Terdapat Estimasi Biaya Yang Melebih Batas"
        //     );
        //     return;
        // }
        if (params.data_lampiran.length == 0) {
            Toast.error("Informasi", "Lampiran Harus Diisi");
            return;
        }
        let form = $(elm).closest("div.row");
        if (validation.runWithElement(form)) {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url:
                    url.base_url(PermintaanPembelian.moduleApi()) +
                    "submitPrePR",
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

    reject: (elm, e) => {
        e.preventDefault();
        let data_id = $(elm).attr("data_id");
        let reject_tipe = $(elm).attr("data_tipe");
        let html = `<div class="row g-3">
        <div class="col-12">
            <br/>
            <label class="form-label" for="alasan">Keterangan</label>
            <input type="hidden" id="reject_tipe" value="${reject_tipe}">
            <textarea id="keterangan" name="keterangan" error="Keterangan" class="form-control required" rows="2" placeholder="Keterangan"></textarea>
        </div>
        <div class="col-12 text-end">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="PermintaanPembelian.rejectConfirm(this, '${data_id}')">Proses</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Batal</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html,
        });

        $(".bootbox-close-button").addClass("btn-close").text("");
    },

    date_diff_indays: function (date1, date2) {
        dt1 = new Date(date1);
        dt2 = new Date(date2);
        return Math.floor(
            (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
                Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
                (1000 * 60 * 60 * 24)
        );
    },

    approve: (elm, e) => {
        e.preventDefault();
        let html = `<div class="row g-3">
        <div class="col-12">
            <h4>Konfirmasi</h4>
            <p>Apa anda yakin untuk melanjutkan?</p>
        </div>
        <div class="col-12 text-end">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="PermintaanPembelian.approveConfirm(this, event)">Ya Lanjutkan</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Batal</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html,
        });

        $(".bootbox-close-button").addClass("btn-close").text("");
    },

    approveConfirm: (elm, e) => {
        e.preventDefault();

        // if ($('#tanggal_estimasi_pemakaian').length) {

        //     var tanggal_estimasi_pemakaian = $('#tanggal_estimasi_pemakaian').val();

        //     let givenDate1 = new Date(tanggal_estimasi_pemakaian)  // Past Date
        //     let givenDate2 = new Date()  // Past Date

        //     let diff = PermintaanPembelian.date_diff_indays(givenDate1, givenDate2);

        //     if (diff > 0) {
        //         Toast.error('Informasi', 'Tanggal estimasi pemakaian tidak valid, Tanggal harus lebih dari <u>tanggal sekarang</u>');
        //         return;
        //     }
        // }

        let params = PermintaanPembelian.getPostData();

        // console.log(params);return;

        params.keterangan = "";

        let form = $("div.form-pr");
        if (validation.runWithElement(form)) {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url: url.base_url(PermintaanPembelian.moduleApi()) + "approve",
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
                        Toast.success("Informasi", "Data Berhasil Diproses");
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
        }else{
            Toast.error('Informasi', 'Periksa kembali isian formulir kurang lengkap');
        }
    },

    rejectConfirm: (elm, data_id) => {
        let params = PermintaanPembelian.getPostData();

        params.nik = $("#user_nik").val();
        params.akses = $("#user_akses").val();
        params.reject_tipe = $("#reject_tipe").val();
        params.keterangan = $("#keterangan").val();

        $(
            ".status_barang, #is_regular, #tanggal_estimasi_pemakaian"
        ).removeClass("required");

        if (validation.run()) {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url: url.base_url(PermintaanPembelian.moduleApi()) + "approve",

                beforeSend: () => {
                    message.loadingProses("Proses Simpan Data");
                },

                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi", "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success("Informasi", "Berhasil");
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    } else {
                        Toast.error("Informasi", resp.message);
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
                    placeholder: "Select value",
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
                        url.base_url(PermintaanPembelian.moduleApi()) +
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
                            return `<a class="" style="cursor: pointer;" onclick="PermintaanPembelian.showDetailEditProfile(this, event)">${data}</a>`;
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
                                return `<label class="text-success">Terverifikasi</label>`;
                            } else {
                                if (row.status == "reject") {
                                    return `<label class="text-danger">Ditolak</label>`;
                                } else {
                                    if (row.tgl_approve == "") {
                                        return `<label class="text-primary">Proses Approval Perubahan</label>`;
                                    } else {
                                        return `<label class="">Proses Verifikasi</label>`;
                                    }
                                }
                            }
                        },
                    },
                    {
                        data: "lpp_id",
                        render: (data, type, row, meta) => {
                            return `
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="PermintaanPembelian.detailPerubahan(this)"></i>`;
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
        return `api/${PermintaanPembelian.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $("input#id").val();
        window.location.href =
            url.base_url(PermintaanPembelian.modulePerubahan()) +
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
                url.base_url(PermintaanPembelian.modulePerubahanApi()) +
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

    indexItem: 0,

    addItem: (elm, e) => {
        // <a href="javascript:;" onClick="PermintaanPembelian.showSpesifikasiStandar('#kodeItem${i}')"><small>Lihat Spesifikasi Standar</small></a>
        let i = PermintaanPembelian.indexItem;
        e.preventDefault();
        let tbody = $("#table-data-item").find("tbody");
        let dept = $("#dept").val();
        let eta = ``;
        // if (dept == 18) {
        //     eta = `<div id="container_eta">
        //         <div class="input-group mt-2">
        //         <input type="date" id="tgl_eta" name="tgl_eta" error="Tanggal ETA" class="tgl_eta form-control required" placeholder="YYYY-MM-DD" />
        //         <button class="btn btn-primary" type="button" onclick="PermintaanPembelian.tambahMultiEta(this)"><i class="fa fa-plus-circle"></i></button>
        //         </div>
        //     </div>`;
        // }
        let html = `<tr class="input" data_id="">
            <td>
                <div class="input-group">
                <button class="btn btn-outline-primary" type="button"
                    id="button-addon1"
                    onclick="PermintaanPembelian.showDataKodeItem(this,'kodeItem${i}')">Pilih</button>
                <input id="kodeItem${i}" type="text"
                    class="erp_kode_item form-control required" error="Kode Item"
                    placeholder="Pilih Kode Item" aria-label="Pilih Kode Item"
                    aria-describedby="button-addon1" readonly>
                    </div>
                    <input type="text" id="nama_item" name="nama_item" class="namakodeItem${i} form-control required mt-2"
                placeholder="Nama Barang" error="Nama Barang" value="" readonly/>
                <textarea id="spec_item" class="form-control speckodeItem${i} mt-2"
                placeholder="Spesifikasi Standar" rows="3" error="Spesifikasi Standar" readonly></textarea>
            </td>
            <td>
                <input type="number" id="jumlah" name="jumlah" class="form-control required"
                placeholder="Jumlah Barang" error="Jumlah Barang" value=""/>
                <input type="text" id="satuan" name="satuan" class="satuankodeItem${i} form-control required mt-2"
                placeholder="Satuan Barang" error="Satuan Barang" value="" readonly />
            </td>
            <td>
                <textarea id="remarks" name="remarks" class="form-control required"
                placeholder="Catatan" rows="5" error="Catatan"></textarea>
                <div class="form-text text-warning">Petunjuk : Detailkan spesifikasi barang atau jasa yang diminta. Deskripsikan spesifikasi warna, bentuk, ukuran, atau model. Tulis tanda "-" jika sudah sesuai dengan spesifikasi.</div>
            </td>
            <td>
                <button class="btn btn-danger" onclick="PermintaanPembelian.deleteItem(this, event)"><i class="bx bx-trash"></i></button>
            </td>
        </tr>`;
        tbody.append(html);

        PermintaanPembelian.indexItem++;
    },

    tambahMultiEta: (elm) => {
        let container = $(elm).closest('#container_eta');

        var new_elm =  `<div class="input-group mt-2">
        <input type="date" id="tgl_eta" name="tgl_eta" error="Tanggal ETA" class="tgl_eta form-control required" placeholder="YYYY-MM-DD" />
        <button class="btn btn-danger" type="button" onclick="this.parentElement.remove();"><i class="fa fa-trash-o"></i></button>
        </div>`;

        if (container.find('#tgl_eta').val() == '') {
            Toast.error("Informasi", "Tanggal Eta Sebelumnya Harus Diisi");
        }else{
            container.append(new_elm);
        }

    },

    showSpesifikasiStandar: (elm) => {
        let params = {};
        params.kodeItem = $(elm).val();

        if (params.kodeItem == undefined || params.kodeItem == "") {
            Toast.error("Informasi", "Kode Item Belum Dipilih");
            return;
        }

        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url:
                url.base_url(PermintaanPembelian.moduleApi()) +
                "showSpesifikasiStandar",

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

    indexItemPrePr: 0,

    addItemPrePr: (elm, e) => {
        let i = PermintaanPembelian.indexItemPrePr;
        e.preventDefault();
        let tbody = $(elm).closest("tbody");

        let html = `<tr>
                        <td>
                            <input type="text" class="pre_pr pre_pr_id${i}" value="">
                            <button onclick="PermintaanPembelian.showDataPengajuanPrePr(this, 'pre_pr_id${i}','nama_item${i}', 'jumlah${i}', 'est_biaya${i}', 'satuan${i}', 'vendor_id${i}', 'remarks${i}', 'img_file${i}' )" class="btn_add${i} btn btn-danger">Ambil</button>
                        </td>
                        <td>
                            <p class="nama_item${i}"></p>
                        </td>
                        <td>
                            <p class="jumlah${i}"></p>
                        </td>
                        <td>
                            <p class="est_biaya${i}"></p>
                        </td>
                        <td>
                            <p class="satuan${i}"></p>
                        </td>
                        <td>
                            <p class="vendor_id${i}"></p>
                        </td>
                        <td>
                            <p class="remarks${i}"></p>
                        </td>
                        <td>
                            <div class="input-group">
                                <button src="" class="img_file${i} btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showFile(this, event)">Lihat</button>
                            </div>
                        </td>
                        <td>
                            <i class="btn_del${i} bx bx-trash" style="cursor: pointer;" onclick="PermintaanPembelian.deleteItemPrePr(this, ${i})"></i>
                        </td>
                    </tr>`;

        tbody.prepend(html);

        PermintaanPembelian.indexItemPrePr++;
    },

    deleteItemPrePr: (elm, i) => {
        $(elm).closest("tr").remove();
    },

    indexBarangJasa: 0,

    addItemBarangJasa: (elm, e) => {
        let i = PermintaanPembelian.indexBarangJasa;

        e.preventDefault();
        let tbody = $(elm).closest("tbody");
        let html = `<tr class="input" data_id="">
            <td>
                <div class="input-group">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showDataKaryawan(this,'bj_nik${i}')">Pilih</button>
                    <input id="bj_nik" type="text" class="bj_nik${i} form-control" error="Karyawan" placeholder="Pilih Data Karyawan" aria-label="Pilih Data Karyawan" aria-describedby="button-addon1">
                </div>
            </td>
            <td>
                <div class="input-group">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showDataArea(this,'area${i}')">Pilih</button>
                    <input id="area" type="text" class="area${i} form-control" error="Area" placeholder="Pilih Data Area" aria-label="Pilih Data Area" aria-describedby="button-addon1">
                </div>
            </td>
            <td>
                <div class="input-group">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showDataJenis(this,'nama_item${i}')">Pilih</button>
                    <input id="nama_item" type="text" class="nama_item${i} form-control" error="Jenis" placeholder="Pilih Data Jenis" aria-label="Pilih Data Jenis" aria-describedby="button-addon1">
                </div>
            </td>
            <td>
                <input type="number" id="jumlah" name="jumlah" class="form-control required"
                placeholder="Jumlah" error="Jumlah" value=""/>
            </td>
            <td>
                <input type="text" id="satuan" name="satuan" class="form-control required"
                placeholder="Satuan" error="Satuan" value=""/>
            </td>
            <td>
                <div class="input-group">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showDataVendor(this,'vendor_id${i}')">Pilih</button>
                    <input id="vendor_id" type="text" class="vendor_id${i} form-control required" error="Vendor" placeholder="Pilih Data Vendor" aria-label="Pilih Data Vendor" aria-describedby="button-addon1" readonly>
                </div>
            </td>
            <td>
                <input type="text" id="remarks" name="remarks" class="form-control required"
                placeholder="Keterangan" error="Keterangan" value=""/>
            </td>
            <td>
                <div class="input-group">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.addFile(this)">Pilih</button>
                    <input id="file" type="text" readonly class="form-control" error="File" placeholder="Pilih Data File" aria-label="Pilih Data File" aria-describedby="button-addon1" value="">
                </div>
            </td>
            <td>
                <i class="bx bx-trash" style="cursor: pointer;" onclick="PermintaanPembelian.deleteItem(this, event)"></i>
            </td>
        </tr>`;
        tbody.prepend(html);

        PermintaanPembelian.indexBarangJasa++;
    },

    addLampiran: (elm, e) => {
        e.preventDefault();
        let tbody = $("#table-data-file").find("tbody");
        let html = `<tr class="input" data_id="">
            <td>
                <div class="input-group">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.addFile(this)">Pilih</button>
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
                <button class="btn btn-danger" onclick="PermintaanPembelian.deleteItem(this, event)"><i class="bx bx-trash"></i></button>
            </td>
        </tr>`;
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
        }
    },

    showFile: (elm, e) => {
        e.preventDefault();

        // messageHandler.postMessage('message');

        let file = $(elm).attr("src");
        // let file = 'http://localhost/simi/public/assets/img/LOGOMOTASA.png';
        // let html = `<div class="row g-3">
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
                            <button onclick="PermintaanPembelian.imageZoomIn('#image-pembelian')" class="btn btn-primary">Zoom In</button>
                            <button onclick="PermintaanPembelian.imageZoomOut('#image-pembelian')" class="btn btn-danger">Zoom Out</button>
                        </div>
                    </div>
                </div>`;
            } else {
                html = `<div class="row g-3">
                <div class="col-12">
                Salin Url Lampiran : <br> <small>${file}</small>
                </div>
                        <div class="col-12">
                        <br/>
                        <iframe title="File" id="frame" src="${file}" width="100%" height="800" allowfullscreen="true">
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

    showFileWebView: (elm, e) => {
        e.preventDefault();
        
        let file = $(elm).attr("src");
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

            if (image) {
                tipe = 'image'
            } else {
                tipe = 'pdf';
            }
            
            showFile.postMessage(`${tipe}|${file}`);
            
        } catch (error) {
            alert("Gagal Mengakses File");
        }
    },

    zoomInit: 100,

    imageZoomIn: (elm) => {
        if (PermintaanPembelian.zoomInit != 300) {
            PermintaanPembelian.zoomInit = PermintaanPembelian.zoomInit + 50;
        }

        $(elm).css({
            margin: "auto",
            width: `${PermintaanPembelian.zoomInit}%`,
        });

        console.log(PermintaanPembelian.zoomInit);
    },

    imageZoomOut: (elm) => {
        if (PermintaanPembelian.zoomInit != 50) {
            PermintaanPembelian.zoomInit = PermintaanPembelian.zoomInit - 50;
        }

        $(elm).css({
            margin: "auto",
            width: `${PermintaanPembelian.zoomInit}%`,
        });

        console.log(PermintaanPembelian.zoomInit);
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
            PermintaanPembelian.barangDitolak(elm);
        } else if (status == "1") {
            PermintaanPembelian.barangReceived(elm);
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
            <button class="btn btn-primary btn-sm" onclick="PermintaanPembelian.rejectBarang(this, '${data_id}')">Proses</button>
            <button class="btn btn-sm" onclick="PermintaanPembelian.barangReceivedPop(this, '${data_id}')">Batal</button>
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

    // get pre pr
    // showDataPengajuanPrePr: (elm,pre_pr_id, item_name, qty, satuan, remarks, img_file) => {
    //     let params = {};

    //     $.ajax({
    //         type: 'POST',
    //         dataType: 'html',
    //         data: params,
    //         url: url.base_url(PermintaanPembelian.moduleApi()) + "showDataPengajuanPrePr",

    //         beforeSend: () => {
    //             message.loadingProses('Proses Pengambilan Data');
    //         },

    //         error: function () {
    //             message.closeLoading();
    //             Toast.error("Informasi", "Gagal");
    //         },

    //         success: function (resp) {
    //             message.closeLoading();
    //             bootbox.dialog({
    //                 message: resp,
    //                 size: 'large'
    //             });
    //             PermintaanPembelian.getDataPengajuanPrePr(pre_pr_id, item_name, qty, satuan, remarks, img_file);
    //         }
    //     });

    // },

    // getDataPengajuanPrePr: async (pre_pr_id, item_name, qty, satuan, remarks, img_file) => {
    //     let tableData = $('table#table-data-pengajuan-pre-pr');
    //     let params = {};

    //     let prePrId = [];

    //     $.each($('.pre_pr'), function(i){
    //         prePrId.push($(this).val());
    //     });

    //     if(prePrId.length){
    //         params.id = prePrId
    //     }

    //     if (tableData.length > 0) {
    //         tableData.DataTable({
    //             "processing": true,
    //             "serverSide": true,
    //             "ordering": true,
    //             "autoWidth": false,
    //             "order": [
    //                 [0, 'desc']
    //             ],
    //             "aLengthMenu": [
    //                 [10, 20, 50],
    //                 [10, 20, 50]
    //             ],
    //             "ajax": {
    //                 "url": url.base_url('api/purchasing/permintaan-pembelian') + `getDataPengajuanPrePr`,
    //                 "type": "POST",
    //                 "data": params
    //             },
    //             "deferRender": true,
    //             "createdRow": function (row, data, dataIndex) {
    //             },
    //             "columnDefs": [],
    //             "columns": [{
    //                     "data": "id",
    //                     render: function (data, type, row, meta) {
    //                         return meta.row + meta.settings._iDisplayStart + 1;
    //                     }
    //                 },
    //                 {
    //                     "data": "purpose",
    //                 },
    //                 {
    //                     "data": "item_name",
    //                 },
    //                 {
    //                     "data": "id",
    //                     "render": (data, type, row, meta) => {
    //                         return `<i class="bx bx-plus" style="cursor: pointer;"
    //                         data_id="${row.id}"
    //                         data_item_name="${row.item_name}"
    //                         data_qty="${row.qty}"
    //                         data_satuan="${row.satuan}"
    //                         data_remarks="${row.remarks}"
    //                         data_img_file="${row.img_file}"
    //                         onclick="PermintaanPembelian.pilihDataPengajuanPrePr(this,
    //                             '${pre_pr_id}',
    //                             '${item_name}',
    //                             '${qty}',
    //                             '${satuan}',
    //                             '${remarks}',
    //                             '${img_file}')"></i>`;
    //                     }
    //                 }
    //             ]
    //         });
    //     }

    // },

    showDataPengajuanPrePrItem: () => {
        let params = {};

        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url:
                url.base_url(PermintaanPembelian.moduleApi()) +
                "showDataPengajuanPrePrItem",

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
                PermintaanPembelian.getDataPengajuanPrePrItem();
            },
        });
    },

    getDataPengajuanPrePrItem: async () => {
        let tableData = $("table#table-data-pengajuan-pre-pr-item");
        let params = {};

        let prePrId = [];

        $.each($(".pre_pr"), function (i) {
            prePrId.push($(this).val());
        });

        if (prePrId.length) {
            params.id = prePrId;
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
                    url:
                        url.base_url("api/purchasing/permintaan-pembelian") +
                        `getDataPengajuanPrePrItem`,
                    type: "POST",
                    data: params,
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {},
                columnDefs: [],
                columns: [
                    {
                        data: "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "purpose",
                    },
                    {
                        data: "item_name",
                    },
                    {
                        data: "id",
                        render: (data, type, row, meta) => {
                            return `<i class="bx bx-plus" style="cursor: pointer;" 
                            data_id="${row.id}" 
                            data_purpose="${row.purpose}" 
                            data_item_name="${row.item_name}" 
                            data_qty="${row.qty}" 
                            data_est_biaya="${row.est_biaya}" 
                            data_satuan="${row.satuan}" 
                            data_vendor_id="${row.vendor_id}" 
                            data_remarks="${row.remarks}" 
                            data_img_file="${row.img_file}" 
                            onclick="PermintaanPembelian.pilihDataPengajuanPrePrItem(this)"></i>`;
                        },
                    },
                ],
            });
        }
    },

    pilihDataPengajuanPrePrItem: (elm) => {
        // pilihDataPengajuanPrePrItem: (elm, pre_pr_id, item_name, qty, satuan, remarks, img_file) => {
        let id_val = $(elm).attr("data_id");
        let purpose_val = $(elm).attr("data_purpose");
        let item_name_val = $(elm).attr("data_item_name");
        let qty_val = $(elm).attr("data_qty");
        let est_biaya_val = $(elm).attr("data_est_biaya");
        let satuan_val = $(elm).attr("data_satuan");
        let vendor_id_val = $(elm).attr("data_vendor_id");
        let remarks_val = $(elm).attr("data_remarks");
        let img_file_val = $(elm).attr("data_img_file");

        let i = PermintaanPembelian.indexItemPrePr;

        let tbody = $("tbody.item");

        let html = `<tr class="input">
                        <td>
                            <input type="hidden" class="pre_pr form-control" value="${id_val}">
                            <small>${purpose_val}</small>
                            <p>${item_name_val}</p>
                        </td>
                        <td>
                            <p>${qty_val}</p>
                        </td>
                        <td>
                            <input type="number" class="est_biaya form-control" value="${est_biaya_val}" max="${est_biaya_val}">
                            <input type="hidden" class="est_biaya_max form-control" value="${est_biaya_val}">
                            <small class="text-danger">Estimasi maximal biaya. ${est_biaya_val}</small>
                        </td>
                        <td>
                            <p>${satuan_val}</p>
                        </td>
                        <td>
                            <div class="input-group">
                                <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showDataVendor(this,'vendor_id${i}')">Pilih</button>
                                <input id="vendor_id" type="text" class="vendor_id${i} form-control required" error="Vendor" placeholder="Pilih Data Vendor" aria-label="Pilih Data Vendor" aria-describedby="button-addon1">
                            </div>
                        </td>
                        <td>
                            <p>${remarks_val}</p>
                        </td>
                        <td>
                            <div class="input-group">
                                <button src="${url.base_url(
                                    "public/pengajuan_pre_pr"
                                )}${img_file_val}" class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showFile(this, event)">Lihat</button>
                            </div>
                        </td>
                        <td>
                            <i class="bx bx-trash" style="cursor: pointer;" onclick="PermintaanPembelian.deleteItemPrePr(this, ${i})"></i>
                        </td>
                    </tr>`;

        tbody.append(html);

        PermintaanPembelian.indexItemPrePr++;

        // $(`.${pre_pr_id}`).val(id_val);
        // $(`.${item_name}`).html(item_name_val);
        // $(`.${qty}`).html(qty_val);
        // $(`.${satuan}`).html(satuan_val);
        // $(`.${remarks}`).html(remarks_val);
        // $(`.${img_file}`).attr('src', `${url.base_url('public/pengajuan_pre_pr')}${img_file_val}`);

        message.closeDialog();
    },

    // get requester
    showDataKaryawan: (elm, id_text) => {
        let params = {};
        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url:
                url.base_url(PermintaanPembelian.moduleApi()) +
                "showDataKaryawan",

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
                PermintaanPembelian.getDataKaryawan(id_text);
            },
        });
    },

    getDataKaryawan: async (bindText) => {
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
                    url: url.base_url("api/master/karyawan") + `getData`,
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="PermintaanPembelian.pilihData(this,'${bindText}')"></i>`;
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
            url: url.base_url(PermintaanPembelian.moduleApi()) + "showDataArea",

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
                PermintaanPembelian.getDataArea(id_text);
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
                    [200, 300, 1000],
                    [200, 300, 1000],
                ],
                ajax: {
                    url:
                        url.base_url("api/purchasing/permintaan-pembelian") +
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama="${row.nama}" data_id="${data}" onclick="PermintaanPembelian.pilihDataArea(this,'${bindText}')"></i>`;
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
    showDataJenis: (elm, id_text) => {
        let params = {};
        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url:
                url.base_url(PermintaanPembelian.moduleApi()) + "showDataJenis",

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
                PermintaanPembelian.getDataJenis(id_text);
            },
        });
    },

    getDataJenis: async (bindText) => {
        let tableData = $("table#table-data-jenis");
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
                    url:
                        url.base_url("api/purchasing/permintaan-pembelian") +
                        `getDataJenis`,
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama="${row.nama}" data_id="${data}" onclick="PermintaanPembelian.pilihDataJenis(this,'${bindText}')"></i>`;
                        },
                    },
                ],
            });
        }
    },

    pilihDataJenis: (elm, bindID) => {
        let nama = $(elm).attr("nama");
        let id = $(elm).attr("data_id");
        $("." + bindID).val(id + " - " + nama);
        message.closeDialog();
    },

    // get vendor
    showDataVendor: (elm, id_text) => {
        let params = {};
        $.ajax({
            type: "POST",
            dataType: "html",
            data: params,
            url:
                url.base_url(PermintaanPembelian.moduleApi()) +
                "showDataVendor",

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
                PermintaanPembelian.getDataVendor(id_text);
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
                    [200, 300, 1000],
                    [200, 300, 1000],
                ],
                ajax: {
                    url:
                        url.base_url("api/purchasing/permintaan-pembelian") +
                        `getDataVendor`,
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
                        data: "kode",
                    },
                    {
                        data: "label",
                    },
                    {
                        data: "id",
                        render: (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" label="${row.label}" data_id="${data}" onclick="PermintaanPembelian.pilihDataVendor(this,'${bindText}')"></i>`;
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

    // get kode item
    showDataKodeItem: (elm, id_text) => {
        let params = {};
        $.ajax({
            type: "GET",
            dataType: "html",
            data: params,
            url:
                url.base_url(PermintaanPembelian.moduleApi()) +
                "getViewKodeItem",
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
                PermintaanPembelian.getDataKodeItem(id_text);
            },
        });
    },

    getDataKodeItem: async (bindText) => {
        let tableData = $("table#table-data-kodeitem");
        let params = {};
        params.id = $("#id").val();
        params.type = $("#type").val();
        console.log("pp", params);
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
                        url.base_url(PermintaanPembelian.moduleApi()) +
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
                        targets: 1,
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
                        data: "bid",
                        render: (data, type, row, meta) => {
                            return `<button class="btn btn-outline-primary" data-kode="${
                                row.bkode
                            }" data-nama="${row.bnama
                                .replaceAll('"', "&#34;")
                                .replaceAll("'", "&#39;")}" data-spec="${
                                row.spesifikasi ? row.spesifikasi : "-"
                            }" data-satuan="${
                                row.bsatuan
                            }" onclick="PermintaanPembelian.pilihDataKodeItem(this,'${bindText}')">Pilih</button>`;
                        },
                    },
                    {
                        data: "bkode",
                    },
                    {
                        data: "bnama",
                        width: "30%",
                        render: (data, type, row, meta) => {
                            return `NAMA ITEM : ${
                                row.bnama
                            }<br><small>SATUAN : ${
                                row.bsatuan
                            }<br>FREKUENSI : ${
                                row.frekuensi
                            } x Pembelian<br>SPESIFIKASI <br>${
                                row.spesifikasi ? row.spesifikasi : "-"
                            }</small>`;
                            // return `NAMA ITEM : ${row.bnama}<br><small>SATUAN : ${row.bsatuan}<br>SPESIFIKASI <br>${row.spesifikasi ? row.spesifikasi : '-'}</small>`
                        },
                    },
                ],
            });
        }
    },

    pilihDataKodeItem: (elm, bindID) => {
        let kode = $(elm).attr("data-kode");
        let nama = $(elm).attr("data-nama");
        let spec = $(elm).attr("data-spec");
        let satuan = $(elm).attr("data-satuan");
        $("#" + bindID).val(`${kode}`);
        $(".nama" + bindID).val(`${nama}`);
        $(".spec" + bindID).val(`${spec}`);
        $(".satuan" + bindID).val(`${satuan}`);
        message.closeDialog();
    },
};

$(function () {
    if ($("#table-data").length) {
        PermintaanPembelian.getData();
    }
    if ($("#table-data-webview").length) {
        PermintaanPembelian.getDataWebView();
    }
    PermintaanPembelian.getDataLogKaryawan();
    PermintaanPembelian.setDate();
    PermintaanPembelian.select2All();
});
