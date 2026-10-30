<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PlayerProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Symfony\Component\Intl\Countries;

class PlayerController extends Controller
{
    // Filter dropdown er option — Player Dashboard er questionnaire er sathe ek-i rakhte hobe
    public const BOOT_BRANDS = ['Nike', 'Adidas', 'Puma', 'New Balance', 'Umbro', 'Mizuno', 'Other'];
    public const BOOTS_PER_YEAR = ['1', '2', '3', '4', '5 or more'];
    public const BOOT_PRICE_RANGES = ['Under €50', '€50 – €100', '€100 – €150', '€150 – €250', 'Over €250'];
    public const POSITIONS = ['GK', 'LB', 'CB-L', 'CB-R', 'RB', 'LM', 'CM-L', 'CM-R', 'RM', 'CAM', 'LW', 'ST', 'RW', 'CF'];

    public function index(Request $request)
    {
        $query = PlayerProfile::with('user:id,name,nationality,email,whatsapp,slug,email_verified_at,whatsapp_verified_at,whatsapp_verified_via,dob');

        // Search filter (name, club, country)
        if ($search = $request->input('search')) {
            $query->where(function ($q) use ($search) {
                // Player name (through user)
                $q->whereHas(
                    'user',
                    fn($u) =>
                    $u->where('name', 'like', "%{$search}%")
                );
                // Email / phone
                $q->orWhereHas(
                    'user',
                    fn($u) =>
                    $u->where('email', 'like', "%{$search}%")
                        ->orWhere('whatsapp', 'like', "%{$search}%")
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

        // ── Advanced filters (Admin search area) ──
        // JSON array column (nationality / positions / boot_brands) LIKE diye khuja hocche,
        // karon column-ta json na text hole JSON_CONTAINS error dey — LIKE duitatei kaj kore.
        if ($country = $request->input('country')) {
            $query->whereHas('user', fn($u) => $u->where('nationality', 'like', '%"' . $this->likeValue($country) . '"%'));
        }

        if ($birthYear = $request->input('birth_year')) {
            $query->whereHas('user', fn($u) => $u->whereYear('dob', $birthYear));
        }

        if ($birthCity = $request->input('birth_city')) {
            $query->where('birth_city', $birthCity);
        }

        if ($position = $request->input('position')) {
            $query->where('positions', 'like', '%"' . $this->likeValue($position) . '"%');
        }

        if ($bootBrand = $request->input('boot_brand')) {
            $query->where('boot_brands', 'like', '%"' . $this->likeValue($bootBrand) . '"%');
        }

        if ($bootsPerYear = $request->input('boots_per_year')) {
            $query->where('boots_per_year', $bootsPerYear);
        }

        if ($priceRange = $request->input('price_range')) {
            $query->where('boot_price_range', $priceRange);
        }

        if ($supportedClub = $request->input('supported_club')) {
            $query->where('supported_club', 'like', '%' . $this->likeValue($supportedClub) . '%');
        }

        if ($dreamClub = $request->input('dream_club')) {
            $query->where('dream_club', 'like', '%' . $this->likeValue($dreamClub) . '%');
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
                    'emailVerified'  => (bool) $user?->email_verified_at,
                    'phone'          => $user?->whatsapp,
                    'phoneVerified'  => (bool) $user?->whatsapp_verified_at,
                    // Kon channel-e verify hoyeche. Column na thakle default 'whatsapp'.
                    'phoneVerifiedVia' => $user?->whatsapp_verified_at
                        ? ($user->whatsapp_verified_via ?? 'whatsapp')
                        : null,
                    'age'            => $user?->dob ? \Carbon\Carbon::parse($user->dob)->age : null,
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
                'search'         => $request->input('search', ''),
                'filter'         => $request->input('filter', 'All'),
                'country'        => $request->input('country', ''),
                'birth_year'     => $request->input('birth_year', ''),
                'birth_city'     => $request->input('birth_city', ''),
                'position'       => $request->input('position', ''),
                'boot_brand'     => $request->input('boot_brand', ''),
                'boots_per_year' => $request->input('boots_per_year', ''),
                'price_range'    => $request->input('price_range', ''),
                'supported_club' => $request->input('supported_club', ''),
                'dream_club'     => $request->input('dream_club', ''),
            ],
            'filterOptions' => [
                'countries'    => $this->countryOptions(),
                'birthYears'   => $this->birthYearOptions(),
                'birthCities'  => $this->birthCityOptions(),
                'positions'    => self::POSITIONS,
                'bootBrands'   => self::BOOT_BRANDS,
                'bootsPerYear' => self::BOOTS_PER_YEAR,
                'priceRanges'  => self::BOOT_PRICE_RANGES,
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
                'birthYear'       => $user?->dob ? \Carbon\Carbon::parse($user->dob)->year : null,
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

                // Player questionnaire
                'supportedClub'   => $profile->supported_club,
                'dreamClub'       => $profile->dream_club,
                'bootBrands'      => is_array($profile->boot_brands) ? $profile->boot_brands : [],
                'bootBrandOther'  => $profile->boot_brand_other,
                'bootsPerYear'    => $profile->boots_per_year,
                'bootPriceRange'  => $profile->boot_price_range,

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

    // LIKE er bhitore % ar _ thakle seta wildcard hoye jay — escape kore dei
    private function likeValue(string $value): string
    {
        return addcslashes($value, '%_\\');
    }

    // Shudhu je desh gulo DB-te ache — dropdown-e sei gulo-i dekhabe
    private function countryOptions(): array
    {
        $rows = DB::table('player_profiles')
            ->join('users', 'users.id', '=', 'player_profiles.user_id')
            ->whereNotNull('users.nationality')
            ->pluck('users.nationality');

        $codes = [];
        foreach ($rows as $raw) {
            $decoded = json_decode((string) $raw, true);
            $list = is_array($decoded) ? $decoded : [$raw];

            foreach ($list as $code) {
                $code = strtoupper(trim((string) $code));
                if ($code !== '') {
                    $codes[$code] = true;
                }
            }
        }

        $options = [];
        foreach (array_keys($codes) as $code) {
            $options[] = [
                'code' => $code,
                'name' => $this->countryName($code) ?? $code,
            ];
        }

        usort($options, fn($a, $b) => strcmp($a['name'], $b['name']));

        return $options;
    }

    private function birthYearOptions(): array
    {
        return DB::table('player_profiles')
            ->join('users', 'users.id', '=', 'player_profiles.user_id')
            ->whereNotNull('users.dob')
            ->selectRaw('DISTINCT YEAR(users.dob) as birth_year')
            ->orderByDesc('birth_year')
            ->pluck('birth_year')
            ->map(fn($y) => (int) $y)
            ->filter()
            ->values()
            ->all();
    }

    private function birthCityOptions(): array
    {
        return PlayerProfile::whereNotNull('birth_city')
            ->where('birth_city', '!=', '')
            ->distinct()
            ->orderBy('birth_city')
            ->pluck('birth_city')
            ->all();
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
