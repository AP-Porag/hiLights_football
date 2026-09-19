<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Player\TwilioVerificationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Client\RequestException;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class WhatsappVerificationController extends Controller
{
    public function __construct(protected TwilioVerificationService $twilio) {}

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

    public function send(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->hasVerifiedWhatsapp()) {
            return $this->redirectToDashboard($user);
        }

        try {
            $this->twilio->sendCode($user->whatsapp);
        } catch (RequestException $e) {
            return back()->with('error', 'We could not send a verification code to this number right now. Please try again later or contact support.');
        }

        return back()->with('status', 'whatsapp-code-sent');
    }

    public function verify(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => ['required', 'digits:6'],
        ]);

        $user = $request->user();

        if ($user->hasVerifiedWhatsapp()) {
            return $this->redirectToDashboard($user);
        }

        try {
            $approved = $this->twilio->checkCode($user->whatsapp, $request->code);
        } catch (RequestException $e) {
            throw ValidationException::withMessages([
                'code' => 'We could not verify this code right now. Please try again later.',
            ]);
        }

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
