<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\DokumenMoa;
use App\Models\DokumenMou;
use App\Models\Kegiatan;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ApiDashboardController extends Controller
{

    public function getJumlahData()
    {

        $result['is_valid'] = false;

        try {
            $data_mitra_instansi = [];
            $data_mitra_industri = [];
            $data_mitra_level = [];
            $prodi_doc = [];
            $jumlah_prodi = [];

            $data_prodi = Prodi::get();
            // $data_kegiatan = Kegiatan::get();
            $mou =  DokumenMou::with(['LevelDocMou', 'KategoriMou', 'JenisMou', 'DokumenMoa'])->orderBy('tanggal_dibuat', 'desc')->get()->toArray();
            $moa =  DokumenMoa::with(['LevelDocMoa', 'KategoriMoa', 'JenisMoa'])->orderBy('tanggal_dibuat', 'desc')->get()->toArray();
            foreach ($mou as $key => $value) {

                if (json_decode($value['relevansi_prodi']) != null && is_array(json_decode($value['relevansi_prodi']))) {
                    foreach (json_decode($value['relevansi_prodi']) as $keys => $values) {
                        $prodi_doc[] = $values;
                    }
                } else if (json_decode($value['relevansi_prodi']) != null && !is_array(json_decode($value['relevansi_prodi']))) {
                    $prodi_doc[] = $value['relevansi_prodi'];
                }

                $data_mitra_industri[] = $value['kategori_mou']['nama_kategori'];
                $data_mitra_instansi[] = $value['kerja_sama_dengan'];
                $data_mitra_level[] = $value['level_doc_mou']['nama_level'];
            }
            foreach ($moa as $key => $value) {
                if (json_decode($value['relevansi_prodi']) != null && is_array(json_decode($value['relevansi_prodi']))) {
                    foreach (json_decode($value['relevansi_prodi']) as $keys => $values) {
                        $prodi_doc[] = $values;
                    }
                } else if (json_decode($value['relevansi_prodi']) != null && !is_array(json_decode($value['relevansi_prodi']))) {
                    $prodi_doc[] = $value['relevansi_prodi'];
                }

                // jika sudah ada datanya di $data_mitra_instansi maka jangan di masukan
                $data_mitra_instansi[] = $value['kerja_sama_dengan'];

                $data_mitra_industri[] = $value['kategori_moa']['nama_kategori'];

                $data_mitra_level[] = $value['level_doc_moa']['nama_level'];

            }

            foreach ($prodi_doc as $key => $value) {
                $a = $data_prodi->find($value)->toArray();
                $jumlah_prodi[] = $a['nama_prodi'];
            }

            // foreach ($data_kegiatan as $key => $value) {

            //     $jumlah_kegiatan[] = $value->kegiatan;
            // }


            $counts0 = count($data_mitra_instansi);
            $counts1 = array_count_values($data_mitra_level);
            $counts2 = array_count_values($data_mitra_industri);
            $counts3 = array_count_values($jumlah_prodi);
            // $counts4 = array_count_values($jumlah_kegiatan);
// dd($counts1);
            $result['data'] = [
                'data_mitra_instansi' => $counts0,
                'data_mitra_level' => $counts1,
                'data_mitra_industri' => $counts2,
                'jumlah_prodi' => $counts3,
                // 'jumlah_kegiatan' => $counts4
            ];
            $result['is_valid'] = true;
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
        }
        return response()->json($result);
    }
}
