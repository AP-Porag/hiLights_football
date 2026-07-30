<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\PlayerProfile;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // player-profile soho user data
        $players = PlayerProfile::with('user')
            ->latest()
            ->get()
            ->map(function ($profile) {
                return [
                    'id'          => $profile->id,
                    'name'        => $profile->user?->name,
                    'nationality' => $profile->user?->nationality,
                    'dob' => $profile->user?->dob,
                    'positions'   => $profile->positions,
                    'height'   => $profile->height,
                    'current_club' => $profile->current_club,
                    'photo_url'   => $profile->photo_url,
                    'video_url'   => $profile->video_url,
                    'birth_city'  => $profile->birth_city,
                ];
            });

        return Inertia::render('web/HomeTwo', [
            'players' => $players,
        ]);
    }
    public function scout()
    {
        $players = PlayerProfile::with('user')
            ->latest()
            ->get()
            ->map(function ($profile) {
                return [
                    'id'            => $profile->id,
                    'name'          => $profile->user?->name,
                    'nationality'   => $profile->user?->nationality,
                    'dob'           => $profile->user?->dob,
                    'positions'     => $profile->positions,
                    'height'        => $profile->height,
                    'current_club'  => $profile->current_club,
                    'photo_url'     => $profile->photo_url,
                    'video_url'     => $profile->video_url,
                    'birth_city'    => $profile->birth_city,
                ];
            });

        return Inertia::render('web/Scout', [
            'players' => $players,
        ]);
    }
}
