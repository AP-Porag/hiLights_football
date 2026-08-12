<?php

namespace App\Http\Controllers\Scout;

use App\Http\Controllers\Controller;
use App\Models\PlayerProfile;
use App\Models\PlayerRating;
use App\Models\PlayerReport;
use App\Models\ProfileView;
use App\Models\SavedPlayer;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


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
        $savedIds = auth()->check() && auth()->user()->role === 'scout'
            ? SavedPlayer::where('user_id', auth()->id())->pluck('player_profile_id')->toArray()
            : [];

        return Inertia::render('scouting/dashboard/Index', [
            'players' => $players,
            'savedIds' => $savedIds,
        ]);
    }
    public function playerDetails(Request $request, $id)
    {
        $player = PlayerProfile::with('user')->findOrFail($id);
        // ke dekhlo record koro (nijer profile chhara)
        if ($request->user() && $request->user()->id !== $player->user_id) {
            ProfileView::create([
                'player_profile_id' => $player->id,
                'viewer_id' => $request->user()->id,
            ]);

            $player->increment('views');
        }

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

    public function toggleSave(Request $request, $playerId)
    {

        $user = Auth::user();

        // শুধু স্কাউটরা সেভ করতে পারবে
        if (!$user || $user->role !== 'scout') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // player_profile_id ভ্যালিড কিনা চেক
        $profile = PlayerProfile::find($playerId);
        if (!$profile) {
            return response()->json(['error' => 'Player not found'], 404);
        }

        $saved = SavedPlayer::where('user_id', $user->id)
            ->where('player_profile_id', $playerId)
            ->first();

        if ($saved) {
            $saved->delete();
            $saved = false;
        } else {
            SavedPlayer::create([
                'user_id' => $user->id,
                'player_profile_id' => $playerId,
            ]);
            $saved = true;
        }

        return response()->json([
            'saved' => $saved,
            'message' => $saved ? 'Player saved' : 'Player unsaved',
        ]);
    }

    public function savedPlayers()
    {
        $user = Auth::user();
        if (!$user || $user->role !== 'scout') {
            abort(403);
        }

        $savedPlayers = SavedPlayer::with('playerProfile.user')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($saved) {
                $profile = $saved->playerProfile;
                $user = $profile?->user;

                // রেটিং ক্যালকুলেশন
                $ratings = PlayerRating::where('player_profile_id', $profile?->id)->get();
                $ratingCount = $ratings->count();
                $avgRating = $ratingCount > 0 ? round($ratings->avg(function ($r) {
                    return ($r->technical + $r->physical + $r->mental) / 3;
                }), 1) : 0;

                // ফ্ল্যাগ (ধরে নিচ্ছি nationality দুই-অক্ষরের কোড)
                $flag = $this->getFlag($user?->nationality);

                return [
                    'id' => $saved->id,
                    'savedAt' => $saved->created_at->format('d/m/Y'),
                    'notes' => $saved->notes ?? '',
                    'player' => [
                        'id' => $profile?->id,
                        'name' => $user?->name ?? 'Unknown',
                        'nickname' => null,
                        'age' => $user?->dob ? \Carbon\Carbon::parse($user->dob)->age : null,
                        // User table থেকে DOB
                        'dob' => $user?->dob
                            ? \Carbon\Carbon::parse($user->dob)->format('Y-m-d')
                            : null,
                        'nationality' => $user?->nationality ?? '',
                        'flag' => $flag,
                        'currentClub' => $profile?->current_club ?? '—',
                        'positions' => is_array($profile?->positions) ? $profile->positions : [],
                        'foot' => $profile?->foot ?? '—',
                        'height' => $profile?->height,
                        'modalities' => [$profile?->modality ?? 'Football'],
                        'profileViews' => $profile?->views ?? 0,
                        'isPremium' => false,
                        'avgRating' => $avgRating,
                        'ratingCount' => $ratingCount,
                        'videoUrl' => '',
                        'photoUrl' => $profile?->photo_url,
                    ],
                ];
            });

        return Inertia::render('scouting/search/Saved', [
            'savedPlayers' => $savedPlayers,
        ]);
    }

    public function updateNote(Request $request, SavedPlayer $saved)
    {
        if ($saved->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $request->validate(['notes' => 'nullable|string|max:500']);
        $saved->update(['notes' => $request->notes]);
        return response()->json(['success' => true]);
    }

    public function removeSaved(SavedPlayer $saved)
    {
        if ($saved->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $saved->delete();
        return response()->json(['success' => true]);
    }
    private function getFlagFromName($countryName)
    {
        $map = [
            'Brazil' => 'BR',
            'Portugal' => 'PT',
            'Argentina' => 'AR',
            // ... অন্যান্য
        ];
        $code = $map[$countryName] ?? null;
        return $code ? $this->getFlag($code) : '🏳️';
    }
    // Helper for flag emoji (if you have a nationality code)
    private function getFlag($code)
    {
        if (!$code || strlen($code) !== 2) {
            return '🏳️'; // ডিফল্ট ফ্ল্যাগ
        }
        $code = strtoupper($code);
        $regionalOffset = 0x1F1E6 - ord('A');
        return mb_convert_encoding('&#' . (ord($code[0]) + $regionalOffset) . ';', 'UTF-8', 'HTML-ENTITIES') .
            mb_convert_encoding('&#' . (ord($code[1]) + $regionalOffset) . ';', 'UTF-8', 'HTML-ENTITIES');
    }
}
