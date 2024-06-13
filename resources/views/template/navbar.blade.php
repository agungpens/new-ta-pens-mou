<!-- Navbar -->
<input type="hidden" name="role_user" id="role_user" value="{{ session('role') }}">
<nav class="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme" id="layout-navbar">
    <div class="container-fluid">
        <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0   d-xl-none ">
            <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                <i class="bx bx-menu bx-sm"></i>
            </a>
        </div>
        <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
            <!-- Search -->
            <div class="navbar-nav align-items-center">
                <div class="nav-item navbar-search-wrapper mb-0">
                    <div class="navbar-nav align-items-center">
                        <span class="">
                            {{-- <img src="{{ asset('img/logoaka.png') }}" alt="logo akn" width="30"> --}}
                            <i class="bx bx-sm bx-buildings"></i>
                            <span class="d-none d-sm-inline-block">
                                <b>SISTEM INFORMASI MANAGEMENT MOU</b>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
            <!-- /Search -->
            <ul class="navbar-nav flex-row align-items-center ms-auto">

                <li class="nav-item me-2 me-xl-0">
                    <a class="nav-link style-switcher-toggle hide-arrow" href="javascript:void(0);">
                        <i class="bx bx-sm bx-moon"></i>
                    </a>
                </li>


                <li class="nav-item">
                    <span class="badge bg-primary">{{ ucfirst(session('nama_lengkap')) }} |
                        {{ session('role') }}</span>
                </li>
                <!-- User -->
                <li class="nav-item navbar-dropdown dropdown-user dropdown">
                    <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                        <div class="avatar avatar-online">
                            <img src="{{ asset('assets/img/avatars/profile_man.png') }}" alt class="rounded-circle">

                        </div>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                            <a class="dropdown-item" href="#">
                                <div class="d-flex">
                                    <div class="flex-shrink-0 me-3">
                                        <div class="avatar avatar-online">
                                            @if (trim(session('jenis_kelamin')) == 'L')
                                                <img src="{{ asset('assets/img/avatars/profile_man.png') }}" alt
                                                    class="rounded-circle">
                                            @else
                                                <img src="{{ asset('assets/img/avatars/profile_woman.png') }}" alt
                                                    class="rounded-circle">
                                            @endif
                                        </div>
                                    </div>
                                    <div class="flex-grow-1">
                                        <span class="fw-semibold d-block lh-1">{{ session('nama') }}</span>
                                        <small>{{ session('role') }}</small>
                                    </div>
                                </div>
                            </a>
                        </li>
                        <li>
                            <div class="dropdown-divider"></div>
                        </li>
                        <li>
                            {{-- <a class="dropdown-item" href="{{ url('profile', session('id')) }}">
                                <i class="bx bx-user me-2"></i>
                                <span class="align-middle">My Profile</span>
                            </a> --}}

                            <a class="dropdown-item" href="#" onclick="myProfile(this)"
                                data_id="{{ session('id') }}">
                                <i class="bx bx-user me-2"></i>
                                <span class="align-middle">My Profile</span>
                            </a>
                            <input type="hidden" name="id_user_login" id="id_user_login" value="{{ session('id') }}">
                        </li>

                        <li>
                            <div class="dropdown-divider"></div>
                        </li>

                        <li>
                            <a class="dropdown-item" href="{{ url('logout') }}">
                                <i class="bx bx-power-off me-2"></i>
                                <span class="align-middle">Log Out</span>
                            </a>
                        </li>
                    </ul>
                </li>
                <!--/ User -->
            </ul>
        </div>
        <!-- Search Small Screens -->
        <div class="navbar-search-wrapper search-input-wrapper  d-none">
            <input type="text" class="form-control search-input container-fluid border-0" placeholder="Search..."
                aria-label="Search...">
            <i class="bx bx-x bx-sm search-toggler cursor-pointer"></i>
        </div>
    </div>
</nav>
