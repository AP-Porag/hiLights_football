<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class VerifyEmailController extends Controller
{
    /**
     * Verify the email using the submitted 6-digit OTP code.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => ['required', 'digits:6'],
        ]);

        $user = $request->user();

        if ($user->hasVerifiedEmail()) {
            return $this->redirectToDashboard($user);
        }

        $codeExpired = !$user->email_verification_code_expires_at
            || now()->greaterThan($user->email_verification_code_expires_at);

        if ($codeExpired) {
            throw ValidationException::withMessages([
                'code' => 'This code has expired. Please request a new one.',
            ]);
        }

        if ($user->email_verification_code !== $request->code) {
            throw ValidationException::withMessages([
                'code' => 'The code you entered is incorrect.',
            ]);
        }

        $user->forceFill([
            'email_verified_at' => now(),
            'email_verification_code' => null,
            'email_verification_code_expires_at' => null,
        ])->save();

        event(new Verified($user));

        return $this->redirectToDashboard($user)->with('verified', true);
    }

    // private function redirectToDashboard($user): RedirectResponse
    // {
    //     if (!$user->hasVerifiedWhatsapp()) {
    //         return to_route('verification.whatsapp.notice');
    //     }

    //     return match ($user->role) {
    //         'player' => to_route('player.dashboard'),
    //         'scout', 'agent', 'club' => to_route('scouting.dashboard'),
    //         default => to_route('home'),
    //     };
    // }
    private function redirectToDashboard($user): RedirectResponse
    {
        return match ($user->role) {
            'player' => to_route('player.dashboard'),
            'scout', 'agent', 'club' => to_route('scouting.dashboard'),
            default => to_route('home'),
        };
    }
}
