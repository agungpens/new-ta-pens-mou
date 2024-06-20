<input type="hidden" id="id" value="{{ isset($id) ? $id : '' }}">
<div class="row">
    <div class="col-md-12 text-end mb-3">
        <a href="#" class="dt-button create-new btn btn-secondary" tabindex="0" aria-controls="DataTables_Table_0"
            type="button" onclick="Kegiatan.back()">
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
        <h5 class="card-header">Form Tambah Kegiatan</h5>
        <div class="row form g-3">
            <div class="card-body">
                <div class="row mt-3">
                    <div class="col-md-12 mb-2">
                        <label class="form-label" for="instansi">instansi</label>
                        <select id="instansi" name="instansi" class="select2 form-select required" error="Instansi"
                            data-allow-clear="true" onchange="Kegiatan.changeInstansi(this)" @if (Auth::user()->role_id
                            != 1 && Auth::user()->role_id
                            != 7 )
                            disabled
                            @endif>
                            <option value=""></option>
                            @foreach ($data_instansi as $item)
                            <option value="{{ $item }}" {{ isset($data['instansi']) && $data['instansi']==$item
                                ? 'selected' : '' }}>{{ $item }}
                            </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="col-md-12">
                        <label class="form-label" for="basic-icon-default-fullname">Relevansi Dokumen MOU
                            (Optional)</label>
                        <select id="nomor_mou" name="nomor_mou" class="select2 form-select mb-3" onchange="Kegiatan.changeNomorMou(this)"></select>
                        <label class="form-label" for="basic-icon-default-fullname">Relevansi Dokumen MOA
                            (Optional)</label>
                        <select id="kumpulan_nomor_moa" name="kumpulan_nomor_moa" class="select2 form-select mb-3" ></select>

                        <div class="table-responsive pt-0 mb-3">
                            <div class="col-12">

                                <table id="table-moa" class="table table-bordered mt-3">
                                    <thead>
                                        <tr>
                                            <th>Dokumen MOA</th>
                                            <th style="width: 5px"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @if (isset($data['data_moa']))
                                        @foreach ($data['data_moa'] as $item)

                                        <tr class="input" data_id="{{ $item['id'] }}">
                                            <td class="text-end">
                                                <input id="nomor_moa" type="text" readonly
                                                    class="form-control mb-2 doc_moa{{ $item['nomor_moa'] }}"
                                                    error="nomor_moa" placeholder="Pilih Data File"
                                                    aria-label="Pilih Data File" aria-describedby="button-addon1"
                                                    value="{{ $item['nomor_moa'] . ' - ' . $item['kerja_sama_dengan'] }}">
                                                {{-- <div class="input-group mb-2">
                                                    <button class="btn btn-outline-primary" type="button"
                                                        id="button-addon1"
                                                        onclick="Kegiatan.showDataMoa(this, 'doc_moa{{ $item['nomor_moa'] }}')"
                                                        @if (Auth::user()->role_id
                                                        != 1 && Auth::user()->role_id
                                                        != 7 )
                                                        disabled
                                                        @endif>Pilih</button>
                                                    <input id="nomor_moa" type="text" readonly
                                                        class="form-control doc_moa{{ $item['nomor_moa'] }}"
                                                        error="nomor_moa" placeholder="Pilih Data File"
                                                        aria-label="Pilih Data File" aria-describedby="button-addon1"
                                                        value="{{ $item['nomor_moa'] . ' - ' . $item['kerja_sama_dengan'] }}">
                                                </div> --}}
                                                <button class="btn btn-warning btn-sm"
                                                    onclick="return Kegiatan.confirmDownload('{{ $item['file_moa'] }}','{{ $item['file_path'] . $item['file_moa'] }}')">
                                                    Lihat
                                                    File</button>

                                            </td>
                                            <td>
                                                {{-- <button class="btn btn-danger btn-sm" {{ (session('role') !='Admin'
                                                    && session('role') !='kerjasama / sub humas' ) ? 'disabled' : '' }}
                                                    data_id="{{ $item['id'] }}"
                                                    onclick="Kegiatan.deleteItemDocMa(this, event)">
                                                    <i class="bx bx-trash"></i>
                                                </button> --}}
                                            </td>
                                        </tr>
                                        @endforeach
                                        @endif
                                        <tr>
                                            <td colspan="7">
                                                {{-- <button type="button" class="btn btn-primary btn-sm" {{
                                                    (session('role') !='Admin' && session('role')
                                                    !='kerjasama / sub humas' ) ? 'disabled' : '' }}
                                                    onclick="Kegiatan.addDocMoa(this, event)">
                                                    <i class="fa fa-plus-circle"></i> Tambah
                                                </button> --}}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="basic-icon-default-fullname">kegiatan</label>
                            <div id="kegiatan">{!! isset($data['kegiatan']) ? $data['kegiatan'] : '' !!}</div>
                        </div>

                    </div>
                    <div class="col-12 mb-3">
                        <label class="form-label" for="basic-icon-default-fullname">LAMPIRAN KEGIATAN</label>
                        <div class="table-responsive pt-0">
                            <div class="col-12">
                                <div class="alert alert-warning"><b>
                                        <i class="fa fa-warning"></i> Perhatian</b>
                                    Tombol delete berwarna merah diguanakan untuk mengahpus data sedangkan yang tidak
                                    ada warnanya digunakan untuk menghapus data didalam table hanya untuk
                                    manghapus data kolom saja <i class="bx bx-trash"> </i>
                                </div>
                                <table id="table-lampiran" class="table table-bordered mt-3">
                                    <thead>
                                        <tr>
                                            <th>Lampiran</th>
                                            <th>keterangan</th>
                                            <th style="width: 5px"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @if (isset($data['lampiran']))
                                        @foreach ($data['lampiran'] as $item)
                                        {{-- {{ dd($item) }} --}}
                                        <tr class="input" data_id="{{ $item['id'] }}">
                                            <td class="text-end">
                                                <div class="input-group mb-2">
                                                    <button class="btn btn-outline-primary" type="button"
                                                        id="button-addon1" onclick="Kegiatan.addFile(this)"
                                                        @if(Auth::user()->role_id
                                                        != 1 && Auth::user()->role_id
                                                        != 7 )
                                                        disabled
                                                        @endif
                                                        >Pilih</button>
                                                    <input id="file" type="text" readonly class="form-control"
                                                        error="File" placeholder="Pilih Data File"
                                                        aria-label="Pilih Data File" aria-describedby="button-addon1"
                                                        value="{{ $item['file'] }}">
                                                </div>
                                                <button class="btn btn-warning btn-sm"
                                                    onclick="return Kegiatan.confirmDownload('{{ $item['file'] }}','{{ $item['file_path'] . $item['file'] }}')">
                                                    Lihat
                                                    File</button>

                                            </td>
                                            <td>
                                                <textarea name="keterangan" id="keterangan" class="form-control"
                                                    cols="30" rows="5"
                                                    placeholder="keterangan">{{ $item['keterangan'] }}</textarea>
                                            </td>
                                            <td>
                                                <button class="btn btn-danger btn-sm" {{ (session('role') !='Admin' &&
                                                    session('role') !='kerjasama / sub humas' ) ? 'disabled' : '' }}
                                                    data_id="{{ $item['id'] }}"
                                                    onclick="Kegiatan.deleteDataLampiran(this, event)">
                                                    <i class="bx bx-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        @endforeach
                                        @endif
                                        <tr>
                                            <td colspan="7">
                                                <button type="button" class="btn btn-primary btn-sm" {{ (session('role')
                                                    !='Admin' && session('role') !='kerjasama / sub humas' )
                                                    ? 'disabled' : '' }} onclick="Kegiatan.addLampiran(this, event)">
                                                    <i class="fa fa-plus-circle"></i> Tambah
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                @if (session('role') == 'Admin' || session('role') == 'kerjasama / sub humas')
                <div class="text-end mt-3 mb-3">
                    @if (isset($id))
                    <button type="button" class="btn btn-danger me-2" onclick="Kegiatan.delete(this, event)"
                        data_id="{{ $id }}">
                        <span><i class="bx bx-trash me-sm-2"></i>
                            <span class="d-none d-sm-inline-block">Hapus Semua Data</span>
                        </span>
                    </button>
                    @endif
                    <button type="button" class="btn btn-primary me-2" onclick="Kegiatan.submit(this, event)">
                        <span><i class="bx bx-check-circle me-sm-2"></i>
                            <span class="d-none d-sm-inline-block">Submit</span>
                        </span>
                    </button>
                </div>
                @endif
            </div>
        </div>
    </div>
</div>
<br>
@section('scripts')
@include('page.mou.kegiatan.scripts')
@endsection
