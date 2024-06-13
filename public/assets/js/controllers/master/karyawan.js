
let Karyawan = {
    module: () => {
        return "master/karyawan";
    },

    moduleProfile: () => {
        return "account/profile";
    },

    moduleApi: () => {
        return `api/${Karyawan.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(Karyawan.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Karyawan.module()) + "ubah?id=" + data_id;
    },

    detail: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Karyawan.module()) + "detail?id=" + data_id;
    },

    detailPrint: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.open(url.base_url(Karyawan.module()) + "detail-print?id=" + data_id);
    },

    resign: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Karyawan.module()) + "resign?id=" + data_id;
    },

    resignPrint: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.open(url.base_url(Karyawan.module()) + "resign-print?id=" + data_id);
    },

    perubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Karyawan.module()) + "perubahan?id=" + data_id;
    },

    perubahanPrint: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.open(url.base_url(Karyawan.module()) + "perubahan-print?id=" + data_id);
    },

    back: (elm) => {
        let type = $(elm).attr("from");
        if(type == ''){
            window.location.href = url.base_url(Karyawan.module()) + "index";
        }else{
            window.location.href = url.base_url(Karyawan.moduleProfile()) + "index";
        }
    },

    getData: () => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();
        let params = {};
        params.area = $('#area').val();
        params.divisi = $('#divisi').val();
        params.departemen = $('#departemen').val();
        params.jabatan = $('#jabatan').val();
        params.status = $('#status').val();
        params.status_karyawan = $('#status_kry').val();

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
                    "url": url.base_url(Karyawan.moduleApi()) + `getData`,
                    "type": "POST",
                    "data": params,
                    "dataType" : "json"
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [
                    {
                        "targets": 0,
                        "orderable": true,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                        }
                    },
                    {
                        "targets": 1,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                        }
                    },
                    {
                        "targets": [2,3,4,5,6,7,8,9,10,11,12,13,14],
                        "orderable": false,
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
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';

                            htmlAction += `<div class="dropdown d-inline">
                                            <button class="btn btn-light mx-2" type="button" id="action1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="bx bx-dots-vertical-rounded"></i>
                                            </button>
                                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="action1">
                                            <a data_id="${data}" class="dropdown-item" href="javascript:;" onclick="Karyawan.detail(this);">Detail</a>
                                            <a data_id="${data}" class="dropdown-item" href="javascript:;" onclick="Karyawan.perubahan(this);">Perubahan Data</a>
                                            <a data_id="${data}" class="dropdown-item" href="javascript:;" onclick="Karyawan.resign(this);">Resign</a>
                                            </div>
                                        </div>`;

                            // if(updateAction == '1'){
                            //     htmlAction += `<button data_id="${data}" class="btn btn-light mx-2" onclick="Karyawan.detail(this)"><i class="fa fa-address-card-o" ></i></button>`;
                            //     htmlAction += `<button data_id="${data}" class="btn btn-light mx-2" onclick="Karyawan.perubahan(this)"><i class="fa fa-id-card" ></i></button>`;
                            // }
                            if(updateAction == '1' && row.approve_gm != '0'){
                                htmlAction += `<button data_id="${data}" class="btn btn-warning mx-2" onclick="Karyawan.ubah(this)"><i class="bx bx-edit" ></i></button>`;
                            }
                            
                            if(deleteAction == '1' && row.approve_gm != '0'){
                                htmlAction += `<button data_id="${data}" class="btn btn-danger mx-2" onclick="Karyawan.delete(this, event)"><i class="bx bx-trash" ></i></button>`;
                            }                     
                            
                            if(row.approve_gm == '0' || row.approve_gm == '2'){
                                htmlAction += `<button data_id="${data}" class="btn btn-primary mx-2" onclick="Karyawan.showPengajuanData(this, event)"><i class="bx bx-notepad"></i></button>`;
                            }
                            return htmlAction;
                        }
                    },
                    {
                        "data": "nik",
                        "render": (data, type, row, meta) => {
                            return `${data}`;
                        }
                    },
                    {
                        "data": "nama_lengkap",
                    },
                    {
                        "data": "area_kerja",
                    },
                    {
                        "data": "nama_divisi",
                    },
                    {
                        "data": "nama_departemen",
                    },
                    
                    {
                        "data": "nama_jabatan",
                    },
                    {
                        "data": "golongan_jabatan",
                    },
                    {
                        "data": "tgl_masuk",
                    },
                    {
                        "data": "tgl_angkat",
                    },
                    {
                        "data": "tgl_keluar",
                    },
                    {
                        "data": "domisili_alamat",
                        "visible": false
                    },
                    {
                        "data": "tempat_lahir",
                        "visible": false
                    },
                    {
                        "data": "tgl_lahir",
                        "visible": false
                    },
                    {
                        "data": "agama",
                        "visible": false
                    },
                    {
                        "data": "telp_hp",
                        "visible": true
                    },
                    {
                        "data": "telp_operasional",
                        "visible": true
                    },
                    {
                        "data": "email",
                        "visible": false
                    },
                    {
                        "data": "nobpjs_tk",
                        "visible": false
                    },
                    {
                        "data": "nobpjs",
                        "visible": false
                    },
                    {
                        "data": "nik_ktp",
                        "visible": false
                    },
                    {
                        "data": "jenis_kelamin",
                        "visible": false
                    },
                    {
                        "data": "npwp",
                        "visible": false
                    },
                    {
                        "data": "pendidikan_terakhir",
                        "visible": false
                    },
                    {
                        "data": "status_karyawan_name",
                    },
                    {
                        "data": "status_nikah",
                        "visible": false
                        // "render": (data, type, row, meta) => {
                        //     return ``;
                        // }
                    },
                    {
                        "data": "rekening",
                        "visible": false
                    },
                    {
                        "data": "status_karyawan_name",
                        "render":(data, type, row, meta) => {
                            if(row.approve_gm == '0'){
                                return `<span class="badge bg-label-primary">Menunggu Approval GM</span>`;
                            }
                            if(row.approve_gm == '1'){
                                return `<span class="badge bg-label-success">Approved</span>`;
                            }
                            if(row.approve_gm == '2'){
                                return `<span class="badge bg-label-danger">Rejected</span>`;
                            }
                            return "";
                        }
                    },
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
                          extend: 'excel',
                          text: '<i class="bx bx-file me-2" ></i>Excel',
                          className: 'dropdown-item',
                          customizeData: function(data) {
                            for(var i = 0; i < data.body.length; i++) {
                              for(var j = 11; j < data.body[i].length; j++) {
                                data.body[i][j] = '\u200C' + data.body[i][j];
                              }
                            }
                          },
                          exportOptions: { 
                            columns: [ 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26 ],
                            format: {
                                body: function(data, row, column, node) {
                                  switch (column) {
                                    case 8:
                                      return moment(data, 'YYYY-MM-DD').format('YYYY-MM-DD')
                                      break
                                    case 9:
                                        if(data) {
                                            return moment(data, 'YYYY-MM-DD').format('YYYY-MM-DD');
                                        } else {
                                            return '';
                                        }
                                      break
                                    // case 10:
                                    //     if(data) {
                                    //         return moment(data, 'YYYY-MM-DD').format('MM/DD/YYYY');
                                    //     } else {
                                    //         return '';
                                    //     }
                                    //   break
                                    default:
                                      return data
                                      break
                                  }
                                }
                            }

                          }
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
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan menghapus data ini ?</p>
        </div>
        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="Karyawan.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(Karyawan.moduleApi()) + "delete",

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

    getPostData: () => {
        let data = {
            'data_personal': {
                'id': $('input#id').val(),
                'nik_ktp': $.trim($('#nik_ktp').val()),
                'nik_kry': $.trim($('#nik_kry').val()),
                'nik_lama': $.trim($('#nik_lama').val()),
                'alamat': $.trim($('#alamat').val()),
                'area_kerja': $.trim($('#area_kerja').val()),
                'nama_ktp': $.trim($('#nama_ktp').val()),
                'gelar_ktp': $.trim($('#gelar_ktp').val()),
                'usia': $.trim($('#usia').val()),
                'gender': $.trim($('#gender').val()),
                'tempat_lahir': $.trim($('#tempat_lahir').val()),
                'tgl_lahir': $.trim($('#tgl_lahir').val()),
                'gol_darah': $.trim($('#gol_darah').val()),
                'agama': $.trim($('#agama').val()),
                'status_kawin': $.trim($('#status_kawin').val()),
                'pendidikan_terakhir': $.trim($('#pendidikan_terakhir').val()),
                'no_npwp': $.trim($('#no_npwp').val()),
                'no_hp': $.trim($('#no_hp').val()),
                'no_operasional': $.trim($('#no_operasional').val()),
                'nama_darurat': $.trim($('#nama_darurat').val()),
                'no_hp_darurat': $.trim($('#no_hp_darurat').val()),
                'no_rek_pribadi': $.trim($('#no_rek_pribadi').val()),
                'atasnama': $.trim($('#atasnama').val()),
                'no_bpjstk': $.trim($('#no_bpjstk').val()),
                'no_bpjskes': $.trim($('#no_bpjskes').val()),
                'email': $.trim($('#email').val()),
                'tgl_masuk': $.trim($('#tgl_masuk').val()),
                'tgl_angkat': $.trim($('#tgl_angkat').val()),
                'departemen': $.trim($('#departemen').val()),
                'jabatan': $.trim($('#jabatan').val()),
                'job_struktur': $.trim($('#job_struktur').val()),
                'status_karyawan': $.trim($('#status_karyawan').val()),
                'golongan': $.trim($('#golongan').val()),
                'potbpjs2': $.trim($('#potbpjs2').val()),
                'potkpj2': $.trim($('#potkpj2').val()),
                // untuk resign
                'tgl_keluar': $.trim($('#tgl_keluar').val()),
                'tgl_posting': $.trim($('#tgl_posting').val()),
                'prorate': $.trim($('#prorate').val()),
                'hrkerja': $.trim($('#hrkerja').val()),
                'potbpjs': $.trim($('#potbpjs').val()),
                'potkpj': $.trim($('#potkpj').val()),
                'note': $.trim($('#note').val())
            },
            'data_keluarga': Karyawan.getPostItemDataKeluarga(),
            'data_formal': Karyawan.getPostItemDataPendFormal(),
            'data_non_formal': Karyawan.getPostItemDataPendNonFormal(),
            'data_pengalaman': Karyawan.getPostItemDataPengalaman(),
            'data_org': Karyawan.getPostItemDataOrg(),
            'data_dokumen': Karyawan.getPostInputDokumen()
        };
        return data;
    },

    getPostDataFinger: () => {
        let data = {
            'data': {
                'id': $('input#id').val(),
                'nik_ktp': $.trim($('#nik_ktp').val()),
            },
            'data_finger': Karyawan.getPostInputFinger()
        };
        return data;
    },

    getPostItemDataKeluarga:(elm)=>{
        let data = [];
        let keluarga = $('#table-data-keluarga').find('tbody').find('tr.input');
        $.each(keluarga, function () {
            let params = {};
            params.id = $(this).attr('data_id');
            params.hubungan_keluarga = $(this).find('#hubungan_keluarga').val();
            params.nama_hubungan = $(this).find('#nama_hubungan').val();
            params.jk_hubungan = $(this).find('#jk_hubungan').val();
            params.usia_hubungan = $(this).find('#usia_hubungan').val();
            params.pend_hubungan = $(this).find('#pend_hubungan').val();
            params.remove = $(this).hasClass('remove') ? 1 : 0;
            data.push(params);
        });

        return data;
    },

    getPostInputFinger:(elm)=>{
        let data = [];
        let finger = $('#table-data-finger-id').find('tbody').find('tr.input');
        $.each(finger, function () {
            let params = {};
            params.id = $(this).attr('data_id');
            params.id_finger = $(this).find('#id-finger').val();
            params.area_finger = $(this).find('#area_finger').val();
            params.remove = $(this).hasClass('remove') ? 1 : 0;
            data.push(params);
        });

        return data;
    },

    getPostItemDataPendFormal:(elm)=>{
        let data = [];
        let pendidikan = $('#table-data-formal').find('tbody').find('tr.input');
        $.each(pendidikan, function () {
            let params = {};
            params.id = $(this).attr('data_id');
            params.pend_formal = $(this).find('#pend_formal').val();
            params.nama_sekolah = $(this).find('#nama_sekolah').val();
            params.tempat = $(this).find('#tempat').val();
            params.fakultas = $(this).find('#fakultas').val();
            params.jurusan = $(this).find('#jurusan').val();
            params.tahun_masuk = $(this).find('#tahun_masuk').val();
            params.tahun_keluar = $(this).find('#tahun_keluar').val();
            params.nilai = $(this).find('#nilai').val();
            params.filename = $(this).find('#file_sertifikat').val();
            params.file_sertifikat = $(this).find('#file_sertifikat').attr('src');
            data.push(params);
        });

        return data;
    },

    getPostItemDataPendNonFormal:(elm)=>{
        let data = [];
        let pendidikan = $('#table-data-non-formal').find('tbody').find('tr.input');
        $.each(pendidikan, function () {
            let params = {};
            params.id = $(this).attr('data_id');
            params.macam_pelatihan = $(this).find('#macam_pelatihan').val();
            params.badan_penyelenggara = $(this).find('#badan_penyelenggara').val();
            params.tempat = $(this).find('#tempat_non').val();
            params.tahun_masuk = $(this).find('#tahun_masuk').val();
            params.tahun_keluar = $(this).find('#tahun_keluar').val();
            params.filename = $(this).find('#file_sertifikat').val();
            params.file_sertifikat = $(this).find('#file_sertifikat').attr('src');
            data.push(params);
        });

        return data;
    },

    getPostItemDataPengalaman:(elm)=>{
        let data = [];
        let pengalaman = $('#table-data-pengalaman').find('tbody').find('tr.input');
        $.each(pengalaman, function () {
            let params = {};
            params.id = $(this).attr('data_id');
            params.nama_perusahaan = $(this).find('#nama_perusahaan').val();
            params.alamat_perusahaan = $(this).find('#alamat_perusahaan').val();
            params.uraian_tugas = $(this).find('#uraian_tugas').val();
            params.jabatan = $(this).find('#jabatan').val();
            params.alasan_berhenti = $(this).find('#alasan_berhenti').val();
            params.mulai_bekerja = $(this).find('#mulai_bekerja').val();
            params.berhenti_bekerja = $(this).find('#berhenti_bekerja').val();
            params.gaji_terakhir = $(this).find('#gaji_terakhir').val();
            params.fasilitas = $(this).find('#fasilitas').val();
            data.push(params);
        });

        return data;
    },

    getPostItemDataOrg:(elm)=>{
        let data = [];
        let organisasi = $('#table-data-organisasi').find('tbody').find('tr.input');
        $.each(organisasi, function () {
            let params = {};
            params.id = $(this).attr('data_id');
            params.organisasi = $(this).find('#organisasi').val();
            params.tahun_org = $(this).find('#tahun_org').val();
            params.jabatan = $(this).find('#jabatan').val();
            params.lokasi = $(this).find('#lokasi').val();
            data.push(params);
        });

        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Karyawan.getPostData();

        // console.log(params);return;
        

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Karyawan.moduleApi()) + "submit",
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
    },
    
    submitData: (elm, e) => {
        e.preventDefault();
        let params = Karyawan.getPostData();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Karyawan.moduleApi()) + "submitData",
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
    },

    submitFinger: (elm, e) => {
        e.preventDefault();
        let params = Karyawan.getPostDataFinger();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Karyawan.moduleApi()) + "submitFinger",
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
    },

    setDate: () => {
        const flatpickrRange = document.querySelector('.flatpickr');
        if(flatpickrRange){
            flatpickrRange.flatpickr();
        }
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

    getDataLogKaryawan: async () => {
        let tableData = $('table#table-data-log-karyawan');

        let params = {};
        params.nik = $('#id').val();
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
                    "url": url.base_url(Karyawan.moduleApi()) + `getDataLogKaryawan`,
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
                        "targets": 2,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
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
                            return `<a class="" style="cursor: pointer;" onclick="Karyawan.showDetailEditProfile(this, event)">${data}</a>`;
                        }
                    },
                    {
                        "data": "tgl_pengajuan",
                    },
                    {
                        "data": "lpp_id",
                        "render": (data, type, row, meta) => {
                            if (row.tgl_verifikasi != '' && row.status == 'approved') {
                                return `<label class="text-success">Terverifikasi</label>`;
                            } else {
                                if (row.status == 'reject') {
                                    return `<label class="text-danger">Ditolak</label>`;
                                } else {
                                    if (row.tgl_approve == '') {
                                        return `<label class="text-primary">Proses Approval Perubahan</label>`;
                                    } else {
                                        return `<label class="">Proses Verifikasi</label>`;
                                    }
                                }
                            }
                        }
                    },
                    {
                        "data": "lpp_id",
                        "render": (data, type, row, meta) => {
                            return `
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="Karyawan.detailPerubahan(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    modulePerubahan: () => {
        return "transaksi/perubahandatakaryawan";
    },

    modulePerubahanApi: () => {
        return `api/${Karyawan.modulePerubahan()}`;
    },

    moduleHubungan: () => {
        return "master/hubungan_keluarga";
    },

    moduleHubunganApi: () => {
        return `api/${Karyawan.moduleHubungan()}`;
    },

    modulePendidikan: () => {
        return "master/pendidikan";
    },

    modulePendidikanApi: () => {
        return `api/${Karyawan.modulePendidikan()}`;
    },

    moduleTahun: () => {
        return "master/tahun";
    },

    moduleTahunApi: () => {
        return `api/${Karyawan.moduleTahun()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $('input#id').val();
        window.open(url.base_url(Karyawan.modulePerubahan()) + "ubah?id=" + data_id + "&state=karyawan-" + from_id);
    },

    showDetailEditProfile:(elm, e)=>{
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Karyawan.modulePerubahanApi()) + "showDetailEditProfile",

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

    addKeluarga:(elm, e)=>{
        e.preventDefault();
        let tbody = $(elm).closest('tbody');
        let choiceHubungan = '<select id="hubungan_keluarga" class="form-control required" error="Hubungan Keluarga">';
        choiceHubungan += '<option value="">Pilih Hubungan Keluarga</option>';
        let dataHubunganKeluarga = JSON.parse($('#data-hub-keluarga').val());
        for(let i = 0; i < dataHubunganKeluarga.length; i++){
            let data = dataHubunganKeluarga[i];
            choiceHubungan += `<option value="${data.id}">${data.nama_hubungan}</option>`;
        }
        choiceHubungan += '</select>';

        let choicePendidikan = '<select id="pend_hubungan" class="form-control required" error="Pendidikan">';
        choicePendidikan += '<option value="">Pilih Pendidikan</option>';
        let dataPendidikan = JSON.parse($('#data-pendidikan').val());
        for(let i = 0; i < dataPendidikan.length; i++){
            let data = dataPendidikan[i];
            choicePendidikan += `<option value="${data.id}">${data.nama_pendidikan}</option>`;
        }
        choicePendidikan += '</select>';

        let html = `<tr class="input" data_id="">
            <td>
                ${choiceHubungan}
            </td>
            <td>
                <input type="text" id="nama_hubungan" name="nama_hubungan" error="Nama" class="form-control required" placeholder="Nama" value=""/>
            </td>
            <td>
                <select class="form-control required" id="jk_hubungan" error="Jenis Kelamin">
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-Laki">Laki-Laki</option>
                    <option value="Perempuan">Perempuan</option>
                </select>
            </td>
            <td>
                <input type="text" id="usia_hubungan" name="usia_hubungan" error="Usia" class="form-control required" placeholder="Usia" value=""/>
            </td>
            <td>
                ${choicePendidikan}
            </td>
            <td>
                <i class="bx bx-trash" style="cursor: pointer;" onclick="Karyawan.deleteHubungan(this, event)"></i>
            </td>
        </tr>`;
        tbody.prepend(html);
    },

    addFormal:(elm, e)=>{
        e.preventDefault();
        let tbody = $(elm).closest('tbody');

        let choicePendidikan = '<select id="pend_formal" class="form-control required" error="Pendidikan">';
        choicePendidikan += '<option value="">Pilih Pendidikan</option>';
        let dataPendidikan = JSON.parse($('#data-pendidikan').val());
        for(let i = 0; i < dataPendidikan.length; i++){
            let data = dataPendidikan[i];
            choicePendidikan += `<option value="${data.id}">${data.nama_pendidikan}</option>`;
        }
        choicePendidikan += '</select>';

        let choiceTahunMasuk = '<select id="tahun_masuk" class="form-control required" error="Tahun Masuk">';
        choiceTahunMasuk += '<option value="">Pilih Tahun</option>';
        let dataTahun = JSON.parse($('#data-tahun').val());

        for(let i = 0; i < dataTahun.length; i++){
            let data = dataTahun[i];
            choiceTahunMasuk += `<option value="${data}">${data}</option>`;
        }
        choiceTahunMasuk += '</select>';

        let choiceTahunKeluar = '<select id="tahun_keluar" class="form-control required" error="Tahun Keluar">';
        choiceTahunKeluar += '<option value="">Pilih Tahun</option>';
        for(let i = 0; i < dataTahun.length; i++){
            let data = dataTahun[i];
            choiceTahunKeluar += `<option value="${data}">${data}</option>`;
        }
        choiceTahunKeluar += '</select>';

        let html = `<tr class="input" data_id="">
            <td>
                ${choicePendidikan}
            </td>
            <td>
                <input type="text" id="nama_sekolah" name="nama_sekolah" error="Nama Sekolah" class="form-control required" placeholder="Nama Sekolah" value=""/>
            </td>
            <td>
                <input type="text" id="tempat" name="tempat" error="Tempat" class="form-control required" placeholder="Tempat" value=""/>
            </td>
            <td>
                <input type="text" id="fakultas" name="fakultas" error="Fakultas" class="form-control required" placeholder="Fakultas" value=""/>
            </td>
            <td>
                <input type="text" id="jurusan" name="jurusan" error="Jurusan" class="form-control required" placeholder="Jurusan" value=""/>
            </td>
            <td>
                ${choiceTahunMasuk}
            </td>
            <td>
                ${choiceTahunKeluar}
            </td>
            <td>
                <input type="text" id="nilai" name="nilai" error="Nilai" class="form-control required" placeholder="Nilai" value=""/>
            </td>
            <td>
                <input type="text" id="file_sertifikat" class="form-control" placeholder="File Sertifikat" aria-label="" aria-describedby="" onclick="Karyawan.takePictSertifikat(this, event)">
            </td>
            <td>
                <i class="bx bx-trash" style="cursor: pointer;" onclick="Karyawan.deleteFormal(this, event)"></i>
            </td>
        </tr>`;
        tbody.prepend(html);
    },

    addNonFormal:(elm, e)=>{
        e.preventDefault();
        let tbody = $(elm).closest('tbody');

        let choiceTahunMasuk = '<select id="tahun_masuk" class="form-control required" error="Tahun Masuk">';
        choiceTahunMasuk += '<option value="">Pilih Tahun</option>';
        let dataTahun = JSON.parse($('#data-tahun').val());

        for(let i = 0; i < dataTahun.length; i++){
            let data = dataTahun[i];
            choiceTahunMasuk += `<option value="${data}">${data}</option>`;
        }
        choiceTahunMasuk += '</select>';

        let choiceTahunKeluar = '<select id="tahun_keluar" class="form-control required" error="Tahun Keluar">';
        choiceTahunKeluar += '<option value="">Pilih Tahun</option>';
        for(let i = 0; i < dataTahun.length; i++){
            let data = dataTahun[i];
            choiceTahunKeluar += `<option value="${data}">${data}</option>`;
        }
        choiceTahunKeluar += '</select>';

        let html = `<tr class="input" data_id="">
            <td>
                <input type="text" id="macam_pelatihan" name="macam_pelatihan" error="Macam Pelatihan" class="form-control required" placeholder="Macam Pelatihan" value=""/>
            </td>
            <td>
                <input type="text" id="badan_penyelenggara" name="badan_penyelenggara" error="Badan Penyelenggara" class="form-control required" placeholder="Badan Penyelenggara" value=""/>
            </td>
            <td>
                <input type="text" id="tempat_non" name="tempat_non" error="Tempat" class="form-control required" placeholder="Tempat" value=""/>
            </td>
            <td>
                ${choiceTahunMasuk}
            </td>
            <td>
                ${choiceTahunKeluar}
            </td>
            <td>
                <input type="text" id="file_sertifikat" class="form-control" placeholder="File Sertifikat" aria-label="" aria-describedby="" onclick="Karyawan.takePictSertifikat(this, event)">
            </td>
            <td>
                <i class="bx bx-trash" style="cursor: pointer;" onclick="Karyawan.deleteNonFormal(this, event)"></i>
            </td>
        </tr>`;
        tbody.prepend(html);
    },

    addOrganisasi:(elm, e)=>{
        e.preventDefault();
        let tbody = $(elm).closest('tbody');

        let choiceTahun = '<select id="tahun_org" class="form-control required" error="Tahun">';
        choiceTahun += '<option value="">Pilih Tahun</option>';
        let dataTahun = JSON.parse($('#data-tahun').val());

        for(let i = 0; i < dataTahun.length; i++){
            let data = dataTahun[i];
            choiceTahun += `<option value="${data}">${data}</option>`;
        }
        choiceTahun += '</select>';

        let html = `<tr class="input" data_id="">
            <td>
                <input type="text" id="organisasi" name="organisasi" error="Organisasi" class="form-control required" placeholder="Organisasi" value=""/>
            </td>
            <td>
                ${choiceTahun}
            </td>
            <td>
                <input type="text" id="jabatan" name="jabatan" error="Jabatan" class="form-control required" placeholder="Jabatan" value=""/>
            </td>
            <td>
                <input type="text" id="lokasi" name="lokasi" error="Lokasi" class="form-control required" placeholder="Lokasi" value=""/>
            </td>
            <td>
                <i class="bx bx-trash" style="cursor: pointer;" onclick="Karyawan.deleteOrganisasi(this, event)"></i>
            </td>
        </tr>`;
        tbody.prepend(html);
    },

    addFinger:(elm, e)=>{
        e.preventDefault();
        let tbody = $(elm).closest('tbody');

        let choiceArea = '<select id="area_finger" class="form-control" error="Area">';
        choiceArea += '<option value="">Pilih Area</option>';
        let dataAreaFinger = JSON.parse($('#data-area-finger').val());

        for(let i = 0; i < dataAreaFinger.length; i++){
            let data = dataAreaFinger[i];
            choiceArea += `<option value="${data.term_id}">${data.keterangan}</option>`;
        }
        choiceArea += '</select>';

        let html = `<tr class="input" data_id="">
            <td>
                <div class="input-group">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="Karyawan.showDataFinger(this)">Pilih</button>
                    <input id="id-finger" type="text" class="form-control required" error="Id Finger" placeholder="Pilih Data Id Finger" aria-label="Pilih Id Finger" aria-describedby="button-addon1" value="">
                </div>
            </td>
            <td>
                ${choiceArea}
            </td>
            <td>
                <i class="bx bx-trash" style="cursor: pointer;" onclick="Karyawan.deleteFinger(this, event)"></i>
            </td>
        </tr>`;
        tbody.prepend(html);
    },

    showDataFinger:(elm)=>{
        let params = {};
        params.area = $(elm).closest('tr').find('#area_finger').val();
        if(params.area == ''){
            Toast.error('Informasi', 'Area Harus Dipilih');
            return;
        }

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Karyawan.moduleApi()) + "showDataFinger",

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
                $('#table-data-finger').DataTable();
            }
        });
    },

    pilihDataFinger:(elm)=>{
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let data_id = $(elm).attr('data_id');
        $('#id-finger').val(data_id+" - "+nama_lengkap);
        message.closeDialog();
    },

    addPengalaman:(elm, e)=>{
        e.preventDefault();
        let tbody = $(elm).closest('tbody');

        let html = `<tr class="input" data_id="">
            <td>
                <input type="text" id="nama_perusahaan" name="nama_perusahaan" error="Nama Perusahaan" class="form-control required" placeholder="Nama Perusahaan" value=""/>
            </td>
            <td>
                <input type="text" id="alamat_perusahaan" name="alamat_perusahaan" error="Alamat Perusahaan" class="form-control required" placeholder="Alamat Perusahaan" value=""/>
            </td>
            <td>
                <input type="text" id="uraian_tugas" name="uraian_tugas" error="Uraian Tugas" class="form-control required" placeholder="Uraian Tugas" value=""/>
            </td>
            <td>
                <input type="text" id="jabatan" name="jabatan" error="Jabatan" class="form-control required" placeholder="Jabatan" value=""/>
            </td>
            <td>
                <input type="text" id="alasan_berhenti" name="alasan_berhenti" error="Alasan Berhenti" class="form-control required" placeholder="Alasan Berhenti" value=""/>
            </td>
            <td>
                <input type="text" id="mulai_bekerja" name="mulai_bekerja" error="Mulai Bekerja" class="form-control required data-date flatpickr" placeholder="YYYY-MM-DD" value=""/>
            </td>
            <td>
                <input type="text" id="berhenti_bekerja" name="berhenti_bekerja" error="Berhenti Bekerja" class="form-control required data-date flatpickr" placeholder="YYYY-MM-DD" value=""/>
            </td>
            <td>
                <input type="text" id="gaji_terakhir" name="gaji_terakhir" error="Gaji Terakhir" class="form-control required" placeholder="Gaji Terakhir" value=""/>
            </td>
            <td>
                <input type="text" id="fasilitas" name="fasilitas" error="Fasilitas" class="form-control required" placeholder="Fasilitas" value=""/>
            </td>
            <td>
                <i class="bx bx-trash" style="cursor: pointer;" onclick="Karyawan.deletePengalaman(this, event)"></i>
            </td>
        </tr>`;
        tbody.prepend(html);
        Karyawan.setDatePengalaman();
    },

    setDatePengalaman:()=>{
        let dataDate = $('.data-date');
        $.each(dataDate, function(){
            $(this).flatpickr();
        });
    },

    deleteHubungan:(elm, e)=>{
        let id = $(elm).closest('tr').attr('data_id');
        if(id == ''){
            $(elm).closest('tr').remove();
        }else{
            $(elm).closest('tr').addClass('hide');
            $(elm).closest('tr').addClass('remove');
        }
    },

    deleteFormal:(elm, e)=>{
        let id = $(elm).closest('tr').attr('data_id');
        if(id == ''){
            $(elm).closest('tr').remove();
        }else{
            $(elm).closest('tr').addClass('hide');
            $(elm).closest('tr').addClass('remove');
        }
    },

    deleteNonFormal:(elm, e)=>{
        let id = $(elm).closest('tr').attr('data_id');
        if(id == ''){
            $(elm).closest('tr').remove();
        }else{
            $(elm).closest('tr').addClass('hide');
            $(elm).closest('tr').addClass('remove');
        }
    },

    deletePengalaman:(elm, e)=>{
        let id = $(elm).closest('tr').attr('data_id');
        if(id == ''){
            $(elm).closest('tr').remove();
        }else{
            $(elm).closest('tr').addClass('hide');
            $(elm).closest('tr').addClass('remove');
        }
    },

    deleteOrganisasi:(elm, e)=>{
        let id = $(elm).closest('tr').attr('data_id');
        if(id == ''){
            $(elm).closest('tr').remove();
        }else{
            $(elm).closest('tr').addClass('hide');
            $(elm).closest('tr').addClass('remove');
        }
    },

    deleteFinger:(elm, e)=>{
        let id = $(elm).closest('tr').attr('data_id');
        if(id == ''){
            $(elm).closest('tr').remove();
        }else{
            $(elm).closest('tr').addClass('hide');
            $(elm).closest('tr').addClass('remove');
        }
    },

    getDataHubunganKeluarga:()=>{
        let dataHubunganKeluarga = $('#table-data-keluarga');
        if(dataHubunganKeluarga.length > 0){
            let params = {};
            $.ajax({
                type: 'GET',
                dataType: 'json',
                data: params,
                url: url.base_url(Karyawan.moduleHubunganApi()) + "getData",

                beforeSend: () => {
                    message.loadingProses('Proses Pengambilan Data');
                },

                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi","Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    $('#data-hub-keluarga').val(JSON.stringify(resp.data));
                }
            });
        }
    },

    getDataPendidikan:()=>{
        let dataPendidikan = $('#data-pendidikan');
        if(dataPendidikan.length > 0){
            let params = {};
            $.ajax({
                type: 'GET',
                dataType: 'json',
                data: params,
                url: url.base_url(Karyawan.modulePendidikanApi()) + "getData",

                beforeSend: () => {
                    message.loadingProses('Proses Pengambilan Data');
                },

                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi","Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    $('#data-pendidikan').val(JSON.stringify(resp.data));
                }
            });
        }
    },

    getDataTahun:()=>{
        let dataTahun = $('#data-tahun');
        if(dataTahun.length > 0){
            let params = {};
            $.ajax({
                type: 'GET',
                dataType: 'json',
                data: params,
                url: url.base_url(Karyawan.moduleTahunApi()) + "getTahun",

                beforeSend: () => {
                    message.loadingProses('Proses Pengambilan Data');
                },

                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi","Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    $('#data-tahun').val(JSON.stringify(resp.data));
                }
            });
        }
    },

    takePictSertifikat:(elm, e)=>{
        e.preventDefault();
        var uploader = $('<input type="file" accept="image/*;capture=camera" />');
        var src_foto = $(elm);
        uploader.click();

        uploader.on("change", function () {
            var reader = new FileReader();
            reader.onload = function (event) {
                var files = $(uploader).get(0).files[0];
                filename = files.name;
                var data_from_file = filename.split(".");
                var type_file = $.trim(data_from_file[data_from_file.length - 1]);
                if (type_file == 'jpg' || type_file == 'jpeg' || type_file == 'png') {
                    $(elm).val(filename);
                    process_image(files).then(function (response) {
                        src_foto.attr("src", response);
                    });
                } else {
                    bootbox.dialog({
                        message: "File Harus Berupa Gambar Bertipe JPG, JPEG, PNG"
                    });
                }
            };

            reader.readAsDataURL(uploader[0].files[0]);
        });
    },

    showFile:(elm, e)=>{
        e.preventDefault();
        let file = $(elm).attr('src');
        console.log(file);
        let html = `<div class="row g-3">
            <div class="col-12">
                <br/>
                <img src="${file}" width="300" heigh="300"/>
            </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },

    showDataKaryawan:(elm)=>{
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Karyawan.moduleApi()) + "showDataKaryawan",

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
                Karyawan.getDataKaryawanPopUp();
            }
        });
    },

    getDataKaryawanPopUp: async () => {
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
                    "url": url.base_url(Karyawan.moduleApi()) + `getData`,
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="Karyawan.pilihData(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihData:(elm)=>{
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');
        $('#nik_lama').val(nik);
        message.closeDialog();
    },

    moduleLaporanAbsen: () => {
        return "laporan/absensi";
    },

    moduleLaporanAbsenApi: () => {
        return `api/${Karyawan.moduleLaporanAbsen()}`;
    },

    showListDepartemen: (elm) => {
        let params = {};
        params.divisi = $(elm).val();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Karyawan.moduleLaporanAbsenApi()) + "showListDepartemen",

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

    export: (elm) => {
        let idExportContent = $(elm).attr('idexport');
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent($(`div#${idExportContent}`).html()));
    },

    setBisaEdit:(elm)=>{
        let params = {};
        params.id = $(elm).attr('data-id');
        params.update = $(elm).is(':checked') ? 1 : 0;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Karyawan.moduleApi()) + "setBisaEdit",

            beforeSend: () => {
                message.loadingProses('Proses Simpan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if(resp.is_valid){
                    Toast.success("Informasi", "Berhasil");                    
                }else{
                    Toast.error("Informasi", resp.message);
                }
            }
        });
    },
    
    rejectConfirm:(elm, data_id)=>{
        let params = {};
        params.id = data_id;
        params.keterangan = $('#keterangan').val();
        if(validation.run()){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Karyawan.moduleApi()) + "rejectConfirm",
    
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data');
                },
    
                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi", "Gagal");
                },
    
                success: function (resp) {
                    message.closeLoading();
                    if(resp.is_valid){
                        Toast.success("Informasi", "Berhasil");                    
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    }else{
                        Toast.error("Informasi", resp.message);
                    }
                }
            });
        }
    },

    showPengajuanData:(elm)=>{
        let id = $(elm).attr('data_id');
        let params = {};
        params.id = id;
        let href = url.base_url(Karyawan.module()) + "showPengajuanData?id=" + id;

        var h = 768;
        var w = 1024;
        var wh = screen.height;
        var ww = screen.width;
        var top = wh/2 - h/2;
        var left = ww/2 - w/2;
        var popup = window.open(href + '', 'player', 'height=' + wh + ', width=' + w + ', scrollbars=no, left=' + left + ', top=' + top);
        popup.focus();
    },

    reject: (elm, e) => {
        e.preventDefault();
        let data_id = $(elm).attr('data_id');
        let html = `<div class="row g-3">
        <div class="col-12">
            <br/>
            <label class="form-label" for="alasan">Keterangan</label>
            <textarea id="keterangan" name="keterangan" error="Keterangan" class="form-control required" rows="2" placeholder="Keterangan"></textarea>
        </div>
        <div class="col-12 text-end">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="Karyawan.rejectConfirm(this, '${data_id}')">Proses</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Batal</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });

        $('.bootbox-close-button').addClass('btn-close').text("");
    },
};

$(function () {
    Karyawan.getData();
    Karyawan.getDataLogKaryawan();
    Karyawan.setDate();
    Karyawan.select2All();
    Karyawan.getDataHubunganKeluarga();
    Karyawan.getDataPendidikan();
    Karyawan.getDataTahun();
    Karyawan.setDatePengalaman();
});
