@include('template.header')

<body>
    <div class="layout-wrapper layout-content-navbar">
        <div class="loader"></div>
        <div class="layout-container">
            <div class="toast-content"></div>
            @include('template.sidebar')
            <div class="layout-page">
                @include('template.navbar')
                <div class="content-wrapper">
                    <div class="container-fluid flex-grow-1 container-p-y">
                        @include('template.breadcumb')
                        {!! isset($view_file) ? $view_file : '' !!}
                    </div>
                    <div class="content-backdrop fade"></div>
                    @include('template.footer')
                </div>
            </div>

        </div>
    </div>

    <div id="template-customizer"></div>
    <!-- / Layout wrapper -->
    @include('template.scripts')
    @yield('scripts')
    @if (isset($js))
        <script src="{{ asset($js) }}"></script>
    @endif
</body>

</html>
