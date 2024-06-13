let Registrasi = {
    select2All: () => {
        // Default
        const select2 = $('.select2');
        if (select2.length) {
            select2.each(function () {
                var $this = $(this);
                $this.wrap('<div class="position-relative"></div>').select2({
                    placeholder: 'Pilih prodi',
                    dropdownParent: $this.parent()
                });
            });
        }
    },
}

$(function () {
    Registrasi.select2All();
});
