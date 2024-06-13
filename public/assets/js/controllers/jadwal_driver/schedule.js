

let Schedule = {
    module: () => {
        return "jadwal-driver/schedule";
    },

    moduleApi: () => {
        return `api/${Schedule.module()}`;
    },
    moduleDriver: () => {
        return "jadwal-driver/master-driver";
    },

    moduleDriverApi: () => {
        return `api/${Schedule.moduleDriver()}`;
    },
    moduleTemplatePekerjaan: () => {
        return "jadwal-driver/template-pekerjaan";
    },

    moduleTemplatePekerjaanApi: () => {
        return `api/${Schedule.moduleTemplatePekerjaan()}`;
    },

    add: () => {
        window.location.href = url.base_url(Schedule.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Schedule.module()) + "ubah?id=" + data_id;
    },
    detail: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Schedule.module()) + "detail?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(Schedule.module()) + "index";
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
                    "url": url.base_url(Schedule.moduleApi()) + `getData`,
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
                    "data": "id",
                    "render": (data, type, row, meta) => {
                        return `
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="Schedule.ubah(this)"></i>
                            <i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="Schedule.delete(this, event)"></i>
                            <i class="fas fa-eye" style="cursor: pointer;" data_id="${data}" onclick="Schedule.detail(this)"></i>
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
                {
                    "data": "start",
                    "render": function (data, type, row) {
                        // Memisahkan jam, menit, dan detik dari string waktu
                        const timeParts = data.split(':');
                        const formattedTime = timeParts[0] + ':' + timeParts[1]; // Menggabungkan kembali jam dan menit
                        return formattedTime;

                    }
                },
                {
                    "data": "end",
                    "render": function (data, type, row) {
                        // Memisahkan jam, menit, dan detik dari string waktu
                        const timeParts = data.split(':');
                        const formattedTime = timeParts[0] + ':' + timeParts[1]; // Menggabungkan kembali jam dan menit
                        return formattedTime;

                    }
                },
                {
                    "data": "menit",
                },
                {
                    "data": "template_pekerjaan",
                },

                ]
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
            <button class="btn btn-primary btn-sm" onclick="Schedule.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(Schedule.moduleApi()) + "delete",

            beforeSend: () => {
                message.loadingProses('Proses Hapus Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Data Berhasil Dihapus');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    Toast.error('Informasi', 'Data Gagal Dihapus ', resp.message);
                }
            }
        });
    },

    getPostInputDokumen: () => {
        let params = {};
        let data_file = $('div.content-file-upload');
        $.each(data_file, function () {
            let $this = $(this);
            let attr_obj_img = $this.find('img').attr('id');
            let attr_obj_filename = $this.find('label').attr('id');
            params[`${attr_obj_img.replaceAll('-', '_')}`] = $this.find('img').attr('src');
            params[`${attr_obj_filename.replaceAll('-', '_')}`] = $this.find('label').text().trim();
        });

        return params;
    },

    getPostData: () => {
        let data = {
            'data': {
                'id': $('input#id').val(),
                'driver': $.trim($('#driver').val()),
                'tanggal': $.trim($('#tanggal').val()),
                'kendaraan_id': $.trim($('#kendaraan_id').val()),
                'start': $.trim($('#start').val()),
                'end': $.trim($('#end').val()),
                'menit': $.trim($('#menit').val()),
                'pekerjaan_id': $.trim($('#pekerjaan_id').val()),
                'perincian': $.trim($('#perincian').val()),
            },
            'data_detail': Schedule.getPostdataDetail(),
        };
        // console.log(data);
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Schedule.getPostData();
        let form = $(elm).closest('form');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Schedule.moduleApi()) + "submit",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function () {
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Data Berhasil Disimpan');
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


    showDataDriver: (elm) => {
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Schedule.moduleApi()) + "showDataDriver",

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
                Schedule.getDataDriver();
            }
        });
    },

    getDataDriver: async () => {
        let tableData = $('table#table-data-driver');
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
                    [200, 300, 1000],
                    [200, 300, 1000]
                ],
                "ajax": {
                    "url": url.base_url(Schedule.moduleDriverApi()) + `getData`,
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
                        $(td).addClass('action');
                    }
                },
                {
                    "targets": 2,
                    "orderable": false,
                    "createdCell": function (td, cellData, rowData, row, col) {
                    }
                },
                {
                    "targets": 1,
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
                    "data": "nik",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    "data": "nik",
                    "render": (data, type, row, meta) => {
                        return `<i class="bx bx-edit" style="cursor: pointer;" nama_lengkap="${row.nama_karyawan}" data_id="${data}" kendaraan_id = "${row.default_kendaraan_id}" kendaraan = "${row.nama_kendaraan}" onclick="Schedule.pilihData(this)"></i>`;
                    }
                },
                {
                    "data": null,
                    "render": (data, type, row, meta) => {
                        return `${row.nik} - ${row.nama_karyawan}`;
                    }
                },

                {
                    "data": null,
                    "render": (data, type, row, meta) => {
                        return `${row.nama_kendaraan} - ${row.merk_kendaraan} - ${row.no_pol_kendaraan}`;
                    }
                },
                {
                    "data": "nama_jenis",
                },


                ]
            });
        }
    },

    pilihData: (elm) => {
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nama_kendaraan = $(elm).attr('kendaraan');
        let kendaraan_id = $(elm).attr('kendaraan_id');
        let nik = $(elm).attr('data_id');
        $('#kendaraan_id').val(kendaraan_id + " - " + nama_kendaraan);
        $('#kendaraan').val(nama_kendaraan);
        // $('#driver').val(nik);
        $('#driver').val(nik + " - " + nama_lengkap);


        message.closeDialog();
    },

    setNik: (elm, e) => {
        let nik = $(elm).is(':checked') ? $(elm).attr('nik') : '';
        $('#nik').val(nik);
    },


    showDataTemplate: (elm) => {
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Schedule.moduleApi()) + "showDataTemplate",

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
                Schedule.getDataTemplate();
            }
        });
    },

    getDataTemplate: async () => {
        let tableData = $('table#table-data-template');
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
                    [200, 300, 1000],
                    [200, 300, 1000]
                ],
                "ajax": {
                    "url": url.base_url(Schedule.moduleTemplatePekerjaanApi()) + `getData`,
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
                    "targets": 1,
                    "orderable": false,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).addClass('text-center');
                        $(td).addClass('td-padd');
                        $(td).addClass('action');
                    }
                },
                {
                    "targets": 3,
                    "orderable": false,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).addClass('td-padd');
                        $(td).addClass('editable-cell');
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
                    "data": "id",
                    "render": (data, type, row, meta) => {
                        return `<i class="bx bx-edit" style="cursor: pointer;" template="${row.template_pekerjaan_driver_details}" data_perincian="${row.perincian}" data_id="${data}" onclick="Schedule.pilihDataTemplate(this)"></i>`;
                    }
                },
                {
                    "data": "template_pekerjaan_driver_details",
                },
                {
                    "data": "perincian",
                },


                ]
            });
        }
    },

    pilihDataTemplate: (elm) => {

        let id = $(elm).attr('data_id');
        let data_perincian = $(elm).attr('data_perincian');
        let template = $(elm).attr('template');
        $('#pekerjaan_id').val(id + " - " + template);
        $('#pekerjaan').val(template);
        $('#perincian').val(data_perincian);

        $.ajax({
            type: "POST",
            url: url.base_url(Schedule.moduleApi()) + `getDataDetail`,
            data: {
                template_id: id
            },
            dataType: "json",
            success: function (response) {
                $('table#table-data-detail tbody').html('');
                // isi table
                $.map(response, function (elementOrValue, indexOrKey) {
                    let table = $('table#table-data-detail tbody');
                    let isiTable = `
                                <tr class="input-detail" data-id="${elementOrValue.id}">
                                    <td class="editable-cell">
                                    ${elementOrValue.nama}
                                        <textarea class="form-control mb-3 d-none" name="nama[]" cols="30" rows="2" placeholder="nama">${elementOrValue.nama}</textarea>
                                        <textarea class="form-control mb-3 d-none" name="template_pekerjaan_id[]" cols="30" rows="2" placeholder="template_pekerjaan_id">${elementOrValue.id}</textarea>
                                    </td>
                                    <td class="editable-cell">
                                    ${elementOrValue.todo}
                                        <textarea class="form-control mb-3 d-none" name="todo[]" cols="30" rows="10" placeholder="todo" disabled>${elementOrValue.todo}</textarea>
                                    </td>
                                    <td class="editable-cell">
                                    ${elementOrValue.dokumentasi.map(function (item) {
                        return `${item.nama_dokumentasi}`;
                    }).join('<br>')}
                                        <textarea class="form-control mb-3 d-none" name="dokumentasi[]" cols="30" rows="10" placeholder="dokumentasi" disabled>${elementOrValue.dokumentasi.map(function (item) {
                        return `${item.id},${item.nama_dokumentasi}`;
                    }).join('\n')}</textarea>
                     <textarea class="form-control mb-3 d-none" name="dokumentasi_id[]" cols="30" rows="10" placeholder="dokumentasi_id">${elementOrValue.dokumentasi.map(function (item) {
                        return `${item.id}`;
                    }).join('\n')}</textarea>
                                    </td>

                                </tr >
    `;
                    table.prepend(isiTable);
                });




            }
        });

        // console.log(nama, todo);
        message.closeDialog();
    },


    getPostdataDetail: () => {
        let data = [];


        let tableData = $('table#table-data-detail').find('tbody').find('tr.input-detail');
        $.each(tableData, function () {
            let $this = $(this);
            let id = $this.attr('data-id');
            let nama = $this.find('textarea[name="nama[]"]').val();
            let template_pekerjaan_id = $this.find('textarea[name="template_pekerjaan_id[]"]').val();
            let todo = $this.find('textarea[name="todo[]"]').val();
            let dokumentasi = $this.find('textarea[name="dokumentasi[]"]').val();
            // let dokumentasi_id = $this.find('textarea[name="dokumentasi_id[]"]').val();

            // Memisahkan nilai menjadi array berdasarkan baris baru
            let lines = dokumentasi.split('\n');

            // Loop melalui array dan memisahkan id dan nama_dokumentasi
            let dokumentasiData = lines.map(function (line) {
                let parts = line.split(',');
                return parts[0];
            });

            // // ambil data dokumentasi_id , sama seperti dokuemntasi
            // let lines_id = dokumentasi_id.split('\n');
            // let dokumentasiData_id = lines_id.map(function (line) {
            //     let parts = line.split(',');
            //     return parts[0];
            // });


            data.push({
                id: id,
                template_pekerjaan_id: template_pekerjaan_id,
                nama: nama,
                todo: todo,
                dokumentasi: JSON.stringify(dokumentasiData),
                // dokumentasi_id: JSON.stringify(dokumentasiData_id),
            });
        });
        return data;
    },

    addDetail: (elm, e) => {
        e.preventDefault();
        let tbody = $(elm).closest('tbody');

        let html = `< tr class="input" data_id = "" >
            <td>
                <div class="input-group mb-2">
                    <button class="btn btn-outline-primary" type="button" id="button-addon1"
                        onclick="Schedule.showDataTemplate(this)">Pilih</button>
                    <input id="template" type="text" class="form-control required" error="Template"
                        placeholder="Pilih Data Template" aria-label="Pilih Data Template" aria-describedby="button-addon1"
                        disabled>

                </div>
            </td>
           <td>
                <textarea class="form-control mb-3" name="nama[]" id="nama" cols="30" rows="10" placeholder="nama"></textarea>
            </td>

            <td>
                <textarea class="form-control mb-3" name="todo[]" id="todo" cols="30" rows="10" placeholder="todo"></textarea>
            </td>
            <td>
                <textarea class="form-control mb-3" name="dokumentasi[]" id="dokumentasi" cols="30" rows="10" placeholder="dokumentasi"></textarea>
            </td>
            <td>
                <i class="bx bx-trash" style="cursor: pointer;" onclick="Schedule.deleteDetail(this, event)"></i>
            </td>
        </ > `;
        tbody.prepend(html);
        // console.log(html);
    },

    deleteDetail: (elm, e) => {
        let id = $(elm).closest('tr').attr('data_id');
        if (id == '') {
            $(elm).closest('tr').remove();
        } else {
            $(elm).closest('tr').addClass('hide');
            $(elm).closest('tr').remove();
        }
    },


    hitungJumlahMenit: () => {
        let start = $('#start').val();
        let end = $('#end').val();
        // Konversi waktu mulai dan waktu akhir ke dalam menit
        const [startHour, startMinute] = start.split(':').map(Number);
        const [endHour, endMinute] = end.split(':').map(Number);

        // Hitung selisih waktu dalam menit
        const totalStartMinutes = startHour * 60 + startMinute;
        const totalEndMinutes = endHour * 60 + endMinute;
        const jumlahMenit = totalEndMinutes - totalStartMinutes;

        if (isNaN(jumlahMenit)) {
            $('#menit').val(0);
            return 0;
        }

        $('#menit').val(jumlahMenit);
        return jumlahMenit;
    }

};

$(function () {
    Schedule.getData();
    Schedule.getDataDriver();
    Schedule.getDataTemplate();
    Schedule.select2All();
});
