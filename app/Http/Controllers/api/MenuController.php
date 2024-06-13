<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function cariMenu(Request $request)
    {

        $data['data'] = $request->menu;
        // return json
        return response()->json($data);
    }
}
