<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Models\JenisMou;
use App\Http\Controllers\api\RoleController as ApiRoleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
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
        $view = view('page.user.role.index', $data);
        $put['title_content'] = 'Role';
        $put['title_top'] = 'Role';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }


    public function add()
    {
        $data['data'] = [];
        $view = view('page.user.role.form.formadd', $data);
        $put['title_content'] = 'Tambah Jenis';
        $put['title_top'] = 'Tambah Jenis';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }

    public function ubah(Request $request)
    {
        $api = new ApiRoleController();
        $data = $request->all();
        $data['data'] = $api->getDetailData($data['id'])->original;
        $view = view('page.user.role.form.formadd', $data);

        $put['title_content'] = 'Ubah Jenis';
        $put['title_top'] = 'Ubah Jenis';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;
        return view('template.main', $put);
    }
}
