let DashboardAbsen = {
    module: () => {
        return "laporan/dashboardabsen";
    },

    moduleApi: () => {
        return `api/${DashboardAbsen.module()}`;
    },

    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleLaporan: () => {
        return "laporan/absensi";
    },

    moduleVerifikasi: () => {
        return "laporan/verifikasiabsen";
    },

    moduleLaporanApi: () => {
        return `api/${DashboardAbsen.moduleLaporan()}`;
    },

    moduleVerifikasiApi: () => {
        return `api/${DashboardAbsen.moduleVerifikasi()}`;
    },

    moduleKaryawanApi: () => {
        return `api/${DashboardAbsen.moduleKaryawan()}`;
    },

    add: () => {
        window.location.href = url.base_url(DashboardAbsen.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(DashboardAbsen.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(DashboardAbsen.module()) + "index";
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

    setDate: () => {
        let dataDate = $('.flatpickr');
        $.each(dataDate, function () {
            $(this).flatpickr();
        });
    },

    getDataKaryawan: async () => {
        let tableData = $('table#table-data-karyawan');
        let params = {};
        params.id = $('#id').val();
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
                    [10, 50, 100],
                    [10, 50, 100]
                ],
                "ajax": {
                    "url": url.base_url(DashboardAbsen.moduleKaryawanApi()) + `getData`,
                    "type": "GET",
                    "data": params
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
                        "data": "nik",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "nik",
                    },
                    {
                        "data": "nama_lengkap",
                    },
                    {
                        "data": "nik",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="DashboardAbsen.pilihData(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihData: (elm) => {
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');
        $('#nik').val(nik + " - " + nama_lengkap);
        message.closeDialog();
    },

    showDataKaryawan: (elm) => {
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(DashboardAbsen.moduleApi()) + "showDataKaryawan",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                DashboardAbsen.getDataKaryawan();
            }
        });
    },

    getUrlParams: () => {
        let url = window.location.href;
        var params = {};
        (url + '?').split('?')[1].split('&').forEach(function (pair) {
            pair = (pair + '=').split('=').map(decodeURIComponent);
            if (pair[0].length) {
                params[pair[0]] = pair[1];
            }
        });

        return params;
    },

    getDataFingerKaryawan: (callback) => {
        let params = DashboardAbsen.getUrlParams();
        params.tgl_absen = $('#start-date').val();
        params.tgl_awal = $('#start-date').val();
        params.tgl_akhir = $('#start-date').val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(DashboardAbsen.moduleVerifikasiApi()) + "getDashBoard",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                $('#total-kry').html(resp.data);
                $('#total-cuti').html(resp.totalKaryawanCuti);
                $('#total-izin').html(resp.totalKaryawanIzin);
                $('#total-tidak-masuk').html(resp.totalKaryawanAbsen);
                $('#total-terlambat').html(resp.totalKaryawanTerlambat);
                $('#total-pc').html(resp.totalKaryawanPc);
                // console.log(resp.dataKaryawanAbsen);
                // for(let i = 0; i < resp.dataKaryawanAbsen.length; i++){
                //     console.log(resp.dataKaryawanAbsen[i].NIK);
                // }
                for(let i = 0; i < resp.dataKaryawan.length; i++){
                    console.log(resp.dataKaryawan[i].nama_karyawan);
                }
            }
        });
    },

    setToggle: () => {
        $('i.menu-toggle-icon').trigger('click');
        $('#layout-menu').remove();
    },

    getDataTotalKaryawanArea: (elm) => {
        let params = {};
        params.area = $('#area').val() == '' ? $('#area-filter').val() : $('#area').val();

        let tableData = $('table#table-data').find('tbody');
        tableData.html('');
        let no = 1;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(DashboardAbsen.moduleApi()) + "getDataTotalKaryawanArea",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    $('#total-kry').html(resp.data.length);
                } else {
                    Toast.error('Informasi', resp.message);
                }
            }
        });
    },

    getDataTotalKaryawanMasukDanKeluarArea: (elm) => {
        let params = {};
        params.area = $('#area').val() == '' ? $('#area-filter').val() : $('#area').val();
        // params.tgl_absen = $('#start-date').val() == '' ? $('#start-date-filter').val() : $('#start-date').val();
        params.tgl_absen = $('#start-date-filter').val();

        let tableData = $('table#table-data').find('tbody');
        tableData.html('');
        let no = 1;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(DashboardAbsen.moduleApi()) + "getDataTotalKaryawanMasukDanKeluarArea",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    console.log('absen masuk', resp.absen_masuk);
                    $('#total-absen-masuk').html(resp.absen_masuk.length);
                    $('#total-absen-keluar').html(resp.absen_keluar.length);

                    let total = parseInt($('#total-kry').text().trim()) - parseInt($('#total-absen-masuk').text().trim());
                    $('#total-tidak-masuk').html(total);
                } else {
                    Toast.error('Informasi', resp.message);
                }
            },
        });
    },

    setInitSocket:()=>{
        let urlSocket = url.base_url_socket(1001, '');
        const socket = io(urlSocket);

        socket.on('userconnected', function () {
            Toast.success('Informasi', 'User Connected');
        });

        socket.on('reload', function () {
            Toast.success('Informasi', 'Reload');
            DashboardAbsen.getDataFingerKaryawan();
        });
    }
}

$(function () {
    DashboardAbsen.setInitSocket();
    DashboardAbsen.select2All();
    DashboardAbsen.setDate();
    DashboardAbsen.setToggle();
    DashboardAbsen.getDataFingerKaryawan();
    // DashboardAbsen.getDataTotalKaryawanArea();
    // DashboardAbsen.getDataTotalKaryawanMasukDanKeluarArea();
    // setInterval(() => {
    //     console.log('run');
    //     DashboardAbsen.getDataFingerKaryawan();
    // }, 300000);
})
