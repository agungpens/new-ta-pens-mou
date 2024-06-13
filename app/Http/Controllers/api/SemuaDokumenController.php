<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\DokumenMoa;
use App\Models\DokumenMou;
use App\Models\MasterDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpWord\IOFactory;


class SemuaDokumenController extends Controller
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
        $datadb =
        // DokumenMou::with(['LevelDocMou', 'KategoriMou', 'JenisMou'])
        DokumenMoa::with(['LevelDocMoa', 'KategoriMoa', 'JenisMoa', 'doc_mou']);
        // ->leftJoin('dokumen_moa as da', 'dokumen_mou.nomor_mou', '=', 'da.nomor_mou');

        // dd($datadb->get());
        if (isset($_GET)) {
            $data['recordsTotal'] = $datadb->get()->count();
            if (isset($_GET['search']['value'])) {
                $keyword = $_GET['search']['value'];
                $datadb->where(function ($query) use ($keyword) {
                    $query->where('nomor_mou', 'LIKE', '%' . $keyword . '%');
                });
            }
            if (isset($_GET['order'][0]['column'])) {
                $datadb->orderBy('id', $_GET['order'][0]['dir']);
            }
            $data['recordsFiltered'] = $datadb->get()->count();

            if (isset($_GET['length'])) {
                $datadb->limit($_GET['length']);
            }
            if (isset($_GET['start'])) {
                $datadb->offset($_GET['start']);
            }
        }
        $data['data'] = $datadb->get()->toArray();
        // dd($data['data']);
        $data['draw'] = $_GET['draw'];
        $query = DB::getQueryLog();

        dd($data);
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

    public function submit(Request $request)
    {
        $data = $request->post();
        // begin transaction
        DB::beginTransaction();
        try {

            $push = $data['data']['id'] == '' ? new DokumenMou() : DokumenMou::find($data['data']['id']);
            $push->id = $data['data']['id'];
            $push->nomor_mou = $data['data']['nomor_mou'];
            $push->tanggal_dibuat = $data['data']['tanggal_dibuat'];
            $push->tanggal_berakhir = $data['data']['tanggal_berakhir'];
            $push->jenis_doc = $data['data']['jenis'];
            $push->kategori_mou     = $data['data']['kategori'];
            $push->level_mou = $data['data']['level'];
            $push->status = $data['data']['status'];
            $push->kerja_sama_dengan = $data['data']['kerja_sama_dengan'];

            $push->file_mou = $data['data']['dokumen'];
            $push->file_path = $data['data']['dokumen_path'];

            $push->save();
            // commit
            DB::commit();
            $result['is_valid'] = true;
            $data['data']['id'] == '' ? createLog($data, $data['user_id'], 'TAMBAH MASTER DOCUMENT') : createLog($data, $data['user_id'], 'UPDATE MASTER DOCUMENT');
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
            $fileToDelete = $push->file_path;


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
}
