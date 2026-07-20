<?php

namespace App\Http\Controllers\Scout;

use App\Http\Controllers\Controller;
use App\Models\PlayerProfile;
use App\Models\PlayerRating;
use App\Models\PlayerReport;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ScoutController extends Controller
{
    public function index()
    {
        // Get data for the dashboard
        $players = PlayerProfile::with('user')->get();
        // $stats = [
        //     'total_players' => Player::count(),
        //     'active_scouts' => Scout::where('status', 'active')->count(),
        //     'pending_requests' => 5,
        // ];

        return Inertia::render('scouting/dashboard/Index', [
            'players' => $players,
        ]);
    }
    public function playerDetails(Request $request, $id)
    {
        $player = PlayerProfile::with('user')->findOrFail($id);

        // same modality-r onno player (similar section-er jonno)
        $similarPlayers = PlayerProfile::with('user')
            ->where('id', '!=', $player->id)
            ->when($player->modality, fn($q) => $q->where('modality', $player->modality))
            ->latest()
            ->take(3)
            ->get();

        // ei scout-er age deya rating (thakle)
        $existingRating = PlayerRating::where('scout_id', $request->user()->id)
            ->where('player_profile_id', $player->id)
            ->first();

        return Inertia::render('scouting/player/Detail', [
            'player' => $player,
            'similarPlayers' => $similarPlayers,
            'existingRating' => $existingRating,
        ]);
    }

    public function storeRating(Request $request, $id)
    {
        $player = PlayerProfile::findOrFail($id);

        $validated = $request->validate([
            'technical' => ['required', 'integer', 'min:0', 'max:10'],
            'physical'  => ['required', 'integer', 'min:0', 'max:10'],
            'tactical'  => ['required', 'integer', 'min:0', 'max:10'],
            'mental'    => ['required', 'integer', 'min:0', 'max:10'],
            'notes'     => ['nullable', 'string', 'max:5000'],
        ]);

        PlayerRating::updateOrCreate(
            [
                'scout_id' => $request->user()->id,
                'player_profile_id' => $player->id,
            ],
            $validated
        );

        return back();
    }

    public function playerReport(Request $request, $id)
    {
        $player = PlayerProfile::with('user')->findOrFail($id);

        $rating = PlayerRating::where('scout_id', $request->user()->id)
            ->where('player_profile_id', $player->id)
            ->first();

        $report = PlayerReport::where('scout_id', $request->user()->id)
            ->where('player_profile_id', $player->id)
            ->first();

        return Inertia::render('scouting/player/Report', [
            'player' => $player,
            'rating' => $rating,
            'report' => $report,
        ]);
    }

    public function storeReport(Request $request, $id)
    {
        $player = PlayerProfile::findOrFail($id);

        $validated = $request->validate([
            'recommendation' => ['nullable', 'in:sign,monitor,pass'],
            'match_context'  => ['nullable', 'string', 'max:255'],
            'strengths'      => ['nullable', 'string', 'max:5000'],
            'weaknesses'     => ['nullable', 'string', 'max:5000'],
            'summary'        => ['nullable', 'string', 'max:5000'],
            'status'         => ['required', 'in:draft,final'],
        ]);

        PlayerReport::updateOrCreate(
            [
                'scout_id' => $request->user()->id,
                'player_profile_id' => $player->id,
            ],
            $validated
        );

        return back();
    }
}
