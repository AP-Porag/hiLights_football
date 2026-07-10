<?php

namespace App\Http\Requests\Player;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PlayerProfileUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'full_name'         => ['required', 'string', 'max:255'],
            'nickname'          => ['nullable', 'string', 'max:255'],
            'dob'               => ['required', 'date', 'before:today'],
            'gender'            => ['required', 'in:M,F,Other'],
            'height'            => ['nullable', 'integer', 'min:100', 'max:250'],
            'birth_city'        => ['nullable', 'string', 'max:255'],
            'birth_country'     => ['nullable', 'string', 'size:2'],
            'nationality'       => ['required', 'string', 'size:2'],
            'current_club'      => ['nullable', 'string', 'max:255'],
            'in_team_since'     => ['nullable', 'string', 'max:7'],
            'agent'             => ['nullable', 'string', 'max:255'],
            'guardian_name'     => ['nullable', 'string', 'max:255'],
            'modality'          => ['required', 'string', 'max:50'],
            'positions'         => ['array', 'max:3'],
            'positions.*'       => ['string', 'max:10'],
            'foot'              => ['required', 'in:Right,Left,Ambidextrous'],
            'photo'             => ['nullable', 'image', 'mimes:jpeg,png', 'max:5120'],
            'video_url'         => ['nullable', 'url', 'max:255'],
            'club_history'      => ['array'],
            'club_history.*.year' => ['required', 'integer'],
            'club_history.*.club' => ['nullable', 'string', 'max:255'],
            'description'       => ['nullable', 'string', 'max:500'],
        ];
    }

    // minor hole guardian_name required
    public function withValidator($validator): void
    {
        $validator->after(function ($v) {
            $dob = $this->input('dob');
            if ($dob && \Carbon\Carbon::parse($dob)->age < 18 && ! $this->input('guardian_name')) {
                $v->errors()->add('guardian_name', 'Guardian name is required for players under 18.');
            }
        });
    }
}
