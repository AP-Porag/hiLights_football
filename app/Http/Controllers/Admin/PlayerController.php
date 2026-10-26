<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PlayerProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\Intl\Countries;

class PlayerController extends Controller
{
    public function index(Request $request)
    {
        $query = PlayerProfile::with('user:id,name,nationality,email,whatsapp,slug');

        // Search filter (name, club, country)
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                // Player name (through user)
                $q->whereHas(
                    'user',
                    fn($u) =>
                    $u->where('name', 'like', "%{$search}%")
                );
                // Club
                $q->orWhere('current_club', 'like', "%{$search}%");

                // Country search (using nationality on user)
                $countryCode = null;
                // 1. Exact full country name -> code (e.g., "Bangladesh" -> "BD")
                try {
                    $countryCode = Countries::getAlpha2Code($search);
                } catch (\Exception $e) {
                    // If not a full country name, fallback to 2-letter code
                    if (strlen($search) === 2 && ctype_alpha($search)) {
                        $countryCode = strtoupper($search);
                    }
                }
                if ($countryCode) {
                    $q->orWhereHas(
                        'user',
                        fn($u) =>
                        $u->where('nationality', $countryCode)
                    );
                }

                // 2. Partial country name match (e.g., "Bra" -> "BR" (Brazil))
                $allCountries = Countries::getNames('en');
                $matchingCodes = [];
                foreach ($allCountries as $code => $name) {
                    if (stripos($name, $search) !== false) {
                        $matchingCodes[] = $code;
                    }
                }
                if (!empty($matchingCodes)) {
                    $q->orWhereHas(
                        'user',
                        fn($u) =>
                        $u->whereIn('nationality', $matchingCodes)
                    );
                }
            });
        }

        // Filter tabs (All, Published, Featured)
        $filter = $request->input('filter', 'All');
        if ($filter === 'Published') {
            $query->where('status', 'Published');
        } elseif ($filter === 'Featured') {
            $query->where('featured', true);
        }

        $players = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString()
            ->through(function ($profile) {
                $user = $profile->user;
                $nationality = $user?->nationality;
                if (is_array($nationality)) {
                    $primaryCountry = $nationality[0] ?? null; // প্রথম দেশের কোড
                    $countryList = implode(', ', $nationality); // সবগুলো দেখাতে চাইলে
                } else {
                    $primaryCountry = $nationality;
                    $countryList = $nationality ?? 'N/A';
                }

                return [
                    'id'             => $profile->id,
                    'playerId'       => $profile->player_id,          // HLF ID
                    'slug'           => $user?->slug,
                    'name'           => $user?->name ?? 'Unknown',
                    'email'          => $user?->email ?? '',
                    'phone'          => $user?->whatsapp,
                    'age'            => $profile->dob ? \Carbon\Carbon::parse($profile->dob)->age : null,
                    'position'       => $this->getPositionGroup($profile->positions),
                    'positionShort'  => is_array($profile->positions) ? ($profile->positions[0] ?? 'N/A') : 'N/A',
                    'country'        => $countryList, // অথবা শুধু প্রথম দেশ: $primaryCountry
                    'countryFlag'    => $this->getCountryFlag($primaryCountry), // string|null পাস হচ্ছে
                    'club'           => $profile->current_club ?? 'N/A',
                    'subscription'   => $profile->subscription_plan ?? 'Free',
                    'views'          => $profile->views ?? 0,               // <- আপনার টেবিলে views কলাম
                    'featured'       => (bool) $profile->featured,
                    'status'         => $profile->status ?? 'Draft',
                    'avatar'         => $profile->photo_url ?? '',
                    'height'         => $profile->height,
                    'weight'         => $profile->weight,
                    'foot'           => $profile->foot ?? 'Right',
                    'marketValue'    => $profile->market_value ?? '',
                    'bio'            => $profile->description ?? '',
                ];
            });

        $stats = [
            'total'      => PlayerProfile::count(),
            'published'  => PlayerProfile::where('status', 'Published')->count(),
            'featured'   => PlayerProfile::where('featured', true)->count(),
            'totalViews' => (int) PlayerProfile::sum('views'),             // <- views কলাম ব্যবহার করছে
        ];

        return Inertia::render('admin/players/Index', [
            'players' => $players,
            'filters' => [
                'search' => $request->input('search', ''),
                'filter' => $request->input('filter', 'All'),
            ],
            'stats'   => $stats,
        ]);
    }

    // ── Admin: single player full view ──
    public function show($id)
    {
        $profile = PlayerProfile::with('user')->findOrFail($id);
        $user    = $profile->user;

        $nationality = $user?->nationality;
        $nationality = is_array($nationality)
            ? $nationality
            : ($nationality ? [$nationality] : []);

        return Inertia::render('admin/players/Detail', [
            'player' => [
                // Identity
                'id'              => $profile->id,
                'playerId'        => $profile->player_id,           // HLF ID
                'slug'            => $user?->slug,
                'name'            => $user?->name ?? 'Unknown',
                'nickname'        => $profile->nickname,
                'avatar'          => $profile->photo_url ?? '',
                'status'          => $profile->status ?? 'Draft',
                'featured'        => (bool) $profile->featured,
                'subscription'    => $profile->subscription_plan ?? 'Free',
                'views'           => (int) ($profile->views ?? 0),
                'registeredAt'    => $this->fmtDateTime($profile->created_at),
                'updatedAt'       => $this->fmtDateTime($profile->updated_at),

                // Contact
                'email'           => $user?->email,
                'emailVerifiedAt' => $this->fmtDateTime($user?->email_verified_at),
                'phone'           => $user?->whatsapp,
                'phoneVerifiedAt' => $this->fmtDateTime($user?->whatsapp_verified_at),

                // Personal
                'dob'             => $user?->dob ? \Carbon\Carbon::parse($user->dob)->format('d M Y') : null,
                'age'             => $user?->dob ? \Carbon\Carbon::parse($user->dob)->age : null,
                'gender'          => $profile->gender,
                'nationality'     => $nationality,
                'nationalityNames' => array_values(array_filter(array_map(
                    fn($code) => $this->countryName($code),
                    $nationality
                ))),
                'birthCity'       => $profile->birth_city,
                'birthCountry'    => $this->countryName($profile->birth_country),
                'guardianName'    => $profile->guardian_name,
                'agent'           => $profile->agent,

                // Football
                'modality'        => $profile->modality,
                'positions'       => is_array($profile->positions) ? $profile->positions : [],
                'foot'            => $profile->foot,
                'height'          => $profile->height,
                'weight'          => $profile->weight,
                'currentClub'     => $profile->current_club,
                'currentClubCountry' => $this->countryName($profile->current_club_country),
                'inTeamSince'     => $profile->in_team_since,
                'marketValue'     => $profile->market_value,
                'description'     => $profile->description,

                // Preferences
                'supportedClub'   => $profile->supported_club,
                'dreamClub'       => $profile->dream_club,
                'bootBrands'      => is_array($profile->boot_brands) ? $profile->boot_brands : [],
                'bootBrandOther'  => $profile->boot_brand_other,

                // Lists
                'videoUrl'        => $profile->video_url,
                'videos'          => is_array($profile->videos) ? $profile->videos : [],
                'clubHistory'     => is_array($profile->club_history) ? $profile->club_history : [],
                'transferHistory' => is_array($profile->transfer_history) ? $profile->transfer_history : [],
                'achievements'    => is_array($profile->achievements) ? $profile->achievements : [],
                'competitions'    => is_array($profile->competitions) ? $profile->competitions : [],
                'matches'         => is_array($profile->matches) ? $profile->matches : [],
            ],
        ]);
    }

    private function fmtDateTime($value): ?string
    {
        if (empty($value)) return null;

        try {
            return \Carbon\Carbon::parse($value)->format('d M Y, H:i');
        } catch (\Exception $e) {
            return null;
        }
    }

    private function countryName(?string $code): ?string
    {
        if (empty($code)) return null;

        try {
            return Countries::getName(strtoupper($code));
        } catch (\Exception $e) {
            return strtoupper($code);
        }
    }

    private function getPositionGroup($positions)
    {
        if (!$positions || !is_array($positions) || empty($positions)) return 'N/A';
        $groupMap = [
            'GK'   => 'Goalkeeper',
            'LB'   => 'Defender',
            'CB-L' => 'Defender',
            'CB-R' => 'Defender',
            'RB'   => 'Defender',
            'LM'   => 'Midfielder',
            'CM-L' => 'Midfielder',
            'CM-R' => 'Midfielder',
            'CAM'  => 'Midfielder',
            'RM'   => 'Midfielder',
            'LW'   => 'Forward',
            'RW' => 'Forward',
            'ST' => 'Forward',
            'CF' => 'Forward',
        ];
        return $groupMap[$positions[0]] ?? 'Midfielder';
    }

    private function getCountryFlag(?string $code): string
    {
        if (empty($code) || strlen($code) !== 2) return '';
        return mb_chr(0x1F1E6 + ord(strtoupper($code[0])) - ord('A'))
            . mb_chr(0x1F1E6 + ord(strtoupper($code[1])) - ord('A'));
    }

    // ── বাকি মেথড (update, toggleFeatured, suspend, destroy) অপরিবর্তিত ──
    public function update(Request $request, $id)
    {
        // আপনার দেওয়া আপডেট লজিক (পরিবর্তন ছাড়া)
    }

    public function toggleFeatured($id)
    {
        $profile = PlayerProfile::findOrFail($id);
        $profile->featured = !$profile->featured;
        $profile->save();
        return back()->with('success', 'Featured toggled.');
    }

    public function suspend($id)
    {
        $profile = PlayerProfile::findOrFail($id);
        $profile->status = 'Suspended';
        $profile->save();
        return back()->with('success', 'Player suspended.');
    }

    public function destroy($id)
    {
        PlayerProfile::findOrFail($id)->delete();
        return redirect()->route('players.index')->with('success', 'Player deleted.');
    }
}
