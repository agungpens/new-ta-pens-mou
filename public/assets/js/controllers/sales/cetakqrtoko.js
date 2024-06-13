let CetakQrToko = {
    module: () => {
        return "sales/cetakqrtoko";
    },

    moduleApi: () => {
        return `api/${CetakQrToko.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(CetakQrToko.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(CetakQrToko.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(CetakQrToko.module()) + "index";
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
                    "url": url.base_url(CetakQrToko.moduleApi()) + `getData`,
                    "type": "GET",
                    // "headers": {
                    //     'X-CSRF-TOKEN': `'${tokenApi}'`
                    // }
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                "columnDefs": [{
                        "targets": 2,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                            $(td).addClass('td-padd');
                            $(td).addClass('action');
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
                        "data": "nama_toko",
                    },
                    {
                        "data": "kode_cust_verda",
                    },
                    {
                        "data": "kode_mas",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            if (updateAction == '1') {
                                let nama_toko = row.nama_toko;
                                let qrCode = data;
                                let namaQr = row.nama_toko;
                                htmlAction += `<i class="bx bx-qr" style="cursor: pointer;" data_id="${qrCode}" namaQr="${namaQr}" onclick="CetakQrToko.printQr(this)"></i>`;
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
            <button class="btn btn-primary btn-sm" onclick="CetakQrToko.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(CetakQrToko.moduleApi()) + "delete",

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

    getPostData: () => {
        let data = {
            'data': {
                'id': $('input#id').val(),
                'wilayah': $.trim($('#wilayah').attr('id_wilayah')),
                'cust_verda': $.trim($('#cust_verda').attr('id_repeatase')),
                'cust_mas': $.trim($('#cust_mas').attr('id_survey')),
                'nama_toko_verda': $.trim($('#cust_verda').val()),
                'nama_toko_mas': $.trim($('#cust_mas').val()),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = CetakQrToko.getPostData();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(CetakQrToko.moduleApi()) + "submit",
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
                    "url": url.base_url(CetakQrToko.moduleApi()) + `getDataLogKaryawan`,
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
                            return `<a class="" style="cursor: pointer;" onclick="CetakQrToko.showDetailEditProfile(this, event)">${data}</a>`;
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
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="CetakQrToko.detailPerubahan(this)"></i>`;
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
        return `api/${CetakQrToko.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $('input#id').val();
        window.location.href = url.base_url(CetakQrToko.modulePerubahan()) + "ubah?id=" + data_id + "&state=karyawan-" + from_id;
    },

    showDetailEditProfile: (elm, e) => {
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(CetakQrToko.modulePerubahanApi()) + "showDetailEditProfile",

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

    printQr: (elm) => {
        let qrCode = $(elm).attr('data_id');
        let namaQr = $(elm).attr('namaQr');

        let html = `<div class="row g-3">        
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>QrCode Image</p>
        </div>
        <div class="col-12 text-center" id="qrcode_content_print">
            <div id="qrcode"></div>
            <br/>
            <div>                
                <label>${namaQr.toUpperCase()}</label>
            </div>
        </div>
        <div class="col-12 text-center">
            <br/>
            <button id="btnPrintQr" class="btn btn-primary btn-sm" onclick="CetakQrToko.printedQr(this, '${qrCode}')">Print</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Tidak</button>
        </div>
        </div>`;



        bootbox.dialog({
            message: html
        });

        CetakQrToko.genQR(qrCode);
    },

    printedQr: () => {
        var divContents = document.getElementById("qrcode_content_print").innerHTML;
        var a = window.open('', '', 'height=500, width=500');
        a.document.write('<html>');
        a.document.write('<body style="font-size:25px;text-align:center;">');
        a.document.write(divContents);
        a.document.write('</body></html>');
        a.document.close();

        a.print();
    },

    genQR: (str) => {
        new QRCode(document.getElementById("qrcode"), str);
    },

    showDataWilayah: (elm) => {
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(CetakQrToko.moduleApi()) + "showDataWilayah",

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
                CetakQrToko.getDataWilayah();
            }
        });
    },

    getDataWilayah: async () => {
        let tableData = $('table#table-data-wilayah');
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
                    "url": url.base_url(CetakQrToko.moduleApi()) + `getDataWilayah`,
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
                        "targets": 2,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                            $(td).addClass('td-padd');
                            $(td).addClass('action');
                        }
                    },
                    // {
                    //     "targets": 2,
                    //     "orderable": false,
                    //     "createdCell": function (td, cellData, rowData, row, col) {
                    //         $(td).addClass('td-padd');
                    //     }
                    // },
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
                        "data": "id_wilayah",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "nama_wilayah",
                    },
                    {
                        "data": "id_wilayah",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_wilayah="${row.nama_wilayah}" data_id="${data}" onclick="CetakQrToko.pilihDataWilayah(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihDataWilayah: (elm) => {
        let nama_wilayah = $(elm).attr('nama_wilayah');
        let id_wilayah = $(elm).attr('data_id');
        $('#wilayah').val(nama_wilayah);
        $('#wilayah').attr('id_wilayah', id_wilayah);
        message.closeDialog();
    },

    showDataCustomerVerda: (elm) => {
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(CetakQrToko.moduleApi()) + "showDataCustomerVerda",

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
                CetakQrToko.getDataVustomerVerda();
            }
        });
    },

    getDataVustomerVerda: async () => {
        let tableData = $('table#table-data-verda');
        // tableData.DataTable().destroy();

        let params = {};
        params.wilayah = $('#wilayah').val();

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
                    "url": url.base_url(CetakQrToko.moduleApi()) + `getDataCustomerVerda`,
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
                        "data": "id_data_repeatase",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "nama_distributor",
                    },
                    {
                        "data": "nama_pasar",
                    },
                    {
                        "data": "nama_toko",
                    },
                    {
                        "data": "id_data_repeatase",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_toko="${row.nama_toko}" data_id="${data}" onclick="CetakQrToko.pilihDataCustVerda(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihDataCustVerda: (elm) => {
        let nama_toko = $(elm).attr('nama_toko');
        let id_repeatase = $(elm).attr('data_id');
        $('#cust_verda').val(nama_toko);
        $('#cust_verda').attr('id_repeatase', id_repeatase);
        message.closeDialog();
    },

    showDataCustomerMas: (elm) => {
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(CetakQrToko.moduleApi()) + "showDataCustomerMas",

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
                CetakQrToko.getDataVustomerMas();
            }
        });
    },

    getDataVustomerMas: async () => {
        let tableData = $('table#table-data-mas');
        // tableData.DataTable().destroy();

        let params = {};
        params.wilayah = $('#wilayah').val();

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
                    "url": url.base_url(CetakQrToko.moduleApi()) + `getDataCustomerMas`,
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
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    // {
                    //     "data": "nama_distributor",
                    // },
                    {
                        "data": "nama_pasar",
                    },
                    {
                        "data": "nama_toko",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_toko="${row.nama_toko}" data_id="${data}" onclick="CetakQrToko.pilihDataCustMas(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihDataCustMas: (elm) => {
        let nama_toko = $(elm).attr('nama_toko');
        let id_survey = $(elm).attr('data_id');
        $('#cust_mas').val(nama_toko);
        $('#cust_mas').attr('id_survey', id_survey);
        message.closeDialog();
    },

    cetak: () => {
        let tableData = $('#table-data').find('tbody').find('tr');
        let counter = 1;
        $.each(tableData, function () {
            let data = $(this);
            let params = {};
            CetakQrToko.sleep(5000);
            console.log('TES ' + counter);
            counter += 1;
            data.find('i.bx-qr').trigger('click');
            // setTimeout(function () {
            //     $('#btnPrintQr').trigger('click');
            // }, 1500);
        });
    },

    cetakQR:() => {
        // window.location.href = url.base_url(CetakQrToko.module()) + "cetak";
        window.open(url.base_url(CetakQrToko.module()) + "cetak","_blank")
    },
    // sleep: (milliseconds) => {
    //     var start = new Date().getTime();
    //     for (var i = 0; i < 1e7; i++) {
    //         if ((new Date().getTime() - start) > milliseconds) {
    //             break;
    //         }
    //     }
    // },
    sleep: (n) => {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://httpstat.us/200?sleep=' + n, false);
        request.send(null);
    }

    // sleep: (time) => {
    //     return new Promise((resolve) => setTimeout(resolve, time));
    // }
};

$(function () {
    CetakQrToko.getData();
    CetakQrToko.getDataLogKaryawan();
    CetakQrToko.setDate();
    CetakQrToko.select2All();
});
