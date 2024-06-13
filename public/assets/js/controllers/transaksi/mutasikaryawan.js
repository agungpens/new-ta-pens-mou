let Mutasi = {
    module: () => {
        return "master/karyawan";
    },

    moduleApi: () => {
        return `api/${Karyawan.module()}`;
    },

    add: () => {
        window.location.href = url.base_url(Karyawan.module()) + "add";
    },

    ubah: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = url.base_url(Karyawan.module()) + "ubah?id=" + data_id;
    },

    back: () => {
        window.location.href = url.base_url(Karyawan.module()) + "index";
    },
}

$(function(){
    
})