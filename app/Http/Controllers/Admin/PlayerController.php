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
        $query = PlayerProfile::with('user:id,name,nationality');

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
                return [
                    'id'             => $profile->id,
                    'name'           => $user?->name ?? 'Unknown',
                    'age'            => $profile->dob ? \Carbon\Carbon::parse($profile->dob)->age : null,
                    'position'       => $this->getPositionGroup($profile->positions),
                    'positionShort'  => is_array($profile->positions) ? ($profile->positions[0] ?? 'N/A') : 'N/A',
                    'country'        => $user?->nationality ?? 'N/A',
                    'countryFlag'    => $this->getCountryFlag($user?->nationality),
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
        // আপনার দেওয়া আপডেট লজিক (পরিবর্তন ছাড়া)
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
