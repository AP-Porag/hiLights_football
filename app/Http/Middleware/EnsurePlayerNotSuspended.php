<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsurePlayerNotSuspended
{
    /**
     * Admin jodi player_profiles.status = 'Suspended' kore dey, tahole oi player
     * ar kono player route-e dhukte parbe na. Age theke login kora thakleo
     * session shesh kore public suspended page-e pathiye dey.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && $user->role === 'player' && $user->playerProfile?->status === 'Suspended') {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect()->route('account.suspended');
        }

        return $next($request);
    }
}
