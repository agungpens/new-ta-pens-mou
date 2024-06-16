<script>
    let Profile = {
    back: () => {
        window.location.href = `{{ route('home') }}`;
    },
    getPostData: () => {
        let data = {
            'data': {
                'id': $('input#id').val(),
                'nama': $('input#nama').val(),
                'username': $('input#username').val(),
                'password': $('input#password').val(),
                'prodi': $('#prodi').val(),
                'role': $('#role').val(),
                'nama_lengkap': $('#nama_lengkap').val(),
                'jenis_kelamin': $('#jenis_kelamin').val(),
                'no_hp': $('#no_hp').val(),
                'alamat': $('#alamat').val(),
            },

        };
        return data;
    },

    updated: (elm, e) => {
        e.preventDefault();
        let params = Profile.getPostData();
        let form = $(elm).closest('div.row');
        // console.log(params); return;
        if (validation.runWithElement(form)) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                data: params,
                url: `{{ route('profile/submit') }}`,
                // url: "/api/Profile-mou/submit",
                beforeSend: () => {
                    message.loadingProses('Proses Simpan Data...');
                },
                error: function () {
                    message.closeLoading();
                    Toast.error('Informasi', "Gagal");
                },

                success: function (resp) {
                    message.closeLoading();
                    if (resp.is_valid) {
                        Toast.success('Informasi', 'Data Berhasil Diupdate');
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
                    } else {
                        bootbox.dialog({
                            message: resp.message
                        });
                    }
                }
            });
        }
    },

    showPassword: () => {
        var passwordInput = $('#password');

        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            $('#showPasswordBtn i').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
        } else {
            passwordInput.attr('type', 'password');
            $('#showPasswordBtn i').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
        }
    }


}


$(function () {
    Profile.select2All();

    $(document).ready(function () {
        $('#togglePasswordBtn').on('click', function () {
            var passwordField = $('#password');
            var passwordFieldType = passwordField.attr('type');

            if (passwordFieldType === 'password') {
                passwordField.attr('type', 'text');
                $('#eye-icon').removeClass('bi bi-eye-slash').addClass('bi bi-eye');
            } else {
                passwordField.attr('type', 'password');
                $('#eye-icon').removeClass('bi bi-eye').addClass('bi bi-eye-slash');
            }
        });
    });
});

</script>
