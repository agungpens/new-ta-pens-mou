


let TemplatePekerjaan = {
    module: () => {
        return "jadwal-driver/template-pekerjaan";
    },

    moduleApi: () => {
        return `api/${TemplatePekerjaan.module()}`;
    },

    moduleDokumentasi: () => {
        return "jadwal-driver/dokumentasi-driver";
    },

    moduleApiDokumentasi: () => {
        return `api/${TemplatePekerjaan.moduleDokumentasi()}`;
    },

    add: () => {
        window.location.href = url.base_url(TemplatePekerjaan.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(TemplatePekerjaan.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(TemplatePekerjaan.module()) + "index";
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
                    "url": url.base_url(TemplatePekerjaan.moduleApi()) + `getData`,
                    "type": "POST",
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                },
                "columnDefs": [{
                    "targets": 2,
                    "orderable": false,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).addClass('editable-cell');
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
                    "data": "template_pekerjaan_driver_details",
                },
                {
                    "data": "perincian",
                },
                // {
                //     "data": "nama_detail",
                // },
                // {
                //     "data":  "todo",
                // },
                // {
                //     "data": "nama_dokumentasi",
                // },

                {
                    "data": "id",
                    "render": (data, type, row, meta) => {
                        return `
                            <i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="TemplatePekerjaan.ubah(this)"></i>
                            <i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="TemplatePekerjaan.delete(this, event)"></i>`;
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
            <button class="btn btn-primary btn-sm" onclick="TemplatePekerjaan.deleteConfirm(this, '${data_id}')">Ya</button>
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
            url: url.base_url(TemplatePekerjaan.moduleApi()) + "delete",

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
            'data': {
                'id': $('input#id').val(),
                'template': $.trim($('#template').val()),
                // 'perincian': $.trim($('#perincian').val()),
                'perincian': quill.root.innerHTML,

            },
            // jika data_detail 0
            'data_detail': TemplatePekerjaan.getPostdataDetail(),

        };
        return data;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = TemplatePekerjaan.getPostData();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(TemplatePekerjaan.moduleApi()) + "submit",
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

    showDataDokumentasi: (elm, eventid) => {
        let params = {};

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(TemplatePekerjaan.moduleApi()) + "showDataDokumentasi",

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
                TemplatePekerjaan.getDataDokumentasi(eventid);
            }
        });
    },
    getPostdataDetail: () => {
        let data = [];
        let tableData = $('table#table-data-detail tbody tr.input');
        $.each(tableData, function (indexInArray, valueOfElement) {
            let nama_detail = $(this).find('input#nama').val();
            let todo = $(this).find('textarea#todo').val();
            let dokumentasi_id = [];
            let tableDataDokumentasi = $(this).find('table.dokumen tbody.item tr.input-detail');
            $.each(tableDataDokumentasi, function (indexInArray, valueOfElement) {
                let dokumen_id = $(this).find('input#dokumentasi_id').val()
                if (dokumen_id) {
                    dokumentasi_id.push(dokumen_id);
                }
                else {
                    dokumentasi_id.push('');
                }
            });

            data.push({
                'nama_detail': nama_detail,
                'todo': todo,
                'dokumentasi_id': JSON.stringify(dokumentasi_id)
                // 'dokumentasi_id': dokumentasi_id
            })

        });

        // jika data 0 / tidak ada
        if (data.length == 0) {
            data.push({
                'nama_detail': '',
                'todo': '',
                'dokumentasi_id': '[]'
            })
        }

        return data;
    },


    getDataDokumentasi: async (bindText) => {
        let tableData = $('table#table-data-dokumentasi');
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
                    "url": url.base_url(TemplatePekerjaan.moduleApiDokumentasi()) + `getData`,
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
                    "data": "id",
                    "render": (data, type, row, meta) => {
                        return `<i class="bx bx-edit" style="cursor: pointer;" nama="${row.nama_dokumentasi}" data_id="${data}" onclick="TemplatePekerjaan.pilihData(this,${bindText})"></i>`;
                    }
                },
                {
                    "data": "nama_dokumentasi",
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


                ]
            });
        }
    },

    pilihData: (elm, bindID) => {

        let nama = $(elm).attr('nama');
        let id = $(elm).attr('data_id');


        // let i = TemplatePekerjaan.indexDetailDokuemntasi
        let tbody = $(`table#list-dokumentasi${bindID}`).find('tbody.item');

        let html = `<tr class="input-detail" data_id_dokumentasi="">
                            <td >
                            ${nama}
                                <input type="hidden" name="dokumentasi_id" id="dokumentasi_id" value="${id}">
                            </td>
                            <td>
                                <i class="bx bx-trash" style="cursor: pointer;" onclick="TemplatePekerjaan.deleteDetailDokumentasi(this, event)"></i>
                            </td>
                        </tr>
                        `;
        tbody.prepend(html);
        message.closeDialog();






    },

    setTextEditor: () => {
        quill = new Quill('#perincian', {
            placeholder: 'Type Something...',
            modules: { toolbar: true },
            theme: 'snow'
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

    indexDetail: 0,
    addDetail: (elm, e) => {
        e.preventDefault();
        let id = `${TemplatePekerjaan.indexDetail}`;
        let tbody = $(elm).closest('tbody');



        let html = `
        <tr class="input" data_id="">
           <td>
                <input type="text" id="nama" name="nama" error="Nama" class="form-control" placeholder="Nama" value=""/>
            </td>

            <td>
                <textarea id="todo" name="todo" error="todo" class="form-control" rows="5" placeholder="todo"></textarea>
            </td>
            <td>
                <button class="btn btn-secondary btn-sm mb-3" onclick="TemplatePekerjaan.showDataDokumentasi(this, ${id})">Pilih</button>
                <table class="table table-bordered dokumen" id="list-dokumentasi${id}">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="item">
                    </tbody>
                </table>
            </td>
            <td>
           <button class="btn btn-danger btn-sm"onclick="TemplatePekerjaan.deleteDetail(this, event)">
                                    Hapus <i class="bx bx-trash"></i>
                                </button>
            </td>
        </tr>
        `;
        tbody.prepend(html);
        TemplatePekerjaan.indexDetail++;
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
    deleteDetailDokumentasi: (elm, e) => {
        let id = $(elm).closest('tr').attr('data_id_dokumentasi');
        if (id == '') {
            $(elm).closest('tr').remove();
        } else {
            $(elm).closest('tr').addClass('hide');
            $(elm).closest('tr').remove();
        }
    },

    setTextEditor: () => {
        quill = new Quill('#perincian', {
            placeholder: 'Type Something...',
            modules: { toolbar: true },
            theme: 'snow'
        });
    },


};

$(function () {
    TemplatePekerjaan.getData();
    TemplatePekerjaan.setTextEditor();
    TemplatePekerjaan.select2All();
});
