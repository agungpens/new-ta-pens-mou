<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Models\JenisMou;
use App\Http\Controllers\api\JenisMouController as ApiJenisMouController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JenisMouController extends Controller
{
    public function getTitleParent()
    {
        return "Data MOU";
    }

    public function getJs()
    {
        return asset('');
    }

    public function index()
    {
        $data['data'] = [];
        $view = view('page.mou.jenis.index', $data);
        $put['title_content'] = 'Jenis MOU';
        $put['title_top'] = 'Jenis MOU';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }


    public function add()
    {
        $data['data'] = [];
        $view = view('page.mou.jenis.form.formadd', $data);
        $put['title_content'] = 'Tambah Jenis';
        $put['title_top'] = 'Tambah Jenis';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }

    public function ubah(Request $request)
    {
        $api = new ApiJenisMouController();
        $data = $request->all();
        $data['data'] = $api->getDetailData($data['id'])->original;
        $view = view('page.mou.jenis.form.formadd', $data);

        $put['title_content'] = 'Ubah Jenis';
        $put['title_top'] = 'Ubah Jenis';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;
        return view('template.main', $put);
    }
}
