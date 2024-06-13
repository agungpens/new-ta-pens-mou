<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Models\LevelingMou;
use App\Http\Controllers\api\LevelingMouController as ApiLevelingMouController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LevelingMouController extends Controller
{
    public function getTitleParent()
    {
        return "Data MOU";
    }

    public function getJs()
    {
        return asset('assets/js/controller/mou/leveling.js');
    }

    public function index()
    {
        $data['data'] = [];
        $view = view('page.mou.leveling.index', $data);
        $put['title_content'] = 'Leveling MOU';
        $put['title_top'] = 'Leveling MOU';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }


    public function add()
    {
        $data['data'] = [];
        $view = view('page.mou.leveling.form.formadd', $data);
        $put['title_content'] = 'Tambah Leveling';
        $put['title_top'] = 'Tambah Leveling';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }

    public function ubah(Request $request)
    {
        $api = new ApiLevelingMouController();
        $data = $request->all();
        $data['data'] = $api->getDetailData($data['id'])->original;
        $view = view('page.mou.leveling.form.formadd', $data);

        $put['title_content'] = 'Ubah Leveling';
        $put['title_top'] = 'Ubah Leveling';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;
        return view('template.main', $put);
    }
}
