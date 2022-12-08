<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Support\MyUploadFile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApplicationController extends Controller
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
        $applications = Application::all();
        return Inertia::render('Admin/Application/Index', compact('applications'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Application/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $application = Application::make($request->all());
        if ($request->image != null) {
            $this->upload->uploadImage($request, 'applications', $application);
        }
        $application->save();
        session()->flash('message', 'Data berhasil disimpan');
        return redirect()->route('application.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function show(Application $application)
    {
        return Inertia::render('Admin/Application/Show', compact('application'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function edit(Application $application)
    {
        return Inertia::render('Admin/Application/Edit', compact('application'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Application $application)
    {
        if ($request->image != null) {
            $this->upload->deleteImage('applications', $application);
            $this->upload->uploadImage($request, 'applications', $application);
        }
        $application->update($request->except('image'));
        session()->flash('message', 'Data berhasil diubah');
        return redirect()->route('application.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function destroy(Application $application)
    {
        $this->upload->deleteImage('applications', $application);
        $application->delete();
        session()->flash('message', 'Data berhasil dihapus');
        return redirect()->route('application.index');
    }
}
