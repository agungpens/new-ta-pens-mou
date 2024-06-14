<div class="card">
    <div class="card-header text-end">
        <button onclick="Role.add()" class="dt-button create-new btn btn-primary" tabindex="0"
            aria-controls="DataTables_Table_0" type="button">
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
                        <th>No</th>
                        <th class="text-center">Action</th>
                        <th>Nama Role</th>
                        <th>Keterangan</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
@section('scripts')
@include('page.user.role.scripts')
@endsection
