<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Http\Controllers\api\SemuaDokumenController as ApiSemuaDokumenController;
use App\Models\JenisDoc;
use App\Models\KategoriDoc;
use App\Models\LevelingMou;
use App\Models\MasterTemplateDoc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SemuaDokumenController extends Controller
{
    public function getTitleParent()
    {
        return "Data MOU";
    }

    public function getJs()
    {
        return asset('assets/js/controller/mou/semua_document.js');
    }

    public function index()
    {
        $data['data'] = [];
        $view = view('page.mou.semua_document.index', $data);
        $put['title_content'] = 'Master Document';
        $put['title_top'] = 'Master Document';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }


    public function add()
    {

        $data['data'] = [];

        $jenis = new JenisDoc();
        $leveling = new LevelingMou();
        $kategori = new KategoriDoc();

        $data['list_jenis'] = $jenis->get();
        $data['list_level'] = $leveling->get();
        $data['list_kategori'] = $kategori->get();
        // dd($data['list_kategori']->get()->toArray());
        $view = view('page.mou.semua_document.form.formadd', $data);
        $put['title_content'] = 'Tambah Document';
        $put['title_top'] = 'Tambah Document';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }

    public function ubah(Request $request)
    {
        $api = new ApiSemuaDokumenController();
        $data = $request->all();

        $jenis = new JenisDoc();
        $leveling = new LevelingMou();
        $kategori = new KategoriDoc();

        $data['list_jenis'] = $jenis->get();
        $data['list_level'] = $leveling->get();
        $data['list_kategori'] = $kategori->get();
        $data['data'] = $api->getDetailData($data['id'])->original;
        $view = view('page.mou.semua_document.form.formadd', $data);

        $put['title_content'] = 'Ubah Document';
        $put['title_top'] = 'Ubah Document';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;
        return view('template.main', $put);
    }
}
