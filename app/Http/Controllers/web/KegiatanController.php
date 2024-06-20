<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Models\kegiatanMou;
use App\Http\Controllers\api\KegiatanController as ApiKegiatanController;
use App\Models\DokumenMoa;
use App\Models\DokumenMou;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KegiatanController extends Controller
{
    public function getTitleParent()
    {
        return "Data MOU";
    }

    public function getJs()
    {
        // return asset('assets/js/controller/mou/kegiatan.js');
        return '';
    }

    public function index()
    {
        $data['data'] = [];
        $view = view('page.mou.kegiatan.index', $data);
        $put['title_content'] = 'Kegiatan Dokumen';
        $put['title_top'] = 'Kegiatan Dokumen';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }


    public function add()
    {
        $data['data'] = [];
        $data['data_dokumen'] = DokumenMou::with(['DokumenMoa'])->get()->toArray();
        $data['data_dokumen_moa'] = DokumenMoa::get()->toArray();
        $data['data_instansi'] = [];
        foreach ($data['data_dokumen'] as $dokumenMou) {
            $data['data_instansi'][] = strtolower($dokumenMou['kerja_sama_dengan']);
            foreach ($dokumenMou['dokumen_moa'] as $dokumenMoa) {
                $data['data_instansi'][] = strtolower($dokumenMoa['kerja_sama_dengan']);
            }
        }
        foreach ($data['data_dokumen_moa'] as $dokumenMoa) {
            $data['data_instansi'][] = strtolower($dokumenMoa['kerja_sama_dengan']);
        }
        $data['data_instansi'] = array_values(array_unique($data['data_instansi']));
        $view = view('page.mou.kegiatan.form.formadd2', $data);
        $put['title_content'] = 'Tambah kegiatan';
        $put['title_top'] = 'Tambah kegiatan';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }

    public function ubah(Request $request)
    {

        $api = new ApiKegiatanController();
        $data = $request->all();
        $data['data_instansi'] = [];

        $data['data_dokumen'] = DokumenMou::with(['DokumenMoa'])->get()->toArray();
        foreach ($data['data_dokumen'] as $dokumenMou) {
            $data['data_instansi'][] = $dokumenMou['kerja_sama_dengan'];
            foreach ($dokumenMou['dokumen_moa'] as $dokumenMoa) {
                $data['data_instansi'][] = $dokumenMoa['kerja_sama_dengan'];
            }
        }
        $data['data_instansi'] = array_values(array_unique($data['data_instansi']));

        $data['data'] = $api->getDetailData($data['id'])->original;
        $view = view('page.mou.kegiatan.form.formadd2', $data);

        $put['title_content'] = 'Detail kegiatan';
        $put['title_top'] = 'Detail kegiatan';
        $put['title_parent'] = $this->getTitleParent();
        $put['js'] = $this->getJs();
        $put['view_file'] = $view;
        return view('template.main', $put);
    }
}
