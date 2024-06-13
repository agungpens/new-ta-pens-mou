let RekapPermintaanPembelian = {
    module: () => {
        return "report/purchasing/permintaan-pembelian";
    },

    moduleApi: () => {
        return `api/${RekapPermintaanPembelian.module()}`;
    },

    getData: async () => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();

        let params = {}
        params.tgl_efektif = $("#tgl_efektif").val()
        params.departemen = $("#cb-departemen").val()
        params.area = $("#cb-area-kerja").val()


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
                    [100, 150, 300, -1],
                    [100, 150, 300, 'Semua']
                ],
                "ajax": {
                    "url": url.base_url(RekapPermintaanPembelian.moduleApi()) + `getData`,
                    "type": "POST",
                    "data": params,
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
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "pr_no",
                    },
                    {
                        "data": "tipe_document",
                        render: function (data, type, row, meta) {
                            let htmlDocument=""
                            if(data == "DOCT_PR"){
                                htmlDocument+='Permintaan Pembelian'
                            }else{
                                htmlDocument+='Permintaan Invesment'
                            }
                            return htmlDocument
                        }
                    },
                    {
                        "data": "tanggal_efektif",
                    },
                    {
                        "data": "nama_departemen",
                    },
                    {
                        "data": "area_kerja",
                    },
                    // {
                    //     "data": "area_kerja",
                    // },
                    {
                        "data": "status",
                        "render": (data, type, row, meta) => {
                            console.log(row.status_acc);
                            if(row.tipe_document == "DOCT_PR"){
                                // if (row.status_acc == '' || row.status == 'CREATED') {
                                //     return `<span class="badge bg-label-info">Menunggu Proses Approval Manajer Departemen</span>`;
                                // }
                                // if (row.status_acc == 'RT_ACCESS_ACC_1' && data == 'APPROVED') {
                                //     return `<span class="badge bg-label-info">Menunggu Proses Verifikasi Admin MOI</span>`;
                                // }
                                // if (row.status_acc == 'RT_ACCESS_ACC_1' && data == 'REJECTED') {
                                //     return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Manajer Departemen</span>`;
                                // }
                                // if (row.status_acc == 'RT_ACCESS_ACC_2' && data == 'APPROVED') {
                                //     return `<span class="badge bg-label-info">Menunggu Proses Approval Manajer Purchasing</span>`;
                                // }
                                // if (row.status_acc == 'RT_ACCESS_ACC_2' && data == 'REJECTED') {
                                //     return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Admin MOI</span>`;
                                // }
                                // if (row.status_acc == 'RT_ACCESS_ACC_3' && data == 'APPROVED') {
                                //     return `<span class="badge bg-label-info">Menunggu Proses Approval Direksi</span>`;
                                // }
                                // if (row.status_acc == 'RT_ACCESS_ACC_3' && data == 'REJECTED') {
                                //     return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Manajer Purchasing</span>`;
                                // }
                                // if (row.status_acc == 'RT_ACCESS_ACC_4' && data == 'APPROVED') {
                                //     return `<span class="badge bg-label-info">Pengajuan Diacc oleh Direksi</span>`;
                                // }
                                // if (row.status_acc == 'RT_ACCESS_ACC_4' && data == 'REJECTED') {
                                //     return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Direksi</span>`;
                                // }
                                if (row.status_acc == '' || row.status == 'CREATED') {
                                    return `<span class="badge bg-label-info">Menunggu Proses Approval Manajer Departemen</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_1' && data == 'APPROVED') {
                                    return `<span class="badge bg-label-info">Menunggu Proses Verifikasi Admin MOI</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_1' && data == 'REJECTED') {
                                    return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Manajer Departemen</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_2' && data == 'APPROVED') {
                                    return `<span class="badge bg-label-info">Menunggu Proses Approval Manajer Purchasing</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_2' && data == 'REJECTED') {
                                    return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Admin MOI</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_3' && data == 'APPROVED') {
                                    return `<span class="badge bg-label-info">Menunggu Proses Approval Direksi</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_3' && data == 'REJECTED') {
                                    return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Manajer Purchasing</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_4' && data == 'APPROVED') {
                                    return `<span class="badge bg-label-info">Pengajuan Diacc oleh Direksi</span>`;
                                }
                                if (row.status_acc == 'RT_ACCESS_ACC_4' && data == 'REJECTED') {
                                    return `<span class="badge bg-label-danger">Pengajuan Ditolak oleh Direksi</span>`;
                                }
                                return "";
                            }else{
                                if (row.tgl_efektif != '' && row.status == 'approved') {
                                    return `<span class="badge  bg-label-success">Terverifikasi</span>`;
                                } else {
                                    if (row.status == 'reject') {
                                        return `<span class="badge  bg-label-danger">Ditolak</span>`;
                                    } else {
                                        if (row.tgl_approve == '') {
                                            return `<span class="badge  bg-label-dark">Proses Approval Perubahan</span>`;
                                        } else {
                                            return `<span class="badge  bg-label-dark">Proses Verifikasi</span>`;
                                        }
                                    }
                                }
                            }
                        }
                    },
                    {
                        "data": "item_name",
                    },
                    {
                        "data": "qty",
                    },
                    {
                        "data": "satuan",
                    },
                    {
                        "data": "remarks",
                    },
                    {
                        "data": "is_approve",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            if(row.tipe_document == "DOCT_PR"){
                                if(data == 1){
                                    htmlAction+=`<span class="badge rounded-pill bg-label-success">Disetujui</span>`
                                }else{
                                    if(data == 0){
                                        htmlAction+=`<span class="badge rounded-pill bg-label-danger">Ditolak</span>`
                                    }else{
                                        htmlAction += `<span class="badge rounded-pill bg-label-warning">Pending</span>`;
                                    }
                                }
                            }else{
                                htmlAction+=`<span class="badge rounded-pill bg-label-success">Disetujui</span>`
                            }
                            return htmlAction;
                        }
                    },
                    {
                        "data": "is_regilar",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '-';
                            if (row.is_regular != null) {
                                htmlAction = row.is_regular == 1 ? `MRP/Regular` : `Irregular/Insidentil/Project`;
                            }
                            return htmlAction;
                        }
                    },
                    {
                        "data": "tanggal_estimasi_pemakaian",
                    },
                ],
                // 'dom': 'Bfrtip',
                dom:
                '<"row mx-2"' +
                '<"col-md-2"<"me-3"l>>' +
                '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
                '>t' +
                '<"row mx-2"' +
                '<"col-sm-12 col-md-6"i>' +
                '<"col-sm-12 col-md-6"p>' +
                '>',
                'buttons': [
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

    setDate: () => {
        const flatpickrRange = document.querySelector('.flatpickr');
        if (flatpickrRange) {
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
}
$(function(){
    RekapPermintaanPembelian.setDate()
    RekapPermintaanPembelian.select2All()
    RekapPermintaanPembelian.getData()
})
