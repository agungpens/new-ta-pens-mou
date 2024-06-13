<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\LogUser;
use Illuminate\Support\Facades\DB;

class LogUserController extends Controller
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
        $datadb = LogUser::with('DataUser');

        // dd($datadb->get());
        if (isset($_POST)) {
            $data['recordsTotal'] = $datadb->get()->count();
            if (isset($_POST['search']['value'])) {
                $keyword = $_POST['search']['value'];
                $datadb->where(function ($query) use ($keyword) {
                    $query->where('nama_username', 'LIKE', '%' . $keyword . '%');
                });
            }
            if (isset($_POST['order'][0]['column'])) {
                $datadb->orderBy('id', $_POST['order'][0]['dir']);
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
        $datadb = LogUser::with('DataUser')->where('id', $id);
        $data = $datadb->first()->toArray();
        $query = DB::getQueryLog();
        return response()->json($data);
    }

}
