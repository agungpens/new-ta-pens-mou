<input type="hidden" id="id" value="{{ isset($id) ? $id : '' }}">
<div class="row ">
    <div class="col-md-12 mb-3 text-end">
        <a href="#" class="dt-button create-new btn btn-secondary" tabindex="0" aria-controls="DataTables_Table_0"
            type="button" onclick="DokumenMoa.back()">
            <span>
                <i class="bx bx-chevron-left me-sm-2"></i>
                <span class="d-none d-sm-inline-block">Kembali</span>
            </span>
        </a>
    </div>

    <div class="col-xl-12">
        <div class="card">
            <h5 class="card-header">Detail Document Moa</h5>
            <div class="row form g-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12">
                            <label class="form-label" for="basic-icon-default-fullname">Relevansi Dokumen MOU
                                (Optional)</label>

                            <div class="input-group mb-3">
                                <button class="btn btn-outline-primary" type="button" id="button-addon1"
                                    onclick="DokumenMoa.showDataMou(this, event)">Pilih</button>
                                <button class="btn btn-outline-danger" type="button" id="button-addon1"
                                    onclick="DokumenMoa.resetDataMou(this, event)"><i class="bx bx-trash"></i></button>
                                <input id="nomor_mou" src="" type="text" class="form-control"
                                    placeholder="Pilih data dokumen mou" aria-label="Pilih data dokumen mou"
                                    aria-describedby="button-addon1"
                                    value="@if (isset($data['data'][0]['nomor_mou'])){{ $data['data'][0]['nomor_mou'] . ' - ' . $data['data'][0]['kerja_sama_dengan'] }}@endif"
                                    readonly>
                            </div>

                            <label class="form-label" for="basic-icon-default-fullname">
                                File MOA
                            </label>
                            <div class="input-group mb-3">
                                <button class="btn btn-outline-primary" type="button" id="button-addon1"
                                    onclick="DokumenMoa.addFileOutTable(this)">
                                    Pilih
                                </button>
                                <input id="file" type="text" class="form-control required" error="File MOA"
                                    placeholder="Pilih data dokumen mou" aria-label="Pilih data dokumen mou"
                                    aria-describedby="button-addon1"
                                    value="{{ isset($data['data'][0]['file_moa']) ? $data['data'][0]['nomor_moa'] . ' - ' . $data['data'][0]['kerja_sama_dengan'] : '' }}"
                                    readonly>
                            </div>
                            <div class="text-end mb-2">
                                <button class="btn btn-success" type="button" id="button-addon1"
                                    onclick="return DokumenMoa.confirmDownload('{{ $data['data'][0]['file_moa'] }}','{{ $data['data'][0]['file_path'] . $data['data'][0]['file_moa'] }}')">
                                    Lihat / Download File
                                </button>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Nomor Moa</label>
                            <input type='text' id="nomor_moa" class="form-control required" error="Nomor Moa"
                                value="{{ isset($data['data'][0]['nomor_moa']) ? $data['data'][0]['nomor_moa'] : '' }}"
                                placeholder="Nomor Moa">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label" for="basic-icon-default-fullname">kerja sama dengan</label>
                            <input type='text' id="kerja_sama_dengan" class="form-control required"
                                error="Kerjasama Dengan"
                                value="{{ isset($data['data'][0]['kerja_sama_dengan']) ? $data['data'][0]['kerja_sama_dengan'] : '' }}"
                                placeholder="Kerjasama Dengan">
                        </div>
                        <div class="col-md-12 mb-3">
                            <label class="form-label">Judul MOA</label>
                            <textarea class="form-control required" error="Judul MoA" placeholder="Judul MoA"
                                name="judul_moa" id="judul_moa" cols="10"
                                rows="5">{!! isset($data['data'][0]['judul_moa']) ? $data['data'][0]['judul_moa'] : '' !!}</textarea>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Tanggal Dibuat</label>
                            <input type='text' id="tanggal_dibuat" class="form-control flatpickr required"
                                error="Tanggal Dibuat"
                                value="{{ isset($data['data'][0]['tanggal_dibuat']) ? $data['data'][0]['tanggal_dibuat'] : '' }}"
                                placeholder="YYYY-MM-D">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Tanggal berakhir</label>
                            <input type='text' id="tanggal_berakhir" class="form-control flatpickr required"
                                error="Tanggal Berakhir"
                                value="{{ isset($data['data'][0]['tanggal_berakhir']) ? $data['data'][0]['tanggal_berakhir'] : '' }}"
                                placeholder="YYYY-MM-D">
                        </div>

                        <div class="col-md-6">
                            <div class="mb-3">

                                <label class="form-label" for="jenis">Pilih Jenis DOC</label>
                                <select id="jenis" name="jenis" class=" form-select required" data-allow-clear="true"
                                    error="jenis" disabled>
                                    <option
                                        value="{{ isset($data['data'][0]['jenis_doc_id']) ? $data['data'][0]['jenis_doc_id'] : '' }}">
                                        {{ isset($data['data'][0]['jenis_doc']) ? $data['data'][0]['jenis_doc'] : ''}}
                                    </option>
                                    @foreach ($list_jenis as $item)
                                    <option value="{{ $item->id }}" {{ isset($data['data'][0]['jenis_doc_id']) &&
                                        $data['data'][0]['jenis_doc']==$item ? 'selected' : '' }}>
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
                                    <option
                                        value="{{ isset($data['data'][0]['kategori_moa_id']) ? $data['data'][0]['kategori_moa_id'] : '' }}">
                                        {{ isset($data['data'][0]['kategori_moa']) ? $data['data'][0]['kategori_moa']
                                        : '' }}</option>
                                    @foreach ($list_kategori as $item)
                                    <option value="{{ $item->id }}" {{ isset($data['data'][0]['kategori_moa']) &&
                                        $data['data'][0]['kategori_moa']==$item ? 'selected' : '' }}>
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
                                    <option
                                        value="{{ isset($data['data'][0]['level_moa_id']) ? $data['data'][0]['level_moa_id'] : '' }}">
                                        {{ isset($data['data'][0]['level_moa']) ? $data['data'][0]['level_moa'] : ''
                                        }}</option>
                                    @foreach ($list_level as $item)
                                    <option value="{{ $item->id }}" {{ isset($data['data'][0]['level_moa']) &&
                                        $data['data'][0]['level_moa']==$item ? 'selected' : '' }}>
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
                                    @foreach ($list_status as $item)
                                    <option value="{{ $item }}" {{ isset($data['data'][0]['status']) &&
                                        $data['data'][0]['status']==$item ? 'selected' : '' }}>
                                        {{ $item }}
                                    </option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label" for="relevansi_prodi">Relevansi Prodi (Opsional)</label>
                                @foreach ($list_prodi as $item)
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="prodi_{{ $item['id'] }}"
                                        name="relevansi_prodi[]" value="{{ $item['id'] }}"
                                        @if (in_array($item['nama_prodi'], $data['data'][0]['relevansi_prodi']))
                                        checked
                                        @endif>
                                    <label class="form-check-label" for="prodi_{{ $item['id'] }}">
                                        {{ $item['nama_prodi'] }}
                                    </label>
                                </div>
                            @endforeach

                            </div>
                        </div>
                    </div>
                    @if (session('role') == 'Admin' || session('role') == 'kerjasama / sub humas')
                    <div class="text-end mt-3 mb-3">
                        <button type="button" class="btn btn-danger me-2" data_id='{{ isset($id) ? $id : '' }}'
                            kerja_sama_dengan='{{ isset($data[' data'][0]['kerja_sama_dengan']) ?
                            $data['data'][0]['kerja_sama_dengan'] : '' }}' onclick="DokumenMoa.delete(this, event)">
                            <span><i class="bx bx-trash me-sm-2"></i>
                                <span class="d-none d-sm-inline-block">Hapus</span>
                            </span>
                        </button>
                        <button type="button" class="btn btn-primary me-2" onclick="DokumenMoa.updated(this, event)">
                            <span><i class="bx bx-check-circle me-sm-2"></i>
                                <span class="d-none d-sm-inline-block">Updated</span>
                            </span>
                        </button>
                    </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>


@section('scripts')
@include('page.mou.dokumen_moa.scripts')
@endsection
