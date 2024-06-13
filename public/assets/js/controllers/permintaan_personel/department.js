let Department = {
    module: () => {
        return "permintaan_personel/department";
    },

    moduleApi: () => {
        return `api/${Department.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(Department.module()) + "add";
    },

    ubah: (elm) => {
        let params = {
            'id' : $(elm).data("id"),
            'deptname' : $(elm).data("deptname"),
            'sla' : $(elm).data("sla"),
            'nik' : $(elm).data("nik"),
        };

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Department.moduleApi()) + "update_department",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    centerVertical: true
                    // size: 'x-large'
                });
                $('.modal').animate({scrollTop:0}, 500, 'swing');
                Department.select2All();
                // Lowongan.getApplicantList($(elm).attr("data_id"));
            }
        });
    },

    back: () => {
        window.location.href = url.base_url('transaksi/permintaan-personel');
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
                    "url": url.base_url(Department.moduleApi()) + `getData`,
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
                        "targets": 4,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                            $(td).addClass('td-padd');
                            $(td).addClass('action');
                        }
                    },
                    {
                        "targets": [1,2,3],
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
                        "data": "nama_departemen",
                    },
                    {
                        "data": "nama_lengkap",
                    },
                    {
                        "data": "sla",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            if(updateAction == '1'){
                                htmlAction += `<i class="bx bx-edit" style="cursor: pointer;" data-id="${data}" 
                                data-deptname="${row.nama_departemen}" data-sla="${row.sla}" data-nik="${row.nik}" data onclick="Department.ubah(this)"></i>`;
                            }                            
                            
                            // if(deleteAction == '1'){
                            //     htmlAction += `<i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="Department.delete(this, event)"></i>`;
                            // }                            
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
                'id': $('input#rowid').val(),
                'nik': $.trim($('#nik').val()),
                'sla': $.trim($('#sla').val()),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        
        e.preventDefault();
        let params = Department.getPostData();
        let form = $(elm).closest('div.row');
        if(validation.runWithElement(form)){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Department.moduleApi()) + "submit",
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
    },

    
};

$(function () {
    Department.getData();
    Department.select2All();
});
