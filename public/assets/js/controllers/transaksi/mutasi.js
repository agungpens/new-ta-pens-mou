

let Mutasi = {
    module: () => {
        return "pengajuan/mutasi";
    },

    moduleApi: () => {
        return `api/${Mutasi.module()}`;
    },

    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleKaryawanApi: () => {
        return `api/${Mutasi.moduleKaryawan()}`;
    },

    add: (jenis) => {
        window.location.href = url.base_url(Mutasi.module()) + "add?jenis_mutasi=" + jenis;
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Mutasi.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(Mutasi.module()) + "index";
    },

    getData: async () => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();
        let params = {};
        params.area = $('#area').val();
        params.divisi = $('#divisi').val();
        params.departemen = $('#departemen').val();
        params.jabatan = $('#jabatan').val();
        params.status = $('#cb-status').val();
        params.status_kry = $('#status').val();
        params.nik = $('#nik').val();
        params.id_jenis_mutasi = $('#jenis_mutasi').val();

        // console.log(params);return;

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
                    "url": url.base_url(Mutasi.moduleApi()) + `getData`,
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
                    // {
                    //     "targets": 6,
                    //     "orderable": false,
                    //     "createdCell": function (td, cellData, rowData, row, col) {
                    //         $(td).addClass('text-center');
                    //         $(td).addClass('td-padd');
                    //         $(td).addClass('action');
                    //     }
                    // },
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
                "columns": [
                    {
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `
                            <button class="btn btn-primary" style="cursor: pointer;" data_id="${data}" onclick="Mutasi.ubah(this)" title="Edit"><i class="bx bx-edit"></i></button><br>
                            <button class="btn btn-danger" style="cursor: pointer;" data_id="${data}" onclick="Mutasi.delete(this, event)" title="Delete"><i class="bx bx-trash"></i></button><br>
                            <button class="btn btn-success" style="cursor: pointer;" data_id="${data}" onclick="Mutasi.approveFast(this, event)" title="Approve"><i class="bx bx-check"></i></button><br>
                            <button class="btn btn-warning" style="cursor: pointer;" data_id="${data}" onclick="Mutasi.rejectFast(this, event)" title="Reject"><i class="bx bx-reply"></i></button>`;
                        }
                    },
                    {
                        "data": "doc_trans",
                        "render": (data, type, row, meta) => {
                            view = `
                                <p>${row.doc_trans}<br/>
                                <span class="badge bg-label-secondary">${row.jenis_transaksi}</span>
                            `
                            if(row.status_mutasi == "APPROVED") {
                                view += `<span class="badge bg-label-success">${row.status_mutasi}</span><br/>`;
                            } else if(row.status_mutasi == "REJECTED") {
                                view += `<span class="badge bg-label-danger">${row.status_mutasi}</span><br/>`;
                            } else {
                                view += `<span class="badge bg-label-info">${row.status_mutasi}</span><br/>`;
                            }
                            view += `</p>`;

                            view += `<p>Tanggal Pengajuan :<br/>${row.created_at}<br/></p>`;

                            view += `<p>Tanggal Persetujuan :<br/>`
                            if(row.status_mutasi == 'FINISH' || row.status_mutasi == 'APPROVED') {
                                view += row.tanggal_acc;
                            } else {
                                view += `<span class="badge bg-label-info">Belum di Approve</span>`;
                            }
                            view += `</p>`;
                            
                            return view;
                        }
                    },
                    {
                        "data": "doc_trans",
                        "visible": false,
                    },
                    {
                        "data": "jenis_transaksi",
                        "visible": false,
                    },
                    {
                        "data": "nama_lengkap",
                        "render": (data, type, row, meta) => {
                            return `${row.nik}<br/>${row.nama_lengkap}`
                        }
                    },
                    {
                        "data": "nik",
                        "visible": false,
                    },
                    {
                        "data": "nama_lengkap",
                        "visible": false,
                    },
                    // {
                    //     "data": "nama_departemen",
                    // },
                    // {
                    //     "data": "nama_jabatan",
                    // },
                    {
                        "data": "perubahan",
                        "exportable" : false,
                        "render": (data, type, row, meta) => {
                            if((row.departemen_baru != row.departemen_lama)){
                                data = `<span class="badge bg-label-info">Departemen</span><br>${row.departemen_lama || ''} <i class="bx bx-chevrons-right"></i> ${row.departemen_baru ?? row.departemen_lama}`;
                            } else {
                                data = ``;
                            }

                            if((row.jabatan_baru != row.jabatan_lama)){
                                data += `<br><span class="badge bg-label-success">Jabatan</span><br>${row.jabatan_lama || ''} <i class="bx bx-chevrons-right"></i> ${row.jabatan_baru ?? row.jabatan_lama}`;
                            } else {
                                data += ``;
                            }

                            if((row.area_kerja_baru != row.area_kerja_lama)){
                                data += `<br><span class="badge bg-label-danger">Area Kerja</span><br>${row.area_kerja_lama || ''} <i class="bx bx-chevrons-right"></i> ${row.area_kerja_baru ?? row.area_kerja_lama}`;
                            } else {
                                data += ``;
                            }

                            if((row.golongan_baru != row.golongan_lama)){
                                data += `<br><span class="badge bg-label-primary">Golongan</span><br>${row.golongan_lama || ''} <i class="bx bx-chevrons-right"></i> ${row.golongan_baru ?? row.golongan_lama}`;
                            } else {
                                data += ``;
                            }

                            if((row.status_karyawan_name != row.status_karyawan_name_lama)){
                                data += `<br><span class="badge bg-label-warning">Status</span><br>${row.status_karyawan_name_lama || ''} <i class="bx bx-chevrons-right"></i> ${row.status_karyawan_name ?? row.status_karyawan_name_lama}`;
                            } else {
                                data += ``;
                            }

                            if((row.status_pkwt != row.status_pkwt_lama)){
                                data += `<br><span class="badge bg-label-info">PKWT</span><br>${row.status_pkwt_lama || ''} <i class="bx bx-chevrons-right"></i> ${row.status_pkwt}`;
                            } else {
                                data += ``;
                            }

                            if((row.start_date != row.start_date_lama)){
                                data += `<br><span class="badge bg-label-primary">TANGGAL AWAL</span><br>${row.start_date_lama || ''} <i class="bx bx-chevrons-right"></i> ${row.start_date}`;
                            } else {
                                data += ``;
                            }

                            if((row.end_date != row.end_date_lama)){
                                data += `<br><span class="badge bg-label-warning">TANGGAL AKHIR</span><br>${row.end_date_lama || ''} <i class="bx bx-chevrons-right"></i> ${row.end_date}`;
                            } else {
                                data += ``;
                            }
                            return data;
                        }
                    },
                    {
                        "data": "id",
                        "visible" : false,
                        "render": (data, type, row, meta) => {
                            if((row.departemen_baru != row.departemen_lama)){
                                data = `Departemen : ${row.departemen_lama || ''} > ${row.departemen_baru}`;
                            } else {
                                data = ``;
                            }

                            if((row.jabatan_baru != row.jabatan_lama)){
                                data += `<br>Jabatan : ${row.jabatan_lama || ''} > ${row.jabatan_baru}`;
                            } else {
                                data += ``;
                            }

                            if((row.area_kerja_baru != row.area_kerja_lama)){
                                data += `<br>Area Kerja : ${row.area_kerja_lama || ''} > ${row.area_kerja_baru}`;
                            } else {
                                data += ``;
                            }

                            if((row.golongan_baru != row.golongan_lama)){
                                data += `<br>Golongan : ${row.golongan_lama || ''} > ${row.golongan_baru}`;
                            } else {
                                data += ``;
                            }

                            if((row.status_karyawan_name != row.status_karyawan_name_lama)){
                                data += `<br>Status : ${row.status_karyawan_name_lama || ''} > ${row.status_karyawan_name}`;
                            } else {
                                data += ``;
                            }

                            if((row.status_pkwt != row.status_pkwt_lama)){
                                data += `<br>PKWT : ${row.status_pkwt_lama || ''} > ${row.status_pkwt}`;
                            } else {
                                data += ``;
                            }
                            if((row.start_date != row.start_date_lama)){
                                data += `<br>TANGGAL AWAL : ${row.start_date_lama || ''} > ${row.start_date}`;
                            } else {
                                data += ``;
                            }
                            if((row.end_date != row.end_date_lama)){
                                data += `<br>TANGGAL AKHIR : ${row.end_date_lama || ''} > ${row.end_date}`;
                            } else {
                                data += ``;
                            }
                            return data;
                        }
                    },
                    {
                        "data": "id",
                        "visible" : false,
                        "render": (data, type, row, meta) => {
                            if((row.departemen_baru != row.departemen_lama)){
                                data = `Departemen : ${row.departemen_lama || ''} > ${row.departemen_baru}`;
                            } else {
                                data = ``;
                            }
                            return data;
                        }
                    },
                    {
                        "data": "id",
                        "visible" : false,
                        "render": (data, type, row, meta) => {
                            if((row.jabatan_baru != row.jabatan_lama)){
                                data = `Jabatan : ${row.jabatan_lama || ''} > ${row.jabatan_baru}`;
                            } else {
                                data = ``;
                            }
                            return data;
                        }
                    },
                    {
                        "data": "id",
                        "visible" : false,
                        "render": (data, type, row, meta) => {
                            if((row.area_kerja_baru != row.area_kerja_lama)){
                                data = `Area Kerja : ${row.area_kerja_lama || ''} > ${row.area_kerja_baru}`;
                            } else {
                                data = ``;
                            }
                            return data;
                        }
                    },
                    {
                        "data": "id",
                        "visible" : false,
                        "render": (data, type, row, meta) => {
                            if((row.golongan_baru != row.golongan_lama)){
                                data = `Golongan : ${row.golongan_lama || ''} > ${row.golongan_baru}`;
                            } else {
                                data = ``;
                            }
                            return data;
                        }
                    },
                    {
                        "data": "id",
                        "visible" : false,
                        "render": (data, type, row, meta) => {
                            if((row.status_karyawan_name != row.status_karyawan_name_lama)){
                                data = `Status : ${row.status_karyawan_name_lama || ''} > ${row.status_karyawan_name}`;
                            } else {
                                data = ``;
                            }
                            return data;
                        }
                    },
                    {
                        "data": "id",
                        "visible" : false,
                        "render": (data, type, row, meta) => {
                            if((row.status_pkwt != row.status_pkwt_lama)){
                                data = `PKWT : ${row.status_pkwt_lama || ''} > ${row.status_pkwt}`;
                            } else {
                                data = ``;
                            }
                            return data;
                        }
                    },
                    {
                        "data": "id",
                        "visible" : false,
                        "render": (data, type, row, meta) => {
                            if((row.start_date != row.start_date_lama)){
                                data = `TANGGAL AWAL : ${row.start_date_lama || ''} > ${row.start_date}`;
                            } else {
                                data = ``;
                            }
                            return data;
                        }
                    },
                    {
                        "data": "id",
                        "visible" : false,
                        "render": (data, type, row, meta) => {
                            if((row.end_date != row.end_date_lama)){
                                data = `TANGGAL AKHIR : ${row.end_date_lama || ''} > ${row.end_date}`;
                            } else {
                                data = ``;
                            }
                            return data;
                        }
                    },
                    
                    // {
                    //     "data": "status_karyawan_name",
                    // },
                    {
                        "data": "created_at",
                        "visible": false
                    },
                    {
                        "data": "status_mutasi",
                        "visible": false,
                        "render" : (data, type, row, meta) => {
                             if(data == "APPROVED"){
                                return `<span class="badge bg-label-success">${data}</span>`;
                             }else if(data == "REJECTED"){
                                return `<span class="badge bg-label-danger">${data}</span>`;
                             }else{
                                return `<span class="badge bg-label-info">${data}</span>`;
                             }
                        }
                    },
                    {
                        "data": "tanggal_acc",
                        "visible": false,
                        "render": (data, type, row, meta) => {
                            if(row.status_mutasi != 'APPROVED') {
                                if(row.status_mutasi == 'FINISH') {
                                    return data;
                                } else {
                                    return `<span class="badge bg-label-info">Belum di Approve</span>`;
                                }
                            }
                            return data;
                        }
                    },
                    // {
                    //     "data": "start_date_1",
                    // },
                    // {
                    //     "data": "end_date",
                    // },
                    // {
                    //     "data": "status_pkwt",
                    // }
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
                          exportOptions: { columns: [0, 3, 4, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] , format: {
                            body: function(data, column, row) {
                                if (typeof data === 'string' || data instanceof String) {
                                    data = data.replace(/<br\s*\/?>/ig, "\r\n").replace('<span class="badge bg-label-info">', "").replace('</span>', "");
                                }
                                return data;
                            }
                        }}
                        },
                      ]
                    },
                ],
                scrollY:        "600px",
                scrollX:        true,
                scrollCollapse: true,
                fixedColumns:   {
                    leftColumns: 6
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
            <button class="btn btn-primary btn-sm" onclick="Mutasi.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(Mutasi.moduleApi()) + "delete",

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

    getPostItemDetail:()=>{
        let data = [];
        let checkDetail = $('.checkdetail');
        $.each(checkDetail, function(){
            let params = {};
            params.code = $(this).attr('data_id');
            if($(this).is(':checked')){
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
    //         'data_detail': Mutasi.getPostItemDetail()
    //     };
    //     return data;
    // },

    approve: (elm, e) => {
        e.preventDefault();
        let params = Mutasi.getPostData();
        if($('#keterangan').length > 0){
            if($('#keterangan').val() == ''){
                Toast.error('Informasi', 'Keterangan Belum Diisi');
                return;
            }else{
                params.keterangan = $('#keterangan').val();
            }
        }
        let form = $(elm).closest('div.row');
        if(validation.runWithElement(form)){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Mutasi.moduleApi()) + "approve",
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
        let dataDate = $('.data-date');
        $.each(dataDate, function(){
            $(this).flatpickr();
        });
    },

    setDatePeriode: () => {
        let dataDate = $('.data-date-periode');
        $.each(dataDate, function(){
            $(this).flatpickr({
                dateFormat: "Y-m",
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

    showDataKaryawan:(elm)=>{
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Mutasi.moduleApi()) + "showDataKaryawan",

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
                Mutasi.getDataKaryawan();
            }
        });
    },

    getDataKaryawan: async () => {
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
                    "url": url.base_url(Mutasi.moduleKaryawanApi()) + `getData`,
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="Mutasi.pilihData(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihData:(elm)=>{
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');
        $('#nik').val(nik+" - "+nama_lengkap);
        message.closeDialog();
        let params = {};
        params.nik = nik;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Mutasi.moduleApi()) + "getDetailKaryawan",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                console.log('resp',resp);
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

    setNik:(elm, e)=>{
        let nik = $(elm).is(':checked') ? $(elm).attr('nik') : '';
        $('#nik').val(nik);
    },

    modulePerubahan: () => {
        return "transaksi/perubahandatakaryawan";
    },

    modulePerubahanApi: () => {
        return `api/${Mutasi.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $('input#id').val();
        window.location.href = url.base_url(Mutasi.modulePerubahan()) + "ubah?id=" + data_id + "&state=karyawan-" + from_id;
    },

    showDetailEditProfile:(elm, e)=>{
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Mutasi.modulePerubahanApi()) + "showDetailEditProfile",

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
    },

    checkAll:(elm)=>{
        let checkHead = $(elm);
        if(checkHead.is(':checked')){
            $('.checkdetail').prop('checked', true);
        }else{
            $('.checkdetail').prop('checked', false);
        }
    },

    checkData:(elm)=>{
        let checkHead = $('.checkhead');
        let checkDetail = $('.checkdetail');
        let totalTrChecked = 0;
        $.each(checkDetail, function(){
            if($(this).is(':checked')){
                totalTrChecked +=1;
            }
        });

        if(totalTrChecked == checkDetail.length){
            checkHead.prop('checked', true);
        }else{
            checkHead.prop('checked', false);
        }
    },

    reject:(elm)=>{
        let html = `<div class="row g-3">
        <div class="col-12">
            <br/>
            <label class="form-label" for="keterangan">Keterangan</label>
            <textarea id="keterangan" name="keterangan" error="Keterangan" class="form-control required" rows="2" placeholder="Keterangan"></textarea>
        </div>
        <div class="col-12 text-end">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="Mutasi.approve(this, event)">Proses</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },

    checkMenu:(elm)=>{
        $('input[type=checkbox]').on('change',function(){
            if ($(this).is(':checked')){
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
                'tgl_awal': $.trim($('#tgl_awal').val()),
                'tgl_akhir': $.trim($('#tgl_akhir').val()),
                'jabatan': $.trim($('#jabatan').val()),
                'status_karyawan': $.trim($('#status_karyawan').val()),
                'pkwt': $.trim($('#pkwt').val()),
                'job_grade': $.trim($('#job_grade').val()),
                'divisi': $.trim($('#divisi').val()),
                'departemen': $.trim($('#departemen').val()),
                'golongan': $.trim($('#golongan').val()),
                'lokasi_kerja': $.trim($('#lokasi_kerja').val()),
                'jenis_mutasi': $.trim($('#jenis_mutasi').val()),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Mutasi.getPostData();
        let form = $(elm).closest('div.row');
        if(validation.runWithElement(form)){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Mutasi.moduleApi()) + "submit",
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

    export: (elm) => {
        let idExportContent = $(elm).attr('idexport');
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent($(`div#${idExportContent}`).html()));
    },

    moduleLaporanAbsen: () => {
        return "laporan/absensi";
    },

    moduleLaporanAbsenApi: () => {
        return `api/${Mutasi.moduleLaporanAbsen()}`;
    },

    showListDepartemen: (elm) => {
        let params = {};
        params.divisi = $(elm).val();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Mutasi.moduleLaporanAbsenApi()) + "showListDepartemen",

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

    getLaporan: async () => {
        let tableData = $('table#table-laporan');
        tableData.DataTable().destroy();

        let params = {}
        params.periode = $("#periode").val() ?? '';
        params.tgl_pengajuan = $("#tgl_pengajuan").val() ?? '';
        params.departemen = $("#cb-departemen").val() ?? '';
        params.area = $("#cb-area-kerja").val() ?? '';
        params.nik = $.trim($('#nik').val()) ?? '';

        if (tableData.length > 0) {
            let updateAction = $('#update').val();
            let deleteAction = $('#delete').val();
            let approveAction = $('#approve').val();
            let userrole = $('#userrole').val();
            tableData.DataTable({
                "stateSave": true,
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
                    "url": url.base_url(Mutasi.moduleApi()) + `getLaporan`,
                    "type": "POST",
                    "data": params,
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [
                    // {
                    //     targets: [4, 5, 6],
                    //     render: $.fn.dataTable.render.number(',', '.', 0, '')
                    // },
                    {
                        "targets": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                        "orderable": false,
                    }
                ],
                // "scrollY":        "700px",
                // "scrollX":        true,
                // "scrollCollapse": true,
                // "fixedColumns":   {
                //     leftColumns: 5,
                // },
                "columns": [{
                    "data": "id",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                    },
                    {
                        "data": "nik",
                    },
                    {
                        "data": "nama_lengkap",
                        "render": (data, type, row, meta) => {
                            var nama_lengkap = row.nama_lengkap;
                            var nama_departemen = row.nama_departemen;
                            var area_kerja = row.area_kerja;

                            // return `${nama_lengkap}<br><small>${nama_departemen} - ${area_kerja}</small>`;
                            return `${nama_lengkap}`;
                        }
                    },
                    {
                        "data": "tmk",
                    },
                    {
                        "data": "nama_status_karyawan",
                    },
                    {
                        "data": "start_date_1",
                    },
                    {
                        "data": "end_date_1",
                    },
                    {
                        "data": "nama_jabatan",
                    },
                    {
                        "data": "nama_divisi",
                    },
                    {
                        "data": "nama_departemen",
                    },
                    {
                        "data": "area_kerja",
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

    approveFast: (elm, e) => {
        e.preventDefault();
        let data_id = $(elm).attr('data_id');
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan melakukan approval data ini ?</p>
        </div>
        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="Mutasi.approveFastConfirm(this, '${data_id}')">Ya</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Tidak</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },

    approveFastConfirm: (elm, id) => {
        let params = {};
        params.id = id;
        if($('#keterangan').length > 0){
            if($('#keterangan').val() == ''){
                Toast.error('Informasi', 'Keterangan Belum Diisi');
                return;
            }else{
                params.keterangan = $('#keterangan').val();
            }
        }
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Mutasi.moduleApi()) + "approveFast",

            beforeSend: () => {
                message.loadingProses('Proses Simpan Data');
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
                    Toast.error('Informasi','Data Gagal Disimpan ', resp.message);
                }
            }
        });
    },

    rejectFast: (elm, e) => {
        e.preventDefault();
        let data_id = $(elm).attr('data_id');
        let html = `<div class="row g-3">
        <div class="col-12">
            <br/>
            <label class="form-label" for="keterangan">Keterangan</label>
            <textarea id="keterangan" name="keterangan" error="Keterangan" class="form-control required" rows="2" placeholder="Keterangan"></textarea>
        </div>
        <div class="col-12 text-end">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="Mutasi.approveFastConfirm(this, '${data_id}')">Proses</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },
};

$(function () {
    Mutasi.getData();
    Mutasi.getDataKaryawan();
    Mutasi.getLaporan();
    Mutasi.setDate();
    Mutasi.setDatePeriode();
    Mutasi.select2All();
    Mutasi.checkData();
    Mutasi.checkMenu();

});
