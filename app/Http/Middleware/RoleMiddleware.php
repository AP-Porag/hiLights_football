<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * Usage:
     * ->middleware('role:admin')
     * ->middleware('role:user')
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = $request->user();

        if (!$user) {
            abort(401); // Not authenticated
        }

        if ($user->role !== $role) {
            abort(403, 'Unauthorized access.');
        }

        return $next($request);
    }
}
