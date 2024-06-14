<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\DokumenMoa;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ApiDokumenMoaController extends Controller
{
    public function getTableName()
    {
        return "dokumen_moa";
    }

    public function getData()
    {
        DB::enableQueryLog();

        $data['data'] = [];
        $data['recordsTotal'] = 0;
        $data['recordsFiltered'] = 0;

        $datadb = DokumenMoa::with(['LevelDocMoa', 'KategoriMoa', 'JenisMoa'])
            ->orderBy('tanggal_dibuat', 'desc');

        $data_prodi = Prodi::get();
        $data_gabungan = [];

        foreach ($datadb->get() as $key => $value) {
            $data_gabungan[$key]['id'] = $value->id;
            $data_gabungan[$key]['nomor_moa'] = $value->nomor_moa;
            $data_gabungan[$key]['nomor_mou'] = $value->nomor_mou;
            $data_gabungan[$key]['file_moa'] = $value->file_moa;
            $data_gabungan[$key]['judul_moa'] = $value->judul_moa;
            $data_gabungan[$key]['kerja_sama_dengan'] = $value->kerja_sama_dengan;
            $data_gabungan[$key]['tanggal_dibuat'] = $value->tanggal_dibuat;
            $data_gabungan[$key]['tanggal_berakhir'] = $value->tanggal_berakhir;
            $data_gabungan[$key]['status'] = $value->status;
            $data_gabungan[$key]['relevansi_prodi'] = $value->relevansi_prodi == null ? [] : $data_prodi->whereIn('id', json_decode($value->relevansi_prodi))->pluck('nama_prodi')->toArray();
            $data_gabungan[$key]['jenis_doc'] = $value->JenisMoa->nama_jenis;
            $data_gabungan[$key]['level_moa'] = $value->LevelDocMoa->nama_level;
            $data_gabungan[$key]['level_moa_id'] = $value->LevelDocMoa->id;
            $data_gabungan[$key]['kategori_moa'] = $value->KategoriMoa->nama_kategori;
            $data_gabungan[$key]['kategori_moa_id'] = $value->KategoriMoa->id;
        }
        // dd($data_gabungan);
        // Jumlah total data sebelum filtering
        $data['recordsTotal'] = count($data_gabungan);

        // Proses filtering dan pencarian
        if (isset($_POST)) {
            // Menghitung kembali jumlah data setelah filtering
            $filteredData = $data_gabungan;

            if (isset($_POST['search']['value']) && !empty($_POST['search']['value'])) {
                $keyword = $_POST['search']['value'];
                $filteredData = array_filter($filteredData, function ($item) use ($keyword) {
                    return strpos(strtolower($item['nomor_moa']), strtolower($keyword)) !== false ||
                        strpos(strtolower($item['status']), strtolower($keyword)) !== false ||
                        strpos(strtolower($item['kategori_moa']), strtolower($keyword)) !== false ||
                        strpos(strtolower($item['file_moa']), strtolower($keyword)) !== false ||
                        strpos(strtolower($item['nomor_mou']), strtolower($keyword)) !== false;
                });
            }

            $data['recordsFiltered'] = count($filteredData);

            // Implementasi pengurutan, filter, dan pengaturan lainnya jika diperlukan
            if (isset($_POST['order'][0]['column']) && isset($_POST['order'][0]['dir'])) {
                $columnIdx = $_POST['order'][0]['column'];
                $columnName = array_keys($filteredData[0])[$columnIdx];
                $dir = $_POST['order'][0]['dir'];

                usort($filteredData, function ($a, $b) use ($columnName, $dir) {
                    return $dir === 'asc' ? strcmp($a[$columnName], $b[$columnName]) : strcmp($b[$columnName], $a[$columnName]);
                });
            }

            // Filter by prodi
            if (isset($_POST['prodi']) && $_POST['prodi'] !== '') {
                $filteredData = array_filter($filteredData, function ($item) {
                    return in_array($_POST['prodi'], $item['relevansi_prodi']);
                });
            }

            // Filter by level_moa
            if (isset($_POST['level']) && $_POST['level'] !== '') {
                $filteredData = array_filter($filteredData, function ($item) {
                    return $_POST['level'] == $item['level_moa_id'];
                });
            }

            // Filter by kategori_moa
            if (isset($_POST['kategori']) && $_POST['kategori'] !== '') {
                $filteredData = array_filter($filteredData, function ($item) {
                    return $_POST['kategori'] == $item['kategori_moa_id'];
                });
            }
            if (isset($_POST['status']) && $_POST['status'] !== '') {
                $filteredData = array_filter($filteredData, function ($item) {
                    return $_POST['status'] === $item['status'];
                });
            }
            if (isset($_POST['judul_moa']) && $_POST['judul_moa'] !== '') {
                $filteredData = array_filter($filteredData, function ($item) {
                    return $_POST['judul_moa'] === $item['judul_moa'];
                });
            }
            if (isset($_POST['tanggal_dibuat']) && $_POST['tanggal_dibuat'] !== '') {
                $filteredData = array_filter($filteredData, function ($item) {
                    return $_POST['tanggal_dibuat'] === $item['tanggal_dibuat'];
                });
            }
            if (isset($_POST['tanggal_berakhir']) && $_POST['tanggal_berakhir'] !== '') {
                $filteredData = array_filter($filteredData, function ($item) {
                    return $_POST['tanggal_berakhir'] === $item['tanggal_berakhir'];
                });
            }

            // Implementasi filter lainnya seperti tanggal_dibuat, tanggal_berakhir, status, kerja_sama, judul_mou

            // Limit dan offset
            if (isset($_POST['length']) && isset($_POST['start'])) {
                $filteredData = array_slice($filteredData, $_POST['start'], $_POST['length']);
            }

            $data['data'] = array_values($filteredData); // Reset index array
        } else {
            $data['data'] = $data_gabungan;
        }

        $data['draw'] = isset($_POST['draw']) ? intval($_POST['draw']) : 0;
        $query = DB::getQueryLog();

        return response()->json($data);
    }


    public function getDetailData($id)
    {
        DB::enableQueryLog();
        $datadb = DokumenMoa::with(['LevelDocMoa', 'KategoriMoa', 'JenisMoa'])->where('id', $id)
            ->orderBy('tanggal_dibuat', 'desc');

        $data_prodi = Prodi::get();
        $data_gabungan = [];

        foreach ($datadb->get() as $key => $value) {
            $data_gabungan[$key]['id'] = $value->id;
            $data_gabungan[$key]['nomor_moa'] = $value->nomor_moa;
            $data_gabungan[$key]['nomor_mou'] = $value->nomor_mou;
            $data_gabungan[$key]['file_moa'] = $value->file_moa;
            $data_gabungan[$key]['file_path'] = $value->file_path;
            $data_gabungan[$key]['judul_moa'] = $value->judul_moa;
            $data_gabungan[$key]['kerja_sama_dengan'] = $value->kerja_sama_dengan;
            $data_gabungan[$key]['tanggal_dibuat'] = $value->tanggal_dibuat;
            $data_gabungan[$key]['tanggal_berakhir'] = $value->tanggal_berakhir;
            $data_gabungan[$key]['status'] = $value->status;
            $data_gabungan[$key]['relevansi_prodi'] = $value->relevansi_prodi == null ? [] : $data_prodi->whereIn('id', json_decode($value->relevansi_prodi))->pluck('nama_prodi')->toArray();
            $data_gabungan[$key]['jenis_doc'] = $value->JenisMoa->nama_jenis;
            $data_gabungan[$key]['jenis_doc_id'] = $value->JenisMoa->id;
            $data_gabungan[$key]['level_moa'] = $value->LevelDocMoa->nama_level;
            $data_gabungan[$key]['level_moa_id'] = $value->LevelDocMoa->id;
            $data_gabungan[$key]['kategori_moa'] = $value->KategoriMoa->nama_kategori;
            $data_gabungan[$key]['kategori_moa_id'] = $value->KategoriMoa->id;
        }
        $data['data'] = $data_gabungan;
        $query = DB::getQueryLog();
        return response()->json($data);
    }

    public function submit(Request $request)
    {
        $data = $request->post();

        $data_record = array();
        $nomor_mou = null;

        // begin transaction
        DB::beginTransaction();
        try {
            if (isset($data['data']['nomor_mou'])) {
                $nomor_mou = explode(' - ', $data['data']['nomor_mou']);
                $nomor_mou = $nomor_mou[0];
            }

            foreach ($data['data_moa'] as $key => $value) {

                $kategori_doc = explode(' - ', $value['kategori_doc']);
                $level_doc = explode(' - ', $value['level_doc']);
                $jenis_doc = explode(' - ', $value['jenis_doc']);
                $relevansi_prodi = json_encode($value['relevansi_prodi']);

                $imageName = null;
                $dbpathlamp = null;

                if (isset($value['file'])) {
                    if (isset($value['id'])) {
                        $cek_file = DokumenMoa::find($value['id']);
                        $oldFilePath = public_path() . '/' . $cek_file->file_path . $cek_file->file_moa;
                        // Delete the old file
                        if (File::exists($oldFilePath)) {
                            unlink($oldFilePath);
                        }
                    }

                    $image = $value['file'];

                    // Menggunakan nama file yang diposting
                    $imageName = $value['file_name'];

                    // New file directory
                    $dir = 'file/';
                    $dir .= date('Y') . '/' . date('m');
                    $pathlamp = public_path() . '/' . $dir . '/';

                    // Create the directory if it doesn't exist
                    if (!File::isDirectory($pathlamp)) {
                        File::makeDirectory($pathlamp, 0777, true, true);
                    }

                    if ($value['file'] != '') {
                        if ($value['tipe'] == 'pdf') {
                            uploadFileFromBlobString($pathlamp, $imageName, $image);
                        } else {
                            File::put($pathlamp . $imageName, base64_decode($image));
                        }
                    }

                    $dbpathlamp = '/' . $dir . '/';
                }

                $data_record[] = [
                    'id' => $value['id'],
                    'nomor_mou' => $data['data']['nomor_mou'],
                    'nomor_moa' => $value['nomor_moa'],
                    'judul_moa' => $value['judul_moa'],
                    'tanggal_dibuat' => $value['tanggal_dibuat'],
                    'tanggal_berakhir' => $value['tanggal_berakhir'],
                    'status' => $value['status_doc'],
                    'kerja_sama_dengan' => $value['kerja_sama_dengan'],

                    'jenis_doc' => $value['jenis_doc'],
                    'kategori_moa' => $value['kategori_doc'],
                    'level_moa' => $value['level_doc'],
                    'relevansi_prodi' => json_encode($value['relevansi_prodi']),

                    'file_moa' => $imageName,
                    'file_path' => $dbpathlamp,

                ];


                $push = $value['id'] == '' ? new DokumenMoa() :  DokumenMoa::find($value['id']);

                $push->id = $value['id'];
                $push->nomor_mou = $nomor_mou;
                $push->nomor_moa = $value['nomor_moa'];
                $push->judul_moa = $value['judul_moa'];
                $push->tanggal_dibuat = $value['tanggal_dibuat'];
                $push->tanggal_berakhir = $value['tanggal_berakhir'];
                $push->status = $value['status_doc'];
                $push->kerja_sama_dengan = $value['kerja_sama_dengan'];

                $push->jenis_doc = $jenis_doc[0];
                $push->kategori_moa = $kategori_doc[0];
                $push->level_moa = $level_doc[0];
                $push->relevansi_prodi = $relevansi_prodi;

                if (isset($value['file'])) {
                    $push->file_moa = $imageName;
                    $push->file_path = $dbpathlamp;
                }

                $push->save();
            }

            // dd($data_record);
            DB::commit();
            $result['is_valid'] = true;
            createLog($data_record, $data['user_id'], 'TAMBAH DOKUMEN MOA');
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
            DB::rollBack();
        }

        return response()->json($result);
    }

    public function updated(Request $request)
    {
        $data = $request->post();
        $data_record = array();
        $nomor_mou = null;

        // begin transaction
        DB::beginTransaction();
        try {
            if (isset($data['data']['nomor_mou'])) {
                $nomor_mou = explode(' - ', $data['data']['nomor_mou']);
                $nomor_mou = $nomor_mou[0];
            }

            $push = DokumenMoa::find($data['data']['id']);
            $push->id = $data['data']['id'];
            $push->nomor_mou = $nomor_mou;
            $push->nomor_moa = $data['data']['nomor_moa'];
            $push->judul_moa = $data['data']['judul_moa'];
            $push->tanggal_dibuat = $data['data']['tanggal_dibuat'];
            $push->tanggal_berakhir = $data['data']['tanggal_berakhir'];
            $push->status = $data['data']['status'];
            $push->kerja_sama_dengan = $data['data']['kerja_sama_dengan'];

            $push->jenis_doc = $data['data']['jenis'];
            $push->kategori_moa = $data['data']['kategori'];
            $push->level_moa = $data['data']['level'];
            $push->relevansi_prodi = $data['data']['relevansi_prodi'];

            if (isset($data['data']['file'])) {
                // Menggunakan nama file yang diposting
                $imageName = $data['data']['file_name'];

                // Old file path
                $oldFilePath = public_path() . '/' . $push->file_path . $push->file_moa;

                // New file directory
                $dir = 'file/';
                $dir .= date('Y') . '/' . date('m');
                $pathlamp = public_path() . '/' . $dir . '/';

                // Create the directory if it doesn't exist
                if (!File::isDirectory($pathlamp)) {
                    File::makeDirectory($pathlamp, 0777, true, true);
                }

                // Delete the old file
                if (File::exists($oldFilePath)) {
                    unlink($oldFilePath);
                }

                // Save the new file
                if ($data['data']['tipe'] == 'pdf') {
                    uploadFileFromBlobString($pathlamp, $imageName, $data['data']['file']);
                } else {
                    File::put($pathlamp . $imageName, base64_decode($data['data']['file']));
                }

                // Update the database path
                $dbpathlamp = '/' . $dir . '/';
            }

            $push->file_moa = isset($imageName) ? $imageName : $push->file_moa;
            $push->file_path = isset($dbpathlamp) ? $dbpathlamp : $push->file_path;

            $push->save();

            $data_record = [
                'id' => $data['data']['id'],
                'nomor_mou' => $nomor_mou,
                'nomor_moa' => $data['data']['nomor_moa'],
                'tanggal_dibuat' => $data['data']['tanggal_dibuat'],
                'tanggal_berakhir' => $data['data']['tanggal_berakhir'],
                'status' => $data['data']['status'],
                'kerja_sama_dengan' => $data['data']['kerja_sama_dengan'],

                'jenis_doc' => $data['data']['jenis'],
                'kategori_moa' => $data['data']['kategori'],
                'level_moa' => $data['data']['level'],
                'relevansi_prodi' => $data['data']['relevansi_prodi'],

                'file_moa' =>  isset($imageName) ? $imageName : "",
                'file_path' => isset($dbpathlamp) ?  $dbpathlamp : "",

            ];
            // dd($data_record);
            DB::commit();
            $result['is_valid'] = true;
            createLog($data_record, $data['user_id'], 'UPDATE DOKUMEN MOA');
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
            DB::rollBack();
        }

        return response()->json($result);
    }



    public function delete(Request $request)
    {

        $data = $request->post();
        // dd($data);

        $result['is_valid'] = false;
        DB::beginTransaction();
        try {
            $push = DokumenMoa::find($data['id']);

            if (isset($push->file_moa)) {

                $oldFilePath = public_path() . '/' . $push->file_path . $push->file_moa;

                // Delete the old file
                if (File::exists($oldFilePath)) {
                    unlink($oldFilePath);
                }
            }

            $push->delete();

            DB::commit();
            $result['is_valid'] = true;
            createLog($data, $data['user_id'], 'DELETE DOKUMEN MOA');
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
            DB::rollBack();
        }

        return response()->json($result);
    }
    public function execUploadFile(Request $request)
    {
        $file = $request->file('file');
        // echo '<pre>';
        // print_r($file);die;
        $result['is_valid'] = false;
        $this->validate($request, [
            'file' => 'required|file|max:100000',
        ]);
        if ($request->hasFile('file')) {
            $path = $file->store('file', ['disk' => 'my_files']);
            $result['is_valid'] = true;
            $result['path'] = $path;
        } else {
            $result['message'] = 'Data Gagal Diupload';
        }
        return response()->json($result);
    }

    public function showDataMou(Request $request)
    {
        $data = $request->all();
        return view('page.mou.dokumen_moa.data_template', $data);
    }
    public function showDataKategori(Request $request)
    {
        $data = $request->all();
        return view('page.mou.dokumen_moa.data_kategori', $data);
    }
    public function showDataLevel(Request $request)
    {
        $data = $request->all();
        return view('page.mou.dokumen_moa.data_level', $data);
    }
    public function showDataProdi(Request $request)
    {
        $data = $request->all();
        return view('page.mou.dokumen_moa.data_prodi', $data);
    }

    public function getDataMoa()
    {
        $result['is_valid'] = false;

        try {
            DB::enableQueryLog();
            $result['data'] = [];
            $datadb = DokumenMoa::with(['doc_mou', 'LevelDocMoa', 'KategoriMoa', 'JenisMoa', 'RelevansiProdiMoa'])->orderBy('tanggal_dibuat', 'desc');
            $result['data'] = $datadb->get()->toArray();
            $result['is_valid'] = true;
            return response()->json($result);
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
        }
    }

    public function getDetailDataMobile(Request $request)
    {
        $result['is_valid'] = false;

        try {
            DB::enableQueryLog();
            $data = $request->all();
            $datadb = DokumenMoa::with(['doc_mou', 'LevelDocMoa', 'KategoriMoa', 'JenisMoa', 'RelevansiProdiMoa'])
                ->where('id', $data['id']);
            $result['data'] = $datadb->first();
            $result['is_valid'] = true;
            return response()->json($result);
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
        }
    }
    public function updateDataMoa(Request $request)
    {
        $result['is_valid'] = false;
        $todayDate = date('Y-m-d');
        $nomor_moa = [];
        try {
            DB::enableQueryLog();
            // select data
            $datadb = DokumenMoa::where('tanggal_berakhir', '<', $todayDate)->where('status', 'AKTIF')->get();

            foreach ($datadb as $key => $value) {
                $nomor_moa[] = $value->nomor_moa;
            }

            // update data
            $datadb = DokumenMoa::whereIn('nomor_moa', $nomor_moa)->update([
                'status' => 'TIDAK AKTIF'
            ]);

            $result['message'] = [
                'nomor_moa' => $nomor_moa,
                'status' => 'TIDAK AKTIF'
            ];
            $result['is_valid'] = true;
            return response()->json($result);
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
        }
    }

    public function getDataMoaWithNomorMou(Request $request)
    {

        $result['is_valid'] = false;

        try {
            DB::enableQueryLog();
            $result['data'] = [];
            $datadb = DokumenMoa::with(['LevelDocMoa', 'KategoriMoa', 'JenisMoa'])->where('nomor_mou', $request->nomor_mou)
                ->orderBy('tanggal_dibuat', 'desc');

            $data_prodi = Prodi::get();
            $data_gabungan = [];

            foreach ($datadb->get() as $key => $value) {
                $data_gabungan[$key]['id'] = $value->id;
                $data_gabungan[$key]['nomor_moa'] = $value->nomor_moa;
                $data_gabungan[$key]['nomor_mou'] = $value->nomor_mou;
                $data_gabungan[$key]['file_moa'] = $value->file_moa;
                $data_gabungan[$key]['judul_moa'] = $value->judul_moa;
                $data_gabungan[$key]['kerja_sama_dengan'] = $value->kerja_sama_dengan;
                $data_gabungan[$key]['tanggal_dibuat'] = $value->tanggal_dibuat;
                $data_gabungan[$key]['tanggal_berakhir'] = $value->tanggal_berakhir;
                $data_gabungan[$key]['status'] = $value->status;
                $data_gabungan[$key]['relevansi_prodi'] = $value->relevansi_prodi == null ? [] : $data_prodi->whereIn('id', json_decode($value->relevansi_prodi))->pluck('nama_prodi')->toArray();
                $data_gabungan[$key]['jenis_doc'] = $value->JenisMoa->nama_jenis;
                $data_gabungan[$key]['jenis_doc_id'] = $value->JenisMoa->id;
                $data_gabungan[$key]['level_moa'] = $value->LevelDocMoa->nama_level;
                $data_gabungan[$key]['level_moa_id'] = $value->LevelDocMoa->id;
                $data_gabungan[$key]['kategori_moa'] = $value->KategoriMoa->nama_kategori;
                $data_gabungan[$key]['kategori_moa_id'] = $value->KategoriMoa->id;
            }
            $result['data'] = $data_gabungan;
            $result['is_valid'] = true;
            return response()->json($result);
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
        }
    }
    public function updateData(Request $request)
    {

        $result['is_valid'] = false;

        try {
            DB::enableQueryLog();
            $result['data'] = [];
            $datadb = DokumenMoa::find($request->id);
            $datadb->nomor_mou = null;
            // save
            $datadb->save();
            $result['data'] = $datadb;
            // dd($result['data']);
            $result['is_valid'] = true;
            return response()->json($result);
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
        }
    }

    public function getDataProdi()
    {

        $result['is_valid'] = false;

        try {
            DB::enableQueryLog();
            $result['data'] = [];
            $datadb = Prodi::get();
            $result['data'] = $datadb;
            // dd($result['data']);
            $result['is_valid'] = true;
            return response()->json($result);
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
        }
    }
}
