let latitude = 0;
let longitude = 0;

let Kegiatan = {
    module: () => {
        return "data/kegiatan";
    },

    moduleApi: () => {
        return `api/${Kegiatan.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(Kegiatan.module()) + "add";
    },

    back: () => {
        window.location.href = url.base_url(Kegiatan.module()) + "index";
    },

    initGmap: () => {
        GMaps.geolocate({
            success: function (position) {
                // console.log('position', position);
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
                // map.setCenter(position.coords.latitude, position.coords.longitude);
            },
            error: function (error) {
                alert('Geolocation failed: ' + error.message);
            },
            not_supported: function () {
                alert("Your browser does not support geolocation");
            },
            always: function () {
                // alert("Done!");
            }
        });
    },

    getData: async () => {
        let tableData = $('table#table-data-kegiatan');

        if (tableData.length > 0) {
            let db = Database.init();
            db.get('token').then(function (doc) {
                let tokenApi = doc.title;
                return tableData.DataTable({
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
                        "url": url.base_url(Kegiatan.moduleApi()) + `getData`,
                        "type": "GET",
                        "headers": {
                            'Authorization': `Bearer ${tokenApi}`
                        },
                        complete: function (data) {
                            let response = data.responseJSON;  
                            // console.log('data', data);                      
                            if(typeof response.status !== 'undefined'){
                                bootbox.alert(response.status == 'Token is Expired' ? 'Session Habis Silakan Login Kembali' : response.message);
                            }
                        }
                    },
                    "deferRender": true,
                    "createdRow": function (row, data, dataIndex) {
                        // console.log('row', $(row));
                    },
                    "columnDefs": [{
                            "targets": 7,
                            "orderable": false,
                            "createdCell": function (td, cellData, rowData, row, col) {
                                // $(td).addClass('text-center');
                                $(td).addClass('td-padd');
                                // $(td).addClass('action');
                            }
                        },
                        {
                            "targets": 6,
                            "orderable": false,
                            "createdCell": function (td, cellData, rowData, row, col) {
                                $(td).addClass('td-padd');
                            }
                        },
                        {
                            "targets": 5,
                            "orderable": false,
                            "createdCell": function (td, cellData, rowData, row, col) {
                                $(td).addClass('td-padd');
                            }
                        },
                        {
                            "targets": 4,
                            "orderable": false,
                            "createdCell": function (td, cellData, rowData, row, col) {
                                $(td).addClass('td-padd');
                            }
                        },
                        {
                            "targets": 3,
                            "orderable": false,
                            "createdCell": function (td, cellData, rowData, row, col) {
                                $(td).addClass('td-padd');
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
                            "data": "no_document",
                            "render": function (data, type, row, meta) {
                                return `<a class='text-primary' href='' onclick="Kegiatan.detail(this, event)">${data}</a>`;
                            }
                        },
                        {
                            "data": "tanggal",
                            "render": (data, type, row, meta) => {
                                return data;
                            }
                        },
                        {
                            "data": "lokasi",
                            "render": (data, type, row, meta) => {
                                return data;
                            }
                        },
                        {
                            "data": "tim",
                            "render": (data, type, row, meta) => {
                                return data;
                            }
                        },
                        {
                            "data": "nama_kabupaten"
                        },
                        {
                            "data": "nama_kecamatan"
                        },
                        {
                            "data": "pasar"
                        },
                        // {
                        //     "render": (data, type, row, meta) => {
                        //         return "-";
                        //     }
                        // }
                    ]
                });
            });
        }
    },

    takeFoto: (elm, e) => {
        e.preventDefault();
        var uploader = $('<input type="file" accept="image/*;capture=camera" />');
        var src_foto = $("#source-foto");
        uploader.click();

        uploader.on("change", function () {
            var reader = new FileReader();
            reader.onload = function (event) {
                var files = $(uploader).get(0).files[0];
                filename = files.name;
                var data_from_file = filename.split(".");
                var type_file = $.trim(data_from_file[data_from_file.length - 1]);
                $('input#upload-foto').val(filename);

                var data = event.target.result;
                src_foto.attr("src", data);

                // var data_source = data.split(';');
                // console.log(data_source[1].length);
                src_foto.removeClass("hide");
            };

            reader.readAsDataURL(uploader[0].files[0]);
        });
    },

    getPostData: () => {
        let data = {
            'user_login': $.trim($('#user_login').text()),
            'latitude': latitude,
            'longitude': longitude,
            'tanggal': $('input#tanggal').val(),
            'lokasi': $('input#lokasi').val(),
            'provinsi': $('select#provinsi').val(),
            'kabupaten': $('select#kabupaten').val(),
            'kecamatan': $('select#kecamatan').val(),
            'tim': $('input#tim').val(),
            'pasar': $('input#pasar').val(),
            'pic': $('select#pic').val(),
            'jml_tempe_goreng': $('input#jml_tempe_goreng').val(),
            'jml_pengunjung': $('input#jml_pengunjung').val(),
            'nama_foto': $('input#upload-foto').val(),
            'foto': $('#source-foto').attr('src')
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Kegiatan.getPostData();
        if (params.foto == '') {
            toastr.error('Foto Belum Diupload');
            return false;
        }

        if (params.user_login == '') {
            toastr.error('Session Habis Harap Login Kembali');
            return false;
        }

        if (validation.run()) {
            let db = Database.init();
            db.get('token').then(function (doc) {
                params.tokenApi = doc.title;
                $.ajax({
                    type: 'POST',
                    dataType: 'json',
                    data: params,
                    url: url.base_url(Kegiatan.moduleApi()) + "submit",
                    headers: {
                        'Authorization': `Bearer ${params.tokenApi}`
                    },
                    beforeSend: () => {
                        message.loadingProses('Proses Simpan Data...');
                    },
                    error: function () {
                        message.closeLoading();
                        toastr.error("Gagal");
                    },

                    success: function (resp) {
                        message.closeLoading();
                        if (resp.is_valid) {
                            toastr.success('Data Berhasil Disimpan');
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
            });
        }
    },

    getListKabupaten: (elm) => {
        let provinsi = $(elm).val();
        let kabupaten = $('select#kabupaten').find('option');
        $.each(kabupaten, function () {
            $(this).removeClass('hide');
        });

        if (provinsi != '') {
            $.each(kabupaten, function () {
                if ($(this).attr('provinsi') != provinsi) {
                    $(this).addClass('hide');
                }
            });
        }
    },

    getListKecamatan: (elm) => {
        let kabupaten = $(elm).val();
        let kecamatan = $('select#kecamatan').find('option');
        $.each(kecamatan, function () {
            $(this).removeClass('hide');
        });

        if (kabupaten != '') {
            $.each(kecamatan, function () {
                if ($(this).attr('kabupaten') != kabupaten) {
                    $(this).addClass('hide');
                }
            });
        }
    },

    setDate: function () {
        if ($('input#tanggal').length > 0) {
            $('input#tanggal').datepicker({
                format: 'yyyy-mm-dd',
                todayHighlight: true,
                autoclose: true,
                startDate: new Date(),
            });
        }
    },

    detail: (elm, e) => {
        e.preventDefault();
        let params = {};
        params.no_document = $.trim($(elm).text());
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Kegiatan.moduleApi()) + "detail",

            error: function () {
                toastr.error("Gagal");
            },

            success: function (resp) {
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
            }
        });
    },

    isiKuisoner:(elm)=>{
        window.location.href = $(elm).attr('href');
    }

};

$(function () {
    Kegiatan.getData();
    Kegiatan.initGmap();
    Kegiatan.setDate();
});
