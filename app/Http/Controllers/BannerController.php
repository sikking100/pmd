<?php

namespace App\Http\Controllers;

use App\Http\Requests\BannerRequest;
use App\Models\Banner;
use App\Support\MyUploadFile;
use Inertia\Inertia;

class BannerController extends Controller
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
        $banner = Banner::all()->first();
        return Inertia::render('Admin/Banner/Index', compact('banner'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(BannerRequest $request)
    {
        $banner = Banner::make($request->all());
        if ($request->file != null) {
          $this->upload->uploadImage($request, 'banner', $banner);
        }
        $banner->save();
        session()->flash('message', 'Berhasil menambah data');
        return redirect()->route('banner.index');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Banner  $banner
     * @return \Illuminate\Http\Response
     */
    public function update(BannerRequest $request, Banner $banner)
    {
        if ($request->file != null) {
            $this->upload->deleteImage('banner', $banner);
            $this->upload->uploadImage($request,'banner',$banner);
        }
        $banner->save();
        session()->flash('message', 'Berhasil mengubah data');
        return redirect()->route('banner.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Banner  $banner
     * @return \Illuminate\Http\Response
     */
    public function destroy(Banner $banner)
    {
        $this->up->deleteFile('banner', $banner);
        $banner->delete();
        session()->flash('message', 'Berhasil menghapus data');
        return redirect()->route('banner.index');
    }
}
