let tempRowElement = [];
let PAPD = {
    constructor:(tableRecruitment) =>{
        this.tableRecruitment = tableRecruitment
    },
    module: () => {
        return "reimbursement/papd";
    },

    moduleApi: () => {
        return `api/${PAPD.module()}`;
    },

    moduleMutasi: () => {
        return "pengajuan/mutasi";
    },

    moduleMutasiApi: () => {
        return `api/${PAPD.moduleMutasi()}`;
    },

    add: () => {
        window.location.href = url.base_url(PAPD.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(PAPD.module()) + "detail?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(PAPD.module()) + "index";
    },

    getData: async () => {
        let tableData = $('table#table-data');

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
                    [25, 50, 100],
                    [25, 50, 100]
                ],
                "ajax": {
                    "url": url.base_url(PAPD.moduleApi()) + `getData`,
                    "type": "POST",
                },
                "deferRender": true,
                "columns": [
                    {
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "no_sppd"
                    },
                    {
                        "data": "nama_lengkap_penunjuk"
                    },
                    {
                        "data": "status",
                        "render": function (data, type, row) {
                            var html = "";
                            if (data == 'PENDING') {
                                html += `<p class="badge bg-warning text-dark">PENDING</p>&nbsp;`;
                            }else if (data == 'APPROVED') {
                                html += `<p class="badge bg-success">APPROVED</p>&nbsp;`;
                            }else{
                                html += `<p class="badge bg-danger">REJECTED</p>&nbsp;`;
                            }
                            return html;
                        }
                    },
                    {
                        "data":'created_at',
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            htmlAction += `<i class="bx bx-notepad" style="cursor: pointer;" data_id="${data}" onclick="PAPD.ubah(this)"></i>`;
                            htmlAction += `<i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="PAPD.delete(this, event)"></i>`;

                            return htmlAction;
                        }
                    }
                ]
            });
        }
    },

    delete: (elm, e) => {
        e.preventDefault();
        let data_id = $(elm).attr('data_id');
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan menghapus data ini ?</p>
        </div>
        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-danger btn-sm" onclick="PAPD.deleteConfirm(this, '${data_id}')">Ya</button>
            <button class="btn btn-secondary btn-sm " onclick="message.closeDialog()">Tidak</button>
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
            url: url.base_url(PAPD.moduleApi()) + "delete",

            beforeSend: () => {
                message.loadingProses('Proses Hapus Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Data Berhasil Dihapus');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    Toast.error('Informasi', 'Data Gagal Dihapus ', resp.message);
                }
            }
        });
    },


    getPostItemDataRincianBiaya:()=>{
        let data = [];
        let tablePerjalanan = $('#table-data-rincian-biaya').find('tbody').find('tr.input');
        $.each(tablePerjalanan, function () {
            let params = {};
            params.id = $(this).attr('data_id');
            params.biaya = $(this).find('#biaya').val();
            params.qty = $(this).find('#qty').val();
            params.total = $(this).find('#total').val();
            data.push(params);
        });

        return data;
    },

    getPostData: () => {
        let data = {
            'data': {
                'id': $('#id').val(),
                'sppd': $('#sppd').val(),
                'currency': $('#currency').val(),
                'data_perjalanan': PAPD.getPostItemDataRincianBiaya(),
                'total_keseluruhan': $('#total_keseluruhan').val(),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = PAPD.getPostData();
        // return params;
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            // return params;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(PAPD.moduleApi()) + "submit",
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
                            window.location.href = url.base_url(PAPD.module()) + "index";
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


    setDate: () => {

        const dataDate = $('.flatpickr');
        $.each(dataDate, function () {
            $(this).flatpickr();
        });
        const dataDateTime = $('.flatpickrtime');
        $.each(dataDateTime, function () {
            $(this).flatpickr({
                time_24hr: true,
                dateFormat : 'Y-m-d H:i',
                enableTime: true,
                defaultHour: 8
            });
        });
    },

    select2All: () => {
        // Default
        let tempOption = [];
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
        const select2multiple = $('.select2-multiple');
        if (select2multiple.length) {
            tempOption = [select2multiple.find('option').toArray().map(o => o.value)];
            tempOption = tempOption[0].filter(function (v) {
                return v.length > 0
            });

            select2multiple.each(function () {
                var $this = $(this);
                $this.wrap('<div class="position-relative"></div>').select2({
                    placeholder: 'Pilih',
                    dropdownParent: $this.parent()
                });
                $this.on("select2:unselect", function (e) {
                    let text = e.params.data.text;

                    if (tempOption.indexOf(text) < 0) {
                        $("option[value='" + e.params.data.text + "']", this).remove()
                    }
                });
            });
        }
        $(".select2-disabled").prop("disabled", true);
    },

    deletePAPD:(elm)=>{
        let id = $(elm).closest('tr').attr('data_id');
        if(id == ''){
            $(elm).closest('tr').remove();
        }else{
            $(elm).closest('tr').addClass('hide');
            $(elm).closest('tr').addClass('remove');
        }
    },

    removeWarning: () => {
        $(document).on('change', '.required', function () {
            if ($(this).val().length > 0) {
                $(this).removeClass('is-invalid');
                $(this).next().remove();
            } else {
                $(this).addClass('is-invalid');
                $(this).after('<p style="color:#ff5b5c;" class="data-error">* ' + $(this).attr('error') + ' Harus Diisi</p>');
            }
        })
    },

    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleKaryawanApi: () => {
        return `api/${PAPD.moduleKaryawan()}`;
    },

    addBiaya: (elm, e) => {
        e.preventDefault();
        let params = {};
        let table = $('table#table-data-rincian-biaya').find('tbody');
        params.counterTr = table.find('tr').length;

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(PAPD.moduleApi()) + "addMasterBiaya",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                table.find('tr.action').before(resp);

                PAPD.select2All();
            }
        });
    },

    deleteRincianBiaya:(elm, e)=>{
        let id = $(elm).closest('tr').attr('data_id');
        if(id == ''){
            $(elm).closest('tr').remove();
        }else{
            $(elm).closest('tr').addClass('hide');
            $(elm).closest('tr').addClass('remove');
        }
    },

    verifikasi: (data, e) => {
        e.preventDefault();
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan memverifikasi data PAPD ini ?</p>
        </div>
        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-success btn-sm" onclick="PAPD.verifikasiConfirm(this, '${data}')">Ya</button>
            <button class="btn btn-secondary btn-sm " onclick="message.closeDialog()">Tidak</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });


    },

    verifikasiConfirm: (elm, id) => {
        let params = {};
        params.id = id;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(PAPD.moduleApi()) + "verifikasi",

            beforeSend: () => {
                message.loadingProses('Proses Verifikasi Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Data Berhasil Diverifikasi');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    Toast.error('Informasi', 'Data Gagal Diverifikasi ', resp.message);
                }
            }
        });
    },

    reject: (data, e) => {
        e.preventDefault();
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Alasan me-reject pengajuan PAPD ini</p>
            <input type="text" class="form-control required" id="alasan_reject" placeholder="Alasan Reject"
            value="" />
        </div>

        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-danger btn-sm" onclick="PAPD.rejectConfirm(this, '${data}')">Reject dan Lanjutkan</button>
            <button class="btn btn-secondary btn-sm " onclick="message.closeDialog()">Batal</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });


    },

    rejectConfirm: (elm, id) => {
        let params = {};
        var alasan = document.getElementById("alasan_reject").value;
        params.id = id;
        params.alasan = alasan;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(PAPD.moduleApi()) + "reject",

            beforeSend: () => {
                message.loadingProses('Proses Reject Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Data Berhasil Direject');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    Toast.error('Informasi', 'Data Gagal Direject ', resp.message);
                }
            }
        });
    },


    showDataPejabat:(elm)=>{
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(PAPD.moduleApi()) + "showDataPejabat",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                PAPD.getDataPejabat();
            }
        });
    },

    getDataPejabat: async () => {
        let tableData = $('table#table-data-pejabat');
        // tableData.DataTable().destroy();

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
                    [10, 50, 100],
                    [10, 50, 100]
                ],
                "ajax": {
                    "url": url.base_url(PAPD.moduleKaryawanApi()) + `getData`,
                    "type": "POST",
                    "data": params
                    // "headers": {
                    //     'X-CSRF-TOKEN': `'${tokenApi}'`
                    // }
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [
                    {
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="PAPD.pilihDataPejabat(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihDataPejabat:(elm)=>{
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');
        $('#pic_penunjuk').val(nik+" - "+nama_lengkap);
        message.closeDialog();
        let params = {};
        params.nik = nik;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(PAPD.moduleApi()) + "getDetailPejabat",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                message.closeLoading();
            }
        });
    },


    showMasterBiaya:(elm)=>{
        let params = {};
        let tr_index = $(elm).closest('tr').index();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(PAPD.moduleApi()) + "showMasterBiaya",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                PAPD.getMasterBiaya(tr_index);
            }
        });
    },


    getMasterBiaya: async (index) => {
        let tableData = $('table#table-data-pilih-master-biaya');
        // tableData.DataTable().destroy();

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
                    [10, 50, 100],
                    [10, 50, 100]
                ],
                "ajax": {
                    "url": url.base_url(PAPD.moduleApi()) + `getDataBiaya`,
                    "type": "POST",
                    "data": params
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [
                    {
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
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "biaya",
                    },
                    {
                        "data": "currency",
                    },
                    {
                        "data": "total_biaya",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" index_tr="${index}" biaya="${row.biaya}" data_id="${data}" total_biaya="${row.total_biaya}" currency="${row.currency}" onclick="PAPD.pilihMasterBiaya(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },


    pilihMasterBiaya:(elm)=>{
        let tr_index = $(elm).attr('index_tr');
        tr_index  = parseInt(tr_index) + 1;
        tempRowElement[tr_index] = elm;

        let biaya = $(elm).attr('biaya');
        let total_biaya = $(elm).attr('total_biaya');
        let currency = $(elm).attr('currency');
        let id = $(elm).attr('data_id');
        var biayaByColumn =  $('table#table-data-rincian-biaya').find(`tr:eq(${tr_index})`).find('input#biaya').val(id+" - "+biaya);
        var totalBiayaByColumn = $('table#table-data-rincian-biaya').find(`tr:eq(${tr_index})`).find('input#biaya_satuan').val(total_biaya);
        $('table#table-data-rincian-biaya').find(`tr:eq(${tr_index})`).find('input#currency').val(currency);
        message.closeDialog();
    },


    totalAcumulate: (elm)=>{
        let tr_index = $(elm).closest('tr').index();

        let tablePerjalanan = $('#table-data-rincian-biaya').find('tbody').find('tr.input');

        let totalKeseluruhan = 0;
        $.each(tablePerjalanan, function () {
            let params = {};

            params.id = $(this).attr('data_id');
            params.biaya = $(this).find('#biaya').val();
            params.qty = $(this).find('#qty').val();
            params.total = $(this).find('#total').val();
            totalKeseluruhan += Number(params.total);
        });
        $('#total_keseluruhan').val(totalKeseluruhan);
    },

    showDataSPPD:(elm)=>{
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(PAPD.moduleApi()) + "showDataSPPD",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                PAPD.getDataSPPD();
            }
        });
    },


    getDataSPPD: async () => {
        let tableData = $('table#table-data-sppd');

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
                    [10, 50, 100],
                    [10, 50, 100]
                ],
                "ajax": {
                    "url": url.base_url(PAPD.moduleApi()) + `getDataSPPD`,
                    "type": "POST",
                    "data": params
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columns": [{
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "no_sppd",
                    },
                    {
                        "data": "nama_penunjuk",
                    },
                    {
                        "data": "jabatan_penunjuk",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" no_sppd="${row.no_sppd}" data_id="${data}" nama_penunjuk="${row.nama_penunjuk}" jabatan_penunjuk="${row.jabatan_penunjuk}" onclick="PAPD.pilihDataSPPD(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihDataSPPD:(elm)=>{
        let sppd = $(elm).attr('no_sppd');
        let nama_penunjuk = $(elm).attr('nama_penunjuk');
        let jabatan_penunjuk = $(elm).attr('jabatan_penunjuk');
        let id = $(elm).attr('data_id');
        $('input#sppd').val(sppd);
        $('input#nama_penunjuk').val(nama_penunjuk);
        $('input#jabatan_penunjuk').val(jabatan_penunjuk);
        message.closeDialog();
    },

};

$(function () {
    PAPD.getData();
    PAPD.setDate();
    PAPD.getDataPejabat();
    PAPD.select2All();
});
