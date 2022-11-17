<?php

namespace App\Http\Controllers;

use App\Http\Requests\StructureRequest;
use App\Models\Structure;
use App\Support\MyUploadFile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StructureController extends Controller
{
    private $upload;

    public function __construct()
    {
        $this->upload = new MyUploadFile();
    }

    public function index()
    {
      $structure = Structure::all()->first();
      return Inertia::render('Admin/Structure/Index', compact('structure'));
    }

    public function store(StructureRequest $request)
    {
      $structure = new Structure();
      if ($request->image != null) {
        $this->upload->uploadImage($request,'images',$structure);
      }
      session()->flash('message', 'Sukses Menambah Data');
      $structure->save();
      return redirect()->route('structure.index');
    }

    public function update(StructureRequest $request, Structure $structure)
    {
      if ($request->image != null) {
        $this->upload->deleteImage('images',$structure);
        $this->upload->uploadImage($request,'images',$structure);
      }
      session()->flash('message', 'Sukses Merubah Data');
      $structure->save();
      return redirect()->route('structure.index');
    }
}
