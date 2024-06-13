<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\JenisDoc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JenisMouController extends Controller
{
    public function getTableName()
    {
        return "jenis_doc";
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
        if (isset($_GET)) {
            $data['recordsTotal'] = $datadb->get()->count();
            if (isset($_GET['search']['value'])) {
                $keyword = $_GET['search']['value'];
                $datadb->where(function ($query) use ($keyword) {
                    $query->where('m.nama_jenis', 'LIKE', '%' . $keyword . '%');
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
            $push = $data['data']['id'] == '' ? new JenisDoc() : JenisDoc::find($data['data']['id']);
            $push->id = $data['data']['id'];
            $push->nama_jenis = $data['data']['nama_jenis'];
            $push->keterangan = $data['data']['keterangan'];

            $push->save();
            // commit
            DB::commit();
            $result['is_valid'] = true;
            $data['data']['id'] == '' ? createLog($data, $data['user_id'], 'TAMBAH JENIS MOU / DOKUMEN') : createLog($data, $data['user_id'], 'UPDATE JENIS MOU / DOKUMEN');
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
            $push = JenisDoc::find($data['id']);
            $push->delete();

            DB::commit();
            $result['is_valid'] = true;
            createLog($data, $data['user_id'], 'DELETE JENIS MOU / DOKUMEN');
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
            DB::rollBack();
        }

        return response()->json($result);
    }
}
