<div class="row">

    <div class="col-lg-12 mb-4 order-0">
        <div class="card">
            <div class="d-flex align-items-end row">
                <div class="col-sm-7">
                    <div class="card-body">
                        <h5 class="card-title text-primary">Selamat Datang {{ session('nama') }} 🎉</h5>
                        <p class="mb-4">
                            You have done <span class="fw-bold">72%</span> more sales today. Check your new badge in
                            your profile.
                        </p>
                        <a class="btn btn-sm btn-outline-primary" href="#" onclick="myProfile(this)"
                            data_id="{{ session('id') }}">

                            <span class="align-middle">My Profile</span>
                        </a>

                    </div>
                </div>
                <div class="col-sm-5 text-center text-sm-left">
                    <div class="card-body pb-0 px-0 px-md-4">
                        <img src="{{ asset('assets/img/illustrations/man-with-laptop-light.png') }}" height="140" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-12 mb-4">
        @if (isset($mou_yang_akan_habis) && $mou_yang_akan_habis != [])
        <div class="alert alert-warning"><b>
                <i class="fa fa-warning"></i> Perhatian</b>
            ada file dokumen mou yang akan segera berakhir kurang beberapa hari lagi
        </div>
        <div class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOneU" aria-expanded="true" aria-controls="collapseOneU">
                        DOKUMEN MOU<span class="badge bg-info">{{ count($mou_yang_akan_habis) }}</span>
                    </button>
                </h2>
                <div id="collapseOneU" class="accordion-collapse collapse " aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <div class="table-responsive text-nowrap">
                            <table class="datatables-basic table table-bordered" id="table-data">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        {{-- <th class="text-center">Action</th> --}}
                                        <th>
                                            File
                                            <br>
                                            Status
                                        </th>
                                        <th>Nomor MOU</th>
                                        <th>Judul MOU</th>
                                        <th>Kerja Sama Dengan</th>
                                        <th>Relevansi Prodi</th>
                                        <th>
                                            Masa Berlaku Tanggal
                                        </th>
                                        <th>
                                            Kategori
                                            <br>
                                            Level
                                            <br>
                                            Jenis
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($mou_yang_akan_habis as $item)
                                    <tr>
                                        <td>{{ $loop->iteration }}</td>

                                        <td>
                                            {{ $item['file_mou'] }}
                                            <br>
                                            {{-- badge --}}
                                            <span class="badge
                                            @if ($item['status']  == 'AKTIF')
                                                bg-success
                                                @else
                                                bg-danger
                                            @endif
                                            ">{{ $item['status'] }}</span>
                                        </td>
                                        <td>{{ $item['nomor_mou'] }}</td>
                                        <td>{{ $item['judul_mou'] }}</td>
                                        <td>{{ $item['kerja_sama_dengan'] }}</td>
                                        <td>
                                            @foreach ($item['relevansi_prodi'] as $items)
                                            {{ $items }}<br>
                                            @endforeach
                                        </td>
                                        <td>
                                            {{ $item['tanggal_dibuat'] }}
                                            <br>
                                            s/d
                                            <br>
                                            {{ $item['tanggal_berakhir'] }}
                                        </td>
                                        <td>
                                            {{ $item['kategori_mou'] }}
                                            <br>
                                            {{ $item['level_mou'] }}
                                            <br>
                                            {{ $item['jenis_doc'] }}
                                        </td>


                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endif
        <br>

        @if (isset($moa_yang_akan_habis) && $moa_yang_akan_habis != [] )
        <div class="alert alert-warning"><b>
                <i class="fa fa-warning"></i> Perhatian</b>
            ada file dokumen moa yang akan segera berakhir kurang beberapa hari lagi
        </div>
        <div class="accordion" id="accordionExampleMoa">
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        DOKUMEN MOA<span class="badge bg-info">{{ count($moa_yang_akan_habis) }}</span>
                    </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse " aria-labelledby="headingOne"
                    data-bs-parent="#accordionExampleMoa">
                    <div class="accordion-body">
                        <div class="table-responsive text-nowrap">
                            <table class="datatables-basic table table-bordered" id="table-data">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        {{-- <th class="text-center">Action</th> --}}
                                        <th>
                                            File
                                            <br>
                                            Status
                                        </th>
                                        <th>Nomor MOa</th>
                                        <th>Judul MOa</th>
                                        <th>Kerja Sama Dengan</th>
                                        <th>Relevansi Prodi</th>
                                        <th>
                                            Masa Berlaku Tanggal
                                        </th>
                                        <th>
                                            Kategori
                                            <br>
                                            Level
                                            <br>
                                            Jenis
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($moa_yang_akan_habis as $item)
                                    <tr>
                                        <td>{{ $loop->iteration }}</td>

                                        <td>
                                            {{ $item['file_moa'] }}
                                            <br>
                                            {{-- badge --}}
                                            <span class="badge
                                            @if ($item['status']  == 'AKTIF')
                                                bg-success
                                                @else
                                                bg-danger
                                            @endif
                                            ">{{ $item['status'] }}</span>
                                        </td>
                                        <td>{{ $item['nomor_moa'] }}</td>
                                        <td>{{ $item['judul_moa'] }}</td>
                                        <td>{{ $item['kerja_sama_dengan'] }}</td>
                                        <td>
                                            @foreach ($item['relevansi_prodi'] as $items)
                                            {{ $items }}<br>
                                            @endforeach
                                        </td>
                                        <td>
                                            {{ $item['tanggal_dibuat'] }}
                                            <br>
                                            s/d
                                            <br>
                                            {{ $item['tanggal_berakhir'] }}
                                        </td>
                                        <td>
                                            {{ $item['kategori_moa'] }}
                                            <br>
                                            {{ $item['level_moa'] }}
                                            <br>
                                            {{ $item['jenis_doc'] }}
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endif
    </div>
</div>
<div class="row d-flex">
    <div class="col-lg-4 col-md-4 col-sm-4 mb-4 order-0">
        <div class="card">
            <div class="card-body">
                <div class="card-title d-flex align-items-start justify-content-between">
                    <div class="avatar flex-shrink-0">
                        <span class="badge bg-label-success rounded-pill">Dokumen MOU</span>
                    </div>
                    <div class="dropdown">
                        <button class="btn p-0" type="button" id="cardOpt3" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                            <a class="dropdown-item" href="{{ url('dokumen-mou') }}">View More</a>
                        </div>
                    </div>
                </div>
                <span class="fw-semibold d-block mb-1">Total Semua <br> Dokumen</span>
                <h3 class="card-title mb-2">{{ $total_mou }}</h3>
                <small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i>
                    {{ $total_mou_aktif }}</small>
                <small class="text-danger fw-semibold"><i class="bx bx-down-arrow-alt"></i>
                    {{ $total_mou_tidak_aktif }}</small>
            </div>
        </div>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-4 mb-4 order-0">
        <div class="card">
            <div class="card-body">
                <div class="card-title d-flex align-items-start justify-content-between">
                    <div class="avatar flex-shrink-0">
                        <span class="badge bg-label-warning rounded-pill">Dokumen MOA</span>
                    </div>
                    <div class="dropdown">
                        <button class="btn p-0" type="button" id="cardOpt3" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                            <a class="dropdown-item" href="{{ url('dokumen-moa') }}">View More</a>
                        </div>
                    </div>
                </div>
                <span class="fw-semibold d-block mb-1">Total Semua <br> Dokumen</span>
                <h3 class="card-title mb-2">{{ $total_moa }}</h3>
                <small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i>
                    {{ $total_moa_aktif }}</small>
                <small class="text-danger fw-semibold"><i class="bx bx-down-arrow-alt"></i>
                    {{ $total_moa_tidak_aktif }}</small>
            </div>
        </div>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-4 mb-4 order-0">
        <div class="card">
            <div class="card-body">
                <div class="card-title d-flex align-items-start justify-content-between">
                    <div class="avatar flex-shrink-0">
                        <span class="badge bg-label-info rounded-pill">Kegiatan</span>
                    </div>
                    <div class="dropdown">
                        <button class="btn p-0" type="button" id="cardOpt3" data-bs-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                            <i class="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt3">
                            <a class="dropdown-item" href="{{ url('kegiatan') }}">View More</a>
                        </div>
                    </div>
                </div>
                <span class="fw-semibold d-block mb-1">Total Semua <br> Kegiatan</span>
                <h3 class="card-title mb-2">{{ $total_kegiatan }}</h3>
                <small class="text-success fw-semibold"><i class="bx bx-up-arrow-alt"></i>
                    {{ $total_kegiatan }}</small>

            </div>
        </div>
    </div>
</div>


@section('script')
@endsection
