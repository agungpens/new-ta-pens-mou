
<input type="hidden" name="id" id="id" value="{{ session('id') }}">
<div class="row ">
    <div class="col-md-12 mb-3 text-end">
        <a href="#" class="dt-button create-new btn btn-secondary" tabindex="0" aria-controls="DataTables_Table_0"
            type="button" onclick="Profile.back()">
            <span>
                <i class="bx bx-chevron-left me-sm-2"></i>
                <span class="d-none d-sm-inline-block">Kembali</span>
            </span>
        </a>
    </div>

    <div class="col-xl-12">
        <div class="card">
            <h5 class="card-header">FORM DATA DIRI</h5>
            <div class="row form g-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label class="form-label">nama</label>
                            <input type='text' id="nama" class="form-control required" error="nama"
                                value="{{ isset($data['nama']) ? $data['nama'] : '' }}"
                                placeholder="nama">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Username</label>
                            <input type='text' id="username" class="form-control required" error="Username"
                                value="{{ isset($data['username']) ? $data['username'] : '' }}"
                                placeholder="Username">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">password</label>
                            <div class="input-group">
                                <input type='password' id="password" class="form-control required" error="password"
                                    value="{{ isset($data['password_lama']) ? $data['password_lama'] : '' }}"
                                    placeholder="password">
                                <button class="btn btn-outline-success" type="button" onclick="Profile.showPassword()">
                                    <i class="fa fa-eye" ></i>
                                </button>
                            </div>
                        </div>


                        <div class="col-md-6 mb-3">
                            <label class="form-label" for="prodi">PRODI</label>
                            <select id="prodi" name="prodi" class="form-select" data-allow-clear="true"
                                error="prodi" disabled>
                                <option value="{{ isset($data['prodis']['id']) ? $data['prodis']['id'] : '' }}">
                                    {{ isset($data['prodis']['id']) ? $data['prodis']['nama_prodi'] : '' }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label" for="role">role</label>
                            <select id="role" name="role" class="form-select required" data-allow-clear="true"
                                error="role" disabled>
                                <option value="{{ isset($data['roles']['id']) ? $data['roles']['id'] : '' }}">
                                    {{ isset($data['roles']['id']) ? $data['roles']['nama_role'] : '' }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label" for="nama_lengkap">Nama Lengkap</label>
                            <input type='text' id="nama_lengkap" class="form-control required" error="nama_lengkap"
                                value="{{ isset($data['detail_user']['nama_lengkap']) ? $data['detail_user']['nama_lengkap'] : '' }}"
                                placeholder="nama_lengkap">
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label" for="jenis_kelamin">Jenis Kelamin</label>
                            <select id="jenis_kelamin" name="jenis_kelamin" class="form-select required" data-allow-clear="true" error="Jenis Kelamin">
                                <option value="">Pilih Jenis Kelamin</option>
                                <option value="L" {{ isset($data['detail_user']['jenis_kelamin']) && $data['detail_user']['jenis_kelamin'] == 'L' ? 'selected' : '' }}>Laki-laki</option>
                                <option value="P" {{ isset($data['detail_user']['jenis_kelamin']) && $data['detail_user']['jenis_kelamin'] == 'P' ? 'selected' : '' }}>Perempuan</option>
                            </select>
                        </div>

                        <div class="col-md-6 mb-3">
                            <label class="form-label" for="no_hp">No HP</label>
                            <input type="text" class="form-control" name="no_hp" id="no_hp" value="{{ isset($data['detail_user']['no_hp']) ? $data['detail_user']['no_hp'] : '' }}">
                        </div>

                        <div class="col-md-12 mb-3">
                            <label class="form-label" for="basic-icon-default-fullname">Alamat</label>
                            <textarea class="form-control" error="Alamat" placeholder="Alamat"
                                name="alamat" id="alamat" cols="10" rows="5">{{ isset($data['detail_user']['alamat']) ? $data['detail_user']['alamat'] : '' }}</textarea>
                        </div>

                    </div>
                    <div class="text-end mt-3 mb-3">
                        <button type="button" class="btn btn-primary me-2" onclick="Profile.updated(this, event)">
                            <span><i class="bx bx-check-circle me-sm-2"></i>
                                <span class="d-none d-sm-inline-block">Updated</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
