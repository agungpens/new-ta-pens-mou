let Absensi = {
    module: () => {
        return "laporan/absensi";
    },

    moduleApi: () => {
        return `api/${Absensi.module()}`;
    },

    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleKaryawanApi: () => {
        return `api/${Absensi.moduleKaryawan()}`;
    },

    add: () => {
        window.location.href = url.base_url(Absensi.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Absensi.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(Absensi.module()) + "index";
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
                    "url": url.base_url(Absensi.moduleKaryawanApi()) + `getData`,
                    "type": "POST",
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
                        return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="Absensi.pilihData(this)"></i>`;
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
        $('#nik-filter').val(nik + " - " + nama_lengkap);
        message.closeDialog();
    },

    showDataKaryawan: (elm) => {
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Absensi.moduleApi()) + "showDataKaryawan",

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
                Absensi.getDataKaryawan();
            }
        });
    },

    showListDepartemen: (elm) => {
        let params = {};
        params.divisi = $(elm).val();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Absensi.moduleApi()) + "showListDepartemen",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                let optionHtml = ``;
                for (let i = 0; i < resp.data.length; i++) {
                    let data = resp.data[i];
                    optionHtml += `<option value="${data.id}">${data.nama_departemen}</option>`;
                }
                $('#departemen').html(optionHtml);
            }
        });
    },

    moduleVerif: () => {
        return "laporan/verifikasiabsen";
    },


    moduleVerifApi: () => {
        return `api/${Absensi.moduleVerif()}`;
    },

    createDateRangeArray: (callback) => {
        let params = {};
        params.date_mulai = $("#start-date").val();
        params.date_akhir = $("#end-date").val();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Absensi.moduleVerifApi()) + "createDateRangeArray",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                toastr.error('Gagal');
            },

            success: function (resp) {
                callback(resp);
            }
        });
    },

    getDataFingerKaryawan: (elm) => {

        $('#loading-proses').html(`Penarikan Data Sedang Berlangsung......`);
        let tableData = $('table#table-data').find('tbody');
        tableData.html('');
        // $('table#table-data').DataTable().destroy();
        let no = 1;
        let batasPenarikan = 0;
        Absensi.createDateRangeArray((resp) => {
            let data = JSON.parse(resp);
            for (let i = 0; i < data.data.length; i++) {
                let params = {};
                params.start_date = data.data[i];
                params.end_date = data.data[i];
                params.nik = $('#nik').val();
                params.area = $('#area').val();
                params.divisi = $('#divisi').val();
                params.departemen = $('#departemen').val();

                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    data: params,
                    // async: false,
                    url: url.base_url(Absensi.moduleApi()) + "getDataFingerKaryawan",

                    beforeSend: () => {
                        message.loadingProses('Proses Pengambilan Data ');
                        tableData.html('');
                    },

                    error: function (resp) {
                        message.closeLoading();
                        // Toast.error("Informasi", resp);
                    },

                    success: function (resp) {
                        message.closeLoading();
                        if (resp.is_valid) {
                            let data = resp.data;
                            if (data.length > 0) {
                                batasPenarikan += 1;
                                let tempUniqeId = [];
                                for (let i = 0; i < data.length; i++) {
                                    let result = data[i];
                                    let foreignKey = result.nik + result.transaction_time;
                                    // let foreignKey = result.nama_lengkap;
                                    if (!tempUniqeId.includes(foreignKey)) {
                                        let bgStatus = "";
                                        if (result.name_id_finger.toLowerCase().trim() != result.nama_lengkap.toLowerCase().trim()) {
                                            bgStatus = 'bg-warning';
                                        }
                                        let htmlTr = `<tr class="${bgStatus}" data_id="${result.id_trans_finger}" device_id="${result.device_id}"
                                            device_name="${result.device_name}"
                                            event_type_id="${result.event_type}"
                                            user_update_by_device="${result.user_update_by_device}"
                                            user_id="${result.user_id_finger}">
                                                <td>${no++}</td>
                                                <td>${result.nik}</td>
                                                <td>${result.name_id_finger.toUpperCase()}</td>
                                                <td>${result.nama_lengkap.toUpperCase()}</td>
                                                <td>${result.tanggal_absen}</td>
                                                <td>${result.transaction_time}</td>
                                                <td></td>
                                            </tr>`;
                                        tableData.append(htmlTr);

                                        $('#jumlah-data-masuk').html(`Jumlah Data Masuk : ${no}`);
                                        tempUniqeId.push(foreignKey);
                                    }
                                }
                                $('#jumlah-data-masuk').html(`Jumlah Data Masuk : ${no - 1}`);
                                if ($.fn.DataTable.isDataTable('table#table-data')) {
                                    // $('table#table-data').dataTable().fnClearTable();
                                    $('table#table-data').DataTable().destroy()
                                } else {
                                    $('table#table-data').DataTable({
                                        "aLengthMenu": [
                                            [300, 400, 500],
                                            [300, 400, 500]
                                        ],
                                    });
                                }


                                $('#loading-proses').html(`Proses Penarikan Data Selesai.`);
                            } else {
                                $('#loading-proses').html(`Proses Penarikan Data Selesai.`);
                                $('#jumlah-data-masuk').html(`Jumlah Data Masuk : 0`);
                            }
                        } else {
                            Toast.error('Informasi', resp.message);
                        }
                    }
                });
            }
        });
    },

    export: (elm) => {
        let idExportContent = $(elm).attr('idexport');
        window.open('data:application/vnd.ms-excel,' + encodeURIComponent($(`div#${idExportContent}`).html()));
    }
}

$(function () {
    Absensi.select2All()
    Absensi.setDate()
    // Absensi.getDataFingerKaryawan();
})
