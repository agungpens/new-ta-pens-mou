let PosisiKaryawan = {
    module: () => {
        return "organisasi/posisi_karyawan";
    },

    moduleApi: () => {
        return `api/${PosisiKaryawan.module()}`;
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(PosisiKaryawan.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(PosisiKaryawan.module()) + "index";
    },

    getData: async () => {
        let tableData = $('table#table-data');

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
                    "url": url.base_url(PosisiKaryawan.moduleApi()) + `getData`,
                    "type": "POST",
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [{
                    "defaultContent": "-",
                    "targets": "_all"
                }],
                "columns": [
                    {
                        "data": "nik",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "nik",
                        "render": (data, type, row, meta) => {
                            return `${data}`;
                        }
                    },
                    {
                        "data": "nama_lengkap",
                    },
                    {
                        "data": "nama_grup",
                    },
                    {
                        "data": "nama_job",
                    },
                    {
                        "data": "nik",
                        render: function (data, type, row, meta) {
                            let htmlAction = '';
                            if(updateAction == '1'){
                                htmlAction += `<i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="PosisiKaryawan.ubah(this)"></i>`;
                                // console.log(data);
                            }
                            if(deleteAction == '1'){
                                htmlAction += `<i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" data_grup="${row.nama_grup}" data_job="${row.nama_job}" onclick="PosisiKaryawan.delete(this, event)"></i>`;
                                // console.log(data);
                            }
                            return htmlAction;
                        },

                    }
                ]
            });
        }
    },

    delete: (elm, e) => {
        e.preventDefault();
        let data_id = $(elm).attr('data_id');
        let data_grup = $(elm).attr('data_grup');
        let data_job = $(elm).attr('data_job');
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan menghapus data job dari karyawan ini ?</p>
        </div>
        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-danger btn-sm" onclick="PosisiKaryawan.deleteConfirm(this, '${data_id}','${data_job}','${data_grup}')">Ya</button>
            <button class="btn btn-secondary btn-sm " onclick="message.closeDialog()">Tidak</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html
        });


    },

    deleteConfirm: (elm, id, job, grup) => {
        let params = {};
        params.id = id;
        params.job = job;
        params.grup = grup;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(PosisiKaryawan.moduleApi()) + "deleteJob",

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

    getPostData: () => {
        let data = {
                'id': $('input#id').val(),
                'job_struktur': $.trim($('#job_struktur').val()),
                'data_karyawan ': $('nik').val()
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = PosisiKaryawan.getPostData();
        let form = $(elm).closest('div.row');
        if(validation.runWithElement(form)){
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(PosisiKaryawan.moduleApi()) + "submit",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function () {
                    message.closeLoading();
                    Toast.error('Informasi',"Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi','Data Berhasil Disimpan');
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


    showDataJobStruktur:(elm)=>{
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(PosisiKaryawan.moduleApi()) + "showDataJobStruktur",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                PosisiKaryawan.getDataJobStruktur();
            }
        });
    },

    getDataJobStruktur: async () => {
        let tableData = $('table#table-data-job');
        // tableData.DataTable().destroy();

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
                    "url": url.base_url(PosisiKaryawan.moduleApi()) + `getDataJobStruktur`,
                    "type": "POST",
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                "columns": [{
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "nama_grup",
                    },
                    {
                        "data": "nama_job",
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `<i class="bx bx-edit" style="cursor: pointer;" nama_job="${row.nama_job}" nama_grup="${row.nama_grup}" data_id="${data}" onclick="PosisiKaryawan.pilihDataJobStruktur(this)"></i>`;
                        }
                    }
                ]
            });
        }
    },

    pilihDataJobStruktur:(elm)=>{
        let id = $(elm).attr('data_id');
        let nama_job = $(elm).attr('nama_job');
        let nama_grup = $(elm).attr('nama_grup');
        $('#job_struktur').val(id+" - "+nama_grup+" - "+nama_job);
        message.closeDialog();
    },


};

$(function () {
    PosisiKaryawan.getData();
    PosisiKaryawan.select2All();
});
