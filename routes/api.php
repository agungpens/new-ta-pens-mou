<?php

use App\Http\Controllers\api\ApiDashboardController;
use App\Http\Controllers\api\ApiDokumenMoaController;
use App\Http\Controllers\api\DokumenMouController;
use App\Http\Controllers\api\JenisMouController;
use App\Http\Controllers\api\KategoriMouController;
use App\Http\Controllers\api\KegiatanController;
use App\Http\Controllers\api\LevelingMouController;
use App\Http\Controllers\api\LoginController;
use App\Http\Controllers\api\LogUserController;
use App\Http\Controllers\api\MasterTemplateDocController;
use App\Http\Controllers\api\ProdiController;
use App\Http\Controllers\api\ProfileController;
use App\Http\Controllers\api\RoleController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\web\DokumenMoaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('profile/loadFormAuth', [ProfileController::class, 'loadFormAuth'])->name('profile/loadFormAuth');
Route::post('profile/submit', [ProfileController::class, 'submit'])->name('profile/submit');

// user
Route::get('user/getData', [UserController::class, 'getData'])->name('user/getData');
Route::post('user/submit', [UserController::class, 'submit'])->name('user/submit');
Route::post('user/delete', [UserController::class, 'delete'])->name('user/delete');
Route::get('user/filter', [UserController::class, 'filter'])->name('user/filter');
// Kategori MOU
Route::post('kategori-doc/getData', [KategoriMouController::class, 'getData'])->name('kategori-doc/getData');
Route::post('kategori-doc/submit', [KategoriMouController::class, 'submit'])->name('kategori-doc/submit');
Route::post('kategori-doc/delete', [KategoriMouController::class, 'delete'])->name('kategori-doc/delete');
Route::get('kategori-doc/filter', [KategoriMouController::class, 'filter'])->name('kategori-doc/filter');
Route::post('kategori-doc/ubah', [KategoriMouController::class, 'ubah'])->name('kategori-doc/ubah');

// Leveling MOU
Route::post('level-doc/getData', [LevelingMouController::class, 'getData'])->name('level-doc/getData');
Route::post('level-doc/submit', [LevelingMouController::class, 'submit'])->name('level-doc/submit');
Route::post('level-doc/delete', [LevelingMouController::class, 'delete'])->name('level-doc/delete');
Route::get('level-doc/filter', [LevelingMouController::class, 'filter'])->name('level-doc/filter');
Route::post('level-doc/ubah', [LevelingMouController::class, 'ubah'])->name('level-doc/ubah');

// Jenis MOU
Route::get('jenis-doc/getData', [JenisMouController::class, 'getData'])->name('jenis-doc/getData');
Route::post('jenis-doc/submit', [JenisMouController::class, 'submit'])->name('jenis-doc/submit');
Route::post('jenis-doc/delete', [JenisMouController::class, 'delete'])->name('jenis-doc/delete');
Route::get('jenis-doc/filter', [JenisMouController::class, 'filter'])->name('jenis-doc/filter');
Route::post('jenis-doc/ubah', [JenisMouController::class, 'ubah'])->name('jenis-doc/ubah');
// ROLE USER
Route::get('role/getData', [RoleController::class, 'getData'])->name('role/getData');
Route::post('role/submit', [RoleController::class, 'submit'])->name('role/submit');
Route::post('role/delete', [RoleController::class, 'delete'])->name('role/delete');
Route::get('role/filter', [RoleController::class, 'filter'])->name('role/filter');

// PRODI
Route::post('prodi/getData', [ProdiController::class, 'getData'])->name('prodi/getData');
Route::post('prodi/submit', [ProdiController::class, 'submit'])->name('prodi/submit');
Route::post('prodi/delete', [ProdiController::class, 'delete'])->name('prodi/delete');
Route::get('prodi/filter', [ProdiController::class, 'filter'])->name('prodi/filter');

// MASTER TEMPLATE DOCUMENT
Route::get('master-template-doc/getData', [MasterTemplateDocController::class, 'getData'])->name('master-template-doc/getData');
Route::post('master-template-doc/submit', [MasterTemplateDocController::class, 'submit'])->name('master-template-doc/submit');
Route::post('master-template-doc/delete', [MasterTemplateDocController::class, 'delete'])->name('master-template-doc/delete');
Route::get('master-template-doc/filter', [MasterTemplateDocController::class, 'filter'])->name('master-template-doc/filter');
Route::post('master-template-doc/execUploadFile', [MasterTemplateDocController::class, 'execUploadFile'])->name('master-template-doc/execUploadFile');

// MOU DOCUMENT
Route::post('dokumen-mou/getData', [DokumenMouController::class, 'getData'])->name('dokumen-mou/getData');
Route::post('dokumen-mou/submit', [DokumenMouController::class, 'submit'])->name('dokumen-mou/submit');
Route::post('dokumen-mou/delete', [DokumenMouController::class, 'delete'])->name('dokumen-mou/delete');
Route::get('dokumen-mou/filter', [DokumenMouController::class, 'filter'])->name('dokumen-mou/filter');
Route::post('dokumen-mou/ubah', [DokumenMouController::class, 'ubah'])->name('dokumen-mou/ubah');
Route::post('dokumen-mou/execUploadFile', [DokumenMouController::class, 'execUploadFile'])->name('dokumen-mou/execUploadFile');

// MOA DOCUMENT
Route::post('dokumen-moa/getData', [ApiDokumenMoaController::class, 'getData'])->name('dokumen-moa/getData');
Route::post('dokumen-moa/submit', [ApiDokumenMoaController::class, 'submit'])->name('dokumen-moa/submit');
Route::post('dokumen-moa/updated', [ApiDokumenMoaController::class, 'updated'])->name('dokumen-moa/updated');
Route::post('dokumen-moa/delete', [ApiDokumenMoaController::class, 'delete'])->name('dokumen-moa/delete');
Route::post('dokumen-moa/execUploadFile', [ApiDokumenMoaController::class, 'execUploadFile'])->name('dokumen-moa/execUploadFile');
Route::post('dokumen-moa/showDataMou', [ApiDokumenMoaController::class, 'showDataMou'])->name('dokumen-moa/showDataMou');
Route::post('dokumen-moa/showDataKategori', [ApiDokumenMoaController::class, 'showDataKategori'])->name('dokumen-moa/showDataKategori');
Route::post('dokumen-moa/showDataLevel', [ApiDokumenMoaController::class, 'showDataLevel'])->name('dokumen-moa/showDataLevel');
Route::post('dokumen-moa/showDataProdi', [ApiDokumenMoaController::class, 'showDataProdi'])->name('dokumen-moa/showDataProdi');
Route::post('dokumen-moa/getDataMoaWithNomorMou', [ApiDokumenMoaController::class, 'getDataMoaWithNomorMou'])->name('dokumen-moa/getDataMoaWithNomorMou');
Route::post('dokumen-moa/updateData', [ApiDokumenMoaController::class, 'updateData'])->name('dokumen-moa/updateData');
Route::post('dokumen-moa/getDataProdi', [ApiDokumenMoaController::class, 'getDataProdi'])->name('dokumen-moa/getDataProdi');

// KEGIATAN
Route::post('kegiatan/getData', [KegiatanController::class, 'getData'])->name('kegiatan/getData');
Route::post('kegiatan/submit', [KegiatanController::class, 'submit'])->name('kegiatan/submit');
Route::post('kegiatan/updated', [KegiatanController::class, 'updated'])->name('kegiatan/updated');
Route::post('kegiatan/delete', [KegiatanController::class, 'delete'])->name('kegiatan/delete');
Route::post('kegiatan/deleteDataLampiran', [KegiatanController::class, 'deleteDataLampiran'])->name('kegiatan/deleteDataLampiran');
Route::post('kegiatan/execUploadFile', [KegiatanController::class, 'execUploadFile'])->name('kegiatan/execUploadFile');
Route::post('kegiatan/showDataMou', [KegiatanController::class, 'showDataMou'])->name('kegiatan/showDataMou');
Route::post('kegiatan/showDataKategori', [KegiatanController::class, 'showDataKategori'])->name('kegiatan/showDataKategori');
Route::post('kegiatan/showDataLevel', [KegiatanController::class, 'showDataLevel'])->name('kegiatan/showDataLevel');
Route::post('kegiatan/showDataProdi', [KegiatanController::class, 'showDataProdi'])->name('kegiatan/showDataProdi');
Route::post('kegiatan/showDataMoa', [KegiatanController::class, 'showDataMoa'])->name('kegiatan/showDataMoa');
Route::post('kegiatan/getDataMoa', [KegiatanController::class, 'getDataMoa'])->name('kegiatan/getDataMoa');
Route::post('kegiatan/searchDataByInstansi', [KegiatanController::class, 'searchDataByInstansi'])->name('kegiatan/searchDataByInstansi');


// Log User
Route::post('log-user/getData', [LogUserController::class, 'getData'])->name('log-user/getData');

// Dashboard
Route::post('dashboard/getJumlahData', [ApiDashboardController::class, 'getJumlahData'])->name('dashboard/getJumlahData');


// MOBILE API
// Login User With API
Route::post('login/loginApi', [LoginController::class, 'loginApi']);
Route::post('login/getDataUser', [LoginController::class, 'getDataUser'])->middleware("auth:sanctum");
Route::post('login/getDataDetailUser', [LoginController::class, 'getDataDetailUser']);

Route::get('prodi/getDataForMobile', [ProdiController::class, 'getDataForMobile']);
// MOU DOCUMENT
Route::get('mobile/dokumen-mou/getData', [DokumenMouController::class, 'getDataMobile']);
Route::get('mobile/dokumen-mou/getDetailDataMobile', [DokumenMouController::class, 'getDetailDataMobile']);
// MOA DOCUMENT
Route::get('mobile/dokumen-moa/getData', [ApiDokumenMoaController::class, 'getDataMoa']);
Route::get('mobile/dokumen-moa/getDetailDataMobile', [ApiDokumenMoaController::class, 'getDetailDataMobile']);

// KEGIATAN
Route::get('mobile/kegiatan/getDataInstansi', [KegiatanController::class, 'getDataInstansi']);


// CEK UPDATE DATA
Route::get('updateDataMou', [DokumenMouController::class, 'updateDataMou']);
// CEK UPDATE DATA
Route::get('updateDataMoa', [ApiDokumenMoaController::class, 'updateDataMoa']);
