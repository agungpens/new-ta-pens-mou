<!-- build:js assets/vendor/js/core.js -->
<script src="{{ asset('assets/vendor/libs/jquery/jquery.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/popper/popper.js') }}"></script>
<script src="{{ asset('assets/vendor/js/bootstrap.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/hammer/hammer.js') }}"></script>

<script src="{{ asset('assets/vendor/libs/typeahead-js/typeahead.js') }}"></script>
<script src="{{ asset('assets/vendor/js/menu.js') }}"></script>
<!-- endbuild -->
<!-- Vendors JS -->
<script src="{{ asset('assets/vendor/libs/apex-charts/apexcharts.js') }}"></script>
<!-- Main JS -->
<script src="{{ asset('assets/js/main.js') }}"></script>
<script src="{{ asset('assets/js/utils/wizard.js') }}"></script>
<script src="{{ asset('assets/js/utils/navigate.js') }}"></script>
<!-- Page JS -->
<script src="{{ asset('assets/js/dashboards-analytics.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/cleavejs/cleave-phone.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/bs-stepper/bs-stepper.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/flatpickr/flatpickr.js') }}"></script>

<script src="{{ asset('assets/vendor/libs/select2/select2.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/datatables/jquery.dataTables.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/datatables-responsive/datatables.responsive.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/datatables-checkboxes-jquery/datatables.checkboxes.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/datatables-buttons/datatables-buttons.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/quill/katex.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/quill/quill.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/chartjs/chartjs.js') }}"></script>
<script src="{{ asset('assets/vendor/libs/simple-mask-money/simple-mask-money.js') }}"></script>
<script src="{{ asset('assets/js/utils/compress.js') }}"></script>
<script src="{{ asset('assets/js/utils/compressbase64.js') }}"></script>
<script src="{{ asset('assets/js/utils/toastnew.js') }}"></script>
<script src="{{ asset('assets/js/xlsx/xlsx.min.js') }}"></script>

<!-- Scripts -->
<script src="{{ asset('assets_ex/js/dblocal/pounchdb.js') }}"></script>
<script src="{{ asset('assets_ex/js/bootbox/bootbox.js') }}"></script>
<script src="{{ asset('assets_ex/js/jqueryhighligt/jqueryhighligt.js') }}"></script>
<script src="{{ asset('assets_ex/js/jquerymatchheight/jquery.matchheight.js') }}"></script>
<script src="{{ asset('assets_ex/js/utils/message.js') }}"></script>
<script src="{{ asset('assets_ex/js/utils/validation.js') }}"></script>
<script src="{{ asset('assets_ex/js/utils/database.js') }}"></script>
{{-- <script src="{{ asset('assets_ex/js/template.js') }}"></script> --}}

<script src="{{ asset('assets_ex/js/utils/url.js') }}"></script>
<script src="{{ asset('assets_ex/js/utils/getuserid.js') }}"></script>


<script src="{{ asset('assets_ex/js/moment/moment.js') }}"></script>
<script src="{{ asset('assets_ex/js/fullcalender/fullcalender.js') }}"></script>

<script>
    function myProfile(elm) {
        let data_id = $(elm).attr("data_id");
        window.location.href = "profile/detail?id=" + data_id;
    }
</script>


<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script src="{{ asset('assets/js/controller/user/user.js') }}"></script>
