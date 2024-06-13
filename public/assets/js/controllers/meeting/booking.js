let Booking = {
    module: () => {
        return "meeting/bookingroom";
    },

    moduleApi: () => {
        return `api/${Booking.module()}`;
    },

    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleRoom:()=>{
        return 'meeting/ruang'
    },

    moduleRuangApi: () => {
        return `api/${Booking.moduleRoom()}`;

    },
    moduleKaryawanApi: () => {
        return `api/${Booking.moduleKaryawan()}`;
    },

    add: () => {
        window.location.href = url.base_url(Booking.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Booking.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(Booking.module()) + "index";
    },

    getData: async () => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();

        let params = {}
            params.tgl_meeting = $("#tgl_meeting").val()
            params.area_meeting = $("#area-meeting").val()
            params.ruang_meeting = $("#ruang-meeting").val()
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
                    "url": url.base_url(Booking.moduleApi()) + `getData`,
                    "type": "POST",
                    "data" : params
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
                        "data": "doc_trans",
                    },
                    {
                        "data": "waktu_mulai",
                        render: function (data, type, row, meta) {
                            return moment(data).format('YYYY-MM-DD');
                        }
                    },
                    {
                        "data": "nama_sites",
                    },
                    {
                        "data": "nama_ruang",
                    },
                    {
                        "data": "judul_meeting",
                    },
                    {
                        "data": "status",
                        render: function (data, type, row, meta) {
                            if(data == "START"){
                                return  `<span class="badge rounded-pill bg-info">SEDANG BERLANGSUNG</span>`
                            }else if(data == "FINISH"){
                                return `<span class="badge rounded-pill bg-success">SELESAI</span>`
                            }else{
                                return  `<span class="badge rounded-pill bg-secondary">BELUM DI MULAI</span>`
                            }
                            // return moment(data).format('YYYY-MM-DD');
                        }
                    },
                    {
                        "data": "nama_lengkap",
                    },
                    {
                        "data": "waktu_mulai",
                        render: function (data, type, row, meta) {
                            return moment(data).format('HH:mm');
                        }
                    },
                    {
                        "data": "waktu_selesai",
                        render: function (data, type, row, meta) {
                            return moment(data).format('HH:mm');
                        }
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="Booking.ubah(this)"></i>
                            <i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="Booking.delete(this, event)"></i>`;
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
            <button class="btn btn-primary btn-sm" onclick="Booking.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(Booking.moduleApi()) + "delete",

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

    getPostItemDetail: () => {
        let data = [];
        let checkDetail = $('.checkdetail');
        $.each(checkDetail, function () {
            let params = {};
            params.code = $(this).attr('data_id');
            if ($(this).is(':checked')) {
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
    //         'data_detail': Booking.getPostItemDetail()
    //     };
    //     return data;
    // },

    approve: (elm, e) => {
        e.preventDefault();
        let params = Booking.getPostData();
        if ($('#keterangan').length > 0) {
            if ($('#keterangan').val() == '') {
                Toast.error('Informasi', 'Keterangan Belum Diisi');
                return;
            } else {
                params.keterangan = $('#keterangan').val();
            }
        }
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Booking.moduleApi()) + "approve",
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

    setDate: () => {
        let dataDate = $('.data-date');
        $.each(dataDate, function () {
            $(this).flatpickr();
        });

        let dataDateTime = $('.data-datetime');
        $.each(dataDateTime, function () {
            $(this).flatpickr({
                enableTime: true,
                dateFormat: 'Y-m-d H:i'
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

    showDataKaryawan: (elm) => {
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Booking.moduleApi()) + "showDataKaryawan",

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
                Booking.getDataKaryawan();
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
                    "url": url.base_url(Booking.moduleKaryawanApi()) + `getData`,
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="Booking.pilihData(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihData: (elm) => {
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');
        $('#nik').val(nik + " - " + nama_lengkap);
        message.closeDialog();
    },

    setNik: (elm, e) => {
        let nik = $(elm).is(':checked') ? $(elm).attr('nik') : '';
        $('#nik').val(nik);
    },

    modulePerubahan: () => {
        return "transaksi/perubahandatakaryawan";
    },

    modulePerubahanApi: () => {
        return `api/${Booking.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $('input#id').val();
        window.location.href = url.base_url(Booking.modulePerubahan()) + "ubah?id=" + data_id + "&state=karyawan-" + from_id;
    },

    showDetailEditProfile: (elm, e) => {
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Booking.modulePerubahanApi()) + "showDetailEditProfile",

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

            }
        });
    },

    checkAll: (elm) => {
        let checkHead = $(elm);
        if (checkHead.is(':checked')) {
            $('.checkdetail').prop('checked', true);
        } else {
            $('.checkdetail').prop('checked', false);
        }
    },

    checkData: (elm) => {
        let checkHead = $('.checkhead');
        let checkDetail = $('.checkdetail');
        let totalTrChecked = 0;
        $.each(checkDetail, function () {
            if ($(this).is(':checked')) {
                totalTrChecked += 1;
            }
        });

        if (totalTrChecked == checkDetail.length) {
            checkHead.prop('checked', true);
        } else {
            checkHead.prop('checked', false);
        }
    },

    reject: (elm) => {
        let html = `<div class="row g-3">        
        <div class="col-12">
            <br/>
            <label class="form-label" for="keterangan">Keterangan</label>
            <textarea id="keterangan" name="keterangan" error="Keterangan" class="form-control required" rows="2" placeholder="Keterangan"></textarea>
        </div>
        <div class="col-12 text-end">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="Booking.approve(this, event)">Proses</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },

    checkMenu: (elm) => {
        $('input[type=checkbox]').on('change', function () {
            if ($(this).is(':checked')) {
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
                'id': $('input#id').val(),
                'nik': $.trim($('#nik').val()),
                'mulai': $.trim($('#mulai').val()),
                'selesai': $.trim($('#selesai').val()),
                'judul': $.trim($('#judul').val()),
                'sites': $.trim($('#sites').val()),
                'ruang': $.trim($('#ruang').val()),
                'jml_peserta': $.trim($('#jml_peserta').val()),
                'peserta': $.trim($('#peserta').val()),
                'catatan_peserta' : $.trim($("#catatan_peserta").val())
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Booking.getPostData();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Booking.moduleApi()) + "submit",
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

    getRuangMeeting:(e,idObject) => {
        $('#'+idObject)
            .find('option')
            .remove()
            .end()
            .append('<option value="">Pilih</option>')
            .val('');
        let params = {}
            params.id = e;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Booking.moduleRuangApi()) + "listroom",
            beforeSend: () => {
                message.loadingProses('Proses Ambil Data...');
            },
            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    const dataResponse = resp.data;
                    console.log(dataResponse.length)
                    let html="";
                    for(let i=0;i<dataResponse.length;i++){
                        html+= `<option value='${dataResponse[i].id}'>${dataResponse[i].nama_ruang}`+`</option>`
                    }
                    $("#"+idObject).append(html)
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },

    selesaiMeeting:(elm)=>{
        let params = {};
        params.doc = $("#doc_trans_hd").val();
        // params.status = 'FINISH';
        params.status = $(elm).attr('status');

        console.log('params',params);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url:  url.base_url(Booking.moduleApi()) + "submitMeeting",

            beforeSend: () => {

            },

            error: function () {

            },

            success: function (resp) {
                if(resp.is_valid){
                    Toast.success('Informasi', 'Meeting Berhasil '+params.status);
                    window.location.reload();
                }else{
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },
};

$(function () {
    Booking.getData();
    Booking.getDataKaryawan();
    Booking.setDate();
    Booking.select2All();
    Booking.checkData();
    Booking.checkMenu();

});
