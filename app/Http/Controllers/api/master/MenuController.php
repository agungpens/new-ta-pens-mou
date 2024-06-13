<?php

namespace App\Http\Controllers\api\master;

use App\Http\Controllers\Controller;
use App\models\master\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class MenuController extends Controller
{
    public function getTableName()
    {
        return "app_menu";
    }

    public function getData()
    {
        DB::enableQueryLog();
        $data['data'] = [];
        $data['recordsTotal'] = 0;
        $data['recordsFiltered'] = 0;
        $datadb = DB::table($this->getTableName() . ' as m')
            ->select([
                'm.*',
            ])->whereNull('m.deleted');

        if (isset($_GET)) {
            $data['recordsTotal'] = $datadb->get()->count();
            if (isset($_GET['search']['value'])) {
                $keyword = $_GET['search']['value'];
                $datadb->where(function ($query) use ($keyword) {
                    $query->where('m.nama', 'LIKE', '%' . $keyword . '%');
                    $query->orWhere('m.menu_url', 'LIKE', '%' . $keyword . '%');
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
        $data['draw'] = $_GET['draw'];
        $query = DB::getQueryLog();
        // echo '<pre>';
        // print_r($query);die;
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
        $result['is_valid'] = false;
        DB::beginTransaction();
        try {
            $push = $data['data']['id'] == '' ? new Menu() : Menu::find($data['data']['id']);
            $push->nama = $data['data']['menu'];
            $push->menu_url = $data['data']['menu_url'];
            $push->routing_mobile = $data['data']['menu_url_mobile'];
            if ($data['data']['parent_menu'] != '') {
                $push->menu_parent = $data['data']['parent_menu'];
            }
            $push->save();

            DB::commit();
            $action = isset($data['data']['id']) ? "UPDATE" : "INSERT";
            createLog($push, $action . " " . $this->getTableName());
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
            $push = Menu::find($data['id']);
            $push->deleted = 1;
            $push->save();

            DB::commit();
            $result['is_valid'] = true;
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
            DB::rollBack();
        }

        return response()->json($result);
    }
}
