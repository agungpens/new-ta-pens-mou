<?php

use App\Helpers\UserSystemInfoHelper;
use App\models\master\Actor;
use App\models\master\DocumentTransaction;
use App\models\master\LogNotifikasi;
use App\models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
function createLog($content ='', $user_id = '', $action = ''){
    try {
        $ipAddress = getIpAddress();
        $user = User::where('id', $user_id)->first();

        DB::table('log_user')->insert([
            'id_users' => $user_id,
            'nama_username'      => $user->nama,
            'ip'       => $ipAddress,
            'content'  => json_encode($content),
            'created_at' => date('Y-m-d H:i:s'),
            'action'   => $action
        ]);

    } catch (\Throwable $th) {
        //throw $th;
    }
}

