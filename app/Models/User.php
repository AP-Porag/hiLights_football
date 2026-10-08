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
use Illuminate\Support\Str;


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
    /**
     * Slug is generated AFTER insert, so the real created_at value from the database is used.
     */
    protected static function booted(): void
    {
        static::created(function (User $user) {
            if (empty($user->slug)) {
                $user->slug = static::generateUniqueSlug($user);
                $user->saveQuietly();
            }
        });
    }

    /**
     * "Razaul Karim" + created_at → "razaul-karim-7f3a9c21be"
     *
     * Hash = HMAC-SHA256(created_at | id, APP_KEY) — one-way (like a password hash),
     * cannot be decoded back to the date or ID, and is URL-safe (a-f, 0-9 only).
     */
    public static function generateUniqueSlug(User $user): string
    {
        $base = Str::limit(Str::slug((string) $user->name), 60, '') ?: 'player';
        $createdAt = optional($user->created_at)->format('Y-m-d H:i:s') ?? now()->format('Y-m-d H:i:s');

        $attempt = 0;

        do {
            $hash = substr(
                hash_hmac('sha256', $createdAt . '|' . $user->id . '|' . $attempt, config('app.key')),
                0,
                10
            );

            $slug = $base . '-' . $hash;
            $attempt++;
        } while (static::where('slug', $slug)->where('id', '!=', $user->id)->exists());

        return $slug;
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
