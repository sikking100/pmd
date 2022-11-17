<?php

namespace App\Http\Controllers;

use App\Models\Phl;
use App\Support\MyUploadFile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PhlController extends Controller
{
    private $upload;

    public function __construct()
    {
        $this->upload = new MyUploadFile();
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $phl = Phl::all();
        return Inertia::render('Admin/Phl/Index',compact('phl'));
    } 

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Phl/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $phl = new Phl();
        if ($request->image != null) {
          $this->upload->uploadImage($request,'phl',$phl);
        }
        $phl->name = $request->name;
        $phl->jabatan = $request->jabatan;
        $phl->save();
        session()->flash('message', 'Berhasil menambah data.');
        return redirect()->route('phl.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Phl  $phl
     * @return \Illuminate\Http\Response
     */
    public function show(Phl $phl)
    {
        return Inertia::render('Admin/Phl/Show', compact('phl'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Phl  $phl
     * @return \Illuminate\Http\Response
     */
    public function edit(Phl $phl)
    {
        return Inertia::render('Admin/Phl/Edit', compact('phl'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Phl  $phl
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Phl $phl)
    {
        if ($request->image != null) {
            $this->upload->deleteImage('phl',$phl);
            $this->upload->uploadImage($request,'phl',$phl);
        }
        $phl->name = $request->name;
        $phl->jabatan = $request->jabatan;
        $phl->save();
        session()->flash('message', 'Berhasil mengubah data.');
        return redirect()->route('phl.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Phl  $phl
     * @return \Illuminate\Http\Response
     */
    public function destroy(Phl $phl)
    {
        $this->upload->deleteImage('phl', $phl);
        $phl->delete();
        session()->flash('message', 'Berhasil menghapus data.');
        return redirect()->route('phl.index');
    }
}
