let PermintaanPembelianPosting = {
    module: () => {
        return "new_purchasing/posting-permintaan-pembelian";
    },

    moduleApi: () => {
        return `api/${PermintaanPembelianPosting.module()}`;
    },

    modulePermintaanPembelian: () => {
        return "new_purchasing/permintaan-pembelian";
    },

    modulePermintaanPembelianApi: () => {
        return `api/${PermintaanPembelianPosting.modulePermintaanPembelian()}`;
    },

    add: () => {
        window.location.href = url.base_url(PermintaanPembelianPosting.module()) + "add?tipe=DOCT_PR";
        //     let html = ` <div class="row">                         
        //         <div class="col-md-6">
        //             <br>
        //             <div class="card">
        //                 <div class="card-body">
        //                     <div class="d-flex justify-content-between">
        //                         <div class="d-flex align-items-center gap-3">
        //                             <div class="avatar">
        //                                 <span class="avatar-initial rounded-circle bg-label-success"><i class='bx bx-notepad fs-4'></i></span>
        //                             </div>
        //                             <div class="card-info">
        //                                 <h5 class="card-title mb-0 me-2">Purchase</h5>
        //                                 <small class="text-muted">
        //                                     <a href="" class="text-success" onclick="PermintaanPembelianPosting.addDoc(this, event)" tipe="DOCT_PR" data-id="">Masuk</a>
        //                                 </small>
        //                             </div>
        //                         </div>
        //                         <div id="conversationChart"></div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="col-md-6">
        //             <br>
        //             <div class="card">
        //                 <div class="card-body">
        //                     <div class="d-flex justify-content-between">
        //                         <div class="d-flex align-items-center gap-3">
        //                             <div class="avatar">
        //                                 <span class="avatar-initial rounded-circle bg-label-success"><i class='bx bx-notepad fs-4'></i></span>
        //                             </div>
        //                             <div class="card-info">
        //                                 <h5 class="card-title mb-0 me-2">Investment</h5>
        //                                 <small class="text-muted">
        //                                     <a href="" class="text-success"  onclick="PermintaanPembelianPosting.addDoc(this, event)" tipe="DOCT_PR_INV" data-id="">Masuk</a>
        //                                 </small>
        //                             </div>
        //                         </div>
        //                         <div id="conversationChart"></div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        // </div>`;

        //     bootbox.dialog({
        //         message: html
        //     });

        //     $('.bootbox-close-button').addClass('btn-close').text("");
    },

    addDoc: (elm, e) => {
        e.preventDefault();
        let tipe = $(elm).attr('tipe');
        window.location.href = url.base_url(PermintaanPembelianPosting.module()) + "add?tipe=" + tipe;
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(PermintaanPembelianPosting.module()) + "ubah?id=" + data_id;
    },

    detail: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(PermintaanPembelianPosting.module()) + "detail?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(PermintaanPembelianPosting.module()) + "index";
    },

    getData: async () => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();

        let params = {}
        params.tgl_efektif = $("#tgl_efektif").val()
        params.departemen = $("#cb-departemen").val()
        params.area = $("#cb-area-kerja").val()


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
                    [100, 150, 200],
                    [100, 150, 200]
                ],
                "ajax": {
                    "url": url.base_url(PermintaanPembelianPosting.moduleApi()) + `getData`,
                    "type": "POST",
                    "data": params,
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
                    {
                        "data": "pr_no",
                    },
                    {
                        "data": "tanggal_efektif",
                    },
                    {
                        "data": "nama_departemen",
                    },
                    {
                        "data": "area",
                    },
                    {
                        "data": "status",
                        "render": (data, type, row, meta) => {
                            return `<span class="badge bg-label-info">Pengajuan Sudah Diproses Transfer ke ERP oleh Admin MOI</span>`;
                        }
                    },
                    {
                        "data": "remarks",
                    },
                    
                    {
                        "data": "ditujukan_ke",
                    },

                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            if (updateAction == '1') {
                                htmlAction += `<i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="PermintaanPembelianPosting.detail(this)"></i>`;
                            }
                            return htmlAction;
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
            <button class="btn btn-primary btn-sm" onclick="PermintaanPembelianPosting.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(PermintaanPembelianPosting.moduleApi()) + "delete",

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

    getPostdataItem: () => {
        let data = [];
        let tableData = $('table#table-data-item').find('tbody').find('tr.input');
        $.each(tableData, function () {
            let tr = $(this);
            let params = {};
            params.nama_item = tr.find('input#nama_item').val();
            params.jumlah = tr.find('input#jumlah').val();
            params.satuan = tr.find('input#satuan').val();
            params.remarks = tr.find('input#remarks').val();
            params.file = tr.find('input#file').attr('src');
            params.tipe = tr.find('input#file').attr('tipe');
            data.push(params);
        });

        return data;
    },

    getPostdataItemERP: () => {
        let data = {};
        let tableData = $('table#table-data-item-erp').find('tbody').find('tr');
        $.each(tableData, function () {
            let tr = $(this);

            let item_id = tr.data('item_id');
            data['item_id_' + item_id] = {
                id: $('#item_erp_select_' + item_id).val(),
                text: $('#item_erp_select_' + item_id).select2('data')[0].text
            };
        });

        return data;
    },

    getPostdataItemTransfer: () => {
        let data = [];
        let tableData = $('table#table-data-item').find('tbody').find('tr.input');
        $.each(tableData, function () {
            let tr = $(this);
            let params = {};
            params.kode_item = tr.find('input#kodebarang').val();
            params.nama_item = tr.find('td#nama_item').text().trim();
            params.jumlah = tr.find('td#jumlah').text().trim();
            params.satuan = tr.find('td#satuan').text().trim();
            params.remarks = tr.find('td#remarks').text().trim();
            data.push(params);
        });

        return data;
    },

    getPostdataLampiran: () => {
        let data = [];
        let tableData = $('table#table-data-file').find('tbody').find('tr.input');
        $.each(tableData, function () {
            let tr = $(this);
            let params = {};
            params.file = tr.find('input#file').attr('src');
            params.tipe = tr.find('input#file').attr('tipe');
            data.push(params);
        });

        return data;
    },

    getPostData: () => {
        let data = {
            'data': {
                'id': $('#no-pr').val(),
                'tipe': $.trim($('#tipe').val()),
                'purpose': $.trim($('#purpose').val()),
                'spec': $.trim($('#spec').val()),
                'departemen': $.trim($('#departemen').val()),
                'area_kerja': $.trim($('#area_kerja').val()),
                'tgl_efektif': $.trim($('#tgl_efektif').val()),
                'ditujukanke': $('#ditujukanke').select2('data')[0].text,
                'dimintaoleh': $('#dimintaoleh').select2('data')[0].text,
            },
            'data_item': PermintaanPembelianPosting.getPostdataItem(),
            'data_item_erp': PermintaanPembelianPosting.getPostdataItemERP(),
            'data_lampiran': PermintaanPembelianPosting.getPostdataLampiran(),
        };
        return data;
    },

    getPostTransfer: () => {
        let data = {
            'data': {
                'id': $('input#id').val(),
            },
            'data_item': PermintaanPembelianPosting.getPostdataItemTransfer(),
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = PermintaanPembelianPosting.getPostData();
        // console.log(params);
        // alert('not saving')
        // return;
        let form = $(elm).closest('div.row');
        // if (params.data_lampiran.length == 0) {
        //     Toast.error('Informasi', 'Lampiran Harus Diisi');
        //     return;
        // }
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(PermintaanPembelianPosting.moduleApi()) + "submit",
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
            <button class="btn btn-primary btn-sm" onclick="PermintaanPembelianPosting.rejectConfirm(this, '${data_id}')">Proses</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Batal</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });

        $('.bootbox-close-button').addClass('btn-close').text("");
    },

    approve: (elm, e) => {
        e.preventDefault();
        let params = PermintaanPembelianPosting.getPostData();
        params.keterangan = '';
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(PermintaanPembelianPosting.moduleApi()) + "approve",
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
                    Toast.success('Informasi', 'Data Berhasil Diproses');
                    setTimeout(function () {
                        PermintaanPembelianPosting.back();
                    }, 1000);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },

    transfer: (elm, e) => {
        e.preventDefault();
        let params = PermintaanPembelianPosting.getPostData();
        params.keterangan = '';
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(PermintaanPembelianPosting.moduleApi()) + "transfer",
            beforeSend: () => {
                message.loadingProses('Proses Trasnfer Data...');
            },
            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Data Berhasil Diproses');
                    setTimeout(function () {
                        PermintaanPembelianPosting.back();
                    }, 1000);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },

    rejectConfirm: (elm, data_id) => {
        let params = PermintaanPembelianPosting.getPostData();
        params.keterangan = $('#keterangan').val();
        if (validation.run()) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(PermintaanPembelianPosting.moduleApi()) + "approve",

                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data');
                },

                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi", "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success("Informasi", "Berhasil");
                        setTimeout(function () {
                            PermintaanPembelianPosting.back();
                        }, 1000);
                    } else {
                        Toast.error("Informasi", resp.message);
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

        PermintaanPembelianPosting.setSelectContact();
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
                    "url": url.base_url(PermintaanPembelianPosting.moduleApi()) + `getDataLogKaryawan`,
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
                            return `<a class="" style="cursor: pointer;" onclick="PermintaanPembelianPosting.showDetailEditProfile(this, event)">${data}</a>`;
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
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="PermintaanPembelianPosting.detailPerubahan(this)"></i>`;
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
        return `api/${PermintaanPembelianPosting.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $('input#id').val();
        window.location.href = url.base_url(PermintaanPembelianPosting.modulePerubahan()) + "ubah?id=" + data_id + "&state=karyawan-" + from_id;
    },

    showDetailEditProfile: (elm, e) => {
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(PermintaanPembelianPosting.modulePerubahanApi()) + "showDetailEditProfile",

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

    addItem: (elm, e) => {
        e.preventDefault();
        let tbody = $(elm).closest('tbody');
        let html = `<tr class="input" data_id="">
            <td>
                <input type="text" id="nama_item" name="nama_item" class="form-control required"
                placeholder="Nama Barang" error="Nama Barang" value=""/>
            </td>
            <td>
                <input type="number" id="jumlah" name="jumlah" class="form-control required"
                placeholder="Jumlah Barang" error="Jumlah Barang" value=""/>
            </td>
            <td>
                <input type="text" id="satuan" name="satuan" class="form-control required"
                placeholder="Satuan Barang" error="Satuan Barang" value=""/>
            </td>
            <td>
                <input type="text" id="remarks" name="remarks" class="form-control required"
                placeholder="Keterangan" error="Keterangan" value=""/>
            </td>
            <td>
                <div class="input-group">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelianPosting.addFile(this)">Pilih</button>
                    <input id="file" type="text" readonly class="form-control" error="File" placeholder="Pilih Data File" aria-label="Pilih Data File" aria-describedby="button-addon1" value="">
                </div>
            </td>
            <td>
                <i class="bx bx-trash" style="cursor: pointer;" onclick="PermintaanPembelianPosting.deleteItem(this, event)"></i>
            </td>
        </tr>`;
        tbody.prepend(html);
    },

    addLampiran: (elm, e) => {
        e.preventDefault();
        let tbody = $(elm).closest('tbody');
        let html = `<tr class="input" data_id="">
            <td>
                <div class="input-group">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelianPosting.addFile(this)">Pilih</button>
                    <input id="file" type="text" readonly class="form-control" error="File" placeholder="Pilih Data File" aria-label="Pilih Data File" aria-describedby="button-addon1" value="">
                </div>
            </td>
            <td>
                <i class="bx bx-trash" style="cursor: pointer;" onclick="PermintaanPembelianPosting.deleteItem(this, event)"></i>
            </td>
        </tr>`;
        tbody.prepend(html);
    },

    addFile: (elm) => {
        var uploader = $('<input type="file" accept="image/*;capture=camera" />');
        var src_foto = $(elm).closest('tr').find('#file');
        uploader.click();

        uploader.on("change", function () {
            var reader = new FileReader();
            reader.onload = function (event) {
                var files = $(uploader).get(0).files[0];
                filename = files.name;
                var data_from_file = filename.split(".");
                var type_file = $.trim(data_from_file[data_from_file.length - 1]);
                if (type_file == 'jpg' || type_file == 'jpeg' || type_file == 'png' || type_file == 'pdf') {
                    var data = event.target.result;
                    src_foto.attr("src", data);
                    src_foto.attr("tipe", type_file);
                    src_foto.val(filename);
                } else {
                    bootbox.dialog({
                        message: "File Harus Berupa Gambar Bertipe JPG, JPEG, PNG, PDF"
                    });
                }
            };

            reader.readAsDataURL(uploader[0].files[0]);
        });
    },

    deleteItem: (elm, e) => {
        let id = $(elm).closest('tr').attr('data_id');
        if (id == '') {
            $(elm).closest('tr').remove();
        } else {
            $(elm).closest('tr').addClass('hide');
            $(elm).closest('tr').addClass('remove');
        }
    },

    showFile: (elm, e) => {
        e.preventDefault();
        let file = $(elm).attr('src');
        let html = `<div class="row g-3">
            <div class="col-lg-12">
                <br/>
                <iframe src="${file}" width="100%" height="400"/>
            </div>
        </div>`;

        bootbox.dialog({
            message: html,
            size: 'large'
        });
    },

    ExportData: (elm) => {
        let idExportContent = $(elm).attr('idexport');
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent($(`div#${idExportContent}`).html()));
    },

    getDetailPermintaanPembelian: (id) => {
        if (document.getElementsByClassName('item_erp').length > 0) {
            $('.item_erp').remove();
        }
        $('#item-erp-container').hide();

        if (id != "") {
            let params = {
                'data': {
                    'id': id,
                }
            }

            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(PermintaanPembelianPosting.modulePermintaanPembelianApi()) + "detaildata",
                beforeSend: () => {
                    message.loadingProses('Proses Trasnfer Data...');
                },
                error: function () {
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        //Toast.success('Informasi', 'Data Berhasil Diproses');
                        const dataHeader = resp.data.data_header
                        // console.log(dataHeader)
                        const dataItem = resp.data.item
                        const dataFileItem = resp.data.lampiran_item
                        const dataLampiran = resp.data.lampiran

                        $("#departemen").val(dataHeader.departemen).trigger('change').attr("disabled", true);
                        $("#area_kerja").val(dataHeader.area_kerja).trigger('change').attr("disabled", true);
                        $("#tgl_efektif").val(dataHeader.tanggal_efektif).attr("disabled", true);
                        $("#purpose").val(dataHeader.purpose).attr("readonly", true);
                        $("#spec").val(dataHeader.spec).attr("readonly", true);

                        let html = "";
                        for (let i = 0; i < dataItem.length; i++) {
                            html += "<tr>"
                            html += `<td>${dataItem[i].item_name}</td>`
                            html += `<td>${dataItem[i].qty}</td>`
                            html += `<td>${dataItem[i].satuan}</td>`
                            html += `<td>${dataItem[i].remarks}</td>`
                            if (dataFileItem[i].img_file != "") {
                                html += `<td><a href='' src='${dataFileItem[i].img_path}' onclick='PermintaanPembelianPosting.showFile(this, event)'><i class='bx bx-image-alt'></i></a></td>`
                            } else {
                                html += `<td></td>`
                            }
                            if (!dataItem[i].item_code)
                                html += `<td class="text-center"><button class="btn btn-sm btn-primary" id="item_id_${dataItem[i].id}" 
                                    data-id="${dataItem[i].id}" data-item_name="${dataItem[i].item_name}" 
                                    data-satuan="${dataItem[i].satuan}" 
                                    data-qty="${dataItem[i].qty}" data-pr_id="${dataItem[i].purchase_requisition}" 
                                    onclick="PermintaanPembelianPosting.addItemERP(this)">Select Item ERP</button></td>`
                            else
                                html += `<td></td>`

                            // html+= `<td></td>`
                            html += "</tr>"
                        }

                        let htmlLampiran = ""
                        if (dataLampiran.length > 0) {
                            for (let i = 0; i < dataLampiran.length; i++) {
                                htmlLampiran += "<tr>"
                                htmlLampiran += "<td>";
                                htmlLampiran += "<div class='input-group'>";
                                htmlLampiran += `
                                    <button class="btn btn-outline-primary" type="button" id="button-addon1" src="${ dataLampiran[i].img_path}" onclick="PermintaanPembelianPosting.showFile(this, event)">Lihat</button>
                                    <input id="file" type="text" readonly class="form-control" error="File" placeholder="Pilih Data File" aria-label="Pilih Data File" aria-describedby="button-addon1" value="${dataLampiran[i].filename}">
                                `;
                                htmlLampiran += "</div>";
                                htmlLampiran += "</td>";
                                htmlLampiran += "</tr>"
                            }
                        } else {
                            htmlLampiran += "<tr><td colspan=''>Tidak ada data ditemukan</td></tr>";
                        }
                        $("#table-data-file tbody").html(htmlLampiran)
                        $("#table-data-item tbody").html(html)
                    } else {
                        bootbox.dialog({
                            message: resp.message
                        });
                    }
                }
            });
        }
    },

    addItemERP: (elm) => {
        let el = $(elm);
        let id = el.data('id');
        let item_name = el.data('item_name');
        let qty = el.data('qty');
        let satuan = el.data('satuan');
        let pr_id = el.data('pr_id');

        let html_ = '';

        let template = `
            <tr id="item_erp_${id}" class="item_erp" data-item_id="${id}">
                <td class="">${item_name}</td>
                <td class="text-center">${qty}</td>
                <td class="text-center">${satuan}</td>
                <td class="" id="item_erp_select_container_${id}">[select]</td>
                <td class="text-center">
                    <button class="delete_item_erp btn btn-sm btn-danger" title="Delete item" onclick="PermintaanPembelianPosting.removeItemERP(${id})"><i class='bx bxs-trash'></i></button>
                </td>
            </tr>
        `;
        html_ = template

        $('#table-data-item-erp tbody').append(html_);
        $('#item_id_' + id).hide();

        PermintaanPembelianPosting.generateSelectItem(id);

        $('#item-erp-container').show();
    },

    removeItemERP: (id) => {
        document.getElementById('item_erp_' + id).remove();
        $('#item_id_' + id).show();

        let numb_el = document.getElementsByClassName("item_erp").length;
        if (numb_el < 1) {
            $('#item-erp-container').hide();
        }
    },

    generateSelectItem: (id) => {
        let html_ = `
            <select name="item_erp_select_${id}" class="item_erp_select" id="item_erp_select_${id}">
            </select>
        `;

        $('#item_erp_select_container_' + id).html(html_);

        let url_item = url.base_url(PermintaanPembelianPosting.modulePermintaanPembelianApi()) + "get-erp-item";
        $('#item_erp_select_' + id).select2({
            allowClear: true,
            placeholder: 'Ketik nama item',
            dropdownParent: $('#item_erp_select_container_' + id),
            ajax: {
                dataType: 'json',
                url: url_item,
                delay: 400,
                method: 'POST',
                data: function (params) {
                    return {
                        search: params.term
                    }
                },
                processResults: function (data, page) {
                    return {
                        results: data
                    };
                },
            }
        }).on('select2:select', function (evt) {
            // console.log(evt.params.data)
            // {id: '1106RM-0004', text: 'MERICA PUTIH BENIR III (DEBU) - KG', selected: true}
        });
    },

    setSelectContact: () => {
        if($('#dimintaoleh').length > 0){
            let url_item = url.base_url(PermintaanPembelianPosting.moduleApi()) + "getContactErp";
            $('#dimintaoleh').select2({
                allowClear: true,
                placeholder: 'Ketik nama kontak',
                // dropdownParent: $('#dimintaoleh'),
                ajax: {
                    dataType: 'json',
                    url: url_item,
                    delay: 400,
                    method: 'POST',
                    data: function (params) {
                        return {
                            search: params.term
                        }
                    },
                    processResults: function (data, page) {
                        return {
                            results: data
                        };
                    },
                }
            }).on('select2:select', function (evt) {
                // console.log(evt.params.data)
                // {id: '1106RM-0004', text: 'MERICA PUTIH BENIR III (DEBU) - KG', selected: true}
            });
        }
        
        if($('#ditujukanke').length > 0){
            let url_item = url.base_url(PermintaanPembelianPosting.moduleApi()) + "getContactErp";
            $('#ditujukanke').select2({
                allowClear: true,
                placeholder: 'Ketik nama kontak',
                // dropdownParent: $('#dimintaoleh'),
                ajax: {
                    dataType: 'json',
                    url: url_item,
                    delay: 400,
                    method: 'POST',
                    data: function (params) {
                        return {
                            search: params.term
                        }
                    },
                    processResults: function (data, page) {
                        return {
                            results: data
                        };
                    },
                }
            }).on('select2:select', function (evt) {
                // console.log(evt.params.data)
                // {id: '1106RM-0004', text: 'MERICA PUTIH BENIR III (DEBU) - KG', selected: true}
            });
        }
    }
};

$(function () {
    PermintaanPembelianPosting.getData();
    PermintaanPembelianPosting.setDate();
    PermintaanPembelianPosting.select2All();
});
