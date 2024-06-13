let MasterPurchasingPic = {
    module: () => {
        return "new_purchasing/master-purchasing-pic";
    },

    moduleApi: () => {
        return `api/${MasterPurchasingPic.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(MasterPurchasingPic.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(MasterPurchasingPic.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(MasterPurchasingPic.module()) + "index";
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
                    "url": url.base_url(MasterPurchasingPic.moduleApi()) + `getData`,
                    "type": "POST",
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [
                    {
                        "targets": [1,2,3,4],
                        "orderable": false,
                    },
                    {
                        "targets": 5,
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
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "type",
                    },
                    {
                        "data": "departemen_nama",
                    },
                    {
                        "data": "myerp_contact_dari_nama",
                    },
                    {
                        "data": "myerp_contact_ke_nama",
                    },
                    {
                        "data": "verifikator_nama",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            if(updateAction == '1'){
                                htmlAction += `<button class="btn btn-warning" data_id="${row.id}" onclick="MasterPurchasingPic.ubah(this)"><i class="bx bx-edit"></i></button>`;
                            }

                            if(deleteAction == '1'){
                                htmlAction += `<button class="btn btn-danger mx-2" data_id="${row.id}" onclick="MasterPurchasingPic.delete(this, event)"><i class="bx bx-trash"></i></button>`;
                            }
                            return htmlAction;
                        }
                    }
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
            <button class="btn btn-primary btn-sm" onclick="MasterPurchasingPic.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(MasterPurchasingPic.moduleApi()) + "delete",

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

    getPostData: () => {
        let data = {
            'data': {
                'id': $('input#id').val(),
                'type': $.trim($('#type').val()),
                'departemen': $.trim($('#departemen').val()),
                'dimintaoleh': $.trim($('#dimintaoleh').val()),
                'ditujukanke': $.trim($('#ditujukanke').val()),
                'verifikator': $.trim($('#verifikator').val())
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = MasterPurchasingPic.getPostData();
        // console.log(params);return;
        let form = $(elm).closest('div.row');
        if(validation.runWithElement(form)){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(MasterPurchasingPic.moduleApi()) + "submit",
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

        MasterPurchasingPic.setSelectContact();
    },

    setSelectContact: () => {
        if($('#dimintaoleh').length > 0){
            let url_item = url.base_url(MasterPurchasingPic.moduleApi()) + "getContactErp";
            $('#dimintaoleh').select2({
                allowClear: true,
                placeholder: 'Ketik nama kontak',
                // dropdownParent: $('#dimintaoleh'),
                ajax: {
                    dataType: 'json',
                    url: url_item,
                    delay: 400,
                    method: 'POST',
                    data: function (params) {
                        return {
                            search: params.term
                        }
                    },
                    processResults: function (data, page) {
                        return {
                            results: data
                        };
                    },
                }
            }).on('select2:select', function (evt) {
                console.log(evt.params.data)
                // {id: '1106RM-0004', text: 'MERICA PUTIH BENIR III (DEBU) - KG', selected: true}
            });
        }
        
        if($('#ditujukanke').length > 0){
            let url_item = url.base_url(MasterPurchasingPic.moduleApi()) + "getContactErp";
            $('#ditujukanke').select2({
                allowClear: true,
                placeholder: 'Ketik nama kontak',
                // dropdownParent: $('#dimintaoleh'),
                ajax: {
                    dataType: 'json',
                    url: url_item,
                    delay: 400,
                    method: 'POST',
                    data: function (params) {
                        return {
                            search: params.term
                        }
                    },
                    processResults: function (data, page) {
                        return {
                            results: data
                        };
                    },
                }
            }).on('select2:select', function (evt) {
                console.log(evt.params.data)
                // {id: '1106RM-0004', text: 'MERICA PUTIH BENIR III (DEBU) - KG', selected: true}
            });
        }
    }
};

$(function () {
    MasterPurchasingPic.getData();
    MasterPurchasingPic.select2All();
});
