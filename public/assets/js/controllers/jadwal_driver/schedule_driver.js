

let ScheduleDriver = {
    module: () => {
        return "jadwal-driver/schedule-driver";
    },

    moduleApi: () => {
        return `api/${ScheduleDriver.module()}`;
    },
    moduleDriver: () => {
        return "jadwal-driver/master-driver";
    },

    moduleDriverApi: () => {
        return `api/${ScheduleDriver.moduleDriver()}`;
    },
    moduleTemplatePekerjaan: () => {
        return "jadwal-driver/template-pekerjaan";
    },

    moduleTemplatePekerjaanApi: () => {
        return `api/${ScheduleDriver.moduleTemplatePekerjaan()}`;
    },

    detail: (elm) => {
        let nik_driver = $(elm).attr("nik_driver");
        let tanggal = $(elm).attr("tanggal");
        // alert(url.base_url(ScheduleDriver.module()) + "detail?nik_driver=" + nik_driver + "?tanggal=" + tanggal);
        window.location.href = url.base_url(ScheduleDriver.module()) + "detail?nik_driver=" + nik_driver + "&tanggal=" + tanggal;
    },

    back: () => {
        window.location.href = url.base_url(ScheduleDriver.module()) + "index";
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
                    "url": url.base_url(ScheduleDriver.moduleApi()) + `getData`,
                    "type": "POST",
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [{
                    "targets": 1,
                    "orderable": false,
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
                    "data": "driver",
                    "render": (data, type, row, meta) => {
                        return `
                            <button class="btn btn-info" nik_driver="${row.driver}" tanggal= "${row.tanggal}" onclick="ScheduleDriver.detail(this)"><i class="fas fa-eye"></i></button>
                            `;
                    }
                },
                {
                    "data": "driver",
                    // render driver + nama_karyawan
                    "render": (data, type, row, meta) => {
                        return `${row.driver} - ${row.nama_karyawan}`;
                    }

                },
                {
                    "data": "nama_kendaraan",
                    "render": (data, type, row, meta) => {
                        return `${row.nama_kendaraan} - ${row.merk_kendaraan} - ${row.no_pol_kendaraan}`;
                    }
                },
                {
                    "data": "tanggal",
                },


                ]
            });
        }
    },
    refresh: async () => {
        let tableData = $('table#table-data');
        $('#tanggal').val('');
        $('#table-data').DataTable().destroy();
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
                    "url": url.base_url(ScheduleDriver.moduleApi()) + `getData`,
                    "type": "POST",
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [{
                    "targets": 1,
                    "orderable": false,
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
                    "data": "driver",
                    "render": (data, type, row, meta) => {
                        return `
                            <button class="btn btn-info" nik_driver="${row.driver}" tanggal= "${row.tanggal}" onclick="ScheduleDriver.detail(this)"><i class="fas fa-eye"></i></button>
                            `;
                    }
                },
                {
                    "data": "driver",
                    // render driver + nama_karyawan
                    "render": (data, type, row, meta) => {
                        return `${row.driver} - ${row.nama_karyawan}`;
                    }

                },
                {
                    "data": "nama_kendaraan",
                    "render": (data, type, row, meta) => {
                        return `${row.nama_kendaraan} - ${row.merk_kendaraan} - ${row.no_pol_kendaraan}`;
                    }
                },
                {
                    "data": "tanggal",
                },


                ]
            });
        }
    },

    filter: () => {
        let tableData = $('table#table-data');
        // destroy datatable
        $('#table-data').DataTable().destroy();
        let tanggal = $('#tanggal').val();
        // console.log(tanggal);
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
                    "url": url.base_url(ScheduleDriver.moduleApi()) + `filterGetData`,
                    "type": "POST",
                    "data": {
                        'tanggal': tanggal
                    }
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [{
                    "targets": 1,
                    "orderable": false,
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
                    "data": "driver",
                    "render": (data, type, row, meta) => {
                        return `
                            <button class="btn btn-info" nik_driver="${row.driver}" tanggal= "${row.tanggal}" onclick="ScheduleDriver.detail(this)"><i class="fas fa-eye"></i></button>
                            `;
                    }
                },
                {
                    "data": "driver",
                    // render driver + nama_karyawan
                    "render": (data, type, row, meta) => {
                        return `${row.driver} - ${row.nama_karyawan}`;
                    }

                },
                {
                    "data": "nama_kendaraan",
                    "render": (data, type, row, meta) => {
                        return `${row.nama_kendaraan} - ${row.merk_kendaraan} - ${row.no_pol_kendaraan}`;
                    }
                },
                {
                    "data": "tanggal",
                },


                ]
            });
        }
    },

    cetakPdf: () => {
        let nik_driver = $('#nik_driver').val();
        let tanggal = $('#tanggal').val();
        let kendaraan = $('#kendaraan').val();
        let nama_karyawan = $('#nama_karyawan').val();

        window.location.href = url.base_url(ScheduleDriver.module()) + "cetak_pdf?nik_driver=" + nik_driver + "&tanggal=" + tanggal + "&kendaraan=" + kendaraan + "&nama_karyawan=" + nama_karyawan;

    }


};

$(function () {
    ScheduleDriver.getData();
});
