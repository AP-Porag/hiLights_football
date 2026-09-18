<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OtpVerificationNotification extends Notification
{
    use Queueable;

    public function __construct(protected string $code) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Verify your HiLights Football account')
            ->greeting('Hi ' . $notifiable->name . ',')
            ->line('Use the verification code below to confirm your email address.')
            ->line(new \Illuminate\Support\HtmlString(
                '<div style="text-align:center;margin:24px 0;">'
                    . '<span style="display:inline-block;font-size:32px;font-weight:700;letter-spacing:8px;color:#FF6B00;background:#111111;padding:16px 24px;border-radius:12px;">'
                    . $this->code
                    . '</span></div>'
            ))
            ->line('This code will expire in 10 minutes.')
            ->line('If you did not create an account, no further action is required.');
    }
}
