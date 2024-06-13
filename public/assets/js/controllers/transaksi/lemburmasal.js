let dataKry = [];

let LemburMasal = {
    module: () => {
        return "transaksi/lemburmasal";
    },

    moduleApi: () => {
        return `api/${LemburMasal.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(LemburMasal.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(LemburMasal.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(LemburMasal.module()) + "index";
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
                    "url": url.base_url(LemburMasal.moduleApi()) + `getData`,
                    "type": "GET",
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
                        "data": "nik",
                    },
                    {
                        "data": "approved_status",
                        render: function (data, type, row, meta) {
                            //  console.log(data)
                            if (data == "APPROVED") {
                                return `<span class="badge bg-label-success">${data}</span>`;
                            } else if (data == "REJECTED") {
                                return `<span class="badge bg-label-danger">${data}</span>`;
                            } else {
                                return `<span class="badge bg-label-info">${data}</span>`;
                            }
                        }
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="LemburMasal.ubah(this)"></i>
                            <i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="LemburMasal.delete(this, event)"></i>`;
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
            <button class="btn btn-primary btn-sm" onclick="LemburMasal.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(LemburMasal.moduleApi()) + "delete",

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

    getPostInputKaryawan: (w = false) => {
        let data = [];
        let dataKaryawan = $('.form-check-input');
        $.each(dataKaryawan, function () {
            let $this = $(this);
            let tr = $(this).closest('tr');
            let params = {};
            params.nik = tr.find('td:eq(2)').text().trim();
            params.is_approve = $this.is(':checked') ? 1 : 0;
            if (w) {
                data.push(params);
            } else {
                if ($this.is(':checked')) {
                    data.push(params);
                }
            }
        });

        return data;
    },
    
    getPostInputKaryawanNew: (w = false) => {
        let data = [];
        for(let x = 0; x < dataKry.length; x++){
            let params = {};
            params.nik = dataKry[x].trim();
            params.is_approve = 0;
            data.push(params);
        }       
        return data;
    },

    getPostData: () => {
        let data = {
            'data': {
                'id': $('input#id').val(),
                'doc_trans': $('input#doc_trans').val(),
                'tanggal': $.trim($('#tanggal_pekerjaan').val()),
                'est_mulai': $.trim($('#est_mulai').val()),
                'est_selesai': $.trim($('#est_selesai').val()),
                'pekerjaan': $.trim($('#pekerjaan').val()),
                'list_manajer': $.trim($('#list_manajer').val()),
            },
            // 'data_karyawan': LemburMasal.getPostInputKaryawan()
            'data_karyawan': LemburMasal.getPostInputKaryawanNew()
        };
        return data;
    },

    getPostDataAcc: () => {
        let data = {
            'data': {
                'id': $('input#id').val(),
                'doc_trans': $('input#doc_trans').val(),
                'nik_karyawan_lembur': $('input#nik_karyawan_lembur').val(),
                'tanggal': $.trim($('#tanggal_pekerjaan').val()),
                'est_mulai': $.trim($('#est_mulai').val()),
                'est_selesai': $.trim($('#est_selesai').val()),
                'pekerjaan': $.trim($('#pekerjaan').val()),
                'list_manajer': $.trim($('#list_manajer').val()),
            },
            'data_karyawan': LemburMasal.getPostInputKaryawan(true)
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = LemburMasal.getPostData();
        let form = $(elm).closest('div.row');
        // if (params.data_karyawan.length == 0) {
        if (dataKry.length == 0) {
            Toast.error('Informasi', 'Pilih Karyawan Terlebih Dahulu');
            return;
        }

        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(LemburMasal.moduleApi()) + "submit",
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
        const flatpickrRange = document.querySelector('.flatpickr');
        if (flatpickrRange) {
            flatpickrRange.flatpickr();
        }

        // Time
        const est_mulai = document.querySelector('#est_mulai');
        if (est_mulai) {
            est_mulai.flatpickr({
                enableTime: true,
                noCalendar: true
            });
        }

        const est_selesai = document.querySelector('#est_selesai');
        if (est_selesai) {
            est_selesai.flatpickr({
                enableTime: true,
                noCalendar: true
            });
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

    getDataKaryawan: async () => {
        let tableData = $('table#table-data-karyawan');
        let params = {};
        params.nik_karyawan_lembur = $('#nik_karyawan_lembur').val();
        if (tableData.length > 0) {
            let nik_karyawan_lembur = $('#nik_karyawan_lembur').val();
            let nik_approved = $('#nik_approved').val();

            tableData.DataTable({
                "processing": true,
                "serverSide": true,
                "ordering": true,
                "autoWidth": false,
                "order": [
                    [0, 'desc']
                ],
                "aLengthMenu": [
                    [1000, 1200, 1300],
                    [1000, 1200, 1300]
                ],
                "ajax": {
                    "url": url.base_url(LemburMasal.moduleApi()) + `getDataKaryawan`,
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
                    // {
                    //     "targets": 3,
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
                            $(td).addClass('text-center');
                        }
                    },
                    {
                        "targets": 3,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
                            $(td).addClass('text-center');
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
                        "data": "nama_lengkap",
                    },
                    {
                        "data": "nik",
                    },
                    {
                        "data": "nik",
                        "render": (data, type, row, meta) => {
                            let checked = '';
                            let dataKaryawan = nik_karyawan_lembur.split(',');
                            let dataKaryawanAcc = nik_approved.split(',');
                            // console.log('dataKaryawan', dataKaryawan);
                            for (let i = 0; i < dataKaryawan.length; i++) {
                                if (dataKaryawan[i].trim() == row.nik.trim()) {
                                    if (dataKaryawanAcc[i] == '1') {
                                        checked = 'checked';
                                    }
                                }
                            }

                            for(let x = 0; x < dataKry.length; x++){
                                if (dataKry[x].trim() == row.nik.trim()) {
                                    checked = 'checked';
                                }
                            }

                            return `<div class="form-check">
                            <input nik="${data}" name="pilih" class="form-check-input"  type="checkbox" value="${checked}" id="pilih" ${checked} onchange="LemburMasal.checkKry(this)">
                          </div>`;
                        }
                    }
                ]
            });
        }
    },

    checkKry: (elm) => {
        let nik = $(elm).attr('nik');
        if ($(elm).is(':checked')) {
            dataKry.push(nik);
        } else {
            dataKry = LemburMasal.arrayRemove(dataKry, nik);
        }
        console.log('dataKry', dataKry);
    },

    arrayRemove: (arr, value) => {
        return arr.filter(function (ele) {
            return ele != value;
        });
    },

    modulePerubahan: () => {
        return "transaksi/perubahandatakaryawan";
    },

    modulePerubahanApi: () => {
        return `api/${LemburMasal.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $('input#id').val();
        window.location.href = url.base_url(LemburMasal.modulePerubahan()) + "ubah?id=" + data_id + "&state=karyawan-" + from_id;
    },

    showDetailEditProfile: (elm, e) => {
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(LemburMasal.modulePerubahanApi()) + "showDetailEditProfile",

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

    reject: (elm) => {
        let html = `<div class="row g-3">        
        <div class="col-12">
            <br/>
            <label class="form-label" for="keterangan">Keterangan</label>
            <textarea id="keterangan" name="keterangan" error="Keterangan" class="form-control required" rows="2" placeholder="Keterangan"></textarea>
        </div>
        <div class="col-12 text-end">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="LemburMasal.approve(this, event)">Proses</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },

    approve: (elm, e) => {
        e.preventDefault();
        let params = LemburMasal.getPostDataAcc();
        if (params.data_karyawan.length == 0 && $('#keterangan').length == 0) {
            Toast.error('Informasi', 'Belum Ada Data Disetujui');
            return;
        }
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
                url: url.base_url(LemburMasal.moduleApi()) + "approve",
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
};

$(function () {
    LemburMasal.getData();
    LemburMasal.getDataKaryawan();
    LemburMasal.setDate();
    LemburMasal.select2All();
});
