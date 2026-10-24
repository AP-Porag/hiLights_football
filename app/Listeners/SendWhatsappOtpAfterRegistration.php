<?php

namespace App\Listeners;

use App\Services\Player\TwilioVerificationService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Log;

class SendWhatsappOtpAfterRegistration
{
    public function __construct(protected TwilioVerificationService $twilio) {}

    public function handle(Registered $event): void
    {
        // Testing-only switch. Off by default, so production stays unaffected.
        if (! config('services.twilio.auto_otp_on_register')) {
            return;
        }

        $user = $event->user;

        if (empty($user->whatsapp)) {
            Log::info('Twilio OTP skipped: user has no WhatsApp number.', [
                'user_id' => $user->id,
            ]);

            return;
        }

        try {
            // WhatsApp first; the service falls back to SMS on failure
            $this->twilio->sendCode($user->whatsapp);

            Log::info('Twilio OTP sent.', [
                'user_id' => $user->id,
                'to' => $user->whatsapp,
            ]);
        } catch (\Throwable $e) {
            // Never let a Twilio failure break registration
            Log::error('Twilio OTP send failed.', [
                'user_id' => $user->id,
                'to' => $user->whatsapp,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
