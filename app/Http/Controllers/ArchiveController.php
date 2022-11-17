<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArchiveRequest;
use App\Models\Archive;
use App\Support\MyUploadFile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArchiveController extends Controller
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
        $archives = Archive::all();
        return Inertia::render('Admin/Archive/Index', compact('archives'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Archive/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ArchiveRequest $request)
    {
        $archive = Archive::make($request->all());
        if ($request->file != null) {
          $this->upload->uploadFile($request, 'archive', $archive);
        }
        $archive->save();
        session()->flash('message', 'Berhasil menambah data');
        return redirect()->route('archive.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Archive  $archive
     * @return \Illuminate\Http\Response
     */
    public function show(Archive $archive)
    {
        return Inertia::render('Admin/Archive/Show', compact('archive'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Archive  $archive
     * @return \Illuminate\Http\Response
     */
    public function edit(Archive $archive)
    {
        return Inertia::render('Admin/Archive/Edit', compact('archive'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Archive  $archive
     * @return \Illuminate\Http\Response
     */
    public function update(ArchiveRequest $request, Archive $archive)
    {
        if ($request->file != null) {
            $this->upload->deleteFile('archive', $archive);
            $this->upload->uploadFile($request,'archive',$archive);
        }
        $archive->save();
        session()->flash('message', 'Berhasil mengubah data');
        return redirect()->route('archive.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Archive  $archive
     * @return \Illuminate\Http\Response
     */
    public function destroy(Archive $archive)
    {
        $this->upload->deleteFile('archive', $archive);
        $archive->delete();
        session()->flash('message', 'Berhasil menghapus data');
        return redirect()->route('archive.index');
    }
}
