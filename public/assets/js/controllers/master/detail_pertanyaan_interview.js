let DetailPertanyaanInterview = {
    module: () => {
        return "master/detail-pertanyaan-interview";
    },

    moduleApi: () => {
        return `api/${DetailPertanyaanInterview.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(DetailPertanyaanInterview.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href =
            url.base_url(DetailPertanyaanInterview.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href =
            url.base_url(DetailPertanyaanInterview.module()) + "index";
    },

    getData: async () => {
        let tableData = $("table#table-data");

        if (tableData.length > 0) {
            let updateAction = $("#update").val();
            let deleteAction = $("#delete").val();
            tableData.DataTable({
                processing: true,
                serverSide: true,
                ordering: true,
                autoWidth: false,
                order: [[0, "desc"]],
                aLengthMenu: [
                    [25, 50, 100],
                    [25, 50, 100],
                ],
                ajax: {
                    url: url.base_url(DetailPertanyaanInterview.moduleApi()) + `getData`,
                    type: "POST",
                    // "headers": {
                    //     'X-CSRF-TOKEN': `'${tokenApi}'`
                    // }
                },
                deferRender: true,
                createdRow: function (row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                columnDefs: [
                    {
                        targets: 3,
                        orderable: false,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("text-center");
                            $(td).addClass("td-padd");
                            $(td).addClass("action");
                        },
                    },
                    {
                        targets: 2,
                        orderable: false,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("td-padd");
                        },
                    },
                    {
                        targets: 1,
                        orderable: false,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("td-padd");
                        },
                    },
                    {
                        targets: 0,
                        createdCell: function (
                            td,
                            cellData,
                            rowData,
                            row,
                            col
                        ) {
                            $(td).addClass("td-padd");
                            $(td).addClass("text-center");
                        },
                    },
                ],
                columns: [
                    {
                        data: "master_pertanyaan",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        },
                    },
                    {
                        data: "nama_soal",
                    },
                    {
                        data: "total",
                    },
                    {
                        data: "master_pertanyaan",
                        render: (data, type, row, meta) => {
                            let htmlAction = "";
                            if (updateAction == "1") {
                                htmlAction += `<i class="bx bx-edit" style="cursor: pointer;" data_id="${data}" onclick="DetailPertanyaanInterview.ubah(this)"></i>`;
                            }

                            if (deleteAction == "1") {
                                htmlAction += `<i class="bx bx-trash" style="cursor: pointer;" data_id="${data}" onclick="DetailPertanyaanInterview.delete(this, event)"></i>`;
                            }
                            return htmlAction;
                        },
                    },
                ],
            });
        }
    },

    delete: (elm, e) => {
        e.preventDefault();
        let data_id = $(elm).attr("data_id");
        let html = `<div class="row g-3">
        <div class="col-12">
        <hr/>
        </div>
        <div class="col-12 text-center">
            <p>Apakah anda yakin akan menghapus data ini ?</p>
        </div>
        <div class="col-12 text-center">
            <br/>
            <button class="btn btn-primary btn-sm" onclick="DetailPertanyaanInterview.deleteConfirm(this, '${data_id}')">Ya</button>
            <button class="btn btn-sm" onclick="message.closeDialog()">Tidak</button>
        </div>
        </div>`;

        bootbox.dialog({
            message: html,
        });
    },

    deleteConfirm: (elm, id) => {
        let params = {};
        params.id = id;
        $.ajax({
            type: "POST",
            dataType: "json",
            data: params,
            url: url.base_url(DetailPertanyaanInterview.moduleApi()) + "delete",

            beforeSend: () => {
                message.loadingProses("Proses Hapus Data");
            },

            error: function () {
                message.closeLoading();
                Toast.error("Informasi", "Gagal");
            },

            success: function (resp) {
                message.closeLoading();
                if (resp.is_valid) {
                    Toast.success("Informasi", "Data Berhasil Dihapus");
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    Toast.error(
                        "Informasi",
                        "Data Gagal Dihapus ",
                        resp.message
                    );
                }
            },
        });
    },

    getPostInputDokumen: () => {
        let params = {};
        let data_file = $("div.content-file-upload");
        $.each(data_file, function () {
            let $this = $(this);
            let attr_obj_img = $this.find("img").attr("id");
            let attr_obj_filename = $this.find("label").attr("id");
            params[`${attr_obj_img.replaceAll("-", "_")}`] = $this
                .find("img")
                .attr("src");
            params[`${attr_obj_filename.replaceAll("-", "_")}`] = $this
                .find("label")
                .text()
                .trim();
        });

        return params;
    },

    getPostData: () => {
        let data = {
            data: {
                master_pertanyaan: $("#master-pertanyaan-interview").val(),
            },
            data_pertanyaan_interview: DetailPertanyaanInterview.getDataPertanyaan(),
        };
        return data;
    },

    getDataPertanyaan: () => {
        let dataItem = $("div.frm-row");
        let dataArr = [];
        let counterIndex = 0;
        $.each(dataItem, function (k,v) {
            let param = {};
            let textarea = $(`textarea.text-editor:eq(${counterIndex})`);
            param.pertanyaan = textarea.val();
            // param.pertanyaan = $(this).find("#pertanyaan").val()

            param.pertanyaan = tinyMCE.get(`pertanyaan-${counterIndex+1}`).getContent();
            param.file_pertanyaan = typeof $(this).find("input#file").attr("src") === "undefined" ? null : $(this).find("input#file").attr("src");
            param.file_pertanyaan_tipe = typeof $(this).find("input#file").attr("tipe") === "undefined" ? null : $(this).find("input#file").att("tipe");
            param.jawaban_1 = $(this).find("#jawaban_1").val();
            param.file_jawaban_1 = typeof $(this).find("input#file_ja_1").attr("src") === "undefined" ? null : $(this).find("input#file_ja_1").attr("src");
            param.file_jawaban_1_tipe = typeof $(this).find("input#file_ja_1").attr("tipe") === "undefined" ? null : $(this).find("input#file_ja_1").attr("tipe");
            param.jawaban_2 = $(this).find("#jawaban_2").val();
            param.file_jawaban_2 = typeof $(this).find("input#file_ja_2").attr("src") === "undefined" ? null : $(this).find("input#file_ja_2").attr("src");
            param.file_jawaban_2_tipe = typeof $(this).find("input#file_ja_2").attr("tipe") === "undefined" ? null : $(this).find("input#file_ja_2").attr("tipe");
            param.jawaban_3 = $(this).find("#jawaban_3").val();
            param.file_jawaban_3 = typeof $(this).find("input#file_ja_3").attr("src") === "undefined" ? null : $(this).find("input#file_ja_3").attr("src");
            param.file_jawaban_3_tipe = typeof $(this).find("input#file_ja_3").attr("tipe") === "undefined" ? null : $(this).find("input#file_ja_3").attr("tipe");
            param.jawaban_4 = $(this).find("#jawaban_4").val();
            param.file_jawaban_4 = typeof $(this).find("input#file_ja_4").attr("src") === "undefined" ? null : $(this).find("input#file_ja_4").attr("src");
            param.file_jawaban_4_tipe = typeof $(this).find("input#file_ja_4").attr("tipe") === "undefined" ? null : $(this).find("input#file_ja_4").attr("tipe");
            param.jawaban = $(this).find("#jawaban").val();
            param.bobot = $(this).find("#bobot").val();
            dataArr.push(param);
            counterIndex+=1;
        });
        return dataArr;
    },

    submit: (elm, e) => {
        e.preventDefault();
        let params = DetailPertanyaanInterview.getPostData();
        let form = $(elm).closest("div.row");
        if (validation.runWithElement(form)) {
            $.ajax({
                type: "POST",
                dataType: "json",
                data: params,
                url: url.base_url(DetailPertanyaanInterview.moduleApi()) + "submit",
                beforeSend: () => {
                    message.loadingProses("Proses Simpan Data...");
                },
                error: function () {
                    message.closeLoading();
                    Toast.error("Informasi", "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success("Informasi", "Data Berhasil Disimpan");
                        setTimeout(function () {
                            window.location.href =
                                url.base_url(DetailPertanyaanInterview.module()) +
                                "index";
                        }, 1000);
                    } else {
                        bootbox.dialog({
                            message: resp.message,
                        });
                    }
                },
            });
        }
    },

    setDate: () => {
        const flatpickrRange = document.querySelector(".flatpickr");
        if (flatpickrRange) {
            flatpickrRange.flatpickr();
        }
    },

    select2All: () => {
        // Default
        const select2 = $(".select2");
        if (select2.length) {
            select2.each(function () {
                var $this = $(this);
                $this.wrap('<div class="position-relative"></div>').select2({
                    placeholder: "Select value",
                    dropdownParent: $this.parent(),
                });
            });
        }
    },

    nextPersonal: (elm, e) => {
        e.preventDefault();
        let form = $(elm).closest("div.row");
        if (validation.runWithElement(form)) {
            Wizard.nextWizard(elm);
        }
    },

    addItem: (elm, e) => {
        e.preventDefault();
        let indexIdTextArea = $("textarea.text-editor").length;
        indexIdTextArea += 1;

        let html = `
        <div class="col-sm-12 frm-row" id="frm-row">
        <div class="card mb-4">
          <div class="card-header d-flex align-items-center justify-content-between">
            <h5 class="mb-0"></h5>
            <small class="text-muted float-end"><i class="bx bx-trash" style="cursor: pointer;"  onclick="DetailPertanyaanInterview.removeQuestion(this, event)" title="hapus"></i></small>
          </div>
          <div class="card-body">
            <div class="row mb-3">
              <label class="col-sm-2 col-form-label" for="basic-default-name">Pertanyaan</label>
              <div class="col-sm-10 texteditor">
                <textarea class="form-control  text-editor" id="pertanyaan-${indexIdTextArea}"  name="pertanyaan" placeholder="Pertanyaan" error="Pertanyaan" ></textarea>
                <div class="input-group">
                  <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="DetailPertanyaanInterview.addFile(this,'file')">Pilih</button>
                  <input id="file" type="text" readonly class="form-control" error="File" placeholder="Pilih Data File" aria-label="Pilih Data File" aria-describedby="button-addon1" value="">
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-sm-2 col-form-label" for="basic-default-company">Jawaban 1</label>
              <div class="col-sm-10">
                <div class="row">
                  <div class="col-md-6 col-lg-6 col-xs-6">
                    <input type="text" class="form-control required" id="jawaban_1"  name="jawaban_1" placeholder="Jawaban A" error="Jawaban A">
                  </div>
                  <div class="col-md-6 col-lg-6 col-xs-6">
                    <div class="input-group">
                      <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="DetailPertanyaanInterview.addFile(this,'file_ja_1')">Pilih</button>
                      <input id="file_ja_1" type="text" readonly class="form-control" error="File" placeholder="Pilih Data File" aria-label="Pilih Data File" aria-describedby="button-addon1" value="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-sm-2 col-form-label" for="basic-default-email">Jawaban 2</label>
              <div class="col-sm-10">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-xs-6">
                    <input type="text" class="form-control required" id="jawaban_2"  name="jawaban_2" placeholder="Jawaban B" error="Jawaban B">
                  </div>
                  <div class="col-lg-6 col-md-6 col-xs-6">
                    <div class="input-group">
                      <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="DetailPertanyaanInterview.addFile(this,'file_ja_2')">Pilih</button>
                      <input id="file_ja_2" type="text" readonly class="form-control" error="File" placeholder="Pilih Data File" aria-label="Pilih Data File" aria-describedby="button-addon1" value="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-sm-2 col-form-label" for="basic-default-email">Jawaban 3</label>
              <div class="col-sm-10">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-xs-6">
                    <input type="text" class="form-control required" id="jawaban_3" name="jawaban_3" placeholder="Jawaban C" error="Jawaban C">
                  </div>
                  <div class="col-lg-6 col-md-6 col-xs-6">
                    <div class="input-group">
                      <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="DetailPertanyaanInterview.addFile(this,'file_ja_3')">Pilih</button>
                      <input id="file_ja_3" type="text" readonly class="form-control" error="File" placeholder="Pilih Data File" aria-label="Pilih Data File" aria-describedby="button-addon1" value="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-sm-2 col-form-label" for="basic-default-email">Jawaban 4</label>
              <div class="col-sm-10">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-xs-6">
                    <input type="text" class="form-control required" id="jawaban_4" name="jawaban_4"  placeholder="Jawaban D" error="Jawaban D">
                  </div>
                  <div class="col-lg-6 col-md-6 col-xs-6">
                    <div class="input-group">
                      <button class="btn btn-outline-primary" type="button" id="button-addon1" onclick="DetailPertanyaanInterview.addFile(this,'file_ja_4')">Pilih</button>
                      <input id="file_ja_4" type="text" readonly class="form-control" error="File" placeholder="Pilih Data File" aria-label="Pilih Data File" aria-describedby="button-addon1" value="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-sm-2 col-form-label" for="basic-default-email">Bobot</label>
              <div class="col-sm-10">
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-xs-6">
                  </div>
                  <div class="col-lg-6 col-md-6 col-xs-6">
                  </div>
                </div>
                <input type="number" onkeypress="return DetailPertanyaanInterview.isNumber(event)"  class="form-control required" id="bobot" name="bobot" placeholder="Bobot" error="Bobot">
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-sm-2 col-form-label" for="basic-default-email">Jawaban Benar</label>
              <div class="col-sm-10">
                <select class="select2 form-select required" id="jawaban" name="jawaban" error="Jawaban">
                <option value="A" >A</option>
                <option value="B" >B</option>
                <option value="C" >C</option>
                <option value="D" >D</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

        `;
        $("#show-question").append(html);
        DetailPertanyaanInterview.setTextEditor();

        // DetailPertanyaanInterview.select2All();
    },

    addFile: (elm, id_input) => {
        var uploader = $(
            '<input type="file" accept="image/*;capture=camera" />'
        );
        var src_foto = $(elm)
            .closest("div.row")
            .find("#" + id_input);
        uploader.click();

        uploader.on("change", function () {
            var reader = new FileReader();
            reader.onload = function (event) {
                var files = $(uploader).get(0).files[0];
                filename = files.name;
                var data_from_file = filename.split(".");
                var type_file = $.trim(
                    data_from_file[data_from_file.length - 1]
                );
                if (
                    type_file == "jpg" ||
                    type_file == "jpeg" ||
                    type_file == "png"
                ) {
                    var data = event.target.result;
                    src_foto.attr("src", data);
                    src_foto.attr("tipe", type_file);
                    src_foto.val(filename);
                } else {
                    bootbox.dialog({
                        message:
                            "File Harus Berupa Gambar Bertipe JPG, JPEG, PNG",
                    });
                }
            };

            reader.readAsDataURL(uploader[0].files[0]);
        });
    },

    removeQuestion: (elm, e) => {
        // console.log(elm)
        $(elm).closest("#frm-row").remove();
    },

    setTextEditor: () => {
        let dataEditor = $("div.texteditor");
        $.each(dataEditor, function () {
            let textarea = $(this).find("textarea");
            let idTextArea = textarea.attr("id");
            tinymce.init({
                selector: `textarea#${idTextArea}`,
                menubar: false,
                plugins: ["lists"],
                toolbar:
                    "undo redo | blocks | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat",
            });
        });
    },

    OnlyNumber: (input_id) => {
        if (typeof input_id === "string") {
            Toast.error("Informasi", "Harus Angka");
            let input_text = $("#" + input_id).val();
            if (input_text == "-") {
                $("#" + input_id).val(input_text);
            } else {
                if (isNaN(input_text)) {
                    // if not number
                    let isMinus = "";
                    if (input_text.indexOf("-") == "0") {
                        isMinus = "-";
                    }
                    let gen = isMinus + "" + input_text.replace(/[^0-9.]/g, "");

                    $("#" + input_id).val(gen);
                }
            }

            let price_format1 = $("#" + input_id).val();
            $("#" + input_id).val(price_format1);
        } else {
            Toast.error("Informasi", "Harus Angka");
            let input_text = input_id.val();
            if (input_text == "-") {
                input_id.val(input_text);
            } else {
                if (isNaN(input_text)) {
                    // if not number
                    let isMinus = "";
                    if (input_text.indexOf("-") == "0") {
                        isMinus = "-";
                    }
                    let gen = isMinus + "" + input_text.replace(/[^0-9.]/g, "");

                    input_id.val(gen);
                }
            }

            let price_format1 = price_format(input_id.val());
            input_id.val(price_format1);
        }
    },

    isNumber: (evt) => {
        evt = evt ? evt : window.event;
        var charCode = evt.which ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            Toast.error("Informasi", "Harus Angka");
            return false;
        }
        return true;
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
};

$(function () {
    DetailPertanyaanInterview.getData();
    DetailPertanyaanInterview.setDate();
    DetailPertanyaanInterview.setTextEditor();
    DetailPertanyaanInterview.select2All();
});
