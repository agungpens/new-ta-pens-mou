<div class="card">
    <div class="card-header text-end">
        @if (session('role') == 'Admin' || session('role') == 'kerjasama / sub humas')
        <button onclick="Kegiatan.add()" class="dt-button create-new btn btn-primary" tabindex="0"
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
                        <th class="p-0">No</th>
                        <th class="text-center p-0">Action</th>
                        <th>NOMOR MOU</th>
                        <th>NOMOR MOA</th>
                        <th>Instansi</th>
                        <th>Kegiatan</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>

@section('scripts')
@include('page.mou.kegiatan.scripts')
@endsection
