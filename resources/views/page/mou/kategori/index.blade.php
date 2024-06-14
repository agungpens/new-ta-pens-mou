<div class="card">
    <div class="card-header text-end">
        <button type="button" class="dt-button create-new btn btn-primary" tabindex="0"
            aria-controls="DataTables_Table_0" type="button" onclick="Kategori.add()">
            <span><i class="bx bx-plus me-sm-2"></i>
                <span class="d-none d-sm-inline-block">Tambah
                    Baru</span></span>
        </button>
    </div>
    <div class="card-body">
        <div class="table-responsive text-nowrap">
            <table class="datatables-basic table table-bordered" id="table-data">
                <thead>
                    <tr>
                        <th style="width: 10px">No</th>
                        <th class="text-center" style="width: 10px">Action</th>
                        <th>Nama Kategori</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>

@include('page.mou.kategori.form.modal')
@section('scripts')
@include('page.mou.kategori.scripts')
@endsection
