<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Models\DetailUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\api\ProfileController as ApiProfileController;

class ProfileController extends Controller
{
    public function getTitleParent()
    {
        return "Dashboard";
    }

    public function getJs()
    {
        return '';
    }

    public function index(Request $request)
    {
        $api = new ApiProfileController();
        $data = $request->all();
        $data['data'] = $api->getDetailData($data['id'])->original->toArray();

        $view = view('page.profile.index', $data);

        $put['title_content'] = 'My Profile';
        $put['title_top'] = 'My Profile';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;
        return view('template.main', $put);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function submit(Request $request, $id)
    {
        $data = $request->all();

        $request->validate([
            'nama_lengkap' => 'required',
            'jenis_kelamin' => 'required',
            'alamat' => 'required',
            'no_hp' => 'required',
            'foto' => 'image|mimes:jpeg,png,jpg,gif,svg'
        ]);
        // dd($data);

        // begin transaction
        DB::beginTransaction();
        try {
            $push = $data['id'] == '' || null ? new DetailUser() : DetailUser::find($data['id']);
            $push->users_id = $id;
            $push->nama_lengkap = $data['nama_lengkap'];
            $push->jenis_kelamin = $data['jenis_kelamin'];
            $push->alamat = $data['alamat'];
            $push->no_hp = $data['no_hp'];

            if (isset($data['foto'])) {
                $file = $request->file('foto');
                $file_name = $file->getClientOriginalName();
                $file->move(public_path('img/foto-profile'), $file_name);
                $push->foto = $file_name;
            } else {
                $push->foto = $data['foto_lama'];
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
    public function updateAuth(Request $request, $id)
    {
        $data = $request->all();
        // dd($data);
        $request->validate([
            'username' => 'required',
            'nama' => 'required',
        ]);


        // begin transaction
        DB::beginTransaction();
        try {
            $push = $data['user_id'] == '' || null ? new User() : User::find($data['user_id']);
            $push->id = $id;
            $push->username = $data['username'];
            $push->nama = $data['nama'];

            if (isset($data['password_baru']) && isset($data['password_lama'])) {
                if ($push->password_lama == $data['password_lama']) {
                    $push->password_lama = $data['password_baru'];
                    $push->password = bcrypt($data['password_baru']);
                } else {
                    return redirect()->back()->with('gagal', 'Password lama anda tidak sama');
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

    /**
     * Store a newly created resource in storage.
     */


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
