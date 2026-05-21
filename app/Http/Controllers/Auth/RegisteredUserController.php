<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use PragmaRX\Countries\Package\Countries;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        $countries = new Countries();

        $list = $countries->all()
            ->map(function ($country) {
                return [
                    'name' => $country->name->common ?? '',
                    'code' => $country->cca2 ?? '',
                ];
            })
            ->values();


        return Inertia::render('auth/register', [
            'countries' => $list
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'role' => ['required', 'in:player,scout,agent,club'],
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'email' => ['required', 'email', 'lowercase', 'max:255', 'unique:users,email'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'dob' => ['nullable', 'date'],
            'nationality' => ['nullable', 'string', 'max:3'],
            'terms' => ['accepted'],
        ]);

        $user = User::create([
            'role' => $validated['role'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),

            // extra fields
            'dob' => $validated['dob'] ?? null,
            'nationality' => $validated['nationality'] ?? null,

            // important fix
            'terms_accepted' => true,
        ]);

        event(new Registered($user));

        Auth::login($user);

        // role-based redirect (important for your app)
        return match ($user->role) {
            'player' => to_route('player.dashboard'),
            'scout' => to_route('scouting.dashboard'),
            'agent' => to_route('scouting.dashboard'),
            'club' => to_route('scouting.dashboard'),
            // default => to_route('home'),
        };
    }
}
