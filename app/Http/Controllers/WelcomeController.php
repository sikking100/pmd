<?php

namespace App\Http\Controllers;

use App\Http\Requests\WelcomeRequest;
use App\Models\Welcome;
use App\Support\MyUploadFile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{
  private $upload;

  public function __construct()
  {
    $this->upload = new MyUploadFile();
  }

  public function index()
  {
    $welcome = Welcome::all()->first();
    return Inertia::render('Admin/Welcome/Index', compact('welcome'));
  }

  public function store(WelcomeRequest $request)
  {
    $welcome = new Welcome();
    if ($request->image != null) {
      $this->upload->uploadImage($request, 'photos', $welcome);
    }

    $welcome->description = $request->description;
    $welcome->save();
    session()->flash('message', 'Berhasil menambah data');
    return redirect()->route('welcome.index');
  }

  public function update(WelcomeRequest $request, Welcome $welcome)
  {
    if ($request->image != null) {
      $this->upload->deleteImage('photos', $welcome);
      $this->upload->uploadImage($request, 'photos', $welcome);
    }
    $welcome->description = $request->description;
    $welcome->save();
    session()->flash('message', 'Berhasil mengubah data');
    return redirect()->route('welcome.index');
  }
}
