let Lowongan = {
    constructor: (tableRecruitment) => {
        this.tableRecruitment = tableRecruitment
    },
    module: () => {
        return "karyawan/lowongan";
    },

    moduleApi: () => {
        return `api/${Lowongan.module()}`;
    },

    changeStatus: (elm) => {
        let status = $(elm).data('status');

        window.location.href = `?status=${status}`;
    },

    add: () => {
        window.location.href = url.base_url(Lowongan.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Lowongan.module()) + "ubah?id=" + data_id;
    },

    reportlowongan: (elm) => {
        // let id = $(elm).data('id');
        // let step = $(elm).data('step');
        let params = {
            'id': $(elm).attr("data_id"),
            'posisi': $(elm).data("posisi"),
            'departemen': $(elm).data("departemen"),
        };
        // console.log(params);
        // return params;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "reportlowongan",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'x-large'
                });
                $('.modal').animate({ scrollTop: 0 }, 500, 'swing');
                // Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

                let tableData = $('table#tbl_report');
                if (tableData.length > 0) {
                    tableData.DataTable({
                        dom:
                            '<"row mx-2"' +
                            '<"col-md-2"<"me-3"l>>' +
                            '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
                            '>t' +
                            '<"row mx-2"' +
                            '<"col-sm-12 col-md-6"i>' +
                            '<"col-sm-12 col-md-6"p>' +
                            '>',
                        'buttons': [
                            {
                                extend: 'collection',
                                className: 'btn btn-label-secondary dropdown-toggle mx-3',
                                text: '<i class="bx bx-upload me-2"></i>Export',
                                buttons: [
                                    // {
                                    //     extend: 'csv',
                                    //     text: '<i class="bx bx-file me-2" ></i>Csv',
                                    //     className: 'dropdown-item',
                                    //     exportOptions: { columns: [2, 3, 4, 5] }
                                    // },
                                    {
                                        extend: 'excel',
                                        text: '<i class="bx bx-spreadsheet me-2"></i> Excel',
                                        className: 'dropdown-item',
                                        title: 'Report Applicant per Step ' + moment(new Date()).format("DD-MM-YYYY")
                                    },
                                    // {
                                    //     extend: 'copy',
                                    //     text: '<i class="bx bx-copy me-2" ></i>Copy',
                                    //     className: 'dropdown-item',
                                    //     exportOptions: { columns: [2, 3, 4, 5] }
                                    // }
                                ]
                            },
                        ],
                    });
                    $('#proses_rekrutmen').change(function () {
                        let val = $(this).val();
                        tableData.DataTable().column(3).search(val).draw();
                    })
                    $('#nama_applicant').change(function () {
                        let val = $(this).val();
                        tableData.DataTable().column(1).search(val).draw();
                    })
                }
                $('#btn-clear').click(function () {
                    // console.log('clicked');
                    $('#proses_rekrutmen').val(null).trigger('change');
                    $('#nama_applicant').val(null).trigger('change');
                })

            }
        });
    },
    applicantList: (elm) => {
        let params = {
            'id': $(elm).attr("data_id"),
            'posisi': $(elm).data("posisi"),
            'departemen': $(elm).data("departemen"),
        };

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "applicantList",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'x-large'
                });
                $('.modal').animate({ scrollTop: 0 }, 500, 'swing');
                // Lowongan.setDate();
                Lowongan.getApplicantList($(elm).attr("data_id"));
            }
        });
    },



    unprocessed: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Lowongan.module()) + "unprocessed?id=" + data_id;
    },
    shortlist: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Lowongan.module()) + "shortlist?id=" + data_id;
    },
    technical_test: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Lowongan.module()) + "technical_test?id=" + data_id;
    },
    interview_hc: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Lowongan.module()) + "interview_hc?id=" + data_id;
    },
    interview_user: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Lowongan.module()) + "interview_user?id=" + data_id;
    },

    initial_offering_letter: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Lowongan.module()) + "initial_offering_letter?id=" + data_id;
    },

    hasilInterview: (elm) => {
        // let id = $(elm).data('id');
        // let step = $(elm).data('step');
        let params = {
            'id': $(elm).data('id'),
            'step': $(elm).data('step'),
        };
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "hasilInterview",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                $('.modal').animate({ scrollTop: 0 }, 500, 'swing');
                // Lowongan.setDate();
                // Lowongan.select2All();
                Lowongan.editor();
            }
        });
    },
    psychotest: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Lowongan.module()) + "psikotes?id=" + data_id;
    },
    medical_check_up: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Lowongan.module()) + "medical_check_up?id=" + data_id;
    },
    offering_letter: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Lowongan.module()) + "offering_letter?id=" + data_id;
    },

    onboarding_preparation: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Lowongan.module()) + "onboarding_preparation?id=" + data_id;
    },

    onboarding: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Lowongan.module()) + "onboarding?id=" + data_id;
    },


    hasilPsikotes: (elm) => {
        // let id = $(elm).data('id');
        // let step = $(elm).data('step');
        let params = {
            'id': $(elm).data('id'),
            'step': $(elm).data('step'),
        };
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "hasilPsikotes",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                $('.modal').animate({ scrollTop: 0 }, 500, 'swing');
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();
            }
        });
    },
    hasilmcu: (elm) => {
        // let id = $(elm).data('id');
        // let step = $(elm).data('step');
        let params = {
            'id': $(elm).data('id'),
            'step': $(elm).data('step'),
        };
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "hasilmcu",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                $('.modal').animate({ scrollTop: 0 }, 500, 'swing');
                Lowongan.editor();

                setTimeout(function () {
                    tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
                    $('.hasilmcu').click(function () {
                        if ($('#fitwithnote').is(':checked')) {
                            tinymce.activeEditor.getBody().setAttribute('contenteditable', true);
                        } else {
                            tinymce.activeEditor.setContent('');
                            tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
                        }
                    })
                }, 500);
            }
        });
    },
    hasilol: (elm) => {
        // let id = $(elm).data('id');
        // let step = $(elm).data('step');
        let params = {
            'id': $(elm).data('id'),
            'step': $(elm).data('step'),
        };
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "hasilol",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                $('.modal').animate({ scrollTop: 0 }, 500, 'swing');
                // Lowongan.editor();

                // setTimeout(function () {
                //     tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
                //     $('.hasilmcu').click(function(){
                //         if($('#fitwithnote').is(':checked')){
                //             tinymce.activeEditor.getBody().setAttribute('contenteditable', true);
                //         }else{
                //             tinymce.activeEditor.setContent('');
                //             tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
                //         }
                //     })
                // }, 500);
            }
        });
    },
    hasilonboarding: (elm) => {
        // let id = $(elm).data('id');
        // let step = $(elm).data('step');
        let params = {
            'id': $(elm).data('id'),
            'step': $(elm).data('step'),
        };
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "hasilonboarding",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                $('.modal').animate({ scrollTop: 0 }, 500, 'swing');

                // $('.flatpickr-input').css('background-color','#e9ecee!important')
                // $('.enabler').click(function(){
                //     if($(this).is(':checked')){
                //         console.log($(this).parent().parent().find('input').attr('disabled',false));
                //         $(this).parent().parent().find('input[type=text]').prop('disabled',false);
                //         $(this).parent().parent().find('.flatpickr').css('background-color','#fff')
                //         $(this).parent().parent().css('background-color','#fff')
                //         Lowongan.setDate();
                //     }else{
                //         $(this).parent().parent().find('input[type=text]').prop('disabled',true);
                //         $(this).parent().parent().find('.flatpickr').css('background-color','#e9ecee')
                //         $(this).parent().parent().css('background-color','#e9ecee')
                //     }
                // })


            }
        });
    },

    applicantDetails: (elm) => {
        let params = {
            'id': $(elm).data('id'),
            'lowongan_id': $(elm).data('lowongan_id'),
        };
        // console.log(params);
        // return params;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "applicantDetails",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function (e) {
                message.closeLoading();
                console.log(e)
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                $('.modal').animate({ scrollTop: 0 }, 500, 'swing');
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();
            }
        });
    },

    nextStep: (elm) => {
        let id = $(elm).data('id');
        let params = {
            'id': id
        };
        // return params;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "nextStep",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

            }
        });
    },

    nextStepManager: (elm) => {

        let id = $(elm).data('id');

        let html = `
            <div class="row g-3">
                <div class="col-12">
                    <h5 class="py-3 breadcrumb-wrapper mb-4">
                        <span class="text-muted fw-light">Yakin untuk melanjutkan?</span>
                    </h5>
                </div>
            </div>

            <div class="row g-3">
                <div class="col-12 text-center">
                    <button onclick="message.closeDialog()"
                            class="btn btn-secondary btn-next">
                            Batal
                    </button>
                    <button onclick="Lowongan.nextStepManagerSubmit(${id})"
                            class="btn btn-danger btn-next">
                            Lanjutkan
                    </button>
                </div>
            </div>
        `;
        bootbox.dialog({
            message: html,
            size: 'small'
        });
    },

    nextStepManagerSubmit: (id) => {

        // let id = $(elm).data('id');
        let params = {
            'id': id
        };
        // console.log(params);
        // return params;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "nextStepManager",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();

                let response = JSON.parse(resp)
                if (response.is_valid) {
                    Toast.success('Informasi', 'Data Berhasil Disimpan');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    bootbox.dialog({
                        message: response.message
                    });
                }

            }
        });
    },

    filter: () => {
        if ($('#urut1').val().length == 0) {
            $('#urut1dir').val('').trigger('change');
        }
        if ($('#urut2').val().length == 0) {
            $('#urut2dir').val('').trigger('change');
        }
        if ($('#urut3').val().length == 0) {
            $('#urut3dir').val('').trigger('change');
        }

        if ($('#urut1').val().length > 0 && $('#urut1dir').val().length == 0) {
            $('#urut1dir').val('asc').trigger('change');
        }
        if ($('#urut2').val().length > 0 && $('#urut2dir').val().length == 0) {
            $('#urut2dir').val('asc').trigger('change');
        }
        if ($('#urut3').val().length > 0 && $('#urut3dir').val().length == 0) {
            $('#urut3dir').val('asc').trigger('change');
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: {
                id: $('#id').val(),
                urut1: $('#urut1').val() ?? null,
                urut1: $('#urut1').val() ?? null,
                urut2: $('#urut2').val() ?? null,
                urut3: $('#urut3').val() ?? null,
                urut1dir: $('#urut1dir').val() ?? null,
                urut2dir: $('#urut2dir').val() ?? null,
                urut3dir: $('#urut3dir').val() ?? null,
            },
            url: url.base_url(Lowongan.moduleApi()) + "filter",
            beforeSend: () => {
                message.loadingProses('Proses Simpan Data...');
            },
            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                // console.log(resp);

                message.closeLoading();
                $('#applicants').empty();
                $.each(resp, function (i, v) {
                    let showbtn = ``

                    if (v.lamaran_status == 'NOT OK') {
                        showbtn = `<div class="col-sm-6">
                                        <button type="button" class="btn btn-secondary" disabled>
                                            REJECTED
                                        </button>
                                    </div>`;
                    } else {
                        showbtn = `<div class="col-sm-6">
                                        <div class="d-grid gap-2">
                                            <button class="btn btn-danger" data-currentstep="null" data-id="${v.master_id}" onclick="Lowongan.rejectApplicant(this,event)">
                                                Reject <i class='bx bx-x-circle'></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="d-flex align-items-center border rounded px-2 py-1" style="padding-top: 0.4rem!important">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="${v.master_id}" id="applicant-${v.master_id}">
                                                <label class="form-check-label" style="user-select: none" for="applicant-${v.master_id}">
                                                SHORTLIST
                                                </label>
                                            </div>
                                        </div>
                                    </div>`;
                    }

                    $('#applicants').append(
                        `<div class="col-md-6 col-lg-4 mb-3 app-card">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${_.startCase(_.lowerCase(v.nama))}</h5>
                                    <p class="card-text">
                                        <span>${v.nama_pendidikan}</span><br>
                                        <span>${v.umur}</span><br>
                                        <span>${v.jabatan} (${v.pengalaman_kerja})</span>
                                    </p>
                                </div>
                                <div class="row p-3">
                                    <div class="col-sm-12 mb-2">
                                        <div class="d-grid gap-2">
                                            <button class="btn btn-info" data-lowongan_id="${v.master_id}" data-id="${v.applicant_id}" onclick="Lowongan.applicantDetails(this)">
                                                See Applicant Details
                                            </button>
                                        </div>
                                    </div>
                                    ${showbtn}
                                </div>
                            </div>
                        </div>`
                    )
                    Lowongan.setCardPagination()
                });

            }
        });

    },

    backDataLowongan: () => {
        window.location.href = url.base_url(Lowongan.module()) + "data";
    },

    back: () => {
        window.location.href = url.base_url(Lowongan.module());
    },

    getDataOld: async () => {
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
                    "url": url.base_url(Lowongan.moduleApi()) + `getData`,
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
                    "targets": 7,
                    "orderable": false,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).addClass('text-center');
                        $(td).addClass('td-padd');
                        $(td).addClass('action');
                    }
                },
                {
                    "targets": [1, 2, 3, 4, 5, 6],
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
                "columns": [
                    {
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "permintaan_personel",
                    },
                    {
                        "data": "inputdate",
                    },
                    {
                        "data": "nama_departemen",
                    },
                    {
                        "data": "nama_jabatan",
                    },
                    {
                        "data": "posisi",
                    },
                    {
                        "data": "status",
                        render: function (data, type, row, meta) {
                             console.log(data)
                            if (data == 1) {
                                return `<span class="badge bg-label-success">POSTED</span>`;
                            }
                            if (data == 0) {
                                return `<span class="badge bg-label-secondary">CLOSED</span>`;
                            }
                        }
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            // if (approveAction == '1') {
                            // }
                            htmlAction += `<i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="Lowongan.ubah(this)"></i>`;
                            htmlAction += `<i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="Lowongan.delete(this, event)"></i>`;

                            return htmlAction;
                        }
                    }
                ]
            });
        }
    },

    getData: async () => {
        let tableData = $('table#table-data');
        tableData.DataTable().destroy();

        let params              = {}
        params.status           = $('#status').val()
        params.departemen       = $('#departemen').val()

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
                    "url": url.base_url(Lowongan.moduleApi()) + `getData`,
                    "type": "POST",
                    "data" : params,
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
                {
                    "targets": [ 2, 3, 4, 5, 6 ,7],
                    "orderable": false,
                },
                {
                    "targets": 0,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        $(td).addClass('text-center');
                    }
                },
                ],
                "columns": [
                    {
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            let htmlAction = '';
                            htmlAction += `<button class="btn btn-warning"  data_id="${data}" onclick="Lowongan.ubah(this)"><i class="bx bx-edit"></i></button>`;
                            // htmlAction += `<i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="Lowongan.delete(this, event)"></i>`;

                            return htmlAction;
                        }
                    },
                    {
                        "data": "permintaan_personel",
                    },
                    {
                        "data": "inputdate",
                    },
                    {
                        "data": "status",
                        render: function (data, type, row, meta) {
                            if (data == 2) {
                                return `<span class="badge bg-label-warning">DRAF</span>`;
                            }
                            if (data == 1) {
                                return `<span class="badge bg-label-success">OPEN</span>`;
                            }
                            if (data == 0) {
                                return `<span class="badge bg-label-secondary">CLOSED</span>`;
                            }
                        }
                    },
                    {
                        "data": "nama_departemen",
                    },
                    {
                        "data": "nama_jabatan",
                    },
                    {
                        "data": "posisi",
                    },
                ]
            });
        }
    },

    // getApplicantList_old: async (lowongan_id) => {
    //     let tableData = $('table#tbl_reportlowongan');
    //     console.log(lowongan_id);

    //     if (tableData.length > 0) {
    //         tableData.DataTable({
    //             "processing": true,
    //             "serverSide": true,
    //             "ordering": true,
    //             "autoWidth": false,
    //             "order": [
    //                     [0, 'desc']
    //                 ],
    //                 "ajax": {
    //                     "url": url.base_url(Lowongan.moduleApi()) + `getApplicationList`,
    //                     "type": "POST",
    //                     "data":{
    //                         'lowongan_id':lowongan_id
    //                     }
    //                     // "headers": {
    //                     //     'X-CSRF-TOKEN': `'${tokenApi}'`
    //                     // }
    //                 },
    //                 "deferRender": true,
    //                 "createdRow": function (row, data, dataIndex) {
    //                   console.log('row', $(row));
    //                 },
    //                 "columnDefs": [
    //                 {
    //                     "targets": [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14],
    //                     "orderable": false,
    //                     "createdCell": function (td, cellData, rowData, row, col) {
    //                         $(td).addClass('td-padd');
    //                     }
    //                 },
    //                 {
    //                     "targets": 0,
    //                     "createdCell": function (td, cellData, rowData, row, col) {
    //                         $(td).addClass('td-padd');
    //                         $(td).addClass('text-center');
    //                     }
    //                 },
    //             ],
    //             "columns": [
    //                 {
    //                     "data": "id",
    //                     render: function (data, type, row, meta) {
    //                         return meta.row + meta.settings._iDisplayStart + 1;
    //                     }
    //                 },
    //                 {
    //                     "data": "name",
    //                 },
    //                 {
    //                     "data": "tanggal_lahir",
    //                 },
    //                 {
    //                     "data": "alamat_ktp",
    //                 },
    //                 {
    //                     "data": "nama_provinsi",
    //                 },
    //                 {
    //                     "data": "nama_kabupaten",
    //                 },
    //                 {
    //                     "data": "nama_kecamatan",
    //                 },
    //                 {
    //                     "data": "no_telp",
    //                 },
    //                 {
    //                     "data": "email",
    //                 },
    //                 {
    //                     "data": "strata",
    //                 },
    //                 {
    //                     "data": "nama_pendidikan",
    //                 },
    //                 {
    //                     "data": "jurusan",
    //                 },
    //                 {
    //                     "data": "nilai",
    //                 },
    //                 {
    //                     "data": "nama_perusahaan",
    //                 },
    //                 {
    //                     "data": "alamat",
    //                 },
    //                 {
    //                     "data": "jabatan",
    //                 },
    //                 {
    //                     "data": "mulai_bekerja",
    //                 },
    //                 {
    //                     "data": "selesai_bekerja",
    //                 },
    //                 {
    //                     "data": "tinggi_badan",
    //                 },
    //                 {
    //                     "data": "berat_badan",
    //                 },
    //             ],
    //             dom:
    //             '<"row mx-2"' +
    //             '<"col-md-2"<"me-3"l>>' +
    //             '<"col-md-10"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-end flex-md-row flex-column mb-3 mb-md-0"fB>>' +
    //             '>t' +
    //             '<"row mx-2"' +
    //             '<"col-sm-12 col-md-6"i>' +
    //             '<"col-sm-12 col-md-6"p>' +
    //             '>',
    //             'buttons': [
    //                 {
    //                   extend: 'collection',
    //                   className: 'btn btn-label-secondary dropdown-toggle mx-3',
    //                   text: '<i class="bx bx-upload me-2"></i>Export',
    //                   buttons: [
    //                     {
    //                       extend: 'csv',
    //                       text: '<i class="bx bx-file me-2" ></i>Csv',
    //                       className: 'dropdown-item',
    //                     //   exportOptions: { columns: [2, 3, 4, 5] }
    //                     },
    //                     {
    //                       extend: 'excel',
    //                       text: '<i class="bx bx-spreadsheet me-2"></i> Excel',
    //                       className: 'dropdown-item',
    //                     //   exportOptions: { columns: [2, 3, 4, 5] }
    //                     },
    //                     {
    //                       extend: 'pdf',
    //                       text: '<i class="bx bxs-file-pdf me-2"></i>Pdf',
    //                       className: 'dropdown-item',
    //                     //   exportOptions: { columns: [2, 3, 4, 5] }
    //                     },
    //                     {
    //                       extend: 'copy',
    //                       text: '<i class="bx bx-copy me-2" ></i>Copy',
    //                       className: 'dropdown-item',
    //                     //   exportOptions: { columns: [2, 3, 4, 5] }
    //                     }
    //                   ]
    //                 },
    //             ],
    //         });
    //     }
    // },
    getApplicantList: (lowongan_id) => {

        $('#tbl_reportlowongan tbody tr').remove();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data:{
                'lowongan_id':lowongan_id
            },
            url: url.base_url(Lowongan.moduleApi()) + `getApplicationList`,

            beforeSend: () => {
                message.loadingProses('Proses Memuat Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                message.closeLoading();

                resp.forEach((val,i) => {
                    let row = `<tr>
                        <td><button data-id="${val.applicant_id}" data-lowongan_id="${val.id}" onclick="Lowongan.applicantDetails(this)" class="btn btn-info">SHOW</button></td>
                        <td>${val.name}</td>
                        <td>${val.jenis_kelamin}</td>
                        <td>${val.tanggal_lahir}</td>
                        <td>${val.alamat_ktp}</td>
                        <td>${val.nama_provinsi}</td>
                        <td>${val.nama_kabupaten}</td>
                        <td>${val.nama_kecamatan}</td>
                        <td>'${val.no_telp}</td>
                        <td>${val.email}</td>
                        <td>${val.strata}</td>
                        <td>${val.nama_pendidikan}</td>
                        <td>${val.jurusan}</td>
                        <td>${val.nilai}</td>
                        <td>${val.nama_perusahaan ?? ''}</td>
                        <td>${val.alamat ?? ''}</td>
                        <td>${val.jabatan ?? ''}</td>
                        <td>${val.mulai_bekerja ?? ''}</td>
                        <td>${val.selesai_bekerja ?? ''}</td>
                        <td>${val.tinggi_badan ?? ''}</td>
                        <td>${val.berat_badan ?? ''}</td>
                    </tr>`;
                    $('#tbl_reportlowongan tbody').append(row);
                });

                // $('#tbl_reportlowongan').rowspanizer({
                //     vertical_align:'middle',
                //     columns: [0,1,2,3,4,5,6,7,8,9,10,11,17,18]

                // });


            },
        });
    },

    exportApplicant: (ext = 'xlsx', lowongan_id) => {

        var data = document.getElementById('tbl_reportlowongan');
        var excelFile = XLSX.utils.table_to_book(data, {sheet: "sheet1"});
        XLSX.write(excelFile, { bookType: ext, bookSST: true, type: 'base64' });
        XLSX.writeFile(excelFile, 'ExportedFile:ApplicantData.' + ext);
    },

    getStepRekrutmenData: async () => {
        this.tableRecruitment = $('table#table-rekrutmen');

        if (tableRecruitment.length > 0) {
            // let approveAction = $('#approve').val();
            tableRecruitment.DataTable({
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
                    "url": url.base_url(Lowongan.moduleApi()) + `getStepRekrutmen`,
                    "type": "POST",
                    // "headers": {
                    //     'X-CSRF-TOKEN': `'${tokenApi}'`
                    // }
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                    // console.log('row', $(row));
                    $(row).addClass('step-section')
                },
                "columnDefs": [
                    {
                        "targets": 4,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('text-center');
                            $(td).addClass('td-padd');
                            $(td).addClass('action');
                        }
                    },
                    {
                        "targets": [1, 2, 3],
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
                "columns": [
                    {
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "nama",
                    },
                    {
                        "data": null,
                        render: function (data, type, row, meta) {
                            let show = `<input type="text" class="pic form-control" id="pic-${row.id}">`
                            return show;
                        }
                    },
                    {
                        "data": null,
                        render: function (data, type, row, meta) {
                            let show = `<input type="text" class="durasi form-control" id="durasi-${row.id}">`
                            return show;
                        }
                    },
                    {
                        "data": null,
                        render: function (data, type, row, meta) {
                            let show = `
                            <div class="form-check text-center">
                                <input class="form-check-input" style="float:none" type="checkbox" id="action-${row.id}">
                                <input type="hidden" class="idstep" value="${row.id}">
                            </div>`
                            return show;
                        }
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
            <button class="btn btn-danger" onclick="Lowongan.deleteConfirm(this, '${data_id}')">Ya</button>
            <button class="btn btn-secondary " onclick="message.closeDialog()">Tidak</button>
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
            url: url.base_url(Lowongan.moduleApi()) + "delete",

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

    accept: (elm, e) => {
        e.preventDefault();
        let data_id = $(elm).data('id');

        let html = `<div class="row g-3">
                        <div class="col-12">
                            <h5 class="py-3 breadcrumb-wrapper mb-4">
                                <span class="text-muted fw-light">Yakin untuk melanjutkan?</span>
                            </h5>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-12 text-center">
                            <button onclick="message.closeDialog()"
                                    class="btn btn-secondary btn-next">
                                    Batal
                            </button>
                            <button onclick="Lowongan.acceptConfirm(this, '${data_id}')"
                                    class="btn btn-danger btn-next">
                                    Ya
                            </button>
                        </div>
                    </div>`;

        bootbox.dialog({
            message: html,
            size: 'small'
        });
    },

    acceptConfirm: (elm, id) => {
        let params = {};
        params.lamaran = id;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "saveToDraft",

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
                    Toast.success('Informasi', 'Data Berhasil Disimpan');
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    Toast.error('Informasi', 'Data Gagal Disimpan ', resp.message);
                }
            }
        });
    },

    showFile: (elm, e) => {
        e.preventDefault();
        let file = $(elm).attr('src');
        let html = `<div class="row g-3">
            <div class="col-12">
                <br/>
                <iframe src="${file}" width="800" height="800"/>
            </div>
        </div>`;

        bootbox.dialog({
            message: html,
            size: 'large',
            onEscape: true,
        });
    },

    uploadFile: () => {
        let uploader = $('#uploader');
        let attachment = $('#attachment');
        var reader = new FileReader();
        reader.onload = function (event) {
            var files = $(uploader).get(0).files[0];
            // console.log(files);
            filename = files.name;
            var data_from_file = filename.split(".");
            var type_file = $.trim(data_from_file[data_from_file.length - 1]);
            if (type_file == 'pdf') {
                var data = event.target.result;
                attachment.attr("src", data);
                attachment.attr("tipe", type_file);
                attachment.val(filename);
            } else {
                bootbox.dialog({
                    message: "File harus menggunakan format pdf"
                });
            }
        };

        reader.readAsDataURL(uploader[0].files[0]);

    },

    getPostInputDokumen: () => {
        let params = {};
        let attachment = $('#attachment');
        params.file = attachment.attr('src');
        params.tipe = attachment.attr('tipe');

        return params;
    },
    getPostStepRekrutmen: () => {
        let params = [];
        let step = $('.step-section');
        $.each(step, function (i, v) {
            let $this = $(this);
            let tmp = {};
            let check = $this.find('input.action')[0].checked;
            // if(check){
            tmp.idstep = $this.find('input.idstep').val();
            // tmp.pic = $this.find('input.pic').val();
            // tmp.durasi = $this.find('input.durasi').val();
            // tmp.start_date = $this.find('input#start_date_detail').val();
            // tmp.end_date = $this.find('input#end_date_detail').val();
            tmp.status = (check) ? 1 : 0;
            params.push(tmp);
            // }

            // console.log(check)
        });

        return params;
    },

    getPostData: () => {
        let data = {
            'data': {
                'id': $('#id').val(),
                'permintaan_no': $('#permintaan_no').val(),
                // 'grade': $('#grade').val(),
                'posisi': $('#posisi').val(),
                'job_posting': tinymce.get("job_posting").getContent(),
                'status': $('#status_lowongan').val(),
                'start_date': $("#start_date").val(),
                'end_date': $("#due_date").val(),
                'pic_recruiter': $("#pic_recruiter").val(),
            },
            // 'attachment': Lowongan.getPostInputDokumen(),
            'steprekrut': Lowongan.getPostStepRekrutmen(),
        };
        return data;
    },

    cekCheckbox: (elm, e) => {
        if ($(elm).prop('checked') == true) {

        } else {
            let html = `<div class="row g-3">
            <div class="col-12">
            <hr/>
            </div>
            <div class="col-12 text-center">
                <p>Status lowongan CLOSE tidak akan bisa diganti lagi, apakah Anda yakin ?</p>
            </div>
            <div class="col-12 text-center">
                <br/>
                <button class="btn btn-info" onclick="message.closeDialog()">Close</button>
            </div>
            </div>`;

            bootbox.dialog({
                message: html
            });

        }
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = Lowongan.getPostData();
        if (tinymce.get("job_posting").getContent().length == 0) {
            Toast.error('Error', 'Spesifikasi Job Posting harus diisi!');
            return
        }
        if (params.data.pic_recruiter == '') {
            Toast.error('Error', 'PIC recruiter harus diisi!');
            return
        }
        // console.log(params);
        // return params;
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            // return params;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "submit",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function () {
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    // console.log(resp);
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

    getShortlistData: async (elm) => {
        let params = [];
        let nama = '';
        let step = $('.form-check');
        $.each(step, function (i, v) {
            let $this = $(this);
            let tmp = {};
            let check = $this.find('input.form-check-input')[0].checked;
            if (check) {
                // console.log(check);
                tmp.value = $this.find('input.form-check-input').val();
                tmp.analysis = $('#reason-' + tmp.value).val();
                tmp.nama = $('#nama-' + tmp.value).val();

                if(tmp.analysis == ''){
                    nama = tmp.nama
                }

                params.push(tmp);
            }
        });
        let data = {
            'id': $('#proses_rekrutmen').val(),
            'applicant': params,
            'nama': nama
            // 'unprocessed_data': $(elm).data('id'),
        };

        return data;
    },

    saveShortlist: (elm, e) => {
        e.preventDefault();
        let params = Lowongan.getShortlistData(elm);

        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            // console.log(params.applicant.length);
            // return params;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "saveShortlist",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a, b, c) {
                    // console.log(a, b, c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    // console.log(resp);
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

    saveShortlistTemp: async (elm, e) => {
        e.preventDefault();
        let params = await Lowongan.getShortlistData();


        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {

            if(params.applicant.length == 0){
                Toast.error('Informasi', `Tidak ada applicant yang dipilih`);return;
            }

            if(params.nama != ''){
                Toast.error('Informasi', `${params.nama} Remark Analysis Belum Diisi`);return;
            }

            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "saveShortlistTemp",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a, b, c) {
                    // console.log(a, b, c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    // console.log(resp);
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

    saveNextStep: (elm, e) => {
        e.preventDefault();
        let params = {};
        let nama = $('#next_step_rekrutment_nama').val();
        // console.log(nama);
        // return params;

        if (nama == 'Technical Test') {
            params = {
                // 'id' : $('#test_id').val(),
                'next_step_rekrutment_nama': $('#next_step_rekrutment_nama').val(),
                'next_step_rekrutment': $('#next_step_rekrutment').val(),
                'lamaran': $(elm).data("id"),
                'startdate': $('#startdate').val(),
                'enddate': $('#enddate').val(),
                'pertanyaan': $('#pertanyaan').val(),
            }
        } else if (nama == 'Interview HC' || nama == 'Interview User' || nama == 'Psychotest' || nama == 'Medical Check Up') {
            params = {
                // 'id' : $('#test_id').val(),
                'next_step_rekrutment_nama': nama,
                'next_step_rekrutment': $('#next_step_rekrutment').val(),
                'lamaran': $(elm).data("id"),
                'body_email': tinymce.get("body_email").getContent(),
            }
        } else if (nama == 'Offering Letter') {
            params = {
                // 'id' : $('#test_id').val(),
                'next_step_rekrutment_nama': nama,
                'next_step_rekrutment': $('#next_step_rekrutment').val(),
                'lamaran': $(elm).data("id"),
                'body_email': tinymce.get("body_email").getContent(),
                'attachment': Lowongan.getPostInputDokumen(),
            }
        } else if (nama == 'Onboarding') {
            params = {
                // 'id' : $('#test_id').val(),
                'next_step_rekrutment_nama': nama,
                'next_step_rekrutment': $('#next_step_rekrutment').val(),
                'lamaran': $(elm).data("id"),
                'body_email': tinymce.get("body_email").getContent(),
                'tgl_join': $('#tgl_join').val(),
                'username': $('#username').val(),
                'password': $('#password').val(),
            }
        } else if (nama == 'Initial Offering Letter') {
            params = {
                // 'id' : $('#test_id').val(),
                'next_step_rekrutment_nama': nama,
                'next_step_rekrutment': $('#next_step_rekrutment').val(),
                'body_email': tinymce.get("body_email").getContent(),
                'lamaran': $(elm).data("id"),
            }
        } else if (nama == 'Onboarding Preparation') {
            params = {
                // 'id' : $('#test_id').val(),
                'next_step_rekrutment_nama': nama,
                'next_step_rekrutment': $('#next_step_rekrutment').val(),
                'body_email': tinymce.get("body_email").getContent(),
                'lamaran': $(elm).data("id"),
            }
        }

        // console.log(params);
        // return params;

        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "saveNextStep",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a, b, c) {
                    // console.log(a, b, c);
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

    hitungNilaiInterview:() => {
        let jumlahSoal = 0;
        let nilai = 0;

        $.each($('.inputnilai'), function (i, v) {
            let temp = 0;
            if ($(this).find('.nilai-1').is(':checked')) {
                temp = $(this).find('.nilai-1').val();
            } else if ($(this).find('.nilai-2').is(':checked')) {
                temp = $(this).find('.nilai-2').val();
            } else if ($(this).find('.nilai-3').is(':checked')) {
                temp = $(this).find('.nilai-3').val();
            } else if ($(this).find('.nilai-4').is(':checked')) {
                temp = $(this).find('.nilai-4').val();
            } else if ($(this).find('.nilai-5').is(':checked')) {
                temp = $(this).find('.nilai-5').val();
            }
            nilai += +temp;
            jumlahSoal++;
        });
        // console.log('jumlahSoal ',jumlahSoal);

        let bawah = jumlahSoal;
        let atas = jumlahSoal * 5;
        let median = (atas+bawah)/2;

        batasBawah = median - (bawah/2);
        batasAtas = median + (bawah/2);
        // console.log('nilai ',nilai,' batasBawah ',batasBawah);
        if (nilai < batasBawah) {
            $('#hasilinterview').val('TIDAK DISARANKAN').removeClass('text-success text-warning').addClass('text-danger')
        }else if (nilai <= batasAtas) {
            $('#hasilinterview').val('DIPERTIMBANGKAN').removeClass('text-success text-danger').addClass('text-warning')
        }else if (nilai > batasAtas){
            $('#hasilinterview').val('DISARANKAN').removeClass('text-danger text-warning').addClass('text-success')
        }
    },

    uploadFileGambar: () => {
        let uploader = $('#uploader');
        let attachment = $('#attachment');
        var reader = new FileReader();
        reader.onload = function (event) {
            var files = $(uploader).get(0).files[0];
            // console.log(files);
            filename = files.name;
            var data_from_file = filename.split(".");
            var type_file = $.trim(data_from_file[data_from_file.length - 1]);
            if (['jpg', 'jpeg', 'png', 'pdf'].includes(type_file)) {
                var data = event.target.result;
                attachment.attr("src", data);
                attachment.attr("tipe", type_file);
                attachment.val(filename);
            } else {
                bootbox.dialog({
                    message: "File harus menggunakan format gambar (jpeg, jpg atau png) atau PDF"
                });
            }
        };

        reader.readAsDataURL(uploader[0].files[0]);

    },

    getPostInputDokumenGambar: () => {
        let params = {};
        let attachment = $('#attachment');
        params.file = attachment.attr('src') ?? '';
        params.tipe = attachment.attr('tipe') ?? '';

        return params;
    },

    saveHasilInterview: (elm, e) => {
        e.preventDefault();
        let params = [];

        let jumlahSoal = 0;
        $.each($('.inputnilai'), function (i, v) {
            // console.log($(this).find('.nilairadio').checked);
            let input = {};
            input.rating = null;
            if ($(this).find('.nilai-1').is(':checked')) {
                input.rating = $(this).find('.nilai-1').val();
            } else if ($(this).find('.nilai-2').is(':checked')) {
                input.rating = $(this).find('.nilai-2').val();
            } else if ($(this).find('.nilai-3').is(':checked')) {
                input.rating = $(this).find('.nilai-3').val();
            } else if ($(this).find('.nilai-4').is(':checked')) {
                input.rating = $(this).find('.nilai-4').val();
            } else if ($(this).find('.nilai-5').is(':checked')) {
                input.rating = $(this).find('.nilai-5').val();
            }
            // input.id = $(this).find('.keterangan').data('id');
            // input.keterangan = $(this).find('.keterangan').val();
            input.id = $(this).data('id')
            params.push(input);
            jumlahSoal++;
        });

        let hasil = '';
        $.each($('.hasilinterview'), function (i, v) {
            if ($(this).is(':checked')) {
                // console.log($(this).val());
                hasil = $(this).val();
            }
        })

        let data = {
            'data': params,
            'hasil':$('#hasilinterview').val(),
            'catatan':$('#catatan').val(),
            'lamaran': $(elm).data('id'),
            'master_interview_hc': $('#master_interview_hc').val(),
            'dokumantasi' : Lowongan.getPostInputDokumenGambar()
        }

        if(data.dokumantasi.file == ''){
            Toast.error('Informasi', "Dokumentasi Interview wajib diisi");return;
        }

        // console.log(data); return;

        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            // return params;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: data,
                url: url.base_url(Lowongan.moduleApi()) + "saveHasilInterview",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function () {
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    // console.log(resp);
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Data Berhasil Disimpan');
                        setTimeout(function () {
                            window.location.reload()
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
    saveHasilInterviewUser: (elm, e) => {

        e.preventDefault();
        let params = [];
        $.each($('.inputnilai'), function (i, v) {
            // console.log($(this).find('.nilairadio').checked);
            let input = {};
            input.rating = null;
            if ($(this).find('.nilai-baik').is(':checked')) {
                // console.log($(this).find('.nilai-baik').val());
                input.rating = $(this).find('.nilai-baik').val();

            } else if ($(this).find('.nilai-cukup').is(':checked')) {
                // console.log($(this).find('.nilai-cukup').val());
                input.rating = $(this).find('.nilai-cukup').val();

            } else if ($(this).find('.nilai-kurang').is(':checked')) {
                // console.log($(this).find('.nilai-kurang').val());
                input.rating = $(this).find('.nilai-kurang').val();
            }
            input.id = $(this).find('.keterangan').data('id');
            input.keterangan = $(this).find('.keterangan').val();
            params.push(input);
        });

        let hasil = '';
        $.each($('.hasilinterview'), function (i, v) {
            if ($(this).is(':checked')) {
                hasil = $(this).val();
            }
        })
        let data = {
            'data': params,
            'lamaran': $(elm).data('id'),
            'master_interview_user': $('#master_interview_user').val(),
            'hasil': hasil,
        }

        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            // return params;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: data,
                url: url.base_url(Lowongan.moduleApi()) + "saveHasilInterviewUser",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function () {
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    // console.log(resp);
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Data Berhasil Disimpan');
                        setTimeout(function () {
                            window.location.reload()
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


    saveHasilPsikotes: (elm, e) => {
        e.preventDefault();

        let data = {
            'data': {
                'lamaran': $(elm).data('id'),
                'vendor': $('#vendor').val(),
                'tanggal_tes': $('#tanggal_tes').val(),
                'jam_tes': $('#jam_tes').val(),
                'tempat_tes': $('#tempat_tes').val(),
                'no_tes': $('#no_tes').val(),
                'total_hari_tes': $('#total_hari_tes').val(),
                'kelebihan': $('#kelebihan').val(),
                'kelemahan': $('#kelemahan').val(),
                'rekomendasi': $('#rekomendasi').val(),
                'kesimpulan': $('#kesimpulan').val(),
                'saran': $('#saran').val(),
                'nilai': $('#nilai').val(),
                // 'lolos': $('#lolos').val(),
                'master_psikotes': $('#master_psikotes').val(),
            },
            'attachment': Lowongan.getPostInputDokumen(),
        };

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: data,
            url: url.base_url(Lowongan.moduleApi()) + "saveHasilPsikotes",
            beforeSend: () => {
                message.loadingProses('Proses Simpan Data...');
            },
            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },
            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Data Berhasil Disimpan');
                    setTimeout(function () {
                        window.location.reload()
                    }, 1000);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },

    getPsikotesDataTemp: () => {
        let params = [];
        let step = $('.form-check');
        $.each(step, function (i, v) {
            let $this = $(this);
            let tmp = {};
            let check = $this.find('input.form-check-input')[0].checked;
            if (check) {
                tmp.value = $this.find('input.form-check-input').val();
                params.push(tmp);
                // console.log($this.find('input.form-check-input').val());
            }
        });
        let data = {
            'id': $('#proses_rekrutmen').val(),
            'applicant': params
        };

        return data;
    },
    savePsikotesTemp: (elm, e) => {
        e.preventDefault();
        let params = Lowongan.getPsikotesDataTemp();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            // return params;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "savePsikotesTemp",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a, b, c) {
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

    saveHasilMCU: (elm, e) => {
        e.preventDefault();
        let hasil = '';
        $.each($('.hasilmcu'), function (i, v) {
            if ($(this).is(':checked')) {
                // console.log($(this).val());
                hasil = $(this).val();
            }
        })

        let data = {
            'data': {
                'lamaran': $(elm).data('id'),
                'note': tinymce.get('note').getContent(),
                'current_step': $('#current_step').val(),
                'hasil': hasil,
            },
            'attachment': Lowongan.getPostInputDokumen(),
        };

        // let data = {
        //     'lamaran' : $(elm).data('id'),
        //     'note' : tinymce.get('note').getContent(),
        //     'current_step' : $('#current_step').val(),
        //     'hasil' : hasil,
        // }
        // console.log(data);
        // return data;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: data,
            url: url.base_url(Lowongan.moduleApi()) + "saveHasilMCU",
            beforeSend: () => {
                message.loadingProses('Proses Simpan Data...');
            },
            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Data Berhasil Disimpan');
                    setTimeout(function () {
                        window.location.reload()
                    }, 1000);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },
    saveHasilOL: (elm, e) => {
        e.preventDefault();
        let hasil = '';

        let data = {
            'lamaran': $(elm).data('id'),
            'current_step': $('#current_step').val(),
            'attachment': Lowongan.getPostInputDokumen(),
        }
        // console.log(data);
        // return data;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: data,
            url: url.base_url(Lowongan.moduleApi()) + "saveHasilOL",
            beforeSend: () => {
                message.loadingProses('Proses Simpan Data...');
            },
            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Data Berhasil Disimpan');
                    setTimeout(function () {
                        window.location.reload()
                    }, 1000);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },
    saveHasilOnboarding: (elm, e) => {
        e.preventDefault();

        let params = [];
        $.each($('.list-fasilitas'), function (i, v) {
            let $this = $(this);
            let tmp = {};
            let check = $this.find('input.enabler')[0].checked;

            tmp.key = $this.find('input.key').val();
            tmp.pic = $this.find('input.pic').val();
            tmp.keterangan = $this.find('input.keterangan').val();
            tmp.tgl = $this.find('input.tgl').val();
            tmp.is_active = (check) ? 1 : 0;
            params.push(tmp);
        })

        let data = {
            'lamaran': $(elm).data('id'),
            'current_step': $('#current_step').val(),
            'tgl_join': $('#tgl_join').val(),
            'data': params,
        }
        // console.log(data);
        // return data;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: data,
            url: url.base_url(Lowongan.moduleApi()) + "saveHasilOnboarding",
            beforeSend: () => {
                message.loadingProses('Proses Simpan Data...');
            },
            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Data Berhasil Disimpan');
                    setTimeout(function () {
                        window.location.reload()
                    }, 1000);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },

    rejectApplicant: (elm, e) => {
        e.preventDefault();

        let params = {
            'lamaran' : $(elm).data('id'),
        };

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "formemailreject",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

            }
        });

    },

    rejectApplicantConfirm: (elm, e) => {
        e.preventDefault();

        let id = $(elm).data('id');

        let rejectHtml = `
            <div class="row g-3">
                <div class="col-12">
                    <h5 class="py-3 breadcrumb-wrapper mb-4">
                        <span class="text-muted fw-light">Apakah anda yakin ?</span>
                    </h5>
                </div>
            </div>

            <div class="row g-3">
                <div class="col-12 text-center">
                    <button status='REJECTED' onclick="message.closeDialog()"
                            class="btn btn-secondary btn-next">
                            Batal
                    </button>
                    <button status='REJECTED' onclick="Lowongan.saveRejectApplicant(${id},event)"
                            class="btn btn-danger btn-next">
                            Ya, Reject
                    </button>
                </div>
            </div>
        `;
        bootbox.dialog({
            message: rejectHtml,
            size: 'small'
        });
        $('.bootbox-close-button').addClass('btn-close').text("");
    },

    saveRejectApplicant: (id, e) => {
        let data = {
            'lamaran': id,
            'body_email': tinymce.get("body_email").getContent(),
        }
        // console.log(data);
        // return data;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: data,
            url: url.base_url(Lowongan.moduleApi()) + "rejectApplicant",
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
                    Toast.success('Informasi', 'Applicant Berhasil di Reject!');
                    setTimeout(function () {
                        window.location.reload()
                    }, 1000);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },

    rejectAllApplicant: (id, e) => {
        e.preventDefault();

        // let id = $(elm).data('id');

        let rejectHtml = `
            <div class="row g-3">
                <div class="col-12">
                    <h5 class="py-3 breadcrumb-wrapper mb-4">
                        <span class="text-muted fw-light">Apakah anda yakin untuk mereject semua Aplikan di Lowongan ini ?</span>
                    </h5>
                </div>
            </div>

            <div class="row g-3">
                <div class="col-12 text-center">
                    <button status='REJECTED' onclick="message.closeDialog()"
                            class="btn btn-secondary btn-next">
                            Batal
                    </button>
                    <button status='REJECTED' onclick="Lowongan.saveRejectAllApplicant(${id},event)"
                            class="btn btn-danger btn-next">
                            Ya, Reject
                    </button>
                </div>
            </div>
        `;
        bootbox.dialog({
            message: rejectHtml,
            size: 'small'
        });
        $('.bootbox-close-button').addClass('btn-close').text("");

    },

    saveRejectAllApplicant: (id, e) => {
        let data = {
            'lowongan': id,
            // 'body_email': tinymce.get("body_email").getContent(),
        }
        // console.log(data);
        // return data;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: data,
            url: url.base_url(Lowongan.moduleApi()) + "rejectAllApplicant",
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
                    Toast.success('Informasi', 'Applicant Berhasil di Reject!');
                    setTimeout(function () {
                        window.location.reload()
                    }, 1000);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },

    cariApplicant: (id) => {
        let params = {};
        params.lowongan = id;
        params.nama = $('#nama_applicant').val();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "cariApplicant",

            beforeSend: () => {
                message.loadingProses('Loading ...');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                // console.log(resp);
                $('#applicants').empty();
                $.each(resp, function (i, v) {
                    // console.log(v);
                    let resIf = ''
                    if (v.lamaran_status != 'NOT OK') {
                        resIf = `
                            <div class="col-sm-6">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-block btn-danger" data-currentstep="null" data-id="${v.master_id}" onclick="Lowongan.rejectApplicant(this,event)">
                                        Reject
                                        <i class='bx bx-x-circle'></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="d-flex align-items-center border rounded px-2 py-1" style="padding-top: 0.4rem!important">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="${v.master_id} id="applicant-${v.master_id}">
                                        <label class="form-check-label" style="user-select: none" for="applicant-${v.master_id}">
                                        SHORTLIST
                                        </label>
                                    </div>
                                </div>
                            </div>
                        `;
                    } else {
                        resIf = `
                            <div class="col-sm-6">
                                <button class="btn btn-block btn-secondary" disabled>
                                    Rejected
                                    <i class='bx bx-x-circle'></i>
                                </button>
                            </div>
                        `;
                    }
                    let str = `
                        <div class="col-md-6 col-lg-4 mb-3 app-card">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${_.startCase(v.nama)}</h5>
                                    <p class="card-text">
                                        <span>${v.nama_pendidikan}</span><br>
                                        <span>${v.umur}</span><br>
                                        <span>${v.jabatan} (${v.pengalaman_kerja})</span>
                                    </p>
                                </div>
                                <div class="row p-3">
                                    <div class="col-sm-12 mb-2">
                                        <div class="d-grid gap-2">
                                            <button type="button" class="btn btn-info" data-lowongan_id="${v.master_id}" data-id="${v.applicant_id}" onclick="Lowongan.applicantDetails(this)">
                                                See Applicant Details
                                            </button>
                                        </div>
                                    </div>
                                    ${resIf}
                                </div>
                            </div>
                        </div>
                    `;
                    $('#applicants').append(str)
                    Lowongan.setCardPagination()
                })
            }
        });
    },

    setDate: () => {
        // const flatpickrRange = document.querySelector('.flatpickr');
        // if(flatpickrRange){
        //     flatpickrRange.flatpickr();
        // }

        const dataDate = $('.flatpickr');
        $.each(dataDate, function () {
            $(this).flatpickr();
        });

        const dataDateMinNow = $('.flatpickr-min-now');
        $.each(dataDateMinNow, function () {
            $(this).flatpickr({
                minDate: "today"
            });
        });

        const dataDateTime = $('.flatpickrtime');
        $.each(dataDateTime, function () {
            $(this).flatpickr({
                time_24hr: true,
                dateFormat: 'Y-m-d H:i',
                enableTime: true,
                defaultHour: 8
            });
        });
    },

    select2All: () => {
        // Default
        let tempOption = [];
        const select2 = $('.select2');
        if (select2.length) {
            select2.each(function () {
                var $this = $(this);
                $this.wrap('<div class="position-relative"></div>').select2({
                    placeholder: 'Pilih',
                    dropdownParent: $this.parent()
                });
            });
        }
        const select2multiple = $('.select2-multiple');
        if (select2multiple.length) {
            tempOption = [select2multiple.find('option').toArray().map(o => o.value)];
            tempOption = tempOption[0].filter(function (v) {
                return v.length > 0
            });

            select2multiple.each(function () {
                var $this = $(this);
                $this.wrap('<div class="position-relative"></div>').select2({
                    placeholder: 'Pilih',
                    dropdownParent: $this.parent()
                });
                $this.on("select2:unselect", function (e) {
                    let text = e.params.data.text;

                    if (tempOption.indexOf(text) < 0) {
                        $("option[value='" + e.params.data.text + "']", this).remove()
                    }
                });
            });
        }
        $(".select2-disabled").prop("disabled", true);

        $('#urut1').on('select2:select', function () {
            // console.log($(this).val());
            $('#urut2').empty().trigger("change");
            $('#urut3').empty().trigger("change");
            var opt20 = new Option('', '', false, false);
            var opt21 = new Option('Jenis Kelamin', 'jk', false, false);
            var opt22 = new Option('Umur', 'umur', false, false);
            var opt23 = new Option('Pendidikan', 'pendidikan', false, false);
            var opt30 = new Option('', '', false, false);
            var opt31 = new Option('Jenis Kelamin', 'jk', false, false);
            var opt32 = new Option('Umur', 'umur', false, false);
            var opt33 = new Option('Pendidikan', 'pendidikan', false, false);
            $('#urut2').append(opt20).append(opt21).append(opt22).append(opt23).trigger('change');
            $('#urut3').append(opt30).append(opt31).append(opt32).append(opt33).trigger('change');
            $('#urut2 option[value="' + $(this).val() + '"]').detach();
            $('#urut3 option[value="' + $(this).val() + '"]').detach();
        })

        $('#urut2').on('select2:select', function () {
            // console.log($(this).val());
            $('#urut3').empty().trigger("change");
            var opt30 = new Option('', '', false, false);
            var opt31 = new Option('Jenis Kelamin', 'jk', false, false);
            var opt32 = new Option('Umur', 'umur', false, false);
            var opt33 = new Option('Pendidikan', 'pendidikan', false, false);
            $('#urut3').append(opt30).append(opt31).append(opt32).append(opt33).trigger('change');
            $('#urut3 option[value="' + $('#urut1').val() + '"]').detach();
            $('#urut3 option[value="' + $(this).val() + '"]').detach();
        })
    },

    reset: () => {
        $('#urut1').empty().trigger("change");
        $('#urut2').empty().trigger("change");
        $('#urut3').empty().trigger("change");

        var opt10 = new Option('', '', false, false);
        var opt11 = new Option('Jenis Kelamin', 'jk', false, false);
        var opt12 = new Option('Umur', 'umur', false, false);
        var opt13 = new Option('Pendidikan', 'pendidikan', false, false);
        var opt20 = new Option('', '', false, false);
        var opt21 = new Option('Jenis Kelamin', 'jk', false, false);
        var opt22 = new Option('Umur', 'umur', false, false);
        var opt23 = new Option('Pendidikan', 'pendidikan', false, false);
        var opt30 = new Option('', '', false, false);
        var opt31 = new Option('Jenis Kelamin', 'jk', false, false);
        var opt32 = new Option('Umur', 'umur', false, false);
        var opt33 = new Option('Pendidikan', 'pendidikan', false, false);
        $('#urut1').append(opt10).append(opt11).append(opt12).append(opt13).trigger('change');
        $('#urut2').append(opt20).append(opt21).append(opt22).append(opt23).trigger('change');
        $('#urut3').append(opt30).append(opt31).append(opt32).append(opt33).trigger('change');
        $('#urut1dir').val('').trigger('change');
        $('#urut2dir').val('').trigger('change');
        $('#urut3dir').val('').trigger('change');
        // $('table#table-shortlist').DataTable().destroy();
        // Shortlist.getDataShortlist(null,null,null,null,null,null)
        // $('#table-shortlist').DataTable().ajax.reload();
    },

    nextPersonal: (elm, e) => {
        e.preventDefault();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            Wizard.nextWizard(elm)
        }
    },


    removeWarning: () => {
        $(document).on('change', '.required', function () {
            if ($(this).val().length > 0) {
                $(this).removeClass('is-invalid');
                $(this).next().remove();
            } else {
                $(this).addClass('is-invalid');
                $(this).after('<p style="color:#ff5b5c;" class="data-error">* ' + $(this).attr('error') + ' Harus Diisi</p>');
            }
        })
    },

    showDetails: (elm) => {
        let params = {};
        params.permintaan_no = $(elm).val();

        if (params.permintaan_no) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "showDetails",

                beforeSend: () => {
                    message.loadingProses('Proses Pengambilan Data');
                },

                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi", "Gagal");
                },

                success: function (resp) {
                    // console.log(resp);
                    // console.log(resp.detail.catatan);
                    message.closeLoading();

                    $('#sifat').val(resp.detail.sifat)
                    $('#rencana_masuk').val(resp.detail.rencana_masuk)
                    $('#departemen').val(resp.detail.nama_departemen)
                    $('#jabatan').val(resp.detail.nama_jabatan)
                    $('#usia_min').val(resp.detail.usia_min)
                    $('#usia_max').val(resp.detail.usia_max)
                    $('#usia_max').val(resp.detail.usia_max)
                    $('#posisi').val(resp.detail.nama_posisi)
                    $('#jk').val(resp.jk)
                    $('#pendidikan').val(resp.pendidikan)
                    tinymce.get("job_posting").setContent(resp.detail.catatan ?? '');


                    $('.action').prop('checked',false);
                    resp.master_maping_proses_rekrutment.forEach(function(e){
                        $(`#action-${e.id_master_proses_rekrutment}`).prop('checked',true);
                    })
                }
            });
        } else {
            $('#sifat').val('')
            $('#rencana_masuk').val('')
            $('#departemen').val('')
            $('#jabatan').val('')
            $('#usia_min').val('')
            $('#usia_max').val('')
            $('#usia_max').val('')
            $('#jk').val('')
            $('#pendidikan').val('')
        }

    },

    switch: (elm) => {
        // console.log($('#status_lowongan').is(":checked"));
        if ($('#status_lowongan').is(":checked")) {
            $('.switch-label').text('Open');
        } else {
            $('.switch-label').text('Closed');
        }
    },

    editor: () => {
        tinymce.remove('textarea.texteditor');
        // tinymce.EditorManager.execCommand('mceRemoveEditor',true, 'textarea.texteditor');
        tinymce.init({
            // content_css : 'http://localhost/simi//public//assets/vendor/css/rtl/core.css',
            selector: 'textarea.texteditor',
            menubar: false,
            plugins: ["lists", "code"],
            toolbar: 'undo redo | blocks | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat code',
        });
        document.addEventListener('focusin', function (e) {
            if (e.target.closest('.tox-tinymce-aux, .moxman-window, .tam-assetmanager-root') !== null) {
                e.stopImmediatePropagation();
            }
        });
    },
    moduleMutasi: () => {
        return "pengajuan/mutasi";
    },

    moduleMutasiApi: () => {
        return `api/${Lowongan.moduleMutasi()}`;
    },


    moduleKaryawan: () => {
        return "master/karyawan";
    },

    moduleKaryawanApi: () => {
        return `api/${Lowongan.moduleKaryawan()}`;
    },

    showDataKaryawan: (elm) => {
        let params = {};
        let tr_index = $(elm).closest('tr').index();

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleMutasiApi()) + "showDataKaryawan",

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

                var ops = '';

                if (elm == 'onboarding_preparation') {
                    ops = 'onboarding_preparation';
                }

                Lowongan.getDataKaryawan(tr_index, ops.toString());
            }
        });
    },

    getDataKaryawan: async (index, ops) => {
        let tableData = $('table#table-data-karyawan');
        // tableData.DataTable().destroy();

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
                    "url": url.base_url(Lowongan.moduleKaryawanApi()) + `getData`,
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
                "columnDefs": [
                    {
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
                        return `<i class="bx bx-edit" style="cursor: pointer;" index_tr="${index}" nama_lengkap="${row.nama_lengkap}" data_id="${data}" data_ops="${ops}" onclick="Lowongan.pilihData(this)"></i>`;
                    }
                }
                ]
            });
        }
    },

    pilihData: (elm) => {
        var ops = $(elm).attr('data_ops');

        let tr_index = $(elm).attr('index_tr');

        tr_index = parseInt(tr_index) + 1;
        // console.log('tr_index', tr_index);
        let nama_lengkap = $(elm).attr('nama_lengkap');
        let nik = $(elm).attr('data_id');

        if (ops == 'onboarding_preparation') {
            $('input#pic').val(nik + " - " + nama_lengkap);
            var a = $('.bootbox-close-button.btn-close').filter((i, e) => i == 2 ? e : '');
            a.trigger('click');
        } else {
            $('table#table-rekrutmen').find(`tr:eq(${tr_index})`).find('input#nik').val(nik + " - " + nama_lengkap);
            message.closeDialog();
        }
    },

    showDataKaryawanR: (elm) => {
        let params = {};

        let data_elm = $(elm).data('data_elm');

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleMutasiApi()) + "showDataKaryawan",

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

                Lowongan.getDataKaryawanR(data_elm);
            }
        });
    },

    getDataKaryawanR: async (data_elm) => {
        let tableData = $('table#table-data-karyawan');
        // tableData.DataTable().destroy();

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
                    "url": url.base_url(Lowongan.moduleKaryawanApi()) + `getData`,
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
                "columnDefs": [
                    {
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
                        return `<i class="bx bx-edit" style="cursor: pointer;" data_elm="${data_elm}" data-nama_lengkap="${row.nama_lengkap}" data_id="${data}" onclick="Lowongan.pilihDataR(this)"></i>`;
                    }
                }
                ]
            });
        }
    },

    pilihDataR: (elm) => {
        let nama_lengkap = $(elm).data('nama_lengkap');
        let nik = $(elm).attr('data_id');
        let data_elm = $(elm).attr('data_elm');

        $(`input#${data_elm}`).val(nik + " - " + nama_lengkap);
        message.closeDialog();

    },

    alertComplete: () => {
        let html = `<div class="row g-3">
            <div class="col-12">
            <hr/>
            </div>
            <div class="col-12 text-center">
                <p>Silakan Lengkapi Hasil pada tahap ini</p>
            </div>
            <div class="col-12 text-center">
                <br/>
                <button class="btn btn-info" onclick="message.closeDialog()">Close</button>
            </div>
            </div>`;

        bootbox.dialog({
            message: html
        });
    },
    showFile: (elm, e) => {
        // e.preventDefault();
        let file = $(elm).attr('src');
        let html = `<div class="row g-3">
            <div class="col-12">
                <br/>
                <iframe src="${file}" width="800" height="800"/>
            </div>
        </div>`;

        bootbox.dialog({
            message: html,
            size: 'large',
            onEscape: true,
        });
    },

    setCardPagination: () => {
        $(".pagination-card").html("")
        $('.pagination-card').pagination({
            itemsToPaginate: ".app-card",
            activeClass: 'jqactive',
            itemsPerPage: 27
        });
    },

    shortlistDefault: () => {
        location.reload();
        $("#temp-button").empty();
    },
    shortlistFilter: (id) => {
        let params = {};
        var shortlist = $('input[name="shortlist_filter"]:checked').val();

        if (shortlist == 'shortlist_lanjutan') {
            $("#temp-button").empty();
            params.lowongan = id;
            params.filter = 'shortlist_lanjutan';
        } else {
            $("#temp-button").empty();
            $("#temp-button").append(`<button onclick="Lowongan.saveShortlistTemp(this, event)"
            class="btn btn-primary btn-next ">
            <span class="d-sm-inline-block d-none me-sm-1">Lanjut</span>
            <i class="bx bx-chevron-right bx-sm me-sm-2"></i>
            </button>`);
            params.lowongan = id;
            params.filter = 'shortlist_awal';
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "shortlistFiltered",

            beforeSend: () => {
                message.loadingProses('Loading ...');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                $('#applicants').empty();
                if (!$.trim(resp)) {
                    $("#temp-button").empty();
                    $('#applicants').append(`
                    <div class="col-md-12">
                        <div class="row justify-content-center">
                            <div class="col-md-4 text-center">
                                <img src="`+ url.base_url('/public/assets/img/illustrations/empty_applicant.png') + `"
                                    style="width: 100%">
                                <h3>Maaf saat ini data masih kosong</h3>
                            </div>
                        </div>
                    </div>`);
                }
                $.each(resp, function (i, v) {
                    let resIf = ''
                    if (v.lamaran_status != 'NOT OK') {
                        if (shortlist == 'shortlist_lanjutan') {
                            resIf = `
                            <div class="col-sm-4">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-block btn-danger" data-currentstep="null" data-id="${v.master_id}" onclick="Lowongan.rejectApplicant(this,event)">
                                        Reject
                                        <i class='bx bx-x-circle'></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-sm-8">
                                <div class="d-grid">
                                    <button class="btn btn-success text-nowrap"
                                        data-id="${v.master_id}"
                                        onclick="Lowongan.nextStepManager(this)">
                                        Next Step by HIRING MANAGER
                                        <i class="bx bxs-chevrons-right"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-12 mt-3" id="result-${v.master_id}">
                                <label for="reason-${v.master_id}" class="form-label">Shortlist Analysis</label>
                                <textarea class="form-control" readonly id="reason-${v.master_id}">${v.keterangan}</textarea>
                            </div>
                        `;
                        } else {
                            resIf = `
                            <div class="col-sm-6">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-block btn-danger" data-currentstep="null" data-id="${v.master_id}" onclick="Lowongan.rejectApplicant(this,event)">
                                        Reject
                                        <i class='bx bx-x-circle'></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="d-flex align-items-center border rounded px-2 py-1" style="padding-top: 0.4rem!important">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="${v.master_id}" id="applicant-${v.master_id}"
                                            onclick="Lowongan.shortlistReason(${v.master_id},this)">
                                        <label class="form-check-label" style="user-select: none" for="applicant-${v.master_id}">
                                        SHORTLIST LANJUTAN
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 mt-3 d-none" id="result-${v.master_id}">
                                <label for="reason-${v.master_id}" class="form-label">Shortlist Analysis</label>
                                <textarea class="form-control" readonly id="reason-${v.master_id}"></textarea>
                            </div>
                        `;
                        }

                    } else {
                        resIf = `
                            <div class="col-sm-6">
                                <button class="btn btn-block btn-secondary" disabled>
                                    Rejected
                                    <i class='bx bx-x-circle'></i>
                                </button>
                            </div>
                        `;
                    }
                    let str = `
                            <div class="col-md-6 col-lg-4 mb-3 app-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">${_.startCase(v.nama)}</h5>
                                        <p class="card-text">
                                            <span>${v.nama_pendidikan}</span><br>
                                            <span>${v.umur}</span><br>
                                            <span>${v.jabatan ?? '-'} (${v.pengalaman_kerja ?? '-'})</span>
                                        </p>
                                    </div>
                                    <div class="row p-3">
                                        <div class="col-sm-12 mb-2">
                                            <div class="d-grid gap-2">
                                                <button type="button" class="btn btn-info"  data-lowongan_id="${v.master_id}" data-id="${v.applicant_id}" onclick="Lowongan.applicantDetails(this)">
                                                    See Applicant Details
                                                </button>
                                            </div>
                                        </div>
                                        ${resIf}
                                    </div>
                                </div>
                            </div>
                        `;
                    $('#applicants').append(str)
                    Lowongan.setCardPagination()
                })
            }
        });
    },

    shortlistReason: (id, elm) => {
        // if($(this))
        // console.log($(elm).is(':checked'));
        if ($(elm).is(':checked')) {
            var textarea = $('#reason-' + id).val();
            // console.log('textarea ', textarea);
            bootbox.dialog({
                message: `
                <div>
                    <label for="inputAnalysis" class="form-label">Shortlist Analysis</label>
                    <textarea class="form-control" id="inputAnalysis-${id}" rows="3">${textarea}</textarea>
                    <button class="btn btn-success mt-2" onclick="Lowongan.saveShortlistAnalysis(${id})">Save</button>
                </div>
                `
            });
        }
    },

    saveShortlistAnalysis: (id) => {
        // console.log($('#inputAnalysis-' + id));
        $('#reason-' + id).val($('#inputAnalysis-' + id).val());
        $('.bootbox-close-button').click();
        $('#result-' + id).removeClass('d-none')
    },

    psikotesDefault: () => {
        location.reload();
        $("#temp-button").empty();
    },
    psikotesFilter: (id) => {
        let params = {};
        var psikotes = $('input[name="psikotes_filter"]:checked').val();

        if (psikotes == 'psikotes_lanjutan') {
            $("#temp-button").empty();
            params.lowongan = id;
            params.filter = 'psikotes_lanjutan';
        } else {
            $("#temp-button").empty();
            $("#temp-button").append(`<button onclick="Lowongan.savePsikotesTemp(this, event)"
            class="btn btn-primary btn-next ">
            <span class="d-sm-inline-block d-none me-sm-1">Simpan</span>
            <i class="bx bx-chevron-right bx-sm me-sm-2"></i>
            </button>`);
            params.lowongan = id;
            params.filter = 'psikotes_awal';
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "psikotesFiltered",

            beforeSend: () => {
                message.loadingProses('Loading ...');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                $('#applicants').empty();
                if (!$.trim(resp)) {
                    $("#temp-button").empty();
                    $('#applicants').append(`
                    <div class="col-md-12">
                        <div class="row justify-content-center">
                            <div class="col-md-4 text-center">
                                <img src="`+ url.base_url('/public/assets/img/illustrations/empty_applicant.png') + `"
                                    style="width: 100%">
                                <h3>Maaf saat ini data masih kosong</h3>
                            </div>
                        </div>
                    </div>`);
                }
                $.each(resp, function (i, v) {
                    let resIf = ''
                    let dataStep = $('#datastep').val();
                    let dataPermissionPsikotes = '';
                    if ($('#role_akses').val() != 'Manajer') {
                        dataPermissionPsikotes = 'disabled';
                    } else {
                        dataPermissionPsikotes = ''
                    }
                    if (v.lamaran_status != 'NOT OK') {
                        if (psikotes == 'psikotes_lanjutan') {
                            resIf = `
                                <div class="col-6">
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-block btn-danger" data-currentstep="null" data-id="${v.master_id}" onclick="Lowongan.rejectApplicant(this,event)">
                                            Reject
                                            <i class='bx bx-x-circle'></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="d-grid">
                                        <button class="btn btn-primary text-nowrap"
                                            data-id="${v.master_id}"
                                            onclick="Lowongan.nextStepManager(this)" ${dataPermissionPsikotes}>
                                            Next Step by HIRING MANAGER
                                            <i class="bx bxs-chevrons-right"></i>
                                        </button>
                                    </div>
                                </div>
                            `;
                        } else {
                            resIf = `
                                <div class="col-sm-6">
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-block btn-danger" data-currentstep="null" data-id="${v.master_id}" onclick="Lowongan.rejectApplicant(this,event)">
                                            Reject
                                            <i class='bx bx-x-circle'></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="d-flex align-items-center border rounded px-2 py-1" style="padding-top: 0.4rem!important">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="${v.master_id}" id="applicant-${v.master_id}">
                                            <label class="form-check-label" style="user-select: none" for="applicant-${v.master_id}">
                                            PSIKOTES LANJUTAN
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }

                    } else {
                        resIf = `
                                <div class="col-sm-6">
                                    <button class="btn btn-block btn-secondary" disabled>
                                        Rejected
                                        <i class='bx bx-x-circle'></i>
                                    </button>
                                </div>
                            `;
                    }
                    let str = `
                                <div class="col-md-6 col-lg-4 mb-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">${_.startCase(v.nama)}</h5>
                                            <p class="card-text">
                                                <span>${v.nama_pendidikan}</span><br>
                                                <span>${v.umur}</span><br>
                                                <span>${v.jabatan} (${v.pengalaman_kerja})</span>
                                            </p>
                                        </div>
                                        <div class="row p-3">
                                            <div class="col-sm-12 mb-2">
                                                <div class="d-grid gap-2">
                                                    <button type="button" class="btn btn-info" data-lowongan_id="${v.master_id}" data-id="${v.applicant_id}" onclick="Lowongan.applicantDetails(this)">
                                                        Applicant Details
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 mb-2">
                                                <div class="d-grid gap-2">
                                                    <button class="btn btn-block btn-primary"
                                                        data-id="${v.master_id}" data-step="${dataStep}"
                                                        onclick="Lowongan.hasilPsikotes(this)">
                                                        Hasil Psikotes by HC Recruitment
                                                        <i class='bx bx-file'></i>
                                                    </button>
                                                </div>
                                            </div>
                                            ${resIf}
                                        </div>
                                    </div>
                                </div>
                            `;
                    $('#applicants').append(str)
                    Lowongan.setCardPagination()
                })
            }
        });
    },

    getMCUDataTemp: () => {
        let params = [];
        let step = $('.form-check');
        $.each(step, function (i, v) {
            let $this = $(this);
            let tmp = {};
            let check = $this.find('input.form-check-input')[0].checked;
            if (check) {
                tmp.value = $this.find('input.form-check-input').val();
                params.push(tmp);
                // console.log($this.find('input.form-check-input').val());
            }
        });
        let data = {
            'id': $('#proses_rekrutmen').val(),
            'applicant': params
        };

        return data;
    },
    savemcuTemp: (elm, e) => {
        e.preventDefault();
        let params = Lowongan.getMCUDataTemp();
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            // return params;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "savemcuTemp",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a, b, c) {
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

    mcuDefault: () => {
        location.reload();
        $("#temp-button").empty();
    },
    mcuFilter: (id) => {
        let params = {};
        var mcu = $('input[name="mcu_filter"]:checked').val();

        if (mcu == 'mcu_lanjutan') {
            $("#temp-button").empty();
            params.lowongan = id;
            params.filter = 'mcu_lanjutan';
        } else {
            $("#temp-button").empty();
            $("#temp-button").append(`<button onclick="Lowongan.savemcuTemp(this, event)"
            class="btn btn-primary btn-next ">
            <span class="d-sm-inline-block d-none me-sm-1">Simpan</span>
            <i class="bx bx-chevron-right bx-sm me-sm-2"></i>
            </button>`);
            params.lowongan = id;
            params.filter = 'mcu_awal';
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "mcuFiltered",

            beforeSend: () => {
                message.loadingProses('Loading ...');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                $('#applicants').empty();
                if (!$.trim(resp)) {
                    $("#temp-button").empty();
                    $('#applicants').append(`
                    <div class="col-md-12">
                        <div class="row justify-content-center">
                            <div class="col-md-4 text-center">
                                <img src="`+ url.base_url('/public/assets/img/illustrations/empty_applicant.png') + `"
                                    style="width: 100%">
                                <h3>Maaf saat ini data masih kosong</h3>
                            </div>
                        </div>
                    </div>`);
                }
                $.each(resp, function (i, v) {
                    let resIf = ''
                    let dataStep = $('#datastep').val();
                    let dataPermissionHM = '';
                    if ($('#role_akses').val() == 'Manajer' && v.hasil != null) {
                        dataPermissionHM = ''
                    } else {
                        dataPermissionHM = 'disabled';
                    }
                    if (v.lamaran_status != 'NOT OK') {
                        if (mcu == 'mcu_lanjutan') {
                            resIf = `
                                <div class="col-4">
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-block btn-danger" data-currentstep="null" data-id="${v.master_id}" onclick="Lowongan.rejectApplicant(this,event)">
                                            Reject
                                            <i class='bx bx-x-circle'></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="d-grid">
                                        <button class="btn btn-primary text-nowrap"
                                            data-id="${v.master_id}"
                                            onclick="Lowongan.nextStepManager(this)" ${dataPermissionHM}>
                                            Next Step by HIRING MANAGER
                                            <i class="bx bxs-chevrons-right"></i>
                                        </button>
                                    </div>
                                </div>
                            `;
                        } else {
                            resIf = `
                                <div class="col-sm-6">
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-block btn-danger" data-currentstep="null" data-id="${v.master_id}" onclick="Lowongan.rejectApplicant(this,event)">
                                            Reject
                                            <i class='bx bx-x-circle'></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="d-flex align-items-center border rounded px-2 py-1" style="padding-top: 0.4rem!important">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="${v.master_id}" id="applicant-${v.master_id}">
                                            <label class="form-check-label" style="user-select: none" for="applicant-${v.master_id}">
                                            MCU LANJUTAN
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }

                    } else {
                        resIf = `
                                <div class="col-sm-6">
                                    <button class="btn btn-block btn-secondary" disabled>
                                        Rejected
                                        <i class='bx bx-x-circle'></i>
                                    </button>
                                </div>
                            `;
                    }
                    let str = `
                                <div class="col-md-6 col-lg-4 mb-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">${_.startCase(v.nama)}</h5>
                                            <p class="card-text">
                                                <span>${v.nama_pendidikan}</span><br>
                                                <span>${v.umur}</span><br>
                                                <span>${v.jabatan} (${v.pengalaman_kerja})</span>
                                            </p>
                                        </div>
                                        <div class="row p-3">
                                            <div class="col-sm-12 mb-2">
                                                <div class="d-grid gap-2">
                                                    <button type="button" class="btn btn-info" data-lowongan_id="${v.master_id}" data-id="${v.applicant_id}" onclick="Lowongan.applicantDetails(this)">
                                                        See Applicant Details
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-sm-12 mb-2">
                                                <div class="d-grid gap-2">
                                                    <button class="btn btn-block btn-primary"
                                                        data-id="${v.master_id}" data-step="${dataStep}"
                                                        onclick="Lowongan.hasilmcu(this)">
                                                        Hasil MCU by HC Recruitment
                                                        <i class='bx bx-file'></i>
                                                    </button>
                                                </div>
                                            </div>
                                            ${resIf}
                                        </div>
                                    </div>
                                </div>
                            `;
                    $('#applicants').append(str)
                    Lowongan.setCardPagination()
                })
            }
        });
    },

    // unprocessedDefault: () => {
    //     location.reload();
    //     $("#temp-button").empty();
    // },

    unprocessedFilter: (id, offset = 0) => {
        let params = {};
        var role = $('#role_akses').val()
        var unprocessed = $('input[name="unprocessed_filter"]:checked').val();
        var nama_applicant = $('#nama_applicant').val();

        if(unprocessed == 'shotlist_keseluruhan'){
            $("#temp-button").empty();
            params.lowongan = id;
            params.filter = 'shotlist_keseluruhan';
        }

        // if(unprocessed == 'shotlist_awal'){
        //     $("#temp-button").empty();
        //     $("#temp-button").append(`<button onclick="Lowongan.saveUnprocessedTemp(this, event)"
        //     class="btn btn-primary btn-next ">
        //     <span class="d-sm-inline-block d-none me-sm-1">Simpan</span>
        //     <i class="bx bx-chevron-right bx-sm me-sm-2"></i>
        //     </button>`);
        //     params.lowongan = id;
        //     params.filter = 'shotlist_awal';
        // }

        // if (unprocessed == 'unprocessed_lanjutan') {
        //     $("#temp-button").empty();
        //     $("#temp-button").append(`<button onclick="Lowongan.saveUnprocessedTempUndo(this, event)"
        //     class="btn btn-primary btn-next ">
        //     <span class="d-sm-inline-block d-none me-sm-1">Simpan</span>
        //     <i class="bx bx-chevron-right bx-sm me-sm-2"></i>
        //     </button>`);
        //     params.lowongan = id;
        //     params.filter = 'unprocessed_lanjutan';
        // }

        if ($('#urut1').val().length == 0) {
            $('#urut1dir').val('').trigger('change');
        }
        if ($('#urut2').val().length == 0) {
            $('#urut2dir').val('').trigger('change');
        }
        if ($('#urut3').val().length == 0) {
            $('#urut3dir').val('').trigger('change');
        }

        if ($('#urut1').val().length > 0 && $('#urut1dir').val().length == 0) {
            $('#urut1dir').val('asc').trigger('change');
        }
        if ($('#urut2').val().length > 0 && $('#urut2dir').val().length == 0) {
            $('#urut2dir').val('asc').trigger('change');
        }
        if ($('#urut3').val().length > 0 && $('#urut3dir').val().length == 0) {
            $('#urut3dir').val('asc').trigger('change');
        }

        params.id = id,
        params.mode = $('#mode').val() ?? null,
        params.urut1 = $('#urut1').val() ?? null,
        params.urut1 = $('#urut1').val() ?? null,
        params.urut2 = $('#urut2').val() ?? null,
        params.urut3 = $('#urut3').val() ?? null,
        params.urut1dir = $('#urut1dir').val() ?? null,
        params.urut2dir = $('#urut2dir').val() ?? null,
        params.urut3dir = $('#urut3dir').val() ?? null,
        params.offset = offset;
        params.nama = nama_applicant;

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "unprocessedFiltered",

            beforeSend: () => {
                message.loadingProses('Loading ...');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {

                let total = resp.total
                let offset = resp.offset

                message.closeLoading();
                $('#applicants').empty();
                if (!$.trim(resp.data)) {
                    $("#temp-button").empty();
                    $('#applicants').append(`
                    <div class="col-md-12">
                        <div class="row justify-content-center">
                            <div class="col-md-4 text-center">
                                <img src="`+ url.base_url('/public/assets/img/illustrations/empty_applicant.png') + `"
                                    style="width: 100%">
                                <h3>Maaf saat ini data masih kosong</h3>
                            </div>
                        </div>
                    </div>`);
                }else{
                    let btn = ``;

                    if(offset){
                        btn += `<button onclick="Lowongan.unprocessedFilter(${id}, ${offset - 9})" class="btn btn-danger">Prev</button>`;
                    }

                    if(resp.data.length == 9){
                        btn += `<button onclick="Lowongan.unprocessedFilter(${id}, ${offset + resp.data.length})" class="btn btn-primary mx-2">Next</button>`;
                    }

                    $("#temp-button").append(`<div class="row">
                        <div class="col-12">
                            ${btn} Menampilkan ${1 + offset} - ${offset + 9} dari ${total} data
                        </div>
                    </div>`);

                    if(['HC Recruitment'].includes(role)){
                        $("#temp-button").append(`<button onclick="Lowongan.saveShortlistTemp(this, event)"
                            class="btn btn-primary btn-next ">
                            <span class="d-sm-inline-block d-none me-sm-1">Lanjut ke Shortlist</span>
                            <i class="bx bx-chevron-right bx-sm me-sm-2"></i>
                            </button>`);
                    }
                }

                $.each(resp.data, function (i, v) {
                    let resIf = ''
                    if (v.lamaran_status != 'NOT OK') {
                        if(['HC Recruitment'].includes(role)){
                            if (unprocessed == 'unprocessed_lanjutan') {
                                resIf = `
                                <div class="col-sm-6">
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-block btn-danger" data-currentstep="null" data-id="${v.master_id}" onclick="Lowongan.rejectApplicant(this,event)">
                                            Reject
                                            <i class='bx bx-x-circle'></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="d-flex align-items-center border rounded px-2 py-1" style="padding-top: 0.4rem!important">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="${v.master_id}" id="applicant-${v.master_id}"
                                                >
                                            <label class="form-check-label" style="user-select: none" for="applicant-${v.master_id}">
                                            UNPROCESSED AWAL
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            `;

                            }

                            if (unprocessed == 'shotlist_awal'){
                                resIf = `
                                <div class="col-sm-6">
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-block btn-danger" data-currentstep="null" data-id="${v.master_id}" onclick="Lowongan.rejectApplicant(this,event)">
                                            Reject
                                            <i class='bx bx-x-circle'></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="d-flex align-items-center border rounded px-2 py-1" style="padding-top: 0.4rem!important">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="${v.master_id}" id="applicant-${v.master_id}"
                                                >
                                            <label class="form-check-label" style="user-select: none" for="applicant-${v.master_id}">
                                            UNPROCESSED LANJUTAN
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            `;
                            }

                            if (unprocessed == 'shotlist_keseluruhan'){
                                resIf = `
                                <div class="col-sm-6">
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-block btn-danger" data-currentstep="null" data-id="${v.master_id}" onclick="Lowongan.rejectApplicant(this,event)">
                                            Reject
                                            <i class='bx bx-x-circle'></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="d-flex align-items-center border rounded px-2 py-1" style="padding-top: 0.4rem!important">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="${v.master_id}" id="applicant-${v.master_id}"
                                                >
                                            <label class="form-check-label" style="user-select: none" for="applicant-${v.master_id}">
                                            SHORTLIST
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                    <div class="col-12 mt-3" id="result-${v.master_id}">
                                        <label for="reason-${v.master_id}" class="form-label">Remark Analysis</label>
                                        <input type="hidden" id="nama-${v.master_id}" value="${_.startCase(v.nama)}">
                                        <textarea class="form-control" id="reason-${v.master_id}"></textarea>
                                    </div>
                                </div>
                            `;
                            }
                        }

                    } else {
                        resIf = `
                            <div class="col-sm-6">
                                <button class="btn btn-block btn-secondary" disabled>
                                    Rejected
                                    <i class='bx bx-x-circle'></i>
                                </button>
                            </div>
                            <div class="col-sm-6">
                                <div class="d-flex align-items-center border rounded px-2 py-1" style="padding-top: 0.4rem!important">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="${v.master_id}" id="applicant-${v.master_id}"
                                            >
                                        <label class="form-check-label" style="user-select: none" for="applicant-${v.master_id}">
                                        SHORTLIST
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="col-12 mt-3" id="result-${v.master_id}">
                                    <label for="reason-${v.master_id}" class="form-label">Remark Analysis</label>
                                    <input type="hidden" id="nama-${v.master_id}" value="${_.startCase(v.nama)}">
                                    <textarea class="form-control" id="reason-${v.master_id}"></textarea>
                                </div>
                            </div>
                        `;
                    }
                    let str = `
                            <div class="col-md-6 col-lg-4 mb-3 app-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">${_.startCase(v.nama)}</h5>
                                        <p class="card-text">
                                            <span>${v.umur}</span><br>
                                            <span>${v.nama_pendidikan}</span><br>
                                            <span>${v.jenis_kelamin}</span><br>
                                            <span>${v.jabatan ?? '-'} (${v.pengalaman_kerja ?? '-'})</span>
                                        </p>
                                    </div>
                                    <div class="row p-3">
                                        <div class="col-sm-12 mb-2">
                                            <div class="d-grid gap-2">
                                                <button type="button" class="btn btn-info" data-lowongan_id="${v.master_id}" data-id="${v.applicant_id}" onclick="Lowongan.applicantDetails(this)">
                                                    Applicant Details
                                                </button>
                                            </div>
                                        </div>
                                        ${resIf}
                                    </div>
                                </div>
                            </div>
                        `;
                    $('#applicants').append(str)
                    // Lowongan.setCardPagination()
                })

            }
        });
    },

    getUnprocessedData: () => {
        let params = [];
        let step = $('.form-check');
        $.each(step, function (i, v) {
            let $this = $(this);
            let tmp = {};
            let check = $this.find('input.form-check-input')[0].checked;
            if (check) {
                tmp.value = $this.find('input.form-check-input').val();
                params.push(tmp);
                // console.log($this.find('input.form-check-input').val());
            }
        });
        let data = {
            'id': $('#proses_rekrutmen').val(),
            'applicant': params
        };

        return data;
    },

    saveUnprocessedTemp: (elm, e) => {
        e.preventDefault();
        let params = Lowongan.getUnprocessedData();

        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            // console.log(params);
            // return params;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "saveUnprocessedTemp",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a, b, c) {
                    // console.log(a, b, c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    // console.log(resp);
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

    saveUnprocessedTempUndo: (elm, e) => {
        e.preventDefault();
        let params = Lowongan.getUnprocessedData();

        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            // console.log(params);
            // return params;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "saveUnprocessedTempUndo",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a, b, c) {
                    // console.log(a, b, c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    // console.log(resp);
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

    initialolDefault: () => {
        location.reload();
        $("#temp-button").empty();
    },
    initialolFilter: (id) => {
        let params = {};
        var initialol = $('input[name="initialol_filter"]:checked').val();

        if (initialol == 'initialol_lanjutan') {
            $("#temp-button").empty();
            params.lowongan = id;
            params.filter = 'initialol_lanjutan';
        } else {
            $("#temp-button").empty();
            $("#temp-button").append(`<button onclick="Lowongan.saveInitialolTemp(this, event)"
            class="btn btn-primary btn-next ">
            <span class="d-sm-inline-block d-none me-sm-1">Simpan</span>
            <i class="bx bx-chevron-right bx-sm me-sm-2"></i>
            </button>`);
            params.lowongan = id;
            params.filter = 'initialol_awal';
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "initialolFiltered",

            beforeSend: () => {
                message.loadingProses('Loading ...');
            },

            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                $('#applicants').empty();
                if (!$.trim(resp)) {
                    $("#temp-button").empty();
                    $('#applicants').append(`
                    <div class="col-md-12">
                        <div class="row justify-content-center">
                            <div class="col-md-4 text-center">
                                <img src="`+ url.base_url('/public/assets/img/illustrations/empty_applicant.png') + `"
                                    style="width: 100%">
                                <h3>Maaf saat ini data masih kosong</h3>
                            </div>
                        </div>
                    </div>`);
                }
                $.each(resp, function (i, v) {
                    let resIf = ''
                    let dataStep = $('#datastep').val();
                    if (v.lamaran_status != 'NOT OK') {
                        let dataStatusHasil = '';
                        if (v.status == 'REJECT' || v.status == 'DEAL') {
                            dataStatusHasil = 'Lowongan.nextStepManager(this)';
                        } else {
                            dataStatusHasil = 'Lowongan.alertComplete()'
                        }
                        if (initialol == 'initialol_lanjutan') {
                            resIf = `
                            <div class="col-sm-4">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-block btn-danger" data-currentstep="null" data-id="${v.master_id}" onclick="Lowongan.rejectApplicant(this,event)">
                                        Reject
                                        <i class='bx bx-x-circle'></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-sm-8">
                                <div class="d-grid">
                                    <button class="btn btn-primary text-nowrap"
                                        data-id="${v.master_id}"
                                        onclick="${dataStatusHasil}">
                                        Next Step by HIRING MANAGER
                                        <i class="bx bxs-chevrons-right"></i>
                                    </button>
                                </div>
                            </div>
                        `;
                        } else {
                            resIf = `
                            <div class="col-sm-6">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-block btn-danger" data-currentstep="null" data-id="${v.master_id}" onclick="Lowongan.rejectApplicant(this,event)">
                                        Reject
                                        <i class='bx bx-x-circle'></i>
                                    </button>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="d-grid gap-2">
                                    <div class="d-flex align-items-center border rounded px-2 py-1" style="padding-top: 0.4rem!important">
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value="${v.master_id}" id="applicant-${v.master_id}">
                                            <label class="form-check-label" style="user-select: none" for="applicant-${v.master_id}">
                                            Initial OL LANJUTAN
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        }

                    } else {
                        resIf = `
                            <div class="col-6">
                                <div class="d-grid gap-2">
                                    <button class="btn btn-block btn-secondary" disabled>
                                        Reject
                                        <i class='bx bx-x-circle'></i>
                                    </button>
                                </div>
                            </div>
                        `;
                    }
                    let str = `
                            <div class="col-md-6 col-lg-4 mb-3 app-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">${_.startCase(v.nama)}</h5>
                                        <p class="card-text">
                                            <span>${v.nama_pendidikan}</span><br>
                                            <span>${v.umur}</span><br>
                                            <span>${v.jabatan ?? '-'} (${v.pengalaman_kerja ?? '-'})</span>
                                        </p>
                                    </div>
                                    <div class="row g-1 m-3">
                                        <div class="col-4">
                                            <div class="d-grid gap-2">
                                                <button type="button" class="btn btn-info" data-lowongan_id="${v.master_id}" data-id="${v.applicant_id}" onclick="Lowongan.applicantDetails(this)">
                                                    Applicant Details
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-8">
                                            <div class="d-grid gap-2">
                                                <button type="button" class="btn btn-primary" data-step="${dataStep}" data-id="${v.master_id}" onclick="Lowongan.hasilInitialol(this)">
                                                    Hasil Initial OL by HC TRM
                                                    <i class='bx bx-file'></i>
                                                </button>
                                            </div>
                                        </div>
                                        ${resIf}
                                    </div>
                                </div>
                            </div>
                        `;
                    $('#applicants').append(str)
                    Lowongan.setCardPagination()
                })
            }
        });
    },

    getInitialolData: () => {
        let params = [];
        let step = $('.form-check');
        $.each(step, function (i, v) {
            let $this = $(this);
            let tmp = {};
            let check = $this.find('input.form-check-input')[0].checked;
            if (check) {
                tmp.value = $this.find('input.form-check-input').val();
                params.push(tmp);
                // console.log($this.find('input.form-check-input').val());
            }
        });
        let data = {
            'id': $('#proses_rekrutmen').val(),
            'applicant': params
        };

        return data;
    },

    saveInitialolTemp: (elm, e) => {
        e.preventDefault();
        let params = Lowongan.getInitialolData();

        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            // console.log(params);
            // return params;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "saveInitialolTemp",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a, b, c) {
                    // console.log(a, b, c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    // console.log(resp);
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
    hasilInitialol: (elm) => {
        // let id = $(elm).data('id');
        // let step = $(elm).data('step');
        let params = {
            'id': $(elm).data('id'),
            'step': $(elm).data('step'),
        };
        // console.log(params);
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "hasilInitialol",

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
                    size: 'x-large'
                });
                $('.modal').animate({ scrollTop: 0 }, 500, 'swing');
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();
            }
        });
    },


    getPostItemFasilitas: (elm) => {
        let data = [];
        let keluarga = $('#table-data-fasilitas').find('tbody').find('tr.input');
        $.each(keluarga, function () {
            let params = {};
            params.fasilitas_id = $(this).find('#fasilitas').val();
            data.push(params);
        });

        return data;
    },
    saveHasilInitialOL: (elm, e) => {
        e.preventDefault();
        let hasil = '';

        let data = {
            'lamaran': $(elm).data('id'),
            'current_step': $('#current_step').val(),
            'gaji_pokok': $('#gaji_pokok').val(),
            // 'tunjangan': $('#tunjangan').val(),
            'allow_nego': $('#allow_nego').val(),
            // 'fasilitas': Lowongan.getPostItemFasilitas(),
        }
        // console.log(data);
        // return data;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: data,
            url: url.base_url(Lowongan.moduleApi()) + "saveHasilInitialOL",
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
                        window.location.reload()
                    }, 1000);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },

    addFasilitas: (elm, e) => {
        e.preventDefault();


        let addMore = ``;

        $.ajax({
            type: 'POST',
            dataType: 'html',
            url: url.base_url(Lowongan.moduleApi()) + "dataFasilitas",

            // beforeSend: () => {
            //     message.loadingProses('Proses Pengambilan Data');
            // },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();

                let addMore2 = ``;
                $.each(JSON.parse(resp), function (i, v) {
                    addMore2 += `<option value="${v.id}">${v.nama_fasilitas}</option>`;
                });
                addMore = `<tr data_id="" class="input">
                        <td>
                            <div class="col-sm-12">
                                <div class="input-group">
                                    <select class="select2 form-select" id="fasilitas">
                                        <option value="">- Pilih Fasilitas -</option>`
                    +
                    addMore2
                    + `</select>
                                </div>
                            </div>
                        </td>
                        <td class="text-center">
                            <i class="bx bx-trash" style="cursor: pointer;" onclick="Lowongan.removeFasilitas(this, event)"></i>
                        </td>
                    </tr>`

                let params = {};
                let table = $('table#table-data-fasilitas').find('tbody');
                table.find('tr.action').before(addMore);
                params.counterTr = table.find('tr').length;
            }
        });


    },


    removeFasilitas: (elm) => {
        let id = $(elm).closest('tr').attr('data_id');
        if (id == '') {
            $(elm).closest('tr').remove();
        } else {
            $(elm).closest('tr').addClass('hide');
            $(elm).closest('tr').addClass('remove');
        }
    },

    hasilInitialOlShowSlipGaji: (url) => {
        var html = `<iframe src="${url}" width="100%" height="500px"><iframe>;`
        bootbox.dialog({
            message: html,
            size: 'large'
        });
    },

    hasilInitialOlemail: (data) => {
        // console.log(data);
        let params = {
            'id': data,
            'id_applicant': $('#id_applicant').val()
        };
        // return params;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "emailInitialOL",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

            }
        });
    },


    sendEmailInitialOl: (elm, e) => {
        e.preventDefault();
        let params = {};
        params = {
            'applicant_email': $('#applicant_email').val(),
            'body_email': tinymce.get("body_email").getContent(),
            'id' : $(elm).data('id')
        }

        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "sendEmailInitialOl",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a, b, c) {
                    // console.log(a, b, c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Email Berhasil Dikirim');
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

    hasilOlemail: (data) => {
        // console.log(data);
        let params = {
            'id': data,
            'id_applicant': $('#id_applicant').val()
        };
        // return params;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "emailOL",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

            }
        });
    },


    sendEmailOl: (elm, e) => {
        e.preventDefault();
        let params = {};
        params = {
            'applicant_email': $('#applicant_email').val(),
            'body_email': tinymce.get("body_email").getContent(),
        }

        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "sendEmailOl",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a, b, c) {
                    // console.log(a, b, c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Email Berhasil Dikirim');
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

    hasilonboardingpreparation: (elm) => {
        // let id = $(elm).data('id');
        // let step = $(elm).data('step');
        let params = {
            'id': $(elm).data('id'),
            'step': $(elm).data('step'),
        };
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "hasilonboardingpreparation",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                $('.modal').animate({ scrollTop: 0 }, 500, 'swing');

            }
        });
    },

    hasilonboardingpreparation_fasilitas: (elm) => {
        let params = {
            'id': $(elm).data('id'),
            'step': $(elm).data('step') ?? 'Onboarding Preparation',
        };

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "hasilonboardingpreparation_fasilitas",

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
                Lowongan.setDate();
                $('.modal').animate({ scrollTop: 0 }, 500, 'swing');
                $('.modal-lg').css('max-width', '80%');
            }
        });
    },

    saveHasilOnboardingpreparation_fasilitas: (elm, e) => {
        e.preventDefault();

        let params = [];

        $.each($('.list-fasilitas'), function (i, v) {
            let $this = $(this);
            let tmp = {};

            let check = $this.find('input.enabler:checked').length;

            tmp.id = $this.find('input.id').val();
            tmp.key = $this.find('input.key').val();
            tmp.keterangan = $this.find('textarea.keterangan').val();
            tmp.pic_nama = $this.find('input.pic_nama').val();
            tmp.pic_email = $this.find('input.pic_email').val();
            tmp.pic_wa = $this.find('input.pic_wa').val();
            tmp.tgl = $this.find('input.tgl').val();
            tmp.is_active = (check) ? 1 : 0;
            params.push(tmp);
        })

        let data = {
            'lamaran': $(elm).data('id'),
            'step' : $(elm).data('step'),
            'data': params,
        }

        // console.log(data);return;

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: data,
            url: url.base_url(Lowongan.moduleApi()) + "saveHasilOnboardingpreparation_fasilitas",
            beforeSend: () => {
                message.loadingProses('Proses Simpan Data...');
            },
            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Data Berhasil Disimpan');
                    setTimeout(function () {
                        window.location.reload()
                    }, 1000);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },

    hasilonboardingpreparation_rundown: (elm) => {
        let params = {
            'id': $(elm).data('id'),
        };

        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "hasilonboardingpreparation_rundown",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                $('.modal').animate({ scrollTop: 0 }, 500, 'swing');
            }
        });
    },

    saveHasilOnboardingpreparation_rundown: (elm, e) => {
        e.preventDefault();

        var pic = $('.rundown input#pic').val();

        let params = {
            tanggal: $('.rundown input#tanggal').val(),
            jam_mulai: $('.rundown input#jam_mulai').val(),
            jam_selesai: $('.rundown input#jam_selesai').val(),
            rencana_kegiatan: $('.rundown input#rencana_kegiatan').val(),
            pic: pic.split(' - ')[0],
            pic_nama: pic.split(' - ')[1],
            lokasi: $('.rundown input#lokasi').val(),
            onboarding_preparation: $('.rundown input#onboarding_preparation').val(),
            onboarding_preparation_rundown_id: $('.rundown input#onboarding_preparation_rundown_id').val(),
        }

        let data = {
            'lamaran': $(elm).data('id'),
            'data': params,
        }
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: data,
            url: url.base_url(Lowongan.moduleApi()) + "saveHasilOnboardingpreparation_rundown",
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
                    var a = $('.bootbox-close-button.btn-close').filter((i,e) => i==1 ? e : '' )
                    a.trigger('click');

                    Lowongan.hasilonboardingpreparation_rundown(elm);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },

    onboardingpreparation_rundown_edit: (elm) => {
        var row = JSON.parse(elm);

        $('.rundown input#tanggal').val(row.tanggal);
        $('.rundown input#jam_mulai').val(row.jam_mulai);
        $('.rundown input#jam_selesai').val(row.jam_selesai);
        $('.rundown input#rencana_kegiatan').val(row.rencana_kegiatan);
        $('.rundown input#pic').val(row.pic + " - " + row.pic_nama);
        $('.rundown input#lokasi').val(row.lokasi);
        $('.rundown input#onboarding_preparation').val(row.onboarding_preparation);
        $('.rundown input#onboarding_preparation_rundown_id').val(row.id);
    },

    onboardingpreparation_rundown_hapus: (elm) => {

        var row = JSON.parse(elm);

        const params = {
            'data' : {
                onboarding_preparation_rundown_id : row.id,
                delete : true
            }
        }

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "saveHasilOnboardingpreparation_rundown",
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
                    var a = $('.bootbox-close-button.btn-close').filter((i,e) => i==1 ? e : '' )
                    a.trigger('click');

                    Lowongan.hasilonboardingpreparation_rundown(elm);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },

    workingAgreementEmailRundownInvitation: (data) => {
        let params = {
            'id': data,
            'id_applicant': $('#id_applicant').val()
        };
        // return params;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "workingAgreementEmailRundownInvitation",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

            }
        });
    },

    sendworkingAgreementEmailRundownInvitation: (elm, e) => {
        e.preventDefault();
        let params = {};

        // var receiver_email = [];
        // $.each($('input[type=checkbox][name=receiver_email]:checked'), function(){
        //     var email = $(this).data('email');
        //     receiver_email.push(email);
        // });

        // var receiver_nama = [];
        // $.each($('input[type=checkbox][name=receiver_nama]:checked'), function(){
        //     var nama = $(this).data('nama');
        //     receiver_nama.push(nama);
        // });

        // var receiver_wa = [];
        // $.each($('input[type=checkbox][name=receiver_wa]:checked'), function(){
        //     var wa = $(this).data('wa');
        //     receiver_wa.push(wa);
        // });

        params = {
            'working_agreement_id': $('#working_agreement_id').val(),
            // 'receiver_email': receiver_email,
            // 'receiver_nama': receiver_nama,
            // 'receiver_wa': receiver_wa,
            'body_email': tinymce.get("body_email").getContent(),
        }

        // console.log(params);return;

        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "sendworkingAgreementEmailRundownInvitation",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a, b, c) {
                    // console.log(a, b, c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Email Berhasil Dikirim '+resp.message+'');
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

    workingAgreementEmailRundownEndConfirmation: (data) => {
        let params = {
            'id': data,
            'id_applicant': $('#id_applicant').val()
        };
        // return params;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "workingAgreementEmailRundownEndConfirmation",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

            }
        });
    },

    sendworkingAgreementEmailRundownEndConfirmation: (elm, e) => {
        e.preventDefault();
        let params = {};

        params = {
            'working_agreement_id': $('#working_agreement_id').val(),
        }

        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "sendworkingAgreementEmailRundownEndConfirmation",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a, b, c) {
                    // console.log(a, b, c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Berhasil disimpan');
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

    saveWorkingAgreement: (elm, e) => {
        e.preventDefault();

        let data = {
            'lamaran': $(elm).data('id'),
            'current_step': $('#current_step').val(),
            'attachment_wa': Lowongan.getPostInputDokumen(),
        }
        // console.log(data);
        // return data;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: data,
            url: url.base_url(Lowongan.moduleApi()) + "saveWorkingAgreement",
            beforeSend: () => {
                message.loadingProses('Proses Simpan Data...');
            },
            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Data Berhasil Disimpan');
                    setTimeout(function () {
                        window.location.reload()
                    }, 1000);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },

    workingAgreementEmail: (data) => {
        let params = {
            'id': data,
            'id_applicant': $('#id_applicant').val()
        };
        // return params;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "workingAgreementEmail",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

            }
        });
    },

    sendworkingAgreementEmail: (elm, e) => {
        e.preventDefault();
        let params = {};
        params = {
            'working_agreement_id': $('#working_agreement_id').val(),
            'applicant_email': $('#applicant_email').val(),
            'body_email': tinymce.get("body_email").getContent(),
        }

        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "sendworkingAgreementEmail",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a, b, c) {
                    // console.log(a, b, c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Email Berhasil Dikirim');
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


    // common letter
    saveWorkingAgreementCommonLetter: (elm, e) => {
        e.preventDefault();

        let data = {
            'lamaran': $(elm).data('id'),
            'current_step': $('#current_step').val(),
            'attachment_wa': Lowongan.getPostInputDokumen(),
        }
        // console.log(data);
        // return data;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: data,
            url: url.base_url(Lowongan.moduleApi()) + "saveWorkingAgreementCommonLetter",
            beforeSend: () => {
                message.loadingProses('Proses Simpan Data...');
            },
            error: function () {
                message.closeLoading();
                Toast.error('Informasi', "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Data Berhasil Disimpan');
                    setTimeout(function () {
                        window.location.reload()
                    }, 1000);
                } else {
                    bootbox.dialog({
                        message: resp.message
                    });
                }
            }
        });
    },

    workingAgreementEmailCommonLetter: (data) => {
        let params = {
            'id': data,
            'id_applicant': $('#id_applicant').val()
        };
        // return params;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "workingAgreementEmailCommonLetter",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

            }
        });
    },

    sendworkingAgreementEmailCommonLetter: (elm, e) => {
        e.preventDefault();
        let params = {};
        params = {
            'working_agreement_id': $('#working_agreement_id').val(),
            'applicant_email': $('#applicant_email').val(),
            'body_email': tinymce.get("body_email").getContent(),
        }

        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "sendworkingAgreementEmailCommonLetter",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a, b, c) {
                    // console.log(a, b, c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Email Berhasil Dikirim');
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

    // BACKGROUND CHECKING
    formEmailBackgroundChecking: (data) => {
        // console.log(data);
        let params = {
            'id_applicant' : $(data).data('id'),
            'id_lamaran' : $(data).data('lamaran-id')
        };
        // console.log(params);return;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "formEmailBackgroundChecking",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

            }
        });
    },

    sendEmailBackgroundChecking: (elm,e) => {
        e.preventDefault();
        let params = {};
        params = {
            'applicant_email': $('#applicant_email').val(),
            'body_email': tinymce.get("body_email").getContent(),
            'lamaran_id': $(elm).data('id'),
        }
        // console.log(params);return;
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "sendEmailBackgroundChecking",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a,b,c) {
                    // console.log(a,b,c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Email Berhasil Dikirim');
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    } else {
                        // bootbox.dialog({
                        //     message: resp.message
                        // });
                    }
                }
            });
        }
    },

    confirmBackgroundChecking : (elm,e) => {
        e.preventDefault();
        let data_id = $(elm).data('lamaran-id');

        let html = `<div class="row g-3">
                        <div class="col-12">
                            <h5 class="py-3 breadcrumb-wrapper mb-4">
                                <span class="text-muted fw-light">Yakin untuk melanjutkan?</span>
                            </h5>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-12 text-center">
                            <button onclick="message.closeDialog()"
                                    class="btn btn-secondary btn-next">
                                    Batal
                            </button>
                            <button onclick="Lowongan.confirmBackgroundCheckingSubmit('${data_id}')"
                                    class="btn btn-danger btn-next">
                                    Ya
                            </button>
                        </div>
                    </div>`;

        bootbox.dialog({
            message: html,
            size: 'small'
        });
    },

    confirmBackgroundCheckingSubmit: (id) => {
        // console.log(id);return;
        let params = {
            'lamaran_id' : id
        };
        // console.log(params);return;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "confirmBackgroundCheckingSubmit",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                // console.log(resp);return;
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success('Informasi', 'Berhasil Disimpan');
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
    },

    // INTERVIEW
    formEmailInterview: (data) => {
        // console.log(data);
        let params = {
            'id_applicant' : $(data).data('id'),
            'id_lamaran' : $(data).data('lamaran-id'),
            'tipe' : $(data).data('step'),
        };
        // console.log(params);
        // return;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "formemailinterview",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

            }
        });
    },

    sendEmailInterview: (elm,e) => {
        e.preventDefault();
        let params = {};

        let confirm = $(elm).data('confirm');

        params = {
            'applicant_email': $('#applicant_email').val(),
            'body_email': tinymce.get("body_email").getContent(),
            'lamaran_id': $('#lamaran_id').val(),
            'tgl_interview': $('#tgl_interview').val(),
            'tempat': $('#tempat').val(),
            'link': $('#link').val(),
            'tipe': $('#tipe').val(),
            'confirm' : confirm
        }
        // console.log(params);return;
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {

            if(params.tgl_interview == ''){
                Toast.error('Informasi', `Tanggal dan Jam Interview harus diisi`);return;
            }

            if(params.tempat == ''){
                Toast.error('Informasi', `Tempat harus diisi`);return;
            }

            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "sendEmailInterview",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a,b,c) {
                    // console.log(a,b,c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Email Berhasil Dikirim');
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

    // PSIKOTES
    formEmailPsikotes: (data) => {
        // console.log(data);
        let params = {
            'id_applicant' : $(data).data('id'),
            'id_lamaran' : $(data).data('lamaran-id')
        };
        // console.log(params);return;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "formEmailPsikotes",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

            }
        });
    },

    sendEmailPsikotes: (elm,e) => {
        e.preventDefault();
        let params = {};
        params = {
            'applicant_email': $('#applicant_email').val(),
            'body_email': tinymce.get("body_email").getContent(),
            'lamaran_id': $(elm).data('id'),
            'tanggal_jam_tes': $('#tanggal_jam_tes').val(),
            'tempat_tes': $('#tempat_tes').val(),
        }
        // console.log(params);return;
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "sendEmailPsikotes",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a,b,c) {
                    // console.log(a,b,c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Email Berhasil Dikirim');
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

    // MCU
    formEmailMCU: (data) => {
        // console.log(data);
        let params = {
            'id_applicant' : $(data).data('id'),
            'id_lamaran' : $(data).data('lamaran-id')
        };
        // console.log(params);return;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "formEmailMCU",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

            }
        });
    },

    sendEmailMCU: (elm,e) => {
        e.preventDefault();
        let params = {};
        params = {
            'applicant_email': $('#applicant_email').val(),
            'body_email': tinymce.get("body_email").getContent(),
            'lamaran_id': $(elm).data('id'),
            'tanggal_jam_tes': $('#tanggal_jam_tes').val(),
            'tempat_tes': $('#tempat_tes').val(),
        }
        // console.log(params);return;
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "sendEmailMCU",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a,b,c) {
                    // console.log(a,b,c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Email Berhasil Dikirim');
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

    // OL
    formEmailOL: (data) => {
        // console.log(data);
        let params = {
            'id_applicant' : $(data).data('id'),
            'id_lamaran' : $(data).data('lamaran-id')
        };
        // console.log(params);return;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "formEmailOL",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

            }
        });
    },

    sendEmailOL: (elm,e) => {
        e.preventDefault();
        let params = {};
        params = {
            'applicant_email': $('#applicant_email').val(),
            'body_email': tinymce.get("body_email").getContent(),
            'lamaran_id': $(elm).data('id'),
            'attachment': Lowongan.getPostInputDokumen(),
            'fasilitas': Lowongan.getPostItemFasilitas(),
        }

        if(params.attachment.file == '' || params.attachment.file == undefined){
            Toast.error('Informasi', "ATTACHMENT OFFERING LETTER wajib diisi");return;
        }

        // console.log(params);return;
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "sendEmailOL",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a,b,c) {
                    // console.log(a,b,c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Email Berhasil Dikirim');
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

    // WA
    formEmailWA: (data) => {
        // console.log(data);
        let params = {
            'id_applicant' : $(data).data('id'),
            'id_lamaran' : $(data).data('lamaran-id')
        };
        // console.log(params);return;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "formEmailWA",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

            }
        });
    },

    sendEmailWA: (elm,e) => {
        e.preventDefault();
        let params = {};
        params = {
            'applicant_email': $('#applicant_email').val(),
            'body_email': tinymce.get("body_email").getContent(),
            'lamaran_id': $(elm).data('id'),
            'attachment': Lowongan.getPostInputDokumen(),
        }

        if(params.attachment.file == '' || params.attachment.file == undefined){
            Toast.error('Informasi', "ATTACHMENT WORKING AGREEMENT / PKWT wajib diisi");return;
        }

        // console.log(params);return;
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "sendEmailWA",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a,b,c) {
                    // console.log(a,b,c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Email Berhasil Dikirim');
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

    // Onboarding
    formEmailOnboarding: (data) => {
        // console.log(data);
        let params = {
            'id_applicant' : $(data).data('id'),
            'id_lamaran' : $(data).data('lamaran-id')
        };
        // console.log(params);return;
        $.ajax({
            type: 'POST',
            dataType: 'html',
            data: params,
            url: url.base_url(Lowongan.moduleApi()) + "formEmailOnboarding",

            beforeSend: () => {
                message.loadingProses('Proses Pengambilan Data');
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi","Gagal");
            },

            success: function (resp) {
                // console.log(resp);
                message.closeLoading();
                bootbox.dialog({
                    message: resp,
                    size: 'large'
                });
                Lowongan.setDate();
                Lowongan.select2All();
                Lowongan.editor();

            }
        });
    },

    sendEmailOnboarding: (elm,e) => {
        e.preventDefault();
        let params = {};
        params = {
            'id': $('#onboarding_id').val(),
            'applicant_id': $('#applicant_id').val(),
            'applicant_email': $('#applicant_email').val(),
            'body_email': tinymce.get("body_email").getContent(),
            'lamaran': $(elm).data('id'),
            'tgl_join': $('#tgl_join').val(),
            'username': $('#username').val(),
            'password': $('#password').val(),
        }
        // console.log(params);return;
        let form = $(elm).closest('div.row');
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: url.base_url(Lowongan.moduleApi()) + "sendEmailOnboarding",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function (a,b,c) {
                    // console.log(a,b,c);
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Email Berhasil Dikirim');
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

};

$(function () {
    if (['Superadmin','HC Recruitment', 'Admin HC Recruitment'].includes($('#role_akses').val())) {

        var unprocessed = $('input[name="unprocessed_filter"]:checked').val();

        var shortlist = $('input[name="shortlist_filter"]:checked').val();
        var psikotes = $('input[name="psikotes_filter"]:checked').val();
        var mcu = $('input[name="mcu_filter"]:checked').val();

        if(unprocessed == 'shotlist_keseluruhan'){
            Lowongan.unprocessedFilter($('#id').val());
        }

        if (unprocessed == 'unprocessed_awal') {
            $("#temp-button").empty();
            $("#temp-button").append(`<button onclick="Lowongan.saveUnprocessedTemp(this, event)"
            class="btn btn-primary btn-next ">
            <span class="d-sm-inline-block d-none me-sm-1">Simpan</span>
            <i class="bx bx-chevron-right bx-sm me-sm-2"></i>
            </button>`);
        }

        if (shortlist == 'shortlist_awal') {
            $("#temp-button").empty();
            $("#temp-button").append(`<button onclick="Lowongan.saveShortlistTemp(this, event)"
            class="btn btn-primary btn-next ">
            <span class="d-sm-inline-block d-none me-sm-1">Simpan</span>
            <i class="bx bx-chevron-right bx-sm me-sm-2"></i>
            </button>`);
        }

        if (psikotes == 'psikotes_filter') {
            $("#temp-button").empty();
            $("#temp-button").append(`<button onclick="Lowongan.savePsikotesTemp(this, event)"
            class="btn btn-primary btn-next ">
            <span class="d-sm-inline-block d-none me-sm-1">Simpan</span>
            <i class="bx bx-chevron-right bx-sm me-sm-2"></i>
            </button>`);
        }
        if (mcu == 'mcu_filter') {
            $("#temp-button").empty();
            $("#temp-button").append(`<button onclick="Lowongan.savemcuTemp(this, event)"
            class="btn btn-primary btn-next ">
            <span class="d-sm-inline-block d-none me-sm-1">Simpan</span>
            <i class="bx bx-chevron-right bx-sm me-sm-2"></i>
            </button>`);
        }
    }
    Lowongan.getData();
    Lowongan.editor();
    // Lowongan.getStepRekrutmenData();
    // Lowongan.getDataLogKaryawan();
    Lowongan.setDate();
    Lowongan.select2All();
    // Lowongan.setCardPagination();
    // Lowongan.removeWarning();
});
