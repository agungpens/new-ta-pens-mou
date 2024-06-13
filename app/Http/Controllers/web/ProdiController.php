<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Models\JenisMou;
use App\Http\Controllers\api\ProdiController as ApiProdiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProdiController extends Controller
{
    public function getTitleParent()
    {
        return "Data MOU";
    }

    public function getJs()
    {
        return asset('assets/js/controller/user/prodi.js');
    }

    public function index()
    {
        $data['data'] = [];
        $view = view('page.user.prodi.index', $data);
        $put['title_content'] = 'Prodi';
        $put['title_top'] = 'Prodi';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }


    public function add()
    {
        $data['data'] = [];
        $view = view('page.user.prodi.form.formadd', $data);
        $put['title_content'] = 'Tambah Prodi';
        $put['title_top'] = 'Tambah Prodi';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }

    public function ubah(Request $request)
    {
        $api = new ApiProdiController();
        $data = $request->all();
        $data['data'] = $api->getDetailData($data['id'])->original;
        $view = view('page.user.prodi.form.formadd', $data);

        $put['title_content'] = 'Ubah Prodi';
        $put['title_top'] = 'Ubah Prodi';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;
        return view('template.main', $put);
    }
}
