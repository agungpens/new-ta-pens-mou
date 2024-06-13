let LogUser = {
    module: () => {
        return "log-user";
    },
    moduleApi: () => {
        return `api/${LogUser.module()}`;
    },

    detail: (elm) => {
        let data_id = $(elm).attr("data_id");
        window.location.href = LogUser.module() + "/detail?id=" + data_id;
    },
    back: () => {
        window.location.href = url.base_url(LogUser.module()) + "/";
    },

    getData: async () => {
        let tableData = $('table#table-data');
        if (tableData.length > 0) {
            tableData.DataTable({
                "processing": true,
                "serverSide": true,
                "ordering": true,
                "autoWidth": false,
                "order": [
                    [0, 'desc']
                ],
                "aLengthMenu": [
                    [25, 50, 100],
                    [25, 50, 100]
                ],
                "ajax": {
                    "url": url.base_url(LogUser.moduleApi()) + `getData`,
                    "type": "POST",
                    // "headers": {
                    //     'X-CSRF-TOKEN': `'${tokenApi}'`
                    // }
                },
                "deferRender": true,
                "createdRow": function (row, data, dataIndex) {
                    // console.log('row', $(row));
                },
                "columnDefs": [
                    {
                        "targets": 3,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
                        }
                    },
                    {
                        "targets": 2,
                        "orderable": true,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            // $(td).addClass('td-padd');
                        }
                    },
                    {
                        "targets": 1,
                        "orderable": false,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            $(td).addClass('td-padd');
                            $(td).addClass('text-center');
                        }
                    },
                    {
                        "targets": 0,
                        "createdCell": function (td, cellData, rowData, row, col) {
                            // $(td).addClass('td-padd');
                            // $(td).addClass('text-center');
                        }
                    },
                ],
                "columns": [
                    {
                        "data": "id",
                        render: function (data, type, row, meta) {
                            return meta.row + meta.settings._iDisplayStart + 1;
                        }
                    },
                    {
                        "data": "id",
                        "render": (data, type, row, meta) => {
                            return `
                            <button class="btn btn-warning"  data_id="${data}" onclick="LogUser.detail(this)">
                                <i class="fa fa-eye"></i>
                            </button>
                            `;
                        }
                    },
                    {
                        "data": "nama_username",
                        // "render": (data, type, row, meta) => {
                        //     return `
                        //     ${row.data_user.nama}
                        //     `;
                        // }
                    },
                    {
                        "data": "ip",
                    },
                    {
                        "data": "action",
                        "render": function (data, type, row, meta) {
                            // Mengambil kata depan dari teks
                            const firstWord = data.trim().split(" ")[0];

                            // Mengecek apakah kata depannya adalah "DELETE"
                            if (firstWord === "DELETE") {
                                return '<span class="text-danger">' + data + '</span>';
                            }
                            else if (firstWord === "TAMBAH") {
                                return '<span class="text-success">' + data + '</span>';
                            }
                            else if (firstWord === "UPDATE") {
                                return '<span class="text-info">' + data + '</span>';
                            }
                            else {
                                return data;
                            }
                        }
                    },

                    {
                        "data": "created_at",
                        "render": (data, type, row, meta) => {
                            let date = new Date(data);
                            const options = {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false,
                                timeZone: "UTC"
                            };

                            return date.toLocaleString("id-ID", options);

                        }
                    }
                ]
            });
        }
    },


}


$(function () {
    LogUser.getData();
});
