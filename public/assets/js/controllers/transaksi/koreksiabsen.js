


let KoreksiAbsen = {
    module: () => {
        return "transaksi/koreksiabsen";
    },

    moduleApi: () => {
        return `api/${KoreksiAbsen.module()}`;
    },

    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleKaryawanApi: () => {
        return `api/${KoreksiAbsen.moduleKaryawan()}`;
    },

    add: () => {
        window.location.href = url.base_url(KoreksiAbsen.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(KoreksiAbsen.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(KoreksiAbsen.module()) + "index";
    },

    getData: async () => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();
        let params = {};
        params.area = $('#area').val();
        params.divisi = $('#divisi').val();
        params.departemen = $('#departemen').val();
        params.jabatan = $('#jabatan').val();
        params.start_date = $('#start-date').val();
        params.end_date = $('#end-date').val();

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
                    "url": url.base_url(KoreksiAbsen.moduleApi()) + `getData`,
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
                    // {
                    //     "targets": 6,
                    //     "orderable": false,
                    //     "createdCell": function (td, cellData, rowData, row, col) {
                    //         $(td).addClass('text-center');
                    //         $(td).addClass('td-padd');
                    //         $(td).addClass('action');
                    //     }
                    // },
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
                        "data": "nama_departemen",
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
                        "data": "status_karyawan_name",
                    },
                    {
                        "data": "server_datetime",
                    },
                    {
                        "data": "jam_masuk",
                    },
                    // {
                    //     "data": "jam_keluar",
                    // },
                    {
                        "data": "server_datetime",
                        "render": (data, type, row, meta) => {
                            return `
                            <i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="KoreksiAbsen.delete(this, event)"></i>`;
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
            <button class="btn btn-primary btn-sm" onclick="KoreksiAbsen.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(KoreksiAbsen.moduleApi()) + "delete",

            beforeSend: () => {
                message.loadingProses('Proses Hapus Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi',"Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi','Data Berhasil Dihapus');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    Toast.error('Informasi','Data Gagal Dihapus ', resp.message);
                }
            }
        });
    },

    getPostInputDokumen: () => {
        let params = {};
        let data_file = $('div.content-file-upload');
        $.each(data_file, function () {
            let $this = $(this);
            let attr_obj_img = $this.find('img').attr('id');
            let attr_obj_filename = $this.find('label').attr('id');
            params[`${attr_obj_img.replaceAll('-', '_')}`] = $this.find('img').attr('src');
            params[`${attr_obj_filename.replaceAll('-', '_')}`] = $this.find('label').text().trim();
        });

        return params;
    },

    getPostItemDetail:()=>{
        let data = [];
        let checkDetail = $('.checkdetail');
        $.each(checkDetail, function(){
            let params = {};
            params.code = $(this).attr('data_id');
            if($(this).is(':checked')){
                data.push(params);
            }
        });
        return data;
    },

    // getPostData: () => {
    //     let data = {
    //         'data': {
    //             'id': $('input#id').val(),
    //             'doc_trans': $('input#doc_trans').val(),
    //         },
    //         'data_detail': KoreksiAbsen.getPostItemDetail()
    //     };
    //     return data;
    // },

    approve: (elm, e) => {
        e.preventDefault();
        let params = KoreksiAbsen.getPostData();
        if($('#keterangan').length > 0){
            if($('#keterangan').val() == ''){
                Toast.error('Informasi', 'Keterangan Belum Diisi');
                return;
            }else{
                params.keterangan = $('#keterangan').val();
            }
        }
        let form = $(elm).closest('div.row');
        if(validation.runWithElement(form)){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(KoreksiAbsen.moduleApi()) + "approve",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function () {
                    message.closeLoading();
                    Toast.error('Informasi',"Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi','Data Berhasil Disimpan');
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

    setDate: () => {
        let dataDate = $('.data-date');
        $.each(dataDate, function(){
            $(this).flatpickr();
        });

        let dataDateTime = $('.data-datetime');
        $.each(dataDateTime, function () {
            $(this).flatpickr({
                enableTime: true,
                noCalendar: true
            });
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

    nextPersonal: (elm, e) => {
        e.preventDefault();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            Wizard.nextWizard(elm)
        }
    },

    takePict: (elm, e) => {
        e.preventDefault();
        let idcontent = $(elm).attr('data-id');
        var uploader = $('<input type="file" accept="image/*;capture=camera" />');
        var src_foto = $(`#${idcontent}`);
        uploader.click();

        uploader.on("change", function () {
            var reader = new FileReader();
            reader.onload = function (event) {
                var files = $(uploader).get(0).files[0];
                filename = files.name;
                var data_from_file = filename.split(".");
                var type_file = $.trim(data_from_file[data_from_file.length - 1]);
                if (type_file == 'jpg' || type_file == 'jpeg' || type_file == 'png') {
                    $(`#filename-${idcontent}`).text(filename);
                    process_image(files).then(function (response) {
                        src_foto.attr("src", response);
                    });
                    src_foto.closest('div').removeClass("hide");
                } else {
                    bootbox.dialog({
                        message: "File Harus Berupa Gambar Bertipe JPG, JPEG, PNG"
                    });

                }
            };

            reader.readAsDataURL(uploader[0].files[0]);
        });
    },

    showDataKaryawan:(elm)=>{
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(KoreksiAbsen.moduleApi()) + "showDataKaryawan",

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
                KoreksiAbsen.getDataKaryawan();
            }
        });
    },

    getDataKaryawan: async () => {
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
                    [10, 50, 100],
                    [10, 50, 100]
                ],
                "ajax": {
                    "url": url.base_url(KoreksiAbsen.moduleKaryawanApi()) + `getDataFinger`,
                    "type": "GET",
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
                        "data": "id_finger",
                    },
                    {
                        "data": "area",
                    },
                    {
                        "data": "nik",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" id_finger="${row.id_finger}" area_finger="${row.area_finger}" data_id="${data}" onclick="KoreksiAbsen.pilihData(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihData:(elm)=>{
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let id_finger = $(elm).attr('id_finger');
        let area_finger = $(elm).attr('area_finger');
        let nik = $(elm).attr('data_id');
        $('#nik').val(nik+" - "+nama_lengkap);
        $('#nik').attr('id_finger', id_finger);
        $('#nik').attr('area_finger', area_finger);
        message.closeDialog();
    },

    setNik:(elm, e)=>{
        let nik = $(elm).is(':checked') ? $(elm).attr('nik') : '';
        $('#nik').val(nik);
    },

    modulePerubahan: () => {
        return "transaksi/perubahandatakaryawan";
    },

    modulePerubahanApi: () => {
        return `api/${KoreksiAbsen.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $('input#id').val();
        window.location.href = url.base_url(KoreksiAbsen.modulePerubahan()) + "ubah?id=" + data_id + "&state=karyawan-" + from_id;
    },

    showDetailEditProfile:(elm, e)=>{
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(KoreksiAbsen.modulePerubahanApi()) + "showDetailEditProfile",

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

            }
        });
    },

    checkAll:(elm)=>{
        let checkHead = $(elm);
        if(checkHead.is(':checked')){
            $('.checkdetail').prop('checked', true);
        }else{
            $('.checkdetail').prop('checked', false);
        }
    },

    checkData:(elm)=>{
        let checkHead = $('.checkhead');
        let checkDetail = $('.checkdetail');
        let totalTrChecked = 0;
        $.each(checkDetail, function(){
            if($(this).is(':checked')){
                totalTrChecked +=1;
            }
        });

        if(totalTrChecked == checkDetail.length){
            checkHead.prop('checked', true);
        }else{
            checkHead.prop('checked', false);
        }
    },

    reject:(elm)=>{
        let html = `<div class="row g-3">
        <div class="col-12">
            <br/>
            <label class="form-label" for="keterangan">Keterangan</label>
            <textarea id="keterangan" name="keterangan" error="Keterangan" class="form-control required" rows="2" placeholder="Keterangan"></textarea>
        </div>
        <div class="col-12 text-end">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="KoreksiAbsen.approve(this, event)">Proses</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },

    checkMenu:(elm)=>{
        $('input[type=checkbox]').on('change',function(){
            if ($(this).is(':checked')){
                let parent_id = $(this).attr('parent_id');
                $('div#menu-data').find(`input.checkmenu-${parent_id}`).prop('checked', true);
            } else {
                $('div#menu-data').find(`input.checkmenu-${parent_id}`).prop('checked', false);
            }
        });
    },

    getPostData: () => {
        let data = {
            'data': {
                'id': '',
                'nik': $.trim($('#nik').val()),
                'id_finger': $.trim($('#nik').attr('id_finger')),
                'area_finger': $.trim($('#nik').attr('area_finger')),
                'tgl_absen': $.trim($('#tgl_absen').val()),
                'jam_masuk': $.trim($('#jam_masuk').val()),
                'jam_keluar': $.trim($('#jam_keluar').val()),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = KoreksiAbsen.getPostData();
        let form = $(elm).closest('div.row');
        if(validation.runWithElement(form)){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(KoreksiAbsen.moduleApi()) + "submit",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function () {
                    message.closeLoading();
                    Toast.error('Informasi',"Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi','Data Berhasil Disimpan');
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

    moduleLaporanAbsen: () => {
        return "laporan/absensi";
    },

    moduleLaporanAbsenApi: () => {
        return `api/${KoreksiAbsen.moduleLaporanAbsen()}`;
    },

    showListDepartemen: (elm) => {
        let params = {};
        params.divisi = $(elm).val();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(KoreksiAbsen.moduleLaporanAbsenApi()) + "showListDepartemen",

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
	KoreksiAbsen.getData();
    KoreksiAbsen.getDataKaryawan();
    KoreksiAbsen.setDate();
    KoreksiAbsen.select2All();
    KoreksiAbsen.checkData();
    KoreksiAbsen.checkMenu();

});
