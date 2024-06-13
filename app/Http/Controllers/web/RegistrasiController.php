<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RegistrasiController extends Controller
{
    public function index()
    {
        $data = [];
        $api3 = new Prodi();
        $data['prodi'] = $api3->get();
        return view('page.registrasi', $data);
    }

    public function submit(Request $request)
    {
        $data = $request->all();
        $request->validate([
            'username' => 'required',
            'nama' => 'required',
            'password' => 'required',
            'role' => 'required',
            'prodi' => 'required',
        ]);

        // jika ada data username / password yang sama di table user maka kembalikan url dan berikan alert
        $cek = DB::table('users')->where('username', $data['username'])->get();
        if (count($cek) > 0) {
            return redirect()->back()->with('error', 'Username sudah ada');
        }


        DB::beginTransaction();
        try {
            $push =  new User();
            $push->nama = $data['nama'];
            $push->username = $data['username'];
            $push->password_lama = $data['password'];
            $push->password = bcrypt($data['password']);
            $push->role_id = $data['role'];
            $push->prodi_id = $data['prodi'];
            $push->save();
            DB::commit();

            return redirect()->route('login')->with('success', 'Akun berhasil dibuat');
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Akun gagal dibuat');
        }
    }
}
