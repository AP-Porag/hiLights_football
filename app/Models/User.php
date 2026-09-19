<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Notifications\OtpVerificationNotification;
use App\Notifications\HiLightsResetPasswordNotification;


class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'status',
        'password',
        'role',
        'whatsapp',
        'dob',
        'nationality',
        'remember_token',
        'country',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'dob'               => 'date',
            'nationality' => 'array',
        ];
    }
    public function playerProfile(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(PlayerProfile::class);
    }

    public function homeRoute(): string
    {
        return match ($this->role) {
            'player'          => '/player',
            'scout', 'agent', 'club' => '/scouting',
            'admin'           => '/admin',
            default           => '/',
        };
    }
    public function scoutProfile()
    {
        return $this->hasOne(ScoutProfile::class);
    }

    public function savedPlayers()
    {
        return $this->hasMany(SavedPlayer::class);
    }

    /**
     * Override Laravel's default link-based verification email
     * with a 6-digit OTP code instead.
     */
    public function sendEmailVerificationNotification(): void
    {
        $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        $this->forceFill([
            'email_verification_code' => $code,
            'email_verification_code_expires_at' => now()->addMinutes(10),
        ])->save();

        $this->notify(new OtpVerificationNotification($code));
    }
    public function hasVerifiedWhatsapp(): bool
    {
        return !is_null($this->whatsapp_verified_at);
    }
    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new HiLightsResetPasswordNotification($token));
    }
}
