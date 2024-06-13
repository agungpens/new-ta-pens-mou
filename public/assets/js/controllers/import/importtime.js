let ImportTime = {
    module: () => {
        return "karyawan/importtime";
    },

    moduleApi: () => {
        return `api/${ImportTime.module()}`;
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

                if (type_file == 'xls' || type_file == 'xlsx' || type_file == 'csv') {
                    $('#import-group').val(filename);

                    let data = event.target.result;
                    let workbook = XLSX.read(data, {
                        type: 'binary'
                    });

                    // var result = XLSX.utils.sheet_to_json(worksheet, {raw: true});
                    let table = $('#table-data-group-ts').find('tbody');
                    $('#table-data-group-ts').DataTable().destroy();
                    workbook.SheetNames.forEach(function (sheetName) {
                        // Here is your object
                        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        // var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {raw:true});
                        // console.log('XL_row_object',XL_row_object);
                        var json_object = JSON.stringify(XL_row_object);
                        let dataJson = JSON.parse(json_object);
                        $.each(dataJson, function (index, val) {
                            console.log(val);
                            let row = `<tr>
                                <td>${val['no']}</td>
                                <td id="nama-group">${val['nama group ts']}</td>
                                <td id="nik">${val['nik']}</td>
                                <td id="tgl-berlaku">${val['tanggal berlaku']}</td>
                                <td id="jadwal-kerja">${val['nama jadwal kerja karyawan']}</td>
                                <td id="period-awal">${val['periode awal']}</td>
                                <td id="period-akhir">${val['periode akhir']}</td>
                                <td id="nama-periode">${val['nama periode']}</td>
                                <td id="nama">${val['nama']}</td>
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

    ambilDataKaryawan: (elm, e) => {
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
                    $('#import-pernik').val(filename);

                    let data = event.target.result;
                    let workbook = XLSX.read(data, {
                        type: 'binary'
                    });

                    // var result = XLSX.utils.sheet_to_json(worksheet, {raw: true});
                    let table = $('#table-data-import-pernik').find('tbody');
                    $('#table-data-import-pernik').DataTable().destroy();
                    workbook.SheetNames.forEach(function (sheetName) {
                        // Here is your object
                        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        var json_object = JSON.stringify(XL_row_object);
                        let dataJson = JSON.parse(json_object);
                        $.each(dataJson, function (index, val) {
                            console.log(val);
                            let row = `<tr>
                                <td>${val['no']}</td>
                                <td id="nik">${val['nik']}</td>
                                <td id="tgl-berlaku">${val['tanggal berlaku']}</td>
                                <td id="jadwal-kerja">${val['nama jadwal kerja karyawan']}</td>
                                <td id="nama">${val['nama']}</td>
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


    getPostInputGroup: () => {
        let table = $('#table-data-group-ts').find('tbody').find('tr');
        let data = [];
        $.each(table, function () {
            let params = {};
            params.nama_group = $(this).find('td#nama-group').text().trim();
            params.nik = $(this).find('td#nik').text().trim();
            params.tanggal_berlaku = $(this).find('td#tgl-berlaku').text().trim();
            params.jadwal_kerja = $(this).find('td#jadwal-kerja').text().trim();
            params.periode_awal = $(this).find('td#period-awal').text().trim();
            params.periode_akhir = $(this).find('td#period-akhir').text().trim();
            params.nama_periode = $(this).find('td#nama-periode').text().trim();
            params.nama = $(this).find('td#nama').text().trim();
            data.push(params);
        });

        return data;
    },

    getPostInputPerNik: () => {
        let table = $('#table-data-import-pernik').find('tbody').find('tr');
        let data = [];
        $.each(table, function () {
            let params = {};
            params.nik = $(this).find('td#nik').text().trim();
            params.tanggal_berlaku = $(this).find('td#tgl-berlaku').text().trim();
            params.jadwal_kerja = $(this).find('td#jadwal-kerja').text().trim();
            params.nama = $(this).find('td#nama').text().trim();
            data.push(params);
        });

        return data;
    },

    importGroup: (elm) => {
        let params = {};
        params.data = ImportTime.getPostInputGroup();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(ImportTime.moduleApi()) + "importGroup",

            beforeSend: () => {
                message.loadingProses('Proses Import Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Import Berhasil');
                    var reload = function () {
                        window.location.reload();
                    };
                    setTimeout(reload, 2000);
                } else {
                    Toast.error('Informasi', resp.message);
                }
            }
        });
    },

    import: (elm) => {
        let params = {};
        params.data = ImportTime.getPostInputPerNik();

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(ImportTime.moduleApi()) + "import",

            beforeSend: () => {
                message.loadingProses('Proses Import Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Import Berhasil');
                    var reload = function () {
                        window.location.reload();
                    };
                    setTimeout(reload, 2000);
                } else {
                    Toast.error('Informasi', resp.message);
                }
            }
        });
    },

    getUploadedData: function (elm) {
        if (window.FileReader) {
            var file_csv = $(elm).get(0).files[0];
            var file_name = file_csv.name;
            var data_from_file = file_csv.name.split('.');

            var type_file = $.trim(data_from_file[data_from_file.length - 1]);

            var setNameFiletoTextInput = $(elm).closest('.input-field').find('.file-path').val(file_name).css({
                'font-size': '12px'
            });
            if (type_file == 'csv') {
                if (file_csv.size <= 512000) {
                    var reader = new FileReader();
                    reader.readAsText(file_csv);

                    reader.onload = function (event) {
                        var data_csv;
                        var csv = event.target.result;
                        var alltextLine = csv.split(/\r\n|\n/);
                        var lines = [];
                        for (var i = 0; i < alltextLine.length; i++) {
                            //   var data = alltextLine[i].split(',');
                            var data = alltextLine[i].split(';');
                            var tarr = [];
                            for (var j = 0; j < data.length; j++) {
                                tarr.push(data[j]);
                            }
                            lines.push(tarr);
                        }
                        data_csv = lines;
                        var csv_data = [];
                        for (var i = 0; i < data_csv.length; i++) {
                            csv_data.push(data_csv[i]);
                        }


                        var data = csv_data;
                        var formData = new FormData();
                        formData.append('data', JSON.stringify(csv_data));

                        $.ajax({
                            type: 'POST',
                            data: formData,
                            dataType: 'json',
                            processData: false,
                            contentType: false,
                            // async: false,
                            url: url.base_url(ImportTime.moduleApi()) + "importCsvGroup",
                            beforeSend: function () {
                                message.loadingProses("Proses Import Data..");
                            },

                            error: function () {
                                Toast.error('Info','Gagal Upload');
                                message.closeLoading();
                            },

                            success: function (resp) {
                                message.closeLoading();
                                if (resp.is_valid) {
                                    Toast.success('Info','Data Berhasil Dimasukkan');
                                } else {
                                    Toast.error('Info',"Gagal");
                                }
                            }
                        });
                    };
                } else {
                    Toast.error('Info','Gagal Upload, Ukuran File Maximal 512 KB');
                    message.closeLoading();
                }
            } else {
                Toast.error('Info','File Harus Berformat csv');
                $(elm).val('');
                message.closeLoading();
            }
        } else {
            toastr.error('FileReader is Not Supported');
            message.closeLoading();
        }
    }
}

$(function () {

})
