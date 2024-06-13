<input type="hidden" id="id" value="{{ isset($id) ? $id : '' }}">


<div class="row">
    <div class="col-md-12 text-end">
        <a href="#" class="dt-button create-new btn btn-secondary" tabindex="0" aria-controls="DataTables_Table_0"
            type="button" onclick="MasterDocument.back()">
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
        <h5 class="card-header">Form Document Mou</h5>
        <form id="form-template" method="POST">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <label class="form-label" for="basic-icon-default-fullname">Upload Dokumen *</label>
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-primary" type="button" id="button-addon1"
                                onclick="MasterDocument.takeFile(this, event)">Pilih</button>
                            <input id="file_doc" src="" type="text" class="form-control required"
                                error="Dokumen" placeholder="Ambil Berkas Dokumen" aria-label="Ambil Berkas Dokumen"
                                aria-describedby="button-addon1"
                                path="{{ isset($data->file_path) ? $data->file_path : '' }}"
                                value="{{ isset($data->file_mou) ? $data->file_mou : '' }}"
                                onclick="MasterDocument.viewFileWithModal(this,event)" readonly>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="basic-icon-default-fullname">Nomor Mou</label>
                            <input type="text" class="form-control required" name="nomor_mou" id="nomor_mou"
                                error="Nomor Mou" id="basic-icon-default-fullname" placeholder="Nomor Mou"
                                aria-label="Nomor Mou" aria-describedby="basic-icon-default-fullname2"
                                value="{{ isset($data->nomor_mou) ? $data->nomor_mou : '' }}" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label" for="basic-icon-default-fullname">Tanggal Dibuat</label>
                            <input type="text" class="form-control flatpickr required" name="tanggal_dibuat"
                                id="tanggal_dibuat" error="Tanggal Dibuat" id="basic-icon-default-fullname"
                                placeholder="Tanggal Dibuat" aria-label="tanggal_dibuat"
                                aria-describedby="basic-icon-default-fullname2"
                                value="{{ isset($data->tanggal_dibuat) ? $data->tanggal_dibuat : '' }}" />
                        </div>

                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label" for="basic-icon-default-fullname">Tanggal berakhir</label>
                            <input type="text" class="form-control flatpickr required" name="tanggal_berakhir"
                                id="tanggal_berakhir" error="Tanggal berakhir" id="basic-icon-default-fullname"
                                placeholder="Tanggal berakhir" aria-label="tanggal_dibuat"
                                aria-describedby="basic-icon-default-fullname2"
                                value="{{ isset($data->tanggal_dibuat) ? $data->tanggal_dibuat : '' }}" />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label" for="jenis">Pilih Jenis DOC</label>
                            <select id="jenis" name="jenis" class="select2 form-select required"
                                data-allow-clear="true" error="jenis">
                                <option value="{{ isset($data->jenis_doc_id) ? $data->jenis_doc_id : '' }}">
                                    {{ isset($data->nama_jenis) ? $data->nama_jenis : '' }}</option>
                                @foreach ($list_jenis as $item)
                                    <option value="{{ $item->id }}"
                                        {{ isset($data->jenis_doc) && $data->jenis_doc == $item->id ? 'selected' : '' }}>
                                        {{ $item->nama_jenis }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label" for="kategori">Pilih kategori Doc / jenis mitra doc</label>
                            <select id="kategori" name="kategori" class="select2 form-select required"
                                data-allow-clear="true" error="kategori">
                                <option value="{{ isset($data->kategori_doc_id) ? $data->kategori_doc_id : '' }}">
                                    {{ isset($data->nama_kategori) ? $data->nama_kategori : '' }}</option>
                                @foreach ($list_kategori as $item)
                                    <option value="{{ $item->id }}"
                                        {{ isset($data->kategori_mou) && $data->kategori_mou == $item->id ? 'selected' : '' }}>
                                        {{ $item->nama_kategori }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label" for="level">Pilih Level Dokumen</label>
                            <select id="level" name="level" class="select2 form-select required"
                                data-allow-clear="true" error="level">
                                <option value="{{ isset($data->level_doc_id) ? $data->level_doc_id : '' }}">
                                    {{ isset($data->nama_level) ? $data->nama_level : '' }}</option>
                                @foreach ($list_level as $item)
                                    <option value="{{ $item->id }}"
                                        {{ isset($data->level_mou) && $data->level_mou == $item->id ? 'selected' : '' }}>
                                        {{ $item->nama_level }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            @php
                                $list_status = ['AKTIF', 'TIDAK AKTIF'];
                            @endphp
                            <label class="form-label" for="level">Status Dokumen</label>
                            <select id="status" name="status" class="select2 form-select required"
                                data-allow-clear="true" error="status">
                                <option value="{{ isset($data->status) ? $data->status : '' }}">
                                    {{ isset($data->status) ? $data->status : '' }}
                                </option>
                                @foreach ($list_status as $item)
                                    <option value="{{ $item }}"
                                        {{ isset($data->status) && $data->status == $item ? 'selected' : '' }}>
                                        {{ $item }}
                                    </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="basic-icon-default-fullname">kerja sama dengan</label>
                        <textarea class="form-control required" error="kerja sama dengan" placeholder="kerja sama dengan"
                            name="kerja_sama_dengan" id="kerja_sama_dengan" cols="10" rows="5">{!! isset($data->kerja_sama_dengan) ? $data->kerja_sama_dengan : '' !!}</textarea>
                    </div>

                    <div class="text-end mt-3 mb-3">
                        @if (isset($data->id))
                            <button class="btn btn-primary me-2" onclick="MasterDocument.viewFile(this, event)"
                                path="{{ $data->file_path }}" nama_file="{{ $data->file_mou }}">
                                <span><i class="bx bx-download me-sm-2"></i>
                                    <span class="d-none d-sm-inline-block">Download File</span>
                                </span>
                            </button>
                        @endif
                        <button type="button" class="btn btn-primary me-2"
                            onclick="MasterDocument.submit(this, event)">
                            <span><i class="bx bx-check-circle me-sm-2"></i>
                                <span class="d-none d-sm-inline-block">Submit</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
<br>
