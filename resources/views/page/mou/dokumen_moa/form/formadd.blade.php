<input type="hidden" id="id" value="{{ isset($id) ? $id : '' }}">
<div class="row">
    <div class="col-md-12 text-end">
        <a href="#" class="dt-button create-new btn btn-secondary" tabindex="0" aria-controls="DataTables_Table_0"
            type="button" onclick="DokumenMoa.back()">
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
        <h5 class="card-header">Form Document Moa</h5>
        <div class="row form g-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-12">
                        <label class="form-label" for="basic-icon-default-fullname">Relevansi Dokumen MOU
                            (Optional)</label>
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-primary" type="button" id="button-addon1"
                                onclick="DokumenMoa.showDataMou(this, event)">Pilih</button>
                            <input id="nomor_mou" src="" type="text" class="form-control"
                                placeholder="Pilih data dokumen mou" aria-label="Pilih data dokumen mou"
                                aria-describedby="button-addon1" value="" readonly>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <button class="btn btn-primary float-end" onclick="DokumenMoa.addItem(this, event)">Add
                            Item</button>
                        <div class="accordion" id="accordionPanelsStayOpenExample">
                        </div>
                    </div>
                </div>
                <div class="text-end mt-3 mb-3">
                    <button type="button" class="btn btn-primary me-2" onclick="DokumenMoa.submit(this, event)">
                        <span><i class="bx bx-check-circle me-sm-2"></i>
                            <span class="d-none d-sm-inline-block">Submit</span>
                        </span>
                    </button>
                </div>

            </div>
        </div>
    </div>
</div>
<br>


@section('scripts')
@include('page.mou.dokumen_moa.scripts')
@endsection
