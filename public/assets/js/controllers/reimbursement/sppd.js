let SPPD = {
    constructor:(tableRecruitment) =>{
        this.tableRecruitment = tableRecruitment
    },
    module: () => {
        return "reimbursement/sppd";
    },

    moduleApi: () => {
        return `api/${SPPD.module()}`;
    },

    moduleMutasi: () => {
        return "pengajuan/mutasi";
    },

    moduleMutasiApi: () => {
        return `api/${SPPD.moduleMutasi()}`;
    },

    add: () => {
        window.location.href = url.base_url(SPPD.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(SPPD.module()) + "detail?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(SPPD.module()) + "index";
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
                    "url": url.base_url(SPPD.moduleApi()) + `getData`,
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
                            htmlAction += `<i class="bx bx-notepad" style="cursor: pointer;" data_id="${data}" onclick="SPPD.ubah(this)"></i>`;
                            htmlAction += `<i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="SPPD.delete(this, event)"></i>`;

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
            <button class="btn btn-danger btn-sm" onclick="SPPD.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(SPPD.moduleApi()) + "delete",

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


    getPostItemDataPerjalananDinas:()=>{
        let data = [];
        let tablePerjalanan = $('#table-data-perjalanan-dinas').find('tbody').find('tr.input');
        $.each(tablePerjalanan, function () {
            let params = {};
            params.id = $(this).attr('data_id');
            params.perjalanan_dinas = $(this).find('#perjalanan_dinas').val();
            params.transportasi = $(this).find('#transportasi').val();
            params.dari_tanggal = $(this).find('#dari_tanggal').val();
            params.sampai_tanggal = $(this).find('#sampai_tanggal').val();
            params.keperluan = $(this).find('#keperluan').val();
            data.push(params);
        });

        return data;
    },

    getPostItemDataKaryawan:(elm)=>{
        let data = [];
        let keluarga = $('#table-data-karyawan').find('tbody').find('tr.input');
        $.each(keluarga, function () {
            let params = {};
            params.id = $(this).attr('data_id');
            params.nik_karyawan = $(this).find('#nik_karyawan').val();
            data.push(params);
        });

        return data;
    },

    getPostData: () => {
        console.log(SPPD.getPostItemDataPerjalananDinas());
        let data = {
            'data': {
                'id': $('#id').val(),
                'jenis_perjalanan_dinas': $('#jenis_perjalanan_dinas').val(),
                'pic_penunjuk': $('#pic_penunjuk').val(),
                'keberangkatan_dari': $('#keberangkatan_dari').val(),
                'lama_perjalanan': $('#lama_perjalanan').val(),
                'berangkat_tanggal': $('#berangkat_tanggal').val(),
                'pulang_tanggal': $('#pulang_tanggal').val(),
                'data_karyawan': SPPD.getPostItemDataKaryawan(),
                'data_perjalanan': SPPD.getPostItemDataPerjalananDinas(),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = SPPD.getPostData();
        // return params;
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            // return params;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(SPPD.moduleApi()) + "submit",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function () {
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    console.log(resp);
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Data Berhasil Disimpan');
                        setTimeout(function () {
                            window.location.href = url.base_url(SPPD.module()) + "index";
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
        // const flatpickrRange = document.querySelector('.flatpickr');
        // if(flatpickrRange){
        //     flatpickrRange.flatpickr();
        // }

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

    deleteSPPD:(elm)=>{
        let id = $(elm).closest('tr').attr('data_id');
        if(id == ''){
            $(elm).closest('tr').remove();
        }else{
            $(elm).closest('tr').addClass('hide');
            $(elm).closest('tr').addClass('remove');
        }
    },

    changeActive:(elm)=>{
        let status = $(elm).attr('status');
        console.log(status);
        $(elm).removeClass('bxs-checkbox-checked');
        $(elm).removeClass('bx-checkbox-minus');
        if(status == '1'){
            $(elm).attr('status', 0);
            $(elm).addClass('bx-checkbox-minus');
        }else{
            $(elm).attr('status', 1);
            $(elm).addClass('bxs-checkbox-checked');
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

    showDetails: (elm) => {
        let params = {};
        params.permintaan_no = $(elm).val();

        if(params.permintaan_no){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(SPPD.moduleApi()) + "showDetails",

                beforeSend: () => {
                    message.loadingProses('Proses Pengambilan Data');
                },

                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi", "Gagal");
                },

                success: function (resp) {
                    console.log(resp);
                    // console.log(resp.detail.catatan);
                    message.closeLoading();

                    $('#sifat').val(resp.detail.sifat)
                    $('#rencana_masuk').val(resp.detail.rencana_masuk)
                    $('#departemen').val(resp.detail.nama_departemen)
                    $('#jabatan').val(resp.detail.nama_jabatan)
                    $('#usia_min').val(resp.detail.usia_min)
                    $('#usia_max').val(resp.detail.usia_max)
                    $('#usia_max').val(resp.detail.usia_max)
                    $('#jk').val(resp.jk)
                    $('#pendidikan').val(resp.pendidikan)
                    tinymce.get("job_posting").setContent(resp.detail.catatan);
                }
            });
        }else{
            $('#sifat').val('')
            $('#rencana_masuk').val('')
            $('#departemen').val('')
            $('#jabatan').val('')
            $('#usia_min').val('')
            $('#usia_max').val('')
            $('#usia_max').val('')
            $('#jk').val('')
            $('#pendidikan').val('')
        }

    },


    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleKaryawanApi: () => {
        return `api/${SPPD.moduleKaryawan()}`;
    },

    addKaryawan: (elm, e) => {
        e.preventDefault();
        let params = {};
        let table = $('table#table-data-karyawan').find('tbody');
        params.counterTr = table.find('tr').length;

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(SPPD.moduleApi()) + "addKaryawan",

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

                SPPD.select2All();
            }
        });
    },


    addPerjalananDinas: (elm, e) => {
        e.preventDefault();
        let params = {};
        let table = $('table#table-data-perjalanan-dinas').find('tbody');
        params.counterTr = table.find('tr').length;

        table.find('tr.action').before();
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(SPPD.moduleApi()) + "addKaryawan",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                console.log(resp);

            }
        });
    },

    addDataPerjalananDinas:(elm, e)=>{
        e.preventDefault();
        let tbody = $(elm).closest('tbody');

        let html = `<tr class="input" data_id="">
            <td>
                <input type="text" id="perjalanan_dinas" name="perjalanan_dinas" error="Tujuan"
                    class="form-control required" placeholder="Tujuan" value="" />
            </td>
            <td>
                <input type="text" id="transportasi" name="transportasi" error="Transportasi"
                    class="form-control required" placeholder="Transportasi" value="" />
            </td>
            <td>
                <input type="text" id="dari_tanggal" name="dari_tanggal" error="Dari Tanggal"
                    class="form-control required data-date flatpickr" placeholder="YYYY-MM-DD" value="" />
            </td>
            <td>
                <input type="text" id="sampai_tanggal" name="sampai_tanggal" error="Sampai Tanggal"
                     class="form-control required data-date flatpickr" placeholder="YYYY-MM-DD"value="" />
            </td>
            <td>
                <input type="text" id="keperluan" name="keperluan" error="Keperluan"
                    class="form-control required" placeholder="Keperluan" value="" />
            </td>
            <td>
                <i class="bx bx-trash" style="cursor: pointer;" onclick="SPPD.deletePerjalananDinas(this, event)"></i>
            </td>
        </tr>`;
        tbody.prepend(html);
        SPPD.setDatePerjalanan();
    },

    setDatePerjalanan:()=>{
        let dataDate = $('.data-date');
        $.each(dataDate, function(){
            $(this).flatpickr();
        });
    },

    deletePerjalananDinas:(elm, e)=>{
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
            <p>Apakah anda yakin akan memverifikasi data SPPD ini ?</p>
        </div>
        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-success btn-sm" onclick="SPPD.verifikasiConfirm(this, '${data}')">Ya</button>
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
            url: url.base_url(SPPD.moduleApi()) + "verifikasi",

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
            <p>Alasan me-reject pengajuan SPPD ini</p>
            <input type="text" class="form-control required" id="alasan_reject" placeholder="Alasan Reject"
            value="" />
        </div>

        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-danger btn-sm" onclick="SPPD.rejectConfirm(this, '${data}')">Reject dan Lanjutkan</button>
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
            url: url.base_url(SPPD.moduleApi()) + "reject",

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
            url: url.base_url(SPPD.moduleApi()) + "showDataPejabat",

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
                SPPD.getDataPejabat();
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
                    "url": url.base_url(SPPD.moduleKaryawanApi()) + `getData`,
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="SPPD.pilihDataPejabat(this)"></i>`;
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
            url: url.base_url(SPPD.moduleApi()) + "getDetailPejabat",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                console.log('resp',resp);
                $('#lokasi_kerja').val(resp.data.work_location);
                $('#lokasi_kerja').trigger('change');

                $('#jabatan').val(resp.data.id_jabatan);
                $('#jabatan').trigger('change');

                $('#status_karyawan').val(resp.data.status_karyawan);
                $('#status_karyawan').trigger('change');

                $('#pkwt').val(resp.data.id_pkwt);
                $('#pkwt').trigger('change');

                $('#golongan').val(resp.data.id_golongan);
                $('#golongan').trigger('change');

                $('#divisi').val(resp.data.id_divisi);
                $('#divisi').trigger('change');

                $('#departemen').val(resp.data.id_departemen);
                $('#departemen').trigger('change');
            }
        });
    },


    showDataKaryawan:(elm)=>{
        let params = {};
        let tr_index = $(elm).closest('tr').index();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(SPPD.moduleApi()) + "showDataKaryawan",

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
                SPPD.getDataKaryawan(tr_index);
            }
        });
    },


    getDataKaryawan: async (index) => {
        let tableData = $('table#table-data-pilih-karyawan');
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
                    "url": url.base_url(SPPD.moduleKaryawanApi()) + `getData`,
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" index_tr="${index}" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="SPPD.pilihDataKaryawan(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihDataKaryawan:(elm)=>{
        let tr_index = $(elm).attr('index_tr');
        // if(parseInt(tr_index) > 0){
        tr_index  = parseInt(tr_index) + 1;
        // }
        console.log('tr_index', tr_index);
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');
        console.log(nama_lengkap+' -'+nik);
        $('table#table-data-karyawan').find(`tr:eq(${tr_index})`).find('input#nik_karyawan').val(nik+" - "+nama_lengkap);
        message.closeDialog();
    },

};

$(function () {
    SPPD.getData();
    SPPD.setDate();
    SPPD.getDataKaryawan();
    SPPD.getDataPejabat();
    SPPD.select2All();
    SPPD.setDatePerjalanan();
});
