<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'avatar_path',
        'status',
        'locale',
        'timezone',
        'last_login_at',
        'last_login_ip',
        'preferences',
        'dob',
        'nationality',
        'remember_token',
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
            'last_login_at'     => 'datetime',
            'preferences'       => 'array',
            'password' => 'hashed',
        ];
    }

    // ─── Relationships ───

    public function player(): HasOne
    {
        return $this->hasOne(Player::class);
    }

    public function scout(): HasOne
    {
        return $this->hasOne(Scout::class);
    }

    // public function subscriptions(): HasMany
    // {
    //     return $this->hasMany(Subscription::class);
    // }

    // public function activeSubscription(): HasOne
    // {
    //     return $this->hasOne(Subscription::class)
    //         ->whereIn('status', ['active', 'trial'])
    //         ->latestOfMany();
    // }

    // public function paymentTransactions(): HasMany
    // {
    //     return $this->hasMany(PaymentTransaction::class);
    // }

    public function profileViews(): HasMany
    {
        return $this->hasMany(ProfileView::class, 'viewer_user_id');
    }

    // ─── Role helpers ───

    public function isPlayer(): bool
    {
        return $this->role === 'player';
    }
    public function isScout(): bool
    {
        return $this->role === 'scout';
    }
    public function isAgent(): bool
    {
        return $this->role === 'agent';
    }
    public function isClub(): bool
    {
        return $this->role === 'club';
    }
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isScoutTeam(): bool
    {
        return in_array($this->role, ['scout', 'agent', 'club']);
    }

    public function isPremium(): bool
    {
        return $this->activeSubscription?->plan?->slug !== 'free'
            && $this->activeSubscription !== null;
    }
}
