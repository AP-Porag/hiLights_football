<?php

namespace App\Services\Player;

use Illuminate\Support\Facades\Http;

class TwilioVerificationService
{
    protected string $sid;
    protected string $authToken;
    protected string $verifySid;

    public function __construct()
    {
        $this->sid = config('services.twilio.sid');
        $this->authToken = config('services.twilio.auth_token');
        $this->verifySid = config('services.twilio.verify_sid');
    }

    /**
     * WhatsApp channel-e code pathay; Twilio Verify automatically
     * WhatsApp na thakle SMS-e fallback kore.
     */
    public function sendCode(string $phoneE164): void
    {
        Http::withBasicAuth($this->sid, $this->authToken)
            ->asForm()
            ->post("https://verify.twilio.com/v2/Services/{$this->verifySid}/Verifications", [
                'To' => $phoneE164,
                'Channel' => 'sms',
            ])
            ->throw();
    }

    /**
     * User-er deya code check kore.
     */
    public function checkCode(string $phoneE164, string $code): bool
    {
        $response = Http::withBasicAuth($this->sid, $this->authToken)
            ->asForm()
            ->post("https://verify.twilio.com/v2/Services/{$this->verifySid}/VerificationCheck", [
                'To' => $phoneE164,
                'Code' => $code,
            ])
            ->throw();

        return $response->json('status') === 'approved';
    }
}
