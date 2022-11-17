<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use App\Models\Profile;
use App\Support\MyUploadFile;
use Inertia\Inertia;

class ProfileController extends Controller
{
    private $upload;

    public function __construct()
    {
        $this->upload = new MyUploadFile();
    }

    public function index()
    {
      $profile = Profile::all()->first();
      return Inertia::render('Admin/Profile/Index', compact('profile'));
    }

    public function store(ProfileRequest $request)
    {
      $profile = new Profile();
      if ($request->image != null) {
        $this->upload->uploadImage($request,'images',$profile);
      }
      $profile->description = $request->description;
      $profile->save();
      session()->flash('message', 'Berhasil menambah data');
      return redirect()->route('profile.index');
    }

    /**
     * Update the user's profile information.
     *
     * @param  \App\Http\Requests\ProfileUpdateRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ProfileRequest $request, Profile $profile)
    {
        if ($request->image != null) {
            $this->up->deleteImage('images',$profile);
            $this->up->uploadImage($request,'images',$profile);
        }
        $profile->description = $request->description;
        $profile->save();
        session()->flash('message', 'Berhasil mengubah data');
        return redirect()->route('profile.index');
    }
}
