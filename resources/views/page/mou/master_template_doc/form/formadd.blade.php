<input type="hidden" id="id" value="{{ isset($id) ? $id : '' }}">


<div class="row">
    <div class="col-md-12 text-end">
        <a href="#" class="dt-button create-new btn btn-secondary" tabindex="0" aria-controls="DataTables_Table_0"
            type="button" onclick="MasterTemplateDoc.back()">
            <span>
                <i class="bx bx-chevron-left me-sm-2"></i>
                <span class="d-none d-sm-inline-block">Kembali</span>
            </span>
        </a>
    </div>
</div>
<br>
<div class="col-xl-12">
    <div class="card">
        <h5 class="card-header">Form Template Mou</h5>
        <form id="form-template" method="POST">
            <div class="card-body">
                <div class="row">
                    <div class="mb-3 col-md-6">
                        <div class="mb-3">
                            <input type="hidden" name="id" id="id" value="{{ isset($data->id) ? $data->id : '' }}">
                            <label class="form-label" for="basic-icon-default-fullname">Nama
                                Template</label>
                            <input type="text" class="form-control required" name="nama_template" id="nama_template"
                                error="Nama template" id="basic-icon-default-fullname" placeholder="Nama Template"
                                aria-label="Nama" aria-describedby="basic-icon-default-fullname2"
                                value="{{ isset($data->nama_template) ? $data->nama_template : '' }}" />
                        </div>

                        <div class="mb-3">
                            <label class="form-label" for="jenis">Pilih Jenis DOC</label>
                            <select id="jenis" name="jenis" class="select2 form-select required" data-allow-clear="true"
                                error="jenis">
                                <option value="{{ isset($data->jenis_doc_id) ? $data->jenis_doc_id : '' }}">
                                    {{ isset($data->nama_jenis) ? $data->nama_jenis : '' }}</option>
                                @foreach ($list_jenis as $item)
                                <option value="{{ $item->id }}">{{ $item->nama_jenis }}
                                </option>
                                @endforeach
                            </select>
                        </div>

                        <div class="mb-3 ">

                            <label class="form-label" for="file_doc">Upload File Dokumen</label>

                            <div class="input-group mb-3">
                                <button class="btn btn-outline-primary" type="button" id="button-addon1"
                                    onclick="MasterTemplateDoc.addFileOutTable(this)">
                                    Pilih
                                </button>
                                <input id="file" type="text" class="form-control required" error="File MOU"
                                    placeholder="File Document .docx" aria-label="File Document .docx"
                                    aria-describedby="button-addon1" value="{{ isset($data->file) ? $data->file : '' }}"
                                    readonly>
                            </div>



                        </div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label" for="basic-icon-default-fullname">Keterangan</label>
                        <div id="keterangan">{!! isset($data->keterangan) ? $data->keterangan : '' !!}</div>
                    </div>
                    @if (session('role') == 'Admin' || session('role') == 'kerjasama / sub humas')
                    <div class="text-end mt-3 mb-3">
                        <button type="button" class="btn btn-primary me-2"
                            onclick="MasterTemplateDoc.submit(this, event)">
                            <span><i class="bx bx-check-circle me-sm-2"></i>
                                <span class="d-none d-sm-inline-block">Submit</span>
                            </span>
                        </button>
                    </div>
                    @endif
                </div>
            </div>
        </form>
    </div>
</div>
<br>

@section('scripts')
@include('page.mou.master_template_doc.scripts')
@endsection
