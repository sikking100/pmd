<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Application;
use App\Models\Archive;
use App\Models\Job;
use App\Models\Member;
use App\Models\Phl;
use App\Models\Profile;
use App\Models\Structure;
use App\Models\Vision;
use App\Models\Welcome;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class GuestController extends Controller
{
  public function beranda()
  {
    $activities = Activity::orderBy('created_at', 'DESC')->take(4)->get();
    $banners = Activity::orderBy('created_at', 'DESC')->take(5)->get();
    return Inertia::render('Guest/Beranda', [
      'activities' => $activities,
      'banners' => $banners
    ]);
  }

  public function sambutan()
  {
    $welcome = Welcome::all()->first();
    return Inertia::render('Guest/Sambutan', compact('welcome'));
  }

  public function profil()
  {
    $profile = Profile::all()->first();
    return Inertia::render('Guest/Profil', compact('profile'));
  }

  public function visimisi()
  {
    $visimisi = Vision::all()->first();
    return Inertia::render('Guest/VisiMisi', compact('visimisi'));
  }

  public function struktur()
  {
    $struktur = Structure::all()->first();
    return Inertia::render('Guest/Struktur', compact('struktur'));
  }

  public function tupoksi($id)
  {
    $job = Job::where('id', $id)->first();
    return Inertia::render('Guest/Tupoksi', compact('job'));
  }

  public function arsip()
  {
    $archive = Archive::all();
    return Inertia::render('Guest/Arsip', compact('archive'));
  }

  public function pns()
  {
    $members = Member::all();
    return Inertia::render('Guest/Pegawai', compact('members'));
  }
  public function phl()
  {
    $phls = Phl::all();
    return Inertia::render('Guest/Phl', compact('phls'));
  }

  public function aktifitas()
  {
    $activities = Activity::all();
    return Inertia::render('Guest/Aktifitas', compact('activities'));
  }

  public function aktifitas_detail($id)
  {
    $activity = Activity::where('id', $id)->first();
    return Inertia::render('Guest/AktifitasDetail', compact('activity'));
  }

  public function aplikasi()
  {
    $applications = Application::all();
    return Inertia::render('Guest/Aplikasi', compact('applications'));
  }
}
