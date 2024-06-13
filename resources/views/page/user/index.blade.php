<div class="row">
    <div class="col-md mb-4 mb-md-0">
        <div class="accordion mt-3" id="accordionExample">
            <div class="card accordion-item active">
                <h2 class="accordion-header" id="headingOne">
                    <button type="button" class="accordion-button" data-bs-toggle="collapse"
                        data-bs-target="#accordionOne" aria-expanded="true" aria-controls="accordionOne">
                        <b>FORM FILTER</b>
                    </button>
                </h2>

                <div id="accordionOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <form action="">
                            <div class="row">
                                <div class="col">
                                    <div class="mb-3">
                                        <label for="nama" class="form-label">Nama Panggilan</label>
                                        <input type="text" class="form-control" id="nama"
                                            placeholder="Masukan Nama" />
                                    </div>
                                </div>
                                <div class="mb-3 col">
                                    <label class="form-label" for="role">Role</label>
                                    <select id="role" name="role" class="select2 form-select required"
                                        data-allow-clear="true" error="role">
                                        <option value="{{ isset($data->role_id) ? $data->role_id : '' }}">
                                            {{ isset($data->nama_role) ? $data->nama_role : '' }}</option>
                                        @foreach ($role as $item)
                                            <option value="{{ $item->id }}">{{ $item->nama_role }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                                <div class="mb-3 col">
                                    <label class="form-label" for="prodi">Prodi</label>
                                    <select id="prodi" name="prodi" class="select2_prodi form-select required"
                                        data-allow-clear="true" error="prodi">
                                        <option value="{{ isset($data->prodi_id) ? $data->prodi_id : '' }}">
                                            {{ isset($data->nama_prodi) ? $data->nama_prodi : '' }}
                                        </option>
                                        @foreach ($prodi as $item)
                                            <option value="{{ $item->id }}">{{ $item->nama_prodi }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <button onclick="Users.kosongkan()" class="dt-button create-new btn btn-secondary"
                                tabindex="0" type="button">
                                <span><i class="bx bx-refresh me-sm-2"></i>
                                    <span class="d-none d-sm-inline-block">Kosongkan</span></span>
                            </button>
                            <button onclick="Users.filter()" class="dt-button create-new btn btn-danger" tabindex="0"
                                type="button">
                                <span><i class="bx bx-search me-sm-2"></i>
                                    <span class="d-none d-sm-inline-block">Filter</span></span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>
<br>
<div class="card">
    <div class="card-header text-end">
        <button onclick="Users.add()" class="dt-button create-new btn btn-primary" tabindex="0"
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
                        <th>Nama Panggilan</th>
                        <th>Roles / Jabatan</th>
                        <th>Prodi</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>
