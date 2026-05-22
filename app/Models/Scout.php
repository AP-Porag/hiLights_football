<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Scout extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'organization_name',
        'job_title',
        'country_id',
        'city',
        'phone',
        'website',
        'linkedin_url',
        'bio',
        'specializations',
        'is_verified',
    ];

    protected $casts = [
        'specializations' => 'array',
        'is_verified'     => 'boolean',
    ];

    // ─── Relationships ───

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function savedPlayers(): HasMany
    {
        return $this->hasMany(SavedPlayer::class);
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(ScoutRating::class);
    }

    // ─── Helpers ───

    public function hasSaved(int $playerId): bool
    {
        return $this->savedPlayers()->where('player_id', $playerId)->exists();
    }

    public function hasRated(int $playerId): bool
    {
        return $this->ratings()->where('player_id', $playerId)->exists();
    }
}
