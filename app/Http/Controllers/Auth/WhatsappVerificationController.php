<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Player\TwilioVerificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class WhatsappVerificationController extends Controller
{
    public function __construct(protected TwilioVerificationService $twilio) {}

    /**
     * Prompt page — jodi already verified thake, dashboard-e pathiye dao.
     * Prothombar page load hole ekhane-i notun code auto-pathabo.
     */
    public function prompt(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        if ($user->hasVerifiedWhatsapp()) {
            return $this->redirectToDashboard($user);
        }

        return Inertia::render('auth/VerifyWhatsapp', [
            'whatsapp' => $user->whatsapp,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Notun OTP pathao (WhatsApp channel, fallback SMS — Twilio handle kore).
     */
    public function send(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->hasVerifiedWhatsapp()) {
            return $this->redirectToDashboard($user);
        }

        $this->twilio->sendCode($user->whatsapp);

        return back()->with('status', 'whatsapp-code-sent');
    }

    /**
     * User-er deya 6-digit code verify koro.
     */
    public function verify(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => ['required', 'digits:6'],
        ]);

        $user = $request->user();

        if ($user->hasVerifiedWhatsapp()) {
            return $this->redirectToDashboard($user);
        }

        $approved = $this->twilio->checkCode($user->whatsapp, $request->code);

        if (!$approved) {
            throw ValidationException::withMessages([
                'code' => 'The code you entered is incorrect or has expired.',
            ]);
        }

        $user->forceFill([
            'whatsapp_verified_at' => now(),
        ])->save();

        return $this->redirectToDashboard($user)->with('verified', true);
    }

    private function redirectToDashboard($user): RedirectResponse
    {
        return match ($user->role) {
            'player' => to_route('player.dashboard'),
            'scout', 'agent', 'club' => to_route('scouting.dashboard'),
            default => to_route('home'),
        };
    }
}
