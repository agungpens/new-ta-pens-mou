let Vendor = {
    module: () => {
        return "master/vendor";
    },

    moduleApi: () => {
        return `api/${Vendor.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(Vendor.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Vendor.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(Vendor.module()) + "index";
    },

    getData: async () => {
        let tableData = $('table#table-data');

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
                    "url": url.base_url(Vendor.moduleApi()) + `getData`,
                    "type": "POST",
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
                        "targets": [1,2,3,4],
                        "orderable": false,
                    },
                    {
                        "targets": [4,5],
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-end');
                        }
                    },
                    {
                        "targets": 5,
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
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "kode",
                    },
                    {
                        "data": "nama",
                    },
                    {
                        "data": "tipe",
                    },
                    {
                        "data": "coa_nomor_erp",
                    },
                    {
                        "data": "current_limit",
                    },
                    {
                        "data": "limit",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            if(updateAction == '1'){
                                htmlAction += `<i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="Vendor.ubah(this)"></i>`;
                            }

                            if(deleteAction == '1'){
                                htmlAction += `<i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="Vendor.delete(this, event)"></i>`;
                            }
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
            <button class="btn btn-primary btn-sm" onclick="Vendor.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(Vendor.moduleApi()) + "delete",

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

    getPostData: () => {
        let data = {
            'data': {
                'id': $('input#id').val(),
                'kode': $.trim($('#kode').val()),
                'nama': $.trim($('#nama').val()),
                'limit': $.trim($('#limit').val()),
                'tipe': $.trim($('#tipe').val()),
                'coa_nomor_erp': $.trim($('#coa_nomor_erp').val()),
                'current_limit': $.trim($('#current_limit').val()),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Vendor.getPostData();
        let form = $(elm).closest('div.row');
        if(validation.runWithElement(form)){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Vendor.moduleApi()) + "submit",
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
                    "url": url.base_url(Vendor.moduleApi()) + `getDataLogKaryawan`,
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
                            return `<a class="" style="cursor: pointer;" onclick="Vendor.showDetailEditProfile(this, event)">${data}</a>`;
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
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="Vendor.detailPerubahan(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    showDataContact:(elm)=>{
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Vendor.moduleApi()) + "showDataContact",

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
                Vendor.getDataContact();
            }
        });
    },

    getDataContact: async () => {
        let tableData = $('table#table-data-contact');
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
                    "url": url.base_url(Vendor.moduleApi()) + `getDataContact`,
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
                        "data": "kkode",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "kkode",
                    },
                    {
                        "data": "knama",
                    },
                    {
                        "data": "kkode",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" knama="${row.knama}" data_id="${data}" onclick="Vendor.pilihDataContact(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihDataContact:(elm)=>{
        let knama = $(elm).attr('knama');
        let kkode = $(elm).attr('data_id');
        $('#kode').val(kkode);
        $('#nama').val(knama);
        message.closeDialog();
        let params = {};
        params.kkode = kkode;
    },

    modulePerubahan: () => {
        return "transaksi/perubahandatakaryawan";
    },

    modulePerubahanApi: () => {
        return `api/${Vendor.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $('input#id').val();
        window.location.href = url.base_url(Vendor.modulePerubahan()) + "ubah?id=" + data_id + "&state=karyawan-" + from_id;
    },

    showDetailEditProfile:(elm, e)=>{
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Vendor.modulePerubahanApi()) + "showDetailEditProfile",

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
    }
};

$(function () {
    Vendor.getData();
    Vendor.getDataContact();
    Vendor.getDataLogKaryawan();
    Vendor.setDate();
    Vendor.select2All();
});
