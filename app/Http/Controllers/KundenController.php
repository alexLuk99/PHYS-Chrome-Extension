<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kunde;
use Illuminate\Support\Facades\DB;
class KundenController extends Controller
{
    //
    function show(){
        $data = Kunde::all();
        return view('list',['kunden'=>$data]);
    }

    public function search(Request $request){
    $search = $request->input('search');

    $data = DB::table('kunden')
        ->where('Pseudonym', 'LIKE', '%'.$search.'%')
        ->orWhere('ID', 'LIKE', '%'.$search.'%')
        ->get();

    return view('list', ['kunden' => $data]);
    }
}
