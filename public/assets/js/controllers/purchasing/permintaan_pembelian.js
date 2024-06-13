
let PermintaanPembelian = {
    module: () => {
        return "purchasing/permintaan-pembelian";
    },

    moduleApi: () => {
        return `api/${PermintaanPembelian.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(PermintaanPembelian.module()) + "add?tipe=DOCT_PR&pre_pr_id=0";
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
        window.location.href = url.base_url(PermintaanPembelian.module()) + "add?tipe=" + tipe;
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
        params.status = $("#cb-status").val()
        params.requester = $(".cb-requester").val()

        if (tableData.length > 0) {
            let updateAction = $('#update').val();
            let deleteAction = $('#delete').val();
            tableData.DataTable({
                "processing": true,
                "serverSide": true,
                "ordering": true,
                // "stateSave": true,
                "autoWidth": false,
                "order": [
                    [1, 'desc']
                ],
                "aLengthMenu": [
                    [25, 50, 100],
                    [25, 50, 100]
                ],
                "ajax": {
                    "url": url.base_url(PermintaanPembelian.moduleApi()) + `getData`,
                    "type": "POST",
                    "data": params,
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [
                    {
                        "targets": [0,4,5,6,7,8,9,10,11,12],
                        "orderable": false,
                    },
                    {
                        "targets": [1],
                        "orderable": true,
                        "createdCell": function (td, cellData, rowData, row, col) {
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
                        "data": "purpose",
                    },
                    {
                        "data": "status",
                        "render": (data, type, row, meta) => {
                            // if(row.purchase_tipe == 'BARANG & JASA'){
                            //     if (row.status_acc == '' || row.status == 'CREATED') {
                            //         return `<span class="badge bg-label-warning">Menunggu Proses Approval Admin HC</span>`;
                            //     }
                            //     if (row.status_acc == null && data == 'APPROVED') {
                            //         return `<span class="badge bg-label-warning">Menunggu Proses Verifikasi Manager Purchasing</span>`;
                            //     }
                            //     if (row.status_acc == 'RT_ACCESS_ACC_1' && data == 'APPROVED') {
                            //         return `<span class="badge bg-label-warning">Menunggu Proses Verifikasi Manager Purchasing</span>`;
                            //     }
                            //     if (row.status_acc == 'RT_ACCESS_ACC_1' && data == 'REJECTED') {
                            //         return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Admin HC</span>`;
                            //     }
                            //     if (row.status_acc == 'RT_ACCESS_ACC_2' && data == 'APPROVED') {
                            //         return `<span class="badge bg-label-warning">Menunggu Proses Approval Direksi </span>`;
                            //     }
                            //     if (row.status_acc == 'RT_ACCESS_ACC_2' && data == 'REJECTED') {
                            //         return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Manager Purchasing</span>`;
                            //     }
                            //     if (row.status_acc == 'RT_ACCESS_ACC_3' && data == 'APPROVED') {
                            //         return `<span class="badge bg-label-info">Menunggu Proses Approval Direksi</span>`;
                            //     }
                            //     if (row.status_acc == 'RT_ACCESS_ACC_3' && data == 'REJECTED') {
                            //         return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Direksi </span>`;
                            //     }
                            // }else{
                                if (row.status_acc == '' || row.status == 'CREATED') {
                                    return `<span class="badge bg-label-warning">Menunggu Proses Approval Manajer Departemen</span>`;
                                }
                                if (row.status_acc == null && data == 'APPROVED') {
                                    return `<span class="badge bg-label-warning">Menunggu Proses Verifikasi Admin MOI</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_1' && data == 'APPROVED') {
                                    return `<span class="badge bg-label-warning">Menunggu Proses Verifikasi Admin MOI</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_1' && data == 'REJECTED') {
                                    return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Manajer Departemen</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_2' && data == 'APPROVED') {
                                    return `<span class="badge bg-label-warning">Menunggu Proses Approval Manajer Purchasing</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_2' && data == 'REJECTED') {
                                    return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Admin MOI</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_3' && data == 'APPROVED') {
                                    return `<span class="badge bg-label-info">Menunggu Proses Approval Direksi</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_3' && data == 'REJECTED') {
                                    return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Manajer Purchasing</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_4' && data == 'APPROVED') {
                                    return `<span class="badge bg-label-success">Pengajuan Diacc oleh Direksi</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_4' && data == 'REJECTED') {
                                    return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Direksi</span>`;
                                }
                            // }
                            return "";
                        }
                    },
                    {
                        "data": "remarks",
                    },
                    {
                        "data": "requester",
                    },
                    {
                        "data": "ditujukan_ke",
                    },
                    {
                        "data": "is_regilar",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '-';
                            if (row.is_regular != null) {
                                htmlAction = row.is_regular == 1 ? `MRP/Regular` : `Irregular/Insidentil/Project`;
                            }
                            return htmlAction;
                        }
                    },
                    {
                        "data": "tanggal_estimasi_pemakaian",
                    },
                    // {
                    //     "data": "id",
                    //     "render": (data, type, row, meta) => {
                    //         let htmlAction = '';
                    //         if (updateAction == '1') {
                    //             htmlAction += `<i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="PermintaanPembelian.detail(this)"></i>`;
                    //         }
                    //         return htmlAction;
                    //     }
                    // }
                ],
                scrollY:        "700px",
                scrollX:        true,
                scrollCollapse: true,
                fixedColumns:   {
                    leftColumns: 5,
                    //rightColums:1
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
            params.id = tr.attr('data_id');

            params.nama_item = tr.find('input#nama_item').val();

            params.jumlah = tr.find('input#jumlah').val();
            params.satuan = tr.find('input#satuan').val();
            params.vendor_id = tr.find('input#vendor_id').val();
            params.remarks = tr.find('input#remarks').val();
            params.file = tr.find('input#file').attr('src');
            params.tipe = tr.find('input#file').attr('tipe');
            params.status_barang = tr.find('#status_barang').val();
            params.ket_barang = tr.find('#keterangan-barang').text().trim();
            params.erp_kode_item = tr.find('.erp_kode_item').val();
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
            params.vendor_id = tr.find('td#vendor_id').text().trim();
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
                'ditujukan': $.trim($('#ditujukan').val()),
                'is_regular': $('#is_regular').val(),
                'tanggal_estimasi_pemakaian': $('#tanggal_estimasi_pemakaian').val(),
            },
            'data_item': PermintaanPembelian.getPostdataItem(),
            'data_lampiran': PermintaanPembelian.getPostdataLampiran(),
        };

        // console.log(data);
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
        let tipe = $(elm).data('purchase_tipe');
        let params = PermintaanPembelian.getPostData(tipe);
        let form = $(elm).closest('div.row');
        
        if (params.data_item.length == 0) {
            Toast.error('Informasi', 'Item Harus Diisi');
            return;
        }

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

    getPostdataItemPrePR: () => {
        let data = [];
        let tableData = $('table#table-data-item').find('tbody').find('tr.input');
        $.each(tableData, function () {
            let tr = $(this);
            let params = {};

            let est_biaya       = tr.find('input.est_biaya').val();
            let est_biaya_max   = tr.find('input.est_biaya_max').val();
            let vendor_id   = tr.find('input.vendor_id').val();

            est_biaya = parseInt(est_biaya);
            est_biaya_max = parseInt(est_biaya_max);

            // if(est_biaya != '' && (est_biaya_max != null && est_biaya_max != '')){
            //     if(est_biaya <= est_biaya_max){
                    params.id               = tr.find('input.pre_pr').val();
                    // params.est_biaya        = est_biaya;
                    // params.est_biaya_max    = est_biaya_max;
                    params.vendor_id    = vendor_id;
                    data.push(params);
            //     }
            // }

        });

        return data;
    },

    getPostDataPrePR: () => {
        let data = {
            'data': {
                'id': $('input#id').val(),
                'tipe': $.trim($('#tipe').val()),
                'purpose': $.trim($('#purpose').val()),
                'spec': $.trim($('#spec').val()),
                'departemen': $.trim($('#departemen').val()),
                'area_kerja': $.trim($('#area_kerja').val()),
                'tgl_efektif': $.trim($('#tgl_efektif').val()),
                'pre_pr_id': $('#pre_pr_id').val(),
            },
            'data_item': PermintaanPembelian.getPostdataItemPrePR(),
            'data_lampiran': PermintaanPembelian.getPostdataLampiran(),
        };

        // console.log(data);
        return data;
    },

    submitPrePR: (elm, e) => {
        e.preventDefault();
        let params = PermintaanPembelian.getPostDataPrePR();

        let jumlah_item = tableData = $('table#table-data-item').find('tbody').find('tr.input').length;
        
        // if (params.data_item.length != jumlah_item) {
        //     Toast.error('Informasi', "Terdapat Estimasi Biaya Yang Melebih Batas");
        //     return;
        // }
        if (params.data_lampiran.length == 0) {
            Toast.error('Informasi', 'Lampiran Harus Diisi');
            return;
        }
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(PermintaanPembelian.moduleApi()) + "submitPrePR",
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
                            // window.location.reload();
                            window.location.href = url.base_url(PermintaanPembelian.module()) + "index";
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
        // console.log(params);
        // return
        params.keterangan = '';
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

    indexItem: 0,

    // addItem: (elm, e) => {

    //     let i = PermintaanPembelian.indexItem
    //     e.preventDefault();
    //     let tbody = $(elm).closest('tbody');
    //     let html = `<tr class="input" data_id="">
    //         <td>
    //             <input type="text" id="nama_item" name="nama_item" class="form-control required"
    //             placeholder="Nama Barang" error="Nama Barang" value=""/>
    //         </td>
    //         <td>
    //             <input type="number" id="jumlah" name="jumlah" class="form-control required"
    //             placeholder="Jumlah Barang" error="Jumlah Barang" value=""/>
    //         </td>
    //         <td>
    //             <input type="text" id="satuan" name="satuan" class="form-control required"
    //             placeholder="Satuan Barang" error="Satuan Barang" value=""/>
    //         </td>
    //         <td>
    //             <div class="input-group">
    //                 <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showDataVendor(this,'vendor_id${i}')">Pilih</button>
    //                 <input id="vendor_id" name="vendor_id" type="text" class="vendor_id${i} form-control required" error="Vendor" placeholder="Pilih Data Vendor" aria-label="Pilih Data Vendor" aria-describedby="button-addon1">
    //             </div>
    //         </td>
    //         <td>
    //             <input type="text" id="remarks" name="remarks" class="form-control required"
    //             placeholder="Keterangan" error="Keterangan" value=""/>
    //         </td>
    //         <td>
    //             <div class="input-group">
    //                 <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.addFile(this)">Pilih</button>
    //                 <input id="file" type="text" readonly class="form-control" error="File" placeholder="Pilih Data File" aria-label="Pilih Data File" aria-describedby="button-addon1" value="">
    //             </div>
    //         </td>
    //         <td>
    //             <i class="bx bx-trash" style="cursor: pointer;" onclick="PermintaanPembelian.deleteItem(this, event)"></i>
    //         </td>
    //     </tr>`;
    //     tbody.prepend(html);

    //     PermintaanPembelian.indexItem++;
    // },

    addItem: (elm, e) => {

        let i = PermintaanPembelian.indexItem
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
                <i class="bx bx-trash" style="cursor: pointer;" onclick="PermintaanPembelian.deleteItem(this, event)"></i>
            </td>
        </tr>`;
        tbody.prepend(html);

        PermintaanPembelian.indexItem++;
    },

    indexItemPrePr: 0,

    addItemPrePr: (elm, e) => {

        let i = PermintaanPembelian.indexItemPrePr
        e.preventDefault();
        let tbody = $(elm).closest('tbody');

        let html = `<tr>
                        <td>
                            <input type="text" class="pre_pr pre_pr_id${i}" value="">
                            <button onclick="PermintaanPembelian.showDataPengajuanPrePr(this, 'pre_pr_id${i}','nama_item${i}', 'jumlah${i}', 'est_biaya${i}', 'satuan${i}', 'vendor_id${i}', 'remarks${i}', 'img_file${i}' )" class="btn_add${i} btn btn-danger">Ambil</button>
                        </td>
                        <td>
                            <p class="nama_item${i}"></p>
                        </td>
                        <td>
                            <p class="jumlah${i}"></p>
                        </td>
                        <td>
                            <p class="est_biaya${i}"></p>
                        </td>
                        <td>
                            <p class="satuan${i}"></p>
                        </td>
                        <td>
                            <p class="vendor_id${i}"></p>
                        </td>
                        <td>
                            <p class="remarks${i}"></p>
                        </td>
                        <td>
                            <div class="input-group">
                                <button src="" class="img_file${i} btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showFile(this, event)">Lihat</button>
                            </div>
                        </td>
                        <td>
                            <i class="btn_del${i} bx bx-trash" style="cursor: pointer;" onclick="PermintaanPembelian.deleteItemPrePr(this, ${i})"></i>
                        </td>
                    </tr>`;

        tbody.prepend(html);

        PermintaanPembelian.indexItemPrePr++;
    },

    deleteItemPrePr: (elm, i) => {
        $(elm).closest('tr').remove();
    },

    indexBarangJasa : 0,

    addItemBarangJasa: (elm, e) => {

        let i = PermintaanPembelian.indexBarangJasa

        e.preventDefault();
        let tbody = $(elm).closest('tbody');
        let html = `<tr class="input" data_id="">
            <td>
                <div class="input-group">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showDataKaryawan(this,'bj_nik${i}')">Pilih</button>
                    <input id="bj_nik" type="text" class="bj_nik${i} form-control" error="Karyawan" placeholder="Pilih Data Karyawan" aria-label="Pilih Data Karyawan" aria-describedby="button-addon1">
                </div>
            </td>
            <td>
                <div class="input-group">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showDataArea(this,'area${i}')">Pilih</button>
                    <input id="area" type="text" class="area${i} form-control" error="Area" placeholder="Pilih Data Area" aria-label="Pilih Data Area" aria-describedby="button-addon1">
                </div>
            </td>
            <td>
                <div class="input-group">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showDataJenis(this,'nama_item${i}')">Pilih</button>
                    <input id="nama_item" type="text" class="nama_item${i} form-control" error="Jenis" placeholder="Pilih Data Jenis" aria-label="Pilih Data Jenis" aria-describedby="button-addon1">
                </div>
            </td>
            <td>
                <input type="number" id="jumlah" name="jumlah" class="form-control required"
                placeholder="Jumlah" error="Jumlah" value=""/>
            </td>
            <td>
                <input type="text" id="satuan" name="satuan" class="form-control required"
                placeholder="Satuan" error="Satuan" value=""/>
            </td>
            <td>
                <div class="input-group">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showDataVendor(this,'vendor_id${i}')">Pilih</button>
                    <input id="vendor_id" type="text" class="vendor_id${i} form-control required" error="Vendor" placeholder="Pilih Data Vendor" aria-label="Pilih Data Vendor" aria-describedby="button-addon1">
                </div>
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
                <i class="bx bx-trash" style="cursor: pointer;" onclick="PermintaanPembelian.deleteItem(this, event)"></i>
            </td>
        </tr>`;
        tbody.prepend(html);

        PermintaanPembelian.indexBarangJasa++;
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
                if (type_file == 'jpg' || type_file == 'jpeg' || type_file == 'png' || type_file == 'JPG' || type_file == 'JPEG' || type_file == 'PNG' || type_file == 'pdf') {
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
        // let file = 'http://localhost/simi/public/assets/img/LOGOMOTASA.png';
        // let html = `<div class="row g-3">
        //     <div class="col-12">
        //         <br/>
        //         <embed id="frame" src="${file}" width="800" height="800"/>
        //     </div>
        // </div>`;

        try {


            if(file.search('.png') > -1){
                image = true;
            }else if(file.search('.jpg') > -1){
                image = true;
            }else if(file.search('.jpeg') > -1){
                image = true;
            }else{
                image = false;
            }

            let html = ``;

            if(image){
                html = `<div class="row g-3">
                    <div class="col-12">
                        <div style="overflow: auto">
                            <img id="image-pembelian" src="${file}" width="100%"/>
                        </div>
                        <div class="text-center">
                            <button onclick="PermintaanPembelian.imageZoomIn('#image-pembelian')" class="btn btn-primary">Zoom In</button>
                            <button onclick="PermintaanPembelian.imageZoomOut('#image-pembelian')" class="btn btn-danger">Zoom Out</button>
                        </div>
                    </div>
                </div>`;
            }else{
                html = `<div class="row g-3">
                    <div class="col-12">
                        <br/>
                        <iframe id="frame" src="${file}" width="800" height="800"/>
                    </div>
                </div>`;
            }

            bootbox.dialog({
                message: html,
                size: 'large',
                onEscape: true,
            });


        } catch (error) {
            alert('Gagal Mengakses File')
        }

    },


    zoomInit : 100,

    imageZoomIn:(elm) => {

        if(PermintaanPembelian.zoomInit != 300){
            PermintaanPembelian.zoomInit = PermintaanPembelian.zoomInit + 50
        }

        $(elm).css({
            "margin" : "auto",
            "width" : `${PermintaanPembelian.zoomInit}%`,
        })

        console.log(PermintaanPembelian.zoomInit)
    },

    imageZoomOut:(elm) => {

        if(PermintaanPembelian.zoomInit != 50){
            PermintaanPembelian.zoomInit = PermintaanPembelian.zoomInit - 50
        }

        $(elm).css({
            "margin" : "auto",
            "width" : `${PermintaanPembelian.zoomInit}%`,
        })

        console.log(PermintaanPembelian.zoomInit)
    },

    ExportData: (elm) => {
        let idExportContent = $(elm).attr('idexport');
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent($(`div#${idExportContent}`).html()));
    },

    setStatusBarang: (elm) => {
        let status = $(elm).val();
        let data_id = $(elm).closest('tr').attr('data_id');
        if (status == '0') {
            PermintaanPembelian.barangDitolak(elm);
        }else if(status == '1'){
            PermintaanPembelian.barangReceived(elm);
        }
    },

    barangReceived:(elm)=>{
        let data_id = $(elm).closest('tr').attr('data_id');
        let table = $('table#table-data-item').find('tbody').find(`tr#input-${data_id}`);
        let ket = '';
        table.find('#keterangan-barang').text(ket);
        // table.find('#keterangan-barang').closest('div').addClass('hide');
    },

    barangReceivedPop:(elm, data_id)=>{
        let table = $('table#table-data-item').find('tbody').find(`tr#input-${data_id}`);
        let ket = '';
        table.find('#keterangan-barang').text(ket);
        if(!table.find('#keterangan-barang').closest('div').hasClass('hide')){
            table.find('#keterangan-barang').closest('div').addClass('hide');
        }
        table.find('#status_barang').val('1');
        console.log(`table.find('#status_barang')`, table.find('#status_barang'));
        message.closeDialog();
    },

    barangDitolak: (elm) => {
        let data_id = $(elm).closest('tr').attr('data_id');
        let html = `<div class="row g-3">
        <div class="col-12">
            <br/>
            <label class="form-label" for="alasan">Keterangan</label>
            <textarea id="keterangan" name="keterangan" error="Keterangan" class="form-control required" rows="2" placeholder="Keterangan"></textarea>
        </div>
        <div class="col-12 text-end">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="PermintaanPembelian.rejectBarang(this, '${data_id}')">Proses</button>
            <button class="btn btn-sm" onclick="PermintaanPembelian.barangReceivedPop(this, '${data_id}')">Batal</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });

        $('.bootbox-close-button').addClass('btn-close').text("");
    },

    rejectBarang:(elm, data_id)=>{
        let table = $('table#table-data-item').find('tbody').find(`tr#input-${data_id}`);
        let ket = $('#keterangan').val();
        table.find('#keterangan-barang').text(ket);
        table.find('#keterangan-barang').closest('div').removeClass('hide');
        message.closeDialog();
    },

    // get pre pr
    // showDataPengajuanPrePr: (elm,pre_pr_id, item_name, qty, satuan, remarks, img_file) => {
    //     let params = {};
        
    //     $.ajax({
    //         type: 'POST',
    //         dataType: 'html',
    //         data: params,
    //         url: url.base_url(PermintaanPembelian.moduleApi()) + "showDataPengajuanPrePr",

    //         beforeSend: () => {
    //             message.loadingProses('Proses Pengambilan Data');
    //         },

    //         error: function () {
    //             message.closeLoading();
    //             Toast.error("Informasi", "Gagal");
    //         },

    //         success: function (resp) {
    //             message.closeLoading();
    //             bootbox.dialog({
    //                 message: resp,
    //                 size: 'large'
    //             });
    //             PermintaanPembelian.getDataPengajuanPrePr(pre_pr_id, item_name, qty, satuan, remarks, img_file);
    //         }
    //     });

    // },

    // getDataPengajuanPrePr: async (pre_pr_id, item_name, qty, satuan, remarks, img_file) => {
    //     let tableData = $('table#table-data-pengajuan-pre-pr');
    //     let params = {};

        
    //     let prePrId = [];

    //     $.each($('.pre_pr'), function(i){
    //         prePrId.push($(this).val());
    //     });

    //     if(prePrId.length){
    //         params.id = prePrId
    //     }

    //     if (tableData.length > 0) {
    //         tableData.DataTable({
    //             "processing": true,
    //             "serverSide": true,
    //             "ordering": true,
    //             "autoWidth": false,
    //             "order": [
    //                 [0, 'desc']
    //             ],
    //             "aLengthMenu": [
    //                 [10, 20, 50],
    //                 [10, 20, 50]
    //             ],
    //             "ajax": {
    //                 "url": url.base_url('api/purchasing/permintaan-pembelian') + `getDataPengajuanPrePr`,
    //                 "type": "POST",
    //                 "data": params
    //             },
    //             "deferRender": true,
    //             "createdRow": function (row, data, dataIndex) {
    //             },
    //             "columnDefs": [],
    //             "columns": [{
    //                     "data": "id",
    //                     render: function (data, type, row, meta) {
    //                         return meta.row + meta.settings._iDisplayStart + 1;
    //                     }
    //                 },
    //                 {
    //                     "data": "purpose",
    //                 },
    //                 {
    //                     "data": "item_name",
    //                 },
    //                 {
    //                     "data": "id",
    //                     "render": (data, type, row, meta) => {
    //                         return `<i class="bx bx-plus" style="cursor: pointer;" 
    //                         data_id="${row.id}" 
    //                         data_item_name="${row.item_name}" 
    //                         data_qty="${row.qty}" 
    //                         data_satuan="${row.satuan}" 
    //                         data_remarks="${row.remarks}" 
    //                         data_img_file="${row.img_file}" 
    //                         onclick="PermintaanPembelian.pilihDataPengajuanPrePr(this,
    //                             '${pre_pr_id}',
    //                             '${item_name}',
    //                             '${qty}',
    //                             '${satuan}',
    //                             '${remarks}',
    //                             '${img_file}')"></i>`;
    //                     }
    //                 }
    //             ]
    //         });
    //     }

    // },

    showDataPengajuanPrePrItem: () => {
        let params = {};
        
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(PermintaanPembelian.moduleApi()) + "showDataPengajuanPrePrItem",

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
                PermintaanPembelian.getDataPengajuanPrePrItem();
            }
        });

    },

    getDataPengajuanPrePrItem: async () => {
        let tableData = $('table#table-data-pengajuan-pre-pr-item');
        let params = {};

        let prePrId = [];

        $.each($('.pre_pr'), function(i){
            prePrId.push($(this).val());
        });

        if(prePrId.length){
            params.id = prePrId
        }

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
                    [10, 20, 50],
                    [10, 20, 50]
                ],
                "ajax": {
                    "url": url.base_url('api/purchasing/permintaan-pembelian') + `getDataPengajuanPrePrItem`,
                    "type": "POST",
                    "data": params
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [
                    {
                        "targets": [2],
                        "width" : "400px",
                        "orderable": false,
                    },
                    {
                        "targets": [1],
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                        }
                    },
                    {
                        "targets": [0],
                        "orderable": true,
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
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `<button class="btn btn-primary" 
                            data_id="${row.id}" 
                            data_purpose="${row.purpose}" 
                            data_item_name="${row.item_name}" 
                            data_qty="${row.qty}" 
                            data_est_biaya="${row.est_biaya}" 
                            data_satuan="${row.satuan}" 
                            data_vendor_id="${row.vendor_id}" 
                            data_remarks="${row.remarks}" 
                            data_img_file="${row.img_file}" 
                            onclick="PermintaanPembelian.pilihDataPengajuanPrePrItem(this)"><i class="bx bx-plus"></i></button>`;
                        }
                    },
                    {
                        "data": "purpose",
                        "render": (data, type, row, meta) => {
                            return `<small>No. Pengajuan</small><br>
                            ${row.kode}
                            <br>
                            <br>
                            <small>Purpose</small><br>
                            ${row.purpose}
                            <br><br>
                            <small>Item</small><br>${row.item_name}`;
                        }
                    }
                ]
            });
        }

    },

    pilihDataPengajuanPrePrItem: (elm) => {
        // pilihDataPengajuanPrePrItem: (elm, pre_pr_id, item_name, qty, satuan, remarks, img_file) => {
        let id_val          = $(elm).attr('data_id');
        let purpose_val     = $(elm).attr('data_purpose');
        let item_name_val   = $(elm).attr('data_item_name');
        let qty_val         = $(elm).attr('data_qty');
        let est_biaya_val   = $(elm).attr('data_est_biaya');
        let satuan_val      = $(elm).attr('data_satuan');
        let vendor_id_val   = $(elm).attr('data_vendor_id');
        let remarks_val     = $(elm).attr('data_remarks');
        let img_file_val    = $(elm).attr('data_img_file');

        let i = PermintaanPembelian.indexItemPrePr

        let tbody = $('tbody.item');

        // let html = `<tr class="input">
        //                 <td>
        //                     <input type="hidden" class="pre_pr form-control" value="${id_val}">
        //                     <small>${purpose_val}</small>
        //                     <p>${item_name_val}</p>
        //                 </td>
        //                 <td>
        //                     <p>${qty_val}</p>
        //                 </td>
        //                 <td>
        //                     <input type="number" class="est_biaya form-control" value="${est_biaya_val}" max="${est_biaya_val}">
        //                     <input type="hidden" class="est_biaya_max form-control" value="${est_biaya_val}">
        //                     <small class="text-danger">Estimasi maximal biaya. ${est_biaya_val}</small>
        //                 </td>
        //                 <td>
        //                     <p>${satuan_val}</p>
        //                 </td>
        //                 <td>
        //                     <div class="input-group">
        //                         <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showDataVendor(this,'vendor_id${i}')">Pilih</button>
        //                         <input id="vendor_id" type="text" class="vendor_id${i} vendor_id form-control required" error="Vendor" placeholder="Pilih Data Vendor" aria-label="Pilih Data Vendor" aria-describedby="button-addon1">
        //                     </div>
        //                 </td>
        //                 <td>
        //                     <p>${remarks_val}</p>
        //                 </td>
        //                 <td>
        //                     <div class="input-group">
        //                         <button src="${url.base_url('public/pengajuan_pre_pr')}${img_file_val}" class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showFile(this, event)">Lihat</button>
        //                     </div>
        //                 </td>
        //                 <td>
        //                     <i class="bx bx-trash" style="cursor: pointer;" onclick="PermintaanPembelian.deleteItemPrePr(this, ${i})"></i>
        //                 </td>
        //             </tr>`;

        let html = `<tr class="input">
                        <td>
                            <input type="hidden" class="pre_pr form-control" value="${id_val}">
                            <small>${purpose_val}</small>
                            <p>${item_name_val}</p>
                        </td>
                        <td>
                            <p>${qty_val}</p>
                        </td>
                        <td>
                            <p>${satuan_val}</p>
                        </td>
                        <td>
                            <div class="input-group">
                                <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showDataVendor(this,'vendor_id${i}')">Pilih</button>
                                <input id="vendor_id" type="text" class="vendor_id${i} vendor_id form-control" error="Vendor" placeholder="Pilih Data Vendor" aria-label="Pilih Data Vendor" aria-describedby="button-addon1">
                            </div>
                        </td>
                        <td>
                            <p>${remarks_val}</p>
                        </td>
                        <td>
                            <div class="input-group">
                                <button src="${url.base_url('public/pengajuan_pre_pr')}${img_file_val}" class="btn btn-outline-primary" type="button" id="button-addon1" onclick="PermintaanPembelian.showFile(this, event)">Lihat</button>
                            </div>
                        </td>
                        <td>
                            <i class="bx bx-trash" style="cursor: pointer;" onclick="PermintaanPembelian.deleteItemPrePr(this, ${i})"></i>
                        </td>
                    </tr>`;

        tbody.append(html);

        PermintaanPembelian.indexItemPrePr++;

    
        // $(`.${pre_pr_id}`).val(id_val);
        // $(`.${item_name}`).html(item_name_val);
        // $(`.${qty}`).html(qty_val);
        // $(`.${satuan}`).html(satuan_val);
        // $(`.${remarks}`).html(remarks_val);
        // $(`.${img_file}`).attr('src', `${url.base_url('public/pengajuan_pre_pr')}${img_file_val}`);

        message.closeDialog();
    },

    // get requester
    showDataKaryawan: (elm,id_text) => {

        let params = {};
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(PermintaanPembelian.moduleApi()) + "showDataKaryawan",

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
                PermintaanPembelian.getDataKaryawan(id_text);
            }
        });

    },

    getDataKaryawan: async (bindText) => {
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
                    [200, 300, 1000],
                    [200, 300, 1000]
                ],
                "ajax": {
                    "url": url.base_url('api/master/karyawan') + `getData`,
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="PermintaanPembelian.pilihData(this,'${bindText}')"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihData: (elm,bindID) => {
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');

        $('.'+bindID).val(nik + " - " + nama_lengkap);
        message.closeDialog();
    },

    // get area
    showDataArea: (elm,id_text) => {

        let params = {};
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(PermintaanPembelian.moduleApi()) + "showDataArea",

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
                PermintaanPembelian.getDataArea(id_text);
            }
        });

    },

    getDataArea: async (bindText) => {
        let tableData = $('table#table-data-area');
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
                    [200, 300, 1000],
                    [200, 300, 1000]
                ],
                "ajax": {
                    "url": url.base_url('api/purchasing/permintaan-pembelian') + `getDataArea`,
                    "type": "POST",
                    "data": params
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
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
                        "data": "nama",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama="${row.nama}" data_id="${data}" onclick="PermintaanPembelian.pilihDataArea(this,'${bindText}')"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihDataArea: (elm,bindID) => {
        let nama = $(elm).attr('nama');
        let id = $(elm).attr('data_id');
        $('.'+bindID).val(id + " - " + nama);
        message.closeDialog();
    },

    // get jenis
    showDataJenis: (elm,id_text) => {

        let params = {};
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(PermintaanPembelian.moduleApi()) + "showDataJenis",

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
                PermintaanPembelian.getDataJenis(id_text);
            }
        });

    },

    getDataJenis: async (bindText) => {
        let tableData = $('table#table-data-jenis');
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
                    [200, 300, 1000],
                    [200, 300, 1000]
                ],
                "ajax": {
                    "url": url.base_url('api/purchasing/permintaan-pembelian') + `getDataJenis`,
                    "type": "POST",
                    "data": params
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
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
                        "data": "nama",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama="${row.nama}" data_id="${data}" onclick="PermintaanPembelian.pilihDataJenis(this,'${bindText}')"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihDataJenis: (elm,bindID) => {
        let nama = $(elm).attr('nama');
        let id = $(elm).attr('data_id');
        $('.'+bindID).val(id + " - " + nama);
        message.closeDialog();
    },

    // get vendor
    showDataVendor: (elm,id_text) => {

        let params = {};
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(PermintaanPembelian.moduleApi()) + "showDataVendor",

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
                PermintaanPembelian.getDataVendor(id_text);
            }
        });

    },

    getDataVendor: async (bindText) => {
        let tableData = $('table#table-data-vendor');
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
                    [200, 300, 1000],
                    [200, 300, 1000]
                ],
                "ajax": {
                    "url": url.base_url('api/purchasing/permintaan-pembelian') + `getDataVendor`,
                    "type": "POST",
                    "data": params
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
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
                        "data": "kode",
                    },
                    {
                        "data": "label",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" label="${row.label}" data_id="${data}" onclick="PermintaanPembelian.pilihDataVendor(this,'${bindText}')"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihDataVendor: (elm,bindID) => {
        let label = $(elm).attr('label');
        let id = $(elm).attr('data_id');
        $('.'+bindID).val(id + " - " + label);
        message.closeDialog();
    },

    // get kode item
    showDataKodeItem: (elm,id_text) => {

        let params = {};
        $.ajax({
            type: 'GET',
            dataType: 'html',
            data: params,
            url: url.base_url('api/master/erp/getViewKodeItem'),
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
                PermintaanPembelian.getDataKodeItem(id_text);
            }
        });

    },

    getDataKodeItem: async (bindText) => {
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
                    [10],
                    [10]
                ],
                "ajax": {
                    "url": url.base_url('api/master/erp/getDataKodeItem'),
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
                            $(td).addClass('td-padd');
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
                        "data": "bid",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "bkode",
                    },
                    {
                        "data": "bnama",
                        "width" : "100px"
                    },
                    {
                        "data": "stok",
                        "render": (data, type, row, meta) => {
                            let list = ``;
                            row.stok.forEach(element => {
                                list += `- ${element.kgudang} (${element.stok})<br>`;
                            });
                            return `${list} <br> Total Stok : ${row.stok_count}`;
                        }
                    },
                    {
                        "data": "bid",
                        "render": (data, type, row, meta) => {
                            return `<button class="btn btn-primary btn-sm" data-id="${row.bid}" data-kode="${row.bkode}" data-nama="${row.bnama}" onclick="PermintaanPembelian.pilihDataKodeItem(this,'${bindText}')">Pilih</button>`;
                        }
                    }
                ]
            });
        }
    },

    pilihDataKodeItem: (elm,bindID) => {
        let id = $(elm).attr('data-id');
        let kode = $(elm).attr('data-kode');
        let nama = $(elm).attr('data-nama');
        $('#'+bindID).val(`${id} - ${kode} - ${nama}`);
        message.closeDialog();
    },
};

$(function () {
    PermintaanPembelian.getData();
    PermintaanPembelian.getDataLogKaryawan();
    PermintaanPembelian.setDate();
    PermintaanPembelian.select2All();
});
