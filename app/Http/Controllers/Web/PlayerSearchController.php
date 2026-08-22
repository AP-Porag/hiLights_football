<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\PlayerProfile;
use Illuminate\Http\Request;
use Symfony\Component\Intl\Countries;

class PlayerSearchController extends Controller
{
    // Position code -> Display group
    private const POSITION_GROUP = [
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
        'ST'   => 'Forward',
        'RW'   => 'Forward',
        'CF'   => 'Forward',
    ];

    public function search(Request $request)
    {
        $q = trim((string) $request->query('q', ''));

        if (mb_strlen($q) < 2) {
            return response()->json(['players' => []]);
        }

        // --------------------------------------------------------------
        // 1. Detect country codes (from full name or 2-letter code)
        // --------------------------------------------------------------
        $countryCodes = [];

        // If query looks like a 2-letter ISO code, add it
        if (preg_match('/^[A-Za-z]{2}$/', $q)) {
            $countryCodes[] = strtoupper($q);
        }

        // Find all countries whose name contains the query (case-insensitive)
        foreach (Countries::getNames('en') as $code => $name) {
            if (stripos($name, $q) !== false) {
                $countryCodes[] = $code;
            }
        }

        $countryCodes = array_unique($countryCodes);

        // --------------------------------------------------------------
        // 2. Detect position codes (alias, direct, or group name)
        // --------------------------------------------------------------
        $positionAliases = [
            'goalkeeper'            => 'GK',
            'keeper'                => 'GK',
            'center back'           => 'CB',
            'centre back'           => 'CB',
            'cb'                    => 'CB',
            'right center back'     => 'CB-R',
            'right centre back'     => 'CB-R',
            'cb-r'                  => 'CB-R',
            'left center back'      => 'CB-L',
            'left centre back'      => 'CB-L',
            'cb-l'                  => 'CB-L',
            'left back'             => 'LB',
            'lb'                    => 'LB',
            'right back'            => 'RB',
            'rb'                    => 'RB',
            'defensive midfielder'  => 'CDM',
            'cdm'                   => 'CDM',
            'central midfielder'    => 'CM',
            'centre midfielder'     => 'CM',
            'cm'                    => 'CM',
            'attacking midfielder'  => 'CAM',
            'cam'                   => 'CAM',
            'left midfielder'       => 'LM',
            'lm'                    => 'LM',
            'right midfielder'      => 'RM',
            'rm'                    => 'RM',
            'left wing'             => 'LW',
            'lw'                    => 'LW',
            'right wing'            => 'RW',
            'rw'                    => 'RW',
            'winger'                => 'RW',
            'striker'               => 'ST',
            'forward'               => 'ST',
            'st'                    => 'ST',
            'second striker'        => 'CF',
            'centre forward'        => 'CF',
            'center forward'        => 'CF',
            'cf'                    => 'CF',
        ];

        $positionCodes = [];

        // a) Check aliases
        $alias = $positionAliases[strtolower($q)] ?? null;
        if ($alias) {
            $positionCodes[] = $alias;
        }

        // b) Direct position code (e.g., "GK")
        if (array_key_exists(strtoupper($q), self::POSITION_GROUP)) {
            $positionCodes[] = strtoupper($q);
        }

        // c) Position groups (Goalkeeper, Defender, Midfielder, Forward)
        $groupToPositions = [];
        foreach (self::POSITION_GROUP as $code => $group) {
            $groupToPositions[$group][] = $code;
        }

        foreach (array_keys($groupToPositions) as $group) {
            if (stripos($group, $q) !== false) {
                $positionCodes = array_merge($positionCodes, $groupToPositions[$group]);
            }
        }

        $positionCodes = array_unique($positionCodes);

        // --------------------------------------------------------------
        // 3. Detect year of birth (if query is a 4-digit number)
        // --------------------------------------------------------------
        $yearCondition = null;
        if (preg_match('/^\d{4}$/', $q)) {
            $yearCondition = (int) $q;
        }

        // --------------------------------------------------------------
        // 4. Build the query
        // --------------------------------------------------------------
        $players = PlayerProfile::query()
            ->with('user:id,name,nationality,dob') // 👈 load dob from user
            ->where(function ($query) use ($q, $countryCodes, $positionCodes, $yearCondition) {

                // ----- Search in the related user -----
                $query->whereHas('user', function ($user) use ($q, $countryCodes, $yearCondition) {
                    // Player name
                    $user->where('name', 'like', "%{$q}%");

                    // Player nationality (country of origin)
                    if (!empty($countryCodes)) {
                        $user->orWhereIn('nationality', $countryCodes);
                    }

                    // Year of birth (using the 'dob' column)
                    if ($yearCondition) {
                        $user->orWhereYear('dob', $yearCondition);
                    }
                });

                // ----- Search directly in player_profiles -----
                // Club name
                $query->orWhere('current_club', 'like', "%{$q}%");

                // Club country (where the player currently plays)
                if (!empty($countryCodes)) {
                    $query->orWhereIn('current_club_country', $countryCodes);
                }

                // Nickname
                $query->orWhere('nickname', 'like', "%{$q}%");

                // Positions (matching any detected position code)
                if (!empty($positionCodes)) {
                    $query->orWhere(function ($sub) use ($positionCodes) {
                        foreach ($positionCodes as $pos) {
                            $sub->orWhere('positions', 'like', "%{$pos}%");
                        }
                    });
                }
            })
            ->limit(8)
            ->get()
            ->map(function ($player) {
                $positions = is_array($player->positions)
                    ? $player->positions
                    : json_decode($player->positions, true);

                $positions = is_array($positions) ? $positions : [];
                $firstPosition = $positions[0] ?? null;

                return [
                    'id'        => $player->id,
                    'name'      => $player->user?->name,
                    'club'      => $player->current_club,
                    'photo_url' => $player->photo_url,
                    'country'   => $player->user?->nationality,
                    'position'  => $firstPosition
                        ? (self::POSITION_GROUP[$firstPosition] ?? $firstPosition)
                        : null,
                ];
            });

        return response()->json(['players' => $players]);
    }
}
