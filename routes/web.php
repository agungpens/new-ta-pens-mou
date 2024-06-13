<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\web\DashboardController;
use App\Http\Controllers\web\DokumenMoaController;
use App\Http\Controllers\web\DokumenMouController;
use App\Http\Controllers\web\JenisMouController;
use App\Http\Controllers\web\KategoriMouController;
use App\Http\Controllers\web\KegiatanController;
use App\Http\Controllers\web\LevelingMouController;
use App\Http\Controllers\web\LogUserController;
use App\Http\Controllers\web\MasterTemplateDocController;
use App\Http\Controllers\web\ProdiController;
use App\Http\Controllers\web\ProfileController;
use App\Http\Controllers\web\RegistrasiController;
use App\Http\Controllers\web\RoleController;
use App\Http\Controllers\web\UserController;
use Illuminate\Support\Facades\Route;

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

// Login
Route::get('/', [LoginController::class, 'index'])->name('login')->middleware('guest');
Route::post('/login', [LoginController::class, 'authenticate'])->name('signin')->middleware('guest');
Route::get('logout', [LoginController::class, 'logout'])->middleware('auth');

// Registrasi / Create Account
Route::get('registrasi', [RegistrasiController::class, 'index'])->name('registrasi')->middleware('guest');
Route::post('registrasi/submit', [RegistrasiController::class, 'submit'])->middleware('guest');

// Dashboard
Route::get('home', [DashboardController::class, 'index'])->middleware('auth');

// Profile
Route::get('profile/detail', [ProfileController::class, 'index'])->middleware('auth');
// Route::post('profile/detail', [ProdiController::class, 'submit'])->middleware('auth');
// Route::post('profile/auth/detail', [ProdiController::class, 'updateAuth'])->middleware('auth');

// USER
Route::get('user', [UserController::class, 'index'])->name('user')->middleware('auth');
Route::get('user/add', [UserController::class, 'add'])->name('user/add')->middleware('auth');
Route::get('user/ubah', [UserController::class, 'ubah'])->name('user/ubah')->middleware('auth');


// KATEGORI MOU
Route::get('kategori-doc', [KategoriMouController::class, 'index'])->name('kategori-doc')->middleware('auth');
Route::get('kategori-doc/index', [KategoriMouController::class, 'index'])->name('kategori-doc/index')->middleware('auth');
Route::get('kategori-doc/add', [KategoriMouController::class, 'add'])->name('kategori-doc/add')->middleware('auth');
Route::get('kategori-doc/ubah', [KategoriMouController::class, 'ubah'])->name('kategori-doc/ubah')->middleware('auth');

// JENIS MOU
Route::get('jenis-doc', [JenisMouController::class, 'index'])->name('jenis-doc')->middleware('auth');
Route::get('jenis-doc/index', [JenisMouController::class, 'index'])->name('jenis-doc/index')->middleware('auth');
Route::get('jenis-doc/add', [JenisMouController::class, 'add'])->name('jenis-doc/add')->middleware('auth');
Route::get('jenis-doc/ubah', [JenisMouController::class, 'ubah'])->name('jenis-doc/ubah')->middleware('auth');

// LEVELLING MOU
Route::get('level-doc', [LevelingMouController::class, 'index'])->name('level-doc')->middleware('auth');
Route::get('level-doc/index', [LevelingMouController::class, 'index'])->name('level-doc/index')->middleware('auth');
Route::get('level-doc/add', [LevelingMouController::class, 'add'])->name('level-doc/add')->middleware('auth');
Route::get('level-doc/ubah', [LevelingMouController::class, 'ubah'])->name('level-doc/ubah')->middleware('auth');

// ROLE MOU
Route::get('role', [RoleController::class, 'index'])->name('role')->middleware('auth');
Route::get('role/index', [RoleController::class, 'index'])->name('role/index')->middleware('auth');
Route::get('role/add', [RoleController::class, 'add'])->name('role/add')->middleware('auth');
Route::get('role/ubah', [RoleController::class, 'ubah'])->name('role/ubah')->middleware('auth');

// PRODI MOU
Route::get('prodi', [ProdiController::class, 'index'])->name('prodi')->middleware('auth');
Route::get('prodi/index', [ProdiController::class, 'index'])->name('prodi/index')->middleware('auth');
Route::get('prodi/add', [ProdiController::class, 'add'])->name('prodi/add')->middleware('auth');
Route::get('prodi/ubah', [ProdiController::class, 'ubah'])->name('prodi/ubah')->middleware('auth');

// MASTER TEMPLATE DOCUMENT
Route::get('master-template-doc', [MasterTemplateDocController::class, 'index'])->name('master-template-doc')->middleware('auth');
Route::get('master-template-doc/index', [MasterTemplateDocController::class, 'index'])->name('master-template-doc/index')->middleware('auth');
Route::get('master-template-doc/add', [MasterTemplateDocController::class, 'add'])->name('master-template-doc/add')->middleware('auth');
Route::get('master-template-doc/ubah', [MasterTemplateDocController::class, 'ubah'])->name('master-template-doc/ubah')->middleware('auth');

// MASTER DOCUMENT
Route::get('dokumen-mou', [DokumenMouController::class, 'index'])->name('dokumen-mou')->middleware('auth');
Route::get('dokumen-mou/index', [DokumenMouController::class, 'index'])->name('dokumen-mou/index')->middleware('auth');
Route::get('dokumen-mou/add', [DokumenMouController::class, 'add'])->name('dokumen-mou/add')->middleware('auth');


// KEGIATAN
Route::get('kegiatan', [KegiatanController::class, 'index'])->name('kegiatan')->middleware('auth');
Route::get('kegiatan/index', [KegiatanController::class, 'index'])->name('kegiatan/index')->middleware('auth');
Route::get('kegiatan/add', [KegiatanController::class, 'add'])->name('kegiatan/add')->middleware('auth');
Route::get('kegiatan/ubah', [KegiatanController::class, 'ubah'])->name('kegiatan/ubah')->middleware('auth');


// MOA DOCUMENT
Route::get('dokumen-moa', [DokumenMoaController::class, 'index'])->name('dokumen-moa')->middleware('auth');
Route::get('dokumen-moa/index', [DokumenMoaController::class, 'index'])->name('dokumen-moa/index')->middleware('auth');
Route::get('dokumen-moa/add', [DokumenMoaController::class, 'add'])->name('dokumen-moa/add')->middleware('auth');
Route::get('dokumen-moa/ubah', [DokumenMoaController::class, 'ubah'])->name('dokumen-moa/ubah')->middleware('auth');
Route::get('dokumen-moa/detail', [DokumenMoaController::class, 'detail'])->name('dokumen-moa/detail')->middleware('auth');


// LogUser
Route::get('log-user', [LogUserController::class, 'index'])->middleware('auth');
Route::get('log-user/index', [LogUserController::class, 'index'])->middleware('auth');
Route::get('log-user/detail', [LogUserController::class, 'detail'])->middleware('auth');
