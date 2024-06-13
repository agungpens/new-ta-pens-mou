let Cuti = {
    module: () => {
        return "transaksi/cuti";
    },

    moduleApi: () => {
        return `api/${Cuti.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(Cuti.module()) + "add";
    },

    back: () => {
        window.location.href = url.base_url(Cuti.module()) + "index";
    },

    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleManajer: () => {
        return "transaksi/cuti";
    },

    moduleKaryawanApi: () => {
        return `api/${Cuti.moduleKaryawan()}`;
    },

    moduleManajernApi: () => {
        return `api/${Cuti.moduleManajer()}`;
    },

    getData: async () => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();

        let params = {}
        params.status = $("#status").val()
        params.jenis_cuti = $("#jenis_cuti").val()
        params.tgl_cuti_mulai = $("#tgl_cuti_mulai").val()
        params.tgl_cuti_selesai = $("#tgl_cuti_selesai").val()
        params.departemen = $("#cb-departemen").val()
        params.area = $("#cb-area-kerja").val()
        params.nik = $.trim($('#nik').val())

        console.log('tableData', tableData);
        if (tableData.length > 0) {
            let updateAction = $('#update').val();
            let deleteAction = $('#delete').val();
            tableData.DataTable({
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
                    "url": url.base_url(Cuti.moduleApi()) + `getData`,
                    "type": "POST",
                    "data": params,
                    // "headers": {
                    //     'X-CSRF-TOKEN': `'${tokenApi}'`
                    // }
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                "columnDefs": [
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
                "fixedColumns": {
                    // left: 2,
                    right: 1
                },
                "columns": [{
                    "data": "nik",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    "data": "kode_transaksi",
                },
                {
                    "data": "jenis_cuti",
                    // "className" : "text-nowrap"
                },
                {
                    "data": "approved",
                    render: function (data, type, row, meta) {
                        //  console.log(data)
                        if (data == "APPROVED") {
                            return `<span class="badge bg-label-success">${data}</span>`;
                        } else if (data == "REJECTED") {
                            return `<span class="badge bg-label-danger">${data}</span> <br>Alasan : ${row.alasan_ditolak}`;
                        } else {
                            if (data == null || data == '') {
                                return `<span class="badge bg-label-warning">WAITING</span>`;
                            }
                            if (data == 'APPROVED HC') {
                                return `<span class="badge bg-label-success">APPROVED</span>`;
                            }
                            return `<span class="badge bg-label-info">${data}</span>`;
                        }
                    }
                },
                {
                    "data": "nik",
                },
                {
                    "data": "nama_lengkap",
                },
                {
                    "data": "nama_departemen",
                },
                {
                    "data": "area_kerja",
                },
                {
                    "data": "tgl_cuti",
                },
                {
                    "data": "lama_tanggal_cuti",
                },
                {
                    "data": "jumlah_hari",
                },
                {
                    "data": "keterangan_cuti",
                },
                {
                    "data": "pic_pengganti",
                    "render": (data, type, row, meta) => {
                        if (data === null) {
                            if (row.pic_shift_before === null && row.pic_shift_after === null) {
                                return "-";
                            } else {
                                return "- " + row.pic_shift_before + "<br> - " + row.pic_shift_after;
                            }
                        } else {
                            return row.pic_pengganti;
                        }
                    }
                },
                {
                    "data": "knownby",
                    "render": (data, type, row, meta) => {
                        return row.knownby;
                    }
                },
                {
                    "data": "approved_date",
                    "render": (data, type, row, meta) => {
                        if (data == '0000-00-00') {
                            return "-";
                        }
                        return data;
                    }
                },
                {
                    "data": "nama_acc",
                    "render": (data, type, row, meta) => {
                        let status_approval = '';
                        //    if(data == '' || data == null){
                        //       data = 'PIC Pengganti';
                        //    }

                        if (row.approved == null || row.approved == '') {
                            status_approval = 'WAITING';
                        } else {
                            status_approval = row.approved;
                        }

                        return status_approval + " : <b/>" + data + "</b>";
                    }
                },
                {
                    "data": "kode_transaksi",
                    "render": (data, type, row, meta) => {
                        let htmlAction = '';
                        if (updateAction == 1) {
                            htmlAction += `<a class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="Cuti.ubah(this,'${data}')"></a>`;
                        }
                        return htmlAction
                        // if(data != ""){
                        //     return `
                        //     `;
                        // }else{
                        //     if(row.tgl_approve != ''){
                        //         return `Menunggu Approval`;
                        //     }else{
                        //         return `Menunggu Perubahan Data Oleh Karyawan`;
                        //     }
                        // }
                    }
                }
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

    delete: (elm, e) => {
        e.preventDefault();
        let data_id = $(elm).attr('data_id');
        let html = `<div class="row">
        <div class="col-md-12">
            <p>Apakah anda yakin akan menghapus data ini ?</p>
        </div>
        <div class="col-md-12 text-center">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="Cuti.deleteConfirm(this, '${data_id}')">Ya</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Tidak</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },

    deleteConfirm: (elm, id) => {
        let params = {};
        params.id = id;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Cuti.moduleApi()) + "delete",

            beforeSend: () => {
                message.loadingProses('Proses Hapus Data');
            },

            error: function () {
                message.closeLoading();
                toastr.error("Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    toastr.success('Data Berhasil Dihapus');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    toastr.error('Data Gagal Dihapus ', resp.message);
                }
            }
        });
    },

    // getPostData: () => {
    //     let data = {
    //         'user_login': $.trim($('#user_login').text()),
    //         'id': $('input#id').val(),
    //         'departemen': $('#departemen').val(),
    //         'nip': $('input#nip').val(),
    //         'nama_pegawai': $('input#nama_pegawai').val(),
    //     };
    //     return data;
    // },

    // submit: (elm, e) => {
    //     e.preventDefault();
    //     let params = Cuti.getPostData();

    //     if (validation.run()) {
    //         let db = Database.init();
    //         db.get('token').then(function (doc) {
    //             params.tokenApi = doc.title;
    //             $.ajax({
    //                 type: 'POST',
    //                 dataType: 'json',
    //                 data: params,
    //                 url: url.base_url(Cuti.moduleApi()) + "submit",
    //                 beforeSend: () => {
    //                     message.loadingProses('Proses Simpan Data...');
    //                 },
    //                 error: function () {
    //                     message.closeLoading();
    //                     toastr.error("Gagal");
    //                 },

    //                 success: function (resp) {
    //                     message.closeLoading();
    //                     if (resp.is_valid) {
    //                         toastr.success('Data Berhasil Disimpan');
    //                         // setTimeout(function () {
    //                         //     window.location.reload();
    //                         // }, 1000);
    //                     } else {
    //                         bootbox.dialog({
    //                             message: resp.message
    //                         });
    //                     }
    //                 }
    //             });
    //         });
    //     }
    // },

    ubah: (elm, e) => {
        // e.preventDefault();
        let params = {};
        params.no_dokumen = e;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Cuti.moduleApi()) + "showdetailcuti",

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
            }
        });

    },

    reject: (elm, e) => {
        let params = {}
        params.no_dokumen = e;
        let tipe = $(elm).attr('tipe');
        let rejectHtml = `
            <input type="hidden" id="no_pengajuan" value="${e}">

            <div class="row g-3">
                <div class="col-12">
                    <h5 class="py-3 breadcrumb-wrapper mb-4">
                        <span class="text-muted fw-light">Reject Pengajuan /</span><span class="text-muted fw-light">${e}</span>
                    </h5>
                </div>
            </div>

            <div class="row g-3">
                <div class="col-sm-12">
                    <label class="form-label" for="nik">Keterangan</label>
                    <textarea class='form-control required' id='alasan-ditolak' name='alasan-ditolak' error='Keterangan' ></textarea>
                </div>
                <div class="col-12 text-end">
                    <button tipe="${tipe}" onclick="Cuti.saveReject(this,'${e}')" class="btn btn-danger btn-next"> <span
                            class="d-sm-inline-block d-none me-sm-1">Reject</span> <i
                            class="bx bx-chevron-right bx-sm me-sm-n2"></i></button>
            </div>
        `;
        bootbox.dialog({
            message: rejectHtml,
            size: 'small'
        });
        $('.bootbox-close-button').addClass('btn-close').text("");
    },

    saveReject: (elm, e) => {
        const kodeTransaksi = e;
        const alasanDitolak = $('#alasan-ditolak').val();
        if (validation.run()) {
            let params = {}
            params.no_dokumen = kodeTransaksi;
            params.alasan_ditolak = alasanDitolak
            params.status = $(elm).attr('tipe') == 'hc' ? 'REJECTED HC' : 'REJECTED';

            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Cuti.moduleApi()) + "saveapproval",

                beforeSend: () => {
                    message.loadingProses('Proses Pengambilan Data');
                },

                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi", "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid == 1) {
                        Toast.success('Informasi', 'Data Berhasil Di Reject');
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    } else {
                        Toast.error('Informasi', resp.message);
                    }
                }
            });
        }
    },

    saveApprove: (elm, e) => {
        const kodeTransaksi = e;
        let params = {}
        params.no_dokumen = kodeTransaksi;
        params.status = $(elm).attr('tipe') == 'hc' ? 'APPROVED HC' : 'APPROVED';

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Cuti.moduleApi()) + "saveapproval",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid == 1) {
                    Toast.success('Informasi', 'Data Berhasil Di Approve');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    Toast.error('Informasi', resp.message);
                }
            }
        });
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
            url: url.base_url(Cuti.moduleApi()) + "showDataKaryawan",

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
                Cuti.getDataKaryawan(id_text);
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
                    "url": url.base_url(Cuti.moduleKaryawanApi()) + `getData`,
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
                "columnDefs": [
                    {
                        "targets": [1, 2, 3],
                        "orderable": false,
                    },
                    {
                        "targets": 4,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                        }
                    },
                    {
                        "targets": 0,
                        "createdCell": function (td, cellData, rowData, row, col) {
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
                    "data": "nama_jabatan",
                },
                {
                    "data": "nik",
                    "render": (data, type, row, meta) => {
                        return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="Cuti.pilihData(this,'${bindText}')"></i>`;
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
        Cuti.checkKaryawanShift();
    },

    showDataKaryawanInDepartemen: (elm, id_text) => {

        var nik = $('#nik').val();

        if (nik != '') {

            nik = nik.split(' - ')[0];

            console.log(nik);

            $.getJSON(url.base_url(Cuti.moduleApi()) + "getDepartemenByNIK", { nik: nik }, function (res) {
                var departemen = res.id_departemen;

                console.log(departemen);

                let params = { departemen: departemen };
                $.ajax({
                    type: 'POST',
                    dataType: 'html',
                    data: params,
                    url: url.base_url(Cuti.moduleApi()) + "showDataKaryawan",

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
                        Cuti.getDataKaryawanInDepartemen(id_text);
                    }
                });
            })

        } else {
            alert('Silahkan Pilih Karyawan terlebih dahulu');
        }
    },

    getDataKaryawanInDepartemen: async (bindText) => {
        let tableData = $('table#table-data-karyawan');
        let params = {};
        params.id = $('#id').val();
        params.departemen = $('#id_departemen').val();
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
                    "url": url.base_url(Cuti.moduleKaryawanApi()) + `getData`,
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
                    "targets": [1, 2, 3],
                    "orderable": false,
                },
                {
                    "targets": 4,
                    "orderable": false,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).addClass('text-center');
                    }
                },
                {
                    "targets": 0,
                    "createdCell": function (td, cellData, rowData, row, col) {
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
                    "data": "nama_jabatan",
                },
                {
                    "data": "nik",
                    "render": (data, type, row, meta) => {
                        return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="Cuti.pilihDataInDepartemen(this,'${bindText}')"></i>`;
                    }
                }
                ]
            });
        }
    },

    pilihDataInDepartemen: (elm, bindID) => {
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');
        $('#' + bindID).val(nik + " - " + nama_lengkap);
        message.closeDialog();
    },

    showDataKaryawanShift: (elm, id_text) => {

        var nik = $('#nik').val();

        if (nik != '') {

            nik = nik.split(' - ')[0];

            console.log(nik);

            $.getJSON(url.base_url(Cuti.moduleApi()) + "getDepartemenByNIK", { nik: nik }, function (res) {
                var departemen = res.id_departemen;

                console.log(departemen);

                let params = {};

                $.ajax({
                    type: 'POST',
                    dataType: 'html',
                    data: params,
                    url: url.base_url(Cuti.moduleApi()) + "showDataKaryawanShift",

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
                        Cuti.getDataKaryawanShift(id_text, nik, departemen);
                    }
                });
            })

        } else {
            alert('Silahkan Pilih Karyawan terlebih dahulu');
        }
    },

    getDataKaryawanShift: async (bindText, nik, departemen) => {
        let tableData = $('table#table-data-karyawan');
        let params = {};
        params.id = $('#id').val();
        params.nik = nik;
        params.departemen = departemen;
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
                    "url": url.base_url(Cuti.moduleKaryawanApi()) + `getDataShift`,
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
                    "targets": 4,
                    "orderable": false,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).addClass('text-center');
                        $(td).addClass('td-padd');
                        $(td).addClass('action');
                    }
                },
                {
                    "targets": 3,
                    "orderable": false,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).addClass('td-padd');
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
                    "data": "shift",
                },
                {
                    "data": "nik",
                    "render": (data, type, row, meta) => {
                        return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="Cuti.pilihDataShift(this,'${bindText}')"></i>`;
                    }
                }
                ]
            });
        }
    },

    pilihDataShift: (elm, bindID) => {
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');
        $('#' + bindID).val(nik + " - " + nama_lengkap);
        message.closeDialog();
    },

    showDataKaryawanDirektur: (elm, id_text) => {

        var nik = $('#nik').val();

        if (nik != '') {

            let params = {};

            $.ajax({
                type: 'POST',
                dataType: 'html',
                data: params,
                url: url.base_url(Cuti.moduleApi()) + "showDataKaryawanDirektur",

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
                    Cuti.getDataKaryawanDirektur(id_text);
                }
            });

        } else {
            alert('Silahkan Pilih Karyawan terlebih dahulu');
        }
    },

    getDataKaryawanDirektur: async (bindText) => {
        let tableData = $('table#table-data-karyawan');
        let params = {};
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
                    "url": url.base_url(Cuti.moduleKaryawanApi()) + `getDataDirektur`,
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
                    "data": "NIK",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    "data": "NIK",
                },
                {
                    "data": "nama_lengkap",
                },
                {
                    "data": "NIK",
                    "render": (data, type, row, meta) => {
                        return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="Cuti.pilihDataDirektur(this,'${bindText}')"></i>`;
                    }
                }
                ]
            });
        }
    },

    pilihDataDirektur: (elm, bindID) => {
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');
        $('#' + bindID).val(nik + " - " + nama_lengkap);
        message.closeDialog();
    },


    checkKaryawanShift: () => {
        let karyawan = $('#nik').val()
        if (karyawan != '') {
            var nik = karyawan.split(' - ')[0];

            // reset
            $("#nik_pengganti").val('');
            $("#pic_shift_before").val('');
            $("#pic_shift_after").val('');
            $("#knownby").val('');

            if ($('#karyawannonshift').length && $('#karyawanshift').length) {
                $.getJSON(url.base_url(Cuti.moduleApi()) + "checkIsKaryawanShift", { nik: nik }, function (res) {
                    if (res) {
                        $('#karyawannonshift').addClass('d-none')
                        $('#karyawanshift').removeClass('d-none')
                    } else {
                        $('#karyawannonshift').removeClass('d-none')
                        $('#karyawanshift').addClass('d-none')
                    }
                });
            }
        }
    },

    getDataManajer: async () => {
        let tableDatax = $('table#table-data-manajer');
        let params = {};
        params.id = $('#id').val();
        if (tableDatax.length > 0) {
            tableDatax.DataTable({
                "processing": true,
                "serverSide": true,
                "ordering": true,
                "autoWidth": false,
                "order": [
                    [0, 'desc']
                ],
                "aLengthMenu": [
                    [10, 50, 100],
                    [10, 50, 100]
                ],
                "ajax": {
                    "url": url.base_url(Cuti.moduleManajernApi()) + `getDataManajer`,
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
                "columnDefs": [
                    {
                        "targets": 4,
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
                    "data": "id",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    "data": "id",
                },
                {
                    "data": "nama_departemen",
                },
                {
                    "data": "content",
                },
                {
                    "data": "id",
                    "render": (data, type, row, meta) => {
                        return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.content}" data_id="${data}" onclick="Cuti.pilihDataManajer(this)"></i>`;
                    }
                }
                ]
            });
        }
    },

    showDataManajer: (elm) => {
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Cuti.moduleApi()) + "showDataManajer",

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
                Cuti.getDataManajer();
            }
        });
    },

    pilihDataManajer: (elm) => {
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');
        $('#nik-atasan').val(nik + " - " + nama_lengkap);
        message.closeDialog();
    },

    setNik: (elm, e) => {
        let nik = $(elm).is(':checked') ? $(elm).attr('nik') : '';
        $('#nik').val(nik);
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Cuti.getPostData();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Cuti.moduleApi()) + "submit",
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
                            window.location.reload();
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

    getPostData: () => {
        let data = {
            'data': {
                'doc_trans': $("#txt_doc_trans").val(),
                'date_trans': $("#txt_date_trans").val(),
                'jenis_cuti': $("#jenis-cuti").val(),
                'dari_tgl': $("#dari-tgl").val(),
                'ke_tgl': $("#ke-tgl").val(),
                'alasan': $("#alasan-cuti").val(),
                'jumlah_hari': $("#jml-hari").val(),
                'nik': $.trim($('#nik').val()),
                'nik_pengganti': $.trim($('#nik_pengganti').val()),
                'pic_shift_before': $.trim($('#pic_shift_before').val()),
                'pic_shift_after': $.trim($('#pic_shift_after').val()),
                'knownby': $.trim($("#knownby").val())
            },
            'attachment': Cuti.getPostInputDokumen()
        }

        return data
    },

    rangeTanggal: () => {
        var dari = $("#dari-tgl");
        var ke = $("#ke-tgl");

        var date1 = new Date(dari.val());
        var date2 = new Date(ke.val());

        // hitung perbedaan waktu dari dua tanggal
        var selisih = date2.getTime() - date1.getTime();

        if (selisih < 0) {
            alert('Tanggal Tidak Valid');
            dari.val('');
            ke.val('');
            $("#jml-hari").val('');
        } else {
            var Difference_In_Days = selisih / (1000 * 3600 * 24) + 1;
            // tampilkan jml akhir hari (hasil)
            $("#jml-hari").val(Difference_In_Days);
        }

    },


    // UPLOAD FILE
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

    getPostInputDokumen: () => {
        let params = {};
        let attachment = $('#attachment');
        params.file = attachment.attr('src');
        params.tipe = attachment.attr('tipe');

        return params;
    },

    showData: (elm, e) => {
        e.preventDefault();
        let img = $(elm).attr('berkas');
        let html = `
            <div class="row g-3">
                <div class="col-12">
                    <br/>
                    <img src="${img}" width="600" height="600"/>
                </div>
            </div>
        `;
        bootbox.dialog({
            message: html,
            size: 'large'
        });
    },

};

$(function () {
    Cuti.getData();
    Cuti.select2All();
    Cuti.setDate();
});
