<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\DetailUser;
use App\Models\Prodi;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function getTableName()
    {
        return "users";
    }

    public function getData(Request $request)
    {

        DB::enableQueryLog();
        $data = $request->post();
        dd($data);
        $data['data'] = [];
        $data['recordsTotal'] = 0;
        $data['recordsFiltered'] = 0;
        $datadb = User::with(['DetailUser', 'Roles', 'Prodis'])->where('id',);

        // dd($datadb->get());
        if (isset($_GET)) {
            $data['recordsTotal'] = $datadb->get()->count();
            if (isset($_GET['search']['value'])) {
                $keyword = $_GET['search']['value'];
                $datadb->where(function ($query) use ($keyword) {
                    $query->where('nama_prodi', 'LIKE', '%' . $keyword . '%');
                });
            }
            if (isset($_GET['order'][0]['column'])) {
                $datadb->orderBy('id', $_GET['order'][0]['dir']);
            }
            $data['recordsFiltered'] = $datadb->get()->count();

            if (isset($_GET['length'])) {
                $datadb->limit($_GET['length']);
            }
            if (isset($_GET['start'])) {
                $datadb->offset($_GET['start']);
            }
        }
        $data['data'] = $datadb->get()->toArray();
        // dd($data['data']);
        $data['draw'] = $_GET['draw'];
        $query = DB::getQueryLog();

        return response()->json($data);
    }


    public function getDetailData($id)
    {
        DB::enableQueryLog();
        $datadb = User::with(['DetailUser', 'Roles', 'Prodis'])->where('id', $id);
        $data = $datadb->first();
        $query = DB::getQueryLog();
        return response()->json($data);
    }

    public function submit(Request $request)
    {
        $data = $request->post();
        // dd($data);

        // begin transaction
        DB::beginTransaction();

        try {
            $user = $data['data']['id'] == '' ? new User() : User::find($data['data']['id']);
            $user->id = $data['data']['id'];
            $user->prodi_id = $data['data']['prodi'];
            $user->role_id = $data['data']['role'];
            $user->nama = $data['data']['nama'];
            $user->username = $data['data']['username'];
            $user->password = $data['data']['password'];
            $user->save();

            $detailUser = DetailUser::where('users_id', $data['data']['id'])->first();

            if ($detailUser != null) {
                // update existing detail_user
                $detailUser->nama_lengkap = $data['data']['nama_lengkap'];
                $detailUser->jenis_kelamin = $data['data']['jenis_kelamin'];
                $detailUser->no_hp = $data['data']['no_hp'];
                $detailUser->alamat = $data['data']['alamat'];
                $detailUser->save();
            } else {
                // create new detail_user if not exists
                $newDetailUser = new DetailUser();
                $newDetailUser->users_id = $user->id;
                $newDetailUser->nama_lengkap = $data['data']['nama_lengkap'];
                $newDetailUser->jenis_kelamin = $data['data']['jenis_kelamin'];
                $newDetailUser->no_hp = $data['data']['no_hp'];
                $newDetailUser->alamat = $data['data']['alamat'];
                $newDetailUser->save();
            }

            // commit
            DB::commit();
            $result['is_valid'] = true;
            createLog($data, $data['data']['id'], 'UPDATE DATA DIRI');
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
            DB::rollBack();
        }

        return response()->json($result);
    }



    public function delete(Request $request)
    {

        $data = $request->post();
        $result['is_valid'] = false;
        DB::beginTransaction();
        try {
            $push = Prodi::find($data['id']);
            $push->delete();

            DB::commit();
            $result['is_valid'] = true;
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
            DB::rollBack();
        }

        return response()->json($result);
    }

    public function filter(Request $request)
    {
        $data = $request->all();
        DB::enableQueryLog();
        $data['data'] = [];
        $data['recordsTotal'] = 0;
        $data['recordsFiltered'] = 0;
        $datadb = DB::table($this->getTableName() . ' as m')
            ->leftJoin('detail_users as du', 'du.users_id', '=', 'm.id')
            ->leftJoin('prodis as r', 'r.id', '=', 'm.prodi_id')
            ->leftJoin('prodis as p', 'p.id', '=', 'm.prodi_id')
            ->orderBy('du.nama_lengkap')
            ->where('m.nama', 'LIKE', '%' . $data['nama'] . '%')
            ->orWhere('m.prodi_id', $data['prodi'])
            ->orWhere('m.prodi_id', $data['prodi'])
            ->select([
                'm.id as id_user',
                'm.nama as nama_user',
                'm.username as username',
                'du.*',
                'r.*',
                'p.*'
            ]);

        // dd($datadb->get());
        if (isset($_GET)) {
            $data['recordsTotal'] = $datadb->get()->count();
            if (isset($_GET['search']['value'])) {
                $keyword = $_GET['search']['value'];
                $datadb->where(function ($query) use ($keyword) {
                    $query->where('du.nama_lengkap', 'LIKE', '%' . $keyword . '%');
                    $query->orWhere('du.no_hp', 'LIKE', '%' . $keyword . '%');
                    $query->orWhere('p.nama_prodi', 'LIKE', '%' . $keyword . '%');
                    $query->orWhere('r.nama_prodi', 'LIKE', '%' . $keyword . '%');
                });
            }
            if (isset($_GET['order'][0]['column'])) {
                $datadb->orderBy('m.id', $_GET['order'][0]['dir']);
            }
            $data['recordsFiltered'] = $datadb->get()->count();

            if (isset($_GET['length'])) {
                $datadb->limit($_GET['length']);
            }
            if (isset($_GET['start'])) {
                $datadb->offset($_GET['start']);
            }
        }
        $data['data'] = $datadb->get()->toArray();
        // dd($data['data']);
        $data['draw'] = $_GET['draw'];
        $query = DB::getQueryLog();

        return response()->json($data);
    }
}
