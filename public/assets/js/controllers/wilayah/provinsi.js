let Provinsi = {
    module: () => {
        return "wilayah/provinsi";
    },

    moduleApi: () => {
        return `api/${Provinsi.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(Provinsi.module()) + "add";
    },

    back: () => {
        window.location.href = url.base_url(Provinsi.module()) + "index";
    },

    getData: async () => {
        let tableData = $('table#table-wilayah-provinsi');

        if (tableData.length > 0) {
            let db = Database.init();
            db.get('token').then(function (doc) {
                let tokenApi = doc.title;
                return tableData.DataTable({
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
                        "url": url.base_url(Provinsi.moduleApi()) + `getData`,
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
                    "columns": [
                        {
                            "data": "id",
                            render: function (data, type, row, meta) {
                                return meta.row + meta.settings._iDisplayStart + 1;
                            }
                        },
                        {
                            "data": "nama_provinsi",
                        },                        
                        {
                            "data": "id",
                            "render": (data, type, row, meta) => {
                                return `<a class='' data_id="${data}" href='${url.base_url(Provinsi.module())}ubah/${data}' onclick="Provinsi.ubah(this, event)"><img src="${url.base_url('assets/images')}Form.svg"></a>
                                <a class='' data_id="${data}" href='' onclick="Provinsi.delete(this, event)"><img src="${url.base_url('assets/images')}DeleteOutlined.svg"></a>`;
                            }
                        }
                    ]
                });
            });
        }
    },

    delete:(elm, e)=>{
        e.preventDefault();
        let data_id = $(elm).attr('data_id');
        let html = `<div class="row">
        <div class="col-md-12">
            <p>Apakah anda yakin akan menghapus data ini ?</p>
        </div>
        <div class="col-md-12 text-center">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="Provinsi.deleteConfirm(this, '${data_id}')">Ya</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Tidak</button>
        </div>
        </div>`;

        bootbox.dialog({
            message : html
        });
    },

    deleteConfirm:(elm, id)=>{
        let params = {};
        params.id = id;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Provinsi.moduleApi()) + "delete",

            beforeSend:()=>{
                message.loadingProses('Proses Hapus Data');
            },

            error: function () {
                message.closeLoading();
                toastr.error("Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if(resp.is_valid){
                    toastr.success('Data Berhasil Dihapus');
                    setTimeout(function(){
                        window.location.reload();
                    }, 1000);
                }else{
                    toastr.error('Data Gagal Dihapus ', resp.message);
                }
            }
        });
    },

    getPostData: () => {
        let data = {
            'user_login': $.trim($('#user_login').text()),            
            'id': $('input#id').val(),
            'nama_provinsi': $('input#nama_provinsi').val(),
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Provinsi.getPostData();

        if (validation.run()) {
            let db = Database.init();
            db.get('token').then(function (doc) {
                params.tokenApi = doc.title;
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    data: params,
                    url: url.base_url(Provinsi.moduleApi()) + "submit",
                    beforeSend: () => {
                        message.loadingProses('Proses Simpan Data...');
                    },
                    error: function () {
                        message.closeLoading();
                        toastr.error("Gagal");
                    },

                    success: function (resp) {
                        message.closeLoading();
                        if (resp.is_valid) {
                            toastr.success('Data Berhasil Disimpan');
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
            });
        }
    },
};

$(function(){
    Provinsi.getData();
});