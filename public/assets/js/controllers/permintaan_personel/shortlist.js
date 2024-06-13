var tableShortlist ;

let Shortlist = {
    module: () => {
        return "karyawan/shortlist";
    },

    moduleApi: () => {
        return `api/${Shortlist.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(Shortlist.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Shortlist.module()) + "ubah?id=" + data_id;
    },

    approve: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Shortlist.module()) + "approve?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(Shortlist.module()) + "index";
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
                    "url": url.base_url(Shortlist.moduleApi()) + `getData`,
                    "type": "POST",
                    // "headers": {
                    //     'X-CSRF-TOKEN': `'${tokenApi}'`
                    // }
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                "columnDefs": [{
                    "targets": [2,3,4,5],
                    "orderable": false,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).addClass('text-center');
                        $(td).addClass('td-padd');
                        $(td).addClass('action');
                    }
                },
                {
                    "targets": [1],
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
                        "data": "posisi",
                    },
                    {
                        "data": "nama_departemen",
                    },
                    {
                        "data": "pelamar",
                    },
                    {
                        "data": "lolos",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            // if (approveAction == '1') {
                            // }
                            htmlAction += `<i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="Shortlist.ubah(this)"></i>`;
                            // htmlAction += `<i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="Shortlist.delete(this, event)"></i>`;

                            return htmlAction;
                        }
                    }
                ]
            });
        }
    },

    filter: () => {
        if($('#urut1').val().length==0){
            $('#urut1dir').val('').trigger('change');
        }
        if($('#urut2').val().length==0){
            $('#urut2dir').val('').trigger('change');
        }
        if($('#urut3').val().length==0){
            $('#urut3dir').val('').trigger('change');
        }

        if($('#urut1').val().length>0 && $('#urut1dir').val().length == 0){
            $('#urut1dir').val('asc').trigger('change');
        }
        if($('#urut2').val().length>0 && $('#urut2dir').val().length == 0){
            $('#urut2dir').val('asc').trigger('change');
        }
        if($('#urut3').val().length>0 && $('#urut3dir').val().length == 0){
            $('#urut3dir').val('asc').trigger('change');
        }

        // let urut1 = ($('#urut1').val().length>0)?$('#urut1').val():null;
        // let urut2 = ($('#urut2').val().length>0)?$('#urut2').val():null;
        // let urut3 = ($('#urut3').val().length>0)?$('#urut3').val():null;
        // let urut1dir = ($('#urut1').val().length>0)?$('#urut1dir').val():null;
        // let urut2dir = ($('#urut2').val().length>0)?$('#urut2dir').val():null;
        // let urut3dir = ($('#urut3').val().length>0)?$('#urut3dir').val():null;
        // $('table#table-shortlist').DataTable().destroy();
        // Shortlist.getDataShortlist(urut1,urut2,urut3,urut1dir,urut2dir,urut3dir)
        $('#table-shortlist').DataTable().ajax.reload();
    },

    getDataShortlist: async (urut1,urut2,urut3,urut1dir,urut2dir,urut3dir) => {
        console.log(urut1,urut2,urut3,urut1dir,urut2dir,urut3dir);
        // tableShortlist = $('table#table-shortlist');
        console.log('#id',$('#id').val());

        // if (tableShortlist.length > 0) {
            tableShortlist = $('#table-shortlist').DataTable({
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
                    "url": url.base_url(Shortlist.moduleApi()) + `showDetails`,
                    "type": "POST",
                    "data":function(d){
                        d.id = $('#id').val();
                        d.urut1 = $('#urut1').val() ?? null;
                        d.urut2 = $('#urut2').val() ?? null;
                        d.urut3 = $('#urut3').val() ?? null;
                        d.urut1dir = $('#urut1dir').val()?? null;
                        d.urut2dir = $('#urut2dir').val()?? null;
                        d.urut3dir = $('#urut3dir').val()?? null;
                    }
                    // {
                    //     id:$('#id').val(),
                    //     // urut1:$('#urut1').val() ?? null,
                    //     urut1:'jk',
                    //     urut2:$('#urut2').val() ?? null,
                    //     urut3:$('#urut3').val() ?? null,
                    //     urut1dir:'asc',
                    //     // urut1dir:$('#urut1dir').val()?? null,
                    //     urut2dir:$('#urut2dir').val()?? null,
                    //     urut3dir:$('#urut3dir').val()?? null,
                    // }
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
                        "targets": [5],
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                            $(td).addClass('td-padd');
                            $(td).addClass('action');
                        }
                    },
                    {
                        "targets": [2,3,4],
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                            $(td).addClass('td-padd');
                        }
                    },
                    {
                        "targets": [1],
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
                        "data": "nama",
                    },
                    {
                        "data": "jk",
                    },
                    {
                        "data": "umur",
                    },
                    {
                        "data": "nama_pendidikan",
                    },
                    {
                        "data": "urut",
                        "render": (data, type, row, meta) => {
                            console.log(row);
                            // let checked = '';
                            // if(row.status == 1){
                            //     checked='checked'
                            // }
                            let htmlAction = `<div class="form-check text-center">
                            <input class="form-check-input actioncheckbox" style="float:none" type="checkbox" value="${row.urut}" ${(row.status)?'checked':''}>
                            </div>
                            `;

                            return htmlAction;
                        }
                    }
                ]
            });
        // }
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
            <button class="btn btn-danger btn-sm" onclick="Shortlist.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(Shortlist.moduleApi()) + "delete",

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
                        message: "File Harus Berupa Gambar Bertipe PDF"
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
        let params = [];
        let step = $('.actioncheckbox');
        $.each(step, function (i,v) {
            let $this = $(this);
            let tmp = {};
            let check = $this[0].checked;
            // console.log($this[0].checked);
            if(check){
                tmp = $this.val();
                params.push(tmp);
            }
        });
        let data = {
            'id' : params,
            'lowongan' : $('#id').val()
        }
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Shortlist.getPostData();
        console.log(params);
        // return params;
        // let form = $(elm).closest('div.row');
        // if (validation.runWithElement(form)) {
            // return params;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: Shortlist.getPostData(),
                url: url.base_url(Shortlist.moduleApi()) + "submit",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function () {
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    console.log(resp);
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Data Berhasil Disimpan');
                        setTimeout(function () {
                            window.location.href = url.base_url(Shortlist.module()) + "index";
                        }, 1000);
                    } else {
                        bootbox.dialog({
                            message: resp.message
                        });
                    }
                }
            });
        // }
    },

    setDate: () => {
        // const flatpickrRange = document.querySelector('.flatpickr');
        // if(flatpickrRange){
        //     flatpickrRange.flatpickr();
        // }

        const dataDate = $('.flatpickr');
        $.each(dataDate, function () {
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
                    dropdownParent: $this.parent(),
                    minimumResultsForSearch: -1
                });
            });
        }

        $('#urut1').on('select2:select',function(){
            console.log($(this).val());
            $('#urut2').empty().trigger("change");
            $('#urut3').empty().trigger("change");
            var opt20 = new Option('', '', false, false);
            var opt21 = new Option('Jenis Kelamin', 'jk', false, false);
            var opt22 = new Option('Umur', 'umur', false, false);
            var opt23 = new Option('Pendidikan', 'pendidikan', false, false);
            var opt30 = new Option('', '', false, false);
            var opt31 = new Option('Jenis Kelamin', 'jk', false, false);
            var opt32 = new Option('Umur', 'umur', false, false);
            var opt33 = new Option('Pendidikan', 'pendidikan', false, false);
            $('#urut2').append(opt20).append(opt21).append(opt22).append(opt23).trigger('change');
            $('#urut3').append(opt30).append(opt31).append(opt32).append(opt33).trigger('change');
            $('#urut2 option[value="' + $(this).val() + '"]').detach();
            $('#urut3 option[value="' + $(this).val() + '"]').detach();
        })

        $('#urut2').on('select2:select',function(){
            console.log($(this).val());
            $('#urut3').empty().trigger("change");
            var opt30 = new Option('', '', false, false);
            var opt31 = new Option('Jenis Kelamin', 'jk', false, false);
            var opt32 = new Option('Umur', 'umur', false, false);
            var opt33 = new Option('Pendidikan', 'pendidikan', false, false);
            $('#urut3').append(opt30).append(opt31).append(opt32).append(opt33).trigger('change');
            $('#urut3 option[value="' + $('#urut1').val() + '"]').detach();
            $('#urut3 option[value="' + $(this).val() + '"]').detach();
        })

    },
    reset:() => {
        $('#urut1').empty().trigger("change");
        $('#urut2').empty().trigger("change");
        $('#urut3').empty().trigger("change");

        var opt10 = new Option('', '', false, false);
        var opt11 = new Option('Jenis Kelamin', 'jk', false, false);
        var opt12 = new Option('Umur', 'umur', false, false);
        var opt13 = new Option('Pendidikan', 'pendidikan', false, false);
        var opt20 = new Option('', '', false, false);
        var opt21 = new Option('Jenis Kelamin', 'jk', false, false);
        var opt22 = new Option('Umur', 'umur', false, false);
        var opt23 = new Option('Pendidikan', 'pendidikan', false, false);
        var opt30 = new Option('', '', false, false);
        var opt31 = new Option('Jenis Kelamin', 'jk', false, false);
        var opt32 = new Option('Umur', 'umur', false, false);
        var opt33 = new Option('Pendidikan', 'pendidikan', false, false);
        $('#urut1').append(opt10).append(opt11).append(opt12).append(opt13).trigger('change');
        $('#urut2').append(opt20).append(opt21).append(opt22).append(opt23).trigger('change');
        $('#urut3').append(opt30).append(opt31).append(opt32).append(opt33).trigger('change');
        $('#urut1dir').val('').trigger('change');
        $('#urut2dir').val('').trigger('change');
        $('#urut3dir').val('').trigger('change');
        // $('table#table-shortlist').DataTable().destroy();
        // Shortlist.getDataShortlist(null,null,null,null,null,null)
        $('#table-shortlist').DataTable().ajax.reload();
    },

    nextPersonal: (elm, e) => {
        e.preventDefault();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            Wizard.nextWizard(elm)
        }
    },

    removeWarning: () => {
        $(document).on('change', '.required', function () {
            if ($(this).val().length > 0) {
                $(this).removeClass('is-invalid');
                $(this).next().remove();
            } else {
                $(this).addClass('is-invalid');
                $(this).after('<p style="color:#ff5b5c;" class="data-error">* ' + $(this).attr('error') + ' Harus Diisi</p>');
            }
        })
    },


};

$(function () {
    Shortlist.getData();
    Shortlist.getDataShortlist();
    // Shortlist.editor();
    // Shortlist.getStepRekrutmenData();
    // Shortlist.getDataLogKaryawan();
    Shortlist.setDate();
    Shortlist.select2All();
    // Shortlist.removeWarning();
});
