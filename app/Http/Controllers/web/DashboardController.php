<?php

namespace App\Http\Controllers\web;

use App\Http\Controllers\Controller;
use App\Models\DokumenMoa;
use App\Models\DokumenMou;
use App\Models\Kegiatan;
use App\Models\Prodi;
use Carbon\Carbon;
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

        $data['total_mou_aktif'] = $data_mou->where('status', 'AKTIF')->count();
        $data['total_mou_tidak_aktif'] = $data_mou->where('status', 'TIDAK AKTIF')->count();
        $data['total_moa_aktif'] = $data_moa->where('status', 'AKTIF')->count();
        $data['total_moa_tidak_aktif'] = $data_moa->where('status', 'TIDAK AKTIF')->count();

        $date_now = Carbon::now();
        $date_two_months_later = Carbon::now()->addMonths(2);
        $datadb = DokumenMou::with(['LevelDocMou', 'KategoriMou', 'JenisMou'])->whereBetween('tanggal_berakhir', [$date_now, $date_two_months_later])
            ->orderBy('tanggal_dibuat', 'desc');

        $data_prodi = Prodi::get();
        $data_gabungan = [];

        foreach ($datadb->get() as $key => $value) {
            $data_gabungan[$key]['id'] = $value->id;
            $data_gabungan[$key]['nomor_mou'] = $value->nomor_mou;
            $data_gabungan[$key]['file_mou'] = $value->file_mou;
            $data_gabungan[$key]['judul_mou'] = $value->judul_mou;
            $data_gabungan[$key]['kerja_sama_dengan'] = $value->kerja_sama_dengan;
            $data_gabungan[$key]['tanggal_dibuat'] = $value->tanggal_dibuat;
            $data_gabungan[$key]['tanggal_berakhir'] = $value->tanggal_berakhir;
            $data_gabungan[$key]['status'] = $value->status;
            $data_gabungan[$key]['relevansi_prodi'] = $value->relevansi_prodi == null ? [] : $data_prodi->whereIn('id', json_decode($value->relevansi_prodi))->pluck('nama_prodi')->toArray();
            $data_gabungan[$key]['jenis_doc'] = $value->JenisMou->nama_jenis;
            $data_gabungan[$key]['level_mou'] = $value->LevelDocMou->nama_level;
            $data_gabungan[$key]['kategori_mou'] = $value->KategoriMou->nama_kategori;
        }
        $data['mou_yang_akan_habis'] = $data_gabungan;
        $datadb = DokumenMoa::with(['LevelDocMoa', 'KategoriMoa', 'JenisMoa'])->whereBetween('tanggal_berakhir', [$date_now, $date_two_months_later])
            ->orderBy('tanggal_dibuat', 'desc');


        $data_gabungan_moa = [];

        foreach ($datadb->get() as $key => $value) {
            $data_gabungan_moa[$key]['id'] = $value->id;
            $data_gabungan_moa[$key]['nomor_moa'] = $value->nomor_moa;
            $data_gabungan_moa[$key]['nomor_mou'] = $value->nomor_mou;
            $data_gabungan_moa[$key]['file_moa'] = $value->file_moa;
            $data_gabungan_moa[$key]['judul_moa'] = $value->judul_moa;
            $data_gabungan_moa[$key]['kerja_sama_dengan'] = $value->kerja_sama_dengan;
            $data_gabungan_moa[$key]['tanggal_dibuat'] = $value->tanggal_dibuat;
            $data_gabungan_moa[$key]['tanggal_berakhir'] = $value->tanggal_berakhir;
            $data_gabungan_moa[$key]['status'] = $value->status;
            $data_gabungan_moa[$key]['relevansi_prodi'] = $value->relevansi_prodi == null ? [] : $data_prodi->whereIn('id', json_decode($value->relevansi_prodi))->pluck('nama_prodi')->toArray();
            $data_gabungan_moa[$key]['jenis_doc'] = $value->JenisMoa->nama_jenis;
            $data_gabungan_moa[$key]['level_moa'] = $value->LevelDocMoa->nama_level;
            $data_gabungan_moa[$key]['kategori_moa'] = $value->KategoriMoa->nama_kategori;
        }

        $data['moa_yang_akan_habis'] = $data_gabungan_moa;



// dd($data['mou_yang_akan_habis']);

        $view = view('page.dashboard', $data);
        $put['title_content'] = 'Home';
        $put['title_top'] = 'Home';
        $put['title_parent'] = $this->getTitleParent();
        $put['view_file'] = $view;

        return view('template.main', $put);
    }
}
