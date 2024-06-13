let VerifikasiAbsen = {
    module: () => {
        return "laporan/verifikasiabsen";
    },

    moduleApi: () => {
        return `api/${VerifikasiAbsen.module()}`;
    },

    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleKaryawanApi: () => {
        return `api/${VerifikasiAbsen.moduleKaryawan()}`;
    },

    add: () => {
        window.location.href = url.base_url(VerifikasiAbsen.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(VerifikasiAbsen.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(VerifikasiAbsen.module()) + "index";
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

    setToggle: () => {
        $('i.menu-toggle-icon').trigger('click');
        $('#layout-menu').remove();
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
                    "url": url.base_url(VerifikasiAbsen.moduleKaryawanApi()) + `getData`,
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
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="VerifikasiAbsen.pilihData(this)"></i>`;
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
            url: url.base_url(VerifikasiAbsen.moduleApi()) + "showDataKaryawan",

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
                VerifikasiAbsen.getDataKaryawan();
            }
        });
    },

    getDataFingerKaryawan: (elm) => {
        let params = {};
        params.start_date = $('#start-date').val();
        params.end_date = $('#end-date').val();
        params.nik = $('#nik').val();
        params.area = $('#area').val();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(VerifikasiAbsen.moduleApi()) + "getDataFingerKaryawan",

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
                    let data = resp.data;
                    let tableData = $('table#table-data').find('tbody');
                    tableData.html('');
                    if (data.length > 0) {
                        let no = 1;
                        for (let i = 0; i < data.length; i++) {
                            let result = data[i];
                            let htmlTr = `<tr data_id="${result.id_trans_finger}" device_id="${result.device_id}"
                            device_name="${result.device_name}"
                            event_type_id="${result.event_type}"
                            user_update_by_device="${result.user_update_by_device}"
                            user_id="${result.user_id_finger}">
                                <td>${no++}</td>
                                <td>-</td>
                                <td>${result.name_id_finger}</td>
                                <td>${result.tanggal_absen}</td>
                                <td>${result.transaction_time}</td>
                                <td>${result.status_finger}</td>
                                <td></td>
                            </tr>`;
                            tableData.append(htmlTr);
                        }

                        $('table#table-data').DataTable();
                    }
                } else {
                    Toast.error('Informasi', resp.message);
                }
            }
        });
    },

    createDateRangeArray: (callback) => {
        let params = {};
        params.date_mulai = $("#start-date").val();
        params.date_akhir = $("#end-date").val();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(VerifikasiAbsen.moduleApi()) + "createDateRangeArray",

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

    getData: async (state = 0) => {
        // if($('#area').val() == ''){
        //     Toast.error('Informasi', 'Area Harus Dipilih');
        //     return;
        // }
        if (state == 1) {
            console.log($('#layout-navbar'));
            $('#layout-navbar').remove();
            $('#layout-menu').remove();
            // $('.container-fluid').remove();
        }
        let tableData = $('table#table-data');
        // $("#table-data").DataTable().destroy();
        if (tableData.length > 0) {
            $('table#table-data').find('tbody').html('');
            VerifikasiAbsen.createDateRangeArray((resp) => {
                let data = JSON.parse(resp);

                for (let i = 0; i < data.data.length; i++) {
                    let params = {};
                    params.tgl_awal = data.data[i];
                    params.tgl_akhir = data.data[i];
                    params.divisi = $('#divisi').val();
                    params.departemen = $('#departemen').val();
                    params.nama_departemen = $('#departemen').select2('data')[0].text;
                    params.area = $('#area').val();
                    params.nik = $('#nik').val();
                    params.group_ts = $('#group-ts').val();
                    params.state = state;

                    $.ajax({
                        type: 'POST',
                        dataType: 'html',
                        data: params,
                        // async: false,
                        url: url.base_url(VerifikasiAbsen.moduleApi()) + "getData",

                        beforeSend: () => {
                            message.loadingProses('Proses Pengambilan Data');
                        },

                        error: function () {
                            message.closeLoading();
                            Toast.error('Informasi', 'Gagal');
                        },

                        success: function (resp) {
                            message.closeLoading();
                            if (resp != '') {
                                Toast.success('Informasi', 'Tanggal ' + params.tgl_awal + " Berhasil Ditarik");
                                $('table#table-data').find('tbody').append(resp);

                                if ($('#from_page').length > 0) {
                                    VerifikasiAbsen.setToggle();
                                    let action = $('td.action');
                                    $.each(action, function () {
                                        $(this).html('');
                                    });

                                }

                                if (state == 0) {
                                    // $(".table-verifikasi").freezeTable({
                                    //     // 'freezeHead': true,
                                    //     'columnNum' : 4,
                                    //     'scrollBar': true,
                                    // });
                                    if ($.fn.DataTable.isDataTable('table#table-data')) {
                                        // $('table#table-data').DataTable().destroy()
                                    } else {
                                        $("#table-data").DataTable({
                                            // "order": [
                                            //     [0, 'desc']
                                            // ],
                                            "aLengthMenu": [
                                                [1500, 1600, 1700, -1],
                                                [1500, 1600, 1700, 'All']
                                            ],
                                            "deferRender": true,
                                            dom: '<"row mx-2"' +
                                                '<"col-md-2"<"me-3"l>>' +
                                                '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
                                                '>t' +
                                                '<"row mx-2"' +
                                                '<"col-sm-12 col-md-6"i>' +
                                                '<"col-sm-12 col-md-6"p>' +
                                                '>',
                                            'buttons': [{
                                                extend: 'collection',
                                                className: 'btn btn-label-secondary dropdown-toggle mx-3',
                                                text: '<i class="bx bx-upload me-2"></i>Export',
                                                buttons: [{
                                                        extend: 'print',
                                                        text: '<i class="bx bx-printer me-2" ></i>Print',
                                                        className: 'dropdown-item',
                                                        //   exportOptions: { columns: [2, 3, 4, 5] }
                                                    },
                                                    {
                                                        extend: 'csv',
                                                        text: '<i class="bx bx-file me-2" ></i>Csv',
                                                        className: 'dropdown-item',
                                                        //   exportOptions: { columns: [2, 3, 4, 5] }
                                                    },
                                                    {
                                                        extend: 'excel',
                                                        text: 'Excel',
                                                        className: 'dropdown-item',
                                                        //   exportOptions: { columns: [2, 3, 4, 5] }
                                                    },
                                                    {
                                                        extend: 'pdf',
                                                        text: '<i class="bx bxs-file-pdf me-2"></i>Pdf',
                                                        className: 'dropdown-item',
                                                        //   exportOptions: { columns: [2, 3, 4, 5] }
                                                    },
                                                    {
                                                        extend: 'copy',
                                                        text: '<i class="bx bx-copy me-2" ></i>Copy',
                                                        className: 'dropdown-item',
                                                        //   exportOptions: { columns: [2, 3, 4, 5] }
                                                    }
                                                ]
                                            }, ],
                                            // scrollY:        "700px",
                                            // scrollX:        true,
                                            // scrollCollapse: true,
                                            // fixedColumns:   {
                                            //     leftColumns: 5
                                            // }
                                        });
                                    }
                                }
                            }else{
                                Toast.success('Informasi', 'Tanggal ' + params.tgl_awal + " Berhasil Ditarik, Tidak ada data");
                            }

                        }
                    });

                }
            });

        }
    },

    verifyDataAbsensi: (elm) => {
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan verifikasi data ini ?</p>
        </div>
        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="VerifikasiAbsen.prosesVerifikasi(this)">Ya</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Tidak</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });

        $('.bootbox-close-button').addClass('btn-close').text("");
    },

    prosesVerifikasi: (elm) => {
        message.closeDialog();
        let data = [];
        let table = $('table#table-data').find('tbody').find('tr');
        let totalData = table.length;
        $('.progress-bar').attr('aria-valuemax', totalData);
        let totalProses = 1;
        $.each(table, function () {
            let params = {};
            params.nik = $(this).find('td#nik').text().trim();
            params.nama = $(this).find('td#nama').text().trim();
            params.tgl_absen = $(this).find('td#tgl_absen').text().trim();
            params.jam_masuk_ts = $(this).find('td#jam_masuk_ts').text().trim();
            params.jam_masuk_awal_ts = $(this).find('td#jam_masuk_awal_ts').text().trim();
            params.jam_masuk_akhir_ts = $(this).find('td#jam_masuk_akhir_ts').text().trim();
            params.jam_keluar_ts = $(this).find('td#jam_keluar_ts').text().trim();
            params.jam_keluar_awal_ts = $(this).find('td#jam_keluar_awal_ts').text().trim();
            params.jam_keluar_akhir_ts = $(this).find('td#jam_keluar_akhir_ts').text().trim();
            params.jam_masuk = $(this).find('td#jam_masuk').text().trim();
            params.jam_keluar = $(this).find('td#jam_keluar').text().trim();
            params.banyak_cuti = $(this).find('td#banyak_cuti').text().trim();
            params.banyak_izin = $(this).find('td#banyak_izin').text().trim();
            params.banyak_absen = $(this).find('td#banyak_absen').text().trim();
            params.banyak_terlambat = $(this).find('td#banyak_terlambat').text().trim();
            params.banyak_pc = $(this).find('td#banyak_pc').text().trim();
            params.out_time = $(this).find('td#out_time').text().trim();
            params.group_ts = $(this).attr('group_ts');
            params.group_ts_name = $(this).attr('group_ts_name');
            params.periode = $(this).attr('periode');
            params.default_ts = $(this).attr('default_ts');
            params.id_jadwal_kerja_default = $(this).attr('id_jadwal_kerja_default');
            params.ketentuan_batas_jam = $(this).attr('ketentuan_batas_jam');
            params.content_detail_jam = JSON.parse($(this).attr('detail_jam_kerja'));
            VerifikasiAbsen.verify(params, $(this), function (resp) {
                let totalPercentage = (totalProses / totalData) * 100;
                console.log('data ' + params.nama, resp);
                console.log('totalPercentage ' + totalPercentage);
                $('.progress-bar').attr('aria-valuenow', totalProses);
                $('.progress-bar').css({
                    'width': `${totalPercentage}%`
                });
                $('.progress-bar').text(totalPercentage + "%");
                totalProses += 1;
            });
        });
    },

    verify: (params, elm, callback) => {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            // async: false,
            url: url.base_url(VerifikasiAbsen.moduleApi()) + "verify",

            beforeSend: () => {
                elm.find('td:eq(0)').html(`<div class="spinner-border spinner-border-sm text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>`);
            },

            error: function () {
                elm.find('td:eq(0)').html(`<i class='bx bx-task-x text-danger'></i>`);
            },

            success: function (resp) {
                elm.find('td:eq(0)').html(`<i class='bx bx-check-circle text-success' ></i>`);
                callback(resp);
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
            url: url.base_url(VerifikasiAbsen.moduleApi()) + "showListDepartemen",

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
                VerifikasiAbsen.setFilterGroup();
            }
        });
    },

    editAbsen: (elm) => {
        $(elm).closest('tr').addClass('bg-warning');
        let id_finger = $(elm).attr('data_id');
        let tgl_absen = $(elm).attr('tgl_absen');
        let elmAction = $(elm).closest('tr').find('td#action');
        let elmJamMasuk = $(elm).closest('tr').find('td#jam_masuk');
        let htmlInputJamMasuk = `<input type="text" onkeyup="VerifikasiAbsen.submitAbsen(this, event, 1)" value='${elmJamMasuk.text().trim()}'/>`;
        elmJamMasuk.html(htmlInputJamMasuk);
        let elmJamKeluar = $(elm).closest('tr').find('td#jam_keluar');
        let htmlInputJamKeluar = `<input type="text" onkeyup="VerifikasiAbsen.submitAbsen(this, event, 1)" value='${elmJamKeluar.text().trim()}'/>`;
        elmJamKeluar.html(htmlInputJamKeluar);
        let htmlAction = `<i class="bx bx-check-circle" style="cursor: pointer;" tgl_absen="${tgl_absen}" data_id="${id_finger}" onclick="VerifikasiAbsen.submitAbsen(this, event, 0)"></i>`;
        elmAction.html(htmlAction);
    },

    submitAbsen: (elm, e, state) => {
        if (state == 1) {
            if (e.keyCode == 13) {
                VerifikasiAbsen.execSubmitAbsen(elm);
            }
        } else {
            VerifikasiAbsen.execSubmitAbsen(elm);
        }
    },

    execSubmitAbsen: (elm) => {
        let params = {};
        params.id_finger = $(elm).closest('tr').find('td#action').find('i').attr('data_id');
        params.area_finger = $(elm).closest('tr').attr('area_finger');
        params.tgl_absen = $(elm).closest('tr').find('td#action').find('i').attr('tgl_absen');
        params.jam_masuk = $(elm).closest('tr').find('td#jam_masuk').find('input').val();
        params.jam_keluar = $(elm).closest('tr').find('td#jam_keluar').find('input').val();
        params.nik = $(elm).closest('tr').find('td#nik').text().trim() + " - " + $(elm).closest('tr').find('td#nama').text().trim();
        params.idtr = $(elm).closest('tr').attr('id');
        console.log(params);

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(VerifikasiAbsen.moduleApi()) + "submitAbsen",

            beforeSend: () => {
                message.loadingProses('Proses Simpan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                $(`tr#${params.idtr}`).replaceWith(resp);
                $(`tr#${params.idtr}`).addClass('bg-success');
            }
        });
    },

    showDataPengajuan: (elm, e) => {
        e.preventDefault();
        let params = {};
        params.nik = $(elm).closest('tr').find('td#nik').text().trim();
        params.tgl_absen = $(elm).closest('tr').find('td#tgl_absen').text().trim();
        console.log(params)
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(VerifikasiAbsen.moduleApi()) + "showDataPengajuan",

            beforeSend: () => {
                message.loadingProses('Proses Simpan Data');
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
            }
        });
    },

    setFilterGroup: () => {
        let params = {};
        let divisi = $('#divisi').val();
        $('#data-group-ts').removeClass('hide');
        if (divisi == 3) {
            $('#data-group-ts').removeClass('hide');
        } else {
            $('#data-group-ts').addClass('hide');
        }
    },

    export: (elm) => {
        let idExportContent = $(elm).attr('idexport');
        // window.open('data:application/vnd.ms-excel,' + encodeURIComponent($(`div#${idExportContent}`).html()));
        var myBlob = new Blob([$(`div#${idExportContent}`).html()], {
            type: 'application/vnd.ms-excel'
        });
        var url = window.URL.createObjectURL(myBlob);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "export.xls";
        a.click();
        //adding some delay in removing the dynamically created link solved the problem in FireFox
        setTimeout(function () {
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

$(function () {
    VerifikasiAbsen.select2All()
    VerifikasiAbsen.setDate()

    let state = $('#state').val();
    if (state == 1) {
        console.log($('#layout-navbar'));
        $('#layout-navbar').remove();
        $('#layout-menu').remove();
        // $('.container-fluid').remove();
    }

})
