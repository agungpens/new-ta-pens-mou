<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;

class DivisiGroup
{
    public static function karyawanShift($nik){
        // $res = DB::table('users as u')
        // ->join('karyawan3 as k', 'k.NIK' ,'u.nik')
        // ->join('master_departemen as md', 'md.id' ,'k.id_departemen')
        // ->join('master_divisi as md2', 'md2.id' ,'md.id_divisi')
        // ->whereIn('md2.id', [3,12])
        // ->where('u.hak_akses', 7)
        // ->where('u.NIK', $nik);

        $res = DB::table('ts_karyawan as tk')
        ->join('karyawan3 as k', 'k.NIK', 'tk.nik')
        ->join('master_jadwal_kerja_karyawan as mjkk', 'mjkk.id', 'tk.id_jadwal_karyawan')
        ->join('detail_jadwal_kerja_karyawan as djkk', 'djkk.id_jadwal', 'mjkk.id')
        ->join('master_departemen as md', 'md.id', 'k.id_departemen')
        ->join('master_divisi as md2', 'md2.id', 'k.divisi')
        ->where('mjkk.non_shift', 0)
        ->where('md2.id', [3,12])
        ->where('k.NIK', $nik);

        if($res->count()){
            return true;
        }else{
            return false;
        }
    }
}
