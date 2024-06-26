<!DOCTYPE html>
<html>

<head>
    <title>simoaaka.pjjaka.com</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f4f4f4;
            color: #333;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            background-color: #fff;
        }

        thead {
            background-color: #4CAF50;
            color: white;
        }

        th,
        td {
            padding: 12px;
            border: 1px solid #ddd;
            text-align: left;
        }

        th {
            font-weight: bold;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }

        tr:hover {
            background-color: #ddd;
        }
    </style>
</head>

<body>
    <h1>Daftar Nomor moa</h1>
    <table>
        <thead>
            <tr>
                <th>NO</th>
                <th>Nomor moa</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($data['message']['nomor_moa'] as $item)
            <tr>
                <td>{{ $loop->iteration }}</td>
                <td>{{ $item }}</td>
                <td>TIDAK AKTIF</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
