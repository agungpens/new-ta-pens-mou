<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Form Kategori & Jenis Mitra</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="row">
                <div class="modal-body">
                    <div class="row">
                        <div class="mb-3 col-md-12">
                            <input type="hidden" name="id" id="id" value="">
                            <label class="form-label" for="basic-icon-default-fullname">Nama
                                Kategori</label>
                            <div class="input-group input-group-merge">
                                <span id="basic-icon-default-fullname2" class="input-group-text"><i
                                        class="bx bx-user"></i></span>
                                <input type="text" class="form-control required" name="nama_kategori" id="nama_kategori"
                                    error="Nama kategori" id="basic-icon-default-fullname" placeholder="Nama Kategori"
                                    aria-label="Nama" aria-describedby="basic-icon-default-fullname2" value="" />
                            </div>
                        </div>
                        <div class="mb-3 col-md-12">
                            <label class="form-label" for="basic-icon-default-fullname">Keterangan</label>
                            <div id="keterangan"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" id="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary me-2" onclick="Kategori.submit(this, event)">
                        <span><i class="bx bx-check-circle me-sm-2"></i>
                            <span class="d-none d-sm-inline-block">Submit</span>
                        </span>
                    </button>
                </div>
            </div>

        </div>
    </div>
</div>
