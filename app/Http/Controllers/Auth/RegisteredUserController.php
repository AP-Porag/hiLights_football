<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\PlayerProfile;
use App\Models\ScoutProfile;
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

        return Inertia::render('auth/register', [
            'countries' => $countries,
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
            'whatsapp'          => ['required', 'string', 'max:30'],   // ← new validation
            'nationality' => ['nullable', 'array'],            // ← array validation
            'nationality.*' => ['string', 'max:3'],            // প্রতিটি element validate
            'country' => ['nullable', 'string', 'max:3'],      // scout এর জন্য
            'organization_name' => ['nullable', 'string', 'max:255'],
            'terms' => ['accepted'],
        ]);

        $user = User::create([
            'role' => $validated['role'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),

            // extra fields
            'dob' => $validated['dob'] ?? null,
            'nationality' => $validated['nationality'] ?? null,  // array যাবে, JSON হয়ে save হবে
            'country' => $validated['country'] ?? null,

            // important fix
            'terms_accepted' => true,
        ]);


        // Create Player Profile
        if ($user->role === 'player') {
            PlayerProfile::create([
                'user_id' => $user->id,
                'player_id' => $this->generatePlayerId(),
            ]);
        }

        // Create Scout Profile
        if ($user->role === 'scout') {
            ScoutProfile::create([
                'user_id' => $user->id,
                'country' => $validated['country'] ?? null,
                'organization_name' => $validated['organization_name'] ?? null,
            ]);
        }

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
    private function generatePlayerId()
    {
        do {
            $id = "HLF-" . random_int(1000000000, 9999999999); // 10 digit
        } while (PlayerProfile::where('player_id', $id)->exists());

        return $id;
    }
}
