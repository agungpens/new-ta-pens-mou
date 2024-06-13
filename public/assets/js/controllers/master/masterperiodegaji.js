let MasterPeriodeGaji = {
    module: () => {
        return "master/masterperiodegaji";
    },

    moduleApi: () => {
        return `api/${MasterPeriodeGaji.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(MasterPeriodeGaji.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(MasterPeriodeGaji.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(MasterPeriodeGaji.module()) + "index";
    },

    getData: async () => {
        let tableData = $('table#table-data-periodegaji');
        // console.log('tableData', tableData);
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
                    "url": url.base_url(MasterPeriodeGaji.moduleApi()) + `getData`,
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
                        "targets": [1,2,3],
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('action');
                        }
                    },
                    {
                        "targets": 4,
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
                        "data": "kode_periode_gaji",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "kode_periode_gaji",
                    },
                    {
                        "data": "periode_awal",
                    },
                    {
                        "data": "periode_akhir",
                    },
                    // {
                    //     "data": "non_shift",
                    //     "render": (data, type, row, meta) => {
                    //         console.log('data', data);
                    //         if(data == "1"){
                    //             return "Non shift";
                    //         }else{
                    //             return "Shift";
                    //         }
                    //     }
                    // },
                    {
                        "data": "kode_periode_gaji",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            if(updateAction == 1){
                                htmlAction += `<i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="MasterPeriodeGaji.ubah(this)"></i>`;
                            }

                            if(deleteAction == 1){
                                htmlAction += `<i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="MasterPeriodeGaji.delete(this, event)"></i>`;
                            }
                            return htmlAction;
                        }
                    }
                ]
            });
        }
    },

    getPostData: () => {
        let data = {
            'data': {
                'id': $('input#id').val(),
                'kode': $.trim($('#kode').val()),
                'periode_awal': $.trim($('#periode_awal').val()),
                'periode_akhir' : $.trim($("#periode_akhir").val()),
                'status': $.trim($('#status').val()),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = MasterPeriodeGaji.getPostData();
        let form = $(elm).closest('div.row');
        if(validation.runWithElement(form)){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(MasterPeriodeGaji.moduleApi()) + "submit",
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
            <button class="btn btn-primary btn-sm" onclick="MasterPeriodeGaji.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(MasterPeriodeGaji.moduleApi()) + "delete",

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

    setDate: () => {
        let dataDate = $('.data-date');
        $.each(dataDate, function(){
            $(this).flatpickr();
        });
    },

    clearForm :() =>{
        $("#periode_awal").val("")
        $("#periode_akhir").val("")
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
}


$(function(){
    MasterPeriodeGaji.getData()
    MasterPeriodeGaji.setDate()
    MasterPeriodeGaji.select2All()
})