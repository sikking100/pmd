<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActivityRequest;
use App\Models\Activity;
use Inertia\Inertia;
use App\Support\MyUploadFile;

class ActivityController extends Controller
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
        $activity = Activity::latest()->get();
        return Inertia::render('Admin/Activity/Index', compact('activity'));   
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Activity/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ActivityRequest $request)
    {
        $activity = Activity::make($request->all());
        if ($request->image != null) {
          $this->upload->uploadImage($request,'activities',$activity);
        }
        // dd($upload);
        $activity->save();
        session()->flash('message', 'Sukses Menambah Data');
        return redirect()->route('activity.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function show(Activity $activity)
    {
        return Inertia::render('Admin/Activity/Show', compact('activity'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function edit(Activity $activity)
    {
        return Inertia::render('Admin/Activity/Edit', compact('activity'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function update(ActivityRequest $request, Activity $activity)
    {
        if ($request->image != null) {
            // $upload = new MyUploadFile();
  
            $this->upload->deleteImage('activities',$activity);
            $this->upload->uploadImage($request,'activities',$activity);
        }
        $activity->title = $request->title;
        $activity->description = $request->description;
        $activity->save();
        session()->flash('message', 'Sukses Mengubah Data');
        return redirect()->route('activity.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Activity  $activity
     * @return \Illuminate\Http\Response
     */
    public function destroy(Activity $activity)
    {
        $this->upload->deleteImage('activities',$activity);
        $activity->delete();
        session()->flash('message', 'Sukses Menghapus Data');
        return redirect()->route('activity.index');
    }
}
