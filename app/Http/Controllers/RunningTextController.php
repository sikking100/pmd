<?php

namespace App\Http\Controllers;

use App\Http\Requests\RunnintTextRequest;
use App\Models\RunningText;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RunningTextController extends Controller
{
    public function index()
    {
      $running = RunningText::all()->first();
      return Inertia::render('Admin/RunningText/Index', compact('running'));
    }

    public function store(RunnintTextRequest $request)
    {
      $running = RunningText::Create($request->validated());
      $running->save();
      session()->flash('message', 'Berhasil menambah data');
      return redirect()->route('pengumuman.index');
    }

    public function update(RunnintTextRequest $request, $id)
    {
      $running = RunningText::all()->where('id', $id)->first();
      $running->update($request->validated());
      session()->flash('message', 'Berhasil mengubah data');
      return redirect()->route('pengumuman.index');
    }
}
