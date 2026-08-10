<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PlayerRating;
use App\Models\User;
use App\Models\PlayerProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ClubController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->query('search', ''));
        $clubSearch = trim((string) $request->query('club_search', ''));

        // ── main paginated list (ক্লাবদের রেটিং) ──
        $query = PlayerRating::query()->with([
            'scout' => function ($q) {
                $q->where('role', 'club')->select('id', 'name', 'role');
            },
            'playerProfile.user',
        ]);

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->whereHas('scout', fn($s) => $s->where('name', 'like', "%{$search}%"))
                    ->orWhereHas('playerProfile.user', fn($u) => $u->where('name', 'like', "%{$search}%"));
            });
        }

        $ratings = $query->latest()
            ->paginate(7)
            ->withQueryString()
            ->through(fn($r) => $this->mapRating($r));

        // ── summary ──
        $totalRatings = PlayerRating::whereHas('scout', fn($q) => $q->where('role', 'club'))->count();
        $avgRating    = round((float) PlayerRating::whereHas('scout', fn($q) => $q->where('role', 'club'))
            ->selectRaw('AVG((technical + physical + mental) / 3) as a')->value('a'), 1);
        $totalPlayers = (int) PlayerRating::whereHas('scout', fn($q) => $q->where('role', 'club'))
            ->distinct('player_profile_id')->count('player_profile_id');
        $ratingsThisMonth = PlayerRating::whereHas('scout', fn($q) => $q->where('role', 'club'))
            ->where('created_at', '>=', Carbon::now()->startOfMonth())->count();

        // ── সব Club (প্যাজিনেটেড) ──
        $allClubsQuery = User::where('role', 'club');
        if ($clubSearch !== '') {
            $allClubsQuery->where('name', 'like', "%{$clubSearch}%");
        }
        $allClubs = $allClubsQuery->paginate(10)->through(function ($user) {
            $totalRatings = PlayerRating::where('scout_id', $user->id)->count();
            $avgRating = PlayerRating::where('scout_id', $user->id)->avg(DB::raw('(technical + physical + mental) / 3'));
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'organization' => null,
                'country' => null,
                'total_ratings' => $totalRatings,
                'avg_rating' => $avgRating ? round($avgRating, 1) : 0,
            ];
        });

        // ── most rated players (top 5) ──
        $mostRated = PlayerRating::selectRaw('player_profile_id, COUNT(*) as ratings, AVG((technical + physical + mental) / 3) as avg')
            ->whereHas('scout', fn($q) => $q->where('role', 'club'))
            ->groupBy('player_profile_id')
            ->orderByDesc('ratings')
            ->limit(5)
            ->get();

        $profileIds = $mostRated->pluck('player_profile_id');
        $profiles = PlayerProfile::with('user')->whereIn('id', $profileIds)->get()->keyBy('id');

        $mostRatedPlayers = $mostRated->map(function ($row) use ($profiles) {
            $profile = $profiles->get($row->player_profile_id);
            $user = $profile?->user;
            $positions = is_array($profile?->positions) ? $profile->positions : [];

            return [
                'id'       => $user?->id,
                'name'     => $user?->name ?? 'Unknown',
                'position' => $positions[0] ?? null,
                'club'     => $profile?->current_club,
                'ratings'  => (int) $row->ratings,
                'avg'      => round((float) $row->avg, 1),
                'avatar'   => $profile?->photo_url,
            ];
        })->values();

        // ── most active clubs (top 5) ──
        $active = PlayerRating::selectRaw('scout_id, COUNT(*) as ratings, AVG((technical + physical + mental) / 3) as avgGiven')
            ->whereHas('scout', fn($q) => $q->where('role', 'club'))
            ->groupBy('scout_id')
            ->orderByDesc('ratings')
            ->limit(5)
            ->get();

        $clubUsers = User::where('role', 'club')->whereIn('id', $active->pluck('scout_id'))->get()->keyBy('id');

        $mostActiveClubs = $active->map(function ($row) use ($clubUsers) {
            $u = $clubUsers->get($row->scout_id);
            return [
                'id'           => $row->scout_id,
                'name'         => $u?->name ?? 'Unknown',
                'organization' => null,
                'country'      => null,
                'ratings'      => (int) $row->ratings,
                'avgGiven'     => round((float) $row->avgGiven, 1),
                'avatar'       => null,
            ];
        })->values();

        return inertia('admin/club/Index', [
            'ratings'          => $ratings,
            'summary'          => [
                'avgRating'        => $avgRating,
                'totalRatings'     => $totalRatings,
                'totalPlayers'     => $totalPlayers,
                'ratingsThisMonth' => $ratingsThisMonth,
                'topClub'          => null, // top club যোগ করা যায়
            ],
            'mostRatedPlayers' => $mostRatedPlayers,
            'mostActiveClubs'  => $mostActiveClubs,
            'allClubs'         => $allClubs,
            'clubSearch'       => $clubSearch,
            'filters'          => [
                'search' => $search,
            ],
        ]);
    }

    public function destroy(PlayerRating $rating)
    {
        $rating->delete();
        return back()->with('success', 'Rating deleted.');
    }

    public function export()
    {
        $ratings = PlayerRating::with([
            'scout' => fn($q) => $q->where('role', 'club')->select('id', 'name'),
            'playerProfile.user:id,name',
        ])->latest()->get();

        $callback = function () use ($ratings) {
            $out = fopen('php://output', 'w');
            fputcsv($out, ['ID', 'Club', 'Player', 'Technical', 'Physical', 'Mental', 'Overall', 'Date', 'Notes']);

            foreach ($ratings as $r) {
                $overall = round((($r->technical + $r->physical + $r->mental) / 3), 1);
                $playerName = $r->playerProfile?->user?->name ?? 'Unknown';
                fputcsv($out, [
                    $r->id,
                    $r->scout?->name ?? 'Unknown',
                    $playerName,
                    $r->technical,
                    $r->physical,
                    $r->mental,
                    $overall,
                    optional($r->created_at)->toDateString(),
                    $r->notes,
                ]);
            }

            fclose($out);
        };

        return response()->stream($callback, 200, [
            'Content-Type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename="club-ratings.csv"',
        ]);
    }

    private function mapRating(PlayerRating $r): array
    {
        $profile = $r->playerProfile;
        $user = $profile?->user;
        $positions = is_array($profile?->positions) ? $profile->positions : [];
        $overall = round((($r->technical + $r->physical + $r->mental) / 3), 1);

        return [
            'id'    => $r->id,
            'scout' => [
                'id'           => $r->scout?->id,
                'name'         => $r->scout?->name ?? 'Unknown',
                'avatar'       => null,
                'organization' => null,
                'role'         => $r->scout?->role,
                'country'      => null,
            ],
            'player' => [
                'id'       => $user?->id,
                'name'     => $user?->name ?? 'Unknown',
                'avatar'   => $profile?->photo_url,
                'position' => $positions[0] ?? null,
                'club'     => $profile?->current_club,
                'age'      => $user?->dob ? Carbon::parse($user->dob)->age : null,
            ],
            'technical'    => (float) $r->technical,
            'physical'     => (float) $r->physical,
            'mental'       => (float) $r->mental,
            'overall'      => $overall,
            'notes'        => $r->notes,
            'date'         => optional($r->created_at)->toDateString(),
            'matchContext' => $r->match_context ?? null,
        ];
    }

    public function publicPlayerDetails(Request $request, $id)
    {
        $player = PlayerProfile::with('user')->where('user_id', $id)->firstOrFail();
        return Inertia::render('admin/club/Detail', [
            'player' => $player,
        ]);
    }
}
