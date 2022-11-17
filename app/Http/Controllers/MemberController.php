<?php

namespace App\Http\Controllers;

use App\Http\Requests\MemberRequest;
use App\Models\Member;
use App\Support\MyUploadFile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
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
        $members = Member::all();
        return Inertia::render('Admin/Member/Index', compact('members'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Admin/Member/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MemberRequest $request)
    {
        $member = new Member();
        if ($request->image != null) {
          $this->upload->uploadImage($request,'members',$member);
        }
        $member->nip = $request->nip;
        $member->name = $request->name;
        $member->golongan = $request->golongan;
        $member->pangkat = $request->pangkat;
        $member->jabatan = $request->jabatan;
        $member->save();
        session()->flash('message', 'Berhasil menambah data');
        return redirect()->route('member.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function show(Member $member)
    {
        return Inertia::render('Admin/Member/Show', compact('member'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function edit(Member $member)
    {
        return Inertia::render('Admin/Member/Edit', compact('member'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function update(MemberRequest $request, Member $member)
    {
        if ($request->image != null) {
            $this->upload->deleteImage('members',$member);
            $this->upload->uploadImage($request,'members',$member);
        }
        $member->nip = $request->nip;
        $member->name = $request->name;
        $member->golongan = $request->golongan;
        $member->pangkat = $request->pangkat;
        $member->jabatan = $request->jabatan;
        $member->save();
        session()->flash('message', 'Berhasil merubah data');
        return redirect()->route('member.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Member  $member
     * @return \Illuminate\Http\Response
     */
    public function destroy(Member $member)
    {
        $this->upload->deleteImage('members',$member);
        $member->delete();
        session()->flash('message', 'Berhasil menghapus data');
        return back();
    }
}
