<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\KategoriDoc;
use App\Models\KategoriMou;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KategoriMouController extends Controller
{
    public function getTableName()
    {
        return "kategori_doc";
    }

    public function getData()
    {

        DB::enableQueryLog();
        $data['data'] = [];
        $data['recordsTotal'] = 0;
        $data['recordsFiltered'] = 0;
        $datadb = DB::table($this->getTableName() . ' as m')
            ->orderBy('m.id')
            ->select([
                'm.*'
            ]);

        // dd($datadb->get());
        if (isset($_POST)) {
            $data['recordsTotal'] = $datadb->get()->count();
            if (isset($_POST['search']['value'])) {
                $keyword = $_POST['search']['value'];
                $datadb->where(function ($query) use ($keyword) {
                    $query->where('m.nama_kategori', 'LIKE', '%' . $keyword . '%');
                });
            }
            if (isset($_POST['order'][0]['column'])) {
                $datadb->orderBy('m.id', $_POST['order'][0]['dir']);
            }
            $data['recordsFiltered'] = $datadb->get()->count();

            if (isset($_POST['length'])) {
                $datadb->limit($_POST['length']);
            }
            if (isset($_POST['start'])) {
                $datadb->offset($_POST['start']);
            }
        }
        $data['data'] = $datadb->get()->toArray();
        // dd($data['data']);
        $data['draw'] = $_POST['draw'];
        $query = DB::getQueryLog();

        return response()->json($data);
    }


    public function getDetailData($id)
    {
        DB::enableQueryLog();
        $datadb = DB::table($this->getTableName() . ' as m')
            ->select([
                'm.*',
            ])->where('m.id', $id);
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
            $push = $data['data']['id'] == '' ? new KategoriDoc() : KategoriDoc::find($data['data']['id']);
            $push->id = $data['data']['id'];
            $push->nama_kategori = $data['data']['nama_kategori'];
            $push->keterangan = $data['data']['keterangan'];

            $push->save();
            // commit
            DB::commit();
            $data['data']['id'] == '' ? createLog($data, $data['user_id'], 'TAMBAH KATEGORI DOKUMEN') : createLog($data, $data['user_id'], 'UPDATE KATEGORI DOKUMEN');
            $result['is_valid'] = true;
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
            $push = KategoriDoc::find($data['id']);
            $push->delete();

            DB::commit();
            $result['is_valid'] = true;
            createLog($data, $data['user_id'], 'DELETE KATEGORI DOKUMEN');
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
        if (isset($_POST)) {
            $data['recordsTotal'] = $datadb->get()->count();
            if (isset($_POST['search']['value'])) {
                $keyword = $_POST['search']['value'];
                $datadb->where(function ($query) use ($keyword) {
                    $query->where('du.nama_lengkap', 'LIKE', '%' . $keyword . '%');
                    $query->orWhere('du.no_hp', 'LIKE', '%' . $keyword . '%');
                    $query->orWhere('p.nama_prodi', 'LIKE', '%' . $keyword . '%');
                    $query->orWhere('r.nama_role', 'LIKE', '%' . $keyword . '%');
                });
            }
            if (isset($_POST['order'][0]['column'])) {
                $datadb->orderBy('m.id', $_POST['order'][0]['dir']);
            }
            $data['recordsFiltered'] = $datadb->get()->count();

            if (isset($_POST['length'])) {
                $datadb->limit($_POST['length']);
            }
            if (isset($_POST['start'])) {
                $datadb->offset($_POST['start']);
            }
        }
        $data['data'] = $datadb->get()->toArray();
        // dd($data['data']);
        $data['draw'] = $_POST['draw'];
        $query = DB::getQueryLog();

        return response()->json($data);
    }
    public function ubah(Request $request)
    {
        $data = $request->all();
        $data['is_valid'] = false;

        try {
            $data['data'] = $this->getDetailData($data['id'])->original;
            $data['is_valid'] = true;
        } catch (\Throwable $th) {
            $data['message'] = $th->getMessage();
        }
        return response()->json($data);
    }
}
