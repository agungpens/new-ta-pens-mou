<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Http\Controllers\api\ApiDokumenMoaController as ApiDokumenMoaController;
use App\Models\DokumenMou;
use App\Models\JenisDoc;
use App\Models\KategoriDoc;
use App\Models\LevelingMou;
use App\Models\Prodi;
use Illuminate\Http\Request;


class DokumenMoaController extends Controller
{
    public function getTitleParent()
    {
        return "Data MOA";
    }

    public function getJs()
    {
        // return asset('assets/js/controller/mou/dokumen_moa.js');
        return asset('');
    }

    public function index()
    {
        $data['data'] = [];

        $leveling = new LevelingMou();
        $kategori = new KategoriDoc();
        $prodi = new Prodi();

        $data['list_level'] = $leveling->get();
        $data['list_kategori'] = $kategori->get();
        $data['list_prodi'] = $prodi->get();


        $view = view('page.mou.dokumen_moa.index', $data);
        $put['title_content'] = 'Dokumen Moa';
        $put['title_top'] = 'Dokumen Moa';
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
        $prodi = new Prodi();
        $doc_mou = new DokumenMou();

        $data['list_jenis'] = $jenis->get();
        $data['list_level'] = $leveling->get();
        $data['list_kategori'] = $kategori->get();
        $data['list_prodi'] = $prodi->get();
        $data['list_doc_mou'] = $doc_mou->get();
        $data['tipeKategori'] = '';
        $data['tipeLevel'] = '';
        // dd($data['list_kategori']->get()->toArray());
        $view = view('page.mou.dokumen_moa.form.formadd', $data);
        $put['title_content'] = 'Tambah Document';
        $put['title_top'] = 'Tambah Document';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }

    public function ubah(Request $request)
    {
        $api = new ApiDokumenMoaController();
        $data = $request->all();
        $jenis = new JenisDoc();
        $leveling = new LevelingMou();
        $kategori = new KategoriDoc();

        $data['list_jenis'] = $jenis->get();
        $data['list_level'] = $leveling->get();
        $data['list_kategori'] = $kategori->get();
        $data['data'] = $api->getDetailData($data['id'])->original;
        $view = view('page.mou.dokumen_moa.form.formadd', $data);

        $put['title_content'] = 'Ubah Document';
        $put['title_top'] = 'Ubah Document';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;
        return view('template.main', $put);
    }
    public function detail(Request $request)
    {
        $api = new ApiDokumenMoaController();
        $data = $request->all();
        $jenis = new JenisDoc();
        $leveling = new LevelingMou();
        $kategori = new KategoriDoc();
        $prodi = new Prodi();

        $data['list_jenis'] = $jenis->get();
        $data['list_level'] = $leveling->get();
        $data['list_prodi'] = $prodi->get();
        $data['list_kategori'] = $kategori->get();
        $data['data'] = $api->getDetailData($data['id'])->original;

        $view = view('page.mou.dokumen_moa.form.detail', $data);

        $put['title_content'] = 'Detail Document';
        $put['title_top'] = 'Detail Document';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;
        return view('template.main', $put);
    }
}
