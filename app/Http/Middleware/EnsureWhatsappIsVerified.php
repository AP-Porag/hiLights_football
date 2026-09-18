<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureWhatsappIsVerified
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user && !$user->hasVerifiedWhatsapp()) {
            return redirect()->route('verification.whatsapp.notice');
        }

        return $next($request);
    }
}
