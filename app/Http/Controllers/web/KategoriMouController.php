<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Models\KategoriMou;
use App\Http\Controllers\api\KategoriMouController as ApiKategoriMouController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KategoriMouController extends Controller
{
    public function getTitleParent()
    {
        return "Data MOU";
    }

    public function getJs()
    {
        return asset('assets/js/controller/mou/kategori.js');
    }

    public function index()
    {

        // dd($detail_user);
        $data['data'] = [];
        $view = view('page.mou.kategori.index', $data);
        $put['title_content'] = 'Kategori MOU';
        $put['title_top'] = 'Kategori MOU';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }


    public function add()
    {
        $data['data'] = [];
        $view = view('page.mou.kategori.form.formadd', $data);
        $put['title_content'] = 'Tambah Kategori';
        $put['title_top'] = 'Tambah Kategori';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }

    public function ubah(Request $request)
    {
        $api = new ApiKategoriMouController();
        $data = $request->all();
        $data['data'] = $api->getDetailData($data['id'])->original;
        $view = view('page.mou.kategori.form.formadd', $data);

        $put['title_content'] = 'Ubah Kategori';
        $put['title_top'] = 'Ubah Kategori';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;
        return view('template.main', $put);
    }

    public function submit(Request $request)
    {
        $data = $request->all();
        // dd($data['user_id']);
        // dd($data);
        $request->validate([
            'username' => 'required',
            'nama' => 'required',
        ]);
        // dd($data);

        // begin transaction
        DB::beginTransaction();
        try {
            $push = $data['user_id'] == '' || null ? new KategoriMou() : KategoriMou::find($data['user_id']);
            $push->id = $data['user_id'];
            $push->username = $data['username'];
            $push->nama = $data['nama'];
            $push->role_id = $data['role'];
            $push->prodi_id = $data['prodi'];

            if (isset($data['password'])) {
                if ($data['password'] != '' || $data['password'] != null) {
                    $push->password = bcrypt($data['password']);
                    $push->password_lama = $data['password'];
                }
            }
            $push->save();
            // commit
            DB::commit();
            return redirect()->back()->with('success', 'Data berhasil diperbarui');
        } catch (\Throwable $th) {
            // rollback
            DB::rollBack();
            return redirect()->back()->with('error', 'Data gagal diperbarui');
        }
    }
}
