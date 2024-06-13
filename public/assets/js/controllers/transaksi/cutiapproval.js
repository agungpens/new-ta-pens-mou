let CutiApproval = {
    module: () => {
        return "transaksi/cutiapproval";
    },

    moduleApi: () => {
        return `api/${CutiApproval.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(CutiApproval.module()) + "add";
    },

    back: () => {
        window.location.href = url.base_url(CutiApproval.module()) + "index";
    },

    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleManajer: () => {
        return "transaksi/cutiapproval";
    },

    moduleKaryawanApi: () => {
        return `api/${CutiApproval.moduleKaryawan()}`;
    },

    moduleManajernApi: () => {
        return `api/${CutiApproval.moduleManajer()}`;
    },

    getData: async () => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();

        let params = {}
        params.tgl_pengajuan = $("#tgl_pengajuan").val()
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
                    [25, 50, 100],
                    [25, 50, 100]
                ],
                "ajax": {
                    "url": url.base_url(CutiApproval.moduleApi()) + `getData`,
                    "type": "POST",
                    "data" : params,
                    // "headers": {
                    //     'X-CSRF-TOKEN': `'${tokenApi}'`
                    // }
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                "columnDefs": [{
                        "targets": 7,
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
                        render : function(data,type,row,meta){
                            //  console.log(data)
                             if(data == "APPROVED"){
                                return `<span class="badge bg-label-success">${data}</span>`;
                             }else if(data == "REJECTED"){
                                return `<span class="badge bg-label-danger">${data}</span> <br>Alasan : ${row.alasan_ditolak}`;
                             }else{
                                if(data == null || data == ''){
                                    return `<span class="badge bg-label-warning">WAITING APPROVE</span>`;
                                }
                                if(data == 'APPROVED HC'){
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
                            if(data === null){
                                if(row.pic_shift_before === null && row.pic_shift_after === null){
                                    return "-";
                                }else{
                                    return "- " + row.pic_shift_before + "<br> - " + row.pic_shift_after;
                                }
                            }

                            return data;
                         }
                    },
                    {
                        "data": "knownby",
                        "render": (data, type, row, meta) => {
                            return row.knownby;
                         }
                    },
                    {
                        "data": "nama_acc",
                        "render": (data, type, row, meta) => {
                           let status_approval = '';
                           if(data == '' || data == null){
                              data = 'PIC Pengganti';
                           }

                           if(row.approved == null || row.approved == ''){
                            status_approval = 'WAITING';
                           }else{
                            status_approval = row.approved;
                           }

                           return status_approval+" : <b/>"+data+"</b>";
                        }
                    },
                    {
                        "data": "kode_transaksi",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            if(updateAction == 1){
                                htmlAction += `<a class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="CutiApproval.ubah(this,'${data}')"></a>`;
                            }
                            return htmlAction
                        }
                    }
                ]
            });
        }
    },

    delete:(elm, e)=>{
        e.preventDefault();
        let data_id = $(elm).attr('data_id');
        let html = `<div class="row">
        <div class="col-md-12">
            <p>Apakah anda yakin akan menghapus data ini ?</p>
        </div>
        <div class="col-md-12 text-center">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="CutiApproval.deleteConfirm(this, '${data_id}')">Ya</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Tidak</button>
        </div>
        </div>`;

        bootbox.dialog({
            message : html
        });
    },

    deleteConfirm:(elm, id)=>{
        let params = {};
        params.id = id;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(CutiApproval.moduleApi()) + "delete",

            beforeSend:()=>{
                message.loadingProses('Proses Hapus Data');
            },

            error: function () {
                message.closeLoading();
                toastr.error("Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if(resp.is_valid){
                    toastr.success('Data Berhasil Dihapus');
                    setTimeout(function(){
                        window.location.reload();
                    }, 1000);
                }else{
                    toastr.error('Data Gagal Dihapus ', resp.message);
                }
            }
        });
    },

    getPostData: () => {
        let data = {
            'user_login': $.trim($('#user_login').text()),
            'id': $('input#id').val(),
            'departemen': $('#departemen').val(),
            'nip': $('input#nip').val(),
            'nama_pegawai': $('input#nama_pegawai').val(),
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = CutiApproval.getPostData();

        if (validation.run()) {
            let db = Database.init();
            db.get('token').then(function (doc) {
                params.tokenApi = doc.title;
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    data: params,
                    url: url.base_url(CutiApproval.moduleApi()) + "submit",
                    beforeSend: () => {
                        message.loadingProses('Proses Simpan Data...');
                    },
                    error: function () {
                        message.closeLoading();
                        toastr.error("Gagal");
                    },

                    success: function (resp) {
                        message.closeLoading();
                        if (resp.is_valid) {
                            toastr.success('Data Berhasil Disimpan');
                            // setTimeout(function () {
                            //     window.location.reload();
                            // }, 1000);
                        } else {
                            bootbox.dialog({
                                message: resp.message
                            });
                        }
                    }
                });
            });
        }
    },

    ubah:(elm,e) => {
        // e.preventDefault();
        let params = {};
        params.no_dokumen = e;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(CutiApproval.moduleApi()) + "showdetailcuti",

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
                $('.bootbox-close-button').addClass('btn-close').text("");
            }
        });

    },

    reject:(elm,e) => {
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
                    <button tipe="${tipe}" onclick="CutiApproval.saveReject(this,'${e}')" class="btn btn-danger btn-next"> <span
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

    saveReject:(elm,e) => {
        const kodeTransaksi = e;
        const alasanDitolak = $('#alasan-ditolak').val();
        if(validation.run()){
            let params = {}
            params.no_dokumen = kodeTransaksi;
            params.alasan_ditolak = alasanDitolak
            params.status = 'REJECTED';

            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(CutiApproval.moduleApi()) + "saveapproval",

                beforeSend: () => {
                    message.loadingProses('Proses Pengambilan Data');
                },

                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi","Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if(resp.is_valid == 1){
                        Toast.success('Informasi','Data Berhasil Di Reject');
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    }else{
                        Toast.error('Informasi', resp.message);
                    }
                }
            });
        }
    },

    saveApprove:(elm,e) => {
        const kodeTransaksi = e;
        let params = {}
        params.no_dokumen = kodeTransaksi;
        params.status = 'APPROVED';

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(CutiApproval.moduleApi()) + "saveapproval",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if(resp.is_valid == 1){
                    Toast.success('Informasi','Data Berhasil Di Approve');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                }else{
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
        $.each(dataDate, function(){
            $(this).flatpickr();
        });
    },

    showDataKaryawan: (elm,id_text) => {
        let params = {};
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(CutiApproval.moduleApi()) + "showDataKaryawan",

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
                CutiApproval.getDataKaryawan(id_text);
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
                    "url": url.base_url(CutiApproval.moduleKaryawanApi()) + `getData`,
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
                        "data": "nik",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="CutiApproval.pilihData(this,'${bindText}')"></i>`;
                        }
                    }
                ]
            });
        }
    },

    getDataManajer: async() => {
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
                    "url": url.base_url(CutiApproval.moduleManajernApi()) + `getDataManajer`,
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.content}" data_id="${data}" onclick="CutiApproval.pilihDataManajer(this)"></i>`;
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
            url: url.base_url(CutiApproval.moduleApi()) + "showDataManajer",

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
                CutiApproval.getDataManajer();
            }
        });
    },

    pilihData: (elm,bindID) => {
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');
        $('#'+bindID).val(nik + " - " + nama_lengkap);
        message.closeDialog();
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

    submit: (elm,e) => {
        e.preventDefault();
        let params = CutiApproval.getPostData();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(CutiApproval.moduleApi()) + "submit",
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
                        // setTimeout(function () {
                        //     window.location.reload();
                        // }, 1000);
                    } else {
                        bootbox.dialog({
                            message: resp.message
                        });
                    }
                }
            });
        }
    },

    getPostData:() => {
        let data = {
            'data' : {
                'doc_trans' : $("#txt_doc_trans").val(),
                'date_trans' : $("#txt_date_trans").val(),
                'jenis_cuti' : $("#jenis-cuti").val(),
                'dari_tgl'  : $("#dari-tgl").val(),
                'ke_tgl'    : $("#ke-tgl").val(),
                'alasan'    : $("#alasan-cuti").val(),
                'jumlah_hari' : $("#jml-hari").val(),
                'nik'       : $.trim($('#nik').val()),
                'nik_pengganti' : $.trim($('#nik_pengganti').val())
                // 'nik_atasan' : $.trim($("#nik-atasan").val())
            }
        }

        return data
    },

};

$(function(){
    CutiApproval.getData();
    CutiApproval.select2All();
    CutiApproval.setDate();
});
