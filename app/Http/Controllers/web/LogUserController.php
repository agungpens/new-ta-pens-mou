<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Http\Controllers\api\LogUserController as ApiLogUserController;
use Illuminate\Http\Request;

class LogUserController extends Controller
{
    public function getTitleParent()
    {
        return "Menu Lain";
    }

    public function getJs()
    {
        return asset('assets/js/controller/log_user.js');
    }

    public function index()
    {

        // dd($detail_user);
        $data['data'] = [];
        $view = view('page.mou.log_user.index', $data);
        $put['title_content'] = 'Log User';
        $put['title_top'] = 'Log User';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }
    public function detail(Request $request)
    {
        $api = new ApiLogUserController();
        $data = $request->all();
        $data['data'] = $api->getDetailData($data['id'])->original;
        $view = view('page.mou.log_user.form.formadd', $data);

        $put['title_content'] = 'Detail Perubahan Data';
        $put['title_top'] = 'Detail Perubahan Data';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;
        return view('template.main', $put);
    }
}
