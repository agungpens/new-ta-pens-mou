let SaldoCuti = {
    module: () => {
        return "karyawan/saldo-cuti";
    },

    moduleApi: () => {
        return `api/${SaldoCuti.module()}`;
    },

    moduleMutasiApi: () => {
        return `api/pengajuan/mutasi`;
    },

    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleKaryawanApi: () => {
        return `api/${SaldoCuti.moduleKaryawan()}`;
    },

    add: () => {
        window.location.href = url.base_url(SaldoCuti.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(SaldoCuti.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(SaldoCuti.module()) + "index";
    },

    getData: async() => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();
        let params = {};
        params.area = $('#area').val();
        params.divisi = $('#divisi').val();
        params.departemen = $('#departemen').val();
        params.jabatan = $('#jabatan').val();

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
                    [25, 50, 100, -1],
                    [25, 50, 100, "Semua"]
                ],
                "ajax": {
                    "url": url.base_url(SaldoCuti.moduleApi()) + `getData`,
                    "type": "POST",
                    "data": params
                },
                "deferRender": true,
                "createdRow": function(row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                "columnDefs": [{
                        "targets": [2,3,4,5,6,7,8,9],
                        "orderable": false,
                    },
                    {
                        "targets": 1,
                        "orderable": false,
                        "createdCell": function(td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                        }
                    },
                    {
                        "targets": 0,
                        "createdCell": function(td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                        }
                    },
                ],
                "columns": [{
                        "data": "id",
                        render: function(data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `
                            <button class="btn btn-warning" data_id="${data}" onclick="SaldoCuti.ubah(this)"><i class="bx bx-edit"></i></button>
                            <button class="btn btn-danger" data_id="${data}" onclick="SaldoCuti.delete(this, event)"><i class="bx bx-trash"></i></button>`;
                        }
                    },
                    {
                        "data": "tahun",
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
                        "data": "hak_cuti",
                    },
                    {
                        "data": "outstanding",
                    },
                    {
                        "data": "sisa",
                    },
                    {
                        "data": "tgl_berlaku",
                    },
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
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan menghapus data ini ?</p>
        </div>
        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="SaldoCuti.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(SaldoCuti.moduleApi()) + "delete",

            beforeSend: () => {
                message.loadingProses('Proses Hapus Data');
            },

            error: function() {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function(resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Data Berhasil Dihapus');
                    setTimeout(function() {
                        window.location.reload();
                    }, 1000);
                } else {
                    Toast.error('Informasi', 'Data Gagal Dihapus ', resp.message);
                }
            }
        });
    },

    /*
    getPostInputDokumen: () => {
        let params = {};
        let data_file = $('div.content-file-upload');
        $.each(data_file, function() {
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
        $.each(checkDetail, function() {
            let params = {};
            params.code = $(this).attr('data_id');
            if ($(this).is(':checked')) {
                data.push(params);
            }
        });
        return data;
    },

    approve: (elm, e) => {
        e.preventDefault();
        let params = SaldoCuti.getPostData();
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
                url: url.base_url(SaldoCuti.moduleApi()) + "approve",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function() {
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function(resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Data Berhasil Disimpan');
                        setTimeout(function() {
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

    */
    setDate: () => {
        let dataDate = $('.data-date');
        $.each(dataDate, function() {
            $(this).flatpickr();
        });
    },

    select2All: () => {
        // Default
        const select2 = $('.select2');
        if (select2.length) {
            select2.each(function() {
                var $this = $(this);
                $this.wrap('<div class="position-relative"></div>').select2({
                    placeholder: 'Pilih',
                    dropdownParent: $this.parent()
                });
            });
        }
    },

    /*
    nextPersonal: (elm, e) => {
        e.preventDefault();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            Wizard.nextWizard(elm)
        }
    },
    */

    /*
    takePict: (elm, e) => {
        e.preventDefault();
        let idcontent = $(elm).attr('data-id');
        var uploader = $('<input type="file" accept="image/*;capture=camera" />');
        var src_foto = $(`#${idcontent}`);
        uploader.click();

        uploader.on("change", function() {
            var reader = new FileReader();
            reader.onload = function(event) {
                var files = $(uploader).get(0).files[0];
                filename = files.name;
                var data_from_file = filename.split(".");
                var type_file = $.trim(data_from_file[data_from_file.length - 1]);
                if (type_file == 'jpg' || type_file == 'jpeg' || type_file == 'png') {
                    $(`#filename-${idcontent}`).text(filename);
                    process_image(files).then(function(response) {
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
    */

    showDataKaryawan: (elm) => {
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(SaldoCuti.moduleMutasiApi()) + "showDataKaryawan",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function() {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function(resp) {
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                SaldoCuti.getDataKaryawan();
            }
        });
    },

    getDataKaryawan: async() => {
        let tableData = $('table#table-data-karyawan');
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
                    "url": url.base_url(SaldoCuti.moduleKaryawanApi()) + `getData`,
                    "type": "POST",
                    "data": params
                        // "headers": {
                        //     'X-CSRF-TOKEN': `'${tokenApi}'`
                        // }
                },
                "deferRender": true,
                "createdRow": function(row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                "columnDefs": [{
                        "targets": 3,
                        "orderable": false,
                        "createdCell": function(td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                            $(td).addClass('td-padd');
                            $(td).addClass('action');
                        }
                    },
                    {
                        "targets": 2,
                        "orderable": false,
                        "createdCell": function(td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
                        }
                    },
                    {
                        "targets": 1,
                        "orderable": false,
                        "createdCell": function(td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
                        }
                    },
                    {
                        "targets": 0,
                        "createdCell": function(td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
                            $(td).addClass('text-center');
                        }
                    },
                ],
                "columns": [{
                        "data": "nik",
                        render: function(data, type, row, meta) {
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="SaldoCuti.pilihData(this)"></i>`;
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
        let params = {};
        params.nik = nik;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(SaldoCuti.moduleMutasiApi()) + "getDetailKaryawan",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function() {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function(resp) {
                message.closeLoading();
                console.log('resp', resp);
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

    setNik: (elm, e) => {
        let nik = $(elm).is(':checked') ? $(elm).attr('nik') : '';
        $('#nik').val(nik);
    },

    modulePerubahan: () => {
        return "transaksi/perubahandatakaryawan";
    },

    modulePerubahanApi: () => {
        return `api/${SaldoCuti.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $('input#id').val();
        window.location.href = url.base_url(SaldoCuti.modulePerubahan()) + "ubah?id=" + data_id + "&state=karyawan-" + from_id;
    },

    showDetailEditProfile: (elm, e) => {
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(SaldoCuti.modulePerubahanApi()) + "showDetailEditProfile",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function() {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function(resp) {
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
        $.each(checkDetail, function() {
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
            <button class="btn btn-primary btn-sm" onclick="SaldoCuti.approve(this, event)">Proses</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },

    checkMenu: (elm) => {
        $('input[type=checkbox]').on('change', function() {
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
                'hak_cuti': $.trim($('#hak_cuti').val()),
                'tahun': $.trim($('#tahun').val()),
                'tgl_berlaku': $.trim($('#tgl_berlaku').val()),
                'remark': $.trim($('#remark').val()),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = SaldoCuti.getPostData();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(SaldoCuti.moduleApi()) + "submit",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function() {
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function(resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Data Berhasil Disimpan');
                        setTimeout(function() {
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

    export: (elm) => {
        let idExportContent = $(elm).attr('idexport');
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent($(`div#${idExportContent}`).html()));
    },

    moduleLaporanAbsen: () => {
        return "laporan/absensi";
    },

    moduleLaporanAbsenApi: () => {
        return `api/${SaldoCuti.moduleLaporanAbsen()}`;
    },

    showListDepartemen: (elm) => {
        let params = {};
        params.divisi = $(elm).val();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(SaldoCuti.moduleLaporanAbsenApi()) + "showListDepartemen",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function() {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function(resp) {
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

$(function() {
    SaldoCuti.getData();
    SaldoCuti.getDataKaryawan();
    SaldoCuti.setDate();
    SaldoCuti.select2All();
    SaldoCuti.checkData();
    SaldoCuti.checkMenu();
});
