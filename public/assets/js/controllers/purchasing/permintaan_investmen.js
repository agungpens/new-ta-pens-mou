let PermintaanPembelian = {
    module: () => {
        return "purchasing/permintaan-investmen";
    },

    moduleApi: () => {
        return `api/${PermintaanPembelian.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(PermintaanPembelian.module()) + "add?tipe=DOCT_PR_INV";
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
    //                                     <a href="" class="text-success" onclick="PermintaanPembelian.addDoc(this, event)" tipe="DOCT_PR" data-id="">Masuk</a>
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
    //                                     <a href="" class="text-success"  onclick="PermintaanPembelian.addDoc(this, event)" tipe="DOCT_PR_INV" data-id="">Masuk</a>
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
        window.location.href = url.base_url(PermintaanPembelian.module()) + "add?tipe="+tipe;
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(PermintaanPembelian.module()) + "ubah?id=" + data_id;
    },

    detail: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(PermintaanPembelian.module()) + "detail?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(PermintaanPembelian.module()) + "index";
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
                    [25, 50, 100],
                    [25, 50, 100]
                ],
                "ajax": {
                    "url": url.base_url(PermintaanPembelian.moduleApi()) + `getData`,
                    "type": "POST",
                    "data" : params,
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
                "columns": [
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            if (updateAction == '1') {
                                htmlAction += `<i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="PermintaanPembelian.detail(this)"></i>`;
                            }
                            return htmlAction;
                        }
                    },
                    {
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
                            console.log(row.status_acc);
                            if (row.status_acc == '' || row.status == 'CREATED') {
                                return `<span class="badge bg-label-warning">Menunggu Proses Approval Direksi RND</span>`;
                            }
                            if (row.status_acc == 'RT_ACCESS_ACC_1' && data == 'APPROVED') {
                                return `<span class="badge bg-label-info">Menunggu Proses Approval Direksi</span>`;
                            }
                            if (row.status_acc == 'RT_ACCESS_ACC_1' && data == 'REJECTED') {
                                return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Direksi</span>`;
                            }
                            if (row.status_acc == 'RT_ACCESS_ACC_2' && data == 'APPROVED') {
                                return `<span class="badge bg-label-success">Pengajuan Diacc oleh Direksi</span>`;
                            }
                            if (row.status_acc == 'RT_ACCESS_ACC_2' && data == 'REJECTED') {
                                return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Admin MOI</span>`;
                            }
                            if (row.status_acc == 'RT_ACCESS_ACC_3' && data == 'APPROVED') {
                                return `<span class="badge bg-label-info">Pengajuan Diacc oleh Direksi</span>`;
                            }
                            if (row.status_acc == 'RT_ACCESS_ACC_3' && data == 'REJECTED') {
                                return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Manajer Purchasing</span>`;
                            }
                            if (row.status_acc == 'RT_ACCESS_ACC_4' && data == 'APPROVED') {
                                return `<span class="badge bg-label-info">Pengajuan Diacc oleh Direksi</span>`;
                            }
                            if (row.status_acc == 'RT_ACCESS_ACC_4' && data == 'REJECTED') {
                                return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Direksi</span>`;
                            }
                            return "";
                        }
                    },
                    {
                        "data": "remarks",
                    },
                  
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
            <button class="btn btn-primary btn-sm" onclick="PermintaanPembelian.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(PermintaanPembelian.moduleApi()) + "delete",

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
            params.est_harga = tr.find('input#est_harga').val();
            params.file = tr.find('input#file').attr('src');
            params.tipe = tr.find('input#file').attr('tipe');
            data.push(params);
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
                'id': $('input#id').val(),
                'tipe': $.trim($('#tipe').val()),
                'purpose': $.trim($('#purpose').val()),
                'spec': $.trim($('#spec').val()),
                'departemen': $.trim($('#departemen').val()),
                'area_kerja': $.trim($('#area_kerja').val()),
                'tgl_efektif': $.trim($('#tgl_efektif').val()),
            },
            'data_item': PermintaanPembelian.getPostdataItem(),
            'data_lampiran': PermintaanPembelian.getPostdataLampiran(),
        };
        return data;
    },

    getPostTransfer: () => {
        let data = {
            'data': {
                'id': $('input#id').val(),
            },
            'data_item': PermintaanPembelian.getPostdataItemTransfer(),
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = PermintaanPembelian.getPostData();
        let form = $(elm).closest('div.row');
        if (params.data_lampiran.length == 0) {
            Toast.error('Informasi', 'Lampiran Harus Diisi');
            return;
        }
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(PermintaanPembelian.moduleApi()) + "submit",
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
            <button class="btn btn-primary btn-sm" onclick="PermintaanPembelian.rejectConfirm(this, '${data_id}')">Proses</button>
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
        let params = PermintaanPembelian.getPostData();
        params.keterangan = '';
        params.ditujukan = $('#ditujukan').val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(PermintaanPembelian.moduleApi()) + "approve",
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
                        PermintaanPembelian.back();
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
        let params = PermintaanPembelian.getPostData();
        params.keterangan = '';
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(PermintaanPembelian.moduleApi()) + "transfer",
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
                        PermintaanPembelian.back();
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
        let params = PermintaanPembelian.getPostData();
        params.keterangan = $('#keterangan').val();
        if (validation.run()) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(PermintaanPembelian.moduleApi()) + "approve",

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
                            PermintaanPembelian.back();
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
                    "url": url.base_url(PermintaanPembelian.moduleApi()) + `getDataLogKaryawan`,
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
                            return `<a class="" style="cursor: pointer;" onclick="PermintaanPembelian.showDetailEditProfile(this, event)">${data}</a>`;
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
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="PermintaanPembelian.detailPerubahan(this)"></i>`;
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
        return `api/${PermintaanPembelian.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $('input#id').val();
        window.location.href = url.base_url(PermintaanPembelian.modulePerubahan()) + "ubah?id=" + data_id + "&state=karyawan-" + from_id;
    },

    showDetailEditProfile: (elm, e) => {
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(PermintaanPembelian.modulePerubahanApi()) + "showDetailEditProfile",

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
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.addFile(this)">Pilih</button>
                    <input id="file" type="text" readonly class="form-control" error="File" placeholder="Pilih Data File" aria-label="Pilih Data File" aria-describedby="button-addon1" value="">
                </div>
            </td>
            <td>
                <input type="text" id="est_harga" name="est_harga" class="form-control"
                placeholder="Est. Harga" error="Est. Harga" value=""/>
            </td>
            <td>
                <i class="bx bx-trash" style="cursor: pointer;" onclick="PermintaanPembelian.deleteItem(this, event)"></i>
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
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.addFile(this)">Pilih</button>
                    <input id="file" type="text" readonly class="form-control" error="File" placeholder="Pilih Data File" aria-label="Pilih Data File" aria-describedby="button-addon1" value="">
                </div>
            </td>
            <td>
                <i class="bx bx-trash" style="cursor: pointer;" onclick="PermintaanPembelian.deleteItem(this, event)"></i>
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
            <div class="col-12">
                <br/>
                <iframe src="${file}" width="700" height="700"/>
            </div>
        </div>`;

        bootbox.dialog({
            message: html,
            size: 'large'
        });
    },

    ExportData:(elm) => {
        let idExportContent = $(elm).attr('idexport');
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent($(`div#${idExportContent}`).html()));
    }
};

$(function () {
    PermintaanPembelian.getData();
    PermintaanPembelian.getDataLogKaryawan();
    PermintaanPembelian.setDate();
    PermintaanPembelian.select2All();
});
