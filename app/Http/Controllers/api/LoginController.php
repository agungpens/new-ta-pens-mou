<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    public function getTableName()
    {
        return "users";
    }

    public function getDataUser()
    {
        $result['is_valid'] = false;

        try {
            $result['data'] = User::all();
            $result['is_valid'] = true;
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
        }

        return response()->json($result);
    }
    public function getDataDetailUser(Request $request)
    {
        $data = $request->all();
        // return response()->json($data);
        $result['is_valid'] = false;

        try {
            $result['data'] = User::with(['DetailUser', 'Roles', 'Prodis'])->find($data['id']);
            $result['is_valid'] = true;
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
        }

        return response()->json($result);
    }
    public function loginApi(Request $request)
    {
        $result['is_valid'] = false;

        try {

            $loginData = $request->validate([
                'username' => 'required',
                'password' => 'required'
            ]);

            // cek apakah ada datanya tidak di model User
            $user = User::where('username', $loginData['username'])->first();
            if (!$user) {
                $result['message'] = "Username tidak ditemukan";
                $result['is_valid'] = false;
                return response()->json($result);
            }

            // cek apakah passwordnya sama
            if (!Auth::attempt($loginData)) {
                $result['message'] = "Password salah";
                $result['is_valid'] = false;
                return response()->json($result);
            }

            $token = Auth::user()->createToken('authToken')->plainTextToken;


            $result['data'] = Auth::user();
            $result['token'] = $token;



            $result['is_valid'] = true;
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
        }

        return response()->json($result);
    }
}
