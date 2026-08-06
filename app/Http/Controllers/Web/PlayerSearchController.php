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
            return response()->json([
                'players' => [],
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Country Name -> ISO Code
        |--------------------------------------------------------------------------
        */

        $countryCode = null;

        foreach (Countries::getNames('en') as $code => $country) {
            if (strcasecmp($country, $q) === 0) {
                $countryCode = $code;
                break;
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Position aliases
        |--------------------------------------------------------------------------
        */

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

        $positionSearch = $positionAliases[strtolower($q)] ?? strtoupper($q);

        $players = PlayerProfile::query()
            ->with('user:id,name,nationality')
            ->where(function ($query) use ($q, $countryCode, $positionSearch) {

                // Search in users table
                $query->whereHas('user', function ($user) use ($q, $countryCode) {

                    $user->where('name', 'like', "%{$q}%");

                    if ($countryCode) {
                        $user->orWhere('nationality', $countryCode);
                    }
                })

                    // Search in player_profiles table
                    ->orWhere('current_club', 'like', "%{$q}%")
                    ->orWhere('nickname', 'like', "%{$q}%")
                    ->orWhere('positions', 'like', "%{$positionSearch}%");
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

        return response()->json([
            'players' => $players,
        ]);
    }
}
