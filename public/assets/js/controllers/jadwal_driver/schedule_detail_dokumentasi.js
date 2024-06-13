

let ScheduleDetailDokumentasi = {
    module: () => {
        return "jadwal-driver/schedule-detail-dokumentasi";
    },

    moduleApi: () => {
        return `api/${ScheduleDetailDokumentasi.module()}`;
    },
    moduleScheduleDetail: () => {
        return "jadwal-driver/schedule-detail";
    },

    moduleScheduleDetailApi: () => {
        return `api/${ScheduleDetailDokumentasi.moduleScheduleDetail()}`;
    },

    add: () => {
        window.location.href = url.base_url(ScheduleDetailDokumentasi.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(ScheduleDetailDokumentasi.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(ScheduleDetailDokumentasi.module()) + "index";
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
                    "url": url.base_url(ScheduleDetailDokumentasi.moduleApi()) + `getData`,
                    "type": "POST",
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [{
                    "targets": 2,
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
                    "data": "schedule_detail_id",
                },
                {
                    "data": "nama",
                },
                {
                    "data": "type_input",
                },
                {
                    "data": "input_rel",
                },
                {
                    "data": "select_option",
                },
                {
                    "data": "value",
                },
                {
                    "data": "id",
                    "render": (data, type, row, meta) => {
                        return `
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="ScheduleDetailDokumentasi.ubah(this)"></i>
                            <i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="ScheduleDetailDokumentasi.delete(this, event)"></i>`;
                    }
                }
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
            <button class="btn btn-primary btn-sm" onclick="ScheduleDetailDokumentasi.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(ScheduleDetailDokumentasi.moduleApi()) + "delete",

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
                'schedule_detail_id': $.trim($('#schedule_detail_id').val()),
                'nama': $.trim($('#nama').val()),
                'type_input': $.trim($('#type_input').val()),
                'input_rel': $.trim($('#input_rel').val()),
                'select_option': $.trim($('#select_option').val()),
                'value': $.trim($('#value').val()),
            },
        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = ScheduleDetailDokumentasi.getPostData();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(ScheduleDetailDokumentasi.moduleApi()) + "submit",
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





    showDataScheduleDetail: (elm) => {
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(ScheduleDetailDokumentasi.moduleApi()) + "showDataScheduleDetail",

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
                ScheduleDetailDokumentasi.getDataScheduleDetail();
            }
        });
    },

    getDataScheduleDetail: async () => {
        let tableData = $('table#table-data-shceduleDetail');
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
                    "url": url.base_url(ScheduleDetailDokumentasi.moduleScheduleDetailApi()) + `getData`,
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
                    "data": "id",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    "data": "schedule_id",
                },
                {
                    "data": "template",
                },
                {
                    "data": "template_pekerjaan_nama",
                },
                {
                    "data": "template_pekerjaan_todo",
                },
                {
                    "data": "schedule_detail_dokumentasi_ids",
                },
                {
                    "data": "id",
                    "render": (data, type, row, meta) => {
                        return `<i class="bx bx-edit" style="cursor: pointer;" template_pekerjaan_nama="${row.template_pekerjaan_nama}" data_id="${data}" onclick="ScheduleDetailDokumentasi.pilihData(this)"></i>`;
                    }
                }
                ]
            });
        }
    },

    pilihData: (elm) => {
        let template_pekerjaan_nama = $(elm).attr('template_pekerjaan_nama');
        let id = $(elm).attr('data_id');
        $('#schedule_detail_id').val(id + " - " + template_pekerjaan_nama);
        message.closeDialog();
    },

    setNik: (elm, e) => {
        let schedule_detail_id = $(elm).is(':checked') ? $(elm).attr('schedule_detail_id') : '';
        $('#schedule_detail_id').val(schedule_detail_id);
    },


};

$(function () {
    ScheduleDetailDokumentasi.getData();
    ScheduleDetailDokumentasi.getDataScheduleDetail();
});
