<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\LevelingMou;
use App\Models\LogUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class LevelingMouController extends Controller
{
    public function getTableName()
    {
        return "leveling_doc";
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
                    $query->where('m.nama_level', 'LIKE', '%' . $keyword . '%');
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

        // begin transaction
        DB::beginTransaction();
        try {
            $push = $data['data']['id'] == '' ? new LevelingMou() : LevelingMou::find($data['data']['id']);
            $push->id = $data['data']['id'];
            $push->nama_level = $data['data']['nama_level'];
            $push->keterangan = $data['data']['keterangan'];

            $push->save();

            DB::commit();
            $data['data']['id'] == '' ? createLog($data, $data['user_id'], 'TAMBAH LEVELING') : createLog($data, $data['user_id'], 'UPDATE LEVELING');



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
            $push = LevelingMou::find($data['id']);
            $push->delete();

            DB::commit();
            createLog($data, $data['user_id'], 'DELETE LEVELING');
            $result['is_valid'] = true;
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
            DB::rollBack();
        }

        return response()->json($result);
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
