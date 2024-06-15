<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\DokumenMou;
use App\Models\JenisDoc;
use App\Models\KategoriDoc;
use App\Models\LevelingMou;
use App\Models\Prodi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\IOFactory;


class DokumenMouController extends Controller
{
    public function getTableName()
    {
        return "dokumen_mou";
    }

    public function getData()
    {
        DB::enableQueryLog();

        $data['data'] = [];
        $data['recordsTotal'] = 0;
        $data['recordsFiltered'] = 0;

        $datadb = DokumenMou::with(['LevelDocMou', 'KategoriMou', 'JenisMou'])
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
            $data_gabungan[$key]['level_mou_id'] = $value->LevelDocMou->id;
            $data_gabungan[$key]['kategori_mou'] = $value->KategoriMou->nama_kategori;
            $data_gabungan[$key]['kategori_mou_id'] = $value->KategoriMou->id;
        }

        // Jumlah total data sebelum filtering
        $data['recordsTotal'] = count($data_gabungan);

        // Proses filtering dan pencarian
        if (isset($_POST)) {
            // Menghitung kembali jumlah data setelah filtering
            $filteredData = $data_gabungan;
            // dd($data_gabungan);
            if (isset($_POST['search']['value']) && !empty($_POST['search']['value'])) {
                $keyword = $_POST['search']['value'];
                $filteredData = array_filter($filteredData, function ($item) use ($keyword) {
                    // dd(strtolower($keyword));
                    return strpos(strtolower($item['nomor_mou']), strtolower($keyword)) !== false ||
                        strpos(strtolower($item['file_mou']), strtolower($keyword)) !== false ||
                        strpos(strtolower($item['kategori_mou']), strtolower($keyword)) !== false ||
                        strpos(strtolower($item['level_mou']), strtolower($keyword)) !== false ||
                        strpos(strtolower($item['kerja_sama_dengan']), strtolower($keyword)) !== false ||
                        strpos(strtolower($item['judul_mou']), strtolower($keyword)) !== false ||
                        strpos(strtolower($item['status']), strtolower($keyword)) !== false;
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

            // Filter by level_mou
            if (isset($_POST['level']) && $_POST['level'] !== '') {
                $filteredData = array_filter($filteredData, function ($item) {
                    return $_POST['level'] === $item['level_mou'];
                });
            }

            // Filter by kategori_mou
            if (isset($_POST['kategori']) && $_POST['kategori'] !== '') {
                // dd($_POST['kategori']);
                $filteredData = array_filter($filteredData, function ($item) {
                    return $_POST['kategori'] == $item['kategori_mou'];
                });
            }
            if (isset($_POST['status']) && $_POST['status'] !== '') {
                $filteredData = array_filter($filteredData, function ($item) {
                    return $_POST['status'] === $item['status'];
                });
            }
            if (isset($_POST['judul_mou']) && $_POST['judul_mou'] !== '') {
                $filteredData = array_filter($filteredData, function ($item) {
                    return $_POST['judul_mou'] === $item['judul_mou'];
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
        $datadb = DokumenMou::with(['LevelDocMou', 'KategoriMou', 'JenisMou'])->where('id', $id);
        $data = $datadb->first();
        $query = DB::getQueryLog();
        return response()->json($data);
    }

    public function ubah(Request $request)
    {

        $data = $request->all();
        $data['is_valid'] = false;
        try {
            $jenis = new JenisDoc();
            $leveling = new LevelingMou();
            $kategori = new KategoriDoc();
            $prodi = new Prodi();

            $data['list_jenis'] = $jenis->get();
            $data['list_level'] = $leveling->get();
            $data['list_kategori'] = $kategori->get();
            $data['list_prodi'] = $prodi->get();
            $data['data'] = $this->getDetailData($data['id'])->original;
            $data['is_valid'] = true;
        } catch (\Throwable $th) {
            $data['message'] = $th->getMessage();
        }

        return response()->json($data);
    }

    public function submit(Request $request)
    {
        $data = $request->post();
        // begin transaction

        DB::beginTransaction();
        try {

            $push = $data['data']['id'] == '' ? new DokumenMou() : DokumenMou::find($data['data']['id']);
            $push->id = $data['data']['id'];
            $push->nomor_mou = $data['data']['nomor_mou'];
            $push->judul_mou = $data['data']['judul_mou'];
            $push->tanggal_dibuat = $data['data']['tanggal_dibuat'];
            $push->tanggal_berakhir = $data['data']['tanggal_berakhir'];
            $push->jenis_doc = $data['data']['jenis'];
            $push->kategori_mou     = $data['data']['kategori'];
            $push->level_mou = $data['data']['level'];
            $push->status = $data['data']['status'];
            $push->relevansi_prodi = json_encode($data['data']['relevansi_prodi']);
            $push->kerja_sama_dengan = $data['data']['kerja_sama_dengan'];

            if (isset($data['data']['file'])) {
                // Gunakan nama file yang diposting
                $imageName = $data['data']['file_name'];

                // New file directory
                $dir = 'file/';
                $dir .= date('Y') . '/' . date('m');
                $pathlamp = public_path() . '/' . $dir . '/';

                // Create the directory if it doesn't exist
                if (!File::isDirectory($pathlamp)) {
                    File::makeDirectory($pathlamp, 0777, true, true);
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

            $push->file_mou = isset($imageName) ? $imageName : $push->file_mou;
            $push->file_path = isset($dbpathlamp) ? $dbpathlamp : $push->file_path;


            $push->save();
            // commit
            $data_record = [
                'id' => $data['data']['id'],
                'nomor_mou' => $data['data']['nomor_mou'],
                'tanggal_dibuat' => $data['data']['tanggal_dibuat'],
                'tanggal_berakhir' => $data['data']['tanggal_berakhir'],
                'status' => $data['data']['status'],
                'kerja_sama_dengan' => $data['data']['kerja_sama_dengan'],

                'jenis_doc' => $data['data']['jenis'],
                'kategori_mou' => $data['data']['kategori'],
                'level_mou' => $data['data']['level'],
                'relevansi_prodi' => $data['data']['relevansi_prodi'],

                'file_mou' =>  isset($imageName) ? $imageName : "",
                'file_path' => isset($dbpathlamp) ?  $dbpathlamp : "",

            ];
            DB::commit();
            $result['is_valid'] = true;

            $data['data']['id'] == '' ? createLog($data_record, $data['user_id'], 'TAMBAH MASTER DOCUMENT') : createLog($data, $data['user_id'], 'UPDATE MASTER DOCUMENT');
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
            $push = DokumenMou::find($data['id']);

            // jika ada maka ambil data dokumen_doc
            $fileToDelete = $push->file_path . $push->file_mou;


            $filePath = public_path($fileToDelete);

            unlink($filePath);

            $push->delete();

            DB::commit();
            $result['is_valid'] = true;
            createLog($data, $data['user_id'], 'DELETE MASTER DOCUMENT');
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

    public function showDataTemplate(Request $request)
    {
        $data = $request->all();
        return view('page.mou.master_document.data_template', $data);
    }


    public function getDataMobile()
    {
        $result['is_valid'] = false;

        try {
            DB::enableQueryLog();
            $result['data'] = [];
            $datadb = DokumenMou::with(['LevelDocMou', 'KategoriMou', 'JenisMou'])
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
                $data_gabungan[$key]['level_mou_id'] = $value->LevelDocMou->id;
                $data_gabungan[$key]['kategori_mou'] = $value->KategoriMou->nama_kategori;
                $data_gabungan[$key]['kategori_mou_id'] = $value->KategoriMou->id;
            }
            $result['data'] = $data_gabungan;
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

            // Fetch the document using 'first()' and handle it properly as an object
            $datadb = DokumenMou::with(['LevelDocMou', 'KategoriMou', 'JenisMou'])
                ->where('id', $data['id'])
                ->orderBy('tanggal_dibuat', 'desc')
                ->first();

            if ($datadb) {
                $data_prodi = Prodi::get();
                $data_gabungan = [];

                // Populate the $data_gabungan array with necessary details
                $data_gabungan['id'] = $datadb->id;
                $data_gabungan['nomor_mou'] = $datadb->nomor_mou;
                $data_gabungan['file_mou'] = $datadb->file_mou;
                $data_gabungan['judul_mou'] = $datadb->judul_mou;
                $data_gabungan['kerja_sama_dengan'] = $datadb->kerja_sama_dengan;
                $data_gabungan['tanggal_dibuat'] = $datadb->tanggal_dibuat;
                $data_gabungan['tanggal_berakhir'] = $datadb->tanggal_berakhir;
                $data_gabungan['status'] = $datadb->status;
                $data_gabungan['relevansi_prodi'] = $datadb->relevansi_prodi == null ? [] : $data_prodi->whereIn('id', json_decode($datadb->relevansi_prodi))->pluck('nama_prodi')->toArray();
                $data_gabungan['jenis_doc'] = $datadb->JenisMou->nama_jenis;
                $data_gabungan['level_mou'] = $datadb->LevelDocMou->nama_level;
                $data_gabungan['level_mou_id'] = $datadb->LevelDocMou->id;
                $data_gabungan['kategori_mou'] = $datadb->KategoriMou->nama_kategori;
                $data_gabungan['kategori_mou_id'] = $datadb->KategoriMou->id;

                $result['data'] = $data_gabungan;
                $result['is_valid'] = true;
            } else {
                $result['message'] = 'Document not found';
            }

            return response()->json($result);
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
            return response()->json($result);
        }
    }


    public function updateDataMou(Request $request)
    {
        $result['is_valid'] = false;
        $todayDate = date('Y-m-d');
        $nomor_mou = [];
        try {
            DB::enableQueryLog();
            // select data
            $datadb = DokumenMou::where('tanggal_berakhir', '<', $todayDate)->where('status', 'AKTIF')->get();

            foreach ($datadb as $key => $value) {
                $nomor_mou[] = $value->nomor_mou;
            }

            // update data
            $datadb = DokumenMou::whereIn('nomor_mou', $nomor_mou)->update([
                'status' => 'TIDAK AKTIF'
            ]);

            $result['message'] = [
                'nomor_mou' => $nomor_mou,
                'status' => 'TIDAK AKTIF'
            ];
            $result['is_valid'] = true;
            return response()->json($result);
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
        }
    }
}
