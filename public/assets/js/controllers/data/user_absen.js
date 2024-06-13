let latitude = 0;
let longitude = 0;


let UserAbsen = {
    module: () => {
        return "data/user_absen";
    },

    moduleApi: () => {
        return "api/data/user_absen";
    },

    getData: async () => {
        let tableData = $('table#table-data-absensi');

        let db = Database.init();
        db.get('token').then(function (doc) {
            let tokenApi = doc.title;
            // console.log('tokenApi', tokenApi);
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
                    "url": url.base_url(UserAbsen.moduleApi()) + `getData`,
                    "type": "GET",
                    "headers": {
                        'Authorization': `Bearer ${tokenApi}`
                    },
                    complete: function (data) {
                        let response = data.responseJSON;                        
                        // console.log('response', data);
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
                        "targets": 4,
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
                    {
                        "targets": 5,
                        "orderable": false,
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
                            return `<a class='text-primary' href='' onclick="UserAbsen.showFoto(this, event)">${data}</a>`;
                        }
                    },
                    {
                        "data": "nama_departemen",
                        "render": (data, type, row, meta) => {
                            return data.toUpperCase();
                        }
                    },
                    {
                        "data": "nama_pegawai",
                        "render": (data, type, row, meta) => {
                            return data.toUpperCase();
                        }
                    },
                    {
                        "data": "waktu_absen"
                    },
                    {
                        "data": "foto",
                        "render": (data, type, row, meta) => {
                            return `<img onclick="UserAbsen.showFotoByPict(this)" document="${row.no_document}" width="50" heigh="50" src="${data}" class="img-fluid" alt="">`;
                        }
                    },
                ]

            });
        });
    },

    add: () => {
        window.location.href = url.base_url(UserAbsen.module()) + "add";
    },

    back: () => {
        window.location.href = url.base_url(UserAbsen.module()) + "index";
    },

    getPostData: () => {
        let data = {
            'user_login': $.trim($('#user_login').text()),
            'latitude': latitude,
            'longitude': longitude,
            'nama_foto': $('input#upload-foto').val(),
            'foto': $('#source-foto').attr('src')
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = UserAbsen.getPostData();
        if (params.foto == '') {
            toastr.error('Foto Belum Diupload');
            return false;
        }

        if (params.user_login == '') {
            toastr.error('Session Habis Harap Login Kembali');
            return false;
        }
        let db = Database.init();
        db.get('token').then(function (doc) {
            params.tokenApi = doc.title;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(UserAbsen.moduleApi()) + "submit",
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
                    if (typeof resp.is_valid === 'undefined') {
                        bootbox.dialog({
                            message: resp.status == 'Token is Expired' ? 'Session Habis, Silahkan Login Kembali' : resp.status,
                        });
                    }

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

    getUserData: () => {
        let nama_pegawai = $('input#nama_pegawai');
        // console.log('nama_pegawai', nama_pegawai);
        if (nama_pegawai.length > 0) {
            let db = Database.init();
            db.get('user_login').then(function (doc) {
                let user_login = doc.title;
                let params = {};
                params.user_login = user_login;
                Database.getTokenApi(function (tokenApi) {
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        data: params,
                        url: url.base_url('api/user') + "getUserData",
                        headers: {
                            'Authorization': `Bearer ${tokenApi}`
                        },

                        error: function () {
                            toastr.error("Gagal");
                        },

                        success: function (resp) {
                            if (typeof resp.status == 'undefined') {
                                nama_pegawai.val(resp.data.nama_pegawai);
                            } else {
                                bootbox.alert(resp.status == 'Token is Expired' ? 'Session Habis, Silahkan Login Kembali' : resp.status);
                            }
                        }
                    });
                });
            }).then(function (response) {
                // handle response
                // console.log('response', response);
            }).catch(function (err) {
                console.log('err', err);
            });
        }
    },

    showFoto: (elm, e) => {
        e.preventDefault();
        let params = {};
        params.no_document = $.trim($(elm).text());
        Database.getTokenApi(function (token) {
            $.ajax({
                type: 'POST',
                dataType: 'html',
                data: params,
                url: url.base_url(UserAbsen.moduleApi()) + "showFoto",
                headers: {
                    'Authorization': 'Bearer ' + token
                },

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
        });
    },

    showFotoByPict: (elm) => {
        let params = {};
        params.no_document = $.trim($(elm).attr('document'));
        Database.getTokenApi(function (token) {
            $.ajax({
                type: 'POST',
                dataType: 'html',
                data: params,
                url: url.base_url(UserAbsen.moduleApi()) + "showFoto",
                headers: {
                    'Authorization': 'Bearer ' + token
                },

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
        });
    }
};

$(function () {
    UserAbsen.getData();
    UserAbsen.getUserData();
    UserAbsen.initGmap();
});
