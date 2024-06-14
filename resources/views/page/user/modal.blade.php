<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Form Add User</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="mb-3 col-md-6">
                        <input type="hidden" name="user_id" id="user_id"
                            value="{{ isset($data->id_user) ? $data->id_user : '' }}">
                        <label class="form-label" for="nama">Nama
                            Panggilan</label>
                        <div class="input-group input-group-merge">
                            <span class="input-group-text"><i class="bx bx-user"></i></span>
                            <input type="text" class="form-control required" name="nama" id="nama" error="Nama User"
                                placeholder="Nama" aria-label="Nama" aria-describedby="2"
                                value="{{ isset($data->nama_user) ? $data->nama_user : '' }}" />
                        </div>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label class="form-label" for="">Username</label>
                        <div class="input-group input-group-merge">
                            <span class="input-group-text"><i class="bx bx-user"></i></span>
                            <input type="text" class="form-control required" name="username" id="username"
                                error="Username" placeholder="username" aria-label="username" aria-describedby="2"
                                value="{{ isset($data->username) ? $data->username : '' }}" />
                        </div>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label class="form-label" for="">Password
                        </label>
                        <div class="input-group input-group-merge">
                            <span class="input-group-text"><i class="bx bx-user"></i></span>
                            <input type="password" class="form-control required" name="password" id="password"
                                error="Password" placeholder="Password " aria-label="password" aria-describedby="2"
                                value="{{ isset($data->password) ? $data->password : '' }}" />
                        </div>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label class="form-label" for="role">Pilih Role</label>
                        <select id="role" name="role" class="select2 form-select required" data-allow-clear="true"
                            error="role">
                            <option value="{{ isset($data->role_id) ? $data->role_id : '' }}">
                                {{ isset($data->nama_role) ? $data->nama_role : '' }}</option>
                            @foreach ($role as $item)
                            <option value="{{ $item->id }}">{{ $item->nama_role }}
                            </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="mb-3 col-md-6">
                        <label class="form-label" for="prodi">Pilih prodi (Optional)</label>
                        <select id="prodi" name="prodi" class="select2_prodi form-select" data-allow-clear="true"
                            error="prodi">
                            <option value="{{ isset($data->prodi_id) ? $data->prodi_id : '' }}">
                                {{ isset($data->nama_prodi) ? $data->nama_prodi : '' }}
                            </option>
                            @foreach ($prodi as $item)
                            <option value="{{ $item->id }}">{{ $item->nama_prodi }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="text-end mt-2 mb-3">
                        <button type="button" class="btn btn-primary me-2" onclick="Users.submit(this,event)">
                            <span><i class="bx bx-check-circle me-sm-2"></i>
                                <span class="d-none d-sm-inline-block">Submit</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal-footer" id="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary me-2" onclick="Leveling.submit(this, event)">
                    <span><i class="bx bx-check-circle me-sm-2"></i>
                        <span class="d-none d-sm-inline-block">Submit</span>
                    </span>
                </button>
            </div>

        </div>
    </div>
</div>
