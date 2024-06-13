
let Rekrutment = {
    module: () => {
        return "laporan/rekrutment";
    },

    moduleProfile: () => {
        return "account/profile";
    },

    moduleApi: () => {
        return `api/${Rekrutment.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(Rekrutment.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Rekrutment.module()) + "ubah?id=" + data_id;
    },

    back: (elm) => {
        let type = $(elm).attr("from");
        if (type == '') {
            window.location.href = url.base_url(Rekrutment.module()) + "index";
        } else {
            window.location.href = url.base_url(Rekrutment.moduleProfile()) + "index";
        }
    },

    getData: () => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();
        let params = {};
        params.area = $('#area').val();
        params.divisi = $('#divisi').val();
        params.departemen = $('#departemen').val();
        params.jabatan = $('#jabatan').val();
        params.status = $('#status').val();

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
                    [25, 50, 100, -1],
                    [25, 50, 100, "Semua"]
                ],
                "ajax": {
                    "url": url.base_url(Rekrutment.moduleApi()) + `getData`,
                    "type": "POST",
                    "data": params,
                    "dataType": "json"
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [
                    {
                        "targets": [1,2,3,4,5,6,7,8,9,10,11],
                        "orderable": false,
                    },
                    {
                        "targets": [0],
                        "orderable": true,
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
                    "data": "rencana_masuk_bulan_fptk",
                },
                {
                    "data": "nama_departemen",
                },
                {
                    "data": "posisi",
                },
                {
                    "data": "tanggal_pengajuan_fptk",
                },
                {
                    "data": "rencana_masuk_fptk",
                },
                {
                    "data": "tanggal_diterima",
                },
                {
                    "data": "status",
                    "render": (data, type, row, meta) => {
                        let returnvalue = ""
                        if (row.total_di_proses != "-") {
                            returnvalue = "Process"
                        } else {
                            if (data) {
                                returnvalue = "Open"
                            } else {
                                returnvalue = "Closed"
                            }
                        }

                        return returnvalue
                    }
                },
                {
                    "data": "jumlah_kebutuhan",
                },
                {
                    "data": "total_pelamar",
                },
                // {
                //     "data": "total_belum_diproses",
                // },
                {
                    "data": "total_di_proses",
                },
                {
                    "data": "total_diterima",
                },
                {
                    "data": "total_direject",
                },
                ],
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
};

$(function () {
    Rekrutment.getData();
    Rekrutment.setDate();
    Rekrutment.select2All();
});
