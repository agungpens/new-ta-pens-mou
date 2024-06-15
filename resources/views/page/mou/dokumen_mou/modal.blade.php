<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Form Dokumen MoU</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <input type="hidden" id="id" value="">
                        <label class="form-label" for="basic-icon-default-fullname">
                            File MOU (*)
                        </label>
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-primary" type="button" id="button-addon1"
                                onclick="DokumenMou.addFileOutTable(this)">
                                Pilih
                            </button>
                            <input id="file" type="text" class="form-control required" error="File MOU"
                                placeholder="Pilih data dokumen mou" aria-label="Pilih data dokumen mou"
                                aria-describedby="button-addon1"
                                value="{{ isset($data->file_mou) ? $data->nomor_mou . ' - ' . $data->kerja_sama_dengan : '' }}"
                                readonly required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label" for="jenis">Pilih Jenis DOC</label>
                            <select id="jenis" name="jenis" class="select2 form-select required" data-allow-clear="true"
                                error="jenis" disabled>
                                <option value="{{ isset($data->jenis_doc_id) ? $data->jenis_doc_id : '' }}">
                                    {{ isset($data->nama_jenis) ? $data->nama_jenis : '' }}</option>
                                @foreach ($list_jenis as $item)
                                <option value="{{ $item->id }}" {{ isset($data->jenis_doc) && $data->jenis_doc ==
                                    $item->id
                                    ? 'selected' : ($item->id == 5 ? 'selected' : '') }}>
                                    {{ $item->nama_jenis }}
                                </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Nomor Mou</label>
                        <input type='text' id="nomor_mou" class="form-control required" error="Nomor Mou" value=""
                            placeholder="Nomor Mou" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label" for="basic-icon-default-fullname">kerja sama dengan</label>
                        <input type='text' id="kerja_sama_dengan" class="form-control required" error="Kerjasama Dengan"
                            value="" placeholder="Kerjasama Dengan" required>
                    </div>
                    <div class="col-md-12 mb-3">
                        <label class="form-label">Judul Mou</label>
                        <textarea class="form-control required" error="Judul MoU" placeholder="Judul MoU"
                            name="judul_mou" id="judul_mou" cols="10" rows="5" required></textarea>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label" for="basic-icon-default-fullname">Tanggal Dibuat</label>
                            <input type="text" class="form-control flatpickr required" name="tanggal_dibuat"
                                id="tanggal_dibuat" error="Tanggal Dibuat" id="basic-icon-default-fullname"
                                placeholder="Tanggal Dibuat" aria-label="tanggal_dibuat"
                                aria-describedby="basic-icon-default-fullname2" onchange="DokumenMou.changeDate()"
                                value="" required />
                        </div>

                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label" for="basic-icon-default-fullname">Tanggal berakhir</label>
                            <input type="text" class="form-control flatpickr required" name="tanggal_berakhir"
                                id="tanggal_berakhir" error="Tanggal berakhir" id="basic-icon-default-fullname"
                                placeholder="Tanggal berakhir" aria-label="tanggal_berakhir"
                                aria-describedby="basic-icon-default-fullname2" onchange="DokumenMou.changeDate()" value="" required />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label" for="kategori_modal">Pilih kategori Doc / jenis mitra doc</label>
                            <select id="kategori_modal" name="kategori_modal" class="select2 form-select required"
                                data-allow-clear="true" error="kategori" required>
                                <option value=""></option>
                                @foreach ($list_kategori as $item)
                                <option value="{{$item->id}}">
                                    {{ $item->nama_kategori }}
                                </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label" for="level_modal">Pilih Level Dokumen</label>
                            <select id="level_modal" name="level_modal" class="select2 form-select required"
                                data-allow-clear="true" error="level" required>
                                <option value=""></option>
                                @foreach ($list_level as $item)
                                <option value="{{ $item->id }}">
                                    {{ $item->nama_level }}
                                </option>
                                @endforeach
                            </select>

                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            @php
                            $list_status = ['AKTIF', 'TIDAK AKTIF'];
                            @endphp
                            <label class="form-label" for="status_modal">Status Dokumen</label>
                            <select id="status_modal" name="status_modal" class="select2 form-select required"
                                data-allow-clear="true" error="status">
                                <option value=""></option>
                                @foreach ($list_status as $item)
                                <option value="{{ $item }}">
                                    {{ $item }}
                                </option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label" for="relevansi_prodi">Relevansi Prodi (Opsional)</label>
                            @foreach ($list_prodi as $item)
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="prodi_{{ $item->id }}"
                                    name="relevansi_prodi[]" value="{{ $item->id }}">
                                <label class="form-check-label" for="prodi_{{ $item->id }}">
                                    {{ $item->nama_prodi }}
                                </label>
                            </div>
                            @endforeach
                        </div>
                    </div>


                </div>
            </div>
            <div class="modal-footer" id="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                @if (session('role') == 'Admin' || session('role') == 'kerjasama / sub humas')
                <button type="button" class="btn btn-primary me-2" id="submit-button"
                    onclick="DokumenMou.submit(this, event)">
                    <span><i class="bx bx-check-circle me-sm-2"></i>
                        <span class="d-none d-sm-inline-block">Submit</span>
                    </span>
                </button>
                @endif
            </div>

        </div>
    </div>
</div>
