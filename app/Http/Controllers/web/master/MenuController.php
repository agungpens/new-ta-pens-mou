<?php

namespace App\Http\Controllers\web\master;

use App\Http\Controllers\api\master\MenuController as MasterMenuController;
use App\Http\Controllers\Controller;
use App\models\master\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class MenuController extends Controller
{
    public $akses_menu = [];
    public function __construct()
    {
        date_default_timezone_set('Asia/Jakarta');
        $this->middleware(function ($request, $next) {
            $this->akses_menu = json_decode(session('akses_menu'));
            return $next($request);
        });
    }


    public function getHeaderCss()
    {
        return array(
            'js-1' => asset('assets/js/controllers/master/menu.js'),
        );
    }

    public function getTitleParent()
    {
        return "Master";
    }


    public function index()
    {
        $data['data'] = [];
        $data['akses'] = $this->akses_menu;
        // echo '<pre>';
        // print_r($data);die;
        $view = view('web.menu.index', $data);

        $put['title_content'] = 'Menu';
        $put['title_top'] = 'Menu';
        $put['title_parent'] = $this->getTitleParent();
        $put['view_file'] = $view;
        $put['header_data'] = $this->getHeaderCss();
        return view('template.main', $put);
    }

    public function add()
    {
        $data['data'] = [];
        $data['list_parent'] = Menu::whereNull('menu_parent')->orWhere('menu_parent', 0)->get()->toArray();
        $view = view('web.menu.formadd', $data);

        $put['title_content'] = 'Menu';
        $put['title_top'] = 'Menu';
        $put['title_parent'] = $this->getTitleParent();
        $put['view_file'] = $view;
        $put['header_data'] = $this->getHeaderCss();
        return view('template.main', $put);
    }

    public function ubah(Request $request)
    {
        $api = new MasterMenuController();
        $data = $request->all();
        $data['data'] = $api->getDetailData($data['id'])->original;
        $data['list_parent'] = Menu::whereNull('menu_parent')->orWhere('menu_parent', 0)->get()->toArray();
        $view = view('web.menu.formadd', $data);

        $put['title_content'] = 'Menu';
        $put['title_top'] = 'Menu';
        $put['title_parent'] = $this->getTitleParent();
        $put['view_file'] = $view;
        $put['header_data'] = $this->getHeaderCss();
        return view('template.main', $put);
    }
}
