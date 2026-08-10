<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PlayerRating;
use App\Models\User;
use App\Models\PlayerProfile;
use App\Models\ProfileView;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Stevebauman\Location\Facades\Location;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ScoutController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->query('search', ''));
        $scout  = $request->query('scout', 'all');
        $scoutSearch = trim((string) $request->query('scout_search', ''));

        // ── main paginated list ──
        $query = PlayerRating::query()->with([
            'scout' => function ($q) {
                $q->where('role', 'scout')->select('id', 'name', 'role');
            },
            'playerProfile.user',
        ]);

        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->whereHas('scout', fn($s) => $s->where('name', 'like', "%{$search}%"))
                    ->orWhereHas('playerProfile.user', fn($u) => $u->where('name', 'like', "%{$search}%"));
            });
        }

        if ($scout !== 'all' && $scout !== null) {
            $query->where('scout_id', $scout);
        }

        $ratings = $query->latest()
            ->paginate(7)
            ->withQueryString()
            ->through(fn($r) => $this->mapRating($r));

        // ── summary ──
        $totalRatings = PlayerRating::count();
        $avgRating    = round((float) PlayerRating::selectRaw('AVG((technical + physical + mental) / 3) as a')->value('a'), 1);
        $totalPlayers = (int) PlayerRating::distinct('player_profile_id')->count('player_profile_id');
        $ratingsThisMonth = PlayerRating::where('created_at', '>=', Carbon::now()->startOfMonth())->count();

        $thisMonthAvg = (float) PlayerRating::where('created_at', '>=', Carbon::now()->startOfMonth())
            ->selectRaw('AVG((technical + physical + mental) / 3) as a')->value('a');
        $lastMonthAvg = (float) PlayerRating::whereBetween('created_at', [
            Carbon::now()->subMonth()->startOfMonth(),
            Carbon::now()->startOfMonth(),
        ])->selectRaw('AVG((technical + physical + mental) / 3) as a')->value('a');
        $avgTrend = round($thisMonthAvg - $lastMonthAvg, 1);

        // top scout
        $top = PlayerRating::selectRaw('scout_id, COUNT(*) as c')->groupBy('scout_id')->orderByDesc('c')->first();
        $topScout = null;
        if ($top) {
            $u = User::find($top->scout_id);
            $topScout = [
                'name'         => $u?->name ?? 'Unknown',
                'organization' => null,
                'count'        => (int) $top->c,
                'avatar'       => null,
            ];
        }

        // ── most rated players (top 5) ──
        $mostRated = PlayerRating::selectRaw('player_profile_id, COUNT(*) as ratings, AVG((technical + physical + mental) / 3) as avg')
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

        // ── most active scouts (top 5) ──
        $active = PlayerRating::selectRaw('scout_id, COUNT(*) as ratings, AVG((technical + physical + mental) / 3) as avgGiven')
            ->groupBy('scout_id')
            ->orderByDesc('ratings')
            ->limit(5)
            ->get();

        $scoutUsers = User::whereIn('id', $active->pluck('scout_id'))->get()->keyBy('id');

        $mostActiveScouts = $active->map(function ($row) use ($scoutUsers) {
            $u = $scoutUsers->get($row->scout_id);
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

        // ── scouts list (filter dropdown) ──
        $scoutList = User::where('role', 'scout')
            ->whereIn('id', PlayerRating::distinct()->pluck('scout_id'))
            ->orderBy('name')
            ->get(['id', 'name'])
            ->map(fn($u) => ['id' => $u->id, 'name' => $u->name])
            ->values();

        // ── সব scout (প্যাজিনেটেড) ──
        $allScoutsQuery = User::where('role', 'scout');
        if ($scoutSearch !== '') {
            $allScoutsQuery->where('name', 'like', "%{$scoutSearch}%");
        }
        $allScouts = $allScoutsQuery->paginate(10)->through(function ($user) {
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

        return inertia('admin/scouting/Index', [
            'ratings'          => $ratings,
            'summary'          => [
                'avgRating'        => $avgRating,
                'totalRatings'     => $totalRatings,
                'totalPlayers'     => $totalPlayers,
                'ratingsThisMonth' => $ratingsThisMonth,
                'avgTrend'         => $avgTrend,
                'topScout'         => $topScout,
            ],
            'mostRatedPlayers' => $mostRatedPlayers,
            'mostActiveScouts' => $mostActiveScouts,
            'scouts'           => $scoutList,
            'filters'          => [
                'search' => $search,
                'scout'  => (string) $scout,
            ],
            'allScouts'        => $allScouts,
            'scoutSearch'      => $scoutSearch,
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
            'scout:id,name',    // only existing columns
            'playerProfile.user:id,name',
        ])->latest()->get();

        $callback = function () use ($ratings) {
            $out = fopen('php://output', 'w');
            fputcsv($out, ['ID', 'Scout', 'Organization', 'Player', 'Technical', 'Physical', 'Mental', 'Overall', 'Date', 'Notes']);

            foreach ($ratings as $r) {
                $overall = round((($r->technical + $r->physical + $r->mental) / 3), 1);
                $playerName = $r->playerProfile?->user?->name ?? 'Unknown';
                fputcsv($out, [
                    $r->id,
                    $r->scout?->name,
                    null,                     // organization
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
            'Content-Disposition' => 'attachment; filename="scout-ratings.csv"',
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
                'avatar'       => null,      // no avatar_url in users
                'organization' => null,
                'role'         => $r->scout?->role,
                'country'      => null,
            ],
            'player' => [
                'id'       => $user?->id,
                'name'     => $user?->name ?? 'Unknown',
                'avatar'   => $profile?->photo_url,   // from PlayerProfile
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
        // user_id দিয়ে প্রোফাইল খোঁজ
        $player = PlayerProfile::with('user')->where('user_id', $id)->firstOrFail();

        // ভিউ বাড়ান
        // $player->increment('views');

        // $viewer = auth()->user();

        // // IP ঠিক করা
        // $ip = app()->environment('local')
        //     ? '8.8.8.8'
        //     : $request->ip();

        // $location = Location::get($ip);

        // ProfileView::create([
        //     'player_profile_id' => $player->id,
        //     'viewer_id'         => $viewer?->id,
        //     'country'           => $location?->countryName,
        //     'country_code'      => $location?->countryCode,
        //     'ip_address'        => $ip,
        //     // 'user_agent'        => $request->userAgent(),
        // ]);

        return Inertia::render('admin/scouting/most-rated/Detail', [
            'player' => $player,
        ]);
    }
}
