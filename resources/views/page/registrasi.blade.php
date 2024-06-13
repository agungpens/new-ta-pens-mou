<!DOCTYPE html>

<html lang="en" class="light-style customizer-hide" dir="ltr" data-theme="theme-default" data-assets-path="assets/"
    data-template="vertical-menu-template-free">

<head>
    <meta charset="utf-8" />
    <meta name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

    <title>Simouaka | Login</title>

    <meta name="description" content="" />

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="{{ asset('img/logoaka.png') }}" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com/">
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&amp;family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&amp;display=swap"
        rel="stylesheet">

    <!-- Icons. Uncomment required icon fonts -->
    <link rel="stylesheet" href="{{ asset('assets/vendor/fonts/boxicons.css') }}" />

    <!-- Core CSS -->
    <link rel="stylesheet" href="{{ asset('assets/vendor/css/rtl/core.css') }}" class="template-customizer-core-css" />
    <link rel="stylesheet" href="{{ asset('assets/vendor/css/rtl/theme-default.css') }}"
        class="template-customizer-theme-css" />
    <link rel="stylesheet" href="{{ asset('assets/css/demo.css') }}" />

    <!-- Vendors CSS -->
    <link rel="stylesheet" href="{{ asset('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/library/toastr/toastr.css') }}">
    <!-- Page CSS -->
    <!-- Page -->
    <link rel="stylesheet" href="{{ asset('assets/vendor/css/pages/page-auth.css') }}" />
    <!-- Helpers -->
    <script src="{{ asset('assets/vendor/js/helpers.js') }}"></script>

    <!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section -->
    <!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  -->
    <script src="{{ asset('assets/js/config.js') }}"></script>

</head>

<body>
    <!-- Content -->

    <div class="container-xxl">
        <div class="authentication-wrapper authentication-basic container-p-y">
            <div class="authentication-inner">
                <!-- Register Card -->
                <div class="card">
                    <div class="card-body">
                        <!-- Logo -->
                        <div class="app-brand justify-content-center">
                            <a href="{{ url('/') }}" class="app-brand-link gap-2">
                                <img src="{{ asset('img/logoaka.png') }}" alt="logoaka" width="30">
                                <span class="app-brand-text demo text-body fw-bolder">Simouaka</span>
                            </a>
                        </div>
                        <!-- /Logo -->
                        <h4 class="mb-2">Register to Simouaka! 👋</h4>
                        <p class="mb-4">Please complete your account and start your management</p>

                        <form id="formAuthentication" class="mb-3" action="{{ url('registrasi/submit') }}"
                            method="POST">
                            @csrf
                            <div class="mb-3">
                                <label for="nama" class="form-label">Nama Paggilan</label>
                                <input type="text" class="form-control" id="nama" name="nama"
                                    placeholder="Masukan nama paggilan" autofocus required />
                            </div>
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" class="form-control" id="username" name="username"
                                    placeholder="Masukan username" autofocus required />
                            </div>
                            <div class="mb-3 form-password-toggle">
                                <label class="form-label" for="password">Password</label>
                                <div class="input-group input-group-merge">
                                    <input type="password" id="password" class="form-control" name="password"
                                        placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                        aria-describedby="password" required />
                                    <span class="input-group-text cursor-pointer"><i class="bx bx-hide"></i></span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="prodi">Pilih prodi</label>
                                <select id="prodi" name="prodi" class="select2 form-select required"
                                    data-allow-clear="true" error="prodi" required>
                                    <option value="{{ isset($data->prodi_id) ? $data->prodi_id : '' }}">
                                        {{ isset($data->nama_prodi) ? $data->nama_prodi : '' }}
                                    </option>
                                    @foreach ($prodi as $item)
                                        <option value="{{ $item->id }}">{{ $item->nama_prodi }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="mb-3">
                                <small class="text-light fw-semibold">Pilih Role</small>
                                <div class="form-check mt-3">
                                    <div class="row d-flex m-auto">
                                        <div class="col-6">
                                            <input name="role" class="form-check-input" type="radio"
                                                value="2" id="role" />
                                            <label class="form-check-label" for="role"> Dosen </label>
                                        </div>
                                        <div class="col-6">
                                            <input name="role" class="form-check-input" type="radio"
                                                value="3" id="role2" required />
                                            <label class="form-check-label" for="role2"> Staff / Karyawan </label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary d-grid w-100">Sign up / Daftar</button>
                        </form>

                        <p class="text-center">
                            <span>Already have an account?</span>
                            <a href="{{ route('login') }}">
                                <span>Sign in instead</span>
                            </a>
                        </p>
                    </div>
                </div>
                <!-- Register Card -->
            </div>
        </div>
    </div>

    <!-- / Content -->



    <!-- Core JS -->
    <!-- build:js assets/vendor/js/core.js -->
    <script src="{{ asset('assets/vendor/libs/jquery/jquery.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/popper/popper.js') }}"></script>
    <script src="{{ asset('assets/vendor/js/bootstrap.js') }}"></script>
    <script src="{{ asset('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js') }}"></script>

    <script src="{{ asset('assets/vendor/js/menu.js') }}"></script>
    <!-- endbuild -->

    <!-- Vendors JS -->

    <!-- Main JS -->
    <script src="{{ asset('assets/js/main.js') }}"></script>
    <script src="{{ asset('assets/library/toastr/toastr.js') }}"></script>


</body>

</html>


<script src="{{ asset('assets/libs/select2/select2.js') }}"></script>
<script src="{{ asset('assets/js/controller/registrasi.js') }}"></script>
@if (session()->has('success'))
    <script>
        toastr.success(`{{ session('success') }}`, `Success`, {
            "positionClass": "toast-top-center",
            "closeButton": true,
            "progressBar": true,
        });
    </script>
@endif
@if (session()->has('error'))
    <script>
        toastr.error(`{{ session('error') }}`, `Error`, {
            "positionClass": "toast-top-center",
            "closeButton": true,
            "progressBar": true,
        });
    </script>
@endif
@if (count($errors) > 0)
    <script>
        toastr.error(`{{ $errors->first() }}`, `Error`, {
            "positionClass": "toast-top-center",
            "closeButton": true,
            "progressBar": true,
        });
    </script>
@endif
