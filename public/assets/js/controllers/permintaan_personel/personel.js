let Personel = {
    module: () => {
        return "transaksi/permintaan-personel";
    },

    moduleApi: () => {
        return `api/${Personel.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(Personel.module()) + "add";
    },
    department: () => {
        window.location.href = url.base_url('permintaan_personel/department');
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Personel.module()) + "ubah?id=" + data_id;
    },

    approve:(elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Personel.module()) + "approve?id=" + data_id;
    },

    detailDokumen:(elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Personel.module()) + "detailDokumen?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(Personel.module()) + "index";
    },

    getData: async () => {
        let tableData = $('table#table-data');

        if (tableData.length > 0) {
            let updateAction = $('#update').val();
            let deleteAction = $('#delete').val();
            let approveAction = $('#approve').val();
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
                    "url": url.base_url(Personel.moduleApi()) + `getData`,
                    "type": "POST",
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [
                    {
                        "targets": [2,3,4,5,6,7,8,9,10,11],
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                           $(td).addClass('td-padd');
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
                        "targets": 0,
                        "createdCell": function (td, cellData, rowData, row, col) {
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
                            let htmlAction = '';
                            if(updateAction == '1'){
                                htmlAction += `<button class="btn btn-warning" data_id="${data}" onclick="Personel.ubah(this)"><i class="bx bx-edit"></i></button>`;
                            }
                            if(deleteAction == '1'){
                                htmlAction += `<button class="btn btn-danger" data_id="${data}" onclick="Personel.delete(this, event)"><i class="bx bx-trash"></i></button>`;
                            }
                            if($('#roleakses').val() == 'Admin HC Recruitment'){
                                htmlAction += `<button class="btn btn-primary" data_id="${data}" onclick="Personel.detailDokumen(this)"><i class="btn btn-sm btn-info text-white">Detail</i></button>`;
                            }
                            return htmlAction;
                        }
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            if(row.final_approve == null){
                                if(approveAction == '1' && row.status != 'CREATED'){
                                    htmlAction += `<button class="btn btn-success" data_id="${data}" onclick="Personel.approve(this)"><i class="bx bx-check-circle"></i></button>`;
                                }
                            }else{
                                
                                htmlAction += `<span class="badge bg-label-danger">Selesai</span>`;
                            }
                            return htmlAction;
                        }
                    },
                    
                    {
                        "data": "status",
                        render : function(data,type,row,meta){
                            //  console.log(data)
                            let html = '';

                            if(data == "APPROVED"){
                                html = `<span class="badge bg-label-${row.next_approval ? 'warning' : 'success' }" align="left">${data} ${row.nama_lengkap == null ? '' : 'by '+row.nama_lengkap }</span>`;
                            }else if(data == "REJECTED"){
                                html = `<span class="badge bg-label-danger" align="left">${data} by ${row.nama_lengkap} \n alasan ${row.alasan_ditolak}</span>`;
                            }else if(data == "CREATED"){
                                html = `<span class="badge bg-label-warning">${data}</span>`;
                            }else if(data == "SUBMITTED"){
                                html = `<span class="badge bg-label-info">${data}</span>`;
                            }else{
                                if(data == null){
                                    html = `<span class="badge bg-label-info">NOT APPROVED</span>`;
                                }

                                html = `<span class="badge bg-label-info">${data}</span>`;
                            }
                            if(row.next_approval){
                                html += `<br>Next Approval : ${row.next_approval_name}`
                            }
                            return html;
                        }

                    },
                    {
                        "data": "updated_at",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let html = ``;
                            if(row.jumlah_posting) {
                                html = `<span class="badge bg-label-success">SUDAH DIPOSTING (${row.jumlah_posting} X)</span>`;
                            }

                            return html;
                        }
                    },
                    {
                        "data": "permintaan_no",
                    },
                    {
                        "data": "tanggal_pengajuan",
                    },
                    {
                        "data": "nama_posisi",
                    },
                    {
                        "data": "nama_jabatan",
                    },
                    {
                        "data": "nama_departemen",
                    },
                    {
                        "data": "name",
                    },
                ],
                // scrollY:        "600px",
                // scrollX:        true,
                // scrollCollapse: true,
                // fixedColumns:   {
                //     leftColumns: 5
                // }
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
            <button class="btn btn-danger btn-sm" onclick="Personel.deleteConfirm(this, '${data_id}')">Ya</button>
            <button class="btn btn-secondary btn-sm " onclick="message.closeDialog()">Tidak</button>
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
            url: url.base_url(Personel.moduleApi()) + "delete",

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

    reject:(elm,e) => {
        let params = {}
        params.permintaan_no = e;
        let rejectHtml = `
            <input type="hidden" id="no_pengajuan" value="${e}">

            <div class="row g-3">
                <div class="col-12">
                    <h5 class="py-3 breadcrumb-wrapper mb-4">
                        <span class="text-muted fw-light">Reject Pengajuan /</span><span class="text-muted fw-light">${e}</span>
                    </h5>
                </div>
            </div>

            <div class="row g-3">
                <div class="col-sm-12">
                    <label class="form-label" for="nik">Keterangan</label>
                    <textarea class='form-control required' id='alasan-ditolak' name='alasan-ditolak' error='Keterangan' ></textarea>
                </div>
                <div class="col-12 text-end">
                    <button status='REJECTED' onclick="Personel.saveReject(this,'${e}')" class="btn btn-danger btn-next"> <span
                            class="d-sm-inline-block d-none me-sm-1">Reject</span> <i
                            class="bx bx-x bx-sm me-sm-n2"></i></button>
            </div>
        `;
        bootbox.dialog({
            message: rejectHtml,
            size: 'small'
        });
        $('.bootbox-close-button').addClass('btn-close').text("");
    },

    saveReject:(elm,e) => {
        const kodeTransaksi = e;
        const alasanDitolak = $('#alasan-ditolak').val();
        if(validation.run()){
            let params = {}
            params.permintaan_no = kodeTransaksi;
            params.alasan_ditolak = alasanDitolak
            params.status = $(elm).attr('status');

            console.log(params);

            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Personel.moduleApi()) + "saveapproval",

                beforeSend: () => {
                    message.loadingProses('Proses Rejected Data');
                },

                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi","Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if(resp.is_valid == 1){
                        Toast.success('Informasi','Data Berhasil Di Reject');
                        setTimeout(function () {
                            window.location.href = url.base_url(Personel.module()) + "index";
                        }, 1000);
                    }else{
                        Toast.error('Informasi', resp.message);
                    }
                }
            });
        }
    },

    saveApproval: (elm, id) => {
        let params = {};
        params.permintaan_no = id;
        params.status = $(elm).data('status');
        params.sifat = $('#sifat').val();
        // console.log(params);
        // return params;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Personel.moduleApi()) + "saveapproval",

            beforeSend: () => {
                message.loadingProses('Proses Approval Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi',"Gagal");
            },

            success: function (resp) {
                console.log(resp);
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi','Data Berhasil Diapprove');
                    setTimeout(function () {
                        window.location.href = url.base_url(Personel.module()) + "index";
                    }, 1000);
                } else {
                    Toast.error('Informasi','Data Gagal Diapprove ', resp.message);
                }
            }
        });
    },


    showFile: (elm, e) => {
        e.preventDefault();
        let file = $(elm).attr('src');
        let html = `<div class="row g-3">
            <div class="col-12">
                <br/>
                <iframe src="${file}" width="800" height="800"/>
            </div>
        </div>`;

        bootbox.dialog({
            message: html,
            size: 'large',
            onEscape: true,
        });
    },

    uploadFile:() => {
        let uploader = $('#uploader');
        let attachment = $('#attachment');
            var reader = new FileReader();
            reader.onload = function (event) {
                var files = $(uploader).get(0).files[0];
                console.log(files);
                filename = files.name;
                var data_from_file = filename.split(".");
                var type_file = $.trim(data_from_file[data_from_file.length - 1]);
                if (type_file == 'pdf') {
                    var data = event.target.result;
                    attachment.attr("src", data);
                    attachment.attr("tipe", type_file);
                    attachment.val(filename);
                } else {
                    bootbox.dialog({
                        message: "File harus menggunakan format pdf"
                    });
                }
            };
            reader.readAsDataURL(uploader[0].files[0]);
    },

    getPostInputDokumen: () => {
        let params = {};
        let attachment = $('#attachment');
        params.file = attachment.attr('src');
        params.tipe = attachment.attr('tipe');

        return params;
    },
    getPostData: () => {
        let jk = [];
        $.each($('.jenis_kelamin:checked'), function(){
            jk.push($(this).val());
        })
        let kacamata = [];
        $.each($('.kacamata:checked'), function(){
            kacamata.push($(this).val());
        })

        let pendidikan = [];
        $.each($('.pendidikan:checked'), function(){
            pendidikan.push($(this).val());
        })

        let data = {
            'data': {
                'id': $('input#id').val(),
                'kebutuhan_id': $('input#kebutuhan_id').val(),
                'persyaratan_id': $('input#persyaratan_id').val(),
                'tgl_pengajuan': $.trim($('#tgl_pengajuan').val()),
                'userdept': $.trim($('#userdept').val()),
                'sifat': $.trim($('#sifat').val()),
                'tipe': $.trim($('#tipe').val()),
                'rencana_masuk': $.trim($('#rencana_masuk').val()),
                'nama_posisi': $.trim($('#nama_posisi').val()),
                'jabatan': $.trim($('#jabatan').val()),
                'unit': $.trim($('#unit').val()),
                'jumlah': $.trim($('#jumlah').val()),
                'area_kerja': $.trim($('#area_kerja').val()),
                'alasan': $.trim($('#alasan').val()),
                'jenis_kelamin': jk,
                'usia_min': $.trim($('#usia_min').val()),
                'usia_max': $.trim($('#usia_max').val()),
                'pendidikan': pendidikan,
                'jurusan': $.trim($('#jurusan').val()).split(","),
                'pengalaman': $.trim($('#pengalaman').val()).split(","),
                'penguasaan': $.trim($('#penguasaan').val()).split(","),
                'bahasa': $.trim($('#bahasa').val()).split(","),
                'iso': $.trim($('#iso').val()).split(","),
                'k3': $.trim($('.k3:checked').val()),
                'skill': $.trim($('#skill').val()).split(","),
                'catatan': tinymce.get("catatan").getContent(),
                // 'diajukan': $.trim($('#diajukan:checked').val()),
                'tinggi_min':$.trim($('#tinggi_min').val()),
                // 'tinggi_max':$.trim($('#tinggi_max').val()),
                'berat_min':$.trim($('#berat_min').val()),
                'berat_max':$.trim($('#berat_max').val()),
                'job_struktur':$.trim($('#job_struktur').val()),
                'kacamata': kacamata,
            },
            'attachment': Personel.getPostInputDokumen(),
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Personel.getPostData();
        let diajukan = $(elm).data('diajukan');
        params['data']['diajukan'] = diajukan == undefined ? null : diajukan;
        // console.log(params);return;
        let form = $(elm).closest('div.row');
        if(validation.runWithElement(form)){
            // return params;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Personel.moduleApi()) + "submit",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function () {
                    message.closeLoading();
                    Toast.error('Informasi',"Gagal");
                },

                success: function (resp) {
                    console.log(resp);
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
        // const flatpickrRange = document.querySelector('.flatpickr');
        // if(flatpickrRange){
        //     flatpickrRange.flatpickr();
        // }

        const dataDate = $('.flatpickr');
        $.each(dataDate, function(){
            $(this).flatpickr();
        });
    },

    select2All: () => {
        // Default
        let tempOption = [];
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
        const select2multiple = $('.select2-multiple');
        if (select2multiple.length) {
            tempOption = [select2multiple.find('option').toArray().map( o => o.value )];
            tempOption = tempOption[0].filter(function(v){
                return v.length > 0
            });

            select2multiple.each(function () {
                var $this = $(this);
                $this.wrap('<div class="position-relative"></div>').select2({
                    placeholder: 'Pilih',
                    dropdownParent: $this.parent()
                });
                $this.on("select2:unselect", function (e) {
                    let text = e.params.data.text;

                    if(tempOption.indexOf(text) < 0){
                        $("option[value='"+e.params.data.text+"']",this).remove()
                    }
                });
            });
        }
        $(".select2-disabled").prop("disabled", true);
    },

    nextPersonal: (elm, e) => {
        e.preventDefault();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            Wizard.nextWizard(elm)
        }
    },

    prevPersonal: (elm, e) => {
        e.preventDefault();
        Wizard.nextWizard(elm)
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
                    "url": url.base_url(Personel.moduleApi()) + `getDataLogKaryawan`,
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
                            return `<a class="" style="cursor: pointer;" onclick="Personel.showDetailEditProfile(this, event)">${data}</a>`;
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
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="Personel.detailPerubahan(this)"></i>`;
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
        return `api/${Personel.modulePerubahan()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $('input#id').val();
        window.location.href = url.base_url(Personel.modulePerubahan()) + "ubah?id=" + data_id + "&state=karyawan-" + from_id;
    },

    showDetailEditProfile:(elm, e)=>{
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Personel.modulePerubahanApi()) + "showDetailEditProfile",

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

    addJurusan: () => {
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12">
            <p>Tambah Data Jurusan</p>
            <input type="text" id="addjurusan" class="form-control">
        </div>
        <div class="col-12 text-end">
            <button class="btn btn-sm" onclick="message.closeDialog()">Batal</button>
            <button class="btn btn-primary btn-sm" onclick="Personel.addJurusanSubmit()">Tambah</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },
    addJurusanSubmit: () =>{
        let text = $.trim($('input#addjurusan').val());
        let newOpt = new Option(text,text,false,true);
        $('#jurusan').append(newOpt).trigger('change');
        message.closeDialog();
    },

    addPengalaman: () => {
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12">
            <p>Tambah Data Pengalaman</p>
            <input type="text" id="addpengalaman" class="form-control">
        </div>
        <div class="col-12 text-end">
            <button class="btn btn-sm" onclick="message.closeDialog()">Batal</button>
            <button class="btn btn-primary btn-sm" onclick="Personel.addPengalamanSubmit()">Tambah</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },
    addPengalamanSubmit: () =>{
        let text = $.trim($('input#addpengalaman').val());
        let newOpt = new Option(text,text,false,true);
        $('#pengalaman').append(newOpt).trigger('change');
        message.closeDialog();
    },

    addPenguasaan: () => {
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12">
            <p>Tambah Data Penguasaan Komputer</p>
            <input type="text" id="addpenguasaan" class="form-control">
        </div>
        <div class="col-12 text-end">
            <button class="btn btn-sm" onclick="message.closeDialog()">Batal</button>
            <button class="btn btn-primary btn-sm" onclick="Personel.addPenguasaanSubmit()">Tambah</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },
    addPenguasaanSubmit: () =>{
        let text = $.trim($('input#addpenguasaan').val());
        let newOpt = new Option(text,text,false,true);
        $('#penguasaan').append(newOpt).trigger('change');
        message.closeDialog();
    },

    addBahasa: () => {
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12">
            <p>Tambah Data Bahasa Asing</p>
            <input type="text" id="addbahasa" class="form-control">
        </div>
        <div class="col-12 text-end">
            <button class="btn btn-sm" onclick="message.closeDialog()">Batal</button>
            <button class="btn btn-primary btn-sm" onclick="Personel.addBahasaSubmit()">Tambah</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },
    addBahasaSubmit: () =>{
        let text = $.trim($('input#addbahasa').val());
        let newOpt = new Option(text,text,false,true);
        $('#bahasa').append(newOpt).trigger('change');
        message.closeDialog();
    },

    addISO: () => {
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12">
            <p>Tambah Data ISO</p>
            <input type="text" id="addiso" class="form-control">
        </div>
        <div class="col-12 text-end">
            <button class="btn btn-sm" onclick="message.closeDialog()">Batal</button>
            <button class="btn btn-primary btn-sm" onclick="Personel.addISOSubmit()">Tambah</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },
    addISOSubmit: () =>{
        let text = $.trim($('input#addiso').val());
        let newOpt = new Option(text,text,false,true);
        $('#iso').append(newOpt).trigger('change');
        message.closeDialog();
    },

    addSkill: () => {
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12">
            <p>Tambah Data Kemampuan Khusus</p>
            <input type="text" id="addskill" class="form-control">
        </div>
        <div class="col-12 text-end">
            <button class="btn btn-sm" onclick="message.closeDialog()">Batal</button>
            <button class="btn btn-primary btn-sm" onclick="Personel.addSkillSubmit()">Tambah</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });
    },
    addSkillSubmit: () =>{
        let text = $.trim($('input#addskill').val());
        let newOpt = new Option(text,text,false,true);
        $('#skill').append(newOpt).trigger('change');
        message.closeDialog();
    },
    removeWarning: () => {
        $(document).on('change','.required',function(){
            if($(this).val().length > 0){
                $(this).removeClass('is-invalid');
                $(this).next().remove();
            }else{
                $(this).addClass('is-invalid');
                $(this).after('<p style="color:#ff5b5c;" class="data-error">* ' + $(this).attr('error') + ' Harus Diisi</p>');
            }
        })
    },
    editor: () => {
        tinymce.init({
            selector: 'textarea#catatan',
            menubar: false,
            plugins:["lists"],
            toolbar: 'undo redo | blocks | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat',
            setup:function(editor) {
                editor.on('change',function(){
                    tinymce.triggerSave()
                })
            }
          });
    },
    editorV2: () => {
        tinymce.remove('textarea.texteditor');
        // tinymce.EditorManager.execCommand('mceRemoveEditor',true, 'textarea.texteditor');
        tinymce.init({
            selector: 'textarea.texteditor',
            menubar: false,
            plugins:["lists","code"],
            toolbar: 'undo redo | blocks | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat code',
        });
        document.addEventListener('focusin', function (e) {
            if (e.target.closest('.tox-tinymce-aux, .moxman-window, .tam-assetmanager-root') !== null) {
              e.stopImmediatePropagation();
            }
        });
    },
    init:() => {
        $('#req_tinggi').click(function(){
            if($(this).is(':checked')){
                console.log('checked');
                $('#tinggi_min').attr('readonly',false).addClass('required')
                $('#tinggi_max').attr('readonly',false).addClass('required')
            }else{
                $('#tinggi_min').attr('readonly',true).val('').removeClass('required').removeClass('is-invalid')
                $('#tinggi_max').attr('readonly',true).val('').removeClass('required').removeClass('is-invalid')
            }
        })
        $('#req_berat').click(function(){
            if($(this).is(':checked')){
                console.log('checked');
                $('#berat_min').attr('readonly',false).addClass('required')
                $('#berat_max').attr('readonly',false).addClass('required')
            }else{
                $('#berat_min').attr('readonly',true).val('').removeClass('required').removeClass('is-invalid')
                $('#berat_max').attr('readonly',true).val('').removeClass('required').removeClass('is-invalid')
            }
        });

        $.each($('.select2 .required'), function(){
            console.log($(this));
            $(this).closest('.select2-selection .select2-selection--single').css(
                'border-color','#ff5b5c!important'
            )
        })
    },

    alertFormPilihDataPengajuan:(text) => {
        let html = `<div class="row g-3">
            <div class="col-12">
            <hr/>
            </div>
            <div class="col-12 text-center">
                <p>${text}</p>
            </div>
            <div class="col-12 text-center">
                <br/>
                <button class="btn btn-sm btn-info" onclick="message.closeDialog()">Close</button>
            </div>
            </div>`;

            bootbox.dialog({
                message: html
            });
    },

    showDataPosisiJabatan:(elm)=>{
        let params = {};
        params.sifat = $('#sifat').val();
        params.group_organization = $('#group_organization').val();

        if (params.sifat == '' && params.group_organization == '') {
            Personel.alertFormPilihDataPengajuan('Pilih sifat dan group organization terlebih dahulu')
        } else if(params.sifat == ''){
            Personel.alertFormPilihDataPengajuan('Pilih sifat terlebih dahulu')
        } else if(params.group_organization == ''){
            Personel.alertFormPilihDataPengajuan('Pilih group organization terlebih dahulu')
        }
        else{
            $.ajax({
                type: 'POST',
                dataType: 'html',
                data: params,
                url: url.base_url(Personel.moduleApi()) + "showDataPosisiJabatan",

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
                    Personel.getDataPosisiJabatan();
                }
            });
        }
    },

    getDataPosisiJabatan: async () => {
        let tableData = $('table#table-data-job');
        // tableData.DataTable().destroy();
        let params = {};
        params.sifat = $('#sifat').val();
        params.group_organization = $('#group_organization').val();

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
                    "url": url.base_url(Personel.moduleApi()) + `getDataPosisiJabatan`,
                    "data": params,
                    "type": "POST",
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                "columns": [{
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "nama_job",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_job="${row.nama_job}" nama_organisasi="${row.nama_organisasi}" data_id="${data}" onclick="Personel.pilihDataPosisiJabatan(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihDataPosisiJabatan:(elm)=>{
        let id = $(elm).attr('data_id');
        let nama_organisasi = $(elm).attr('nama_organisasi');
        let nama_job = $(elm).attr('nama_job');
        $('#posisi').val(id+" - "+nama_job + " ("+ nama_organisasi +")");
        message.closeDialog();
        // Personel.checkFillablePosisi();
    },

    // checkFillablePosisi:(elm)=>{
    //     if ($('#sifat').val() != '') {
    //         $("#sifat").prop("disabled", true);
    //         $("#group_organization").prop("disabled", true);
    //     }else{
    //         $("#sifat").removeClass("disabled");
    //     }
    // }

    resetPosisi:(elm)=>{
        $("#sifat").on('change', function () {
            $("#posisi").val("");
        });
        $("#group_organization").on('change', function () {
            $("#posisi").val("");
        });
    },

    showModalJob: (elm)=>{
        let params = {};
            $.ajax({
                type: 'POST',
                dataType: 'html',
                url: url.base_url(Personel.moduleApi()) + "showModalJob",

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
                    $('.modal').animate({scrollTop:0}, 500, 'swing');
                    Personel.editorV2();
                    Personel.select2All();
                }
            });
    },

    getPostDataModalJob: () => {
        let data = {
            'id': $('input#id').val(),
            'nama_job': $('input#nama_job').val(),
            'jabatan': $('#jabatanmodal').val(),
            'departemen': $('#departemen').val(),
            'lokasi': $('#lokasi').val(),
            'atasan': $('#atasan').val(),
            // 'job_requirement': $('#job_requirement').find('.texteditor').html()
            'job_requirement': tinymce.get('job_requirement').getContent(),
        };
        return data;
    },

    submitModalJobStruktur: (elm, e) => {
        e.preventDefault();
        let params = Personel.getPostDataModalJob();
        console.log($('#departemen').val());
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            // return params;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Personel.moduleApi()) + "submitModalJobStruktur",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function() {
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function(resp) {
                    console.log(resp);
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


    // JOB STRUKTUR
    
    showDataJobStruktur:()=>{
        let params = {};
        let userdept = $('#userdept').val();
        let sifat = $('#sifat').val();

        if(sifat == ''){
            Toast.error("Informasi","Pilih sifat terlebih dahulu");return;
        }
        
        params.sifat = sifat;
        // console.log(params);return;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Personel.moduleApi()) + "showDataJobStruktur",

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
                Personel.getDataJobStruktur(`${userdept}`,`${sifat}`);
            }
        });
    },

    getDataJobStruktur: async (userdept, sifat) => {
        let tableData = $('table#table-data-job');
        // tableData.DataTable().destroy();

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
                    "url": url.base_url(Personel.moduleApi()) + `getDataJobStruktur?userdept=${userdept}&sifat=${sifat}`,
                    "type": "POST",
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                "columns": [{
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "nama_grup",
                    },
                    {
                        "data": "nama_job",
                    },
                    {
                        "data": "nama_lengkap",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `<button class="btn btn-warning" nama_job="${row.nama_job}" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="Personel.pilihDataJobStruktur(this)">Pilih</button>`;
                        }
                    }
                ]
            });
        }
    },

    pilihDataJobStruktur:(elm)=>{
        let id = $(elm).attr('data_id');
        let nama_job = $(elm).attr('nama_job');
        let nama_lengkap = $(elm).attr('nama_lengkap');
        $('#job_struktur').val(id+" - "+nama_job+" - "+nama_lengkap);

        $('#jabatan-required').hide();
        $('#jabatan').removeClass('required');
        message.closeDialog();
    },

};

$(function () {
    Personel.getData();
    Personel.editor();
    Personel.getDataLogKaryawan();
    Personel.setDate();
    Personel.select2All();
    Personel.init();
    Personel.resetPosisi();
    // Personel.removeWarning();

    $("#userdept").change(function(){
        $("#job_struktur").val("");
        $('#jabatan-required').show();
        $('#jabatan').addClass('required');
    })
});
