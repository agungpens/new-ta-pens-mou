<?php

use App\models\master\MasterDepartemen;
use App\models\mysql2\Karyawan;
use App\models\permintaan_personel\Lamaran;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

function digit_count($length, $value)
{
    while (strlen($value) < $length)
        $value = '0' . $value;
    return $value;
}

function generateNoDocument()
{
    $no = 'DOC' . date('y') . strtoupper(date('M'));
    $data = DB::table('document')->where('no_document', 'LIKE', '%' . $no . '%')->orderBy('no_document', 'desc')->get()->toArray();


    $seq = 1;
    if (!empty($data)) {
        $data = current($data);
        $seq = str_replace($no, '', $data->no_document);
        $seq = intval($seq) + 1;
    }

    $seq = digit_count(4, $seq);
    $no .= $seq;
    return $no;
}

function generateNoCard()
{
    $no = 'CARD-' . date('y') . strtoupper(date('M'));
    $data = DB::table('card_hospital')->where('no_card', 'LIKE', '%' . $no . '%')->orderBy('no_card', 'desc')->get()->toArray();

    $seq = 1;
    if (!empty($data)) {
        $data = current($data);
        $seq = str_replace($no, '', $data->no_card);
        $seq = intval($seq) + 1;
    }

    $seq = digit_count(4, $seq);
    $no .= $seq;
    return $no;
}

function generateDocTransSP()
{
    $no = 'SP' . date('y') . strtoupper(date('M'));
    $data = DB::table('document')->where('no_document', 'LIKE', '%' . $no . '%')->orderBy('no_document', 'desc')->get()->toArray();

    $seq = 1;
    if (!empty($data)) {
        $data = current($data);
        $seq = str_replace($no, '', $data->no_document);
        $seq = intval($seq) + 1;
    }

    $seq = digit_count(4, $seq);
    $no .= $seq;
    return $no;
}

function generateDocTrans($table = "")
{
    // $no = 'DOC-' . date('y') . strtoupper(date('M'));
    // $data = DB::table($table)->where('doc_trans', 'LIKE', '%'.$no.'%')->orderBy('doc_trans', 'desc')->get()->toArray();
    $no = 'DOC' . date('y') . strtoupper(date('M'));
    $data = DB::table('document')->where('no_document', 'LIKE', '%' . $no . '%')->orderBy('no_document', 'desc')->get()->toArray();

    // $no = 'DOC' . date('y') . strtoupper(date('M'));
    // $data = DB::table('document_transaction')->where('doc_trans', 'LIKE', '%' . $no . '%')->orderBy('doc_trans', 'desc')->get()->toArray();

    $seq = 1;
    if (!empty($data)) {
        $data = current($data);
        $seq = str_replace($no, '', $data->no_document);
        $seq = intval($seq) + 1;
    }

    $seq = digit_count(4, $seq);
    $no .= $seq;
    return $no;
}

function generateLogTrans()
{
    $no = 'PE' . date('Y') . strtoupper(date('m')) . date('d');
    $data = DB::table("log_perubahan_profile")->where('doc_trans', 'LIKE', '%' . $no . '%')->orderBy('doc_trans', 'desc')->get()->toArray();

    $seq = 1;
    if (!empty($data)) {
        $data = current($data);
        $seq = str_replace($no, '', $data->doc_trans);
        $seq = intval($seq) + 1;
    }

    $seq = digit_count(6, $seq);
    $no .= $seq;
    return $no;
}

function generateDocTransReimbursementKesehatan($table = "")
{
    $no = 'RK' . date('y') . strtoupper(date('M'));
    $data = DB::table($table)->where('doc_trans', 'LIKE', '%' . $no . '%')->orderBy('doc_trans', 'desc')->get()->toArray();

    $seq = 1;
    if (!empty($data)) {
        $data = current($data);
        $seq = str_replace($no, '', $data->doc_trans);
        $seq = intval($seq) + 1;
    }

    $seq = digit_count(5, $seq);
    $no .= $seq;
    return $no;
}

function generateDocTransReimbursementBbm($table = "")
{
    $no = 'RBBM' . date('y') . strtoupper(date('M'));
    $data = DB::table($table)->where('doc_trans', 'LIKE', '%' . $no . '%')->orderBy('doc_trans', 'desc')->get()->toArray();

    $seq = 1;
    if (!empty($data)) {
        $data = current($data);
        $seq = str_replace($no, '', $data->doc_trans);
        $seq = intval($seq) + 1;
    }

    $seq = digit_count(5, $seq);
    $no .= $seq;
    return $no;
}

function generateDocTransCuti($table = "")
{
    $no = 'CT' . date('y') . strtoupper(date('M'));
    $data = DB::table($table)->where('kode', 'LIKE', '%' . $no . '%')->orderBy('kode', 'desc')->get()->toArray();

    $seq = 1;
    if (!empty($data)) {
        $data = current($data);
        $seq = str_replace($no, '', $data->kode);
        $seq = intval($seq) + 1;
    }

    $seq = digit_count(5, $seq);
    $no .= $seq;
    return $no;
}

function generateDocTransIjin($table = "")
{
    $no = 'IJ' . date('Ym');
    $data = DB::table($table)->where('doc_trans', 'LIKE', '%' . $no . '%')->orderBy('doc_trans', 'desc')->get()->toArray();

    $seq = 1;
    if (!empty($data)) {
        $data = current($data);
        $seq = str_replace($no, '', $data->doc_trans);
        $seq = intval($seq) + 1;
    }

    $seq = digit_count(5, $seq);
    $no .= $seq;
    return $no;
}

function generateDocTransLembur($table = "")
{
    $no = 'LMBR' . date('Ym');
    $data = DB::table($table)->where('doc_trans', 'LIKE', '%' . $no . '%')->orderBy('doc_trans', 'desc')->get()->toArray();

    $seq = 1;
    if (!empty($data)) {
        $data = current($data);
        $seq = str_replace($no, '', $data->doc_trans);
        $seq = intval($seq) + 1;
    }

    $seq = digit_count(5, $seq);
    $no .= $seq;
    return $no;
}


function generateDocPeriodeGaji($table = "")
{
    $no = 'PER' . strtoupper(date('m')) . date('Ym');
    $data = DB::table($table)->where('kode_periode_gaji', 'LIKE', '%' . $no . '%')->orderBy('kode_periode_gaji', 'desc')->get()->toArray();

    $seq = 1;
    if (!empty($data)) {
        $data = current($data);
        $seq = str_replace($no, '', $data->kode_periode_gaji);
        $seq = intval($seq) + 1;
    }

    $seq = digit_count(4, $seq);
    $no .= $seq;
    return $no;
}




function generateDocPermintaanPersonel($table = "")
{
    $no = 'PERP' . date('y') . strtoupper(date('M'));
    $data = DB::table($table)->where('permintaan_no', 'LIKE', '%' . $no . '%')->orderBy('permintaan_no', 'desc')->get()->toArray();

    $seq = 1;
    if (!empty($data)) {
        $data = current($data);
        $seq = str_replace($no, '', $data->permintaan_no);
        $seq = intval($seq) + 1;
    }

    $seq = digit_count(4, $seq);
    $no .= $seq;
    return $no;
}

function getIpAddress()
{
    $ipAddress = '';
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        // to get shared ISP IP address
        $ipAddress = $_SERVER['HTTP_CLIENT_IP'];
    } else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // check for IPs passing through proxy servers
        // check if multiple IP addresses are set and take the first one
        $ipAddressList = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        foreach ($ipAddressList as $ip) {
            if (!empty($ip)) {
                // if you prefer, you can check for valid IP address here
                $ipAddress = $ip;
                break;
            }
        }
    } else if (!empty($_SERVER['HTTP_X_FORWARDED'])) {
        $ipAddress = $_SERVER['HTTP_X_FORWARDED'];
    } else if (!empty($_SERVER['HTTP_X_CLUSTER_CLIENT_IP'])) {
        $ipAddress = $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];
    } else if (!empty($_SERVER['HTTP_FORWARDED_FOR'])) {
        $ipAddress = $_SERVER['HTTP_FORWARDED_FOR'];
    } else if (!empty($_SERVER['HTTP_FORWARDED'])) {
        $ipAddress = $_SERVER['HTTP_FORWARDED'];
    } else if (!empty($_SERVER['REMOTE_ADDR'])) {
        $ipAddress = $_SERVER['REMOTE_ADDR'];
    }
    return $ipAddress;
}






function _replacementNomor($nohp)
{
    $nohp = str_replace('-', '', $nohp);
    $nohp = str_replace(' ', '', $nohp);

    if (!preg_match("/[^+0-9]/", trim($nohp))) {
        // cek apakah no hp karakter ke 1 dan 2 adalah angka 62
        if (substr(trim($nohp), 0, 2) == "62") {
            $nohp    = trim($nohp);
        }
        // cek apakah no hp karakter ke 1 adalah angka 0
        else if (substr(trim($nohp), 0, 1) == "0") {
            $nohp    = "62" . substr(trim($nohp), 1);
        }
    }


    return $nohp;
}

function sendBlastWARequestApproval($params)
{
    if (env('APP_ENV') == 'local') {
        $result['is_valid'] = true;
        $result['message'] = 'No Send';
        return response()->json($result);
    }

    // return $params;

    // Contoh
    // $params = [
    //     'no_wa' => '6285856361781',
    //     'menu' => 'Reimbursement BBM',
    //     'nama_karyawan' => 'Ulum',
    //     'tanggal' => '11-04-2023'
    // ];
    // sendBlastWARequestApproval($params);

    $no_wa          = $params['no_wa'];
    $menu           = $params['menu'];
    $nama_karyawan  = $params['nama_karyawan'];
    $tanggal        = $params['tanggal'];

    $result['is_valid'] = true;
    try {
        $response = Http::post('https://service-chat.qontak.com/api/open/v1/oauth/token', [
            "username" => "it.programmer2@motasaindonesia.co.id",
            "password" => "Motasa@123!",
            "grant_type" => "password",
            "client_id" => "RRrn6uIxalR_QaHFlcKOqbjHMG63elEdPTair9B9YdY",
            "client_secret" => "Sa8IGIh_HpVK1ZLAF0iFf7jU760osaUNV659pBIZR00"
        ]);

        $token = $response['access_token'];

        $sendWA = Http::withToken($token)->post('https://service-chat.qontak.com/api/open/v1/broadcasts/whatsapp/direct', [
            "to_name" => "Request Approval",
            "to_number" => $no_wa,
            "message_template_id" => "7c8de24b-bc38-4dc7-b0dd-1e1ae693b653",
            "channel_integration_id" => "f9d97e18-48f9-4e74-8c2f-08f3ae5054c8",
            "language" =>  ["code" => "id"],
            "parameters" => [
                "body" => [
                    [
                        "key" => "1",
                        "value" => "menu",
                        "value_text" => $menu
                    ],
                    [
                        "key" => "2",
                        "value" => "nama_karyawan",
                        "value_text" => $nama_karyawan
                    ],
                    [
                        "key" => "3",
                        "value" => "tanggal",
                        "value_text" => $tanggal
                    ],
                ]
            ]
        ]);

        $result['message'] = $sendWA['data'];
    } catch (\Throwable $th) {
        //throw $th;
        $result['is_valid'] = false;
        $result['message'] = $th->getMessage();
    }

    // Log Notifikasi
    $statusNotifikasi   = $result['is_valid'] == true ? 'success' : 'fail';
    $requestNotifikasi  = $params;
    $responseNotifikasi = $result['message'];
    logNotifikasi(json_encode($requestNotifikasi), json_encode($responseNotifikasi), $statusNotifikasi);

    return response()->json($result);
}

function sendBlastWAResponseApproval($params)
{
    if (env('APP_ENV') == 'local') {
        $result['is_valid'] = true;
        $result['message'] = 'No Send';
        return response()->json($result);
    }

    // return $params;

    // Contoh
    // $params = [
    //     'no_wa' => '6285856361781',
    //     'menu' => 'Reimbursement Operasional Kendaraan',
    //     'tanggal' => '11-04-2023',
    //     'status' => 'DITERIMA',
    // 	   'catatan' => 'Catatan'
    // ];
    // sendBlastWAResponseApproval($params);

    // Permohonan Anda terkait {{1}} pada tanggal {{2}} telah selesai diproses oleh {{3}} dengan status {{4}}.
    // Catatan: {{5}}
    // Terima Kasih.

    $no_wa          = $params['no_wa'];
    $menu           = $params['menu'];
    $tanggal        = $params['tanggal'];
    $approval       = $params['approval'];
    $status         = $params['status'];
    $catatan        = $params['catatan'];

    $result['is_valid'] = true;
    try {
        $response = Http::post('https://service-chat.qontak.com/api/open/v1/oauth/token', [
            "username" => "it.programmer2@motasaindonesia.co.id",
            "password" => "Motasa@123!",
            "grant_type" => "password",
            "client_id" => "RRrn6uIxalR_QaHFlcKOqbjHMG63elEdPTair9B9YdY",
            "client_secret" => "Sa8IGIh_HpVK1ZLAF0iFf7jU760osaUNV659pBIZR00"
        ]);

        $token = $response['access_token'];

        $sendWA = Http::withToken($token)->post('https://service-chat.qontak.com/api/open/v1/broadcasts/whatsapp/direct', [
            "to_name" => "Response Approval",
            "to_number" => $no_wa,
            "message_template_id" => "b41d9a7e-a8ad-4544-a69c-7043097f32db",
            "channel_integration_id" => "f9d97e18-48f9-4e74-8c2f-08f3ae5054c8",
            "language" =>  ["code" => "id"],
            "parameters" => [
                "body" => [
                    [
                        "key" => "1",
                        "value" => "menu",
                        "value_text" => $menu
                    ],
                    [
                        "key" => "2",
                        "value" => "tanggal",
                        "value_text" => $tanggal
                    ],
                    [
                        "key" => "3",
                        "value" => "approval",
                        "value_text" => $approval
                    ],
                    [
                        "key" => "4",
                        "value" => "status",
                        "value_text" => $status
                    ],
                    [
                        "key" => "5",
                        "value" => "catatan",
                        "value_text" => $catatan
                    ],
                ]
            ]
        ]);

        $result['message'] = $sendWA['data'];
    } catch (\Throwable $th) {
        //throw $th;
        $result['is_valid'] = false;
        $result['message'] = $th->getMessage();
    }

    // Log Notifikasi
    $statusNotifikasi   = $result['is_valid'] == true ? 'success' : 'fail';
    $requestNotifikasi  = $params;
    $responseNotifikasi = $result['message'];
    logNotifikasi(json_encode($requestNotifikasi), json_encode($responseNotifikasi), $statusNotifikasi);

    return response()->json($result);
}

function sendBlastWAHiringManager($params)
{
    if (env('APP_ENV') == 'local') {
        $result['is_valid'] = true;
        $result['message'] = 'No Send';
        return response()->json($result);
    }

    // return $params;

    // Contoh
    // $params = [
    //     'no_wa' => '6285856361781',
    //     'lowongan' => 'IT Spesialis',
    //     'nama_applicant' => 'Ulum',
    //     'step' => 'Shorlist'
    // ];
    // sendBlastWAHiringManager($params);

    $no_wa          = $params['no_wa'];
    $lowongan       = $params['lowongan'];
    $nama_applicant = $params['nama_applicant'];
    $step           = $params['step'];

    $result['is_valid'] = true;
    try {
        $response = Http::post('https://service-chat.qontak.com/api/open/v1/oauth/token', [
            "username" => "it.programmer2@motasaindonesia.co.id",
            "password" => "Motasa@123!",
            "grant_type" => "password",
            "client_id" => "RRrn6uIxalR_QaHFlcKOqbjHMG63elEdPTair9B9YdY",
            "client_secret" => "Sa8IGIh_HpVK1ZLAF0iFf7jU760osaUNV659pBIZR00"
        ]);

        $token = $response['access_token'];

        $sendWA = Http::withToken($token)->post('https://service-chat.qontak.com/api/open/v1/broadcasts/whatsapp/direct', [
            "to_name" => "Hiring Manager",
            "to_number" => $no_wa,
            "message_template_id" => "7113788e-9f03-4b45-bb18-57531c83e7de",
            "channel_integration_id" => "f9d97e18-48f9-4e74-8c2f-08f3ae5054c8",
            "language" =>  ["code" => "id"],
            "parameters" => [
                "body" => [
                    [
                        "key" => "1",
                        "value" => "lowongan",
                        "value_text" => $lowongan
                    ],
                    [
                        "key" => "2",
                        "value" => "nama_applicant",
                        "value_text" => $nama_applicant
                    ],
                    [
                        "key" => "3",
                        "value" => "step",
                        "value_text" => $step
                    ],
                ]
            ]
        ]);

        $result['message'] = $sendWA['data'];
    } catch (\Throwable $th) {
        //throw $th;
        $result['is_valid'] = false;
        $result['message'] = $th->getMessage();
    }

    // Log Notifikasi
    $statusNotifikasi   = $result['is_valid'] == true ? 'success' : 'fail';
    $requestNotifikasi  = $params;
    $responseNotifikasi = $result['message'];
    logNotifikasi(json_encode($requestNotifikasi), json_encode($responseNotifikasi), $statusNotifikasi);

    return response()->json($result);
}

function sendBlastWA($params)
{
    if (env('APP_ENV') == 'local') {
        $result['is_valid'] = true;
        $result['message'] = 'No Send';
        return response()->json($result);
    }

    // return $params;

    // Contoh
    // $params = [
    //     'no_wa' => '6285856361781',
    //     'applicant_name' => 'Ulum',
    // ];
    // sendBlastWA($params);

    $applicant_name = $params['applicant_name'];
    $no_wa = $params['no_wa'];

    $result['is_valid'] = true;
    try {
        $response = Http::post('https://service-chat.qontak.com/api/open/v1/oauth/token', [
            "username" => "it.programmer2@motasaindonesia.co.id",
            "password" => "Motasa@123!",
            "grant_type" => "password",
            "client_id" => "RRrn6uIxalR_QaHFlcKOqbjHMG63elEdPTair9B9YdY",
            "client_secret" => "Sa8IGIh_HpVK1ZLAF0iFf7jU760osaUNV659pBIZR00"
        ]);

        $token = $response['access_token'];

        $sendWA = Http::withToken($token)->post('https://service-chat.qontak.com/api/open/v1/broadcasts/whatsapp/direct', [
            "to_name" => $applicant_name,
            "to_number" => $no_wa,
            "message_template_id" => "aad9815a-1db0-4c66-9c12-1d18072c41e7",
            "channel_integration_id" => "f9d97e18-48f9-4e74-8c2f-08f3ae5054c8",
            "language" =>  ["code" => "id"],
            "parameters" => [
                // "header" => [
                //     "format" => "IMAGE",
                //     "params" =>[
                //         [
                //             "key" => "url",
                //             "value" => "https://qontak-hub-development.s3.amazonaws.com/uploads/direct/images/482f6c92-7e8b-40cd-8406-bbd655b61bbf/324015099_603420567920644_8487379993436135255_n.png",
                //         ]
                //     ]
                // ],
                "body" => [
                    [
                        "key" => "1",
                        "value" => "applicant_name",
                        "value_text" => $applicant_name
                    ],
                ]
            ]
        ]);

        $result['message'] = $sendWA['data'];
    } catch (\Throwable $th) {
        //throw $th;
        $result['is_valid'] = false;
        $result['message'] = $th->getMessage();
    }

    // Log Notifikasi
    $statusNotifikasi   = $result['is_valid'] == true ? 'success' : 'fail';
    $requestNotifikasi  = $params;
    $responseNotifikasi = $result['message'];
    logNotifikasi(json_encode($requestNotifikasi), json_encode($responseNotifikasi), $statusNotifikasi);

    return response()->json($result);
}

function notifikasiWhatsappByQontak($params)
{
    if (env('APP_ENV') == 'local') {
        $result['is_valid'] = true;
        $result['message'] = 'No Send';
        return response()->json($result);
    }

    // return $params;

    // Contoh
    // $params = [
    //     'no_wa' => '6285856361781',
    //     'subject' => '....',
    //     'message' => '....',
    // ];
    // notifikasiWhatsappByQontak($params);

    $no_wa   = $params['no_wa'];
    $appname = '*SIMI*';
    $subject = $params['subject'];
    $message = $params['message'];

    $result['is_valid'] = true;
    try {
        $response = Http::post('https://service-chat.qontak.com/api/open/v1/oauth/token', [
            "username" => "it.programmer2@motasaindonesia.co.id",
            "password" => "Motasa@123!",
            "grant_type" => "password",
            "client_id" => "RRrn6uIxalR_QaHFlcKOqbjHMG63elEdPTair9B9YdY",
            "client_secret" => "Sa8IGIh_HpVK1ZLAF0iFf7jU760osaUNV659pBIZR00"
        ]);

        $token = $response['access_token'];

        $sendWA = Http::withToken($token)->post('https://service-chat.qontak.com/api/open/v1/broadcasts/whatsapp/direct', [
            "to_name" => $no_wa,
            "to_number" => $no_wa,
            "message_template_id" => "7c8de24b-bc38-4dc7-b0dd-1e1ae693b653",
            "channel_integration_id" => "f9d97e18-48f9-4e74-8c2f-08f3ae5054c8",
            "language" =>  ["code" => "id"],
            "parameters" => [
                // "header" => [
                //     "format" => "IMAGE",
                //     "params" =>[
                //         [
                //             "key" => "url",
                //             "value" => "https://qontak-hub-development.s3.amazonaws.com/uploads/direct/images/482f6c92-7e8b-40cd-8406-bbd655b61bbf/324015099_603420567920644_8487379993436135255_n.png",
                //         ]
                //     ]
                // ],
                "body" => [
                    [
                        "key" => "1",
                        "value" => "appname",
                        "value_text" => $appname
                    ],
                    [
                        "key" => "2",
                        "value" => "subject",
                        "value_text" => $subject
                    ],
                    [
                        "key" => "3",
                        "value" => "message",
                        "value_text" => $message
                    ],
                ]
            ]
        ]);

        $result['message'] = $sendWA['data'];
    } catch (\Throwable $th) {
        //throw $th;
        $result['is_valid'] = false;
        $result['message'] = $th->getMessage();
    }

    // Log Notifikasi
    $statusNotifikasi   = $result['is_valid'] == true ? 'success' : 'fail';
    $requestNotifikasi  = $params;
    $responseNotifikasi = $result['message'];
    logNotifikasi(json_encode($requestNotifikasi), json_encode($responseNotifikasi), $statusNotifikasi);

    return response()->json($result);
}

function tanggal_indonesia($tanggal, $hari = false)
{
    $bulan = array(
        1 =>   'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
    );

    $pecahkan = explode('-', $tanggal);

    // variabel pecahkan 0 = tahun
    // variabel pecahkan 1 = bulan
    // variabel pecahkan 2 = tanggal

    $hari = $hari ? hari_indonesia($tanggal) . ', ' : '';

    return $hari . $pecahkan[2] . ' ' . $bulan[(int)$pecahkan[1]] . ' ' . $pecahkan[0];
}

function tanggal_jam_indonesia($tanggal, $time = false, $hari = false)
{
    try {

        $tanggal = date('Y-m-d H:i', strtotime($tanggal));

        $bulan = array(
            1 =>   'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'
        );

        $pecahkan = explode('-', $tanggal);
        $jam = explode(' ', $pecahkan[2]);

        // variabel pecahkan 0 = tahun
        // variabel pecahkan 1 = bulan
        // variabel pecahkan 2 = tanggal


        $hari = $hari ? hari_indonesia($tanggal) . ', ' : '';

        $jam_show = $time ? $jam[1] : '';

        return $hari . $jam[0] . ' ' . $bulan[(int)$pecahkan[1]] . ' ' . $pecahkan[0] . ' ' . $jam_show;
    } catch (\Throwable $th) {
        return '-';
    }
}

function jumlah_hari($mulai, $sampai)
{
    try {
        $to = \Carbon\Carbon::createFromFormat('Y-m-d H:s:i', $mulai);
        $from = \Carbon\Carbon::createFromFormat('Y-m-d H:s:i', $sampai);

        return $to->diffInDays($from);
    } catch (\Throwable $th) {
        return '-';
    }
}

function hari_indonesia($tanggal)
{
    $hari = date("D", strtotime($tanggal));

    switch ($hari) {
        case 'Sun':
            $hari_ini = "Minggu";
            break;

        case 'Mon':
            $hari_ini = "Senin";
            break;

        case 'Tue':
            $hari_ini = "Selasa";
            break;

        case 'Wed':
            $hari_ini = "Rabu";
            break;

        case 'Thu':
            $hari_ini = "Kamis";
            break;

        case 'Fri':
            $hari_ini = "Jumat";
            break;

        case 'Sat':
            $hari_ini = "Sabtu";
            break;

        default:
            $hari_ini = "Tidak di ketahui";
            break;
    }

    return $hari_ini;
}

function getHeaderApprovalIdfForHCSERVICE($user_nik)
{
    $hc_sevice_gateway =  [
        '03151500044', // 1 BENY ASTOMI
    ];

    $hc_sevice_kantin =  [
        '07111410284', // 1 Mustikaning Prasetya | APPROVAL 1
        '04239910020', // 2 Ricky Prasetyo
        '05239910072', // 3 Muchamad Jainul
        '07131410295', // 4 Ahmad muzib basori
        '08121410290', // 5 Rini asmaul khotimah
        '10200010014', // 6 Muhamad Zein Allkar
        '02210210067', // 7 Fachruddin Hasyim
        '04121410032', // 8 Lina azyyati farisah
        '05141410298', // 9 saiful mustofa
        '08209910011', // 10 Imam Mahmud Ali Fajar
        '05141410300', // 11 Teguh arimawan
        '03219610040', // 12 Fajar Fanani
        '01210010040', // 13 Fani Indra Wahyu Danianto
        '01219910038', // 14 Dirga Argaloka Adjie Darma
        '06219710045', // 15 Abd rosyid M
        '05141410301', // 16 Achmad irwan,
        '12209810035', // 17 Shofiul Anwar,
        '08121410291', // 18 Laela rezky amaliya,
        '06209810003', // 19 Rizal Zulfin Lutfiansyah,
    ];

    $hc_sevice_security =  [
        '05111410282', // 1 MUHAMMAD TAUFIK | APPROVAL 1
        '08121410286', // 2 SUWAJI
        '07131410294', // 3 MULYADI
        '8169610266', // 4 YUSUF NUGRAHA MUKTI
        '12168010323', // 5 ANDIK
        '07209410006', // 6 AGUNG ARIS WIBOWO
        '07209710016', // 7 RICKY YOGA PRATAMA
        '08209110031', // 8 SAIFUL AFIF JAUHARI
        '09209810043', // 9 DIMAS BAGUS PRAYOGA
        '10209510025', // 10 AVI TEGUH SANTOSO
        '02218110032', // 11 AHMAD NUR YUSUF
        '03219410038', // 12 DELTA DWI KUSUMA ANGGARA
        '04218810005', // 13 DEFFRY ADHI SISWOYO
        '03209010015', // 14 NANO ARIFAN
        '02209610018', // 15 MUHAMMAD BAYU SANTOSO
        '07218210022', // 16 AKHMAD FANANI,
        '10218710006', // 17 DODDY HERMAWAN,
        '10218610005', // 18 AGUS SETYAWAN,
        '03229310008', // 19 RULY NASRULLOH,
        '03228610009', // 20 ASTORI,
        '04239410008', // 21 ERIK APRILIAN NURI YANTO,
        '08121410288', // 22 SISWANTO,
        '8169310255', // 23 MOH. ZAINUL ARIFIN,
        '1178910336', // 24 ARY RIYAWAN,
        '12209510021', // 25 MIFTACHUDDIN AL ARIF,
        '01218910012', // 26 ANDRA TRI YUDHA,
        '03219310037', // 27 DANANG WASKITO,
        '03218610004', // 28 A. ZAINUDDIN,
        '12218910019', // 29 ANTON HARIANTO,
        '01228910007', // 30 MUCHAMAD RITNO,
        '01219610031', // 31 FATCHUR ROZIK,
    ];

    $user = DB::table('karyawan3')->where('NIK', $user_nik)->first();

    if ($user) {
        if (in_array($user->id_departemen, [24])) { // HC-SERVICES
            if (in_array($user_nik, $hc_sevice_gateway)) {
                return '551';
            } else if (in_array($user_nik, $hc_sevice_kantin)) {
                return '554';
            } else if (in_array($user_nik, $hc_sevice_security)) {
                return '556';
            } else {
                return '101';
            }
        }
    }
    return '';
}

