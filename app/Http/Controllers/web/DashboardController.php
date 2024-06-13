<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Models\DokumenMoa;
use App\Models\DokumenMou;
use App\Models\Kegiatan;
use Illuminate\Http\Request;

class DashboardController extends Controller
{

    public function getTitleParent()
    {
        return "Dashboard";
    }

    public function index()
    {
        $data['data'] = [];
        $data_mou = DokumenMou::get();
        $data_moa = DokumenMoa::get();
        $data_kegiatan = Kegiatan::get();

        $data['total_mou'] = $data_mou->count();
        $data['total_moa'] = $data_moa->count();
        $data['total_kegiatan'] = $data_kegiatan->count();

        $data['total_mou_aktif'] = $data_mou->where('status','AKTIF')->count();
        $data['total_mou_tidak_aktif'] = $data_mou->where('status','TIDAK AKTIF')->count();
        $data['total_moa_aktif'] = $data_moa->where('status','AKTIF')->count();
        $data['total_moa_tidak_aktif'] = $data_moa->where('status','TIDAK AKTIF')->count();


        $view = view('page.dashboard', $data);
        $put['title_content'] = 'Home';
        $put['title_top'] = 'Home';
        $put['title_parent'] = $this->getTitleParent();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }
}
