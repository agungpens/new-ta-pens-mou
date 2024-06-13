let BukuTelpon = {
    module: () => {
        return "karyawan/buku_telpon";
    },

    moduleApi: () => {
        return `api/${BukuTelpon.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(BukuTelpon.module()) + "add";
    },

    ubah: (elm) => {
        let nik = $(elm).data("nik");
        window.location.href =
            url.base_url(BukuTelpon.module()) + "ubah?nik=" + nik;
    },

    back: (elm) => {
        let type = $(elm).attr("from");
        if (type == "") {
            window.location.href =
                url.base_url(BukuTelpon.module()) + "index";
        } else {
            window.location.href =
                url.base_url(BukuTelpon.moduleProfile()) + "index";
        }
    },

    getData: () => {
        let tableData = $("table#table-data");
        tableData.DataTable().destroy();
        let params = {};
        params.area = $("#area").val();
        params.divisi = $("#divisi").val();
        params.departemen = $("#departemen").val();
        params.jabatan = $("#jabatan").val();
        params.status = $("#status").val();
        params.status_karyawan = $("#status_kry").val();

        if (tableData.length > 0) {
            let updateAction = $("#update").val();
            let deleteAction = $("#delete").val();

            tableData.DataTable({
                processing: true,
                serverSide: true,
                ordering: true,
                autoWidth: false,
                order: [[0, "desc"]],
                aLengthMenu: [
                    [25, 50, 100, -1],
                    [25, 50, 100, "Semua"],
                ],
                ajax: {
                    url: url.base_url(BukuTelpon.moduleApi()) + `getData`,
                    type: "POST",
                    data: params,
                    dataType: "json",
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {},
                columnDefs: [
                    {
                        targets: 0,
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
                        targets: [2, 3, 4],
                        orderable: false,
                    },
                ],
                columns: [
                    {
                        data: "NIK",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "NIK",
                        render: (data, type, row, meta) => {
                            let html = "";
                            if (updateAction == 1) {
                                html += `<button class="btn btn-warning" data-nik="${row.NIK}" onclick="BukuTelpon.ubah(this,'${row.NIK}')"><i class="bx bx-edit"></i></button>`;
                            }
                            return html;
                        },
                    },
                    {
                        data: "nama_lengkap",
                        render: (data, type, row, meta) => {
                            let html = `${row.nama_lengkap}<br>`;
                            html +=
                                row.tgl_keluar == "0000-00-00" ||
                                row.tgl_keluar == null
                                    ? `<span class="badge bg-success">Aktif</span>`
                                    : '<span class="badge bg-danger">Tidak Aktif</span>';
                            return html;
                        },
                    },
                    {
                        data: "area_kerja",
                        render: (data, type, row, meta) => {
                            return `
                                ${row.area_kerja}
                                <br> 
                                ${row.nama_divisi}
                                <br> 
                                ${row.nama_departemen}
                                <br> 
                                ${row.nama_jabatan}
                            `;
                        },
                    },
                    {
                        data: "telp_hp",
                        render: (data, type, row, meta) => {
                            return `
                                ${row.telp_operasional ?? row.telp_hp}
                            `;
                        },
                    },
                ],
                // dom:
                //     '<"row mx-2"' +
                //     '<"col-md-2"<"me-3"l>>' +
                //     '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
                //     ">t" +
                //     '<"row mx-2"' +
                //     '<"col-sm-12 col-md-6"i>' +
                //     '<"col-sm-12 col-md-6"p>' +
                //     ">",
                // buttons: [
                //     {
                //         extend: "collection",
                //         className:
                //             "btn btn-label-secondary dropdown-toggle mx-3",
                //         text: '<i class="bx bx-upload me-2"></i>Export',
                //         buttons: [
                //             {
                //                 extend: "excel",
                //                 text: '<i class="bx bx-file me-2" ></i>Excel',
                //                 className: "dropdown-item",
                //                 //   exportOptions: { columns: [2, 3, 4, 5] }
                //             },
                //         ],
                //     },
                // ],
            });
        }
    },

    getPostData: () => {
        let data = {
            nik: $("input#nik").val(),
            no_hp: $.trim($("#no_hp").val()),
            no_operasional: $.trim($("#no_operasional").val()),
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = BukuTelpon.getPostData();

        $.ajax({
            type: "POST",
            dataType: "json",
            data: params,
            url: url.base_url(BukuTelpon.moduleApi()) + "submit",
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

    moduleLaporanAbsen: () => {
        return "laporan/absensi";
    },

    moduleLaporanAbsenApi: () => {
        return `api/${BukuTelpon.moduleLaporanAbsen()}`;
    },

    showListDepartemen: (elm) => {
        let params = {};
        params.divisi = $(elm).val();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(BukuTelpon.moduleLaporanAbsenApi()) + "showListDepartemen",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                let optionHtml = ``;
                for (let i = 0; i < resp.data.length; i++) {
                    let data = resp.data[i];
                    optionHtml += `<option value="${data.id}">${data.nama_departemen}</option>`;
                }
                $('#departemen').html(optionHtml);
            }
        });
    },

};

$(function () {
    BukuTelpon.getData();
    BukuTelpon.select2All();
});
