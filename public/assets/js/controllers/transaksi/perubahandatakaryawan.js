let PerubahanDataKaryawan = {
    module: () => {
        return "transaksi/perubahandatakaryawan";
    },

    moduleApi: () => {
        return `api/${PerubahanDataKaryawan.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(PerubahanDataKaryawan.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(PerubahanDataKaryawan.module()) + "ubah?id=" + data_id;
    },

    moduleKaryawan:()=>{
        return "master/karyawan";
    },

    back: (elm) => {
        let state = $(elm).attr('state');
        if(state == ''){
            window.location.href = url.base_url(PerubahanDataKaryawan.module()) + "index";
        }else{
            let data = state.split('-');
            window.location.href = url.base_url(PerubahanDataKaryawan.moduleKaryawan()) + "ubah?id=" + data[1].trim();
        }
    },

    getData: async () => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();
        let params = {};
        params.area = $('#area').val();
        params.divisi = $('#divisi').val();
        params.departemen = $('#departemen').val();
        params.jabatan = $('#jabatan').val();
        params.status = $("#cb-status").val();
        params.tgl_pengajuan = $("#tgl_pengajuan").val();
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
                    [100, 500, 1000,10000],
                    [100, 500, 1000,10000]
                ],
                "ajax": {
                    "url": url.base_url(PerubahanDataKaryawan.moduleApi()) + `getData`,
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
                "columns": [{
                        "data": "nik",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "doc_trans",
                        "render": (data, type, row, meta) => {
                                return `<a class="" style="cursor: pointer;" onclick="PerubahanDataKaryawan.showDetailEditProfile(this, event)">${data}</a>`;
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
                        "data": "tgl_pengajuan",
                    },
                    {
                        "data": "remark",
                    },
                    // {
                    //     "data": "tgl_approve",
                    // },
                    {
                        "data": "tgl_dirubah",
                    },
                    {
                        "data": "tgl_verifikasi",
                    },
                    {
                        "data": "is_release",
                        "render": (data, type, row, meta) => {
                           let html = ""
                           if(data == 1){
                                html = "sudah verifikasi"
                           }else{
                                html = "belum verifikasi"
                           }
                           return html
                        }
                    },
                    {
                        "data": "lpp_id",
                        "render": (data, type, row, meta) => {
                            // console.log('row', row);
                            if(data != "" && data != null){
                                return `
                                <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="PerubahanDataKaryawan.ubah(this)"></i>`;
                            }else{
                                if(row.approved_name == null){
                                    return `Menunggu Approval Pengajuan Edit Profile`;
                                }else{
                                    if(row.approved_name != null){
                                        return `Menunggu Perubahan Data Oleh Karyawan`;
                                    }
                                }
                            }
                        }
                    }
                ],
                dom:
                '<"row mx-2"' +
                '<"col-md-2"<"me-3"l>>' +
                '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
                '>t' +
                '<"row mx-2"' +
                '<"col-sm-12 col-md-6"i>' +
                '<"col-sm-12 col-md-6"p>' +
                '>',
                'buttons': [
                    {
                      extend: 'collection',
                      className: 'btn btn-label-secondary dropdown-toggle mx-3',
                      text: '<i class="bx bx-upload me-2"></i>Export',
                      buttons: [
                        {
                          extend: 'print',
                          text: '<i class="bx bx-printer me-2" ></i>Print',
                          className: 'dropdown-item',
                        //   exportOptions: { columns: [2, 3, 4, 5] }
                        },
                        {
                          extend: 'csv',
                          text: '<i class="bx bx-file me-2" ></i>Csv',
                          className: 'dropdown-item',
                        //   exportOptions: { columns: [2, 3, 4, 5] }
                        },
                        {
                          extend: 'excel',
                          text: '<i class="bx bx-file me-2" ></i>Excel',
                          className: 'dropdown-item',
                        //   exportOptions: { columns: [2, 3, 4, 5] }
                        },
                        {
                          extend: 'pdf',
                          text: '<i class="bx bxs-file-pdf me-2"></i>Pdf',
                          className: 'dropdown-item',
                        //   exportOptions: { columns: [2, 3, 4, 5] }
                        },
                        {
                          extend: 'copy',
                          text: '<i class="bx bx-copy me-2" ></i>Copy',
                          className: 'dropdown-item',
                        //   exportOptions: { columns: [2, 3, 4, 5] }
                        }
                      ]
                    },
                ],
                scrollY:        "700px",
                scrollX:        true,
                scrollCollapse: true,
                fixedColumns:   {
                    leftColumns: 5
                }
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
            <button class="btn btn-primary btn-sm" onclick="PerubahanDataKaryawan.deleteConfirm(this, '${data_id}')">Ya</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Tidak</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });

        $('.bootbox-close-button').addClass('btn-close').text("");
    },

    deleteConfirm: (elm, id) => {
        let params = {};
        params.id = id;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(PerubahanDataKaryawan.moduleApi()) + "delete",

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

    getPostInputDokumen:()=>{
        let params = {};
        let data_file = $('div.content-file-upload');
        $.each(data_file, function (){
            let $this = $(this);
            let attr_obj_img = $this.find('img').attr('id');
            // let attr_obj_filename = $this.find('label').attr('id');
            params[`${attr_obj_img.replaceAll('-', '_')}`] = $this.find('img').attr('src').replace('data:image/jpeg;base64,', '');
            // params[`${attr_obj_filename.replaceAll('-', '_')}`] = $this.find('label').text().trim();
        });

        return params;
    },

    getPostData: () => {
        let data = {
            'data_personal': {
                'id': $('input#id').val(),
                'nik_ktp' : $.trim($('#nik_ktp').val()),
                'nama_ktp' : $.trim($('#nama_ktp').val()),
                'gelar_ktp' : $.trim($('#gelar_ktp').val()),
                'usia' : $.trim($('#usia').val()),
                'gender' : $.trim($('#gender').val()),
                'tgl_lahir' : $.trim($('#tgl_lahir').val()),
                'gol_darah' : $.trim($('#gol_darah').val()),
                'agama' : $.trim($('#agama').val()),
                'status_kawin' : $.trim($('#status_kawin').val()),
                'pendidikan_terakhir' : $.trim($('#pendidikan_terakhir').val()),
                'no_npwp' : $.trim($('#no_npwp').val()),
                'no_hp' : $.trim($('#no_hp').val()),
                'nama_darurat' : $.trim($('#nama_darurat').val()),
                'no_hp_darurat' : $.trim($('#no_hp_darurat').val()),
                'no_rek_pribadi' : $.trim($('#no_rek_pribadi').val()),
                'nama_rek_pribadi' : $.trim($('#nama_rek_pribadi').val()),
                'no_bpjstk' : $.trim($('#no_bpjstk').val()),
                'no_bpjstk_kesehatan' : $.trim($('#no_bpjstk_kesehatan').val()),
                'alamat' : $.trim($('#alamat').val()),
            },
            'data_dokumen': PerubahanDataKaryawan.getPostInputDokumen()
        };
        return data;
    },

    verify: (elm, e) => {
        e.preventDefault();
        let params = PerubahanDataKaryawan.getPostData();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(PerubahanDataKaryawan.moduleApi()) + "verify",
            beforeSend: () => {
                message.loadingProses('Proses verifikasi Data...');
            },
            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success("Informasi",'Data Berhasil Diverifikasi');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                    $('.bootbox-close-button').addClass('btn-close').text("");
                }
            }
        });
    },
    
    approve: (elm) => {
        let params = {};
        params.no_pengajuan = $('#no_pengajuan').val();
        params.nik = $('#nik').val();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(PerubahanDataKaryawan.moduleApi()) + "approve",
            beforeSend: () => {
                message.loadingProses('Proses approve Data...');
            },
            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi','Data Berhasil Diapprove');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                    $('.bootbox-close-button').addClass('btn-close').text("");
                }
            }
        });
    },

    setDate: () => {
        let dataDate = $('.data-date');
        $.each(dataDate, function(){
            $(this).flatpickr();
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
                    $('.bootbox-close-button').addClass('btn-close').text("");
                }
            };

            reader.readAsDataURL(uploader[0].files[0]);
        });
    },

    showFoto:(elm)=>{
        let data = $(elm).attr('src');
        let html = `<div class="row g-3">
        <div class="col-12">
            <br/>
            <img src="${data}"/>
        </div>
        </div>`;
        bootbox.dialog({
            message: html,
            size: 'large'
        });
        $('.bootbox-close-button').addClass('btn-close').text("");
    },

    showDetailEditProfile:(elm, e)=>{
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(PerubahanDataKaryawan.moduleApi()) + "showDetailEditProfile",

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

    moduleLaporanAbsen: () => {
        return "laporan/absensi";
    },

    moduleLaporanAbsenApi: () => {
        return `api/${PerubahanDataKaryawan.moduleLaporanAbsen()}`;
    },

    showListDepartemen: (elm) => {
        let params = {};
        params.divisi = $(elm).val();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(PerubahanDataKaryawan.moduleLaporanAbsenApi()) + "showListDepartemen",

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
    PerubahanDataKaryawan.getData();
    PerubahanDataKaryawan.setDate();
    PerubahanDataKaryawan.select2All();
});
