let org_chart;

let Struktur = {
    module: () => {
        return "organisasi/struktur";
    },

    moduleApi: () => {
        return `api/${Struktur.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(Struktur.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Struktur.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(Struktur.module()) + "index";
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
                    "url": url.base_url(Struktur.moduleApi()) + `getData`,
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
                        "data": "nama",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            if(updateAction == '1'){
                                htmlAction += `<i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="Struktur.ubah(this)"></i>`;
                            }

                            if(deleteAction == '1'){
                                htmlAction += `<i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="Struktur.delete(this, event)"></i>`;
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
            <button class="btn btn-primary btn-sm" onclick="Struktur.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(Struktur.moduleApi()) + "delete",

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
            'data': {
                'id': $('input#id').val(),
                'nama': $.trim($('#nama').val()),
            },
            'data_item': Struktur.getPostInputItemStruktur()
        };
        return data;
    },

    getPostInputItemStruktur:()=>{
        let dataNode = $('div.node');
        let data = [];
        $.each(dataNode, function () {
            let params = {};
            params.nik = $(this).find('h2').attr('nik');
            params.nama_lengkap = $(this).find('h2').text().trim();
            params.node_id = $(this).find('h2').attr('node-id');
            params.parent_id = $(this).find('h2').attr('parent_id');
            data.push(params);
        });

        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Struktur.getPostData();

        // console.log(params);return;
        let form = $(elm).closest('div.row');
        if(validation.runWithElement(form)){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Struktur.moduleApi()) + "submit",
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

    getDataKaryawan: async (node_id) => {
        let tableData = $('table#table-data-karyawan');

        let params = {};
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
                    "url": url.base_url(Struktur.moduleKaryawanApi()) + `getData`,
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
                            return `
                            <i class="bx bx-edit"  node_id="${node_id}" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="Struktur.pilihDataKaryawan(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    getDataJob: async (node_id) => {
        let tableData = $('table#table-data-job');

        let params = {};
        
        params.departemen = $('#nama').val();

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
                    "url": url.base_url(Struktur.moduleApi()) + `getDataJobStrukturKaryawan`,
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
                    {
                        "targets": 2,
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
                        "data": "nama_job",
                    },
                    {
                        "data": "nama_lengkap",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `
                            <button class="btn btn-warning" node_id="${node_id}"
                            nama_lengkap="${row.nama_lengkap}" nama_job="${row.nama_job}"
                            data_id="${data}" onclick="Struktur.pilihDataKaryawan(this)">Pilih</button>`;
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
        return `api/${Struktur.modulePerubahan()}`;
    },

    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleKaryawanApi: () => {
        return `api/${Struktur.moduleKaryawan()}`;
    },

    moduleJobStruktur: () => {
        return "master/jobstruktur";
    },

    moduleJobstrukturApi: () => {
        return `api/${Struktur.moduleJobStruktur()}`;
    },

    detailPerubahan: (elm) => {
        let data_id = $(elm).attr("data_id");
        let from_id = $('input#id').val();
        window.location.href = url.base_url(Struktur.modulePerubahan()) + "ubah?id=" + data_id + "&state=karyawan-" + from_id;
    },

    showDetailEditProfile:(elm, e)=>{
        e.preventDefault();
        let params = {};
        params.no_pengajuan = $(elm).text().trim();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Struktur.modulePerubahanApi()) + "showDetailEditProfile",

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

    setDataStruktur:(data)=>{
        let initData = [];
        let elmid = [];
        if(data.length > 0){
            for(let i = 0; i < data.length; i++){
                let result = data[i];
                let params = {};
                params.id = result.code;
                params.parent = result.parent;
                // params.name = result.parent == 0 ? result.judul_group : result.nama_lengkap;
                // params.name = result.parent == 0 ? result.judul_group : result.nama_job == null ? result.nama_lengkap : result.nama_job;
                if (result.nama_job!=null && result.nama_lengkap!=null) {
                    params.name = `${result.nama_job} - ${result.nama_lengkap}`
                }else if(result.nama_job!=null){
                    params.name = `${result.nama_job} - Posisi Belum Terisi`
                }else{
                    params.name = "Pilih"
                }

                if(result.status_job != 'APPROVED'){
                    let elm = `[node-id=${result.code}]`;
                    elmid.push(elm);
                }
                // params.nama_job = result.nama_job;
                initData.push(params);
                
            }
        }else{
            initData.push({id: 1, name: 'Nama Organisasi', parent: 0});
        }
        
        // console.log('initData', initData);

        if($('#struktur-item').length > 0){
            // console.log(initData);
            org_chart = $('#struktur-item').orgChart({
                data: initData,
                showControls: true,
                allowEdit: false,
                onAddNode: function(node){
                    console.log(node.data);
                    org_chart.newNode(node.data.id);
                },
                onDeleteNode: function(node){
                    org_chart.deleteNode(node.data.id);
                    // Struktur.removeNode(node.data);
                },
                onClickNode: function(node){
                    console.log('Clicked node '+node.data);
                }
            });

            Struktur.setRenderDataStruktur(data);
        }

        console.log(`${elmid.join(',')}`);
        
        $(`${elmid.join(',')}`).find('h2').after('<span class="text-warning">WAITING APPROVE</span>');
        $(`${elmid.join(',')}`).find('.org-add-button').remove();
        $(`${elmid.join(',')}`).find('.org-del-button').remove();
    },

    getDataOrgItem:()=>{
        let params = Struktur.getUrlParams();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Struktur.moduleApi()) + "getDataOrgItem",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                $('#data-item').val(JSON.stringify(resp.data));
                Struktur.setDataStruktur(resp.data);
            }
        });
    },

    showDataKaryawan:(elm)=>{
        let node_id = $(elm).attr('node-id');
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            // url: url.base_url(Struktur.moduleApi()) + "showFormDataKaryawan",
            url: url.base_url(Struktur.moduleApi()) + "showFormDataJobStruktur",

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

                // Struktur.getDataKaryawan(node_id);
                Struktur.getDataJob(node_id);
            }
        });
    },

    setTitleOrg:(elm, e)=>{
        let val = $(elm).val();
        // if($('h2.title-node').length > 0){
        //     $('h2.title-node:eq(0)').text(val);
        //     let params = {};
        //     params.id = 1;
        //     params.parent = 0;
        //     params.name = val;
        //     org_chart.commitData(1, params);
        // }
    },

    addNode:(id, parent)=>{
        let data = JSON.parse($('#data-item').val());
        let params = {};
        params.id = id;
        params.parent = parent;
        params.name = 'Pilih Karyawan';
        org_chart.commitData(id, params);

        // params.id = id;
        // params.parent = parent;
        // params.nama_lengkap = '';
        // params.nik = '';
        // params.judul_group = data[0].judul_group;
        // data.push(params);
        // $('#data-item').val(JSON.stringify(data));
        // Struktur.setDataStruktur(data);
    },

    pilihDataKaryawan:(elm)=>{
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nama_job = $(elm).attr('nama_job');
        let nik = $(elm).attr('data_id');
        let node_id = $(elm).attr('node_id');
        let parentId = $(`div[node-id='${node_id}'] h2`).attr('parent_id');
        message.closeDialog();
        let params = {};
        params.id = node_id;
        params.parent = parentId;
        params.name = nama_lengkap;
        params.nama_job = nama_job;
        org_chart.commitData(node_id, params);
        let divNode = $(`div[node-id='${node_id}'] h2`);
        divNode.html(`${nama_job} - ${params.name}`);
        divNode.attr('nik', nik);
    },

    setRenderDataStruktur:(data)=>{
        let nodeDiv = $('div.node');
        $.each(nodeDiv, function(){
            let node_id = $(this).attr('node-id');
            if(data.length > 0){
                for(let i = 0; i < data.length; i++){
                    let result = data[i];
                    if(result.code == node_id){
                        $(this).find('h2').attr('nik', result.nik);
                    }
                }
            }
        });
    },

    getUrlParams: () => {
        let url = window.location.href;
        var params = {};
        (url + '?').split('?')[1].split('&').forEach(function (pair) {
            pair = (pair + '=').split('=').map(decodeURIComponent);
            if (pair[0].length) {
                params[pair[0]] = pair[1];
            }
        });

        return params;
    },

    newJob:(elm)=>{
        let node_id = $(elm).attr('node-id');
        let params = {};
        params.departement = $('#nama').val();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            // url: url.base_url(Struktur.moduleApi()) + "showFormDataKaryawan",
            url: url.base_url(Struktur.moduleApi()) + "showNewJob",

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
                Struktur.editor();
                Struktur.select2All();
            }
        });
    },

    getPostDataNewJob: () => {
        let data = {
            'data': {
                // 'id': $('input#id').val(),
                'nama_job': $.trim($('#nama_job').val()),
                'departemen': $.trim($('#departemen').val()),
                'jabatan': $.trim($('#jabatan').val()),
                'lokasi': $.trim($('#lokasi').val()),
                'job_purpose': $('#job-purpose').find('.ql-editor').html(),
                'job_requirement': $('#job-requirement').find('.ql-editor').html(),
                // 'job_evaluation': $('#job-evaluation').find('.ql-editor').html(),
                'main_responsible': $('#main-responsible').find('.ql-editor').html(),
                'struktur' : Struktur.getPostData()
            },
            
        };
        return data;
    },

    newJobSubmit: (elm, e) => {
        e.preventDefault();
        let params = Struktur.getPostDataNewJob();
        // console.log(params);return;
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Struktur.moduleApi()) + "newJobSubmit",
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
                            window.location.href = url.base_url(Struktur.module()) + "ubah?id=" + resp.id
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

    editor: () => {
        const fullToolbar = [
            [{
                    font: []
                },
                {
                    size: []
                }
            ],
            ['bold', 'italic', 'underline', 'strike'],
            [{
                    color: []
                },
                {
                    background: []
                }
            ],
            [{
                    script: 'super'
                },
                {
                    script: 'sub'
                }
            ],
            [{
                    header: '1'
                },
                {
                    header: '2'
                },
                'blockquote',
                'code-block'
            ],
            [{
                    list: 'ordered'
                },
                {
                    list: 'bullet'
                },
                {
                    indent: '-1'
                },
                {
                    indent: '+1'
                }
            ],
            [
                'direction',
                {
                    align: []
                }
            ],
            // ['link', 'image', 'video', 'formula'],
            ['clean']
        ];

        if ($('#job-purpose').length > 0) {
            jobPuposeEditor = new Quill('#job-purpose', {
                bounds: '#full-editor',
                placeholder: 'Type Something...',
                modules: {
                    formula: true,
                    toolbar: fullToolbar
                },
                theme: 'snow'
            });
        }

        if ($('#job-requirement').length > 0) {
            jobPuposeEditor = new Quill('#job-requirement', {
                bounds: '#full-editor',
                placeholder: 'Type Something...',
                modules: {
                    formula: true,
                    toolbar: fullToolbar
                },
                theme: 'snow'
            });
        }

        if ($('#job-evaluation').length > 0) {
            jobPuposeEditor = new Quill('#job-evaluation', {
                bounds: '#full-editor',
                placeholder: 'Type Something...',
                modules: {
                    formula: true,
                    toolbar: fullToolbar
                },
                theme: 'snow'
            });
        }

        if ($('#main-responsible').length > 0) {
            jobPuposeEditor = new Quill('#main-responsible', {
                bounds: '#full-editor',
                placeholder: 'Type Something...',
                modules: {
                    formula: true,
                    toolbar: fullToolbar
                },
                theme: 'snow'
            });
        }
    },
};

$(function () {
    Struktur.getData();
    Struktur.getDataKaryawan();
    Struktur.setDate();
    Struktur.select2All();
    Struktur.getDataOrgItem();
});
