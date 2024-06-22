<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\MasterTemplateDoc;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class MasterTemplateDocController extends Controller
{
    public function getTableName()
    {
        return "master_template_doc";
    }

    public function getData()
    {

        DB::enableQueryLog();
        $data['data'] = [];
        $data['recordsTotal'] = 0;
        $data['recordsFiltered'] = 0;
        $datadb = DB::table($this->getTableName() . ' as m')
            ->leftJoin('jenis_doc as jd', 'jd.id', '=', 'm.jenis_doc_id')
            ->orderBy('m.id')
            ->select([
                'm.*',
                'jd.nama_jenis'
            ]);

        // dd($datadb->get());
        if (isset($_GET)) {
            $data['recordsTotal'] = $datadb->get()->count();
            if (isset($_GET['search']['value'])) {
                $keyword = $_GET['search']['value'];
                $datadb->where(function ($query) use ($keyword) {
                    $query->where('m.nama_template', 'LIKE', '%' . $keyword . '%');
                });
            }
            if (isset($_GET['order'][0]['column'])) {
                $datadb->orderBy('m.id', $_GET['order'][0]['dir']);
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

        return response()->json($data);
    }


    public function getDetailData($id)
    {
        DB::enableQueryLog();
        $datadb = DB::table($this->getTableName() . ' as m')
            ->leftJoin('jenis_doc as jd', 'jd.id', '=', 'm.jenis_doc_id')
            ->orderBy('m.id')
            ->select([
                'm.*',
                'jd.nama_jenis'
            ])->where('m.id', $id);
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

            $push = $data['data']['id'] == '' ? new MasterTemplateDoc() : MasterTemplateDoc::find($data['data']['id']);
            $push->id = $data['data']['id'];
            $push->nama_template = $data['data']['nama_template'];
            $push->jenis_doc_id = $data['data']['nama_jenis'];
            $push->keterangan = $data['data']['keterangan'];

            if (isset($data['data']['file'])) {
                // Generate a new file name
                $imageName = $data['data']['file_name']; // Gunakan nama file yang diposting

                // New file directory
                $dir = 'file/';
                $dir .= date('Y') . '/' . date('m');
                $pathlamp = public_path() . '/' . $dir . '/';

                // Create the directory if it doesn't exist
                if (!File::isDirectory($pathlamp)) {
                    File::makeDirectory($pathlamp, 0777, true, true);
                }

                // Save the new file
                if ($data['data']['tipe'] == 'docx') {
                    uploadFileFromBlobString($pathlamp, $imageName, $data['data']['file']);
                } else {
                    File::put($pathlamp . $imageName, base64_decode($data['data']['file']));
                }

                // Update the database path
                $dbpathlamp = '/' . $dir . '/';
            }

            $push->file = isset($imageName) ? $imageName : $push->file;
            $push->dokumen_path = isset($dbpathlamp) ? $dbpathlamp : $push->dokumen_path;

            $push->save();
            // commit
            $data_record = [
                'id' => $data['data']['id'],
                'nama_template' => $data['data']['nama_template'],
                'tipe_file'     => isset($data['data']['tipe']) ? $data['data']['tipe'] : "",
                'jenis_doc_id' => $data['data']['nama_jenis'],
                'keterangan' => $data['data']['keterangan'],

                'file' =>  isset($imageName) ? $imageName : "",
                'dokumen_path' => isset($dbpathlamp) ?  $dbpathlamp : "",

            ];
            DB::commit();
            $result['is_valid'] = true;
            $data['data']['id'] == '' ? createLog($data_record, $data['user_id'], 'TAMBAH MASTER TEMPLATE DOKUMEN') : createLog($data, $data['user_id'], 'UPDATE MASTER TEMPLATE DOKUMEN');
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
            $push = MasterTemplateDoc::find($data['id']);
            // jika ada maka ambil data dokumen_doc

            $filePath = public_path($push->dokumen_path . $push->file);

            unlink($filePath);

            $push->delete();

            DB::commit();
            $result['is_valid'] = true;
            createLog($data, $data['user_id'], 'DELETE MASTER TEMPLATE DOKUMEN');
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
            $path = $file->store('berkas', ['disk' => 'my_files']);
            $result['is_valid'] = true;
            $result['path'] = $path;
        } else {
            $result['message'] = 'Data Gagal Diupload';
        }
        return response()->json($result);
    }

    public function getDataMobile()
    {
        $result['is_valid'] = false;
        try {
            DB::enableQueryLog();
            $datadb = DB::table($this->getTableName() . ' as m')
                ->leftJoin('jenis_doc as jd', 'jd.id', '=', 'm.jenis_doc_id')
                ->orderBy('m.id')
                ->select([
                    'm.*',
                    'jd.nama_jenis'
                ])->get();


            $result['is_valid'] = true;
            $result['data'] = $datadb;
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
            $datadb = DB::table($this->getTableName() . ' as m')
                ->leftJoin('jenis_doc as jd', 'jd.id', '=', 'm.jenis_doc_id')
                ->orderBy('m.id')
                ->select([
                    'm.*',
                    'jd.nama_jenis'
                ])
                ->where('m.id', $request->id)
                ->get();


            $result['is_valid'] = true;
            $result['data'] = $datadb;
            return response()->json($result);
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
        }
    }
}
