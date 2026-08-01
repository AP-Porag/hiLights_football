<?php

namespace App\Http\Controllers\Player;

use App\Http\Controllers\Controller;
use App\Http\Requests\Player\PlayerProfileUpdateRequest;
use Stevebauman\Location\Facades\Location;
use App\Models\PlayerProfile;
use App\Models\ProfileView;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Carbon\Carbon;
use PragmaRX\Countries\Package\Countries;

class PlayerProfileController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $profile = $user->playerProfile;
        $subscription = $this->subscriptionState($request);
        $countries = (new Countries())
            ->all()
            ->map(function ($country) {
                return [
                    'code' => $country->cca2,
                    'name' => $country->name->common,
                ];
            })
            ->values();


        // Recent Views (unchanged)
        $recentViews = ProfileView::with('viewer:id,name,role', 'viewer.playerProfile:id,user_id')
            ->where('player_profile_id', $profile->id)
            ->latest()
            ->get()
            ->unique('viewer_id')
            ->take(10)
            ->map(fn($v) => [
                'id'                => $v->viewer_id,
                'name'              => $v->viewer?->name ?? 'Unknown',
                'role'              => $v->viewer?->role,
                'viewed_at'         => $v->created_at->diffForHumans(),
                'player_profile_id' => $v->viewer?->playerProfile?->id ?? null,
            ])
            ->values();

        // This week vs last week
        $thisWeek = ProfileView::where('player_profile_id', $profile->id)
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->count();
        $lastWeek = ProfileView::where('player_profile_id', $profile->id)
            ->whereBetween('created_at', [Carbon::now()->subDays(14), Carbon::now()->subDays(7)])
            ->count();
        $trend = $lastWeek > 0
            ? round((($thisWeek - $lastWeek) / $lastWeek) * 100)
            : ($thisWeek > 0 ? 100 : 0);

        // Daily counts for sparkline (last 7 days)
        $daily = collect(range(6, 0))->map(function ($daysAgo) use ($profile) {
            return ProfileView::where('player_profile_id', $profile->id)
                ->whereDate('created_at', Carbon::now()->subDays($daysAgo)->toDateString())
                ->count();
        })->values();

        $totalViews = ProfileView::where('player_profile_id', $profile->id)->count();

        // Country analytics
        $countryAnalytics = ProfileView::where('player_profile_id', $profile->id)
            ->selectRaw('country_code as country, COUNT(*) as views')
            ->whereNotNull('country_code')
            ->groupBy('country_code')
            ->orderByDesc('views')
            ->get()
            ->map(function ($item) {
                return [
                    'country' => $item->country,
                    'views'   => (int) $item->views,
                ];
            })
            ->values();

        return Inertia::render('player/dashboard/Index', [
            'auth' => [
                'user' => [
                    'id'              => $user->id,
                    'name'            => $user->name,
                    'email'           => $user->email,
                    'dob'             => $user->dob?->format('Y-m-d'),
                    'nationality'     => $user->nationality,
                    'whatsapp'     => $user->whatsapp,
                    'created_at'      => $user->created_at?->format('Y-m-d H:i:s'),
                    'player_profile'  => $user->playerProfile,
                ]
            ],
            'recentViews'       => $recentViews,
            'subscription'      => $subscription,
            'viewsThisWeek'     => $thisWeek,
            'viewsDaily'        => $daily,        // ← ADD (sparkline er jonno)
            'totalViews'        => $totalViews,   // ← ADD (real total, optional but valo)
            'viewsTrend'        => $trend,
            'countryAnalytics'  => $countryAnalytics,
            'countries'         => $countries
        ]);
    }

    public function edit(Request $request)
    {
        $user = $request->user();
        $profile = $user->playerProfile;

        $countries = (new Countries())
            ->all()
            ->map(function ($country) {
                return [
                    'code' => $country->cca2,
                    'name' => $country->name->common,
                ];
            })
            ->values();

        return Inertia::render('player/profile/Edit', [
            'user' => [
                'name'        => $user->name,
                'dob'         => $user->dob?->format('Y-m-d'),
                'nationality' => $user->nationality,
                'whatsapp' => $user->whatsapp
            ],
            'profile' => $profile ? [
                ...$profile->toArray(),
                'photo_url' => $profile->photo_url,
            ] : null,
            'countries' => $countries
        ]);
    }

    public function update(PlayerProfileUpdateRequest $request)
    {

        $data = $request->validated();
        $user = $request->user();

        $user->update([
            'name'        => $data['full_name'],
            'dob'         => $data['dob'],
            'nationality' => $data['nationality'],
            'whatsapp' => $data['whatsapp']
        ]);

        $payload = collect($data)->except([
            'full_name',
            'dob',
            'nationality',
            'photo',
            'whatsapp'
        ])->toArray();



        if ($request->hasFile('photo')) {
            if ($user->playerProfile?->photo_path) {
                Storage::disk('public')->delete($user->playerProfile->photo_path);
            }
            $payload['photo_path'] = $this->storeUpload(
                $request->file('photo'),
                'players/player-photos'
            );
        }

        // Casting JSON fields to array (Laravel will auto-cast if model has $casts, but ensure they're arrays)
        $jsonFields = ['positions', 'videos', 'club_history', 'transfer_history', 'achievements', 'competitions', 'matches'];
        foreach ($jsonFields as $field) {
            if (isset($payload[$field]) && is_array($payload[$field])) {
                $payload[$field] = $payload[$field]; // stay as array, model will encode
            } else {
                // If not sent or empty, ensure it's null or array
                unset($payload[$field]); // or set to null if you prefer
            }
        }

        $user->playerProfile()->updateOrCreate(
            ['user_id' => $user->id],
            $payload
        );

        return redirect()->route('player.dashboard')
            ->with('success', 'Profile saved.');
    }

    /**
     * Store an uploaded file without any path resolution issues.
     */
    private function storeUpload(?UploadedFile $file, string $dir): ?string
    {
        if (!$file || !$file->isValid()) {
            return null;
        }

        $photo_path = storage_path('app/public/' . $dir);
        if (!is_dir($photo_path)) {
            mkdir($photo_path, 0755, true);
        }

        $filename = $file->hashName();
        $file->move($photo_path, $filename);

        return $dir . '/' . $filename;
    }

    public function updateLists(Request $request)
    {
        $data = $request->validate([
            'videos'                     => ['sometimes', 'array'],
            'videos.*.label'             => ['nullable', 'string', 'max:50'],
            'videos.*.url'               => ['nullable', 'string', 'max:255'],
            'club_history'               => ['sometimes', 'array'],
            'club_history.*.year'        => ['nullable'],
            'club_history.*.club'        => ['nullable', 'string', 'max:255'],
            'club_history.*.country'     => ['nullable', 'string', 'size:2'],
            'transfer_history'           => ['sometimes', 'array'],
            'transfer_history.*.year'    => ['nullable'],
            'transfer_history.*.club'    => ['nullable', 'string', 'max:255'],
            'transfer_history.*.country' => ['nullable', 'string', 'size:2'],
            'transfer_history.*.logo'    => ['nullable', 'string', 'max:255'],
            'achievements'               => ['sometimes', 'array'],
            'achievements.*.year'        => ['nullable'],
            'achievements.*.title'       => ['nullable', 'string', 'max:255'],
            'competitions'               => ['sometimes', 'array'],
            'competitions.*.name'        => ['nullable', 'string', 'max:255'],
            'competitions.*.year'        => ['nullable'],
            'matches'                    => ['sometimes', 'array'],
            'matches.*.home'             => ['nullable', 'string', 'max:255'],
            'matches.*.score'            => ['nullable', 'string', 'max:20'],
            'matches.*.away'             => ['nullable', 'string', 'max:255'],
            'matches.*.goals'            => ['nullable'],
            'matches.*.assists'          => ['nullable'],
            'matches.*.minutes'          => ['nullable', 'string', 'max:20'],
        ]);

        $profile = $request->user()->playerProfile()->firstOrCreate(
            ['user_id' => $request->user()->id]
        );

        $profile->fill($data);

        if (array_key_exists('videos', $data)) {
            $first = collect($data['videos'])->first(fn($v) => !empty($v['url'] ?? null));
            if ($first) {
                $profile->video_url = $first['url'];
            }
        }

        $profile->save();

        return back();
    }

    public function updateFields(Request $request)
    {
        $data = $request->validate([
            'full_name'              => ['sometimes', 'nullable', 'string', 'max:255'],
            'dob'                    => ['sometimes', 'nullable', 'date'],
            'nationality'            => ['sometimes', 'nullable', 'string', 'size:2'],
            'gender'                 => ['sometimes', 'nullable', 'string', 'max:10'],
            'height'                 => ['sometimes', 'nullable', 'integer'],
            'weight'                 => ['sometimes', 'nullable', 'integer'],
            'birth_city'             => ['sometimes', 'nullable', 'string', 'max:255'],
            'birth_country'          => ['sometimes', 'nullable', 'string', 'size:2'],
            'current_club'           => ['sometimes', 'nullable', 'string', 'max:255'],
            'current_club_country'   => ['sometimes', 'nullable', 'string', 'size:2'],
            'in_team_since'          => ['sometimes', 'nullable', 'string', 'max:7'],
            'agent'                  => ['sometimes', 'nullable', 'string', 'max:255'],
            'whatsapp'               => ['sometimes', 'nullable', 'string', 'max:30'],
            'description'            => ['sometimes', 'nullable', 'string', 'max:5000'],
            'modality'               => ['sometimes', 'nullable', 'string', 'max:50'],
            'positions'              => ['sometimes', 'array'],
            'positions.*'            => ['string', 'max:10'],
            'foot'                   => ['sometimes', 'nullable', 'string', 'max:20'],
            'video_url'              => ['sometimes', 'nullable', 'url', 'max:255'],
            'videos'                 => ['sometimes', 'array'],
            'videos.*.label'         => ['nullable', 'string', 'max:50'],
            'videos.*.url'           => ['nullable', 'string', 'max:255'],
            'photo'                  => ['sometimes', 'image', 'mimes:jpeg,png', 'max:5120'],
            'club_history'           => ['sometimes', 'array'],
            'club_history.*.year'    => ['nullable'],
            'club_history.*.club'    => ['nullable', 'string', 'max:255'],
            'club_history.*.country' => ['nullable', 'string', 'size:2'],
        ]);

        $user = $request->user();

        if (array_key_exists('full_name', $data)) {
            $user->name = $data['full_name'];
        }
        if (array_key_exists('dob', $data)) {
            $user->dob = $data['dob'];
        }
        if (array_key_exists('nationality', $data)) {
            $user->nationality = $data['nationality'];
        }

        if (array_key_exists('whatsapp', $data)) {
            $user->whatsapp = $data['whatsapp'];
        }


        $user->save();

        $profile = $user->playerProfile()->firstOrCreate(['user_id' => $user->id]);
        $profileData = collect($data)->except(['full_name', 'dob', 'nationality', 'photo'])->toArray();

        if ($request->hasFile('photo')) {
            $profileData['photo_path'] = $this->storeUpload($request->file('photo'), 'players/player-photos');
        }

        $profile->fill($profileData);

        if (array_key_exists('videos', $data)) {
            $first = collect($data['videos'])->first(fn($v) => !empty($v['url'] ?? null));
            if ($first) {
                $profile->video_url = $first['url'];
            }
        }

        $profile->save();

        return back();
    }

    public function playerDetails($id, Request $request)
    {
        $player = PlayerProfile::with('user')->findOrFail($id);

        $player->increment('views');

        $viewer = auth()->user();

        $ip = $request->ip();
        $location = Location::get($ip);

        ProfileView::create([
            'player_profile_id' => $player->id,
            'viewer_id'         => $viewer?->id,
            'country'           => $location?->countryName,
            'country_code'      => $location?->countryCode,
            'ip_address'        => $ip,
        ]);

        return Inertia::render('player/profile/public/New-Detail', [
            'player' => $player,
        ]);
    }

    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $path = $this->storeUpload($request->file('logo'), 'players/club-logos');

        return response()->json([
            'path' => $path,
            'url'  => asset('storage/' . $path),
        ]);
    }

    private function subscriptionState(Request $request): array
    {
        $subscription = $request->user()?->subscription('default');
        $currentPlan   = null;
        $onGracePeriod = false;
        $isCancelled   = false;
        $endsAt        = null;

        if ($subscription) {
            $onGracePeriod = $subscription->onGracePeriod();
            $isCancelled   = $subscription->ends_at !== null;
            $endsAt        = $subscription->ends_at;

            if ($subscription->valid()) {
                $currentPlan = $subscription->stripe_price;
            }
        }

        return [
            'current_plan'         => $currentPlan,
            'on_grace_period'      => $onGracePeriod,
            'is_cancelled'         => $isCancelled,
            'subscription_ends_at' => $endsAt,
        ];
    }

    public function views(Request $request)
    {
        $user = $request->user();
        $profile = $user->playerProfile;

        $views = ProfileView::with('viewer:id,name,role', 'viewer.playerProfile:id,user_id')
            ->where('player_profile_id', $profile->id)
            ->latest()
            ->paginate(15);

        $viewsData = $views->map(fn($v) => [
            'id'                => $v->viewer_id,
            'name'              => $v->viewer?->name ?? 'Unknown',
            'role'              => $v->viewer?->role,
            'viewed_at'         => $v->created_at->diffForHumans(),
            'player_profile_id' => $v->viewer?->playerProfile?->id ?? null,
        ]);

        return Inertia::render('player/views/Index', [
            'views'      => $viewsData,
            'pagination' => [
                'current_page' => $views->currentPage(),
                'last_page'    => $views->lastPage(),
                'per_page'     => $views->perPage(),
                'total'        => $views->total(),
            ],
        ]);
    }

    public function publicPlayerDetails(Request $request, $id)
    {
        $player = PlayerProfile::with('user')->findOrFail($id);

        // Increase profile views
        $player->increment('views');

        $viewer = auth()->user();

        // Visitor IP
        $ip = app()->environment('local')
            ? '8.8.8.8' // Localhost testing
            : $request->ip();

        $location = Location::get($ip);

        ProfileView::create([
            'player_profile_id' => $player->id,
            'viewer_id'         => $viewer?->id,
            'country'           => $location?->countryName,
            'country_code'      => $location?->countryCode,
            'ip_address'        => $ip,
            // 'user_agent'        => $request->userAgent(),
        ]);

        return Inertia::render('player/profile/public/New-Detail', [
            'player' => $player,
        ]);
    }
}
