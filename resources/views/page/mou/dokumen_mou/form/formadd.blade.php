<input type="hidden" id="id" value="{{ isset($id) ? $id : '' }}">


<div class="row">
    <div class="col-md-12 text-end">
        <a href="#" class="dt-button create-new btn btn-secondary" tabindex="0" aria-controls="DataTables_Table_0"
            type="button" onclick="DokumenMou.back()">
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

        <div class="card-body">
            <div class="row">
                <div class="col-md-6">
                    <label class="form-label" for="basic-icon-default-fullname">
                        File MOU (*)
                    </label>
                    <div class="input-group mb-3">
                        <button class="btn btn-outline-primary" type="button" id="button-addon1"
                            onclick="DokumenMou.addFileOutTable(this)">
                            Pilih
                        </button>
                        <input id="file" type="text" class="form-control required" error="File MOU"
                            placeholder="Pilih data dokumen mou" aria-label="Pilih data dokumen mou"
                            aria-describedby="button-addon1"
                            value="{{ isset($data->file_mou) ? $data->nomor_mou . ' - ' . $data->kerja_sama_dengan : '' }}"
                            readonly>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label" for="jenis">Pilih Jenis DOC</label>
                        <select id="jenis" name="jenis" class="select2 form-select required" data-allow-clear="true"
                            error="jenis" disabled>
                            <option value="{{ isset($data->jenis_doc_id) ? $data->jenis_doc_id : '' }}">
                                {{ isset($data->nama_jenis) ? $data->nama_jenis : '' }}</option>
                            @foreach ($list_jenis as $item)
                            <option value="{{ $item->id }}" {{ isset($data->jenis_doc) && $data->jenis_doc == $item->id
                                ? 'selected' : ($item->id == 5 ? 'selected' : '') }}>
                                {{ $item->nama_jenis }}
                            </option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Nomor Mou</label>
                    <input type='text' id="nomor_mou" class="form-control required" error="Nomor Mou"
                        value="{{ isset($data->nomor_mou) ? $data->nomor_mou : '' }}" placeholder="Nomor Mou">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label" for="basic-icon-default-fullname">kerja sama dengan</label>
                    <input type='text' id="kerja_sama_dengan" class="form-control required" error="Kerjasama Dengan"
                        value="{{ isset($data->kerja_sama_dengan) ? $data->kerja_sama_dengan : '' }}"
                        placeholder="Kerjasama Dengan">
                </div>
                <div class="col-md-12 mb-3">
                    <label class="form-label">Judul Mou</label>
                    <textarea class="form-control required" error="Judul MoU" placeholder="Judul MoU" name="judul_mou"
                        id="judul_mou" cols="10"
                        rows="5">{!! isset($data->judul_mou) ? $data->judul_mou : '' !!}</textarea>
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
                            placeholder="Tanggal berakhir" aria-label="tanggal_berakhir"
                            aria-describedby="basic-icon-default-fullname2"
                            value="{{ isset($data->tanggal_berakhir) ? $data->tanggal_berakhir : '' }}" />
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
                            <option value="{{ $item->id }}" {{ isset($data->kategori_mou) && $data->kategori_mou ==
                                $item->id ? 'selected' : '' }}>
                                {{ $item->nama_kategori }}
                            </option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label" for="level">Pilih Level Dokumen</label>
                        <select id="level" name="level" class="select2 form-select required" data-allow-clear="true"
                            error="level">
                            <option value="{{ isset($data->level_doc_id) ? $data->level_doc_id : '' }}">
                                {{ isset($data->nama_level) ? $data->nama_level : '' }}</option>
                            @foreach ($list_level as $item)
                            <option value="{{ $item->id }}" {{ isset($data->level_mou) && $data->level_mou == $item->id
                                ? 'selected' : '' }}>
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
                        <select id="status" name="status" class="select2 form-select required" data-allow-clear="true"
                            error="status">
                            <option value="{{ isset($data->status) ? $data->status : '' }}">
                                {{ isset($data->status) ? $data->status : '' }}
                            </option>
                            @foreach ($list_status as $item)
                            <option value="{{ $item }}" {{ isset($data->status) && $data->status == $item ? 'selected' :
                                '' }}>
                                {{ $item }}
                            </option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label" for="relevansi_prodi">Relevansi Prodi (Opsional)</label>
                        <select id="relevansi_prodi" name="relevansi_prodi" class="select2 form-select "
                            data-allow-clear="true" error="Relevansi Prodi">
                            <option value="{{ isset($data->relevansi_prodi) ? $data->relevansi_prodi : '' }}">
                                {{ isset($data->nama_relevansi_prodi) ? $data->nama_relevansi_prodi : '' }}
                            </option>
                            @foreach ($list_prodi as $item)
                            <option value="{{ $item->id }}" {{ isset($data->relevansi_prodi) && $data->relevansi_prodi
                                == $item->id ? 'selected' : '' }}>
                                {{ $item->nama_prodi }}
                            </option>
                            @endforeach
                        </select>
                    </div>
                </div>
                <div class="text-end mt-3 mb-3">
                    @if (isset($data->id))
                    <button class="btn btn-primary me-2"
                        onclick="return DokumenMou.confirmDownload('{{ $data->file_mou }}','{{ $data->file_path . $data->file_mou }}')">
                        <span><i class="bx bx-download me-sm-2"></i>
                            <span class="d-none d-sm-inline-block">Download File</span>
                        </span>
                    </button>
                    @endif
                    @if (session('role') == 'Admin' || session('role') == 'kerjasama / sub humas')
                    <button type="button" class="btn btn-primary me-2" onclick="DokumenMou.submit(this, event)">
                        <span><i class="bx bx-check-circle me-sm-2"></i>
                            <span class="d-none d-sm-inline-block">Submit</span>
                        </span>
                    </button>
                    @endif
                </div>
            </div>
        </div>

    </div>
</div>
<br>
