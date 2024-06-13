let AreaKerja = {
    module: () => {
        return "master/areakerja";
    },

    moduleApi: () => {
        return `api/${AreaKerja.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(AreaKerja.module()) + "add";
    },

    back: () => {
        window.location.href = url.base_url(AreaKerja.module()) + "index";
    },

    getData: async () => {
        let tableData = $('table#table-data-areakerja');
        console.log('tableData', tableData);
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
                    "url": url.base_url(AreaKerja.moduleApi()) + `getData`,
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
                        "targets": 0,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
                            $(td).addClass('text-left');
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
                        "data": "area_kerja",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            if(updateAction == 1){
                                htmlAction += `<i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="AreaKerja.ubah(this)"></i>`;
                            }

                            if(deleteAction == 1){
                                htmlAction += `<i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="AreaKerja.delete(this, event)"></i>`;
                            }
                            return htmlAction;
                        }
                    }
                ]
            });
        }
    },

    ubah:(elm,e) => {
        const id = $(elm).attr('data_id');
        let params = {}
        params.id_areakerja = id
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(AreaKerja.moduleApi()) + "getDetail",

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
                $('.bootbox-close-button').addClass('btn-close').text("");
            }
        });
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
            <button class="btn btn-primary btn-sm" onclick="AreaKerja.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(AreaKerja.moduleApi()) + "deletedata",

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
                message.closeDialog();
            }
        });
    },

    getPostData: () => {
        let data = {
            'data': {
                'id': $('#id_areakerja').val(),
                'area_kerja': $.trim($('#area_kerja').val()),
                'remarks': $.trim($('#remark').val()),
            },
        };
        return data;
    },
    
    submit:(elm,e) => {
        e.preventDefault();
        let form = $(elm).closest('div.row');
        // const id_areakerja = $("#id_areakerja").val();
        // const nama_arekerja = $("#area_kerja").val();
        // const remarks = $("#remark").val()
        let params = AreaKerja.getPostData();

        if(validation.runWithElement(form)){
            // let params = {}
            // params.id = id_areakerja
            // params.area_kerja = nama_arekerja
            // params.remarks = remarks
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(AreaKerja.moduleApi()) + "submit",
    
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data');
                },
    
                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi","Gagal");
                },
    
                success: function (resp) {
                    message.closeLoading();
                    if(resp.is_valid){
                        
                        Toast.success('Informasi','Data Berhasil Disimpan');
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    }else{
                        Toast.error('Informasi', resp.message);
                    }
                    message.closeDialog();
                }
            });
        }
    },
}

$(function(){
    AreaKerja.getData();
})