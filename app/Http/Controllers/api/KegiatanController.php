<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\DokumenMoa;
use App\Models\DokumenMou;
use App\Models\Kegiatan;
use App\Models\LampiranKegiatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

use function PHPUnit\Framework\isNan;

class KegiatanController extends Controller
{
    public function getTableName()
    {
        return "kegiatan";
    }

    public function getData()
    {
        DB::enableQueryLog();
        $data['data'] = [];
        $data['recordsTotal'] = 0;
        $data['recordsFiltered'] = 0;
        $datadb =  Kegiatan::with(['Lampiran']);
        // dd($datadb->get()->toArray());
        if (isset($_POST)) {
            $data['recordsTotal'] = $datadb->get()->count();
            if (isset($_POST['search']['value'])) {
                $keyword = $_POST['search']['value'];
                $datadb->where(function ($query) use ($keyword) {
                    $query->where('nomor_mou', 'LIKE', '%' . $keyword . '%');
                    $query->where('instansi', 'LIKE', '%' . $keyword . '%');
                    // $query->Orwhere('status', 'LIKE', '%' . $keyword . '%');
                });
            }

            if (isset($_POST['order'][0]['column'])) {
                $datadb->orderBy('id', $_POST['order'][0]['dir']);
            }
            $data['recordsFiltered'] = $datadb->get()->count();

            if (isset($_POST['length'])) {
                $datadb->limit($_POST['length']);
            }
            if (isset($_POST['start'])) {
                $datadb->offset($_POST['start']);
            }
        }

        // Mengambil data dari database dan melakukan unserialize pada kolom nomor_moa
        $data['data'] = $datadb->get()->map(function ($item) {
            $item['nomor_moa'] = json_decode($item['nomor_moa']);
            return $item;
        })->toArray();

        $data['draw'] = $_POST['draw'];
        $query = DB::getQueryLog();

        return response()->json($data);
    }



    public function getDetailData($id)
    {
        DB::enableQueryLog();

        // Mengambil data dari tabel Kegiatan dengan relasi
        $datadb = Kegiatan::with(['NomorDocMou', 'Lampiran'])->where('id', $id)->first();
        // Melakukan unserialize pada nilai kolom nomor_moa
        $data_array = json_decode($datadb->nomor_moa);
        if ($data_array == null) {
            return response()->json($datadb->toArray());
        }
        // Menambahkan data array ke dalam data yang akan di-DD
        $data = $datadb->toArray();
        $data['nomor_moa'] = $data_array;
        // select DokumenMoa where id in (data_array)

        $data['data_moa'] = DokumenMoa::whereIn('nomor_moa', $data_array)->get();

        // Mengambil log query
        $query = DB::getQueryLog();

        // Mengembalikan response JSON dengan data
        return response()->json($data);
    }


    public function submit(Request $request)
    {
        $data = $request->post();
        // dd($data['data']['instansi']);
        $data_record = array();
        $nomor_moa = null;
        $nomor_mou = null;


        if ( $data['data']['nomor_mou'] == null || (isset($data['nomor_moa']) && $data['nomor_moa'] == null)) {
            return response()->json([
                'status' => 422,
                'message' => 'Data Nomor MOU / MOA Tidak boleh kosong , isi salah satu saja!',
            ]);
        }
        if (!isset($data['data_lampiran'])) {
            return response()->json([
                'status' => 422,
                'message' => 'Lampiran Belum Anda Isi!',

            ]);
        }

        // begin transaction
        DB::beginTransaction();
        try {
            if (isset($data['data']['nomor_mou'])) {
                $nomor_mou = explode(' - ', $data['data']['nomor_mou']);
                $nomor_mou = $nomor_mou[0];
            }
            if (isset($data['nomor_moa'])) {
                // $nomor_moa = serialize($data['nomor_moa']);
                $nomor_moa = json_encode($data['nomor_moa']);
            }
            if (isset($data['data']['kumpulan_nomor_moa']) && $data['data']['kumpulan_nomor_moa'] != null) {
                // $nomor_moa = serialize($data['nomor_moa']);
                $nomor_moa = json_encode($data['data']['kumpulan_nomor_moa']);
            }




            $push = $data['data']['id'] == '' ? new Kegiatan() :  Kegiatan::find($data['data']['id']);

            $push->id = $data['data']['id'];
            $push->nomor_mou = $nomor_mou;
            $push->nomor_moa = $nomor_moa;
            $push->instansi = $data['data']['instansi'];
            $push->kegiatan = $data['data']['kegiatan'];
            $push->save();
            $data_record[] = [
                'id' => $data['data']['id'],
                'nomor_mou' => $data['data']['nomor_mou'],
                'nomor_moa' => $nomor_moa,
                'kegiatan' => $data['data']['kegiatan'],
            ];
            if (isset($data['data_lampiran'])) {
                foreach ($data['data_lampiran'] as $key => $value) {
                    $imageName = null;
                    $dbpathlamp = null;

                    if ($value['id'] != null && isset($value['file'])) {
                        $cek_file = LampiranKegiatan::find($value['id']);
                        $oldFilePath = public_path() . '/' . $cek_file->file_path . $cek_file->file;
                        // Delete the old file
                        if (File::exists($oldFilePath)) {
                            unlink($oldFilePath);
                        }
                    }

                    if (isset($value['file'])) {
                        $image = $value['file'];

                        // Menggunakan nama file yang diposting
                        $imageName = $value['file_name'];

                        // New file directory
                        $dir = 'lampiran/';
                        $dir .= date('Y') . '/' . date('m');
                        $pathlamp = public_path() . '/' . $dir . '/';

                        // Create the directory if it doesn't exist
                        if (!File::isDirectory($pathlamp)) {
                            File::makeDirectory($pathlamp, 0777, true, true);
                        }

                        // Save the new file
                        if ($value['file'] != '') {
                            uploadFileFromBlobString($pathlamp, $imageName, $image);
                        } else {
                            File::put($pathlamp . $imageName, base64_decode($image));
                        }

                        $dbpathlamp = '/' . $dir . '/';
                    }


                    $push_lampiran = $value['id'] == null ?  new LampiranKegiatan() : LampiranKegiatan::find($value['id']);
                    $push_lampiran->kegiatan_id = $push->id;
                    if ($value['id'] == null || isset($value['file'])) {
                        $push_lampiran->file = $imageName;
                        $push_lampiran->file_path = $dbpathlamp;
                    }
                    $push_lampiran->keterangan = $value['keterangan'];
                    $push_lampiran->save();
                }
            }



            // dd($data_record);
            DB::commit();
            $result['is_valid'] = true;
            createLog($data_record, $data['user_id'], 'TAMBAH KEGIATAN');
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
            DB::rollBack();
        }

        return response()->json($result);
    }


    public function delete(Request $request)
    {
        $data = $request->post();
        $result['is_valid'] = false;

        DB::beginTransaction();

        try {
            $push = Kegiatan::find($data['id']);
            $push_lampiran = LampiranKegiatan::where('kegiatan_id', $data['id'])->get();

            foreach ($push_lampiran as $lampiran) {
                $oldFilePath = public_path() . '/' . $lampiran->file_path . $lampiran->file;

                // Delete the old file
                if (File::exists($oldFilePath)) {
                    unlink($oldFilePath);
                }

                // Delete the record
                $lampiran->delete();
            }

            $push->delete();

            DB::commit();
            $result['is_valid'] = true;
            createLog($data, $data['user_id'], 'DELETE KEGIATAN DAN LAMPIRANYA');
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
            DB::rollBack();
        }

        return response()->json($result);
    }

    public function deleteDataLampiran(Request $request)
    {

        $data = $request->post();
        // dd($data);

        $result['is_valid'] = false;
        DB::beginTransaction();
        try {
            $push = LampiranKegiatan::find($data['id']);

            if (isset($push->file)) {

                $oldFilePath = public_path() . '/' . $push->file_path . $push->file;

                // Delete the old file
                if (File::exists($oldFilePath)) {
                    unlink($oldFilePath);
                }
            }

            $push->delete();

            DB::commit();
            $result['is_valid'] = true;
            createLog($data, $data['user_id'], 'DELETE LAMPIRAN KEGIATAN');
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
        return view('page.mou.kegiatan.data_mou', $data);
    }
    public function showDataMoa(Request $request)
    {
        $data = $request->all();
        return view('page.mou.kegiatan.data_moa', $data);
    }
    public function getDataMoa(Request $request)
    {
        $data = $request->all();
        $data['data'] = DokumenMoa::where('nomor_mou', $data['nomor_mou'])->get();
        return response()->json($data);
    }
    public function searchDataByInstansi(Request $request)
    {
        $data = $request->all();
        $searchTerm = $data['instansi'];

        $data['data'] = DokumenMou::where('kerja_sama_dengan', 'like', '%' . $searchTerm . '%')
            ->with(['DokumenMoa' => function ($query) use ($searchTerm) {
                // Termasuk DokumenMoa yang sesuai dengan pencarian
                $query->where('kerja_sama_dengan', 'like', '%' . $searchTerm . '%');
            }])
            ->get()->toArray();

        $data['data_mou'] = DokumenMou::where('kerja_sama_dengan', 'like', '%' . $searchTerm . '%')->get()->toArray();
        $data['data_moa'] = DokumenMoa::where('kerja_sama_dengan', 'like', '%' . $searchTerm . '%')->get()->toArray();

        return response()->json($data);
    }





    // MOBILE
    public function getDataInstansi()
    {
        $data['is_valid'] = false;
        $data['data_instansi'] = [];


        try {
            $data['data_dokumen'] = DokumenMou::with(['DokumenMoa'])->get()->toArray();
            foreach ($data['data_dokumen'] as $dokumenMou) {
                $data['data_instansi'][] = $dokumenMou['kerja_sama_dengan'];
                foreach ($dokumenMou['dokumen_moa'] as $dokumenMoa) {
                    $data['data_instansi'][] = $dokumenMoa['kerja_sama_dengan'];
                }
            }
            $data['data_instansi'] = array_values(array_unique($data['data_instansi']));
            $data['is_valid'] = true;
        } catch (\Throwable $th) {
            $data['message'] = $th->getMessage();
        }

        return response()->json($data);
    }
}
