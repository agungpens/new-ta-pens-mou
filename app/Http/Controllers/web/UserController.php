<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Http\Controllers\api\UserController as ApiUserController;
use App\Models\DetailUser;
use App\Models\Prodi;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function getTitleParent()
    {
        return "Menu Lain";
    }

    public function getJs()
    {
        return asset('');
    }

    public function index()
    {

        // dd($detail_user);
        $api = new Role();
        $api2 = new Prodi();
        $data['data'] = [];
        $data['role'] = $api->get();
        $data['prodi'] = $api2->get();
        $view = view('page.user.index', $data);
        $put['title_content'] = 'List User';
        $put['title_top'] = 'List User';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }


    public function add()
    {
        $api = new Role();
        $api2 = new Prodi();
        $data['data'] = [];
        $data['role'] = $api->get();
        $data['prodi'] = $api2->get();
        $view = view('page.user.formadd', $data);
        $put['title_content'] = 'Tambah User';
        $put['title_top'] = 'Tambah User';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }

    public function ubah(Request $request)
    {
        $api = new ApiUserController();
        $api2 = new Role();
        $api3 = new Prodi();
        $data = $request->all();
        $data['data'] = $api->getDetailData($data['id'])->original;
        $data['role'] = $api2->get();
        $data['prodi'] = $api3->get();
        $view = view('page.user.formadd', $data);

        $put['title_content'] = 'Ubah User';
        $put['title_top'] = 'Ubah User';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;
        return view('template.main', $put);
    }
}
