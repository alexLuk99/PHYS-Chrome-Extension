<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KundenController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});

Route::get('/',[KundenController::class, 'show']);
Route::get('/kunden/search', [KundenController::class, 'search'])->name('kunden.search');

