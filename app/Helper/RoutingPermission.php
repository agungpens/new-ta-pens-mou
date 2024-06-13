<?php

use App\models\AppVersion;
use App\models\master\DocumentTransaction;
use App\models\master\MasterEmailTemplate;
use App\models\master\RoutingPermission;
use App\models\mysql2\Karyawan;
use App\models\pengguna\User;
use App\models\permintaan_personel\HasilOL;
use App\models\quisioner\MasterPertanyaan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

function getPersmission($menu = "", $nik = "")
{
    $user = session('user_id');
    $group_user = session('akses');

    // DB::enableQueryLog();
    $dataMenu = RoutingPermission::where('ug.nama_group', $group_user)
        ->select([
            'routing_permission.*',
            'am.nama',
            'ug.nama_group'
        ])
        ->join('app_menu as am', 'am.id', '=', 'routing_permission.id_menu')
        ->join('user_group as ug', 'ug.id', '=', 'routing_permission.user_group')
        ->where('am.nama', $menu);
    // if($state != ''){
    //     $dataMenu->where('routing_permission.state', $state);
    // }

    if ($nik != '') {
        $dataMenu->where('routing_permission.to_users', $nik);
    }
    $dataMenu = $dataMenu->first();
    // echo '<pre>';
    // print_r(DB::getQueryLog());die;

    $result = [];
    if (!empty($dataMenu)) {
        return $dataMenu;
    }
    return $result;
}

function getPersmissionCreator($menu, $nik, $group = "", $other_departemen = "")
{
    $headerId = '';
    if ($menu == 'lembur') {
        $headerId = getHeaderApprovalIdfForHCSERVICE($nik);
    }

    $headerId = '';
    if ($menu == 'lembur') {
        $headerId = getHeaderApprovalIdfForHCSERVICE($nik);
    }

    $dataAkses = User::where('users.nik', $nik)
        ->select([
            'users.*',
            'ug.nama_group',
            'kry.id_departemen'
        ])
        ->join('user_group as ug', 'ug.id', 'users.hak_akses')
        ->join('karyawan3 as kry', 'kry.NIK', 'users.nik')
        ->whereNull('users.deleted');

    if ($group != '') {
        $dataAkses->where('ug.nama_group', $group);
    } else {
        $dataAkses->whereIn('ug.nama_group', ['Manajer', 'General Manajer', 'Karyawan', 'Direksi']);
    }
    $dataAkses = $dataAkses->first();

    $group_user = !empty($dataAkses) ? $dataAkses->nama_group : '';
    $departemen = !empty($dataAkses) ? $dataAkses->id_departemen : '';

    DB::enableQueryLog();
    $dataMenu = RoutingPermission::where('ug.nama_group', $group_user)
        ->select([
            'routing_permission.*',
            'am.nama',
            'ug.nama_group',
            'rh.departemen'
        ])
        ->join('app_menu as am', 'am.id', '=', 'routing_permission.id_menu')
        ->join('routing_header as rh', 'rh.id', 'routing_permission.routing_header')
        ->join('user_group as ug', 'ug.id', '=', 'rh.roles')
        ->where('am.nama', strtolower($menu));

    if ($other_departemen) {
        $dataMenu->where('rh.departemen', $other_departemen);
    } else {
        $dataMenu->where('rh.departemen', $departemen);
    }

    $dataMenu->whereNull('routing_permission.deleted')
        ->whereNull('rh.deleted_at');

    if ($headerId) {
        $dataMenu->where('rh.id', $headerId);
    }

    if ($headerId) {
        $dataMenu->where('rh.id', $headerId);
    }

    $dataMenu = $dataMenu->first();
    // echo '<pre>';
    // print_r(DB::getQueryLog());die;


    $result = [];
    if (!empty($dataMenu)) {
        return $dataMenu;
    }
    return $result;
}

function getPersmissionApproveCreator($menu, $nik, $group, $departemen)
{
    DB::enableQueryLog();
    $dataMenu = RoutingPermission::where('ug.nama_group', $group)
        ->select([
            'routing_permission.*',
            'am.nama',
            'ug.nama_group',
            'rh.departemen'
        ])
        ->join('app_menu as am', 'am.id', '=', 'routing_permission.id_menu')
        ->join('routing_header as rh', 'rh.id', 'routing_permission.routing_header')
        ->join('user_group as ug', 'ug.id', '=', 'rh.roles')
        ->where('am.nama', strtolower($menu))
        ->where('rh.departemen', $departemen)
        ->where('routing_permission.to_users', $nik);

    $dataMenu->whereNull('routing_permission.deleted')
        ->whereNull('rh.deleted_at');

    $dataMenu = $dataMenu->first();
    // echo '<pre>';
    // print_r(DB::getQueryLog());die;

    $result = [];
    if (!empty($dataMenu)) {
        return $dataMenu;
    }
    return $result;
}

function getPersmissionNextApproveCreator($menu, $group, $state, $departemen)
{
    DB::enableQueryLog();
    $dataMenu = RoutingPermission::where('ug.nama_group', $group)
        ->select([
            'routing_permission.*',
            'am.nama',
            'ug.nama_group',
            'rh.departemen'
        ])
        ->join('app_menu as am', 'am.id', '=', 'routing_permission.id_menu')
        ->join('routing_header as rh', 'rh.id', 'routing_permission.routing_header')
        ->join('user_group as ug', 'ug.id', '=', 'rh.roles')
        ->where('am.nama', strtolower($menu))
        ->where('rh.departemen', $departemen)
        ->where('routing_permission.prev_state', $state);

    $dataMenu->whereNull('routing_permission.deleted')
        ->whereNull('rh.deleted_at');

    $dataMenu = $dataMenu->first();
    // echo '<pre>';
    // print_r(DB::getQueryLog());die;

    $result = [];
    if (!empty($dataMenu)) {
        return $dataMenu;
    }
    return $result;
}

function getPersmissionAcc($menu = "", $nik = "", $akses = "", $departemen = "", $nik_requestor="")
{
    DB::enableQueryLog();
    $headerId = '';
    if ($menu == 'lembur' && $nik_requestor != "") {
        $headerId = getHeaderApprovalIdfForHCSERVICE($nik_requestor);
    }

    $dataMenu = RoutingPermission::select([
        'routing_permission.*',
        'am.nama',
        'ug.nama_group',
        'rh.departemen'
    ])
        ->join('app_menu as am', 'am.id', '=', 'routing_permission.id_menu')
        ->join('routing_header as rh', 'rh.id', 'routing_permission.routing_header')
        ->join('user_group as ug', 'ug.id', '=', 'routing_permission.user_group')
        ->where('am.nama', $menu)
        ->whereNull('rh.deleted_at')
        ->whereNull('routing_permission.deleted');
    $dataMenu->where('routing_permission.to_users', $nik);

    if  ($departemen != "")  {
        $dataMenu->where('rh.departemen', $departemen);
    }

    if ($headerId) {
        $dataMenu->where('rh.id', $headerId);
    }


    if ($headerId) {
        $dataMenu->where('rh.id', $headerId);
    }

    $dataMenu = $dataMenu->first();

    // echo '<pre>';
    // print_r(DB::getQueryLog());die;

    $result = [];
    if (!empty($dataMenu)) {
        return $dataMenu;
    }
    return $result;
}

function getPersmissionNext($menu = "", $state = "", $nik = "", $departemen_creator = '', $nik_requestor = "")
{
    DB::enableQueryLog();

    $headerId = '';
    if ($menu == 'lembur' && $nik_requestor != "") {
        $headerId = getHeaderApprovalIdfForHCSERVICE($nik_requestor);
    }

    $dataAkses = RoutingPermission::where('routing_permission.to_users', $nik)
        ->select([
            'rh.*'
        ])
        ->join('app_menu as am', 'am.id', '=', 'routing_permission.id_menu')
        ->join('routing_header as rh', 'rh.id', 'routing_permission.routing_header')
        ->where('am.nama', $menu)
        ->whereNull('rh.deleted_at')
        ->whereNull('routing_permission.deleted');
    $dataAkses = $dataAkses->first();
    $departemen = $dataAkses->departemen;

    if ($departemen_creator != '') {
        $departemen = $departemen_creator;
    }
    // echo '<pre>';
    // print_r(DB::getQueryLog());die;
    // echo '<pre>';
    // print_r($dataAkses);die;

    $dataMenu = RoutingPermission::select([
        'routing_permission.*',
        'am.nama',
        'ug.nama_group'
    ])
        ->join('app_menu as am', 'am.id', '=', 'routing_permission.id_menu')
        ->join('user_group as ug', 'ug.id', '=', 'routing_permission.user_group')
        ->join('routing_header as rh', 'rh.id', 'routing_permission.routing_header')
        ->where('am.nama', $menu)
        ->where('routing_permission.prev_state', $state)
        ->whereNull('routing_permission.deleted')
        ->whereNull('rh.deleted_at');
        
        if ($headerId) {
            $dataMenu->where('rh.id', $headerId);
        }else{
            $dataMenu->where('rh.departemen', $departemen);
        }


    $dataMenu = $dataMenu->first();

    // echo '<pre>';
    // print_r(DB::getQueryLog());die;

    $result = [];
    if (!empty($dataMenu)) {
        return $dataMenu;
    }
    return $result;
}

function getPersmissionAcc2($menu = "", $nik = "", $departemen = '', $akses = "")
{
    DB::enableQueryLog();
    $dataMenu = RoutingPermission::select([
        'routing_permission.*',
        'am.nama',
        'ug.nama_group',
        'rh.departemen'
    ])
        ->join('app_menu as am', 'am.id', '=', 'routing_permission.id_menu')
        ->join('routing_header as rh', 'rh.id', 'routing_permission.routing_header')
        ->join('user_group as ug', 'ug.id', '=', 'rh.roles')
        ->where('am.nama', $menu)
        ->where('rh.departemen', $departemen)
        ->whereNull('rh.deleted_at')
        ->whereNull('routing_permission.deleted');

    if ($akses != '') {
        $dataMenu->where('ug.nama_group', $akses);
    }

    if ($nik != '') {
        $dataMenu->where('routing_permission.to_users', $nik);
    }

    $dataMenu = $dataMenu->first();

    $result = [];
    if (!empty($dataMenu)) {
        return $dataMenu;
    }
    return $result;
}

function getPersmissionNext2($menu = "", $state = "", $departemen = '', $akses = '')
{
    DB::enableQueryLog();

    $dataMenu = RoutingPermission::select([
        'routing_permission.*',
        'am.nama',
        'ug.nama_group',
    ])
        ->join('app_menu as am', 'am.id', '=', 'routing_permission.id_menu')
        ->join('routing_header as rh', 'rh.id', 'routing_permission.routing_header')
        ->join('user_group as ug', 'ug.id', '=', 'rh.roles')
        ->where('am.nama', $menu)
        ->where('routing_permission.prev_state', $state)
        ->where('rh.departemen', $departemen)
        ->where('ug.nama_group', $akses)
        ->whereNull('routing_permission.deleted')
        ->whereNull('rh.deleted_at');


    $dataMenu = $dataMenu->first();

    $result = [];
    if (!empty($dataMenu)) {
        return $dataMenu;
    }
    return $result;
}

function getPersmissionBack2($menu = "", $state = "", $departemen = '', $akses = '')
{
    DB::enableQueryLog();

    $dataMenu = RoutingPermission::select([
        'routing_permission.*',
        'am.nama',
        'ug.nama_group',
    ])
        ->join('app_menu as am', 'am.id', '=', 'routing_permission.id_menu')
        ->join('routing_header as rh', 'rh.id', 'routing_permission.routing_header')
        ->join('user_group as ug', 'ug.id', '=', 'rh.roles')
        ->where('am.nama', $menu)
        ->where('routing_permission.state', $state)
        ->where('rh.departemen', $departemen)
        ->where('ug.nama_group', $akses)
        ->whereNull('routing_permission.deleted')
        ->whereNull('rh.deleted_at');


    $dataMenu = $dataMenu->first();

    $result = [];
    if (!empty($dataMenu)) {
        return $dataMenu;
    }
    return $result;
}

function getListAccApproval($document = '')
{
    $datadb = DocumentTransaction::where('document_transaction.doc_trans', $document)
        ->select([
            'kry.NIK',
            'kry.nama_lengkap',
            'act.created_at as waktu_transaksi',
            'document_transaction.state',
            'document_transaction.remarks'
        ])
        ->join('actor as act', 'act.id', 'document_transaction.actor')
        ->join('users as usr', 'usr.id', 'act.users')
        ->join('karyawan3 as kry', 'kry.NIK', 'usr.nik')
        ->orderBy('document_transaction.id', 'asc')
        ->get()->toArray();
    return $datadb;
}

function getAllRulesRouting($menu = '', $departemen = '31')
{

    $dataMenu = RoutingPermission::select([
        'routing_permission.*',
        'am.nama',
        'ug.nama_group',
        'kry.nama_lengkap'
    ])
        ->join('app_menu as am', 'am.id', '=', 'routing_permission.id_menu')
        ->join('user_group as ug', 'ug.id', '=', 'routing_permission.user_group')
        ->join('routing_header as rh', 'rh.id', 'routing_permission.routing_header')
        ->join('karyawan3 as kry', 'kry.NIK', 'routing_permission.to_users')
        ->where('am.nama', $menu)
        ->where('rh.departemen', $departemen)
        ->orderBy('routing_permission.id', 'asc');
    return $dataMenu->get()->toArray();
}

function getRoutingByNik($menu = '', $nik = '', $departemen = '31')
{
    $dataMenu = RoutingPermission::select([
        'routing_permission.*',
        'am.nama',
        'ug.nama_group',
        'kry.nama_lengkap'
    ])
        ->join('app_menu as am', 'am.id', '=', 'routing_permission.id_menu')
        ->join('user_group as ug', 'ug.id', '=', 'routing_permission.user_group')
        ->join('routing_header as rh', 'rh.id', 'routing_permission.routing_header')
        ->join('karyawan3 as kry', 'kry.NIK', 'routing_permission.to_users')
        ->where('am.nama', $menu)
        ->where('rh.departemen', $departemen)
        ->where('routing_permission.to_users', $nik)
        ->orderBy('routing_permission.id', 'asc');
    return $dataMenu->first();
}

function getNikOwner()
{
    return "00006700001";
}

function getPermissionOwner()
{
    $data = [
        'to_users' => getNikOwner()
    ];
    return $data;
}

function getDataMultipleAcc($nik, $menu, $dept_creator)
{
    $data = DB::table('routing_permission as rp')
        ->join('routing_header as rh', 'rh.id', 'rp.routing_header')
        ->join('app_menu as am', 'am.id', 'rh.menu')
        ->where('am.nama', $menu)
        ->where('rp.to_users', $nik)
        ->where('rh.departemen', $dept_creator)
        ->get()->toArray();

    return $data;
}

function nextRecruitmentStep($lamaran_id)
{
    $nextStep = DB::table('lowongan_detail as ld')
        ->select(['mpr.id', 'mpr.nama', 'ld.pic'])
        ->join('master_proses_rekrutment as mpr', 'ld.master_proses_rekrutment', 'mpr.id')
        ->where('ld.id', '>', function ($query) use ($lamaran_id) {
            $query->select(DB::raw("
                ld2.id from lamaran as l
                inner join lamaran_detail as ld on l.id = ld.master_lamaran
                inner join lowongan_detail as ld2 on l.lowongan = ld2.lowongan_master and ld2.master_proses_rekrutment = ld.proses_rekrutmen
                where l.id=$lamaran_id and ld.is_active =1 and ld2.status = 1
            "));
        })
        ->where('ld.status', 1)
        ->orderBy('ld.id')
        ->limit(1)
        ->first();

    $applicant = DB::table('lamaran as l')
        ->select(['a.*', 'l.id as lamaran_id'])
        ->join('user_applicant as a', 'l.applicant', 'a.id')
        ->where('l.id', $lamaran_id)
        ->first();

    $next_step_rekrutment = $nextStep->id;
    $next_step_rekrutment_nama = $nextStep->nama;


    if ($nextStep->nama == 'Technical Test') {
        // $test = DB::table('technicaltest')->where('master_lamaran',$applicant->lamaran_id)->first();
        $pertanyaan = MasterPertanyaan::whereNull('deleted_at')->get();
        return view('web.lowongan.form.testinvitation', compact('applicant', 'pertanyaan', 'next_step_rekrutment', 'next_step_rekrutment_nama'));
    } else if ($nextStep->nama == 'Interview HC') {
        $email = MasterEmailTemplate::where('step', $next_step_rekrutment)->first();
        return view('web.lowongan.form.interviewinvitation', compact('applicant', 'next_step_rekrutment', 'next_step_rekrutment_nama', 'email'));
    } else if ($nextStep->nama == 'Interview User') {
        $email = MasterEmailTemplate::where('step', $next_step_rekrutment)->first();
        return view('web.lowongan.form.interviewinvitation', compact('applicant', 'next_step_rekrutment', 'next_step_rekrutment_nama', 'email'));
    } else if ($nextStep->nama == 'Psychotest') {
        return view('web.lowongan.form.psikotesinvitation', compact('applicant', 'next_step_rekrutment', 'next_step_rekrutment_nama'));
    } else if ($nextStep->nama == 'Medical Check Up') {
        return view('web.lowongan.form.mcuinvitation', compact('applicant', 'next_step_rekrutment', 'next_step_rekrutment_nama'));
    } else if ($nextStep->nama == 'Offering Letter') {
        return view('web.lowongan.form.olinvitation', compact('applicant', 'next_step_rekrutment', 'next_step_rekrutment_nama'));
    } else if ($nextStep->nama == 'Onboarding') {

        $account['username'] = NIKGenerator($applicant->tanggal_lahir);
        $account['password'] = '123456';
        $app_version = AppVersion::orderByDesc('id')->first();
        $hasil = HasilOL::where('master_lamaran', $lamaran_id)->whereNull('deleted_at')->first();
        if (isset($hasil->attachment)) {
            $hasil->file_path = url('/') . '/public/lowongan/' . $hasil->attachment;
        }
        return view('web.lowongan.form.onboardingjoin', compact('applicant', 'next_step_rekrutment', 'next_step_rekrutment_nama', 'hasil', 'account', 'app_version'));
    } else if ($nextStep->nama == 'Initial Offering Letter') {
        return view('web.lowongan.form.initialofferingletter', compact('applicant', 'next_step_rekrutment', 'next_step_rekrutment_nama'));
    } else if ($nextStep->nama == 'Onboarding Preparation') {
        return view('web.lowongan.form.onboardingpreparation', compact('applicant', 'next_step_rekrutment', 'next_step_rekrutment_nama'));
    } else {
        return 'Step belum disetting';
    }
}

function NIKGenerator($tanggal_lahir)
{
    $tanggal_l = date('d', strtotime($tanggal_lahir));
    $tahun_l = date('y', strtotime($tanggal_lahir));
    $bulan = date('m');
    return $bulan . $tanggal_l . $tahun_l;
}

function randomString($length = 4)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randstring = '';
    for ($i = 0; $i < $length; $i++) {
        $randstring .= $characters[rand(0, strlen($characters))];
    }
    return $randstring;
}

function cekNextStepID($lamaran_id)
{
    $nextStep = DB::table('lowongan_detail as ld')
        ->select(['mpr.id', 'mpr.nama', 'ld.pic'])
        ->join('master_proses_rekrutment as mpr', 'ld.master_proses_rekrutment', 'mpr.id')
        ->where('ld.id', '>', function ($query) use ($lamaran_id) {
            $query->select(DB::raw("
                ld2.id from lamaran as l
                inner join lamaran_detail as ld on l.id = ld.master_lamaran
                inner join lowongan_detail as ld2 on l.lowongan = ld2.lowongan_master and ld2.master_proses_rekrutment = ld.proses_rekrutmen
                where l.id=$lamaran_id and ld.is_active =1 and ld2.status = 1
            "));
        })
        ->where('ld.status', 1)
        ->orderBy('ld.id')
        ->limit(1)
        ->first();

    return $nextStep->id;
}

function cekNextStepData($lamaran_id)
{
    $nextStep = DB::table('lowongan_detail as ld')
        ->select(['mpr.id', 'mpr.nama', 'ld.pic', 'u.nik', 'l.id as lowongan_id', 'l.posisi'])
        ->join('master_proses_rekrutment as mpr', 'ld.master_proses_rekrutment', 'mpr.id')
        ->join('lowongan as l', 'l.id', 'ld.lowongan_master')
        ->join('permintaan_personel as pp', 'pp.permintaan_no', 'l.permintaan_personel')
        ->join('users as u', 'u.id', 'pp.users')
        ->where('ld.id', '>', function ($query) use ($lamaran_id) {
            $query->select(DB::raw("
                ld2.id from lamaran as l
                inner join lamaran_detail as ld on l.id = ld.master_lamaran
                inner join lowongan_detail as ld2 on l.lowongan = ld2.lowongan_master and ld2.master_proses_rekrutment = ld.proses_rekrutmen
                where l.id=$lamaran_id and ld.is_active =1 and ld2.status = 1
            "));
        })
        ->where('ld.status', 1)
        ->orderBy('ld.id')
        ->limit(1)
        ->first();

    return $nextStep;
}

function cekStepData($lamaran_id)
{
    $nextStep = DB::table('lowongan_detail as ld')
        ->select(['mpr.id', 'mpr.nama', 'ld.pic', 'u.nik', 'l.id as lowongan_id', 'l.posisi'])
        ->join('master_proses_rekrutment as mpr', 'ld.master_proses_rekrutment', 'mpr.id')
        ->join('lowongan as l', 'l.id', 'ld.lowongan_master')
        ->join('permintaan_personel as pp', 'pp.permintaan_no', 'l.permintaan_personel')
        ->join('users as u', 'u.id', 'pp.users')
        ->where('ld.id', '=', function ($query) use ($lamaran_id) {
            $query->select(DB::raw("
                ld2.id from lamaran as l
                inner join lamaran_detail as ld on l.id = ld.master_lamaran
                inner join lowongan_detail as ld2 on l.lowongan = ld2.lowongan_master and ld2.master_proses_rekrutment = ld.proses_rekrutmen
                where l.id=$lamaran_id and ld.is_active =1 and ld2.status = 1
            "));
        })
        ->where('ld.status', 1)
        ->orderBy('ld.id')
        ->limit(1)
        ->first();

    return $nextStep;
}

function getApplicantStatus($id)
{
    return DB::table('lamaran as l')
        ->select('ld.status')
        ->join('lamaran_detail as ld', 'l.id', 'ld.master_lamaran')
        ->where('l.id', $id)
        ->where('ld.is_active', 1)
        ->first()->status;
}

function getDepartemen($nik = '')
{
    $dataDept = Karyawan::where('NIK', $nik)->first();
    $result = [];
    if (!empty($dataDept)) {
        $result = $dataDept;
    }
    return $result;
}