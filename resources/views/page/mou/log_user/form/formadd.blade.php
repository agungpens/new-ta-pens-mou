<input type="hidden" id="id" value="{{ isset($id) ? $id : '' }}">
{{-- {{ dd($data) }} --}}

<div class="row">
    <div class="col-md-12 text-end">
        <a href="#" class="dt-button create-new btn btn-secondary" tabindex="0" aria-controls="DataTables_Table_0"
            type="button" onclick="LogUser.back()">
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
        <h5 class="card-header">Data yang berubah</h5>
        <div class="card-body">
            <div class="row">
                <div class="col-6">
                    <div class="mb-2">
                        <label for="nama_user" class="form-label">Nama User</label>
                        <input type="text" class="form-control" id="nama_user" name="nama_user"
                            placeholder="Nama User" value="{{ $data['nama_username'] }}" readonly>
                    </div>
                    <div class="mb-2">
                        <label for="ip" class="form-label">IP</label>
                        <input type="text" class="form-control" id="ip" name="ip"
                            placeholder="IP" value="{{ $data['ip'] }}" readonly>
                    </div>
                    <div class="mb-2">
                        <label for="action" class="form-label">action</label>
                        <input type="text" class="form-control" id="action" name="action"
                            placeholder="action" value="{{ $data['action'] }}" readonly>
                    </div>
                    <div class="mb-2">
                        <label for="waktu" class="form-label">waktu</label>
                        <input type="text" class="form-control" id="waktu" name="waktu"
                            placeholder="waktu" value="{{ $data['created_at'] }}" readonly>
                    </div>
                </div>
                <div class="col-6">
                    <div class="mb-2">
                        <label for="content" class="form-label">Content</label>
                        <textarea name="content" id="content" cols="30" rows="10" class="form-control" readonly>{{ $data['content'] }}</textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<br>
