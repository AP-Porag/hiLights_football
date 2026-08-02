<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DashboardController extends Controller
{
    // Stripe price IDs — frontend/subscription page er sathe match rakho
    private const PLAN_ONE_PRICE = 'price_1TsfD5HKtXG9R7bGyzR4H6C9'; // Premium
    private const PLAN_TWO_PRICE = 'price_1TsfDtHKtXG9R7bGVsNxRTT6'; // Elite

    // MRR calculation er jonno each plan-er monthly amount (€) — real amount diye update koro
    private const PLAN_AMOUNTS = [
        self::PLAN_ONE_PRICE => 14.99,
        self::PLAN_TWO_PRICE => 39.99,
    ];

    public function index()
    {
        $today      = Carbon::today();
        $monthStart = Carbon::now()->startOfMonth();
        $weekStart  = Carbon::now()->startOfWeek();

        // ── Active subscriptions (Cashier `subscriptions` table) ──
        $activeSubs    = DB::table('subscriptions')->where('stripe_status', 'active')->get();
        $activePremium = $activeSubs->count();

        // ── Stat counts ──
        $totalUsers   = User::count();
        $totalPlayers = User::where('role', 'player')->count();
        $activeScouts = User::where('role', 'scout')->count();
        $newToday     = User::whereDate('created_at', $today)->count();

        // ── MRR (active subscription price gula sum) ──
        $mrr = 0.0;
        foreach ($activeSubs as $sub) {
            $mrr += self::PLAN_AMOUNTS[$sub->stripe_price] ?? 0;
        }

        // ── Trend numbers ──
        $playersThisMonth = User::where('role', 'player')->where('created_at', '>=', $monthStart)->count();
        $scoutsThisMonth  = User::where('role', 'scout')->where('created_at', '>=', $monthStart)->count();
        $premiumThisWeek  = DB::table('subscriptions')
            ->where('stripe_status', 'active')
            ->where('created_at', '>=', $weekStart)
            ->count();

        // ── Registrations last 30 days (ekta grouped query, tarpor gap fill) ──
        $rawCounts = User::selectRaw('DATE(created_at) as d, COUNT(*) as c')
            ->where('created_at', '>=', Carbon::now()->subDays(29)->startOfDay())
            ->groupBy('d')
            ->pluck('c', 'd');

        $registrations = collect(range(29, 0))->map(function ($daysAgo) use ($rawCounts) {
            $date = Carbon::now()->subDays($daysAgo);
            return [
                'day'           => $date->format('M j'),
                'registrations' => (int) ($rawCounts[$date->toDateString()] ?? 0),
            ];
        })->values();

        // registration trend: ei 30 din vs ager 30 din
        $last30 = User::where('created_at', '>=', Carbon::now()->subDays(30))->count();
        $prev30 = User::whereBetween('created_at', [Carbon::now()->subDays(60), Carbon::now()->subDays(30)])->count();
        $regTrend = $prev30 > 0
            ? round((($last30 - $prev30) / $prev30) * 100, 1)
            : ($last30 > 0 ? 100 : 0);

        // ── Subscription distribution ──
        $plan1Count = $activeSubs->where('stripe_price', self::PLAN_ONE_PRICE)->count();
        $plan2Count = $activeSubs->where('stripe_price', self::PLAN_TWO_PRICE)->count();
        $freeCount  = max($totalUsers - $plan1Count - $plan2Count, 0);
        $distTotal  = max($totalUsers, 1);

        $subscriptionData = [
            ['name' => 'Free',    'color' => '#94A3B8', 'count' => $freeCount,  'value' => (int) round($freeCount / $distTotal * 100)],
            ['name' => 'Premium', 'color' => '#FF6B00', 'count' => $plan1Count, 'value' => (int) round($plan1Count / $distTotal * 100)],
            ['name' => 'Elite',   'color' => '#CC5500', 'count' => $plan2Count, 'value' => (int) round($plan2Count / $distTotal * 100)],
        ];

        // ── Recent registrations (last 8) ──
        $users = User::with('playerProfile:id,user_id,photo_path')
            ->latest()
            ->take(8)
            ->get();

        $subsByUser = DB::table('subscriptions')
            ->whereIn('user_id', $users->pluck('id'))
            ->where('stripe_status', 'active')
            ->get()
            ->keyBy('user_id');

        $recentUsers = $users->map(function ($u) use ($subsByUser) {
            $sub      = $subsByUser->get($u->id);
            $subLabel = $sub
                ? ($sub->stripe_price === self::PLAN_TWO_PRICE ? 'Elite' : 'Premium')
                : 'Free';

            $initials = collect(explode(' ', trim((string) $u->name)))
                ->filter()
                ->take(2)
                ->map(fn($p) => Str::upper(Str::substr($p, 0, 1)))
                ->implode('');

            return [
                'id'           => $u->id,
                'name'         => $u->name,
                'email'        => $u->email,
                'avatar'       => $u->playerProfile?->photo_url ?? '',
                'initials'     => $initials ?: 'U',
                'role'         => Str::ucfirst($u->role ?? 'user'),
                'subscription' => $subLabel,
                'status'       => $u->email_verified_at ? 'Active' : 'Pending',
                'registered'   => $u->created_at?->diffForHumans() ?? '',
            ];
        });

        return Inertia::render('admin/dashboard/Index', [
            'stats' => [
                'totalPlayers'  => $totalPlayers,
                'activePremium' => $activePremium,
                'mrr'           => (int) round($mrr),
                'newToday'      => $newToday,
                'activeScouts'  => $activeScouts,
            ],
            'trends' => [
                'players' => $playersThisMonth . ' this month',
                'premium' => $premiumThisWeek . ' this week',
                'scouts'  => $scoutsThisMonth . ' this month',
            ],
            'registrations'     => $registrations,
            'registrationTrend' => $regTrend,
            'subscriptionData'  => $subscriptionData,
            'recentUsers'       => $recentUsers,
        ]);
    }
}
