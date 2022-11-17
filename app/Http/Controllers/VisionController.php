<?php

namespace App\Http\Controllers;

use App\Http\Requests\VisionRequest;
use App\Models\Vision;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisionController extends Controller
{
    public function index()
    {
      $vision = Vision::all()->first();
      return Inertia::render('Admin/Vision/Index', compact('vision'));
    }

    public function store(VisionRequest $request)
    {
      $vision = Vision::make($request->all());
      $vision->save();
      session()->flash('message','Berhasil menambahkan data');
      return redirect()->route('vision.index');
    }

    public function update(VisionRequest $request, Vision $vision)
    {
      $vision->content = $request->content;
      $vision->save();
      session()->flash('message', 'Berhasil mengubah data');
      return redirect()->route('vision.index');
    }
}
