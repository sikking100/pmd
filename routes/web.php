<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ArchiveController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\GuestController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PhlController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RunningTextController;
use App\Http\Controllers\StructureController;
use App\Http\Controllers\VisionController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Guest/Beranda', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::controller(GuestController::class)->group(function () {
    Route::get('/', 'beranda')->name('home');
    Route::get('/sambutan', 'sambutan')->name('sambutan');
    Route::get('/profil', 'profil')->name('profil');
    Route::get('/visi-dan-misi', 'visimisi')->name('visimisi');
    Route::get('/struktur-organisasi', 'struktur')->name('struktur');
    Route::get('/sekretariat', 'job')->name('sekretariat');
    Route::get('/keuangan-dan-aset', 'job')->name('keuangan');
    Route::get('/kepegawaian-dan-umum', 'job')->name('kepegawaian');
    Route::get('/fasilitasi-pendaftaran-penduduk', 'job')->name('pendaftaran');
    Route::get('/seksi-identitas-penduduk', 'job')->name('seksi');
    Route::get('/pindah-datang-penduduk', 'job')->name('pindah');
    Route::get('/pendataan-penduduk', 'job')->name('pendataan');
    Route::get('/fasilitasi-pencatatan-sipil', 'job')->name('pencatatan');
    Route::get('/kelahiran', 'job')->name('kelahiran');
    Route::get('/perkawinan-dan-perceraian', 'job')->name('perkawinan');
    Route::get('/perubahan-status-anak-kewarganegaraan-dan-kematian', 'job')->name('perubahan');
    Route::get('/pengelolaan-informasi-administrasi-kependudukan-dan-pemanfaatan-data', 'job')->name('pengelolaan');
    Route::get('/sistem-informasi-administrasi-kependudukan', 'job')->name('sistem');
    Route::get('/pengelolaan-dan-penyajian-data-kependudukan', 'job')->name('penyajian');
    Route::get('/kerjasama-dan-inovasi-pelayanan', 'job')->name('kerjasama');
    Route::get('/arsip', 'arsip')->name('arsip');
    Route::get('/daftar-pegawai-negeri-sipil', 'pns')->name('pns');
    Route::get('/daftar-pegawai-harian-lepas', 'phl')->name('phl');
    Route::get('/aktifitas', 'aktifitas')->name('aktifitas');
    Route::get('/aktifitas/{id}', 'aktifitas_detail')->name('aktifitas-detail');
    Route::get('/call-centre', 'call_centre')->name('call-centre');
  
  });


Route::middleware('auth')->group(function () {
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('activity', ActivityController::class);
    Route::resource('archive', ArchiveController::class);
    Route::resource('banner', BannerController::class);
    Route::resource('job', JobController::class);
    Route::resource('member', MemberController::class);
    Route::resource('phl', PhlController::class);
    Route::resource('profile', ProfileController::class);
    Route::resource('pengumuman', RunningTextController::class);
    Route::resource('structure', StructureController::class);
    Route::resource('vision', VisionController::class);
    Route::resource('welcome', WelcomeController::class);
    Route::get('/dashboard', function ()
    {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');
});

require __DIR__.'/auth.php';
