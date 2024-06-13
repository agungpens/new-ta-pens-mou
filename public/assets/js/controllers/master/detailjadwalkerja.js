let DetailJadwalKerja = {
    module: () => {
        return "master/detailjadwalkerja";
    },

    moduleApi: () => {
        return `api/${DetailJadwalKerja.module()}`;
    },

    add: (day = 'senin') => {
        window.location.href = url.base_url(DetailJadwalKerja.module()) + "add?day=" + day;
    },
    
    import: () => {
        window.location.href = url.base_url(DetailJadwalKerja.module()) + "import";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(DetailJadwalKerja.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(DetailJadwalKerja.module()) + "index";
    },

    getData: async () => {
        let tableData = $('table#table-data-detailjadwalkerja');
        // console.log('tableData', tableData);
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
                    "url": url.base_url(DetailJadwalKerja.moduleApi()) + `getData`,
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
                        "targets": 2,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                            $(td).addClass('td-padd');
                            $(td).addClass('action');
                        }
                    },

                    {
                        "targets": 0,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
                            $(td).addClass('text-left');
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
                        "data": "kode",
                    },
                    {
                        "data": "nama",
                    },
                    {
                        "data": "jam_masuk",
                    },
                    {
                        "data": "jam_masuk_awal",
                    },
                    {
                        "data": "jam_masuk_akhir",
                    },
                    {
                        "data": "jam_keluar",
                    },
                    {
                        "data": "jam_keluar_awal",
                    },
                    {
                        "data": "jam_keluar_akhir",
                    },
                    {
                        "data": "hari",
                        "render": (data, type, row, meta) => {
                            let day = '';
                            console.log('data', data);
                            switch (data) {
                                case '1':
                                    day = "Senin";
                                    break;
                                case '2':
                                    day = "Selasa";
                                    break;
                                case '3':
                                    day = "Rabu";
                                    break;
                                case '4':
                                    day = "Kamis";
                                    break;
                                case '5':
                                    day = "Jumat";
                                    break;
                                case '6':
                                    day = "Sabtu";
                                    break;
                                case '7':
                                    day = "Minggu";
                                    break;

                                default:
                                    break;
                            }
                            return day;
                        }
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            if (updateAction == 1) {
                                htmlAction += `<i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="DetailJadwalKerja.ubah(this)"></i>`;
                            }

                            if (deleteAction == 1) {
                                htmlAction += `<i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="DetailJadwalKerja.delete(this, event)"></i>`;
                            }
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
                'id': $('input#id').val(),
                'group': $.trim($('#cb-group').val()),
                'jam_masuk': $.trim($("#jam_masuk").val()),
                'jam_masuk_awal': $.trim($("#jam_masuk_awal").val()),
                'jam_masuk_akhir': $.trim($("#jam_masuk_akhir").val()),
                'jam_keluar': $.trim($("#jam_keluar").val()),
                'jam_keluar_awal': $.trim($("#jam_keluar_awal").val()),
                'jam_keluar_akhir': $.trim($("#jam_keluar_akhir").val()),
                'hari': $.trim($("#cb-hari").val()),
                // 'keterangan': $.trim($('#keterangan').val()),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = DetailJadwalKerja.getPostData();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(DetailJadwalKerja.moduleApi()) + "submit",
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
            <button class="btn btn-primary btn-sm" onclick="DetailJadwalKerja.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(DetailJadwalKerja.moduleApi()) + "delete",

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
        // Time
        const jam_masuk = document.querySelector('#jam_masuk');
        if (jam_masuk) {
            jam_masuk.flatpickr({
                enableTime: true,
                noCalendar: true
            });
        }

        const jam_masuk_awal = document.querySelector('#jam_masuk_awal');
        if (jam_masuk_awal) {
            jam_masuk_awal.flatpickr({
                enableTime: true,
                noCalendar: true
            });
        }

        const jam_masuk_akhir = document.querySelector('#jam_masuk_akhir');
        if (jam_masuk_akhir) {
            jam_masuk_akhir.flatpickr({
                enableTime: true,
                noCalendar: true
            });
        }

        const jam_keluar = document.querySelector('#jam_keluar');
        if (jam_keluar) {
            jam_keluar.flatpickr({
                enableTime: true,
                noCalendar: true
            });
        }

        const jam_keluar_awal = document.querySelector('#jam_keluar_awal');
        if (jam_keluar_awal) {
            jam_keluar_awal.flatpickr({
                enableTime: true,
                noCalendar: true
            });
        }

        const jam_keluar_akhir = document.querySelector('#jam_keluar_akhir');
        if (jam_keluar_akhir) {
            jam_keluar_akhir.flatpickr({
                enableTime: true,
                noCalendar: true
            });
        }
    },

    ambilDataGroup: (elm, e) => {
        var uploader = $('<input type="file" />');
        uploader.click();

        uploader.on("change", function () {
            var reader = new FileReader();          
            reader.onload = function (event) {
                var files = $(uploader).get(0).files[0];
                var filename = files.name;
                var data_from_file = filename.split(".");
                var type_file = $.trim(data_from_file[data_from_file.length - 1]);

                if (type_file == 'xls' || type_file == 'xlsx') {
                    $('#import-group').val(filename);
                    
                    let data = event.target.result;
                    let workbook = XLSX.read(data, {type: 'binary'});
                    
                    // var result = XLSX.utils.sheet_to_json(worksheet, {raw: true});
                    let table = $('#table-data-jam').find('tbody');
                    $('#table-data-jam').DataTable().destroy();
                    workbook.SheetNames.forEach(function(sheetName) {
                        // Here is your object
                        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        var json_object = JSON.stringify(XL_row_object);
                        let dataJson = JSON.parse(json_object);
                        // console.log(dataJson);
                        $.each(dataJson, function(index, val){
                            console.log(val);
                            let row = `<tr>
                                <td id="kode-jadwal">${val['Kode']}</td>
                                <td id="ket-jadwal">${val['Keterangan']}</td>
                                <td id="shift">${val['Status Shift']}</td>
                                <td id="jam_masuk">${val['Jam Masuk']}</td>
                                <td id="jam_masuk_awal">${val['Jam Masuk Awal']}</td>
                                <td id="jam_masuk_akhir">${val['Jam Masuk Akhir']}</td>
                                <td id="jam_keluar">${val['Jam Keluar']}</td>
                                <td id="jam_keluar_awal">${val['Jam Keluar Awal']}</td>
                                <td id="jam_keluar_akhir">${val['Jam Keluar Akhir']}</td>
                                <td id="hari">${val['Hari']}</td>
                            </tr>`;
                            table.append(row);
                        });                     
                    })
                    
                } else {
                    bootbox.dialog({
                        message: "File Harus Berupa Gambar Bertipe XLXS, XLS",
                    });                    
                }
            };

            reader.readAsBinaryString(uploader[0].files[0]);
        });
    },

    getPostInputGroup:()=>{
        let table = $('#table-data-jam').find('tbody').find('tr');
        let data = [];
        $.each(table, function () { 
            let params = {};
            params.kode = $(this).find('td#kode-jadwal').text().trim();
            params.ket = $(this).find('td#ket-jadwal').text().trim();
            params.shift = $(this).find('td#shift').text().trim();
            params.jam_masuk = $(this).find('td#jam_masuk').text().trim();
            params.jam_masuk_awal = $(this).find('td#jam_masuk_awal').text().trim();
            params.jam_masuk_akhir = $(this).find('td#jam_masuk_akhir').text().trim();
            params.jam_keluar = $(this).find('td#jam_keluar').text().trim();
            params.jam_keluar_awal = $(this).find('td#jam_keluar_awal').text().trim();
            params.jam_keluar_akhir = $(this).find('td#jam_keluar_akhir').text().trim();
            params.hari = $(this).find('td#hari').text().trim();
            data.push(params);
        });

        return data;
    },

    importGroup:(elm)=>{
        let params = {};
        params.data = DetailJadwalKerja.getPostInputGroup();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(DetailJadwalKerja.moduleApi()) + "importGroup",

            beforeSend: () => {
                message.loadingProses('Proses Import Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if(resp.is_valid){
                    Toast.success('Informasi', 'Import Berhasil');
                    var reload = function(){
                        window.location.reload();
                    };
                    setTimeout(reload, 2000);
                }else{
                    Toast.error('Informasi', resp.message);
                }
            }
        });
    },
}

$(function () {
    DetailJadwalKerja.getData()
    DetailJadwalKerja.select2All()
    DetailJadwalKerja.setDate();
})
