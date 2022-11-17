<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'nip' => ['min:18', 'required', 'regex:/^\S*$/u', 'numeric'],
            'name' => 'required|min:5',
            'golongan' => 'required|min:3',
            'pangkat' => 'required|min:5',
            'jabatan' => 'required|min:5',
            'image' => 'required|mimes:jpg,jpeg,png',
        ];
    }
}
