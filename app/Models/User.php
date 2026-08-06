<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;

class User extends Authenticatable
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
}
