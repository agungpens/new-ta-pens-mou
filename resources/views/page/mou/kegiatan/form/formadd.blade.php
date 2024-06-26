{{-- {{ dd($data); }} --}}
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
                    <div class="col-md-12">
                        <label class="form-label" for="basic-icon-default-fullname">Relevansi Dokumen MOU
                            (Optional)</label>
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-primary" type="button" id="button-addon1"
                                onclick="Kegiatan.showDataMou(this, event)">Pilih</button>
                            <input id="nomor_mou" src="" type="text" class="form-control"
                                placeholder="Pilih data dokumen mou" aria-label="Pilih data dokumen mou"
                                aria-describedby="button-addon1"
                                value="{{ isset($data['nomor_doc_mou']) && $data['nomor_doc_mou'] != null ? $data['nomor_mou'] . ' - ' . $data['nomor_doc_mou']['kerja_sama_dengan'] : '' }}"
                                readonly>
                        </div>
                        <label class="form-label" for="basic-icon-default-fullname">Relevansi Dokumen MOa
                            (Optional)</label>
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-primary" type="button" id="button-addon1"
                                onclick="Kegiatan.showDataMoa(this, event)">Pilih</button>
                            <input id="nomor_moa" src="" type="text" class="form-control"
                                placeholder="Pilih data dokumen moa" aria-label="Pilih data dokumen moa"
                                aria-describedby="button-addon1"
                                value="{{ isset($data['nomor_doc_moa']) && $data['nomor_doc_moa'] != null ? $data['nomor_moa'] . ' - ' . $data['nomor_doc_moa']['kerja_sama_dengan'] : '' }}"
                                readonly>
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="basic-icon-default-fullname">kegiatan</label>
                            <div id="kegiatan">{!! isset($data['kegiatan']) ? $data['kegiatan'] : '' !!}</div>
                        </div>

                    </div>
                    <div class="col-12">
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
                                                <tr class="input" data_id="{{ $item['id'] }}">
                                                    <td class="text-end">
                                                        <div class="input-group mb-2">
                                                            <button class="btn btn-outline-primary" type="button"
                                                                id="button-addon1"
                                                                onclick="Kegiatan.addFile(this)">Pilih</button>
                                                            <input id="file" type="text" readonly
                                                                class="form-control" error="File"
                                                                placeholder="Pilih Data File"
                                                                aria-label="Pilih Data File"
                                                                aria-describedby="button-addon1"
                                                                value="{{ $item['file'] }}">
                                                        </div>
                                                        <button class="btn btn-warning btn-sm"
                                                            src="{{ asset($item['file_path'] . $item['file']) }}"
                                                            onclick="Kegiatan.showFile(this, event)"> Lihat
                                                            Data</button>
                                                    </td>
                                                    <td>
                                                        <textarea name="keterangan" id="keterangan" class="form-control" cols="30" rows="5" placeholder="keterangan">{{ $item['keterangan'] }}</textarea>
                                                    </td>
                                                    <td>
                                                        <button class="btn btn-danger btn-sm"
                                                            {{ session('role') != 'Admin' ? 'disabled' : '' }}
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
                                                <button type="button" class="btn btn-primary btn-sm"
                                                    {{ session('role') != 'Admin' ? 'disabled' : '' }}
                                                    onclick="Kegiatan.addLampiran(this, event)">
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
