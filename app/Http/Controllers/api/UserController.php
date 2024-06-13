<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\DetailUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function PHPUnit\Framework\isEmpty;

class UserController extends Controller
{
    public function getTableName()
    {
        return "users";
    }

    public function getData()
    {

        DB::enableQueryLog();
        $data['data'] = [];
        $data['recordsTotal'] = 0;
        $data['recordsFiltered'] = 0;
        $datadb = DB::table($this->getTableName() . ' as m')
            ->leftJoin('detail_users as du', 'du.users_id', '=', 'm.id')
            ->leftJoin('roles as r', 'r.id', '=', 'm.role_id')
            ->leftJoin('prodis as p', 'p.id', '=', 'm.prodi_id')
            ->orderBy('du.nama_lengkap')
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
                    $query->orWhere('r.nama_role', 'LIKE', '%' . $keyword . '%');
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

    public function submit(Request $request)
    {
        $data = $request->post();
        // dd($data['data']['user_id']);
        // begin transaction
        DB::beginTransaction();
        try {
            $push = $data['data']['user_id'] == '' || null ? new User() : User::find($data['data']['user_id']);
            $push->id = $data['data']['user_id'];
            $push->username = $data['data']['username'];
            $push->nama = $data['data']['nama'];
            $push->role_id = $data['data']['role'];
            $push->prodi_id = $data['data']['prodi'];

            if (isset($data['data']['password'])) {
                if ($data['data']['password'] != '' || $data['data']['password'] != null) {
                    $push->password = bcrypt($data['data']['password']);
                    $push->password_lama = $data['data']['password'];
                }
            }
            $push->save();
            // commit
            DB::commit();
            // return redirect()->back()->with('success', 'Data berhasil diperbarui');
            $result['is_valid'] = true;
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
            DB::rollBack();
        }

        return response()->json($result);
    }

    public function getDetailData($id)
    {
        DB::enableQueryLog();
        $datadb = DB::table($this->getTableName() . ' as m')
            ->leftJoin('roles as r', 'r.id', '=', 'm.role_id')
            ->leftJoin('prodis as p', 'p.id', '=', 'm.prodi_id')
            ->where('m.id', $id)
            ->select([
                'm.id as id_user',
                'm.nama as nama_user',
                'm.prodi_id',
                'm.role_id',
                'm.username as username',
                'r.*', 'p.*'
            ]);

        $data = $datadb->first();
        return response()->json($data);
    }


    public function delete(Request $request)
    {

        $data = $request->post();
        $result['is_valid'] = false;
        DB::beginTransaction();
        try {
            $push = User::find($data['id']);
            $push->delete();

            $push2 = DB::table('detail_users as du')->where('users_id', $data['id'])->get();
            if ($push2->isNotEmpty()) {
                $push2->delete();
            }
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
            ->leftJoin('roles as r', 'r.id', '=', 'm.role_id')
            ->leftJoin('prodis as p', 'p.id', '=', 'm.prodi_id')
            ->orderBy('du.nama_lengkap')
            ->where('m.nama', 'LIKE', '%' . $data['nama'] . '%')
            ->orWhere('m.role_id', $data['role'])
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
                    $query->orWhere('r.nama_role', 'LIKE', '%' . $keyword . '%');
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
    // {
    //     $data = $request->all();

    //     $datadb = User::where('nama', 'LIKE', '%' . $data['nama'] . '%')
    //         ->orWhere('role_id', $data['role'])
    //         ->orWhere('prodi_id', $data['prodi'])
    //         ->get()->toArray();

    //     // jika tidak ada datanya
    //     if (empty($datadb)) {
    //         return response()->json([
    //             'status' => 'error',
    //             'message' => 'Data tidak ditemukan',
    //             'data' => $datadb
    //         ]);
    //     } else {
    //         return response()->json([
    //             'status' => 'success',
    //             'message' => 'Data ditemukan',
    //             'data' => $datadb
    //         ]);
    //     }
    // }
}
