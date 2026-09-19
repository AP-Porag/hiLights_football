<?php

namespace App\Services\Player;

use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

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
     * Prothome WhatsApp channel-e code pathanor chesta kore;
     * WhatsApp fail hole (na thakle/error hole) automatically SMS-e fallback kore.
     */
    public function sendCode(string $phoneE164): void
    {
        try {
            $this->sendViaChannel($phoneE164, 'whatsapp');
        } catch (RequestException $e) {
            Log::info('Twilio WhatsApp send failed, falling back to SMS.', [
                'phone' => $phoneE164,
                'error' => $e->getMessage(),
            ]);

            // WhatsApp fail korle SMS-e fallback koro
            $this->sendViaChannel($phoneE164, 'sms');
        }
    }

    /**
     * Ekta specific channel-e (whatsapp/sms) verification code pathay.
     */
    private function sendViaChannel(string $phoneE164, string $channel): void
    {
        Http::withBasicAuth($this->sid, $this->authToken)
            ->asForm()
            ->post("https://verify.twilio.com/v2/Services/{$this->verifySid}/Verifications", [
                'To' => $phoneE164,
                'Channel' => $channel,
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
