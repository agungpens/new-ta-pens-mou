let PertanyaanInterview = {
    module: () => {
        return "master/pertanyaan-interview";
    },

    moduleApi: () => {
        return `api/${PertanyaanInterview.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(PertanyaanInterview.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(PertanyaanInterview.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(PertanyaanInterview.module()) + "index";
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
                    "url": url.base_url(PertanyaanInterview.moduleApi()) + `getData`,
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
                        "data": "pertanyaan",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            if(updateAction == '1'){
                                htmlAction += `<i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="PertanyaanInterview.ubah(this)"></i>`;
                            }

                            if(deleteAction == '1'){
                                htmlAction += `<i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="PertanyaanInterview.delete(this, event)"></i>`;
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
            <button class="btn btn-primary btn-sm" onclick="PertanyaanInterview.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(PertanyaanInterview.moduleApi()) + "delete",

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
                'departemen': $.trim($('#departemen').val()),
                'nama' : $.trim($("#nama").val()),
                // 'minim_waktu': $.trim($('#minim-waktu').val()),
                'minim_nilai': $.trim($('#minim-nilai').val()),
                // 'start_date': $.trim($('#mulai-ujian').val()),
                // 'end_date': $.trim($('#selesai-ujian').val()),
                // 'kode_departemen': $.trim($('#kode-departemen').val()),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = PertanyaanInterview.getPostData();
        let form = $(elm).closest('div.row');
        if(validation.runWithElement(form)){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(PertanyaanInterview.moduleApi()) + "submit",
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
                            window.location.href = url.base_url(PertanyaanInterview.module()) + "index";
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
        const flatpickrRange = $('.flatpickr');
        $.each(flatpickrRange, function(){
            $(this).flatpickr({
                enableTime: true,
                dateFormat: "Y-m-d H:i",
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
                    placeholder: 'Select value',
                    dropdownParent: $this.parent()
                });
            });
        }
    },

    OnlyNumber :(input_id) =>{
        if (typeof input_id === 'string'){
            Toast.error('Informasi',"Harus Angka");
            let input_text = $("#"+input_id).val();
            if(input_text == "-"){
                $("#"+input_id).val(input_text);
            }else{
                if(isNaN(input_text)){ // if not number
                    let isMinus = "";
                    if(input_text.indexOf("-") == "0"){
                        isMinus = "-";
                    }
                    let gen = isMinus+""+input_text.replace(/[^0-9.]/g, "");

                    $("#"+input_id).val(gen);
                }
            }

            let price_format1 = ($("#"+input_id).val());
            $("#"+input_id).val(price_format1);
        }else{
            Toast.error('Informasi',"Harus Angka");
            let input_text = input_id.val();
            if(input_text == "-"){
                input_id.val(input_text);
            }else{
                if(isNaN(input_text)){ // if not number
                    let isMinus = "";
                    if(input_text.indexOf("-") == "0"){
                        isMinus = "-";
                    }
                    let gen = isMinus+""+input_text.replace(/[^0-9.]/g, "");

                    input_id.val(gen);
                }
            }

            let price_format1 = price_format(input_id.val());
            input_id.val(price_format1);
        }
    },
};

$(function () {
    PertanyaanInterview.getData();
    PertanyaanInterview.setDate();
    PertanyaanInterview.select2All();
});
