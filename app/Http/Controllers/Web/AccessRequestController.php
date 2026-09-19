<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\AccessRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use PragmaRX\Countries\Package\Countries;

class AccessRequestController extends Controller
{
    public function create(): Response
    {
        $countries = (new Countries())
            ->all()
            ->map(function ($country) {
                return [
                    'code' => $country->cca2,
                    'name' => $country->name->common,
                ];
            })
            ->sortBy('name')
            ->values();

        return Inertia::render('web/RequestAccess', [
            'countries' => $countries,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => ['required', 'string', 'max:255'],
            'organization' => ['nullable', 'string', 'max:255'],
            'role'         => ['required', 'in:scout,club,agent,other'],
            'email'        => ['required', 'email', 'max:255'],
            'country'      => ['nullable', 'string', 'max:3'],
            'phone'        => ['nullable', 'string', 'max:30'],
            'interest'     => ['nullable', 'string', 'max:255'],
            'message'      => ['nullable', 'string', 'max:2000'],
        ]);

        AccessRequest::create($validated);

        return back()->with('status', 'request-submitted');
    }
}
