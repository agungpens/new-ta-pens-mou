<div class="row my-4">
    <div class="col-12">
        <div class="card">
            <div class="card-body">
                <h3>Filter Data</h3>
                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-sm-4 mb-3">
                                <label class="form-label" for="status">Status</label>
                                <select id="status" name="status" class="form-select select2" error="Status"
                                    data-allow-clear="true">
                                    <option value="">Semua</option>
                                    <option value="AKTIF">AKTIF</option>
                                    <option value="TIDAK AKTIF">TIDAK AKTIF</option>
                                </select>
                            </div>
                            <div class="col-sm-4 mb-3">
                                <label class="form-label" for="area">Prodi</label>
                                <select id="prodi" name="prodi" class="select2 form-select required" error="Area"
                                    data-allow-clear="true" {{ session('role') !='Admin' ? '' : '' }}>
                                    <option value="">prodi</option>
                                    @foreach ($list_prodi as $item)
                                    <option value="{{ $item->nama_prodi}}" {{ session('prodi')==$item->nama_prodi ? 'selected'
                                        : '' }}>
                                        {{ $item->nama_prodi }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-sm-4 mb-3">
                                <label class="form-label" for="level">Level</label>
                                <select id="level" name="level" class="select2 form-select required" error="Area"
                                    data-allow-clear="true">
                                    <option value="">Level</option>
                                    @foreach ($list_level as $item)
                                    <option value="{{ $item->id }}">{{ $item->nama_level }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-sm-4 mb-3">
                                <label class="form-label" for="kategori">kategori</label>
                                <select id="kategori" name="kategori" class="select2 form-select required" error="Area"
                                    data-allow-clear="true">
                                    <option value="">kategori</option>
                                    @foreach ($list_kategori as $item)
                                    <option value="{{ $item->id }}">{{ $item->nama_kategori }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="col-sm-4 mb-3">
                                <label class="form-label">Mulai Tanggal</label>
                                <input type='text' id="tgl_mulai" class="form-control flatpickr" value=""
                                    placeholder="YYYY-MM-D">
                            </div>
                            <div class="col-sm-4 mb-3">
                                <label class="form-label">Sampai Tanggal</label>
                                <input type='text' id="tgl_selesai" class="form-control flatpickr" value=""
                                    placeholder="YYYY-MM-D">
                            </div>
                            <div class="col-sm-4 mb-3">
                                <label class="form-label">Kerja sama dengan</label>
                                <input type='text' id="kerja_sama" class="form-control" value=""
                                    placeholder="Masukan Kerjasama...">
                            </div>
                            <div class="col-sm-4 mb-3">
                                <label class="form-label">Judul MOA</label>
                                <input type='text' id="judul_moa" class="form-control" value=""
                                    placeholder="Judul MOA...">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 mt-3">
                        <button onclick="DokumenMoa.kosongkan()" class="dt-button create-new btn btn-danger"
                            tabindex="0" type="button">
                            <span><i class="bx bx-refresh me-sm-2"></i>
                                <span class="d-none d-sm-inline-block">Kosongkan</span></span>
                        </button>
                        <button onclick="DokumenMoa.getData()" class="dt-button create-new btn btn-info" tabindex="0"
                            type="button">
                            <span><i class="bx bx-search me-sm-2"></i>
                                <span class="d-none d-sm-inline-block">Filter</span></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row my-4">
    <div class="col-md-12">
        <div class="card">
            <div class="card-header text-end">
                @if (session('role') == 'Admin' || session('role') == 'kerjasama / sub humas')
                <button onclick="DokumenMoa.add()" class="dt-button create-new btn btn-primary" tabindex="0"
                    aria-controls="DataTables_Table_0" type="button">
                    <span><i class="bx bx-plus me-sm-2"></i>
                        <span class="d-none d-sm-inline-block">Tambah
                            Baru</span></span>
                </button>
                @endif
            </div>
            <div class="card-body">
                <div class="table-responsive text-nowrap">
                    <table class="datatables-basic table table-bordered" id="table-data">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th class="text-center">Action</th>
                                <th>
                                    File
                                    <br>
                                    Status
                                </th>
                                <th>Nomor MOU</th>
                                <th>Nomor MOA</th>
                                <th>Judul MOA</th>
                                <th>Kerja Sama Dengan</th>
                                <th>Relevansi Prodi</th>
                                <th>
                                    Masa Berlaku Tanggal
                                </th>
                                <th>
                                    Kategori
                                    <br>
                                    Level
                                    <br>
                                    Jenis
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@section('scripts')
@include('page.mou.dokumen_moa.scripts')
@endsection
